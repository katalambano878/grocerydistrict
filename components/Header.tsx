'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MiniCart from './MiniCart';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import { useCMS } from '@/context/CMSContext';
import AnnouncementBar from './AnnouncementBar';

/** Brand lockup using the official Grocery District logo.
 *  On the light header the colour logo sits on transparent; when the header
 *  turns navy on scroll, it sits on a white badge so the navy wordmark
 *  stays fully legible. */
function Brand({ siteName, scrolled = false, compact = false }: { siteName: string; scrolled?: boolean; compact?: boolean }) {
  const heightClass = compact
    ? 'h-8'
    : scrolled
      ? 'h-8 sm:h-9'
      : 'h-9 sm:h-11';

  if (scrolled) {
    return (
      <span className="inline-flex items-center rounded-xl bg-white px-2.5 py-1 shadow-sm ring-1 ring-black/5 transition-all duration-500">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt={siteName} className={`${heightClass} w-auto object-contain`} />
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt={siteName}
      className={`${heightClass} w-auto object-contain transition-all duration-500`}
    />
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [popularCategories, setPopularCategories] = useState<string[]>([]);

  const { cartCount, isCartOpen, setIsCartOpen } = useCart();
  const { getSetting } = useCMS();

  const siteName = getSetting('site_name') || 'Grocery District';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlistCount(wishlist.length);
    };
    updateWishlistCount();
    window.addEventListener('wishlistUpdated', updateWishlistCount);

    // "/" to open search, Esc to close — desktop power-user polish
    const handleKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
      if (e.key === '/' && !typing) {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUser();

    supabase
      .from('categories')
      .select('name')
      .eq('status', 'active')
      .is('parent_id', null)
      .order('position', { ascending: true })
      .limit(4)
      .then(({ data }) => {
        if (data?.length) setPopularCategories(data.map((c) => c.name));
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wishlistUpdated', updateWishlistCount);
      window.removeEventListener('keydown', handleKey);
      subscription.unsubscribe();
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Categories', href: '/categories' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const active = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const iconBtn = (extra = '') =>
    `relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
      isScrolled
        ? 'text-white/65 hover:text-white hover:bg-white/10'
        : 'text-[#2B2C86]/55 hover:text-[#2B2C86] hover:bg-[#2B2C86]/[0.05]'
    } ${extra}`;

  return (
    <>
      <AnnouncementBar />

      <header
        className={`sticky top-0 z-50 pwa-header transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
          isScrolled
            ? 'bg-[#2B2C86] shadow-xl shadow-[#2B2C86]/20'
            : 'bg-white/80 backdrop-blur-xl border-b border-[#2B2C86]/[0.07]'
        }`}
      >
        <div className="safe-area-top" />
        <nav aria-label="Main navigation">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div
              className={`relative flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
                isScrolled ? 'h-[56px]' : 'h-16 sm:h-[76px]'
              }`}
            >

              {/* Left — hamburger + brand */}
              <div className="flex items-center gap-1.5 min-w-0">
                <button
                  className={`lg:hidden -ml-1.5 w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                    isScrolled
                      ? 'text-white/70 hover:text-white hover:bg-white/10'
                      : 'text-[#2B2C86]/70 hover:text-[#2B2C86] hover:bg-[#2B2C86]/5'
                  }`}
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <i className="ri-menu-3-line text-[21px]"></i>
                </button>

                <Link href="/" className="group" aria-label={`${siteName} — homepage`}>
                  <Brand siteName={siteName} scrolled={isScrolled} />
                </Link>
              </div>

              {/* Center — desktop nav (true-centered segmented control) */}
              <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
                <div
                  className={`flex items-center gap-0.5 p-1 rounded-full transition-colors duration-500 ${
                    isScrolled ? 'bg-white/[0.07]' : 'bg-[#2B2C86]/[0.045]'
                  }`}
                >
                  {navLinks.map((link) => {
                    const isActive = active(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`relative px-4 py-1.5 text-[13px] font-medium tracking-[0.01em] rounded-full transition-all duration-300 ${
                          isActive
                            ? 'bg-white text-[#2B2C86] shadow-sm'
                            : isScrolled
                              ? 'text-white/55 hover:text-white'
                              : 'text-[#2B2C86]/55 hover:text-[#2B2C86]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Right — actions */}
              <div className="flex items-center gap-0.5 sm:gap-1">

                {/* Search — command-style pill on desktop */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search products"
                  className={`hidden md:flex items-center gap-2 h-9 pl-3.5 pr-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                    isScrolled
                      ? 'bg-white/[0.08] text-white/55 hover:bg-white/[0.14] hover:text-white'
                      : 'bg-[#2B2C86]/[0.05] text-[#2B2C86]/45 hover:bg-[#2B2C86]/[0.08] hover:text-[#2B2C86]/75'
                  }`}
                >
                  <i className="ri-search-2-line text-[17px]"></i>
                  <span className="pr-1">Search</span>
                  <kbd
                    className={`text-[10px] leading-none font-sans font-semibold px-1.5 py-1 rounded-md ${
                      isScrolled ? 'bg-white/10 text-white/50' : 'bg-white text-[#2B2C86]/40 shadow-sm'
                    }`}
                  >
                    /
                  </kbd>
                </button>

                {/* Search — icon only on mobile */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className={iconBtn('md:hidden')}
                  aria-label="Search"
                >
                  <i className="ri-search-2-line text-[20px]"></i>
                </button>

                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className={iconBtn('hidden sm:flex')}
                  aria-label={`Wishlist, ${wishlistCount} items`}
                >
                  <i className="ri-heart-3-line text-[20px]"></i>
                  {wishlistCount > 0 && (
                    <span
                      className={`absolute top-1 right-1 min-w-[15px] h-[15px] px-1 bg-[#E6308A] text-white text-[8px] font-bold rounded-full flex items-center justify-center ring-2 ${
                        isScrolled ? 'ring-[#2B2C86]' : 'ring-white'
                      }`}
                    >
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <div className="relative">
                  <button
                    className={iconBtn()}
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    aria-label={`Shopping cart, ${cartCount} items`}
                    aria-expanded={isCartOpen}
                    aria-controls="mini-cart"
                  >
                    <i className="ri-shopping-bag-3-line text-[20px]"></i>
                    {cartCount > 0 && (
                      <span
                        className={`absolute top-1 right-1 min-w-[15px] h-[15px] px-1 bg-[#E6308A] text-white text-[8px] font-bold rounded-full flex items-center justify-center ring-2 ${
                          isScrolled ? 'ring-[#2B2C86]' : 'ring-white'
                        }`}
                      >
                        {cartCount}
                      </span>
                    )}
                  </button>
                  <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                </div>

                {/* Divider */}
                <span
                  className={`hidden lg:block w-px h-5 mx-1.5 transition-colors duration-500 ${
                    isScrolled ? 'bg-white/15' : 'bg-[#2B2C86]/10'
                  }`}
                />

                {/* Account — desktop */}
                <Link
                  href={user ? '/account' : '/auth/login'}
                  className={`hidden lg:flex items-center gap-2 h-9 rounded-full transition-all duration-300 ${
                    user ? 'px-3' : 'px-3.5'
                  } ${
                    isScrolled
                      ? 'bg-white/[0.08] text-white/80 hover:bg-white/[0.16] hover:text-white'
                      : 'bg-[#2B2C86]/[0.05] text-[#2B2C86]/75 hover:bg-[#2B2C86] hover:text-white'
                  }`}
                  aria-label={user ? 'My account' : 'Login'}
                >
                  <i className={`${user ? 'ri-user-smile-line' : 'ri-user-4-line'} text-[18px]`}></i>
                  <span className="text-[13px] font-medium">{user ? 'Account' : 'Sign in'}</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={() => setIsSearchOpen(false)} />
          <div className="relative max-w-2xl mx-auto mt-[15vh] px-5 animate-in fade-in slide-in-from-top-6 duration-300">
            <form onSubmit={handleSearch} className="relative">
              <div className="bg-white rounded-[20px] shadow-2xl overflow-hidden ring-1 ring-black/5">
                <div className="flex items-center px-5 gap-3">
                  <i className="ri-search-2-line text-[#2B2C86]/25 text-xl shrink-0"></i>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for groceries, brands & more…"
                    className="flex-1 py-5 text-[16px] text-[#2B2C86] bg-transparent outline-none placeholder-[#2B2C86]/25"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="shrink-0 text-[11px] font-semibold text-[#2B2C86]/30 bg-[#2B2C86]/5 px-2.5 py-1 rounded-md hover:bg-[#2B2C86]/10 hover:text-[#2B2C86]/50 transition-colors"
                  >
                    ESC
                  </button>
                </div>
                <div className="border-t border-[#2B2C86]/5 px-5 py-3 flex flex-wrap gap-2">
                  <span className="text-[11px] font-semibold text-[#2B2C86]/25 self-center mr-1">Popular:</span>
                  {popularCategories.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => { setSearchQuery(tag); }}
                      className="text-[11px] font-medium text-[#2B2C86]/40 bg-[#2B2C86]/[0.03] hover:bg-[#E6308A]/10 hover:text-[#E6308A] px-3 py-1.5 rounded-full transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[110] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Full-height panel */}
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-[360px] bg-[#FAFAF8] flex flex-col animate-in slide-in-from-left duration-400 shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between px-5 h-[68px] shrink-0 border-b border-[#2B2C86]/[0.05]">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center">
                <Brand siteName={siteName} compact />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-[#2B2C86]/30 hover:text-[#2B2C86] rounded-full hover:bg-[#2B2C86]/5 transition-colors"
                aria-label="Close menu"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-4 pb-6 pt-5">

              {/* Main nav */}
              <div className="space-y-1 mb-6">
                {[{ label: 'Home', href: '/', icon: 'ri-home-5-line' }, ...navLinks.slice(1).map(l => ({
                  ...l,
                  icon: l.href === '/shop' ? 'ri-store-2-line' : l.href === '/categories' ? 'ri-layout-grid-line' : l.href === '/about' ? 'ri-information-line' : 'ri-mail-send-line',
                }))].map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[15px] font-medium transition-all animate-in slide-in-from-left-3 fade-in duration-300 fill-mode-both ${
                      active(link.href)
                        ? 'bg-[#2B2C86] text-white shadow-md shadow-[#2B2C86]/20'
                        : 'text-[#2B2C86]/70 hover:bg-white hover:text-[#2B2C86] hover:shadow-sm'
                    }`}
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <i className={`${link.icon} text-lg ${active(link.href) ? 'text-[#E6308A]' : 'text-[#2B2C86]/30'}`}></i>
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-[#2B2C86]/[0.06] mx-2 mb-5" />

              {/* Quick actions */}
              <p className="px-4 mb-2.5 text-[10px] font-bold tracking-[0.15em] uppercase text-[#2B2C86]/25">Quick Links</p>
              <div className="space-y-0.5 mb-6">
                {[
                  { label: 'Track Order', href: '/order-tracking', icon: 'ri-truck-line' },
                  { label: 'Wishlist', href: '/wishlist', icon: 'ri-heart-3-line', badge: wishlistCount },
                  { label: user ? 'My Account' : 'Sign In', href: user ? '/account' : '/auth/login', icon: user ? 'ri-user-smile-line' : 'ri-user-4-line' },
                  { label: 'Help Center', href: '/faqs', icon: 'ri-question-line' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] text-[#2B2C86]/50 hover:text-[#2B2C86] hover:bg-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className={`${link.icon} text-[17px] text-[#2B2C86]/25`}></i>
                    <span className="flex-1">{link.label}</span>
                    {'badge' in link && link.badge! > 0 && (
                      <span className="text-[10px] font-bold text-[#E6308A] bg-[#E6308A]/10 w-5 h-5 rounded-full flex items-center justify-center">{link.badge}</span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Install CTA */}
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('show-pwa-install-guide'));
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-[#E6308A]/10 text-[14px] font-semibold text-[#E6308A] hover:bg-[#E6308A]/15 transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-[#E6308A]/15 flex items-center justify-center">
                  <i className="ri-smartphone-line text-base text-[#E6308A]"></i>
                </div>
                Install the App
              </button>
            </div>

            {/* Footer */}
            <div className="shrink-0 px-5 py-4 border-t border-[#2B2C86]/[0.04] bg-[#FAFAF8]">
              <p className="text-[10px] text-[#2B2C86]/20 font-medium">&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
