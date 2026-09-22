/**
 * Snippet budgets + page-type schema contracts for Node prerender/audit.
 * Keep numbers in sync with src/marketing/data/seoContracts.ts
 */

export const TITLE_MIN = 15;
export const TITLE_MAX = 65;
export const DESC_MIN = 70;
export const DESC_MAX = 165;

export function assertSnippetBudgets(title, description) {
  const titleLen = [...String(title || '')].length;
  const descriptionLen = [...String(description || '')].length;
  const errors = [];

  if (titleLen < TITLE_MIN) errors.push(`title too short (${titleLen}<${TITLE_MIN})`);
  if (titleLen > TITLE_MAX) errors.push(`title too long (${titleLen}>${TITLE_MAX})`);
  if (descriptionLen < DESC_MIN) errors.push(`description too short (${descriptionLen}<${DESC_MIN})`);
  if (descriptionLen > DESC_MAX) errors.push(`description too long (${descriptionLen}>${DESC_MAX})`);

  return { ok: errors.length === 0, errors, titleLen, descriptionLen };
}

export const PAGE_TYPE_SCHEMA = {
  home: ['Organization', 'SoftwareApplication'],
  pricing: ['SoftwareApplication', 'FAQPage'],
  feature: ['WebPage', 'BreadcrumbList'],
  /** Compare = editorial; no Product/offers (Merchant listings). */
  compare: ['WebPage', 'BreadcrumbList'],
  blog: ['BlogPosting'],
  legal: [],
  notFound: [],
  /** Marketing hubs — budgets + uniqueness only */
  hub: [],
  other: [],
};

export function pageTypeForPath(route) {
  if (route === '/404') return 'notFound';
  if (route === '/') return 'home';
  if (route === '/pricing') return 'pricing';
  if (route === '/privacy' || route === '/terms') return 'legal';
  if (route.startsWith('/blog/') && route !== '/blog') return 'blog';
  if (route.startsWith('/features/') || route === '/features') return 'feature';
  if (route.startsWith('/compare')) return 'compare';
  if (
    route === '/blog' ||
    route === '/about' ||
    route === '/contact' ||
    route === '/integrations' ||
    route === '/customers' ||
    route === '/shopify-whatsapp-integration'
  ) {
    return 'hub';
  }
  return 'other';
}
