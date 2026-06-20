/**
 * Add batch 14 — Pantry + Giggle by Smiggle school set (with design variants).
 * Run: node scripts/add-products-batch14.mjs
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

const SCHOOL_CATEGORY = {
  name: 'School & Kids',
  slug: 'school-kids',
  description:
    'School bags, lunch sets and kids essentials — quality picks for the term.',
  image_url: null,
  position: 6,
  metadata: {
    chip: 'School',
    icon: 'ri-backpack-line',
    color: 'bg-[#2B2C86]',
    featured: true,
  },
};

const SCHOOL_SET = {
  name: 'Giggle by Smiggle 4 Piece School Set',
  slug: 'giggle-by-smiggle-4-piece-school-set',
  sku: 'GD-SCH-001',
  short_description: 'Backpack, XL lunchbox, drink bottle & pencil case.',
  description:
    'Giggle by Smiggle 4 Piece School Set — includes backpack, XL lunchbox, drink bottle (450–460 mL) and pencil case. Choose your favourite design.',
  variants: [
    {
      name: 'Soccer Colourful',
      sku: 'GD-SCH-001-V01',
      file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__29_-b0091b91-0f6f-444f-8933-afa4bcc54e06.png',
    },
    {
      name: 'Gaming Blue',
      sku: 'GD-SCH-001-V02',
      file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__24_-30c4261c-cfb4-46b2-81e8-77fabbb5824e.png',
    },
    {
      name: 'Unicorn Stars',
      sku: 'GD-SCH-001-V03',
      file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__25_-19dbb1c6-adba-4f0e-be06-2124708f0132.png',
    },
    {
      name: 'Leopard Print',
      sku: 'GD-SCH-001-V04',
      file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__26_-aa847702-50ee-42e9-8e74-229149b18d93.png',
    },
    {
      name: 'Unicorn Rainbow',
      sku: 'GD-SCH-001-V05',
      file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__27_-f9b5509b-8fac-40e0-94f1-a79189222f45.png',
    },
    {
      name: 'Soccer Black & Grey',
      sku: 'GD-SCH-001-V06',
      file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM__28_-9156f890-9712-4a9f-b758-28aeb905fb8b.png',
    },
  ],
};

const RICE = {
  categorySlug: 'pantry-condiments',
  name: 'Peacock Thai Hom Mali Fragrant Rice 10kg',
  slug: 'peacock-thai-hom-mali-rice-10kg',
  sku: 'GD-PNT-024',
  short_description: 'AAA grade — new crop 100% pure Thai Hom Mali rice.',
  description:
    'Peacock Thai Hom Mali Fragrant Rice — new crop, 100% pure Thai Hom Mali. AAA grade, product of Thailand. 10 kg.',
  file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-19_at_1.17.41_PM-0f13104d-cdf3-4ddc-a05a-aceedc2fdbf2.png',
};

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

async function getOrCreateSchoolCategory(heroFile) {
  const { data: existing } = await supabase
    .from('categories')
    .select('id, name')
    .eq('slug', SCHOOL_CATEGORY.slug)
    .maybeSingle();

  if (existing) return existing;

  const heroImage = await uploadImage('school-kids-hero', heroFile);

  const { data: created, error } = await supabase
    .from('categories')
    .insert({ ...SCHOOL_CATEGORY, image_url: heroImage, status: 'active' })
    .select('id, name')
    .single();

  if (error) throw new Error(`Category create failed: ${error.message}`);
  console.log(`Created category: ${created.name}\n`);
  return created;
}

async function insertSimpleProduct(p, category) {
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

  if (error) throw new Error(`${p.name}: ${error.message}`);

  const { error: imgErr } = await supabase.from('product_images').insert({
    product_id: inserted.id,
    url: imageUrl,
    alt_text: p.name,
    position: 0,
  });
  if (imgErr) console.error(`    image failed: ${imgErr.message}`);

  return inserted;
}

async function insertSchoolSetWithVariants(category) {
  const firstVariantImage = await uploadImage(
    `${SCHOOL_SET.slug}-soccer-colourful`,
    SCHOOL_SET.variants[0].file
  );

  const { data: product, error } = await supabase
    .from('products')
    .insert({
      name: SCHOOL_SET.name,
      slug: SCHOOL_SET.slug,
      description: SCHOOL_SET.description,
      short_description: SCHOOL_SET.short_description,
      price: 0,
      sku: SCHOOL_SET.sku,
      quantity: 0,
      track_quantity: true,
      category_id: category.id,
      status: 'active',
      featured: false,
      rating_avg: 0,
      review_count: 0,
      tags: ['grocery-district', 'accra', 'imported', 'school'],
    })
    .select('id, name, sku')
    .single();

  if (error) throw new Error(`${SCHOOL_SET.name}: ${error.message}`);

  await supabase.from('product_images').insert({
    product_id: product.id,
    url: firstVariantImage,
    alt_text: SCHOOL_SET.name,
    position: 0,
  });

  for (let i = 0; i < SCHOOL_SET.variants.length; i++) {
    const v = SCHOOL_SET.variants[i];
    const imageUrl = await uploadImage(
      `${SCHOOL_SET.slug}-${v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      v.file
    );

    const { error: varErr } = await supabase.from('product_variants').insert({
      product_id: product.id,
      name: v.name,
      sku: v.sku,
      price: 0,
      quantity: 1,
      option1: v.name,
      option2: 'Design',
      image_url: imageUrl,
      metadata: { design: v.name },
    });

    if (varErr) {
      console.error(`    ✗ variant ${v.name}: ${varErr.message}`);
    } else {
      console.log(`    ↳ ${v.name} (${v.sku}) — stock 1`);
    }
  }

  return product;
}

async function main() {
  const pantry = await getCategory(RICE.categorySlug);
  console.log(`Category: ${pantry.name}`);
  const rice = await insertSimpleProduct(RICE, pantry);
  console.log(`  ✓ ${rice.name} (${rice.sku})`);

  const school = await getOrCreateSchoolCategory(SCHOOL_SET.variants[0].file);
  console.log(`Category: ${school.name}`);
  const set = await insertSchoolSetWithVariants(school);
  console.log(`  ✓ ${set.name} (${set.sku}) — 6 design variants`);

  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });
  console.log(`\nDone. Total products now: ${count}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
