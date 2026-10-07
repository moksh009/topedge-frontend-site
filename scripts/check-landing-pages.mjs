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

// Markup-shape rules read the document with inline <script> and <style> bodies removed:
// JS and CSS source are not markup, and a tag name or an attribute selector inside them
// is not an element. `copy` goes further and strips tags, so a sentence still reads as
// one string after a word inside it is wrapped in a highlight span.
const markup = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '');
const copy = markup.replace(/<[^>]+>/g, '');
const countIn = (src, re) => (src.match(re) || []).length;

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
// The navbar and footer are ports of the site's own MarketingNavbar / MarketingFooter, so
// an ad visitor lands on something that looks like the rest of topedgeai.com. These assert
// the ported shell is present and that the footer still carries the details that make the
// company checkable: a real address, a phone, and the platform badges.
must(/<header[^>]*class="mkt-nav"/.test(html), 'missing the site navbar shell');
must(/class="mkt-nav__capsule"/.test(html), 'navbar is not the site capsule');
must(/<footer[^>]*class="mkt-foot"/.test(html), 'missing the site footer shell');
must(/Prahladnagar/.test(html), 'footer is missing the registered address');
must(/href="tel:\+\d{8,}"/.test(html), 'footer is missing a phone number');
must(count(/class="mkt-foot__col"/g) >= 3, 'footer is missing the sitemap columns');
must(/href="#how"[^>]*>How it works</.test(html), 'nav missing "How it works" anchor');
must(/Log in</.test(html), 'nav missing "Log in"');
must(/data-cta="trial"/.test(html), 'missing trial CTA');
must(/data-cta="shopify"[^>]*href="https:\/\/apps\.shopify\.com\/|href="https:\/\/apps\.shopify\.com\/[^"]*"[^>]*data-cta="shopify"/.test(html), 'Shopify CTA does not link to the App Store');
const h1 = ((markup.match(/<h1 id="hero-h1">([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, '');
must(/Stop paying three times for orders nobody wanted/.test(h1), 'default H1 is not the recommended headline');
must(h1.length <= 60, `H1 is ${h1.length} characters; over 60 wraps past two lines on desktop`);
must(/<mark class="chip" id="hero-mark">/.test(markup), 'the H1 payload is not highlighted like the site titles');
must(copy.includes('Built for Indian Shopify D2C brands'), 'page no longer says who it is for');
must(
  html.includes(`${TRIAL.days}-day free trial · ${TRIAL.orders} free order confirmations · No credit card · Live in about 15 minutes`),
  'hero microcopy does not match TRIAL',
);
for (const logo of ['choicesalon', 'delitech', 'apex']) {
  must(new RegExp(`src="/trust/${logo}-white\\.png"[^>]*alt="[^"]+"|alt="[^"]+"[^>]*src="/trust/${logo}-white\\.png"`).test(html), `trust logo ${logo} missing or has no alt`);
}
must(/role="img"[^>]*aria-label="[^"]*Confirm[^"]*Cancel/i.test(html), 'phone mockup needs an aria-label describing confirm and cancel');

// --- Problem and how it works ---
// The three costs are asserted by what they say, not by the markup they happen to sit
// in: they were three cards, they are now one line of arithmetic, and the claim that
// has to survive a redesign is that the page still names all three.
for (const cost of ['out', 'back', 'handling']) {
  must(new RegExp(`₹\\d+\\s*${cost}\\b`, 'i').test(html), `problem section no longer prices "${cost}"`);
}
must(/Illustrative/i.test(html), 'the cost arithmetic must be marked illustrative, not a customer result');
must(copy.includes('every parcel that leaves your warehouse is one the buyer actually wants'), 'missing problem closing line');
must(countIn(markup, /data-step="[123]"/g) === 3, 'expected 3 data-step items');
must(html.includes('nothing sends without your sign-off'), 'missing Meta-approval caption');

// --- Product showcase ---
// Screens from the real product, not icons. Each needs a described alt: these are the
// only images on the page carrying meaning, and the ad audience reads them before copy.
const shots = html.match(/<img class="shot"[^>]*>/g) || [];
must(shots.length >= 3, `expected at least 3 product screenshots, found ${shots.length}`);
for (const s of shots) {
  must(/\balt="[^"]{40,}"/.test(s), 'a product screenshot has no descriptive alt text');
  must(/\bloading="lazy"/.test(s), 'product screenshots must be lazy, they sit below the fold');
  must(/\bwidth="\d+"[^>]*\bheight="\d+"/.test(s), 'product screenshots need width/height so they reserve space');
}

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
// The switching section answers the objection this audience actually arrives with
// (markup on messages, a price that moves, metered runs). It must do that without
// naming anyone: the competitor-name rule above is the other half of this one.
must(count(/class="sw-them"/g) >= 3, 'the switching section needs at least 3 objections raised');
must(count(/class="sw-us"/g) === count(/class="sw-them"/g), 'every objection raised must be answered');

// --- Pricing ---
for (const p of FALLBACK_CATALOG.plans) {
  must(html.includes(p.monthlyPriceLabel), `${p.displayName}: monthly price ${p.monthlyPriceLabel} missing`);
  must(html.includes(p.pricing.yearly.effectiveMonthlyLabel), `${p.displayName}: yearly price missing`);
}
must(/Most popular/.test(html), 'Growth missing "Most popular"');
// COD to prepaid is gated by the catalog, and the card shows it locked when a plan
// lacks it. Read the state straight off each card rather than trusting the copy.
const card = (slug) => (markup.match(new RegExp(`<article class="mkt-plan mkt-plan--${slug}[\\s\\S]*?</article>`)) || [''])[0];
for (const p of FALLBACK_CATALOG.plans) {
  // Anchored to one <li>: a lazy match from the first item would run past it.
  const row = (card(p.slug).match(/<li([^>]*)>(?:(?!<\/li>)[\s\S])*?COD to prepaid/) || [])[1];
  must(row !== undefined, `${p.displayName}: card does not list COD to prepaid`);
  must(
    /is-locked/.test(row || '') === !p.features.journeyCodPrepaid,
    `${p.displayName}: COD to prepaid lock state disagrees with the catalog`,
  );
  must(new RegExp(`data-plan="${p.slug}"`).test(markup), `${p.displayName}: card has no CTA`);
}
must(/TopEdge adds 0% markup/.test(html), 'missing 0% markup line');

// --- FAQ ---
must(count(/<details name="faq"/g) === 6, 'expected 6 FAQ items (the plan lists six)');
must(count(/<details name="faq" open/g) === 1, 'expected exactly one FAQ open');

// --- Final CTA, sticky bar, tracking ---
must(copy.includes('Ship only the COD orders buyers confirm'), 'missing final CTA heading');
must(/id="sticky-cta"[^>]*>/.test(html), 'missing sticky mobile CTA');
must(count(/data-cta="trial"/g) >= 5, 'expected the trial CTA in nav, hero, pricing, final CTA and sticky bar');
must(/shopify_install_click/.test(html), 'missing Shopify click event');

if (failures.length) {
  console.error(`✖ landing page check failed (${failures.length}):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('✅ landing page check passed');
