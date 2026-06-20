/**
 * Manually refresh FX rates from ExchangeRate-API → store_settings.
 * Run: node scripts/refresh-exchange-rates.mjs
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

const apiKey = process.env.EXCHANGERATE_API_KEY;
if (!apiKey) {
  console.error('Set EXCHANGERATE_API_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const SUPPORTED = ['GBP', 'GHS', 'USD', 'EUR', 'NGN'];
const DEFAULTS = { GBP: 1, GHS: 16.5, USD: 1.27, EUR: 1.17, NGN: 1950 };

async function main() {
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/latest/GBP`
  );
  const data = await res.json();

  if (data.result !== 'success') {
    console.error('API error:', data['error-type'] || data);
    process.exit(1);
  }

  const rates = { ...DEFAULTS };
  for (const code of SUPPORTED) {
    if (code === 'GBP') rates.GBP = 1;
    else if (data.conversion_rates[code]) rates[code] = data.conversion_rates[code];
  }

  const payload = {
    base: 'GBP',
    rates,
    updated_at: new Date().toISOString(),
    source: 'exchangerate-api',
  };

  const { error } = await supabase.from('store_settings').upsert(
    {
      key: 'exchange_rates',
      value: payload,
      description: 'Live FX rates (GBP base) from ExchangeRate-API',
    },
    { onConflict: 'key' }
  );

  if (error) throw error;

  console.log('Exchange rates saved:');
  for (const [k, v] of Object.entries(rates)) {
    console.log(`  1 GBP = ${v} ${k}`);
  }
  console.log(`Updated at: ${payload.updated_at}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
