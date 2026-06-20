import { NextResponse } from 'next/server';
import { getExchangeRates } from '@/lib/exchange-rates';

export async function GET() {
  try {
    const stored = await getExchangeRates();
    return NextResponse.json({
      baseCurrency: stored.base,
      rates: stored.rates,
      updatedAt: stored.updated_at,
      source: stored.source,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
