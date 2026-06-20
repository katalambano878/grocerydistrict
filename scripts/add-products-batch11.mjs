/**
 * Add batch 11 — Pantry, Drinks, Household & Home & Kitchen.
 * Run: node scripts/add-products-batch11.mjs
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

const HOME_KITCHEN_CATEGORY = {
  name: 'Home & Kitchen',
  slug: 'home-kitchen',
  description:
    'Kettles, cookware and kitchen essentials for everyday home use.',
  image_url: null,
  position: 5,
  metadata: {
    chip: 'Home',
    icon: 'ri-home-gear-line',
    color: 'bg-[#2B2C86]',
    featured: true,
  },
};

const PRODUCTS = [
  {
    categorySlug: 'pantry-condiments',
    name: 'Heinz Tomato Ketchup',
    slug: 'heinz-tomato-ketchup',
    sku: 'GD-PNT-016',
    short_description: 'Classic Heinz tomato ketchup — estd 1869.',
    description:
      'Heinz Tomato Ketchup — the classic tomato ketchup since 1869. Squeezy bottle.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__15_-4e41dac4-018d-4527-bf42-d0f59ea2eb64.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: 'Stockwell & Co. Strawberry Jam',
    slug: 'stockwell-co-strawberry-jam',
    sku: 'GD-PNT-017',
    short_description: 'Strawberry jam — 40g fruit per 100g.',
    description:
      'T.E. Stockwell & Co. Strawberry Jam — for quality and value since 1924. Prepared with 40g of fruit per 100g.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM-b9f7a240-3337-457b-be0e-03fb6c4291db.png',
  },
  {
    categorySlug: 'household-personal-care',
    name: 'Aveeno Daily Moisturizing Body Wash Twin Pack',
    slug: 'aveeno-daily-moisturizing-body-wash-twin-pack',
    sku: 'GD-HHD-025',
    short_description: 'Prebiotic oat body wash — 2 x 33 fl oz.',
    description:
      'Aveeno Daily Moisturizing Body Wash Value Twin Pack — nourishes dry, sensitive skin with prebiotic oat. Lightly scented. 2 x 33 fl oz (975 mL), 66 fl oz total.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.40_PM__1_-53cfdb25-4e41-40b0-99ba-0cc0e7fb0a41.png',
  },
  {
    categorySlug: 'household-personal-care',
    name: 'Olay Essential Botanicals Body Wash 3-Pack',
    slug: 'olay-essential-botanicals-body-wash-3-pack',
    sku: 'GD-HHD-026',
    short_description: 'Moisturizing body wash — 3 x 23.6 fl oz scents.',
    description:
      'Olay Essential Botanicals Body Wash 3-Pack — moisturizing, infused with essential botanicals. Includes Lavender & Chamomile, Orchid Oil & Blackberry, and White Tea & Cucumber. 3 x 23.6 fl oz (700 mL), 70.8 fl oz total.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.40_PM-85e0456e-4ebd-4703-999f-4fce9c3e1b82.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: 'Aunt Caroline Basmati Rice 5kg',
    slug: 'aunt-caroline-basmati-rice-5kg',
    sku: 'GD-PNT-018',
    short_description: 'Aromatic fluffy grains — aged to perfection.',
    description:
      'Aunt Caroline Basmati Rice — aromatic fluffy grains, aged to perfection. Natural goodness, no artificial colour or flavours. 5 kg.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__1_-bcaa4414-db81-4e6c-b744-a0b1cc8ff7b1.png',
  },
  {
    categorySlug: 'drinks-beverages',
    name: 'Kirkland Signature Organic Oat Beverage',
    slug: 'kirkland-organic-oat-beverage',
    sku: 'GD-BEV-011',
    short_description: 'USDA organic oat drink — made with rolled oats.',
    description:
      'Kirkland Signature Organic Oat Non-Dairy Beverage — USDA organic, made with rolled oats. 946 mL (1 QT) 32 FL OZ.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__2_-298ce275-afca-48a5-a55a-6ae10142d788.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: 'The Prairie Menu Custard',
    slug: 'the-prairie-menu-custard',
    sku: 'GD-PNT-019',
    short_description: 'So creamy — creamy & delicious custard mix.',
    description:
      'The Prairie Menu Custard — so creamy! Creamy and delicious custard powder. Quality since 1989.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__3_-4484a806-c495-4eb5-8527-e79344b7324c.png',
  },
  {
    categorySlug: 'home-kitchen',
    name: 'EGL Essentials Kettle 1.7L',
    slug: 'egl-essentials-kettle-1-7l',
    sku: 'GD-HMK-001',
    short_description: 'Matte black kettle — auto shut-off, boil dry protection.',
    description:
      'EGL Essentials Kettle — 1.7L capacity, matte black. BPA free, auto shut-off and boil dry protection. Water level indicator window.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__4_-1ecc30bf-96ef-4147-a876-2fbaa83a934f.png',
  },
  {
    categorySlug: 'home-kitchen',
    name: 'HOMELIFE Café 5 Piece Non-Stick Pan Set',
    slug: 'homelife-cafe-5-piece-pan-set',
    sku: 'GD-HMK-002',
    short_description: 'Non-stick pressed pan set — gas, electric & induction.',
    description:
      'HOMELIFE café 5 Piece Non-Stick Pressed Pan Set — includes 20cm and 24cm frypans, 18cm saucepan with lid, 20cm casserole with lid, and 16cm milk pot. Compatible with gas, electric, ceramic, halogen and induction.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__5_-b8eb2283-c686-4cfd-895c-24e50cc82273.png',
  },
  {
    categorySlug: 'home-kitchen',
    name: 'Tower Sonar White Kettle 1.7L',
    slug: 'tower-sonar-white-kettle-1-7l',
    sku: 'GD-HMK-003',
    short_description: '3KW rapid boil — illuminating blue water window.',
    description:
      'Tower Sonar White 1.7 Litre Kettle — 3KW rapid boil technology, boils 1 cup in 45 seconds. Illuminating blue water window, 360° swivel base. 3-year guarantee.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__6_-1fadfd9a-32a7-40ff-838e-1fa470fc3ea7.png',
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

async function getOrCreateCategory(slug) {
  const { data: existing } = await supabase
    .from('categories')
    .select('id, name')
    .eq('slug', slug)
    .maybeSingle();

  if (existing) return existing;

  if (slug !== HOME_KITCHEN_CATEGORY.slug) {
    throw new Error(`Category not found: ${slug}`);
  }

  const heroImage = await uploadImage('home-kitchen-hero', PRODUCTS[7].file);

  const { data: created, error } = await supabase
    .from('categories')
    .insert({ ...HOME_KITCHEN_CATEGORY, image_url: heroImage, status: 'active' })
    .select('id, name')
    .single();

  if (error) throw new Error(`Category create failed: ${error.message}`);
  console.log(`Created category: ${created.name}\n`);
  return created;
}

async function main() {
  const categoryCache = new Map();

  for (const p of PRODUCTS) {
    if (!categoryCache.has(p.categorySlug)) {
      categoryCache.set(p.categorySlug, await getOrCreateCategory(p.categorySlug));
      console.log(`Category: ${categoryCache.get(p.categorySlug).name}`);
    }

    const category = categoryCache.get(p.categorySlug);
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
