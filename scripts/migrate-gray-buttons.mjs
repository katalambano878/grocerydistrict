/**
 * Migrates gray/black primary buttons → brand navy on store-facing pages.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIRS = ['app/(store)', 'components'];
const EXT = new Set(['.tsx', '.ts']);

const REPLACEMENTS = [
  ['bg-gray-900 hover:bg-gray-800', 'bg-[#2B2C86] hover:bg-[#222370]'],
  ["bg-gray-900 text-white shadow-lg", "bg-[#2B2C86] text-white shadow-lg"],
  ['bg-gray-900 text-white', 'bg-[#2B2C86] text-white'],
  ['focus:ring-gray-600', 'focus:ring-[#2B2C86]'],
  ['focus:ring-gray-300', 'focus:ring-[#2B2C86]/40'],
  ['hover:border-gray-600', 'hover:border-[#2B2C86]'],
  ['text-gray-900 font-bold text-xl mb-2">{option.cost}', 'text-[#2B2C86] font-bold text-xl mb-2">{option.cost}'],
  ['from-gray-900 to-gray-900', 'from-[#2B2C86] to-[#1A1B5E]'],
  ['bg-black text-white', 'bg-[#2B2C86] text-white'],
  ['hover:bg-gray-800', 'hover:bg-[#222370]'],
  ['rounded-full bg-gray-900 px-4 py-2', 'rounded-full bg-[#2B2C86] px-4 py-2'],
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

let changed = 0;
for (const dir of DIRS) {
  for (const file of walk(path.join(ROOT, dir))) {
    if (file.includes('admin')) continue;
    let text = fs.readFileSync(file, 'utf8');
    const original = text;
    for (const [from, to] of REPLACEMENTS) text = text.split(from).join(to);
    if (text !== original) {
      fs.writeFileSync(file, text);
      changed++;
      console.log('updated', path.relative(ROOT, file));
    }
  }
}
console.log(`Done — ${changed} files updated.`);
