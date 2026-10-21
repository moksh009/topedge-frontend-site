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
      'Per-message pricing since 1 July 2025, charged on delivery, by message category (marketing, utility, authentication, service) and the recipient’s country calling code. Carries the live rate card and the volume tiers.',
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
      'RTO of 39.2% at the November 2025 festive peak falling to 21.0% by March 2026, built from 410M+ shipments across 6,000+ brands. Festive-quarter COD returns around 58% against under 15% for prepaid.',
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
