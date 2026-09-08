/**
 * Per-section demo videos. Swap filenames later — same player everywhere.
 * Currently all point at `/mmjnm.mp4` (COD → prepaid demo) until dedicated clips are ready.
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

export const PRODUCT_DEMO_VIDEOS: Record<ProductDemoId, string> = {
  'cart-recovery': DEMO,
  journey: DEMO,
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
  cod: DEMO,
  agencies: DEMO,
};

export function demoVideoFor(id: string): string {
  return PRODUCT_DEMO_VIDEOS[id as ProductDemoId] ?? DEMO;
}
