import type { FeatureGraphicId } from '../graphics';

/** Maps manifest image ids to React product graphics when PNGs are absent or fail to load. */
export const IMAGE_TO_GRAPHIC: Record<string, FeatureGraphicId> = {
  'hero-dashboard': 'hero',
  'meta-manager-library': 'meta-manager',
  'flow-builder': 'flow-builder',
  'flow-builder-canvas': 'flow-builder',
  'abandoned-cart': 'abandoned-cart',
  'live-chat': 'live-chat',
  'ai-brain': 'ai-brain',
  'campaigns-broadcast': 'campaigns',
  'store-engine': 'shopify',
  'order-automations': 'order-automations',
  'analytics': 'analytics',
  'integrations-settings': 'integrations',
  'audience-crm': 'audience-crm',
  'onboarding-wizard': 'integrations',
  sequences: 'sequences',
  orders: 'orders',
};

export function graphicIdForImage(imageId: string): FeatureGraphicId | undefined {
  return IMAGE_TO_GRAPHIC[imageId];
}
