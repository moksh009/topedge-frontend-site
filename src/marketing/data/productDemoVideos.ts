/**
 * Product demo videos, quality-first H.264 (not GIF, not CRF 30@1280).
 *
 * Encode: ./scripts/compress-demo-video.sh input.mp4 name
 *   → 1920 wide, lanczos, CRF 18 @ 30fps, muted, faststart + sharp JPG poster
 * Lazy-load still applies; map new files below.
 */

export type ProductDemoId =
  | 'cart-recovery'
  | 'journey'
  | 'inbox'
  | 'ai-brain'
  | 'flow-builder'
  | 'connect'
  | 'shopify'
  | 'campaigns'
  | 'instagram'
  | 'analytics'
  | 'meta-manager'
  | 'audience-crm'
  | 'chat-rules'
  | 'hero'
  | 'fashion'
  | 'beauty'
  | 'food'
  | 'cod'
  | 'optin'
  | 'intent'
  | 'segmentation'
  | 'agencies';

export type ProductDemoAsset = {
  src: string;
  poster: string;
};

const CART: ProductDemoAsset = {
  src: '/marketing/demos/cart-recovery.mp4',
  poster: '/marketing/demos/cart-recovery-poster.jpg',
};

const COD: ProductDemoAsset = {
  src: '/marketing/demos/cod-prepaid11.mp4?v=20260918a',
  poster: '/marketing/demos/cod-prepaid-poster.jpg?v=20260918a',
};

const FLOW: ProductDemoAsset = {
  src: '/marketing/demos/flowwww1.mp4?v=20260918a',
  poster: '/marketing/demos/flow-builder-poster.jpg?v=20260918a',
};

const OPTIN: ProductDemoAsset = {
  src: '/marketing/demos/opt-in.mp4?v=20260918a',
  poster: '/marketing/demos/optin-popup-poster.jpg?v=20260918a',
};

const INTENT: ProductDemoAsset = {
  src: '/marketing/demos/intentt.mp4?v=20260918a',
  poster: '/marketing/demos/intent-poster.jpg?v=20260918a',
};

const SEGMENT: ProductDemoAsset = {
  src: '/marketing/demos/segment.mp4',
  poster: '/marketing/demos/segment-poster.jpg',
};

/** Route / SEO slug aliases → catalog ids */
const DEMO_ALIASES: Record<string, ProductDemoId> = {
  journeys: 'journey',
  journey: 'journey',
  cod: 'cod',
  'cod-prepaid': 'cod',
  'cod-to-prepaid': 'cod',
  'cod-confirmation-whatsapp': 'cod',
  flow: 'flow-builder',
  flows: 'flow-builder',
  'flow-builder': 'flow-builder',
  flowwww: 'flow-builder',
  optin: 'optin',
  'opt-in': 'optin',
  'optin-popup': 'optin',
  intent: 'intent',
  'intent-detection': 'intent',
  segment: 'segmentation',
  segmentation: 'segmentation',
  'audience-segmentation': 'segmentation',
  segments: 'segmentation',
  byok: 'ai-brain',
  'byok-ai': 'ai-brain',
  warranty: 'audience-crm',
  'profit-loss': 'analytics',
  pnl: 'analytics',
};

/**
 * Map each feature / scene id to the matching demo video.
 * Hero + cart recovery share the cart demo.
 */
export const PRODUCT_DEMO_ASSETS: Record<ProductDemoId, ProductDemoAsset> = {
  hero: CART,
  'cart-recovery': CART,
  journey: COD,
  cod: COD,
  'flow-builder': FLOW,
  optin: OPTIN,
  intent: INTENT,
  segmentation: SEGMENT,
  inbox: CART,
  'ai-brain': CART,
  connect: CART,
  shopify: CART,
  campaigns: CART,
  instagram: CART,
  analytics: CART,
  'meta-manager': CART,
  'audience-crm': CART,
  'chat-rules': CART,
  fashion: CART,
  beauty: CART,
  food: CART,
  agencies: CART,
};

export function demoAssetFor(id: string): ProductDemoAsset {
  const key = (DEMO_ALIASES[id] ?? id) as ProductDemoId;
  return PRODUCT_DEMO_ASSETS[key] ?? CART;
}

export function demoVideoFor(id: string): string {
  return demoAssetFor(id).src;
}
