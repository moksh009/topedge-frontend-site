/** Marketing imagery — AI-generated Instantly-style PNGs in /public/marketing/ */
export const BRAND_LOGO = '/marketing/brand-logo.png';

export const marketingImages = {
  heroDashboard: {
    src: '/marketing/hero-dashboard.png',
    alt: 'TopEdge WhatsApp growth OS',
  },
  metaManager: {
    src: '/marketing/meta-manager-library.png',
    alt: 'Meta Manager templates',
  },
  flowBuilder: {
    src: '/marketing/flow-builder.png',
    alt: 'Flow Builder automation',
  },
  liveChat: {
    src: '/marketing/live-chat.png',
    alt: 'Live Chat with order context',
  },
  flowBuilderCanvas: {
    src: '/marketing/flow-builder-canvas.png',
    alt: 'Flow Builder canvas',
  },
  campaignsBroadcast: {
    src: '/marketing/campaigns-broadcast.png',
    alt: 'Campaign broadcast',
  },
  abandonedCart: {
    src: '/marketing/abandoned-cart.png',
    alt: 'Abandoned cart recovery',
  },
  aiBrain: {
    src: '/marketing/ai-brain.png',
    alt: 'AI Brain knowledge base',
  },
  audienceCrm: {
    src: '/marketing/audience-crm.png',
    alt: 'Audience CRM segments',
  },
  orderAutomations: {
    src: '/marketing/order-automations.png',
    alt: 'Order automations',
  },
  storeEngine: {
    src: '/marketing/store-engine.png',
    alt: 'Store Engine stats',
  },
  integrationsSettings: {
    src: '/marketing/integrations-settings.png',
    alt: 'Integrations hub',
  },
  analytics: {
    src: '/marketing/analytics.png',
    alt: 'Analytics insights',
  },
} as const;

export { IMAGE_MANIFEST, getImage, imageSrc } from './data/imageManifest';

export type MarketingImageKey = keyof typeof marketingImages;
