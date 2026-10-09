/**
 * Asserts the generated ad page (public/lp/cod-confirmation/index.html).
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
must(Buffer.byteLength(html) <= 80 * 1024, 'exceeds the 80 KB budget');
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
must(count(/class="mkt-foot__col"/g) >= 2, 'footer is missing the sitemap columns');
must(!/mkt-foot__trust-list/.test(markup), 'the partner marks are in the footer as well as the band; once is enough');
must(/href="#how"[^>]*>How it works</.test(html), 'nav missing "How it works" anchor');
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
const proofRow = (markup.match(/<div class="hp-faces"[\s\S]*?<\/div>\s*<p/) || [''])[0];
must(count(/class="hp-tip"/g) === 4, 'expected four customer avatars, each with a tooltip');
// Initials, never a photograph: we have no portraits of these people, and a
// stock face captioned with a real customer's name is a lie, not a placeholder.
must(!/<img\b/.test(proofRow), 'the hero avatars are showing images; stock faces are not our customers');
must(/aria-label="[^"]*Delitech[^"]*Choice Salon[^"]*"/.test(proofRow), 'the hero avatar row no longer names the brands to a screen reader');
// Where a founder is known the tooltip names them, and the avatar is their
// initials rather than the company's.
for (const [brand, founder] of [['Apex Light', 'Shubham Patel'], ['Delitech', 'Ved Patel']]) {
  must(proofRow.includes(`${brand}<em>${founder}</em>`), `the tooltip does not name ${founder} under ${brand}`);
}
must(/<b>VP<\/b>/.test(proofRow) && /<b>SP<\/b>/.test(proofRow), 'the avatars are not using the founders initials where we have the name');
// The star row renders only from a sourced score, and names its source.
const starRow = (markup.match(/<p class="hp-stars[^"]*">[\s\S]*?<\/p>/) || [''])[0];
must(starRow !== '', 'the star row is gone');
must(/<svg/.test(starRow) === /\d\.\d/.test(starRow), 'stars without a sourced score, or a score without stars');
must(/Trustpilot/.test(starRow), 'the star row does not say where the rating comes from');
must(count(/class="hp-tip"/g) === 4, 'each logo in the hero needs a tooltip naming the brand');
const proofLine = (markup.match(/<p class="hp-t">([\s\S]*?)<\/p>/) || ['', ''])[1];
must(/class="hp-stars"/.test(proofLine) === /\d\.\d/.test(proofLine), 'the hero shows stars without a sourced score, or a score without stars');
// The band under the hero is where a customer wordmark can actually be read; the
// hero shows the same four as people. Each mark needs its own alt there.
const strip = (markup.match(/<ul class="trust-marks[^"]*">[\s\S]*?<\/ul>/) || [''])[0];
must(strip !== '', 'the band under the hero is gone');
for (const logo of ['delitech', 'apex', 'codeclinic', 'choicesalon']) {
  must(strip.includes(`/trust/${logo}-white.png`), `the band is not showing the ${logo} logo`);
}
for (const img of strip.match(/<img [^>]*>/g) || []) {
  must(/\balt="[^"]{4,}"/.test(img), 'a customer logo in the band has no alt text');
}
must(!/class="mq"|mq-track/.test(markup), 'the logo marquee is back; four logos never filled a desktop viewport');
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
const bx = markup.match(/<article class="bx bx--[wnf]"[\s\S]*?<\/article>/g) || [];
must(bx.length === 6, `expected 6 platform panels, found ${bx.length}`);
must(count(/class="bx bx--w"/g) === 2, 'the bento is no longer asymmetric: expected 2 wide panels');
must(count(/class="bx bx--f"/g) === 1, 'the full-width reporting panel is gone');
for (const b of bx) {
  must(/class="viz"/.test(b), 'a platform panel has no illustration');
  // The reporting panel is the exception, and only because its subject is a
  // chart: a chart drawn in CSS would be a chart of nothing.
  const drawn = !/class="bx bx--f"/.test(b);
  must(!drawn || !/<img\b|<svg\b/.test(b), 'a platform panel ships an image; these are drawn in CSS on purpose');
}
must(/shown with sample data/.test(copy), 'the numbers in the panels are not marked as sample data');
for (const job of ['carts that leave', 'Confirm COD before you ship', 'Broadcast', 'One inbox', 'Flows you build', 'the number that decides']) {
  must(copy.includes(job), `the platform section no longer names: ${job}`);
}

// --- Product showcase and going live ---
// Screens from the real product, not icons. Each needs a described alt: these are the
// only images on the page carrying meaning, and the ad audience reads them before copy.
// The three dashboard stills were cut; the P&L stays, because it is the evidence the
// objections section rests on rather than decoration.
const shots = html.match(/<img class="shot[^"]*"[^>]*>/g) || [];
must(shots.length >= 1, 'the P&L screenshot is gone from the objections section');
must(!/class="shotc"/.test(markup), 'the three dashboard stills are back; the owner cut them');
// The P&L used to float above the objections with nothing explaining it. It is a
// labelled panel in the platform section now, and this keeps it there.
must(/class="bx bx--f"[\s\S]*?lp\/shots\/pnl\.webp/.test(markup), 'the P&L screen is not inside the reporting panel');
must(!/class="shot proof"/.test(markup), 'the P&L is loose on the page again instead of being a labelled panel');
// The trial terms sit beside the price, which is where the hesitation is.
must(new RegExp(`${TRIAL.days}-day free trial on every plan`).test(copy), 'the pricing section no longer carries the trial terms');
for (const s of shots) {
  must(/\balt="[^"]{40,}"/.test(s), 'a product screenshot has no descriptive alt text');
  must(/\bloading="lazy"/.test(s), 'product screenshots must be lazy, they sit below the fold');
  must(/\bwidth="\d+"[^>]*\bheight="\d+"/.test(s), 'product screenshots need width/height so they reserve space');
}
must(count(/<li class="stp"/g) === 3, 'expected 3 going-live steps');
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
must(!/<svg[^>]*>(?:(?!<\/svg>)[\s\S])*?<\/svg>\s*(?:<svg|★)/.test(markup), 'looks like a star rating row');
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
must(at(/<section id="read"/) < at(/<section[^>]*id="help"/), 'the blog belongs above the "Still have a question" section');
must(at(/<section[^>]*id="platform"/) < at(/<section id="how"/), 'the platform section belongs before going live');

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
