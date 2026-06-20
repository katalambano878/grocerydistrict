import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { currencyForCountry, type CurrencyCode } from '@/lib/currency';
import { getExchangeRates } from '@/lib/exchange-rates';

function detectCountry(request: NextRequest): string {
  const fromCookie = request.cookies.get('gd-country')?.value;
  if (fromCookie && /^[A-Z]{2}$/i.test(fromCookie)) {
    return fromCookie.toUpperCase();
  }

  const vercel = request.headers.get('x-vercel-ip-country');
  if (vercel) return vercel.toUpperCase();

  const cloudflare = request.headers.get('cf-ipcountry');
  if (cloudflare && cloudflare !== 'XX') return cloudflare.toUpperCase();

  return 'GH';
}

export async function GET(request: NextRequest) {
  const countryCode = detectCountry(request);
  const currency = currencyForCountry(countryCode);
  const stored = await getExchangeRates();
  const rates = stored.rates;

  const response = NextResponse.json({
    countryCode,
    currency,
    baseCurrency: 'GBP',
    rates,
    ratesUpdatedAt: stored.updated_at,
  });

  if (!request.cookies.get('gd-country')?.value) {
    response.cookies.set('gd-country', countryCode, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
    });
  }

  return response;
}
