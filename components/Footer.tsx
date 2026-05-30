"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useCMS } from '@/context/CMSContext';

function FooterSection({ title, children }: { title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/20 lg:border-none last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2.5 text-left lg:py-0 lg:cursor-default lg:mb-2.5"
      >
        <h4 className="font-bold text-base text-white">{title}</h4>
        <i className={`ri-arrow-down-s-line text-white text-xl transition-transform duration-300 lg:hidden ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0 lg:max-h-full lg:overflow-visible'}`}>
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  const { getSetting } = useCMS();
  const siteName = getSetting("site_name") || "Grocery District";
  const siteTagline =
    getSetting("site_tagline") ||
    "UK & USA groceries, baby essentials, household & skincare — wholesale, retail and delivery in Accra. Buy More, Stress Less.";
  const contactEmail = getSetting('contact_email') || '';
  const contactPhone = getSetting("contact_phone") || "+233 55 297 1577";
  const businessHours = getSetting("business_hours") || "Open 7 days a week · Mon–Sat: 8:30am – 8:00pm";
  const phoneDigits = contactPhone.replace(/\D/g, "");
  const whatsappLink = `https://wa.me/${phoneDigits}`;
  const instagramHandle = getSetting("social_instagram") || "grocery_district1";
  const tiktokHandle = getSetting("social_tiktok") || "grocery_district";
  const snapchatHandle = getSetting("social_snapchat") || "sheisprecious15";

  return (
    <footer className="bg-[#2B2C86] text-white mt-4 lg:mt-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-5 lg:py-6">
        <div className="grid lg:grid-cols-4 gap-5 lg:gap-7">

          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-2.5">
            <Link href="/" className="inline-block">
              <img
                src="/logo-white.png"
                alt={siteName}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-white/80 leading-snug text-xs sm:text-sm">
              {siteTagline.replace(/Less\.?$/i, "").trimEnd()}{" "}
              <Link href="/admin" className="text-inherit hover:text-white no-underline">Less.</Link>
            </p>

            <div className="flex gap-2 pt-1">
              <a
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#2B2C86] transition-all hover:-translate-y-1"
                aria-label="Follow us on Instagram"
              >
                <i className="ri-instagram-line"></i>
              </a>
              <a
                href={`https://www.tiktok.com/@${tiktokHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#2B2C86] transition-all hover:-translate-y-1"
                aria-label="Follow us on TikTok"
              >
                <i className="ri-tiktok-line"></i>
              </a>
              <a
                href={`https://www.snapchat.com/add/${snapchatHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#2B2C86] transition-all hover:-translate-y-1"
                aria-label="Add us on Snapchat"
              >
                <i className="ri-snapchat-line"></i>
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#2B2C86] transition-all hover:-translate-y-1"
                aria-label="Chat on WhatsApp"
              >
                <i className="ri-whatsapp-line"></i>
              </a>
            </div>

            <div className="space-y-2 pt-2.5 border-t border-white/20">
              {contactPhone && (
                <a href={`tel:${contactPhone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-xs sm:text-sm">
                  <i className="ri-phone-line"></i> {contactPhone}
                </a>
              )}
              {contactEmail && (
                <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-xs sm:text-sm">
                  <i className="ri-mail-line"></i> {contactEmail}
                </a>
              )}
              <p className="flex items-start gap-2 text-white/80 text-xs sm:text-sm">
                <i className="ri-map-pin-line mt-0.5"></i> Ashongman Estate, Accra, Ghana
              </p>
              <p className="flex items-start gap-2 text-white/80 text-xs sm:text-sm">
                <i className="ri-time-line mt-0.5"></i> {businessHours}
              </p>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid lg:grid-cols-3 gap-5 lg:gap-8">

            <FooterSection title="Shop">
              <ul className="space-y-2 text-white/80 text-sm">
                <li><Link href="/shop" className="hover:text-white transition-colors flex items-center gap-2"><i className="ri-arrow-right-s-line opacity-50"></i> All Products</Link></li>
                <li><Link href="/categories" className="hover:text-white transition-colors flex items-center gap-2"><i className="ri-arrow-right-s-line opacity-50"></i> Categories</Link></li>
                <li><Link href="/shop?sort=newest" className="hover:text-white transition-colors flex items-center gap-2"><i className="ri-arrow-right-s-line opacity-50"></i> New Arrivals</Link></li>
                <li><Link href="/shop?sort=bestsellers" className="hover:text-white transition-colors flex items-center gap-2"><i className="ri-arrow-right-s-line opacity-50"></i> Best Sellers</Link></li>
              </ul>
            </FooterSection>

            <FooterSection title="Customer Care">
              <ul className="space-y-2 text-white/80 text-sm">
                <li><Link href="/contact" className="hover:text-white transition-colors flex items-center gap-2"><i className="ri-arrow-right-s-line opacity-50"></i> Contact Us</Link></li>
                <li><Link href="/order-tracking" className="hover:text-white transition-colors flex items-center gap-2"><i className="ri-arrow-right-s-line opacity-50"></i> Track My Order</Link></li>
                <li><Link href="/shipping" className="hover:text-white transition-colors flex items-center gap-2"><i className="ri-arrow-right-s-line opacity-50"></i> Shipping Info</Link></li>
                <li><Link href="/returns" className="hover:text-white transition-colors flex items-center gap-2"><i className="ri-arrow-right-s-line opacity-50"></i> Returns Policy</Link></li>
              </ul>
            </FooterSection>

            <FooterSection title="Company">
              <ul className="space-y-2 text-white/80 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors flex items-center gap-2"><i className="ri-arrow-right-s-line opacity-50"></i> Our Story</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors flex items-center gap-2"><i className="ri-arrow-right-s-line opacity-50"></i> Blog</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors flex items-center gap-2"><i className="ri-arrow-right-s-line opacity-50"></i> Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors flex items-center gap-2"><i className="ri-arrow-right-s-line opacity-50"></i> Terms of Service</Link></li>
              </ul>
            </FooterSection>

          </div>
        </div>

        <div className="border-t border-white/20 mt-5 pt-3.5 flex flex-col md:flex-row justify-between items-center gap-2 text-[11px] text-white/60">
          <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <div className="flex gap-3 grayscale opacity-50">
            <i className="ri-visa-line text-xl"></i>
            <i className="ri-mastercard-line text-xl"></i>
            <i className="ri-paypal-line text-xl"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
