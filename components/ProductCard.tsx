'use client';

import { useState } from 'react';
import Link from 'next/link';
import LazyImage from './LazyImage';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import Price from './Price';

const COLOR_MAP: Record<string, string> = {
  black: '#000000', white: '#FFFFFF', red: '#EF4444', blue: '#3B82F6',
  navy: '#1E3A5F', green: '#22C55E', yellow: '#EAB308', orange: '#F97316',
  pink: '#EC4899', purple: '#A855F7', brown: '#92400E', beige: '#D4C5A9',
  grey: '#6B7280', gray: '#6B7280', cream: '#FFFDD0', teal: '#14B8A6',
  maroon: '#800000', coral: '#FF7F50', burgundy: '#800020', olive: '#808000',
  tan: '#D2B48C', khaki: '#C3B091', charcoal: '#36454F', ivory: '#FFFFF0',
  gold: '#FFD700', silver: '#C0C0C0', rose: '#FF007F', lavender: '#E6E6FA',
  mint: '#98FB98', peach: '#FFDAB9', wine: '#722F37', denim: '#1560BD',
  nude: '#E3BC9A', camel: '#C19A6B', sage: '#BCB88A', rust: '#B7410E',
  mustard: '#FFDB58', plum: '#8E4585', lilac: '#C8A2C8', stone: '#928E85',
  sand: '#C2B280', taupe: '#483C32', mauve: '#E0B0FF', sky: '#87CEEB',
  forest: '#228B22', cobalt: '#0047AB', emerald: '#50C878', scarlet: '#FF2400',
  aqua: '#00FFFF', turquoise: '#40E0D0', indigo: '#4B0082', crimson: '#DC143C',
  magenta: '#FF00FF', cyan: '#00FFFF', chocolate: '#7B3F00', coffee: '#6F4E37',
};

export function getColorHex(colorName: string): string | null {
  const lower = colorName.toLowerCase().trim();
  if (COLOR_MAP[lower]) return COLOR_MAP[lower];
  for (const [key, val] of Object.entries(COLOR_MAP)) {
    if (lower.includes(key)) return val;
  }
  return null;
}

export interface ColorVariant {
  name: string;
  hex: string;
}

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  inStock?: boolean;
  maxStock?: number;
  moq?: number;
  hasVariants?: boolean;
  minVariantPrice?: number;
  colorVariants?: ColorVariant[];
}

export default function ProductCard({
  id,
  slug,
  name,
  price,
  originalPrice,
  image,
  badge,
  inStock = true,
  maxStock = 50,
  moq = 1,
  hasVariants = false,
  minVariantPrice,
  colorVariants = []
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const displayPrice = hasVariants && minVariantPrice ? minVariantPrice : price;
  const discount = originalPrice ? Math.round((1 - displayPrice / originalPrice) * 100) : 0;
  const MAX_SWATCHES = 4;

  return (
    <article className="group h-full w-full overflow-hidden rounded-lg sm:rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <Link
        href={`/product/${slug}`}
        className="relative block aspect-square overflow-hidden rounded-lg sm:rounded-2xl bg-white"
      >
        <LazyImage
          src={image}
          alt={name}
          className="h-full w-full"
          imageClassName="p-2 sm:p-3 transition-transform duration-700 group-hover:scale-[1.02]"
          objectFit="contain"
        />

        {badge && (
          <span className="absolute left-1.5 top-1.5 sm:left-3 sm:top-3 rounded-full bg-white/95 px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.08em] sm:tracking-[0.12em] text-gray-800 shadow-sm">
            {badge}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute right-1.5 top-1.5 sm:right-3 sm:top-3 rounded-full bg-brand-brown px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] font-semibold text-white shadow-sm">
            -{discount}%
          </span>
        )}

        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[2px]">
            <span className="rounded-full bg-[#2B2C86] px-2.5 py-1 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold text-white">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      <div className="p-2 sm:p-3 lg:p-4">
        <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.15em] text-brand-carton font-semibold mb-0.5 sm:mb-1 line-clamp-1">
          {badge || 'Grocery District'}
        </p>

        <Link href={`/product/${slug}`}>
          <h3 className="text-[11px] sm:text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-brand-brown transition-colors">
            {name}
          </h3>
        </Link>

        {colorVariants.length > 0 && (
          <div className="mt-1.5 sm:mt-2 flex items-center gap-1 sm:gap-1.5">
            {colorVariants.slice(0, MAX_SWATCHES).map((color) => (
              <button
                key={color.name}
                title={color.name}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveColor(activeColor === color.name ? null : color.name);
                }}
                className={`h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0 rounded-full border transition-all duration-200 ${
                  activeColor === color.name
                    ? 'scale-110 ring-2 ring-brand-carton ring-offset-1'
                    : 'hover:scale-110'
                } ${color.hex === '#FFFFFF' ? 'border-gray-300' : 'border-transparent'}`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
            {colorVariants.length > MAX_SWATCHES && (
              <span className="ml-0.5 text-[9px] sm:text-[10px] text-gray-400">+{colorVariants.length - MAX_SWATCHES}</span>
            )}
          </div>
        )}

        <div className="mt-1.5 sm:mt-2 flex items-center justify-between gap-1">
          <div className="flex min-w-0 flex-col sm:flex-row sm:items-baseline sm:gap-2">
            <span className="text-[11px] sm:text-sm font-bold text-gray-900 truncate">
              {hasVariants && minVariantPrice ? (
                <>From <Price amount={minVariantPrice} /></>
              ) : (
                <Price amount={price} />
              )}
            </span>
            {originalPrice && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                <Price amount={originalPrice} />
              </span>
            )}
          </div>

          {hasVariants ? (
            <Link
              href={`/product/${slug}`}
              className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-brand-carton text-white hover:bg-brand-brown transition-colors text-xs sm:text-sm shrink-0"
            >
              <i className="ri-arrow-right-line" />
            </Link>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                if (inStock) addToCart({ id, name, price, image, quantity: moq, slug, maxStock, moq });
              }}
              disabled={!inStock}
              className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-brand-carton text-white hover:bg-brand-brown transition-colors text-xs sm:text-sm shrink-0 disabled:bg-gray-300 disabled:cursor-not-allowed"
              aria-label={moq > 1 ? `Add ${moq} to cart` : 'Add to cart'}
            >
              <i className="ri-shopping-bag-3-line" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
