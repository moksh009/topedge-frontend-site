import type { FeatureStoryId } from './home';
import { featureStories } from './home';

export type MarketingFeature = {
  slug: string;
  scene: FeatureStoryId | 'hero';
  label: string;
  title: string;
  body: string;
  bullets: readonly string[];
  outcomes: string[];
  aliases?: string[];
};

/** Canonical public slugs (aligned with netlify.toml redirects) */
export const MARKETING_FEATURES: MarketingFeature[] = [
  {
    slug: 'shopify',
    scene: 'shopify',
    label: 'Shopify connection',
    title: 'Your store data, live in TopEdge',
    body: 'OAuth-connect Shopify once. Products, carts, orders, and COD status sync into the workspace. Edit catalog and settings in the dashboard ,  marketing only tells the story.',
    bullets: [
      'One-click Shopify OAuth',
      'Orders, carts & catalog sync',
      'Edit everything at dash.topedgeai.com',
    ],
    outcomes: [
      'See open carts and recent orders beside WhatsApp threads',
      'Recovery journeys fire from real abandon events',
      'Catalog-grounded AI replies use live SKUs and ₹ prices',
    ],
    aliases: ['store-engine'],
  },
  {
    slug: 'journeys',
    scene: 'journey',
    label: 'Journey',
    title: 'Visual journeys that sell and support on WhatsApp',
    body: 'Drag triggers, waits, conditions, and Meta-approved sends on a canvas. Branch on COD, pause until templates are live, ship without code.',
    bullets: [
      'Trigger → wait → branch → send',
      'COD & Shopify conditions',
      'Nothing fires until Meta approves',
    ],
    outcomes: [
      '3-step cart recovery without custom code',
      'Order update paths that respect Meta utility templates',
      'Gates that block sends until templates are APPROVED',
    ],
    aliases: ['journey', 'order-automations', 'order-messages', 'cart-recovery'],
  },
  {
    slug: 'live-chat',
    scene: 'inbox',
    label: 'Live Chat',
    title: 'Every thread beside the order it belongs to',
    body: 'WhatsApp and Instagram in one inbox. Customer 360 shows order #, COD status, LTV, and cart history ,  agents never tab-switch to Shopify admin.',
    bullets: [
      'Assign, tag, and hand off to humans',
      'AI replies pause on takeover',
      'Full conversation history',
    ],
    outcomes: [
      'Reply with tracking without leaving the thread',
      'Unified WA + IG list with channel filters',
      'Human takeover pauses automation instantly',
    ],
    aliases: ['inbox'],
  },
  {
    slug: 'flow-builder',
    scene: 'flow-builder',
    label: 'Flow Builder',
    title: 'Describe the bot ,  AI drafts the flow canvas',
    body: 'Fill a short AI form (niche, tone, goals). TopEdge generates a WhatsApp flow you can edit node-by-node ,  menus, conditions, catalog sends, human handoff.',
    bullets: [
      'AI form → editable flow',
      'Menus, conditions, handoff',
      'Test before you publish',
    ],
    outcomes: [
      'First conversational flow in minutes, not weeks',
      'Catalog send nodes wired to Shopify products',
      'Handoff into Live Chat when the shopper needs a human',
    ],
  },
  {
    slug: 'ai-brain',
    scene: 'ai-brain',
    label: 'AI Brain',
    title: 'Replies grounded in your catalog ,  not generic chatbots',
    body: 'Intents, store policies, and Shopify products feed the brain. Answers cite real SKUs and prices so support stays on-brand and accurate.',
    bullets: [
      'Catalog + policy knowledge',
      'Intent routing you control',
      'Human takeover anytime',
    ],
    outcomes: [
      'Fewer “let me check and get back” loops',
      'Intent sandbox before go-live',
      'Brain pauses the moment an agent takes over',
    ],
  },
  {
    slug: 'campaigns',
    scene: 'campaigns',
    label: 'Campaigns',
    title: 'Meta-safe broadcasts with honest ₹ costs',
    body: 'Pick an audience, lock an approved marketing template, preview the bubble, then send. See category rates before you spend.',
    bullets: [
      'Segmented audiences',
      'Approved templates only',
      'Transparent Meta ₹ rates',
    ],
    outcomes: [
      'Broadcasts that never sneak past Meta approval',
      'Audience pulls from real lead scores and cart state',
      'Cost clarity before you hit send',
    ],
  },
  {
    slug: 'instagram',
    scene: 'instagram',
    label: 'IG Automation',
    title: 'Comment or story → DM, without leaving Instagram',
    body: 'Auto-reply to comments and story mentions with a WhatsApp or IG DM. Capture interest while it’s hot ,  then continue in Live Chat.',
    bullets: [
      'Comment-to-DM rules',
      'Story reply triggers',
      'Hands off into Live Chat',
    ],
    outcomes: [
      'Turn “price?” comments into conversations',
      'Keep brand voice consistent on auto-DM',
      'One inbox for IG + WhatsApp follow-ups',
    ],
  },
  {
    slug: 'analytics',
    scene: 'analytics',
    label: 'Analytics',
    title: 'Sent → read → clicked → paid ,  the funnel that matters',
    body: 'Track WhatsApp recovery performance with Meta-honest costs. Know which step converts and which template wastes spend.',
    bullets: [
      'Recovery funnel clarity',
      'Template-level performance',
      'Honest Meta cost view',
    ],
    outcomes: [
      'Recovery ₹ instead of vanity open rates alone',
      'See which journey step actually converts',
      'Plan spend with real Meta category rates',
    ],
  },
  {
    slug: 'meta-manager',
    scene: 'meta-manager',
    label: 'Meta Manager',
    title: 'You approve every template before anything sends',
    body: 'Create, sync, and track WhatsApp template status with Meta. Catalog and QR live here too ,  nothing broadcasts until approval lands.',
    bullets: [
      'Library + status sync',
      'Catalog & QR tools',
      'Merchant-owned approval',
    ],
    outcomes: [
      'Clear Pending vs Approved states',
      'QR and deep links for storefront capture',
      'No silent sends on rejected templates',
    ],
  },
  {
    slug: 'audience-crm',
    scene: 'audience',
    label: 'Audience',
    title: 'Segments, scores, and cart leads in one CRM',
    body: 'See who abandoned, who’s VIP, and who’s COD-risk. Build segments for campaigns and journeys from real Shopify + WhatsApp behavior.',
    bullets: [
      'Waterfall interest scores',
      'Abandoned cart leads',
      'Campaign-ready segments',
    ],
    outcomes: [
      'Target warm leads without CSV gymnastics',
      'Scores update from carts, orders, and chats',
      'Segments feed Campaigns and Journeys',
    ],
    aliases: ['audience'],
  },
  {
    slug: 'chat-rules',
    scene: 'inbox',
    label: 'Chat rules',
    title: 'Route the right conversations to the right people',
    body: 'Smart rules for assignment, COD keywords, and escalation ,  so Live Chat stays calm when volume spikes.',
    bullets: [
      'Keyword and intent routing',
      'Assign to ops or sales',
      'Works with AI takeover pause',
    ],
    outcomes: [
      'COD confirmations land with the right team',
      'VIP shoppers skip the queue when you say so',
      'Rules stay editable in the dashboard',
    ],
    aliases: ['rules'],
  },
];

const aliasToSlug = new Map<string, string>();
for (const f of MARKETING_FEATURES) {
  aliasToSlug.set(f.slug, f.slug);
  f.aliases?.forEach((a) => aliasToSlug.set(a, f.slug));
}

export function resolveFeatureSlug(raw: string): string | null {
  return aliasToSlug.get(raw) ?? null;
}

export function getFeatureBySlug(raw: string): MarketingFeature | undefined {
  const slug = resolveFeatureSlug(raw);
  if (!slug) return undefined;
  return MARKETING_FEATURES.find((f) => f.slug === slug);
}

/** Sync homepage story hrefs to canonical feature slugs */
export function canonicalHrefForStory(storyId: string): string {
  const map: Record<string, string> = {
    shopify: '/features/shopify',
    'cart-recovery': '/features/journeys',
    inbox: '/features/live-chat',
    journey: '/features/journeys',
    'flow-builder': '/features/flow-builder',
    'ai-brain': '/features/ai-brain',
    campaigns: '/features/campaigns',
    instagram: '/features/instagram',
    dashboard: '/features',
    analytics: '/features/analytics',
    'meta-manager': '/features/meta-manager',
    audience: '/features/audience-crm',
  };
  return map[storyId] ?? '/features';
}

/** Ensure home stories stay aligned when imported elsewhere */
export function storiesWithCanonicalHrefs() {
  return featureStories.map((s) => ({
    ...s,
    href: canonicalHrefForStory(s.id),
  }));
}
