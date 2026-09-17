/**
 * Homepage feature videos + CRM / identity stills.
 * Swap placeholder demos when real recordings land.
 */

export type DemoVideo = {
  src: string;
  poster: string;
};

const CART: DemoVideo = {
  src: '/marketing/demos/cart-recovery.mp4',
  poster: '/marketing/demos/cart-recovery-poster.jpg',
};

const COD: DemoVideo = {
  src: '/marketing/demos/cod-prepaid.mp4',
  poster: '/marketing/demos/cod-prepaid-poster.jpg',
};

const FLOW: DemoVideo = {
  src: '/marketing/demos/flow-builder.mp4',
  poster: '/marketing/demos/flow-builder-poster.jpg',
};

/** Feature moments — all video. Placeholders noted where final assets are pending. */
export const FEATURE_VIDEOS = {
  cart: CART,
  cod: COD,
  /** Placeholder until Shopify-tools recording ships */
  shopifyTools: FLOW,
  /** Placeholder until campaigns recording ships */
  campaigns: CART,
  /** Placeholder until pixel recording ships */
  pixel: FLOW,
  /** Placeholder until opt-in recording ships */
  optin: FLOW,
} as const;

/** Feature moments that use a still instead of video. */
export const FEATURE_IMAGES = {
  unifiedIdentity: {
    src: '/marketing/features/unified-identity-lead.png',
  },
} as const;

export const CRM_BENTO = {
  profiles: {
    id: 'profiles',
    titleLead: 'Customer',
    titleAccent: 'profiles',
    body: 'Live carts, values, and recovery status — the same table your team works from every day.',
    image: '/marketing/crm/crm-profiles-zoom.png',
    href: '/features/audience-crm',
  },
  segments: {
    id: 'segments',
    titleLead: 'Smart',
    titleAccent: 'segments',
    body: 'Audience journeys with attributed revenue — enroll, broadcast, and measure in one list.',
    image: '/marketing/crm/crm-segments-zoom.png',
    href: '/features/campaigns',
  },
  warranty: {
    id: 'warranty',
    titleLead: 'Orders &',
    titleAccent: 'care',
    body: 'Orders, fulfillments, warranty, and supplier follow-ups without leaving WhatsApp.',
    image: '/marketing/crm/crm-care-zoom.png',
    href: '/features/audience-crm',
    cta: 'See care tools',
  },
} as const;
