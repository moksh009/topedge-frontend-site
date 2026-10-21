/**
 * Fail the build when a blog post cites nothing, cites somewhere unapproved,
 * or slips an em dash back into the copy.
 *
 * Why these three:
 *
 *   - The 2026-10-07 audit (TE-014) found 23 of 32 posts with zero third-party
 *     sources and only 5 external hosts across the whole blog, while the posts
 *     between them made 68 separate percentage claims. An unsourced number is
 *     the one an AI engine will not repeat and a reader cannot check.
 *   - An external link that is not in src/data/sources.ts has not been read by
 *     anyone. The registry carries the date a human opened the URL and what it
 *     actually says, so "is this still true" has an answer.
 *   - Em dashes are the owner's call: they read as machine-written. Verbatim
 *     quotes are exempt, because editing someone's words to suit our style
 *     guide misquotes them.
 *
 * Usage: node scripts/check-blog-sources.mjs
 */
import { build } from 'esbuild';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

async function load(entry, outName) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'topedge-blog-'));
  const outfile = path.join(dir, outName);
  await build({
    entryPoints: [path.join(root, entry)],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile,
    logLevel: 'error',
  });
  return import(pathToFileURL(outfile).href);
}

const { blogPosts } = await load('src/data/blogPosts.ts', 'posts.mjs');
const { ALLOWED_EXTERNAL_HOSTS, SOURCES } = await load('src/data/sources.ts', 'sources.mjs');

const allowed = new Set(ALLOWED_EXTERNAL_HOSTS);
const errors = [];

for (const post of blogPosts) {
  const where = `/blog/${post.slug}`;
  const content = post.content || '';
  const all = `${content} ${(post.faqs || []).map((f) => `${f.question} ${f.answer}`).join(' ')}`;

  const external = [...all.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
  const hosts = external.map((u) => new URL(u).hostname.replace(/^www\./, ''));

  for (const [i, host] of hosts.entries()) {
    if (!allowed.has(host)) {
      errors.push(`${where}: links to ${host}, which is not in src/data/sources.ts (${external[i]})`);
    }
  }

  // Our own dashboard is a product link, not a source.
  if (!hosts.some((h) => h !== 'dash.topedgeai.com')) {
    errors.push(`${where}: no third-party source. Cite the primary doc behind a claim on this page.`);
  }

  // Em dashes, outside anything marked as a verbatim quote.
  const prose = content.replace(/<blockquote[\s\S]*?<\/blockquote>/g, '');
  if (prose.includes('—')) {
    const n = (prose.match(/—/g) || []).length;
    errors.push(`${where}: ${n} em dash${n > 1 ? 'es' : ''} in the copy. Rewrite with a comma, colon, bracket or full stop.`);
  }

  // A post nobody can leave is a dead end for a reader and for crawl depth.
  const internal = [...content.matchAll(/href="\/blog\/([^"#?]+)/g)].map((m) => m[1]);
  const outbound = new Set(internal.filter((s) => s !== post.slug));
  if (outbound.size < 3) {
    errors.push(`${where}: links to ${outbound.size} other post${outbound.size === 1 ? '' : 's'}; 3 is the floor.`);
  }
}

// Every post should be reachable from at least three others.
const inbound = new Map(blogPosts.map((p) => [p.slug, new Set()]));
for (const post of blogPosts) {
  for (const m of (post.content || '').matchAll(/href="\/blog\/([^"#?]+)/g)) {
    if (inbound.has(m[1]) && m[1] !== post.slug) inbound.get(m[1]).add(post.slug);
  }
}
for (const [slug, from] of inbound) {
  if (from.size < 3) {
    errors.push(`/blog/${slug}: only ${from.size} inbound internal link${from.size === 1 ? '' : 's'}; 3 is the floor.`);
  }
}

if (errors.length) {
  console.error(`\n✖ blog source check FAILED (${errors.length})\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error('');
  process.exit(1);
}

const hostCount = new Set(
  blogPosts.flatMap((p) =>
    [...(p.content || '').matchAll(/href="(https?:\/\/[^"]+)"/g)].map((m) =>
      new URL(m[1]).hostname.replace(/^www\./, ''),
    ),
  ),
).size;
console.log(
  `✓ blog source check passed — ${blogPosts.length} posts, ${hostCount} external hosts, ` +
    `${Object.keys(SOURCES).length} registered primary sources, 0 em dashes`,
);
