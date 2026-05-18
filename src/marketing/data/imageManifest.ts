/**
 * IMAGE PLACEMENT GUIDE — TopEdge marketing site
 *
 * All feature visuals are AI-generated Instantly-style PNGs in /public/marketing/
 * status: ready = use PNG | generate = still needs generation
 */

export type ImageSlot = {
  id: string;
  path: string;
  alt: string;
  status: 'ready' | 'component' | 'generate';
  generateBrief?: string;
  usedOn: string[];
};

export const IMAGE_MANIFEST: ImageSlot[] = [
  {
    id: 'brand-logo',
    path: '/marketing/brand-logo.png',
    alt: 'TopEdge AI logo',
    status: 'ready',
    usedOn: ['Navbar', 'Footer', 'Floating voice widget'],
  },
  {
    id: 'hero-dashboard',
    path: '/marketing/hero-dashboard.png',
    alt: 'TopEdge WhatsApp growth OS — store pulse and AI cards on violet gradient',
    status: 'ready',
    usedOn: ['Home hero', 'Feature fallback'],
  },
  {
    id: 'meta-manager-library',
    path: '/marketing/meta-manager-library.png',
    alt: 'Meta Manager — pick template, AI copy, Send to Meta',
    status: 'ready',
    usedOn: ['Home Meta section', '/features/meta-manager'],
  },
  {
    id: 'flow-builder',
    path: '/marketing/flow-builder.png',
    alt: 'Flow Builder — AI form to WhatsApp automation workflow',
    status: 'ready',
    usedOn: ['Home Flow Builder', '/features/flow-builder'],
  },
  {
    id: 'abandoned-cart',
    path: '/marketing/abandoned-cart.png',
    alt: 'Abandoned cart recovery — Shopify product and 3 WhatsApp nudges',
    status: 'ready',
    usedOn: ['Home abandoned cart', '/features/flow-builder'],
  },
  {
    id: 'live-chat',
    path: '/marketing/live-chat.png',
    alt: 'Live Chat — WhatsApp thread with order context card',
    status: 'ready',
    usedOn: ['Home Live Chat', '/features/live-chat'],
  },
  {
    id: 'ai-brain',
    path: '/marketing/ai-brain.png',
    alt: 'AI Brain — train knowledge base and concierge persona',
    status: 'ready',
    usedOn: ['Home AI Brain', '/features/ai-brain'],
  },
  {
    id: 'campaigns-broadcast',
    path: '/marketing/campaigns-broadcast.png',
    alt: 'Campaigns — segment, approved template, schedule broadcast',
    status: 'ready',
    usedOn: ['Home Campaigns', '/features/campaigns'],
  },
  {
    id: 'store-engine',
    path: '/marketing/store-engine.png',
    alt: 'Store Engine — revenue, orders, recovery stats from Shopify',
    status: 'ready',
    usedOn: ['Home Store Engine', '/features/shopify'],
  },
  {
    id: 'order-automations',
    path: '/marketing/order-automations.png',
    alt: 'Order automations — paid, shipped, delivered on WhatsApp',
    status: 'ready',
    usedOn: ['Home order automations', '/features/order-automations'],
  },
  {
    id: 'audience-crm',
    path: '/marketing/audience-crm.png',
    alt: 'Audience hub — segments and loyalty',
    status: 'ready',
    usedOn: ['/features/audience-crm'],
  },
  {
    id: 'analytics',
    path: '/marketing/analytics.png',
    alt: 'Insights — revenue and WhatsApp read rate',
    status: 'ready',
    usedOn: ['/features/analytics'],
  },
  {
    id: 'integrations-settings',
    path: '/marketing/integrations-settings.png',
    alt: 'Integrations — Shopify, WhatsApp, Meta trigger picker',
    status: 'ready',
    usedOn: ['/integrations'],
  },
  {
    id: 'flow-builder-canvas',
    path: '/marketing/flow-builder-canvas.png',
    alt: 'Legacy flow canvas (optional)',
    status: 'ready',
    usedOn: ['FlowBuilderShowcase optional'],
  },
  {
    id: 'onboarding-wizard',
    path: '/marketing/onboarding-wizard.png',
    alt: 'Onboarding — connect Shopify and WhatsApp',
    status: 'generate',
    generateBrief: 'Instantly-style: connect-store graphic with Shopify + WhatsApp glass nodes.',
    usedOn: ['Home How it works', '/features/onboarding'],
  },
];

export function getImage(id: string) {
  return IMAGE_MANIFEST.find((i) => i.id === id);
}

export function imageSrc(id: string, fallback = '/marketing/hero-dashboard.png') {
  const slot = getImage(id);
  if (!slot || slot.status !== 'ready') return fallback;
  return slot.path;
}
