/**
 * Asserts the generated ad page (public/lp/shopify-whatsapp/index.html).
 *
 * The page was redrawn on 2026-10-09 to sell the platform rather than one
 * feature, so the assertions that pinned the old COD argument in place are
 * gone and the ones that protect what the page is paid to do are kept: it
 * paints with no external request, it never names a competitor, it never
 * invents a rating, its prices come from the catalog, and the claims a
 * redesign could quietly drop are still on the page. New rules guard the
 * things the owner asked for by name, which a future edit would otherwise
 * undo without anyone noticing: no film above the fold, illustrations drawn
 * in CSS rather than shipped as screenshots, a marked phrase in every
 * heading, and blog cards that point at posts that exist.
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

// The rating assertions compare the page against the generator's TRUSTPILOT
// block rather than against a number typed in here, so there is one place a
// refreshed score has to be edited and the check follows it.
const genSrc = fs.readFileSync(path.join(__dirname, 'generate-landing-pages.mjs'), 'utf8');
const trustpilot = (key) => (genSrc.match(new RegExp(`^  ${key}: '([^']*)',`, 'm')) || [])[1];
const TRUSTPILOT_SCORE = trustpilot('score');
const TRUSTPILOT_REVIEWS = trustpilot('reviews');

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

// String.search returns -1 for a pattern that is not there, which would make
// every "A comes before B" comparison pass for a section that was deleted. Fail
// on the missing section instead, and let the comparison mean what it says.
const at = (re) => {
  const i = markup.search(re);
  must(i !== -1, `section missing: ${re}`);
  return i === -1 ? Infinity : i;
};

// Em dashes are banned in our copy, but verbatim reviews are quoted exactly as written.
const withoutQuotes = html.replace(/<blockquote[\s\S]*?<\/blockquote>/g, '');

// --- Page contract ---
must(Buffer.byteLength(html) <= 88 * 1024, 'exceeds the 88 KB budget');
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
// A rating used to be banned outright, because the only one available would
// have been invented. The owner read the live TrustScore off Trustpilot on
// 10 Oct and it is in the generator, so the rule flips from "no score" to "no
// score but that one": any x.y on the page must be the sourced number, and it
// must be the one the generator holds, so a stale page fails here rather than
// quietly overstating. The typographic star stays banned; stars are drawn.
// Read the words only: `markup` already has the inline script and stylesheet
// out (a CSS length like 2.7rem is not a rating), blockquotes come out because
// a verbatim review is quoted as written, and the tags come out last.
const prose = markup.replace(/<blockquote[\s\S]*?<\/blockquote>/g, '').replace(/<[^>]+>/g, '');
must(!/★/.test(prose), 'uses a typographic star; the rating is drawn from TRUSTPILOT');
const scores = [...prose.matchAll(/\b([0-5]\.\d)\b(?!\d)/g)].map((m) => m[1]);
for (const n of scores) must(n === TRUSTPILOT_SCORE, `states a rating of ${n}; the sourced TrustScore is ${TRUSTPILOT_SCORE}`);

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
must(count(/class="mkt-foot__col"/g) >= 2, 'footer is missing the sitemap columns');
must(!/mkt-foot__trust-list/.test(markup), 'the partner marks are in the footer as well as the band; once is enough');
must(/href="#compare"[^>]*>Why TopEdge</.test(html), 'nav missing the "Why TopEdge" anchor');
must(/href="#platform"[^>]*>Platform</.test(html), 'nav missing the "Platform" anchor');
must(/Log in</.test(html), 'nav missing "Log in"');
must(/data-cta="trial"/.test(html), 'missing trial CTA');
must(/data-cta="shopify"[^>]*href="https:\/\/apps\.shopify\.com\/|href="https:\/\/apps\.shopify\.com\/[^"]*"[^>]*data-cta="shopify"/.test(html), 'Shopify CTA does not link to the App Store');
const h1 = ((markup.match(/<h1 id="hero-h1">([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, '');
// The page is bought on platform terms as well as COD terms, so the default headline sells
// the subscription. The narrower ad groups still get their own line through utm_content.
must(/Your Shopify store, running on WhatsApp/.test(h1), 'default H1 no longer sells the platform');
must(h1.length <= 60, `H1 is ${h1.length} characters; over 60 wraps past two lines on desktop`);
must(/<mark class="chip" id="hero-mark">/.test(markup), 'the H1 payload is not highlighted like the site titles');
must(copy.includes('Built for Indian Shopify D2C brands'), 'page no longer says who it is for');
// The trial terms came out of the hero and out from under the pricing button,
// where they were stated twice in one section. They still have to be on the
// page and still have to be generated from TRIAL rather than retyped; the
// assertion lives with the price now, beside the "Priced on volume" check.
must(
  html.includes(`${TRIAL.days}-day free trial on every plan. ${TRIAL.orders} free order confirmations, no credit card.`),
  'the trial terms are gone, or no longer match TRIAL',
);
// The first screen is the product moving: a full-viewport hero with the film inside it,
// started by page.js rather than an autoplay attribute (which would also fetch the file
// before anyone asked for it). These keep the film there and keep it inside the viewport.
const heroBlock = (markup.match(/<header class="hero"[\s\S]*?<\/header>/) || [''])[0];
must(heroBlock !== '', 'the hero header is gone');
must(/<video\b/.test(heroBlock), 'the hero has no film; the first screen is meant to be the product moving');
must(!/class="micro"/.test(heroBlock), 'the microcopy line is back in the hero');
// One way forward above the fold. The App Store is still offered, on the mobile
// bar, where it does not compete with the trial for the same first click.
const heroCtas = heroBlock.match(/data-cta="[a-z]+"/g) || [];
must(heroCtas.length === 1 && heroCtas[0] === 'data-cta="trial"', `the hero should offer one button, the trial; found ${heroCtas.join(', ') || 'none'}`);
const bar = (markup.match(/<div class="sticky"[\s\S]*?<\/div>/) || [''])[0];
must(/data-cta="trial"/.test(bar) && /data-cta="shopify"/.test(bar), 'the mobile bar should carry both the trial and the App Store');
must(/min-height:100svh/.test(html), 'the hero is no longer a full viewport');
must(/\.film\{[^}]*max-height:/.test(html), 'the hero film has no max-height, so it can push the buttons off the first screen');
must(!/\.film\{[^}]*box-shadow:/.test(html), 'the film has a drop shadow again; the owner asked for it flat');
must(/\.bx\{[^}]*border:1px solid/.test(html), 'the bento panels lost their hairline border');
must(!/\.(bx|path):hover\{[^}]*transform:/.test(html), 'a card lifts on hover again; only the contents inside it should move');
must(/\.bx:hover \./.test(html), 'nothing inside a bento panel animates on hover');
must(/film\.play\(\)/.test(html), 'nothing starts the hero film; it would sit on its poster');
// The proof row under the buttons. No star and no number may appear unless the generator
// was given a real TrustScore: the published reviews do not carry per-review ratings.
must(/class="hp-faces"/.test(markup), 'the hero proof row is missing');
const proofRow = (markup.match(/<div class="hp-faces"[\s\S]*?<\/div>/) || [''])[0];
// Five faces, in the order the owner set: Delitech, then the two Apex Light
// founders, then Choice Salon and code CLINIC.
must(count(/class="hp-tip"/g) === 5, 'expected five customer faces, each with a tooltip');
const photos = [...proofRow.matchAll(/<img src="([^"]+)"/g)].map((m) => m[1]);
must(photos.length === 5, `expected five photographs in the hero stack, found ${photos.length}`);
// Every face is a file the owner supplied, cropped into the repo. A face loaded
// from anywhere else is a stock photograph until proven otherwise.
for (const src of photos) must(src.startsWith('/trust/people/'), `a hero face is not one of the owner's photographs: ${src}`);
must(!/<img [^>]*alt="[^"]/.test(proofRow), 'a face carries its own alt; the row is already labelled');
const order = [...proofRow.matchAll(/class="hp-tip">([^<]+)/g)].map((m) => m[1]);
must(
  order.join('|') === 'Delitech|Apex Light|Apex Light|Choice Salon|code CLINIC',
  `the faces are in the wrong order: ${order.join(', ')}`,
);
must(/aria-label="[^"]*Ved Patel of Delitech[^"]*code CLINIC[^"]*"/.test(proofRow), 'the hero face row no longer names the people to a screen reader');
for (const [brand, person] of [['Delitech', 'Ved Patel'], ['Choice Salon', 'Shubhash']]) {
  must(proofRow.includes(`${brand}<em>${person}</em>`), `the tooltip does not name ${person} under ${brand}`);
}
// The star row renders only from a sourced score, and names its source.
const starRow = (markup.match(/<p class="hp-stars[^"]*">[\s\S]*?<\/p>/) || [''])[0];
must(starRow !== '', 'the star row is gone');
must(/<svg/.test(starRow) === /\d\.\d/.test(starRow), 'stars without a sourced score, or a score without stars');
must(/Trustpilot/.test(starRow), 'the star row does not say where the rating comes from');
const proofLine = (markup.match(/<p class="hp-t">([\s\S]*?)<\/p>/) || ['', ''])[1];
must(/class="hp-stars"/.test(proofLine) === /\d\.\d/.test(proofLine), 'the hero shows stars without a sourced score, or a score without stars');
// The band under the hero is where a customer wordmark can actually be read; the
// hero shows the same four as people. Each mark needs its own alt there.
const strip = (markup.match(/<ul class="trust-marks[^"]*">[\s\S]*?<\/ul>/) || [''])[0];
must(strip !== '', 'the band under the hero is gone');
for (const logo of ['delitech', 'apex', 'codeclinic', 'choicesalon']) {
  must(strip.includes(`/trust/${logo}-white.png`), `the band is not showing the ${logo} logo`);
}
// The ribbon holds three copies of the four marks so the loop has no seam.
// Exactly one copy is announced: a screen reader hearing the same four
// companies three times is worse than hearing them none.
const marks = strip.match(/<li[^>]*>\s*<img [^>]*>/g) || [];
must(marks.length === 12, `expected three copies of four logos in the ribbon, found ${marks.length}`);
const named = marks.filter((m) => !/aria-hidden/.test(m));
must(named.length === 4, `${named.length} logo copies are announced; exactly one copy should be`);
for (const m of named) must(/\balt="[^"]{4,}"/.test(m), 'an announced logo in the ribbon has no alt text');
for (const m of marks.filter((m) => /aria-hidden/.test(m))) {
  must(/\balt=""/.test(m), 'a duplicated logo in the ribbon has alt text; the copies are decoration');
}
must(/<div class="mq"[^>]*aria-label=/.test(markup), 'the ribbon has no label');
must(/@keyframes mq\{/.test(html) && /animation:mq /.test(html), 'the ribbon does not scroll');
must(/prefers-reduced-motion[\s\S]*?\.trust-marks\{[^}]*flex-wrap:wrap/.test(html), 'the ribbon still scrolls under reduced motion');
// The band is white now, as the owner asked, which is why the marks are painted
// dark rather than being the white knockouts the files actually are.
must(/\.trust\{background:#fff/.test(html), 'the band is not white');
must(/\.trust-marks img\{[^}]*filter:brightness\(0\)/.test(html), 'the logos are not painted dark for the white band');
// The platform marks answer "who bills me", which is a question asked at a price.
const badgeRow = (markup.match(/<ul class="badges">[\s\S]*?<\/ul>/) || [''])[0];
must(badgeRow !== '', 'the platform marks are gone');
must(at(/<ul class="badges">/) > at(/<section[^>]*id="pricing"/), 'the platform marks belong beside the price, not above it');
must((badgeRow.match(/<img /g) || []).length === 3, 'expected the three platform marks');

// --- Headings ---
// Every section heading carries a marked phrase, the way the site sets its titles, and
// none of them is an uppercase eyebrow: the owner removed those from this page by hand
// once already. Light weight is a stylesheet rule, so it is checked there, not here.
const heads = markup.match(/<h2[^>]*>[\s\S]*?<\/h2>/g) || [];
must(heads.length >= 7, `expected at least 7 section headings, found ${heads.length}`);
for (const h of heads) must(/class="chip"/.test(h), `heading has no marked phrase: ${h.replace(/<[^>]+>/g, '').trim()}`);
// No shouting anywhere on this page: the owner stripped the uppercase eyebrows
// by hand once, so the rule is about the declaration, not one class name. The
// navbar and the plan badges are the exceptions the site itself already sets.
const upper = (html.match(/[^{}]+\{[^}]*text-transform:uppercase[^}]*\}/g) || []).filter(
  (r) => !/mkt-foot__capsule|mkt-plan__badge/.test(r),
);
must(upper.length === 0, `uppercase is back on: ${upper.map((r) => r.split('{')[0]).join(', ')}`);

// --- The three entry points ---
// The panel the page is built around. Each card has to lead somewhere real: a card with
// no link is three lines of copy taking the width of a third of the page.
const paths = markup.match(/<article class="path"[\s\S]*?<\/article>/g) || [];
must(paths.length === 3, `expected 3 entry-point cards, found ${paths.length}`);
for (const c of paths) {
  must(/<h3>/.test(c), 'an entry-point card has no heading');
  must(/<a class="go[^"]*" [^>]*href="(\/[^"#][^"]*|#[a-z]+)"/.test(c), 'an entry-point card has no destination');
  must(/class="art/.test(c), 'an entry-point card has no illustration');
}
must(/class="go go--solid"/.test(markup), 'none of the three entry points is the primary one');
must(/role="img"[^>]*aria-label="[^"]*Confirm[^"]*Cancel/i.test(html), 'the example thread needs an aria-label describing confirm and cancel');

// --- The platform bento ---
// The reason this page exists in its new form: it sells the subscription, not one
// feature. Every illustration is markup and CSS, which is what keeps the page inside
// its byte budget while showing five things; an <img> smuggled into one would undo it.
const bx = markup.match(/<article class="bx bx--[wn]"[\s\S]*?<\/article>/g) || [];
must(bx.length === 5, `expected 5 platform panels, found ${bx.length}`);
must(count(/class="bx bx--w"/g) === 2, 'the bento is no longer asymmetric: expected 2 wide panels');
for (const b of bx) {
  must(/class="viz/.test(b), 'a platform panel has no illustration');
  must(!/<img\b|<svg\b/.test(b), 'a platform panel ships an image; these are drawn in CSS on purpose');
}
// Each panel has a piece floating over a corner of its base element. The
// overlap is the point, but it may never cover a number: a figure hidden
// behind a card is a diagram lying about its own data. The inner padding is
// what keeps the figures clear, so the rule guards the padding.
must(count(/class="float float--[tb]r/g) >= 3, 'the platform panels lost their floating layer');
must(/\.lay \.fn\{[^}]*padding-right:/.test(html), 'the funnel lost the padding that keeps its figures out from under the floating note');
must(/\.card-ord\{[^}]*padding:[^;}]*rem [0-9.]+rem/.test(html), 'the order card lost the padding that keeps its amounts out from under the floating reply');
// The line under the grid that marked the panels illustrative came out, so the
// one figure that could be read as a customer result carries its own marker.
must(/Recovered <i>sample<\/i>/.test(markup), 'the money figure in the recovery panel is not marked as sample data');
for (const job of ['carts that leave', 'Confirm COD before you ship', 'Broadcast', 'every step before the sale', 'Flows you build']) {
  must(copy.includes(job), `the platform section no longer names: ${job}`);
}

// --- Illustrations ---
// Nothing on this page is a screenshot any more: every illustration is markup
// and CSS, and the only raster images left are the logos, the badges, the
// customer faces, the blog thumbnails, the film poster and the arrow. Each of
// those is asserted where it belongs.
// The three dashboard stills were cut; the P&L stays, because it is the evidence the
// objections section rests on rather than decoration.
must(!/class="shotc"|lp\/shots\//.test(markup), 'a dashboard screenshot is back; every illustration on this page is drawn');
// The owner took the wash out from under every other section; the hero is the
// only gradient on the page now.
must(!/\.alt\{[^}]*linear-gradient/.test(html), 'a section has a gradient background again; only the hero has one');
// The trial terms sit beside the price, which is where the hesitation is.
must(new RegExp(`${TRIAL.days}-day free trial on every plan`).test(copy), 'the pricing section no longer carries the trial terms');
must(html.includes('nothing sends without your sign-off'), 'missing Meta-approval caption');

// --- Proof and why ---
const quotes = [
  ["The overall software experience is good — it's Indian software but feels like US Grade software quality.", 'Tirth P.'],
  ['Topedge helped me a lot to solve issues with my ecomm business like abandoned cart followups, complete tracing of what a lead did and where it dropped off. Their support team is very helpful.', 'Shubham P.'],
  ["In 2 days they built me everything... I'm on their ₹1,999 base plan, and mostly every feature is unlocked on every plan.", 'Robin'],
];
// Each review must be verbatim and must say on its own card where it came from, with
// the author named. The card carries the Trustpilot mark above the quote now, so the
// check is "this card names Trustpilot and this author" rather than a word order.
const quoteCards = markup.match(/<blockquote[\s\S]*?<\/blockquote>/g) || [];
for (const [text, author] of quotes) {
  must(html.includes(text), `quote not verbatim: ${author}`);
  const onCard = quoteCards.find((c) => c.includes(text));
  must(/Trustpilot/.test(onCard || ''), `quote missing Trustpilot attribution: ${author}`);
  must((onCard || '').includes(author), `quote missing its author: ${author}`);
}
// A star row is a score claim and the published reviews do not give per-review scores.
// A row of stars is a rating claim, so there may be exactly one on the page and
// it has to be the sourced one: in the hero, beside the number, linked to the
// page it came from, and with as many filled boxes as the number says. Five
// filled stars next to a 4.0 is the misrepresentation this rule exists for.
must(count(/class="st"/g) === 5, 'expected one five-star row, drawn by starRow');
const filled = (starRow.match(/fill="#00b67a"/g) || []).length;
const partial = (starRow.match(/clip-path="inset\(/g) || []).length;
must(
  filled - partial === Math.floor(Number(TRUSTPILOT_SCORE)) && partial === (Number(TRUSTPILOT_SCORE) % 1 ? 1 : 0),
  `the star row shows ${filled} filled of 5, which does not read as ${TRUSTPILOT_SCORE}`,
);
must(/#dcdce6/.test(starRow), 'the unfilled stars are missing; a 4.0 drawn as four stars alone reads as four out of four');
must(new RegExp(`from ${TRUSTPILOT_REVIEWS} reviews`).test(markup), 'the rating does not say how many reviews it is from');
must(/trustpilot\.com\/review\/topedgeai\.com/.test(starRow), 'the rating does not link to the page it came from');
must(html.includes('trustpilot.com/review/topedgeai.com'), 'missing Trustpilot link');
must(html.includes('Launched on the Shopify App Store'), 'missing launch line');
// Scoped to the table: "Unlimited flow runs" also appears in the value stack
// beside the price, and a claim satisfied by a different section is not this
// section making it.
const cmpCopy = ((markup.match(/<div class="cmp"[\s\S]*?<\/section>/) || [''])[0]).replace(/<[^>]+>/g, '');
for (const h of ['TopEdge adds 0% markup', 'Unlimited flow runs', 'One profile, even with three phone numbers', 'A payment link in the same thread']) {
  must(cmpCopy.includes(h), `the comparison no longer makes the claim: ${h}`);
}
// The switching section answers the objection this audience actually arrives with
// (markup on messages, a price that moves, metered runs). It must do that without
// naming anyone: the competitor-name rule above is the other half of this one.
// Four topics, each with what the reader is used to and what happens here. The
// table reads left to right, so a row missing one of its two halves is worse
// than no row at all.
const rows = markup.match(/<div class="cmp-row">[\s\S]*?<\/div>/g) || [];
must(rows.length === 4, `expected 4 comparison rows, found ${rows.length}`);
for (const r of rows) {
  must(/class="cmp-t"/.test(r) && /class="cmp-x"/.test(r) && /class="cmp-v"/.test(r), 'a comparison row is missing one of its three cells');
}
must(/class="cmp-row cmp-row--head"/.test(markup), 'the comparison has no column headings');
must(!/class="sw-them"|class="sw-us"/.test(markup), 'the old prose version of the objections is back');

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

// --- Talk to a person ---
// The FAQ was replaced by a WhatsApp handoff. It has to open a real thread on the
// company number, prefilled, so the reply starts with context instead of "who is this".
const wa = (markup.match(/<a[^>]*data-cta="whatsapp"[^>]*>/) || [''])[0];
must(wa !== '', 'missing the WhatsApp CTA that replaced the FAQ');
must(/href="https:\/\/wa\.me\/\d{8,}\?text=\S+"/.test(wa), 'WhatsApp CTA must open the company number with a prefilled message');
must(/target="_blank"/.test(wa) && /rel="noopener"/.test(wa), 'WhatsApp CTA must open safely in a new tab');
must(!/<details/.test(markup), 'the FAQ accordion is gone; do not reintroduce it without the spec');

// --- Final CTA, sticky bar, tracking ---
// The closing CTA band was removed; the WhatsApp handoff is the last section now.
// What still has to hold is that a visitor is never far from a way to convert, so
// count the entry points rather than assert one particular band exists.
// --- Section order ---
// Three positions the owner set by hand, each of which a later edit could undo without
// anything else failing: the brand strip sits above the three entry points, and the blog
// sits above the WhatsApp handoff rather than at the very bottom of the page.
must(at(/<div class="trust">/) < at(/<section id="start"/), 'the brand strip belongs above the three entry points');
must(at(/<section[^>]*id="read"/) < at(/<section[^>]*id="help"/), 'the blog belongs above the "Still have a question" section');
must(at(/<section[^>]*id="platform"/) < at(/<section[^>]*id="compare"/), 'the platform section belongs before the comparison');

// --- Playbooks ---
// The last section is the only way off this page that is not the signup form, and it is
// the reason the ad spend on a visitor who is not buying today is not wasted. The slugs
// are resolved against the real post data: a renamed or deleted post fails here rather
// than shipping a card that 404s.
async function loadPosts() {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'topedge-lpchk-'));
  const outfile = path.join(outDir, 'blogPosts.mjs');
  try {
    await esbuild({
      entryPoints: [path.join(__dirname, '..', 'src/data/blogPosts.ts')],
      bundle: true,
      format: 'esm',
      platform: 'node',
      outfile,
      logLevel: 'error',
    });
    return (await import(pathToFileURL(outfile).href)).blogPosts;
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
}
const postCards = markup.match(/<a class="post"[\s\S]*?<\/a>/g) || [];
must(postCards.length === 3, `expected 3 blog cards, found ${postCards.length}`);
const published = new Set((await loadPosts()).map((p2) => p2.slug));
for (const c of postCards) {
  const slug = (c.match(/href="\/blog\/([^"]+)"/) || [])[1];
  must(slug !== undefined, 'a blog card has no /blog/ link');
  must(slug === undefined || published.has(slug), `blog card points at /blog/${slug}, which is not a published post`);
  must(/<img [^>]*alt="[^"]{10,}"/.test(c), 'a blog card image has no alt text');
}
must(/href="\/blog"[^>]*>Read all posts/.test(markup), 'missing the link to the full blog');

// --- Sticky bar and tracking ---
must(/id="sticky-cta"[^>]*>/.test(html), 'missing sticky mobile CTA');
must(count(/data-cta="trial"/g) >= 7, 'expected the trial CTA in nav, hero, the third entry-point card, the three plan cards, pricing and the sticky bar');
must(/shopify_install_click/.test(html), 'missing Shopify click event');

if (failures.length) {
  console.error(`✖ landing page check failed (${failures.length}):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('✅ landing page check passed');
