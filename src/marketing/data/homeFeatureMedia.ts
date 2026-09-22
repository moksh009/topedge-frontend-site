/**
 * Homepage feature videos + CRM / identity stills.
 */

export type DemoVideo = {
  src: string;
  poster: string;
  /** Smaller encode for phones; when set, mobile autoplays in-view (no Play tap). */
  mobileSrc?: string;
};

const CART: DemoVideo = {
  src: '/marketing/demos/cart-recovery.mp4',
  poster: '/marketing/demos/cart-recovery-poster.jpg',
  mobileSrc: '/marketing/demos/cart-recovery-mobile.mp4',
};

const COD: DemoVideo = {
  src: '/marketing/demos/cod-prepaid11.mp4?v=20260918a',
  poster: '/marketing/demos/cod-prepaid-poster.jpg?v=20260918a',
  mobileSrc: '/marketing/demos/cod-prepaid-mobile.mp4',
};

const FLOW: DemoVideo = {
  src: '/marketing/demos/flowwww1.mp4?v=20260918a',
  poster: '/marketing/demos/flow-builder-poster.jpg?v=20260918a',
  mobileSrc: '/marketing/demos/flow-builder-mobile.mp4',
};

const INTENT: DemoVideo = {
  src: '/marketing/demos/intentt.mp4?v=20260918a',
  poster: '/marketing/demos/intent-poster.jpg?v=20260918a',
  mobileSrc: '/marketing/demos/intent-mobile.mp4',
};

const OPTIN: DemoVideo = {
  src: '/marketing/demos/opt-in.mp4?v=20260918a',
  poster: '/marketing/demos/optin-popup-poster.jpg?v=20260918a',
  mobileSrc: '/marketing/demos/opt-in-mobile.mp4',
};

const SEGMENT: DemoVideo = {
  src: '/marketing/demos/segment.mp4',
  poster: '/marketing/demos/segment-poster.jpg',
  mobileSrc: '/marketing/demos/segment-mobile.mp4',
};

/** Feature moments, video demos. */
export const FEATURE_VIDEOS = {
  cart: CART,
  cod: COD,
  shopifyTools: FLOW,
  campaigns: CART,
  optin: OPTIN,
  intent: INTENT,
  segmentation: SEGMENT,
} as const;

/** Feature moments that use a still instead of video. */
export const FEATURE_IMAGES = {
  campaigns: {
    src: '/campaignn.webp?v=20260921lcp',
  },
  unifiedIdentity: {
    src: '/leaadd.webp?v=20260921lcp',
  },
  pixel: {
    src: '/website-pixel.webp?v=20260921lcp',
  },
} as const;

export const CRM_BENTO = {
  orders: {
    id: 'orders',
    titleLead: 'Orders &',
    titleAccent: 'care',
    body: 'Shipments, warranty, and supplier follow-ups, without leaving WhatsApp.',
    image: '/1.webp?v=20260921lcp',
  },
  profiles: {
    id: 'profiles',
    titleLead: 'Customer',
    titleAccent: 'profiles',
    body: 'Live carts, values, and recovery status in one working table.',
    image: '/2.webp?v=20260921lcp',
  },
  stock: {
    id: 'stock',
    titleLead: 'Live',
    titleAccent: 'stock',
    body: 'SKU availability and low-stock signals synced from Shopify.',
    image: '/3.webp?v=20260921lcp',
  },
} as const;
