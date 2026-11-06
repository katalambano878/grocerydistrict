'use client';

import { useCurrency } from '@/context/CurrencyContext';

type PriceProps = {
  /** Amount in GBP (catalog base currency). */
  amount: number | string | null | undefined;
  className?: string;
  prefix?: string;
  suffix?: string;
  showSymbol?: boolean;
  /** Shown instead of a zero/missing price, e.g. "Price on request" for unpriced products. */
  unpricedLabel?: string;
};

/** Renders a GBP base price in the visitor's display currency. */
export default function Price({
  amount,
  className = '',
  prefix = '',
  suffix = '',
  showSymbol = true,
  unpricedLabel,
}: PriceProps) {
  const { formatPrice, isReady } = useCurrency();

  if (unpricedLabel && !(Number(amount) > 0)) {
    return <span className={className}>{unpricedLabel}</span>;
  }

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
