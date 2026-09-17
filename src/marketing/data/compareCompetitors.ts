export type CompareCell = 'yes' | 'no' | 'partial' | string;

export type CompareRow = {
  label: string;
  topedge: CompareCell;
  competitor: CompareCell;
};

export type CompetitorPlan = {
  name: string;
  price: string;
  note?: string;
  highlights: string[];
  popular?: boolean;
};

export type CompareCompetitor = {
  slug: string;
  name: string;
  shortName: string;
  website: string;
  logo: string;
  logoAlt: string;
  accent: string;
  title: string;
  description: string;
  keywords: string;
  h1: string;
  subtitle: string;
  /** GEO / AI-answer block — concise verdict */
  answerFirst: string;
  whoForTopEdge: string;
  whoForCompetitor: string;
  positioning: string;
  differentiators: { title: string; body: string }[];
  matrix: CompareRow[];
  competitorPlans: CompetitorPlan[];
  topedgePlansNote: string;
  pricingCaveat: string;
  faqs: { question: string; answer: string }[];
  related: { label: string; href: string }[];
};

/** TopEdge public plans (marketing catalog — monthly labels). */
export const TOPEDGE_PLANS_SUMMARY = [
  {
    name: 'Launch',
    price: '₹1,999/mo',
    note: '100 orders · 3k campaign sends',
    highlights: ['Abandoned cart recovery', 'COD tools', 'Live Chat + CRM', 'Meta templates'],
  },
  {
    name: 'Growth',
    price: '₹3,999/mo',
    note: '800 orders · 15k campaign sends',
    highlights: ['Journey branching', 'COD → prepaid', 'Priority send', 'Most popular'],
    popular: true,
  },
  {
    name: 'Scale',
    price: '₹6,499/mo',
    note: '1,500 orders · 30k campaign sends',
    highlights: ['Highest send priority', 'Larger volume', 'Same core stack', 'Team-ready'],
  },
] as const;

const SHARED_MATRIX_BASE: Omit<CompareRow, 'competitor'>[] = [
  { label: 'Shopify-native sync (orders, carts, catalog)', topedge: 'yes' },
  { label: 'Abandoned cart recovery journeys', topedge: 'yes' },
  { label: 'COD confirmation / COD → prepaid flows', topedge: 'yes' },
  { label: 'Shared team inbox with order context', topedge: 'yes' },
  { label: 'Meta Cloud API templates + approval gates', topedge: 'yes' },
  { label: 'Audience segments & Meta-safe broadcasts', topedge: 'yes' },
  { label: 'Opt-in popup / number capture', topedge: 'yes' },
  { label: 'Website tracking pixel ↔ WhatsApp', topedge: 'yes' },
  { label: 'Transparent Meta rate pass-through', topedge: 'yes' },
  { label: 'India D2C / ₹-first pricing', topedge: 'yes' },
];

export const COMPARE_COMPETITORS: Record<string, CompareCompetitor> = {
  wati: {
    slug: 'wati',
    name: 'WATI',
    shortName: 'WATI',
    website: 'https://www.wati.io',
    logo: '/marketing/compare/compare-logo-wati.png',
    logoAlt: 'WATI logo',
    accent: '#0d9488',
    title: 'TopEdge vs WATI (2026) | Shopify WhatsApp Automation for India',
    description:
      'Compare TopEdge vs WATI for Shopify India: cart recovery, COD confirmation, shared inbox with order context, Meta templates, and plan pricing. See which WhatsApp automation platform fits D2C ecommerce.',
    keywords:
      'TopEdge vs WATI, WATI alternative India, WATI vs TopEdge Shopify, WhatsApp cart recovery Shopify India, COD confirmation WhatsApp, WATI pricing India, best WhatsApp automation for Shopify D2C',
    h1: 'TopEdge vs WATI',
    subtitle:
      'WATI is a full WhatsApp Business API BSP with inbox, campaigns, and chatbots. TopEdge is a Shopify-first WhatsApp growth OS for Indian ecommerce — cart recovery, COD, and order-aware support.',
    answerFirst:
      'Choose TopEdge over WATI when your primary job is Shopify cart recovery, COD confirmation, and a shared inbox tied to live orders — not a general-purpose BSP for broadcasts and multi-channel chat. Choose WATI when you need a broad WhatsApp BSP (CTWA, multi-number, Instagram/FB inbox) and Shopify is only one of many channels.',
    whoForTopEdge:
      'Shopify D2C brands in India that live in abandoned carts, COD RTO, and support tickets with order # context.',
    whoForCompetitor:
      'Teams that want a general WhatsApp BSP — campaigns, CTWA, chatbots, and omnichannel inbox — with Shopify as an add-on.',
    positioning:
      'WATI competes as a WhatsApp Business Solution Provider. TopEdge competes as ecommerce WhatsApp automation for Shopify India. Overlap exists on inbox and broadcasts; the gap is how deeply Shopify events drive journeys and recovery math.',
    differentiators: [
      {
        title: 'Shopify events drive journeys',
        body: 'Abandoned carts, COD status, and order updates trigger TopEdge flows — not only contact lists and manual campaigns.',
      },
      {
        title: 'Recovery ₹ you can show finance',
        body: 'Track sent → paid recovery alongside transparent Meta pass-through rates on TopEdge pricing.',
      },
      {
        title: 'Template gates before send',
        body: 'Journeys wait for Meta APPROVED templates — built for teams burned by accidental draft sends.',
      },
      {
        title: 'Order-aware Live Chat',
        body: 'Agents see Shopify order context beside the thread so WISMO and COD chats resolve faster.',
      },
    ],
    matrix: SHARED_MATRIX_BASE.map((row) => {
      const map: Record<string, CompareCell> = {
        'Shopify-native sync (orders, carts, catalog)': 'partial',
        'Abandoned cart recovery journeys': 'partial',
        'COD confirmation / COD → prepaid flows': 'partial',
        'Shared team inbox with order context': 'partial',
        'Meta Cloud API templates + approval gates': 'yes',
        'Audience segments & Meta-safe broadcasts': 'yes',
        'Opt-in popup / number capture': 'partial',
        'Website tracking pixel ↔ WhatsApp': 'no',
        'Transparent Meta rate pass-through': 'yes',
        'India D2C / ₹-first pricing': 'yes',
      };
      return { ...row, competitor: map[row.label] ?? 'partial' };
    }),
    competitorPlans: [
      {
        name: 'Pay-as-you-go',
        price: '₹999 credits',
        note: 'India-only · no recurring platform fee',
        highlights: ['1 user', 'Marketing sends focus', 'Limited automation', '90-day credit validity'],
      },
      {
        name: 'Growth',
        price: '~₹2,499/mo',
        note: 'Plus Meta message charges',
        highlights: ['Multi-user inbox', 'Campaigns', 'Shopify commerce add-on', 'Basic automation'],
        popular: true,
      },
      {
        name: 'Pro / Business',
        price: '~₹5,999–₹16,999/mo',
        note: 'Higher automation & AI tiers',
        highlights: ['Advanced automation', 'AI agents', 'More integrations', 'Priority support'],
      },
    ],
    topedgePlansNote:
      'TopEdge Launch / Growth / Scale are priced for Shopify order volume — Meta template fees pass through separately.',
    pricingCaveat:
      'Competitor plan prices change often and may differ by region, billing cycle, and add-ons. Verify on wati.io. Meta WhatsApp fees apply on both platforms.',
    faqs: [
      {
        question: 'Is TopEdge a WATI alternative for Shopify brands?',
        answer:
          'Yes for Shopify-first Indian D2C teams that need cart recovery, COD workflows, and order-aware WhatsApp support. If you need a general BSP with CTWA and multi-channel social inbox first, WATI may fit better.',
      },
      {
        question: 'Does WATI support Shopify abandoned cart?',
        answer:
          'WATI offers Shopify/commerce tooling on higher plans (often with a Shopify connection fee). TopEdge treats cart recovery and COD as core journeys on every plan tier.',
      },
      {
        question: 'Who pays Meta WhatsApp charges?',
        answer:
          'On both TopEdge and WATI, Meta message/template fees are typically billed separately from the platform subscription. TopEdge shows transparent pass-through rates on pricing.',
      },
      {
        question: 'Can I migrate from WATI to TopEdge?',
        answer:
          'Most teams reconnect Shopify + Meta Cloud API, re-approve key templates, and republish recovery journeys. Contact TopEdge for a guided cutover.',
      },
    ],
    related: [
      { label: 'All comparisons', href: '/compare' },
      { label: 'Cart recovery', href: '/whatsapp-cart-recovery' },
      { label: 'TopEdge pricing', href: '/pricing' },
      { label: 'vs Interakt', href: '/compare/interakt' },
    ],
  },

  interakt: {
    slug: 'interakt',
    name: 'Interakt',
    shortName: 'Interakt',
    website: 'https://www.interakt.shop',
    logo: '/marketing/compare/compare-logo-interakt.png',
    logoAlt: 'Interakt logo',
    accent: '#7c3aed',
    title: 'TopEdge vs Interakt (2026) | Best Shopify WhatsApp App for India D2C',
    description:
      'TopEdge vs Interakt for Shopify WhatsApp marketing: abandoned cart recovery, COD confirmation, shared inbox, AI, and plan pricing. Compare which tool fits Indian ecommerce automation.',
    keywords:
      'TopEdge vs Interakt, Interakt alternative Shopify, Interakt vs TopEdge, WhatsApp marketing Shopify India, abandoned cart WhatsApp Interakt, COD confirmation WhatsApp, Interakt pricing',
    h1: 'TopEdge vs Interakt',
    subtitle:
      'Interakt is a popular Shopify WhatsApp marketing & sales app. TopEdge is an operator-grade WhatsApp growth OS — journeys with Meta gates, COD branching, and Live Chat with Shopify order context.',
    answerFirst:
      'Choose TopEdge when you need deep cart-recovery journeys, COD → prepaid branching, template approval gates, and a shared inbox tied to Shopify orders. Choose Interakt when you want a Shopify App Store WhatsApp suite for catalogs, notifications, broadcasts, and chatbots with familiar USD/INR app billing.',
    whoForTopEdge:
      'Founders and ops leads who measure recovery ₹, RTO, and support SLAs — and need journeys that will not send until Meta templates are approved.',
    whoForCompetitor:
      'Merchants who want a Shopify-listed WhatsApp app for catalog sync, notifications, bulk campaigns, and chatbot flows quickly from the App Store.',
    positioning:
      'Both target Shopify + WhatsApp in India. Interakt is strong as a Shopify WhatsApp app for sales/notifications. TopEdge emphasizes journey canvas, COD-first ecommerce ops, and recovery analytics.',
    differentiators: [
      {
        title: 'Journey canvas with Meta gates',
        body: 'Visual journeys refuse customer sends until templates are APPROVED — reduces accidental non-compliant messaging.',
      },
      {
        title: 'COD-first branching',
        body: 'Confirm COD, nudge prepaid, and cut RTO with flows designed for Indian checkout reality.',
      },
      {
        title: 'Catalog-grounded answers',
        body: 'AI can cite live Shopify SKUs and ₹ prices, then hand off to humans with full thread context.',
      },
      {
        title: 'Order-volume pricing',
        body: 'TopEdge tiers map to Shopify orders processed — easier for finance than opaque conversation packs alone.',
      },
    ],
    matrix: SHARED_MATRIX_BASE.map((row) => {
      const map: Record<string, CompareCell> = {
        'Shopify-native sync (orders, carts, catalog)': 'yes',
        'Abandoned cart recovery journeys': 'yes',
        'COD confirmation / COD → prepaid flows': 'yes',
        'Shared team inbox with order context': 'partial',
        'Meta Cloud API templates + approval gates': 'partial',
        'Audience segments & Meta-safe broadcasts': 'yes',
        'Opt-in popup / number capture': 'yes',
        'Website tracking pixel ↔ WhatsApp': 'partial',
        'Transparent Meta rate pass-through': 'yes',
        'India D2C / ₹-first pricing': 'partial',
      };
      return { ...row, competitor: map[row.label] ?? 'partial' };
    }),
    competitorPlans: [
      {
        name: 'Starter',
        price: 'from ~$21/mo',
        note: 'Shopify App · + WhatsApp charges',
        highlights: ['API setup', 'Notifications', 'Shared inbox', 'WhatsApp widget'],
      },
      {
        name: 'Growth',
        price: 'from ~$41/mo',
        note: 'Popular Shopify tier',
        highlights: ['Analytics', 'Basic chatbot', 'Roles', 'Instagram automation'],
        popular: true,
      },
      {
        name: 'Advanced / Enterprise',
        price: 'from ~$51–$99/mo',
        note: 'Higher limits & AI agents',
        highlights: ['Advanced chatbot', 'Higher API rate', 'AI agents', 'Shopify workflow actions'],
      },
    ],
    topedgePlansNote:
      'TopEdge plans are INR and tied to Shopify order volume — compare total cost including Meta fees on both sides.',
    pricingCaveat:
      'Interakt lists USD Shopify App pricing and separate India website tiers; taxes and Meta conversation fees apply. Confirm current rates on interakt.shop and the Shopify App Store.',
    faqs: [
      {
        question: 'Is TopEdge an Interakt alternative?',
        answer:
          'Yes for brands prioritizing cart recovery journeys, COD RTO control, and Shopify order-aware support with Meta template hygiene. Interakt remains a strong choice as a Shopify App Store WhatsApp suite.',
      },
      {
        question: 'Does Interakt do abandoned cart and COD?',
        answer:
          'Yes — Interakt markets abandoned-cart reminders and COD confirmation. Compare journey depth, branching, analytics, and how inbox shows Shopify order context against TopEdge.',
      },
      {
        question: 'Which is cheaper — TopEdge or Interakt?',
        answer:
          'It depends on order volume, message mix (marketing vs utility), and add-ons. Model platform fee + Meta fees for your monthly sends; TopEdge publishes INR plan cards for Launch, Growth, and Scale.',
      },
      {
        question: 'Can agencies use TopEdge instead of Interakt?',
        answer:
          'TopEdge supports reusable recovery/COD playbooks across Shopify brands. Evaluate multi-store needs and onboarding with both vendors.',
      },
    ],
    related: [
      { label: 'All comparisons', href: '/compare' },
      { label: 'COD confirmation', href: '/cod-confirmation-whatsapp' },
      { label: 'TopEdge pricing', href: '/pricing' },
      { label: 'vs WATI', href: '/compare/wati' },
    ],
  },

  bitespeed: {
    slug: 'bitespeed',
    name: 'Bitespeed',
    shortName: 'Bitespeed',
    website: 'https://www.bitespeed.co',
    logo: '/marketing/compare/compare-logo-bitespeed.png',
    logoAlt: 'Bitespeed logo',
    accent: '#ea580c',
    title: 'TopEdge vs Bitespeed (2026) | WhatsApp Cart Recovery for Shopify India',
    description:
      'Compare TopEdge vs Bitespeed for Shopify WhatsApp automation: abandoned cart recovery, COD to prepaid, broadcasts, inbox, and pricing. Pick the right ecommerce WhatsApp stack for Indian D2C.',
    keywords:
      'TopEdge vs Bitespeed, Bitespeed alternative, Bitespeed vs TopEdge Shopify, WhatsApp cart recovery India, COD WhatsApp automation, Bitespeed pricing, ecommerce WhatsApp OS',
    h1: 'TopEdge vs Bitespeed',
    subtitle:
      'Bitespeed is an AI-native marketing/sales/support OS popular with Indian ecommerce — strong on WhatsApp recovery and omnichannel. TopEdge focuses on Shopify-native journeys, Meta template hygiene, and transparent INR pricing.',
    answerFirst:
      'Choose TopEdge when you want one Shopify-centric workspace for Meta-approved cart recovery, COD confirmation, and Live Chat with order context — at INR plan pricing tied to orders. Choose Bitespeed when you want a broader omnichannel ecommerce OS (WhatsApp + email/SMS/voice AI stacks) and are comfortable with higher USD plan floors.',
    whoForTopEdge:
      'Shopify India brands that want operator-simple recovery + COD + inbox without buying a full omnichannel marketing suite.',
    whoForCompetitor:
      'Growth teams that want WhatsApp plus omnichannel (email/SMS/push/voice) and white-glove ecommerce marketing programs.',
    positioning:
      'Both serve Indian ecommerce on WhatsApp. Bitespeed skews omnichannel growth OS; TopEdge skews Shopify WhatsApp automation with clear Meta gates and recovery analytics.',
    differentiators: [
      {
        title: 'Honest Meta messaging',
        body: 'Template statuses are first-class. Journeys wait for APPROVED before any customer send.',
      },
      {
        title: 'INR order-based plans',
        body: 'Launch / Growth / Scale map to Shopify orders — easier budgeting than high USD omnichannel floors for mid-market D2C.',
      },
      {
        title: 'Operator UX',
        body: 'Built for founders and support leads who live between Shopify admin and WhatsApp daily.',
      },
      {
        title: 'Free trial with real volume',
        body: 'Evaluate recovery and inbox on your catalog — not only a sales deck.',
      },
    ],
    matrix: SHARED_MATRIX_BASE.map((row) => {
      const map: Record<string, CompareCell> = {
        'Shopify-native sync (orders, carts, catalog)': 'yes',
        'Abandoned cart recovery journeys': 'yes',
        'COD confirmation / COD → prepaid flows': 'yes',
        'Shared team inbox with order context': 'yes',
        'Meta Cloud API templates + approval gates': 'partial',
        'Audience segments & Meta-safe broadcasts': 'yes',
        'Opt-in popup / number capture': 'yes',
        'Website tracking pixel ↔ WhatsApp': 'partial',
        'Transparent Meta rate pass-through': 'partial',
        'India D2C / ₹-first pricing': 'partial',
      };
      return { ...row, competitor: map[row.label] ?? 'partial' };
    }),
    competitorPlans: [
      {
        name: 'WhatsApp Stack',
        price: 'from ~$250/mo',
        note: '+ Meta conversations',
        highlights: ['WhatsApp marketing', 'Chatbots', 'Support inbox', 'Onboarding'],
        popular: true,
      },
      {
        name: 'Omnichannel Starter',
        price: 'from ~$350/mo',
        note: 'Email + SMS + WhatsApp + push',
        highlights: ['Omnichannel marketing', 'Chatbots', 'IG automation', 'Free email credits'],
      },
      {
        name: 'Omnichannel Full Stack',
        price: 'from ~$500/mo',
        note: 'Dedicated success + higher email',
        highlights: ['Full omnichannel', 'Dedicated AM', 'Higher email volume', 'Scale programs'],
      },
    ],
    topedgePlansNote:
      'TopEdge starts at ₹1,999/mo (Launch) for Shopify WhatsApp automation — compare scope before sticker price.',
    pricingCaveat:
      'Bitespeed public plan floors are often listed in USD and change by package; Shopify app may show “free to install” with usage/subscription after trial. Verify on bitespeed.co. Meta fees apply on both.',
    faqs: [
      {
        question: 'Who should choose TopEdge over Bitespeed?',
        answer:
          'Shopify D2C teams that want cart recovery + COD + shared inbox in one Meta-safe product with transparent INR pricing — without committing to a full omnichannel marketing OS.',
      },
      {
        question: 'Does Bitespeed do cart recovery and COD?',
        answer:
          'Yes — Bitespeed is known for abandoned cart, COD conversion, broadcasts, and support inbox on WhatsApp. Compare journey controls, Meta template workflows, and total cost of ownership.',
      },
      {
        question: 'Is Bitespeed more expensive than TopEdge?',
        answer:
          'Published omnichannel/WhatsApp stack floors are often higher in USD than TopEdge’s INR Launch/Growth/Scale cards. Always model Meta fees and the channels you actually need.',
      },
      {
        question: 'Can TopEdge replace an omnichannel stack?',
        answer:
          'TopEdge focuses on WhatsApp + Shopify. If you need email/SMS/voice AI in one vendor, evaluate Bitespeed’s omnichannel tiers or pair TopEdge with your existing ESP.',
      },
    ],
    related: [
      { label: 'All comparisons', href: '/compare' },
      { label: 'Customers', href: '/customers' },
      { label: 'TopEdge pricing', href: '/pricing' },
      { label: 'vs Interakt', href: '/compare/interakt' },
    ],
  },
};

export function getCompareCompetitor(slug: string) {
  return COMPARE_COMPETITORS[slug] ?? null;
}

export function allCompareCompetitors() {
  return Object.values(COMPARE_COMPETITORS);
}
