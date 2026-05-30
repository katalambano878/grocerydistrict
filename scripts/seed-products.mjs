/**
 * Seed sample products per category for Grocery District.
 * Run: node scripts/seed-products.mjs
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
  } catch {
    /* ignore */
  }
}

loadEnv();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const CATEGORIES = {
  groceries: 'cd122403-7a16-42b9-900e-e86b2ce862eb',
  baby: '4eb012d2-fa60-4941-aa92-6cd801ba2684',
  household: '1b7625fd-e58b-4355-9e31-a3cfc7c0fb91',
  skincare: 'f492db8f-60b2-4ce8-bb59-c0c10411bd03',
};

const PRODUCTS = [
  {
    name: 'Heinz Baked Beans in Tomato Sauce 415g',
    slug: 'heinz-baked-beans-415g',
    category_id: CATEGORIES.groceries,
    price: 28.0,
    compare_at_price: 32.0,
    sku: 'GD-GRC-001',
    quantity: 48,
    featured: true,
    image: '/hero-groceries.png',
    description:
      'Classic UK-import Heinz baked beans — perfect for breakfast, jollof sides, or a quick meal. Genuine product, wholesale and retail available.',
  },
  {
    name: "Kellogg's Corn Flakes 500g",
    slug: 'kelloggs-corn-flakes-500g',
    category_id: CATEGORIES.groceries,
    price: 45.0,
    sku: 'GD-GRC-002',
    quantity: 36,
    featured: false,
    image: '/hero-1.png',
    description: 'Imported Kellogg\'s corn flakes — a family breakfast favourite. Crunchy, golden flakes served with milk or as a snack.',
  },
  {
    name: "Nando's Medium Peri-Peri Sauce 250ml",
    slug: 'nandos-peri-peri-sauce-medium',
    category_id: CATEGORIES.groceries,
    price: 38.0,
    sku: 'GD-GRC-003',
    quantity: 24,
    featured: false,
    image: '/hero-2.png',
    description: 'Authentic Nando\'s peri-peri sauce — medium heat. Great for chicken, chips, and marinades.',
  },
  {
    name: 'Pampers Baby Dry Diapers Size 4 (44 Pack)',
    slug: 'pampers-baby-dry-size-4',
    category_id: CATEGORIES.baby,
    price: 125.0,
    compare_at_price: 140.0,
    sku: 'GD-BBY-001',
    quantity: 30,
    featured: true,
    image: '/hero-baby.png',
    description:
      'Imported Pampers Baby Dry — up to 12 hours of dryness and comfort. Size 4 fits 9–14 kg. Trusted by parents across Accra.',
  },
  {
    name: 'Aptamil Stage 1 First Infant Milk 900g',
    slug: 'aptamil-stage-1-900g',
    category_id: CATEGORIES.baby,
    price: 195.0,
    sku: 'GD-BBY-002',
    quantity: 18,
    featured: false,
    image: '/hero-baby.png',
    description: 'UK-import Aptamil Stage 1 formula for newborns and infants. Nutritionally complete from birth.',
  },
  {
    name: "Johnson's Baby Lotion 500ml",
    slug: 'johnsons-baby-lotion-500ml',
    category_id: CATEGORIES.baby,
    price: 42.0,
    sku: 'GD-BBY-003',
    quantity: 40,
    featured: false,
    image: '/cta-basket.png',
    description: 'Gentle Johnson\'s baby lotion — clinically proven mildness for soft, smooth baby skin every day.',
  },
  {
    name: 'Ariel Automatic Washing Powder 2kg',
    slug: 'ariel-washing-powder-2kg',
    category_id: CATEGORIES.household,
    price: 95.0,
    compare_at_price: 110.0,
    sku: 'GD-HHD-001',
    quantity: 25,
    featured: true,
    image: '/hero-household.png',
    description:
      'Powerful Ariel washing powder for brilliant cleaning on whites and colours. Imported quality for households and bulk buyers.',
  },
  {
    name: 'Fairy Original Washing Up Liquid 900ml',
    slug: 'fairy-washing-up-liquid-900ml',
    category_id: CATEGORIES.household,
    price: 38.0,
    sku: 'GD-HHD-002',
    quantity: 50,
    featured: false,
    image: '/hero-household.png',
    description: 'Fairy original washing-up liquid — cuts through grease fast and lasts longer. UK import.',
  },
  {
    name: 'Domestos Original Bleach 750ml',
    slug: 'domestos-bleach-750ml',
    category_id: CATEGORIES.household,
    price: 28.0,
    sku: 'GD-HHD-003',
    quantity: 45,
    featured: false,
    image: '/hero-shipping.png',
    description: 'Domestos thick bleach — kills germs, removes stains, and keeps toilets and surfaces hygienically clean.',
  },
  {
    name: 'CeraVe Moisturising Cream 454g',
    slug: 'cerave-moisturising-cream-454g',
    category_id: CATEGORIES.skincare,
    price: 165.0,
    compare_at_price: 185.0,
    sku: 'GD-SKN-001',
    quantity: 20,
    featured: true,
    image: '/hero-skincare.png',
    description:
      'Dermatologist-developed CeraVe moisturising cream with ceramides and hyaluronic acid. For face and body, all skin types.',
  },
  {
    name: 'Dove Deeply Nourishing Body Wash 800ml',
    slug: 'dove-body-wash-800ml',
    category_id: CATEGORIES.skincare,
    price: 58.0,
    sku: 'GD-SKN-002',
    quantity: 35,
    featured: false,
    image: '/hero-skincare.png',
    description: 'Dove deeply nourishing body wash with NutriumMoisture™ — leaves skin softer and smoother after every shower.',
  },
  {
    name: "Palmer's Cocoa Butter Formula Lotion 400ml",
    slug: 'palmers-cocoa-butter-lotion',
    category_id: CATEGORIES.skincare,
    price: 48.0,
    sku: 'GD-SKN-003',
    quantity: 32,
    featured: false,
    image: '/hero-skincare.png',
    description: 'Palmer\'s cocoa butter formula — rich, non-greasy moisture for dry skin. A bestseller for daily body care.',
  },
];

async function main() {
  const { count } = await supabase.from('products').select('*', { count: 'exact', head: true });
  if (count && count > 0) {
    console.log(`Skipping seed — ${count} products already exist.`);
    return;
  }

  for (const p of PRODUCTS) {
    const { image, ...product } = p;
    const { data: inserted, error } = await supabase
      .from('products')
      .insert({
        ...product,
        status: 'active',
        rating_avg: 4.8,
        review_count: Math.floor(Math.random() * 40) + 8,
        short_description: product.description.slice(0, 120),
        tags: ['grocery-district', 'accra'],
      })
      .select('id, name, slug, featured')
      .single();

    if (error) {
      console.error('Product insert failed:', p.slug, error.message);
      continue;
    }

    const { error: imgError } = await supabase.from('product_images').insert({
      product_id: inserted.id,
      url: image,
      alt_text: product.name,
      position: 0,
    });

    if (imgError) {
      console.error('Image insert failed:', p.slug, imgError.message);
    } else {
      console.log(`✓ ${inserted.name}${inserted.featured ? ' [FEATURED]' : ''}`);
    }
  }

  const { data: featured } = await supabase
    .from('products')
    .select('name, slug, featured')
    .eq('featured', true)
    .order('created_at');

  console.log('\nFeatured on homepage:', featured?.map((f) => f.name).join(', '));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
