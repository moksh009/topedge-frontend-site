/**
 * Priority product pages — shared enterprise layout content.
 * Hero media is video or still; bentos use real product screenshots.
 */

export type ProductPageId =
  | 'cart-recovery'
  | 'cod-prepaid'
  | 'flow-builder'
  | 'campaigns'
  | 'audience-crm'
  | 'shopify'
  | 'journeys'
  | 'tracking-pixel';

export type ProductHeroMedia =
  | { kind: 'video'; src: string; poster: string; label: string; glow?: ProductGlow }
  | { kind: 'image'; src: string; alt: string; glow?: ProductGlow };

export type ProductGlow = 'violet' | 'emerald' | 'sky' | 'amber' | 'rose' | 'indigo';

export type ProductBento = {
  titleLead: string;
  titleAccent: string;
  body: string;
  image: string;
  /** grid hint: full = row 1 · half = row 2 pair */
  span?: 'wide' | 'half' | 'full';
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
  outcomesTitle: string;
  outcomesAccent: string;
  outcomes: { metric: string; label: string; detail: string }[];
  bentoTitle: string;
  bentoAccent: string;
  bentoSub: string;
  bentos: ProductBento[];
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
  src: '/marketing/demos/cod-prepaid.mp4',
  poster: '/marketing/demos/cod-prepaid-poster.jpg',
} as const;

const FLOW_VIDEO = {
  src: '/marketing/demos/flow-builder.mp4',
  poster: '/marketing/demos/flow-builder-poster.jpg',
} as const;

export const PRODUCT_PAGES: Record<ProductPageId, ProductPage> = {
  'cart-recovery': {
    id: 'cart-recovery',
    path: '/whatsapp-cart-recovery',
    eyebrow: 'Abandoned cart',
    title: 'Recover abandoned carts',
    titleAccent: 'on WhatsApp',
    subtitle:
      'Timed Meta-safe nudges with live Shopify cart lines and ₹ totals — so shoppers reopen checkout before the cart goes cold.',
    seoTitle: 'WhatsApp Cart Recovery for Shopify | TopEdge',
    seoDescription:
      'Abandoned cart recovery on WhatsApp for Shopify India — timing, Meta templates, COD-aware journeys, and recovery ₹ tracking in one workspace.',
    keywords:
      'WhatsApp cart recovery, abandoned cart recovery WhatsApp, Shopify cart recovery, ecommerce automation India',
    hero: {
      kind: 'video',
      ...CART_VIDEO,
      label: 'Abandoned cart recovery on WhatsApp',
      glow: 'emerald',
    },
    outcomesTitle: 'What recovery',
    outcomesAccent: 'teams measure',
    outcomes: [
      {
        metric: '30–60m',
        label: 'First nudge window',
        detail: 'Hit open carts while intent is still warm',
      },
      {
        metric: '3-msg',
        label: 'Meta-safe sequence',
        detail: 'Remind → value → human help — not spam',
      },
      {
        metric: '₹',
        label: 'Attributed recovery',
        detail: 'Sent → clicked → paid against Shopify orders',
      },
    ],
    bentoTitle: 'Built for',
    bentoAccent: 'checkout recovery',
    bentoSub: 'Live cart context, approved templates, and branching — not a generic blast tool.',
    bentos: [
      {
        titleLead: 'Live cart',
        titleAccent: 'context',
        body: 'Product cards, variants, and checkout links pull from the same Shopify abandon event — so the message matches what they left behind.',
        image: '/marketing/features/abandoned-cart.png',
        span: 'full',
      },
      {
        titleLead: 'COD-aware',
        titleAccent: 'branches',
        body: 'Route prepaid vs COD shoppers differently inside one canvas so recovery stays honest and Meta-safe.',
        image: '/marketing/features/cart-still.jpg',
        span: 'half',
      },
      {
        titleLead: 'Inbox',
        titleAccent: 'takeover',
        body: 'When a shopper replies, automation pauses and Live Chat picks up with order context beside the thread.',
        image: '/marketing/features/shopify-whatsapp.png',
        span: 'half',
      },
    ],
    stepsTitle: 'How cart recovery',
    stepsAccent: 'runs',
    steps: [
      {
        title: 'Shopify abandon fires',
        body: 'Checkout drop syncs into TopEdge with cart lines, value, and payment method.',
      },
      {
        title: 'Journey waits, then branches',
        body: 'Timed waits and COD/prepaid conditions decide which approved template goes out.',
      },
      {
        title: 'Shopper returns or talks',
        body: 'One-tap checkout reopen — or a human reply in Live Chat if they ask a question.',
      },
      {
        title: 'Recovery ₹ lands in analytics',
        body: 'Attribute paid orders back to the sequence so ops knows what actually converted.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'the rest of TopEdge',
    related: [
      { label: 'COD → Prepaid', href: '/cod-confirmation-whatsapp' },
      { label: 'Flow Builder', href: '/features/flow-builder' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
    ],
    ctaTitle: 'Start recovering carts on WhatsApp',
    ctaSub: 'Connect Shopify, approve templates, and publish your first sequence — usually the same afternoon.',
  },

  'cod-prepaid': {
    id: 'cod-prepaid',
    path: '/cod-confirmation-whatsapp',
    eyebrow: 'COD / RTO',
    title: 'Confirm COD,',
    titleAccent: 'convert to prepaid',
    subtitle:
      'Ask for confirmation before the bag leaves — then nudge prepaid when it protects margin. Cut RTO without killing checkout conversion.',
    seoTitle: 'COD Confirmation on WhatsApp | Reduce RTO Shopify',
    seoDescription:
      'WhatsApp COD confirmation for Shopify India: confirm, reschedule, or cancel before dispatch to reduce RTO while keeping conversion high.',
    keywords:
      'COD confirmation WhatsApp, reduce RTO Shopify, COD WhatsApp automation, Cash on Delivery confirmation India',
    hero: {
      kind: 'video',
      ...COD_VIDEO,
      label: 'COD confirmation and prepaid conversion',
      glow: 'violet',
    },
    outcomesTitle: 'What ops',
    outcomesAccent: 'protects',
    outcomes: [
      {
        metric: 'Pre-ship',
        label: 'Confirm intent',
        detail: 'YES / reschedule / cancel before courier pickup',
      },
      {
        metric: 'Prepaid',
        label: 'Nudge when it fits',
        detail: 'Convert high-risk COD without a hard wall',
      },
      {
        metric: 'RTO',
        label: 'Fewer blind ships',
        detail: 'Stop packing orders that will refuse on door',
      },
    ],
    bentoTitle: 'Confirmation that',
    bentoAccent: 'respects the order',
    bentoSub: 'Shopify order #, COD amount, and clear reply paths — not a vague chatbot script.',
    bentos: [
      {
        titleLead: 'Order-aware',
        titleAccent: 'confirm',
        body: 'Utility-friendly templates show items and ₹ COD amount from Shopify so buyers know exactly what they are confirming.',
        image: '/marketing/features/cod-still.jpg',
        span: 'full',
      },
      {
        titleLead: 'Prepaid',
        titleAccent: 'nudge',
        body: 'Branch high-AOV or high-RTO COD into a prepaid incentive path before you book the courier.',
        image: '/marketing/features/orders-ops.png',
        span: 'half',
      },
      {
        titleLead: 'Human',
        titleAccent: 'escalation',
        body: 'Unsure buyers land in Live Chat with the order open — automation pauses the moment an agent takes over.',
        image: '/marketing/features/shopify-whatsapp.png',
        span: 'half',
      },
    ],
    stepsTitle: 'How COD protection',
    stepsAccent: 'works',
    steps: [
      {
        title: 'Order created as COD',
        body: 'Shopify flags payment method; TopEdge starts the confirmation journey immediately.',
      },
      {
        title: 'Buyer confirms or changes mind',
        body: 'Clear reply paths update status — or escalate to an agent when the answer is messy.',
      },
      {
        title: 'Optional prepaid convert',
        body: 'When rules say so, send a prepaid nudge with the same order context before dispatch.',
      },
      {
        title: 'Ship only what is real',
        body: 'Pack confirmed orders; cancel or hold the rest so RTO does not eat your margin.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'cart + care',
    related: [
      { label: 'Cart recovery', href: '/whatsapp-cart-recovery' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
      { label: 'COD solution', href: '/solutions/cod' },
    ],
    ctaTitle: 'Cut RTO before the courier leaves',
    ctaSub: 'Confirm COD on WhatsApp with live Shopify order context — then nudge prepaid when it pays.',
  },

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
        span: 'full',
      },
      {
        titleLead: 'Editable',
        titleAccent: 'AI draft',
        body: 'Start from a short form (niche, tone, goals). TopEdge drafts the graph — you tighten branches before publish.',
        image: '/marketing/features/intent-detection-flow.png',
        span: 'half',
      },
      {
        titleLead: 'Test',
        titleAccent: 'then publish',
        body: 'Preview paths before they hit customers so COD FAQs and handoffs don’t surprise ops on launch day.',
        image: '/marketing/features/shopify-whatsapp.png',
        span: 'half',
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
      { label: 'Cart recovery', href: '/whatsapp-cart-recovery' },
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
        span: 'full',
      },
      {
        titleLead: 'Template',
        titleAccent: 'lock',
        body: 'Only APPROVED Meta templates go out — protecting quality rating while you scale sends.',
        image: '/marketing/features/pixel-tracking.png',
        span: 'half',
      },
      {
        titleLead: 'Revenue',
        titleAccent: 'readout',
        body: 'See which campaign actually drove paid Shopify orders, not just delivery receipts.',
        image: '/marketing/features/segmentation-lead.png',
        span: 'half',
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
      { label: 'Cart recovery', href: '/whatsapp-cart-recovery' },
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
        span: 'full',
      },
      {
        titleLead: 'Orders &',
        titleAccent: 'care',
        body: 'Shipments, warranty, and supplier follow-ups without leaving WhatsApp.',
        image: '/1.png?v=1',
        span: 'half',
      },
      {
        titleLead: 'Live',
        titleAccent: 'stock',
        body: 'SKU availability and low-stock signals synced from Shopify into the conversation.',
        image: '/3.png?v=1',
        span: 'half',
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
      { label: 'Cart recovery', href: '/whatsapp-cart-recovery' },
      { label: 'COD → Prepaid', href: '/cod-confirmation-whatsapp' },
    ],
    ctaTitle: 'Run WhatsApp from one customer record',
    ctaSub: 'Unify identity, then recover, campaign, and care without duplicate shoppers.',
  },

  shopify: {
    id: 'shopify',
    path: '/features/shopify',
    featureSlug: 'shopify',
    eyebrow: 'Shopify Store Sync',
    title: 'Your store data,',
    titleAccent: 'live in TopEdge',
    subtitle:
      'OAuth-connect Shopify once. Products, carts, orders, and COD status sync into the workspace — so every WhatsApp send and reply uses real store context.',
    seoTitle: 'Shopify WhatsApp Integration | Store Sync for Ecommerce Automation',
    seoDescription:
      'Connect Shopify to WhatsApp automation. Sync products, carts, orders, and COD status so cart recovery and Live Chat always use live store data.',
    keywords: 'Shopify WhatsApp integration, Shopify ecommerce automation, Shopify cart sync WhatsApp',
    hero: {
      kind: 'image',
      src: '/marketing/features/shopify-whatsapp.png',
      alt: 'Shopify store sync with WhatsApp workspace',
      glow: 'emerald',
    },
    outcomesTitle: 'What sync',
    outcomesAccent: 'unlocks',
    outcomes: [
      {
        metric: 'OAuth',
        label: 'One-click connect',
        detail: 'Products, carts, orders — no Zapier glue',
      },
      {
        metric: 'Live',
        label: 'Cart & COD flags',
        detail: 'Recovery and confirm journeys fire from real events',
      },
      {
        metric: 'Catalog',
        label: 'SKU + ₹ prices',
        detail: 'Flows and AI replies cite what is actually in stock',
      },
    ],
    bentoTitle: 'Shopify context',
    bentoAccent: 'everywhere',
    bentoSub: 'The same store truth powers recovery, COD, Live Chat, and campaigns — not a second spreadsheet.',
    bentos: [
      {
        titleLead: 'Orders &',
        titleAccent: 'carts',
        body: 'Abandoned checkouts and paid orders stream in so journeys and agents never guess what the shopper left behind.',
        image: '/marketing/features/orders-ops.png',
        span: 'full',
      },
      {
        titleLead: 'Catalog',
        titleAccent: 'grounding',
        body: 'Variants, prices, and availability stay current for catalog sends and support answers.',
        image: '/marketing/features/shopify-whatsapp.png',
        span: 'half',
      },
      {
        titleLead: 'COD',
        titleAccent: 'status',
        body: 'Payment method flags travel with the order so confirmation and prepaid nudges stay honest.',
        image: '/marketing/features/cod-still.jpg',
        span: 'half',
      },
    ],
    stepsTitle: 'How store sync',
    stepsAccent: 'goes live',
    steps: [
      {
        title: 'Connect Shopify OAuth',
        body: 'Authorize TopEdge once — no custom middleware or nightly CSV dumps.',
      },
      {
        title: 'Events start flowing',
        body: 'Carts, orders, catalog, and COD flags land in the workspace as they happen.',
      },
      {
        title: 'WhatsApp tools read the store',
        body: 'Journeys, flows, and Live Chat pull the same live context beside every thread.',
      },
      {
        title: 'Ops edits in one place',
        body: 'Catalog and automation settings stay in the dashboard — marketing pages only tell the story.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'recovery + chat',
    related: [
      { label: 'Cart recovery', href: '/whatsapp-cart-recovery' },
      { label: 'Journey', href: '/features/journeys' },
      { label: 'Flow Builder', href: '/features/flow-builder' },
    ],
    ctaTitle: 'Connect Shopify to WhatsApp properly',
    ctaSub: 'One OAuth — then recovery, COD, and support share live store data.',
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
        span: 'full',
      },
      {
        titleLead: 'COD',
        titleAccent: 'confirm',
        body: 'Confirm before ship, reschedule, or cancel — then nudge prepaid when margin needs it.',
        image: '/marketing/features/cod-still.jpg',
        span: 'half',
      },
      {
        titleLead: 'Template',
        titleAccent: 'gates',
        body: 'Nothing leaves until Meta approves — so quality rating stays protected as you scale.',
        image: '/marketing/features/flow-still.jpg',
        span: 'half',
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
      { label: 'Cart recovery', href: '/whatsapp-cart-recovery' },
      { label: 'COD → Prepaid', href: '/cod-confirmation-whatsapp' },
      { label: 'Shopify Sync', href: '/features/shopify' },
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
        span: 'full',
      },
      {
        titleLead: 'Number',
        titleAccent: 'matching',
        body: 'Tie anonymous browsing to WhatsApp identities when opt-in or checkout reveals the number.',
        image: '/marketing/features/intent-detection-lead.png',
        span: 'half',
      },
      {
        titleLead: 'Audience',
        titleAccent: 'handoff',
        body: 'Push pixel cohorts into campaigns and recovery so messages follow real on-site behavior.',
        image: '/campaignn.png',
        span: 'half',
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
      { label: 'Cart recovery', href: '/whatsapp-cart-recovery' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
    ],
    ctaTitle: 'Turn site intent into WhatsApp revenue',
    ctaSub: 'Match browsing to numbers, then recover and campaign with Meta-safe sends.',
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
