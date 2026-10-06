/**
 * Build the static Google Ads landing pages in public/lp/<slug>/index.html.
 *
 * Why static HTML: the React app currently replaces prerendered HTML with a loader, so
 * mobile LCP on React routes is 4-7s. Ad pages must paint immediately, so they ship as
 * plain HTML with inline CSS and one inline script, no React, no external requests.
 *
 * Why generated: plan prices and the COD-to-prepaid gating come from FALLBACK_CATALOG
 * (the same source the pricing page seeds from, checked against the live API by
 * check-catalog-drift.mjs), so a landing page cannot drift from /pricing.
 *
 * Theme: scripts/lp/base.css mirrors the --mkt-* tokens in src/marketing/styles/marketing.css
 * and the .mkt-pf hero/step/card patterns, with the same system font stack (no webfont download).
 *
 * Output pages are noindex, not in sitemap.xml or llms.txt, and linked from nowhere.
 *
 * Usage: node scripts/generate-landing-pages.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBillingCatalog, resolveViteEnv } from './load-billing-catalog.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const lpDir = path.join(__dirname, 'lp');
const MAX_BYTES = 60 * 1024;

const { FALLBACK_CATALOG, TRIAL } = await loadBillingCatalog();
const plans = FALLBACK_CATALOG.plans;
const byslug = Object.fromEntries(plans.map((p) => [p.slug, p]));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');


// Single source for company facts: read the string constants from companyIdentity.ts so this
// page cannot drift from the site. Fails the build if one is missing.
const identitySrc = fs.readFileSync(path.join(root, 'src/marketing/legal/companyIdentity.ts'), 'utf8');
function identity(name) {
  const m = identitySrc.match(new RegExp(`export const ${name} =\\s*'([^']+)'`));
  if (!m) throw new Error(`companyIdentity.ts: ${name} not found`);
  return m[1];
}
const SHOPIFY_URL = identity('COMPANY_SHOPIFY_APP_URL');
const LEGAL_NAME = identity('COMPANY_LEGAL_NAME');
const COMPANY_EMAIL = identity('COMPANY_EMAIL');

const TRIAL_MICRO = `${TRIAL.days}-day free trial · ${TRIAL.orders} free order confirmations · No credit card · Live in about 15 minutes`;
const TRIAL_SHORT = `${TRIAL.days} days. ${TRIAL.orders} free orders. No card.`;

// Hero headline per ad group. utm_content that starts with a key selects that variant.
const HERO_VARIANTS = {
  loss: {
    h1: 'Stop Paying Three Times for Orders Your Customers Never Wanted',
    sub: 'TopEdge sends an automatic WhatsApp confirmation the moment a COD order is placed. You only pack, ship, and chase courier costs for orders the buyer actually confirmed.',
  },
  speed: {
    h1: 'Confirm COD Orders on WhatsApp Before You Ship',
    sub: 'TopEdge sends an automatic WhatsApp confirmation the moment a COD order is placed. The buyer taps Confirm or Cancel, and you ship what they confirm.',
  },
  rto: {
    h1: 'Cut RTO Before the Courier Even Picks Up',
    sub: 'TopEdge sends an automatic WhatsApp confirmation the moment a COD order is placed, so fewer refused parcels make the trip in the first place.',
  },
};

// Verbatim Trustpilot reviews, retrieved 6 Oct 2026. Do not edit the text.
const QUOTES = [
  { text: "The overall software experience is good — it's Indian software but feels like US Grade software quality.", author: 'Tirth P.' },
  { text: 'Topedge helped me a lot to solve issues with my ecomm business like abandoned cart followups, complete tracing of what a lead did and where it dropped off. Their support team is very helpful.', author: 'Shubham P.' },
  { text: "In 2 days they built me everything... I'm on their ₹1,999 base plan, and mostly every feature is unlocked on every plan.", author: 'Robin' },
];

const ICONS = {
  coin: '<path d="M12 3v18M16 7.5c0-1.4-1.8-2.5-4-2.5s-4 1.1-4 2.5 1.8 2.5 4 2.5 4 1.1 4 2.5-1.8 2.5-4 2.5-4-1.1-4-2.5"/>',
  user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.6-3.6 3.4-5.5 7-5.5s6.4 1.9 7 5.5"/>',
  card: '<rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="M3 10.5h18M7 15h3"/>',
  loop: '<path d="M17 8a6 6 0 0 0-10.5 1.5M7 16a6 6 0 0 0 10.5-1.5M17 4v4h-4M7 20v-4h4"/>',
};
const WHY = [
  { icon: 'coin', h: 'You pay Meta. Not us, on top of Meta.', p: "WhatsApp message fees are billed directly to your own Meta Business account. TopEdge adds 0% markup, unlike platforms that charge a per-message fee on top of Meta's own rate." },
  { icon: 'user', h: 'One buyer, one profile, even with three phone numbers.', p: 'Orders, carts, and chats from the same person merge into a single profile automatically, instead of splitting into duplicate, disconnected leads.' },
  { icon: 'card', h: 'Turn hesitant COD buyers into paid-upfront customers.', p: 'Send a payment link in the same WhatsApp thread, built natively for Shopify checkout, no manual mapping required.' },
  { icon: 'loop', h: 'Automate as much as you need. It is not metered.', p: "Flow automations run unlimited times on every plan. You are never rationed on how many times your own workflows can run." },
];

function yearly(p) {
  return p.pricing.yearly?.effectiveMonthlyLabel ?? p.monthlyPriceLabel;
}

function planCards() {
  return plans
    .map((p) => {
      const items = ['Basic COD confirmation'];
      if (p.features.journeyCodPrepaid) items.push('COD to prepaid payment links');
      if (p.features.dispatchPriority === 'highest') items.push('Highest dispatch priority');
      const yearlyBilled = p.pricing.yearly?.billedLabel ?? p.yearlyPriceLabel;
      return `      <div class="card plan${p.emphasis ? ' em' : ''}">
        <h3>${esc(p.displayName)}</h3>${p.emphasis ? '\n        <span class="badge">Most popular</span>' : ''}
        <p class="price"><span class="p-yearly">${esc(yearly(p))}</span><span class="p-monthly">${esc(p.monthlyPriceLabel)}</span> <small>/ month</small></p>
        <p class="bill p-yearly">Billed yearly at ${esc(yearlyBilled)} + 18% GST</p>
        <p class="bill p-monthly">Billed monthly + 18% GST</p>
        <ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      </div>`;
    })
    .join('\n');
}

const prepaidPlans = plans.filter((p) => p.features.journeyCodPrepaid).map((p) => p.displayName);
const prepaidText = prepaidPlans.join(' and ');
const launch = byslug.launch;

// The plan lists six questions. Answers about Meta approval and COD to prepaid keep the wording
// already verified on this page; the rest follow the plan with em dashes removed.
const FAQS = [
  {
    q: 'How much does it cost?',
    a: `Plans start at ${launch.monthlyPriceLabel} a month + 18% GST, or ${yearly(launch)} a month if billed yearly, and basic COD confirmation is included on every plan. Meta charges its own per-message WhatsApp fees directly on your Meta Business account, and TopEdge adds 0% markup.`,
  },
  {
    q: 'What happens if the customer does not reply?',
    a: "You decide. Set an automatic follow-up reminder, or hold the order for manual review. Either way, nothing ships until you've chosen what to do with unconfirmed orders.",
  },
  {
    q: 'Do WhatsApp templates need Meta approval?',
    a: 'Yes. Every message template must be approved by Meta before it can send, and TopEdge will not send a template that is not approved yet. This protects your WhatsApp number.',
  },
  {
    q: 'Which plan has COD to prepaid?',
    a: `${prepaidText} only. It sends a WhatsApp payment link created from a Shopify draft invoice, so a buyer can switch from Cash on Delivery to paying upfront. ${launch.displayName} includes basic COD confirmation.`,
  },
  {
    q: 'Will this work with my existing Shopify checkout?',
    a: "Yes. TopEdge connects through Shopify's native order webhooks, so there are no theme edits and no checkout script changes, and you don't need a developer. Most stores are live in about 15 minutes.",
  },
  {
    q: 'Is my WhatsApp number safe to use for this?',
    a: 'Yes. TopEdge only sends Meta-approved template messages through the official WhatsApp Cloud API, the same infrastructure Meta provides for business messaging. It is not a workaround.',
  },
];

const faqHtml = FAQS.map(
  (f, i) => `    <details name="faq"${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`,
).join('\n');

const quotesHtml = QUOTES.map(
  (q) => `      <blockquote class="card quote"><p>${esc(q.text)}</p><footer>${esc(q.author)}, Trustpilot</footer></blockquote>`,
).join('\n');

const whyHtml = WHY.map(
  (w) => `      <div class="card why"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[w.icon]}</svg><h3>${esc(w.h)}</h3><p>${esc(w.p)}</p></div>`,
).join('\n');

const PHONE_LABEL =
  'Example WhatsApp message to a buyer: Hi Priya, we received your order #1042, Cash on Delivery, ₹1,499. Please confirm it so we can ship it today. Two buttons follow: Confirm order and Cancel order.';

function phone(id) {
  return `<figure class="phone" id="${id}">
        <div class="pbar"><i></i>Your store</div>
        <div class="chat" role="img" aria-label="${esc(PHONE_LABEL)}">
          <div class="bubble"><p>Hi Priya, we received your order <strong data-hl="order">#1042</strong> (Cash on Delivery, ₹1,499).</p><p>Please confirm it so we can ship it today.</p><time>10:42</time></div>
          <div class="rep" data-hl="buttons"><span>Confirm order</span><span>Cancel order</span></div>
          <div class="done" data-hl="check">✓ Confirmed</div>
        </div>
        <figcaption class="pcap">Example message. Your approved Meta template may differ.</figcaption>
      </figure>`;
}

const PAGES = [
  {
    slug: 'cod-confirmation',
    title: 'TopEdge AI: WhatsApp COD Confirmation for Shopify',
    description:
      'Confirm COD orders on WhatsApp before you ship them. Fewer fake orders and returned parcels for Indian Shopify stores. 14-day free trial, no card.',
  },
];

// GA4 is optional: with no VITE_GA_MEASUREMENT_ID the page makes no analytics request at all.
// When set, gtag.js loads only after the window `load` event, so it cannot delay first paint.
const gaId = String(resolveViteEnv().VITE_GA_MEASUREMENT_ID || '').trim();
const analytics = /^G-[A-Z0-9]{4,}$/.test(gaId)
  ? `<script>
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('js',new Date());gtag('config','${gaId}');
addEventListener('load',function(){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${gaId}';document.head.appendChild(s)});
</script>
`
  : '';

const css = fs.readFileSync(path.join(lpDir, 'base.css'), 'utf8').trim();
const attribution = fs.readFileSync(path.join(lpDir, 'attribution.js'), 'utf8').trim();
const behavior = fs.readFileSync(path.join(lpDir, 'page.js'), 'utf8').trim();

// Function replacers: a catalog string containing `$&` must never be interpreted as a pattern.
const fill = (tpl, map) => tpl.replace(/\{\{([A-Z0-9_]+)\}\}/g, (m, k) => (k in map ? map[k] : m));

for (const page of PAGES) {
  const body = fill(fs.readFileSync(path.join(lpDir, `${page.slug}.body.html`), 'utf8'), {
    PLAN_CARDS: planCards(),
    FAQS: faqHtml,
    QUOTES: quotesHtml,
    WHY_CARDS: whyHtml,
    PHONE_HERO: phone('hero-phone'),
    PHONE_HOW: phone('how-phone'),
    SLUG: page.slug,
    SHOPIFY_URL,
    TRIAL_MICRO,
    TRIAL_SHORT,
    HERO_H1: esc(HERO_VARIANTS.loss.h1),
    HERO_SUB: esc(HERO_VARIANTS.loss.sub),
    HERO_VARIANTS_JSON: JSON.stringify(HERO_VARIANTS).replace(/</g, '\\u003c'),
    LEGAL_NAME: esc(LEGAL_NAME),
    COMPANY_EMAIL: esc(COMPANY_EMAIL),
  });

  const html = `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<meta name="robots" content="noindex,nofollow">
<meta name="theme-color" content="#7C3AED">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon.png">
<style>${css}</style>
</head>
<body>
${body}
${analytics}<script>
${behavior}
</script>
<script>
${attribution.replaceAll('{{SLUG}}', page.slug)}
</script>
</body>
</html>
`;

  // Guardrails: fail the build rather than ship a page that breaks the ad-page contract.
  // Content assertions live in scripts/check-landing-pages.mjs (npm run check:lp).
  const bytes = Buffer.byteLength(html);
  const problems = [];
  if (bytes > MAX_BYTES) problems.push(`${bytes} bytes exceeds the ${MAX_BYTES} byte budget`);
  if (!html.includes('<meta name="robots" content="noindex,nofollow">')) problems.push('missing noindex');
  if (/\{\{[A-Z0-9_]+\}\}/.test(html)) problems.push('unreplaced {{placeholder}}');
  if (/<script[^>]+src=|<link[^>]+rel="stylesheet"|fonts\.googleapis/.test(html)) problems.push('external script/stylesheet/font');
  if (/<(video|iframe)\b/.test(html)) problems.push('video/iframe not allowed');
  if (problems.length) {
    console.error(`✖ /lp/${page.slug}: ${problems.join('; ')}`);
    process.exit(1);
  }

  const outDir = path.join(root, 'public', 'lp', page.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  console.log(`✅ public/lp/${page.slug}/index.html (${(bytes / 1024).toFixed(1)} KB)`);
}
