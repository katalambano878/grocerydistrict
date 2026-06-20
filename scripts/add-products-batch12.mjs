/**
 * Add batch 12 — Home & Kitchen + Pantry.
 * Run: node scripts/add-products-batch12.mjs
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

const PRODUCTS = [
  {
    categorySlug: 'home-kitchen',
    name: 'EGL Dual Drawer Air Fryer',
    slug: 'egl-dual-drawer-air-fryer',
    sku: 'GD-HMK-004',
    short_description: 'Cook two foods, finish together — little or no oil.',
    description:
      'EGL Dual Drawer Air Fryer — cook two foods and finish together. Dual independent drawers with viewing windows. Air circulation technology, little or no oil. Energy efficient.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__7_-391b86a2-7415-4174-996b-48b2d743895f.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: 'Mai Thai AAA Jasmine Fragrant Rice',
    slug: 'mai-thai-aaa-jasmine-fragrant-rice',
    sku: 'GD-PNT-020',
    short_description: '100% Thai Hom Mali rice — AAA grade jasmine.',
    description:
      'Mai Thai AAA Jasmine Fragrant Rice — 100% Thai Hom Mali rice. Premium AAA grade aromatic jasmine rice.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__8_-4c39508b-ea1f-4a76-9d62-fe701f6797cd.png',
  },
  {
    categorySlug: 'home-kitchen',
    name: 'HOMELIFE Café 5 Piece Non-Stick Ribbed Pan Set',
    slug: 'homelife-cafe-5-piece-ribbed-pan-set',
    sku: 'GD-HMK-005',
    short_description: 'Ribbed non-stick set — induction suitable, PFOA free.',
    description:
      'HOMELIFE café 5 Piece Non-Stick Ribbed Pan Set — includes 18cm and 20cm saucepans with lids, 24cm and 28cm frying pans, and 28cm sauté pan with lid. PFOA free, dishwasher safe, induction suitable.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__10_-266387ae-0935-4ab3-bb9f-4a7c79ff7b04.png',
  },
  {
    categorySlug: 'home-kitchen',
    name: 'Countertop Cereal Dispenser',
    slug: 'countertop-cereal-dispenser',
    sku: 'GD-HMK-006',
    short_description: 'Portion control — keeps food fresh on the counter.',
    description:
      'Countertop Cereal Dispenser — easy to use with portion control. Keeps cereal, grains and snacks fresh. Perfect for any kitchen counter.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__9_-c196e60f-4e42-4866-b9cb-328dbfe03be6.png',
  },
  {
    categorySlug: 'home-kitchen',
    name: 'Tower Sonar White Kettle 1.7L',
    slug: 'tower-sonar-white-kettle-1-7l-2',
    sku: 'GD-HMK-007',
    short_description: '3KW rapid boil — illuminating blue water window.',
    description:
      'Tower Sonar White 1.7 Litre Kettle — 3KW rapid boil technology, boils 1 cup in 45 seconds. Illuminating blue water window, 360° swivel base. 3-year guarantee.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__11_-108d647d-5fab-4d79-8be6-b4f48f813e72.png',
  },
  {
    categorySlug: 'home-kitchen',
    name: 'Russell Hobbs Metallic Marble 5 Piece Pan Set',
    slug: 'russell-hobbs-metallic-marble-5-piece-pan-set',
    sku: 'GD-HMK-008',
    short_description: 'Easy clean non-stick — induction suitable, 10-year guarantee.',
    description:
      'Russell Hobbs Metallic Marble 5 Piece Pan Set — includes 16cm, 18cm and 20cm saucepans with lids, 24cm and 28cm frypans. Easy clean non-stick, induction suitable for all hob types. 10-year guarantee.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__12_-33069be9-ecfb-4674-9316-3c28d47bb870.png',
  },
  {
    categorySlug: 'home-kitchen',
    name: 'Cookworks Black Plastic Jug Blender 1.5L',
    slug: 'cookworks-black-jug-blender-1-5l',
    sku: 'GD-HMK-009',
    short_description: '2 speed blender with pulse — stainless steel blades.',
    description:
      'Cookworks Black Plastic Jug Blender — 1.5 litre capacity, 2 speed settings with pulse function. Stainless steel blades.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__13_-8201066a-27a4-4665-afbd-ad649ef87a54.png',
  },
  {
    categorySlug: 'home-kitchen',
    name: 'EGL 3L Deep Fat Fryer',
    slug: 'egl-3l-deep-fat-fryer',
    sku: 'GD-HMK-010',
    short_description: 'Family size 3L fryer — adjustable thermostat, 3-year warranty.',
    description:
      'EGL 3L Deep Fat Fryer — family size for deep fried meals and chips. Stainless steel body, adjustable thermostat, cool touch handles. 3-year warranty.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__14_-80ba9716-0ed7-4464-a1cf-ae033f3c75d4.png',
  },
  {
    categorySlug: 'home-kitchen',
    name: 'Morphy Richards 23L 900W Digital Microwave Silver',
    slug: 'morphy-richards-23l-900w-microwave-silver',
    sku: 'GD-HMK-011',
    short_description: '23 litre digital microwave — 900W, 1-year guarantee.',
    description:
      'Morphy Richards 23 Litres 900W Digital Silver Microwave — digital controls with rotary dial. Smart ideas for your home. 1-year guarantee.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__17_-4dd55c77-784e-49a7-9d79-4d579ae0e7fe.png',
  },
  {
    categorySlug: 'home-kitchen',
    name: 'Tower 2600W Ultraspeed Steam Iron',
    slug: 'tower-2600w-ultraspeed-steam-iron',
    sku: 'GD-HMK-012',
    short_description: 'Ceraglide ceramic soleplate — self clean anti-calc, 3-year guarantee.',
    description:
      'Tower 2600W Ultraspeed Steam Iron — ceraglide advanced ceramic coating for faster gliding. Variable steam control, built-in self clean anti-calc. 3-year guarantee.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__18_-5d82b56a-0144-447a-9acd-2a4083f9fd17.png',
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

async function getCategory(slug) {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name')
    .eq('slug', slug)
    .single();
  if (error || !data) throw new Error(`Category not found (${slug}): ${error?.message}`);
  return data;
}

async function main() {
  const categoryCache = new Map();

  for (const p of PRODUCTS) {
    if (!categoryCache.has(p.categorySlug)) {
      categoryCache.set(p.categorySlug, await getCategory(p.categorySlug));
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
