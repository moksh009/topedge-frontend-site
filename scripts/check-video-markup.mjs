/**
 * Validate the VideoObject markup in dist/ against the players actually on the page.
 *
 * Why this exists. Search Console reported 5 videos as "Video isn't on a watch
 * page" and the 2026-10-06 validation attempt failed on 2026-10-08. Two causes,
 * neither visible in review:
 *
 *   1. SOURCELESS PLAYER. Both demo components stored the video source in React
 *      state seeded to `undefined` and filled it from an IntersectionObserver,
 *      which only runs on the client. The prerendered HTML therefore shipped
 *      `<video poster=... preload="none"></video>` — a player with no source —
 *      while the JSON-LD named a contentUrl. Google fetched the file, found no
 *      player embedding it, and declined the watch page.
 *
 *   2. ONE CLIP, MANY CLAIMANTS. PRODUCT_DEMO_ASSETS maps cart-recovery.mp4 to
 *      16 scene ids, so the same file was embedded across many routes. GSC
 *      listed it against three separate URLs. A video with no single home has
 *      no watch page by definition.
 *
 * So this asserts, for every page in dist/ that emits a VideoObject:
 *   - the page has a <video> whose src (or child <source>) matches contentUrl,
 *   - contentUrl resolves to a file that exists in dist,
 *   - the thumbnail resolves to a file that exists in dist,
 *   - name, description, uploadDate and duration are all present,
 *   - and no two pages claim the same contentUrl.
 *
 * Cache-busting query strings are normalised away on both sides, since the
 * markup and the attribute are stamped independently.
 *
 * Runs in build:netlify / build:firebase / build:static, after check-structured-data.
 *
 * Usage: node scripts/check-video-markup.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const SITE = 'https://topedgeai.com';

const basePath = (u) => String(u || '').split('?')[0];
const toLocal = (u) => basePath(u).replace(SITE, '');

function htmlFiles() {
  const out = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const f = path.join(d, e.name);
      if (e.isDirectory()) {
        if (e.name !== 'assets') walk(f);
      } else if (e.name.endsWith('.html')) out.push(f);
    }
  })(dist);
  return out;
}

/** Every JSON-LD node of @type VideoObject on the page, flattened. */
function videoNodes(html) {
  const out = [];
  for (const m of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    let parsed;
    try {
      parsed = JSON.parse(m[1]);
    } catch {
      continue;
    }
    const stack = [parsed];
    while (stack.length) {
      const n = stack.pop();
      if (Array.isArray(n)) stack.push(...n);
      else if (n && typeof n === 'object') {
        if (n['@type'] === 'VideoObject') out.push(n);
        stack.push(...Object.values(n));
      }
    }
  }
  return out;
}

/** Sources named by real players on the page: <video src> and child <source src>. */
function playerSources(html) {
  const found = new Set();
  for (const m of html.matchAll(/<video\b[^>]*>([\s\S]*?)<\/video>/gi)) {
    const [tag] = m[0].match(/<video\b[^>]*>/i) || [''];
    const direct = tag.match(/\ssrc=["']([^"']+)["']/i);
    if (direct) found.add(basePath(direct[1]));
    for (const s of m[1].matchAll(/<source\b[^>]*\ssrc(?:Set)?=["']([^"']+)["']/gi)) {
      found.add(basePath(s[1]));
    }
  }
  // Self-closing <video src=... /> with no closing tag.
  for (const m of html.matchAll(/<video\b[^>]*\ssrc=["']([^"']+)["'][^>]*\/?>/gi)) {
    found.add(basePath(m[1]));
  }
  return found;
}

const REQUIRED = ['name', 'description', 'uploadDate', 'duration', 'contentUrl', 'thumbnailUrl'];

function main() {
  if (!fs.existsSync(dist)) throw new Error('dist/ not found — run the build first');
  const problems = [];
  const claims = new Map(); // contentUrl -> [pages]
  let pagesWithVideo = 0;

  for (const file of htmlFiles()) {
    const rel = `/${path.relative(dist, file)}`.replace(/\.html$/, '');
    const html = fs.readFileSync(file, 'utf8');
    const nodes = videoNodes(html);
    if (!nodes.length) continue;
    pagesWithVideo += 1;
    const sources = playerSources(html);

    for (const node of nodes) {
      for (const f of REQUIRED) {
        if (!node[f] || (Array.isArray(node[f]) && !node[f].length)) {
          problems.push(`${rel}: VideoObject missing "${f}"`);
        }
      }
      const content = toLocal(node.contentUrl);
      if (!content) continue;

      // (1) a real player on the page must name this file
      if (!sources.has(content)) {
        problems.push(
          `${rel}: VideoObject contentUrl ${content} is not the src of any <video> on the page ` +
            `(players found: ${sources.size ? [...sources].join(', ') : 'none'}) — ` +
            `this is the "Video isn't on a watch page" bug`,
        );
      }
      // (2) the file must exist
      if (!fs.existsSync(path.join(dist, content.replace(/^\//, '')))) {
        problems.push(`${rel}: VideoObject contentUrl ${content} does not exist in dist`);
      }
      const thumbs = Array.isArray(node.thumbnailUrl) ? node.thumbnailUrl : [node.thumbnailUrl];
      for (const t of thumbs.filter(Boolean)) {
        const tl = toLocal(t);
        if (!fs.existsSync(path.join(dist, tl.replace(/^\//, '')))) {
          problems.push(`${rel}: VideoObject thumbnailUrl ${tl} does not exist in dist`);
        }
      }
      // (3) one clip, one watch page
      if (!claims.has(content)) claims.set(content, []);
      claims.get(content).push(rel);
    }
  }

  for (const [content, pages] of claims) {
    if (pages.length > 1) {
      problems.push(
        `${content} is claimed as the watch page by ${pages.length} URLs (${pages.join(', ')}) — ` +
          `a clip with no single home cannot be indexed as video; keep the markup on one page`,
      );
    }
  }

  if (problems.length) {
    console.error(`\n❌ video markup check failed (${problems.length})\n`);
    for (const p of problems) console.error(`  - ${p}`);
    console.error('');
    process.exit(1);
  }
  console.log(
    `✓ video markup check passed — ${claims.size} VideoObject(s) on ${pagesWithVideo} page(s), ` +
      `each embedded in a real player, each unique to one URL`,
  );
}

main();
