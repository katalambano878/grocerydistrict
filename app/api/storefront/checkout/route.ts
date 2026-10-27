import { NextResponse } from 'next/server';
import { randomInt } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { verifyAuth } from '@/lib/auth';
import { getRatesMap } from '@/lib/exchange-rates';
import { isValidEmail } from '@/lib/sanitize';
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rate-limit';

/**
 * POST /api/storefront/checkout
 *
 * Creates a pending order. Prices, totals and the charge currency come from
 * the database, never from the browser: the client only says which products,
 * which variant and how many. Product prices are stored in GBP (base) and
 * every order is charged in GHS through Paystack.
 */

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DELIVERY_METHODS = new Set(['pickup', 'doorstep']);
const PAYMENT_METHODS = new Set(['paystack']);
const SHIPPING_FIELDS = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'region'] as const;
const MAX_LINES = 100;
const MAX_QTY = 1000;

type CartLine = { id: string; quantity: number; variant?: string | null; image?: string; slug?: string };

const round2 = (n: number) => Math.round(n * 100) / 100;

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

/** Cart variant labels are "Color / Name", "Name" or "Color". */
function findVariant(variants: any[], label: string | null | undefined) {
  if (!label || !variants?.length) return null;
  const wanted = label.trim().toLowerCase();
  return (
    variants.find((v) => String(v.name || '').trim().toLowerCase() === wanted) ||
    variants.find((v) => v.name && wanted.endsWith(` / ${String(v.name).trim().toLowerCase()}`)) ||
    null
  );
}

export async function POST(request: Request) {
  try {
    const limit = checkRateLimit(`checkout:${getClientIdentifier(request)}`, RATE_LIMITS.payment);
    if (!limit.success) return bad('Too many checkout attempts. Please wait a minute.', 429);

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') return bad('Invalid request');

    const deliveryMethod = String(body.deliveryMethod || 'pickup');
    const paymentMethod = String(body.paymentMethod || 'paystack');
    if (!DELIVERY_METHODS.has(deliveryMethod)) return bad('Unsupported delivery method');
    if (!PAYMENT_METHODS.has(paymentMethod)) return bad('Unsupported payment method');

    const rawShipping = body.shippingData || {};
    const shippingData: Record<string, string> = {};
    for (const field of SHIPPING_FIELDS) {
      const value = String(rawShipping[field] ?? '').trim().slice(0, 200);
      if (!value) return bad(`Missing ${field}`);
      shippingData[field] = value;
    }
    shippingData.email = shippingData.email.toLowerCase();
    if (!isValidEmail(shippingData.email)) return bad('Invalid email address');
    if (!/^[0-9+\-() ]{7,20}$/.test(shippingData.phone)) return bad('Invalid phone number');

    const cart: CartLine[] = Array.isArray(body.cart) ? body.cart : [];
    if (cart.length === 0) return bad('Your cart is empty');
    if (cart.length > MAX_LINES) return bad('Too many items in cart');
    for (const line of cart) {
      if (!line || typeof line.id !== 'string' || !line.id) return bad('Invalid cart item');
      if (!Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > MAX_QTY) {
        return bad('Invalid item quantity');
      }
    }

    // Signed-in shoppers get the order on their account; the id comes from
    // the verified session, not the request body.
    const auth = await verifyAuth(request);
    const userId: string | null = auth.authenticated ? auth.user?.id ?? null : null;

    // Load every product (by id or slug) with its variants.
    const ids = [...new Set(cart.map((l) => l.id).filter((id) => UUID_RE.test(id)))];
    const slugs = [...new Set(cart.map((l) => l.id).filter((id) => !UUID_RE.test(id)))];
    const select = 'id, name, slug, price, status, metadata, product_variants(id, name, price)';
    const [byId, bySlug] = await Promise.all([
      ids.length ? supabaseAdmin.from('products').select(select).in('id', ids) : { data: [], error: null },
      slugs.length ? supabaseAdmin.from('products').select(select).in('slug', slugs) : { data: [], error: null },
    ]);
    if (byId.error || bySlug.error) return bad('Could not load products', 500);
    const products = new Map<string, any>();
    for (const p of [...(byId.data || []), ...(bySlug.data || [])]) {
      products.set(p.id, p);
      if (p.slug) products.set(p.slug, p);
    }

    const rates = await getRatesMap();
    const ghsRate = Number(rates.GHS);
    if (!Number.isFinite(ghsRate) || ghsRate <= 0) return bad('Exchange rate unavailable', 503);

    let subtotalGbp = 0;
    const lines: Array<{ product: any; variant: any; line: CartLine; unitGbp: number }> = [];
    for (const line of cart) {
      const product = products.get(line.id);
      if (!product || product.status !== 'active') {
        return bad('A product in your cart is no longer available. Please remove it and try again.');
      }
      const variant = findVariant(product.product_variants, line.variant);
      if (line.variant && product.product_variants?.length && !variant) {
        return bad(`The selected option for ${product.name} is no longer available.`);
      }
      const unitGbp = Number(variant?.price ?? product.price);
      if (!Number.isFinite(unitGbp) || unitGbp < 0) return bad(`${product.name} has no valid price`);
      subtotalGbp += unitGbp * line.quantity;
      lines.push({ product, variant, line, unitGbp });
    }
    if (subtotalGbp <= 0) return bad('Order total must be greater than zero');

    const shippingGbp = 0; // Pickup is free; doorstep delivery is quoted separately.
    const totalGbp = subtotalGbp + shippingGbp;
    const subtotal = round2(subtotalGbp * ghsRate);
    const total = round2(totalGbp * ghsRate);

    const orderNumber = `ORD-${Date.now()}-${randomInt(100000, 1000000)}`;
    const trackingChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const trackingNumber = `SLI-${Array.from({ length: 6 }, () => trackingChars[randomInt(trackingChars.length)]).join('')}`;

    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert([{
        order_number: orderNumber,
        user_id: userId,
        email: shippingData.email,
        phone: shippingData.phone,
        status: 'pending',
        payment_status: 'pending',
        currency: 'GHS',
        subtotal,
        tax_total: 0,
        shipping_total: round2(shippingGbp * ghsRate),
        discount_total: 0,
        total,
        shipping_method: deliveryMethod,
        payment_method: paymentMethod,
        shipping_address: shippingData,
        billing_address: shippingData,
        metadata: {
          guest_checkout: !userId,
          first_name: shippingData.firstName,
          last_name: shippingData.lastName,
          tracking_number: trackingNumber,
          fx_base_currency: 'GBP',
          fx_rate: ghsRate,
          fx_payment_currency: 'GHS',
          subtotal_gbp: round2(subtotalGbp),
          total_gbp: round2(totalGbp),
        },
      }])
      .select()
      .single();

    if (orderError || !order) {
      console.error('[Checkout] Order insert error:', orderError);
      return bad('Could not create your order. Please try again.', 500);
    }

    const orderItems = lines.map(({ product, variant, line, unitGbp }) => {
      const unitPrice = round2(unitGbp * ghsRate);
      return {
        order_id: order.id,
        product_id: product.id,
        product_name: product.name,
        variant_name: line.variant ? String(line.variant).slice(0, 200) : null,
        quantity: line.quantity,
        unit_price: unitPrice,
        total_price: round2(unitPrice * line.quantity),
        metadata: {
          image: typeof line.image === 'string' ? line.image.slice(0, 500) : null,
          slug: product.slug,
          variant_id: variant?.id ?? null,
          unit_price_gbp: unitGbp,
          preorder_shipping: product.metadata?.preorder_shipping || null,
        },
      };
    });

    const { error: itemsError } = await supabaseAdmin.from('order_items').insert(orderItems);
    if (itemsError) {
      console.error('[Checkout] Order items insert error:', itemsError);
      await supabaseAdmin.from('orders').delete().eq('id', order.id);
      return bad('Could not create your order. Please try again.', 500);
    }

    try {
      await supabaseAdmin.rpc('upsert_customer_from_order', {
        p_email: shippingData.email,
        p_phone: shippingData.phone,
        p_full_name: `${shippingData.firstName} ${shippingData.lastName}`.trim(),
        p_first_name: shippingData.firstName,
        p_last_name: shippingData.lastName,
        p_user_id: userId,
        p_address: shippingData,
      });
    } catch (e: any) {
      console.warn('[Checkout] upsert_customer_from_order warning:', e?.message);
    }

    return NextResponse.json(
      {
        order: {
          id: order.id,
          order_number: order.order_number,
          total: order.total,
          currency: order.currency,
        },
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (e: any) {
    console.error('[Checkout] API error:', e);
    return bad('Internal server error', 500);
  }
}
