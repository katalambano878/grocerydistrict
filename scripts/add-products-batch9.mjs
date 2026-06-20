/**
 * Add batch 9 — Pantry & Condiments + Snacks.
 * Run: node scripts/add-products-batch9.mjs
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
    name: 'Valfrutta Chopped Tomatoes in Tomato Juice',
    slug: 'valfrutta-chopped-tomatoes',
    sku: 'GD-PNT-007',
    short_description: '100% Italian chopped tomatoes in tomato juice.',
    description:
      'Valfrutta Chopped Tomatoes in Tomato Juice — 100% Italian. Cooperative Agricole.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__26_-82044ad7-9af5-4bc5-a629-a3c0cbb759cc.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: 'Meridian Smooth Peanut Butter 800g',
    slug: 'meridian-smooth-peanut-butter-800g',
    sku: 'GD-PNT-008',
    short_description: 'Smooth peanut butter — vegan, source of protein.',
    description:
      'Meridian Smooth Peanut Butter — 100% nuts, no palm oil. Vegan, source of protein. 800g jar.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__28_-7a48ebd7-5baa-4027-a938-cc63901ff844.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: 'Wikinger 8 Hot Dogs',
    slug: 'wikinger-8-hot-dogs',
    sku: 'GD-PNT-009',
    short_description: 'Smoked hot dogs in brine — high in protein.',
    description:
      'Wikinger 8 Hot Dogs — smoked, cooked in brine. High quality meat, high in protein. Quality since 1960. Jar of 8.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__27_-cebbf2cf-986c-485a-a095-a2056edf651c.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: 'Belbake Golden Syrup 750g',
    slug: 'belbake-golden-syrup-750g',
    sku: 'GD-PNT-010',
    short_description: 'Perfect for baking and drizzling.',
    description:
      'Belbake Golden Syrup — perfect for baking and drizzling. 750g squeezy bottle.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__29_-15e2fc32-941d-4d93-8528-3c131e9932c3.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: 'Maltesers Chocolate Spread',
    slug: 'maltesers-chocolate-spread',
    sku: 'GD-PNT-011',
    short_description: 'Chocolatey spread with Maltesers pieces.',
    description:
      'Maltesers Chocolate Spread — chocolatey spread with crunchy Maltesers pieces.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__30_-9a71d48c-c5b3-496f-a82a-b9b335114b28.png',
  },
  {
    categorySlug: 'snacks-biscuits-chocolates',
    name: 'Meiji Hello Panda Chocolate (30 Packets)',
    slug: 'meiji-hello-panda-chocolate-30-pack',
    sku: 'GD-SNK-048',
    short_description: 'Fun filled biscuit treats — 30 x 21g packets.',
    description:
      'Meiji Hello Panda — biscuits with chocolate flavour filling. Fun filled biscuit treats. Bulk box of 30 packets, 21g each.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM-bcb9e8a0-bc50-4597-ae3f-0844028d79da.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: 'The Creamy Menu Custard 750g',
    slug: 'the-creamy-menu-custard-750g',
    sku: 'GD-PNT-012',
    short_description: 'Creamy & delicious — easy to prepare, vegetarian.',
    description:
      'The Creamy Menu Custard — creamy and delicious. Easy to prepare, vegetarian. 750g.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__1_-0b8d8ef7-b68e-4b35-8ddf-2709e06813c6.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: 'Tesco Caramel Flavour Dessert Sauce',
    slug: 'tesco-caramel-dessert-sauce',
    sku: 'GD-PNT-013',
    short_description: 'Indulgent & smooth — perfect for ice cream & desserts.',
    description:
      'Tesco Caramel Flavour Dessert Sauce — indulgent and deliciously smooth. Perfect for ice cream, puddings and desserts.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__3_-a92fd19d-7a8a-4a85-924b-e0320e591d26.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: 'Malted Chocolate Flavour Drink Powder',
    slug: 'malted-chocolate-drink-powder',
    sku: 'GD-PNT-014',
    price: 80,
    short_description: 'Just add milk — malted chocolate flavour.',
    description:
      'Malted Chocolate Flavour Drink Powder — just add milk for a rich malted chocolate drink.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__4_-4d284178-c772-47b4-842e-ddbb3a63682d.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: 'Tesco Raspberry Flavour Dessert Sauce',
    slug: 'tesco-raspberry-dessert-sauce',
    sku: 'GD-PNT-015',
    short_description: 'Deliciously sweet & fruity — perfect for desserts.',
    description:
      'Tesco Raspberry Flavour Dessert Sauce — deliciously sweet and fruity. Perfect for ice cream, puddings and desserts.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__2_-70561332-7d71-4463-b7c9-a9c5081d2c88.png',
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
        price: p.price ?? 0,
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
