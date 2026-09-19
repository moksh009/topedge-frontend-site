import type { FeatureStoryId } from './home';
import { featureStories } from './home';

export type MarketingFeature = {
  slug: string;
  scene: FeatureStoryId | 'hero';
  title: string;
  body: string;
  bullets: readonly string[];
  outcomes: string[];
  aliases?: string[];
};

/** Canonical public slugs (aligned with netlify.toml redirects) */
export const MARKETING_FEATURES: MarketingFeature[] = [
  {
    slug: 'journeys',
    scene: 'journey',
    title: 'Visual journeys that sell and support on WhatsApp',
    body: 'Drag Shopify events onto a canvas, start from pre-built templates, and never send until Meta says APPROVED — then read recovered ₹, not vanity sends.',
    bullets: [
      'Drag-and-drop builder — no code',
      'Pre-built cart, COD, and shipping templates',
      'Meta approval gating + recovered ₹',
    ],
    outcomes: [
      '3-step cart recovery without custom code',
      'Journeys blocked until templates are APPROVED',
      'Recovered revenue attribution per journey',
    ],
    aliases: ['journey', 'order-automations', 'order-messages', 'cart-recovery'],
  },
  {
    slug: 'live-chat',
    scene: 'inbox',
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
    title: 'Your catalog + policies + persona — on your API key',
    body: 'Intelligence hub: store knowledge RAG, bot persona, and BYOK Gemini or OpenAI. Intent Detect routes phrases without burning tokens on every message.',
    bullets: [
      'Store knowledge + bot persona',
      'BYOK Gemini or OpenAI',
      'Intent Detect without AI waste',
    ],
    outcomes: [
      'Catalog-grounded replies on your provider bill',
      'Live Chat takeover pauses AI instantly',
      'Flow AI nodes powered by the same hub',
    ],
  },
  {
    slug: 'campaigns',
    scene: 'campaigns',
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
  {
    slug: 'warranty',
    scene: 'audience',
    title: 'Digital warranty on WhatsApp — batches, portal, claims',
    body: 'Link Shopify products to warranty batches, let customers register with WhatsApp OTP, and update claim status without spreadsheets.',
    bullets: [
      'Product batches + coverage rules',
      'Customer portal with WhatsApp OTP',
      'Claims Pending → Approved with WA updates',
    ],
    outcomes: [
      'Serial and warranty window on the unified profile',
      'Packaging QR opens pre-filled warranty chat',
      'Claim status changes notify customers on WhatsApp',
    ],
  },
  {
    slug: 'opt-in-tools',
    scene: 'hero',
    title: 'WhatsApp opt-in tools for your Shopify storefront',
    body: 'Pulse Drop, Popup, Spin wheel, Mystery discount, and WhatsApp widget — capture consented numbers, then campaign and journey from one subscriber list.',
    bullets: [
      'Five storefront capture tools',
      'Subscriber list with marketing consent',
      'Bridge into campaigns at 100+ signups',
    ],
    outcomes: [
      'Publish into Shopify theme without risky surgery',
      'Every opt-in lands in a WhatsApp-ready list',
      'Message consented audiences for recovery and revenue',
    ],
    aliases: ['opt-in', 'optin', 'opt-in-popup', 'optin-popup', 'popup'],
  },
  {
    slug: 'profit-loss',
    scene: 'analytics',
    title: 'After Indian D2C costs, what did I keep?',
    body: 'India-aware Profit & costs — COGS, packaging, payment fees, COD, RTO, and ads — true net profit, not vanity revenue.',
    bullets: [
      '3-step setup: products, fees, COD & returns',
      'Cost waterfall to net profit ₹',
      'Product margins with missing COGS called out',
    ],
    outcomes: [
      'See net profit vs prior period',
      'Plain-language COD and RTO findings',
      'Sample mode labeled until Shopify connects',
    ],
    aliases: ['pnl', 'p-and-l', 'profit-and-loss', 'pl-analytics', 'profit-costs'],
  },
  {
    slug: 'byok',
    scene: 'ai-brain',
    title: 'Bring your own Gemini or OpenAI keys',
    body: 'Merchant-paid API usage on your key — activate AI, pick model, cap reply words, track tokens and cost. Powers Live Chat and Flow AI.',
    bullets: [
      'Gemini and/or OpenAI BYOK',
      'Model + max reply words',
      'Usage KPIs on your provider bill',
    ],
    outcomes: [
      'Your token bill, your spend ceiling',
      'Keyword FAQs work even without a key',
      'Live Chat takeover pauses AI instantly',
    ],
    aliases: ['byok-ai', 'bring-your-own-key'],
  },
  {
    slug: 'intent-detection',
    scene: 'ai-brain',  
    title: 'Route chats by what they mean',
    body: 'Algorithmic intent matches shipping, returns, COD, and handoff — steer flows without burning AI on every message.',
    bullets: [
      'Phrase matching you control',
      'Route without AI spend',
      'Test confidence before go-live',
    ],
    outcomes: [
      'Shipping and returns land on the right flow',
      'Handoff intents open the agent queue',
      'Save AI tokens for hard catalog questions',
    ],
    aliases: ['intent', 'intents'],
  },
];

const aliasToSlug = new Map<string, string>();
for (const f of MARKETING_FEATURES) {
  aliasToSlug.set(f.slug, f.slug);
  f.aliases?.forEach((a) => aliasToSlug.set(a, f.slug));
}

/* Redirected / retired slugs — resolve to surviving hubs */
aliasToSlug.set('segments', 'audience-crm');
aliasToSlug.set('segmentation', 'audience-crm');
aliasToSlug.set('segment', 'audience-crm');
aliasToSlug.set('audience-segments', 'audience-crm');

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
    shopify: '/integrations',
    'cart-recovery': '/features/journeys',
    inbox: '/features/live-chat',
    journey: '/features/journeys',
    'flow-builder': '/features/flow-builder',
    'opt-in-tools': '/features/opt-in-tools',
    'opt-in': '/features/opt-in-tools',
    optin: '/features/opt-in-tools',
    'optin-popup': '/features/opt-in-tools',
    'ai-brain': '/features/ai-brain',
    campaigns: '/features/campaigns',
    instagram: '/features/instagram',
    dashboard: '/features',
    analytics: '/features/analytics',
    'meta-manager': '/features/meta-manager',
    audience: '/features/audience-crm',
    intent: '/features/intent-detection',
    'intent-detection': '/features/intent-detection',
    segmentation: '/features/audience-crm',
    segment: '/features/audience-crm',
    'profit-loss': '/features/profit-loss',
    byok: '/features/byok',
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
