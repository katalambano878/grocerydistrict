/**
 * Add batch 3 of products to "Snacks, Biscuits & Chocolates".
 * Run: node scripts/add-products-batch3.mjs
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
    name: 'Essential Waitrose & Partners Porridge Oats 1kg',
    slug: 'waitrose-porridge-oats-1kg',
    sku: 'GD-SNK-018',
    price: 0,
    short_description: 'High in fibre rolled porridge oats — 1kg.',
    description:
      'Essential Waitrose & Partners Porridge Oats — wholesome rolled oats, high in fibre. Perfect for a hearty breakfast. 1kg.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.36_AM__3_-2e1e242e-f766-48e3-af2f-f970af1c858d.png',
  },
  {
    name: 'Milky Way Smooth & Creamy Spread',
    slug: 'milky-way-chocolate-spread',
    sku: 'GD-SNK-019',
    price: 0,
    short_description: 'Chocolate & milk swirl spread for toast.',
    description:
      'Milky Way Smooth & Creamy Spread — a delicious swirl of chocolate and milk cream. Perfect on toast, bread and pancakes.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.36_AM__5_-3b49591e-df1c-4f88-8bbe-d7203040af05.png',
  },
  {
    name: 'Nixe Mackerel Fillets in Sunflower Oil',
    slug: 'nixe-mackerel-fillets-sunflower-oil',
    sku: 'GD-SNK-020',
    price: 0,
    short_description: 'Skinless & boneless mackerel — high in Omega 3.',
    description:
      'Nixe Skinless & Boneless Mackerel Fillets in Sunflower Oil — high in Omega 3. A convenient pantry staple.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.36_AM__4_-928a4946-e55d-4453-8499-bfcecc54b2cf.png',
  },
  {
    name: 'Tower Gate Malted Milk Biscuits',
    slug: 'tower-gate-malted-milk',
    sku: 'GD-SNK-021',
    price: 0,
    short_description: 'Classic malted milk biscuits — vegetarian.',
    description:
      'Tower Gate Malted Milk — classic golden biscuits with a malted milk flavour. Udderly groovy. Suitable for vegetarians.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.37_AM__2_-2b5dcd57-7108-4278-bbd3-919d4391a209.png',
  },
  {
    name: "Kellogg's Coco Pops Big Pack (x17)",
    slug: 'kelloggs-coco-pops-big-pack',
    sku: 'GD-SNK-022',
    price: 0,
    short_description: 'Chocolatey toasted rice cereal — big pack.',
    description:
      "Kellogg's Coco Pops Big Pack — chocolatey toasted rice cereal. Source of fibre, with iron & vitamin D. Up to 17 servings.",
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.36_AM-3e3ddcf9-a97f-4e41-b291-d447426c95e6.png',
  },
  {
    name: 'Cadbury The Original Signature Hot Chocolate 1kg',
    slug: 'cadbury-signature-hot-chocolate-1kg',
    sku: 'GD-SNK-023',
    price: 220,
    short_description: 'Rich hot chocolate — makes approx. 40 mugs.',
    description:
      'Cadbury The Original Signature Hot Chocolate — rich and indulgent drinking chocolate. Just add milk. 1kg, makes approximately 40 mugs.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.37_AM__1_-b0ed93df-ba1e-4c7a-89bd-ac28f2150ddc.png',
  },
  {
    name: 'Maryland Minis White Choc (6 Mini Bags)',
    slug: 'maryland-minis-white-choc-6-pack',
    sku: 'GD-SNK-024',
    price: 0,
    short_description: 'Mini cookies with white chocolate chips — 6 bags.',
    description:
      'Maryland Minis White Choc — bite-sized cookies with white chocolate chips. Multipack of 6 mini bags. 97 kcal per bag.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.37_AM__3_-109eba24-fd8f-4849-b2e9-73096f3a347e.png',
  },
  {
    name: 'Tesco Mint Humbugs',
    slug: 'tesco-mint-humbugs',
    sku: 'GD-SNK-025',
    price: 0,
    short_description: 'Chewy toffee centre mint humbugs.',
    description:
      'Tesco Mint Humbugs — chewy toffee centre sweets with a refreshing mint flavour. Inspired by a traditional sweet shop recipe.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.37_AM__4_-e1d4ef50-1570-44eb-a2ac-06e27ce577d2.png',
  },
  {
    name: 'ASDA 10 Waffle Cones',
    slug: 'asda-10-waffle-cones',
    sku: 'GD-SNK-026',
    price: 0,
    short_description: 'Continental style waffle cones — pack of 10.',
    description:
      'ASDA 10 Waffle Cones — continental style cones, great for building your favourite ice creams. Pack of 10.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.37_AM__5_-0403a0c6-7ac7-448f-a540-b1bee101b04d.png',
  },
  {
    name: 'M&S Rich Tea Biscuits',
    slug: 'ms-rich-tea-biscuits',
    sku: 'GD-SNK-027',
    price: 0,
    short_description: 'Classic rich tea biscuits with barley malt.',
    description:
      'M&S Food Rich Tea Biscuits — classic biscuits with barley malt extract for a balanced flavour. 31 biscuits per pack.',
    file: 'c__Users_TAY_AppData_Roaming_Cursor_User_workspaceStorage_491bd971b4e874e5c34af57da6a0bbb3_images_WhatsApp_Image_2026-06-20_at_7.06.37_AM__6_-f2abb5fa-df70-4616-8a30-d350f63992c8.png',
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
        price: p.price,
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
      .select('id, name, price')
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
    console.log(`  ✓ ${inserted.name} | GH₵${inserted.price}`);
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
