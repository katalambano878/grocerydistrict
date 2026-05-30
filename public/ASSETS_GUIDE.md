# Asset Replacement Guide

All original brand images have been removed from this directory. Add your own files at
the paths below — the code already references these neutral filenames.

## Required Assets

| File | Size | Purpose |
|------|------|---------|
| `public/favicon.ico` | 32×32px | Browser tab icon |
| `public/favicon.png` | 64×64px | PNG favicon |
| `public/apple-touch-icon.png` | 180×180px | iOS home screen |
| `public/icons/icon-72x72.png` … `icon-512x512.png` | 72→512px | PWA icon set |
| `public/icons/icon-maskable-192x192.png`, `icon-maskable-512x512.png` | 192 / 512px | Maskable PWA icons |
| `public/logo.png` | Vector/PNG | Main brand logo (header, login, PWA) |
| `public/logo-white.png` | Vector/PNG | Logo for dark backgrounds (footer) |
| `public/og-image.png` | 1200×630px | Open Graph social preview |
| `public/twitter-image.png` | 1200×630px | Twitter card image |
| `public/hero-1.png`, `public/hero-2.png` | 1920×1080px | Homepage / page hero backgrounds |
| `public/about.jpeg`, `categories.jpeg`, `contact.jpeg`, `shop.jpeg`, `wishlist.jpeg` | varies | Page hero/section images |

The icon paths are wired up in `public/manifest.json` and `app/layout.tsx`. If you change
filenames, update those references too.

## Tools
- Favicon + PWA icons: https://realfavicongenerator.net
- OG image creator: https://og-playground.vercel.app
- Image optimization: https://squoosh.app
