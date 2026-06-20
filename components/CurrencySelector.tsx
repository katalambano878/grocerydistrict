'use client';

import { useEffect, useRef, useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { CURRENCY_META, type CurrencyCode } from '@/lib/currency';

export default function CurrencySelector({
  compact = false,
  isScrolled = false,
}: {
  compact?: boolean;
  isScrolled?: boolean;
}) {
  const { displayCurrency, setDisplayCurrency, selectableCurrencies, isReady } = useCurrency();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const shellClass = isScrolled
    ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
    : 'border-[#2B2C86]/15 bg-[#2B2C86]/[0.05] text-[#2B2C86]/75 hover:bg-[#2B2C86]/10';

  if (!isReady) {
    return (
      <span
        className={`inline-flex items-center rounded-lg px-2 py-1 text-xs font-semibold opacity-50 ${shellClass} ${compact ? 'h-8' : 'h-9'}`}
        aria-hidden
      >
        …
      </span>
    );
  }

  const current = CURRENCY_META[displayCurrency];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 rounded-lg border px-2.5 font-semibold backdrop-blur-sm transition ${shellClass} ${
          compact ? 'h-8 text-xs' : 'h-9 text-sm'
        }`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Currency: ${current.name}. Change currency.`}
      >
        <span>{current.symbol}</span>
        <span className="hidden sm:inline">{displayCurrency}</span>
        <i className={`ri-arrow-down-s-line text-base transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-[100] mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-xl"
        >
          {selectableCurrencies.map((code) => {
            const meta = CURRENCY_META[code];
            const selected = code === displayCurrency;
            return (
              <li key={code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    setDisplayCurrency(code as CurrencyCode);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition hover:bg-gray-50 ${
                    selected ? 'bg-brand-carton/10 font-semibold text-brand-carton' : 'text-gray-800'
                  }`}
                >
                  <span>
                    {meta.symbol} {code}
                  </span>
                  <span className="text-xs text-gray-500">{meta.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
