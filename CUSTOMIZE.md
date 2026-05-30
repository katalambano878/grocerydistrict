# Customization Checklist

This codebase has been fully brand-neutralized. Complete these steps to make it yours.
Do a project-wide search for each `YOUR_*` / `yourdomain.com` placeholder and replace it.

## Identity (search & replace globally)
- [ ] `YOUR_BRAND_NAME` — app/site/brand name (UI, emails, SMS sender, metadata)
- [ ] `YOUR_PROJECT_NAME` / `YOUR_PROJECT_DESCRIPTION` — `package.json`, `README.md`
- [x] Domain set to `grocerydistrict.shop` (URLs + email domains)
- [ ] `YOUR_INSTAGRAM` — social handle / links
- [ ] `YOUR_CITY`, `YOUR_COUNTRY` — business address in structured data (`app/layout.tsx`, `components/SEOHead.tsx`)
- [ ] `YOUR_NAME` / `your@email.com` — `package.json` author, `LICENSE`
- [ ] `YOUR_USERNAME` / `YOUR_REPO_NAME` — `package.json` repository/bugs URLs
- [ ] `0000000000` / `+0000000000` — contact / WhatsApp phone numbers (also set `CONTACT_PHONE`)

## Assets (see `public/ASSETS_GUIDE.md`)
- [ ] `public/favicon.ico` and `public/favicon.png`
- [ ] `public/apple-touch-icon.png`
- [ ] `public/icons/` PWA icon set (72→512, plus maskable)
- [ ] `public/logo.png` and `public/logo-white.png`
- [ ] `public/og-image.png` and `public/twitter-image.png` (1200×630)
- [ ] `public/hero-1.png`, `public/hero-2.png` (hero/banner images)
- [ ] Page images: `about.jpeg`, `categories.jpeg`, `contact.jpeg`, `shop.jpeg`, `wishlist.jpeg` (or update the paths in the corresponding pages)

## Configuration
- [ ] Copy `.env.example` to `.env.local` and fill in every value
- [ ] Update `public/manifest.json` — `name`, `short_name`, `description`, `theme_color`, `background_color`
- [ ] Update `package.json` — `name`, `description`, `author`, `license`, `homepage`, `repository`, `keywords`
- [ ] Set up your Supabase project (run migrations in `supabase/`) and set the connection vars
- [ ] Set up Paystack and Moolre accounts; replace the API keys
- [ ] Set up Resend; set `RESEND_API_KEY` and `EMAIL_FROM`
- [ ] Configure analytics (`NEXT_PUBLIC_GA_MEASUREMENT_ID`) and reCAPTCHA keys if used
- [ ] Review brand colors in `tailwind.config.js` (`theme.extend.colors.brand`)

## Content
- [ ] Review CMS defaults in `context/CMSContext.tsx` (site name, logo, contact, socials)
- [ ] Review the AI assistant knowledge base in `lib/site-knowledge.ts` and prompts in `app/api/chat/route.ts`
- [ ] Replace sample blog post content/authors in `app/admin/blog/page.tsx` and `app/(store)/blog/`
- [ ] Update legal copy in `app/(store)/privacy/` and `app/(store)/terms/`

## SEO
- [ ] `public/robots.txt` sitemap URL (uses `NEXT_PUBLIC_APP_URL` at runtime)
- [ ] Open Graph / Twitter metadata in `app/layout.tsx` and `components/SEOHead.tsx`

## Legal
- [ ] Replace `LICENSE` with your chosen license
- [ ] Update copyright year/name in the footer (driven by CMS `site_name`)

## Deployment
- [ ] Set all environment variables in your hosting platform (e.g. Vercel)
- [ ] Configure your custom domain
- [ ] Verify the cron job in `vercel.json` (`/api/cron/payment-reminders`) and set `CRON_SECRET`
