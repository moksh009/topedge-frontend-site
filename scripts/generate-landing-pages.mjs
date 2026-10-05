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

const { FALLBACK_CATALOG } = await loadBillingCatalog();
const plans = FALLBACK_CATALOG.plans;
const byslug = Object.fromEntries(plans.map((p) => [p.slug, p]));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function yearly(p) {
  return p.pricing.yearly?.effectiveMonthlyLabel ?? p.monthlyPriceLabel;
}

function planCards() {
  return plans
    .map((p) => {
      const items = ['Basic COD confirmation'];
      if (p.features.journeyCodPrepaid) items.push('COD to prepaid payment links');
      return `      <div class="card plan${p.emphasis ? ' em' : ''}">
        <h3>${esc(p.displayName)}</h3>
        <p class="price">${esc(p.monthlyPriceLabel)} <small>/ month + 18% GST</small></p>
        <p class="yearly">${esc(yearly(p))} / month if billed yearly</p>
        <ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      </div>`;
    })
    .join('\n');
}

const prepaidPlans = plans.filter((p) => p.features.journeyCodPrepaid).map((p) => p.displayName);
const prepaidText = prepaidPlans.join(' and ');
const launch = byslug.launch;

const FAQS = [
  {
    q: 'How much does it cost?',
    a: `Plans start at ${launch.monthlyPriceLabel} a month + 18% GST, or ${yearly(launch)} a month if billed yearly. Meta charges its own per-message WhatsApp fees directly on your Meta account, and TopEdge adds 0% markup.`,
  },
  {
    q: 'What happens if the customer does not reply?',
    a: 'You decide. Send one follow-up, then hold the order, call the buyer or dispatch anyway, as per the rule you set in your flow.',
  },
  {
    q: 'Do WhatsApp templates need Meta approval?',
    a: 'Yes. Every message template must be approved by Meta before it can send, and TopEdge will not send a template that is not approved yet.',
  },
  {
    q: 'Which plan has COD to prepaid?',
    a: `${prepaidText} only. It sends a WhatsApp payment link created from a Shopify draft invoice. ${launch.displayName} includes basic COD confirmation.`,
  },
];

const faqHtml = FAQS.map((f) => `    <details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n');

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

for (const page of PAGES) {
  const body = fs
    .readFileSync(path.join(lpDir, `${page.slug}.body.html`), 'utf8')
    .replace('{{PLAN_CARDS}}', planCards())
    .replace('{{FAQS}}', faqHtml)
    .replaceAll('{{SLUG}}', page.slug);

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
${attribution.replaceAll('{{SLUG}}', page.slug)}
</script>
</body>
</html>
`;

  // Guardrails: fail the build rather than ship a page that breaks the ad-page contract.
  const bytes = Buffer.byteLength(html);
  const problems = [];
  if (bytes > MAX_BYTES) problems.push(`${bytes} bytes exceeds the ${MAX_BYTES} byte budget`);
  if (!html.includes('<meta name="robots" content="noindex,nofollow">')) problems.push('missing noindex');
  if (/\{\{[A-Z_]+\}\}/.test(html)) problems.push('unreplaced {{placeholder}}');
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
