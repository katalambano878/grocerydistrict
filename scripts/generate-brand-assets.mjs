/**
 * Generates the full brand + SEO asset set from a single source logo.
 *
 *   node scripts/generate-brand-assets.mjs [sourceLogo.png]
 *
 * Produces (in /public):
 *   logo.png, logo-white.png
 *   favicon.ico, favicon.png, apple-touch-icon.png
 *   icons/icon-{72,96,128,144,152,192,384,512}.png
 *   icons/icon-maskable-{192,512}.png
 *   og-image.png, twitter-image.png
 */
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import fs from 'node:fs/promises';
import path from 'node:path';

const SRC = process.argv[2] || 'scripts/brand-source.png';
const PUB = 'public';
const ICONS = path.join(PUB, 'icons');

// Brand palette (sampled from the logo)
const PINK = '#E6308A';
const NAVY = '#2B2C86';
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

await fs.mkdir(ICONS, { recursive: true });

// 1. Canonical logo: trim transparent padding, normalize to PNG.
const logoBuf = await sharp(SRC).trim({ threshold: 10 }).png().toBuffer();
await fs.writeFile(path.join(PUB, 'logo.png'), logoBuf);

const meta = await sharp(logoBuf).metadata();
const ratio = meta.width / meta.height;

// 2. "White" logo for dark surfaces: place the colour logo on a soft white
//    rounded card so the navy wordmark always stays legible on the espresso footer.
{
  const w = 520;
  const h = Math.round(w / ratio);
  const padX = 56;
  const padY = 44;
  const cardW = w + padX * 2;
  const cardH = h + padY * 2;
  const radius = 36;
  const mask = Buffer.from(
    `<svg width="${cardW}" height="${cardH}"><rect width="${cardW}" height="${cardH}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`
  );
  const resized = await sharp(logoBuf).resize({ width: w }).toBuffer();
  const card = await sharp({ create: { width: cardW, height: cardH, channels: 4, background: WHITE } })
    .composite([
      { input: mask, blend: 'dest-in' },
      { input: resized, gravity: 'center' },
    ])
    .png()
    .toBuffer();
  await fs.writeFile(path.join(PUB, 'logo-white.png'), card);
}

// 3. Square icon helper — colour logo centered on a white field with padding.
async function squareIcon(size, padding = 0.16, bg = WHITE) {
  const innerW = Math.round(size * (1 - padding * 2));
  const innerH = Math.round(innerW / ratio);
  const fit = innerH > size * (1 - padding * 2)
    ? { height: Math.round(size * (1 - padding * 2)) }
    : { width: innerW };
  const resized = await sharp(logoBuf).resize(fit).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: resized, gravity: 'center' }])
    .png()
    .toBuffer();
}

const standardSizes = [72, 96, 128, 144, 152, 192, 384, 512];
for (const s of standardSizes) {
  await fs.writeFile(path.join(ICONS, `icon-${s}x${s}.png`), await squareIcon(s, 0.14));
}

// Maskable icons need a larger safe-zone (logo within central ~80%).
for (const s of [192, 512]) {
  await fs.writeFile(path.join(ICONS, `icon-maskable-${s}x${s}.png`), await squareIcon(s, 0.24));
}

// Apple touch icon (no transparency — white field).
await fs.writeFile(path.join(PUB, 'apple-touch-icon.png'), await squareIcon(180, 0.14));

// 4. Favicons.
await fs.writeFile(path.join(PUB, 'favicon.png'), await squareIcon(64, 0.1));
const icoSources = await Promise.all([16, 32, 48].map((s) => squareIcon(s, 0.08)));
await fs.writeFile(path.join(PUB, 'favicon.ico'), await pngToIco(icoSources));

// 5. Social share image (Open Graph + Twitter), 1200x630.
{
  const W = 1200, H = 630;
  const logoW = 560;
  const logoH = Math.round(logoW / ratio);
  const logoResized = await sharp(logoBuf).resize({ width: logoW }).toBuffer();
  const logoY = 96;
  const headingY = logoY + logoH + 88;

  const bg = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${W}" height="${H}" fill="#ffffff"/>
      <rect width="${W}" height="14" fill="${NAVY}"/>
      <rect x="0" y="${H - 14}" width="${W}" height="14" fill="${PINK}"/>
      <text x="${W / 2}" y="${headingY}" text-anchor="middle"
            font-family="Arial, Helvetica, sans-serif" font-size="50" font-weight="800" fill="${NAVY}">
        UK &amp; USA Groceries in Accra
      </text>
      <text x="${W / 2}" y="${headingY + 58}" text-anchor="middle"
            font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="600" fill="#6b6b6b">
        Baby &#183; Household &#183; Skincare &#160;&#8226;&#160; Wholesale &#183; Retail &#183; Delivery
      </text>
      <text x="${W / 2}" y="${H - 46}" text-anchor="middle"
            font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="${PINK}"
            letter-spacing="2">
        grocerydistrict.shop
      </text>
    </svg>`);

  const og = await sharp({ create: { width: W, height: H, channels: 4, background: WHITE } })
    .composite([
      { input: bg, top: 0, left: 0 },
      { input: logoResized, top: logoY, left: Math.round((W - logoW) / 2) },
    ])
    .png()
    .toBuffer();

  await fs.writeFile(path.join(PUB, 'og-image.png'), og);
  await fs.writeFile(path.join(PUB, 'twitter-image.png'), og);
}

console.log('Brand + SEO assets generated successfully.');
