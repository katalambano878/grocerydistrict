/**
 * ExchangeRate-API integration — GBP base, cached in store_settings.
 * https://www.exchangerate-api.com/docs/free
 */
import { supabaseAdmin } from '@/lib/supabase-admin';
import {
  BASE_CURRENCY,
  DEFAULT_EXCHANGE_RATES,
  type CurrencyCode,
} from '@/lib/currency';

const SUPPORTED: CurrencyCode[] = ['GBP', 'GHS', 'USD', 'EUR', 'NGN'];
const SETTINGS_KEY = 'exchange_rates';
const STALE_MS = 24 * 60 * 60 * 1000; // once per day

export type StoredExchangeRates = {
  base: typeof BASE_CURRENCY;
  rates: Record<CurrencyCode, number>;
  updated_at: string;
  source: 'exchangerate-api' | 'fallback';
};

function pickRates(raw: Record<string, number>): Record<CurrencyCode, number> {
  const rates = { ...DEFAULT_EXCHANGE_RATES };
  for (const code of SUPPORTED) {
    if (code === 'GBP') {
      rates.GBP = 1;
    } else if (typeof raw[code] === 'number' && raw[code] > 0) {
      rates[code] = raw[code];
    }
  }
  return rates;
}

export async function fetchRatesFromApi(): Promise<Record<CurrencyCode, number>> {
  const apiKey = process.env.EXCHANGERATE_API_KEY;
  if (!apiKey) {
    throw new Error('Missing EXCHANGERATE_API_KEY');
  }

  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${BASE_CURRENCY}`,
    { next: { revalidate: 0 } }
  );

  if (!res.ok) {
    throw new Error(`ExchangeRate-API error: ${res.status}`);
  }

  const data = await res.json();
  if (data.result !== 'success' || !data.conversion_rates) {
    throw new Error(data['error-type'] || 'ExchangeRate-API returned no rates');
  }

  return pickRates(data.conversion_rates as Record<string, number>);
}

export async function saveExchangeRates(
  rates: Record<CurrencyCode, number>,
  source: StoredExchangeRates['source'] = 'exchangerate-api'
): Promise<StoredExchangeRates> {
  const payload: StoredExchangeRates = {
    base: BASE_CURRENCY,
    rates,
    updated_at: new Date().toISOString(),
    source,
  };

  const { error } = await supabaseAdmin.from('store_settings').upsert(
    {
      key: SETTINGS_KEY,
      value: payload,
      description: 'Live FX rates (GBP base) from ExchangeRate-API',
    },
    { onConflict: 'key' }
  );

  if (error) throw error;
  return payload;
}

export async function loadStoredExchangeRates(): Promise<StoredExchangeRates | null> {
  const { data, error } = await supabaseAdmin
    .from('store_settings')
    .select('value')
    .eq('key', SETTINGS_KEY)
    .maybeSingle();

  if (error || !data?.value) return null;

  const v = data.value as StoredExchangeRates;
  if (!v.rates || typeof v.rates !== 'object') return null;

  return {
    base: BASE_CURRENCY,
    rates: pickRates(v.rates as Record<string, number>),
    updated_at: v.updated_at || new Date(0).toISOString(),
    source: v.source || 'exchangerate-api',
  };
}

export function isRatesStale(updatedAt: string | null | undefined): boolean {
  if (!updatedAt) return true;
  return Date.now() - new Date(updatedAt).getTime() > STALE_MS;
}

/** Fetch from API and persist. Used by daily cron and manual scripts. */
export async function refreshExchangeRates(): Promise<StoredExchangeRates> {
  try {
    const rates = await fetchRatesFromApi();
    return saveExchangeRates(rates, 'exchangerate-api');
  } catch (err) {
    console.error('[exchange-rates] API fetch failed, using defaults:', err);
    return saveExchangeRates(DEFAULT_EXCHANGE_RATES, 'fallback');
  }
}

/**
 * Load cached rates; refresh from API if missing or older than 24h.
 */
export async function getExchangeRates(options?: {
  forceRefresh?: boolean;
}): Promise<StoredExchangeRates> {
  const stored = await loadStoredExchangeRates();

  if (!options?.forceRefresh && stored && !isRatesStale(stored.updated_at)) {
    return stored;
  }

  if (process.env.EXCHANGERATE_API_KEY) {
    return refreshExchangeRates();
  }

  if (stored) return stored;

  return {
    base: BASE_CURRENCY,
    rates: DEFAULT_EXCHANGE_RATES,
    updated_at: new Date().toISOString(),
    source: 'fallback',
  };
}

export async function getRatesMap(): Promise<Record<CurrencyCode, number>> {
  const stored = await getExchangeRates();
  return stored.rates;
}
