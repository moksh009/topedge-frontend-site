import {
  Brain,
  Workflow,
  MessageSquare,
  Megaphone,
  Users,
  ShoppingBag,
  Package,
  BarChart3,
  GitBranch,
  Inbox,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react';

export type FeatureItem = {
  slug: string;
  title: string;
  tagline: string;
  icon: LucideIcon;
  hub?: string;
};

export type FeatureDetail = {
  slug: string;
  title: string;
  headline: string;
  description: string;
  problem: string;
  solution: string;
  capabilities: { title: string; desc: string }[];
  steps: { title: string; desc: string }[];
  related: string[];
};

export const featureDetails: Record<string, FeatureDetail> = {
  'ai-brain': {
    slug: 'ai-brain',
    title: 'AI Brain',
    headline: 'AI that knows your products, policies, and tone',
    description: 'Train TopEdge on your catalog, PDFs, and brand voice. Every reply stays on-policy.',
    problem: 'Generic chatbots guess. They hallucinate prices, ignore COD policies, and sound nothing like your brand.',
    solution: 'Intelligence Hub connects intent detection, knowledge base, and persona settings so AI answers like your best agent.',
    capabilities: [
      { title: 'Intent Engine', desc: 'Route high-intent buyers to the right flow automatically.' },
      { title: 'Knowledge Base', desc: 'Upload PDFs, URLs, and product data.' },
      { title: 'AI Persona', desc: 'Set tone, language, and escalation rules.' },
      { title: 'Training Inbox', desc: 'Correct replies — AI learns from your edits.' },
      { title: 'Bot Quality', desc: 'See resolution rate and missed intents.' },
      { title: 'Export reports', desc: 'PDF intelligence reports for stakeholders.' },
    ],
    steps: [
      { title: 'Connect Shopify', desc: 'Sync catalog and policies automatically.' },
      { title: 'Upload knowledge', desc: 'Add FAQs, return policy, and sizing guides.' },
      { title: 'Go live in Live Chat', desc: 'AI suggests replies; agents approve or edit.' },
    ],
    related: ['live-chat', 'flow-builder', 'meta-manager'],
  },
  'flow-builder': {
    slug: 'flow-builder',
    title: 'AI Form → Flow Builder',
    headline: 'Build WhatsApp automations in 10 minutes — zero technical knowledge',
    description:
      'Answer a short form in plain English. TopEdge AI generates cart recovery, COD confirm, order updates, and follow-ups — then you publish.',
    problem:
      'Founders waste weeks wiring Zapier, spreadsheets, and agencies. Most never launch COD confirm or cart recovery on WhatsApp.',
    solution:
      'AI Form → Flow Builder turns your intent into a live automation. No canvas expertise required — edit visually only if you want.',
    capabilities: [
      { title: 'AI Form intake', desc: 'Describe trigger, message, and timing — like talking to a teammate.' },
      { title: 'Auto-generated canvas', desc: 'Full flow built for you: triggers, waits, templates, branches.' },
      { title: '~10 min to publish', desc: 'Most Indian D2C brands go live the same day they sign up.' },
      { title: 'Cart & COD flows', desc: 'Abandoned cart, COD confirmation, thank-you — pre-tuned for India.' },
      { title: 'Visual fine-tuning', desc: 'Optional drag-and-drop edits for power users.' },
      { title: 'Meta-safe sends', desc: 'Only approved templates reach customers.' },
    ],
    steps: [
      { title: 'Fill the AI form', desc: 'What triggers it, what to say, when to follow up — in plain language.' },
      { title: 'Review & tweak', desc: 'See the generated flow. Edit copy or nodes if needed.' },
      { title: 'Publish', desc: 'One tap — your store runs on WhatsApp 24/7.' },
    ],
    related: ['meta-manager', 'shopify', 'live-chat'],
  },
  'live-chat': {
    slug: 'live-chat',
    title: 'Live Chat',
    headline: 'WhatsApp sales and support in one premium inbox',
    description: 'Order cards, AI suggested replies, and customer context — beside every thread.',
    problem: 'Agents switch between Shopify admin and WhatsApp. They ask for order IDs customers already gave.',
    solution: 'Unified inbox with Shopify order #TE-1042, LTV, mood, and one-click takeover.',
    capabilities: [
      { title: 'Unified threads', desc: 'WhatsApp (Instagram soon) in one view.' },
      { title: 'Order cards in chat', desc: 'Product image, ₹ amount, COD/prepaid status.' },
      { title: 'AI suggested replies', desc: 'Trained on catalog — agent approves or edits.' },
      { title: 'Assign & snooze', desc: 'Route to the right teammate instantly.' },
      { title: 'Real-time sync', desc: 'Socket updates — no refresh spam.' },
      { title: 'Indian CX ready', desc: 'COD, sizing, and delivery questions handled in-thread.' },
    ],
    steps: [
      { title: 'Connect WABA', desc: 'Link Meta WhatsApp Business API.' },
      { title: 'Sync Shopify', desc: 'Orders and customers appear beside chats.' },
      { title: 'Reply with AI', desc: 'Suggest, approve, or take over — your rules.' },
    ],
    related: ['ai-brain', 'flow-builder', 'shopify'],
  },
  'meta-manager': {
    slug: 'meta-manager',
    title: 'Meta Manager',
    headline: 'Meta-approved templates, on your terms',
    description: 'Library → AI copy → you approve → submit to Meta → use everywhere. Nothing auto-sends.',
    problem: 'Getting WhatsApp templates approved is slow and confusing. Most tools hide what actually goes to Meta.',
    solution: 'TopEdge mirrors the exact 3-step workflow in your dashboard: pick, create & send, use in store.',
    capabilities: [
      { title: 'Template library', desc: 'Prebuilt ecommerce templates for Indian D2C.' },
      { title: 'AI Studio', desc: 'AI drafts copy — you edit before submission.' },
      { title: 'One-tap to Meta', desc: 'Submit only when you are ready.' },
      { title: 'Status tracking', desc: 'See reviewing, approved, or rejected at a glance.' },
      { title: 'Use in flows', desc: 'Approved templates power campaigns and automations.' },
      { title: 'WABA connections', desc: 'Catalog, Shopify, and technical setup in one place.' },
    ],
    steps: [
      { title: 'Pick messages', desc: 'Browse the library and choose a template.' },
      { title: 'Create & send to Meta', desc: 'AI writes copy; you approve; one tap to Meta.' },
      { title: 'Use in your store', desc: 'Deploy in Flow Builder, campaigns, and order messages.' },
    ],
    related: ['flow-builder', 'campaigns', 'shopify'],
  },
  'campaigns': {
    slug: 'campaigns',
    title: 'Campaigns',
    headline: 'Broadcasts that respect Meta rules',
    description: 'Segments, schedules, and template-powered sends to your Shopify audience.',
    problem: 'Blasting WhatsApp gets numbers banned. You need segments and approved templates.',
    solution: 'Campaigns use your approved templates and CRM segments — schedule or send now.',
    capabilities: [
      { title: 'Segments', desc: 'Target by cart, order history, tags, or loyalty.' },
      { title: 'Template sends', desc: 'Only Meta-approved message templates.' },
      { title: 'Sequences', desc: 'Multi-step follow-ups after a broadcast.' },
      { title: 'Schedule', desc: 'Send at the best time for Indian buyers.' },
      { title: 'Analytics', desc: 'Delivery, read, and reply metrics.' },
      { title: 'Compliance', desc: 'Opt-in aware; no sends without approved templates.' },
    ],
    steps: [
      { title: 'Build segment', desc: 'Filter audience from Shopify sync.' },
      { title: 'Choose template', desc: 'Pick an approved Meta template.' },
      { title: 'Launch', desc: 'Schedule or send; track results in dashboard.' },
    ],
    related: ['meta-manager', 'audience-crm', 'analytics'],
  },
  'shopify': {
    slug: 'shopify',
    title: 'Shopify Engine',
    headline: 'Shopify data powers every message',
    description: 'Commerce Hub syncs products, orders, discounts, and customers into WhatsApp workflows.',
    problem: 'WhatsApp and Shopify live in silos. Agents ask customers for order IDs they already have.',
    solution: 'Store Engine deep-syncs catalog and orders so every automation and reply has full context.',
    capabilities: [
      { title: 'Order sync', desc: 'Real-time order status in Live Chat.' },
      { title: 'Products & discounts', desc: 'Share catalog and offers in-thread.' },
      { title: 'Abandoned cart', desc: 'Trigger recovery from Shopify events.' },
      { title: 'COD / RTO insights', desc: 'Pipeline analytics for Indian economics.' },
      { title: 'Demand forecast', desc: 'Plan inventory from conversation trends.' },
      { title: 'Suppliers', desc: 'Manage vendor data alongside commerce.' },
    ],
    steps: [
      { title: 'Connect store', desc: 'OAuth to Shopify in under 2 minutes.' },
      { title: 'Map webhooks', desc: 'Cart, order, and customer events flow in.' },
      { title: 'Automate', desc: 'Flows and order messages use live data.' },
    ],
    related: ['order-automations', 'flow-builder', 'analytics'],
  },
  'audience-crm': {
    slug: 'audience-crm',
    title: 'Audience CRM',
    headline: 'Every shopper, cart, and loyal customer — in one CRM',
    description: 'Segments, loyalty, reviews, abandoned carts, and warranty — powered by Shopify + WhatsApp events.',
    problem: 'Customer data is scattered across Shopify, spreadsheets, and WhatsApp chats. Campaigns miss the right buyers.',
    solution: 'Audience Hub unifies leads, loyalty tiers, review routing, and smart segments for campaigns.',
    capabilities: [
      { title: 'All Customers', desc: 'Full CRM list with tags, scores, and order history.' },
      { title: 'Loyalty & Rewards', desc: 'Points per ₹ spent with expiry reminders on WhatsApp.' },
      { title: 'Reviews & Reputation', desc: 'Happy customers → Google; unhappy → support, not public.' },
      { title: 'Segments', desc: 'One-click audiences for broadcasts and flows.' },
      { title: 'Abandoned Carts', desc: 'Recovery leads linked to cart automations.' },
      { title: 'Warranty', desc: 'Claims and QR registration on packaging.' },
    ],
    steps: [
      { title: 'Sync Shopify', desc: 'Customers and orders build profiles automatically.' },
      { title: 'Score & segment', desc: 'Waterfall rules tag VIPs, at-risk, and repeat buyers.' },
      { title: 'Target campaigns', desc: 'Send approved templates to the right segment.' },
    ],
    related: ['campaigns', 'flow-builder', 'shopify'],
  },
  'order-automations': {
    slug: 'order-automations',
    title: 'Order automations',
    headline: 'Order placed, shipped, delivered — automatic WhatsApp updates',
    description: 'Rule-based order triggers send approved Meta templates with delays you control.',
    problem: 'Customers message “where is my order?” because proactive updates never went out on WhatsApp.',
    solution: 'Order Messages & Rules map paid, shipped, and delivered events to templates — parallel to Flow Builder.',
    capabilities: [
      { title: 'Event rules', desc: 'Paid, shipped, delivered, or SKU-specific triggers.' },
      { title: 'Template mapping', desc: 'Each status uses an approved Meta template.' },
      { title: 'Delays', desc: 'Wait before send — e.g. review request +2 days after delivery.' },
      { title: 'Order panel', desc: 'See which template fires for each Shopify status.' },
      { title: 'COD aware', desc: 'Different copy for COD vs prepaid confirmations.' },
      { title: 'Live Chat link', desc: 'Jump from any order to the customer thread.' },
    ],
    steps: [
      { title: 'Connect Shopify', desc: 'Order webhooks flow into TopEdge in real time.' },
      { title: 'Map templates', desc: 'Pick approved templates per order status.' },
      { title: 'Enable rules', desc: 'Turn on paid → confirm, shipped → tracking, etc.' },
    ],
    related: ['meta-manager', 'shopify', 'live-chat'],
  },
  analytics: {
    slug: 'analytics',
    title: 'Analytics',
    headline: 'Track revenue impact, not just message counts',
    description: 'Platform funnels, commerce metrics, and agent performance in Insights Hub.',
    problem: 'WhatsApp tools show sends and reads — not recovered revenue or bot vs human resolution.',
    solution: 'Insights Hub aggregates orders, campaigns, and inbox data into actionable commerce metrics.',
    capabilities: [
      { title: 'Platform Analytics', desc: 'Funnels, commerce KPIs, and exports.' },
      { title: 'Agent Performance', desc: 'Team metrics for Live Chat resolution.' },
      { title: 'Campaign ROI', desc: 'Delivery, read, reply tied to segments.' },
      { title: 'Bot vs human', desc: 'See where automation hands off to agents.' },
      { title: 'Cart recovery', desc: 'Measure ₹ recovered from abandoned cart flows.' },
      { title: 'Export reports', desc: 'Share PDF summaries with stakeholders.' },
    ],
    steps: [
      { title: 'Connect store', desc: 'Shopify revenue syncs to dashboards.' },
      { title: 'Run flows & campaigns', desc: 'Events populate analytics automatically.' },
      { title: 'Optimize', desc: 'Double down on flows and segments that convert.' },
    ],
    related: ['campaigns', 'shopify', 'live-chat'],
  },
  rules: {
    slug: 'rules',
    title: 'Rules',
    headline: 'Route VIPs to your best agent automatically',
    description: 'Routing Engine and Smart Message Rules — priority, round-robin, and keyword triggers.',
    problem: 'Every chat lands on whoever is free. VIP buyers wait behind generic inquiries.',
    solution: 'Automation Hub rules route by tag, keyword, or condition — with drag-reorder priority.',
    capabilities: [
      { title: 'Routing Engine', desc: 'Round-robin, specific agent, or escalation paths.' },
      { title: 'Conditions', desc: 'VIP tag, keyword, or custom fields.' },
      { title: 'Priority order', desc: 'Drag to reorder which rule wins.' },
      { title: 'Smart message rules', desc: 'Keyword triggers outside full canvas flows.' },
      { title: 'Fallback', desc: 'Default team when no rule matches.' },
      { title: 'Socket alerts', desc: 'Agents notified on assignment instantly.' },
    ],
    steps: [
      { title: 'Define conditions', desc: 'e.g. tag VIP or message contains “refund”.' },
      { title: 'Set destination', desc: 'Agent, team, or round-robin pool.' },
      { title: 'Test in Live Chat', desc: 'New chats route per your priority stack.' },
    ],
    related: ['live-chat', 'flow-builder', 'ai-brain'],
  },
  'abandoned-cart': {
    slug: 'abandoned-cart',
    title: 'Abandoned Cart',
    headline: 'Recover Shopify checkouts on WhatsApp — before they go cold',
    description:
      'Three approved-template nudges with product image, ₹ price, and one-tap checkout — tuned for COD and prepaid Indian buyers.',
    problem:
      'Email and SMS recovery underperform in India. Buyers live on WhatsApp — but most stores never message abandoned carts there.',
    solution:
      'TopEdge watches Shopify drop-offs and sends a proven 15 min → 2 hr → 24 hr rhythm using only templates you approved.',
    capabilities: [
      { title: 'Shopify trigger', desc: 'Fires when checkout is abandoned — real product & cart value.' },
      { title: '3-message rhythm', desc: 'Default 15 min, 2 hr, 24 hr — fully editable per store.' },
      { title: 'COD-aware copy', desc: 'Different tone for COD vs prepaid checkouts.' },
      { title: 'Product cards', desc: 'Image, variant, and ₹ price in every nudge.' },
      { title: 'Audience sync', desc: 'Recovery leads land in Audience CRM for retargeting.' },
      { title: 'Meta-safe only', desc: 'Uses approved marketing templates — no policy risk.' },
    ],
    steps: [
      { title: 'Connect Shopify', desc: 'Cart webhooks sync automatically.' },
      { title: 'Pick approved template', desc: 'Choose or create cart-recovery template in Meta Manager.' },
      { title: 'Publish flow', desc: 'AI Form or canvas — live in minutes.' },
    ],
    related: ['flow-builder', 'meta-manager', 'audience-crm'],
  },
  sequences: {
    slug: 'sequences',
    title: 'Sequences',
    headline: 'Multi-step follow-ups after every broadcast',
    description:
      'Chain approved WhatsApp messages — wait, branch on reply, and stop when they purchase — without rebuilding a full flow.',
    problem: 'One-off broadcasts miss buyers who almost converted. Manual follow-ups do not scale.',
    solution:
      'Sequences attach to campaigns: message 1 → wait → message 2 if no reply → tag or exit on order.',
    capabilities: [
      { title: 'Post-broadcast steps', desc: 'Follow up days after the first send.' },
      { title: 'Reply branches', desc: 'Different paths when they respond or stay silent.' },
      { title: 'Template-only', desc: 'Each step uses an approved Meta template.' },
      { title: 'Segment aware', desc: 'Built on Audience CRM segments from Shopify.' },
      { title: 'Pause on purchase', desc: 'Stops when Shopify marks an order paid.' },
      { title: 'Analytics', desc: 'See drop-off per step in Insights.' },
    ],
    steps: [
      { title: 'Create campaign', desc: 'Pick segment and first approved template.' },
      { title: 'Add sequence steps', desc: 'Delays, conditions, and follow-up templates.' },
      { title: 'Launch & measure', desc: 'Track reads, replies, and revenue per step.' },
    ],
    related: ['campaigns', 'audience-crm', 'analytics'],
  },
  orders: {
    slug: 'orders',
    title: 'Orders',
    headline: 'Every Shopify order — synced and actionable on WhatsApp',
    description:
      'Real-time order list with COD/prepaid status, line items, and one-click jump to the customer’s WhatsApp thread.',
    problem: 'Support hunts through Shopify admin while the customer waits on WhatsApp with no context.',
    solution:
      'Commerce Hub orders mirror Shopify — agents and automations share the same order truth.',
    capabilities: [
      { title: 'Live order sync', desc: 'Paid, fulfilled, cancelled — as Shopify updates.' },
      { title: 'COD & prepaid', desc: 'Status visible in inbox and automations.' },
      { title: 'Order → chat', desc: 'Open the WhatsApp thread from any order row.' },
      { title: 'Line items & totals', desc: 'SKU, qty, discounts, and ₹ totals in one view.' },
      { title: 'RTO signals', desc: 'Economics fields for Indian delivery reality.' },
      { title: 'Automation source', desc: 'Powers order messages and Flow Builder triggers.' },
    ],
    steps: [
      { title: 'Connect Shopify', desc: 'OAuth + order webhooks in Settings.' },
      { title: 'Browse Commerce Hub', desc: 'Filter, search, and export order lists.' },
      { title: 'Automate or reply', desc: 'Trigger templates or handle in Live Chat.' },
    ],
    related: ['shopify', 'order-automations', 'live-chat'],
  },
};

export const featureGrid: FeatureItem[] = [
  { slug: 'live-chat', title: 'Live Chat', tagline: 'Unified inbox for WhatsApp', icon: Inbox, hub: 'WhatsApp & AI' },
  { slug: 'ai-brain', title: 'AI Brain', tagline: 'Intent, persona, knowledge base', icon: Brain, hub: 'WhatsApp & AI' },
  { slug: 'flow-builder', title: 'AI Form → Flow Builder', tagline: 'Live flow in ~10 min, no code', icon: Workflow, hub: 'WhatsApp & AI' },
  { slug: 'meta-manager', title: 'Meta Manager', tagline: 'Templates → Meta approval', icon: Megaphone, hub: 'WhatsApp & AI' },
  { slug: 'campaigns', title: 'Campaigns', tagline: 'Broadcasts & sequences', icon: MessageSquare, hub: 'Growth' },
  { slug: 'audience-crm', title: 'Audience CRM', tagline: 'Leads, segments, loyalty', icon: Users, hub: 'Growth' },
  { slug: 'sequences', title: 'Sequences', tagline: 'Follow-up message flows', icon: GitBranch, hub: 'Growth' },
  { slug: 'abandoned-cart', title: 'Abandoned Cart', tagline: 'Recover carts on WhatsApp', icon: ShoppingCart, hub: 'Growth' },
  { slug: 'shopify', title: 'Shopify Engine', tagline: 'Commerce Hub workspace', icon: ShoppingBag, hub: 'Store' },
  { slug: 'orders', title: 'Orders', tagline: 'Order sync & management', icon: Package, hub: 'Store' },
  { slug: 'order-automations', title: 'Order automations', tagline: 'Transactional WhatsApp', icon: Package, hub: 'Store' },
  { slug: 'analytics', title: 'Analytics', tagline: 'Revenue-oriented insights', icon: BarChart3, hub: 'Store' },
];

export function getFeatureBySlug(slug: string) {
  return featureGrid.find((f) => f.slug === slug);
}
