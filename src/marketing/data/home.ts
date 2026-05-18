export const logoBrands = [
  'Shopify D2C',
  'Beauty & skincare',
  'Fashion & apparel',
  'Home & living',
  'Food & beverage',
  'COD-first brands',
];

export const serviceTagline =
  'Connect Shopify to WhatsApp. Approve Meta templates, automate cart recovery, and run campaigns — one workspace for Indian D2C.';

/** Instantly-style homepage feature blocks — title, description, graphic below */
export const homeFeatureBlocks = [
  {
    slug: 'flow-builder',
    eyebrow: 'AI Form → Flow Builder',
    title: 'Build WhatsApp automations in about 10 minutes',
    description:
      'Answer a short form in plain English. TopEdge generates cart recovery, COD confirm, and order updates — then you publish. No code, Meta-safe templates only.',
    imageId: 'flow-builder',
  },
  {
    slug: 'live-chat',
    eyebrow: 'Live Chat',
    title: 'One inbox with full Shopify order context',
    description:
      'Pause AI, reply as your team, and see order #TE-1042 beside every thread — COD status, line items, and LTV without switching tabs.',
    imageId: 'live-chat',
  },
  {
    slug: 'ai-brain',
    eyebrow: 'AI Brain',
    title: 'Replies that know your catalog and policies',
    description:
      'Train on PDFs, policies, and SKUs. Set persona and escalation — not a generic chatbot guessing prices on WhatsApp.',
    imageId: 'ai-brain',
  },
  {
    slug: 'meta-manager',
    eyebrow: 'Meta Manager',
    title: 'Meta-approved templates, on your terms',
    description:
      'Library → AI drafts copy → you approve → submit to Meta → use in flows and campaigns. Nothing auto-sends without you.',
    imageId: 'meta-manager-library',
  },
  {
    slug: 'abandoned-cart',
    eyebrow: 'Abandoned Cart',
    title: 'Recover checkouts before they go cold',
    description:
      'Shopify drop-offs trigger up to three WhatsApp nudges — product image, ₹ price, and one-tap checkout. COD-aware copy included.',
    imageId: 'abandoned-cart',
  },
  {
    slug: 'campaigns',
    eyebrow: 'Campaigns',
    title: 'Broadcasts and sequences that respect Meta',
    description:
      'Segments from Shopify, approved templates only, schedule or send now — then track reads, replies, and ₹ attributed.',
    imageId: 'campaigns-broadcast',
  },
  {
    slug: 'shopify',
    eyebrow: 'Shopify Engine',
    title: 'Your store data powers every WhatsApp touchpoint',
    description:
      'Orders, customers, carts, and catalog sync into one Commerce Hub — the backbone for flows, inbox, and campaigns.',
    imageId: 'store-engine',
  },
  {
    slug: 'analytics',
    eyebrow: 'Analytics',
    title: 'Revenue-oriented insights, not vanity metrics',
    description:
      'Track recovery, campaign performance, and attributed ₹ — see what WhatsApp actually drives for your D2C brand.',
    imageId: 'analytics',
  },
] as const;

/** Homepage platform tabs — Bitespeed-style Marketing / Sales / Support */
export const platformTabs = [
  {
    id: 'automate',
    label: 'Automate',
    hub: 'Revenue',
    title: 'Turn Shopify events into WhatsApp revenue',
    description:
      'Cart recovery, COD confirm, and order updates — built from live store data with Meta-approved templates only.',
    slug: 'flow-builder',
    cta: 'Explore Flow Builder',
    bullets: ['AI Form → live flow in ~10 min', 'Abandoned cart · 3-message rhythm', 'Order automations · paid to delivered'],
  },
  {
    id: 'inbox',
    label: 'Inbox',
    hub: 'Support',
    title: 'One inbox with full order context',
    description:
      'Pause AI, reply as your team, and see every order beside the thread — no tab switching between Shopify and WhatsApp.',
    slug: 'live-chat',
    cta: 'Explore Live Chat',
    bullets: ['Shopify order cards in-thread', 'AI suggests · you send', 'Assignments & handoff'],
  },
  {
    id: 'grow',
    label: 'Grow',
    hub: 'Marketing',
    title: 'Campaigns and AI that know your catalog',
    description:
      'Segments from Shopify, broadcasts with approved templates, and catalog-aware replies — not a generic chatbot.',
    slug: 'campaigns',
    cta: 'Explore Campaigns',
    bullets: ['Audience CRM & segments', 'Template-safe broadcasts', 'AI Brain · on-policy replies'],
  },
] as const;

export const impactStats = [
  { value: '32%', label: 'avg. cart recovery' },
  { value: '15 min', label: 'median go-live' },
  { value: '12', label: 'product modules' },
  { value: '24/7', label: 'AI + human inbox' },
];

export const heroStats = [
  { value: '32%', label: 'cart recovery' },
  { value: '24/7', label: 'AI + human inbox' },
  { value: '15 min', label: 'to go live' },
  { value: '12', label: 'product modules' },
];

export const platformPills = [
  { label: 'Cart recovery', highlight: true },
  { label: 'Meta templates' },
  { label: 'Shopify sync' },
  { label: 'AI inbox' },
];

export const valuePillars = [
  {
    id: 'automate',
    title: 'Automate revenue',
    outcome: 'Flows',
    desc: 'Cart recovery, COD confirm, order updates — Shopify triggers, Meta-safe sends.',
    features: ['AI Form → Flow Builder', 'Cart recovery', 'Order automations'],
    to: '/features/flow-builder',
  },
  {
    id: 'templates',
    title: 'Meta templates',
    outcome: 'You approve',
    desc: 'AI drafts copy. You edit. One tap to Meta — reuse in flows & campaigns.',
    features: ['Template library', 'Status tracking', 'WABA setup'],
    to: '/features/meta-manager',
  },
  {
    id: 'inbox',
    title: 'Unified inbox',
    outcome: 'Live Chat',
    desc: 'Order cards beside every thread. Pause AI. Reply as your team.',
    features: ['Shopify context', 'Handoff', 'Assignments'],
    to: '/features/live-chat',
  },
  {
    id: 'grow',
    title: 'Campaigns & AI',
    outcome: 'Growth',
    desc: 'Segments from Shopify. Broadcasts with approved templates. Catalog-aware AI.',
    features: ['Audience CRM', 'Sequences', 'AI Brain'],
    to: '/features/campaigns',
  },
];

export const stackIntegrations = [
  { name: 'Shopify', detail: 'Orders · carts · customers' },
  { name: 'Meta WhatsApp', detail: 'Templates · WABA · catalog' },
  { name: 'Your team', detail: 'Inbox · assignments' },
];

export const howItWorksSteps = [
  {
    n: '01',
    title: 'Connect',
    desc: 'Shopify + WhatsApp in Settings.',
  },
  {
    n: '02',
    title: 'Approve templates',
    desc: 'Pick, edit, send to Meta.',
  },
  {
    n: '03',
    title: 'Publish flows',
    desc: 'AI Form → live in ~10 min.',
  },
  {
    n: '04',
    title: 'Sell & support',
    desc: 'Campaigns + inbox, one hub.',
  },
];

export const metaSteps = [
  { step: '01', title: 'Pick a template', desc: 'Ecommerce starters for cart, orders, COD.' },
  { step: '02', title: 'Create & approve', desc: 'AI drafts — you edit before Meta.' },
  { step: '03', title: 'Use everywhere', desc: 'Flows, campaigns, and agent replies.' },
];

export const testimonials = [
  {
    name: 'Rahul K.',
    role: 'Growth · D2C apparel',
    category: 'Fashion',
    metric: '22% recovery',
    quote: 'Cart recovery on COD changed our month.',
  },
  {
    name: 'Meera S.',
    role: 'Ops · Shopify Plus',
    category: 'Beauty',
    metric: '3 days live',
    quote: 'Approved flows without an agency.',
  },
  {
    name: 'Ananya R.',
    role: 'Founder',
    category: 'Electronics',
    metric: '4× faster replies',
    quote: 'Support scaled without more headcount.',
  },
];

/** Homepage scrollytelling — deep links to feature pages */
export const productStories = [
  {
    id: 'cart',
    eyebrow: 'Abandoned cart',
    title: 'Recover checkouts before they go cold',
    description:
      'Shopify drop-offs trigger up to three WhatsApp nudges — product image, ₹ price, and one-tap checkout. COD-aware copy included.',
    bullets: ['15 min → 2 hr → 24 hr rhythm', 'Only approved Meta templates', '32% avg. recovery benchmark'],
    slug: 'abandoned-cart',
    cta: 'See cart recovery',
  },
  {
    id: 'inbox',
    eyebrow: 'Live Chat',
    title: 'One inbox. Full order context.',
    description:
      'Pause the bot, reply as a human, and see #TE-1042 beside every thread — COD status, line items, and LTV without switching tabs.',
    bullets: ['WhatsApp + Shopify in one view', 'AI suggests · you approve', 'Assignments & real-time alerts'],
    slug: 'live-chat',
    cta: 'Explore Live Chat',
  },
  {
    id: 'ai',
    eyebrow: 'AI Brain',
    title: 'Replies that know your catalog',
    description:
      'Train on PDFs, policies, and SKUs. Set persona and escalation — not a generic chatbot guessing prices on WhatsApp.',
    bullets: ['0 hallucinated prices', 'Intent + training inbox', 'BYOK Gemini or OpenAI'],
    slug: 'ai-brain',
    cta: 'Train your AI',
  },
  {
    id: 'campaigns',
    eyebrow: 'Campaigns',
    title: 'Broadcasts that respect Meta',
    description:
      'Segments from Shopify, approved templates only, schedule or send now — then track reads, replies, and ₹ attributed.',
    bullets: ['VIP & cart segments', 'Multi-step sequences', '71% avg. read rate'],
    slug: 'campaigns',
    cta: 'Start a campaign',
  },
];

export const whyTopEdge = [
  { before: 'Agency + spreadsheets for WhatsApp', after: 'One workspace · live in ~15 min' },
  { before: 'Generic chatbot · wrong prices', after: 'Catalog-trained AI · on-policy' },
  { before: 'Templates rejected by Meta', after: 'Library → you approve → Meta' },
  { before: 'Support hunts order IDs', after: 'Order card in every thread' },
];

export const faqs = [
  {
    q: 'What is TopEdge?',
    a: 'A WhatsApp growth OS for Shopify India: Meta templates, automations, campaigns, and a unified inbox — powered by live store data.',
  },
  {
    q: 'Do you send messages without my approval?',
    a: 'No. Every template is drafted for you to review before Meta submission. Flows only use approved templates.',
  },
  {
    q: 'How fast can we go live?',
    a: 'Most brands connect Shopify and publish a first flow in about fifteen minutes. Meta template approval typically takes 24–48 hours.',
  },
  {
    q: 'Is this only for large brands?',
    a: 'Built for Indian D2C on Shopify — from first orders to multi-crore. Start free, scale when WhatsApp drives revenue.',
  },
  {
    q: 'COD and ₹ pricing?',
    a: 'Yes. COD-aware flows, ₹ plans, and economics tuned for Indian delivery and checkout behavior.',
  },
];
