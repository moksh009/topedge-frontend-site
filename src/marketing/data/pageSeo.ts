import { SITE_URL } from './marketingSeo';
import { TRUSTPILOT } from './socialProof';
import {
  COMPANY_GSTIN,
  COMPANY_LEGAL_NAME,
  COMPANY_SHOPIFY_APP_URL,
} from '../legal/companyIdentity';
import {
  catalogDefaultCycleOffersJsonLd,
  offerPriceValidUntil,
  TRIAL,
} from '../lib/billingCatalog';

/** Core commercial keywords TopEdge should compete for (natural use in titles/descriptions). */
export const CORE_KEYWORDS = [
  'WhatsApp automation',
  'Shopify automation',
  'ecommerce automation',
  'cart recovery',
  'abandoned cart recovery',
  'WhatsApp marketing',
  'WhatsApp for Shopify',
  'Shopify WhatsApp integration',
  'COD confirmation WhatsApp',
  'WhatsApp chatbot for ecommerce',
  'D2C WhatsApp automation India',
  'Meta WhatsApp Cloud API',
] as const;

export type PageSeoEntry = {
  title: string;
  description: string;
  keywords: string;
  path: string;
  noSuffix?: boolean;
};

export const PAGE_SEO = {
  home: {
    title: 'WhatsApp Automation for Shopify India | COD & Carts | TopEdge AI',
    description:
      'Automate Shopify WhatsApp cart recovery and COD confirmation to prepaid in India. 0% Meta markup, flat INR plans from ₹1,999/mo, 14-day free trial.',
    keywords:
      'whatsapp automation for shopify india, shopify whatsapp cod confirmation, cod to prepaid shopify, whatsapp abandoned cart recovery shopify india, whatsapp business api 0% markup india, shopify whatsapp app india',
    path: '/',
    noSuffix: true,
  },
  pricing: {
    title: 'Shopify WhatsApp Pricing India: ₹1,999/mo, 0% Markup',
    description:
      'Flat INR Shopify WhatsApp plans from ₹1,999/mo + GST, yearly saves 20%. 0% markup on Meta India rates: ₹0.8631 marketing, ₹0.115 utility. 14-day free trial.',
    keywords:
      'shopify whatsapp pricing india, whatsapp automation price india, whatsapp business api 0% markup, whatsapp api rates india 2026, meta whatsapp india rate card inr, cod confirmation app pricing shopify, whatsapp cart recovery cost india, flat inr whatsapp plans',
    path: '/pricing',
  },
  metaRates: {
    title: 'Meta WhatsApp Rates India 2026: ₹0.8631 & ₹0.115',
    description:
      'Meta’s published India WhatsApp rate card, what a platform markup adds to it, and a free calculator for your own monthly volume. TopEdge adds 0% to every line.',
    keywords:
      'meta whatsapp rate card india, whatsapp api rates india 2026, whatsapp business api 0% markup india, whatsapp message cost calculator india, meta india inr rate card, whatsapp marketing template rate india',
    path: '/pricing/meta-rates',
  },
  features: {
    title: 'Shopify WhatsApp Features: Journeys, COD, AI & Pixel',
    description:
      'Every Shopify WhatsApp workspace in TopEdge: visual cart and COD journeys, BYOK AI Brain, visitor pixel, shared order inbox, warranty hub and India P&L.',
    keywords:
      'Shopify WhatsApp features, WhatsApp journeys India, AI Brain BYOK Shopify, tracking pixel WhatsApp, WhatsApp opt-in Shopify, Profit and costs ecommerce, Live Chat Shopify WhatsApp',
    path: '/features',
  },
  integrations: {
    title: 'Shopify & Meta WhatsApp Integrations | Store Sync',
    description:
      'Connect Shopify OAuth and Meta WhatsApp Cloud API in one workspace. Sync carts, orders, and catalogs for WhatsApp automation.',
    keywords:
      'Shopify WhatsApp integration, Meta Cloud API Shopify, ecommerce automation integrations, WhatsApp Business API Shopify',
    path: '/integrations',
  },
  customers: {
    title: 'Indian Shopify D2C Case Studies & Stories',
    description:
      'How Indian Shopify D2C brands like Delitech Smart Home and Apex Light run WhatsApp cart recovery, COD confirmation and a shared inbox, plus Trustpilot reviews.',
    keywords:
      'Shopify WhatsApp case study India, WhatsApp cart recovery results, D2C WhatsApp automation customers, TopEdge AI reviews',
    path: '/customers',
  },
  compare: {
    title: 'Compare TopEdge AI vs WATI, Interakt, AiSensy & Zoko',
    description:
      'Side-by-side Shopify India WhatsApp comparisons: TopEdge AI vs WATI, Interakt, AiSensy, Bitespeed, Zoko, Gupshup, Dondy, Kanal, Getgabs and Updatrr.',
    keywords:
      'TopEdge vs WATI, TopEdge vs AiSensy, TopEdge vs Zoko, TopEdge vs Dondy, TopEdge vs Updatrr, TopEdge vs Gupshup, TopEdge vs Interakt, TopEdge vs Bitespeed, WhatsApp template markup, COD prepaid WhatsApp comparison, WATI alternative India',
    path: '/compare',
  },
  blog: {
    title: 'Shopify India WhatsApp Playbooks: Cart, COD & RTO',
    description:
      'Operator guides for Indian Shopify D2C brands: WhatsApp abandoned cart recovery, COD confirmation to cut RTO, Meta Cloud API templates, BYOK AI and P&L math.',
    keywords:
      'WhatsApp Shopify playbooks, abandoned cart recovery WhatsApp India, COD confirmation WhatsApp, Meta WhatsApp templates Shopify, ecommerce automation blog India, WhatsApp shared inbox Shopify',
    path: '/blog',
  },
  about: {
    title: 'About TopEdge AI: Shopify WhatsApp Platform, India',
    description:
      'Founded in Ahmedabad by Moksh Patel and Smit Tilva, TopEdge AI is the WhatsApp automation and COD growth OS for Indian Shopify D2C brands. Cart recovery to RTO.',
    keywords:
      'About TopEdge AI, Moksh Patel TopEdge, Smit Tilva TopEdge, WhatsApp Shopify platform India, ecommerce automation company Ahmedabad, Delitech Smart Home WhatsApp, Apex Light Shopify WhatsApp',
    path: '/about',
  },
  contact: {
    title: 'Contact TopEdge AI: Shopify WhatsApp Onboarding, India',
    description:
      'Message us on WhatsApp or Instagram about Shopify WhatsApp automation, cart recovery and COD confirmation. No form, Ahmedabad team, same-day replies.',
    keywords:
      'contact TopEdge AI, WhatsApp automation support India, Shopify WhatsApp consultation, cart recovery setup India',
    path: '/contact',
  },
} as const satisfies Record<string, PageSeoEntry>;

export const FEATURE_SEO: Record<string, { title: string; description: string; keywords: string }> = {
  shopify: {
    title: 'Shopify WhatsApp Integration | Live Store Sync',
    description:
      'Connect Shopify to WhatsApp automation. Sync products, carts, orders, and COD status so cart recovery and Live Chat use live data.',
    keywords: 'Shopify WhatsApp integration, Shopify ecommerce automation, Shopify cart sync WhatsApp',
  },
  journeys: {
    title: 'WhatsApp Journey Builder for Shopify | Cart & COD',
    description:
      'Visual WhatsApp journeys for Shopify India: drag-and-drop canvas, cart recovery and COD templates, Meta APPROVED gating, and recovered-revenue attribution.',
    keywords:
      'WhatsApp journey builder Shopify, abandoned cart recovery WhatsApp India, COD confirmation journey, Meta template approval automation, Shopify order WhatsApp flows',
  },
  'live-chat': {
    title: 'WhatsApp Live Chat for Shopify | Shared Inbox & Orders',
    description:
      'Unified WhatsApp and Instagram Live Chat for Shopify: Customer 360 shows order #, COD status, LTV, and cart history so agents recover without leaving the thread.',
    keywords:
      'WhatsApp Live Chat Shopify, shared inbox WhatsApp Instagram, ecommerce customer support WhatsApp India, order context inbox Shopify',
  },
  'flow-builder': {
    title: 'WhatsApp Flow Builder for Shopify | AI Chatbot Drafts',
    description:
      'Describe your niche and goals; TopEdge AI drafts a WhatsApp flow you edit node-by-node: menus, catalog sends, COD FAQs, conditions, and Live Chat handoff.',
    keywords:
      'WhatsApp flow builder Shopify, AI chatbot builder ecommerce India, WhatsApp catalog send flow, Shopify chatbot without code',
  },
  'ai-brain': {
    title: 'AI Brain for Shopify WhatsApp | BYOK OpenAI & Claude',
    description:
      'TopEdge AI Brain: bring your own OpenAI or Claude key, ground WhatsApp replies in catalog and policies, set persona, and use Intent Detect to save tokens.',
    keywords:
      'AI Brain WhatsApp Shopify, BYOK OpenAI Claude ecommerce India, store knowledge WhatsApp AI, bring your own API key chatbot, catalog-grounded WhatsApp replies',
  },
  campaigns: {
    title: 'WhatsApp Campaigns for Shopify India | Safe Broadcasts',
    description:
      'Run WhatsApp marketing campaigns on Shopify with behavior segments, APPROVED templates only, transparent Meta rates, and cost clarity before send.',
    keywords:
      'WhatsApp campaigns Shopify India, Meta-safe WhatsApp broadcast, WhatsApp marketing template campaigns, audience campaign ROI ecommerce',
  },
  instagram: {
    title: 'Instagram Automation for Shopify | Comment to WA',
    description:
      'Turn Instagram comments and story mentions into WhatsApp or IG DMs for Shopify brands, capture price interest, then continue in Live Chat.',
    keywords:
      'Instagram WhatsApp automation Shopify, comment to DM ecommerce India, Instagram story reply WhatsApp, IG automation D2C',
  },
  analytics: {
    title: 'Shopify WhatsApp Tracking Pixel | Website Intent',
    description:
      'TopEdge Tracking Pixel: install via Shopify theme app embed, match product and cart intent to WhatsApp outreach, and monitor consent-aware pixel health.',
    keywords:
      'Shopify tracking pixel WhatsApp, website intent WhatsApp automation India, theme app embed tracking pixel, product view cart intent WhatsApp',
  },
  'meta-manager': {
    title: 'Meta Manager for Shopify WhatsApp | Templates & Catalog',
    description:
      'Submit, sync, and approve Meta WhatsApp templates for Shopify ecommerce: utility and marketing categories, catalog tools, QR links, broadcast only when APPROVED.',
    keywords:
      'Meta WhatsApp template manager Shopify, WhatsApp Cloud API India, Meta template approval ecommerce, WhatsApp catalog QR Shopify',
  },
  'audience-crm': {
    title: 'Audience CRM for Shopify WhatsApp | Segments & Scores',
    description:
      'WhatsApp Audience CRM for Shopify: unified contact timeline, interest scores, abandoned-cart leads, and campaign-ready segments from Shopify + WhatsApp behavior.',
    keywords:
      'WhatsApp Audience CRM Shopify, ecommerce lead scoring India, abandoned cart leads WhatsApp, Shopify customer segments WhatsApp',
  },
  'chat-rules': {
    title: 'WhatsApp Chat Rules for Shopify | Route, Tag & Assign',
    description:
      'Smart chat rules for Shopify Live Chat: keyword and intent routing, COD escalation, VIP priority, and assignment so volume spikes stay organized while AI pauses.',
    keywords:
      'WhatsApp chat rules Shopify, ecommerce inbox routing India, WhatsApp auto assign, COD keyword routing WhatsApp',
  },
  warranty: {
    title: 'WhatsApp Warranty for Shopify | Hub, Queue & Assign',
    description:
      'Digital warranty workspace for Shopify brands, hub list with status badges, visible unassigned queue, and manual assign to the right order or teammate on WhatsApp.',
    keywords:
      'WhatsApp warranty Shopify India, digital warranty ecommerce, warranty assignment WhatsApp, Shopify warranty hub',
  },
  'opt-in-tools': {
    title: 'WhatsApp Opt-in Tools for Shopify | Popup & Spin Wheel',
    description:
      'Capture consented WhatsApp numbers on Shopify with Pulse Drop, welcome popup, spin wheel, and chat widget, then run campaigns and journeys from one list.',
    keywords:
      'WhatsApp opt-in Shopify India, WhatsApp popup spin wheel, Pulse Drop WhatsApp, WhatsApp widget Shopify, consented subscriber list WhatsApp',
  },
  'profit-loss': {
    title: 'Profit & Costs for Shopify India | COGS, COD & RTO',
    description:
      'TopEdge Profit & costs: India-aware COGS, packaging, payment fees, COD, RTO, and ads, true net profit with a cost waterfall and product margins, not vanity revenue.',
    keywords:
      'Shopify Profit and costs India, ecommerce COGS RTO analytics, COD net profit Shopify, D2C true margin WhatsApp, Shopify cost waterfall',
  },
  byok: {
    title: 'BYOK WhatsApp AI for Shopify | See AI Brain',
    description:
      'Bring-your-own-key WhatsApp AI in TopEdge AI Brain: connect OpenAI or Claude, ground replies in store knowledge, and pay your provider directly.',
    keywords:
      'BYOK WhatsApp AI Shopify, bring your own OpenAI key ecommerce, AI Brain TopEdge, Gemini Claude WhatsApp chatbot India',
  },
  'intent-detection': {
    title: 'Intent Detection for Shopify WhatsApp | Save AI Tokens',
    description:
      'Algorithmic intent detection for Shopify WhatsApp: match shipping, returns, COD, and handoff phrases to the right flow so you save AI tokens for hard questions.',
    keywords:
      'WhatsApp intent detection Shopify, chatbot intent routing India, ecommerce chat intent without AI waste, COD shipping intent WhatsApp',
  },
};

export const SOLUTION_SEO: Record<
  string,
  { title: string; description: string; keywords: string; body: string; bullets: string[]; scene: 'journey' | 'inbox' | 'campaigns' }
> = {
  fashion: {
    title: 'Fashion Shopify WhatsApp Automation | Cart & COD',
    description:
      'TopEdge helps fashion brands on Shopify India recover abandoned carts with size context, confirm COD to cut RTO, and run Meta-safe drop campaigns on WhatsApp.',
    keywords:
      'fashion WhatsApp automation Shopify, apparel cart recovery India, size exchange WhatsApp, COD confirmation fashion D2C',
    body: 'Size-aware cart recovery, COD confirmation, and order-aware support on WhatsApp for fashion Shopify brands.',
    bullets: [
      'Cart recovery with size/variant aware copy',
      'Live Chat beside order # and COD status',
      'Campaigns for drop weekends, Meta-approved only',
    ],
    scene: 'inbox',
  },
  beauty: {
    title: 'Beauty & Skincare WhatsApp Automation | Shopify India',
    description:
      'TopEdge helps beauty Shopify brands recover abandoned carts, answer with live catalog SKUs, capture opt-ins, and confirm COD on WhatsApp for India D2C.',
    keywords:
      'beauty WhatsApp automation Shopify, skincare cart recovery India, WhatsApp for beauty D2C, serum abandoned cart WhatsApp',
    body: 'Product-card recovery, catalog-grounded answers, and clean WhatsApp opt-in for beauty D2C on Shopify.',
    bullets: [
      'AI answers from live SKUs and ₹ prices',
      '3-message recovery with product cards',
      'Opt-in popup without theme hacks',
    ],
    scene: 'journey',
  },
  cod: {
    title: 'COD Confirmation on WhatsApp | Cut RTO for Shopify',
    description:
      'TopEdge helps COD-first Shopify brands confirm orders on WhatsApp, convert COD to prepaid, and cut RTO with Meta utility templates and operator takeover.',
    keywords:
      'COD confirmation WhatsApp, reduce RTO Shopify India, COD to prepaid WhatsApp, cash on delivery automation',
    body: 'Confirm COD, nudge prepaid, and keep RTO risk out of the courier bag, with journeys and Live Chat.',
    bullets: [
      'COD conditions inside Journey canvas',
      'Inbox shows COD pending beside the thread',
      'Transparent Meta utility rates on pricing',
    ],
    scene: 'campaigns',
  },
  electronics: {
    title: 'WhatsApp for Electronics Shopify | Warranty & Support',
    description:
      'TopEdge helps electronics Shopify brands in India assign warranties on WhatsApp, support with order and SKU context, and recover high-AOV abandoned carts.',
    keywords:
      'electronics WhatsApp automation Shopify, warranty assign WhatsApp, gadget cart recovery India, DOA support WhatsApp',
    body: 'Warranty assign, order-aware support, and high-AOV cart recovery on WhatsApp for electronics Shopify brands.',
    bullets: [
      'Warranty registration journeys after delivery',
      'Live Chat beside order # and SKU for DOA/install',
      'High-AOV cart recovery with honest variant pricing',
    ],
    scene: 'inbox',
  },
};

/**
 * One Organization entity for the whole site. Every page that needs the
 * publisher (blog, docs, WebPage.about, WebSite.publisher) points here by @id
 * instead of restating a thinner copy, so crawlers and LLMs resolve a single
 * "TopEdge AI" node. See seo-audit/ TE-004.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const SOFTWARE_ID = `${SITE_URL}/#software`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORG_LOGO_URL = `${SITE_URL}/og-image.png`;

export const ORG_REF = { '@id': ORG_ID } as const;

/** The two named people behind the product; used as real bylines on articles. */
export const TEAM = {
  'Moksh Patel': {
    id: `${SITE_URL}/about#moksh-patel`,
    jobTitle: 'Co-founder',
    image: `${SITE_URL}/marketing/team/moksh-patel.jpg`,
    sameAs: [] as string[],
  },
  'Smit Tilva': {
    id: `${SITE_URL}/about#smit-tilva`,
    jobTitle: 'Co-founder',
    image: `${SITE_URL}/marketing/team/smit-tilva.jpg`,
    sameAs: [] as string[],
  },
} as const;

export const DEFAULT_AUTHOR = 'Moksh Patel';

/** Person node for a byline; unknown names fall back to the organization. */
export function authorJsonLd(name?: string) {
  const person = TEAM[(name ?? DEFAULT_AUTHOR) as keyof typeof TEAM];
  if (!person) return ORG_REF;
  return {
    '@type': 'Person',
    '@id': person.id,
    name: name ?? DEFAULT_AUTHOR,
    jobTitle: person.jobTitle,
    url: `${SITE_URL}/about`,
    image: person.image,
    worksFor: ORG_REF,
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'TopEdge AI',
    // The short brand and the legal entity name used on the Shopify listing.
    alternateName: ['TopEdge', COMPANY_LEGAL_NAME],
    legalName: COMPANY_LEGAL_NAME,
    // The registration number on our own invoices. It is the strongest
    // identifier an Indian entity can give a knowledge graph, and it is the one
    // thing no similarly named company can also claim.
    taxID: COMPANY_GSTIN,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: ORG_LOGO_URL,
      width: 1024,
      height: 1024,
    },
    image: ORG_LOGO_URL,
    description:
      'WhatsApp automation and cart recovery platform for Shopify ecommerce brands in India.',
    // Separates this entity from the edge-AI hardware companies that share the name.
    disambiguatingDescription:
      'TopEdge AI is a WhatsApp automation platform for Shopify D2C brands in India, based in Ahmedabad, Gujarat. It is not related to edge-AI hardware or other products with a similar name.',
    foundingDate: '2024',
    founder: [authorJsonLd('Moksh Patel'), authorJsonLd('Smit Tilva')],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Block-A, 606, Prahladnagar, Trade Center',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '380051',
      addressCountry: 'IN',
    },
    areaServed: { '@type': 'Country', name: 'India' },
    // Entry price for the cheapest paid plan through the top of Scale, so an
    // answer engine quoting a price range quotes ours instead of guessing.
    //
    // This used to be a bare `priceRange` beside an `openingHoursSpecification`.
    // Both are LocalBusiness/Place properties: schema.org rejected them on a
    // plain Organization, which failed validation on every page the node is on
    // (all 68). The same two facts live here in shapes Organization accepts —
    // `makesOffer` for the price band, `contactPoint.hoursAvailable` for the
    // desk hours — rather than retyping the company as a LocalBusiness, which
    // it is not.
    makesOffer: {
      '@type': 'Offer',
      name: 'TopEdge AI subscription plans',
      url: `${SITE_URL}/pricing`,
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: 1599,
        maxPrice: 6499,
        priceCurrency: 'INR',
        valueAddedTaxIncluded: false,
      },
    },
    knowsAbout: [
      'WhatsApp Business API',
      'Shopify abandoned cart recovery',
      'COD order confirmation',
      'RTO reduction for Indian D2C',
      'Meta WhatsApp Cloud API',
    ],
    sameAs: [
      'https://www.linkedin.com/company/topedgeai',
      'https://www.instagram.com/topedge_ai/',
      'https://www.youtube.com/@topedge_ai',
      COMPANY_SHOPIFY_APP_URL,
      // Listed because it exists and the site links to it from /pricing and
      // /customers. Gemini and Perplexity both surfaced the Trustpilot profile
      // while sameAs did not name it, which is how an entity gets split.
      TRUSTPILOT.profileUrl,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'team@topedgeai.com',
      telephone: '+91-94297-84875',
      availableLanguage: ['English', 'Hindi'],
      areaServed: 'IN',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
    },
  };
}

/**
 * Shared commercial schema for home / pricing / SEO topic pages.
 * Google Merchant listings coerce SoftwareApplication+Offer → Product and
 * require a crawlable `image` URL (plain string is the most reliable shape).
 *
 * No `review` nodes. Google's review-snippet policy makes a page ineligible for
 * the star feature when "the entity that's being reviewed controls the reviews
 * about itself", so self-serving Review markup can never earn a rich result —
 * and the home testimonials rotate through a carousel, so only a subset is ever
 * in the prerendered HTML, which breaks the requirement that marked-up review
 * content be readily available on the marked-up page. The testimonials stay as
 * visible page content; they are simply not marked up. See seo-audit/ TE-001.
 */
export function softwareApplicationJsonLd() {
  const imageUrl = `${SITE_URL}/og-image.png`;
  const pricingUrl = `${SITE_URL}/pricing`;
  return {
    '@context': 'https://schema.org',
    // Dual type: keeps SoftwareApplication semantics while satisfying Product
    // merchant-listing validators that require `image` on Product.
    '@type': ['SoftwareApplication', 'Product'],
    '@id': SOFTWARE_ID,
    name: 'TopEdge AI',
    alternateName: 'TopEdge',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE_URL,
    image: [imageUrl],
    screenshot: imageUrl,
    description:
      'WhatsApp automation for Shopify: abandoned cart recovery, COD confirmations, Live Chat, journeys, and Meta Cloud API campaigns for Indian ecommerce.',
    brand: {
      '@type': 'Brand',
      name: 'TopEdge AI',
    },
    publisher: ORG_REF,
    provider: ORG_REF,
    offers: [
      {
        '@type': 'Offer',
        name: 'Free trial',
        price: '0',
        priceCurrency: 'INR',
        priceValidUntil: offerPriceValidUntil(),
        description: `${TRIAL.days}-day free trial`,
        url: pricingUrl,
        availability: 'https://schema.org/InStock',
      },
      ...catalogDefaultCycleOffersJsonLd(undefined, { url: pricingUrl }),
    ],
    featureList: [
      'WhatsApp cart recovery',
      'Shopify integration',
      'Abandoned cart automation',
      'COD confirmation WhatsApp',
      'Shared WhatsApp inbox',
      'Meta WhatsApp Cloud API',
      'Ecommerce journey builder',
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Shopify D2C merchants and ecommerce agencies in India',
    },
  };
}

/**
 * VideoObject for an embedded product demo.
 *
 * GSC showed 7 pages carrying video and 0 indexed as video: the clips are
 * self-hosted MP4s with poster frames and no markup, so Google never saw them.
 *
 * Only emit this where the clip is genuinely part of the page's main content —
 * a feature page showing that feature. Marking up a decorative background loop
 * is a structured-data violation, not a shortcut to a video result.
 *
 * `contentUrl` and `thumbnailUrl` must be absolute and crawlable; cache-busting
 * query strings are stripped so the URL matches the file Googlebot fetches.
 */
export function videoObjectJsonLd(demo: {
  name: string;
  description: string;
  uploadDate: string;
  src: string;
  poster: string;
}) {
  const abs = (p: string) => `${SITE_URL}${p.split('?')[0]}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: demo.name,
    description: demo.description,
    uploadDate: demo.uploadDate,
    thumbnailUrl: [abs(demo.poster)],
    contentUrl: abs(demo.src),
    publisher: ORG_REF,
    isFamilyFriendly: true,
    inLanguage: 'en-IN',
  };
}

export function featureSoftwareJsonLd(opts: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': SOFTWARE_ID,
    name: 'TopEdge AI',
    alternateName: 'TopEdge',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: opts.name,
    operatingSystem: 'Web, Shopify, Meta WhatsApp Cloud API',
    url: SITE_URL,
    image: [ORG_LOGO_URL],
    description: opts.description,
    featureList: [opts.name],
    publisher: ORG_REF,
    provider: ORG_REF,
    // Where the plans and the prices actually live.
    subjectOf: { '@type': 'WebPage', url: `${SITE_URL}/pricing` },
    audience: {
      '@type': 'Audience',
      audienceType: 'Shopify D2C merchants and ecommerce agencies in India',
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'TopEdge AI',
    alternateName: 'TopEdge',
    url: SITE_URL,
    inLanguage: 'en-IN',
    description: 'WhatsApp automation and Shopify ecommerce growth platform for Indian D2C.',
    publisher: ORG_REF,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function webPageJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  dateModified?: string;
}) {
  const url = `${SITE_URL}${opts.path === '/' ? '' : opts.path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.name,
    description: opts.description,
    url,
    ...(opts.dateModified
      ? {
          dateModified: new Date(
            opts.dateModified.includes('T') ? opts.dateModified : `${opts.dateModified}T12:00:00Z`,
          ).toISOString(),
        }
      : {}),
    inLanguage: 'en-IN',
    isPartOf: { '@type': 'WebSite', '@id': WEBSITE_ID, name: 'TopEdge AI', url: SITE_URL },
    // Full SoftwareApplication+Product (with image + merchant offer fields) lives
    // on home/pricing/SEO topics via softwareApplicationJsonLd(). Compare pages
    // intentionally omit priced Offers so Merchant listings do not apply.
    // Keep about as Organization so nested schemas never lack required image.
    about: ORG_REF,
    publisher: ORG_REF,
  };
}

/**
 * Article node for the editorial pages that are not blog posts.
 *
 * The compare boards read as articles to a crawler — a dated byline, a
 * standfirst, 900 to 1,400 words of prose and tables — but carried only
 * WebPage, so every AI-discoverability pass reported them as an article page
 * with no Article schema. They are maintained continuously rather than
 * published once, so `datePublished` and `dateModified` are both the content
 * date the page already shows in its kicker: it is the only date about the
 * board that is true.
 */
export function articleJsonLd(opts: {
  headline: string;
  description: string;
  path: string;
  dateModified: string;
  datePublished?: string;
  image?: string;
  author?: string;
  section?: string;
  keywords?: string;
}) {
  const url = `${SITE_URL}${opts.path === '/' ? '' : opts.path}`;
  const iso = (d: string) =>
    new Date(d.includes('T') ? d : `${d}T12:00:00Z`).toISOString();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    inLanguage: 'en-IN',
    headline: opts.headline,
    description: opts.description,
    image: opts.image ?? ORG_LOGO_URL,
    datePublished: iso(opts.datePublished ?? opts.dateModified),
    dateModified: iso(opts.dateModified),
    author: authorJsonLd(opts.author),
    publisher: ORG_REF,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    ...(opts.section ? { articleSection: opts.section } : {}),
    ...(opts.keywords ? { keywords: opts.keywords } : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '' : item.path}`,
    })),
  };
}
