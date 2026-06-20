/**
 * Add batch 7 — Household & Personal Care products.
 * Run: node scripts/add-products-batch7.mjs
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
    name: 'Cif Kitchen Degreaser Cleanboost',
    slug: 'cif-kitchen-degreaser-cleanboost',
    sku: 'GD-HHD-011',
    short_description: 'Removes 100% tough grease — smear-free finish.',
    description:
      'Cif Kitchen Degreaser Cleanboost — removes 100% tough grease from hobs, extractor fans and microwaves. Smear-free finish on preparation areas.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__6_-761c4382-1768-46af-9933-b261187068ca.png',
  },
  {
    name: 'Carex Professional Complete Original Hand Wash 5L',
    slug: 'carex-professional-complete-original-5l',
    sku: 'GD-HHD-012',
    short_description: 'Antibacterial hand wash — kills 99.9% of bacteria.',
    description:
      'Cussons Carex Professional Complete Original Hand Wash — kills 99.9% of bacteria. Dermatologically tested. Professional range, 5 litres.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__7_-b5669a1a-76a3-4760-9381-2be8f9a1cfad.png',
  },
  {
    name: 'Fairy Non Bio Liquid XXL Mega Pack (42 Washes)',
    slug: 'fairy-non-bio-liquid-42-washes',
    sku: 'GD-HHD-013',
    short_description: 'Huggably soft for sensitive skin — non-bio liquid.',
    description:
      'Fairy Non Bio Liquid — huggably soft for sensitive skin. Voted #1 laundry brand for sensitive skin. XXL mega pack, 42 washes.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__8_-2bfff1ed-9f93-462a-818c-6aa0cf9c48fb.png',
  },
  {
    name: 'Ariel Original Liquid Detergent Mega Pack (42 Washes)',
    slug: 'ariel-original-liquid-42-washes',
    sku: 'GD-HHD-014',
    short_description: 'Brilliant stain removal — works in cold & short cycles.',
    description:
      'Ariel Original Liquid Detergent — brilliant stain removal even in 1 wash. Works brilliantly in cold and short cycles. Mega pack, 42 washes. 100% recyclable bottle & cap.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__9_-9bb0c667-6d1a-44c4-b415-d284575beda9.png',
  },
  {
    name: 'Astonish Protect + Care Aloe Vera Handwash 600ml',
    slug: 'astonish-protect-care-aloe-handwash-600ml',
    sku: 'GD-HHD-015',
    short_description: 'Anti-bacterial handwash — removes 99.9% of bacteria.',
    description:
      'Astonish Protect + Care Anti-Bacterial Handwash Soothing Aloe Vera — removes 99.9% of bacteria. pH balanced, no triclosan. Vegan. 600ml.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__10_-da73f6cb-b6d7-4511-a7e3-1ceb8d787b3d.png',
  },
  {
    name: 'NIVEA MEN Cool Kick Anti-Perspirant 150ml',
    slug: 'nivea-men-cool-kick-150ml',
    sku: 'GD-HHD-016',
    short_description: 'Quick dry anti-perspirant — 48h protection.',
    description:
      'NIVEA MEN Cool Kick Anti-Perspirant — quick dry formula with 48-hour protection. 150ml spray.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__11_-7138444e-2199-4791-9e10-cc7a56e3111e.png',
  },
  {
    name: 'Vaseline Aloe Sensitive Anti-Perspirant Deodorant',
    slug: 'vaseline-aloe-sensitive-deodorant',
    sku: 'GD-HHD-017',
    short_description: '48h protection with pro-ceramide + aloe vera.',
    description:
      'Vaseline Aloe Sensitive Anti-Perspirant Deodorant — 48-hour protection with pro-ceramide and aloe vera. For sensitive skin.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__12_-8fe35e7d-a845-4c28-b38e-185c968f62e1.png',
  },
  {
    name: "L'Oréal Men Expert Magnesium Defence Deodorant 48H",
    slug: 'loreal-magnesium-defence-deodorant',
    sku: 'GD-HHD-018',
    short_description: 'Hypoallergenic — 0% colourant & aluminium salts.',
    description:
      "L'Oréal Paris Men Expert Magnesium Defence 48H Deodorant — hypoallergenic, 0% colourant and aluminium salts. New: 5 ingredients only. For sensitive skin.",
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__13_-38ca2788-f40b-495f-b569-61a4340a800d.png',
  },
  {
    name: "L'Oréal Men Expert Hydra Energetic Anti-Perspirant 72H",
    slug: 'loreal-hydra-energetic-72h',
    sku: 'GD-HHD-019',
    short_description: '72h anti-odour non-stop freshness — 0% alcohol.',
    description:
      "L'Oréal Paris Men Expert Hydra Energetic Anti-Perspirant — 72-hour anti-odour non-stop freshness. 0% alcohol.",
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__14_-5c4ad0c8-c45f-4006-a41c-bc7c2e4e7a82.png',
  },
  {
    name: "L'Oréal Men Expert Shirt Protect 48H Anti-Perspirant",
    slug: 'loreal-shirt-protect-48h',
    sku: 'GD-HHD-020',
    short_description: 'Mark-fighting — protects from yellow stains.',
    description:
      "L'Oréal Paris Men Expert Shirt Protect — mark-fighting anti-perspirant with 48-hour protection. Protects from yellow stains. Boosted freshness.",
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__15_-abf5f13b-cd27-4112-adc5-7bee4c9a9dd7.png',
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

async function main() {
  const { data: category, error: catErr } = await supabase
    .from('categories')
    .select('id, name')
    .eq('slug', 'household-personal-care')
    .single();
  if (catErr || !category) throw new Error(`Category not found: ${catErr?.message}`);
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
