/**
 * Refuse to publish a dist that serves an image nobody can afford to download.
 *
 * Why this exists. The October 2026 crawl reported 44 URLs with an
 * "Image file size too large" error — every one of them error level, and the
 * only error-level issues on the whole site. The cause was not a slow host: the
 * product stills were shipped at their export size, 6000x3375 PNGs weighing
 * 2-3 MB each, rendered into a 1400x780 frame. 83 referenced files came to
 * 85 MB. Re-encoded to WebP at 1600px they come to 4.6 MB, and the ones that
 * double as an og:image are JPEG so the share cards still render everywhere.
 *
 * Nothing stopped that from happening again, so this does: it reads the
 * prerendered HTML rather than the source, which means it sees exactly what a
 * crawler fetches — `src`, `srcset`, `content` on og:image/twitter:image, and
 * `url()` in inline CSS — and fails on anything missing from dist or heavier
 * than the budget.
 *
 * Runs in build:netlify / build:firebase / build:static, after check-dist.
 *
 * Usage: node scripts/check-image-weight.mjs [--budget-kb 100]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const budgetArg = process.argv.indexOf('--budget-kb');
const BUDGET = (budgetArg === -1 ? 100 : Number(process.argv[budgetArg + 1])) * 1024;

const IMAGE_EXT = /\.(png|jpe?g|webp|gif|avif)$/i;

/**
 * Animated hero loops and similar are video, not stills, and are already
 * served behind their own cache rules; a frame budget does not apply to them.
 */
const EXEMPT = new Set([
  // Nothing today. Add a path with the reason it cannot be made smaller.
]);

if (!fs.existsSync(dist)) {
  console.error('✖ dist/ does not exist — run the build first');
  process.exit(1);
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

/** Same-origin image paths a crawler would fetch from one document. */
function imageRefs(html) {
  const found = new Set();
  const add = (raw) => {
    if (!raw) return;
    const url = raw.trim().split('?')[0].split('#')[0];
    if (!url.startsWith('/') && !url.startsWith('https://topedgeai.com/')) return;
    const clean = url.replace('https://topedgeai.com', '');
    if (IMAGE_EXT.test(clean)) found.add(clean);
  };

  for (const m of html.matchAll(/<img\b[^>]*?\ssrc="([^"]+)"/gi)) add(m[1]);
  for (const m of html.matchAll(/\s(?:srcset|imagesrcset)="([^"]+)"/gi)) {
    for (const candidate of m[1].split(',')) add(candidate.trim().split(/\s+/)[0]);
  }
  // <link rel="preload" as="image">, og:image, twitter:image, JSON-LD image URLs.
  for (const m of html.matchAll(/(?:href|content)="([^"]+)"/gi)) add(m[1]);
  for (const m of html.matchAll(/url\((['"]?)([^'")]+)\1\)/gi)) add(m[2]);
  return found;
}

const docs = walk(dist).filter((p) => p.endsWith('.html'));
/** image path -> the documents that reference it */
const refs = new Map();
for (const doc of docs) {
  const rel = `/${path.relative(dist, doc)}`;
  for (const img of imageRefs(fs.readFileSync(doc, 'utf8'))) {
    if (!refs.has(img)) refs.set(img, []);
    refs.get(img).push(rel);
  }
}

const missing = [];
const heavy = [];
for (const [img, pages] of refs) {
  if (EXEMPT.has(img)) continue;
  const onDisk = path.join(dist, img.replace(/^\//, ''));
  if (!fs.existsSync(onDisk)) {
    missing.push({ img, pages });
    continue;
  }
  const bytes = fs.statSync(onDisk).size;
  if (bytes > BUDGET) heavy.push({ img, bytes, pages });
}

heavy.sort((a, b) => b.bytes - a.bytes);

if (missing.length) {
  console.error(`\n✖ ${missing.length} referenced image(s) are not in dist/ — they will 404:\n`);
  for (const { img, pages } of missing.slice(0, 25)) {
    console.error(`  ${img}\n      on ${pages.length} page(s), e.g. ${pages[0]}`);
  }
}

if (heavy.length) {
  console.error(
    `\n✖ ${heavy.length} referenced image(s) exceed the ${BUDGET / 1024} KB budget:\n`,
  );
  for (const { img, bytes, pages } of heavy.slice(0, 40)) {
    console.error(
      `  ${String(Math.round(bytes / 1024)).padStart(6)} KB  ${img}  (on ${pages.length} page(s))`,
    );
  }
  console.error(
    '\n  Re-encode to WebP (JPEG if it is also an og:image), longest edge 1600px.\n',
  );
}

if (missing.length || heavy.length) process.exit(1);

const total = [...refs.keys()]
  .filter((img) => fs.existsSync(path.join(dist, img.replace(/^\//, ''))))
  .reduce((n, img) => n + fs.statSync(path.join(dist, img.replace(/^\//, ''))).size, 0);

console.log(
  `✓ image weight check passed — ${refs.size} referenced images, ` +
    `${(total / 1024 / 1024).toFixed(1)} MB total, none over ${BUDGET / 1024} KB`,
);
