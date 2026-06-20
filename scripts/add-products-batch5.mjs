/**
 * Add batch 5 of products to "Snacks, Biscuits & Chocolates".
 * Run: node scripts/add-products-batch5.mjs
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
    name: 'Merba Rainbow Cookies 150g',
    slug: 'merba-rainbow-cookies-150g',
    sku: 'GD-SNK-038',
    short_description: 'Chocolate chip cookies with colourful sugar-coated chocolate.',
    description:
      'Merba Rainbow Cookies — chocolate chip cookies with colourful sugar-coated chocolate lentils. Even the kids like them! 150g.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.38_AM-43bc256d-93a8-4449-b9de-3cf0eba6b24a.png',
  },
  {
    name: 'Haribo Tangfastics (11 Mini Bags)',
    slug: 'haribo-tangfastics-11-mini-bags',
    sku: 'GD-SNK-039',
    short_description: 'Sour gummy sweets — multipack of approx. 11 mini bags.',
    description:
      'Haribo Tangfastics — sour gummy cola bottles, cherries, dummies and more. Multipack size, approx. 11 mini bags. Kids and grown-ups love it so.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.38_AM__5_-4d04cca9-6dcd-4a5d-82ac-296211792a10.png',
  },
  {
    name: 'Arm & Hammer plus OxiClean MAX Laundry Detergent (200 Loads)',
    slug: 'arm-hammer-oxiclean-detergent-200-loads',
    sku: 'GD-SNK-040',
    short_description: 'Ultra concentrated liquid detergent — fresh scent, 200 loads.',
    description:
      'Arm & Hammer plus OxiClean MAX Ultra Concentrated Liquid Laundry Detergent — 5-in-1 power: stain fighters, deep clean, whitener, brightener and freshening booster. Fresh scent. HE compatible. 200 loads, 5.91L.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__1_-f4098d54-afcf-4c8e-839e-0452f0fe5a1a.png',
  },
  {
    name: 'Febreze CAR Vent Clips 5-Pack',
    slug: 'febreze-car-vent-clips-5-pack',
    sku: 'GD-SNK-041',
    short_description: 'Car air freshener vent clips — Unstopables Fresh & Linen & Sky.',
    description:
      'Febreze CAR Vent Clips 5-Pack — keeps your car smelling fresh. Includes Unstopables Fresh and Linen & Sky scents. 5 clips, 10ml total.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__2_-8120e352-8c14-4d4f-bbaa-34a4a6e9f36b.png',
  },
  {
    name: 'Farmfoods Sardines in Sunflower Oil with Chilli 125g',
    slug: 'farmfoods-sardines-chilli-125g',
    sku: 'GD-SNK-042',
    short_description: 'Wild caught sardines — high in Omega 3 & protein.',
    description:
      'Farmfoods Wild Caught Sardines in Sunflower Oil with Chilli — high in Omega 3 and protein. Perfect for salads, toast or straight from the tin. 125g.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__3_-043e6cd5-4aa9-4ccb-97fb-054d019d71e1.png',
  },
  {
    name: "Sainsbury's Italian Tomato Purée Double Concentrate",
    slug: 'sainsburys-tomato-puree-double-concentrate',
    sku: 'GD-SNK-043',
    short_description: 'Double concentrate tomato purée — squeeze tube.',
    description:
      "Sainsbury's Italian Tomato Purée Double Concentrate — made from Italian tomatoes. Rich, concentrated flavour for sauces, soups and cooking.",
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__4_-eda98b7b-f6e0-41c5-b7f4-74efed3a81b7.png',
  },
  {
    name: "Sainsbury's Italian Tomato Purée Double Concentrate",
    slug: 'sainsburys-tomato-puree-double-concentrate-2',
    sku: 'GD-SNK-044',
    short_description: 'Double concentrate tomato purée — squeeze tube.',
    description:
      "Sainsbury's Italian Tomato Purée Double Concentrate — made from Italian tomatoes. Rich, concentrated flavour for sauces, soups and cooking.",
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__5_-621b2f33-75cc-40e6-9a9c-5e7c89bf6090.png',
  },
  {
    name: 'Everyday Essentials Porridge Oats 1kg',
    slug: 'everyday-essentials-porridge-oats-1kg',
    sku: 'GD-SNK-045',
    short_description: 'High in fibre porridge oats — source of protein.',
    description:
      'Everyday Essentials Porridge Oats — high in fibre, source of protein. Wholesome rolled oats for a hearty breakfast. 1kg.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__6_-4198bc80-ade1-460f-819f-683f29e068e5.png',
  },
  {
    name: 'Cadbury Milk Chocolate Spread',
    slug: 'cadbury-milk-chocolate-spread',
    sku: 'GD-SNK-046',
    short_description: 'Smooth Cadbury milk chocolate spread.',
    description:
      'Cadbury Milk Chocolate Spread — smooth and indulgent milk chocolate spread. Perfect on toast, bread, pancakes and in baking.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__7_-13cc4f50-ae55-47f3-a98f-e38a20585571.png',
  },
  {
    name: "Sainsbury's Italian Chopped Tomatoes in Tomato Juice",
    slug: 'sainsburys-chopped-tomatoes-tin',
    sku: 'GD-SNK-047',
    short_description: 'Italian chopped tomatoes in tomato juice — 1 of 5 a day.',
    description:
      "Sainsbury's Italian Chopped Tomatoes in Tomato Juice — ripe Italian tomatoes, chopped and packed in rich tomato juice. Essential for sauces, stews and curries. 1 of 5 a day.",
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_6.29.32_AM__8_-8434751e-0cfc-4710-9370-96ee633a2a81.png',
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
