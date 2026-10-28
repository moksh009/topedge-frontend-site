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
import { build as esbuild } from 'esbuild';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadBillingCatalog, resolveViteEnv } from './load-billing-catalog.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

/** Third-party proof, shared with the React site. See the file's own _comment. */
const SOCIAL_PROOF = JSON.parse(
  fs.readFileSync(path.join(root, 'src/marketing/data/socialProof.json'), 'utf8'),
);
const lpDir = path.join(__dirname, 'lp');
/**
 * Byte budget for the whole page, inline CSS and inline JS included.
 *
 * It was 60 KB when the page argued one feature. It is 88 KB now, and the extra
 * buys the entire illustration layer: every panel on this page is markup and CSS
 * rather than a screenshot, including the layered compositions inside the five
 * platform panels. The four dashboard screenshots this replaced were 83 KB of
 * webp on their own, and they went soft on a retina screen and stale whenever a
 * button moved; the drawings do neither, and they compress. 88 KB of HTML is
 * about 12 KB over the wire after Brotli, and the page still makes no external
 * request before first paint.
 *
 * This is not a licence to grow. If an edit needs more than this, cut something.
 */
// Raised from 88 KB on 13 Oct 2026, when the hero took on the value ticker and
// the three anchors and the comparison copy roughly doubled. A budget that
// moves whenever it binds is not a budget, so: it moves when the page is asked
// to carry more, never to make room for slack. The last three times it bound,
// what paid for the content was finding waste (five star svgs collapsed into
// one, markup indentation stripped from the output), and that is still the
// first thing to try.
const MAX_BYTES = 100 * 1024;

const { FALLBACK_CATALOG, TRIAL, planBlurb, planFeatureKicker, dispatchLabel, planPricing, DASH_SIGNUP } =
  await loadBillingCatalog();
const plans = FALLBACK_CATALOG.plans;
/**
 * The no-JS fallback href for a trial CTA.
 *
 * attribution.js overwrites every one of these the moment it runs, adding the click
 * ids and the chosen plan/cycle. This value is what a visitor with JavaScript off
 * clicks, so it points at the same destination rather than the www /signup route —
 * there is no reason to make anyone pay for a 758 KB redirect page.
 */
const SIGNUP_FALLBACK = (slug) => `${DASH_SIGNUP}?lp=${slug}&from=www`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');


// Single source for company facts: read the string constants from companyIdentity.ts so this
// page cannot drift from the site. Fails the build if one is missing.
const identitySrc = fs.readFileSync(path.join(root, 'src/marketing/legal/companyIdentity.ts'), 'utf8');
function identity(name) {
  const m = identitySrc.match(new RegExp(`export const ${name} =\\s*'([^']+)'`));
  if (!m) throw new Error(`companyIdentity.ts: ${name} not found`);
  return m[1];
}
/** Same source, for the constants declared as an array or an object literal. */
function identityList(name) {
  const m = identitySrc.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\]`));
  if (!m) throw new Error(`companyIdentity.ts: ${name} not found`);
  return [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]);
}
function identityMap(name) {
  const m = identitySrc.match(new RegExp(`export const ${name} = \\{([\\s\\S]*?)\\}`));
  if (!m) throw new Error(`companyIdentity.ts: ${name} not found`);
  return Object.fromEntries([...m[1].matchAll(/(\w+):\s*'([^']+)'/g)].map((x) => [x[1], x[2]]));
}

const SHOPIFY_URL = identity('COMPANY_SHOPIFY_APP_URL');
const LEGAL_NAME = identity('COMPANY_LEGAL_NAME');
const COMPANY_EMAIL = identity('COMPANY_EMAIL');
const COMPANY_PHONE = identity('COMPANY_PHONE');
const COMPANY_PHONE_E164 = identity('COMPANY_PHONE_E164');
// COMPANY_WHATSAPP_URL is built from a template literal in the source, so it is rebuilt
// the same way here rather than read as a string. Throws if that shape ever changes.
const WHATSAPP_MSG = (identitySrc.match(/COMPANY_WHATSAPP_URL =[\s\S]{0,120}?encodeURIComponent\(\s*'([^']+)'/) || [])[1];
if (!WHATSAPP_MSG) throw new Error('companyIdentity.ts: COMPANY_WHATSAPP_URL message not found');
const WHATSAPP_URL = `https://wa.me/${COMPANY_PHONE_E164}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

// The FAQ is gone. Six accordions at the bottom of an ad page answer objections to
// nobody: the visitor who still has a question wants a person, and this audience already
// lives on WhatsApp. The thread opens prefilled so the merchant does not have to explain
// where they came from, and so the reply can pick up the context.
const HELP_MSG =
  'Hi TopEdge, I have a question about WhatsApp COD confirmation for my Shopify store.';
const HELP_WHATSAPP_URL = `https://wa.me/${COMPANY_PHONE_E164}?text=${encodeURIComponent(HELP_MSG)}`;
const ADDRESS_LINES = identityList('COMPANY_ADDRESS_LINES');
const SOCIAL = identityMap('COMPANY_SOCIAL');

const TRIAL_SHORT = `${TRIAL.days}-day free trial on every plan. ${TRIAL.orders} free order confirmations, no credit card.`;

// ---- data for the redesigned page ----

/**
 * Hero headline per ad group. utm_content that starts with a key selects that
 * variant. The page is bought on platform terms as well as COD terms now, so
 * the default sells the subscription and the narrower ad groups keep their own
 * promise. Each headline is a lead plus a marked phrase, because the site
 * highlights the payload of a title rather than colouring the whole line.
 *
 * This is the whole reason there is one ad page and not five. An ad must land on
 * a page that repeats the promise the ad made, or the click is wasted — but at
 * this budget five separate pages would split a few hundred clicks a month into
 * samples too small to read, and each would rot separately. Swapping the hero per
 * ad group buys the message match at the point the visitor actually looks, and
 * every variant inherits the same proof, pricing and speed budget below the fold.
 *
 * A variant is added only when the ad group's promise genuinely differs. Adding
 * one costs a line here; adding a page costs a build.
 */
const HERO_VARIANTS = {
  platform: {
    lead: 'Shopify Growth Suite ',
    mark: 'TopEdge',
    sub: 'WhatsApp cart recovery, COD-to-prepaid RTO reduction and automated customer journeys for Shopify brands, plus 20 more features in one suite.',
  },
  cod: {
    lead: 'Confirm COD orders before you ',
    mark: 'ship them',
    sub: 'The buyer taps Confirm or Cancel in seconds, and the rest of the platform comes with it. Built for Indian Shopify D2C brands.',
  },
  cart: {
    lead: 'Win back the carts that ',
    mark: 'walked out',
    sub: 'A reminder on WhatsApp while the cart is still warm, plus the rest of the platform. Built for Indian Shopify D2C brands.',
  },
  // AG2/AG3. Problem-aware traffic: the searcher has already named the loss, so
  // the hero names it back rather than selling a feature.
  rto: {
    lead: 'Every returned COD parcel is paid for ',
    mark: 'twice',
    sub: 'Confirm on WhatsApp before dispatch, and move the buyers who say yes onto prepaid. Built for Indian Shopify D2C brands.',
  },
  // C3. Competitor-alternative searchers arrive mid-comparison and want the price
  // they could not find on the page they came from.
  switch: {
    lead: 'The whole platform, priced ',
    mark: 'in the open',
    sub: 'Every plan lists its price, Meta fees pass through at cost, and you can start without booking a demo. Built for Indian Shopify D2C brands.',
  },
};

/**
 * Verbatim Trustpilot reviews, retrieved 6 Oct 2026. Do not edit the text: they
 * are published under these authors' names, so a tidy-up is a misquote of a
 * real person. check-landing-pages.mjs holds its own second copy and fails the
 * build if the two diverge.
 */
const QUOTES = SOCIAL_PROOF.trustpilot.quotes;

/**
 * One glyph per comparison row, redrawn 13 Oct 2026. The old set was drawn by
 * hand and it showed at 20px: the dollar was an open S that did not close on
 * its stem, and the refresh arrows were two bare right angles floating off the
 * ends of the curves, which read as a squiggle rather than a loop. These are
 * the Lucide shapes at Lucide's own proportions, two or three paths each, all
 * on the same 24px grid and the same stroke.
 */
const ICONS = {
  // percent, not a currency sign: the row is about a markup, and the markup is
  // the number a reader is checking for.
  percent: '<line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  // the same workflow glyph the setup step uses, because it is the same idea
  flow: '<rect x="3" y="3" width="8" height="8" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect x="13" y="13" width="8" height="8" rx="2"/>',
  identity: '<circle cx="10" cy="8" r="4.5"/><path d="M2.5 20.5a8 8 0 0 1 12.2-5.2"/><path d="m16 19 2 2 4-4"/>',
  // a return arrow: RTO is the parcel coming back, and recovery is stopping it
  ret: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
};

/**
 * The block under the hero, keyed on the same variant string.
 *
 * Every figure here is sourced and the source is printed next to it. Two come
 * from research already cited in our own blog: Baymard's cart-abandonment
 * average, and the Unicommerce/Shipway RTO read across 410M+ shipments. The
 * RTO one is the strongest number on the page because it is the mechanism this
 * product sells: the brands at 21% are the ones verifying orders.
 *
 * The courier arithmetic is labelled illustrative because it is: those are
 * round numbers to show the shape of the loss, not anyone's real rate card.
 */
const PROOF_VARIANTS = {
  platform: {
    h: '100% asset ownership. 0% WhatsApp API markup.',
    p: 'Stop paying a hidden 20% to 30% markup on every customer message. TopEdge AI connects straight to your own Meta Business account, so you pay Meta directly at cost. Your phone numbers, subscriber database, templates and green tick verification stay under your brand\u2019s control. We charge for the software suite only.',
    stat: '0%',
    // The mark earns its place on this one: the figure is about who bills you,
    // and Meta's own symbol says that faster than the label under it.
    statMark: '/brand/meta-mark.webp',
    statLabel: 'added to what Meta charges you',
    src: 'Meta bills your Business account at its own per-conversation rates. We charge for the software only.',
  },
  cod: {
    h: 'The brands that verify COD orders run half the RTO',
    p: 'Verification is the difference, and verification is one WhatsApp message before dispatch. Ask first and the parcels that leave your warehouse are the ones somebody still wants.',
    stat: '21% vs 39%',
    statLabel: 'RTO among brands that verify orders, against the network at festive peak',
    src: 'Unicommerce/Shipway, 410M+ shipments across 6,000+ brands: 39% at the November 2025 peak, 21% by February 2026 among brands that verify orders and optimise courier selection.',
  },
  rto: {
    h: 'Every refused parcel bills you twice',
    p: 'Freight out, freight back, and the handling in between, on an order that was never going to be paid for. The only cheap refusal is the one that never ships.',
    stat: '\u20b980 + \u20b980 + \u20b920',
    statLabel: 'out, back and handling: \u20b9180 gone per refused parcel',
    src: 'Illustrative courier rates, not a quoted tariff. At 50 refusals a month that is \u20b99,000 to ship what nobody wanted.',
  },
  cart: {
    h: 'Seven in ten carts are abandoned',
    p: 'Email gets opened tomorrow, if at all. A WhatsApp reminder while the cart is still warm reaches the buyer in the thread they already have open.',
    stat: '70.22%',
    statLabel: 'average online cart abandonment',
    src: 'Baymard Institute, average across 50 published studies, baymard.com/lists/cart-abandonment-rate, updated September 2025.',
  },
  switch: {
    h: 'You are paying a markup on messages Meta already bills you for',
    p: 'Most tools add a per-message fee on top of Meta\u2019s, then meter your automation runs and ration them as you grow. We do neither.',
    stat: '0%',
    statLabel: 'markup on Meta\u2019s message fees, on every plan',
    src: 'Flow automations run unlimited times on every plan, and nothing is metered by us.',
  },
};

/**
 * The four claims this audience checks before paying, as a comparison rather
 * than prose. The old version set each one as a struck-through line, a heading
 * and a paragraph, which made the reader assemble the contrast themselves; at
 * a glance it read as four more paragraphs. A two-column table does the work
 * for them: topic on the left, what they are used to in the middle, what
 * happens here on the right, in a column that is tinted so the eye lands on it.
 *
 * Nobody is named. "A typical WhatsApp tool" is the comparison, which is both
 * the honest framing (these are common practices, not one company's) and the
 * only one this page's contract allows.
 */
const SWITCH = [
  {
    icon: 'percent',
    topic: 'WhatsApp API pricing',
    them: 'A hidden 20% to 30% per-message tax on top of the official Meta conversation rate',
    us: '0% Meta API markup. Meta bills you directly, and the number and templates stay yours.',
  },
  {
    icon: 'flow',
    topic: 'Flow automation',
    them: 'Metered flow runs, charged for again once you pass the allowance',
    us: 'Unlimited journey runs, cart recovery triggers and workflows, on every plan.',
  },
  {
    icon: 'identity',
    topic: 'Unified identity',
    them: 'A duplicate record every time a buyer checks out with a different number or email',
    us: 'One customer profile holding primary and alternate numbers and emails, stitched live across browsing sessions and past Shopify orders.',
  },
  {
    icon: 'ret',
    topic: 'RTO recovery',
    them: 'A delayed text notification that tells the buyer nothing is changing',
    us: 'Confirm COD orders on WhatsApp, run a COD to prepaid conversion journey, and more.',
  },
];

/**
 * The three states a visitor arrives in off a search ad: carrying a problem,
 * curious what the product is, or ready to start. One hero cannot speak to all
 * three, so the page forks here and each fork goes somewhere real. The artwork
 * under each card is markup and CSS, not a screenshot, so it stays sharp at any
 * width and costs nothing to download.
 */
const PATHS = [
  {
    h: 'COD and RTO are eating the margin',
    p: 'Parcels go out, come back, and the courier bills you both ways.',
    cta: 'See what it costs you',
    href: '#compare',
    solid: false,
    art: `<div class="art" aria-hidden="true">
          <span class="orb orb--warn"></span>
          <span class="ch">Orders nobody wanted<i>&times;</i></span>
          <span class="ch">Refused at the door<i>&times;</i></span>
          <span class="ch">Return freight<i>&times;</i></span>
          <span class="ch">Stock stuck in transit<i>&times;</i></span>
        </div>`,
  },
  {
    h: 'Must-use D2C suite',
    p: 'Journeys, campaigns, a shared inbox and a flow builder, on every plan.',
    cta: 'Explore the platform',
    href: '#platform',
    solid: false,
    art: `<div class="art art-rows" aria-hidden="true">
          <span class="orb orb--c"></span>
          <div class="rw"><b>&#10003;</b><span>COD order confirmation</span><em class="sw-on"></em></div>
          <div class="rw"><b>&#10003;</b><span>Abandoned cart recovery</span><em class="sw-on"></em></div>
          <div class="rw"><b>&#10003;</b><span>COD to prepaid nudge</span><em class="sw-on"></em></div>
          <div class="rw rw--off"><b>+</b><span>Campaign broadcast</span><em></em></div>
        </div>`,
  },
  {
    h: 'I am ready to start today',
    p: 'Install from the Shopify App Store and switch on your first journey today.',
    cta: 'Start free trial',
    href: null,
    solid: true,
    art: `<div class="art art-chat" role="img" aria-label="Example WhatsApp message to a buyer: Hi Priya, your order #1042 is Cash on Delivery for ₹1,499. Confirm it and we ship today. Two buttons follow, Confirm order and Cancel order, then a confirmation that the order ships today.">
          <span class="orb orb--wa"></span>
          <p class="chead"><i class="wa-dot"></i>Your store</p>
          <p class="cb">Hi Priya, your order #1042 is Cash on Delivery for ₹1,499. Confirm it and we ship today.</p>
          <div class="cq"><span class="is-on">Confirm order</span><span>Cancel order</span></div>
          <p class="ok">&#10003; Confirmed &middot; shipping today</p>
        </div>`,
  },
];

/**
 * The five jobs the subscription does, which is what the ad is now bought for.
 * The old page argued one feature and then had to admit at the bottom that the
 * product was bigger; this says it once, at the size the claim deserves. Every
 * illustration is drawn in CSS: no screenshot to re-cut when a button moves.
 * The sample values inside them are labelled illustrative under the grid.
 */
const WA_GLYPH =
  '<svg viewBox="0 0 24 24" width="22" height="22" fill="#fff" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.8.8-1 1.9-.7 3a7.6 7.6 0 0 0 1.6 2.8 9.2 9.2 0 0 0 4.4 3.1c1.4.4 2.2.3 2.9.2.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.4-.3z"/></svg>';

const BENTO = [
  {
    w: true,
    h: 'Win back the carts that leave',
    p: 'A reminder on WhatsApp while the cart is still warm, then one more the next day. Shopify tells us the cart; the buyer replies in the thread they already use.',
    viz: `<div class="viz">
          <span class="orb orb--l"></span>
          <div class="stage">
            <div class="pane pane--hero">
              <p class="k">Recovered this month <i>sample</i></p>
              <p class="big">&#8377;4,18,700</p>
              <p class="spark"><i style="height:34%"></i><i style="height:52%"></i><i style="height:41%"></i><i style="height:68%"></i><i style="height:59%"></i><i style="height:86%"></i><i style="height:100%"></i></p>
            </div>
            <div class="pane pane--wa">
              <p class="wa-h"><i class="wa-dot"></i>WhatsApp</p>
              <p class="wa-b">Still thinking about the Linen Shirt? Your cart is saved.</p>
              <p class="wa-cta">Resume checkout</p>
            </div>
          </div>
        </div>`,
  },
  {
    w: true,
    h: 'Confirm COD before you ship',
    p: 'One message the moment the order lands. The buyer confirms, cancels, or pays online instead, and you decide what each answer does to the order in Shopify.',
    viz: `<div class="viz">
          <span class="orb orb--r"></span>
          <div class="stage">
            <div class="pane pane--ord">
              <p class="ord-h"><span class="thumb"></span><span><b>Linen Shirt</b><em>Olive &middot; M &middot; &#8377;1,499</em></span></p>
              <p class="ord-f"><span class="tag tag--cod">Cash on delivery</span><span class="tag tag--ok">&#10003; Confirmed</span></p>
            </div>
            <div class="pane pane--ask">
              <p class="wa-b">Confirm order #1042 so we can ship it today.</p>
              <span class="ask-btns"><i class="is-on">Confirm</i><i>Cancel</i></span>
            </div>
          </div>
        </div>`,
  },
  {
    w: false,
    h: 'Broadcast to the right people',
    p: 'Segment by what they bought, when they last ordered, or where they dropped off.',
    viz: `<div class="viz viz--mid">
          <span class="orb orb--c"></span>
          <div class="orbit">
            <span class="ring ring--1"></span><span class="ring ring--2"></span>
            <span class="core">${WA_GLYPH}</span>
            <span class="sat sat--1">Bought once</span>
            <span class="sat sat--2">90 days quiet</span>
            <span class="sat sat--3">Mumbai</span>
          </div>
          <div class="pane pane--aud"><b>2,418</b><span>in this segment</span></div>
        </div>`,
  },
  {
    w: false,
    h: 'See every step before the sale',
    p: 'The pages they opened, the product they lingered on, and where they dropped off, tied to the same WhatsApp thread.',
    viz: `<div class="viz">
          <span class="orb orb--c"></span>
          <div class="pane pane--trail">
            <p class="brow"><i></i><i></i><i></i><span>yourstore.com</span></p>
            <ol class="trail">
              <li><b></b><span>Viewed Linen Shirt<em>2:14</em></span></li>
              <li><b></b><span>Added to cart<em>2:16</em></span></li>
              <li class="is-drop"><b></b><span>Left at checkout<em>2:19</em></span></li>
            </ol>
          </div>
        </div>`,
  },
  {
    w: false,
    h: 'Flows you build by dragging',
    p: 'No developer, no theme edits, no checkout scripts. Branch on what the buyer did.',
    viz: `<div class="viz viz--grid">
          <span class="orb orb--c"></span>
          <div class="fl">
            <span class="nd nd--a">Cart abandoned</span>
            <span class="wire"></span>
            <span class="nd nd--b">Wait 45 minutes</span>
            <span class="wire"></span>
            <span class="fl-split"><span class="nd nd--c">Send reminder</span><span class="nd nd--d">Tag and wait</span></span>
          </div>
        </div>`,
  },
];


/**
 * Posts to send the visitor who is not buying today. Slugs only: the title, the
 * category, the read time and the image are read out of the real post data at
 * build time, so a renamed post fails the build instead of shipping a dead card.
 * None of these name a competitor, which this page may not do.
 */
const POST_SLUGS = [
  'how-to-reduce-rto-with-whatsapp-cod-confirmation',
  'whatsapp-abandoned-cart-recovery-shopify',
  'whatsapp-business-api-pricing-india',
];

/**
 * The value stack beside the price. It deliberately does not repeat the six
 * panels in the platform section: a visitor who has scrolled this far has read
 * those, and seeing them again as a tick list is the thing that makes a page
 * feel padded. These are the parts that never got a panel.
 */
/**
 * Grouped exactly as the pricing page groups it, and read from the catalog's
 * universalFeatures rather than retyped here: this list said six things while
 * the heading two inches above it said thirty, which is the page arguing with
 * itself in front of someone deciding whether to pay.
 *
 * The labels are the catalog's own, shortened only where the catalog is
 * verbose about a thing it names plainly elsewhere.
 */
const INCLUDED_GROUPS = [
  { title: 'Messaging', match: ['live chat', 'customer crm', 'flow builder', 'segments', 'broadcast campaigns', 'opt-in tools', 'intent detection', 'byok ai'] },
  { title: 'Commerce', match: ['order management', 'p&l analytics', 'discount codes', 'abandoned cart', 'website pixel', 'stock tracking', 'warranty assignment'] },
  { title: 'WhatsApp', match: ['meta templates', 'whatsapp qr', 'gst invoices'] },
];

// Keyed on the normalised label, and the same renames the pricing page makes
// in its own displayLabel, so a reader who checks both pages sees one product.
const INCLUDED_LABELS = {
  'abandoned cart 3-message': 'Cart recovery',
  'customer crm': 'Audience CRM',
  'broadcast campaigns': 'Campaigns',
  'order management': 'Orders',
  'warranty assignment': 'Warranty',
  'p&l analytics': 'P&L analytics',
  'discount codes': 'Discount codes',
  'intent detection': 'Intent detection',
};

// Marks that already sit in the site footer. An ad visitor has never heard of us.
const BADGES = [
  { src: '/badges/shopify-app-store.png?v=4', alt: 'Available on the Shopify App Store' },
  { src: '/badges/meta-business-partner.png?v=4', alt: 'Meta Business Partner' },
  { src: '/badges/whatsapp-cloud-api.png?v=5', alt: 'Built on the official WhatsApp Cloud API' },
];

/**
 * The five customers this page may name, as companies. The older files are
 * white-on-transparent and the newer ones black-on-transparent; base.css runs
 * every mark through brightness(0) for the light band either way, and nothing
 * recolours them into our own violet.
 */
const TRUST_LOGOS = [
  { src: '/trust/delitech-white.png', alt: 'Delitech' },
  { src: '/trust/apex-white.png', alt: 'Apex Light' },
  { src: '/trust/ajeeb-black.png', alt: 'ajeeb' },
  { src: '/trust/ecom-black.png', alt: 'Ecom' },
  { src: '/trust/oleez-black.png', alt: 'Oleez Online' },
];

/**
 * The same customers for the hero row, as company marks rather than faces.
 * The owner asked for the founders' photographs to come off the page: a logo
 * says which business is running this, which is the thing a cold Google click
 * is weighing, and it costs nobody their face on an ad landing page.
 *
 * Order matches TRUST_LOGOS, so the hero row and the ribbon below it name the
 * same companies in the same order. One chip per company — the two Apex Light
 * founders were two faces but they are one logo.
 *
 * `name` is optional and only filled where we were actually given one; the
 * tooltip falls back to the company alone rather than invent a person.
 */
const BRAND_CHIPS = [
  { logo: '/trust/delitech-white.png', name: 'Ved Patel', company: 'Delitech' },
  { logo: '/trust/apex-white.png', name: '', company: 'Apex Light' },
  { logo: '/trust/ajeeb-black.png', name: '', company: 'ajeeb' },
  { logo: '/trust/ecom-black.png', name: '', company: 'Ecom' },
  { logo: '/trust/oleez-black.png', name: '', company: 'Oleez Online' },
];

// The site footer, minus the Compare column (this page may not name a competitor, and
// paid traffic should not be sent shopping) and the newsletter form (a second form
// competes with the trial for the same click). Docs point at the dashboard, which is
// where the documentation lives since the marketing copy was removed.
const FOOT_COLUMNS = [];

// Same brand fills the site footer uses. Instagram's real mark is a radial gradient;
// a single mid-gradient magenta reads the same at 16px and costs no gradient def.
const SOCIAL_ICONS = {
  linkedin: '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"/>',
  instagram: '<path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>',
  youtube: '<path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>',
};

/**
 * The pricing card from the site, not a second design.
 *
 * Two things here are load-bearing for the ad economics. Annual is the only
 * cycle where a click at 40-70 rupees clears on the first payment, so the card
 * leads with the yearly effective price and states the saving as a rupee
 * figure rather than a percentage, which is what actually moves people onto
 * annual. The old note said "billed yearly" twice and left the reader doing
 * arithmetic to check it.
 *
 * The gate note on Launch exists because the COD and RTO ad groups promise
 * COD-to-prepaid and Launch does not include it, so the cheapest plan silently
 * fails the promise the ad made. Saying so on the card is the honest patch.
 * The real fix is to move the feature into Launch, which is a change to the
 * billing catalog and the live plan config, not to this file: check-catalog-drift
 * compares FALLBACK_CATALOG's feature flags against the live API, so flipping
 * it here alone would ship a promise the backend does not honour. Same shell/panel/meters
 * structure and class names as `PlanGrid` + pricing.css, including the per-plan CTA
 * and the locked rows, so a visitor who later opens /pricing sees the same object.
 * React swaps on the billing cycle; here both cycles are in the HTML and the toggle
 * flips which one shows, so the page is correct before any script runs.
 */
const INR = (n) => Number(n).toLocaleString('en-IN');

function planMeters(p) {
  return [
    { text: `${INR(p.ordersPerCycle)} orders / month`, locked: false },
    { text: `${INR(p.campaignEmailSendsPerCycle)} campaign + email sends / month`, locked: false },
    { text: 'Journey Branch', locked: !p.features.journeyBranch },
    { text: 'COD to prepaid', locked: !p.features.journeyCodPrepaid },
    { text: dispatchLabel(p.features.dispatchPriority), locked: false },
  ];
}

const TICK = '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
const LOCK = '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';

function planCards(slug) {
  return plans
    .map((p) => {
      const y = planPricing(p, 'yearly');
      const m = planPricing(p, 'monthly');
      const cls = `mkt-plan mkt-plan--${p.slug}${p.emphasis ? ' mkt-plan--emphasis' : ''}`;
      const meters = planMeters(p)
        .map(
          (row) => `<li${row.locked ? ' class="is-locked"' : ''}><span class="mkt-plan__mark" aria-hidden="true">${row.locked ? LOCK : TICK}</span><span>${esc(row.text)}</span>${row.locked ? '<span class="sr">not included</span>' : ''}</li>`,
        )
        .join('');
      return `      <article class="${cls}">
        <div class="mkt-plan__shell">
          <div class="mkt-plan__panel">
            <div class="mkt-plan__title-row">
              <h3 class="mkt-plan__name">${esc(p.displayName)} Plan</h3>${p.emphasis ? '<span class="mkt-plan__badge">Most popular</span>' : ''}
            </div>
            <div class="mkt-plan__price-row">
              <p class="mkt-plan__price"><span class="p-yearly">${esc(y.effectiveMonthlyLabel)}</span><span class="p-monthly">${esc(m.effectiveMonthlyLabel)}</span></p>
              <span class="mkt-plan__period">per month</span>
            </div>
            <p class="mkt-plan__billing-note"><span class="p-yearly">${esc(y.billedLabel)} billed once a year <b class="save">save ${esc(y.saveLabel)}</b><em>Prefer monthly? ${esc(p.monthlyPriceLabel)}/mo</em></span><span class="p-monthly">${esc(p.monthlyPriceLabel)} every month, cancel anytime<em>Yearly works out at ${esc(y.effectiveMonthlyLabel)}/mo and saves ${esc(y.saveLabel)}</em></span></p>
            <p class="mkt-plan__blurb">${esc(planBlurb(p.slug))}</p>
            <a class="mkt-plan__cta mkt-plan__cta--${p.emphasis ? 'solid' : 'ghost'}" data-cta="trial" data-plan="${esc(p.slug)}" href="${SIGNUP_FALLBACK(slug)}">Start with ${esc(p.displayName)} <span aria-hidden="true">&rarr;</span></a>
          </div>
          <div class="mkt-plan__features">
            <p class="mkt-plan__kicker">${esc(planFeatureKicker(p.slug))}</p>
            <ul class="mkt-plan__meters">${meters}</ul>${
              p.features.journeyCodPrepaid
                ? ''
                : '<p class="mkt-plan__gate">COD to prepaid is on Growth and above.</p>'
            }
          </div>
        </div>
      </article>`;
    })
    .join('\n');
}

// The plan lists six questions. Answers about Meta approval and COD to prepaid keep the wording
// already verified on this page; the rest follow the plan with em dashes removed.
// The Trustpilot mark, as a logo lockup only. No per-review star rating is rendered
// anywhere: the published reviews give the text and the author, not the score each one
// carried, and a star row is a score claim. Real stars need the TrustBox embed and the
// business unit id (see Open items), or the per-review ratings from the owner.
/**
 * The real Trustpilot widget, which is the only honest way to show a star rating here.
 * Trustpilot owns the score; the published review page gives the text and the author but
 * not the rating each review carried, so a star row drawn by hand would be invented and a
 * "rated X out of 5" line would be a number nobody can source. The widget renders both
 * live, and keeps itself current.
 *
 * `businessUnitId` comes from the owner's Trustpilot Business account under
 * Integrations > TrustBox; it cannot be read off the public page. While it is empty the
 * verbatim cards below render on their own and no Trustpilot script is requested at all.
 * Once it is set, the cards become the widget's fallback content: they are what shows
 * before the script lands and if it never does, so the proof never disappears.
 */
/**
 * The live TrustScore and the published reviews now live in
 * src/marketing/data/socialProof.json, because the pricing and customers pages
 * show the same numbers and the same three reviews. Two copies of a sourced
 * figure is one copy that goes stale; `asOf` is when a human last looked.
 */
const TRUSTPILOT = SOCIAL_PROOF.trustpilot;

const TP_GREEN = '#00b67a';
const TP_GREY = '#dcdce6';
const STAR_PATH = 'M12 1.6l3.1 7.2 7.8.6-5.9 5.1 1.8 7.6L12 18l-6.8 4.1 1.8-7.6L1.1 9.4l7.8-.6z';
// One star glyph for the whole page: the review cards mark and the lockup next
// to the rating draw the same file, so the mark cannot drift between them.
const TP_STAR = `<svg viewBox="0 0 24 24" width="14" height="14" fill="${TP_GREEN}" aria-hidden="true"><path d="${STAR_PATH}"/></svg>`;

function iconChip(name) {
  return `<span class="ic"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg></span>`;
}

const XMARK =
  '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
const CHECK =
  '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

const switchHtml = SWITCH.map(
  (w) => `      <div class="cmp-row">
        <p class="cmp-t">${iconChip(w.icon)}<span>${esc(w.topic)}</span></p>
        <p class="cmp-x"><i>${XMARK}</i>${esc(w.them)}</p>
        <p class="cmp-v"><i>${CHECK}</i>${esc(w.us)}</p>
      </div>`,
).join('\n');

const quoteCardsHtml = QUOTES.map(
  (q) => `      <blockquote class="card quote">
        <p class="tp-mark">${TP_STAR}<span>Trustpilot</span></p>
        <p class="tp-text">${esc(q.text)}</p>
        <footer>${esc(q.author)}</footer>
      </blockquote>`,
).join('\n');

const quotesHtml = TRUSTPILOT.businessUnitId
  ? `    <div class="trustpilot-widget" data-locale="${TRUSTPILOT.locale}" data-template-id="${TRUSTPILOT.templateId}" data-businessunit-id="${esc(TRUSTPILOT.businessUnitId)}" data-style-height="${TRUSTPILOT.height}" data-style-width="100%" data-theme="light">
      <div class="quotes">
${quoteCardsHtml}
      </div>
    </div>`
  : `    <div class="quotes">
${quoteCardsHtml}
    </div>`;

function pathsHtml(slug) {
  return PATHS.map(
    (c, i) => `      <article class="path" data-rv style="--d:${i * 90}ms">
        <div class="path-c"><h3>${esc(c.h)}</h3><p>${esc(c.p)}</p></div>
        <a class="go${c.solid ? ' go--solid' : ''}"${c.solid ? ' data-cta="trial"' : ''} href="${c.href === null ? SIGNUP_FALLBACK(slug) : c.href}">${esc(c.cta)} <span aria-hidden="true">&rarr;</span></a>
        ${c.art}
      </article>`,
  ).join('\n');
}

const bentoHtml = BENTO.map(
  (b, i) => `      <article class="bx bx--${b.w ? 'w' : 'n'}" data-rv style="--d:${i * 70}ms">
        <h3>${esc(b.h)}</h3>
        <p>${esc(b.p)}</p>
        ${b.viz}
      </article>`,
).join('\n');


const includedHtml = (() => {
  const norm = (s) => String(s).toLowerCase().replace(/[()]/g, '').replace(/\s+/g, ' ').trim();
  const left = [...(FALLBACK_CATALOG.universalFeatures || [])];
  const used = new Set();
  const groups = INCLUDED_GROUPS.map((g) => ({
    title: g.title,
    list: left.filter((f) => {
      const k = norm(f);
      if (used.has(k)) return false;
      if (!g.match.some((m) => k === m || k.includes(m))) return false;
      used.add(k);
      return true;
    }),
  })).filter((g) => g.list.length);
  // Anything the catalog adds that no group claims still has to appear, or a
  // new feature goes live and the page quietly stops listing it.
  const rest = left.filter((f) => !used.has(norm(f)));
  if (rest.length) groups[groups.length - 1].list.push(...rest);
  return groups
    .map(
      (g) =>
        `<div class="incl-g"><p class="incl-t">${esc(g.title)}</p><ul class="ticks">${g.list
          .map((f) => `<li>${esc(INCLUDED_LABELS[norm(f)] || f)}</li>`)
          .join('')}</ul></div>`,
    )
    .join('');
})();



/**
 * The variant proof block: all five in the markup, one shown.
 *
 * Which one is decided in CSS, off a `data-v` attribute the inline script in
 * the hero puts on <html> before the body is parsed, so the right block is
 * painted first rather than swapped in afterwards. A visitor never sees the
 * wrong statistic flash. With no match, or with JS off, the platform block is
 * what stands, which is also what a direct visitor should see.
 */
function proofHtml() {
  return Object.entries(PROOF_VARIANTS)
    .map(
      ([k, v]) => `      <div class="pf" data-pf="${k}">
        <div class="pf-stat"><p class="pf-fig">${
          v.statMark ? `<img src="${v.statMark}" alt="" width="128" height="87" loading="lazy" decoding="async">` : ''
        }<b>${v.stat}</b></p><span>${esc(v.statLabel)}</span></div>
        <div class="pf-copy">
          <h2>${esc(v.h)}</h2>
          <p>${esc(v.p)}</p>
          <p class="pf-src">${esc(v.src)}</p>
        </div>
      </div>`,
    )
    .join('\n');
}

/**
 * Going live, as the three things the merchant actually does. It answers the
 * question a founder with no developer asks before any other, and the answer
 * is genuinely good, so leaving it buried in a feature card's body copy was
 * wasting it.
 */
/**
 * Each step is marked by the thing it is about rather than by its number: the
 * Shopify bag, Meta's symbol, and the workflow glyph the site already uses for
 * Journeys. The marks carry no chip, border or tinted square, because a brand
 * logo in a box of our colour reads as our badge for their product.
 */
const WORKFLOW_MARK =
  '<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>';

const STEPS = [
  {
    mark: '<img src="/brand/shopify-mark.webp" alt="" width="112" height="132" loading="lazy" decoding="async">',
    h: 'Install from the Shopify App Store',
    p: 'One click from your admin. No theme edits and no code on the storefront.',
  },
  {
    mark: '<img src="/brand/meta-mark.webp" alt="" width="128" height="87" loading="lazy" decoding="async">',
    h: 'Connect your Meta Business account',
    p: 'It stays yours, and we take your templates through Meta approval with you.',
  },
  { mark: WORKFLOW_MARK, h: 'Switch on your first journey', p: 'COD confirmation is pre-built. Edit the wording and turn it on.' },
];

/**
 * The seven questions a merchant has at eleven at night, answered on the page
 * rather than pushed into a WhatsApp thread they will never open. Native
 * <details>, closed by default, so it costs nothing until it is used and works
 * with no JavaScript at all.
 *
 * Nothing here is softened. The order-limit answer and the migration answer
 * both state a limit, which is the point: a page willing to say what it does
 * not do reads as more honest than one that only sells.
 */
const FAQS = [
  {
    q: 'Will my WhatsApp number get banned?',
    a: 'Messages send on the official WhatsApp Cloud API, not an unofficial bridge, which is where bans come from. Every template is approved by Meta on your own Business account before it can send, so nothing goes out that Meta has not already cleared.',
  },
  {
    q: 'What does Meta actually charge me?',
    a: 'Meta bills your own Business account directly, at its own per-conversation rates, and TopEdge adds 0% on top. You pay us for the software and Meta for the messages, and you can see both bills separately.',
  },
  {
    q: 'Do I need my own Meta Business account, or do you give me a number?',
    a: 'Your own. Your number, your templates, your quality rating. If you ever leave, you keep all three; there is nothing to migrate back off us.',
  },
  {
    q: 'How long does setup take?',
    a: 'Installing from the Shopify App Store and switching on a journey takes about fifteen minutes. The part that is not in your hands is Meta template approval, which is usually same day but is Meta’s clock, not ours.',
  },
  {
    q: 'I am already on another WhatsApp tool. Can I move my flows?',
    a: 'Yes. Send us what you have running and we rebuild it here before you cancel anything, so you are never between two tools. There is no import button for this; a person does it with you.',
  },
  {
    q: 'What happens if I cross my order limit?',
    a: 'Nothing switches off mid-month and no message is silently dropped. You get a notice as you approach the limit and the option to move up a plan; the difference is prorated against what you have already paid.',
  },
  {
    q: 'Do I get a GST invoice?',
    a: 'Automatically, every cycle, with your GSTIN on it. Prices on this page are before 18% GST.',
  },
];

/**
 * Shown only on the switch variant, where it is the whole argument: the thing
 * stopping somebody moving is never the price, it is the fortnight of rebuilding
 * flows while two tools both bill them.
 */
const MIGRATION = {
  h: 'Moving from another WhatsApp tool?',
  p: 'Send us what you have running and we rebuild your journeys, templates and segments here before you cancel anything. You are never paying for two tools or running without one.',
};

/**
 * The site navbar, as a static capsule. Same shell as MarketingNavbar: floating, ghost
 * over the hero and solid once scrolled on desktop, always solid on mobile. The mega
 * menu is deliberately not ported. Its fourteen feature links are the site's job; on a
 * page bought by the click, every one of them is a way to leave without signing up, so
 * the two links here are in-page anchors instead.
 */
function navHtml(slug) {
  return `<header class="mkt-nav" id="nav">
  <div class="mkt-nav__shell">
    <div class="mkt-nav__capsule" id="nav-capsule">
      <div class="mkt-nav__bar">
        <a class="mkt-nav__brand" href="/">
          <img class="mkt-nav__brand-mark" src="/brand-mark-56.webp" width="40" height="40" alt="" decoding="async">
          <span class="mkt-nav__brand-text">TopEdge <span>AI</span></span>
        </a>
        <nav class="mkt-nav__desktop" aria-label="Primary">
          <a class="mkt-nav__link" href="#compare">Why TopEdge</a>
          <a class="mkt-nav__link" href="#platform">Platform</a>
          <a class="mkt-nav__link" href="#pricing">Pricing</a>
          <a class="mkt-nav__link" href="#faq">FAQ</a>
        </nav>
        <div class="mkt-nav__actions">
          <a class="mkt-nav__link" href="/login">Log in</a>
          <a class="mkt-btn-primary" data-cta="trial" href="${SIGNUP_FALLBACK(slug)}">Start free</a>
        </div>
      </div>
    </div>
  </div>
</header>`;
}

/**
 * The site footer, same structure and type scale as MarketingFooter: brand and real
 * contact details, the sitemap, partner badges, legal bar. Two things are left out on
 * purpose. The Compare column names competitors, which this page may not do and which
 * would send paid traffic shopping. The newsletter form is a second thing to fill in,
 * competing with the one conversion this page is paid for.
 */
function footHtml() {
  const cols = !FOOT_COLUMNS.length ? '' : FOOT_COLUMNS.map(
    (c) => `        <div class="mkt-foot__col">
          <p class="mkt-foot__capsule">${esc(c.title)}</p>
          <ul class="mkt-foot__list">${c.links.map(([label, href]) => `<li><a class="mkt-foot__link" href="${href}">${esc(label)}</a></li>`).join('')}</ul>
        </div>`,
  ).join('\n');
  const socials = Object.entries(SOCIAL)
    .filter(([k]) => SOCIAL_ICONS[k])
    .map(([k, href]) => `<li><a class="mkt-foot__social-btn" href="${esc(href)}" target="_blank" rel="noopener" aria-label="${k[0].toUpperCase() + k.slice(1)}"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">${SOCIAL_ICONS[k]}</svg></a></li>`)
    .join('');
  return `<footer class="mkt-foot" aria-label="Site footer">
  <div class="mkt-foot__shell">
    <div class="mkt-foot__top">
      <div class="mkt-foot__brand">
        <a class="mkt-foot__logo" href="/">
          <img class="mkt-foot__logo-mark" src="/brand-mark-56.webp" width="28" height="28" alt="" decoding="async" loading="lazy">
          <span class="mkt-foot__logo-text">TopEdge <span>AI</span></span>
        </a>
        <div class="mkt-foot__company-rows">
          <p class="mkt-foot__company-row"><span class="mkt-foot__company-text">${ADDRESS_LINES.map(esc).join('<br>')}</span></p>
          <p class="mkt-foot__company-row"><span class="mkt-foot__company-text"><a href="mailto:${esc(COMPANY_EMAIL)}">${esc(COMPANY_EMAIL)}</a></span></p>
          <p class="mkt-foot__company-row"><span class="mkt-foot__company-text"><a href="tel:+${COMPANY_PHONE_E164}">${esc(COMPANY_PHONE)}</a><span class="mkt-foot__company-sep" aria-hidden="true">&middot;</span><a href="${esc(WHATSAPP_URL)}" target="_blank" rel="noopener">WhatsApp</a></span></p>
        </div>
        <ul class="mkt-foot__social-list">${socials}</ul>
      </div>
${cols}
    </div>
    <div class="mkt-foot__legal">
      <p>&copy; 2026 ${esc(LEGAL_NAME)}. Meta&rsquo;s WhatsApp fees are billed by Meta on your own account. TopEdge adds 0% markup.</p>
      <div class="mkt-foot__legal-links"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
    </div>
  </div>
</footer>`;
}

/**
 * Trustpilot's own star, in Trustpilot's own colours: a filled box is #00b67a
 * and an empty one is #dcdce6, which is how their widget draws it and how a
 * reader recognises whose rating this is. Gold stars next to the word
 * Trustpilot would be our rendering of their mark.
 *
 * `starRow` draws the score it is handed. Five filled stars beside a 4.0 is
 * the exact misrepresentation this whole thread has been avoiding, so the
 * fill count is computed, a half is drawn as a half, and `check:lp` counts
 * the filled boxes against the number.
 */
// A Trustpilot star is a white star knocked out of a coloured box, not a
// coloured star on the page background. The box is drawn inside the svg so a
// partial score can clip the green one and still show the white star on top.
// All five boxes share one <svg> and one <path>: five standalone svgs cost
// 1.5 KB of the page budget to draw the same mark five times.
const star = (fill, i) =>
  `<g transform="translate(${i * 27})"><rect width="24" height="24" rx="2" fill="${TP_GREY}"/>${
    fill > 0
      ? `<rect width="24" height="24" rx="2" fill="${TP_GREEN}"${fill < 1 ? ` clip-path="inset(0 ${Math.round((1 - fill) * 100)}% 0 0)"` : ''}/>`
      : ''
  }<use href="#tps"/></g>`;

/**
 * Trustpilot's own lockup, in place of the word set as a link. Their star is
 * the recognisable half of it and it is the same glyph the rating row already
 * draws, so it costs one more <use> and no new file. The wordmark is set in
 * the page's own face at Trustpilot's ink rather than ours: a brand name
 * rendered in our violet reads as our word, not theirs.
 */
const TP_LOCKUP = `<a class="tp" href="${TRUSTPILOT.reviewUrl}" target="_blank" rel="noopener">${TP_STAR}Trustpilot</a>`;

/**
 * Product Hunt's lockup, beside Trustpilot's.
 *
 * Same rule as above: Product Hunt's own mark and ink, never ours. The rating
 * only appears once somebody has read it off the listing; until then this is
 * a plain link, which is the whole claim the page is entitled to make. See
 * the `_comment` block in socialProof.json.
 */
const PRODUCT_HUNT = SOCIAL_PROOF.productHunt ?? {};
const PH_MARK =
  '<svg class="phm" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">' +
  '<circle cx="12" cy="12" r="12" fill="#da552f"/>' +
  '<path fill="#fff" d="M13.4 6.6H8.9v10.8h2.7v-3.3h1.8a3.75 3.75 0 0 0 0-7.5zm0 5.1h-1.8V9h1.8a1.35 1.35 0 0 1 0 2.7z"/>' +
  '</svg>';
const PH_LOCKUP = `<a class="ph" href="${PRODUCT_HUNT.productUrl ?? 'https://www.producthunt.com/products/topedge-ai'}" target="_blank" rel="noopener">${PH_MARK}Product Hunt</a>`;

function starRow(score) {
  const n = Number(score);
  const boxes = Array.from({ length: 5 }, (_, i) => star(Math.max(0, Math.min(1, n - i)), i)).join('');
  return `<svg class="st" viewBox="0 0 132 24" width="110" height="20" aria-hidden="true"><defs><path id="tps" fill="#fff" d="${STAR_PATH}"/></defs>${boxes}</svg>`;
}

/**
 * The proof row under the hero button: the five customers as company marks,
 * the Trustpilot rating, and one line.
 *
 * The paid-traffic audit wanted this replaced by a price line and a pull
 * quote. That version tested worse to the owner's eye and it was right to say
 * so: a row of real businesses reads as "other founders did this" in a glance,
 * which is the job above the fold, where a price line reads as a disclaimer.
 * The price still appears, in the pricing section where someone goes looking.
 *
 * The review count is not on the visible line. It is the owner's call and the
 * number is one click away on the Trustpilot page the rating links to, so it
 * is withheld rather than hidden: a reader who wants the sample size reaches
 * it from here. It stays in the accessible text, because a screen reader
 * cannot glance at the link to find it.
 *
 * The marks are 2:1 to 4:1 wordmarks, so these are pill chips sitting side by
 * side rather than the overlapping round avatars the faces used: a wordmark in
 * a 45px circle crops DELITECH to a grey smear.
 */
function heroProof() {
  const faces = BRAND_CHIPS.map(
    (p2) =>
      `<span><img class="hp-ph" src="${p2.logo}" alt="" height="34" decoding="async"><i class="hp-tip">${esc(p2.company)}${p2.name ? `<em>${esc(p2.name)}</em>` : ''}</i></span>`,
  ).join('');
  const who = BRAND_CHIPS.map((p2) => (p2.name ? `${p2.name} of ${p2.company}` : p2.company)).join(', ');
  const stars = TRUSTPILOT.score
    ? `<p class="hp-stars">${starRow(TRUSTPILOT.score)}<span><b>${esc(TRUSTPILOT.score)}</b> on ${TP_LOCKUP}<i class="vh"> from ${esc(TRUSTPILOT.reviews)} reviews</i></span></p>`
    : `<p class="hp-stars hp-stars--none">${TP_LOCKUP} &mdash; read the reviews</p>`;
  const ph = PRODUCT_HUNT.rating
    ? `<p class="hp-ph2"><span><b>${esc(PRODUCT_HUNT.rating)}</b> on ${PH_LOCKUP}<i class="vh"> from ${esc(PRODUCT_HUNT.reviews)} reviews</i></span></p>`
    : `<p class="hp-ph2">${PH_LOCKUP}</p>`;
  return `<div class="hp">
        <div class="hp-faces" role="img" aria-label="Running on TopEdge: ${esc(who)}">${faces}</div>
        <div class="hp-col">
          ${stars}
          ${ph}
          <p class="hp-t">Loved by Shopify founders in India</p>
        </div>
      </div>`;
}

/**
 * The three anchors that close the hero. A paid click lands knowing one thing
 * it searched for; these are the three claims that decide whether the rest of
 * the page is worth a scroll, so they are the last thing in the first screen
 * rather than a section somewhere below it.
 *
 * A tick and a line, with no card around it and no paragraph under it. They
 * were cards with subtext and read as a third feature grid two screens before
 * the feature grid; the claim is the whole content, and the parenthetical is
 * what makes each one an argument rather than a label.
 */
const PILLARS = [
  'Built for the whole order lifecycle, not just a WhatsApp chat widget',
  'Immediate RTO reduction: confirm COD and boost prepaid conversions',
  'Zero message markup (keep total asset and phone number ownership)',
];

const pillarsHtml = `<ul class="pil">${PILLARS.map(
  (x) => `<li><i class="pil-t">${TICK}</i><h3>${esc(x)}</h3></li>`,
).join('')}</ul>`;

/**
 * The customer ribbon. Four copies of the five marks: the band runs full
 * bleed now, so the track has to be long enough to fill any viewport and still
 * travel exactly one copy per lap, which is what keeps the loop seamless. Only
 * the first copy is announced; the rest are aria-hidden, or a screen reader
 * reads the same five companies four times.
 */
const stripHtml = [0, 1, 2, 3]
  .flatMap((copy) =>
    TRUST_LOGOS.map(
      (l) =>
        `<li${copy ? ' aria-hidden="true"' : ''}><img src="${l.src}" alt="${copy ? '' : esc(l.alt)}" height="34" loading="lazy" decoding="async"></li>`,
    ),
  )
  .join('');

/**
 * The platform marks, beside the price. "Who actually bills me for the messages"
 * is a question that arrives when someone is looking at a number, not when they
 * are looking at a headline.
 */
const badgesHtml = BADGES.map(
  (b) => `<li><img src="${b.src}" alt="${esc(b.alt)}" height="96" loading="lazy" decoding="async"></li>`,
).join('');

/**
 * The aside beside the primary button: the owner's own hand-drawn arrow with
 * its cream ground stripped (threshold on luminance, alpha ramped across the
 * antialiased edge so the stroke keeps a smooth outline, ink recoloured to the
 * page's deep violet) and two words in the margin. Inert decoration: hidden
 * from assistive tech and dropped entirely below 1100px.
 */
/**
 * The owner's hand-drawn arrow with its cream ground stripped, and two words in
 * the margin. Inert decoration: hidden from assistive tech, positioned out of
 * flow, and dropped entirely below 1100px rather than allowed to wrap.
 */
const FREE_NOTE = `<span class="free" aria-hidden="true"><img src="/lp/free-arrow.webp" width="140" height="55" alt="" decoding="async"><b>Free for ${TRIAL.days} days</b></span>`;

const SHOPIFY_BUTTON = `<a class="btn btn-out" data-cta="shopify" href="${SHOPIFY_URL}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V7a3 3 0 0 1 6 0v1"/></svg>Install on Shopify</a>`;


const VIDEO = {
  lg: '/marketing/demos/topedge-launch.mp4',
  sm: '/marketing/demos/topedge-launch-mobile.mp4',
  poster: '/marketing/demos/topedge-launch-poster.webp',
  label: 'TopEdge AI launch film: turning Shopify visitors into WhatsApp contacts, recovering abandoned carts, and confirming COD orders before dispatch.',
};

/**
 * The launch film, in the hero, playing by itself. The owner wants the first
 * screen to be the product moving, so the hero is a full viewport and the film
 * fills what the headline and the buttons leave. `max-height` on the element
 * keeps it inside that viewport instead of pushing the buttons off the bottom.
 *
 * `preload="none"` plus no `src` in the markup means the page still paints from
 * the 37 KB poster alone; page.js attaches ONE source and starts playback when
 * the film scrolls into view, so a viewer who never reaches it downloads no
 * video at all. A `media` attribute on <source> is not honoured inside <video>
 * and two <video> elements would fetch both files, hence data-lg/data-sm.
 * `controls` stays: a loop longer than five seconds needs a way to stop it
 * (WCAG 2.2.2), and it is also how a viewer turns the sound on.
 */
function filmHtml() {
  return `<figure class="film-wrap">
        <video id="lv" class="film" controls muted loop playsinline preload="none"
               poster="${VIDEO.poster}" width="1280" height="720"
               data-lg="${VIDEO.lg}" data-sm="${VIDEO.sm}"
               aria-label="${esc(VIDEO.label)}">
          <p>Your browser cannot play this video. <a href="${VIDEO.lg}">Download it instead</a>.</p>
        </video>
      </figure>`;
}

/**
 * Blog cards, read out of the real post data rather than retyped here, so the
 * title, the category, the read time and the image cannot drift and a renamed
 * post fails the build. The page is noindex, so these links are for the person
 * reading it, not for a crawler: someone who is not buying today leaves with
 * something to read instead of leaving with nothing.
 */
async function loadPosts() {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'topedge-lp-blog-'));
  const outfile = path.join(outDir, 'blogPosts.mjs');
  try {
    await esbuild({
      entryPoints: [path.join(root, 'src/data/blogPosts.ts')],
      bundle: true,
      format: 'esm',
      platform: 'node',
      outfile,
      logLevel: 'error',
    });
    const all = (await import(pathToFileURL(outfile).href)).blogPosts;
    return POST_SLUGS.map((slug) => {
      const post = all.find((x) => x.slug === slug);
      if (!post) throw new Error(`/lp: POST_SLUGS names ${slug}, which is not a published post`);
      return post;
    });
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
}

const postsHtml = (await loadPosts())
  .map(
    (b, i) => `      <a class="post" data-rv style="--d:${i * 80}ms" href="/blog/${b.slug}">
        <img src="${b.image}" width="800" height="450" loading="lazy" decoding="async" alt="${esc(b.imageAlt || b.title)}">
        <div class="post-b">
          <p class="post-m"><span>${esc(b.category)}</span><span>${esc(b.readTime)} read</span></p>
          <h3>${esc(b.title)}</h3>
          <p class="post-go">Read the playbook <span aria-hidden="true">&rarr;</span></p>
        </div>
      </a>`,
  )
  .join('\n');

const PAGES = [
  {
    slug: 'shopify-whatsapp',
    title: 'WhatsApp Automation for Shopify | TopEdge AI',
    description:
      'Confirm COD orders, recover abandoned carts, run campaigns and answer every chat on WhatsApp. One subscription for Indian Shopify stores. 14-day free trial, no card.',
  },
];

// Tagging is optional: with neither id set the page makes no analytics request at all.
// When set, gtag.js loads only after the window `load` event, so it cannot delay first paint.
//
// Both ids matter and they do different jobs. GA4 measures; the Google Ads tag (AW-) is
// what builds the remarketing audience and receives conversions. These pages ARE the ad
// traffic, so without the AW tag here there is no retargeting list to build from the
// people the ads were bought for.
//
// Consent mirrors src/marketing/lib/analytics.ts: ad signals granted by default because
// this account advertises in India, denied across the EEA/UK/CH by a region-scoped
// default. The previous blanket `ad_storage: denied` stopped remarketing lists
// populating anywhere, which quietly made retargeting impossible.
const viteEnv = resolveViteEnv();
const gaId = String(viteEnv.VITE_GA_MEASUREMENT_ID || '').trim();
const adsId = String(viteEnv.VITE_GOOGLE_ADS_ID || '').trim();
const GA_OK = /^G-[A-Z0-9]{4,}$/.test(gaId);
const ADS_OK = /^AW-[0-9]{6,}$/.test(adsId);
const tagId = GA_OK ? gaId : ADS_OK ? adsId : '';
const DENY_REGION =
  "['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH']";
// `AW-xxx/label` for the "reached signup" conversion, or '' to send nothing.
// Both halves must be present: a send_to without a label is not a valid conversion.
// NOT VITE_GOOGLE_ADS_SIGNUP_LABEL. That label belongs to the dashboard's
// "account created" conversion; sharing it made every trial-button click count as a
// signup in Google Ads (3 reported conversions, 0 real accounts, 18 Oct 2026).
const adsLpCtaLabel = String(viteEnv.VITE_GOOGLE_ADS_LP_CTA_LABEL || '').trim();
const ADS_SEND_TO = ADS_OK && adsLpCtaLabel ? `${adsId}/${adsLpCtaLabel}` : '';
const analytics = tagId
  ? `<script>
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',region:${DENY_REGION},wait_for_update:500});
gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
gtag('js',new Date());
${GA_OK ? `gtag('config','${gaId}');\n` : ''}${ADS_OK ? `gtag('config','${adsId}');\n` : ''}addEventListener('load',function(){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${tagId}';document.head.appendChild(s)});
</script>
`
  : '';

// PostHog, for the per-person journey GA4 cannot show: this visitor read the page,
// opened pricing, clicked the trial button, signed up, connected Shopify. At a few
// hundred ad clicks a month each one is worth looking at individually.
//
// `cross_subdomain_cookie` is the load-bearing option — it puts the id cookie on
// `.topedgeai.com`, so the same person keeps one identity when the CTA sends them to
// dash.topedgeai.com. Without it the journey stops dead at the click.
//
// Loaded after `load`, so nothing here is on the critical path; the inline cost is a
// few hundred bytes against the page budget rather than PostHog's full snippet.
const phKey = String(viteEnv.VITE_POSTHOG_KEY || '').trim();
const phHost = String(viteEnv.VITE_POSTHOG_HOST || '').trim() || 'https://us.i.posthog.com';
const posthog = phKey
  ? `<script>
addEventListener('load',function(){var s=document.createElement('script');s.async=true;s.src='${phHost}/static/array.js';s.onload=function(){try{posthog.init('${phKey}',{api_host:'${phHost}',cross_subdomain_cookie:true,autocapture:true,capture_pageview:true,person_profiles:'always'})}catch(e){}};document.head.appendChild(s)});
</script>
`
  : '';

/**
 * The stylesheet ships inline, so every byte of it is page weight against the 60 KB
 * budget. Comments and indentation are for whoever edits base.css next, not for the
 * browser: they are dropped here rather than written out of the source. CSS has no
 * line-sensitive syntax and the file has no `/*` inside a string, so this is safe.
 */
/**
 * Same reasoning for the two inline scripts. Only whole-line `//` comments and the
 * leading indentation go: stripping mid-line would have to tell a comment from a URL
 * or a regex literal, and neither file has a comment that does not own its line.
 */
const squashJs = (src) =>
  src
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('//'))
    .join('\n');

/**
 * Markup indentation is 3 KB of the page: it buys nothing a reader can see and
 * it is the first thing to go when the budget binds. Only the leading run goes,
 * and the newline stays, so every line break still collapses to the single
 * space it already was between two inline elements. Nothing here is inside a
 * <pre> or a <textarea>, where the whitespace would be the content.
 */
const squashHtml = (src) =>
  src
    .split('\n')
    .map((l) => l.replace(/^[\t ]+/, ''))
    .filter(Boolean)
    .join('\n');

const squashCss = (src) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .join('');

const css = squashCss(fs.readFileSync(path.join(lpDir, 'base.css'), 'utf8'));
const attribution = squashJs(fs.readFileSync(path.join(lpDir, 'attribution.js'), 'utf8'));
const behavior = squashJs(fs.readFileSync(path.join(lpDir, 'page.js'), 'utf8'));

// Function replacers: a catalog string containing `$&` must never be interpreted as a pattern.
const variantCss = Object.keys(PROOF_VARIANTS)
  .filter((k) => k !== 'platform')
  .map((k) => `html[data-v="${k}"] .pf[data-pf="platform"]{display:none}html[data-v="${k}"] .pf[data-pf="${k}"]{display:grid}`)
  .join('');

const fill = (tpl, map) => tpl.replace(/\{\{([A-Z0-9_]+)\}\}/g, (m, k) => (k in map ? map[k] : m));

for (const page of PAGES) {
  const body = fill(fs.readFileSync(path.join(lpDir, `${page.slug}.body.html`), 'utf8'), {
    PLAN_CARDS: planCards(page.slug),
    QUOTES: quotesHtml,
    NAV: navHtml(page.slug),
    FOOTER: footHtml(),
    PATHS: pathsHtml(page.slug),
    BENTO: bentoHtml,
    POSTS: postsHtml,
    SWITCH_ROWS: switchHtml,
    TP_STAR,
    INCLUDED_LIST: includedHtml,
    PILLARS: pillarsHtml,
    STRIP_LOGOS: stripHtml,
    STRIP_BADGES: badgesHtml,
    FILM: filmHtml(),
    SLUG: page.slug,
    SIGNUP_FALLBACK: SIGNUP_FALLBACK(page.slug),
    SHOPIFY_URL,
    HELP_WHATSAPP_URL: esc(HELP_WHATSAPP_URL),
    COMPANY_PHONE: esc(COMPANY_PHONE),
    TRIAL_SHORT,
    HERO_LEAD: esc(HERO_VARIANTS.platform.lead),
    HERO_MARK: esc(HERO_VARIANTS.platform.mark),
    HERO_SUB: esc(HERO_VARIANTS.platform.sub),
    HERO_PROOF: heroProof(),
    PROOF_BLOCKS: proofHtml(),
    STEPS: STEPS.map(
      (x, i) => `      <li class="stp" data-rv style="--d:${i * 70}ms"><b class="stp-m">${x.mark}</b><h3>${esc(x.h)}</h3><p>${esc(x.p)}</p></li>`,
    ).join('\n'),
    FAQS: FAQS.map(
      (f) => `      <details class="fq"><summary>${esc(f.q)}<i aria-hidden="true"></i></summary><p>${esc(f.a)}</p></details>`,
    ).join('\n'),
    LAUNCH_YEARLY: esc(planPricing(plans[0], 'yearly').effectiveMonthlyLabel),
    TRIAL_DAYS: String(TRIAL.days),
    MIGRATION_H: esc(MIGRATION.h),
    MIGRATION_P: esc(MIGRATION.p),
    SHOPIFY_BTN: SHOPIFY_BUTTON,
    FREE_NOTE,
    HERO_VARIANTS_JSON: JSON.stringify(HERO_VARIANTS).replace(/</g, '\\u003c'),
    LEGAL_NAME: esc(LEGAL_NAME),
    COMPANY_EMAIL: esc(COMPANY_EMAIL),
  });

  const html = squashHtml(`<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<meta name="robots" content="noindex,nofollow">
<meta name="theme-color" content="#7C3AED">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon.png">
<style>${css}${variantCss}</style>
</head>
<body>
${body}
${analytics}${posthog}<script>
${behavior}
</script>
<script>
${attribution.replaceAll('{{SLUG}}', page.slug).replaceAll('{{ADS_SEND_TO}}', ADS_SEND_TO).replaceAll('{{SIGNUP_URL}}', DASH_SIGNUP)}
</script>
</body>
</html>
`);

  // Guardrails: fail the build rather than ship a page that breaks the ad-page contract.
  // Content assertions live in scripts/check-landing-pages.mjs (npm run check:lp).
  const bytes = Buffer.byteLength(html);
  // Markup-shape rules read the document with inline <script> bodies removed:
  // JS source is not markup, and a tag name inside a comment or string is not
  // an element. Byte budget still measures the real, whole file.
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  const problems = [];
  if (bytes > MAX_BYTES) problems.push(`${bytes} bytes exceeds the ${MAX_BYTES} byte budget`);
  if (!html.includes('<meta name="robots" content="noindex,nofollow">')) problems.push('missing noindex');
  if (/\{\{[A-Z0-9_]+\}\}/.test(html)) problems.push('unreplaced {{placeholder}}');
  if (/<script[^>]+src=|<link[^>]+rel="stylesheet"|fonts\.googleapis/.test(html)) problems.push('external script/stylesheet/font');
  if (/<iframe\b/.test(markup)) problems.push('iframe not allowed');
  // A hero film is allowed since 2026-10-07, but only on the terms that keep
  // first paint instant: it must weigh nothing until someone presses play.
  // check:lp asserts the rest (poster, playsinline, controls, aria-label).
  for (const v of markup.match(/<video\b[^>]*>/g) || []) {
    if (!/\bpreload="none"/.test(v)) problems.push('<video> without preload="none"');
    if (/\bautoplay\b/.test(v)) problems.push('<video> must not autoplay');
    if (!/\bposter="/.test(v)) problems.push('<video> without a poster');
  }
  if (problems.length) {
    console.error(`✖ /lp/${page.slug}: ${problems.join('; ')}`);
    process.exit(1);
  }

  const outDir = path.join(root, 'public', 'lp', page.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  console.log(`✅ public/lp/${page.slug}/index.html (${(bytes / 1024).toFixed(1)} KB)`);
}
