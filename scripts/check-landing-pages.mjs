/**
 * Asserts the generated ad page (public/lp/cod-confirmation/index.html) against
 * docs/superpowers/specs/2026-10-06-cod-landing-page-design.md.
 *
 * Run after `npm run lp`. Exits 1 and lists every failure.
 *
 * Usage: node scripts/check-landing-pages.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBillingCatalog } from './load-billing-catalog.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, '..', 'public', 'lp', 'cod-confirmation', 'index.html');
const html = fs.readFileSync(file, 'utf8');
const { FALLBACK_CATALOG, TRIAL } = await loadBillingCatalog();

const failures = [];
const must = (ok, msg) => {
  if (!ok) failures.push(msg);
};
const count = (re) => (html.match(re) || []).length;

// Markup-shape rules read the document with inline <script> bodies removed: JS
// source is not markup, and a tag name inside a comment or string is not an element.
const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');

// Em dashes are banned in our copy, but verbatim reviews are quoted exactly as written.
const withoutQuotes = html.replace(/<blockquote[\s\S]*?<\/blockquote>/g, '');

// --- Page contract ---
must(Buffer.byteLength(html) <= 60 * 1024, 'exceeds the 60 KB budget');
must(html.includes('<meta name="robots" content="noindex,nofollow">'), 'missing noindex');
must(!/\{\{[A-Z0-9_]+\}\}/.test(html), 'unreplaced {{placeholder}}');
must(!/<script[^>]+src=|<link[^>]+rel="stylesheet"|fonts\.googleapis/.test(html), 'external script/stylesheet/font');
must(!/<iframe\b/.test(markup), 'iframe present');
// The hero film was out of scope in revision 2 of the spec and the contract
// banned <video> outright. The owner pulled it into scope on 2026-10-07. The
// ban is replaced by the constraints that actually protect first paint rather
// than removed: a video may exist, but it must not cost anything before a
// deliberate press of play, and it must not autoplay or carry sound on its own.
const videos = markup.match(/<video\b[^>]*>/g) || [];
must(videos.length <= 1, `expected at most 1 <video>, found ${videos.length}`);
for (const v of videos) {
  must(/\bpreload="none"/.test(v), '<video> must set preload="none" so it costs nothing until play');
  must(/\bposter="\/[^"]+"/.test(v), '<video> must have a poster so the hero still paints instantly');
  must(/\bplaysinline\b/.test(v), '<video> must be playsinline so iOS does not take over the screen');
  must(/\bcontrols\b/.test(v), '<video> must expose controls');
  must(!/\bautoplay\b/.test(v), '<video> must not autoplay');
  must(!/\bsrc="/.test(v), '<video> must not hardcode src; page.js picks one source from data-lg/data-sm');
  must(/\baria-label="[^"]{20,}"/.test(v), '<video> needs an aria-label describing the film');
}
must(!/<source\b/.test(markup), 'use data-lg/data-sm + page.js, not a source element (media= is ignored inside video)');
must(!withoutQuotes.includes('—'), 'em dash outside a verbatim quote');
for (const name of ['WATI', 'AiSensy', 'Interakt', 'Releasit', 'EasySell', 'Dondy', 'KwikEngage', 'WASP', 'Zoko']) {
  must(!new RegExp(`\\b${name}\\b`, 'i').test(html), `names competitor ${name}`);
}
must(!/★|\b[45]\.0\b/.test(withoutQuotes.replace(/<style>[\s\S]*?<\/style>/, '')), 'states a star rating or score');

// --- Nav and hero ---
must(/<nav[^>]*class="[^"]*\bnav\b/.test(html), 'missing nav');
must(/href="#how"[^>]*>How it works</.test(html), 'nav missing "How it works" anchor');
must(/Log in</.test(html), 'nav missing "Log in"');
must(/data-cta="trial"/.test(html), 'missing trial CTA');
must(/data-cta="shopify"[^>]*href="https:\/\/apps\.shopify\.com\/|href="https:\/\/apps\.shopify\.com\/[^"]*"[^>]*data-cta="shopify"/.test(html), 'Shopify CTA does not link to the App Store');
const h1 = (html.match(/<h1 id="hero-h1">([\s\S]*?)<\/h1>/) || [])[1] || '';
must(/Stop Paying Three Times for Orders Your Customers Never Wanted/.test(h1), 'default H1 is not the recommended headline');
must(html.includes('Built for Indian Shopify D2C brands'), 'missing hero eyebrow');
must(
  html.includes(`${TRIAL.days}-day free trial · ${TRIAL.orders} free order confirmations · No credit card · Live in about 15 minutes`),
  'hero microcopy does not match TRIAL',
);
for (const logo of ['choicesalon', 'delitech', 'apex']) {
  must(new RegExp(`src="/trust/${logo}-white\\.png"[^>]*alt="[^"]+"|alt="[^"]+"[^>]*src="/trust/${logo}-white\\.png"`).test(html), `trust logo ${logo} missing or has no alt`);
}
must(/role="img"[^>]*aria-label="[^"]*Confirm[^"]*Cancel/i.test(html), 'phone mockup needs an aria-label describing confirm and cancel');

// --- Problem and how it works ---
must(count(/class="card cost"/g) === 3, 'expected 3 cost cards');
must(html.includes('so every parcel that leaves your warehouse is one the buyer actually wants'), 'missing problem closing line');
must(count(/data-step="[123]"/g) === 3, 'expected 3 data-step items');
must(html.includes('nothing sends without your sign-off'), 'missing Meta-approval caption');

// --- Proof and why ---
const quotes = [
  ["The overall software experience is good — it's Indian software but feels like US Grade software quality.", 'Tirth P.'],
  ['Topedge helped me a lot to solve issues with my ecomm business like abandoned cart followups, complete tracing of what a lead did and where it dropped off. Their support team is very helpful.', 'Shubham P.'],
  ["In 2 days they built me everything... I'm on their ₹1,999 base plan, and mostly every feature is unlocked on every plan.", 'Robin'],
];
for (const [text, author] of quotes) {
  must(html.includes(text), `quote not verbatim: ${author}`);
  must(new RegExp(`${author.replace('.', '\\.')}[^<]*<[^>]*>?[^<]*Trustpilot|${author.replace('.', '\\.')}[\\s\\S]{0,80}Trustpilot`).test(html), `quote missing Trustpilot attribution: ${author}`);
}
must(html.includes('trustpilot.com/review/topedgeai.com'), 'missing Trustpilot link');
must(html.includes('Launched on the Shopify App Store'), 'missing launch line');
for (const h of ['You pay Meta. Not us, on top of Meta.', 'One buyer, one profile', 'Turn hesitant COD buyers into paid-upfront customers.', 'Automate as much as you need']) {
  must(html.includes(h), `missing why-card: ${h}`);
}

// --- Pricing ---
for (const p of FALLBACK_CATALOG.plans) {
  must(html.includes(p.monthlyPriceLabel), `${p.displayName}: monthly price ${p.monthlyPriceLabel} missing`);
  must(html.includes(p.pricing.yearly.effectiveMonthlyLabel), `${p.displayName}: yearly price missing`);
}
must(/Most popular/.test(html), 'Growth missing "Most popular"');
const card = (name) => (html.match(new RegExp(`<div class="card plan[^"]*"[^>]*>\\s*<h3>${name}</h3>[\\s\\S]*?</div>`)) || [''])[0];
must(!/payment links/i.test(card('Launch')), 'Launch card must not offer payment links');
must(/payment links/i.test(card('Growth')) && /payment links/i.test(card('Scale')), 'Growth and Scale must offer payment links');
must(/TopEdge adds 0% markup/.test(html), 'missing 0% markup line');

// --- FAQ ---
must(count(/<details name="faq"/g) === 6, 'expected 6 FAQ items (the plan lists six)');
must(count(/<details name="faq" open/g) === 1, 'expected exactly one FAQ open');

// --- Final CTA, sticky bar, tracking ---
must(html.includes('Ship only the COD orders buyers confirm'), 'missing final CTA heading');
must(/id="sticky-cta"[^>]*>/.test(html), 'missing sticky mobile CTA');
must(count(/data-cta="trial"/g) >= 5, 'expected the trial CTA in nav, hero, pricing, final CTA and sticky bar');
must(/shopify_install_click/.test(html), 'missing Shopify click event');

if (failures.length) {
  console.error(`✖ landing page check failed (${failures.length}):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('✅ landing page check passed');
