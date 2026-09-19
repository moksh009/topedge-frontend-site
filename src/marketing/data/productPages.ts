/**
 * Priority product pages — shared enterprise layout content.
 * Hero media is video or still; bentos use real product screenshots.
 */

export type ProductPageId =
  | 'flow-builder'
  | 'campaigns'
  | 'audience-crm'
  | 'journeys'
  | 'tracking-pixel'
  | 'live-chat'
  | 'ai-brain'
  | 'meta-manager'
  | 'chat-rules'
  | 'instagram'
  | 'warranty'
  | 'profit-loss'
  | 'byok'
  | 'intent-detection';

export type ProductHeroMedia =
  | { kind: 'video'; src: string; poster: string; label: string; glow?: ProductGlow }
  | { kind: 'image'; src: string; alt: string; glow?: ProductGlow };

export type ProductGlow = 'violet' | 'emerald' | 'sky' | 'amber' | 'rose' | 'indigo';

export type ProductBento = {
  titleLead: string;
  titleAccent: string;
  body: string;
  image: string;
  /** default third = equal 3-col row */
  span?: 'third' | 'half' | 'full' | 'wide';
};

export type ProductShowcase = {
  title: string;
  titleAccent?: string;
  body: string;
  /** Dashboard screenshot path — empty string shows a labeled placeholder */
  image: string;
  imageLabel?: string;
  reverse?: boolean;
  /** In-page anchor id (e.g. abandoned-cart) for deep links */
  anchor?: string;
};

export type ProductPage = {
  id: ProductPageId;
  /** Canonical public path */
  path: string;
  /** When set, `/features/:slug` also renders this page */
  featureSlug?: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  hero: ProductHeroMedia;
  /** @deprecated Removed from UI — optional for backwards-compatible data */
  outcomesTitle?: string;
  outcomesAccent?: string;
  outcomes?: { metric: string; label: string; detail: string }[];
  bentoTitle: string;
  bentoAccent: string;
  bentoSub: string;
  bentos: ProductBento[];
  showcasesTitle: string;
  showcasesAccent: string;
  showcasesSub?: string;
  showcases: ProductShowcase[];
  stepsTitle: string;
  stepsAccent: string;
  steps: { title: string; body: string }[];
  relatedTitle: string;
  relatedAccent: string;
  related: { label: string; href: string }[];
  ctaTitle: string;
  ctaSub: string;
};

const CART_VIDEO = {
  src: '/marketing/demos/cart-recovery.mp4',
  poster: '/marketing/demos/cart-recovery-poster.jpg',
} as const;

const COD_VIDEO = {
  src: '/marketing/demos/cod-prepaid11.mp4?v=20260918a',
  poster: '/marketing/demos/cod-prepaid-poster.jpg?v=20260918a',
} as const;

const FLOW_VIDEO = {
  src: '/marketing/demos/flowwww1.mp4?v=20260918a',
  poster: '/marketing/demos/flow-builder-poster.jpg?v=20260918a',
} as const;

export const PRODUCT_PAGES: Record<ProductPageId, ProductPage> = {
  'flow-builder': {
    id: 'flow-builder',
    path: '/features/flow-builder',
    featureSlug: 'flow-builder',
    eyebrow: 'Flow Builder',
    title: 'WhatsApp flows that',
    titleAccent: 'know Shopify',
    subtitle:
      'Fetch orders, update addresses, cancel shipments, and hand off to support — automation that already understands the cart and the SKU.',
    seoTitle: 'WhatsApp Flow Builder for Ecommerce | AI-Drafted Chat Flows',
    seoDescription:
      'Build WhatsApp chatbot flows for Shopify ecommerce — menus, catalog sends, COD FAQs, and human handoff. AI drafts the canvas; you edit and publish.',
    keywords: 'WhatsApp flow builder, WhatsApp chatbot for ecommerce, Shopify chatbot builder',
    hero: {
      kind: 'video',
      ...FLOW_VIDEO,
      label: 'Flow Builder with Shopify tools',
      glow: 'sky',
    },
    outcomesTitle: 'What builders',
    outcomesAccent: 'ship faster',
    outcomes: [
      {
        metric: 'AI draft',
        label: 'Canvas in minutes',
        detail: 'Describe the bot — edit nodes, don’t start blank',
      },
      {
        metric: 'Shopify',
        label: 'Tool nodes',
        detail: 'Orders, address, cancel, catalog — in-flow',
      },
      {
        metric: 'Handoff',
        label: 'To Live Chat',
        detail: 'Humans take over with full thread context',
      },
    ],
    bentoTitle: 'Automation with',
    bentoAccent: 'store context',
    bentoSub: 'Menus and conditions are useful — Shopify-aware nodes are what make flows production-ready.',
    bentos: [
      {
        titleLead: 'Shopify',
        titleAccent: 'tools',
        body: 'Look up orders, change shipping address, cancel fulfillments, and send catalog cards without leaving the flow canvas.',
        image: '/marketing/features/flow-still.jpg',
        span: 'third',
      },
      {
        titleLead: 'Editable',
        titleAccent: 'AI draft',
        body: 'Start from a short form (niche, tone, goals). TopEdge drafts the graph — you tighten branches before publish.',
        image: '/marketing/features/intent-detection-flow.png',
        span: 'third',
      },
      {
        titleLead: 'Test',
        titleAccent: 'then publish',
        body: 'Preview paths before they hit customers so COD FAQs and handoffs don’t surprise ops on launch day.',
        image: '/marketing/features/shopify-whatsapp.png',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'Flow Builder',
    showcasesSub: 'Menus and bots for inbound chat — order updates stay in Journeys.',
    showcases: [
      {
        title: 'Flow list &',
        titleAccent: 'folders',
        body: 'Open your welcome flow or create a new automation — publish replaces the live graph for the next inbound message.',
        image: '/marketing/features/flow-still.jpg',
        imageLabel: 'Flow Builder home — flows and folders',
      },
      {
        title: 'Canvas with',
        titleAccent: 'nodes',
        body: 'Messages, buttons, lists, templates, conditions, Shopify lookups, and Live Chat handoff — edit inline or open full settings.',
        image: '/marketing/features/intent-detection-flow.png',
        imageLabel: 'Flow canvas — message & button nodes',
      },
      {
        title: 'Simulator',
        titleAccent: 'before publish',
        body: 'Test Flow walks buttons and lists without messaging real customers. Fix red validation items, then publish.',
        image: '',
        imageLabel: 'Test Flow simulator phone preview',
      },
    ],

    stepsTitle: 'How a flow',
    stepsAccent: 'goes live',
    steps: [
      {
        title: 'Describe the job',
        body: 'Niche, tone, and goals feed the AI form that scaffolds the first canvas.',
      },
      {
        title: 'Wire Shopify nodes',
        body: 'Attach order lookup, catalog sends, and cancel/update tools where the shopper needs them.',
      },
      {
        title: 'Add human handoff',
        body: 'Route stuck or high-intent threads into Live Chat with history intact.',
      },
      {
        title: 'Publish when ready',
        body: 'Test critical paths, then go live without waiting on an agency sprint.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'recovery + CRM',
    related: [
      { label: 'Cart recovery', href: '/features/journeys#abandoned-cart' },
      { label: 'Campaigns', href: '/features/campaigns' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
    ],
    ctaTitle: 'Build your first Shopify-aware flow',
    ctaSub: 'Draft on a canvas that already speaks orders, SKUs, and WhatsApp handoff.',
  },

  campaigns: {
    id: 'campaigns',
    path: '/features/campaigns',
    featureSlug: 'campaigns',
    eyebrow: 'Campaigns',
    title: 'Audience campaigns',
    titleAccent: 'that attribute revenue',
    subtitle:
      'Pick pixel or recharge audiences, lock a Meta-safe template, and watch attributed WhatsApp revenue — not vanity send counts.',
    seoTitle: 'WhatsApp Marketing Campaigns for Shopify | Meta-Safe Broadcasts',
    seoDescription:
      'Run WhatsApp marketing campaigns on Shopify audiences with Meta-approved templates — drops, restocks, and ecommerce promotions without spam risk.',
    keywords: 'WhatsApp marketing Shopify, WhatsApp broadcast ecommerce, Meta template campaigns India',
    hero: {
      kind: 'image',
      src: '/campaignn.png',
      alt: 'TopEdge WhatsApp marketing campaign templates on mobile',
      glow: 'rose',
    },
    outcomesTitle: 'What growth',
    outcomesAccent: 'teams need',
    outcomes: [
      {
        metric: 'Audiences',
        label: 'Pixel + recharge',
        detail: 'Message people who already showed intent',
      },
      {
        metric: 'Meta-safe',
        label: 'Approved only',
        detail: 'Drafts never blast — templates gate sends',
      },
      {
        metric: '₹',
        label: 'Attributed revenue',
        detail: 'Tie paid orders back to the campaign',
      },
    ],
    bentoTitle: 'Campaigns with',
    bentoAccent: 'guardrails',
    bentoSub: 'Segments, templates, and attribution in one loop — built for Indian D2C WhatsApp growth.',
    bentos: [
      {
        titleLead: 'Template',
        titleAccent: 'gallery',
        body: 'Cart recovery, festive drops, and COD confirms — Meta-safe WhatsApp templates with product cards shoppers actually tap.',
        image: '/campaignn.png',
        span: 'third',
      },
      {
        titleLead: 'Template',
        titleAccent: 'lock',
        body: 'Only APPROVED Meta templates go out — protecting quality rating while you scale sends.',
        image: '/marketing/features/pixel-tracking.png',
        span: 'third',
      },
      {
        titleLead: 'Revenue',
        titleAccent: 'readout',
        body: 'See which campaign actually drove paid Shopify orders, not just delivery receipts.',
        image: '/marketing/demos/segment-poster.jpg',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'campaigns',
    showcasesSub: 'Audience → approved template → attributed ₹.',
    showcases: [
      {
        title: 'Audience',
        titleAccent: 'picker',
        body: 'Pixel, recharge, or CRM segments — message people who already showed intent.',
        image: '/marketing/features/audience-campaigns.png',
        imageLabel: 'Campaign audience selection',
      },
      {
        title: 'Template',
        titleAccent: 'lock',
        body: 'Only APPROVED Meta templates go out — drafts never blast past quality rating.',
        image: '/campaignn.png',
        imageLabel: 'Campaign template gallery',
      },
      {
        title: 'Revenue',
        titleAccent: 'readout',
        body: 'See which campaign drove paid Shopify orders — not just delivery receipts.',
        image: '/marketing/features/pixel-tracking.png',
        imageLabel: 'Attributed campaign revenue',
      },
    ],

    stepsTitle: 'How a campaign',
    stepsAccent: 'ships',
    steps: [
      {
        title: 'Choose the audience',
        body: 'Pixel, recharge, or CRM segment — anyone who has earned a message.',
      },
      {
        title: 'Lock an approved template',
        body: 'Pick copy Meta already cleared so the send cannot leak a draft.',
      },
      {
        title: 'Broadcast on WhatsApp',
        body: 'Deliver at scale with rate and quality controls that protect your number.',
      },
      {
        title: 'Read attributed ₹',
        body: 'Connect paid orders back to the campaign and double down on what worked.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'CRM + pixel',
    related: [
      { label: 'Audience CRM', href: '/features/audience-crm' },
      { label: 'Cart recovery', href: '/features/journeys#abandoned-cart' },
      { label: 'Flow Builder', href: '/features/flow-builder' },
    ],
    ctaTitle: 'Launch a Meta-safe audience campaign',
    ctaSub: 'Segment, approve, send, and measure WhatsApp revenue against Shopify orders.',
  },

  'audience-crm': {
    id: 'audience-crm',
    path: '/features/audience-crm',
    featureSlug: 'audience-crm',
    eyebrow: 'Audience CRM',
    title: 'One shopper across',
    titleAccent: 'chats, orders & care',
    subtitle:
      'Primary + secondary numbers and multiple emails collapse into one lead — so every WhatsApp thread and Shopify order stays on the same customer.',
    seoTitle: 'WhatsApp Audience CRM for Shopify | Segments & Lead Scoring',
    seoDescription:
      'Segment Shopify customers for WhatsApp automation — cart abandoners, COD buyers, VIPs — and score leads for personalized ecommerce messaging.',
    keywords: 'WhatsApp CRM Shopify, ecommerce audience segmentation, WhatsApp lead scoring',
    hero: {
      kind: 'image',
      src: '/marketing/features/unified-identity-lead.png',
      alt: 'Unified customer identity — one lead across numbers and emails',
      glow: 'violet',
    },
    outcomesTitle: 'What CRM',
    outcomesAccent: 'should do',
    outcomes: [
      {
        metric: '1 lead',
        label: 'Unified identity',
        detail: 'Phones + emails stitch into one shopper',
      },
      {
        metric: 'Live',
        label: 'Carts & status',
        detail: 'Recovery and VIP state in the working table',
      },
      {
        metric: 'Care',
        label: 'Orders in-thread',
        detail: 'Warranty and ship updates without tab-hopping',
      },
    ],
    bentoTitle: 'Identity &',
    bentoAccent: 'ops in one place',
    bentoSub: 'The same surfaces your team already works — profiles, stock, and order care.',
    bentos: [
      {
        titleLead: 'Customer',
        titleAccent: 'profiles',
        body: 'Live carts, values, and recovery status — the same table your team works from every day.',
        image: '/2.png?v=1',
        span: 'third',
      },
      {
        titleLead: 'Orders &',
        titleAccent: 'care',
        body: 'Shipments, warranty, and supplier follow-ups without leaving WhatsApp.',
        image: '/1.png?v=1',
        span: 'third',
      },
      {
        titleLead: 'Live',
        titleAccent: 'stock',
        body: 'SKU availability and low-stock signals synced from Shopify into the conversation.',
        image: '/3.png?v=1',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'Audience',
    showcasesSub: 'One shopper across chats, orders, and care.',
    showcases: [
      {
        title: 'Unified',
        titleAccent: 'profiles',
        body: 'Primary + secondary numbers and emails collapse into one lead so threads and orders stay on the same customer.',
        image: '/marketing/features/unified-identity.png',
        imageLabel: 'Audience profile — unified identity',
      },
      {
        title: 'Working',
        titleAccent: 'table',
        body: 'Live carts, values, and recovery status — the same surfaces ops opens every day.',
        image: '/2.png?v=1',
        imageLabel: 'Audience CRM table',
      },
      {
        title: 'Orders &',
        titleAccent: 'care',
        body: 'Shipments and warranty follow-ups without leaving WhatsApp context.',
        image: '/1.png?v=1',
        imageLabel: 'Orders & care beside the lead',
      },
    ],

    stepsTitle: 'How identity',
    stepsAccent: 'stays clean',
    steps: [
      {
        title: 'Touchpoints arrive',
        body: 'Chats, checkouts, and emails come in with different numbers or aliases.',
      },
      {
        title: 'TopEdge stitches the lead',
        body: 'Primary/secondary phones and emails collapse into one master profile.',
      },
      {
        title: 'Ops works one record',
        body: 'Campaigns, recovery, and care all read the same shopper — no duplicate blasts.',
      },
      {
        title: 'Segments stay honest',
        body: 'Audience lists and scores update from real orders and intent, not spreadsheet merges.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'growth tools',
    related: [
      { label: 'Campaigns', href: '/features/campaigns' },
      { label: 'Cart recovery', href: '/features/journeys#abandoned-cart' },
      { label: 'COD → Prepaid', href: '/features/journeys#cod-prepaid' },
    ],
    ctaTitle: 'Run WhatsApp from one customer record',
    ctaSub: 'Unify identity, then recover, campaign, and care without duplicate shoppers.',
  },

  journeys: {
    id: 'journeys',
    path: '/features/journeys',
    featureSlug: 'journeys',
    eyebrow: 'Journey',
    title: 'Visual journeys that',
    titleAccent: 'sell & support',
    subtitle:
      'Drag triggers, waits, conditions, and Meta-approved sends on a canvas. Branch on COD, pause until templates are live, ship without code.',
    seoTitle: 'WhatsApp Cart Recovery Journeys | Abandoned Cart Automation for Shopify',
    seoDescription:
      'Visual journey builder for WhatsApp abandoned cart recovery, COD confirmations, and post-purchase ecommerce automation on Shopify — Meta-approved sends only.',
    keywords:
      'WhatsApp cart recovery, abandoned cart recovery WhatsApp, Shopify journey automation, COD WhatsApp flow',
    hero: {
      kind: 'video',
      ...COD_VIDEO,
      label: 'Visual WhatsApp journey canvas',
      glow: 'violet',
    },
    outcomesTitle: 'What operators',
    outcomesAccent: 'build here',
    outcomes: [
      {
        metric: 'Canvas',
        label: 'Trigger → send',
        detail: 'Waits, branches, and approved templates — no code',
      },
      {
        metric: 'Shopify',
        label: 'Real conditions',
        detail: 'COD, cart value, and order state drive the path',
      },
      {
        metric: 'Gate',
        label: 'Meta-approved only',
        detail: 'Drafts never fire until templates are APPROVED',
      },
    ],
    bentoTitle: 'Journeys for',
    bentoAccent: 'real store events',
    bentoSub: 'Abandoned carts, COD confirms, and order updates — one visual builder, Meta-safe by default.',
    bentos: [
      {
        titleLead: 'Cart',
        titleAccent: 'recovery paths',
        body: 'Time the first nudge, branch on COD vs prepaid, and reopen checkout with live cart lines.',
        image: '/marketing/features/abandoned-cart.png',
        span: 'third',
      },
      {
        titleLead: 'COD',
        titleAccent: 'confirm',
        body: 'Confirm before ship, reschedule, or cancel — then nudge prepaid when margin needs it.',
        image: '/marketing/features/cod-still.jpg',
        span: 'third',
      },
      {
        titleLead: 'Template',
        titleAccent: 'gates',
        body: 'Nothing leaves until Meta approves — so quality rating stays protected as you scale.',
        image: '/marketing/features/flow-still.jpg',
        span: 'third',
      },
    ],
    showcasesTitle: 'Journey',
    showcasesAccent: 'use-cases',
    showcasesSub: 'Abandoned cart and COD → prepaid are Journey paths — one canvas, Meta-safe by default.',
    showcases: [
      {
        anchor: 'abandoned-cart',
        title: 'Abandoned',
        titleAccent: 'Cart',
        body: 'Time the first WhatsApp nudge when a shopper leaves checkout. Branch on COD vs prepaid, reopen live cart lines, and track recovery ₹ — all on the Journey canvas.',
        image: '/marketing/features/abandoned-cart.png',
        imageLabel: 'Abandoned cart recovery journey',
      },
      {
        anchor: 'cod-prepaid',
        title: 'COD →',
        titleAccent: 'Prepaid',
        body: 'Confirm before ship, reschedule, or cancel on WhatsApp — then nudge prepaid when margin needs it. Same visual builder, Shopify payment conditions included.',
        image: '/marketing/features/cod-still.jpg',
        imageLabel: 'COD confirmation journey',
      },
      {
        title: 'Publish &',
        titleAccent: 'measure',
        body: 'Waits, branches, and Meta-approved templates only. Watch sent → clicked → paid, then tighten the steps that leak recovery ₹.',
        image: '/marketing/features/flow-still.jpg',
        imageLabel: 'Journey publish and performance',
      },
    ],

    stepsTitle: 'How a journey',
    stepsAccent: 'ships',
    steps: [
      {
        title: 'Pick the Shopify trigger',
        body: 'Abandon, order created, COD pending — start from the event ops already trusts.',
      },
      {
        title: 'Add waits and branches',
        body: 'Condition on payment method, value, or tags so each shopper gets the right path.',
      },
      {
        title: 'Lock approved templates',
        body: 'Attach Meta-cleared utility or marketing templates — drafts stay blocked.',
      },
      {
        title: 'Publish and measure',
        body: 'Watch sent → clicked → paid, then tighten the steps that leak recovery ₹.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'store + inbox',
    related: [
      { label: 'Flow Builder', href: '/features/flow-builder' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
      { label: 'P&L Analytics', href: '/features/profit-loss' },
    ],
    ctaTitle: 'Build your first WhatsApp journey',
    ctaSub: 'Visual canvas, Shopify conditions, Meta-safe sends — live without custom engineering.',
  },

  'tracking-pixel': {
    id: 'tracking-pixel',
    path: '/features/analytics',
    featureSlug: 'analytics',
    eyebrow: 'Tracking Pixel',
    title: 'Website intent,',
    titleAccent: 'matched to WhatsApp',
    subtitle:
      'Watch live product views, scroll, and carts matched to WhatsApp numbers — so you message shoppers who already showed intent, not cold lists.',
    seoTitle: 'WhatsApp Ecommerce Analytics | Cart Recovery & Campaign ROI',
    seoDescription:
      'Track WhatsApp automation that matters: sent, read, clicked, paid. Measure cart recovery ₹ and campaign ROI for Shopify India brands.',
    keywords: 'WhatsApp analytics Shopify, cart recovery ROI, ecommerce WhatsApp metrics, website tracking pixel WhatsApp',
    hero: {
      kind: 'image',
      src: '/marketing/features/intent-detection-lead.png',
      alt: 'Website tracking pixel matched to WhatsApp numbers',
      glow: 'amber',
    },
    outcomesTitle: 'What the pixel',
    outcomesAccent: 'surfaces',
    outcomes: [
      {
        metric: 'Live',
        label: 'Product & cart intent',
        detail: 'See who is browsing, scrolling, and abandoning now',
      },
      {
        metric: 'Match',
        label: 'To WhatsApp numbers',
        detail: 'Message people you can actually reach on WA',
      },
      {
        metric: '₹',
        label: 'Campaign-ready audiences',
        detail: 'Feed pixel cohorts into Meta-safe broadcasts',
      },
    ],
    bentoTitle: 'Intent that',
    bentoAccent: 'becomes action',
    bentoSub: 'Pixel views and carts become audiences and journeys — not a vanity analytics dashboard.',
    bentos: [
      {
        titleLead: 'Detailed',
        titleAccent: 'tracking',
        body: 'Product views, scroll depth, and cart events stream in so growth sees intent while it is still warm.',
        image: '/marketing/features/pixel-tracking.png',
        span: 'third',
      },
      {
        titleLead: 'Number',
        titleAccent: 'matching',
        body: 'Tie anonymous browsing to WhatsApp identities when opt-in or checkout reveals the number.',
        image: '/marketing/features/intent-detection-lead.png',
        span: 'third',
      },
      {
        titleLead: 'Audience',
        titleAccent: 'handoff',
        body: 'Push pixel cohorts into campaigns and recovery so messages follow real on-site behavior.',
        image: '/campaignn.png',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'tracking',
    showcasesSub: 'Site intent matched to WhatsApp — then campaigns and recovery.',
    showcases: [
      {
        title: 'Live',
        titleAccent: 'intent feed',
        body: 'Product views, scroll, and carts stream in while intent is still warm.',
        image: '/marketing/features/pixel-tracking.png',
        imageLabel: 'Tracking pixel — live product & cart events',
      },
      {
        title: 'Number',
        titleAccent: 'matching',
        body: 'Tie browsing to WhatsApp identities when opt-in or checkout reveals the number.',
        image: '/marketing/features/intent-detection-lead.png',
        imageLabel: 'Intent matched to WhatsApp numbers',
      },
      {
        title: 'Audience',
        titleAccent: 'handoff',
        body: 'Push pixel cohorts into campaigns and recovery so messages follow real on-site behavior.',
        image: '/campaignn.png',
        imageLabel: 'Pixel audience into a campaign',
      },
    ],

    stepsTitle: 'How tracking',
    stepsAccent: 'pays off',
    steps: [
      {
        title: 'Install the pixel',
        body: 'Drop TopEdge tracking on the storefront so product and cart events start flowing.',
      },
      {
        title: 'Intent lights up',
        body: 'Views, scrolls, and abandons appear matched to reachable WhatsApp profiles when available.',
      },
      {
        title: 'Build the audience',
        body: 'Segment lookers and cart leavers for journeys or Meta-safe campaigns.',
      },
      {
        title: 'Message with context',
        body: 'Send recovery or campaign copy that reflects what they actually browsed — then read attributed ₹.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'campaigns + recovery',
    related: [
      { label: 'Campaigns', href: '/features/campaigns' },
      { label: 'Cart recovery', href: '/features/journeys#abandoned-cart' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
    ],
    ctaTitle: 'Turn site intent into WhatsApp revenue',
    ctaSub: 'Match browsing to numbers, then recover and campaign with Meta-safe sends.',
  },

  'live-chat': {
    id: 'live-chat',
    path: '/features/live-chat',
    featureSlug: 'live-chat',
    eyebrow: 'Live Chat',
    title: 'WhatsApp inbox with',
    titleAccent: 'order context',
    subtitle:
      'Reply, take over from the bot, send Approved templates after 24h, and open Customer 360 — without leaving the thread for Shopify admin.',
    seoTitle: 'WhatsApp Shared Inbox for Shopify | Live Chat with Order Context',
    seoDescription:
      'Unified WhatsApp and Instagram inbox with Shopify order context. Agents recover carts, confirm COD, and hand off AI without leaving the thread.',
    keywords: 'WhatsApp shared inbox Shopify, ecommerce live chat WhatsApp, WhatsApp customer support Shopify',
    hero: {
      kind: 'image',
      src: '/marketing/customers/customers-outcome-inbox.png',
      alt: 'TopEdge Live Chat inbox with conversation list and open thread',
      glow: 'sky',
    },
    outcomesTitle: 'What support',
    outcomesAccent: 'teams feel',
    outcomes: [
      {
        metric: '24h',
        label: 'Session aware',
        detail: 'Free text inside window — templates outside',
      },
      {
        metric: 'Takeover',
        label: 'Bot pauses',
        detail: 'Take control stops automation until Release',
      },
      {
        metric: '360°',
        label: 'Beside the thread',
        detail: 'Orders, tags, opt-in — jump to Audience',
      },
    ],
    bentoTitle: 'Inbox built for',
    bentoAccent: 'Shopify ops',
    bentoSub: 'List left, thread center, contact panel right — agents answer with cart and order context.',
    bentos: [
      {
        titleLead: 'Thread +',
        titleAccent: 'composer',
        body: 'Open unread first, check the 24h window, then free-text or pick an Approved template when the session expired.',
        image: '/marketing/customers/customers-outcome-inbox.png',
        span: 'third',
      },
      {
        titleLead: 'Take',
        titleAccent: 'control',
        body: 'Pause Flow Builder on the thread so only your team replies. Release to bot resumes automation on the next inbound.',
        image: '/marketing/solutions/sol-fashion-inbox.png',
        span: 'third',
      },
      {
        titleLead: 'Customer',
        titleAccent: '360',
        body: 'Orders, tags, and opt-in live in the contact panel — assign or resolve without tab-switching to Shopify.',
        image: '/marketing/solutions/sol-electronics-inbox-saas.png',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'Live Chat',
    showcasesSub: 'Reply, takeover, templates, and filters — same names as the dashboard docs.',
    showcases: [
      {
        title: 'Inbox',
        titleAccent: 'layout',
        body: 'Conversation list on the left, open thread in the center, contact panel on the right — unread bubbles to the top.',
        image: '/marketing/customers/customers-outcome-inbox.png',
        imageLabel: 'Live Chat inbox — list, thread, contact panel',
      },
      {
        title: 'Composer &',
        titleAccent: '24h window',
        body: 'Inside 24h of the customer’s last message → free text. Outside → pick an Approved utility or marketing template.',
        image: '/marketing/solutions/sol-fashion-inbox-saas.png',
        imageLabel: 'Open conversation with composer and session state',
      },
      {
        title: 'Search &',
        titleAccent: 'filters',
        body: 'Filter by status, assignee, or date. Search name, phone, or message snippet — then assign or resolve.',
        image: '',
        imageLabel: 'Live Chat filters — assigned, open, needs help',
      },
    ],
    stepsTitle: 'How a reply',
    stepsAccent: 'gets done',
    steps: [
      {
        title: 'Open the thread',
        body: 'Click a row in the inbox — unread threads bubble to the top.',
      },
      {
        title: 'Check the session',
        body: 'Inside 24h send free text; outside pick an Approved template in the composer.',
      },
      {
        title: 'Take control if needed',
        body: 'Pause the bot so only your team replies — Release when you’re done.',
      },
      {
        title: 'Resolve or assign',
        body: 'Use Customer 360 for orders and tags, then resolve the ticket or route to a teammate.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'AI + flows',
    related: [
      { label: 'AI Brain', href: '/features/ai-brain' },
      { label: 'Flow Builder', href: '/features/flow-builder' },
      { label: 'Chat rules', href: '/features/chat-rules' },
    ],
    ctaTitle: 'Put support next to the order',
    ctaSub: 'Connect WhatsApp, publish a flow, and answer with Shopify context in one inbox.',
  },

  'ai-brain': {
    id: 'ai-brain',
    path: '/features/ai-brain',
    featureSlug: 'ai-brain',
    eyebrow: 'AI Brain',
    title: 'Catalog-grounded',
    titleAccent: 'WhatsApp AI',
    subtitle:
      'Train intents, connect Gemini or OpenAI, and keep store knowledge + bot personality in one hub — so replies cite real SKUs, not generic chatbots.',
    seoTitle: 'AI WhatsApp Chatbot for Shopify | Catalog-Grounded Answers',
    seoDescription:
      'AI Brain answers WhatsApp shoppers using live Shopify SKUs and ₹ prices — ecommerce automation that stays honest to your catalog.',
    keywords: 'AI WhatsApp chatbot Shopify, ecommerce AI chatbot India, catalog WhatsApp AI',
    hero: {
      kind: 'image',
      src: '/marketing/features/intent-detection-flow.png',
      alt: 'TopEdge AI Brain intents and catalog-grounded replies',
      glow: 'violet',
    },
    outcomesTitle: 'What AI',
    outcomesAccent: 'should do',
    outcomes: [
      {
        metric: 'Intents',
        label: 'You control',
        detail: 'Phrases, actions, and Active toggles',
      },
      {
        metric: 'Knowledge',
        label: 'Store-first',
        detail: 'Policies and FAQs cited before freeform AI',
      },
      {
        metric: 'Handoff',
        label: 'To Live Chat',
        detail: 'Takeover pauses the brain instantly',
      },
    ],
    bentoTitle: 'Intelligence with',
    bentoAccent: 'guardrails',
    bentoSub: 'Intents route; store knowledge grounds answers; Live Chat takeover always wins.',
    bentos: [
      {
        titleLead: 'Intent',
        titleAccent: 'training',
        body: 'Add 5–10 real phrases (Hinglish welcome), set reply / flow / assign actions, then Activate — inactive intents never match live.',
        image: '/marketing/features/intent-detection-flow.png',
        span: 'third',
      },
      {
        titleLead: 'Store',
        titleAccent: 'knowledge',
        body: 'Policies, sizing, and FAQs live beside the AI key — the bot cites that first instead of inventing answers.',
        image: '/marketing/features/intent-detection-lead.png',
        span: 'third',
      },
      {
        titleLead: 'Test',
        titleAccent: 'confidence',
        body: 'Hub Test modal shows matched intent and confidence before go-live — fix weak phrases before customers do.',
        image: '/marketing/features/shopify-whatsapp.png',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'AI Brain',
    showcasesSub: 'Intents, AI key, knowledge, and personality — same hub as the product docs.',
    showcases: [
      {
        title: 'Intents',
        titleAccent: 'list',
        body: 'Phrases, action, and Active toggle per intent — Shipping, Returns, COD confirm, and handoff queues.',
        image: '',
        imageLabel: 'Intents list — phrases, action, active toggle',
      },
      {
        title: 'Intent',
        titleAccent: 'editor',
        body: 'Write example phrases customers actually send, then choose reply text, start a Flow, assign agent, or escalate.',
        image: '/marketing/features/intent-detection-flow.png',
        imageLabel: 'Intent editor — example phrases and action',
      },
      {
        title: 'Test',
        titleAccent: 'modal',
        body: 'Type sample messages and check confidence. Split broad intents or add phrases when matches look weak.',
        image: '',
        imageLabel: 'Intent test — matched intent and confidence',
      },
    ],
    stepsTitle: 'How the brain',
    stepsAccent: 'goes live',
    steps: [
      {
        title: 'Connect an AI key',
        body: 'Intelligence → AI — Gemini or OpenAI. Keyword-only FAQs still work without a key.',
      },
      {
        title: 'Add store knowledge',
        body: 'Policies, sizing, and FAQs the bot should cite before freeform generation.',
      },
      {
        title: 'Train intents',
        body: 'Create intents, add real phrases, set actions, then toggle Active.',
      },
      {
        title: 'Test, then hand off',
        body: 'Use the Test modal for confidence — Live Chat takeover pauses AI the moment an agent takes control.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'inbox + flows',
    related: [
      { label: 'Live Chat', href: '/features/live-chat' },
      { label: 'Flow Builder', href: '/features/flow-builder' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
    ],
    ctaTitle: 'Ground your WhatsApp AI in the catalog',
    ctaSub: 'Train intents, cite store knowledge, and hand off to humans when it matters.',
  },

  'meta-manager': {
    id: 'meta-manager',
    path: '/features/meta-manager',
    featureSlug: 'meta-manager',
    eyebrow: 'Meta Manager',
    title: 'Approve templates',
    titleAccent: 'before anything sends',
    subtitle:
      'Library, Blueprints, catalog, and QR in one place — Pending vs Approved stays honest so Journeys and campaigns never blast rejected copy.',
    seoTitle: 'Meta WhatsApp Template Manager | Cloud API for Shopify Brands',
    seoDescription:
      'Submit, track, and approve Meta WhatsApp templates for ecommerce automation — utility and marketing categories with transparent rates.',
    keywords: 'Meta WhatsApp template manager, WhatsApp Cloud API Shopify, Meta template approval India',
    hero: {
      kind: 'image',
      src: '/marketing/customers/customers-outcome-template.png',
      alt: 'TopEdge Meta Manager template library with approval status',
      glow: 'indigo',
    },
    outcomesTitle: 'What Meta',
    outcomesAccent: 'requires',
    outcomes: [
      {
        metric: 'Approved',
        label: 'Before Live',
        detail: 'Journeys and campaigns pick green templates only',
      },
      {
        metric: 'Blueprints',
        label: 'Cart · COD · order',
        detail: 'Same packs Journeys use — prefilled mappings',
      },
      {
        metric: 'Catalog',
        label: '+ QR',
        detail: 'Import products; wa.me QR for ads and packaging',
      },
    ],
    bentoTitle: 'Compliance with',
    bentoAccent: 'commerce speed',
    bentoSub: 'Draft → Submit → Approved — then wire into Journeys, Flow Builder, or Campaigns.',
    bentos: [
      {
        titleLead: 'Template',
        titleAccent: 'library',
        body: 'Draft, pending, approved, rejected in one list. Read Meta’s rejection reason on the row, fix copy, resubmit.',
        image: '/marketing/customers/customers-outcome-template.png',
        span: 'third',
      },
      {
        titleLead: 'Blueprints',
        titleAccent: 'for Journeys',
        body: 'Cart recovery (3 WA + email), COD → prepaid, and order confirmed — create rows with live product headers prefilled.',
        image: '/campaignn.png',
        span: 'third',
      },
      {
        titleLead: 'Catalog',
        titleAccent: '& QR',
        body: 'Import from Meta or Shopify, refresh after catalog changes, and download wa.me QR for storefront or ads.',
        image: '/marketing/features/shopify-whatsapp.png',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'Meta Manager',
    showcasesSub: 'Library, builder, Blueprints, catalog, QR — approve here before anything sends live.',
    showcases: [
      {
        title: 'Library',
        titleAccent: 'statuses',
        body: 'See draft, pending, approved, and rejected at a glance. Sync from Meta when templates were created outside TopEdge.',
        image: '/marketing/customers/customers-outcome-template.png',
        imageLabel: 'Meta Manager library — draft, pending, approved',
      },
      {
        title: 'Template',
        titleAccent: 'studio',
        body: 'Named variables like {{first_name}} map to Meta slots on submit. Utility stays transactional — marketing owns promos.',
        image: '',
        imageLabel: 'Template builder — body variables and buttons',
      },
      {
        title: 'Catalog',
        titleAccent: '& QR codes',
        body: 'Product catalog for WhatsApp commerce cards; QR tab downloads PNG links that open a flow or catalog on scan.',
        image: '',
        imageLabel: 'Catalog import and wa.me QR download',
      },
    ],
    stepsTitle: 'How a template',
    stepsAccent: 'goes Approved',
    steps: [
      {
        title: 'Create in Library',
        body: 'Pick Marketing, Utility, or Authentication — names in lowercase_with_underscores.',
      },
      {
        title: 'Map variables',
        body: 'Write body + named fields; choose Live product header for cart / COD / order blueprints.',
      },
      {
        title: 'Submit to Meta',
        body: 'Wait minutes to 24h. Fix rejections from the row reason, then resubmit.',
      },
      {
        title: 'Use in automations',
        body: 'Pick Approved templates in Journeys, Flow Builder, or Campaigns — never silent sends on rejected rows.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'sends',
    related: [
      { label: 'Campaigns', href: '/features/campaigns' },
      { label: 'Journeys', href: '/features/journeys' },
      { label: 'Cart recovery', href: '/features/journeys#abandoned-cart' },
    ],
    ctaTitle: 'Own every Meta approval',
    ctaSub: 'Submit templates, sync status, and only blast what Meta already greenlit.',
  },

  'chat-rules': {
    id: 'chat-rules',
    path: '/features/chat-rules',
    featureSlug: 'chat-rules',
    eyebrow: 'Chat rules',
    title: 'Route the right chats',
    titleAccent: 'to the right people',
    subtitle:
      'Keyword and intent routing, COD escalations, and VIP skips — so Live Chat stays calm when volume spikes and AI takeover pauses stay respected.',
    seoTitle: 'WhatsApp Chat Rules for Ecommerce | Auto-Route & Assign',
    seoDescription:
      'Route WhatsApp conversations for Shopify teams — rules for tags, assignments, and handoff so ecommerce support stays fast and organized.',
    keywords: 'WhatsApp chat rules, ecommerce inbox routing, WhatsApp assignment Shopify',
    hero: {
      kind: 'image',
      src: '/marketing/solutions/sol-fashion-inbox.png',
      alt: 'TopEdge chat rules routing WhatsApp conversations to the right team',
      glow: 'amber',
    },
    outcomesTitle: 'What routing',
    outcomesAccent: 'protects',
    outcomes: [
      {
        metric: 'COD',
        label: 'to ops',
        detail: 'Confirmations land with the right queue',
      },
      {
        metric: 'VIP',
        label: 'skip the line',
        detail: 'High-LTV shoppers route when you say so',
      },
      {
        metric: 'AI',
        label: 'respects takeover',
        detail: 'Rules work with Live Chat pause',
      },
    ],
    bentoTitle: 'Rules that',
    bentoAccent: 'keep the inbox calm',
    bentoSub: 'Assignment, keywords, and escalation — editable in the dashboard when volume spikes.',
    bentos: [
      {
        titleLead: 'Keyword',
        titleAccent: 'routing',
        body: 'Match COD, refund, or “talk to human” phrases and assign to ops or sales before the queue piles up.',
        image: '/marketing/solutions/sol-fashion-inbox.png',
        span: 'third',
      },
      {
        titleLead: 'Intent',
        titleAccent: 'handoff',
        body: 'Pair with AI Brain handoff intents so escalation opens the right agent queue with thread history intact.',
        image: '/marketing/features/intent-detection-lead.png',
        span: 'third',
      },
      {
        titleLead: 'Assign',
        titleAccent: '& filters',
        body: 'Live Chat status filters (assigned to me, open, needs help) stay aligned with the rules you publish.',
        image: '/marketing/customers/customers-outcome-inbox.png',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'chat rules',
    showcasesSub: 'Route, assign, escalate — then agents finish in Live Chat with order context.',
    showcases: [
      {
        title: 'Rule',
        titleAccent: 'builder',
        body: 'Define triggers (keyword, intent, tag) and actions (assign, escalate, pause bot) without redeploying code.',
        image: '',
        imageLabel: 'Chat rules builder — triggers and assign actions',
      },
      {
        title: 'Queue',
        titleAccent: 'assignment',
        body: 'COD confirms and VIP threads land with the right teammate — filters show assigned to me / needs help.',
        image: '/marketing/solutions/sol-fashion-inbox-saas.png',
        imageLabel: 'Live Chat filters aligned with routing rules',
      },
      {
        title: 'AI +',
        titleAccent: 'takeover',
        body: 'When an agent Takes control, automation pauses until Release — rules never fight human replies.',
        image: '/marketing/customers/customers-outcome-inbox.png',
        imageLabel: 'Take control pauses bot while rules stay active',
      },
    ],
    stepsTitle: 'How routing',
    stepsAccent: 'goes live',
    steps: [
      {
        title: 'Map the queues',
        body: 'Decide who owns COD, refunds, and VIP — then name the filters agents already use.',
      },
      {
        title: 'Add keyword rules',
        body: 'Match the phrases shoppers actually type; keep utility language separate from promo intent.',
      },
      {
        title: 'Wire AI handoff',
        body: 'Point escalation intents at the same queues so bot and rules agree.',
      },
      {
        title: 'Watch Live Chat',
        body: 'Confirm assigned threads and takeover pause behave under a test spike.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'inbox + AI',
    related: [
      { label: 'Live Chat', href: '/features/live-chat' },
      { label: 'AI Brain', href: '/features/ai-brain' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
    ],
    ctaTitle: 'Keep Live Chat calm at peak',
    ctaSub: 'Route COD and VIP correctly — then let agents finish with order context.',
  },

  instagram: {
    id: 'instagram',
    path: '/features/instagram',
    featureSlug: 'instagram',
    eyebrow: 'IG Automation',
    title: 'Comment or story',
    titleAccent: '→ DM',
    subtitle:
      'Turn “price please?” comments and story mentions into Instagram or WhatsApp DMs — then continue in Live Chat with the same customer thread.',
    seoTitle: 'Instagram to WhatsApp Automation | Comment-to-DM for Shopify',
    seoDescription:
      'Turn Instagram comments and stories into WhatsApp DMs connected to Shopify — ecommerce automation for “price please?” and drop traffic.',
    keywords: 'Instagram WhatsApp automation, comment to DM Shopify, IG automation ecommerce',
    hero: {
      kind: 'image',
      src: '/marketing/features/optin-popup.png',
      alt: 'Instagram comment-to-DM automation connected to TopEdge Live Chat',
      glow: 'rose',
    },
    outcomesTitle: 'What IG',
    outcomesAccent: 'traffic needs',
    outcomes: [
      {
        metric: 'Comment',
        label: '→ DM',
        detail: 'Capture price questions while interest is hot',
      },
      {
        metric: 'Story',
        label: 'triggers',
        detail: 'Mentions and replies open a conversation',
      },
      {
        metric: 'Inbox',
        label: 'handoff',
        detail: 'IG + WhatsApp follow-ups in Live Chat',
      },
    ],
    bentoTitle: 'Social entry,',
    bentoAccent: 'commerce follow-through',
    bentoSub: 'Automate the first DM, keep brand voice consistent, then finish sales in the shared inbox.',
    bentos: [
      {
        titleLead: 'Comment',
        titleAccent: 'rules',
        body: 'Auto-reply to comment keywords with a DM — turn drop comments into conversations without leaving Instagram.',
        image: '/marketing/features/optin-popup.png',
        span: 'third',
      },
      {
        titleLead: 'Story',
        titleAccent: 'replies',
        body: 'Story mention and reply triggers open a DM while the viewer is still mid-scroll.',
        image: '/marketing/features/unified-identity.png',
        span: 'third',
      },
      {
        titleLead: 'Live Chat',
        titleAccent: 'continue',
        body: 'Handoff into the same inbox as WhatsApp so agents see IG context beside Shopify orders.',
        image: '/marketing/customers/customers-outcome-inbox.png',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'IG automation',
    showcasesSub: 'Comment and story rules — then one inbox for follow-ups.',
    showcases: [
      {
        title: 'Comment-to',
        titleAccent: '-DM rules',
        body: 'Match keywords like “price” or “link” and send a branded DM with catalog or WhatsApp deep link.',
        image: '',
        imageLabel: 'IG comment-to-DM rule builder',
      },
      {
        title: 'Story',
        titleAccent: 'triggers',
        body: 'Story reply and mention automations capture interest before the viewer scrolls away.',
        image: '',
        imageLabel: 'Story reply automation settings',
      },
      {
        title: 'Inbox',
        titleAccent: 'handoff',
        body: 'Continue the thread in Live Chat — WA + IG list with channel filters and Customer 360.',
        image: '/marketing/customers/customers-outcome-inbox.png',
        imageLabel: 'Live Chat with Instagram thread beside WhatsApp',
      },
    ],
    stepsTitle: 'How IG',
    stepsAccent: 'becomes revenue',
    steps: [
      {
        title: 'Connect Instagram',
        body: 'Link the business account in Settings → Connections alongside WhatsApp.',
      },
      {
        title: 'Publish comment rules',
        body: 'Define keywords and the first DM copy — keep brand voice consistent.',
      },
      {
        title: 'Add story triggers',
        body: 'Turn mentions and replies into conversations while attention is warm.',
      },
      {
        title: 'Finish in Live Chat',
        body: 'Agents pick up IG threads next to WhatsApp with order context when the shopper is ready to buy.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'inbox + Meta',
    related: [
      { label: 'Live Chat', href: '/features/live-chat' },
      { label: 'Meta Manager', href: '/features/meta-manager' },
      { label: 'Campaigns', href: '/features/campaigns' },
    ],
    ctaTitle: 'Turn IG comments into conversations',
    ctaSub: 'Automate the first DM, then close in Live Chat with Shopify context.',
  },

  warranty: {
    id: 'warranty',
    path: '/features/warranty',
    featureSlug: 'warranty',
    eyebrow: 'Warranty',
    title: 'Digital warranty',
    titleAccent: 'on WhatsApp',
    subtitle:
      'Product batches, customer portal with WhatsApp OTP, and claim status updates — serial and coverage stay on the unified profile, not a spreadsheet.',
    seoTitle: 'WhatsApp Warranty for Shopify | Digital Warranty & Claims',
    seoDescription:
      'Assign product warranties on WhatsApp for Shopify brands — customer registration portal, OTP, claim workflow, and status updates tied to orders.',
    keywords: 'WhatsApp warranty Shopify, digital warranty ecommerce India, warranty assignment WhatsApp, product warranty CRM',
    hero: {
      kind: 'image',
      src: '/marketing/solutions/sol-electronics-warranty-saas.png',
      alt: 'TopEdge warranty assignment and claims on WhatsApp',
      glow: 'emerald',
    },
    bentoTitle: 'Warranty that',
    bentoAccent: 'stays with the order',
    bentoSub: 'Batches, portal registration, and claim updates — wired to Shopify products and WhatsApp.',
    bentos: [
      {
        titleLead: 'Product',
        titleAccent: 'batches',
        body: 'Link Shopify products, set validity dates and coverage rules — registrations prove against real orders.',
        image: '/marketing/solutions/sol-electronics-warranty-saas.png',
        span: 'third',
      },
      {
        titleLead: 'Customer',
        titleAccent: 'portal',
        body: 'Mobile-first /warranty-registration with WhatsApp OTP — shoppers register serials without calling support.',
        image: '/marketing/features/unified-identity.png',
        span: 'third',
      },
      {
        titleLead: 'Claims',
        titleAccent: 'workflow',
        body: 'Pending → Approved / Shipped or Rejected with reason — WhatsApp status updates go out when you act.',
        image: '/marketing/features/orders-ops.png',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'Warranty',
    showcasesSub: 'Enable the hub, share the portal, and run claims with WhatsApp updates.',
    showcases: [
      {
        title: 'Warranty',
        titleAccent: 'hub',
        body: 'Create batches, set support contacts, and share the public claim URL — plan-gated when enabled for your workspace.',
        image: '/marketing/solutions/sol-electronics-warranty-saas.png',
        imageLabel: 'Warranty admin workspace — batches and coverage',
      },
      {
        title: 'Registration',
        titleAccent: 'portal',
        body: 'Customers register with order proof and WhatsApp OTP. Registrations appear in the admin workspace for review.',
        image: '',
        imageLabel: 'Customer warranty registration portal with OTP',
      },
      {
        title: 'QR on',
        titleAccent: 'packaging',
        body: 'Meta Manager QR codes open WhatsApp with a pre-filled warranty message — print on packaging or inserts.',
        image: '',
        imageLabel: 'wa.me QR for warranty registration',
      },
    ],
    stepsTitle: 'How warranty',
    stepsAccent: 'goes live',
    steps: [
      {
        title: 'Connect Shopify + WhatsApp',
        body: 'Orders and OTP both need live channels before registrations succeed.',
      },
      {
        title: 'Create product batches',
        body: 'Link SKUs, validity windows, and coverage rules in the Warranty hub.',
      },
      {
        title: 'Share the portal',
        body: 'Send /warranty-registration or a packaging QR so customers can self-register.',
      },
      {
        title: 'Run claims',
        body: 'Review proof, approve or reject — WhatsApp updates the customer when status changes.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'CRM + Meta',
    related: [
      { label: 'Audience CRM', href: '/features/audience-crm' },
      { label: 'Meta Manager', href: '/features/meta-manager' },
      { label: 'Electronics solution', href: '/solutions/electronics' },
    ],
    ctaTitle: 'Put warranty on WhatsApp',
    ctaSub: 'Batches, portal OTP, and claim updates — tied to Shopify orders.',
  },

  'profit-loss': {
    id: 'profit-loss',
    path: '/features/profit-loss',
    featureSlug: 'profit-loss',
    eyebrow: 'P&L Analytics',
    title: 'WhatsApp spend vs',
    titleAccent: 'real profit',
    subtitle:
      'See recovery ₹, campaign cost, and Meta category rates beside contribution — so growth knows what actually paid, not just what opened.',
    seoTitle: 'WhatsApp P&L Analytics for Shopify | Recovery ROI & Meta Costs',
    seoDescription:
      'Track WhatsApp profit and loss for Shopify ecommerce — cart recovery revenue, campaign Meta costs, and contribution margins in one analytics view.',
    keywords: 'WhatsApp P&L analytics Shopify, cart recovery ROI, Meta cost ecommerce India, WhatsApp profit loss',
    hero: {
      kind: 'image',
      src: '/marketing/features/pixel-tracking.png',
      alt: 'TopEdge P&L analytics for WhatsApp recovery and campaigns',
      glow: 'amber',
    },
    bentoTitle: 'Analytics that',
    bentoAccent: 'follow the money',
    bentoSub: 'Sent → read → clicked → paid — with Meta ₹ honesty and recovery attribution.',
    bentos: [
      {
        titleLead: 'Recovery',
        titleAccent: '₹',
        body: 'Attribute paid orders back to cart and COD journeys — not vanity open rates alone.',
        image: '/marketing/features/abandoned-cart.png',
        span: 'third',
      },
      {
        titleLead: 'Meta',
        titleAccent: 'cost clarity',
        body: 'Marketing, utility, and service category rates sit beside campaign spend so finance is not guessing.',
        image: '/marketing/customers/customers-outcome-template.png',
        span: 'third',
      },
      {
        titleLead: 'Contribution',
        titleAccent: 'view',
        body: 'Margins from Store engine products meet WhatsApp costs — see which SKUs and journeys earn after message fees.',
        image: '/marketing/features/orders-ops.png',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'P&L',
    showcasesSub: 'Revenue, Meta costs, and team performance — the funnel that matters for ecommerce WhatsApp.',
    showcases: [
      {
        title: 'Recovery',
        titleAccent: 'funnel',
        body: 'Sent → read → clicked → paid for cart and COD journeys — spot which step leaks ₹.',
        image: '/marketing/features/abandoned-cart.png',
        imageLabel: 'Cart recovery funnel with attributed revenue',
      },
      {
        title: 'Campaign',
        titleAccent: 'ROI',
        body: 'Broadcast spend vs attributed orders — Meta category rates before you hit send, outcomes after.',
        image: '/campaignn.png',
        imageLabel: 'Campaign P&L with Meta category costs',
      },
      {
        title: 'Margin',
        titleAccent: 'by product',
        body: 'Store engine margins + WhatsApp costs show contribution so high-send SKUs do not hide loss.',
        image: '',
        imageLabel: 'Product contribution vs WhatsApp spend',
      },
    ],
    stepsTitle: 'How P&L',
    stepsAccent: 'gets honest',
    steps: [
      {
        title: 'Connect store + WhatsApp',
        body: 'Orders and Meta sends need live channels before attributed ₹ appears.',
      },
      {
        title: 'Set product margins',
        body: 'Store engine margins feed contribution — without them, P&L is revenue-only.',
      },
      {
        title: 'Run recovery & campaigns',
        body: 'Journeys and broadcasts create the cost and revenue events Analytics reads.',
      },
      {
        title: 'Read the funnel',
        body: 'Cut templates or journeys that spend Meta ₹ without paid orders.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'growth',
    related: [
      { label: 'Campaigns', href: '/features/campaigns' },
      { label: 'Cart recovery', href: '/features/journeys#abandoned-cart' },
      { label: 'Tracking pixel', href: '/features/analytics' },
    ],
    ctaTitle: 'See WhatsApp profit, not vanity opens',
    ctaSub: 'Recovery ₹, Meta costs, and contribution — in one analytics workspace.',
  },

  byok: {
    id: 'byok',
    path: '/features/byok',
    featureSlug: 'byok',
    eyebrow: 'BYOK AI',
    title: 'Bring your own',
    titleAccent: 'AI keys',
    subtitle:
      'Connect Gemini or OpenAI per workspace — encrypted keys, your token bill, catalog-grounded RAG — without jumping to an enterprise AI add-on tier.',
    seoTitle: 'BYOK AI for WhatsApp Shopify | Bring Your Own Gemini or OpenAI Key',
    seoDescription:
      'Bring your own AI API keys to TopEdge — Gemini or OpenAI BYOK for Shopify WhatsApp automation with store knowledge RAG and ~₹0.2–₹0.3 optimised token usage.',
    keywords: 'BYOK AI WhatsApp Shopify, bring your own OpenAI key ecommerce, Gemini WhatsApp chatbot India',
    hero: {
      kind: 'image',
      src: '/marketing/features/intent-detection-flow.png',
      alt: 'TopEdge BYOK AI key settings for Gemini and OpenAI',
      glow: 'violet',
    },
    bentoTitle: 'AI you',
    bentoAccent: 'control',
    bentoSub: 'Your keys, your spend ceiling, store knowledge first — Live Chat takeover always wins.',
    bentos: [
      {
        titleLead: 'Gemini or',
        titleAccent: 'OpenAI',
        body: 'Connect API key in Intelligence → AI. Encrypted per workspace — keyword FAQs still work without a key.',
        image: '/marketing/features/intent-detection-flow.png',
        span: 'third',
      },
      {
        titleLead: 'Store',
        titleAccent: 'knowledge RAG',
        body: 'Policies, sizing, and FAQs are cited before freeform generation — answers stay honest to your catalog.',
        image: '/marketing/features/intent-detection-lead.png',
        span: 'third',
      },
      {
        titleLead: 'Optimised',
        titleAccent: 'tokens',
        body: 'Built-in RAG pipeline keeps estimated AI cost ~₹0.2–₹0.3 / message — no forced enterprise AI meter.',
        image: '/marketing/features/shopify-whatsapp.png',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'BYOK',
    showcasesSub: 'Keys, personality, knowledge — then intents and Live Chat handoff.',
    showcases: [
      {
        title: 'Connect',
        titleAccent: 'API key',
        body: 'Intelligence → AI — paste Gemini or OpenAI. Knowledge and personality tabs unlock the real forms immediately.',
        image: '',
        imageLabel: 'BYOK API key connect — Gemini or OpenAI',
      },
      {
        title: 'Bot',
        titleAccent: 'personality',
        body: 'Name, tone, and quick FAQs — brand voice stays consistent when AI replies in Live Chat.',
        image: '/marketing/features/intent-detection-lead.png',
        imageLabel: 'Bot personality and store knowledge settings',
      },
      {
        title: 'Usage',
        titleAccent: 'visibility',
        body: 'See how the brain is used alongside intents — pause anytime with Live Chat takeover.',
        image: '',
        imageLabel: 'AI usage and takeover controls',
      },
    ],
    stepsTitle: 'How BYOK',
    stepsAccent: 'goes live',
    steps: [
      {
        title: 'Add your key',
        body: 'Gemini or OpenAI — encrypted per workspace in Intelligence → AI.',
      },
      {
        title: 'Load store knowledge',
        body: 'Policies and FAQs the bot must cite before inventing answers.',
      },
      {
        title: 'Train intents',
        body: 'Fixed replies or AI generate — Active toggles control what matches live.',
      },
      {
        title: 'Test & hand off',
        body: 'Confidence test, then Live Chat takeover pauses AI the moment an agent replies.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'AI Brain',
    related: [
      { label: 'AI Brain', href: '/features/ai-brain' },
      { label: 'Intent detection', href: '/features/intent-detection' },
      { label: 'Live Chat', href: '/features/live-chat' },
    ],
    ctaTitle: 'Run AI on your own keys',
    ctaSub: 'BYOK + RAG — catalog-grounded replies without an enterprise AI tax.',
  },

  'intent-detection': {
    id: 'intent-detection',
    path: '/features/intent-detection',
    featureSlug: 'intent-detection',
    eyebrow: 'Intent detection',
    title: 'Route chats by',
    titleAccent: 'what they mean',
    subtitle:
      'Algorithmic intent matches shipping, returns, COD, and handoff phrases — route chatbot flows without burning AI tokens on every message.',
    seoTitle: 'WhatsApp Intent Detection for Shopify | Chat Routing Without AI Waste',
    seoDescription:
      'Detect WhatsApp message intent and route Shopify ecommerce chatbots — algorithmic intent detection for better support without using AI on every message.',
    keywords: 'WhatsApp intent detection, chatbot intent routing Shopify, ecommerce chat intent India',
    hero: {
      kind: 'video',
      src: '/marketing/demos/intentt.mp4?v=20260918a',
      poster: '/marketing/demos/intent-poster.jpg?v=20260918a',
      label: 'Intent detection routing WhatsApp chats',
      glow: 'sky',
    },
    bentoTitle: 'Intent that',
    bentoAccent: 'steers the bot',
    bentoSub: 'Phrases → confidence → action — Flow, reply, assign, or escalate without guessing.',
    bentos: [
      {
        titleLead: 'Phrase',
        titleAccent: 'matching',
        body: 'Train 5–10 real customer phrases per intent — Hinglish and slang welcome. Inactive intents never match live.',
        image: '/marketing/features/intent-detection-flow.png',
        span: 'third',
      },
      {
        titleLead: 'Route without',
        titleAccent: 'AI spend',
        body: 'Algorithmic detection routes support flows before open AI generate — save tokens for hard questions.',
        image: '/marketing/features/intent-detection-lead.png',
        span: 'third',
      },
      {
        titleLead: 'Test',
        titleAccent: 'confidence',
        body: 'Hub Test modal shows matched intent and score — fix weak phrases before production.',
        image: '/marketing/features/flow-still.jpg',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'intent',
    showcasesSub: 'List, editor, and test — same Intelligence hub as AI Brain intents.',
    showcases: [
      {
        title: 'Intent',
        titleAccent: 'list',
        body: 'Shipping, Returns, COD confirm, handoff — each with phrases, action, and Active toggle.',
        image: '/marketing/features/intent-detection-flow.png',
        imageLabel: 'Intent list with phrases and actions',
      },
      {
        title: 'Editor',
        titleAccent: '& actions',
        body: 'Reply text, start a Flow, assign agent, or escalate — set once, match forever while Active.',
        image: '/marketing/features/intent-detection-lead.png',
        imageLabel: 'Intent editor — phrases and routing action',
      },
      {
        title: 'Live',
        titleAccent: 'routing',
        body: 'Inbound WhatsApp hits the intent engine before or beside Flow Builder — takeover in Live Chat still wins.',
        image: '',
        imageLabel: 'Intent match routing into Flow or Live Chat',
      },
    ],
    stepsTitle: 'How intent',
    stepsAccent: 'goes live',
    steps: [
      {
        title: 'Create intents',
        body: 'Name the jobs: shipping, returns, COD, talk to human.',
      },
      {
        title: 'Add real phrases',
        body: 'Write how customers actually ask — split broad intents when confidence is low.',
      },
      {
        title: 'Set actions',
        body: 'Fixed reply, Flow start, assign, or escalate — then toggle Active.',
      },
      {
        title: 'Test & publish',
        body: 'Use the Test modal, then watch Live Chat and Flow Builder respect the routes.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'AI + flows',
    related: [
      { label: 'AI Brain', href: '/features/ai-brain' },
      { label: 'BYOK AI', href: '/features/byok' },
      { label: 'Flow Builder', href: '/features/flow-builder' },
    ],
    ctaTitle: 'Route WhatsApp by intent',
    ctaSub: 'Match phrases, steer flows, save AI tokens for the hard questions.',
  },

};

export function getProductPage(id: ProductPageId): ProductPage {
  return PRODUCT_PAGES[id];
}

export function getProductPageByPath(path: string): ProductPage | undefined {
  return Object.values(PRODUCT_PAGES).find((p) => p.path === path);
}

export function getProductPageByFeatureSlug(slug: string): ProductPage | undefined {
  return Object.values(PRODUCT_PAGES).find((p) => p.featureSlug === slug);
}

export const PRODUCT_FEATURE_SLUGS = new Set(
  Object.values(PRODUCT_PAGES)
    .map((p) => p.featureSlug)
    .filter(Boolean) as string[]
);
