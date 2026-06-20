/**
 * Add batch 6 — Household & Personal Care products.
 * Creates category if missing, uploads images, inserts products (price 0, stock 1).
 * Run: node scripts/add-products-batch6.mjs
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

const CATEGORY = {
  name: 'Household & Personal Care',
  slug: 'household-personal-care',
  description:
    'Cleaning supplies, laundry care, paper products, skincare and personal hygiene — wholesale and retail.',
  image_url: null,
  position: 2,
  metadata: {
    chip: 'Essentials',
    icon: 'ri-home-smile-line',
    color: 'bg-[#2B2C86]',
    featured: true,
  },
};

const PRODUCTS = [
  {
    name: 'Kirkland Signature Premium Towel',
    slug: 'kirkland-signature-premium-towel',
    sku: 'GD-HHD-001',
    short_description: 'Strong, thick and absorbent — Create-A-Size sheets.',
    description:
      'Kirkland Signature Premium Towel — strong, thick and absorbent paper towels with Create-A-Size half or whole sheets.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__9_-ecb7e873-c80b-4e61-a8b8-9fff444c7833.png',
  },
  {
    name: 'Nestlé Coffee mate The Original Creamer (56 oz)',
    slug: 'nestle-coffee-mate-original-56oz',
    sku: 'GD-HHD-002',
    short_description: 'Rich & smooth coffee creamer — 750 servings.',
    description:
      "Nestlé Coffee mate The Original Coffee Creamer — rich and smooth. Gluten-free, lactose-free, made with real milk. 56 oz (1.58 kg), approx. 750 servings.",
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM-b0d6cd71-0552-406c-a583-91ec4915eaf4.png',
  },
  {
    name: 'Cetaphil Hydrating Foaming Cream Cleanser 237ml',
    slug: 'cetaphil-hydrating-foaming-cleanser-237ml',
    sku: 'GD-HHD-003',
    short_description: 'Gentle foaming cleanser for normal to dry skin.',
    description:
      'Cetaphil Hydrating Foaming Cream Cleanser — nourishing foam gently cleanses, removes dirt, oil and makeup. With prebiotic aloe, vitamins B3 & B5. Dermatologist tested for sensitive skin. 237ml.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__10_-186b8143-7e7c-47b1-9058-5b069914b436.png',
  },
  {
    name: 'Dove Moisturizing Body Wash 700ml',
    slug: 'dove-moisturizing-body-wash-700ml',
    sku: 'GD-HHD-004',
    short_description: 'With 1/4 moisturizing cream — dermatologically tested.',
    description:
      'Dove Moisturizing Body Wash — for soft, smooth skin. With 1/4 moisturizing cream. Dermatologically tested. Maxi format 700ml.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__1_-7011ce87-04f7-4afe-b47f-79d712bac41c.png',
  },
  {
    name: 'Comfort Sun Fresh Fabric Softener (42 Washes)',
    slug: 'comfort-sun-fresh-fabric-softener-42',
    sku: 'GD-HHD-005',
    short_description: 'Concentrated fabric softener — long-lasting freshness.',
    description:
      'Comfort Sun Fresh Ammorbidente Concentrato — scent of long-lasting freshness and softness. Concentrated fabric softener, 42 washes.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__2_-dec46a8f-c52f-4189-9b9a-bbd1f7e81757.png',
  },
  {
    name: 'Comfort Fresh Blue Skies Fabric Softener (31 Washes)',
    slug: 'comfort-fresh-blue-skies-31-washes',
    sku: 'GD-HHD-006',
    short_description: 'Next level fabric softness — up to 100 days freshness.',
    description:
      'Comfort Fresh Blue Skies Fabric Softener — next level fabric softness. Up to 100 days of freshness. 31 washes.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__1_-1476f54c-2030-447a-a46b-bb54877e342f.png',
  },
  {
    name: 'Cussons Carex Professional Hand Wash 5L',
    slug: 'carex-professional-hand-wash-5l',
    sku: 'GD-HHD-007',
    short_description: 'Kills 99.9% of bacteria — 2H protection, pH balanced.',
    description:
      'Cussons Carex Professional 2H Protection Hand Wash — kills 99.9% of bacteria. Dermatologically tested, gentle on skin, pH balanced. Professional range, 5 litres.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__2_-381334a5-c926-456b-92e5-d2b8ac0c23bc.png',
  },
  {
    name: 'Cif Professional Multi-Purpose Cleaner 750ml',
    slug: 'cif-professional-multi-purpose-cleaner-750ml',
    sku: 'GD-HHD-008',
    short_description: 'Removes 100% of tough dirt & grease — 99.9% antibacterial.',
    description:
      'Cif Professional Multi-Purpose Cleaner — removes 100% of tough dirt and grease. Pro Formula, 99.9% antibacterial action. 750ml spray.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__3_-b89e2cc9-9865-4e27-b04f-c7c486ad8235.png',
  },
  {
    name: 'Lenor Professional Hypoallergenic Sensitive 3.8L',
    slug: 'lenor-professional-sensitive-3-8l',
    sku: 'GD-HHD-009',
    short_description: 'Hypoallergenic fabric softener — 190 washes.',
    description:
      'Lenor Professional Formula Hypoallergenic Sensitive Fabric Softener — dermatologically tested, kind on sensitive skin. Long-lasting freshness, plant-based softness. 3.8L, 190 washes.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__4_-e06fbf0e-561f-46d9-9922-31698f03a5a6.png',
  },
  {
    name: 'Comfort Professional Sensitive Classic 4.8L',
    slug: 'comfort-professional-sensitive-classic-4-8l',
    sku: 'GD-HHD-010',
    short_description: 'Hypoallergenic fabric conditioner — 77 washes.',
    description:
      'Comfort Professional Sensitive Classic Fabric Conditioner — formula for sensitive skin, hypoallergenic. Professional range. 4.8L, approx. 77 washes.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.31_AM__5_-6b2a2f1f-4ad3-41d8-bb35-05c3c7b8f019.png',
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

async function getOrCreateCategory() {
  const { data: existing } = await supabase
    .from('categories')
    .select('id, name')
    .eq('slug', CATEGORY.slug)
    .maybeSingle();

  if (existing) return existing;

  const heroImage = await uploadImage('household-personal-care-hero', PRODUCTS[0].file);

  const { data: created, error } = await supabase
    .from('categories')
    .insert({ ...CATEGORY, image_url: heroImage, status: 'active' })
    .select('id, name')
    .single();

  if (error) throw new Error(`Category create failed: ${error.message}`);
  console.log(`Created category: ${created.name}`);
  return created;
}

async function main() {
  const category = await getOrCreateCategory();
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
