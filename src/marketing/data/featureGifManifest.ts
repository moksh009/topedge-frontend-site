/** Optional file-based GIF/WebP loops in /public/marketing/gifs/ — falls back to React animated demos */
export type FeatureGifSlot = {
  slug: string;
  /** Preferred: animated WebP (smaller). GIF supported as fallback path. */
  webp?: string;
  gif?: string;
  poster: string;
  alt: string;
};

export const FEATURE_GIF_MANIFEST: FeatureGifSlot[] = [
  { slug: 'live-chat', gif: '/marketing/gifs/live-chat.gif', poster: '/marketing/live-chat.png', alt: 'Live Chat inbox animation' },
  { slug: 'ai-brain', poster: '/marketing/ai-brain.png', alt: 'AI Brain training animation' },
  { slug: 'flow-builder', poster: '/marketing/flow-builder.png', alt: 'Flow Builder publish animation' },
  { slug: 'meta-manager', poster: '/marketing/meta-manager-library.png', alt: 'Meta Manager template approval' },
  { slug: 'campaigns', poster: '/marketing/campaigns-broadcast.png', alt: 'Campaign broadcast animation' },
  { slug: 'audience-crm', poster: '/marketing/audience-crm.png', alt: 'Audience CRM segments' },
  { slug: 'sequences', poster: '/marketing/campaigns-broadcast.png', alt: 'Sequences follow-up chain' },
  { slug: 'abandoned-cart', gif: '/marketing/gifs/abandoned-cart.gif', poster: '/marketing/abandoned-cart.png', alt: 'Abandoned cart WhatsApp nudges' },
  { slug: 'shopify', poster: '/marketing/store-engine.png', alt: 'Shopify Engine sync' },
  { slug: 'orders', poster: '/marketing/store-engine.png', alt: 'Orders hub sync' },
  { slug: 'order-automations', poster: '/marketing/order-automations.png', alt: 'Order automation messages' },
  { slug: 'analytics', poster: '/marketing/analytics.png', alt: 'Analytics revenue dashboard' },
];

export function getFeatureGif(slug: string) {
  return FEATURE_GIF_MANIFEST.find((g) => g.slug === slug);
}
