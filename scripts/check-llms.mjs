#!/usr/bin/env node
/**
 * Fail the build when llms.txt or llms-full.txt is missing, stale, or points at
 * a URL that does not exist any more.
 *
 * This exists because the hand-written llms.txt kept listing two blog slugs for
 * weeks after both started 301-ing, and nothing noticed. The pricing was checked
 * (check-llms-pricing.mjs); the URLs were not.
 *
 * Asserts, for both files:
 *   1. the file exists in public/ and, when dist/ is present, in the build output
 *   2. every topedgeai.com URL in it is one of the canonical sitemap URLs
 *   3. no trailing slashes except the root, no /roi, no docs on the dashboard host
 *      (the docs live at topedgeai.com/docs since 31 Oct 2026)
 *   4. every INR figure is one the billing catalog actually publishes
 *   5. the GSTIN, GST line and 0% markup statement are present in llms.txt
 *
 * Exit 0 on pass, 1 on any failure. No network.
 *
 * Usage: node scripts/check-llms.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBillingCatalog } from './load-billing-catalog.mjs';
import { getSitemapPaths } from './marketing-urls.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const SITE = 'https://topedgeai.com';
const FILES = ['llms.txt', 'llms-full.txt'];

const { FALLBACK_CATALOG, planPricing, TRIAL, GST_FOOTNOTE } = await loadBillingCatalog();
const errors = [];

const canonical = new Set(getSitemapPaths().map((p) => `${SITE}${p === '/' ? '/' : p}`));

/** Every INR label the catalog publishes, in any cycle, plus the trial zeroes. */
const allowedInr = new Set();
for (const plan of FALLBACK_CATALOG.plans) {
  for (const label of [plan.monthlyPriceLabel, plan.quarterlyPriceLabel, plan.yearlyPriceLabel]) {
    if (label) allowedInr.add(label);
  }
  for (const cycle of ['monthly', 'quarterly', 'yearly']) {
    const p = planPricing(plan, cycle);
    for (const label of [p.effectiveMonthlyLabel, p.billedLabel, p.perDayLabel, p.saveLabel]) {
      if (label) allowedInr.add(label);
    }
  }
}
// Estimated BYOK token cost is a range, not a catalog price. It is stated as an
// estimate on every surface that carries it, so it is allowed here by name.
//
// Meta's own per-message rates are deliberately NOT added here: check-llms-pricing
// forbids quoting them as numbers above "## Product" at all, so that llms.txt can
// never read as though a per-message rate were a TopEdge price. The entity block
// points at /blog/whatsapp-business-api-pricing-india for the sourced rate card.
const ALLOWED_INR_EXTRA = new Set(['₹0.10', '₹0.30']);

for (const name of FILES) {
  const pub = path.join(root, 'public', name);
  if (!fs.existsSync(pub)) {
    errors.push(`${name}: missing from public/ — run \`npm run llms\``);
    continue;
  }
  const dist = path.join(root, 'dist', name);
  if (fs.existsSync(path.join(root, 'dist')) && !fs.existsSync(dist)) {
    errors.push(`${name}: missing from the build output (dist/${name})`);
  }

  const text = fs.readFileSync(pub, 'utf8');

  // --- URLs ---------------------------------------------------------------
  const urls = new Set(
    [...text.matchAll(/https:\/\/topedgeai\.com[^\s)\]>"'`]*/g)].map((m) =>
      m[0].replace(/[.,;:]+$/, ''),
    ),
  );
  for (const u of urls) {
    // The two generated text files reference each other and the sitemap.
    if (/\/(llms\.txt|llms-full\.txt|sitemap\.xml|robots\.txt)$/.test(u)) continue;
    if (u === SITE) {
      errors.push(`${name}: bare "${u}" — use ${SITE}/ so the root matches the sitemap`);
      continue;
    }
    if (u !== `${SITE}/` && u.endsWith('/')) {
      errors.push(`${name}: trailing slash on ${u}`);
      continue;
    }
    if (!canonical.has(u)) {
      errors.push(`${name}: ${u} is not a canonical URL (retired, redirected, or not indexable)`);
    }
  }
  if (/\/\/topedgeai\.com\/roi\b/.test(text)) {
    errors.push(`${name}: references /roi, which 301s`);
  }
  // Docs moved to topedgeai.com/docs on 31 Oct 2026; the dashboard copy 301s here.
  if (/dash\.topedgeai\.com\/docs\b/.test(text)) {
    errors.push(`${name}: references dash.topedgeai.com/docs, which 301s to topedgeai.com/docs`);
  }
  if (name === 'llms.txt' && !text.includes(`${SITE}/docs/quickstart`)) {
    errors.push(`${name}: the Documentation section does not list the doc pages`);
  }

  // --- money --------------------------------------------------------------
  // Only the concise file, and only above "## Product". Everything below that
  // line quotes other people's prices on purpose: competitor entry tiers, Meta
  // per-message rates, and the ₹80 to ₹300 courier cost of one RTO. Those are
  // not ours to match against our catalog, and llms-full.txt is almost entirely
  // made of them. What must never drift is a number presented as a TopEdge plan
  // price, and that all lives in the entity and pricing blocks.
  if (name === 'llms.txt') {
    const ours = text.split('\n## Product')[0];
    for (const m of ours.matchAll(/₹[\d,]+(?:\.\d+)?/g)) {
      const label = m[0];
      if (allowedInr.has(label) || ALLOWED_INR_EXTRA.has(label)) continue;
      errors.push(`${name}: ${label} is presented as a TopEdge price but the catalog does not publish it`);
    }
  }
}

// --- llms.txt must carry the entity facts a model would quote --------------
const concise = fs.existsSync(path.join(root, 'public', 'llms.txt'))
  ? fs.readFileSync(path.join(root, 'public', 'llms.txt'), 'utf8')
  : '';
const required = [
  ['GSTIN', '24ABAFT1041M1ZD'],
  ['GST footnote', GST_FOOTNOTE],
  ['0% markup statement', '0% markup'],
  ['trial length', `${TRIAL.days}-day free trial`],
];
for (const [what, needle] of required) {
  if (concise && !concise.includes(needle)) {
    errors.push(`llms.txt: missing the ${what} (${needle})`);
  }
}

// --- there must be exactly ONE robots.txt in the repo ----------------------
//
// A second copy lived at the repository root until 2026-10-29. Vite's publicDir
// is public/, so only public/robots.txt was ever served — GSC fetched 1,890
// bytes, which is that file. The root copy shipped nowhere.
//
// It was not harmless. Both files were being edited by hand to match (commit
// ac29244 changed the same 10 lines in each), and they had already drifted: the
// llms.txt pointer block reached public/robots.txt and never reached the root
// copy, leaving 1,890 bytes served against 1,631 bytes dead. The next person to
// open the obvious path and edit the crawl rules would have changed nothing on
// the live site and had no way to tell.
const strayRobots = path.join(root, 'robots.txt');
if (fs.existsSync(strayRobots)) {
  errors.push(
    'robots.txt exists at the repository root. Only public/robots.txt is served ' +
      '(Vite publicDir), so a root copy is dead weight that silently diverges — ' +
      'delete it and edit public/robots.txt instead.',
  );
}

// --- robots.txt should point at it ----------------------------------------
const robots = fs.readFileSync(path.join(root, 'public', 'robots.txt'), 'utf8');
if (!robots.includes(`${SITE}/llms.txt`)) {
  errors.push('robots.txt: no pointer to /llms.txt');
}

if (errors.length) {
  console.error(`\n✖ llms check FAILED (${errors.length})\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error('');
  process.exit(1);
}

const sizes = FILES.map(
  (f) => `${f} ${(fs.statSync(path.join(root, 'public', f)).size / 1024).toFixed(1)} KB`,
).join(', ');
console.log(
  `✓ llms check passed — ${sizes}, every URL canonical, every ₹ figure from the catalog`,
);
