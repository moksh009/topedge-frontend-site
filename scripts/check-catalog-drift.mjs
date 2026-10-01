/**
 * Fail the build when FALLBACK_CATALOG prices no longer match the live catalog API.
 *
 * FALLBACK_CATALOG is not just an outage fallback — it is the seed the pricing page
 * renders on first paint, and therefore the prices that land in prerendered HTML and
 * in public/llms.txt. If it drifts from the live API, crawlers are served stale prices.
 *
 * Exit codes:
 *   0  prices, limits, plan names and feature flags all match
 *   1  at least one of those differs
 *   0  live API unreachable — reported loudly, but an API outage is not price drift
 *      and must not block an unrelated deploy. Set STRICT_CATALOG_DRIFT=1 to fail.
 *
 * Usage: node scripts/check-catalog-drift.mjs
 */
import { loadBillingCatalog } from './load-billing-catalog.mjs';

const PUBLIC_PLANS = ['launch', 'growth', 'scale'];
const CYCLES = ['monthly', 'quarterly', 'yearly'];

function label(v) {
  return v === undefined || v === null ? '(absent)' : String(v);
}

async function fetchLive(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    // Deliberately NO Origin header: the API 403s unknown browser origins, but
    // serves plain server-to-server requests. See the prerender script.
    const res = await fetch(url, { signal: ctrl.signal, headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!json?.plans?.length) throw new Error('empty catalog');
    return json;
  } finally {
    clearTimeout(timer);
  }
}

const { FALLBACK_CATALOG, CATALOG_URL } = await loadBillingCatalog();

let live;
try {
  live = await fetchLive(CATALOG_URL);
} catch (err) {
  const msg = `could not reach ${CATALOG_URL}: ${err.message}`;
  if (process.env.STRICT_CATALOG_DRIFT === '1') {
    console.error(`\n✖ catalog drift check FAILED — ${msg}`);
    console.error('  STRICT_CATALOG_DRIFT=1 is set, so an unreachable API is fatal.\n');
    process.exit(1);
  }
  console.warn(`\n⚠️  CATALOG DRIFT CHECK SKIPPED — ${msg}`);
  console.warn('   FALLBACK_CATALOG prices could NOT be verified against the live API.');
  console.warn('   Not failing the build: an API outage is not price drift.\n');
  process.exit(0);
}

const liveBySlug = new Map(live.plans.map((p) => [p.slug, p]));
const errors = [];
const warnings = [];

for (const slug of PUBLIC_PLANS) {
  const fb = FALLBACK_CATALOG.plans.find((p) => p.slug === slug);
  const lv = liveBySlug.get(slug);
  if (!fb) {
    errors.push(`${slug}: missing from FALLBACK_CATALOG`);
    continue;
  }
  if (!lv) {
    errors.push(`${slug}: missing from the live catalog`);
    continue;
  }

  // --- prices: hard failure -------------------------------------------------
  for (const key of ['monthlyPriceLabel', 'quarterlyPriceLabel', 'yearlyPriceLabel']) {
    if (label(fb[key]) !== label(lv[key])) {
      errors.push(`${slug}.${key}: fallback ${label(fb[key])} vs live ${label(lv[key])}`);
    }
  }
  for (const cycle of CYCLES) {
    const fbp = fb.pricing?.[cycle];
    const lvp = lv.pricing?.[cycle];
    for (const key of ['effectiveMonthlyLabel', 'billedLabel', 'perDayLabel', 'saveLabel']) {
      if (label(fbp?.[key]) !== label(lvp?.[key])) {
        errors.push(
          `${slug}.pricing.${cycle}.${key}: fallback ${label(fbp?.[key])} vs live ${label(lvp?.[key])}`,
        );
      }
    }
  }

  // --- plan name: fatal ------------------------------------------------------
  // check-llms-pricing.mjs keys its llms.txt table rows on displayName, so a
  // rename that only lands live would silently desync llms.txt from the site.
  if (label(fb.displayName) !== label(lv.displayName)) {
    errors.push(`${slug}.displayName: fallback ${label(fb.displayName)} vs live ${label(lv.displayName)}`);
  }

  // --- limits and feature flags: fatal --------------------------------------
  // These are rendered as prose in the plain-text plan summary and hardcoded in
  // public/llms.txt, so drift here publishes a false capability or limit claim.
  for (const key of ['ordersPerCycle', 'campaignEmailSendsPerCycle']) {
    if (Number(fb[key]) !== Number(lv[key])) {
      errors.push(`${slug}.${key}: fallback ${label(fb[key])} vs live ${label(lv[key])}`);
    }
  }
  const flagKeys = new Set([
    ...Object.keys(fb.features || {}),
    ...Object.keys(lv.features || {}),
  ]);
  for (const key of flagKeys) {
    if (label(fb.features?.[key]) !== label(lv.features?.[key])) {
      errors.push(
        `${slug}.features.${key}: fallback ${label(fb.features?.[key])} vs live ${label(lv.features?.[key])}`,
      );
    }
  }
}

for (const [key, fbv, lvv] of [
  ['currency', FALLBACK_CATALOG.currency, live.currency],
  ['trialDays', FALLBACK_CATALOG.trialDays, live.trialDays],
  ['defaultCycle', FALLBACK_CATALOG.defaultCycle, live.defaultCycle],
]) {
  if (label(fbv) !== label(lvv)) warnings.push(`catalog.${key}: fallback ${label(fbv)} vs live ${label(lvv)}`);
}

if (warnings.length) {
  console.warn(`\n⚠️  ${warnings.length} NON-PRICE catalog drift(s) — not fatal, but site copy may be wrong:`);
  for (const w of warnings) console.warn(`   · ${w}`);
  console.warn('');
}

if (errors.length) {
  console.error(`\n✖ catalog drift check FAILED — ${errors.length} mismatch(es) vs the live catalog:`);
  for (const e of errors) console.error(`   · ${e}`);
  console.error(`\n  Update FALLBACK_CATALOG in src/marketing/lib/billingCatalog.ts to match`);
  console.error(`  ${CATALOG_URL}, then re-run. Prerendered HTML and public/llms.txt`);
  console.error(`  both ship these numbers to crawlers.\n`);
  process.exit(1);
}

console.log(`✓ catalog drift check passed — FALLBACK_CATALOG prices, limits, plan names and feature flags all match ${CATALOG_URL}`);
if (warnings.length) console.log(`  (with ${warnings.length} non-price warning(s) above)`);
