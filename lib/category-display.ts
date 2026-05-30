import { HERO_IMAGES } from '@/lib/hero-images';

type CategoryRow = {
  id?: string;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  metadata?: Record<string, unknown> | null;
  position?: number | null;
};

const SLUG_IMAGE_MAP: Record<string, string> = {
  'uk-usa-groceries': HERO_IMAGES.groceries,
  groceries: HERO_IMAGES.groceries,
  'baby-essentials': HERO_IMAGES.baby,
  baby: HERO_IMAGES.baby,
  'household-detergent': HERO_IMAGES.household,
  household: HERO_IMAGES.household,
  'skincare-beauty': HERO_IMAGES.skincare,
  skincare: HERO_IMAGES.skincare,
};

const SLUG_ICON_MAP: Record<string, string> = {
  'uk-usa-groceries': 'ri-store-2-line',
  groceries: 'ri-store-2-line',
  'baby-essentials': 'ri-bear-smile-line',
  baby: 'ri-bear-smile-line',
  'household-detergent': 'ri-home-smile-line',
  household: 'ri-home-smile-line',
  'skincare-beauty': 'ri-sparkling-2-line',
  skincare: 'ri-sparkling-2-line',
};

const STYLE_CYCLE = [
  { color: 'bg-[#2B2C86]', icon: 'ri-shopping-bag-3-line' },
  { color: 'bg-[#E6308A]', icon: 'ri-shopping-basket-2-line' },
  { color: 'bg-[#2B2C86]', icon: 'ri-store-2-line' },
  { color: 'bg-[#E6308A]', icon: 'ri-sparkling-2-line' },
];

function resolveImage(slug: string, imageUrl?: string | null): string | null {
  if (imageUrl) return imageUrl;
  return SLUG_IMAGE_MAP[slug] || null;
}

function resolveIcon(slug: string, metadata?: Record<string, unknown> | null): string {
  const fromMeta = typeof metadata?.icon === 'string' ? metadata.icon : null;
  if (fromMeta) return fromMeta;
  return SLUG_ICON_MAP[slug] || 'ri-shopping-bag-3-line';
}

export function enrichCategoryForDisplay(category: CategoryRow, index = 0) {
  const style = STYLE_CYCLE[index % STYLE_CYCLE.length];
  const metadata = category.metadata || {};

  return {
    ...category,
    image_url: resolveImage(category.slug, category.image_url),
    chip: typeof metadata.chip === 'string' ? metadata.chip : null,
    icon: resolveIcon(category.slug, metadata),
    color:
      (typeof metadata.color === 'string' ? metadata.color : null) || style.color,
  };
}
