'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useCMS } from '@/context/CMSContext';
import ProductCard, {
  type ColorVariant,
  getColorHex,
} from '@/components/ProductCard';
import AnimatedSection, { AnimatedGrid } from '@/components/AnimatedSection';
import { usePageTitle } from '@/hooks/usePageTitle';
import { enrichCategoryForDisplay } from '@/lib/category-display';
import type { CategoryRecord } from '@/lib/categories';

type HomePageClientProps = {
  initialCategories: CategoryRecord[];
};

export default function HomePageClient({ initialCategories }: HomePageClientProps) {
  usePageTitle('');
  const { getSetting, getActiveBanners } = useCMS();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  // const [latestProducts, setLatestProducts] = useState<any[]>([]); // Fresh arrivals section (disabled)
  const [loading, setLoading] = useState(true);
  const heroSlides = [
    {
      src: '/hero-1.png',
      alt: 'Grocery District — UK and USA groceries, baby care, household and skincare products',
      position: '50% 42%',
    },
    {
      src: '/hero-2.png',
      alt: 'Shop groceries and essentials at Grocery District — wholesale, retail and delivery in Accra',
      position: '72% 58%',
    },
  ];
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const featuredResult = await supabase
          .from('products')
          .select('*, product_variants(*), product_images(*)')
          .eq('status', 'active')
          .eq('featured', true)
          .order('created_at', { ascending: false })
          .limit(4);

        if (featuredResult.error) throw featuredResult.error;

        if (featuredResult.data?.length) {
          setFeaturedProducts(featuredResult.data);
        } else {
          const fallbackResult = await supabase
            .from('products')
            .select('*, product_variants(*), product_images(*)')
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(4);

          if (fallbackResult.error) throw fallbackResult.error;
          setFeaturedProducts(fallbackResult.data || []);
        }

        /* Fresh arrivals carousel — re-enable with section below
        const latestResult = await supabase
          .from('products')
          .select('*, product_variants(*), product_images(*)')
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(12);

        if (latestResult.error) throw latestResult.error;
        setLatestProducts(latestResult.data || []);
        */
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const heroHeadline =
    getSetting('hero_headline') || 'UK & USA Groceries, Delivered Across Accra';
  const heroSubheadline =
    getSetting('hero_subheadline') ||
    'Your neighbourhood supermarket for imported groceries, baby essentials, household products and skincare — wholesale and retail, with delivery to your door.';
  const heroPrimaryText = getSetting('hero_primary_btn_text') || 'Shop Now';
  const heroPrimaryLink = getSetting('hero_primary_btn_link') || '/shop';
  const heroSecondaryText =
    getSetting('hero_secondary_btn_text') || 'Browse Categories';
  const heroSecondaryLink = getSetting('hero_secondary_btn_link') || '/categories';

  const activeBanners = getActiveBanners('top');

  const renderBanners = () => {
    if (activeBanners.length === 0) return null;
    return (
      <div className="bg-brand-brown text-white py-2 overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {activeBanners.concat(activeBanners).map((banner, index) => (
            <span
              key={index}
              className="mx-8 text-sm font-medium tracking-wide flex items-center"
            >
              {banner.title}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const popularProducts = featuredProducts.slice(0, 4);
  const vibeCategories = initialCategories
    .slice(0, 4)
    .map((category, index) => enrichCategoryForDisplay(category, index));

  return (
    <main className="flex-col items-center justify-between min-h-screen bg-white">
      {renderBanners()}

      <section className="relative w-full min-h-[92vh] sm:min-h-[83vmin] md:min-h-[93vmin] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentHeroSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                quality={90}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: slide.position }}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-[#2B2C86]/45" aria-hidden="true" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-center">
          <span className="inline-flex items-center rounded-full bg-white/15 border border-white/25 px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/95 mb-4 sm:mb-5">
            Grocery District · Accra
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] font-extrabold leading-tight text-white drop-shadow-sm max-w-3xl mx-auto">
            {heroHeadline}
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/90 max-w-xl mx-auto px-2 sm:px-0">
            {heroSubheadline}
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href={heroPrimaryLink}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#E6308A] px-6 py-2.5 sm:px-9 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg hover:bg-[#c9287a] transition-colors"
            >
              {heroPrimaryText}
              <i className="ri-arrow-right-up-line ml-2 text-base" />
            </Link>
            <Link
              href={heroSecondaryLink}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border-2 border-white/50 px-6 py-2.5 sm:px-9 sm:py-3 text-sm sm:text-base font-semibold text-white hover:bg-white hover:text-gray-900 transition-colors"
            >
              {heroSecondaryText}
            </Link>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2">
            {heroSlides.map((slide, index) => (
              <button
                key={`dot-${slide.src}`}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                aria-current={index === currentHeroSlide ? 'true' : undefined}
                onClick={() => setCurrentHeroSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentHeroSlide ? 'w-6 bg-white' : 'w-2 bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection className="bg-white py-12 sm:py-16 border-b border-brand-carton/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-7 sm:mb-9">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="h-px w-8 bg-brand-carton" />
                <p className="text-[11px] font-bold tracking-[0.28em] text-brand-carton uppercase">
                  Shop by category
                </p>
              </div>
              <h2 className="text-2xl sm:text-[2rem] font-extrabold tracking-tight text-brand-brown leading-tight">
                Find what you need
              </h2>
              <p className="mt-2 text-sm text-brand-brown/50 max-w-md">
                Browse our most-loved aisles and stock up on everyday essentials.
              </p>
            </div>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 self-start rounded-full bg-brand-brown px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm hover:bg-[#222370] transition-colors"
            >
              Browse full catalogue
              <i className="ri-arrow-right-line group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {vibeCategories.length > 0 ? vibeCategories.map((item, index) => (
              <Link
                key={item.id}
                href={`/shop?category=${encodeURIComponent(item.slug)}`}
                className="group relative flex h-40 sm:h-52 flex-col justify-end overflow-hidden rounded-3xl ring-1 ring-brand-brown/10 shadow-sm transition-all duration-500 hover:ring-2 hover:ring-brand-carton/60 hover:shadow-xl hover:shadow-brand-brown/10"
              >
                {item.image_url ? (
                  <>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B2C86]/95 via-[#2B2C86]/55 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-black/70 via-black/35 to-transparent" />
                  </>
                ) : (
                  <>
                    <div className={`absolute inset-0 ${item.color}`} />
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_78%_15%,#fff,transparent_46%)]" />
                    <div className="absolute -right-8 -bottom-12 h-40 w-40 rounded-full bg-white/10 blur-2xl transition-colors duration-500 group-hover:bg-white/20" />
                  </>
                )}

                <span className="pointer-events-none absolute top-2 left-4 select-none text-[42px] font-black leading-none text-white/10">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="absolute top-3 right-3 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md transition-all duration-500 group-hover:bg-white group-hover:text-brand-brown">
                  <i className={`${item.icon} text-lg sm:text-xl`} />
                </div>

                <div className="relative z-10 p-4 sm:p-5">
                  {item.chip ? (
                    <span className="inline-flex items-center rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white ring-1 ring-white/25 backdrop-blur-md [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
                      {item.chip}
                    </span>
                  ) : null}
                  <h3
                    className={`${item.chip ? 'mt-2' : ''} text-lg sm:text-xl font-bold leading-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_2px_10px_rgba(0,0,0,0.55)]`}
                  >
                    {item.name}
                  </h3>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-semibold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.75)] transition-colors group-hover:text-white/95">
                    Shop now
                    <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            )) : (
              <p className="col-span-full text-center text-sm text-brand-brown/60 py-8">
                Categories will appear here once added in the admin panel.
              </p>
            )}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-brand-carton uppercase">
                Trending now
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-gray-900">
                Featured products
              </h2>
            </div>
            <Link
              href="/shop?sort=bestsellers"
              className="inline-flex items-center text-sm font-medium text-gray-800 hover:text-brand-brown"
            >
              View bestselling products
              <i className="ri-arrow-right-line ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-2xl mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <AnimatedGrid className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {popularProducts.map((product) => {
                const variants = product.product_variants || [];
                const hasVariants = variants.length > 0;
                const minVariantPrice = hasVariants
                  ? Math.min(
                      ...variants.map((v: any) => v.price || product.price)
                    )
                  : undefined;
                const totalVariantStock = hasVariants
                  ? variants.reduce(
                      (sum: number, v: any) => sum + (v.quantity || 0),
                      0
                    )
                  : 0;
                const effectiveStock = hasVariants
                  ? totalVariantStock
                  : product.quantity;

                const colorVariants: ColorVariant[] = [];
                const seenColors = new Set<string>();
                for (const v of variants) {
                  const colorName = (v as any).option2;
                  if (
                    colorName &&
                    !seenColors.has(colorName.toLowerCase().trim())
                  ) {
                    const hex = getColorHex(colorName);
                    if (hex) {
                      seenColors.add(colorName.toLowerCase().trim());
                      colorVariants.push({ name: colorName.trim(), hex });
                    }
                  }
                }

                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    slug={product.slug}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.compare_at_price}
                    image={
                      product.product_images?.[0]?.url ||
                      'https://via.placeholder.com/400x500'
                    }
                    rating={product.rating_avg || 5}
                    reviewCount={product.review_count || 0}
                    badge={product.featured ? 'Featured' : 'Trending'}
                    inStock={effectiveStock > 0}
                    maxStock={effectiveStock || 50}
                    moq={product.moq || 1}
                    hasVariants={hasVariants}
                    minVariantPrice={minVariantPrice}
                    colorVariants={colorVariants}
                  />
                );
              })}
            </AnimatedGrid>
          )}
        </div>
      </AnimatedSection>

      {/* FRESH ARRIVALS SECTION — disabled; uncomment block below to re-enable
      <AnimatedSection className="bg-brand-cream/55 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-brand-brown uppercase">
                Just landed
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-brand-brown">
                Fresh arrivals & restocks
              </h2>
            </div>
            <p className="text-sm text-brand-brown/85 max-w-md">
              Discover newly sourced products for personal use, resale,
              or business growth — all at affordable prices.
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex gap-4 animate-just-landed-scroll pb-2 [--card-width:240px] hover:[animation-play-state:paused]">
              {[...(latestProducts.length ? latestProducts : popularProducts), ...(latestProducts.length ? latestProducts : popularProducts)].map(
                (product, index) => (
                  <div
                    key={`${product.id}-${index}`}
                    className="min-w-[180px] sm:min-w-[220px] max-w-[260px] w-[var(--card-width)] flex-shrink-0 rounded-xl sm:rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-white">
                      <Image
                        src={
                          product.product_images?.[0]?.url ||
                          'https://via.placeholder.com/400x500'
                        }
                        alt={product.name}
                        fill
                        className="object-contain object-center p-2 sm:p-3"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs uppercase tracking-wide text-brand-carton mb-1">
                        New drop
                      </p>
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                        {product.name}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-900">
                          {formatPrice(product.price || 0)}
                        </span>
                        <Link
                          href={`/product/${product.slug}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-carton text-white hover:bg-brand-brown text-sm"
                        >
                          <i className="ri-arrow-right-line" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </AnimatedSection>
      */}

      <AnimatedSection className="bg-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <p className="text-xs font-semibold tracking-[0.25em] text-brand-carton uppercase">
              Why customers stay with us
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
              Your trusted everyday supermarket
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              Genuine UK & USA groceries, baby care, household and skincare — available wholesale
              and retail, with reliable delivery across Accra and nationwide in Ghana.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
            {[
              {
                icon: 'ri-shield-check-line',
                title: 'Genuine products',
                body: 'Authentic UK & USA brands you can trust, carefully checked before they reach you.',
              },
              {
                icon: 'ri-truck-line',
                title: 'Delivery & pickup',
                body: 'We deliver across Accra and nationwide, or you can shop in-store. Open 7 days a week.',
              },
              {
                icon: 'ri-store-2-line',
                title: 'Wholesale & retail',
                body: 'Buy a single item or stock up in bulk — fair prices for homes and businesses alike.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-2xl border border-brand-carton/10 bg-brand-cream/40 p-6"
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-carton/25 blur-2xl pointer-events-none" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-carton text-white shadow-md">
                    <i className={`${item.icon} text-xl`} />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <section className="pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#2B2C86] text-white border border-[#2B2C86] shadow-[0_16px_45px_rgba(43,44,134,0.25)] flex flex-col md:flex-row items-center md:items-center">
            <div className="relative w-full md:w-3/5 px-5 sm:px-7 py-5 sm:py-6 flex flex-col justify-center space-y-2 text-center md:text-left">
              <span className="inline-flex items-center text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-white/80">
                Shop with Grocery District
              </span>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] font-extrabold leading-snug">
                Genuine groceries and essentials, without breaking the bank.
              </h3>
              <p className="text-xs sm:text-sm text-white/75 max-w-md mx-auto md:mx-0 leading-relaxed">
                Whether it&apos;s for your home, your baby, or your business — shop wholesale or
                retail and let us deliver across Accra and Ghana.
              </p>
              <div className="pt-1 flex flex-wrap gap-2.5 justify-center md:justify-start">
                <Link
                  href="/shop"
                  className="inline-flex items-center rounded-full bg-white text-[#2B2C86] px-6 py-2 text-sm font-semibold shadow-lg hover:bg-[#F3F3F3] transition-colors"
                >
                  Start shopping
                  <i className="ri-arrow-right-up-line ml-2" />
                </Link>
                <Link
                  href="/account"
                  className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  Create an account
                </Link>
              </div>
            </div>
            <div className="relative w-full md:w-2/5 h-40 sm:h-44 md:h-48 lg:h-52 shrink-0">
              <Image
                src="/cta-basket.png"
                alt="Fresh groceries in a shopping basket at Grocery District"
                fill
                className="object-cover object-center md:rounded-r-2xl sm:md:rounded-r-3xl rounded-b-2xl sm:rounded-b-3xl md:rounded-bl-none"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
