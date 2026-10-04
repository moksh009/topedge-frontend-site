/**
 * Canonical docs IA — the one ordered list of documentation URLs.
 *
 * Plain `.mjs` on purpose: `scripts/marketing-urls.mjs` imports it directly so
 * prerender and sitemap cover every page automatically, while `registry.ts`
 * imports the same file and throws if an article is missing or unlisted. A slug
 * can therefore never exist in one half of the pipeline and not the other.
 *
 * Order is the reading order — it drives the sidebar and the prev/next footer.
 */

/** @type {{ id: string, label: string, blurb: string }[]} */
export const DOC_GROUPS = [
  {
    id: 'start',
    label: 'Get started',
    blurb: 'Connect Shopify and WhatsApp, then go live in one sitting.',
  },
  {
    id: 'guides',
    label: 'Guides',
    blurb: 'Task-by-task walkthroughs for the automations merchants run first.',
  },
  {
    id: 'reference',
    label: 'Reference',
    blurb: 'Every screen in the dashboard — what each control does and what it needs.',
  },
  {
    id: 'platform',
    label: 'Platform & policy',
    blurb: 'WhatsApp rules, template categories, pricing and plan limits.',
  },
  {
    id: 'help',
    label: 'Help',
    blurb: 'Symptom-first fixes for the errors merchants actually hit.',
  },
];

/**
 * Ordered slugs per group. `''` is the docs home at `/docs`.
 * @type {Record<string, string[]>}
 */
export const DOC_SLUGS_BY_GROUP = {
  start: ['', 'quickstart', 'connect-whatsapp', 'connect-shopify', 'go-live-checklist'],
  guides: [
    'guides/abandoned-cart-recovery',
    'guides/cod-confirmation',
    'guides/order-status-updates',
    'guides/build-your-first-flow',
    'guides/whatsapp-broadcast',
    'guides/shared-inbox-handover',
    'guides/website-opt-in',
    'guides/train-your-ai-brain',
    'guides/warranty-registration',
    'guides/segment-your-customers',
  ],
  reference: [
    'reference/journeys',
    'reference/flow-builder',
    'reference/live-chat',
    'reference/orders',
    'reference/audience-crm',
    'reference/campaigns',
    'reference/email',
    'reference/meta-manager',
    'reference/opt-in-tools',
    'reference/ai-brain',
    'reference/chat-rules',
    'reference/analytics',
    'reference/store-growth',
    'reference/commerce',
    'reference/warranty-hub',
    'reference/settings-billing',
  ],
  platform: [
    'platform/whatsapp-service-window',
    'platform/message-templates',
    'platform/conversation-pricing',
    'platform/limits-and-quotas',
  ],
  help: ['troubleshooting'],
};

/** Flat reading order across every group. */
export const DOC_SLUGS = DOC_GROUPS.flatMap((g) => DOC_SLUGS_BY_GROUP[g.id] || []);

/** `/docs` for the home article, `/docs/<slug>` otherwise. */
export function docPathFor(slug) {
  return slug ? `/docs/${slug}` : '/docs';
}

/** Every indexable documentation URL, in reading order. */
export const DOC_PATHS = DOC_SLUGS.map(docPathFor);
