/**
 * Migrates legacy espresso/gold palette → Grocery District logo colors.
 * Navy #2B2C86 · Magenta #E6308A
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIRS = ['app', 'components', 'context', 'lib', 'public'];
const EXT = new Set(['.tsx', '.ts', '.css', '.json']);

const REPLACEMENTS = [
  ['#2C1D00', '#2B2C86'],
  ['#3D2A00', '#222370'],
  ['#1c1200', '#1A1B5E'],
  ['#1C1200', '#1A1B5E'],
  ['#3a2706', '#222370'],
  ['#3A2706', '#222370'],
  ['#AB9462', '#E6308A'],
  ['#8A7750', '#4A4BA8'],
  ['#FFCC00', '#E6308A'],
  ['#EDE6D8', '#F5F4FA'],
  ['#ecdfbf', '#FCE7F3'],
  ['rgba(171,148,98,0.2)', 'rgba(230,48,138,0.2)'],
  ['rgba(171,148,98,0.12)', 'rgba(230,48,138,0.12)'],
  ['rgba(171,148,98,0.08)', 'rgba(230,48,138,0.08)'],
  ['rgba(171,148,98,0.5)', 'rgba(230,48,138,0.35)'],
  ['rgba(171,148,98,0.25)', 'rgba(230,48,138,0.25)'],
  ['#996633', '#4A4BA8'],
  ['#FFFFCC', '#FCE7F3'],
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
