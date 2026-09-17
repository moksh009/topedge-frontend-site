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
  campaigns: {
    src: '/campaignn.png?v=20260917a',
  },
  unifiedIdentity: {
    src: '/leaadd.png?v=20260917c',
  },
  segmentation: {
    src: '/marketing/features/segmentation-lead.png?v=20260917a',
  },
  intentDetection: {
    src: '/marketing/features/intent-detection-lead.png?v=20260917a',
  },
} as const;

export const CRM_BENTO = {
  orders: {
    id: 'orders',
    titleLead: 'Orders &',
    titleAccent: 'care',
    body: 'Shipments, warranty, and supplier follow-ups — without leaving WhatsApp.',
    image: '/1.png?v=1',
  },
  profiles: {
    id: 'profiles',
    titleLead: 'Customer',
    titleAccent: 'profiles',
    body: 'Live carts, values, and recovery status in one working table.',
    image: '/2.png?v=1',
  },
  stock: {
    id: 'stock',
    titleLead: 'Live',
    titleAccent: 'stock',
    body: 'SKU availability and low-stock signals synced from Shopify.',
    image: '/3.png?v=1',
  },
} as const;
