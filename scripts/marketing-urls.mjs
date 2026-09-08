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

export const SOLUTION_SLUGS = ['fashion', 'beauty', 'food', 'cod', 'agencies'];

export const COMPARE_SLUGS = ['wati', 'interakt', 'bitespeed'];

export const TOPIC_SLUGS = [
  'whatsapp-cart-recovery',
  'cod-confirmation-whatsapp',
  'shopify-whatsapp-integration',
];

export const BLOG_SLUGS = [
  'whatsapp-abandoned-cart-recovery-shopify',
  'shopify-whatsapp-automation-what-to-automate-first',
  'cod-confirmation-whatsapp-reduce-rto-shopify',
  'ecommerce-automation-whatsapp-vs-email-india',
  'meta-whatsapp-cloud-api-shopify-templates',
  'whatsapp-shared-inbox-shopify-order-context',
  'agencies-whatsapp-automation-multi-brand-shopify',
  'shopify-automation-checklist-whatsapp-cart-recovery',
  'best-whatsapp-automation-tools-shopify-india',
  'how-to-reduce-rto-with-whatsapp-cod-confirmation',
  'what-is-ecommerce-automation-shopify-whatsapp',
  'ai-whatsapp-chatbot-for-shopify-india',
];

/** Static marketing paths (no trailing slash except root as '/') */
export function getMarketingPrerenderPaths() {
  const paths = [
    '/',
    '/pricing',
    '/features',
    '/integrations',
    '/customers',
    '/agency',
    '/security',
    '/compare',
    '/about',
    '/contact',
    '/testimonials',
    '/blog',
    ...FEATURE_SLUGS.map((s) => `/features/${s}`),
    ...SOLUTION_SLUGS.map((s) => `/solutions/${s}`),
    ...COMPARE_SLUGS.map((s) => `/compare/${s}`),
    ...TOPIC_SLUGS.map((s) => `/${s}`),
    ...BLOG_SLUGS.map((s) => `/blog/${s}`),
  ];
  return paths;
}
