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

// The rating assertions compare the page against socialProof.json rather than
// against a number typed in here, so there is one place a refreshed score has
// to be edited and the check follows it.
const genSrc = fs.readFileSync(path.join(__dirname, 'generate-landing-pages.mjs'), 'utf8');
const SOCIAL_PROOF = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'src', 'marketing', 'data', 'socialProof.json'), 'utf8'),
);
const TRUSTPILOT_SCORE = SOCIAL_PROOF.trustpilot.score;
const TRUSTPILOT_REVIEWS = SOCIAL_PROOF.trustpilot.reviews;

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
must(Buffer.byteLength(html) <= 100 * 1024, 'exceeds the 100 KB budget');
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
must(/\.film\{[^}]*calc\(min\(\d+svh/.test(html), 'the hero film is no longer bounded by a fraction of the viewport, so it can push the buttons off the first screen');
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
// The hero runs past one viewport now: it carries the value ticker and the
// three anchors below the film. What still has to hold is that the film is in
// the first screen on a laptop, and that the ticker and the anchors are inside
// the hero rather than loose sections under it.
must(/<div class="tk"/.test(heroBlock), 'the value ticker is not in the hero');
must(/<ul class="pil">/.test(heroBlock), 'the three anchors are not in the hero');
// The cap is on the width, derived from the height the film may take: setting
// a full width and a max-height instead makes the box wider than 16:9 once the
// height clamps, and the 16:9 file then pillarboxes itself inside it.
must(/\.film\{[^}]*width:min\(100%,calc\(min\(4\dsvh,\d+rem\) \* 16 \/ 9\)\)/.test(html), 'the film is no longer capped to a fraction of the viewport, so it can push itself below the fold');
must(!/\.film\{[^}]*width:100%/.test(html), 'the film is full width with a height cap again; it will show grey bars either side');
// One button above the fold. The App Store is still offered, on the mobile bar.
const heroCtas = heroBlock.match(/data-cta="[a-z]+"/g) || [];
must(heroCtas.length === 1 && heroCtas[0] === 'data-cta="trial"', `the hero should offer one button, the trial; found ${heroCtas.join(', ') || 'none'}`);
const bar = (markup.match(/<div class="sticky"[\s\S]*?<\/div>/) || [''])[0];
must(/data-cta="trial"/.test(bar) && /data-cta="shopify"/.test(bar), 'the mobile bar should carry both the trial and the App Store');
must(/data-cta="shopify"[^>]*href="https:\/\/apps\.shopify\.com\//.test(markup), 'the Shopify CTA does not link to the App Store');

const h1 = ((markup.match(/<h1 id="hero-h1">([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, '');
must(/Shopify Growth Suite TopEdge/.test(h1), 'default H1 no longer names the product and the brand');
must(h1.length <= 60, `H1 is ${h1.length} characters; over 60 wraps past two lines on desktop`);
must(/<mark class="chip" id="hero-mark">/.test(markup), 'the H1 payload is not highlighted like the site titles');
// The default sub dropped the "Built for Indian Shopify D2C brands" line when
// it was rewritten to list the suite. The page still has to tell an Indian
// merchant it is for them before they scroll, and the proof row does it.
must(/founders in India/.test(copy), 'nothing above the fold says this is for Indian merchants');

// The owner's own hand-drawn arrow beside the primary button, with its cream
// ground stripped. It is decoration and it is hidden below 1100px, which is
// exactly why it goes missing without anything noticing.
const free = (markup.match(/<span class="free"[\s\S]*?<\/span>/) || [''])[0];
must(free !== '', 'the hand-drawn arrow beside the trial button is gone');
must(free.includes('/lp/free-arrow.webp'), 'the arrow is not the owner\'s own file');
must(new RegExp(`Free for ${TRIAL.days} days`).test(free), 'the arrow no longer says how long the trial is');
must(at(/<span class="free"/) < at(/class="hp-faces"/), 'the arrow belongs in the button row, above the faces');

// The hero's inner column is a flex item in a row container. Without an
// explicit justify-content it sits at flex-start, which on desktop is hidden
// by the column stretching and below 900px put the whole fold against the
// left edge with the entire 2.5rem gutter on the right. The owner caught that
// one in a screenshot; this is the rule that would have caught it here.
must(
  /\.hero\{[^}]*flex-direction:column[^}]*align-items:center/.test(html),
  'the hero no longer centres its column; as a row with no justify-content it put the whole fold against the left edge below 900px',
);

// --- The included inventory ---
// It listed six things while the heading two inches above said thirty, which
// is the page arguing with itself in front of someone deciding whether to
// pay. It is the catalog's own universalFeatures now, grouped the way the
// pricing page groups them, so the two pages cannot drift apart.
const incl = (markup.match(/<div class="incl-gs">[\s\S]*?<\/div>\s*<\/div>/) || [''])[0];
must(incl !== '', 'the included inventory is gone');
must((incl.match(/<div class="incl-g">/g) || []).length === 3, 'the inventory is no longer grouped in three');
const listed = [...incl.matchAll(/<li>([^<]+)<\/li>/g)].map((m) => m[1]);
must(
  listed.length === FALLBACK_CATALOG.universalFeatures.length,
  `the inventory lists ${listed.length} of the catalog's ${FALLBACK_CATALOG.universalFeatures.length} universal features`,
);
// Every catalog feature has to come out the other side, renamed or not: a
// group match that stops matching silently drops a feature off the page.
const RENAMED = new Set(['Cart recovery', 'Audience CRM', 'Campaigns', 'Orders', 'Warranty']);
for (const f of FALLBACK_CATALOG.universalFeatures) {
  const hit = listed.some((l) => l === f || RENAMED.has(l));
  must(hit, `the inventory dropped a universal feature: ${f}`);
}
must(copy.includes('30+ features included on every plan'), 'the pricing lead no longer claims the number the inventory shows');

// --- The CTA glint runs at rest ---
// It used to run on hover only, which meant no phone ever saw it, and phones
// are most of what this page is bought for. A glint, not a pulse: the sweep
// is under a second of a six second cycle, it is linear (on the page's
// ease-out curve the whole sweep was over inside 0.15s, which is a flash),
// and reduced motion removes the element entirely.
must(/@keyframes shine\{0%\{transform:translateX\(-130%\)\}14%,100%\{transform:translateX\(130%\)\}\}/.test(html), 'the glint keyframes are gone or no longer rest between sweeps');
for (const sel of ['\\.btn', '\\.mkt-plan__cta']) {
  must(new RegExp(`${sel}:after\\{[^}]*animation:shine 6s linear`).test(html), `${sel} does not glint at rest, so no touch device will ever see it`);
  must(!new RegExp(`${sel}:hover:after`).test(html), `${sel} is back to a hover-only sheen`);
}
// The secondary of the pair keeps hover only: two things glinting side by side
// in the mobile bar is a decision to make rather than one to be helped towards.
must(/\.btn-out:after\{[^}]*animation:none/.test(html), 'the outline button glints too; only the primary should');
must(/\.mkt-plan--launch \.mkt-plan__cta:after\{animation-delay/.test(html), 'the plan buttons glint in unison again');
must(/prefers-reduced-motion[\s\S]*?\.btn:after,\.mkt-plan__cta:after\{display:none\}/.test(html), 'the glint survives reduced motion');

// --- Marks inside the heading chips ---
// Two headings end on a name rather than a phrase, so the chip carries the
// mark as well as the word and the pair reads as one thing.
const tpHead = (markup.match(/<h2[^>]*>[^<]*What sellers[\s\S]*?<\/h2>/) || [''])[0];
must(/class="chip chip--mark"[^>]*>\s*<svg[\s\S]*?#00b67a/.test(tpHead), "the Trustpilot heading no longer carries Trustpilot's star");
const swHead = (markup.match(/<h2[^>]*>[\s\S]*?Switch to[\s\S]*?<\/h2>/) || [''])[0];
// The chip carries the mark and the name, so the mark's alt is empty: with
// both set a screen reader hears "TopEdge AI TopEdge AI".
must(/<img class="chip-bm"[^>]*src="\/brand-mark-56\.webp"[^>]*alt=""/.test(swHead), 'the comparison heading no longer carries the brand mark');
must(/<img class="chip-bm"[^>]*>TopEdge AI<\/span>/.test(swHead), 'the comparison heading shows the mark without the name beside it');

// --- The ticker runs left to right ---
must(/@keyframes tk\{from\{transform:translateX\(-50%\)\}to\{transform:translateX\(0\)\}\}/.test(html), 'the value ticker is running right to left again');
must(/@media\(max-width:759px\)[\s\S]*?\.tk-track\{animation-duration:22s\}/.test(html), 'the ticker lost its faster duration on a phone');

// --- The figure has no plate ---
// It was a bento panel, which gave a two-line statement the furniture of a
// feature card and made the number read as a label rather than the point.
must(!/\.pf-stat\{[^}]*background:/.test(html), 'the 0% figure is back inside a card');
must(!/\.pf-stat:before/.test(html), 'the gradient blob is back behind the 0% figure');
must(/\.pf-stat b\{font-size:clamp\(2\.9rem/.test(html), 'the 0% figure shrank back');

// --- The comparison icons ---
// Redrawn: the old dollar was an open S that did not close on its stem and
// the refresh arrows were two bare right angles floating off the curves.
for (const name of ['percent', 'flow', 'identity', 'ret']) {
  must(new RegExp(`${name}:`).test(genSrc), `the ${name} comparison icon is gone`);
}
must(!/d="M12 3v18M16 7\.5c0-1\.4/.test(html), 'the hand-drawn dollar is back in the comparison');
must(!/M17 4v4h-4M7 20v-4h4/.test(html), 'the floating right-angle arrowheads are back in the comparison');

// --- One surface for every illustration ---
// The panels were three diagonal washes with a differently coloured blob in
// each, which read as three unrelated pictures. One vertical gradient now,
// near-white at the top and violet at the foot, shared by the entry cards and
// the bento, and no hairline: the gradient is the edge.
must(/\.art,\.viz\{--p1:[^}]*linear-gradient\(180deg/.test(html), 'the illustration panels no longer share one vertical surface');
must(!/\.(art|viz)\{[^}]*box-shadow:inset 0 0 0 1px/.test(html), 'the illustration panels have their hairline back; the gradient is the edge');
must(!/\.orb--(warn|wa)\{[^}]*rgba\((244,63,94|37,211,102)/.test(html), 'an orb is colour-coding a panel again; they are light, not colour');

// --- The self-hosted face ---
// Two files on our own origin, not fonts.googleapis: an ad page that waits on
// a third party to paint is an ad page that loses the click it just paid for.
// The contract rule above already bans the external link; these say the
// replacement is actually wired up.
must(/@font-face\{[^}]*font-family:'Plus Jakarta Sans'[^}]*url\(\/fonts\/pjs-latin\.woff2\)/.test(html), 'the page is no longer self-hosting its face');
must(/@font-face\{[^}]*url\(\/fonts\/pjs-latin-ext\.woff2\)/.test(html), 'the latin-ext file is gone; the rupee sign will fall back mid-price');
must(/--font:'Plus Jakarta Sans'/.test(html), 'the face is loaded but nothing is set in it');
must(/font-display:swap/.test(html), 'the face blocks first paint');
// The files are subset. Everything the page paints has to be inside that
// subset, or a letter in the middle of a headline silently comes from another
// font. Rather than parse the woff2 here, pin the character set the subset was
// cut to: new copy outside it fails here, and the fix is to re-cut the subset.
const COVERED = new Set([
  ...Array.from({ length: 0x7f - 0x20 }, (_, i) => String.fromCharCode(0x20 + i)),
  ...'\u00a0\u00a9\u00b7\u00d7\u00e9\u2013\u2014\u2018\u2019\u201c\u201d\u2026\u20b9',
  // Not in the family at all, and deliberately left to fall back: a geometric
  // arrow or tick is the same shape in every sans on the fallback stack.
  '\u2192',
  '\u2713',
  '\n',
]);
const painted = new Set(
  // The variant headlines never appear as markup, so read them off the script
  // the hero carries: they are painted the moment a gclid lands with a
  // utm_content, and a glyph missing there is missing on a real ad click.
  (copy + ' ' + ((html.match(/var V=(\{.*?\});var c=/) || [])[1] || '')).split(''),
);
const uncovered = [...painted].filter((c) => !COVERED.has(c));
must(
  uncovered.length === 0,
  `these characters are outside the font subset and will fall back: ${uncovered.map((c) => JSON.stringify(c) + ' U+' + c.codePointAt(0).toString(16).toUpperCase()).join(', ')}`,
);

// --- The hero extension: the ticker and the three anchors ---
// Six claims, two copies, and the spacing on the item rather than the track: a
// gap sits between items and not after the last one, so an N-item track holds
// N-1 gaps and a 50% translate lands half a gap short of the frame it left.
// Both marquees on this page are built the same way for the same reason.
const tk = (markup.match(/<div class="tk"[\s\S]*?<\/div>/) || [''])[0];
must(tk !== '', 'the value ticker is gone');
const tkItems = tk.match(/<li[^>]*>/g) || [];
must(tkItems.length === 12, `expected two copies of six pills, found ${tkItems.length}`);
must(tkItems.filter((l) => /aria-hidden/.test(l)).length === 6, 'exactly one copy of the ticker should be announced');
must(/\.tk-track li\{[^}]*margin-right:/.test(html), 'the ticker spacing is back on the track as a gap; the loop will jump every lap');
must(!/\.tk-track\{[^}]*gap:/.test(html), 'the ticker track has a gap again; it breaks the one-copy translate');
must(/\.trust-marks li\{[^}]*margin-right:/.test(html), 'the logo ribbon spacing is back on the track as a gap; same jump');
for (const claim of ['abandoned checkout revenue', 'convert cash on delivery to prepaid', '0% Meta WhatsApp API markup', 'identity capture pixel', '+20 more features included']) {
  must(tk.includes(claim), `the ticker no longer claims: ${claim}`);
}
const pil = (markup.match(/<ul class="pil">[\s\S]*?<\/ul>/) || [''])[0];
must((pil.match(/<li>/g) || []).length === 3, 'expected three anchors closing the hero');
must((pil.match(/<h3>/g) || []).length === 3, 'an anchor has no heading');
// h3, not h2: every h2 on this page carries a marked phrase, and these are
// three claims rather than a section heading.
must(!/<h2/.test(pil), 'the anchors are using section headings');

// --- Marks that belong to other people ---
// Shopify's bag, Meta's symbol and our own workflow glyph, in place of the
// step numbers. No chip, no tinted square: a partner's logo inside a box in
// our brand colour reads as our badge for their product.
const steps = (markup.match(/<ol class="steps">[\s\S]*?<\/ol>/) || [''])[0];
must(steps.includes('/brand/shopify-mark.webp'), 'step one no longer carries the Shopify mark');
must(steps.includes('/brand/meta-mark.webp'), 'step two no longer carries the Meta mark');
must(/<b class="stp-m"><svg/.test(steps), 'step three no longer carries the journey glyph');
must(!/\.stp-m\{[^}]*background:/.test(html), 'the step marks are back in a tinted box');
must(/<img class="hero-bm"/.test(markup), 'the headline lost the brand mark inside its highlight');
must(
  /html\[data-v\]:not\(\[data-v="platform"\]\) \.hero-bm\{display:none\}/.test(html),
  'the brand mark stays in the highlight on the ad variants, where the marked phrase is not our name',
);
must(/<span id="hero-mark-t">/.test(markup), 'the variant script will overwrite the brand mark; it must replace the word inside the highlight');
must(/getElementById\('hero-mark-t'\)\.textContent/.test(html), 'the variant script is writing over the whole highlight again');
// The figure beside the ownership copy carries Meta's symbol, and only there:
// it is the one block whose number is about who bills you.
must(/<p class="pf-fig"><img src="\/brand\/meta-mark\.webp"/.test(markup), 'the 0% figure lost the Meta mark');
must((markup.match(/\/brand\/meta-mark\.webp/g) || []).length === 2, 'the Meta mark appears somewhere new; it belongs to the setup step and the billing figure');

// --- Buttons ---
// One behaviour for every CTA on the page. A page where one button lifts and
// the next is a flat rectangle teaches the reader only one of them is real.
for (const sel of ['\\.btn', '\\.mkt-plan__cta']) {
  must(new RegExp(`${sel}:hover[^{]*\\{[^}]*transform:translateY`).test(html), `${sel} does not lift under the pointer`);
  must(new RegExp(`${sel}:active\\{[^}]*transform:`).test(html), `${sel} has no press state`);
  must(new RegExp(`${sel}:after\\{[^}]*translateX\\(-130%\\)`).test(html), `${sel} lost its sheen`);
  must(new RegExp(`${sel}:hover>span\\[aria-hidden\\]`).test(html), `${sel} does not move its arrow`);
}
must(/prefers-reduced-motion[\s\S]*?\.btn:hover,\.mkt-plan__cta:hover\{transform:none\}/.test(html), 'the buttons still move under reduced motion');
const planCtas = markup.match(/<a class="mkt-plan__cta[^>]*>[^<]*/g) || [];
must(planCtas.length === 3, `expected three plan buttons, found ${planCtas.length}`);
for (const c of planCtas) must(/Start with /.test(c), `a plan button does not name the action: ${c.slice(-40)}`);

// --- One gradient, two surfaces ---
// The owner's note was that the page read as three different purples chosen by
// accident. It now has exactly two surfaces, white and the one inverted band,
// and exactly one gradient, rising from the bottom of the hero into the strip
// below it. A wash at the top of the hero, or a tint under every other
// section, is what this rule exists to catch.
must(/\.hero\{[^}]*background:linear-gradient\(180deg,#fff 0/.test(html), 'the hero gradient no longer starts from white at the top');
must(!/\.hero\{[^}]*radial-gradient/.test(html), 'a radial wash is back at the top of the hero');
must(/\.alt\{background:#fff\}/.test(html), 'the alternating section tint is back; the page has two surfaces');

// --- The proof row under the hero button ---
// The paid-traffic audit replaced this row with a price line and a pull quote.
// That version was wrong and the owner said so: a row of real businesses reads
// as "other founders already did this" in a glance, which is the job above the
// fold, where a price line reads as a disclaimer. The price still appears, in
// the pricing section, where someone goes looking for it.
//
// The row held the founders' photographs until the owner asked for faces off
// the page; it carries the company marks now, same companies, same order.
must(/class="hp-faces"/.test(markup), 'the hero proof row is missing');
const proofRow = (markup.match(/<div class="hp-faces"[\s\S]*?<\/div>/) || [''])[0];
// Five companies, in the order the owner set, matching the ribbon below.
must(count(/class="hp-tip"/g) === 5, 'expected five customer chips, each with a tooltip');
const chipMarks = [...proofRow.matchAll(/<img [^>]*src="([^"]+)"/g)].map((m) => m[1]);
must(chipMarks.length === 5, `expected five company marks in the hero row, found ${chipMarks.length}`);
// No face may come back here by accident: /trust/people/* is the photograph
// directory and nothing on this page is allowed to point into it any more.
for (const src of chipMarks) {
  must(src.startsWith('/trust/'), `a hero chip is not one of the customer marks: ${src}`);
  must(!src.startsWith('/trust/people/'), `a founder's photograph is back in the hero row: ${src}`);
}
must(!/\/trust\/people\//.test(markup), 'a founder photograph is still on the page');
must(!/<img [^>]*alt="[^"]/.test(proofRow), 'a chip carries its own alt; the row is already labelled');
const order = [...proofRow.matchAll(/class="hp-tip">([^<]+)/g)].map((m) => m[1]);
must(
  order.join('|') === 'Delitech|Apex Light|ajeeb|Ecom|Oleez Online',
  `the hero chips are in the wrong order: ${order.join(', ')}`,
);
must(/aria-label="[^"]*Ved Patel of Delitech[^"]*Oleez Online[^"]*"/.test(proofRow), 'the hero chip row no longer names the companies to a screen reader');
for (const [brand, person] of [['Delitech', 'Ved Patel']]) {
  must(proofRow.includes(`${brand}<em>${person}</em>`), `the tooltip does not name ${person} under ${brand}`);
}
// The chips sit side by side at their own widths, so a wordmark is never
// cropped into a circle. No overlap means no z-index ladder to order.
must(/\.hp-ph\{[^}]*object-fit:contain/.test(html), 'a hero chip mark is being cropped rather than fitted');

// --- No invented or misleading rating ---
// A rating was banned outright while the only one available would have been
// invented. The owner read the live TrustScore off Trustpilot on 10 Oct and it
// is in the generator, so the rule is "no score but that one": any x.y in the
// page's own words must be the sourced number, so a stale page fails here
// rather than quietly overstating. Stars are drawn, never typed.
const prose = withoutQuotes.replace(/<[^>]+>/g, '');
must(!/★/.test(prose), 'uses a typographic star; the rating is drawn from TRUSTPILOT');
const scores = [...prose.matchAll(/\b([0-5]\.\d)\b(?!\d)/g)].map((m) => m[1]);
for (const n of scores) must(n === TRUSTPILOT_SCORE, `states a rating of ${n}; the sourced TrustScore is ${TRUSTPILOT_SCORE}`);
// The star row renders only from a sourced score, and names its source.
const starRow = (markup.match(/<p class="hp-stars[^"]*">[\s\S]*?<\/p>/) || [''])[0];
must(starRow !== '', 'the star row is gone');
must(/<svg/.test(starRow) === /\d\.\d/.test(starRow), 'stars without a sourced score, or a score without stars');
must(/Trustpilot/.test(starRow), 'the star row does not say where the rating comes from');
// A row of stars is a rating claim, so there is exactly one on the page and it
// has to be the sourced one: beside the number, linked to the page it came
// from, and with as many filled boxes as the number says. Five filled stars
// next to a 4.0 is the misrepresentation this rule exists for. All five boxes
// share one <svg> and one <path>, so the count is of boxes, not of svgs.
must(count(/class="st"/g) === 1, 'expected one five-star row, drawn by starRow');
// Scoped to the row's own svg: the Trustpilot lockup beside it draws the same
// green star, and counting that one as a sixth filled box reads the score wrong.
const starSvg = (starRow.match(/<svg class="st"[\s\S]*?<\/svg>/) || [''])[0];
const boxes = (starSvg.match(/<rect /g) || []).length;
const filled = (starSvg.match(/fill="#00b67a"/g) || []).length;
const partial = (starSvg.match(/clip-path="inset\(/g) || []).length;
must(boxes - filled === 5, `the row draws ${boxes - filled} of 5 star boxes`);
must(
  filled - partial === Math.floor(Number(TRUSTPILOT_SCORE)) && partial === (Number(TRUSTPILOT_SCORE) % 1 ? 1 : 0),
  `the star row shows ${filled} filled of 5, which does not read as ${TRUSTPILOT_SCORE}`,
);
must(/#dcdce6/.test(starSvg), 'the unfilled stars are missing; a 4.0 drawn as four stars alone reads as four out of four');
// The count is off the visible line on the owner's instruction. It may be
// withheld, not contradicted: it stays in the accessible text, the rating
// still links to the page that prints it, and no larger number may appear.
const vh = (markup.match(/<i class="vh">[\s\S]*?<\/i>/) || [''])[0];
must(new RegExp(`from ${TRUSTPILOT_REVIEWS} reviews`).test(vh), 'the review count is gone from the accessible text as well as the visible line');
must(!/class="vh"/.test(markup.replace(/<i class="vh">[\s\S]*?<\/i>/g, '')) , 'a second visually hidden run appeared; keep one place for text that is said and not drawn');
const counts = [...prose.matchAll(/([\d,]+)\s+reviews?\b/gi)].map((m) => m[1]);
for (const n of counts) must(n === TRUSTPILOT_REVIEWS, `states ${n} reviews on the page; the sourced count is ${TRUSTPILOT_REVIEWS}`);
must(/trustpilot\.com\/review\/topedgeai\.com/.test(starRow), 'the rating does not link to the page it came from');
// Trustpilot's name carries Trustpilot's mark, not a violet text link: the
// green star is the half of the lockup a reader recognises without reading.
const lockup = (starRow.match(/<a class="tp"[\s\S]*?<\/a>/) || [''])[0];
must(lockup !== '', 'the Trustpilot name is not set as its lockup');
must(/<svg[\s\S]*fill="#00b67a"/.test(lockup), 'the lockup has lost the green star');
must(/\.tp\{[^}]*color:#191919/.test(html), 'the Trustpilot wordmark is painted in a colour that is not theirs');
must(!/[❤♥💖]|&#10084;/.test(markup), 'an emoji is back in the trust copy');

// --- The band under the hero ---
// The band is where a customer wordmark can be read at full size; the hero row
// above shows the same five companies as chips. Each mark needs its own alt
// here. Older marks are white-on-transparent and newer ones black; the band
// paints both with brightness(0), so the suffix differs by file.
const strip = (markup.match(/<ul class="trust-marks[^"]*">[\s\S]*?<\/ul>/) || [''])[0];
must(strip !== '', 'the band under the hero is gone');
for (const logo of [
  'delitech-white',
  'apex-white',
  'ajeeb-black',
  'ecom-black',
  'oleez-black',
]) {
  must(strip.includes(`/trust/${logo}.png`), `the band is not showing the ${logo} logo`);
}
// The ribbon holds four copies of the five marks so the loop has no seam.
// Exactly one copy is announced: a screen reader hearing the same five
// companies four times is worse than hearing them none.
const marks = strip.match(/<li[^>]*>\s*<img [^>]*>/g) || [];
must(marks.length === 20, `expected four copies of five logos in the ribbon, found ${marks.length}`);
const named = marks.filter((m) => !/aria-hidden/.test(m));
must(named.length === 5, `${named.length} logo copies are announced; exactly one copy should be`);
for (const m of named) must(/\balt="[^"]{4,}"/.test(m), 'an announced logo in the ribbon has no alt text');
for (const m of marks.filter((m) => /aria-hidden/.test(m))) {
  must(/\balt=""/.test(m), 'a duplicated logo in the ribbon has alt text; the copies are decoration');
}
must(/<div class="mq"[^>]*aria-label=/.test(markup), 'the ribbon has no label');
must(/@keyframes mq\{/.test(html) && /animation:mq /.test(html), 'the ribbon does not scroll');
must(/prefers-reduced-motion[\s\S]*?\.trust-marks\{[^}]*flex-wrap:wrap/.test(html), 'the ribbon still scrolls under reduced motion');
// Four marks are narrower than a desktop viewport, so one copy has to be longer
// than the widest window the ribbon gets or the same mark shows twice at once.
// Full bleed, and the duplicate marks that come with it are the accepted
// cost: four logos in a capped window is a huddle in the middle of an empty
// band. What still has to hold is that the track travels exactly one copy, so
// the loop has no seam, which the sweep measures at every width.
// 70% of the page on desktop, faded at both ends. Full bleed read as two
// bars running off the page rather than as a band the page contains, and the
// narrower window also keeps the track longer than the window at every size,
// which is what stops a blank opening mid-lap. The sweep measures that.
must(/@media\(min-width:900px\)[\s\S]*?\.mq,\.tk\{width:70%\}/.test(html), 'the two marquees are no longer 70% of the page on desktop');
for (const sel of ['\\.mq', '\\.tk']) {
  must(new RegExp(`${sel}\\{[^}]*mask-image:linear-gradient\\(90deg,transparent,#000 9%,#000 91%,transparent\\)`).test(html), `${sel} is not faded at both ends`);
}
must(/@keyframes mq\{from\{transform:translateX\(0\)\}to\{transform:translateX\(-25%\)\}\}/.test(html), 'the ribbon travel no longer matches its four copies; the loop will jump');
// The band is flat white and the hero's gradient stops on its own edge, so the
// two meet on a line. The owner asked for the line after seeing the version
// where the violet bled down into the band and neither surface had an edge.
must(/\.trust\{[^}]*background:#fff\}/.test(html), 'the band is not flat white; the hero gradient is bleeding into it again');
must(/\.hero\{[^}]*#a78bfa 82%,#a78bfa 100%\)/.test(html), 'the hero gradient no longer ends on a flat violet, so it has no bottom edge');
must(/\.trust-marks img\{[^}]*height:34px/.test(html), 'the ribbon marks changed size');
must(/\.trust-marks img\{[^}]*opacity:\.9\d/.test(html), 'the customer marks faded out again; the owner asked for them properly black');
must(/\.trust-marks img\{[^}]*filter:brightness\(0\)/.test(html), 'the logos are not painted dark for the white band');
// The platform marks answer "who bills me", which is a question asked at a price.
const badgeRow = (markup.match(/<ul class="badges">[\s\S]*?<\/ul>/) || [''])[0];
must(badgeRow !== '', 'the platform marks are gone');
must(at(/<ul class="badges">/) > at(/<section[^>]*id="pricing"/), 'the platform marks belong beside the price, not above it');
must((badgeRow.match(/<img /g) || []).length === 3, 'expected the three platform marks');
must(/\.badges img\{[^}]*height:96px/.test(html), 'the platform marks shrank back; they were sized up to be read, not noticed');
for (const img of badgeRow.match(/<img [^>]*>/g) || []) {
  must(/height="96"/.test(img), 'a platform mark ships the wrong intrinsic height, so it will shift on load');
}
for (const img of badgeRow.match(/<img [^>]*>/g) || []) {
  must(/\balt="[^"]{8,}"/.test(img), 'a platform mark has no alt text');
}

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
for (const h of ['0% Meta API markup', 'Unlimited journey runs', 'stitched live across browsing sessions', 'COD to prepaid conversion journey']) {
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
// The three review texts, pinned here as a second copy of what is on
// Trustpilot. Two were corrected against the live page on 13 Oct 2026 by the
// owner: our transcription had softened Tirth P.'s wording and elided a clause
// from Robin's. The page tells the reader these are quoted as published, so
// this list is the thing that has to be true, and a reword in the generator
// that nobody checked against Trustpilot fails here rather than shipping.
const quotes = [
  ["The overall software experience is top-notch, it's Indian software but feels like US Grade software quality.", 'Tirth P.'],
  ['Topedge helped me a lot to solve issues with my ecomm business like abandoned cart followups, complete tracing of what a lead did and where it dropped off. Their support team is very helpful.', 'Shubham P.'],
  ["In 2 days their team built me everything on the software... I'm on their ₹1,999 base plan, and mostly every feature is unlocked on every plan.", 'Robin'],
];
const quoteCards = markup.match(/<blockquote[\s\S]*?<\/blockquote>/g) || [];
for (const [text, author] of quotes) {
  must(html.includes(text), `quote not verbatim: ${author}`);
}
for (const [, author] of quotes) {
  must(markup.includes(author), `quote missing its author: ${author}`);
}
must(quoteCards.length === 3, `expected the three review cards, found ${quoteCards.length}`);
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
// A reader who has just been told why people switch should hear from the
// people who did, before being shown the five things they get.
must(at(/What sellers say on/) < at(/<section[^>]*id="platform"/), 'the reviews belong above the platform grid');
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
