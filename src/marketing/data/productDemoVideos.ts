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
  | 'segmentation';

export type ProductDemoAsset = {
  src: string;
  poster: string;
  mobileSrc?: string;
  /**
   * VideoObject fields. GSC reported 7 pages carrying video and 0 indexed as
   * video, because nothing on the page told Google a video was there.
   *
   * `name` and `description` describe what the clip actually shows — Google
   * treats markup that oversells the content as a structured-data violation.
   * `uploadDate` is the encode date of the file in public/marketing/demos,
   * not the page's date; update it when the clip is re-recorded.
   */
  name: string;
  description: string;
  uploadDate: string;
};

const CART: ProductDemoAsset = {
  src: '/marketing/demos/cart-recovery.mp4',
  poster: '/marketing/demos/cart-recovery-poster.jpg',
  mobileSrc: '/marketing/demos/cart-recovery-mobile.mp4',
  name: 'WhatsApp abandoned cart recovery in TopEdge',
  description:
    'Screen recording of an abandoned Shopify cart triggering a WhatsApp recovery message in TopEdge, through to the recovered order.',
  uploadDate: '2026-09-16',
};

const COD: ProductDemoAsset = {
  src: '/marketing/demos/cod-prepaid11.mp4?v=20260918a',
  poster: '/marketing/demos/cod-prepaid-poster.jpg?v=20260918a',
  mobileSrc: '/marketing/demos/cod-prepaid-mobile.mp4',
  name: 'COD confirmation and COD-to-prepaid on WhatsApp',
  description:
    'Screen recording of a cash-on-delivery Shopify order being confirmed over WhatsApp and converted to a prepaid payment in TopEdge.',
  uploadDate: '2026-09-18',
};

const FLOW: ProductDemoAsset = {
  src: '/marketing/demos/flowwww1.mp4?v=20260918a',
  poster: '/marketing/demos/flow-builder-poster.jpg?v=20260918a',
  mobileSrc: '/marketing/demos/flow-builder-mobile.mp4',
  name: 'Building a WhatsApp flow in the TopEdge Flow Builder',
  description:
    'Screen recording of a WhatsApp automation being assembled step by step in the TopEdge Flow Builder for a Shopify store.',
  uploadDate: '2026-09-18',
};

const OPTIN: ProductDemoAsset = {
  src: '/marketing/demos/opt-in.mp4?v=20260918a',
  poster: '/marketing/demos/optin-popup-poster.jpg?v=20260918a',
  mobileSrc: '/marketing/demos/opt-in-mobile.mp4',
  name: 'WhatsApp opt-in popup on a Shopify storefront',
  description:
    'Screen recording of a TopEdge website opt-in popup collecting WhatsApp consent on a Shopify storefront and adding the subscriber.',
  uploadDate: '2026-09-18',
};

const INTENT: ProductDemoAsset = {
  src: '/marketing/demos/intentt.mp4?v=20260918a',
  poster: '/marketing/demos/intent-poster.jpg?v=20260918a',
  mobileSrc: '/marketing/demos/intent-mobile.mp4',
  name: 'Real-time intent detection on a WhatsApp conversation',
  description:
    'Screen recording of TopEdge reading buying intent from an incoming WhatsApp message and routing the conversation accordingly.',
  uploadDate: '2026-09-18',
};

const SEGMENT: ProductDemoAsset = {
  src: '/marketing/demos/segment.mp4',
  poster: '/marketing/demos/segment-poster.jpg',
  mobileSrc: '/marketing/demos/segment-mobile.mp4',
  name: 'Building a customer segment for a WhatsApp campaign',
  description:
    'Screen recording of a Shopify customer segment being built in TopEdge and used as the audience for a WhatsApp campaign.',
  uploadDate: '2026-09-17',
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
};

export function demoAssetFor(id: string): ProductDemoAsset {
  const key = (DEMO_ALIASES[id] ?? id) as ProductDemoId;
  return PRODUCT_DEMO_ASSETS[key] ?? CART;
}

export function demoVideoFor(id: string): string {
  return demoAssetFor(id).src;
}

/** Path without the cache-busting query, so `?v=...` stamps never break lookup. */
const basePath = (src: string) => src.split('?')[0];

const DEMO_BY_SRC: Record<string, ProductDemoAsset> = Object.fromEntries(
  Object.values(PRODUCT_DEMO_ASSETS).map((a) => [basePath(a.src), a]),
);

/**
 * Resolve a demo by its video `src`.
 *
 * productPages.ts declares its hero videos with its own local constants
 * (COD_VIDEO, FLOW_VIDEO, …) rather than reusing this catalog, so a product
 * page knows the file it plays but not the VideoObject copy for it. Matching
 * on src keeps one set of video names and dates here instead of a second copy
 * over there. Returns undefined for a file this catalog does not describe —
 * callers skip the markup rather than invent it.
 */
export function demoAssetBySrc(src: string): ProductDemoAsset | undefined {
  return DEMO_BY_SRC[basePath(src)];
}
