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
  roi: {
    title: 'WhatsApp ROI Calculator for Shopify | Cart, COD, Campaigns',
    description:
      'Estimate full-stack WhatsApp ROI for Shopify India: abandoned cart recovery, COD/RTO savings, audience campaigns net of Meta, and support deflection — then see plan payback.',
    keywords:
      'WhatsApp ROI calculator Shopify, cart recovery ROI, COD RTO savings calculator, WhatsApp campaign ROI India',
    path: '/roi',
    noSuffix: true,
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
    title: 'TopEdge vs WATI, AiSensy, Interakt & Bitespeed | Shopify WhatsApp India',
    description:
      'Compare TopEdge vs WATI, AiSensy, Interakt, and Bitespeed for Shopify WhatsApp automation in India — Meta markup, AI cost, COD → prepaid, unified identity, INR pricing, and chatflow limits.',
    keywords:
      'TopEdge vs WATI, TopEdge vs AiSensy, TopEdge vs WATI vs AiSensy, TopEdge vs Interakt, TopEdge vs Bitespeed, WhatsApp template markup, COD prepaid WhatsApp comparison, WATI alternative India, AiSensy alternative Shopify',
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
      'Visual WhatsApp journey builder for Shopify: drag-and-drop canvas, pre-built cart and COD templates, Meta approval gating, and recovered-revenue attribution.',
    keywords:
      'WhatsApp cart recovery, abandoned cart recovery WhatsApp, Shopify journey automation, Meta template approval journeys, WhatsApp recovery revenue',
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
    title: 'WhatsApp AI on Your Own API Keys | TopEdge AI Brain for Shopify',
    description:
      'Connect OpenAI or Claude to TopEdge. Ground WhatsApp replies in your store knowledge and persona — Intent Detect saves tokens for hard questions.',
    keywords:
      'WhatsApp AI own API keys Shopify, BYOK OpenAI Claude ecommerce, store knowledge WhatsApp bot India',
  },
  campaigns: {
    title: 'WhatsApp Marketing Campaigns for Shopify | Meta-Safe Broadcasts',
    description:
      'WhatsApp audience campaigns for Shopify: behavior segments, Meta-safe frequency capping, lead scoring, and net-of-Meta cost reporting.',
    keywords:
      'WhatsApp marketing Shopify, WhatsApp broadcast ecommerce, Meta template campaigns India, WhatsApp campaign ROI',
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
      'TopEdge tracking pixel for Shopify: theme app embed install, product and cart intent matched to WhatsApp, consent-aware firing, and pixel health monitoring.',
    keywords:
      'WhatsApp analytics Shopify, website tracking pixel WhatsApp, Shopify theme app embed tracking, cart recovery ROI',
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
      'WhatsApp Audience CRM for Shopify: unified contact timeline, purchase-based lead scoring, in-product segments, and unlimited profiles on every plan.',
    keywords: 'WhatsApp CRM Shopify, ecommerce audience segmentation, WhatsApp lead scoring, Shopify customer timeline',
  },
  'chat-rules': {
    title: 'WhatsApp Chat Rules for Ecommerce | Auto-Route & Assign',
    description:
      'Route WhatsApp conversations for Shopify teams — rules for tags, assignments, and handoff so ecommerce support stays fast and organized.',
    keywords: 'WhatsApp chat rules, ecommerce inbox routing, WhatsApp assignment Shopify',
  },
  warranty: {
    title: 'WhatsApp Warranty for Shopify | Digital Warranty Assign',
    description:
      'Warranty workspace for Shopify brands — hub list with status badges, unassigned queue, and manual assign to orders or teammates.',
    keywords: 'WhatsApp warranty Shopify, digital warranty ecommerce India, warranty assignment WhatsApp',
  },
  'opt-in-tools': {
    title: 'WhatsApp Opt-in Tools for Shopify | Popup, Spin Wheel & VIP Drop',
    description:
      'Capture WhatsApp numbers on Shopify with Pulse Drop, welcome popup, spin wheel, mystery discount, and chat widget — then message consented subscribers with campaigns and journeys.',
    keywords:
      'WhatsApp opt-in Shopify, WhatsApp popup Shopify India, spin to win WhatsApp, WhatsApp widget Shopify, WhatsApp subscriber list',
  },
  'profit-loss': {
    title: 'Shopify P&L Analytics India | COGS, COD, RTO & Net Profit',
    description:
      'TopEdge Profit & costs for Shopify India: COGS, packaging, payment fees, COD RTO, marketing — true net profit with a cost waterfall and product margins.',
    keywords:
      'Shopify P&L India, ecommerce COGS RTO analytics, COD profit calculator Shopify, WhatsApp D2C net profit',
  },
  byok: {
    title: 'BYOK AI for WhatsApp Shopify | Bring Your Own Gemini or OpenAI Key',
    description:
      'Bring your own Gemini or OpenAI API key to TopEdge — activate WhatsApp AI on your bill, choose model, cap reply words, and track tokens and cost.',
    keywords: 'BYOK AI WhatsApp Shopify, bring your own OpenAI key ecommerce, Gemini WhatsApp chatbot India',
  },
  'intent-detection': {
    title: 'WhatsApp Intent Detection for Shopify | Chat Routing Without AI Waste',
    description:
      'Detect WhatsApp message intent and route Shopify ecommerce chatbots — algorithmic intent detection for better support.',
    keywords: 'WhatsApp intent detection, chatbot intent routing Shopify, ecommerce chat intent India',
  },
};

export const SOLUTION_SEO: Record<
  string,
  { title: string; description: string; keywords: string; body: string; bullets: string[]; scene: 'journey' | 'inbox' | 'campaigns' }
> = {
  fashion: {
    title: 'WhatsApp Automation for Fashion Shopify Stores | Cart, Size & COD',
    description:
      'TopEdge helps fashion & apparel brands on Shopify India recover abandoned carts with size/variant context, confirm COD to cut RTO, and run Meta-safe drop campaigns on WhatsApp.',
    keywords:
      'fashion WhatsApp automation Shopify, apparel cart recovery India, size exchange WhatsApp, COD confirmation fashion D2C',
    body: 'Size-aware cart recovery, COD confirmation, and order-aware support on WhatsApp for fashion Shopify brands.',
    bullets: [
      'Cart recovery with size/variant aware copy',
      'Live Chat beside order # and COD status',
      'Campaigns for drop weekends — Meta-approved only',
    ],
    scene: 'inbox',
  },
  beauty: {
    title: 'WhatsApp Automation for Beauty & Skincare Shopify Brands | India',
    description:
      'TopEdge helps beauty and skincare Shopify brands recover abandoned carts, answer with live catalog SKUs, capture opt-ins, and confirm COD on WhatsApp — Meta-safe for India D2C.',
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
    title: 'COD Confirmation on WhatsApp | Reduce RTO for Shopify India',
    description:
      'TopEdge helps COD-first Shopify brands confirm orders on WhatsApp, convert COD to prepaid, and cut RTO with Meta utility templates and operator takeover.',
    keywords:
      'COD confirmation WhatsApp, reduce RTO Shopify India, COD to prepaid WhatsApp, cash on delivery automation',
    body: 'Confirm COD, nudge prepaid, and keep RTO risk out of the courier bag — with journeys and Live Chat.',
    bullets: [
      'COD conditions inside Journey canvas',
      'Inbox shows COD pending beside the thread',
      'Transparent Meta utility rates on pricing',
    ],
    scene: 'campaigns',
  },
  electronics: {
    title: 'WhatsApp Automation for Electronics Shopify Brands | Warranty & Support',
    description:
      'TopEdge helps electronics & gadget brands on Shopify India assign warranties on WhatsApp, support with order + SKU context, and recover high-AOV abandoned carts — Meta-safe.',
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
