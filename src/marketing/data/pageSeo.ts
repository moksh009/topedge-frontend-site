import { SITE_URL } from './marketingSeo';

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
      'Transparent pricing for Shopify WhatsApp automation — cart recovery, journeys, Live Chat, and Meta Cloud API pass-through. 14-day free trial. GST invoices included.',
    keywords:
      'WhatsApp automation pricing, Shopify WhatsApp pricing, ecommerce automation cost India, cart recovery software pricing',
    path: '/pricing',
  },
  features: {
    title: 'Shopify WhatsApp Features | Cart & Inbox',
    description:
      'Explore TopEdge features: Shopify sync, abandoned cart recovery journeys, Live Chat, Flow Builder, AI Brain, campaigns, Instagram automation, and Meta template manager.',
    keywords:
      'Shopify WhatsApp features, cart recovery software, WhatsApp inbox Shopify, ecommerce journey builder, WhatsApp flow builder',
    path: '/features',
  },
  integrations: {
    title: 'Shopify & Meta WhatsApp Integrations | Ecommerce Automation Stack',
    description:
      'Connect Shopify OAuth and Meta WhatsApp Cloud API in one workspace. Sync carts, orders, and catalogs — run WhatsApp automation without duct-taping tools.',
    keywords:
      'Shopify WhatsApp integration, Meta Cloud API Shopify, ecommerce automation integrations, WhatsApp Business API Shopify',
    path: '/integrations',
  },
  customers: {
    title: 'Shopify Brands Using WhatsApp Automation | Customer Stories',
    description:
      'See how Indian D2C brands use TopEdge for WhatsApp cart recovery, COD flows, shared inbox, and Meta-safe ecommerce campaigns on Shopify.',
    keywords:
      'WhatsApp marketing Shopify case study, cart recovery results India, D2C WhatsApp automation',
    path: '/customers',
  },
  agency: {
    title: 'WhatsApp Automation for Agencies | Multi-Brand Shopify Ops',
    description:
      'Run WhatsApp automation for multiple Shopify brands — standardized cart recovery, template hygiene, Live Chat, and Meta-safe campaigns without rebuilding each time.',
    keywords:
      'WhatsApp agency Shopify, multi-brand WhatsApp automation, ecommerce agency tools India, DFY WhatsApp marketing',
    path: '/agency',
  },
  security: {
    title: 'Security for Shopify WhatsApp Automation | Data & Access Control',
    description:
      'How TopEdge protects Shopify sync, Meta template approvals, and tenant isolation for ecommerce teams running WhatsApp automation in India.',
    keywords:
      'WhatsApp Business API security, Shopify app security, ecommerce automation compliance',
    path: '/security',
  },
  compare: {
    title: 'TopEdge vs WhatsApp Web & Generic Chatbots | Shopify Automation',
    description:
      'Compare TopEdge to WhatsApp Web, generic chatbots, and email-only cart recovery. Built for Shopify India with Meta-safe WhatsApp ecommerce automation.',
    keywords:
      'WATI alternative India, Interakt alternative, Bitespeed alternative, WhatsApp Shopify software comparison',
    path: '/compare',
  },
  blog: {
    title: 'WhatsApp & Shopify Automation Playbooks | Cart Recovery Blog',
    description:
      'Practical guides on WhatsApp automation, Shopify cart recovery, COD confirmations, Meta templates, and ecommerce messaging for Indian D2C operators.',
    keywords:
      'WhatsApp automation guide, Shopify cart recovery blog, ecommerce WhatsApp playbook India, COD WhatsApp tips',
    path: '/blog',
  },
  about: {
    title: 'About TopEdge | WhatsApp Growth OS for Shopify Ecommerce',
    description:
      'Why we built TopEdge: one workspace for Shopify data, Meta WhatsApp templates, cart recovery journeys, AI, and human handoff for Indian ecommerce brands.',
    keywords:
      'TopEdge AI company, WhatsApp Shopify platform India, ecommerce automation company',
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
  testimonials: {
    title: 'Testimonials | Shopify WhatsApp Automation & Cart Recovery',
    description:
      'What Indian D2C teams say about TopEdge — WhatsApp cart recovery, Live Chat with order context, and Meta template workflows on Shopify.',
    keywords:
      'WhatsApp Shopify reviews, cart recovery software testimonials India',
    path: '/testimonials',
  },
} as const satisfies Record<string, PageSeoEntry>;

export const FEATURE_SEO: Record<string, { title: string; description: string; keywords: string }> = {
  shopify: {
    title: 'Shopify WhatsApp Integration | Store Sync for Ecommerce Automation',
    description:
      'Connect Shopify to WhatsApp automation. Sync products, carts, orders, and COD status so cart recovery and Live Chat always use live store data.',
    keywords: 'Shopify WhatsApp integration, Shopify ecommerce automation, Shopify cart sync WhatsApp',
  },
  journeys: {
    title: 'WhatsApp Cart Recovery Journeys | Abandoned Cart Automation for Shopify',
    description:
      'Visual journey builder for WhatsApp abandoned cart recovery, COD confirmations, and post-purchase ecommerce automation on Shopify — Meta-approved sends only.',
    keywords: 'WhatsApp cart recovery, abandoned cart recovery WhatsApp, Shopify journey automation, COD WhatsApp flow',
  },
  'live-chat': {
    title: 'WhatsApp Shared Inbox for Shopify | Live Chat with Order Context',
    description:
      'Unified WhatsApp and Instagram inbox with Shopify order context. Agents recover carts, confirm COD, and hand off AI without leaving the thread.',
    keywords: 'WhatsApp shared inbox Shopify, ecommerce live chat WhatsApp, WhatsApp customer support Shopify',
  },
  'flow-builder': {
    title: 'WhatsApp Flow Builder for Ecommerce | AI-Drafted Chat Flows',
    description:
      'Build WhatsApp chatbot flows for Shopify ecommerce — menus, catalog sends, COD FAQs, and human handoff. AI drafts the canvas; you edit and publish.',
    keywords: 'WhatsApp flow builder, WhatsApp chatbot for ecommerce, Shopify chatbot builder',
  },
  'ai-brain': {
    title: 'AI WhatsApp Chatbot for Shopify | Catalog-Grounded Answers',
    description:
      'AI Brain answers WhatsApp shoppers using live Shopify SKUs and ₹ prices — ecommerce automation that stays honest to your catalog.',
    keywords: 'AI WhatsApp chatbot Shopify, ecommerce AI chatbot India, catalog WhatsApp AI',
  },
  campaigns: {
    title: 'WhatsApp Marketing Campaigns for Shopify | Meta-Safe Broadcasts',
    description:
      'Run WhatsApp marketing campaigns on Shopify audiences with Meta-approved templates — drops, restocks, and ecommerce promotions without spam risk.',
    keywords: 'WhatsApp marketing Shopify, WhatsApp broadcast ecommerce, Meta template campaigns India',
  },
  instagram: {
    title: 'Instagram to WhatsApp Automation | Comment-to-DM for Shopify',
    description:
      'Turn Instagram comments and stories into WhatsApp DMs connected to Shopify — ecommerce automation for “price please?” and drop traffic.',
    keywords: 'Instagram WhatsApp automation, comment to DM Shopify, IG automation ecommerce',
  },
  analytics: {
    title: 'WhatsApp Ecommerce Analytics | Cart Recovery & Campaign ROI',
    description:
      'Track WhatsApp automation that matters: sent, read, clicked, paid. Measure cart recovery ₹ and campaign ROI for Shopify India brands.',
    keywords: 'WhatsApp analytics Shopify, cart recovery ROI, ecommerce WhatsApp metrics',
  },
  'meta-manager': {
    title: 'Meta WhatsApp Template Manager | Cloud API for Shopify Brands',
    description:
      'Submit, track, and approve Meta WhatsApp templates for ecommerce automation — utility and marketing categories with transparent rates.',
    keywords: 'Meta WhatsApp template manager, WhatsApp Cloud API Shopify, Meta template approval India',
  },
  'audience-crm': {
    title: 'WhatsApp Audience CRM for Shopify | Segments & Lead Scoring',
    description:
      'Segment Shopify customers for WhatsApp automation — cart abandoners, COD buyers, VIPs — and score leads for personalized ecommerce messaging.',
    keywords: 'WhatsApp CRM Shopify, ecommerce audience segmentation, WhatsApp lead scoring',
  },
  'chat-rules': {
    title: 'WhatsApp Chat Rules for Ecommerce | Auto-Route & Assign',
    description:
      'Route WhatsApp conversations for Shopify teams — rules for tags, assignments, and handoff so ecommerce support stays fast and organized.',
    keywords: 'WhatsApp chat rules, ecommerce inbox routing, WhatsApp assignment Shopify',
  },
};

export const SOLUTION_SEO: Record<
  string,
  { title: string; description: string; keywords: string; body: string; bullets: string[]; scene: 'journey' | 'inbox' | 'campaigns' }
> = {
  fashion: {
    title: 'WhatsApp Automation for Fashion Shopify Stores | Cart & Size Recovery',
    description:
      'WhatsApp cart recovery, size/variant messaging, and COD confirmations for fashion & apparel brands on Shopify India.',
    keywords: 'fashion WhatsApp automation, apparel cart recovery Shopify, size exchange WhatsApp',
    body: 'Size exchanges, COD confirmations, and abandoned cart recovery on WhatsApp — with Shopify order context in every thread.',
    bullets: [
      'Cart recovery with size/variant aware copy',
      'Live Chat beside order # and COD status',
      'Campaigns for drop weekends — Meta-approved only',
    ],
    scene: 'inbox',
  },
  beauty: {
    title: 'WhatsApp Automation for Beauty & Skincare Shopify Brands',
    description:
      'Catalog-grounded WhatsApp answers, serum cart recovery, and ecommerce journeys tuned for beauty D2C on Shopify India.',
    keywords: 'beauty WhatsApp automation, skincare cart recovery, Shopify beauty chatbot',
    body: 'Catalog-grounded answers, product cart recovery, and journeys that respect Indian COD habits for beauty & skincare.',
    bullets: [
      'AI Brain cites live SKUs and ₹ prices',
      '3-message recovery with product cards',
      'IG comment → DM for “price please?”',
    ],
    scene: 'journey',
  },
  food: {
    title: 'WhatsApp Automation for Food & Beverage Shopify Brands',
    description:
      'Order updates, reorder campaigns, and WhatsApp ecommerce automation for food & beverage Shopify stores in India.',
    keywords: 'food Shopify WhatsApp automation, F&B cart recovery, reorder WhatsApp campaigns',
    body: 'Reorder nudges, delivery updates, and WhatsApp campaigns for food & beverage brands — synced to Shopify orders.',
    bullets: [
      'Order and delivery alerts on WhatsApp',
      'Reorder journeys from purchase history',
      'Campaigns for drops and festive menus',
    ],
    scene: 'campaigns',
  },
  cod: {
    title: 'COD Confirmation on WhatsApp | Reduce RTO for Shopify India',
    description:
      'Confirm COD orders on WhatsApp, cut RTO risk, and run honest cart recovery — utility templates plus operator takeover for Shopify D2C.',
    keywords: 'COD confirmation WhatsApp, reduce RTO Shopify, COD WhatsApp automation India',
    body: 'Confirm COD, reduce RTO risk, and keep recovery honest — utility templates, clear status, operator takeover.',
    bullets: [
      'COD conditions inside Journey canvas',
      'Inbox shows COD pending beside the thread',
      'Transparent Meta utility rates on pricing',
    ],
    scene: 'campaigns',
  },
  agencies: {
    title: 'WhatsApp Ecommerce Automation for Agencies | Multi-Store Shopify',
    description:
      'Standardize WhatsApp cart recovery and Meta campaigns across Shopify client brands — agency-ready ecommerce automation in India.',
    keywords: 'WhatsApp agency ecommerce, multi-store Shopify WhatsApp, agency cart recovery tools',
    body: 'Operate WhatsApp growth for the brands you manage — recovery, inbox, and Meta-safe campaigns without rebuilding each time.',
    bullets: [
      'Playbooks you reuse across client stores',
      'Template hygiene and approval tracking',
      'Shared inbox patterns for agency teams',
    ],
    scene: 'journey',
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
    sameAs: ['https://www.linkedin.com/company/topedgeai', 'https://twitter.com/topedgeai'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'contact@topedgeai.com',
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
    description:
      'WhatsApp automation for Shopify: abandoned cart recovery, COD confirmations, Live Chat, journeys, and Meta Cloud API campaigns for Indian ecommerce.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      description: '14-day free trial',
      url: `${SITE_URL}/pricing`,
    },
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

export function webPageJsonLd(opts: { name: string; description: string; path: string }) {
  const url = `${SITE_URL}${opts.path === '/' ? '' : opts.path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.name,
    description: opts.description,
    url,
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
