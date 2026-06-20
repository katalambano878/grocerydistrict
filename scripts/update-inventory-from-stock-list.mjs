/**
 * Apply stock quantities and prices from the handwritten inventory lists
 * (4 WhatsApp photos, 20 Jun 2026) to matching catalog products.
 *
 * Only updates products with a confident name match AND qty+price on the list.
 * Run: node scripts/update-inventory-from-stock-list.mjs
 * Dry run: node scripts/update-inventory-from-stock-list.mjs --dry-run
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

const dryRun = process.argv.includes('--dry-run');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/** sku -> { quantity, price, note } — prices in GH₵ */
const UPDATES = {
  // Page 4 — rice, oils section (rice only in catalog)
  'GD-PNT-024': { quantity: 14, price: 400, note: 'Peacock rice 10kg' },
  'GD-PNT-020': { quantity: 6, price: 180, note: 'Jasmine rice AAA 5kg → Mai Thai AAA' },
  'GD-PNT-018': { quantity: 4, price: 300, note: 'Basmati id rice 5kg → Aunt Caroline Basmati' },

  // Page 4 — canned fish / tomato paste
  'GD-SNK-020': { quantity: 208, price: 30, note: 'Mackerel fillet Nixe' },
  'GD-SNK-043': { quantity: 18, price: 25, note: 'Italian Tomato paste (half of 35)' },
  'GD-SNK-044': { quantity: 17, price: 25, note: 'Italian Tomato paste (half of 35)' },

  // Page 3 — cereals, oats, biscuits
  'GD-SNK-035': { quantity: 6, price: 70, note: 'Cocoa Peanut Butter Balls' },
  'GD-SNK-034': { quantity: 5, price: 70, note: 'Caramelised Biscuit Cereal' },
  'GD-SNK-022': { quantity: 6, price: 130, note: "Kellogg's Coco Pops" },
  'GD-SNK-014': { quantity: 12, price: 100, note: "Oreo O's Cereal" },
  'GD-SNK-045': { quantity: 20, price: 50, note: 'Essentials Porridge OATS' },
  'GD-SNK-036': { quantity: 4, price: 100, note: 'Alpen oats' },
  'GD-SNK-015': { quantity: 4, price: 50, note: "Grower's Harvest Porridge oats" },
  'GD-SNK-018': { quantity: 3, price: 60, note: 'Essential Waitrose Porridge oats' },
  'GD-PNT-021': { quantity: 6, price: 90, note: 'Quaker Porridge oats' },
  'GD-SNK-033': { quantity: 2, price: 210, note: 'Galaxy Hot chocolate' },
  'GD-SNK-023': { quantity: 1, price: 220, note: 'Cadbury Hot chocolate 1kg' },
  'GD-SNK-031': { quantity: 3, price: 50, note: 'Gelatelli waffle cones' },
  'GD-SNK-026': { quantity: 7, price: 50, note: 'ASDA 10 waffle cones' },
  'GD-SNK-011': { quantity: 20, price: 50, note: 'Chocolate Cookies (Merba)' },
  'GD-SNK-038': { quantity: 7, price: 50, note: 'Rainbow Cookies (Merba)' },
  'GD-SNK-021': { quantity: 5, price: 40, note: 'Tower Gate Malted Milk (Towergate Oatlies)' },
  'GD-SNK-007': { quantity: 33, price: 110, note: 'Nutella biscuits' },
  'GD-SNK-001': { quantity: 12, price: 40, note: 'Tower Gate Milk chocolate digestive' },

  // Page 1 — spreads (items with qty+price only)
  'GD-PNT-011': { quantity: 9, price: 100, note: 'Maltesers Spread' },
  'GD-SNK-013': { quantity: 9, price: 70, note: 'Stockwell Choco Spread' },

  // Page 2 — condiments & tomatoes
  'GD-PNT-002': { quantity: 26, price: 23, note: 'Italian Chopped Tomatoes → Sainsburys 400g' },
  'GD-PNT-007': { quantity: 35, price: 28, note: 'chopped Tomatoes → Valfrutta' },
  'GD-PNT-023': { quantity: 31, price: 70, note: 'BBQ Sauce → Bramwells Original' },
  'GD-PNT-003': { quantity: 10, price: 60, note: 'Tesco Mayonnaise' },
  'GD-PNT-004': { quantity: 10, price: 60, note: "Real Mayo → Sainsbury's Real Mayo" },
  'GD-PNT-005': { quantity: 8, price: 55, note: 'Stamford Salad Cream' },
  'GD-PNT-006': { quantity: 15, price: 55, note: 'Stamford Tomato Ketchup' },
  'GD-PNT-001': { quantity: 2, price: 60, note: 'Stockwell Salad Cream' },
  'GD-PNT-016': { quantity: 6, price: 110, note: 'Heinz Tomato Ketchup' },
  'GD-PNT-010': { quantity: 14, price: 80, note: 'Golden Syrup → Belbake Golden Syrup' },
};

const UNMATCHED_INVENTORY = [
  'ASDA Cookies and Cream Spread (7 @ 80)',
  'Duo chocolate Spread (9 @ 70)',
  'Caramelised Biscuit Spread smooth (10 @ 80) — no smooth spread in catalog',
  'Duo Hazelnut and Choco Spread (20 @ 70)',
  'Nutella Spread jar (5 @ 100)',
  'Snickers Spread, Stamford Choco Spread, Smooth Biscuit Spread, etc. (no qty on list)',
  'Carnation Condensed Milk drink, Tesco chocolate Dessert Sauce (no qty)',
  'Dairy Manor Condensed milk Tin (no qty on list)',
  'BTM Pilchards, soy sauces, spaghetti, baked beans, Millville syrup',
  'Classic / Stockwell / Tesco Tomato Ketchup variants',
  'Hot Dogs small/medium (unclear qty split)',
  'Panda oyster Sauce, BTM Mackerel, Newgate Corn Beef, Skippy',
  'Weetabix, Rice Krispies, Mornflake, Scottish oats, ice cream cup cone',
  'M&S mini Wafer (catalog has Rich Tea Biscuits only)',
  'Sunflower / Olive / Coconut oil, Tilda/Karam rice, bulk chopped/peeled tomatoes',
  'Sardines/tuna/corned beef variants (many SKUs not in catalog)',
  'Cucina Tomato paste (4 @ 25)',
  'Corned Beef Bramwells (6 @ 70)',
];

async function main() {
  const skus = Object.keys(UPDATES);
  const { data: products, error: fetchErr } = await supabase
    .from('products')
    .select('id, sku, name, price, quantity')
    .in('sku', skus);

  if (fetchErr) throw fetchErr;

  const bySku = new Map(products.map((p) => [p.sku, p]));
  const missing = skus.filter((sku) => !bySku.has(sku));
  if (missing.length) {
    console.error('SKUs not found in database:', missing.join(', '));
    process.exit(1);
  }

  console.log(dryRun ? '=== DRY RUN ===\n' : '=== APPLYING UPDATES ===\n');
  console.log(`Updating ${skus.length} products...\n`);

  let ok = 0;
  let fail = 0;

  for (const sku of skus) {
    const before = bySku.get(sku);
    const { quantity, price, note } = UPDATES[sku];

    console.log(
      `${sku} | ${before.name}\n` +
        `  List: ${note}\n` +
        `  Before: qty ${before.quantity}, GH₵${Number(before.price).toFixed(2)}\n` +
        `  After:  qty ${quantity}, GH₵${price.toFixed(2)}`
    );

    if (!dryRun) {
      const { error } = await supabase
        .from('products')
        .update({ quantity, price })
        .eq('id', before.id);

      if (error) {
        console.log(`  ERROR: ${error.message}`);
        fail++;
      } else {
        ok++;
      }
    } else {
      ok++;
    }
    console.log('');
  }

  console.log('--- Summary ---');
  console.log(`${dryRun ? 'Would update' : 'Updated'}: ${ok}`);
  if (fail) console.log(`Failed: ${fail}`);

  console.log('\n--- Inventory lines NOT applied (no catalog match or missing qty/price) ---');
  for (const line of UNMATCHED_INVENTORY) console.log(`  • ${line}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
