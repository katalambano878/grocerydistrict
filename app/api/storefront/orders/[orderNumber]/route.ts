import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rate-limit';

const NO_STORE = { 'Cache-Control': 'private, no-store' };

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  const { orderNumber } = await params;
  const limit = checkRateLimit(`order-lookup:${getClientIdentifier(request)}`, RATE_LIMITS.orderLookup);
  if (!limit.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: NO_STORE });
  }

  if (!orderNumber) {
    return NextResponse.json({ error: 'Order number required' }, { status: 400 });
  }

  try {
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('*, order_items(*)')
      .eq('order_number', orderNumber)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // user_id is internal; the rest is what the confirmation page shows.
    const { user_id: _userId, ...publicOrder } = order;
    return NextResponse.json({ order: publicOrder }, { headers: NO_STORE });
  } catch (e: any) {
    console.error('Order fetch error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
