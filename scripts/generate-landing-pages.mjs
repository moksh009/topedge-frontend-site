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
const MAX_BYTES = 88 * 1024;

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
    lead: 'Your Shopify store, running on ',
    mark: 'WhatsApp',
    sub: 'COD confirmation, cart recovery, campaigns and a shared inbox, in one place. Built for Indian Shopify D2C brands.',
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
    icon: 'coin',
    topic: 'Message fees',
    them: 'A per-message fee on top of what Meta charges',
    us: 'Meta bills your own account. TopEdge adds 0% markup.',
  },
  {
    icon: 'loop',
    topic: 'Automation',
    them: 'Runs are metered, then rationed as you grow',
    us: 'Unlimited flow runs, on every plan.',
  },
  {
    icon: 'user',
    topic: 'Customer records',
    them: 'One buyer split across three separate contacts',
    us: 'One profile, even with three phone numbers.',
  },
  {
    icon: 'card',
    topic: 'COD risk',
    them: 'COD stays COD, and you carry it to the door',
    us: 'A payment link in the same thread, built for Shopify checkout.',
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
    cta: 'Read: how COD confirmation works',
    href: '/blog/cod-confirmation-whatsapp-reduce-rto-shopify',
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
    h: 'Show me what it actually does',
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
  'cod-confirmation-whatsapp-reduce-rto-shopify',
  'whatsapp-abandoned-cart-recovery-shopify',
  'whatsapp-business-api-pricing-india',
];

/**
 * The value stack beside the price. It deliberately does not repeat the six
 * panels in the platform section: a visitor who has scrolled this far has read
 * those, and seeing them again as a tick list is the thing that makes a page
 * feel padded. These are the parts that never got a panel.
 */
const INCLUDED = [
  'Unlimited flow runs',
  'Customer CRM and segments',
  'Shopify tracking pixel',
  'Help getting your Meta templates approved',
  'GST invoices, issued automatically',
  'A person on WhatsApp when you need one',
];

// Marks that already sit in the site footer. An ad visitor has never heard of us.
const BADGES = [
  { src: '/badges/shopify-app-store.png?v=4', alt: 'Available on the Shopify App Store' },
  { src: '/badges/meta-business-partner.png?v=4', alt: 'Meta Business Partner' },
  { src: '/badges/whatsapp-cloud-api.png?v=5', alt: 'Built on the official WhatsApp Cloud API' },
];

// Three copies of four logos: two left a visible double at 1440px.
/**
 * The four customers this page may name, as companies. The logo files are
 * white-on-transparent; base.css paints them dark for the light band, and
 * nothing recolours them into our own violet.
 */
const TRUST_LOGOS = [
  { src: '/trust/delitech-white.png', alt: 'Delitech' },
  { src: '/trust/apex-white.png', alt: 'Apex Light' },
  { src: '/trust/codeclinic-white.png', alt: 'code CLINIC' },
  { src: '/trust/choicesalon-white.png', alt: 'Choice Salon' },
];

/**
 * The same customers as people, for the hero stack. Photographs supplied by the
 * owner on 10 Oct 2026 and cropped to head-and-shoulders squares at 128px; they
 * are the only faces on this site and none of them is stock.
 *
 * Order is the owner's: Delitech first, then the two Apex Light founders, with
 * Choice Salon and code CLINIC behind them.
 *
 * Two names are deliberately blank. The Apex Light photograph shows Shubham
 * Patel and Sanket Patel together and nothing in it says which man is which,
 * so both tooltips name the company only rather than risk putting the wrong
 * name under a real person's face. Fill `name` in and the tooltip picks it up.
 * The same is true of code CLINIC, whose founder's name we were not given.
 */
const PEOPLE = [
  { photo: '/trust/people/ved-patel.webp', name: 'Ved Patel', company: 'Delitech' },
  { photo: '/trust/people/apex-a.webp', name: '', company: 'Apex Light' },
  { photo: '/trust/people/apex-b.webp', name: '', company: 'Apex Light' },
  { photo: '/trust/people/subhash.webp', name: 'Shubhash', company: 'Choice Salon' },
  { photo: '/trust/people/codeclinic.webp', name: '', company: 'code CLINIC' },
];

// The site footer, minus the Compare column (this page may not name a competitor, and
// paid traffic should not be sent shopping) and the newsletter form (a second form
// competes with the trial for the same click). Docs point at the dashboard, which is
// where the documentation lives since the marketing copy was removed.
const FOOT_COLUMNS = [
  { title: 'Product', links: [['Pricing', '/pricing'], ['Journey', '/features/journeys'], ['COD confirmation', '/features/cod-confirmation'], ['Audience Campaigns', '/features/campaigns'], ['AI Brain', '/features/ai-brain']] },
  { title: 'Company', links: [['About', '/about'], ['Customers', '/customers'], ['Docs', 'https://dash.topedgeai.com/docs'], ['Blog', '/blog'], ['Contact', '/contact']] },
];

// Same brand fills the site footer uses. Instagram's real mark is a radial gradient;
// a single mid-gradient magenta reads the same at 16px and costs no gradient def.
const SOCIAL_FILL = { linkedin: '#0A66C2', instagram: '#d6249f', youtube: '#FF0000' };
const SOCIAL_ICONS = {
  linkedin: '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"/>',
  instagram: '<path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>',
  youtube: '<path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>',
};

/**
 * The pricing card from the site, not a second design. Same shell/panel/meters
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
              <span class="mkt-plan__period"><span class="p-yearly">per month, billed yearly</span><span class="p-monthly">per month</span></span>
            </div>
            <p class="mkt-plan__billing-note"><span class="p-yearly">billed yearly (${esc(y.billedLabel)}/year) &middot; ${esc(p.monthlyPriceLabel)}/mo month-to-month</span><span class="p-monthly">+18% GST. Cancel anytime.</span></p>
            <p class="mkt-plan__blurb">${esc(planBlurb(p.slug))}</p>
            <a class="mkt-plan__cta mkt-plan__cta--${p.emphasis ? 'solid' : 'ghost'}" data-cta="trial" data-plan="${esc(p.slug)}" href="${SIGNUP_FALLBACK(slug)}">Choose ${esc(p.displayName)}</a>
          </div>
          <div class="mkt-plan__features">
            <p class="mkt-plan__kicker">${esc(planFeatureKicker(p.slug))}</p>
            <ul class="mkt-plan__meters">${meters}</ul>
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
const TRUSTPILOT = {
  /**
   * The live TrustScore, read off trustpilot.com/review/topedgeai.com by the
   * owner on 10 Oct 2026 and pasted here. It could not be fetched from the
   * build container: trustpilot.com does not resolve through the egress proxy
   * at all, ENOTFOUND on the hostname rather than a refused request, checked
   * by curl, by fetch and by web search.
   *
   * `reviews` ships with it on purpose. A score with no count invites the
   * reader to assume a large one, and a visitor who follows the link sees the
   * real number a second later; saying it first costs nothing and buys the
   * rest of the page some credit. `asOf` is when a human last looked.
   */
  score: '4.0',
  reviews: '5',
  asOf: '10 October 2026',
  businessUnitId: '',
  templateId: '53aa8912dec7e10d38f59f36',
  locale: 'en-IN',
  height: '350px',
  reviewUrl: 'https://www.trustpilot.com/review/topedgeai.com',
};

const TP_STAR =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="#00b67a" aria-hidden="true"><path d="M12 1.6l3.1 7.2 7.8.6-5.9 5.1 1.8 7.6L12 18l-6.8 4.1 1.8-7.6L1.1 9.4l7.8-.6z"/></svg>';

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


const includedHtml = INCLUDED.map((i) => `<li>${esc(i)}</li>`).join('');


/**
 * The band under the hero: the customer logos at a size where a wordmark is
 * readable, which is the thing a 44px circle cannot do. The hero above shows
 * these four as people; this shows them as companies.
 *
 * It scrolls. Four marks do not fill a desktop viewport, so a loop of them
 * repeats within one screen, which the reference band the owner sent does too
 * (its wyre and Barclays each appear twice). Three copies make the track long
 * enough that a 33.3% translate returns it to an identical frame, so the loop
 * has no seam. Only the first copy is announced; the rest are aria-hidden, or
 * a screen reader reads the same four companies three times.
 */
const stripHtml = [0, 1, 2]
  .flatMap((copy) =>
    TRUST_LOGOS.map(
      (l) =>
        `<li${copy ? ' aria-hidden="true"' : ''}><img src="${l.src}" alt="${copy ? '' : esc(l.alt)}" height="28" loading="lazy" decoding="async"></li>`,
    ),
  )
  .join('');

/**
 * The platform marks, beside the price. They used to sit under the hero, which
 * is early for them: "who actually bills me for the messages" is a question
 * that arrives when someone is looking at a number, not at a headline.
 */
const badgesHtml = BADGES.map(
  (b) => `<li><img src="${b.src}" alt="${esc(b.alt)}" height="42" loading="lazy" decoding="async"></li>`,
).join('');

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
          <a class="mkt-nav__link" href="#platform">Platform</a>
          <a class="mkt-nav__link" href="#compare">Why TopEdge</a>
          <a class="mkt-nav__link" href="#pricing">Pricing</a>
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
  const cols = FOOT_COLUMNS.map(
    (c) => `        <div class="mkt-foot__col">
          <p class="mkt-foot__capsule">${esc(c.title)}</p>
          <ul class="mkt-foot__list">${c.links.map(([label, href]) => `<li><a class="mkt-foot__link" href="${href}">${esc(label)}</a></li>`).join('')}</ul>
        </div>`,
  ).join('\n');
  const socials = Object.entries(SOCIAL)
    .filter(([k]) => SOCIAL_ICONS[k])
    .map(([k, href]) => `<li><a class="mkt-foot__social-btn" href="${esc(href)}" target="_blank" rel="noopener" aria-label="${k[0].toUpperCase() + k.slice(1)}"><svg viewBox="0 0 24 24" width="16" height="16" fill="${SOCIAL_FILL[k]}" aria-hidden="true">${SOCIAL_ICONS[k]}</svg></a></li>`)
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
      <nav class="mkt-foot__sitemap" aria-label="Sitemap">
${cols}
      </nav>
    </div>
    <div class="mkt-foot__legal">
      <p>&copy; 2026 ${esc(LEGAL_NAME)}. Meta&rsquo;s WhatsApp fees are billed by Meta on your own account. TopEdge adds 0% markup.</p>
      <div class="mkt-foot__legal-links"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
    </div>
  </div>
</footer>`;
}

/**
 * The proof block under the hero button, in the shape the reference uses: an
 * overlapping stack of round avatars, a star row beside it, one line of text
 * underneath.
 *
 * The avatars carry initials, not photographs and not the logo files. No
 * photographs because we have none of these people and stock faces presented as
 * customers are a straightforward lie. Not the logos because every one of them
 * is a wordmark between 2.4:1 and 4:1, and a round crop at 42px leaves about
 * nine pixels of cap height: a smudge. The logos get a band of their own under
 * the hero, at a size where they can be read. Here the disc is a person, the
 * way the reference means it, and hovering one names the company and the
 * founder.
 *
 * The star row is the honest half of this. It renders only when
 * `TRUSTPILOT.score` holds a number, and it says where the number came from.
 * See the note on TRUSTPILOT for why it is still empty.
 */
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
const TP_GREEN = '#00b67a';
const TP_GREY = '#dcdce6';
const STAR_PATH = 'M12 1.6l3.1 7.2 7.8.6-5.9 5.1 1.8 7.6L12 18l-6.8 4.1 1.8-7.6L1.1 9.4l7.8-.6z';
// A Trustpilot star is a white star knocked out of a coloured box, not a
// coloured star on the page background. The box is drawn inside the svg so a
// partial score can clip the green one and still show the white star on top.
const star = (fill) =>
  `<svg class="st" viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><rect width="24" height="24" fill="${TP_GREY}"/>${
    fill > 0
      ? `<rect width="24" height="24" fill="${TP_GREEN}"${fill < 1 ? ` clip-path="inset(0 ${Math.round((1 - fill) * 100)}% 0 0)"` : ''}/>`
      : ''
  }<path fill="#fff" d="${STAR_PATH}"/></svg>`;

function starRow(score) {
  const n = Number(score);
  return Array.from({ length: 5 }, (_, i) => star(Math.max(0, Math.min(1, n - i)))).join('');
}

function heroProof() {
  const faces = PEOPLE.map(
    (p2) =>
      `<span><img src="${p2.photo}" alt="" width="128" height="128" decoding="async"><i class="hp-tip">${esc(p2.company)}${p2.name ? `<em>${esc(p2.name)}</em>` : ''}</i></span>`,
  ).join('');
  const who = PEOPLE.map((p2) => (p2.name ? `${p2.name} of ${p2.company}` : p2.company)).join(', ');
  const stars = TRUSTPILOT.score
    ? `<p class="hp-stars">${starRow(TRUSTPILOT.score)}<span><b>${esc(TRUSTPILOT.score)}</b> from ${esc(TRUSTPILOT.reviews)} reviews on <a href="${TRUSTPILOT.reviewUrl}" target="_blank" rel="noopener">Trustpilot</a></span></p>`
    : `<p class="hp-stars hp-stars--none"><a href="${TRUSTPILOT.reviewUrl}" target="_blank" rel="noopener">Read the reviews on Trustpilot</a></p>`;
  return `<div class="hp">
        <div class="hp-faces" role="img" aria-label="Running on TopEdge: ${esc(who)}">${faces}</div>
        <div class="hp-col">
          ${stars}
          <p class="hp-t">Loved by Shopify founders in India <span aria-hidden="true">&#10084;</span></p>
        </div>
      </div>`;
}

/**
 * The aside beside the primary button: the owner's own hand-drawn arrow with
 * its cream ground stripped (threshold on luminance, alpha ramped across the
 * antialiased edge so the stroke keeps a smooth outline, ink recoloured to the
 * page's deep violet) and two words in the margin. Inert decoration: hidden
 * from assistive tech and dropped entirely below 1100px.
 */
const SHOPIFY_BUTTON = `<a class="btn btn-out" data-cta="shopify" href="${SHOPIFY_URL}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V7a3 3 0 0 1 6 0v1"/></svg>Install on Shopify</a>`;

const FREE_NOTE = `<span class="free" aria-hidden="true"><img src="/lp/free-arrow.webp" width="140" height="55" alt="" decoding="async"><b>Free for ${TRIAL.days} days</b></span>`;

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
const adsSignupLabel = String(viteEnv.VITE_GOOGLE_ADS_SIGNUP_LABEL || '').trim();
const ADS_SEND_TO = ADS_OK && adsSignupLabel ? `${adsId}/${adsSignupLabel}` : '';
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
addEventListener('load',function(){var s=document.createElement('script');s.async=true;s.src='${phHost}/static/array.js';s.onload=function(){try{posthog.init('${phKey}',{api_host:'${phHost}',cross_subdomain_cookie:true,autocapture:true,capture_pageview:true,person_profiles:'identified_only'})}catch(e){}};document.head.appendChild(s)});
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
    INCLUDED_LIST: includedHtml,
    STRIP_LOGOS: stripHtml,
    BADGES: badgesHtml,
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
    SHOPIFY_BTN: SHOPIFY_BUTTON,
    FREE_NOTE,
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
${analytics}${posthog}<script>
${behavior}
</script>
<script>
${attribution.replaceAll('{{SLUG}}', page.slug).replaceAll('{{ADS_SEND_TO}}', ADS_SEND_TO).replaceAll('{{SIGNUP_URL}}', DASH_SIGNUP)}
</script>
</body>
</html>
`;

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
