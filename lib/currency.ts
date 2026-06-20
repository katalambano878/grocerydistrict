/**
 * Geo-currency: all catalog prices are stored in GBP (base).
 * Storefront converts to the visitor's display currency by country / manual choice.
 */

export const BASE_CURRENCY = 'GBP' as const;

export type CurrencyCode = 'GBP' | 'GHS' | 'USD' | 'EUR' | 'NGN';

export type CurrencyMeta = {
  code: CurrencyCode;
  symbol: string;
  name: string;
  locale: string;
  /** Multiply GBP amount by this rate to get display amount. */
  rateFromBase: number;
};

/** Default FX rates vs GBP — override via store_settings or env. */
export const DEFAULT_EXCHANGE_RATES: Record<CurrencyCode, number> = {
  GBP: 1,
  GHS: Number(process.env.NEXT_PUBLIC_GHS_RATE) || 16.5,
  USD: Number(process.env.NEXT_PUBLIC_USD_RATE) || 1.27,
  EUR: Number(process.env.NEXT_PUBLIC_EUR_RATE) || 1.17,
  NGN: Number(process.env.NEXT_PUBLIC_NGN_RATE) || 1950,
};

export const CURRENCY_META: Record<CurrencyCode, Omit<CurrencyMeta, 'rateFromBase'>> = {
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
  GHS: { code: 'GHS', symbol: 'GH₵', name: 'Ghana Cedi', locale: 'en-GH' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', locale: 'en-IE' },
  NGN: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', locale: 'en-NG' },
};

/** ISO 3166-1 alpha-2 → display currency for geo detection. */
export const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  GB: 'GBP',
  GH: 'GHS',
  US: 'USD',
  NG: 'NGN',
  IE: 'EUR',
  DE: 'EUR',
  FR: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  PT: 'EUR',
  AT: 'EUR',
};

/** Primary market default when geo is unknown. */
export const DEFAULT_DISPLAY_CURRENCY: CurrencyCode = 'GHS';

export function currencyForCountry(countryCode: string | null | undefined): CurrencyCode {
  if (!countryCode) return DEFAULT_DISPLAY_CURRENCY;
  return COUNTRY_CURRENCY[countryCode.toUpperCase()] ?? DEFAULT_DISPLAY_CURRENCY;
}

export function buildCurrencyMeta(
  code: CurrencyCode,
  rates: Record<CurrencyCode, number> = DEFAULT_EXCHANGE_RATES
): CurrencyMeta {
  return {
    ...CURRENCY_META[code],
    rateFromBase: rates[code] ?? DEFAULT_EXCHANGE_RATES[code],
  };
}

/** Convert a GBP (base) amount to a display currency. */
export function convertFromBase(
  amountGbp: number,
  to: CurrencyCode,
  rates: Record<CurrencyCode, number> = DEFAULT_EXCHANGE_RATES
): number {
  const rate = rates[to] ?? DEFAULT_EXCHANGE_RATES[to];
  return amountGbp * rate;
}

/** Convert a display-currency amount back to GBP base. */
export function convertToBase(
  amount: number,
  from: CurrencyCode,
  rates: Record<CurrencyCode, number> = DEFAULT_EXCHANGE_RATES
): number {
  const rate = rates[from] ?? DEFAULT_EXCHANGE_RATES[from];
  if (!rate) return amount;
  return amount / rate;
}

export function formatPrice(
  amountInBase: number | string | null | undefined,
  options?: {
    currency?: CurrencyCode;
    rates?: Record<CurrencyCode, number>;
    showSymbol?: boolean;
    /** When true, amount is already in display currency (admin preview). */
    amountIsDisplay?: boolean;
  }
): string {
  const currency = options?.currency ?? DEFAULT_DISPLAY_CURRENCY;
  const rates = options?.rates ?? DEFAULT_EXCHANGE_RATES;
  const raw = Number(amountInBase) || 0;
  const displayAmount = options?.amountIsDisplay
    ? raw
    : convertFromBase(raw, currency, rates);

  const meta = CURRENCY_META[currency];
  const formatted = displayAmount.toLocaleString(meta.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (options?.showSymbol === false) return formatted;
  return `${meta.symbol}${formatted}`;
}

/** Currency used at checkout / Paystack for a given country. */
export function paymentCurrencyForCountry(countryCode: string | null | undefined): CurrencyCode {
  const code = countryCode?.toUpperCase();
  if (code === 'GH') return 'GHS';
  if (code === 'GB') return 'GBP';
  if (code === 'US') return 'USD';
  if (code === 'NG') return 'NGN';
  return 'GHS';
}

/** Minor units for payment gateways (pesewas, pence, cents, etc.). */
export function toPaymentMinorUnits(amount: number, currency: CurrencyCode): number {
  return Math.round(amount * 100);
}

/** Format a GBP base amount for admin (no conversion). */
export function formatBasePrice(
  amount: number | string | null | undefined,
  options?: { showSymbol?: boolean }
): string {
  return formatPrice(amount, { currency: 'GBP', amountIsDisplay: true, showSymbol: options?.showSymbol });
}

/** Convert GBP base amount to payment currency (e.g. GHS for Paystack). */
export function convertToPaymentAmount(
  amountGbp: number,
  paymentCurrency: CurrencyCode,
  rates: Record<CurrencyCode, number> = DEFAULT_EXCHANGE_RATES
): number {
  return convertFromBase(amountGbp, paymentCurrency, rates);
}

/** @deprecated Use formatPrice with currency context. Kept for gradual migration. */
export const CURRENCY_CODE = DEFAULT_DISPLAY_CURRENCY;
export const CURRENCY_SYMBOL = CURRENCY_META.GHS.symbol;
