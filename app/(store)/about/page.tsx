'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import AnimatedSection, { AnimatedGrid } from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import { HERO_IMAGES } from '@/lib/hero-images';

type ValueCard = {
  icon: string;
  title: string;
  body: string;
};

type JourneyStep = {
  label: string;
  title: string;
  body: string;
};

export default function AboutPage() {
  usePageTitle('Our Story');
  const { getSetting } = useCMS();

  const siteName = getSetting('site_name') || 'Grocery District';

  const valueCards: ValueCard[] = [
    {
      icon: 'ri-eye-line',
      title: 'Transparency first',
      body: "We believe in honest pricing, clear communication, and no hidden costs — so you always know exactly what you're getting.",
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Quality assurance',
      body: 'Every product is carefully sourced and inspected to ensure it meets our standards before it reaches you.',
    },
    {
      icon: 'ri-hand-heart-line',
      title: 'Long-term relationships',
      body: "We don't just fulfil orders — we build trust with every customer, one delivery at a time.",
    },
  ];

  const journeySteps: JourneyStep[] = [
    {
      label: '01',
      title: 'Browse & shop',
      body: 'Explore UK & USA groceries, baby essentials, household products and skincare — buy a single item or stock up in bulk at wholesale prices.',
    },
    {
      label: '02',
      title: 'We pack your order',
      body: 'Our team carefully picks and checks every item so you get fresh, genuine products exactly as you ordered them.',
    },
    {
      label: '03',
      title: 'Delivery to your door',
      body: 'We deliver across Accra and nationwide in Ghana — or come pick up in-store at Ashongman Estate. Open 7 days a week.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <PageHero
        title={`About ${siteName}`}
        subtitle="Your neighbourhood supermarket for imported groceries — wholesale, retail and delivery across Accra."
        image={HERO_IMAGES.about}
        objectPosition="50% 42%"
      />
      <section className="border-b border-brand-carton/15 bg-[#F5F4FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <AnimatedSection className="lg:col-span-6" animation="fade-up">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-brown">
                About {siteName}
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
                Your neighbourhood supermarket for imported groceries.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-gray-700 max-w-xl">
                Grocery District brings authentic UK & USA groceries, baby essentials, household products and skincare to Accra — available wholesale and retail, with delivery to your door. Genuine products, fair prices, no stress.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-brown border border-brand-carton/20">
                  <i className="ri-map-pin-line mr-2" /> Ashongman Estate, Accra
                </span>
                <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-brown border border-brand-carton/20">
                  <i className="ri-store-2-line mr-2" /> Wholesale · Retail · Delivery
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center rounded-full bg-brand-brown px-7 py-3 text-sm font-semibold text-white hover:bg-[#222370] transition-colors"
                >
                  Browse products
                  <i className="ri-arrow-right-up-line ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-brand-carton/35 bg-white px-7 py-3 text-sm font-semibold text-brand-brown hover:bg-brand-cream transition-colors"
                >
                  Contact our team
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection className="lg:col-span-6" animation="fade-left">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] border border-brand-carton/15 bg-brand-carton/10">
                  <Image
                    src="/hero-1.png"
                    alt={`${siteName} groceries`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] border border-brand-carton/15 bg-brand-carton/10 mt-8">
                  <Image
                    src="/hero-2.png"
                    alt={`${siteName} store`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <AnimatedSection className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-carton">
              Our core values
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
              Built on trust, driven by quality.
            </h2>
          </div>

          <AnimatedGrid className="mt-8 grid gap-4 md:grid-cols-3" staggerDelay={120}>
            {valueCards.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-brand-carton/15 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-carton text-white">
                  <i className={`${item.icon} text-xl`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.body}</p>
              </div>
            ))}
          </AnimatedGrid>
        </div>
      </AnimatedSection>

      <section className="bg-white py-14 sm:py-16 border-b border-brand-carton/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-brand-carton/15 bg-brand-cream/40 p-6 sm:p-8">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-brown text-white">
                <i className="ri-lightbulb-line text-xl" />
              </div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-carton mb-2">Our Vision</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Making quality groceries accessible
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                To make trusted UK & USA groceries and everyday essentials easy to find in Accra — at fair wholesale and retail prices.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-carton/15 bg-brand-cream/40 p-6 sm:p-8">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-brown text-white">
                <i className="ri-compass-3-line text-xl" />
              </div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-brown mb-2">Our Mission</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Your trusted everyday supermarket
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                To be Accra&apos;s go-to store for imported groceries, baby care, household and skincare — with genuine products, dependable delivery and friendly service, one order at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-cream/45 py-14 sm:py-16 border-y border-brand-carton/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-brown">
              How it works
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
              From our shelves to your doorstep.
            </h2>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {journeySteps.map((step) => (
              <div
                key={step.label}
                className="rounded-2xl border border-brand-carton/15 bg-white p-6"
              >
                <span className="text-xs font-bold tracking-[0.22em] uppercase text-brand-carton">
                  Step {step.label}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#2B2C86] text-white border border-[#2B2C86] shadow-[0_16px_45px_rgba(43,44,134,0.25)] flex flex-col md:flex-row items-center md:items-stretch">
            <div className="relative w-full md:w-3/5 px-5 sm:px-8 py-8 sm:py-10 flex flex-col justify-center space-y-3 text-center md:text-left">
              <span className="inline-flex items-center text-xs font-semibold tracking-[0.25em] uppercase text-white/80">
                Shop with {siteName}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">
                Genuine groceries and essentials, without breaking the bank.
              </h3>
              <p className="text-sm sm:text-base text-white/75 max-w-md mx-auto md:mx-0">
                Whether it&apos;s for your home, your baby, or your business — shop wholesale or
                retail and let us deliver across Accra and Ghana.
              </p>
              <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                <Link
                  href="/shop"
                  className="inline-flex items-center rounded-full bg-white text-[#2B2C86] px-8 py-3 text-sm font-semibold shadow-lg hover:bg-[#F3F3F3] transition-colors"
                >
                  Start shopping
                  <i className="ri-arrow-right-up-line ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  Talk to us
                </Link>
              </div>
            </div>
            <div className="relative w-full md:w-2/5 min-h-[14rem] md:min-h-0">
              <Image
                src="/hero-1.png"
                alt={`${siteName} groceries`}
                fill
                className="object-cover md:rounded-r-2xl sm:md:rounded-r-3xl rounded-b-2xl sm:rounded-b-3xl md:rounded-bl-none"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
