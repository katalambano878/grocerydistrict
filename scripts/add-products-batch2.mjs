/**
 * Add batch 2 of products to the existing "Snacks, Biscuits & Chocolates" category.
 * Uploads photos to the `product-images` bucket, inserts products (price 0, stock 1, active).
 * Run: node scripts/add-products-batch2.mjs
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
    name: "M&M's Minis Chocolate Cookies",
    slug: 'mms-minis-chocolate-cookies',
    sku: 'GD-SNK-009',
    short_description: 'Soft cookies baked with M&M\u2019s minis chocolate.',
    description:
      "M&M's Minis Chocolate Cookies — soft, chewy cookies loaded with colourful M&M's minis chocolate buttons. A fun treat for kids and grown-ups.",
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.34_AM__5_-95ec28fc-d9f0-40a5-802b-c36a7f6765a5.png',
  },
  {
    name: 'Alesto Selection Almonds (Natural)',
    slug: 'alesto-almonds-natural',
    sku: 'GD-SNK-010',
    short_description: 'Natural almonds — source of protein & magnesium.',
    description:
      'Alesto Selection Natural Almonds — delicious as a snack. A natural source of protein and magnesium. Suitable for vegetarians.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.34_AM-d46c89b8-814c-4722-9177-c7c35b8e0fed.png',
  },
  {
    name: 'Merba Chocolate Cookies 150g',
    slug: 'merba-chocolate-cookies-150g',
    sku: 'GD-SNK-011',
    short_description: 'American-style cookies with 25% chocolate chunks.',
    description:
      'Merba Chocolate Cookies — American-style chocolate chip cookies with 25% delicious chocolate chunks. 150g.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.35_AM__1_-4a1ea3e7-82a9-4c7e-9a04-d95a428c13a4.png',
  },
  {
    name: "Werther's Original Soft Caramels",
    slug: 'werthers-original-soft-caramels',
    sku: 'GD-SNK-012',
    short_description: 'Soft & creamy classic caramel sweets.',
    description:
      "Werther's Original Soft Caramels — soft, creamy and rich caramel sweets made to traditional Werther's quality.",
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.35_AM__2_-14393655-3c0a-4737-9156-c4097f5ded60.png',
  },
  {
    name: 'Stockwell & Co. Chocolate Spread',
    slug: 'stockwell-chocolate-spread',
    sku: 'GD-SNK-013',
    short_description: 'Smooth chocolate spread for bread & treats.',
    description:
      'Stockwell & Co. Chocolate Spread — smooth and rich chocolate spread, perfect on bread, toast and pancakes.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.35_AM__3_-af649951-67ce-41fd-af9c-6d9b039f7aac.png',
  },
  {
    name: "Oreo O's Cereal (x11)",
    slug: 'oreo-os-cereal',
    sku: 'GD-SNK-014',
    short_description: 'Chocolatey Oreo breakfast cereal rings.',
    description:
      "Oreo O's Cereal — chocolatey breakfast cereal rings with the classic Oreo taste. New improved taste. Up to 11 servings.",
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.35_AM__5_-416342a2-16fa-4554-a11e-68da9f569984.png',
  },
  {
    name: "The Grower's Harvest Porridge Oats",
    slug: 'growers-harvest-porridge-oats',
    sku: 'GD-SNK-015',
    short_description: 'Wholesome rolled porridge oats.',
    description:
      "The Grower's Harvest Porridge Oats — just wholesome rolled oats, farm grown. Perfect for a hearty, healthy breakfast.",
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.35_AM-b7bcde78-5979-44a9-8e70-e0b4de763ad1.png',
  },
  {
    name: 'Haribo Chamallows Pink & White (Share Size)',
    slug: 'haribo-chamallows-pink-white',
    sku: 'GD-SNK-016',
    short_description: 'Soft pink & white marshmallows.',
    description:
      'Haribo Chamallows Pink & White — soft, fluffy marshmallows that kids and grown-ups love. Share size from the happy world of Haribo.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.36_AM__2_-dddfa8c4-8706-4461-9f2c-45403e0ef619.png',
  },
  {
    name: 'Haribo Starmix (Share Size)',
    slug: 'haribo-starmix',
    sku: 'GD-SNK-017',
    short_description: 'Assorted gummy & foam sweets mix.',
    description:
      'Haribo Starmix — a fun mix of gummy bears, hearts, rings, cola bottles and foam sweets. Share size from the happy world of Haribo.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.36_AM__1_-9d123efd-beee-4db0-91bd-c8ee5b0f35fb.png',
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
    .eq('slug', 'snacks-biscuits-chocolates')
    .single();
  if (catErr || !category) throw new Error(`Category not found: ${catErr?.message}`);
  console.log(`Category: ${category.name} (${category.id})\n`);

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
      .select('id, name')
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
    console.log(`  ✓ ${inserted.name}`);
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
