export type SolutionBento = {
  titleLead: string;
  titleAccent: string;
  body: string;
  image: string;
  /** default third = equal 3-col row */
  span?: 'third' | 'full' | 'half';
};

export type SolutionShowcase = {
  title: string;
  titleAccent?: string;
  body: string;
  image: string;
  imageLabel?: string;
  reverse?: boolean;
};

export type SolutionHelp = {
  feature: string;
  title: string;
  body: string;
  href: string;
};

export type SolutionVertical = {
  slug: 'fashion' | 'beauty' | 'cod' | 'electronics';
  name: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  heroImage: string;
  heroAlt: string;
  bentoTitle: string;
  bentoAccent: string;
  bentoSub: string;
  bentos: SolutionBento[];
  showcasesTitle: string;
  showcasesAccent: string;
  showcasesSub?: string;
  showcases: SolutionShowcase[];
  helpsTitle: string;
  helpsAccent: string;
  helpsSub: string;
  helps: SolutionHelp[];
  relatedTitle: string;
  relatedAccent: string;
  related: { label: string; href: string }[];
  ctaTitle: string;
  ctaSub: string;
};

export const SOLUTION_VERTICALS: Record<string, SolutionVertical> = {
  fashion: {
    slug: 'fashion',
    name: 'Fashion & apparel',
    eyebrow: 'Solutions · Fashion',
    title: 'WhatsApp growth for',
    titleAccent: 'fashion & apparel',
    subtitle:
      'Recover size-sensitive carts, confirm COD before ship, and answer “where is my order?” with Shopify context, without living in WhatsApp Web.',
    seoTitle: 'WhatsApp Automation for Fashion Shopify Stores | Cart, Size & COD',
    seoDescription:
      'TopEdge helps fashion & apparel brands on Shopify India recover abandoned carts with size/variant context, confirm COD to cut RTO, and run Meta-safe drop campaigns on WhatsApp.',
    keywords:
      'fashion WhatsApp automation Shopify, apparel cart recovery India, size exchange WhatsApp, COD confirmation fashion D2C, Shopify WhatsApp for clothing brands',
    heroImage: '/marketing/solutions/sol-fashion-hero.png',
    heroAlt: 'Fashion cart recovery and order support on WhatsApp with Shopify context',
    bentoTitle: 'How TopEdge',
    bentoAccent: 'helps',
    bentoSub: 'Workflows built for apparel catalogs, sizes, and drop weekends, not generic WhatsApp blasts.',
    bentos: [
      {
        titleLead: 'Size-aware',
        titleAccent: 'cart recovery',
        body: 'When shoppers leave mid-size or variant, TopEdge sends approved WhatsApp recovery with the same SKU context, not a generic “you left something” blast.',
        image: '/marketing/solutions/sol-fashion-cart-saas.png',
        span: 'third',
      },
      {
        titleLead: 'Support with',
        titleAccent: 'order context',
        body: 'Exchanges, delayed couriers, and COD questions land in Live Chat next to the Shopify order, so agents do not tab-hunt.',
        image: '/marketing/solutions/sol-fashion-inbox-saas.png',
        span: 'third',
      },
      {
        titleLead: 'Drop weekends,',
        titleAccent: 'Meta-safe',
        body: 'Segment past buyers and lookers, then broadcast only with approved templates, so festival drops do not risk your number.',
        image: '/marketing/solutions/sol-fashion-campaign-saas.png',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'fashion ops',
    showcasesSub: 'Recovery, inbox, and drop campaigns, the screens apparel teams open every day.',
    showcases: [
      {
        title: 'Size-aware',
        titleAccent: 'recovery',
        body: 'Abandoned carts keep size, colour, and ₹ honest to Shopify, so the WhatsApp nudge matches the outfit they almost bought.',
        image: '/marketing/solutions/sol-fashion-cart-saas.png',
        imageLabel: 'Fashion cart recovery with size and variant context',
      },
      {
        title: 'Inbox beside',
        titleAccent: 'the order',
        body: 'Exchanges and “where is my order?” land next to Shopify order #, agents reply without leaving Live Chat.',
        image: '/marketing/solutions/sol-fashion-inbox-saas.png',
        imageLabel: 'Fashion Live Chat with Shopify order context',
      },
      {
        title: 'Drop',
        titleAccent: 'campaigns',
        body: 'Segment past buyers, lock an Approved marketing template, and launch festival drops without template chaos.',
        image: '/marketing/solutions/sol-fashion-campaign-saas.png',
        imageLabel: 'Fashion drop campaign with Meta-approved templates',
      },
    ],
    helpsTitle: 'Features that',
    helpsAccent: 'fit fashion',
    helpsSub: 'Specific TopEdge capabilities for apparel brands, not generic WhatsApp tips.',
    helps: [
      {
        feature: 'Abandoned Cart',
        title: 'Recover outfits before the next scroll',
        body: 'Trigger a 3-message sequence from real Shopify abandon events. Keep size, colour, and price honest to the cart.',
        href: '/features/journeys#abandoned-cart',
      },
      {
        feature: 'COD → Prepaid',
        title: 'Confirm apparel COD before dispatch',
        body: 'Ask shoppers to confirm or flip to prepaid on WhatsApp, fewer fake COD orders on high-AOV fashion.',
        href: '/solutions/cod',
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
    relatedTitle: 'Also',
    relatedAccent: 'explore',
    related: [
      { label: 'Beauty & skincare', href: '/solutions/beauty' },
      { label: 'Electronics', href: '/solutions/electronics' },
      { label: 'COD-first brands', href: '/solutions/cod' },
      { label: 'Cart recovery', href: '/features/journeys#abandoned-cart' },
      { label: 'Pricing', href: '/pricing' },
    ],
    ctaTitle: 'Run fashion recovery on your catalog',
    ctaSub: 'Connect Shopify and WhatsApp, publish size-aware cart recovery in your trial.',
  },

  beauty: {
    slug: 'beauty',
    name: 'Beauty & skincare',
    eyebrow: 'Solutions · Beauty',
    title: 'WhatsApp commerce for',
    titleAccent: 'beauty & skincare',
    subtitle:
      'Recover serum carts, answer ingredient questions with catalog truth, and capture WhatsApp numbers without theme hacks, built for Indian beauty D2C on Shopify.',
    seoTitle: 'WhatsApp Automation for Beauty & Skincare Shopify Brands | India',
    seoDescription:
      'TopEdge helps beauty and skincare Shopify brands recover abandoned carts, answer with live catalog SKUs, capture opt-ins, and confirm COD on WhatsApp, Meta-safe for India D2C.',
    keywords:
      'beauty WhatsApp automation Shopify, skincare cart recovery India, WhatsApp for beauty D2C, serum abandoned cart WhatsApp, beauty COD confirmation WhatsApp',
    heroImage: '/marketing/solutions/sol-beauty-hero.png',
    heroAlt: 'Beauty product cart recovery and catalog replies on WhatsApp',
    bentoTitle: 'How TopEdge',
    bentoAccent: 'helps',
    bentoSub: 'Product-card recovery, catalog-true replies, and clean opt-in, tuned for beauty SKUs.',
    bentos: [
      {
        titleLead: 'Product-card',
        titleAccent: 'cart recovery',
        body: 'Bring shoppers back to the exact serum or kit they left, with WhatsApp product cards tied to Shopify, not a vague reminder.',
        image: '/marketing/solutions/sol-beauty-cart-saas.png',
        span: 'third',
      },
      {
        titleLead: 'Catalog-grounded',
        titleAccent: 'replies',
        body: 'When someone asks “is this for oily skin?” or price, answers stay anchored to live SKUs and ₹, then hand off to a human cleanly.',
        image: '/marketing/solutions/sol-beauty-catalog-saas.png',
        span: 'third',
      },
      {
        titleLead: 'Opt-in without',
        titleAccent: 'theme fear',
        body: 'Capture WhatsApp numbers on PDP and exit intent with a popup that does not require risky theme surgery.',
        image: '/marketing/solutions/sol-beauty-optin-saas.png',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'beauty ops',
    showcasesSub: 'Recovery cards, catalog answers, and storefront opt-in, built for beauty SKUs.',
    showcases: [
      {
        title: 'Serum cart',
        titleAccent: 'recovery',
        body: 'Product cards reopen the exact kit or serum left behind, Meta-approved templates with live Shopify pricing.',
        image: '/marketing/solutions/sol-beauty-cart-saas.png',
        imageLabel: 'Beauty abandoned cart with product cards',
      },
      {
        title: 'Catalog-true',
        titleAccent: 'answers',
        body: 'Ingredient and “is this for oily skin?” questions stay grounded in live SKUs before AI or agents take over.',
        image: '/marketing/solutions/sol-beauty-catalog-saas.png',
        imageLabel: 'Catalog-grounded beauty replies on WhatsApp',
      },
      {
        title: 'Opt-in',
        titleAccent: 'on storefront',
        body: 'Capture WhatsApp numbers on PDP and exit intent without risky theme surgery, then enroll into journeys safely.',
        image: '/marketing/solutions/sol-beauty-optin-saas.png',
        imageLabel: 'Beauty WhatsApp opt-in popup on storefront',
      },
    ],
    helpsTitle: 'Features that',
    helpsAccent: 'fit beauty',
    helpsSub: 'Capabilities beauty operators actually ship, recovery, opt-in, and Meta-safe campaigns.',
    helps: [
      {
        feature: 'Abandoned Cart',
        title: 'Recover high-intent beauty carts',
        body: 'Routine builders abandon often. TopEdge sequences re-open the conversation with approved templates and product context.',
        href: '/features/journeys#abandoned-cart',
      },
      {
        feature: 'Opt-in Popup',
        title: 'Grow a reachable beauty list',
        body: 'Collect consent and numbers on storefront moments that matter, then enroll into journeys and drops safely.',
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
        body: 'See who is on the PDP now and continue the conversation on WhatsApp with context, not cold spam.',
        href: '/features/analytics',
      },
    ],
    relatedTitle: 'Also',
    relatedAccent: 'explore',
    related: [
      { label: 'Fashion & apparel', href: '/solutions/fashion' },
      { label: 'Electronics', href: '/solutions/electronics' },
      { label: 'COD-first brands', href: '/solutions/cod' },
      { label: 'Cart recovery', href: '/features/journeys#abandoned-cart' },
      { label: 'Pricing', href: '/pricing' },
    ],
    ctaTitle: 'See beauty recovery on your SKUs',
    ctaSub: 'Start free, connect Shopify, approve templates, publish your first journey.',
  },

  cod: {
    slug: 'cod',
    name: 'COD-first brands',
    eyebrow: 'Solutions · COD',
    title: 'WhatsApp for',
    titleAccent: 'COD-first brands',
    subtitle:
      'One-click COD → prepaid on WhatsApp, counted as one sale (linked orders, not double-reported), and RTO caught before the courier leaves.',
    seoTitle: 'COD Confirmation on WhatsApp | Reduce RTO for Shopify India',
    seoDescription:
      'TopEdge helps COD-first Shopify brands confirm orders on WhatsApp, convert COD to prepaid as one linked sale, and cut RTO before shipping with dedicated conversion analytics.',
    keywords:
      'COD confirmation WhatsApp, reduce RTO Shopify India, COD to prepaid WhatsApp, cash on delivery automation, WhatsApp COD journey Shopify',
    heroImage: '/marketing/solutions/sol-cod-hero.png',
    heroAlt: 'COD confirmation and prepaid nudge on WhatsApp for Shopify orders',
    bentoTitle: 'How TopEdge',
    bentoAccent: 'helps',
    bentoSub: 'Confirm, convert once, cut RTO, with dedicated conversion analytics.',
    bentos: [
      {
        titleLead: 'One-click',
        titleAccent: 'conversion',
        body: 'Customer confirms on WhatsApp, the order becomes prepaid automatically. No back-office double entry.',
        image: '/marketing/solutions/sol-cod-prepaid-saas.png',
        span: 'third',
      },
      {
        titleLead: 'One sale,',
        titleAccent: 'not two',
        body: 'Original COD and converted prepaid stay linked by order tagging, finance sees one order, not inflated conversion math.',
        image: '/marketing/solutions/sol-cod-confirm-saas.png',
        span: 'third',
      },
      {
        titleLead: 'RTO before',
        titleAccent: 'shipping',
        body: 'Catch a doomed COD order before it ships, not after it’s returned. Confirmation status sits beside the Shopify order in Live Chat.',
        image: '/marketing/solutions/sol-cod-rto-saas.png',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'COD protection',
    showcasesSub: 'Confirm, convert once, and measure RTOs avoided, before dispatch.',
    showcases: [
      {
        title: 'Confirm',
        titleAccent: 'before dispatch',
        body: 'Utility templates ask confirm / cancel while the order is still soft, operators jump in from Live Chat when needed.',
        image: '/marketing/solutions/sol-cod-confirm-saas.png',
        imageLabel: 'COD confirmation journey on WhatsApp',
      },
      {
        title: 'COD →',
        titleAccent: 'prepaid',
        body: 'One-click conversion with linked orders, counted as one sale so prepaid flips don’t double-report revenue.',
        image: '/marketing/solutions/sol-cod-prepaid-saas.png',
        imageLabel: 'COD to prepaid conversion, linked orders',
      },
      {
        title: 'Conversion',
        titleAccent: 'analytics',
        body: 'RTOs avoided, prepaid conversion rate, and cost savings in the COD Conversion Data view, numbers ops can defend.',
        image: '/marketing/solutions/sol-cod-rto-saas.png',
        imageLabel: 'COD conversion analytics, RTO avoided',
      },
    ],
    helpsTitle: 'Features that',
    helpsAccent: 'cut RTO',
    helpsSub: 'The journeys, inbox, and sync COD-first brands need on Shopify India.',
    helps: [
      {
        feature: 'COD → Prepaid',
        title: 'Convert once, report once',
        body: 'Linked orders and one-click WhatsApp conversion. Branch on COD status; cancel ghosts before pick-up.',
        href: '/solutions/cod',
      },
      {
        feature: 'Abandoned Cart',
        title: 'Recover without promising fake COD',
        body: 'Cart recovery stays honest, approved templates, clear next steps, no dark patterns that inflate RTO later.',
        href: '/features/journeys#abandoned-cart',
      },
      {
        feature: 'Live Chat',
        title: 'COD pending beside the thread',
        body: 'Support sees COD flags and order # while chatting, faster resolution when someone says “cancel my COD”.',
        href: '/features/live-chat',
      },
      {
        feature: 'Shopify sync',
        title: 'Orders drive the automation',
        body: 'OAuth sync keeps carts, orders, and COD state in TopEdge so journeys fire from store truth.',
        href: '/integrations',
      },
    ],
    relatedTitle: 'Also',
    relatedAccent: 'explore',
    related: [
      { label: 'Fashion & apparel', href: '/solutions/fashion' },
      { label: 'Electronics', href: '/solutions/electronics' },
      { label: 'COD confirmation guide', href: '/solutions/cod' },
      { label: 'Pricing', href: '/pricing' },
    ],
    ctaTitle: 'Run COD confirmation on your store',
    ctaSub: 'Start free, connect Shopify, approve utility templates, publish COD → prepaid.',
  },

  electronics: {
    slug: 'electronics',
    name: 'Electronics & gadgets',
    eyebrow: 'Solutions · Electronics',
    title: 'WhatsApp growth for',
    titleAccent: 'electronics & gadgets',
    subtitle:
      'Assign warranties after purchase, answer install and DOA questions with order context, and recover high-AOV carts, without agents living in WhatsApp Web.',
    seoTitle: 'WhatsApp Automation for Electronics Shopify Brands | Warranty & Support',
    seoDescription:
      'TopEdge helps electronics & gadget brands on Shopify India assign warranties on WhatsApp, support with order + SKU context, and recover high-AOV abandoned carts, Meta-safe.',
    keywords:
      'electronics WhatsApp automation Shopify, warranty assign WhatsApp, gadget cart recovery India, DOA support WhatsApp, Shopify WhatsApp for electronics brands',
    heroImage: '/marketing/solutions/sol-electronics-hero.png',
    heroAlt: 'Electronics warranty assign and product support on WhatsApp with Shopify order context',
    bentoTitle: 'How TopEdge',
    bentoAccent: 'helps',
    bentoSub: 'Warranty assign, high-ticket support, and AOV-aware recovery, built for gadgets.',
    bentos: [
      {
        titleLead: 'Warranty assign',
        titleAccent: 'on WhatsApp',
        body: 'After delivery, send an approved template to register serial or warranty. Confirm on-chat and write the note to CRM with no spreadsheet chase.',
        image: '/marketing/solutions/sol-electronics-warranty-saas.png',
        span: 'third',
      },
      {
        titleLead: 'Support with',
        titleAccent: 'product context',
        body: 'Install help, DOA, and courier delays land in Live Chat beside Shopify order # and SKU, agents reply with truth, not tabs.',
        image: '/marketing/solutions/sol-electronics-inbox-saas.png',
        span: 'third',
      },
      {
        titleLead: 'High-AOV',
        titleAccent: 'cart recovery',
        body: 'Phones, laptops, and accessories abandon often. Recover with the exact variant and price from Shopify, not a generic nudge.',
        image: '/marketing/solutions/sol-electronics-cart-saas.png',
        span: 'third',
      },
    ],
    showcasesTitle: 'Inside',
    showcasesAccent: 'electronics ops',
    showcasesSub: 'Warranty register, DOA support, and high-ticket recovery, wired to Shopify.',
    showcases: [
      {
        title: 'Warranty',
        titleAccent: 'on WhatsApp',
        body: 'Post-delivery templates register serial or warranty window, confirm on-chat and store it on the customer profile.',
        image: '/marketing/solutions/sol-electronics-warranty-saas.png',
        imageLabel: 'Electronics warranty assignment on WhatsApp',
      },
      {
        title: 'DOA & install',
        titleAccent: 'beside the order',
        body: 'Agents see order #, SKU, and shipment status while chatting, faster resolution on high-ticket gadgets.',
        image: '/marketing/solutions/sol-electronics-inbox-saas.png',
        imageLabel: 'Electronics Live Chat with product context',
      },
      {
        title: 'High-AOV',
        titleAccent: 'recovery',
        body: 'Recover phones and accessories with model, storage, and ₹ honest to the abandoned Shopify cart.',
        image: '/marketing/solutions/sol-electronics-cart-saas.png',
        imageLabel: 'High-AOV electronics cart recovery',
      },
    ],
    helpsTitle: 'Features that',
    helpsAccent: 'fit electronics',
    helpsSub: 'Warranty notes, DOA support, and high-ticket recovery, wired to Shopify.',
    helps: [
      {
        feature: 'Warranty',
        title: 'Warranty notes stay on the profile',
        body: 'Serial, warranty window, and purchase history live beside WhatsApp identity, so renewals and care journeys stay personal.',
        href: '/features/warranty',
      },
      {
        feature: 'Live Chat',
        title: 'DOA and install beside the order',
        body: 'Agents see order #, SKU, and shipment status while chatting, faster resolution on high-ticket electronics.',
        href: '/features/live-chat',
      },
      {
        feature: 'Abandoned Cart',
        title: 'Recover high-ticket gadgets',
        body: 'Trigger approved recovery from real Shopify abandon events. Keep model, storage, and ₹ honest to the cart.',
        href: '/features/journeys#abandoned-cart',
      },
      {
        feature: 'Journeys',
        title: 'Post-purchase warranty journeys',
        body: 'Branch on fulfillment and delivery events to prompt warranty register, tip sheets, or COD confirm before ship.',
        href: '/features/journeys',
      },
    ],
    relatedTitle: 'Also',
    relatedAccent: 'explore',
    related: [
      { label: 'Fashion & apparel', href: '/solutions/fashion' },
      { label: 'COD-first brands', href: '/solutions/cod' },
      { label: 'Warranty', href: '/features/warranty' },
      { label: 'Cart recovery', href: '/features/journeys#abandoned-cart' },
      { label: 'Pricing', href: '/pricing' },
    ],
    ctaTitle: 'Run warranty + recovery on your catalog',
    ctaSub: 'Connect Shopify and WhatsApp, publish warranty assign and high-AOV cart recovery in your trial.',
  },
};

export function getSolutionVertical(slug: string) {
  return SOLUTION_VERTICALS[slug] ?? null;
}
