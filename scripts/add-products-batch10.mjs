/**
 * Add batch 10 — Drinks & Beverages.
 * Run: node scripts/add-products-batch10.mjs
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function loadEnv() {
  try {
    const raw = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m) process.env[m[1].trim()] = m[2].trim();
    }
  } catch {}
}
loadEnv();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ASSETS =
  'C:/Users/TAY/.cursor/projects/c-Users-TAY-Desktop-grocerydistrict/assets';
const A = (f) => `${ASSETS}/${f}`;

const DRINKS_CATEGORY = {
  name: 'Drinks & Beverages',
  slug: 'drinks-beverages',
  description:
    'Coffee, hot chocolate, milkshake mixes and non-dairy beverages — imported favourites.',
  image_url: null,
  position: 4,
  metadata: {
    chip: 'Drinks',
    icon: 'ri-cup-line',
    color: 'bg-[#2B2C86]',
    featured: true,
  },
};

const PRODUCTS = [
  {
    name: 'Nescafé KitKat Latte Flavour',
    slug: 'nescafe-kitkat-latte-flavour',
    sku: 'GD-BEV-001',
    short_description: 'Instant latte with KitKat chocolate flavour.',
    description:
      'Nescafé KitKat Latte Flavour — instant coffee mix for a frothy chocolate latte with KitKat taste. New.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__7_-716a2cff-9eba-4575-8b9d-f12c9b188a3b.png',
  },
  {
    name: 'Nescafé Peppermint Mocha Flavour (Aero)',
    slug: 'nescafe-peppermint-mocha-aero',
    sku: 'GD-BEV-002',
    short_description: 'Peppermint mocha with bubbly Aero chocolate.',
    description:
      'Nescafé Peppermint Mocha Flavour — instant coffee mix with Aero bubbly chocolate and fresh mint notes.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__6_-8b47ce2b-62c9-4bc7-8803-649b2a31b1da.png',
  },
  {
    name: 'Nescafé Gold Blend Rich Caramel',
    slug: 'nescafe-gold-blend-rich-caramel',
    sku: 'GD-BEV-003',
    short_description: 'Rich & indulgent caramel flavoured instant coffee.',
    description:
      'Nescafé Gold Blend Rich Caramel — rich and indulgent caramel flavoured instant coffee. Intensity 7.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__8_-a93257e8-669c-4e03-afab-32ee4ffa9c24.png',
  },
  {
    name: 'Nestlé Coffee Mate The Original 11 oz',
    slug: 'nestle-coffee-mate-original-11oz',
    sku: 'GD-BEV-004',
    short_description: 'Rich & smooth powdered creamer — 155 servings.',
    description:
      'Nestlé Coffee Mate The Original — rich and smooth powdered coffee creamer. Gluten-free, lactose-free. Net wt 11 oz (311.8 g), approx. 155 servings.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__10_-d97b5563-a747-465a-b665-c69e730453e0.png',
  },
  {
    name: 'Nescafé Gold Blend Smooth Vanilla',
    slug: 'nescafe-gold-blend-smooth-vanilla',
    sku: 'GD-BEV-005',
    short_description: 'Naturally flavoured vanilla instant coffee.',
    description:
      'Nescafé Gold Blend Smooth Vanilla — naturally flavoured vanilla instant coffee. Intensity 7.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__9_-d8ceea1d-a025-4bbb-bbe0-4cb77cee3e14.png',
  },
  {
    name: 'Nestlé Nesquik Chocolate Milkshake Mix 500g',
    slug: 'nestle-nesquik-chocolate-500g',
    sku: 'GD-BEV-006',
    short_description: 'Chocolate flavour milkshake mix with vitamins C & D.',
    description:
      'Nestlé Nesquik Chocolate Flavour Milkshake Mix — wake up your milk! With vitamins C and D. 500g tub.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__11_-a02deefa-65f1-4ce0-a9bf-f66b9886ca3e.png',
  },
  {
    name: 'Kirkland Signature Organic Soy Vanilla Non-Dairy Beverage',
    slug: 'kirkland-organic-soy-vanilla-beverage',
    sku: 'GD-BEV-007',
    short_description: 'USDA organic soy drink — 7g protein per serving.',
    description:
      'Kirkland Signature Organic Soy Non-Dairy Beverage Vanilla — USDA organic, 7g protein per serving. 946 mL / 1 QT (32 FL OZ).',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__13_-5f5a902a-021d-4fff-b617-6356f431c3e4.png',
  },
  {
    name: 'Instant Hot Chocolate',
    slug: 'instant-hot-chocolate',
    sku: 'GD-BEV-008',
    short_description: 'Just add hot water — vegetarian, Rainforest Alliance cocoa.',
    description:
      'Instant Hot Chocolate — rich and creamy, just add hot water. Vegetarian. Made with Rainforest Alliance certified cocoa.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__12_-b1db13aa-4537-429c-9e1e-80a0d047b796.png',
  },
  {
    name: 'Kirkland Signature Organic Unsweetened Almond Vanilla Beverage',
    slug: 'kirkland-organic-almond-vanilla-beverage',
    sku: 'GD-BEV-009',
    short_description: 'USDA organic unsweetened almond drink — 30 calories.',
    description:
      'Kirkland Signature Organic Unsweetened Almond Non-Dairy Beverage Vanilla — USDA organic, 30 calories per serving. 946 mL / 1 QT (32 FL OZ).',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__14_-badf9b7e-ac41-4e78-9b66-1e65ac72b9de.png',
  },
  {
    name: 'Nescafé Vanilla Cookie Dough Latte (Dessert Edition)',
    slug: 'nescafe-vanilla-cookie-dough-latte',
    sku: 'GD-BEV-010',
    short_description: 'Dessert edition instant latte — cookie dough flavour.',
    description:
      'Nescafé Dessert Edition Vanilla Cookie Dough Latte — instant coffee mix for a frothy cookie dough latte.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__5_-dadb6a5f-f501-4951-857a-3243a1b27b5f.png',
  },
];

async function uploadImage(slug, file) {
  const buffer = readFileSync(A(file));
  const path = `catalog/${slug}.png`;
  const { error } = await supabase.storage
    .from('product-images')
    .upload(path, buffer, { contentType: 'image/png', upsert: true });
  if (error) throw new Error(`Upload failed (${slug}): ${error.message}`);
  return supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl;
}

async function getOrCreateCategory() {
  const { data: existing } = await supabase
    .from('categories')
    .select('id, name')
    .eq('slug', DRINKS_CATEGORY.slug)
    .maybeSingle();

  if (existing) return existing;

  const heroImage = await uploadImage('drinks-beverages-hero', PRODUCTS[0].file);

  const { data: created, error } = await supabase
    .from('categories')
    .insert({ ...DRINKS_CATEGORY, image_url: heroImage, status: 'active' })
    .select('id, name')
    .single();

  if (error) throw new Error(`Category create failed: ${error.message}`);
  console.log(`Created category: ${created.name}\n`);
  return created;
}

async function main() {
  const category = await getOrCreateCategory();
  console.log(`Category: ${category.name}\n`);

  for (const p of PRODUCTS) {
    const imageUrl = await uploadImage(p.slug, p.file);

    const { data: inserted, error } = await supabase
      .from('products')
      .insert({
        name: p.name,
        slug: p.slug,
        description: p.description,
        short_description: p.short_description,
        price: 0,
        sku: p.sku,
        quantity: 1,
        track_quantity: true,
        category_id: category.id,
        status: 'active',
        featured: false,
        rating_avg: 0,
        review_count: 0,
        tags: ['grocery-district', 'accra', 'imported'],
      })
      .select('id, name, sku')
      .single();

    if (error) {
      console.error(`  ✗ ${p.name}: ${error.message}`);
      continue;
    }

    const { error: imgErr } = await supabase.from('product_images').insert({
      product_id: inserted.id,
      url: imageUrl,
      alt_text: p.name,
      position: 0,
    });
    if (imgErr) console.error(`    image failed: ${imgErr.message}`);
    console.log(`  ✓ ${inserted.name} (${inserted.sku})`);
  }

  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });
  console.log(`\nDone. Total products now: ${count}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
