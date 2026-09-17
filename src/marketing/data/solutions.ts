export type SolutionBento = {
  title: string;
  body: string;
  image: string;
  wide?: boolean;
  accent?: string;
};

export type SolutionHelp = {
  feature: string;
  title: string;
  body: string;
  href: string;
};

export type SolutionVertical = {
  slug: 'fashion' | 'beauty' | 'cod';
  name: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  /** Demo video id for ProductDemoVideo */
  demoId: string;
  demoLabel: string;
  showVideoFirst: boolean;
  outcomes: { metric: string; label: string; detail: string }[];
  bentos: SolutionBento[];
  helps: SolutionHelp[];
  related: { label: string; href: string }[];
  ctaTitle: string;
  ctaSub: string;
};

export const SOLUTION_VERTICALS: Record<string, SolutionVertical> = {
  fashion: {
    slug: 'fashion',
    name: 'Fashion & apparel',
    eyebrow: 'Solutions',
    title: 'WhatsApp growth for',
    titleAccent: 'fashion & apparel',
    subtitle:
      'Recover size-sensitive carts, confirm COD before ship, and answer “where is my order?” with Shopify context — without living in WhatsApp Web.',
    seoTitle: 'WhatsApp Automation for Fashion Shopify Stores | Cart, Size & COD',
    seoDescription:
      'TopEdge helps fashion & apparel brands on Shopify India recover abandoned carts with size/variant context, confirm COD to cut RTO, and run Meta-safe drop campaigns on WhatsApp.',
    keywords:
      'fashion WhatsApp automation Shopify, apparel cart recovery India, size exchange WhatsApp, COD confirmation fashion D2C, Shopify WhatsApp for clothing brands',
    demoId: 'cart-recovery',
    demoLabel: 'Fashion cart recovery on WhatsApp',
    showVideoFirst: false,
    outcomes: [
      { metric: '3-msg', label: 'Cart recovery', detail: 'Size-aware nudges after abandon' },
      { metric: 'COD', label: 'Confirm before ship', detail: 'Cut RTO on apparel COD' },
      { metric: '1 inbox', label: 'Order-aware support', detail: 'WISMO beside Shopify order #' },
    ],
    bentos: [
      {
        title: 'Size-aware cart recovery',
        body: 'When shoppers leave mid-size or variant, TopEdge sends approved WhatsApp recovery with the same SKU context — not a generic “you left something” blast.',
        image: '/marketing/solutions/sol-fashion-cart-saas.png',
        wide: true,
        accent: 'Identity',
      },
      {
        title: 'Support with order context',
        body: 'Exchanges, delayed couriers, and COD questions land in Live Chat next to the Shopify order — so agents do not tab-hunt.',
        image: '/marketing/solutions/sol-fashion-inbox-saas.png',
        accent: 'profiles',
      },
      {
        title: 'Drop weekends, Meta-safe',
        body: 'Segment past buyers and lookers, then broadcast only with approved templates — so festival drops do not risk your number.',
        image: '/marketing/solutions/sol-fashion-campaign-saas.png',
        accent: 'Campaigns',
      },
    ],
    helps: [
      {
        feature: 'Abandoned Cart',
        title: 'Recover outfits before the next scroll',
        body: 'Trigger a 3-message sequence from real Shopify abandon events. Keep size, colour, and price honest to the cart.',
        href: '/whatsapp-cart-recovery',
      },
      {
        feature: 'COD → Prepaid',
        title: 'Confirm apparel COD before dispatch',
        body: 'Ask shoppers to confirm or flip to prepaid on WhatsApp — fewer fake COD orders on high-AOV fashion.',
        href: '/features/journeys',
      },
      {
        feature: 'Audience Campaigns',
        title: 'Drop launches without template chaos',
        body: 'Build segments from purchase history, then send Meta-approved creatives for new collections and restocks.',
        href: '/features/campaigns',
      },
      {
        feature: 'Audience CRM',
        title: 'Know who buys repeats vs one-offs',
        body: 'Profiles stitch WhatsApp identity to Shopify orders so VIP drops and care journeys stay personal.',
        href: '/features/audience-crm',
      },
    ],
    related: [
      { label: 'Beauty & skincare', href: '/solutions/beauty' },
      { label: 'COD-first brands', href: '/solutions/cod' },
      { label: 'Cart recovery', href: '/whatsapp-cart-recovery' },
      { label: 'Pricing', href: '/pricing' },
    ],
    ctaTitle: 'Run fashion recovery on your catalog',
    ctaSub: 'Connect Shopify and WhatsApp — publish size-aware cart recovery in your trial.',
  },

  beauty: {
    slug: 'beauty',
    name: 'Beauty & skincare',
    eyebrow: 'Solutions',
    title: 'WhatsApp commerce for',
    titleAccent: 'beauty & skincare',
    subtitle:
      'Recover serum carts, answer ingredient questions with catalog truth, and capture WhatsApp numbers without theme hacks — built for Indian beauty D2C on Shopify.',
    seoTitle: 'WhatsApp Automation for Beauty & Skincare Shopify Brands | India',
    seoDescription:
      'TopEdge helps beauty and skincare Shopify brands recover abandoned carts, answer with live catalog SKUs, capture opt-ins, and confirm COD on WhatsApp — Meta-safe for India D2C.',
    keywords:
      'beauty WhatsApp automation Shopify, skincare cart recovery India, WhatsApp for beauty D2C, serum abandoned cart WhatsApp, beauty COD confirmation WhatsApp',
    demoId: 'cart-recovery',
    demoLabel: 'Beauty cart recovery on WhatsApp',
    showVideoFirst: false,
    outcomes: [
      { metric: 'SKU', label: 'Honest answers', detail: 'Live prices from Shopify' },
      { metric: '3-msg', label: 'Product recovery', detail: 'Cards that match the cart' },
      { metric: 'Opt-in', label: 'Clean capture', detail: 'Popup without theme edits' },
    ],
    bentos: [
      {
        title: 'Product-card cart recovery',
        body: 'Bring shoppers back to the exact serum or kit they left — with WhatsApp product cards tied to Shopify, not a vague reminder.',
        image: '/marketing/solutions/sol-beauty-cart-saas.png',
        wide: true,
        accent: 'Recovery',
      },
      {
        title: 'Catalog-grounded replies',
        body: 'When someone asks “is this for oily skin?” or price, answers stay anchored to live SKUs and ₹ — then hand off to a human cleanly.',
        image: '/marketing/solutions/sol-beauty-catalog-saas.png',
        accent: 'Catalog',
      },
      {
        title: 'Opt-in without theme fear',
        body: 'Capture WhatsApp numbers on PDP and exit intent with a popup that does not require risky theme surgery.',
        image: '/marketing/solutions/sol-beauty-optin-saas.png',
        accent: 'Opt-in',
      },
    ],
    helps: [
      {
        feature: 'Abandoned Cart',
        title: 'Recover high-intent beauty carts',
        body: 'Routine builders abandon often. TopEdge sequences re-open the conversation with approved templates and product context.',
        href: '/whatsapp-cart-recovery',
      },
      {
        feature: 'Opt-in Popup',
        title: 'Grow a reachable beauty list',
        body: 'Collect consent and numbers on storefront moments that matter — then enroll into journeys and drops safely.',
        href: '/features/flow-builder',
      },
      {
        feature: 'Audience Campaigns',
        title: 'Restock and routine campaigns',
        body: 'Segment by last purchase or browse, then send Meta-safe broadcasts for restocks, kits, and festive kits.',
        href: '/features/campaigns',
      },
      {
        feature: 'Tracking Pixel',
        title: 'Match site visits to WhatsApp',
        body: 'See who is on the PDP now and continue the conversation on WhatsApp with context — not cold spam.',
        href: '/features/analytics',
      },
    ],
    related: [
      { label: 'Fashion & apparel', href: '/solutions/fashion' },
      { label: 'COD-first brands', href: '/solutions/cod' },
      { label: 'Cart recovery', href: '/whatsapp-cart-recovery' },
      { label: 'Pricing', href: '/pricing' },
    ],
    ctaTitle: 'See beauty recovery on your SKUs',
    ctaSub: 'Start free — connect Shopify, approve templates, publish your first journey.',
  },

  cod: {
    slug: 'cod',
    name: 'COD-first brands',
    eyebrow: 'Solutions',
    title: 'WhatsApp for',
    titleAccent: 'COD-first brands',
    subtitle:
      'Confirm COD before the courier leaves, nudge prepaid when it makes sense, and keep RTO risk visible in the inbox — built for Indian Shopify checkouts.',
    seoTitle: 'COD Confirmation on WhatsApp | Reduce RTO for Shopify India',
    seoDescription:
      'TopEdge helps COD-first Shopify brands confirm orders on WhatsApp, convert COD to prepaid, and cut RTO with Meta utility templates and operator takeover — see the COD → prepaid flow.',
    keywords:
      'COD confirmation WhatsApp, reduce RTO Shopify India, COD to prepaid WhatsApp, cash on delivery automation, WhatsApp COD journey Shopify',
    demoId: 'cod',
    demoLabel: 'COD to prepaid on WhatsApp',
    showVideoFirst: true,
    outcomes: [
      { metric: 'Confirm', label: 'Before ship', detail: 'Utility templates + takeover' },
      { metric: 'COD→PP', label: 'Prepaid nudge', detail: 'Convert when intent is real' },
      { metric: 'RTO', label: 'Risk down', detail: 'Fewer fake COD dispatches' },
    ],
    bentos: [
      {
        title: 'Confirm COD on WhatsApp',
        body: 'Send a clear confirm / cancel step with approved utility messaging. Operators can jump in when the shopper hesitates.',
        image: '/marketing/solutions/sol-cod-confirm-saas.png',
        wide: true,
        accent: 'Confirm',
      },
      {
        title: 'COD → prepaid journeys',
        body: 'When the order is still soft, nudge UPI or prepaid with a journey that respects Meta categories — watch the flow in the demo above.',
        image: '/marketing/solutions/sol-cod-prepaid-saas.png',
        accent: 'Prepaid',
      },
      {
        title: 'Cut RTO before it ships',
        body: 'Do not hand fake COD to the courier. TopEdge keeps confirmation status beside the Shopify order in Live Chat.',
        image: '/marketing/solutions/sol-cod-rto-saas.png',
        accent: 'RTO',
      },
    ],
    helps: [
      {
        feature: 'COD → Prepaid',
        title: 'The journey Indian checkouts need',
        body: 'Branch on COD status inside Flow + journeys. Convert willing buyers to prepaid; cancel ghosts before pick-up.',
        href: '/features/journeys',
      },
      {
        feature: 'Abandoned Cart',
        title: 'Recover without promising fake COD',
        body: 'Cart recovery stays honest — approved templates, clear next steps, no dark patterns that inflate RTO later.',
        href: '/whatsapp-cart-recovery',
      },
      {
        feature: 'Live Chat',
        title: 'COD pending beside the thread',
        body: 'Support sees COD flags and order # while chatting — faster resolution when someone says “cancel my COD”.',
        href: '/features/live-chat',
      },
      {
        feature: 'Shopify sync',
        title: 'Orders drive the automation',
        body: 'OAuth sync keeps carts, orders, and COD state in TopEdge so journeys fire from store truth.',
        href: '/features/shopify',
      },
    ],
    related: [
      { label: 'Fashion & apparel', href: '/solutions/fashion' },
      { label: 'Beauty & skincare', href: '/solutions/beauty' },
      { label: 'COD confirmation guide', href: '/cod-confirmation-whatsapp' },
      { label: 'Pricing', href: '/pricing' },
    ],
    ctaTitle: 'Run COD confirmation on your store',
    ctaSub: 'Start free — connect Shopify, approve utility templates, publish COD → prepaid.',
  },
};

export function getSolutionVertical(slug: string) {
  return SOLUTION_VERTICALS[slug] ?? null;
}
