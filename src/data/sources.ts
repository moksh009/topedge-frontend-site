/**
 * Primary sources the blog is allowed to cite.
 *
 * The 2026-10-07 audit (seo-audit/issues.csv, TE-014) found 12 unique external
 * hosts across 101 pages, 26 of the external URLs pointing at our own
 * dashboard, and zero sources behind the RTO and COD statistics. An unsourced
 * number is the thing an AI engine will not repeat and a reader cannot check,
 * so it is also the cheapest citation signal to fix.
 *
 * Rules for this file:
 *
 *   1. First-party only. Meta's docs for Meta's rules, Shopify's docs for
 *      Shopify's behaviour, the publisher's own page for a statistic. A blog
 *      that restates the number is not a source.
 *   2. `verified` is the day a human opened the URL and read the claim off it.
 *      Re-verify before citing a number that has moved.
 *   3. `claim` is what the page actually says, in its own numbers. If a post
 *      states something this field does not support, the post is wrong, not
 *      the source.
 *
 * scripts/check-blog-sources.mjs fails the build if a blog post links to an
 * external host that is not listed here.
 */

export type Source = {
  id: string;
  url: string;
  /** Link text used in the post. */
  label: string;
  publisher: string;
  /** What this page actually states, as read on `verified`. */
  claim: string;
  verified: string;
};

export const SOURCES = {
  metaPricing: {
    id: 'metaPricing',
    url: 'https://developers.facebook.com/docs/whatsapp/pricing/',
    label: 'Meta’s WhatsApp Business Platform pricing documentation',
    publisher: 'Meta',
    claim:
      'Per-message pricing since 1 July 2025, charged on delivery, by message category (marketing, utility, authentication, service) and the recipient’s country calling code. Carries the live rate card and the volume tiers. Effective 1 October 2026 by messaging account timezone, every business phone number gets a free tier of 1,000 service messages a month and Meta charges from the 1,001st service message onward. Meta Business Agent moved to token billing on 1 August 2026 at $2.00 per million tokens. Utility and authentication volume tiers start at 25,000,000 and 750,000 messages a month, with the India utility rate falling to ₹0.1081 above the utility tier. India card: ₹0.8631 marketing, ₹0.1150 utility and authentication, ₹2.4971 authentication-international, all per delivered message.',
    verified: '2026-10-21',
  },
  metaTemplates: {
    id: 'metaTemplates',
    url: 'https://developers.facebook.com/docs/whatsapp/message-templates/guidelines/',
    label: 'Meta’s message template guidelines',
    publisher: 'Meta',
    claim:
      'Template fundamentals: how templates are categorised, reviewed and approved, and what gets a template rejected.',
    verified: '2026-10-21',
  },
  whatsappPolicy: {
    id: 'whatsappPolicy',
    url: 'https://whatsappbusiness.com/policy/',
    label: 'the WhatsApp Business Messaging Policy',
    publisher: 'WhatsApp',
    claim:
      'Businesses may message a person only where that person gave their number and gave opt-in permission to receive messages. The business is responsible for the opt-in method. Last updated 23 September 2026.',
    verified: '2026-10-21',
  },
  shopifyAbandoned: {
    id: 'shopifyAbandoned',
    url: 'https://help.shopify.com/manual/orders/abandoned-checkouts',
    label: 'Shopify’s own abandoned checkout documentation',
    publisher: 'Shopify',
    claim:
      'A checkout counts as abandoned when it stays incomplete for more than ten minutes after the customer has given their email. Recovery emails are available on the Online Store and Buy Button channels only.',
    verified: '2026-10-21',
  },
  baymardCart: {
    id: 'baymardCart',
    url: 'https://baymard.com/lists/cart-abandonment-rate',
    label: 'Baymard Institute’s cart abandonment list',
    publisher: 'Baymard Institute',
    claim:
      '70.22% average documented online shopping cart abandonment rate, averaged across 50 published studies. Page last updated 22 September 2025.',
    verified: '2026-10-21',
  },
  unicommerceRto: {
    id: 'unicommerceRto',
    url: 'https://unicommerce.com/india-d2c-report-2026-april/',
    label: 'Unicommerce’s India D2C Report 2026',
    publisher: 'Unicommerce',
    claim:
      'RTO of 39.2% at the November 2025 festive peak falling to 25.6% in January 2026 and 21.0% by March 2026 among brands running prepaid incentives, pincode-level courier routing and pre-dispatch address verification, built from 410M+ shipments across 6,000+ brands. Festive-quarter COD returns around 58% against under 15% for prepaid. Tier-2 and Tier-3 cities drove 66% of incremental order volume in FY26.',
    verified: '2026-10-21',
  },
  amazonShippingRto: {
    id: 'amazonShippingRto',
    url: 'https://shipping.amazon.in/blog/what-is-rto-how-to-reduce-return-to-origin',
    label: 'Amazon Shipping India’s RTO cost breakdown',
    publisher: 'Amazon Shipping India',
    claim:
      'One RTO parcel costs ₹180 to ₹240 in direct logistics: forward shipping ₹60 to ₹100, reverse logistics ₹50 to ₹80, repackaging and quality check ₹20 to ₹40, inventory holding in transit ₹10 to ₹20. That total excludes acquisition cost, and the page notes ₹450 to ₹680 spent acquiring a customer who then refuses at the door. Orders attempted within 1 to 2 days had 22% RTO, rising to 35% when attempted after 5+ days. Vadodara recorded the lowest city RTO at 18%.',
    verified: '2026-10-21',
  },
  amazonShippingTrueCost: {
    id: 'amazonShippingTrueCost',
    url: 'https://shipping.amazon.in/blog/true-cost-of-shipping-per-order-india',
    label: 'Amazon Shipping India’s true cost per order breakdown',
    publisher: 'Amazon Shipping India',
    claim:
      'Worked ₹799 women’s cotton kurta example. Packaging ₹13 (₹10 mailer, ₹2 tape, ₹1 label). Volumetric weight (32 x 25 x 5) / 5,000 = 0.80 kg billed at the 1 kg slab, so ₹85 national freight on a 300g product. COD remittance fee ₹30. Amortised RTO cost ₹38 (30% x ₹125 incremental reverse cost). Support time ₹13 (40% touch rate x ₹32 per interaction, being 20 minutes at ₹96/hr). Visible costs ₹128, true total ₹179 against the ₹85 the seller sees.',
    verified: '2026-10-21',
  },
  amazonShippingNdr: {
    id: 'amazonShippingNdr',
    url: 'https://shipping.amazon.in/blog/what-is-ndr-in-shipping-india',
    label: 'Amazon Shipping India’s NDR resolution guide',
    publisher: 'Amazon Shipping India',
    claim:
      'Nearly every failed delivery not resolved within 36 hours of the NDR being raised ends in cancellation and RTO. Indian courier SLAs typically allow 24 to 48 hours between delivery attempts, most couriers make two to three attempts, and the page advises contacting the buyer within 2 to 4 hours of the NDR.',
    verified: '2026-10-21',
  },
  firstResortReturns: {
    id: 'firstResortReturns',
    url: 'https://www.firstresort.in/blogs/research/fashion-ecommerce-returns-rto-india-2026',
    label: 'First Resort’s 2026 India fashion returns and RTO research',
    publisher: 'First Resort',
    claim:
      'Citing ClickPost: ₹150 to ₹300 direct logistics per RTO parcel and ₹450 to ₹900 fully loaded once written-off acquisition spend is counted. Category RTO bands: fashion and apparel 25% to 40%, beauty and personal care 18% to 25%, furniture and large goods 15% to 20%, electronics 10% to 15%, FMCG and consumables 8% to 12%. Citing GoKwik: COD RTO near 26% against prepaid under 2%, with 60% to 70% of RTOs stemming from low buying intent rather than logistics failure.',
    verified: '2026-10-21',
  },
  aisensyPricing: {
    id: 'aisensyPricing',
    url: 'https://aisensy.com/pricing',
    label: 'AiSensy’s published pricing page',
    publisher: 'AiSensy',
    claim:
      'From 1 October 2026 every WhatsApp Business number gets 1,000 free service messages a month, after which AiSensy charges service messages at ₹0.145 each for Indian users. That sits above Meta’s own ₹0.1150 India service and utility rate.',
    verified: '2026-10-21',
  },
  interaktPricing: {
    id: 'interaktPricing',
    url: 'https://www.interakt.shop/pricing/',
    label: 'Interakt’s published pricing page',
    publisher: 'Interakt',
    claim:
      'Starter ₹999/month (Instagram only), Growth ₹2,799/month and Advanced ₹3,799/month for WhatsApp plus Instagram, Enterprise on request. Sales CRM ₹2,499/month for 5 agents then ₹499 per extra agent. WhatsApp AI Agents sold as a ₹3,000 add-on on Growth and Advanced, with 100 free AI messages a month and ₹0.50 per AI message beyond 100.',
    verified: '2026-10-21',
  },
  updatrrPricing: {
    id: 'updatrrPricing',
    url: 'https://www.updatrr.com/pricing',
    label: 'Updatrr’s published pricing page',
    publisher: 'Updatrr',
    claim:
      'Growth $29.99/month, Pro $49.99/month, Pro AI $99.99/month, all with a 7-day free trial and no card required. Updatrr states it does not add a markup on Meta’s conversation fees and that Meta bills WhatsApp conversations separately. The page publishes no per-conversation AI fee, and AI sits on the $99.99 Pro AI tier.',
    verified: '2026-10-21',
  },
} as const satisfies Record<string, Source>;

export type SourceId = keyof typeof SOURCES;

/** Hosts a blog post may link to outside our own domain. */
export const ALLOWED_EXTERNAL_HOSTS = [
  ...new Set(Object.values(SOURCES).map((s) => new URL(s.url).hostname.replace(/^www\./, ''))),
  // Our own properties, and the competitor pricing pages the comparison posts
  // quote from. A comparison that names a rival's price has to link to where
  // that price is published, or the reader cannot check it either.
  'dash.topedgeai.com',
  'apps.shopify.com',
  'zoko.io',
  'dondy.net',
  'getgabs.com',
  'getkanal.com',
];
