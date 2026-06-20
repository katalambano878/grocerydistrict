import { NextResponse } from 'next/server';
import { refreshExchangeRates, loadStoredExchangeRates } from '@/lib/exchange-rates';

/** Daily cron — refresh FX rates from ExchangeRate-API (GBP base). */
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.EXCHANGERATE_API_KEY) {
      return NextResponse.json(
        { error: 'EXCHANGERATE_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const before = await loadStoredExchangeRates();
    const updated = await refreshExchangeRates();

    return NextResponse.json({
      success: true,
      message: 'Exchange rates refreshed',
      previous_update: before?.updated_at ?? null,
      updated_at: updated.updated_at,
      rates: updated.rates,
      source: updated.source,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[cron/exchange-rates]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
