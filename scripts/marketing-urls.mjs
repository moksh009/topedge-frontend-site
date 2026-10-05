/**
 * Single source of marketing URLs for prerender + sitemap generation.
 * Keep in sync with App.tsx routes, MARKETING_FEATURES, and blogPosts.
 *
 * Documentation URLs are the exception: they are imported from the docs manifest
 * rather than restated here, because src/marketing/docs/registry.ts throws when
 * an article and the manifest disagree. A doc page therefore cannot exist at
 * runtime without also being prerendered and listed in the sitemap.
 *
 * Rules:
 * - Only canonical, indexable URLs (no aliases that 301 elsewhere).
 * - Paths have no trailing slash (except `/`).
 * - Do NOT include `/features/shopify` — it redirects to `/integrations`.
 */
import { DOC_PATHS } from '../src/marketing/docs/manifest.mjs';

export { DOC_PATHS };

/** Live feature detail pages (must match MARKETING_FEATURES slugs). */
export const FEATURE_SLUGS = [
  'journeys',
  'live-chat',
  'flow-builder',
  'ai-brain',
  'campaigns',
  'instagram',
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

export const TOPIC_SLUGS = ['shopify-whatsapp-integration'];

export const BLOG_SLUGS = [
  'whatsapp-abandoned-cart-recovery-shopify',
  'whatsapp-automation-for-shopify',
  'best-whatsapp-apps-for-shopify',
  'shopify-whatsapp-automation-what-to-automate-first',
  'cod-confirmation-whatsapp-reduce-rto-shopify',
  'ecommerce-automation-whatsapp-vs-email-india',
  'meta-whatsapp-cloud-api-shopify-templates',
  'whatsapp-shared-inbox-shopify-order-context',
  'shopify-automation-checklist-whatsapp-cart-recovery',
  'best-whatsapp-automation-tools-shopify-india',
  'how-to-reduce-rto-with-whatsapp-cod-confirmation',
  'what-is-ecommerce-automation-shopify-whatsapp',
  'ai-whatsapp-chatbot-for-shopify-india',
  'ai-chatbot-for-shopify',
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
];

/** Soft-404 shell — prerendered to dist/404.html (Netlify 404 document). Not in sitemap. */
export const NOT_FOUND_PRERENDER_PATH = '/404';

/** Static marketing paths (no trailing slash except root as '/') */
export function getMarketingPrerenderPaths() {
  // privacy/terms are static HTML in public/ (Meta crawler-safe) — do not overwrite via prerender
  return [
    '/',
    '/pricing',
    '/features',
    '/integrations',
    '/customers',
    '/compare',
    '/compare/topedge-vs-wati-vs-aisensy',
    '/about',
    '/contact',
    '/blog',
    ...FEATURE_SLUGS.map((s) => `/features/${s}`),
    ...COMPARE_SLUGS.map((s) => `/compare/${s}`),
    ...TOPIC_SLUGS.map((s) => `/${s}`),
    ...BLOG_SLUGS.map((s) => `/blog/${s}`),
    ...DOC_PATHS,
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
