'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  BASE_CURRENCY,
  DEFAULT_DISPLAY_CURRENCY,
  DEFAULT_EXCHANGE_RATES,
  buildCurrencyMeta,
  convertFromBase,
  convertToBase,
  convertToPaymentAmount,
  paymentCurrencyForCountry,
  formatPrice as formatPriceLib,
  type CurrencyCode,
  type CurrencyMeta,
} from '@/lib/currency';

type CurrencyContextValue = {
  baseCurrency: typeof BASE_CURRENCY;
  displayCurrency: CurrencyCode;
  countryCode: string | null;
  rates: Record<CurrencyCode, number>;
  meta: CurrencyMeta;
  isReady: boolean;
  formatPrice: (
    amountInBase: number | string | null | undefined,
    options?: { showSymbol?: boolean }
  ) => string;
  convertFromBase: (amountGbp: number) => number;
  convertToBase: (amountDisplay: number) => number;
  paymentCurrency: CurrencyCode;
  convertToPayment: (amountGbp: number) => number;
};

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [displayCurrency, setDisplayCurrency] = useState<CurrencyCode>(DEFAULT_DISPLAY_CURRENCY);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(DEFAULT_EXCHANGE_RATES);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Remove legacy manual currency preference from an earlier UI experiment.
    try {
      localStorage.removeItem('gd-display-currency');
    } catch {}

    async function init() {
      try {
        const res = await fetch('/api/currency/detect', { cache: 'no-store' });
        if (!res.ok) throw new Error('detect failed');
        const data: {
          countryCode?: string;
          currency?: CurrencyCode;
          rates?: Record<CurrencyCode, number>;
        } = await res.json();

        if (cancelled) return;

        if (data.rates) setRates({ ...DEFAULT_EXCHANGE_RATES, ...data.rates });
        if (data.countryCode) setCountryCode(data.countryCode);
        if (data.currency) setDisplayCurrency(data.currency);
      } catch {
        // Ghana is the primary market when geo detection fails.
      } finally {
        if (!cancelled) setIsReady(true);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const meta = useMemo(() => buildCurrencyMeta(displayCurrency, rates), [displayCurrency, rates]);

  const formatPrice = useMemo(
    () =>
      (amountInBase: number | string | null | undefined, options?: { showSymbol?: boolean }) =>
        formatPriceLib(amountInBase, {
          currency: displayCurrency,
          rates,
          showSymbol: options?.showSymbol,
        }),
    [displayCurrency, rates]
  );

  const convertFromBaseFn = useMemo(
    () => (amountGbp: number) => convertFromBase(amountGbp, displayCurrency, rates),
    [displayCurrency, rates]
  );

  const convertToBaseFn = useMemo(
    () => (amountDisplay: number) => convertToBase(amountDisplay, displayCurrency, rates),
    [displayCurrency, rates]
  );

  const paymentCurrency = useMemo(
    () => paymentCurrencyForCountry(countryCode),
    [countryCode]
  );

  const convertToPaymentFn = useMemo(
    () => (amountGbp: number) => convertToPaymentAmount(amountGbp, paymentCurrency, rates),
    [paymentCurrency, rates]
  );

  const value = useMemo<CurrencyContextValue>(
    () => ({
      baseCurrency: BASE_CURRENCY,
      displayCurrency,
      countryCode,
      rates,
      meta,
      isReady,
      formatPrice,
      convertFromBase: convertFromBaseFn,
      convertToBase: convertToBaseFn,
      paymentCurrency,
      convertToPayment: convertToPaymentFn,
    }),
    [
      displayCurrency,
      countryCode,
      rates,
      meta,
      isReady,
      formatPrice,
      convertFromBaseFn,
      convertToBaseFn,
      paymentCurrency,
      convertToPaymentFn,
    ]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return ctx;
}

export function useCurrencyOptional() {
  return useContext(CurrencyContext);
}
