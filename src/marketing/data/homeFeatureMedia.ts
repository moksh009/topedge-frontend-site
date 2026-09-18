/**
 * Homepage feature videos + CRM / identity stills.
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
  src: '/marketing/demos/cod-prepaid11.mp4?v=20260918a',
  poster: '/marketing/demos/cod-prepaid-poster.jpg?v=20260918a',
};

const FLOW: DemoVideo = {
  src: '/marketing/demos/flowwww1.mp4?v=20260918a',
  poster: '/marketing/demos/flow-builder-poster.jpg?v=20260918a',
};

const INTENT: DemoVideo = {
  src: '/marketing/demos/intentt.mp4?v=20260918a',
  poster: '/marketing/demos/intent-poster.jpg?v=20260918a',
};

const OPTIN: DemoVideo = {
  src: '/marketing/demos/opt-in.mp4?v=20260918a',
  poster: '/marketing/demos/optin-popup-poster.jpg?v=20260918a',
};

const SEGMENT: DemoVideo = {
  src: '/marketing/demos/segment.mp4',
  poster: '/marketing/demos/segment-poster.jpg',
};

/** Feature moments — video demos. */
export const FEATURE_VIDEOS = {
  cart: CART,
  cod: COD,
  shopifyTools: FLOW,
  campaigns: CART,
  /** Placeholder until pixel recording ships */
  pixel: CART,
  optin: OPTIN,
  intent: INTENT,
  segmentation: SEGMENT,
} as const;

/** Feature moments that use a still instead of video. */
export const FEATURE_IMAGES = {
  campaigns: {
    src: '/campaignn.png?v=20260917a',
  },
  unifiedIdentity: {
    src: '/leaadd.png?v=20260917c',
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
