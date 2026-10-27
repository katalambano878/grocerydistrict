import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { requireStaff } from '@/lib/auth';
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  const limit = checkRateLimit(`feedback:${getClientIdentifier(req)}`, RATE_LIMITS.notification);
  if (!limit.success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const body = await req.json().catch(() => null);
  const rating = Number(body?.rating);
  if (!body || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Rating must be a whole number from 1 to 5' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('support_feedback')
    .insert({
      conversation_id: body.conversation_id || null,
      ticket_id: body.ticket_id || null,
      customer_id: body.customer_id || null,
      customer_email: body.customer_email || null,
      rating,
      feedback_text: body.feedback_text ? String(body.feedback_text).slice(0, 2000) : null,
      feedback_categories: body.feedback_categories || [],
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const denied = await requireStaff(req);
  if (denied) return denied;
  const { data, error } = await supabaseAdmin
    .from('support_feedback')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
