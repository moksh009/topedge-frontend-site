/**
 * Refuse to publish a dist that cannot serve the site.
 *
 * Why this exists. On 2026-10-08 the live site answered /compare and
 * /blog/* with a browser-level failure while /lp/cod-confirmation kept
 * working. That split is the signature of a deploy whose prerender step did not
 * run: pages under public/ are copied verbatim by vite and keep serving, while
 * every React marketing route exists ONLY as a file the prerender writes
 * (dist/compare.html, dist/blog/<slug>.html …).
 *
 * It takes the whole marketing site down because three things line up:
 *   1. _redirects carries no SPA fallback — `/*  /index.html  200` was removed
 *      on purpose so unknown URLs soft-404 instead of inheriting homepage SEO.
 *   2. So the only rule left matching a marketing URL is `/*  /404.html  404`.
 *   3. dist/404.html was itself written only by that same prerender step, so the
 *      catch-all pointed at a file that was not in the deploy either.
 *
 * build-static.js now writes a baseline 404.html, which removes (3). This check
 * closes the rest: a build missing its prerendered pages fails here instead of
 * publishing, and Netlify keeps the last good deploy.
 *
 * Runs last in build:netlify / build:firebase / build:static.
 *
 * Usage: node scripts/check-dist.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getMarketingPrerenderPaths } from './marketing-urls.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const failures = [];
const must = (ok, msg) => {
  if (!ok) failures.push(msg);
};

if (!fs.existsSync(dist)) {
  console.error('✖ dist/ does not exist — run the build first');
  process.exit(1);
}

/** Where a served path lives on disk, mirroring prerender-marketing.mjs. */
function fileForRoute(route) {
  if (route === '/') return path.join(dist, 'index.html');
  const clean = route.replace(/^\//, '').replace(/\/$/, '');
  return path.join(dist, `${clean}.html`);
}

// --- Every prerendered route must be a real file -------------------------------
// Without this the route has no document at all: no SPA fallback will catch it.
const routes = getMarketingPrerenderPaths();
const missing = routes.filter((r) => !fs.existsSync(fileForRoute(r)));
must(
  missing.length === 0,
  `${missing.length} of ${routes.length} prerendered pages are missing from dist (the prerender step did not run or did not finish): ${missing.slice(0, 8).join(', ')}${missing.length > 8 ? ' …' : ''}`,
);

// A prerendered page that is still the bare SPA shell is a silent SEO regression
// and usually means the render produced nothing useful.
for (const route of routes) {
  const f = fileForRoute(route);
  if (!fs.existsSync(f)) continue;
  const html = fs.readFileSync(f, 'utf8');
  must(/<h1[\s>]/i.test(html) || route === '/404', `${route}: prerendered file has no <h1>, so it rendered empty`);
}

// --- The catch-all target must exist -------------------------------------------
must(fs.existsSync(path.join(dist, '404.html')), 'dist/404.html missing — the `/*  /404.html  404` catch-all would point at nothing');

// --- Every local _redirects destination must resolve ----------------------------
// A rule whose target is absent cannot serve the URLs it claims.
const redirectsPath = path.join(dist, '_redirects');
must(fs.existsSync(redirectsPath), 'dist/_redirects missing — no routing rules would ship');
if (fs.existsSync(redirectsPath)) {
  const lines = fs
    .readFileSync(redirectsPath, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));
  for (const line of lines) {
    const [, to] = line.split(/\s+/);
    // Only local file destinations are checkable; full URLs and :splat are not.
    if (!to || !to.startsWith('/') || to.includes(':splat') || to.includes('*')) continue;
    const candidates = [
      path.join(dist, to),
      path.join(dist, `${to.replace(/\/$/, '')}.html`),
      path.join(dist, to.replace(/\/$/, ''), 'index.html'),
    ];
    must(candidates.some((c) => fs.existsSync(c)), `_redirects sends traffic to ${to}, which is not in dist`);
  }
}

// --- The static ad pages must survive the build ---------------------------------
// They are plain files under public/; if these are gone, vite did not copy public/.
for (const f of ['lp/cod-confirmation/index.html', 'privacy.html', 'terms.html']) {
  must(fs.existsSync(path.join(dist, f)), `dist/${f} missing`);
}

if (failures.length) {
  console.error(`\n✖ dist check failed (${failures.length}) — refusing to publish a broken site:`);
  for (const f of failures) console.error(`  - ${f}`);
  console.error('\nThis build would take marketing URLs down. Fix the build rather than deploying it.');
  process.exit(1);
}
console.log(`✅ dist check passed — ${routes.length} prerendered pages, 404 document and every redirect target present`);
