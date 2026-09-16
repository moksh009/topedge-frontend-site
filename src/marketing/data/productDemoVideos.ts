/**
 * Per-section demo videos. Swap filenames later — same player everywhere.
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

/** @deprecated use ProductDemoId — kept as alias for home story ids */
export type StickyMomentId = Extract<
  ProductDemoId,
  'cart-recovery' | 'journey' | 'inbox' | 'ai-brain' | 'flow-builder' | 'connect'
>;

const DEMO = '/mmjnm.mp4';
const COD_TO_PREPAID = '/cod-to-prepaid-edited.mp4';
const ABANDON_CART = '/abandoncart.mp4';

export const PRODUCT_DEMO_VIDEOS: Record<ProductDemoId, string> = {
  'cart-recovery': ABANDON_CART,
  journey: COD_TO_PREPAID,
  inbox: DEMO,
  'ai-brain': DEMO,
  'flow-builder': DEMO,
  connect: DEMO,
  shopify: DEMO,
  campaigns: DEMO,
  instagram: DEMO,
  analytics: DEMO,
  'meta-manager': DEMO,
  'audience-crm': DEMO,
  'chat-rules': DEMO,
  hero: DEMO,
  fashion: DEMO,
  beauty: DEMO,
  food: DEMO,
  cod: COD_TO_PREPAID,
  agencies: DEMO,
};

export function demoVideoFor(id: string): string {
  return PRODUCT_DEMO_VIDEOS[id as ProductDemoId] ?? DEMO;
}
