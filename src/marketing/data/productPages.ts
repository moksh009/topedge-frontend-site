/**
 * Priority product pages, shared enterprise layout content.
 * Hero media is video or still; bentos use real product screenshots.
 */

export type ProductPageId =
  | 'flow-builder'
  | 'opt-in-tools'
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
  /** SEO-friendly alt for the bento screenshot */
  imageAlt?: string;
  /** default third = equal 3-col row */
  span?: 'third' | 'half' | 'full' | 'wide';
};

export type ProductShowcase = {
  title: string;
  titleAccent?: string;
  body: string;
  /** Dashboard screenshot path, empty string shows a labeled placeholder */
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
  /** @deprecated Removed from UI, optional for backwards-compatible data */
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

const OPTIN_VIDEO = {
  src: '/marketing/demos/opt-in.mp4?v=20260918a',
  poster: '/marketing/demos/optin-popup-poster.jpg?v=20260918a',
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
      'Look up orders, update addresses, and hand off to Live Chat.\nShopify sync built for India D2C WhatsApp support.',
    seoTitle: 'WhatsApp Flow Builder for Shopify India | Chatbot with Order Tools',
    seoDescription:
      'Shopify-native WhatsApp flow builder for Indian D2C: OAuth connect, real-time order webhooks, Shopify tools on the canvas, and Live Chat handoff with order context.',
    keywords:
      'WhatsApp flow builder Shopify, WhatsApp chatbot India D2C, Shopify WhatsApp OAuth, ecommerce WhatsApp automation India',
    hero: {
      kind: 'video', ...FLOW_VIDEO,
      label: 'Flow Builder canvas with Shopify order tools',
      glow: 'sky',
    },
    outcomesTitle: 'What builders',
    outcomesAccent: 'ship faster',
    outcomes: [
      {
        metric: 'OAuth',
        label: 'Shopify connect',
        detail: 'Native install, no manual API key setup',
      },
      {
        metric: 'Webhooks',
        label: 'Real-time sync',
        detail: 'Orders, checkouts, fulfillments, not polling',
      },
      {
        metric: 'Inbox',
        label: 'Order context',
        detail: 'Shopify data attached to WhatsApp threads',
      },
    ],
    bentoTitle: 'Automation with',
    bentoAccent: 'store context',
    bentoSub: 'Shopify tools, Live Chat handoff, and webhook sync, not a generic chatbot taped onto ecommerce.',
    bentos: [
      {
        titleLead: 'Shopify',
        titleAccent: 'tools',
        body: 'Fetch orders, change shipping address, cancel fulfillments, and send catalog cards from the canvas, the bot answers from live Shopify data.',
        image: '/flow-sub-feature/7.png',
        imageAlt: 'Flow Builder Shopify tools, order lookup, address update, and catalog send nodes',
        span: 'third',
      },
      {
        titleLead: 'Live Chat',
        titleAccent: 'handoff',
        body: 'When a shopper needs a human, pause the bot and open the thread in Live Chat. Shopify order context stays on the conversation.',
        image: '/flow-sub-feature/9.png',
        imageAlt: 'WhatsApp Live Chat handoff from Flow Builder with Shopify order context',
        span: 'third',
      },
      {
        titleLead: 'Webhook',
        titleAccent: 'sync',
        body: 'Orders, checkouts, and fulfillments update in real time, so bots answer from store truth, not yesterday’s export.',
        image: '/flow-sub-feature/8.png',
        imageAlt: 'Shopify webhook sync status for WhatsApp flow automation',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'Flow Builder',
    showcasesSub: 'Menus and bots for inbound chat, order updates and cart recovery stay in Journeys.',
    showcases: [
      {
        title: 'Flow list &',
        titleAccent: 'folders',
        body: 'Open your welcome flow or create a new automation. Publish replaces the live graph for the next inbound WhatsApp message.',
        image: '/flow-sub-feature/14.png',
        imageLabel: 'TopEdge Flow Builder home, WhatsApp flows and folders for Shopify',
      },
      {
        title: 'Buttons, lists',
        titleAccent: '& branches',
        body: 'Welcome menus, FAQ paths, and reply-driven branches, each tap moves the shopper to the next node without a free-text maze.',
        image: '/flow-sub-feature/15.png',
        imageLabel: 'WhatsApp interactive buttons, lists, and conditional branches on Flow Builder canvas',
      },
      {
        title: 'Simulator',
        titleAccent: 'before publish',
        body: 'Test Flow walks buttons and lists without messaging real customers. Fix validation items, then publish when Meta-safe paths look right.',
        image: '/flow-sub-feature/13.png',
        imageLabel: 'Test Flow simulator phone preview for WhatsApp chatbot before publish',
      },
    ],

    stepsTitle: 'How a flow',
    stepsAccent: 'goes live',
    steps: [
      {
        title: 'Connect Shopify with OAuth',
        body: 'Native install, store data and tools without pasting API secrets into a form.',
      },
      {
        title: 'Describe or draft the canvas',
        body: 'Use the AI form or start from a template; wire Shopify tool nodes where the shopper needs order help.',
      },
      {
        title: 'Add human handoff',
        body: 'Route stuck or high-intent threads into Live Chat, takeover pauses automation until Release.',
      },
      {
        title: 'Publish when ready',
        body: 'Test critical paths in the simulator, then go live without waiting on an agency sprint.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'recovery + CRM',
    related: [
      { label: 'Cart recovery journeys', href: '/features/journeys#abandoned-cart' },
      { label: 'Audience campaigns', href: '/features/campaigns' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
    ],
    ctaTitle: 'Build your first Shopify-aware WhatsApp flow',
    ctaSub: 'Draft on a canvas that already speaks orders, SKUs, and Live Chat handoff.',
  },

  'opt-in-tools': {
    id: 'opt-in-tools',
    path: '/features/opt-in-tools',
    featureSlug: 'opt-in-tools',
    eyebrow: 'Opt-in tools',
    title: 'Capture WhatsApp numbers',
    titleAccent: 'on your storefront',
    subtitle:
      'Capture consented WhatsApp numbers on your storefront.\nThen run campaigns and journeys from one list.',
    seoTitle: 'WhatsApp Opt-in Tools for Shopify India | Popup, Spin Wheel & Widget',
    seoDescription:
      'Capture WhatsApp numbers on Shopify India with Pulse Drop, welcome popup, spin-to-win, mystery discount, and chat widget, then send Meta-safe campaigns and journeys to consented subscribers.',
    keywords:
      'WhatsApp opt-in Shopify India, WhatsApp popup Shopify, spin to win WhatsApp, WhatsApp widget Shopify, WhatsApp subscriber list D2C',
    hero: {
      kind: 'video', ...OPTIN_VIDEO,
      label: 'WhatsApp opt-in tools on the Shopify storefront',
      glow: 'rose',
    },
    bentoTitle: 'List, triggers,',
    bentoAccent: 'widget',
    bentoSub: 'One consented WhatsApp audience, design who sees what, then capture with the storefront widget.',
    bentos: [
      {
        titleLead: 'Subscriber',
        titleAccent: 'list',
        body: 'Name, phone, email, DOB, marketing consent, source tool, and timestamp, filter and open Customer 360 from one WhatsApp-ready list.',
        image: '/opt-in-sub-feature/10.png',
        imageAlt: 'WhatsApp subscriber list with marketing consent and opt-in source for Shopify',
        span: 'third',
      },
      {
        titleLead: 'Triggers &',
        titleAccent: 'design',
        body: 'When (delay, exit intent, scroll %, ATC), where (home, PDP, cart), who (new / returning / not subscribed), frequency, and Kolkata schedule.',
        image: '/opt-in-sub-feature/11.png',
        imageAlt: 'Opt-in trigger settings, delay, exit intent, scroll, and Shopify page rules',
        span: 'third',
      },
      {
        titleLead: 'WhatsApp',
        titleAccent: 'widget',
        body: 'Floating chat launcher with optional phone capture → wa.me handoff. Only one live widget per Shopify store.',
        image: '/opt-in-sub-feature/12.png',
        imageAlt: 'Shopify storefront WhatsApp chat widget with phone capture',
        span: 'third',
      },
    ],
    showcasesTitle: 'Storefront',
    showcasesAccent: 'tools',
    showcasesSub:
      'Each capture path writes the same consented audience, ready for Meta-safe campaigns and journeys.',
    showcases: [
      {
        title: 'Pulse',
        titleAccent: 'Drop',
        body: 'VIP drop, pulsing orb reveal, always-win prize feel, soft sounds, and a coupon claim that opens WhatsApp. Every claim lands on the subscriber list with source = Pulse Drop.',
        image: '/opt-in-sub-feature/16.png',
        imageLabel: 'Pulse Drop VIP WhatsApp opt-in on Shopify storefront',
      },
      {
        title: 'Welcome',
        titleAccent: 'popup',
        body: 'Discount + phone capture. Standard, image-side, or image-background layouts, brand colors and live preview. Consented numbers join the same Audience list as your other tools.',
        image: '/opt-in-sub-feature/17.png',
        imageLabel: 'Shopify welcome popup capturing WhatsApp number with discount offer',
      },
      {
        title: 'Spin to',
        titleAccent: 'win',
        body: 'Gamified prizes with weighted slices, unique Shopify codes, fixed codes, or lose. Spins and wins still write marketing consent into your opt-in audience.',
        image: '/opt-in-sub-feature/18.png',
        imageLabel: 'Spin-to-win WhatsApp opt-in wheel on Shopify India storefront',
      },
      {
        title: 'Mystery',
        titleAccent: 'discount',
        body: 'Scratch card or tap-and-hold reveal, surprise offer that still captures phone and marketing consent for Audience segments and campaigns.',
        image: '/opt-in-sub-feature/19.png',
        imageLabel: 'Mystery discount scratch reveal WhatsApp opt-in for Shopify',
      },
    ],
    stepsTitle: 'How opt-in',
    stepsAccent: 'ships',
    steps: [
      {
        title: 'Pick a tool',
        body: 'Pulse Drop, Popup, Spin, Mystery, or WhatsApp widget. Start from an India D2C template if you want speed.',
      },
      {
        title: 'Design + set triggers',
        body: 'Brand, offers, lead fields, when/where/who, frequency, and schedule. Preview desktop and mobile.',
      },
      {
        title: 'Publish to Shopify',
        body: 'Theme install injects the script. Live toggle hides instantly; preview with ?te_preview_tool=.',
      },
      {
        title: 'Grow the list, then message',
        body: 'Read views, signups, and redemptions, then send Meta-approved campaigns or journeys from consented subscribers.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'growth',
    related: [
      { label: 'Audience campaigns', href: '/features/campaigns' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
      { label: 'WhatsApp journeys', href: '/features/journeys' },
    ],
    ctaTitle: 'Turn Shopify traffic into WhatsApp revenue',
    ctaSub: 'Five opt-in tools, one consented list, Meta-safe campaigns that attribute ₹.',
  },

  campaigns: {
    id: 'campaigns',
    path: '/features/campaigns',
    featureSlug: 'campaigns',
    eyebrow: 'Campaigns',
    title: 'Audience campaigns',
    titleAccent: 'that attribute revenue',
    subtitle:
      'Segment shoppers, send Meta-approved templates, and measure revenue.\nProfit after fees, not vanity send counts.',
    seoTitle: 'WhatsApp Marketing Campaigns for Shopify India | Meta-Safe Broadcasts',
    seoDescription:
      'WhatsApp audience campaigns for Shopify India D2C: behavior segments, Meta-approved templates, frequency capping, lead scoring, and net-of-Meta ₹ reporting.',
    keywords:
      'WhatsApp marketing Shopify India, WhatsApp broadcast ecommerce, Meta template campaigns India, WhatsApp campaign ROI Shopify',
    hero: {
      kind: 'image',
      src: '/campaignn.png',
      alt: 'TopEdge WhatsApp marketing campaign templates for Shopify India on mobile',
      glow: 'rose',
    },
    outcomesTitle: 'What growth',
    outcomesAccent: 'teams need',
    outcomes: [
      {
        metric: 'Meta-safe',
        label: 'Frequency capped',
        detail: 'Built-in caps so segments don’t get spammed',
      },
      {
        metric: 'Behavior',
        label: 'Not just tags',
        detail: 'Purchase history and intent drive segments',
      },
      {
        metric: 'Net ₹',
        label: 'After Meta fees',
        detail: 'Profit per campaign, not gross sends',
      },
    ],
    bentoTitle: 'Campaigns with',
    bentoAccent: 'guardrails',
    bentoSub: 'Segments, lead scores, and honest cost, built for Indian D2C WhatsApp growth.',
    bentos: [
      {
        titleLead: 'Behavior',
        titleAccent: 'segments',
        body: 'Build audiences from Shopify purchase history and on-site intent, not a flat tag dump from last year’s CSV.',
        image: '/campaign-sub-feature/13.png',
        imageAlt: 'WhatsApp campaign behavior segments from Shopify purchase and intent data',
        span: 'third',
      },
      {
        titleLead: 'Lead',
        titleAccent: 'scoring',
        body: 'Rank who earned a send from cart, browse, and purchase signals, so broadcasts hit intent, not a cold list.',
        image: '/campaign-sub-feature/14.png',
        imageAlt: 'Lead scoring for WhatsApp marketing campaigns on Shopify',
        span: 'third',
      },
      {
        titleLead: 'Net-of-Meta',
        titleAccent: 'reporting',
        body: 'See actual profit per campaign after messaging fees, the ₹ number finance can use, not just delivery receipts.',
        image: '/campaign-sub-feature/15.png',
        imageAlt: 'WhatsApp campaign performance reporting net of Meta fees in ₹',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'campaigns',
    showcasesSub: 'Segment → Meta-approved template → net revenue after fees.',
    showcases: [
      {
        title: 'Audience',
        titleAccent: 'builder',
        body: 'Pixel, recharge, or CRM segments with lead scoring in the audience view, message people who already earned a send.',
        image: '/campaign-sub-feature/21.png',
        imageLabel: 'WhatsApp campaign audience builder with lead scoring for Shopify',
      },
      {
        title: 'Template',
        titleAccent: 'lock',
        body: 'Only APPROVED Meta templates go out, drafts never blast past quality rating on your WhatsApp number.',
        image: '/campaign-sub-feature/22.png',
        imageLabel: 'Meta-approved WhatsApp marketing template gallery for campaigns',
      },
      {
        title: 'Performance',
        titleAccent: 'card',
        body: 'Campaign readout with attributed Shopify orders and cost after Meta fees, double down on what paid in ₹.',
        image: '/campaign-sub-feature/20.png',
        imageLabel: 'WhatsApp campaign performance card, Shopify orders net of Meta cost',
      },
    ],

    stepsTitle: 'How a campaign',
    stepsAccent: 'ships',
    steps: [
      {
        title: 'Choose the audience',
        body: 'Behavior, purchase history, or pixel cohorts, anyone who has earned a WhatsApp message.',
      },
      {
        title: 'Lock an approved template',
        body: 'Pick copy Meta already cleared so the send cannot leak a draft past quality rating.',
      },
      {
        title: 'Broadcast with caps',
        body: 'Frequency capping and quality controls protect the number while you scale India D2C sends.',
      },
      {
        title: 'Read net ₹',
        body: 'Attribute paid Shopify orders, subtract Meta fees, and keep the campaigns that actually profit.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'CRM + pixel',
    related: [
      { label: 'Audience CRM', href: '/features/audience-crm' },
      { label: 'Cart recovery', href: '/features/journeys#abandoned-cart' },
      { label: 'Flow Builder', href: '/features/flow-builder' },
    ],
    ctaTitle: 'Launch a Meta-safe WhatsApp campaign',
    ctaSub: 'Segment, approve, send, and measure revenue against Shopify orders, after Meta fees.',
  },

  'audience-crm': {
    id: 'audience-crm',
    path: '/features/audience-crm',
    featureSlug: 'audience-crm',
    eyebrow: 'Audience CRM',
    title: 'One shopper across',
    titleAccent: 'chats, orders & care',
    subtitle:
      'One timeline for WhatsApp chats, Shopify orders, and care.\nScore leads and build segments in-product.',
    seoTitle: 'WhatsApp Audience CRM for Shopify India | Segments & Lead Scoring',
    seoDescription:
      'WhatsApp Audience CRM for Shopify India D2C: unified contact timeline, purchase-based lead scoring, in-product segments, and unlimited profiles on every plan.',
    keywords:
      'WhatsApp CRM Shopify India, ecommerce audience segmentation, WhatsApp lead scoring, Shopify customer timeline WhatsApp',
    hero: {
      kind: 'image',
      src: '/audience-crm-hero.png',
      alt: 'Unified Shopify customer identity, one lead across WhatsApp numbers and emails',
      glow: 'violet',
    },
    outcomesTitle: 'What CRM',
    outcomesAccent: 'should do',
    outcomes: [
      {
        metric: '1 timeline',
        label: 'Orders + chats',
        detail: 'Campaigns and WhatsApp beside the same lead',
      },
      {
        metric: 'Scores',
        label: 'From real signals',
        detail: 'Purchase and engagement, not gut feel tags',
      },
      {
        metric: 'Unlimited',
        label: 'Profiles',
        detail: 'Every plan, no profile-count upsell trap',
      },
    ],
    bentoTitle: 'Identity &',
    bentoAccent: 'ops in one place',
    bentoSub: 'Timeline, scores, and segments, the surfaces growth and support already live in.',
    bentos: [
      {
        titleLead: 'Unified',
        titleAccent: 'timeline',
        body: 'Shopify orders, WhatsApp conversations, and campaigns on one contact, so ops never reconstruct the story across tabs.',
        image: '/audience-crm-sub-feature/16.png',
        imageAlt: 'Audience CRM unified timeline, Shopify orders and WhatsApp chats on one contact',
        span: 'third',
      },
      {
        titleLead: 'Segments',
        titleAccent: 'in-product',
        body: 'Build audiences without exporting to another tool. Feed WhatsApp journeys and campaigns from the same CRM.',
        image: '/audience-crm-sub-feature/18.png',
        imageAlt: 'In-product WhatsApp audience segment builder for Shopify CRM',
        span: 'third',
      },
      {
        titleLead: 'Lead',
        titleAccent: 'scoring',
        body: 'Scores tied to purchase and engagement signals. Chase carts and VIPs that actually move ₹ revenue.',
        image: '/audience-crm-sub-feature/17.png',
        imageAlt: 'Lead scoring from Shopify purchase and WhatsApp engagement signals',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'Audience',
    showcasesSub: 'One shopper across WhatsApp chats, Shopify orders, scores, and segments.',
    showcases: [
      {
        title: 'Unified',
        titleAccent: 'profiles',
        body: 'Primary + secondary numbers and emails collapse into one lead so threads and orders stay on the same customer.',
        image: '/leaadd.png?v=20260917c',
        imageLabel: 'Audience CRM unified identity, primary and secondary WhatsApp numbers',
      },
      {
        title: 'Customer',
        titleAccent: '360',
        body: 'Open any lead and see Shopify orders, WhatsApp threads, and campaign history on one record, support and growth stop reconstructing the story.',
        image: '/audience-crm-sub-feature/360.png',
        imageLabel: 'Customer 360, Shopify orders, WhatsApp chats, and campaign history',
      },
      {
        title: 'Segment',
        titleAccent: 'builder',
        body: 'Build cohorts for campaigns and journeys without a separate CDP, unlimited profiles on every plan.',
        image: '/audience-crm-sub-feature/crm-segement.png',
        imageLabel: 'Segment builder in TopEdge Audience CRM for WhatsApp campaigns',
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
        body: 'Primary/secondary phones and emails collapse into one master profile with a shared timeline.',
      },
      {
        title: 'Score and segment',
        body: 'Lead scores update from real purchase and engagement; segments feed journeys and campaigns.',
      },
      {
        title: 'Ops works one record',
        body: 'Recovery, broadcast, and care all read the same shopper, no duplicate WhatsApp blasts.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'growth tools',
    related: [
      { label: 'Audience campaigns', href: '/features/campaigns' },
      { label: 'Cart recovery', href: '/features/journeys#abandoned-cart' },
      { label: 'COD journeys', href: '/features/journeys' },
    ],
    ctaTitle: 'Run WhatsApp from one customer record',
    ctaSub: 'Unlimited profiles, real scores, and segments that feed journeys, without another CRM seat.',
  },

  journeys: {
    id: 'journeys',
    path: '/features/journeys',
    featureSlug: 'journeys',
    eyebrow: 'Journey',
    title: 'Visual journeys that',
    titleAccent: 'sell & support',
    subtitle:
      'Abandoned cart, COD confirm, and shipping on a visual canvas.\nMeta-approved templates, recovered ₹, not vanity sends.',
    seoTitle: 'WhatsApp Cart Recovery & COD Journeys for Shopify India | TopEdge',
    seoDescription:
      'Visual WhatsApp journey builder for Shopify India D2C: abandoned cart recovery, COD confirmation, Meta approval gating, and recovered-revenue attribution in ₹.',
    keywords:
      'WhatsApp cart recovery Shopify India, abandoned cart WhatsApp, COD confirmation WhatsApp, Shopify journey automation, Meta template approval journeys',
    hero: {
      kind: 'video', ...COD_VIDEO,
      label: 'Visual WhatsApp journey canvas for Shopify cart and COD',
      glow: 'violet',
    },
    outcomesTitle: 'What operators',
    outcomesAccent: 'build here',
    outcomes: [
      {
        metric: 'Canvas',
        label: 'Drag → publish',
        detail: 'Triggers, waits, branches, and sends, no code',
      },
      {
        metric: 'Shopify',
        label: 'Real events',
        detail: 'Orders, checkouts, fulfillments, not polling lag',
      },
      {
        metric: '₹',
        label: 'Recovered revenue',
        detail: 'Attribution per journey, not vanity send counts',
      },
    ],
    bentoTitle: 'The journey',
    bentoAccent: 'engine',
    bentoSub: 'A real builder with Meta gates and Shopify triggers, cart, COD, and shipping without custom code.',
    bentos: [
      {
        titleLead: 'Drag-and-drop',
        titleAccent: 'builder',
        body: 'Connect Shopify triggers, waits, conditions, and WhatsApp sends on a canvas. Ship sequences without engineering tickets.',
        image: '/journey-sub-feature/4.png',
        imageAlt: 'Drag-and-drop WhatsApp journey builder canvas for Shopify ecommerce',
        span: 'third',
      },
      {
        titleLead: 'Pre-built',
        titleAccent: 'templates',
        body: 'Cart recovery (3-step), order confirm, COD confirm, and shipping updates arrive seeded, minutes to live for India D2C, not a blank canvas.',
        image: '/journey-sub-feature/5.png',
        imageAlt: 'Pre-built WhatsApp journey templates, cart recovery, COD, and shipping',
        span: 'third',
      },
      {
        titleLead: 'Meta approval',
        titleAccent: 'gating',
        body: 'A journey cannot go live sending a non-approved WhatsApp template. Status stays visible in the builder, Approved or still in review.',
        image: '/journey-sub-feature/6.png',
        imageAlt: 'Meta WhatsApp template approval status gating on journey canvas',
        span: 'third',
      },
    ],
    showcasesTitle: 'Journey',
    showcasesAccent: 'use-cases',
    showcasesSub:
      'Abandoned cart, conditional COD/prepaid routes, and return-visit retargeting, one canvas, Meta-safe by default.',
    showcases: [
      {
        anchor: 'abandoned-cart',
        title: 'Abandoned',
        titleAccent: 'Cart',
        body: 'A pre-built 3-step WhatsApp recovery sequence with Meta-approved templates. Capture carts in real time, chase high-AOV leads first, and read recovered ₹, pairs with Tracking Pixel when you want browse intent too.',
        image: '/journey-sub-feature/10.png',
        imageLabel: 'Abandoned cart recovery journey, 3-step WhatsApp sequence for Shopify India',
      },
      {
        anchor: 'conditional-routes',
        title: 'Conditional',
        titleAccent: 'routes',
        body: 'One trigger, multiple paths. Branch when payment method, order state, or shopper response differs, so COD, prepaid, and quiet leads each get a different next step.',
        image: '/journey-sub-feature/11.png',
        imageLabel: 'Conditional WhatsApp journey routes for COD vs prepaid on Shopify',
      },
      {
        anchor: 'return-retarget',
        title: 'Return &',
        titleAccent: 'retarget',
        body: 'Already have their WhatsApp number? When they come back, browse or scroll, then leave, pixel intent can fire a journey while interest is still warm. Cross-link, don’t duplicate: see Tracking Pixel for install and health.',
        image: '/journey-sub-feature/12.png',
        imageLabel: 'Return-visit website intent matched to WhatsApp retargeting journeys',
      },
    ],

    stepsTitle: 'How a journey',
    stepsAccent: 'ships',
    steps: [
      {
        title: 'Start from a Shopify event',
        body: 'Checkout abandoned, order created, fulfillment, or COD pending, triggered off store webhooks, not a delayed batch.',
      },
      {
        title: 'Use a template or branch paths',
        body: 'Pick a pre-seeded cart or COD journey, or add waits and conditional routes so each shopper gets the right path.',
      },
      {
        title: 'Gate on Meta approval',
        body: 'Attach only APPROVED templates, drafts stay blocked so quality rating stays protected.',
      },
      {
        title: 'Publish and read recovered ₹',
        body: 'Watch sent → clicked → paid per journey, then tighten the steps that leak recovery revenue.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'store + inbox',
    related: [
      { label: 'Tracking pixel', href: '/features/analytics' },
      { label: 'COD → Prepaid', href: '/features/journeys' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
    ],
    ctaTitle: 'Build your first WhatsApp journey',
    ctaSub: 'Cart recovery, COD confirm, Meta gates, recovered ₹ you can show finance.',
  },

  'tracking-pixel': {
    id: 'tracking-pixel',
    path: '/features/analytics',
    featureSlug: 'analytics',
    eyebrow: 'Tracking Pixel',
    title: 'Website intent,',
    titleAccent: 'matched to WhatsApp',
    subtitle:
      'One-click Shopify embed for views, carts, and checkout.\nFeed journeys with consent-aware site intent.',
    seoTitle: 'Shopify WhatsApp Tracking Pixel | Website Intent for Cart Recovery',
    seoDescription:
      'TopEdge tracking pixel for Shopify India: theme app embed, product and cart intent matched to WhatsApp numbers, consent-aware firing, and pixel health for journey ROI.',
    keywords:
      'WhatsApp tracking pixel Shopify, website intent WhatsApp India, Shopify theme app embed tracking, cart recovery analytics WhatsApp',
    hero: {
      kind: 'image',
      src: '/website-pixel.png',
      alt: 'Website tracking pixel events matched to WhatsApp numbers for Shopify',
      glow: 'amber',
    },
    outcomesTitle: 'What the pixel',
    outcomesAccent: 'surfaces',
    outcomes: [
      {
        metric: '1-click',
        label: 'Theme install',
        detail: 'App embed toggle, no developer paste job',
      },
      {
        metric: 'Live',
        label: 'View → cart → checkout',
        detail: 'Events feed journeys (e.g. viewed 3×, never bought)',
      },
      {
        metric: 'Health',
        label: 'In-dashboard',
        detail: 'Know if tracking stops, before revenue dips',
      },
    ],
    bentoTitle: 'Intent that',
    bentoAccent: 'becomes action',
    bentoSub: 'Pixel events become journey triggers and campaign audiences, not a vanity analytics page.',
    bentos: [
      {
        titleLead: 'Theme app',
        titleAccent: 'embed',
        body: 'Enable tracking from Shopify theme settings. No manual snippet, no agency ticket to “just add a pixel.”',
        image: '/website-track/20.png',
        imageAlt: 'Shopify theme app embed toggle for TopEdge WhatsApp tracking pixel',
        span: 'third',
      },
      {
        titleLead: 'View, cart,',
        titleAccent: 'checkout',
        body: 'Product views, add-to-cart, and checkout events stream in, then feed WhatsApp journeys when you already have a number.',
        image: '/website-track/21.png',
        imageAlt: 'Live product view, add-to-cart, and checkout events for WhatsApp journeys',
        span: 'third',
      },
      {
        titleLead: 'Shopper',
        titleAccent: 'journey',
        body: 'See where the path leaks, visitors → product view → add to cart → checkout, plus Buy Now / skip-cart. Page-by-page drop-offs so you know which step to recover.',
        image: '/website-track/22.png',
        imageAlt: 'Shopify shopper journey funnel, view to cart to checkout drop-offs',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'tracking',
    showcasesSub: 'Install once, watch health, then hand intent to WhatsApp journeys and campaigns.',
    showcases: [
      {
        title: 'Live',
        titleAccent: 'intent feed',
        body: 'Product views, scroll, and carts stream in while intent is still warm, ready for recovery or broadcast.',
        image: '/website-track/31.png',
        imageLabel: 'Tracking pixel live feed, Shopify product and cart events for WhatsApp',
      },
      {
        title: 'Number',
        titleAccent: 'matching',
        body: 'Tie browsing to WhatsApp identities when opt-in or checkout reveals the number, then a journey or campaign can message them.',
        image: '/website-track/32.png',
        imageLabel: 'Website browse intent matched to WhatsApp numbers for Shopify D2C',
      },
      {
        title: 'Pixel',
        titleAccent: 'health',
        body: 'See whether tracking is healthy in-dashboard. Fix a dead pixel before you notice it in recovered ₹.',
        image: '/website-track/33.png',
        imageLabel: 'WhatsApp tracking pixel health dashboard and audience handoff',
      },
    ],

    stepsTitle: 'How tracking',
    stepsAccent: 'pays off',
    steps: [
      {
        title: 'Enable the theme embed',
        body: 'One-click install in Shopify, no developer required to paste code.',
      },
      {
        title: 'Intent lights up',
        body: 'Views, carts, and checkouts appear; numbers match when opt-in or checkout reveals WhatsApp.',
      },
      {
        title: 'Feed journeys & campaigns',
        body: 'Use behavior as triggers and audiences, e.g. viewed 3×, never bought, without rebuilding tracking.',
      },
      {
        title: 'Watch pixel health',
        body: 'Confirm events still flow. Catch breakage before recovery and campaign numbers go quiet.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'campaigns + recovery',
    related: [
      { label: 'Cart recovery', href: '/features/journeys#abandoned-cart' },
      { label: 'Return & retarget', href: '/features/journeys#return-retarget' },
      { label: 'Audience campaigns', href: '/features/campaigns' },
    ],
    ctaTitle: 'Turn site intent into WhatsApp revenue',
    ctaSub: 'Theme embed, consent-aware events, and journeys that fire on real browse behavior.',
  },

  'live-chat': {
    id: 'live-chat',
    path: '/features/live-chat',
    featureSlug: 'live-chat',
    eyebrow: 'Live Chat',
    title: 'WhatsApp inbox with',
    titleAccent: 'order context',
    subtitle:
      'Reply with Shopify order context in one WhatsApp inbox.\nTake over from AI anytime, release when you are done.',
    seoTitle: 'WhatsApp Shared Inbox for Shopify India | Live Chat with Order Context',
    seoDescription:
      'Unified WhatsApp and Instagram inbox for Shopify India. Agents see order context, confirm COD, recover carts, and pause AI on takeover without leaving the thread.',
    keywords:
      'WhatsApp shared inbox Shopify India, ecommerce live chat WhatsApp, WhatsApp customer support Shopify, Live Chat takeover pauses AI',
    hero: {
      kind: 'image',
      src: '/marketing/customers/customers-outcome-inbox.png',
      alt: 'TopEdge WhatsApp Live Chat inbox with conversation list and open thread',
      glow: 'sky',
    },
    outcomesTitle: 'What support',
    outcomesAccent: 'teams feel',
    outcomes: [
      {
        metric: '24h',
        label: 'Session aware',
        detail: 'Free text inside window, templates outside',
      },
      {
        metric: 'Takeover',
        label: 'Bot pauses',
        detail: 'Take control stops automation until Release',
      },
      {
        metric: '360°',
        label: 'Beside the thread',
        detail: 'Orders, tags, opt-in, jump to Audience',
      },
    ],
    bentoTitle: 'Inbox built for',
    bentoAccent: 'Shopify ops',
    bentoSub: 'List left, thread center, contact panel right, agents answer with cart, COD, and order context.',
    bentos: [
      {
        titleLead: 'Thread +',
        titleAccent: 'composer',
        body: 'Open unread first, check the 24h window, then free-text or pick a Meta-approved template when the session expired.',
        image: '/marketing/customers/customers-outcome-inbox.png',
        imageAlt: 'WhatsApp Live Chat inbox with thread list and message composer for Shopify',
        span: 'third',
      },
      {
        titleLead: 'Take',
        titleAccent: 'control',
        body: 'Pause Flow Builder and AI on the thread so only your team replies. Release to bot resumes automation on the next inbound.',
        image: '/marketing/solutions/sol-fashion-inbox.png',
        imageAlt: 'Live Chat takeover control that pauses WhatsApp AI and Flow Builder',
        span: 'third',
      },
      {
        titleLead: 'Customer',
        titleAccent: '360',
        body: 'Orders, tags, and opt-in live in the contact panel, assign or resolve without tab-switching to Shopify admin.',
        image: '/marketing/solutions/sol-electronics-inbox-saas.png',
        imageAlt: 'WhatsApp Live Chat inbox with Shopify order context panel Customer 360',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'Live Chat',
    showcasesSub: 'Reply, takeover, Meta templates, and filters, same names as the dashboard.',
    showcases: [
      {
        title: 'Inbox',
        titleAccent: 'layout',
        body: 'Conversation list on the left, open thread in the center, contact panel on the right. Unread bubbles rise to the top.',
        image: '/marketing/customers/customers-outcome-inbox.png',
        imageLabel: 'WhatsApp Live Chat inbox, list, thread, and Shopify contact panel',
      },
      {
        title: 'Composer &',
        titleAccent: '24h window',
        body: 'Inside 24h of the customer’s last message → free text. Outside → pick a Meta-approved utility or marketing template.',
        image: '/marketing/solutions/sol-fashion-inbox-saas.png',
        imageLabel: 'WhatsApp composer with 24h session state and approved template picker',
      },
      {
        title: 'Search &',
        titleAccent: 'filters',
        body: 'Filter by status, assignee, or date. Search name, phone, or message snippet, then assign or resolve.',
        image: '',
        imageLabel: 'Live Chat filters, assigned, open, needs help for Shopify support teams',
      },
    ],
    stepsTitle: 'How a reply',
    stepsAccent: 'gets done',
    steps: [
      {
        title: 'Open the thread',
        body: 'Click a row in the inbox, unread WhatsApp threads bubble to the top.',
      },
      {
        title: 'Check the session',
        body: 'Inside 24h send free text; outside pick a Meta-approved template in the composer.',
      },
      {
        title: 'Take control if needed',
        body: 'Pause AI and Flow Builder so only your team replies, Release when you’re done.',
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
    ctaTitle: 'Put support next to the Shopify order',
    ctaSub: 'Connect WhatsApp, publish a flow, and answer with order context. Takeover pauses AI instantly.',
  },

  'ai-brain': {
    id: 'ai-brain',
    path: '/features/ai-brain',
    featureSlug: 'ai-brain',
    eyebrow: 'AI Brain',
    title: 'WhatsApp AI on your',
    titleAccent: 'own API keys',
    subtitle:
      'Bring your own OpenAI or Claude keys.\nGround replies in catalog and policies, takeover pauses AI.',
    seoTitle: 'WhatsApp AI for Shopify India | BYOK OpenAI or Claude, TopEdge AI Brain',
    seoDescription:
      'TopEdge AI Brain for Shopify India: bring your own OpenAI or Claude key, ground WhatsApp replies in store knowledge, route with Intent Detect, and pause AI on Live Chat takeover.',
    keywords:
      'WhatsApp AI Shopify India, BYOK OpenAI Claude ecommerce, store knowledge WhatsApp bot, WhatsApp AI own API keys D2C',
    hero: {
      kind: 'image',
      src: '/aiii/ai-brain-hero.png?v=2',
      alt: 'TopEdge AI Brain, WhatsApp AI on your own OpenAI or Claude API keys for Shopify',
      glow: 'violet',
    },
    bentoTitle: 'Intelligence',
    bentoAccent: 'you control',
    bentoSub: 'Knowledge grounds answers. Persona sets voice. Bring your own key (OpenAI, Claude, or Gemini), spend stays on your provider bill.',
    bentos: [
      {
        titleLead: 'Store',
        titleAccent: 'knowledge',
        body: 'Import store pages, upload docs, embed for RAG, and keep return, refund, and shipping policies cited before freeform AI invents an answer.',
        image: '/aiii/25.png',
        imageAlt: 'TopEdge store knowledge documents and Shopify store policies for WhatsApp AI',
        span: 'third',
      },
      {
        titleLead: 'BYOK',
        titleAccent: 'your keys',
        body: 'Bring your own key, OpenAI, Claude, or Gemini. Activate AI for inquiries, pick the chat model, cap max reply words, tokens and cost on your provider.',
        image: '/aiii/27.png',
        imageAlt: 'AI Brain BYOK settings, connect OpenAI, Claude, or Gemini API key for WhatsApp',
        span: 'third',
      },
      {
        titleLead: 'Bot',
        titleAccent: 'persona',
        body: 'Bot name, tone / system personality, and Quick FAQs, brand voice stays consistent in Live Chat and Flow Builder AI nodes.',
        image: '/aiii/26.png',
        imageAlt: 'WhatsApp bot persona settings, name, tone, and Quick FAQs for Shopify brands',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'AI Brain',
    showcasesSub: 'BYOK settings, knowledge, persona, plus Intent Detect so every message does not need a model call.',
    showcases: [
      {
        title: 'BYOK',
        titleAccent: 'settings',
        body: 'Connect your provider key (OpenAI, Claude, or Gemini), activate AI for inquiries, choose model, set max reply words, usage KPIs for tokens and cost on your bill.',
        image: '/aiii/36.png',
        imageLabel: 'AI Brain BYOK settings, OpenAI, Claude, or Gemini key for WhatsApp AI',
      },
      {
        title: 'Knowledge',
        titleAccent: '+ persona',
        body: 'RAG over imported Shopify pages and docs. Personality and Quick FAQs keep replies on-brand when AI answers in Live Chat or Flow nodes.',
        image: '/aiii/37.png',
        imageLabel: 'Store knowledge base and bot persona for catalog-grounded WhatsApp AI',
      },
      {
        title: 'Live',
        titleAccent: 'routing',
        body: 'Inbound WhatsApp hits Intent Detect before or beside Flow Builder, Live Chat takeover still wins and pauses AI.',
        image: '/intent-sub-feature/live-routing.png?v=8',
        imageLabel: 'Intent Detect live routing into Flow Builder or Live Chat for WhatsApp',
      },
    ],
    stepsTitle: 'How the brain',
    stepsAccent: 'goes live',
    steps: [
      {
        title: 'Add your key',
        body: 'Intelligence → AI, bring OpenAI or Claude (Gemini supported too). Keyword FAQs still work without a key.',
      },
      {
        title: 'Load knowledge + persona',
        body: 'Policies, docs, tone, and Quick FAQs the bot must respect for India D2C support.',
      },
      {
        title: 'Train intents',
        body: 'Route shipping, returns, COD, and handoff without burning AI tokens on every message.',
      },
      {
        title: 'Activate & hand off',
        body: 'Powers Live Chat fallback and Flow AI nodes, Live Chat takeover pauses AI instantly.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'inbox + flows',
    related: [
      { label: 'Intent detection', href: '/features/intent-detection' },
      { label: 'Live Chat', href: '/features/live-chat' },
      { label: 'Flow Builder', href: '/features/flow-builder' },
    ],
    ctaTitle: 'Run WhatsApp AI on your own keys',
    ctaSub: 'OpenAI or Claude, catalog + policies + persona, your model, your spend ceiling.',
  },

  'meta-manager': {
    id: 'meta-manager',
    path: '/features/meta-manager',
    featureSlug: 'meta-manager',
    eyebrow: 'Meta Manager',
    title: 'Approve templates',
    titleAccent: 'before anything sends',
    subtitle:
      'Templates, Blueprints, catalog, and QR in one place.\nOnly APPROVED copy ever reaches Journeys and campaigns.',
    seoTitle: 'Meta WhatsApp Template Manager for Shopify India | Cloud API Approval',
    seoDescription:
      'Submit, track, and approve Meta WhatsApp templates for Shopify India, utility and marketing categories, Journey blueprints for cart and COD, catalog and wa.me QR.',
    keywords:
      'Meta WhatsApp template manager, WhatsApp Cloud API Shopify India, Meta template approval, WhatsApp utility marketing templates',
    hero: {
      kind: 'image',
      src: '/marketing/customers/customers-outcome-template.png',
      alt: 'TopEdge Meta Manager WhatsApp template library with approval status',
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
        detail: 'Same packs Journeys use, prefilled mappings',
      },
      {
        metric: 'Catalog',
        label: '+ QR',
        detail: 'Import products; wa.me QR for ads and packaging',
      },
    ],
    bentoTitle: 'Compliance with',
    bentoAccent: 'commerce speed',
    bentoSub: 'Draft → Submit → Approved, then wire into Journeys, Flow Builder, or Campaigns.',
    bentos: [
      {
        titleLead: 'Template',
        titleAccent: 'library',
        body: 'Draft, pending, approved, rejected in one list. Read Meta’s rejection reason on the row, fix copy, resubmit.',
        image: '/marketing/customers/customers-outcome-template.png',
        imageAlt: 'Meta WhatsApp template library showing draft, pending, approved, and rejected status',
        span: 'third',
      },
      {
        titleLead: 'Blueprints',
        titleAccent: 'for Journeys',
        body: 'Cart recovery (3 WA + email), COD → prepaid, and order confirmed, create rows with live product headers prefilled for India D2C.',
        image: '/campaignn.png',
        imageAlt: 'WhatsApp Journey blueprints for cart recovery and COD confirmation templates',
        span: 'third',
      },
      {
        titleLead: 'Catalog',
        titleAccent: '& QR',
        body: 'Import from Meta or Shopify, refresh after catalog changes, and download wa.me QR for storefront or ads.',
        image: '/marketing/features/shopify-whatsapp.png',
        imageAlt: 'Shopify WhatsApp product catalog import and wa.me QR download',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'Meta Manager',
    showcasesSub: 'Library, builder, Blueprints, catalog, QR, approve here before anything sends live.',
    showcases: [
      {
        title: 'Library',
        titleAccent: 'statuses',
        body: 'See draft, pending, approved, and rejected at a glance. Sync from Meta when templates were created outside TopEdge.',
        image: '/marketing/customers/customers-outcome-template.png',
        imageLabel: 'Meta Manager library, WhatsApp template draft, pending, and approved statuses',
      },
      {
        title: 'Template',
        titleAccent: 'studio',
        body: 'Named variables like {{first_name}} map to Meta slots on submit. Utility stays transactional, marketing owns promos.',
        image: '',
        imageLabel: 'WhatsApp template studio, body variables, buttons, and Meta category',
      },
      {
        title: 'Catalog',
        titleAccent: '& QR codes',
        body: 'Product catalog for WhatsApp commerce cards; QR tab downloads PNG links that open a flow or catalog on scan.',
        image: '',
        imageLabel: 'WhatsApp catalog import and wa.me QR code download for Shopify',
      },
    ],
    stepsTitle: 'How a template',
    stepsAccent: 'goes Approved',
    steps: [
      {
        title: 'Create in Library',
        body: 'Pick Marketing, Utility, or Authentication, names in lowercase_with_underscores.',
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
        body: 'Pick Approved templates in Journeys, Flow Builder, or Campaigns, never silent sends on rejected rows.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'sends',
    related: [
      { label: 'Audience campaigns', href: '/features/campaigns' },
      { label: 'WhatsApp journeys', href: '/features/journeys' },
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
      'Route COD, refunds, and VIP chats to the right people.\nKeep Live Chat calm when volume spikes.',
    seoTitle: 'WhatsApp Chat Rules for Shopify India | Auto-Route COD & Support',
    seoDescription:
      'Route WhatsApp conversations for Shopify India teams, keyword and intent rules for COD, refunds, and VIP assignment. Works with Live Chat takeover that pauses AI.',
    keywords:
      'WhatsApp chat rules Shopify, ecommerce inbox routing India, COD WhatsApp assignment, WhatsApp support routing D2C',
    hero: {
      kind: 'image',
      src: '/marketing/solutions/sol-fashion-inbox.png',
      alt: 'TopEdge chat rules routing WhatsApp conversations to the right Shopify team',
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
    bentoSub: 'Assignment, keywords, and escalation, editable in the dashboard when India D2C volume spikes.',
    bentos: [
      {
        titleLead: 'Keyword',
        titleAccent: 'routing',
        body: 'Match COD, refund, or “talk to human” phrases and assign to ops or sales before the queue piles up.',
        image: '/marketing/solutions/sol-fashion-inbox.png',
        imageAlt: 'WhatsApp keyword routing rules assigning COD and support chats in Live Chat',
        span: 'third',
      },
      {
        titleLead: 'Intent',
        titleAccent: 'handoff',
        body: 'Pair with AI Brain handoff intents so escalation opens the right agent queue with thread history intact.',
        image: '/marketing/features/intent-detection-lead.png',
        imageAlt: 'Intent detection handoff routing WhatsApp chats to agent queues',
        span: 'third',
      },
      {
        titleLead: 'Assign',
        titleAccent: '& filters',
        body: 'Live Chat status filters (assigned to me, open, needs help) stay aligned with the rules you publish.',
        image: '/marketing/customers/customers-outcome-inbox.png',
        imageAlt: 'Live Chat assign filters aligned with WhatsApp chat routing rules',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'chat rules',
    showcasesSub: 'Route, assign, escalate, then agents finish in Live Chat with Shopify order context.',
    showcases: [
      {
        title: 'Rule',
        titleAccent: 'builder',
        body: 'Define triggers (keyword, intent, tag) and actions (assign, escalate, pause bot) without redeploying code.',
        image: '',
        imageLabel: 'WhatsApp chat rules builder, triggers and assign actions for Shopify teams',
      },
      {
        title: 'Queue',
        titleAccent: 'assignment',
        body: 'COD confirms and VIP threads land with the right teammate, filters show assigned to me / needs help.',
        image: '/marketing/solutions/sol-fashion-inbox-saas.png',
        imageLabel: 'Live Chat queue filters aligned with COD and VIP routing rules',
      },
      {
        title: 'AI +',
        titleAccent: 'takeover',
        body: 'When an agent Takes control, automation and AI pause until Release, rules never fight human replies.',
        image: '/marketing/customers/customers-outcome-inbox.png',
        imageLabel: 'Live Chat takeover pauses WhatsApp AI while chat rules stay active',
      },
    ],
    stepsTitle: 'How routing',
    stepsAccent: 'goes live',
    steps: [
      {
        title: 'Map the queues',
        body: 'Decide who owns COD, refunds, and VIP, then name the filters agents already use.',
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
    ctaSub: 'Route COD and VIP correctly, then let agents finish with Shopify order context.',
  },

  instagram: {
    id: 'instagram',
    path: '/features/instagram',
    featureSlug: 'instagram',
    eyebrow: 'IG Automation',
    title: 'Comment or story',
    titleAccent: '→ DM',
    subtitle:
      'Turn comments and story mentions into Instagram or WhatsApp DMs.\nContinue in Live Chat with Shopify context.',
    seoTitle: 'Instagram to WhatsApp Automation for Shopify | Comment-to-DM',
    seoDescription:
      'Turn Instagram comments and stories into WhatsApp DMs for Shopify India, comment-to-DM automation for drops, price questions, and Live Chat handoff.',
    keywords:
      'Instagram WhatsApp automation Shopify, comment to DM India, IG automation ecommerce D2C, Instagram Live Chat Shopify',
    hero: {
      kind: 'image',
      src: '/marketing/features/optin-popup.png',
      alt: 'Instagram comment-to-DM automation connected to TopEdge Live Chat for Shopify',
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
    bentoSub: 'Automate the first DM, keep brand voice consistent, then finish sales in the shared WhatsApp inbox.',
    bentos: [
      {
        titleLead: 'Comment',
        titleAccent: 'rules',
        body: 'Auto-reply to comment keywords with a DM, turn drop comments into conversations without leaving Instagram.',
        image: '/marketing/features/optin-popup.png',
        imageAlt: 'Instagram comment-to-DM rules for Shopify drop and price questions',
        span: 'third',
      },
      {
        titleLead: 'Story',
        titleAccent: 'replies',
        body: 'Story mention and reply triggers open a DM while the viewer is still mid-scroll.',
        image: '/marketing/features/unified-identity.png',
        imageAlt: 'Instagram story reply and mention triggers opening a DM conversation',
        span: 'third',
      },
      {
        titleLead: 'Live Chat',
        titleAccent: 'continue',
        body: 'Handoff into the same inbox as WhatsApp so agents see IG context beside Shopify orders.',
        image: '/marketing/customers/customers-outcome-inbox.png',
        imageAlt: 'Live Chat inbox continuing Instagram DM beside WhatsApp with Shopify orders',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'IG automation',
    showcasesSub: 'Comment and story rules, then one inbox for WhatsApp and Instagram follow-ups.',
    showcases: [
      {
        title: 'Comment-to',
        titleAccent: '-DM rules',
        body: 'Match keywords like “price” or “link” and send a branded DM with catalog or WhatsApp deep link.',
        image: '',
        imageLabel: 'Instagram comment-to-DM rule builder for Shopify ecommerce',
      },
      {
        title: 'Story',
        titleAccent: 'triggers',
        body: 'Story reply and mention automations capture interest before the viewer scrolls away.',
        image: '',
        imageLabel: 'Instagram story reply automation settings for D2C brands',
      },
      {
        title: 'Inbox',
        titleAccent: 'handoff',
        body: 'Continue the thread in Live Chat, WA + IG list with channel filters and Customer 360.',
        image: '/marketing/customers/customers-outcome-inbox.png',
        imageLabel: 'Live Chat with Instagram thread beside WhatsApp and Shopify order context',
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
        body: 'Define keywords and the first DM copy, keep brand voice consistent.',
      },
      {
        title: 'Add story triggers',
        body: 'Turn mentions and replies into conversations while attention is warm.',
      },
      {
        title: 'Finish in Live Chat',
        body: 'Agents pick up IG threads next to WhatsApp with Shopify order context when the shopper is ready to buy.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'inbox + Meta',
    related: [
      { label: 'Live Chat', href: '/features/live-chat' },
      { label: 'Meta Manager', href: '/features/meta-manager' },
      { label: 'Audience campaigns', href: '/features/campaigns' },
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
    titleAccent: 'workspace',
    subtitle:
      'Warranty records tied to Shopify orders in one hub.\nAssign, track, and close, no spreadsheet chase.',
    seoTitle: 'Digital Warranty for Shopify India | Assign & Track Aftercare',
    seoDescription:
      'Warranty workspace for Shopify India brands, hub list with status badges, unassigned queue, and manual assign to orders or teammates. Works beside WhatsApp Live Chat.',
    keywords:
      'digital warranty Shopify India, product warranty ecommerce, warranty assignment Shopify, WhatsApp warranty aftercare D2C',
    hero: {
      kind: 'image',
      src: '/warranty-sub-feature/manual-assign.png',
      alt: 'TopEdge digital warranty hub and manual assign workspace for Shopify',
      glow: 'emerald',
    },
    bentoTitle: 'Assign without',
    bentoAccent: 'the spreadsheet',
    bentoSub: 'Hub list, unassigned queue, and manual assign, the three surfaces ops actually opens.',
    bentos: [],
    showcasesTitle: 'Inside',
    showcasesAccent: 'Warranty',
    showcasesSub: 'Hub list, unassigned queue, and manual assign, three surfaces, no spreadsheet.',
    showcases: [
      {
        title: 'Warranty',
        titleAccent: 'hub',
        body: 'List view with status badges, create records, set support contacts, and keep every warranty visible in one workspace.',
        image: '/warranty-sub-feature/27.png',
        imageLabel: 'Digital warranty hub list, batches and status badges for Shopify orders',
      },
      {
        title: 'Unassigned',
        titleAccent: 'list',
        body: 'Warranties that still need an owner sit in an unassigned queue, nothing disappears until someone takes it.',
        image: '/warranty-sub-feature/unassigned.png',
        imageLabel: 'Unassigned warranty queue waiting for Shopify order or teammate assign',
      },
      {
        title: 'Manual',
        titleAccent: 'assign',
        body: 'Assign to the right Shopify order or teammate yourself, expand the row, match products, and set the owner without a bot guess.',
        image: '/warranty-sub-feature/2212.png',
        imageLabel: 'Manual warranty assign to Shopify order or support teammate',
      },
    ],
    stepsTitle: 'How warranty',
    stepsAccent: 'goes live',
    steps: [
      {
        title: 'Connect Shopify',
        body: 'Orders need a live store link so assign can attach to the right purchase.',
      },
      {
        title: 'Open the warranty hub',
        body: 'See every record with status badges in one list, no parallel spreadsheet.',
      },
      {
        title: 'Clear the unassigned queue',
        body: 'Work the ownerless list first so nothing sits without a home.',
      },
      {
        title: 'Assign manually',
        body: 'Attach each warranty to the right order or teammate, you pick, not the bot.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'CRM + Meta',
    related: [
      { label: 'Audience CRM', href: '/features/audience-crm' },
      { label: 'Meta Manager', href: '/features/meta-manager' },
      { label: 'Live Chat', href: '/features/live-chat' },
    ],
    ctaTitle: 'Run warranty without a spreadsheet',
    ctaSub: 'Hub list, unassigned queue, and manual assign, tied to Shopify orders.',
  },

  'profit-loss': {
    id: 'profit-loss',
    path: '/features/profit-loss',
    featureSlug: 'profit-loss',
    eyebrow: 'Profit & costs',
    title: 'After Indian D2C costs,',
    titleAccent: 'what did I keep?',
    subtitle:
      'India-aware P&L with COGS, COD, RTO, fees, and ads.\nSee net profit, not vanity revenue.',
    seoTitle: 'Shopify P&L Analytics India | COGS, COD, RTO & True Net Profit',
    seoDescription:
      'TopEdge Profit & costs for Shopify India D2C: COGS, packaging, payment fees, COD RTO, marketing, true net profit with a cost waterfall and product margins in ₹.',
    keywords:
      'Shopify P&L India, ecommerce COGS RTO analytics, COD profit calculator Shopify, Indian D2C net profit, WhatsApp D2C unit economics',
    hero: {
      kind: 'image',
      src: '/pnl/39.png',
      alt: 'TopEdge Profit & costs net profit dashboard with Indian D2C cost waterfall',
      glow: 'amber',
    },
    bentoTitle: 'Setup once,',
    bentoAccent: 'see real net',
    bentoSub: 'Three-step wizard, then a live dashboard that answers what you kept after Indian D2C costs.',
    bentos: [
      {
        titleLead: 'Products',
        titleAccent: '+ COGS',
        body: 'Confirm Shopify volume, then enter COGS and packaging, uniform or per product, so margin starts from real unit economics.',
        image: '/pnl/28.png',
        imageAlt: 'Profit & costs setup, Shopify products with COGS and packaging costs in ₹',
        span: 'third',
      },
      {
        titleLead: 'Fees &',
        titleAccent: 'overhead',
        body: 'Marketing/CAC, payment gateway %, Shopify fees, and optional fixed overheads per order, India checkout reality, not US SaaS defaults.',
        image: '/pnl/29.png',
        imageAlt: 'India D2C fee setup, payment gateway, Shopify, and marketing overhead costs',
        span: 'third',
      },
      {
        titleLead: 'COD &',
        titleAccent: 'returns',
        body: 'COD preference, delivery cost, COD RTO %, prepaid RTO, and loss per refused COD, the costs that actually eat D2C margin.',
        image: '/pnl/30.png',
        imageAlt: 'COD and RTO return cost settings for Indian D2C Shopify profit calculation',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'Profit & costs',
    showcasesSub: 'True net profit, cost waterfall, and product margins, periods from today to all synced.',
    showcases: [
      {
        title: 'Net profit',
        titleAccent: 'hero',
        body: 'Status (profitable / setup needed), true net profit ₹ vs prior period, plus revenue, orders, margin %, and AOV, no fake “always up” claims.',
        image: '/pnl/40.png',
        imageLabel: 'Profit & costs net profit hero KPIs for Shopify India D2C',
      },
      {
        title: 'Cost',
        titleAccent: 'waterfall',
        body: 'Revenue → COGS → payment fees → RTO → marketing → net profit, with plain-language findings on top cost and COD/RTO drivers.',
        image: '/pnl/41.png',
        imageLabel: 'Profit & costs net profit dashboard with Indian D2C cost waterfall',
      },
      {
        title: 'Product',
        titleAccent: 'table',
        body: 'Revenue · cost · profit · margin % per SKU. Missing COGS sink to the bottom so you know what still needs setup.',
        image: '/pnl/42.png',
        imageLabel: 'Product profit table with margin % per SKU for Shopify India',
      },
    ],
    stepsTitle: 'How Profit & costs',
    stepsAccent: 'gets honest',
    steps: [
      {
        title: 'Run the setup wizard',
        body: 'Products + COGS, fees, then COD & returns, three steps, then recalculate anytime.',
      },
      {
        title: 'Connect Shopify when ready',
        body: 'Sample mode is labeled until the store is live, no fake “live P&L” claim.',
      },
      {
        title: 'Pick a period',
        body: 'Today, 7d, 30d, 90d, or all synced, compare vs prior period in ₹.',
      },
      {
        title: 'Act on findings',
        body: 'Cut SKUs or channels that destroy margin after RTO and ads, edit setup when costs change.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'growth',
    related: [
      { label: 'Audience campaigns', href: '/features/campaigns' },
      { label: 'Cart recovery', href: '/features/journeys#abandoned-cart' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
    ],
    ctaTitle: 'See what you kept after costs',
    ctaSub: 'India-aware P&L, COGS, COD, RTO, ads, honest net ₹, not vanity revenue.',
  },

  'intent-detection': {
    id: 'intent-detection',
    path: '/features/intent-detection',
    featureSlug: 'intent-detection',
    eyebrow: 'Intent detection',
    title: 'Route chats by',
    titleAccent: 'what they mean',
    subtitle:
      'Detect shipping, returns, COD, and human handoff intent.\nRoute flows before you spend AI tokens.',
    seoTitle: 'WhatsApp Intent Detection for Shopify India | Route Without AI Waste',
    seoDescription:
      'Detect WhatsApp message intent for Shopify India D2C, route shipping, returns, COD, and handoff without burning OpenAI/Claude tokens on every message. Works with AI Brain and Live Chat.',
    keywords:
      'WhatsApp intent detection Shopify, chatbot intent routing India, COD WhatsApp intent, ecommerce chat intent D2C, save AI tokens WhatsApp',
    hero: {
      kind: 'video',
      src: '/marketing/demos/intentt.mp4?v=20260918a',
      poster: '/marketing/demos/intent-poster.jpg?v=20260918a',
      label: 'Intent detection routing WhatsApp chats for Shopify India',
      glow: 'sky',
    },
    bentoTitle: 'Intent that',
    bentoAccent: 'steers the bot',
    bentoSub: 'Phrases → confidence → action, start a Flow, reply, assign, or escalate without guessing or burning AI.',
    bentos: [
      {
        titleLead: 'Phrase',
        titleAccent: 'matching',
        body: 'Train 5-10 real customer phrases per intent, Hinglish and slang welcome. Inactive intents never match live traffic.',
        image: '/intent-sub-feature/23.png',
        imageAlt: 'WhatsApp intent phrase matching list with Hinglish training examples',
        span: 'third',
      },
      {
        titleLead: 'Route without',
        titleAccent: 'AI spend',
        body: 'Algorithmic detection routes support flows before open AI generate, save OpenAI/Claude tokens for catalog questions and edge cases.',
        image: '/intent-sub-feature/route-without-ai-spend.png?v=8',
        imageAlt: 'Intent routing that saves WhatsApp AI tokens by matching phrases first',
        span: 'third',
      },
      {
        titleLead: 'Test',
        titleAccent: 'confidence',
        body: 'Hub Test modal shows matched intent and score, fix weak phrases before production WhatsApp traffic.',
        image: '/intent-sub-feature/24.png',
        imageAlt: 'Intent detection test modal showing confidence score before publish',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'intent',
    showcasesSub: 'List, editor, and live routing, same Intelligence hub as AI Brain.',
    showcases: [
      {
        title: 'Intent',
        titleAccent: 'list',
        body: 'Shipping, Returns, COD confirm, handoff, each with phrases, action, and Active toggle for India D2C support.',
        image: '/intent-sub-feature/34.png',
        imageLabel: 'WhatsApp intent list, shipping, returns, COD, and handoff for Shopify',
      },
      {
        title: 'Editor',
        titleAccent: '& actions',
        body: 'Reply text, start a Flow, assign agent, or escalate. Set once, match forever while Active.',
        image: '/intent-sub-feature/35.png',
        imageLabel: 'Intent editor, phrases and routing action for WhatsApp chatbot flows',
      },
      {
        title: 'Live',
        titleAccent: 'routing',
        body: 'Inbound WhatsApp hits the intent engine before or beside Flow Builder, Live Chat takeover still pauses AI and wins.',
        image: '/intent-sub-feature/live-routing.png?v=8',
        imageLabel: 'Live intent match routing into Flow Builder or Live Chat for WhatsApp',
      },
    ],
    stepsTitle: 'How intent',
    stepsAccent: 'goes live',
    steps: [
      {
        title: 'Create intents',
        body: 'Name the jobs India D2C shoppers ask: shipping, returns, COD, talk to human.',
      },
      {
        title: 'Add real phrases',
        body: 'Write how customers actually ask, Hinglish welcome. Split broad intents when confidence is low.',
      },
      {
        title: 'Set actions',
        body: 'Fixed reply, Flow start, assign, or escalate, then toggle Active.',
      },
      {
        title: 'Test & publish',
        body: 'Use the Test modal, then watch Live Chat and Flow Builder respect the routes, takeover still pauses AI.',
      },
    ],
    relatedTitle: 'Works with',
    relatedAccent: 'AI + flows',
    related: [
      { label: 'AI Brain', href: '/features/ai-brain' },
      { label: 'Flow Builder', href: '/features/flow-builder' },
      { label: 'Live Chat', href: '/features/live-chat' },
    ],
    ctaTitle: 'Route WhatsApp by intent, save AI for hard questions',
    ctaSub: 'Match shipping, returns, and COD phrases first. Pair with AI Brain when shoppers need catalog answers.',
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
