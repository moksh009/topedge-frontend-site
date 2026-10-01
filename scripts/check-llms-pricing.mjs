/**
 * Fail the build when the pricing block in public/llms.txt drifts from the catalog.
 *
 * llms.txt is hand-written plain text, so nothing stops a price there from going
 * stale while the catalog moves on — and it is one of the files LLMs read most
 * literally. This asserts every number in the `## Pricing` table, plus the trial
 * and GST lines, against FALLBACK_CATALOG, which scripts/check-catalog-drift.mjs
 * separately pins to the live API.
 *
 * Exit 0 on match, 1 on any drift. No network.
 *
 * Usage: node scripts/check-llms-pricing.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBillingCatalog } from './load-billing-catalog.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LLMS = path.resolve(__dirname, '..', 'public', 'llms.txt');
const PUBLIC_PLANS = ['launch', 'growth', 'scale'];

const { FALLBACK_CATALOG, planPricing, TRIAL, GST_FOOTNOTE } = await loadBillingCatalog();

const text = fs.readFileSync(LLMS, 'utf8');
const errors = [];

const section = text.split(/^## /m).find((b) => b.startsWith('Pricing'));
if (!section) {
  console.error(`\n✖ llms.txt pricing check FAILED — no "## Pricing" section in ${LLMS}\n`);
  process.exit(1);
}

const rows = new Map();
for (const line of section.split('\n')) {
  const t = line.trim();
  if (!t.startsWith('|') || /^\|[\s|:-]+\|$/.test(t)) continue;
  const cells = t.split('|').slice(1, -1).map((c) => c.trim());
  if (cells[0] && cells[0] !== 'Plan') rows.set(cells[0].toLowerCase(), cells);
}

for (const slug of PUBLIC_PLANS) {
  const plan = FALLBACK_CATALOG.plans.find((p) => p.slug === slug);
  if (!plan) {
    errors.push(`${slug}: missing from FALLBACK_CATALOG`);
    continue;
  }
  const cells = rows.get(plan.displayName.toLowerCase());
  if (!cells) {
    errors.push(`${plan.displayName}: no table row in the llms.txt "## Pricing" table`);
    continue;
  }
  const yearly = planPricing(plan, 'yearly');
  const expected = [
    ['Plan', plan.displayName],
    ['Monthly', `${plan.monthlyPriceLabel}/mo`],
    ['Yearly (per month)', `${yearly.effectiveMonthlyLabel}/mo`],
    ['Yearly total', `${plan.yearlyPriceLabel}/yr`],
    ['Orders / month', Number(plan.ordersPerCycle).toLocaleString('en-IN')],
    [
      'Campaign + email sends / month',
      Number(plan.campaignEmailSendsPerCycle).toLocaleString('en-IN'),
    ],
    ['Journey Branch', plan.features.journeyBranch ? 'Yes' : 'No'],
  ];
  if (cells.length !== expected.length) {
    errors.push(
      `${plan.displayName}: row has ${cells.length} column(s), expected ${expected.length}`,
    );
    continue;
  }
  expected.forEach(([col, want], i) => {
    if (cells[i] !== want) {
      errors.push(`${plan.displayName} · ${col}: llms.txt "${cells[i]}" vs catalog "${want}"`);
    }
  });
}

// Prose lines that carry numbers must stay sourced too.
const trialLine = `a ${TRIAL.days}-day free trial: ${TRIAL.orders} orders, ${TRIAL.sends} campaign + email sends`;
if (!section.includes(trialLine)) {
  errors.push(`trial line missing or stale — expected to contain: "${trialLine}"`);
}
if (!section.includes(GST_FOOTNOTE)) {
  errors.push(`GST line missing or stale — expected to contain: "${GST_FOOTNOTE}"`);
}

// Meta per-message rates must NOT be quoted as numbers here.
const rate = section.match(/₹\s?0?\.\d+/);
if (rate) {
  errors.push(
    `a Meta per-message rate (${rate[0]}) is quoted in the pricing section — ` +
      `say "Meta's published per-message rates, passed through at 0% markup" instead`,
  );
}

if (errors.length) {
  console.error(`\n✖ llms.txt pricing check FAILED — ${errors.length} problem(s):`);
  for (const e of errors) console.error(`   · ${e}`);
  console.error(`\n  Fix the "## Pricing" section of public/llms.txt to match`);
  console.error(`  FALLBACK_CATALOG in src/marketing/lib/billingCatalog.ts.\n`);
  process.exit(1);
}

console.log('✓ llms.txt pricing check passed — every value matches the billing catalog');
