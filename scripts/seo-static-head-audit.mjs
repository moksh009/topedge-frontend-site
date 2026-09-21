/**
 * Audit static legal HTML heads (privacy/terms) outside React prerender.
 * Run: node scripts/seo-static-head-audit.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertSnippetBudgets } from './seo-contracts.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const FILES = [
  { file: 'public/privacy.html', path: '/privacy', canon: 'https://topedgeai.com/privacy' },
  { file: 'public/terms.html', path: '/terms', canon: 'https://topedgeai.com/terms' },
];

function count(html, re) {
  return [...html.matchAll(re)].length;
}

function extract(html, re) {
  return html.match(re)?.[1]?.replace(/\s+/g, ' ').trim() || '';
}

let failed = 0;

for (const row of FILES) {
  const abs = path.join(root, row.file);
  if (!fs.existsSync(abs)) {
    console.error(`✗ missing ${row.file}`);
    failed += 1;
    continue;
  }
  const html = fs.readFileSync(abs, 'utf8');
  const problems = [];

  if (!/lang=["']en-IN["']/i.test(html)) problems.push('lang≠en-IN');
  if (count(html, /<title\b/gi) !== 1) problems.push('title count');
  if (count(html, /<meta\b[^>]*name=["']description["']/gi) !== 1) problems.push('description count');
  if (count(html, /<link\b[^>]*rel=["']canonical["']/gi) !== 1) problems.push('canonical count');

  const title = extract(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const desc =
    extract(html, /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
    extract(html, /<meta\b[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const canon =
    extract(html, /<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
    extract(html, /<link\b[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);

  if (canon !== row.canon) problems.push(`canonical=${canon}`);
  const budgets = assertSnippetBudgets(title, desc);
  if (!budgets.ok) problems.push(...budgets.errors);

  if (!/twitter:url/i.test(html)) problems.push('missing twitter:url');
  if (!/og:image["'][^>]*content=["']https:\/\/topedgeai\.com\/og-image\.png/i.test(html) &&
      !/content=["']https:\/\/topedgeai\.com\/og-image\.png["'][^>]*property=["']og:image/i.test(html)) {
    // softer check
    if (!/og-image\.png/i.test(html)) problems.push('missing og PNG');
  }

  if (problems.length) {
    failed += 1;
    console.error(`✗ ${row.path}: ${problems.join(', ')}`);
  } else {
    console.log(`✓ ${row.path}`);
  }
}

if (failed) {
  process.exit(1);
}
console.log('✅ seo-static-head-audit passed');
