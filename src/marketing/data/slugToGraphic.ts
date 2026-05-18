import type { FeatureGraphicId } from '../graphics';

/** Maps feature page slug → marketing image + React graphic */
export const SLUG_TO_IMAGE: Record<string, string> = {
  'live-chat': 'live-chat',
  'ai-brain': 'ai-brain',
  'flow-builder': 'flow-builder',
  'meta-manager': 'meta-manager-library',
  campaigns: 'campaigns-broadcast',
  'audience-crm': 'audience-crm',
  sequences: 'campaigns-broadcast',
  'abandoned-cart': 'abandoned-cart',
  shopify: 'store-engine',
  orders: 'store-engine',
  'order-automations': 'order-automations',
  analytics: 'analytics',
};

export const SLUG_TO_GRAPHIC: Record<string, FeatureGraphicId> = {
  'live-chat': 'live-chat',
  'ai-brain': 'ai-brain',
  'flow-builder': 'flow-builder',
  'meta-manager': 'meta-manager',
  campaigns: 'campaigns',
  'audience-crm': 'audience-crm',
  sequences: 'sequences',
  'abandoned-cart': 'abandoned-cart',
  shopify: 'shopify',
  orders: 'orders',
  'order-automations': 'order-automations',
  analytics: 'analytics',
};

export function getImageIdForSlug(slug: string) {
  return SLUG_TO_IMAGE[slug] ?? 'hero-dashboard';
}

export function getGraphicIdForSlug(slug: string): FeatureGraphicId {
  return SLUG_TO_GRAPHIC[slug] ?? 'hero';
}
