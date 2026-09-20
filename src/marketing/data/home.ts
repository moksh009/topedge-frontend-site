export const faqs = [
  {
    question: 'What is WhatsApp automation for Shopify?',
    answer:
      'TopEdge connects your Shopify store to Meta WhatsApp Cloud API so you can run abandoned cart recovery, COD confirmations, order updates, and campaigns from one ecommerce automation workspace.',
  },
  {
    question: 'How does abandoned cart recovery on WhatsApp work?',
    answer:
      'When a shopper leaves items in cart, Journey triggers Meta-approved WhatsApp nudges with product context. Most merchants go live after template approval, typically 24 to 48 hours.',
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
      'Yes. Journeys branch on COD status, rupee totals, and RTO-aware copy, built for Indian D2C checkout patterns.',
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
    body: 'Recover checkouts with timed WhatsApp nudges the moment a shopper leaves items behind.',
    href: '/features/journeys',
    cta: 'Start free',
  },
  {
    id: 'journey' as const,
    title: 'Drag-and-Drop Journey Builder',
    body: 'Map post-purchase flows on a visual canvas: wait, branch, and message from one place.',
    href: '/features/journeys',
    cta: 'Start free',
  },
  {
    id: 'inbox' as const,
    title: 'Shared Team Inbox for WhatsApp & IG',
    body: 'One inbox for WhatsApp and Instagram. Assign chats, reply with order context, stay aligned.',
    href: '/features/live-chat',
    cta: 'Start free',
  },
  {
    id: 'ai-brain' as const,
    title: 'AI Brain, WhatsApp AI on Your Keys',
    body: 'Bring your own OpenAI or Claude key. Ground replies in catalog and policies, Intent Detect saves tokens.',
    href: '/features/ai-brain',
    cta: 'Start free',
  },
  {
    id: 'connect' as const,
    title: 'Automated Order & Shipping Alerts',
    body: 'Send confirmations, tracking, and shipping updates on WhatsApp, cut WISMO tickets.',
    href: '/integrations',
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
    href: '/integrations',
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
    name: 'Tracking Pixel',
    rows: [
      { label: 'Install', value: 'Shopify theme app embed' },
      { label: 'Signal', value: 'Product · cart intent → WhatsApp' },
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
  { name: 'Live Chat', outcome: 'Unified WA + IG inbox', href: '/features/live-chat' },
  { name: 'AI Brain', outcome: 'Catalog-grounded replies', href: '/features/ai-brain' },
  { name: 'Tracking Pixel', outcome: 'Website intent → WhatsApp', href: '/features/analytics' },
  { name: 'Audience', outcome: 'Customers, segments, scores', href: '/features/audience-crm' },
  { name: 'Campaigns', outcome: 'Meta-safe broadcasts', href: '/features/campaigns' },
  { name: 'Flow Builder', outcome: 'AI form → WA flows', href: '/features/flow-builder' },
  { name: 'Journey', outcome: 'Cart, COD & order journeys', href: '/features/journeys' },
  { name: 'Meta Manager', outcome: 'Templates, catalog, QR', href: '/features/meta-manager' },
  { name: 'IG Automation', outcome: 'Comment & story to DM', href: '/features/instagram' },
  { name: 'Warranty', outcome: 'Hub, queue, assign', href: '/features/warranty' },
  { name: 'Intent detection', outcome: 'Route chats by meaning', href: '/features/intent-detection' },
  { name: 'Profit & costs', outcome: 'True net after COD & RTO', href: '/features/profit-loss' },
  { name: 'Opt-in tools', outcome: 'Popup, spin, widget capture', href: '/features/opt-in-tools' },
  { name: 'Integrations', outcome: 'Shopify + Meta connect', href: '/integrations' },
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
      'Moksh got our Shopify WhatsApp live the same week we asked. Abandoned carts and COD confirms on one stack — for a smart-home catalog with real AOV, that inbox with order context is what we actually needed.',
    name: 'Ved Patel',
    role: 'Founder, Delitech Smart Home',
    company: 'Delitech Smart Home',
    brand: 'DELITECH',
    brandLogo: '/trust/delitech.png',
    brandLogoAlt: 'Delitech Smart Home',
    metric: 'Same-week go-live',
    avatar: '/trust/delitech.png',
    tone: 'violet' as const,
  },
  {
    quote:
      'We were juggling WhatsApp Web and Shopify admin for every order question. TopEdge puts the SKU and COD status beside the chat. Recovery sequences finally feel like Apex, not a generic blast.',
    name: 'Shubham',
    role: 'Apex Light',
    company: 'Apex Light',
    brand: 'APEX',
    brandLogo: '/trust/apex-white.png',
    brandLogoAlt: 'Apex Light',
    metric: 'Inbox + orders',
    avatar: '/trust/apex-white.png',
    tone: 'amber' as const,
  },
  {
    quote:
      'Choice Salon runs on WhatsApp more than email. Cart nudges and follow-ups go out without the team copy-pasting all evening. The TopEdge boys know how Indian shops actually work.',
    name: 'Shubhash Bhai',
    role: 'Choice Salon',
    company: 'Choice Salon',
    brand: 'CHOICE',
    brandLogo: '/trust/choicesalon-white.png',
    brandLogoAlt: 'Choice Salon',
    metric: 'WhatsApp-first ops',
    avatar: '/trust/choicesalon-white.png',
    tone: 'rose' as const,
  },
  {
    quote:
      'Flow Builder drafted our first WhatsApp bot in minutes — we tweaked a few nodes and went live before the weekend rush. No agency sprint. That’s why we stuck with Moksh’s team.',
    name: 'Steven Mugabe',
    role: 'code CLINIC',
    company: 'code CLINIC',
    brand: 'code CLINIC',
    brandLogo: '/trust/codeclinic-white.png',
    brandLogoAlt: 'code CLINIC',
    metric: 'Minutes to first flow',
    avatar: '/trust/codeclinic-white.png',
    tone: 'emerald' as const,
  },
];

export const recoveryToasts = [
  { store: 'Delitech Smart Home', amount: '₹4,299', item: 'Smart switch kit', time: '2m ago' },
  { store: 'Apex Light', amount: '₹2,499', item: 'LED panel light', time: '5m ago' },
  { store: 'Choice Salon', amount: '₹1,899', item: 'Hair care bundle', time: '8m ago' },
  { store: 'code CLINIC', amount: '₹3,150', item: 'Care package', time: '12m ago' },
];
