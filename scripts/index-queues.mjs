#!/usr/bin/env node
/**
 * Build the two manual submission lists.
 *
 *   seo-audit/bing-urls.txt        every URL, one per line, paste in one go.
 *                                  Bing Webmaster Tools takes up to 10,000 a
 *                                  day, so 69 is a single submission.
 *
 *   seo-audit/gsc-manual-queue.md  the same URLs ranked and cut into batches
 *                                  of 10, because Google's "Request indexing"
 *                                  is one URL at a time with roughly ten a day
 *                                  and no API. Highest value first, so if the
 *                                  queue is abandoned halfway the pages that
 *                                  matter are already in.
 *
 * Ranking uses signals already in the repo rather than opinion:
 *   - the sitemap's own <priority>
 *   - whether lastmod moved in this release (a page that did not change does
 *     not need a manual nudge)
 *   - for posts, how many other posts link to it, which is our own measure of
 *     which page the blog is built around
 *
 * Usage: node scripts/index-queues.mjs
 */
import { build } from 'esbuild';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const OUT_DIR = path.join(root, 'seo-audit');
const SITE = 'https://topedgeai.com';
const BATCH = 10;

const sitemapFile = ['public/sitemap.xml', 'dist/sitemap.xml']
  .map((p) => path.join(root, p))
  .find((f) => fs.existsSync(f));
if (!sitemapFile) throw new Error('no sitemap.xml — run `npm run sitemap` first');

const xml = fs.readFileSync(sitemapFile, 'utf8');
const entries = [
  ...xml.matchAll(
    /<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod><changefreq>[^<]*<\/changefreq><priority>([^<]+)<\/priority><\/url>/g,
  ),
].map((m) => ({ loc: m[1], lastmod: m[2], priority: Number(m[3]) }));

if (!entries.length) throw new Error('parsed 0 sitemap entries — check the sitemap format');

// How many other posts link to each post: our own view of what the blog is built around.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'te-queue-'));
const bundled = path.join(tmp, 'posts.mjs');
await build({
  entryPoints: [path.join(root, 'src/data/blogPosts.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: bundled,
  logLevel: 'error',
});
const { blogPosts } = await import(pathToFileURL(bundled).href);

const inbound = new Map(blogPosts.map((p) => [p.slug, 0]));
for (const post of blogPosts) {
  for (const m of (post.content || '').matchAll(/href="\/blog\/([^"#?]+)/g)) {
    if (inbound.has(m[1]) && m[1] !== post.slug) inbound.set(m[1], inbound.get(m[1]) + 1);
  }
}

const today = new Date().toISOString().slice(0, 10);
const maxInbound = Math.max(1, ...inbound.values());

/**
 * Conversion surfaces and the one hub that feeds 32 posts. A manual request is
 * worth most on a page that can take a sale or that unlocks crawl of many
 * others, which is not the same thing as the page our own sitemap scores
 * highest: two blog posts carry priority 0.95 and would otherwise outrank
 * /pricing and the homepage.
 */
const COMMERCIAL = new Set(['/', '/pricing', '/customers', '/contact', '/blog']);

function score(e) {
  const pathname = e.loc.replace(SITE, '') || '/';
  // Sitemap priority is the editorial judgement already recorded in the repo.
  let s = e.priority * 100;
  if (COMMERCIAL.has(pathname)) s += 30;
  // A page whose lastmod did not move this release does not need the quota.
  if (e.lastmod === today) s += 25;
  else s -= 60;
  // Tiebreak only. How many posts link to a post says which one the blog is
  // built around, but it should not lift a post over a page that takes money.
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.slice('/blog/'.length);
    s += ((inbound.get(slug) ?? 0) / maxInbound) * 8;
  }
  return s;
}

const ranked = [...entries].sort((a, b) => score(b) - score(a) || a.loc.localeCompare(b.loc));
const changed = ranked.filter((e) => e.lastmod === today);
const unchanged = ranked.filter((e) => e.lastmod !== today);

fs.mkdirSync(OUT_DIR, { recursive: true });

// --- Bing: one paste --------------------------------------------------
const bingFile = path.join(OUT_DIR, 'bing-urls.txt');
fs.writeFileSync(bingFile, ranked.map((e) => e.loc).join('\n') + '\n', 'utf8');

// --- Google: day-by-day queue ----------------------------------------
const lines = [];
lines.push('# Google Search Console — manual "Request indexing" queue');
lines.push('');
lines.push(`Generated ${today} from ${path.relative(root, sitemapFile)}.`);
lines.push('');
lines.push('Google has no API for requesting indexing of ordinary pages, and the button');
lines.push('in the Search Console UI allows roughly ten URLs a day. This queue is ranked');
lines.push('so the most valuable pages go in first and an abandoned queue still leaves the');
lines.push('ones that matter submitted.');
lines.push('');
lines.push('How: Search Console → the search box at the top → paste the URL → Enter →');
lines.push('"Request indexing". Do not re-request a URL that already says it is indexed;');
lines.push('it spends quota and changes nothing.');
lines.push('');
lines.push(`**Deploy before submitting.** A URL submitted ahead of the deploy gets crawled`);
lines.push('as the old page and the fetch is wasted.');
lines.push('');
lines.push(`## Changed in this release — ${changed.length} URLs`);
lines.push('');
for (let i = 0; i < changed.length; i += BATCH) {
  const day = i / BATCH + 1;
  lines.push(`### Day ${day}`);
  lines.push('');
  for (const e of changed.slice(i, i + BATCH)) lines.push(`- [ ] ${e.loc}`);
  lines.push('');
}
lines.push(`## Unchanged in this release — ${unchanged.length} URLs`);
lines.push('');
lines.push('These did not change, so the sitemap already carries their real date and a');
lines.push('manual request buys nothing. Submit only if Search Console reports them as');
lines.push('missing from the index.');
lines.push('');
for (const e of unchanged) lines.push(`- ${e.loc}  (lastmod ${e.lastmod})`);
lines.push('');

const gscFile = path.join(OUT_DIR, 'gsc-manual-queue.md');
fs.writeFileSync(gscFile, lines.join('\n'), 'utf8');

console.log(`✅ ${path.relative(root, bingFile)} — ${ranked.length} URLs, one paste`);
console.log(
  `✅ ${path.relative(root, gscFile)} — ${changed.length} changed in ` +
    `${Math.ceil(changed.length / BATCH)} daily batches, ${unchanged.length} unchanged`,
);
