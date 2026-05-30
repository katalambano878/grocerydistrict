import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import PageHero from '@/components/PageHero';
import { HERO_IMAGES } from '@/lib/hero-images';
import { enrichCategoryForDisplay } from '@/lib/category-display';

export const revalidate = 0; // Ensure fresh data on every visit

export default async function CategoriesPage() {
  const { data: categoriesData } = await supabase
    .from('categories')
    .select(`
      id,
      name,
      slug,
      description,
      image_url,
      position
    `)
    .eq('status', 'active')
    .order('position', { ascending: true });

  const categories = categoriesData?.map((c, i) => {
    const enriched = enrichCategoryForDisplay(c, i);
    return {
      ...enriched,
      image: enriched.image_url || HERO_IMAGES.groceries,
      productCount: 'Browse',
    };
  }) || [];

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        title="Shop by Category"
        subtitle="Explore our curated collections and find exactly what you're looking for"
        image={HERO_IMAGES.groceries}
        objectPosition="50% 42%"
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="group bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="relative h-28 sm:h-40 lg:h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 ${category.color} opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                </div>
                <div className="p-3 sm:p-5 lg:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 shrink-0 ${category.color} rounded-full flex items-center justify-center`}>
                      <i className={`${category.icon} text-sm sm:text-lg lg:text-2xl text-white`}></i>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-base lg:text-xl font-bold text-gray-900 leading-tight line-clamp-2">{category.name}</h3>
                      <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500">Collection</p>
                    </div>
                  </div>
                  <p className="hidden sm:block text-gray-600 leading-relaxed text-xs lg:text-sm mb-3 lg:mb-4 line-clamp-2">
                    {category.description || 'Explore our exclusive collection in this category.'}
                  </p>
                  <div className="flex items-center text-[#2B2C86] font-medium text-[10px] sm:text-xs lg:text-sm group-hover:gap-2 transition-all">
                    <span className="line-clamp-1">Browse</span>
                    <i className="ri-arrow-right-line ml-1 sm:ml-2 shrink-0"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <i className="ri-inbox-line text-5xl text-gray-300 mb-4"></i>
            <p className="text-xl text-gray-500">No categories found.</p>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 sm:pb-20">
        <div className="relative overflow-hidden bg-[#2B2C86] rounded-[1.75rem] sm:rounded-[2rem] py-10 sm:py-12 px-6">
          {/* Decorative layers */}
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle,#fff_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
          </div>

          <div className="relative max-w-2xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E9DEC4] mb-4">
              <i className="ri-compass-3-line text-xs text-[#E6308A]" />
              We&apos;re here to help
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white tracking-tight">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/65 leading-relaxed max-w-lg mx-auto">
              Try our advanced search or talk to our team for personalised product recommendations.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-[#2B2C86] shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <i className="ri-search-2-line text-base text-[#E6308A]"></i>
                Search all products
                <i className="ri-arrow-right-line text-base transition-transform duration-300 group-hover:translate-x-1"></i>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#E6308A] px-6 py-3 text-[14px] font-semibold text-white ring-1 ring-inset ring-white/10 transition-all duration-300 hover:bg-[#c9287a] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#E6308A]/30"
              >
                <i className="ri-customer-service-2-line text-base"></i>
                Contact support
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-medium text-white/45">
              <span className="inline-flex items-center gap-1.5">
                <i className="ri-chat-smile-2-line text-[#E6308A]"></i> Replies within 24h
              </span>
              <span className="hidden sm:inline-block h-3 w-px bg-white/15" />
              <span className="inline-flex items-center gap-1.5">
                <i className="ri-truck-line text-[#E6308A]"></i> Fast delivery
              </span>
              <span className="hidden sm:inline-block h-3 w-px bg-white/15" />
              <span className="inline-flex items-center gap-1.5">
                <i className="ri-shield-check-line text-[#E6308A]"></i> Secure checkout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
