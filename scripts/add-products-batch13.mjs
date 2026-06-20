/**
 * Add batch 13 — Pantry, Home & Kitchen, Household.
 * Run: node scripts/add-products-batch13.mjs
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
    categorySlug: 'pantry-condiments',
    name: 'Quaker British Porridge Oats 1.5kg',
    slug: 'quaker-british-porridge-oats-1-5kg',
    sku: 'GD-PNT-021',
    short_description: 'Deliciously creamy — 100% wholegrain, 37 servings.',
    description:
      'Quaker British Porridge Oats — deliciously creamy, 100% wholegrain. Natural energy goodness. 1.5 kg, 37 servings.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__33_-a0b5c23e-713c-4194-b1e8-5c9a0a1849f0.png',
  },
  {
    categorySlug: 'home-kitchen',
    name: 'EGL 4 in 1 Snack Maker',
    slug: 'egl-4-in-1-snack-maker',
    sku: 'GD-HMK-013',
    short_description: 'Perfect hot snacks — non-stick, easy clean, 750W.',
    description:
      'EGL 4 in 1 Snack Maker — perfect hot snacks every time. Four interchangeable plates, non-stick and easy clean. 750W. 2-year warranty.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__15_-72b400a0-9802-4d1e-9d9e-bec7e867f4f0.png',
  },
  {
    categorySlug: 'home-kitchen',
    name: 'HOMELIFE Café Set of 4 Ventilated Microwave Covers',
    slug: 'homelife-ventilated-microwave-covers-4-pack',
    sku: 'GD-HMK-014',
    short_description: 'Set of 4 ventilated covers — keeps food fresh in the microwave.',
    description:
      'HOMELIFE café Set of 4 Ventilated Microwave Covers — reusable covers for reheating and storing food in the microwave.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__16_-ef6460d5-83f5-4443-8ddc-de79ae166033.png',
  },
  {
    categorySlug: 'home-kitchen',
    name: 'Philips Blender 3000 Series 450W',
    slug: 'philips-blender-3000-series-450w',
    sku: 'GD-HMK-015',
    short_description: 'Smooth blends in 45 seconds — ProBlend Crush technology.',
    description:
      'Philips Blender 3000 Series — smooth blends with no lumps in 45 seconds. ProBlend Crush technology and unique blade design. 450W. 2-year worldwide guarantee.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__19_-2bc345ba-4c54-4510-bef8-c02b27dde39e.png',
  },
  {
    categorySlug: 'household-personal-care',
    name: 'Kirkland Signature Bath Tissue 30 Rolls',
    slug: 'kirkland-signature-bath-tissue-30-rolls',
    sku: 'GD-HHD-027',
    short_description: 'Soft and absorbent — 2-ply, 380 sheets per roll.',
    description:
      'Kirkland Signature Bath Tissue — soft and absorbent. 2-ply, 30 rolls, 380 sheets per roll. FSC certified paper from responsible sources.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__21_-fc6939a7-38a6-476e-bb76-e8c0124a69ae.png',
  },
  {
    categorySlug: 'household-personal-care',
    name: 'Vaseline Intensive Care Cocoa Radiant+ 3-Pack',
    slug: 'vaseline-cocoa-radiant-3-pack',
    sku: 'GD-HHD-028',
    short_description: '48h moisture — 2 x 600mL + bonus 295mL lotion.',
    description:
      'Vaseline Intensive Care Cocoa Radiant+ — 48-hour moisture, prevents dryness. Transform dull skin with long-lasting radiant glow. 2 x 20.3 fl oz (600 mL) + bonus 10 fl oz (295 mL), 1.5 L total.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__32_-c80b984c-1176-4858-adeb-e595eeab8a81.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: 'Dairy Manor Condensed Milk',
    slug: 'dairy-manor-condensed-milk',
    sku: 'GD-PNT-022',
    short_description: 'Sweet condensed milk — ideal for baking and desserts.',
    description:
      'Dairy Manor Condensed Milk — sweet condensed milk for baking, desserts and millionaire shortbread.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__31_-d5a65aa6-4dd4-4d53-b719-148e02aea852.png',
  },
  {
    categorySlug: 'home-kitchen',
    name: 'EGL Glass Kettle 1.7L',
    slug: 'egl-glass-kettle-1-7l',
    sku: 'GD-HMK-016',
    short_description: '2200W glass jug kettle — rapid boil, 360° swivel base.',
    description:
      'EGL 1.7L Glass Jug Kettle — 2200W rapid boiling, 360° swivel base. Boil dry protection, cool touch handle, cordless pour. Maximum 1.7L capacity.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__22_-ae75db0a-7c20-415a-bb2d-940ca985c723.png',
  },
  {
    categorySlug: 'home-kitchen',
    name: 'EGL 1.7L Kettle & 2 Slice Toaster Breakfast Set',
    slug: 'egl-kettle-toaster-breakfast-set',
    sku: 'GD-HMK-017',
    short_description: 'Matching kettle and toaster — 6 browning levels, 1600W.',
    description:
      'EGL Breakfast Set — 1.7L kettle with water level indicator, removable limescale filter, 360° swivel base and boil dry protection. 2-slice toaster with 6 browning levels, cancel, reheat and defrost. 1600W.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__23_-20389f81-9ba6-4ffd-9a77-f74ee09539bb.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: 'Bramwells Original BBQ Sauce',
    slug: 'bramwells-original-bbq-sauce',
    sku: 'GD-PNT-023',
    short_description: 'Rich & smokey — for marinades and dips.',
    description:
      'Bramwells Original BBQ Sauce — rich and smokey. Perfect for marinades and dips.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__30_-93d981f8-a1bc-44cb-aac3-c91a15734ce2.png',
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
