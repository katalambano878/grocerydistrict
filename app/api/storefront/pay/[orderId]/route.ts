import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rate-limit';

const NO_STORE = { 'Cache-Control': 'private, no-store' };

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  const limit = checkRateLimit(`pay-lookup:${getClientIdentifier(request)}`, RATE_LIMITS.orderLookup);
  if (!limit.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: NO_STORE });
  }

  try {
    // Fetch order (by UUID or order_number)
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderId);
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*, order_items(id, product_id, product_name, variant_name, quantity, unit_price, metadata)')
      .eq(isUUID ? 'id' : 'order_number', orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Validate stock for every item in the order
    const outOfStockItems: string[] = [];

    if (order.order_items?.length) {
      for (const item of order.order_items) {
        if (!item.product_id) continue;

        // Fetch current product stock
        const { data: product } = await supabaseAdmin
          .from('products')
          .select('quantity, track_quantity, status, name')
          .eq('id', item.product_id)
          .single();

        if (!product) {
          outOfStockItems.push(item.product_name || 'Unknown product');
          continue;
        }

        // Product is inactive / deleted
        if (product.status && product.status !== 'active') {
          outOfStockItems.push(item.product_name);
          continue;
        }

        // Check variant stock if variant metadata is available
        const variantId = item.metadata?.variant_id;
        if (variantId) {
          const { data: variant } = await supabaseAdmin
            .from('product_variants')
            .select('quantity')
            .eq('id', variantId)
            .single();

          if (variant && typeof variant.quantity === 'number' && variant.quantity < item.quantity) {
            outOfStockItems.push(`${item.product_name}${item.variant_name ? ` (${item.variant_name})` : ''}`);
            continue;
          }
        }

        // Check overall product stock (variant items were checked above)
        if (!variantId && product.track_quantity !== false && typeof product.quantity === 'number' && product.quantity < item.quantity) {
          outOfStockItems.push(item.product_name);
        }
      }
    }

    const { user_id: _userId, ...publicOrder } = order;
    return NextResponse.json({
      order: publicOrder,
      stockValid: outOfStockItems.length === 0,
      outOfStockItems,
    }, { headers: NO_STORE });
  } catch (err: any) {
    console.error('[Pay API] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
