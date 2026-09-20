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
      'Transparent pricing for Shopify WhatsApp automation, cart recovery, journeys, Live Chat, and Meta Cloud API pass-through. 14-day free trial. GST invoices included.',
    keywords:
      'WhatsApp automation pricing, Shopify WhatsApp pricing, ecommerce automation cost India, cart recovery software pricing',
    path: '/pricing',
  },
  features: {
    title: 'Shopify WhatsApp Features | Journeys, AI, Pixel & Profit',
    description:
      'Explore TopEdge for Shopify India: WhatsApp journeys, Live Chat, AI Brain, Flow Builder, tracking pixel, opt-in tools, Profit & costs, campaigns, Instagram, and Meta templates.',
    keywords:
      'Shopify WhatsApp features, WhatsApp journeys India, AI Brain BYOK Shopify, tracking pixel WhatsApp, WhatsApp opt-in Shopify, Profit and costs ecommerce, Live Chat Shopify WhatsApp',
    path: '/features',
  },
  integrations: {
    title: 'Shopify & Meta WhatsApp Integrations | Ecommerce Automation Stack',
    description:
      'Connect Shopify OAuth and Meta WhatsApp Cloud API in one workspace. Sync carts, orders, and catalogs, run WhatsApp automation without duct-taping tools.',
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
      'Run WhatsApp automation for multiple Shopify brands, standardized cart recovery, template hygiene, Live Chat, and Meta-safe campaigns without rebuilding each time.',
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
      'Compare TopEdge vs WATI, AiSensy, Interakt, and Bitespeed for Shopify WhatsApp automation in India, Meta markup, AI cost, COD → prepaid, unified identity, INR pricing, and chatflow limits.',
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
      'What Indian D2C teams say about TopEdge, WhatsApp cart recovery, Live Chat with order context, and Meta template workflows on Shopify.',
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
    title: 'WhatsApp Journey Builder for Shopify | Cart, COD & Order Automation',
    description:
      'Visual WhatsApp journeys for Shopify India: drag-and-drop canvas, pre-built cart recovery and COD templates, Meta APPROVED gating, and recovered-revenue attribution, not vanity sends.',
    keywords:
      'WhatsApp journey builder Shopify, abandoned cart recovery WhatsApp India, COD confirmation journey, Meta template approval automation, Shopify order WhatsApp flows',
  },
  'live-chat': {
    title: 'WhatsApp Live Chat for Shopify | Shared Inbox with Order Context',
    description:
      'Unified WhatsApp and Instagram Live Chat for Shopify, Customer 360 shows order #, COD status, LTV, and cart history so agents recover and support without leaving the thread.',
    keywords:
      'WhatsApp Live Chat Shopify, shared inbox WhatsApp Instagram, ecommerce customer support WhatsApp India, order context inbox Shopify',
  },
  'flow-builder': {
    title: 'WhatsApp Flow Builder for Shopify | AI-Drafted Ecommerce Chatbots',
    description:
      'Describe your niche and goals, TopEdge AI drafts a WhatsApp flow canvas you edit node-by-node: menus, catalog sends, COD FAQs, conditions, and human handoff into Live Chat.',
    keywords:
      'WhatsApp flow builder Shopify, AI chatbot builder ecommerce India, WhatsApp catalog send flow, Shopify chatbot without code',
  },
  'ai-brain': {
    title: 'AI Brain for Shopify WhatsApp | BYOK OpenAI, Claude & Store Knowledge',
    description:
      'TopEdge AI Brain: bring your own OpenAI or Claude key, ground WhatsApp replies in catalog and policies, set bot persona, and use Intent Detect so you only spend tokens on hard questions.',
    keywords:
      'AI Brain WhatsApp Shopify, BYOK OpenAI Claude ecommerce India, store knowledge WhatsApp AI, bring your own API key chatbot, catalog-grounded WhatsApp replies',
  },
  campaigns: {
    title: 'WhatsApp Campaigns for Shopify India | Meta-Safe Audience Broadcasts',
    description:
      'Run WhatsApp marketing campaigns on Shopify with behavior segments, APPROVED marketing templates only, transparent Meta category rates, and cost clarity before you hit send.',
    keywords:
      'WhatsApp campaigns Shopify India, Meta-safe WhatsApp broadcast, WhatsApp marketing template campaigns, audience campaign ROI ecommerce',
  },
  instagram: {
    title: 'Instagram Automation for Shopify | Comment & Story to WhatsApp DM',
    description:
      'Turn Instagram comments and story mentions into WhatsApp or IG DMs for Shopify brands, capture “price please?” interest, then continue in Live Chat with order context.',
    keywords:
      'Instagram WhatsApp automation Shopify, comment to DM ecommerce India, Instagram story reply WhatsApp, IG automation D2C',
  },
  analytics: {
    title: 'Tracking Pixel for Shopify WhatsApp | Website Intent → Chat',
    description:
      'TopEdge Tracking Pixel: install via Shopify theme app embed, match product and cart intent to WhatsApp outreach, fire consent-aware events, and monitor pixel health, not a vanity sent→read funnel.',
    keywords:
      'Shopify tracking pixel WhatsApp, website intent WhatsApp automation India, theme app embed tracking pixel, product view cart intent WhatsApp',
  },
  'meta-manager': {
    title: 'Meta Manager for Shopify WhatsApp | Templates, Catalog & QR',
    description:
      'Submit, sync, and approve Meta WhatsApp templates for Shopify ecommerce, utility and marketing categories, catalog tools, QR deep links, and nothing broadcasts until APPROVED.',
    keywords:
      'Meta WhatsApp template manager Shopify, WhatsApp Cloud API India, Meta template approval ecommerce, WhatsApp catalog QR Shopify',
  },
  'audience-crm': {
    title: 'Audience CRM for Shopify WhatsApp | Segments, Scores & Cart Leads',
    description:
      'WhatsApp Audience CRM for Shopify: unified contact timeline, waterfall interest scores, abandoned-cart leads, and campaign-ready segments from real Shopify + WhatsApp behavior.',
    keywords:
      'WhatsApp Audience CRM Shopify, ecommerce lead scoring India, abandoned cart leads WhatsApp, Shopify customer segments WhatsApp',
  },
  'chat-rules': {
    title: 'WhatsApp Chat Rules for Shopify | Auto-Route, Tag & Assign',
    description:
      'Smart chat rules for Shopify Live Chat, keyword and intent routing, COD escalation, VIP priority, and assignment so volume spikes stay organized while AI pauses on takeover.',
    keywords:
      'WhatsApp chat rules Shopify, ecommerce inbox routing India, WhatsApp auto assign, COD keyword routing WhatsApp',
  },
  warranty: {
    title: 'WhatsApp Warranty for Shopify | Digital Hub, Queue & Assign',
    description:
      'Digital warranty workspace for Shopify brands, hub list with status badges, visible unassigned queue, and manual assign to the right order or teammate on WhatsApp.',
    keywords:
      'WhatsApp warranty Shopify India, digital warranty ecommerce, warranty assignment WhatsApp, Shopify warranty hub',
  },
  'opt-in-tools': {
    title: 'WhatsApp Opt-in Tools for Shopify | Popup, Spin Wheel & Widget',
    description:
      'Capture consented WhatsApp numbers on Shopify with Pulse Drop, welcome popup, spin wheel, mystery discount, and chat widget, then run campaigns and journeys from one subscriber list.',
    keywords:
      'WhatsApp opt-in Shopify India, WhatsApp popup spin wheel, Pulse Drop WhatsApp, WhatsApp widget Shopify, consented subscriber list WhatsApp',
  },
  'profit-loss': {
    title: 'Profit & Costs for Shopify India | COGS, COD, RTO & Net Profit',
    description:
      'TopEdge Profit & costs: India-aware COGS, packaging, payment fees, COD, RTO, and ads, true net profit with a cost waterfall and product margins, not vanity revenue.',
    keywords:
      'Shopify Profit and costs India, ecommerce COGS RTO analytics, COD net profit Shopify, D2C true margin WhatsApp, Shopify cost waterfall',
  },
  byok: {
    title: 'BYOK WhatsApp AI for Shopify | See AI Brain',
    description:
      'Bring-your-own-key WhatsApp AI lives in TopEdge AI Brain, connect OpenAI or Claude, ground replies in store knowledge, and pay your provider directly. Same product as /features/ai-brain.',
    keywords:
      'BYOK WhatsApp AI Shopify, bring your own OpenAI key ecommerce, AI Brain TopEdge, Gemini Claude WhatsApp chatbot India',
  },
  'intent-detection': {
    title: 'WhatsApp Intent Detection for Shopify | Route Without AI Waste',
    description:
      'Algorithmic intent detection for Shopify WhatsApp, match shipping, returns, COD, and handoff phrases to the right flow so you save AI tokens for hard catalog questions.',
    keywords:
      'WhatsApp intent detection Shopify, chatbot intent routing India, ecommerce chat intent without AI waste, COD shipping intent WhatsApp',
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
      'Campaigns for drop weekends, Meta-approved only',
    ],
    scene: 'inbox',
  },
  beauty: {
    title: 'WhatsApp Automation for Beauty & Skincare Shopify Brands | India',
    description:
      'TopEdge helps beauty and skincare Shopify brands recover abandoned carts, answer with live catalog SKUs, capture opt-ins, and confirm COD on WhatsApp, Meta-safe for India D2C.',
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
    body: 'Confirm COD, nudge prepaid, and keep RTO risk out of the courier bag, with journeys and Live Chat.',
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
      'TopEdge helps electronics & gadget brands on Shopify India assign warranties on WhatsApp, support with order + SKU context, and recover high-AOV abandoned carts, Meta-safe.',
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
      'Standardize WhatsApp cart recovery and Meta campaigns across Shopify client brands, agency-ready ecommerce automation in India.',
    keywords: 'WhatsApp agency ecommerce, multi-store Shopify WhatsApp, agency cart recovery tools',
    body: 'Operate WhatsApp growth for the brands you manage, recovery, inbox, and Meta-safe campaigns without rebuilding each time.',
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
