/**
 * Product demo videos — quality-first H.264 (not GIF, not CRF 30@1280).
 *
 * Encode: ./scripts/compress-demo-video.sh input.mp4 name
 *   → 1920 wide, lanczos, CRF 19, muted, faststart + sharp JPG poster
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
  src: '/marketing/demos/cod-prepaid.mp4',
  poster: '/marketing/demos/cod-prepaid-poster.jpg',
};

/**
 * Hero + cart recovery share the cart demo for now.
 * Swap entries later when you add per-feature files.
 */
export const PRODUCT_DEMO_ASSETS: Record<ProductDemoId, ProductDemoAsset> = {
  hero: CART,
  'cart-recovery': CART,
  journey: COD,
  cod: COD,
  inbox: CART,
  'ai-brain': CART,
  'flow-builder': CART,
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
  return PRODUCT_DEMO_ASSETS[id as ProductDemoId] ?? CART;
}

export function demoVideoFor(id: string): string {
  return demoAssetFor(id).src;
}
