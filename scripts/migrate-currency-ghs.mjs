/**
 * Migrates Nigerian Naira (₦/NGN) → Ghana Cedis (GH₵/GHS).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIRS = ['app', 'components', 'context', 'lib'];
const EXT = new Set(['.tsx', '.ts']);

const REPLACEMENTS = [
  ['Nigerian Naira (NGN)', 'Ghana Cedis (GHS)'],
  ['Nigerian Naira', 'Ghana Cedis'],
  ['Naira (NGN)', 'Cedis (GHS)'],
  ['Naira', 'Cedis'],
  ['priceCurrency: "NGN"', 'priceCurrency: "GHS"'],
  ["priceCurrency: 'NGN'", "priceCurrency: 'GHS'"],
  ['product.currency || "NGN"', 'product.currency || "GHS"'],
  ["product.currency || 'NGN'", "product.currency || 'GHS'"],
  ['currency: "NGN"', 'currency: "GHS"'],
  ["currency: 'NGN'", "currency: 'GHS'"],
  ['currency_symbol: \'₦\'', "currency_symbol: 'GH₵'"],
  ['currency_symbol: "₦"', 'currency_symbol: "GH₵"'],
  ['currency: \'NGN\'', "currency: 'GHS'"],
  ['currency: "NGN"', 'currency: "GHS"'],
  ['NGN ', 'GHS '],
  ['NGN,', 'GHS,'],
  ['NGN.', 'GHS.'],
  ['NGN)', 'GHS)'],
  ['(NGN', '(GHS'],
  [' ₦', ' GH₵'],
  ['₦ ', 'GH₵ '],
  ['`₦', '`GH₵'],
  ['"₦', '"GH₵'],
  ["'₦", "'GH₵"],
  ['>₦', '>GH₵'],
  ['-₦', '-GH₵'],
  ['Pay ₦', 'Pay GH₵'],
  ['Min. purchase: ₦', 'Min. purchase: GH₵'],
  ['Price (₦)', 'Price (GH₵)'],
  ['Compare at Price (₦)', 'Compare at Price (GH₵)'],
  ['Wholesale Price (₦)', 'Wholesale Price (GH₵)'],
  ['From ₦', 'From GH₵'],
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (EXT.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

const VALID = REPLACEMENTS.filter((r) => r.length === 2);

let changed = 0;
for (const dir of DIRS) {
  for (const file of walk(path.join(ROOT, dir))) {
    let text = fs.readFileSync(file, 'utf8');
    const original = text;
    for (const [from, to] of VALID) text = text.split(from).join(to);
    if (text !== original) {
      fs.writeFileSync(file, text);
      changed++;
      console.log('updated', path.relative(ROOT, file));
    }
  }
}
console.log(`Done — ${changed} files updated.`);
