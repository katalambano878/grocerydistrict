/**
 * Add batch 8 — Pantry & Condiments + Household & Personal Care.
 * Run: node scripts/add-products-batch8.mjs
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

const PANTRY_CATEGORY = {
  name: 'Pantry & Condiments',
  slug: 'pantry-condiments',
  description:
    'Sauces, dressings, canned goods and everyday pantry staples — imported UK groceries.',
  image_url: null,
  position: 3,
  metadata: {
    chip: 'Pantry',
    icon: 'ri-restaurant-line',
    color: 'bg-[#2B2C86]',
    featured: true,
  },
};

const PRODUCTS = [
  {
    categorySlug: 'pantry-condiments',
    name: 'Stockwell & Co. Salad Cream',
    slug: 'stockwell-co-salad-cream',
    sku: 'GD-PNT-001',
    short_description: 'Expertly blended salad cream — for quality & value.',
    description:
      'T.E. Stockwell & Co. Salad Cream — expertly blended, for quality and value. Classic creamy dressing in a squeezy bottle.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__24_-a2dec39b-874e-4124-ac1c-049c38217171.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: "Sainsbury's Italian Chopped Tomatoes 400g",
    slug: 'sainsburys-italian-chopped-tomatoes-400g',
    sku: 'GD-PNT-002',
    short_description: 'Italian chopped tomatoes in tomato juice — 1 of 5 a day.',
    description:
      "Sainsbury's Italian Chopped Tomatoes in tomato juice — 400g tin. 1 of your 5 a day.",
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__25_-7c475eda-aab5-4965-9de7-1843a3622ab1.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: 'Tesco Mayonnaise',
    slug: 'tesco-mayonnaise',
    sku: 'GD-PNT-003',
    short_description: 'Creamy mayonnaise made with free range egg yolk.',
    description:
      'Tesco Mayonnaise — creamy mayonnaise made with free range egg yolk. Squeezy bottle.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__20_-5b827889-bdf4-4bdc-8204-ad226f7b351c.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: "Sainsbury's Real Mayo",
    slug: 'sainsburys-real-mayo',
    sku: 'GD-PNT-004',
    short_description: 'Creamy mayo made with free range eggs.',
    description:
      "Sainsbury's Real Mayo — creamy mayonnaise made with free range eggs. Squeezy bottle.",
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__21_-39c2976f-e9a4-4b8a-88a0-02981a6d5e5e.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: 'Stamford Street Co. Salad Cream',
    slug: 'stamford-street-co-salad-cream',
    sku: 'GD-PNT-005',
    short_description: 'Classic salad cream in a squeezy bottle.',
    description:
      'Stamford Street Co. Salad Cream — classic tangy salad cream by Sainsbury\'s. Squeezy bottle.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__22_-c916087f-e7ae-4d0d-beb4-3c6acefe2c24.png',
  },
  {
    categorySlug: 'pantry-condiments',
    name: 'Stamford Street Co. Tomato Ketchup',
    slug: 'stamford-street-co-tomato-ketchup',
    sku: 'GD-PNT-006',
    short_description: 'Classic tomato ketchup in a squeezy bottle.',
    description:
      'Stamford Street Co. Tomato Ketchup — classic tomato ketchup by Sainsbury\'s. Squeezy bottle.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__23_-6b45cc4d-7fb9-46fe-806f-d4ff01fa400e.png',
  },
  {
    categorySlug: 'household-personal-care',
    name: 'Tree Hut Papaya Paradise Shea Sugar Scrub 510g',
    slug: 'tree-hut-papaya-paradise-sugar-scrub-510g',
    sku: 'GD-HHD-021',
    short_description: 'Shea sugar scrub with papaya extract & passion fruit.',
    description:
      'Tree Hut Papaya Paradise Shea Sugar Scrub — made with shea butter, papaya extract and passion fruit. 510g (18 oz).',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__16_-4c01f4a6-7b93-4078-b6a1-df7e4bf982e0.png',
  },
  {
    categorySlug: 'household-personal-care',
    name: 'TheraBreath Anticavity Oral Rinse Sparkle Mint',
    slug: 'therabreath-anticavity-sparkle-mint',
    sku: 'GD-HHD-022',
    short_description: 'Fluoride rinse — fights cavities 24h, no alcohol.',
    description:
      'TheraBreath Anticavity Oral Rinse Sparkle Mint — dentist formulated fluoride rinse. Helps fight cavities for 24 hours, strengthens teeth and enamel, freshens breath. No alcohol, no artificial flavours or colours.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__18_-a240c030-09af-471b-875a-9461194e1b29.png',
  },
  {
    categorySlug: 'household-personal-care',
    name: 'TheraBreath Fresh Breath Oral Rinse Rainforest Mint',
    slug: 'therabreath-fresh-breath-rainforest-mint',
    sku: 'GD-HHD-023',
    short_description: 'Fights bad breath for 12 hours — no alcohol.',
    description:
      'TheraBreath Fresh Breath Oral Rinse Rainforest Mint — dentist formulated. Fights bad breath for 12 hours. Powered by Oxygen, works instantly. No alcohol, pH balanced, non-burning.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__19_-f55eaf17-c60a-4f16-9de2-3a6241fd005f.png',
  },
  {
    categorySlug: 'household-personal-care',
    name: 'Tree Hut Raspberry Fizz Shea Sugar Scrub 510g',
    slug: 'tree-hut-raspberry-fizz-sugar-scrub-510g',
    sku: 'GD-HHD-024',
    short_description: 'Shea sugar scrub — raspberry, citrus & pop rocks scent.',
    description:
      'Tree Hut Raspberry Fizz Shea Sugar Scrub — exfoliating shea sugar scrub with raspberry, citrus and pop rocks notes. 510g (18 oz).',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__17_-b7f1a5bf-6999-4087-bd39-f1d5f5e511c6.png',
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

  if (slug !== PANTRY_CATEGORY.slug) {
    throw new Error(`Category not found: ${slug}`);
  }

  const heroImage = await uploadImage('pantry-condiments-hero', PRODUCTS[0].file);

  const { data: created, error } = await supabase
    .from('categories')
    .insert({ ...PANTRY_CATEGORY, image_url: heroImage, status: 'active' })
    .select('id, name')
    .single();

  if (error) throw new Error(`Category create failed: ${error.message}`);
  console.log(`Created category: ${created.name}\n`);
  return created;
}

async function main() {
  const categoryCache = new Map();

  async function resolveCategory(slug) {
    if (categoryCache.has(slug)) return categoryCache.get(slug);
    const category = await getOrCreateCategory(slug);
    categoryCache.set(slug, category);
    return category;
  }

  for (const p of PRODUCTS) {
    const category = await resolveCategory(p.categorySlug);
    if (!categoryCache.has(p.categorySlug)) {
      console.log(`Category: ${category.name}\n`);
    }

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
