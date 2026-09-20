/**
 * Single source of marketing URLs for prerender + sitemap generation.
 * Keep in sync with App.tsx routes and blogPosts.
 */

export const FEATURE_SLUGS = [
  'shopify',
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
];

export const COMPARE_SLUGS = ['wati', 'aisensy', 'interakt', 'bitespeed'];

export const TOPIC_SLUGS = ['shopify-whatsapp-integration'];

export const BLOG_SLUGS = [
  'whatsapp-abandoned-cart-recovery-shopify',
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
];

/** Static marketing paths (no trailing slash except root as '/') */
export function getMarketingPrerenderPaths() {
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
  ];
}
