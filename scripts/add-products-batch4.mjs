/**
 * Add batch 4 of products to "Snacks, Biscuits & Chocolates".
 * Run: node scripts/add-products-batch4.mjs
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
    name: 'Tesco Butter Mintoes',
    slug: 'tesco-butter-mintoes',
    sku: 'GD-SNK-028',
    short_description: 'Smooth & minty toffee sweets.',
    description:
      'Tesco Butter Mintoes — smooth and minty sweets with a buttery toffee flavour. Inspired by a traditional sweet shop recipe.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.37_AM__7_-a7db5e13-2c48-4c6e-9189-84d41f2d440d.png',
  },
  {
    name: 'Snickers 8 Snacksize Bars (276g)',
    slug: 'snickers-8-snacksize-bars',
    sku: 'GD-SNK-029',
    short_description: 'Nougat, caramel & peanuts in milk chocolate — 8 bars.',
    description:
      'Snickers 8 Snacksize Bars — nougat topped with caramel and peanuts, coated in milk chocolate. Multipack of 8 bars, 276g total.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.37_AM__8_-8845887b-004c-4758-bfc6-781fa4abe252.png',
  },
  {
    name: 'ASDA Crunchy Caramelised Biscuit Spread',
    slug: 'asda-crunchy-biscuit-spread',
    sku: 'GD-SNK-030',
    short_description: 'Crunchy caramelised biscuit spread — ideal for desserts.',
    description:
      'ASDA Crunchy Caramelised Biscuit Spread — moreishly crunchy and rich, ideal for desserts and baking. Spread on toast or use in recipes.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.37_AM__9_-1c828d00-0281-4d5b-8c74-f2721b7ad186.png',
  },
  {
    name: 'Gelatelli Waffle Cones (10 Pack)',
    slug: 'gelatelli-waffle-cones-10-pack',
    sku: 'GD-SNK-031',
    short_description: 'Big value pack of 10 waffle cones.',
    description:
      'Gelatelli Waffle Cones — golden waffle cones perfect for ice cream. Big value pack of 10. Family favourite.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.37_AM__10_-5d0859f1-f4c0-4948-89cd-4650a0cfda4c.png',
  },
  {
    name: 'Kinder Bueno Milk & Hazelnuts (10 Bars)',
    slug: 'kinder-bueno-10-bars',
    sku: 'GD-SNK-032',
    short_description: 'Crispy wafer with hazelnut cream — 10 individually wrapped bars.',
    description:
      'Kinder Bueno Milk & Hazelnuts — crispy wafer filled with hazelnut cream, coated in milk chocolate. Multipack of 10 individually wrapped fingers.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.37_AM__11_-d780e2ee-950d-4ae2-8ea9-c41a4544d6c9.png',
  },
  {
    name: 'Galaxy Instant Hot Chocolate',
    slug: 'galaxy-instant-hot-chocolate',
    sku: 'GD-SNK-033',
    short_description: 'Smooth drinking chocolate — makes approx. 7 mugs.',
    description:
      'Galaxy Instant Hot Chocolate — smooth and indulgent drinking chocolate. Just add water. Makes approximately 7 mugs.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.37_AM-fda53247-5b48-420d-8cb8-4bd2ddf0fe9e.png',
  },
  {
    name: 'Harvest Morn Caramelised Biscuit Cereal',
    slug: 'harvest-morn-caramelised-biscuit-cereal',
    sku: 'GD-SNK-034',
    short_description: 'Ball-shaped biscuit cereal — source of fibre.',
    description:
      'Harvest Morn Caramelised Biscuit Cereal — delicious ball-shaped cereal with a caramelised biscuit taste. Source of fibre. 12 servings.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.38_AM__1_-7f989905-fb52-4d3a-895e-73c7ebdab5d6.png',
  },
  {
    name: 'Harvest Morn Cocoa Peanut Butter Balls',
    slug: 'harvest-morn-cocoa-peanut-butter-balls',
    sku: 'GD-SNK-035',
    short_description: 'Real peanut butter & cocoa cereal balls — 9 servings.',
    description:
      'Harvest Morn Cocoa Peanut Butter Balls — made with real peanut butter and cocoa. Source of fibre. Suitable for vegetarians. 9 servings.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.38_AM__2_-e2ba78d1-d8e6-43b9-a2e6-8efa800930ba.png',
  },
  {
    name: 'Alpen No Added Sugar — The Swiss Recipe',
    slug: 'alpen-no-added-sugar',
    sku: 'GD-SNK-036',
    short_description: 'Muesli with raisins, almonds, hazelnuts & oats.',
    description:
      'Alpen No Added Sugar — the Swiss recipe. Crunchy chewy spoonfuls of juicy raisins, almonds, hazelnuts and wholesome oats. 30% more fruit.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.38_AM__3_-a6923b1f-db72-458e-b0f8-b1f18f159fc3.png',
  },
  {
    name: 'Twix Fingers (9 Pack)',
    slug: 'twix-fingers-9-pack',
    sku: 'GD-SNK-037',
    short_description: 'Crispy biscuit fingers with caramel & chocolate — 9 pack.',
    description:
      'Twix Fingers — crispy biscuit fingers topped with caramel and coated in milk chocolate. Multipack of 9.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.38_AM__4_-2f8cf9c1-27c1-404f-aadb-43b9d5d12a52.png',
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
