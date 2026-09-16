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

export const CRM_BENTO = {
  identity: {
    id: 'identity',
    titleLead: 'Unified Customer',
    titleAccent: 'Identity',
    body: 'Pixel, carts, and WhatsApp collapse into one shopper view — live in the TopEdge workspace.',
    image: '/marketing/crm/clay-identity.png',
    href: '/features/audience-crm',
    cta: 'Open Audience CRM',
  },
  profiles: {
    id: 'profiles',
    titleLead: 'Customer',
    titleAccent: 'profiles',
    body: 'Live carts, values, and recovery status — the same table your team works from every day.',
    image: '/marketing/crm/clay-profiles.png',
    href: '/features/audience-crm',
  },
  segments: {
    id: 'segments',
    titleLead: 'Smart',
    titleAccent: 'segments',
    body: 'Audience journeys with attributed revenue — enroll, broadcast, and measure in one list.',
    image: '/marketing/crm/clay-segments.png',
    href: '/features/campaigns',
  },
  warranty: {
    id: 'warranty',
    titleLead: 'Orders &',
    titleAccent: 'care',
    body: 'Orders, fulfillments, warranty, and supplier follow-ups without leaving WhatsApp.',
    image: '/marketing/crm/clay-care.png',
    href: '/features/audience-crm',
    cta: 'See care tools',
  },
} as const;
