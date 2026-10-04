/**
 * Rewrite the `## Documentation` block in public/llms.txt from the docs manifest.
 *
 * llms.txt is otherwise hand-written, but 36 documentation URLs are not something
 * to maintain by hand — a missing entry is a page answer engines never discover.
 * Only the text between the markers is touched, so the hand-written Entity,
 * Pricing, Product and Compare sections (and the pricing guard that reads them)
 * are left exactly as they are.
 *
 * Usage: npm run llms:docs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadDocsRegistry } from './load-docs-content.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const llmsPath = path.join(root, 'public', 'llms.txt');
const SITE = 'https://topedgeai.com';

const BEGIN = '<!-- BEGIN GENERATED DOCS — scripts/generate-llms-docs.mjs -->';
const END = '<!-- END GENERATED DOCS -->';

const { DOC_NAV, docPathFor } = await loadDocsRegistry();

function buildBlock() {
  const lines = [
    BEGIN,
    '## Documentation',
    '',
    'Product documentation, fully crawlable. Every page also serves a plaintext',
    'Markdown mirror at the same URL with a `.md` suffix.',
    '',
  ];
  for (const group of DOC_NAV) {
    lines.push(`### ${group.label}`, '');
    for (const article of group.articles) {
      lines.push(`- [${article.navLabel}](${SITE}${docPathFor(article.slug)}): ${article.description}`);
    }
    lines.push('');
  }
  lines.push(END);
  return lines.join('\n');
}

const text = fs.readFileSync(llmsPath, 'utf8');
const block = buildBlock();

let next;
if (text.includes(BEGIN) && text.includes(END)) {
  const start = text.indexOf(BEGIN);
  const stop = text.indexOf(END) + END.length;
  next = text.slice(0, start) + block + text.slice(stop);
} else {
  // First run: insert ahead of `## Compare` so Documentation sits next to Product.
  const anchor = '\n## Compare\n';
  const at = text.indexOf(anchor);
  if (at < 0) {
    console.error('✖ could not find a "## Compare" section in public/llms.txt to insert before');
    process.exit(1);
  }
  next = `${text.slice(0, at)}\n${block}\n${text.slice(at)}`;
}

if (next !== text) {
  fs.writeFileSync(llmsPath, next, 'utf8');
  console.log('✅ Updated the Documentation block in public/llms.txt');
} else {
  console.log('✓ public/llms.txt Documentation block already current');
}
