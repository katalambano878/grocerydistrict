/**
 * One-time migration: convert product prices from GHS (legacy) to GBP base.
 * Uses the GHS rate from store_settings / ExchangeRate-API.
 *
 * Run: node scripts/migrate-prices-to-gbp.mjs
 * Dry run: node scripts/migrate-prices-to-gbp.mjs --dry-run
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

const FALLBACK_GHS_RATE = Number(process.env.NEXT_PUBLIC_GHS_RATE) || 16.5;

function round2(n) {
  return Math.round(n * 100) / 100;
}

function toGbp(ghsAmount, ghsRate) {
  if (!ghsAmount || ghsAmount <= 0) return ghsAmount;
  return round2(ghsAmount / ghsRate);
}

async function getGhsRate() {
  const { data } = await supabase
    .from('store_settings')
    .select('value')
    .eq('key', 'exchange_rates')
    .maybeSingle();

  const rate = data?.value?.rates?.GHS;
  if (typeof rate === 'number' && rate > 0) {
    console.log(`Using GHS rate from store_settings: 1 GBP = ${rate} GHS`);
    return rate;
  }

  // Try live API
  const apiKey = process.env.EXCHANGERATE_API_KEY;
  if (apiKey) {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/GBP`
    );
    const json = await res.json();
    if (json.conversion_rates?.GHS) {
      console.log(`Using GHS rate from API: 1 GBP = ${json.conversion_rates.GHS} GHS`);
      return json.conversion_rates.GHS;
    }
  }

  console.log(`Using fallback GHS rate: 1 GBP = ${FALLBACK_GHS_RATE} GHS`);
  return FALLBACK_GHS_RATE;
}

async function main() {
  const ghsRate = await getGhsRate();

  const { data: products, error } = await supabase
    .from('products')
    .select('id, sku, name, price, compare_at_price, metadata');

  if (error) throw error;

  const { data: variants } = await supabase
    .from('product_variants')
    .select('id, sku, product_id, price');

  console.log(dryRun ? '\n=== DRY RUN ===\n' : '\n=== MIGRATING ===\n');
  console.log(`Products: ${products.length}, Variants: ${variants?.length ?? 0}\n`);

  let updatedProducts = 0;
  let updatedVariants = 0;

  for (const p of products) {
    const newPrice = toGbp(Number(p.price), ghsRate);
    const newCompare =
      p.compare_at_price && Number(p.compare_at_price) > 0
        ? toGbp(Number(p.compare_at_price), ghsRate)
        : p.compare_at_price;

    const meta = { ...(p.metadata || {}) };
    if (meta.wholesale_price && Number(meta.wholesale_price) > 0) {
      meta.wholesale_price = toGbp(Number(meta.wholesale_price), ghsRate);
    }

    if (Number(p.price) > 0) {
      console.log(
        `${p.sku} | ${p.name}\n  GH₵${Number(p.price).toFixed(2)} → £${newPrice.toFixed(2)}`
      );
    }

    if (!dryRun) {
      const { error: upErr } = await supabase
        .from('products')
        .update({
          price: newPrice,
          compare_at_price: newCompare,
          metadata: meta,
        })
        .eq('id', p.id);

      if (upErr) {
        console.error(`  ERROR: ${upErr.message}`);
      } else {
        updatedProducts++;
      }
    } else {
      updatedProducts++;
    }
  }

  for (const v of variants || []) {
    if (!v.price || Number(v.price) <= 0) continue;
    const newPrice = toGbp(Number(v.price), ghsRate);

    if (!dryRun) {
      const { error: vErr } = await supabase
        .from('product_variants')
        .update({ price: newPrice })
        .eq('id', v.id);
      if (!vErr) updatedVariants++;
    } else {
      updatedVariants++;
    }
  }

  console.log(`\n--- Done ---`);
  console.log(`${dryRun ? 'Would update' : 'Updated'} ${updatedProducts} products, ${updatedVariants} variants`);
  console.log(`All catalog prices are now stored in GBP (base).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
