export const faqs = [
  {
    question: 'What is WhatsApp automation for Shopify?',
    answer:
      'TopEdge connects your Shopify store to Meta WhatsApp Cloud API so you can run abandoned cart recovery, COD confirmations, order updates, and campaigns from one ecommerce automation workspace.',
  },
  {
    question: 'How does abandoned cart recovery on WhatsApp work?',
    answer:
      'When a shopper leaves items in cart, Journey triggers Meta-approved WhatsApp nudges with product context. Most merchants go live after template approval — typically 24 to 48 hours.',
  },
  {
    question: 'How long does Shopify WhatsApp setup take?',
    answer:
      'Most brands connect Shopify and WhatsApp in about 15 minutes. Nothing sends until you approve each Meta template.',
  },
  {
    question: 'Do I need a developer for ecommerce automation?',
    answer:
      'No. Connect Shopify via OAuth, add WhatsApp credentials, generate flows from an AI form, and publish cart recovery journeys without code.',
  },
  {
    question: 'Can TopEdge handle COD confirmation on WhatsApp?',
    answer:
      'Yes. Journeys branch on COD status, rupee totals, and RTO-aware copy — built for Indian D2C checkout patterns.',
  },
  {
    question: 'How does Meta WhatsApp billing work?',
    answer:
      'Meta charges per message category. TopEdge shows transparent rates and passes through Cloud API costs with no markup.',
  },
  {
    question: 'Is there a free trial for WhatsApp automation?',
    answer:
      'Start free with a 14-day trial, 20 orders, and 200 campaign + email sends. Pick Launch, Growth, or Scale after signup.',
  },
];

/** Homepage only: Instantly-style stories, crisp copy, no filler */
export const homeStories = [
  {
    id: 'cart-recovery' as const,
    title: 'WhatsApp Abandoned Cart Recovery',
    body: 'Stop losing sales at the finish line. Automatically trigger perfectly timed WhatsApp nudges when a shopper leaves items in their cart.',
    href: '/features/journeys',
    cta: 'Start free',
  },
  {
    id: 'journey' as const,
    title: 'Drag-and-Drop Journey Builder',
    body: 'Map out the perfect post-purchase experience on a visual canvas. Build custom automation flows based on customer behavior or purchase history.',
    href: '/features/journeys',
    cta: 'Start free',
  },
  {
    id: 'inbox' as const,
    title: 'Shared Team Inbox for WhatsApp & IG',
    body: 'Stop juggling phones. Consolidate support into one dashboard. Your team can manage, assign, and reply to messages from a single shared inbox.',
    href: '/features/live-chat',
    cta: 'Start free',
  },
  {
    id: 'ai-brain' as const,
    title: 'Audience Segmentation & Lead Scoring',
    body: 'Not all customers are equal. Automatically score leads and segment your audience based on engagement for highly personalized broadcasts.',
    href: '/features/audience-crm',
    cta: 'Start free',
  },
  {
    id: 'connect' as const,
    title: 'Automated Order & Shipping Alerts',
    body: 'Eliminate WISMO support tickets. Proactively send automated order confirmations, shipping updates, and tracking links directly to WhatsApp.',
    href: '/features/shopify',
    cta: 'Start free',
  },
];

export const homeIntegrations = [
  {
    name: 'Shopify',
    rows: [
      { label: 'OAuth sync', value: 'Products · carts · orders' },
      { label: 'Source of truth', value: 'Edit in dashboard' },
    ],
    action: 'Connect',
    href: '/features/shopify',
  },
  {
    name: 'Meta WhatsApp',
    rows: [
      { label: 'Templates', value: 'You approve each one' },
      { label: 'Rates', value: 'Utility · marketing · no markup' },
    ],
    action: 'Manage',
    href: '/features/meta-manager',
  },
  {
    name: 'Instagram',
    rows: [
      { label: 'Entry', value: 'Comment or story → DM' },
      { label: 'Continue', value: 'Live Chat handoff' },
    ],
    action: 'Add',
    href: '/features/instagram',
  },
  {
    name: 'Analytics',
    rows: [
      { label: 'Funnel', value: 'Sent · read · clicked · paid' },
      { label: 'Outcome', value: 'Recovery ₹, not vanity' },
    ],
    action: 'Open',
    href: '/features/analytics',
  },
];

/** Full catalog still used by /features index storytelling if needed */
export const featureStories = [
  ...homeStories.map((s) => ({
    id: s.id,
    label: s.title.split(' ')[0],
    title: s.title,
    body: s.body,
    bullets: [] as string[],
    href: s.href,
    cta: s.cta,
  })),
];

export type FeatureStoryId =
  | (typeof homeStories)[number]['id']
  | 'shopify'
  | 'ai-brain'
  | 'campaigns'
  | 'instagram'
  | 'dashboard'
  | 'analytics'
  | 'meta-manager'
  | 'audience'
  | 'journey'
  | 'flow-builder'
  | 'cart-recovery'
  | 'inbox';

export const modules = [
  { name: 'Dashboard', outcome: 'Store + support KPIs at a glance', href: '/features' },
  { name: 'Shopify / Store', outcome: 'OAuth sync · edit in dashboard', href: '/features/shopify' },
  { name: 'Live Chat', outcome: 'Unified WA + IG inbox', href: '/features/live-chat' },
  { name: 'AI Brain', outcome: 'Catalog-grounded replies', href: '/features/ai-brain' },
  { name: 'Analytics', outcome: 'Recovery ₹, not vanity charts', href: '/features/analytics' },
  { name: 'Audience', outcome: 'Customers, segments, scores', href: '/features/audience-crm' },
  { name: 'Campaigns', outcome: 'Meta-safe broadcasts', href: '/features/campaigns' },
  { name: 'Flow Builder', outcome: 'AI form → WA flows', href: '/features/flow-builder' },
  { name: 'Journey', outcome: 'Canvas journeys · triggers to WA', href: '/features/journeys' },
  { name: 'Meta Manager', outcome: 'Templates, catalog, QR', href: '/features/meta-manager' },
  { name: 'IG Automation', outcome: 'Comment & story to DM', href: '/features/instagram' },
  { name: 'Cart recovery', outcome: '3-message sequences', href: '/features/journeys' },
];


export const howItWorks = [
  {
    step: '01',
    title: 'Connect Shopify and WhatsApp',
    desc: 'OAuth your store and add WhatsApp credentials. About fifteen minutes.',
  },
  {
    step: '02',
    title: 'Approve Meta templates',
    desc: 'Create templates in Meta Manager. Nothing sends until Meta approves.',
  },
  {
    step: '03',
    title: 'Build journeys and flows',
    desc: 'Recovery on Journey canvas, or AI form into Flow Builder for chatbots.',
  },
  {
    step: '04',
    title: 'Sell and support',
    desc: 'Recover carts, run campaigns, and reply from Live Chat with honest metrics.',
  },
];

export const testimonials = [
  {
    quote:
      'We moved cart recovery from email-only to a 3-message WA sequence. Recovery rate went from 4% to 11% in the first month, and we finally see which template actually converts.',
    name: 'Priya M.',
    role: 'Founder',
    company: 'D2C skincare, Mumbai',
    metric: '+7pp recovery',
  },
  {
    quote:
      'Support used to mean three tabs: Shopify, WhatsApp Web, and a spreadsheet. Now one inbox shows order # and COD status beside every thread.',
    name: 'Arjun K.',
    role: 'Head of Ops',
    company: 'Fashion brand, Bengaluru',
    metric: '3 tabs → 1',
  },
  {
    quote:
      'The AI form built our first Flow Builder bot in minutes. We tweaked two nodes and were live before the weekend sale.',
    name: 'Neha S.',
    role: 'Growth lead',
    company: 'Food & beverage, Delhi NCR',
    metric: 'Minutes to first flow',
  },
];

export const recoveryToasts = [
  { store: 'Kaya Roots', amount: '₹2,840', item: 'Vitamin C serum', time: '2m ago' },
  { store: 'Thread & Co', amount: '₹4,199', item: 'Linen kurta set', time: '5m ago' },
  { store: 'Bean & Brew', amount: '₹1,650', item: 'Cold brew bundle', time: '8m ago' },
];
