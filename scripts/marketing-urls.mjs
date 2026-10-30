/**
 * Single source of marketing URLs for prerender + sitemap generation.
 * Keep in sync with App.tsx routes, MARKETING_FEATURES, and blogPosts.
 *
 * Rules:
 * - Only canonical, indexable URLs (no aliases that 301 elsewhere).
 * - Paths have no trailing slash (except `/`).
 * - Do NOT include `/features/shopify` — it redirects to `/integrations`.
 */
/** Live feature detail pages (must match MARKETING_FEATURES slugs). */
export const FEATURE_SLUGS = [
  'journeys',
  'flow-builder',
  'ai-brain',
  'campaigns',
  'analytics',
  'meta-manager',
  'audience-crm',
  'chat-rules',
  'warranty',
  'opt-in-tools',
  'profit-loss',
  'intent-detection',
  // Dedicated page (src/marketing/pages/CodConfirmationPage.tsx), not in MARKETING_FEATURES.
  'cod-confirmation',
];

export const COMPARE_SLUGS = [
  'wati',
  'aisensy',
  'interakt',
  'bitespeed',
  'zoko',
  'getgabs',
  'kanal',
  'dondy',
  'updatrr',
  'gupshup',
  'alternatives',
];

/**
 * Multi-vendor boards. These are explicit routes, not /compare/:competitor, so
 * they live here rather than in COMPARE_SLUGS.
 */
export const COMPARE_MULTIWAY_SLUGS = [
  'topedge-vs-wati-vs-aisensy',
  'topedge-vs-wati-vs-interakt-vs-aisensy',
];

export const TOPIC_SLUGS = ['shopify-whatsapp-integration'];

export const BLOG_SLUGS = [
  'whatsapp-abandoned-cart-recovery-shopify',
  'best-shopify-app-for-abandoned-cart-recovery-india',
  'whatsapp-automation-for-shopify',
  'best-whatsapp-apps-for-shopify',
  'shopify-whatsapp-automation-what-to-automate-first',
  'ecommerce-automation-whatsapp-vs-email-india',
  'meta-whatsapp-cloud-api-shopify-templates',
  'whatsapp-shared-inbox-shopify-order-context',
  'shopify-automation-checklist-whatsapp-cart-recovery',
  'best-whatsapp-automation-tools-shopify-india',
  'how-to-reduce-rto-with-whatsapp-cod-confirmation',
  'what-is-ecommerce-automation-shopify-whatsapp',
  'ai-whatsapp-chatbot-for-shopify-india',
  'zoko-alternative-shopify-india',
  'getgabs-alternative-shopify-whatsapp',
  'kanal-whatsapp-alternative-shopify',
  'how-to-choose-whatsapp-app-shopify-app-store',
  'whatsapp-business-api-pricing-india',
  'dondy-alternative-shopify-india',
  'organic-vs-paid-ecommerce-marketing-2026',
  'cod-rto-benchmark-india-2026',
  'profitable-ecommerce-business-india',
  'how-to-automate-ecommerce-store-india',
  'organic-ecommerce-leads-short-form-video',
  'trending-products-to-sell-online-india-2026',
  'wati-alternative-shopify-india',
  'aisensy-alternative-shopify-india',
  'interakt-alternative-shopify-india',
  'bitespeed-alternative-shopify-india',
  'whatsapp-template-rejected-meta-shopify-fix',
  'whatsapp-opt-in-shopify-india',
  'updatrr-alternative-shopify-india',
  'cod-to-prepaid-whatsapp-shopify-india',
];

/** Soft-404 shell — prerendered to dist/404.html (Netlify 404 document). Not in sitemap. */
export const NOT_FOUND_PRERENDER_PATH = '/404';

/** Static marketing paths (no trailing slash except root as '/') */
/**
 * Blog archive URLs. Category groups must stay in sync with
 * src/marketing/data/blogCategories.ts, and the page count with
 * BLOG_PAGE_SIZE there (12) against BLOG_SLUGS.length.
 *
 * These are real indexable archives, each self-canonical: they give the deeper
 * posts a second route in from the index instead of only a dated list.
 */
export const BLOG_CATEGORY_SLUGS = [
  'comparisons',
  'automation',
  'cod-rto',
  'meta-templates',
  'ai-and-inbox',
  'growth',
];

export const BLOG_PAGE_SIZE = 12;

/** Page 1 lives at /blog, so this is pages 2..N. */
export function blogPageNumbers() {
  const total = Math.max(1, Math.ceil(BLOG_SLUGS.length / BLOG_PAGE_SIZE));
  return Array.from({ length: total - 1 }, (_, i) => i + 2);
}

/** Worked journey examples (src/marketing/data/journeyExamples.ts). */
export const JOURNEY_EXAMPLE_SLUGS = [
  'abandoned-cart-recovery',
  'cod-confirmation',
  'cod-to-prepaid',
  'order-status-updates',
];

export function getMarketingPrerenderPaths() {
  // privacy/terms are static HTML in public/ (Meta crawler-safe) — do not overwrite via prerender
  return [
    '/',
    '/pricing',
    '/pricing/meta-rates',
    '/features',
    '/services',
    '/integrations',
    '/customers',
    '/compare',
    ...COMPARE_MULTIWAY_SLUGS.map((s) => `/compare/${s}`),
    '/about',
    '/contact',
    '/blog',
    ...blogPageNumbers().map((n) => `/blog/page/${n}`),
    ...BLOG_CATEGORY_SLUGS.map((s) => `/blog/category/${s}`),
    ...FEATURE_SLUGS.map((s) => `/features/${s}`),
    ...COMPARE_SLUGS.map((s) => `/compare/${s}`),
    ...TOPIC_SLUGS.map((s) => `/${s}`),
    '/tools',
    '/tools/best-whatsapp-tool-for-shopify',
    '/tools/rto-cost-calculator',
    '/tools/cart-recovery-calculator',
    '/tools/whatsapp-link-generator',
    '/whatsapp-templates',
    '/whatsapp-journey-examples',
    ...JOURNEY_EXAMPLE_SLUGS.map((s) => `/whatsapp-journey-examples/${s}`),
    ...BLOG_SLUGS.map((s) => `/blog/${s}`),
    NOT_FOUND_PRERENDER_PATH,
  ];
}

/** Indexable URLs for sitemap.xml (includes static legal pages; excludes soft-404 shell). */
export function getSitemapPaths() {
  return [
    ...getMarketingPrerenderPaths().filter((p) => p !== NOT_FOUND_PRERENDER_PATH),
    '/privacy',
    '/terms',
  ];
}
