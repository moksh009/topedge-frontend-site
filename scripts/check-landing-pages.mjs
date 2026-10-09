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
must(
  html.includes(`${TRIAL.days}-day free trial · ${TRIAL.orders} free order confirmations · No credit card · Live in about 15 minutes`),
  'hero microcopy does not match TRIAL',
);
// The owner asked for the film out of the hero: it is the slowest thing a visitor can be
// handed and it pushed the headline and the buttons off a phone screen. It lives in its
// own section now, and this keeps it there.
const heroBlock = (markup.match(/<header class="hero"[\s\S]*?<\/header>/) || [''])[0];
must(!/<video\b/.test(heroBlock), 'the hero has a <video> again; the film belongs in its own section');
must(!/<img\b/.test(heroBlock), 'the hero has an image; it is type and two buttons by design');
must(/<section id="watch"[\s\S]*?<video\b/.test(markup), 'the film section is gone');
for (const logo of ['choicesalon', 'delitech', 'apex']) {
  must(new RegExp(`src="/trust/${logo}-white\\.png"[^>]*alt="[^"]+"|alt="[^"]+"[^>]*src="/trust/${logo}-white\\.png"`).test(html), `trust logo ${logo} missing or has no alt`);
}

// --- Headings ---
// Every section heading carries a marked phrase, the way the site sets its titles, and
// none of them is an uppercase eyebrow: the owner removed those from this page by hand
// once already. Light weight is a stylesheet rule, so it is checked there, not here.
const heads = markup.match(/<h2[^>]*>[\s\S]*?<\/h2>/g) || [];
must(heads.length >= 7, `expected at least 7 section headings, found ${heads.length}`);
for (const h of heads) must(/class="chip"/.test(h), `heading has no marked phrase: ${h.replace(/<[^>]+>/g, '').trim()}`);
must(!/text-transform:uppercase/.test(html.match(/\.(eyebrow|head p)[^}]*\{[^}]*\}/g)?.join('') || ''), 'an uppercase eyebrow is back above a title');

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
  must(/class="viz"/.test(b), 'a platform panel has no illustration');
  must(!/<img\b|<svg\b/.test(b), 'a platform panel ships an image; these are drawn in CSS on purpose');
}
must(/illustrations of the interface, not a customer result/.test(copy), 'the sample values in the panels are not marked illustrative');
for (const job of ['carts that leave', 'Confirm COD before you ship', 'Broadcast', 'One inbox', 'Flows you build']) {
  must(copy.includes(job), `the platform section no longer names: ${job}`);
}

// --- Product showcase and going live ---
// Screens from the real product, not icons. Each needs a described alt: these are the
// only images on the page carrying meaning, and the ad audience reads them before copy.
const shots = html.match(/<img class="shot"[^>]*>/g) || [];
must(shots.length >= 3, `expected at least 3 product screenshots, found ${shots.length}`);
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
