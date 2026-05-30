/** Shared hero image paths for store pages (files live in /public). */
export const HERO_IMAGES = {
  groceries: '/hero-groceries.png',
  baby: '/hero-baby.png',
  household: '/hero-household.png',
  skincare: '/hero-skincare.png',
  contact: '/hero-contact.png',
  about: '/hero-about.png',
  faqs: '/hero-faqs.png',
  help: '/hero-help.png',
  blog: '/hero-blog.png',
  returns: '/hero-returns.png',
  shipping: '/hero-shipping.png',
  privacy: '/hero-privacy.png',
  terms: '/hero-terms.png',
} as const;

export type HeroImageKey = keyof typeof HERO_IMAGES;
