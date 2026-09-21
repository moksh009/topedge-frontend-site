import { SITE_URL } from './marketingSeo';
import { catalogMonthlyOffersJsonLd, TRIAL } from '../lib/billingCatalog';

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
    title: 'WhatsApp Automation for Shopify India | TopEdge',
    description:
      'WhatsApp automation for Shopify: abandoned cart recovery, COD confirmations, Live Chat with order context, and ecommerce journeys. Built for Indian D2C brands.',
    keywords:
      'WhatsApp automation, Shopify automation, ecommerce automation, cart recovery, abandoned cart WhatsApp, WhatsApp for Shopify India, COD WhatsApp, D2C automation',
    path: '/',
    noSuffix: true,
  },
  pricing: {
    title: 'WhatsApp Automation Pricing | Shopify Plans',
    description:
      'Transparent pricing for Shopify WhatsApp automation, cart recovery, journeys, Live Chat, and Meta Cloud API pass-through. 14-day free trial. GST invoices included.',
    keywords:
      'WhatsApp automation pricing, Shopify WhatsApp pricing, ecommerce automation cost India, cart recovery software pricing',
    path: '/pricing',
  },
  features: {
    title: 'Shopify WhatsApp Features | Journeys, AI & Pixel',
    description:
      'Shopify WhatsApp features: journeys, Live Chat, AI Brain, Flow Builder, pixel, opt-in, campaigns, Instagram, and Meta templates.',
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
    title: 'Shopify Brands on WhatsApp Automation | Stories',
    description:
      'See how Indian D2C brands use TopEdge for WhatsApp cart recovery, COD flows, shared inbox, and Meta-safe ecommerce campaigns on Shopify.',
    keywords:
      'WhatsApp marketing Shopify case study, cart recovery results India, D2C WhatsApp automation',
    path: '/customers',
  },
  compare: {
    title: 'TopEdge vs WATI, AiSensy, Zoko & More | WhatsApp',
    description:
      'Compare TopEdge with WATI, AiSensy, Interakt, Bitespeed, Zoko, Getgabs, Kanal, and Dondy for Shopify WhatsApp India brands.',
    keywords:
      'TopEdge vs WATI, TopEdge vs AiSensy, TopEdge vs Zoko, TopEdge vs Dondy, TopEdge vs Interakt, TopEdge vs Bitespeed, WhatsApp template markup, COD prepaid WhatsApp comparison, WATI alternative India',
    path: '/compare',
  },
  blog: {
    title: 'WhatsApp Shopify Playbooks | Cart, COD & Meta',
    description:
      'Playbooks for WhatsApp on Shopify India: cart recovery, COD to cut RTO, Meta templates, shared inbox, and catalog-grounded AI.',
    keywords:
      'WhatsApp Shopify playbooks, abandoned cart recovery WhatsApp India, COD confirmation WhatsApp, Meta WhatsApp templates Shopify, ecommerce automation blog India, WhatsApp shared inbox Shopify',
    path: '/blog',
  },
  about: {
    title: 'About TopEdge AI | Moksh Patel & Smit Tilva',
    description:
      'TopEdge AI is the WhatsApp growth OS for Shopify India, founded by Moksh Patel and Smit Tilva. Cart recovery, COD, and Meta templates.',
    keywords:
      'About TopEdge AI, Moksh Patel TopEdge, Smit Tilva TopEdge, WhatsApp Shopify platform India, ecommerce automation company Ahmedabad, Delitech Smart Home WhatsApp, Apex Light Shopify WhatsApp',
    path: '/about',
  },
  contact: {
    title: 'Contact TopEdge | Shopify WhatsApp Automation & Cart Recovery',
    description:
      'Talk to us about WhatsApp automation, abandoned cart recovery, COD flows, or fully managed setup for your Shopify store in India.',
    keywords:
      'WhatsApp automation demo, Shopify WhatsApp consultation, cart recovery setup India',
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

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TopEdge',
    alternateName: 'TopEdge AI',
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    description:
      'WhatsApp automation and cart recovery platform for Shopify ecommerce brands in India.',
    foundingDate: '2024',
    founder: [
      {
        '@type': 'Person',
        name: 'Moksh Patel',
        jobTitle: 'Co-founder',
        image: `${SITE_URL}/marketing/team/moksh-patel.jpg`,
      },
      {
        '@type': 'Person',
        name: 'Smit Tilva',
        jobTitle: 'Co-founder',
        image: `${SITE_URL}/marketing/team/smit-tilva.png`,
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/topedgeai',
      'https://www.instagram.com/topedge_ai/',
      'https://www.youtube.com/@topedge_ai',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'team@topedgeai.com',
      telephone: '+91-93130-45439',
      availableLanguage: ['English', 'Hindi'],
      areaServed: 'IN',
    },
  };
}

export function softwareApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TopEdge',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    description:
      'WhatsApp automation for Shopify: abandoned cart recovery, COD confirmations, Live Chat, journeys, and Meta Cloud API campaigns for Indian ecommerce.',
    offers: [
      {
        '@type': 'Offer',
        name: 'Free trial',
        price: '0',
        priceCurrency: 'INR',
        description: `${TRIAL.days}-day free trial`,
        url: `${SITE_URL}/pricing`,
        availability: 'https://schema.org/InStock',
      },
      ...catalogMonthlyOffersJsonLd(undefined, { url: `${SITE_URL}/pricing` }),
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

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TopEdge',
    url: SITE_URL,
    description: 'WhatsApp automation and Shopify ecommerce growth platform for Indian D2C.',
    publisher: { '@type': 'Organization', name: 'TopEdge', url: SITE_URL },
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
    isPartOf: { '@type': 'WebSite', name: 'TopEdge', url: SITE_URL },
    about: {
      '@type': 'SoftwareApplication',
      name: 'TopEdge',
      applicationCategory: 'BusinessApplication',
    },
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
