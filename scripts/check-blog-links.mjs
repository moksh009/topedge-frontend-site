/**
 * Content checks for the blog.
 *
 * The prerender audit catches head-level problems, but it cannot tell that an
 * in-content link points at a URL that does not exist. A dead internal link
 * wastes crawl budget and strands the page it was meant to support, and with
 * ~26 posts cross-linking each other by hand it is the easiest thing to get
 * wrong. This reads the post data directly, so it fails in seconds.
 *
 * Usage: npm run check:blog
 */
import { build } from 'esbuild';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { assertSnippetBudgets, withBrandSuffix } from './seo-contracts.mjs';
import { getSitemapPaths } from './marketing-urls.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

async function loadBlogPosts() {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'topedge-blog-'));
  const outfile = path.join(outDir, 'blogPosts.mjs');
  try {
    await build({
      entryPoints: [path.join(root, 'src/data/blogPosts.ts')],
      bundle: true,
      format: 'esm',
      platform: 'node',
      outfile,
      logLevel: 'error',
    });
    return (await import(pathToFileURL(outfile).href)).blogPosts;
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
}

/** Mirrors BlogPost.tsx, which passes post.title straight to MarketingSEO. */
function renderedTitle(title) {
  return withBrandSuffix(title);
}

const posts = await loadBlogPosts();
const errors = [];
const warnings = [];

const blogPaths = posts.map((p) => `/blog/${p.slug}`);
const knownPaths = new Set([
  ...getSitemapPaths(),
  ...blogPaths,
  '/signup',
  '/login',
  '/404',
]);

const inbound = new Map(blogPaths.map((p) => [p, 0]));
const slugs = new Set();
const titles = new Map();
const descriptions = new Map();

for (const post of posts) {
  const where = `/blog/${post.slug}`;

  if (slugs.has(post.slug)) errors.push(`${where}: duplicate slug`);
  slugs.add(post.slug);

  const budgets = assertSnippetBudgets(renderedTitle(post.title), post.description);
  if (!budgets.ok) for (const e of budgets.errors) errors.push(`${where}: ${e}`);

  const tKey = post.title.toLowerCase();
  if (titles.has(tKey)) errors.push(`${where}: duplicate title, also on ${titles.get(tKey)}`);
  else titles.set(tKey, where);

  const dKey = post.description.trim().toLowerCase();
  if (descriptions.has(dKey)) {
    errors.push(`${where}: duplicate description, also on ${descriptions.get(dKey)}`);
  } else {
    descriptions.set(dKey, where);
  }

  if (!post.keywords?.length) errors.push(`${where}: no keywords`);
  if (!post.image) errors.push(`${where}: no image (needed for og:image and schema)`);
  if (post.image && !fs.existsSync(path.join(root, 'public', post.image.replace(/^\//, '')))) {
    errors.push(`${where}: image ${post.image} does not exist in public/`);
  }
  if (!post.imageAlt) warnings.push(`${where}: no imageAlt`);
  // FAQPage markup is the single biggest answer-engine win available per post.
  if (!post.faqs?.length) warnings.push(`${where}: no faqs — no FAQPage schema`);

  const haystack = [
    post.content || '',
    ...(post.faqs || []).flatMap((f) => [f.question, f.answer]),
  ].join('\n');

  for (const m of haystack.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (/^(?:https?:|mailto:|tel:|#)/i.test(href)) continue;
    const [pathPart] = href.split('#');
    if (!knownPaths.has(pathPart)) {
      errors.push(`${where}: dead internal link "${pathPart}"`);
      continue;
    }
    if (pathPart !== where && inbound.has(pathPart)) {
      inbound.set(pathPart, inbound.get(pathPart) + 1);
    }
  }
}

// A post nothing links to relies entirely on the sitemap to be found, which is
// the slowest path to being indexed and ranked.
const orphans = [...inbound.entries()].filter(([, n]) => n === 0).map(([p]) => p);

if (errors.length) {
  console.error(`\n✖ blog content check FAILED — ${errors.length} problem(s):`);
  for (const e of errors) console.error(`   · ${e}`);
  console.error('');
  process.exit(1);
}

console.log(`✓ blog content check passed — ${posts.length} posts, budgets and internal links clean`);
if (orphans.length) {
  console.log(`\n  ⚠ ${orphans.length} post(s) with no inbound in-content link:`);
  for (const o of orphans) console.log(`     ${o}`);
}
if (warnings.length) {
  console.log(`\n  ${warnings.length} advisory warning(s):`);
  for (const w of warnings) console.log(`     · ${w}`);
}
