/**
 * Asserts the generated ad page (public/lp/shopify-whatsapp/index.html).
 *
 * This page is bought by the click. Every rule below exists because something
 * on it either costs money when it breaks or misleads a reader when it drifts,
 * and because none of it would fail any other check in the repo.
 *
 * Three themes run through it. Honesty: no number appears that is not sourced
 * or labelled illustrative, and no rating is shown at a sample size where the
 * number misleads. Message match: five ad variants arrive on this page and the
 * first two blocks must both answer the ad that sent them. Leakage: a paid
 * landing page may not hand the click back to the open web.
 *
 * Run after `npm run lp`. Exits 1 and lists every failure.
 *
 * Usage: node scripts/check-landing-pages.mjs
 */
import { build as esbuild } from 'esbuild';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadBillingCatalog } from './load-billing-catalog.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, '..', 'public', 'lp', 'shopify-whatsapp', 'index.html');
const html = fs.readFileSync(file, 'utf8');
const { FALLBACK_CATALOG, TRIAL } = await loadBillingCatalog();

const failures = [];
const must = (ok, msg) => {
  if (!ok) failures.push(msg);
};
const count = (re) => (html.match(re) || []).length;

// Markup-shape rules read the document with inline <script> and <style> bodies
// removed: JS and CSS source are not markup, and a tag name or an attribute
// selector inside them is not an element. `copy` goes further and strips tags,
// so a sentence still reads as one string after a word inside it is wrapped in
// a highlight span.
const markup = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '');
const copy = markup.replace(/<[^>]+>/g, '');

// String.search returns -1 for a pattern that is not there, which would make
// every "A comes before B" comparison pass for a section that was deleted.
// Fail on the missing section instead, and let the comparison mean what it says.
const at = (re) => {
  const i = markup.search(re);
  must(i !== -1, `section missing: ${re}`);
  return i === -1 ? Infinity : i;
};

// Em dashes are banned in our copy, but verbatim reviews are quoted as written.
const withoutQuotes = markup.replace(/<blockquote[\s\S]*?<\/blockquote>/g, '');

// --- Page contract ---
must(Buffer.byteLength(html) <= 88 * 1024, 'exceeds the 88 KB budget');
must(html.includes('<meta name="robots" content="noindex,nofollow">'), 'missing noindex');
must(!/\{\{[A-Z0-9_]+\}\}/.test(html), 'unreplaced {{placeholder}}');
must(!/<script[^>]+src=|<link[^>]+rel="stylesheet"|fonts\.googleapis/.test(html), 'external script/stylesheet/font');
must(!/<iframe\b/.test(markup), 'iframe present');
must(!withoutQuotes.replace(/<[^>]+>/g, '').includes('—'), 'em dash outside a verbatim quote');
for (const name of ['WATI', 'AiSensy', 'Interakt', 'Releasit', 'EasySell', 'Dondy', 'KwikEngage', 'WASP', 'Zoko', 'BiteSpeed']) {
  must(!new RegExp(`\\b${name}\\b`, 'i').test(html), `names competitor ${name}`);
}
// No shouting. The navbar capsule is the one exception the site itself sets.
const upper = (html.match(/[^{}]+\{[^}]*text-transform:uppercase[^}]*\}/g) || []).filter(
  (r) => !/mkt-foot__capsule/.test(r),
);
must(upper.length === 0, `uppercase is back on: ${upper.map((r) => r.split('{')[0]).join(', ')}`);

// --- The film ---
// The first screen is the product moving. It carries no autoplay attribute and
// no src: page.js attaches one source and calls play() on intersection, so
// nothing downloads before first paint and reduced motion leaves it on its poster.
const videos = markup.match(/<video\b[^>]*>/g) || [];
must(videos.length === 1, `expected exactly 1 <video>, found ${videos.length}`);
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
must(/film\.play\(\)/.test(html), 'nothing starts the hero film; it would sit on its poster');
must(/\.film\{[^}]*max-height:/.test(html), 'the hero film has no max-height, so it can push the buttons off the first screen');
must(!/\.film\{[^}]*box-shadow:/.test(html), 'the film has a drop shadow again; the owner asked for it flat');

// --- Nav and hero ---
must(/<header[^>]*class="mkt-nav"/.test(html), 'missing the site navbar shell');
must(/<footer[^>]*class="mkt-foot"/.test(html), 'missing the site footer shell');
must(/Prahladnagar/.test(html), 'footer is missing the registered address');
must(/href="tel:\+\d{8,}"/.test(html), 'footer is missing a phone number');
// A paid landing page does not hand the click back to the open web. Every nav
// link is an in-page anchor; the only ways off are login and the signup CTA.
const navBlock = (markup.match(/<nav class="mkt-nav__desktop"[\s\S]*?<\/nav>/) || [''])[0];
must(navBlock !== '', 'the nav is gone');
for (const href of navBlock.match(/href="([^"]+)"/g) || []) {
  must(href.startsWith('href="#'), `nav link ${href} leaves the page; on /lp/* these are anchors`);
}
for (const anchor of ['#compare', '#platform', '#pricing', '#faq']) {
  must(navBlock.includes(`href="${anchor}"`), `nav is missing the ${anchor} anchor`);
  must(at(new RegExp(`id="${anchor.slice(1)}"`)) !== Infinity, `nav points at ${anchor}, which is not on the page`);
}
must(/Log in</.test(html), 'nav missing "Log in"');

const heroBlock = (markup.match(/<header class="hero"[\s\S]*?<\/header>/) || [''])[0];
must(heroBlock !== '', 'the hero header is gone');
must(/<video\b/.test(heroBlock), 'the hero has no film; the first screen is meant to be the product moving');
must(/min-height:100svh/.test(html), 'the hero is no longer a full viewport');
// One button above the fold. The App Store is still offered, on the mobile bar.
const heroCtas = heroBlock.match(/data-cta="[a-z]+"/g) || [];
must(heroCtas.length === 1 && heroCtas[0] === 'data-cta="trial"', `the hero should offer one button, the trial; found ${heroCtas.join(', ') || 'none'}`);
const bar = (markup.match(/<div class="sticky"[\s\S]*?<\/div>/) || [''])[0];
must(/data-cta="trial"/.test(bar) && /data-cta="shopify"/.test(bar), 'the mobile bar should carry both the trial and the App Store');
must(/data-cta="shopify"[^>]*href="https:\/\/apps\.shopify\.com\//.test(markup), 'the Shopify CTA does not link to the App Store');

const h1 = ((markup.match(/<h1 id="hero-h1">([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, '');
must(/Your Shopify store, running on WhatsApp/.test(h1), 'default H1 no longer sells the platform');
must(h1.length <= 60, `H1 is ${h1.length} characters; over 60 wraps past two lines on desktop`);
must(/<mark class="chip" id="hero-mark">/.test(markup), 'the H1 payload is not highlighted like the site titles');
must(copy.includes('Built for Indian Shopify D2C brands'), 'page no longer says who it is for');

// Price above the fold. The whole bid strategy is pre-qualification: a visitor
// who will not pay ₹1,599 should bounce before they cost any attention, and a
// visitor who will should not have to scroll six sections to find out.
const launchYearly = FALLBACK_CATALOG.plans[0].pricing.yearly.effectiveMonthlyLabel;
must(
  markup.includes(`From <b>${launchYearly}/month</b>, billed yearly &middot; ${TRIAL.days}-day free trial &middot; No credit card`),
  'the hero no longer states the price, the trial and the no-card terms',
);
must(at(/class="hero-price"/) < at(/class="hero-quote"/), 'the price belongs above the quote');

// --- No invented or misleading rating ---
// A numeric average is reassuring at a large sample and damaging at a small
// one: "4.0 from 5 reviews" tells a reader that almost nobody uses this and
// that even those few were not all happy, and it does that above the fold
// before a single quote is read. One named person saying one specific thing
// does the job the average cannot at this size.
must(!/★/.test(copy), 'uses a typographic star');
must(!/class="st"|class="hp-stars"/.test(markup), 'a star row is back; do not show an average at this sample size');
must(!/\b[0-5]\.\d\b(?!\d)/.test(withoutQuotes.replace(/<[^>]+>/g, '')), 'states a numeric rating; none may appear while the review count is small');
const quote = (markup.match(/<figure class="hero-quote">[\s\S]*?<\/figure>/) || [''])[0];
must(quote !== '', 'the hero has no named quote');
must(/US Grade software quality/.test(quote), 'the hero quote is not the one that answers the Indian-SaaS objection');
must(/Tirth P\./.test(quote), 'the hero quote is not attributed to a named person');
must(/trustpilot\.com\/review\/topedgeai\.com/.test(quote), 'the hero quote does not link to where it was published');
must(!/[❤♥💖]|&#10084;/.test(markup), 'an emoji is back in the trust copy');
must(!/class="hp-faces"/.test(markup), 'the avatar row is back; it reads as "we have no logos"');

// --- The band under the hero ---
// Three marks a merchant can verify in one search, in place of four customer
// logos that are a salon, a clinic and two non-D2C brands.
const strip = (markup.match(/<ul class="trust-marks[^"]*">[\s\S]*?<\/ul>/) || [''])[0];
must(strip !== '', 'the band under the hero is gone');
must((strip.match(/<img /g) || []).length === 3, 'expected the three platform marks in the band');
for (const img of strip.match(/<img [^>]*>/g) || []) {
  must(/\balt="[^"]{8,}"/.test(img), 'a platform mark in the band has no alt text');
}
must(!/\/trust\/[a-z]+-white\.png/.test(markup), 'the customer logo marquee is back; bring it back when four of them are D2C brands');
must(!/class="mq"|animation:mq /.test(html), 'the logo marquee is back');

// --- Message match ---
// The hero already swapped per ad group; the block under it did not, so an RTO
// click read an RTO headline and then a cart statistic one scroll later. Both
// swap now, off the same key, and the CSS does it so the right block is painted
// rather than replaced after paint.
const variants = ['platform', 'cod', 'rto', 'cart', 'switch'];
const heroJson = (html.match(/var V=(\{.*?\});var c=/) || [])[1] || '';
for (const v of variants) {
  must(heroJson.includes(`"${v}":`), `the hero has no headline for the ${v} ad group`);
  must(new RegExp(`<div class="pf" data-pf="${v}">`).test(markup), `the proof block has no version for the ${v} ad group`);
}
must(count(/<div class="pf" data-pf=/g) === variants.length, 'the proof block count does not match the variant count');
must(/document\.documentElement\.setAttribute\('data-v'/.test(html), 'nothing records which variant won, so the proof block cannot follow the hero');
for (const v of variants.filter((x) => x !== 'platform')) {
  must(new RegExp(`html\\[data-v="${v}"\\] \\.pf\\[data-pf="${v}"\\]\\{display:grid\\}`).test(html), `no rule shows the ${v} proof block`);
}
must(/\.pf\[data-pf="platform"\]\{display:grid\}/.test(html), 'with no variant and with JS off, nothing is shown under the hero');
// Every figure in the proof blocks is sourced on the spot or labelled.
const pfBlocks = markup.match(/<div class="pf" data-pf="[a-z]+">[\s\S]*?<\/div>\s*<\/div>/g) || [];
for (const b of pfBlocks) {
  const stat = (b.match(/<b>([^<]+)<\/b>/) || [])[1] || '';
  const hasNumber = /\d/.test(stat);
  must(!hasNumber || /class="pf-src"/.test(b), `a proof block states ${stat} with no source line under it`);
}
must(/Baymard Institute/.test(copy), 'the cart statistic lost its source');
must(/Unicommerce\/Shipway/.test(copy), 'the RTO statistic lost its source');
must(/Illustrative courier rates/.test(copy), 'the courier arithmetic is no longer labelled illustrative');

// --- The comparison, promoted and inverted ---
// It is the clearest, most decision-relevant thing on the page, so it runs
// second, and it runs on a dark band: one inverted section gives the eye a
// rest on a long page and marks this as the part to read.
const rows = markup.match(/<div class="cmp-row">[\s\S]*?<\/div>/g) || [];
must(rows.length === 4, `expected 4 comparison rows, found ${rows.length}`);
for (const r of rows) {
  must(/class="cmp-t"/.test(r) && /class="cmp-x"/.test(r) && /class="cmp-v"/.test(r), 'a comparison row is missing one of its three cells');
}
must(/<section class="dark" id="compare">/.test(markup), 'the comparison is no longer the inverted band');
must(/\.dark\{background:/.test(html), 'the dark band has no background');
for (const h of ['TopEdge adds 0% markup', 'Unlimited flow runs', 'One profile, even with three phone numbers', 'A payment link in the same thread']) {
  must(((markup.match(/<div class="cmp"[\s\S]*?<\/section>/) || [''])[0]).includes(h), `the comparison no longer makes the claim: ${h}`);
}
// The migration offer is the whole argument for switch traffic and noise for
// everyone else, so it is shown by the same variant attribute.
must(/class="mig" id="mig"/.test(markup), 'the migration block is gone');
must(/html\[data-v="switch"\] \.mig\{display:block\}/.test(html), 'the migration block is not gated on the switch variant');
must(/\.mig\{[^}]*display:none/.test(html), 'the migration block shows on every variant');

// --- Entry points, platform panels, setup ---
const paths = markup.match(/<article class="path"[\s\S]*?<\/article>/g) || [];
must(paths.length === 3, `expected 3 entry-point cards, found ${paths.length}`);
must(paths.filter((c) => /class="orb orb--/.test(c)).length === 3, 'an entry-point card lost the orb behind its artwork');
for (const c of paths) {
  must(/<h3>/.test(c), 'an entry-point card has no heading');
  // A real destination is an in-page anchor or the dashboard signup. The trial
  // CTAs skip the www /signup route, which existed only to redirect and cost
  // ~758 KB to do it, so an absolute dashboard URL is legitimate here.
  must(
    /<a class="go[^"]*" [^>]*href="(#[a-z]+|https:\/\/dash\.topedgeai\.com\/[^"]*)"/.test(c),
    'an entry-point card leaves the page; on /lp/* these go to the dashboard signup or an anchor',
  );
}
must(/class="go go--solid"/.test(markup), 'none of the three entry points is the primary one');
must(/role="img"[^>]*aria-label="[^"]*Confirm[^"]*Cancel/i.test(html), 'the example thread needs an aria-label describing confirm and cancel');

const bx = markup.match(/<article class="bx bx--[wn]"[\s\S]*?<\/article>/g) || [];
must(bx.length === 5, `expected 5 platform panels, found ${bx.length}`);
must(count(/class="bx bx--w"/g) === 2, 'the bento is no longer asymmetric: expected 2 wide panels');
for (const b of bx) {
  must(/class="viz/.test(b), 'a platform panel has no illustration');
  // No raster image: a screenshot is the thing these replaced. An inline <svg>
  // path is as drawn as a border-radius and weighs less.
  must(!/<img\b/.test(b), 'a platform panel ships an image; these are drawn, not photographed');
}
must(bx.filter((b) => /class="orb orb--/.test(b)).length === 5, 'a platform panel lost the orb behind its composition');
for (const cls of ['pane--wa', 'pane--ask', 'pane--aud']) {
  must(markup.includes(cls), `the floating card ${cls} is gone; the panel is flat again`);
}
must(/\.pane--hero\{width:[0-9]+%/.test(html), 'the recovery subject is full width again; the floating reminder will cover its figures');
must(/\.pane--ord\{width:[0-9]+%/.test(html), 'the order subject is full width again; the floating reply will cover its price');
must(/Recovered this month <i>sample<\/i>/.test(markup), 'the money figure in the recovery panel is not marked as sample data');
must(!/class="shotc"|lp\/shots\//.test(markup), 'a dashboard screenshot is back; every illustration on this page is drawn');
must(!/\.alt\{[^}]*linear-gradient/.test(html), 'a section has a gradient background again; only the hero has one');
for (const job of ['carts that leave', 'Confirm COD before you ship', 'Broadcast', 'every step before the sale', 'Flows you build']) {
  must(copy.includes(job), `the platform section no longer names: ${job}`);
}
must(count(/<li class="stp"/g) === 3, 'expected 3 going-live steps');
must(copy.includes('Most stores send their first message the same day'), 'the setup section no longer says how fast this is');
must(html.includes('nothing sends without your sign-off'), 'missing the Meta-approval line');

// --- Proof ---
const quotes = [
  ["The overall software experience is good — it's Indian software but feels like US Grade software quality.", 'Tirth P.'],
  ['Topedge helped me a lot to solve issues with my ecomm business like abandoned cart followups, complete tracing of what a lead did and where it dropped off. Their support team is very helpful.', 'Shubham P.'],
  ["In 2 days they built me everything... I'm on their ₹1,999 base plan, and mostly every feature is unlocked on every plan.", 'Robin'],
];
const quoteCards = markup.match(/<blockquote[\s\S]*?<\/blockquote>/g) || [];
for (const [text, author] of quotes) {
  must(html.includes(text) || html.includes(text.replace(/^The overall software experience is good — i/, 'I')), `quote not verbatim: ${author}`);
}
for (const [, author] of quotes) {
  must(markup.includes(author), `quote missing its author: ${author}`);
}
must(quoteCards.length >= 4, 'expected the hero quote plus the three review cards');
must(html.includes('retrieved 6 October 2026'), 'the reviews lost their retrieval date, which is the thing that makes them checkable');
must(html.includes('Launched on the Shopify App Store'), 'missing launch line');

// --- Pricing ---
for (const p of FALLBACK_CATALOG.plans) {
  must(html.includes(p.monthlyPriceLabel), `${p.displayName}: monthly price ${p.monthlyPriceLabel} missing`);
  must(html.includes(p.pricing.yearly.effectiveMonthlyLabel), `${p.displayName}: yearly price missing`);
  // Annual is the only cycle where a click at this CPC clears, so the saving is
  // stated as a rupee figure rather than left for the reader to work out.
  must(html.includes(`${p.pricing.yearly.billedLabel} billed once a year`), `${p.displayName}: the one-off yearly amount is not stated`);
  must(html.includes(`save ${p.pricing.yearly.saveLabel}`), `${p.displayName}: the yearly saving is not stated as a rupee figure`);
}
must(/<div class="plans" id="plans" data-cycle="yearly">/.test(markup), 'the billing toggle no longer defaults to yearly');
must(/Most popular/.test(html), 'Growth missing "Most popular"');
const card = (slug) => (markup.match(new RegExp(`<article class="mkt-plan mkt-plan--${slug}[\\s\\S]*?</article>`)) || [''])[0];
for (const p of FALLBACK_CATALOG.plans) {
  const row = (card(p.slug).match(/<li([^>]*)>(?:(?!<\/li>)[\s\S])*?COD to prepaid/) || [])[1];
  must(row !== undefined, `${p.displayName}: card does not list COD to prepaid`);
  must(
    /is-locked/.test(row || '') === !p.features.journeyCodPrepaid,
    `${p.displayName}: COD to prepaid lock state disagrees with the catalog`,
  );
  // The COD and RTO ad groups promise COD-to-prepaid. A plan that does not
  // include it has to say so on the card, or the cheapest plan silently fails
  // the promise the ad made.
  must(
    p.features.journeyCodPrepaid || /COD to prepaid is on Growth and above/.test(card(p.slug)),
    `${p.displayName} lacks COD to prepaid and does not say so on the card`,
  );
  must(new RegExp(`data-plan="${p.slug}"`).test(markup), `${p.displayName}: card has no CTA`);
}
must(/TopEdge adds 0% markup/.test(html), 'missing 0% markup line');
must(
  html.includes(`${TRIAL.days}-day free trial on every plan. ${TRIAL.orders} free order confirmations, no credit card.`),
  'the trial terms are gone, or no longer match TRIAL',
);

// --- The FAQ ---
// The seven questions a merchant has at eleven at night. They were previously
// pushed into a WhatsApp thread nobody opens at that hour.
const faqs = markup.match(/<details class="fq"[^>]*>[\s\S]*?<\/details>/g) || [];
must(faqs.length === 7, `expected 7 FAQ items, found ${faqs.length}`);
for (const f of faqs) {
  must(/<summary>/.test(f) && /<p>/.test(f), 'an FAQ item is missing its question or its answer');
  must(!/\bopen\b/.test(f.slice(0, f.indexOf('>'))), 'an FAQ item ships open; the list is closed by default');
}
const faqCopy = faqs.join(' ');
for (const [topic, needle] of [
  ['number bans', 'official WhatsApp Cloud API'],
  ['what Meta charges', 'Meta bills your own Business account directly'],
  ['who owns the account', 'Your number, your templates, your quality rating'],
  ['setup time', 'about fifteen minutes'],
  ['migration', 'rebuild it here before you cancel'],
  ['the order limit', 'Nothing switches off mid-month'],
  ['GST', 'GSTIN'],
]) {
  must(faqCopy.includes(needle), `the FAQ does not answer ${topic}`);
}
const wa = (markup.match(/<a[^>]*data-cta="whatsapp"[^>]*>/) || [''])[0];
must(/href="https:\/\/wa\.me\/\d{8,}\?text=\S+"/.test(wa), 'the WhatsApp fallback must open the company number with a prefilled message');
must(/target="_blank"/.test(wa) && /rel="noopener"/.test(wa), 'the WhatsApp link must open safely in a new tab');

// --- Leakage ---
// At this CPC, every outbound link that is not the signup is money handed back.
must(!/<section[^>]*id="read"/.test(markup), 'the blog section is back; on /lp/* it is four paid-click exits placed after pricing');
must(!/href="\/blog/.test(markup), 'a blog link is back on the ad page');
// Anchors only. The favicon and the film's download fallback are not exits,
// and the footer's legal pages and the signup and login paths are the point.
const allowed = ['/signup', '/login', '/privacy', '/terms', '/favicon', '/marketing/demos/'];
const outbound = [...markup.matchAll(/<a [^>]*href="(\/[^"#][^"]*)"/g)]
  .map((m) => m[1])
  .filter((h) => h !== '/' && !allowed.some((a) => h.startsWith(a)));
must(outbound.length === 0, `these links leave the ad page for the marketing site: ${[...new Set(outbound)].join(', ')}`);

// --- Section order ---
must(at(/<section id="proof">/) < at(/<section class="dark" id="compare">/), 'the variant proof block belongs directly under the hero');
must(at(/<section class="dark" id="compare">/) < at(/<section id="start">/), 'the comparison belongs before the entry points');
must(at(/<section[^>]*id="platform"/) < at(/<section id="setup">/), 'the platform section belongs before the setup steps');
must(at(/<section[^>]*id="pricing"/) < at(/<section[^>]*id="faq"/), 'the FAQ belongs after the price, where the hesitation is');
must(at(/<ul class="trust-marks/) < at(/<section id="proof">/), 'the platform marks belong under the hero');

// --- Sticky CTAs and tracking ---
must(/id="sticky-cta"/.test(html), 'missing the mobile CTA bar');
must(/id="topbar"/.test(html), 'missing the slim header CTA that follows the scroll');
must(count(/data-cta="trial"/g) >= 8, 'expected the trial CTA in nav, hero, an entry card, the three plan cards, pricing, the sticky bar and the top bar');
must(/shopify_install_click/.test(html), 'missing Shopify click event');
// The attribution script is what makes a click measurable at all.
for (const key of ['gclid', 'gbraid', 'wbraid', 'utm_content', 'te_attr']) {
  must(html.includes(key), `the attribution script no longer captures ${key}`);
}
must(/u\+='&plan='/.test(html), 'the plan is no longer carried into signup');
// The page opens on Yearly. A visitor who reads a yearly price, picks a plan
// and lands on a form defaulting to monthly has been quoted one number and
// shown another, and yearly is the only cycle that pays for the click.
must(/u\+='&cycle='/.test(html), 'the billing cycle is no longer carried into signup');
must(/dash\.topedgeai\.com\/signup/.test(html), 'the trial CTAs no longer go straight to the dashboard');

if (failures.length) {
  console.error(`✖ landing page check failed (${failures.length}):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('✅ landing page check passed');
