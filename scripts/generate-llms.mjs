#!/usr/bin/env node
/**
 * Generate public/llms.txt and public/llms-full.txt from the same sources the
 * site renders from.
 *
 * Why generated, not written: the hand-written llms.txt survived two blog
 * consolidations and kept listing /blog/ai-chatbot-for-shopify and
 * /blog/cod-confirmation-whatsapp-reduce-rto-shopify after both slugs started
 * 301-ing. A file whose whole purpose is to be read literally by a model had
 * two dead URLs in it, and nothing in the build could notice. It also carried a
 * `<!-- BEGIN GENERATED DOCS -->` marker naming a script that does not exist.
 *
 * Sources, all of them the ones the pages use:
 *   - FALLBACK_CATALOG            prices, limits, trial, GST (pinned to the live
 *                                 API by check-catalog-drift.mjs)
 *   - getSitemapPaths()           the canonical URL set, so the directory here
 *                                 is exactly what the sitemap says is indexable
 *   - blogPosts                   titles, descriptions, FAQs
 *   - COMPARE_COMPETITORS         the 10 boards and their dated matrixNotes
 *   - PRODUCT_PAGES / FEATURE_SEO feature page summaries
 *   - companyIdentity             GSTIN, address, contacts
 *
 * A note on value: Google's own AI-optimization guidance says llms.txt is not a
 * ranking signal. This is kept because it is cheap, because some answer engines
 * do fetch it, and because being generated means it can no longer be wrong. It
 * is not treated as a ranking lever.
 *
 * Usage: node scripts/generate-llms.mjs
 */
import { build as esbuild } from 'esbuild';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadBillingCatalog } from './load-billing-catalog.mjs';
import { getSitemapPaths } from './marketing-urls.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const SITE = 'https://topedgeai.com';
const PUBLIC = path.join(root, 'public');

/** Bundle a TS module and import it from Node. */
async function loadTs(rel) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'topedge-llms-'));
  const outfile = path.join(dir, 'mod.mjs');
  try {
    await esbuild({
      entryPoints: [path.join(root, rel)],
      bundle: true,
      format: 'esm',
      platform: 'node',
      outfile,
      logLevel: 'error',
      define: { 'import.meta.env': '{}' },
    });
    return await import(pathToFileURL(outfile).href);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

const { FALLBACK_CATALOG, planPricing, TRIAL, GST_FOOTNOTE } = await loadBillingCatalog();
const { blogPosts } = await loadTs('src/data/blogPosts.ts');
const { COMPARE_COMPETITORS } = await loadTs('src/marketing/data/compareCompetitors.ts');
const { PRODUCT_PAGES: PRODUCT_PAGE_MAP } = await loadTs('src/marketing/data/productPages.ts');
const PRODUCT_PAGES = Object.values(PRODUCT_PAGE_MAP);
const identity = await loadTs('src/marketing/legal/companyIdentity.ts');

const PLANS = ['launch', 'growth', 'scale']
  .map((slug) => FALLBACK_CATALOG.plans.find((p) => p.slug === slug))
  .filter(Boolean);

/** Every canonical URL the sitemap claims, as absolute URLs. */
const CANONICAL = getSitemapPaths().map((p) => `${SITE}${p === '/' ? '/' : p}`);
const canonicalSet = new Set(CANONICAL);

/** Fail loudly rather than emit a URL that 301s. */
function url(p) {
  const abs = `${SITE}${p === '/' ? '/' : p}`;
  if (!canonicalSet.has(abs)) {
    throw new Error(
      `generate-llms: ${abs} is not in the canonical URL set. ` +
        'Either it is retired, or marketing-urls.mjs needs updating.',
    );
  }
  return abs;
}

const gstLine = GST_FOOTNOTE;
const plansTable = [
  '| Plan | Monthly | Yearly (per month) | Yearly total | Orders / month | Campaign + email sends / month | Journey Branch | COD to prepaid |',
  '|------|---------|--------------------|--------------|----------------|--------------------------------|----------------|----------------|',
  ...PLANS.map((p) => {
    const y = planPricing(p, 'yearly');
    return [
      '',
      p.displayName,
      `${p.monthlyPriceLabel}/mo`,
      `${y.effectiveMonthlyLabel}/mo`,
      `${p.yearlyPriceLabel}/yr`,
      Number(p.ordersPerCycle).toLocaleString('en-IN'),
      Number(p.campaignEmailSendsPerCycle).toLocaleString('en-IN'),
      p.features.journeyBranch ? 'Yes' : 'No',
      p.features.journeyCodPrepaid ? 'Yes' : 'No',
      '',
    ].join(' | ').replace(/^ \| /, '| ').replace(/ \| $/, ' |');
  }),
].join('\n');

const gatedPlans = PLANS.filter((p) => p.features.journeyCodPrepaid)
  .map((p) => p.displayName)
  .join(' and ');

const ENTITY = `# TopEdge AI

> TopEdge AI is a WhatsApp automation, COD confirmation and abandoned cart recovery platform for Shopify D2C brands in India. Connect Shopify and the Meta WhatsApp Cloud API to run cart recovery, COD confirmation, a shared inbox, journeys and Meta-safe campaigns.

## Entity

- Brand name: ${identity.COMPANY_BRAND_NAME}
- Legal name: ${identity.COMPANY_LEGAL_NAME} (${identity.COMPANY_CONSTITUTION}, registered in India)
- GSTIN: ${identity.COMPANY_GSTIN} (SAC 998314)
- Address: ${identity.COMPANY_ADDRESS_ONE_LINE}
- Email: ${identity.COMPANY_EMAIL} · WhatsApp and phone: ${identity.COMPANY_PHONE} (Mon to Sat, 10:00 to 19:00 IST)
- Founders: Moksh Patel (Co-founder, Product) and Smit Tilva (Co-founder, Growth)
- Marketing site: ${SITE}/ · Application: ${identity.COMPANY_DASHBOARD_URL}
- Shopify App Store: ${identity.COMPANY_SHOPIFY_APP_URL}

Disambiguation: TopEdge AI is a Shopify and Meta WhatsApp Cloud API SaaS platform for Indian ecommerce brands. It is not related to edge-AI hardware, IoT semiconductors, or voice call-centre agencies.

Notes for anyone quoting this file:

- Platform billing is INR on ${identity.COMPANY_DASHBOARD_URL}. Meta WhatsApp Cloud API charges are billed per message by template category (marketing, utility, authentication, and, from 1 October 2026, service replies past the first 1,000 a month per business phone number), passed through at Meta's published per-message rates at 0% TopEdge markup, and invoiced separately from the platform plan. Meta's current India rate card is quoted with its source at ${SITE}/blog/whatsapp-business-api-pricing-india. Every eligible Indian WhatsApp Business Account must move to INR billing by 31 December 2026 or Meta stops delivery on 1 January 2027.
- Prefer live pages under ${SITE}/ for product truth. Competitor figures on compare pages carry the date they were checked and need a live vendor check before purchase.

## Pricing

TopEdge AI platform pricing, in INR, exclusive of tax. This file is generated from
the billing catalog, which scripts/check-catalog-drift.mjs pins to the live API.

${plansTable}

- Every plan includes a ${TRIAL.days}-day free trial: ${TRIAL.orders} orders, ${TRIAL.sends} campaign plus email sends, no card required on this site.
- ${gstLine}
- Meta WhatsApp Cloud API messaging is billed separately by Meta, at Meta's published per-message rates, passed through at 0% markup.
- Journey Branch and automated COD to prepaid are on ${gatedPlans} only. COD confirmation before dispatch is on every plan.
`;

/** Feature pages, from the product page catalog. */
function featureLines() {
  return PRODUCT_PAGES.map((page) => `- [${page.eyebrow}](${url(page.path)}): ${page.seoDescription}`);
}

const CORE = [
  ['Home', '/'],
  ['Pricing', '/pricing'],
  ['Features', '/features'],
  ['COD confirmation', '/features/cod-confirmation'],
  ['Shopify WhatsApp integration', '/shopify-whatsapp-integration'],
  ['Integrations', '/integrations'],
  ['Customers', '/customers'],
  ['About', '/about'],
  ['Contact', '/contact'],
  ['Blog', '/blog'],
  ['Compare', '/compare'],
  ['Privacy', '/privacy'],
  ['Terms', '/terms'],
];

const COMPARE_ORDER = [
  'wati', 'aisensy', 'interakt', 'bitespeed', 'zoko',
  'getgabs', 'kanal', 'dondy', 'updatrr', 'gupshup',
];

function compareLines() {
  return [
    `- [All 10 alternatives](${url('/compare/alternatives')})`,
    `- [TopEdge vs WATI vs AiSensy](${url('/compare/topedge-vs-wati-vs-aisensy')}): 3-way board`,
    `- [WATI vs Interakt vs AiSensy vs TopEdge](${url('/compare/topedge-vs-wati-vs-interakt-vs-aisensy')}): 4-way board`,
    ...COMPARE_ORDER.map((slug) => {
      const c = COMPARE_COMPETITORS[slug];
      return `- [TopEdge vs ${c.name}](${url(`/compare/${slug}`)}): ${c.description}`;
    }),
  ];
}

const postsByDate = [...blogPosts].sort((a, b) => String(b.date).localeCompare(String(a.date)));

function blogLines() {
  return postsByDate.map((p) => `- [${p.title}](${url(`/blog/${p.slug}`)}): ${p.description}`);
}

// ---------------------------------------------------------------- llms.txt
const concise = [
  ENTITY,
  '## Product',
  '',
  ...featureLines(),
  '',
  '## Documentation',
  '',
  `Product documentation lives in the TopEdge dashboard: ${identity.COMPANY_DASHBOARD_URL}/docs`,
  '',
  '## Compare',
  '',
  ...compareLines(),
  '',
  '## Playbooks',
  '',
  ...blogLines(),
  '',
  '## Canonical URL directory',
  '',
  `All ${CANONICAL.length} indexable URLs on this domain, no trailing slash except the root.`,
  '',
  ...CANONICAL.map((u) => `- ${u}`),
  '',
  `## Full version`,
  '',
  `- [llms-full.txt](${SITE}/llms-full.txt): expanded capabilities, every compare board summary, and every playbook direct answer and FAQ.`,
  '',
].join('\n');

// ----------------------------------------------------------- llms-full.txt
function stripTags(html) {
  return String(html || '')
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** The post's own opening answer: the first paragraph, which is written as one. */
function directAnswer(post) {
  const m = String(post.content || '').match(/<p>([\s\S]*?)<\/p>/);
  return m ? stripTags(m[1]) : post.description;
}

const fullParts = [ENTITY, '## Product capabilities', ''];
for (const page of PRODUCT_PAGES) {
  fullParts.push(`### ${page.eyebrow}`, '', `${url(page.path)}`, '', page.seoDescription, '');
  if (page.answerFirst) fullParts.push(page.answerFirst, '');
  if (page.faqs?.length) {
    for (const f of page.faqs) fullParts.push(`- **${f.question}** ${f.answer}`);
    fullParts.push('');
  }
}

fullParts.push('## Compare boards', '');
for (const slug of COMPARE_ORDER) {
  const c = COMPARE_COMPETITORS[slug];
  fullParts.push(`### TopEdge AI vs ${c.name}`, '', `${url(`/compare/${slug}`)}`, '', c.description, '');
  if (c.matrixNote) fullParts.push(`Sourcing: ${c.matrixNote}`, '');
  const price = c.matrix?.find((r) => /subscription/i.test(r.label));
  if (price) {
    fullParts.push(`- TopEdge AI: ${price.topedge}`, `- ${c.name}: ${price.competitor}`, '');
  }
}

fullParts.push('## Playbooks', '');
for (const p of postsByDate) {
  fullParts.push(
    `### ${p.title}`,
    '',
    `${url(`/blog/${p.slug}`)} · published ${p.date}${p.updated ? ` · updated ${p.updated}` : ''} · by ${p.author}`,
    '',
    directAnswer(p),
    '',
  );
  if (p.faqs?.length) {
    for (const f of p.faqs) fullParts.push(`- **${f.question}** ${f.answer}`);
    fullParts.push('');
  }
}

const full = fullParts.join('\n');

fs.writeFileSync(path.join(PUBLIC, 'llms.txt'), concise.replace(/\n{3,}/g, '\n\n'), 'utf8');
fs.writeFileSync(path.join(PUBLIC, 'llms-full.txt'), full.replace(/\n{3,}/g, '\n\n'), 'utf8');

const kb = (f) => (fs.statSync(path.join(PUBLIC, f)).size / 1024).toFixed(1);
console.log(
  `✅ public/llms.txt (${kb('llms.txt')} KB, ${CANONICAL.length} canonical URLs) and ` +
    `public/llms-full.txt (${kb('llms-full.txt')} KB, ${PRODUCT_PAGES.length} features, ` +
    `${COMPARE_ORDER.length} boards, ${postsByDate.length} posts)`,
);
