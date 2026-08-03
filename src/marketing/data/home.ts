export const faqs = [
  {
    question: 'How long does setup take?',
    answer:
      'Most merchants connect Shopify and WhatsApp in about 15 minutes. Meta template approval usually takes 24 to 48 hours. Nothing sends until you approve each template.',
  },
  {
    question: 'Do I need a developer?',
    answer:
      'No. Connect Shopify via OAuth, add WhatsApp credentials, generate flows from an AI form, and publish journeys without code.',
  },
  {
    question: 'What about COD and Indian shipping?',
    answer:
      'Journeys include COD status, rupee totals, and RTO-aware copy. Cart recovery is tuned for Indian checkout patterns.',
  },
  {
    question: 'How does Meta billing work?',
    answer:
      'Meta charges per message category. TopEdge shows transparent rates on pricing and passes through Meta costs with no markup.',
  },
  {
    question: 'Can my team reply manually?',
    answer:
      'Yes. Live Chat unifies WhatsApp and Instagram with full Shopify order context. Agents take over any thread and pause AI instantly.',
  },
  {
    question: 'Where do I change store data?',
    answer:
      'Shopify is the source of truth. TopEdge syncs products, carts, and orders. Edit catalog and settings in the dashboard.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Start free with a 14-day trial, 250 contacts, and 6,000 messages. Upgrade when WhatsApp pays for itself.',
  },
];

/** Homepage only: Instantly-style stories, crisp copy, no filler */
export const homeStories = [
  {
    id: 'cart-recovery' as const,
    title: 'Recover carts on WhatsApp',
    body: 'Shopify abandon starts a 3-message sequence. Timed nudges with COD copy and Meta templates.',
    href: '/features/journeys',
    cta: 'Start free',
  },
  {
    id: 'inbox' as const,
    title: 'Support beside the order',
    body: 'Pick a thread, reply on WhatsApp, and see the Shopify order (COD, status, LTV) beside it.',
    href: '/features/live-chat',
    cta: 'Start free',
  },
  {
    id: 'ai-brain' as const,
    title: 'AI that knows your catalog',
    body: 'Replies grounded in Shopify products and store policy. Intent routing before an agent steps in.',
    href: '/features/ai-brain',
    cta: 'Start free',
  },
  {
    id: 'journey' as const,
    title: 'Automate the journey',
    body: 'Shopify abandon starts a canvas: wait, branch on COD, then send WhatsApp or skip.',
    href: '/features/journeys',
    cta: 'Start free',
  },
  {
    id: 'flow-builder' as const,
    title: 'AI form to Flow Builder',
    body: 'Fill niche and goals once. Get an editable WhatsApp flow, pick a trigger, publish.',
    href: '/features/flow-builder',
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
