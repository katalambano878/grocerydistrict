'use client';

import { useCurrency } from '@/context/CurrencyContext';

type PriceProps = {
  /** Amount in GBP (catalog base currency). */
  amount: number | string | null | undefined;
  className?: string;
  prefix?: string;
  suffix?: string;
  showSymbol?: boolean;
};

/** Renders a GBP base price in the visitor's display currency. */
export default function Price({
  amount,
  className = '',
  prefix = '',
  suffix = '',
  showSymbol = true,
}: PriceProps) {
  const { formatPrice, isReady } = useCurrency();

  if (!isReady) {
    return <span className={className}>…</span>;
  }

  return (
    <span className={className}>
      {prefix}
      {formatPrice(amount, { showSymbol })}
      {suffix}
    </span>
  );
}
