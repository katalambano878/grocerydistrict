export const CURRENCY_CODE = 'GHS';
export const CURRENCY_SYMBOL = 'GH₵';

export function formatPrice(
  amount: number | string | null | undefined,
  options?: { showSymbol?: boolean }
): string {
  const num = Number(amount) || 0;
  const formatted = num.toLocaleString('en-GH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return options?.showSymbol === false ? formatted : `${CURRENCY_SYMBOL}${formatted}`;
}

/** Paystack expects GHS amounts in pesewas (minor units). */
export function toPaystackMinorUnits(amount: number): number {
  return Math.round(amount * 100);
}
