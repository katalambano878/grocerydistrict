/**
 * Reset catalog for Grocery District:
 *  - Upload the 8 new product photos to the `product-images` storage bucket
 *  - Delete all existing categories + sample products (and their images/variants)
 *  - Create the "Snacks, Biscuits & Chocolates" category
 *  - Insert the 8 new products (price 0.00 placeholder, stock 1, active)
 *
 * Run: node scripts/reset-catalog.mjs
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

// slug -> source image file
const PRODUCTS = [
  {
    name: 'Tower Gate Milk Chocolate Digestives',
    slug: 'tower-gate-milk-chocolate-digestives',
    sku: 'GD-SNK-001',
    featured: true,
    short_description: 'Milk chocolate coated wheat digestive biscuits.',
    description:
      'Tower Gate Milk Chocolate Digestives — classic wheat biscuits coated in smooth milk chocolate. A perfect tea-time treat, imported from the UK.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.29_AM__1_-6fc4ef33-4b3b-44c3-92e6-d50f2ac32d97.png',
  },
  {
    name: 'Cadbury Eclairs 110g',
    slug: 'cadbury-eclairs-110g',
    sku: 'GD-SNK-002',
    featured: true,
    short_description: 'Chewy caramel sweets with a Cadbury chocolate centre.',
    description:
      'Cadbury Eclairs 110g — chewy golden caramel wrapped around a rich Cadbury chocolate centre. Perfect for sharing.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.29_AM-b91f6895-db1d-40d3-80fc-4db0c2532c2a.png',
  },
  {
    name: 'Ritz Breaks Original (6 Portion Packs)',
    slug: 'ritz-breaks-original-6-pack',
    sku: 'GD-SNK-003',
    featured: false,
    short_description: 'Crispy, buttery crackers in 6 handy portion packs.',
    description:
      'Ritz Bakery Breaks Original — crispy, lightly salted buttery crackers in 6 convenient portion packs. Great for snacking on the go.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.30_AM-7c582fb1-5606-4316-bee3-3b9f4f28a6f3.png',
  },
  {
    name: 'Nestlé KitKat Chunky 4-Pack',
    slug: 'nestle-kitkat-chunky-4-pack',
    sku: 'GD-SNK-004',
    featured: true,
    short_description: 'Chunky milk chocolate wafer bars — pack of 4.',
    description:
      'Nestlé KitKat Chunky 4-Pack — thick, crispy wafer fingers covered in smooth milk chocolate. Have a break, have a KitKat.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.30_AM__2_-dcdb2c3d-3b59-43bd-a06f-faabaa82fa11.png',
  },
  {
    name: 'Snaktastic Salted Microwave Popcorn (3x100g)',
    slug: 'snaktastic-salted-microwave-popcorn-3x100g',
    sku: 'GD-SNK-005',
    featured: false,
    short_description: 'Salted microwave popcorn — 3 x 100g, high in fibre.',
    description:
      'Snaktastic Salted Microwave Popcorn — a fun snack for the whole family. High in fibre, perfect for movie nights in. 3 x 100g.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.34_AM__2_-d7cd7e8b-ad77-4dfc-ad38-d36310cefcdb.png',
  },
  {
    name: 'Snaktastic Sweet Microwave Popcorn (3x100g)',
    slug: 'snaktastic-sweet-microwave-popcorn-3x100g',
    sku: 'GD-SNK-006',
    featured: false,
    short_description: 'Sweet microwave popcorn — 3 x 100g, high in fibre.',
    description:
      'Snaktastic Sweet Microwave Popcorn — a fun snack for the whole family. High in fibre, perfect for movie nights in. 3 x 100g.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.34_AM__4_-930463c7-c658-4e45-a80d-52c53809172d.png',
  },
  {
    name: 'Nutella Biscuits (x20)',
    slug: 'nutella-biscuits-x20',
    sku: 'GD-SNK-007',
    featured: true,
    short_description: 'Crunchy biscuits with a creamy heart of Nutella.',
    description:
      'Nutella Biscuits — crunchy baked biscuits with a creamy heart of Nutella hazelnut spread. Pack of 20. An irresistible everyday treat.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.34_AM__1_-8d11171e-2956-4445-9ad8-0838d8079f8a.png',
  },
  {
    name: "McVitie's Digestives White",
    slug: 'mcvities-digestives-white',
    sku: 'GD-SNK-008',
    featured: false,
    short_description: 'Wheat biscuits covered in white chocolate.',
    description:
      "McVitie's Digestives White — the nation's favourite wheat biscuits covered in smooth white chocolate. Baked with 100% wheat. A delicious tea-time classic.",
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.34_AM__3_-8ce561b6-ad98-4952-80e7-4d9c37dfb3b6.png',
  },
];

async function uploadImage(slug, file) {
  const buffer = readFileSync(A(file));
  const path = `catalog/${slug}.png`;
  const { error } = await supabase.storage
    .from('product-images')
    .upload(path, buffer, { contentType: 'image/png', upsert: true });
  if (error) throw new Error(`Upload failed (${slug}): ${error.message}`);
  const { data } = supabase.storage.from('product-images').getPublicUrl(path);
  return data.publicUrl;
}

async function safeDeleteAll(table) {
  const { error } = await supabase
    .from(table)
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) console.log(`  (skip ${table}: ${error.message})`);
  else console.log(`  cleared ${table}`);
}

async function main() {
  console.log('1) Uploading product images...');
  for (const p of PRODUCTS) {
    p.imageUrl = await uploadImage(p.slug, p.file);
    console.log(`  ✓ ${p.name}`);
  }

  console.log('\n2) Clearing existing catalog...');
  // Order matters for foreign keys: dependents first.
  await safeDeleteAll('product_images');
  await safeDeleteAll('product_variants');
  await safeDeleteAll('reviews');
  await safeDeleteAll('products');
  await safeDeleteAll('categories');

  console.log('\n3) Creating category "Snacks, Biscuits & Chocolates"...');
  const { data: category, error: catErr } = await supabase
    .from('categories')
    .insert({
      name: 'Snacks, Biscuits & Chocolates',
      slug: 'snacks-biscuits-chocolates',
      description:
        'Imported biscuits, chocolates, popcorn and treats from the UK and beyond — wholesale and retail.',
      image_url: PRODUCTS[3].imageUrl, // KitKat shot as category hero
      position: 1,
      status: 'active',
      metadata: {
        chip: 'Just landed',
        icon: 'ri-cake-3-line',
        color: 'bg-[#2B2C86]',
        featured: true,
      },
    })
    .select('id, name, slug')
    .single();
  if (catErr) throw new Error(`Category insert failed: ${catErr.message}`);
  console.log(`  ✓ ${category.name} (${category.id})`);

  console.log('\n4) Inserting products...');
  for (const p of PRODUCTS) {
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
        featured: p.featured,
        rating_avg: 0,
        review_count: 0,
        tags: ['grocery-district', 'accra', 'imported'],
      })
      .select('id, name, featured')
      .single();

    if (error) {
      console.error(`  ✗ ${p.name}: ${error.message}`);
      continue;
    }

    const { error: imgErr } = await supabase.from('product_images').insert({
      product_id: inserted.id,
      url: p.imageUrl,
      alt_text: p.name,
      position: 0,
    });
    if (imgErr) console.error(`    image failed: ${imgErr.message}`);
    console.log(`  ✓ ${inserted.name}${inserted.featured ? ' [FEATURED]' : ''}`);
  }

  console.log('\nDone. New catalog is live.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
