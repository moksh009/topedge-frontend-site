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

export type CompareScoreRow = {
  area: string;
  topedge: string;
  competitor: string;
  edge: 'TopEdge' | 'Competitor' | 'Even' | 'Trade-off';
};

export type CompareCompetitor = {
  slug: string;
  name: string;
  shortName: string;
  website: string;
  logo: string;
  logoAlt: string;
  accent: string;
  /** Short tag under competitor name in hero */
  brandTag?: string;
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
  /** Footnote under capability board (unverified / dated claims) */
  matrixNote?: string;
  /** Research freshness stamp shown in UI + copy */
  researchAsOf?: string;
  /** Optional honest scorecard beyond Yes/No */
  scorecard?: CompareScoreRow[];
  /** Short trade-off callouts */
  deepDives?: { title: string; body: string }[];
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
    brandTag: 'AI-agent omnichannel OS',
    title: 'TopEdge vs Bitespeed (2026) | Shopify WhatsApp App with INR Pricing',
    description:
      'TopEdge vs Bitespeed for Shopify India: cart recovery, COD, Meta-gated journeys, AI included vs $100 add-ons, and INR order-based pricing vs USD tiers. Research dated September 2026.',
    keywords:
      'TopEdge vs Bitespeed, Bitespeed alternative Shopify, Bitespeed pricing India, Shopify WhatsApp app INR pricing, Bitespeed vs TopEdge, cheapest Shopify WhatsApp cart recovery app India, Bitespeed AI add-on',
    h1: 'TopEdge vs Bitespeed',
    subtitle:
      'Bitespeed is a well-funded, AI-agent-led omnichannel platform — strong at WhatsApp, voice, email, and Instagram working together, with 6,000+ brands on it globally. TopEdge is built specifically for Shopify India D2C: order-based INR pricing, Meta-approval-gated sends, and one operator-simple workspace instead of a multi-channel OS.',
    answerFirst:
      'Choose TopEdge when you want Shopify India recovery, COD, and inbox on flat INR pricing tied to order volume — no custom quote, no USD floor, AI included in the base plan. Choose Bitespeed when you want WhatsApp plus voice, email, SMS, and Instagram AI agents in one platform and are comfortable with a ~$250+/month USD base (AI chatbot and AI marketing agents are paid add-ons on top).',
    whoForTopEdge:
      'Shopify India brands that want operator-simple recovery, COD, and inbox — flat INR pricing tied to your order volume, no custom quote, no USD floor.',
    whoForCompetitor:
      'Global or multi-channel brands that want WhatsApp plus voice, email, SMS, and Instagram AI agents in one platform, and are comfortable with a $250+/month USD base (AI chatbot and AI marketing agents are paid add-ons on top of that).',
    positioning:
      'Both serve ecommerce on WhatsApp. Bitespeed is an omnichannel growth OS (WhatsApp + email/SMS/voice/Instagram with AI-agent positioning). TopEdge is a Shopify-native WhatsApp workspace with Meta approval gates, INR order-based plans, and AI included — not a multi-channel OS.',
    researchAsOf: 'September 2026',
    differentiators: [
      {
        title: 'Meta-gated journeys',
        body: 'TopEdge journeys wait for Meta APPROVED template status before any customer send — enforced in the publish flow, not only in docs.',
      },
      {
        title: 'INR order-based plans',
        body: 'Launch ₹1,999 · Growth ₹3,999 · Scale ₹6,499 map to Shopify order volume. No USD floor and no custom-quote tier for mid-market D2C.',
      },
      {
        title: 'AI included in base',
        body: 'Intelligence hub intents and AI-assisted replies ship in the core product. Bitespeed’s AI chatbot and AI marketing agent are ~$100/mo add-ons each on top of the USD base plan (as of September 2026).',
      },
      {
        title: 'Operator-simple Shopify UX',
        body: 'Built for founders and support leads who live between Shopify admin and WhatsApp — not a full omnichannel marketing suite.',
      },
      {
        title: 'Transparent, all-in pricing',
        body: 'No custom quotes, no separate AI add-on fees, no USD conversion. What’s on the plans page is what you pay, in the currency you actually bill in.',
      },
    ],
    matrix: [
      { label: 'Shopify-native sync (orders, carts, catalog)', topedge: 'yes', competitor: 'yes' },
      { label: 'Abandoned cart recovery journeys', topedge: 'yes', competitor: 'yes' },
      {
        label: 'Browse-abandonment recovery',
        topedge: 'no',
        competitor: 'yes',
      },
      { label: 'COD confirmation / COD → prepaid flows', topedge: 'yes', competitor: 'yes' },
      { label: 'Shared team inbox with order context', topedge: 'yes', competitor: 'yes' },
      {
        label: 'Meta Cloud API templates + approval gates',
        topedge: 'yes',
        competitor: 'Not verified publicly',
      },
      { label: 'Audience segments & Meta-safe broadcasts', topedge: 'yes', competitor: 'yes' },
      { label: 'Opt-in popup / number capture', topedge: 'yes', competitor: 'yes' },
      {
        label: 'Website tracking pixel ↔ WhatsApp',
        topedge: 'yes',
        competitor: 'Not verified publicly',
      },
      {
        label: 'Transparent Meta rate pass-through',
        topedge: 'yes',
        competitor: 'Not verified publicly',
      },
      { label: 'Warranty management hub', topedge: 'yes', competitor: 'no' },
      { label: 'AI features included in base plan', topedge: 'yes', competitor: 'no' },
      { label: 'Pricing currency', topedge: 'INR', competitor: 'USD only' },
      {
        label: 'Pricing model',
        topedge: 'Flat · published · order-based',
        competitor: 'Tiered · custom at higher tiers',
      },
      { label: 'India D2C / ₹-first pricing', topedge: 'yes', competitor: 'no' },
    ],
    matrixNote:
      'As of September 2026. Rows marked “Not verified publicly” mean we could not independently confirm that capability from public Bitespeed docs or listings — we do not publish an unqualified Partial/Yes/No on those cells. Bitespeed Shopify App Store listing: “B: WhatsApp Chat, Abandon Cart,” ~4.6/5 across ~388 reviews, free to install. Verify live on bitespeed.co and the Shopify App Store.',
    scorecard: [
      {
        area: 'Cart recovery',
        topedge: 'Cart only, Shopify-native',
        competitor: 'Cart + browse abandonment',
        edge: 'Competitor',
      },
      {
        area: 'COD → Prepaid',
        topedge: 'Native, with order-linkage dedup',
        competitor: 'Supported',
        edge: 'Even',
      },
      {
        area: 'Journey / flow builder',
        topedge: 'Visual builder, plan-gated branching',
        competitor: 'Automation flows + AI agents (add-on)',
        edge: 'Trade-off',
      },
      {
        area: 'Meta template compliance',
        topedge: 'Publish blocked until APPROVED',
        competitor: 'Not independently verified',
        edge: 'TopEdge',
      },
      {
        area: 'Live chat / inbox',
        topedge: 'WhatsApp-only, order context',
        competitor: 'Omnichannel (WA / email / social / voice)',
        edge: 'Trade-off',
      },
      {
        area: 'AI chatbots',
        topedge: 'Included (Intelligence hub)',
        competitor: '+$100/mo add-on',
        edge: 'TopEdge',
      },
      {
        area: 'Instagram automation',
        topedge: 'Soon — not live',
        competitor: 'Live (bots + comment automation)',
        edge: 'Competitor',
      },
      {
        area: 'Website pixel tracking',
        topedge: 'Yes, Shopify-native',
        competitor: 'Not independently verified',
        edge: 'TopEdge',
      },
      {
        area: 'Warranty management',
        topedge: 'Native hub',
        competitor: 'Not found in public feature set',
        edge: 'TopEdge',
      },
      {
        area: 'Channel breadth',
        topedge: 'WhatsApp + Shopify-native',
        competitor: 'WhatsApp + email + SMS + voice + Instagram',
        edge: 'Trade-off',
      },
      {
        area: 'Pricing currency / model',
        topedge: 'Flat INR, order-based',
        competitor: 'USD, tiered + custom',
        edge: 'TopEdge',
      },
    ],
    deepDives: [
      {
        title: 'AI included vs $100/mo add-ons',
        body: 'As of September 2026, Bitespeed’s AI chatbot and AI marketing agent are ~$100/month add-ons each on top of the USD base plan — even though “AI-native” is central to their positioning. TopEdge includes Intelligence hub intents and AI-assisted replies in the core product. “AI included, not a $100/month add-on” is a short, factual differentiator.',
      },
      {
        title: 'Meta approval gates (TopEdge fact)',
        body: 'TopEdge journeys cannot go live sending a non-approved template — publish is gated on Meta APPROVED status. We state this as a fact about TopEdge’s implementation rather than an unverified claim that Bitespeed lacks the same control.',
      },
      {
        title: 'Cart vs browse abandonment',
        body: 'Bitespeed covers cart abandonment and browse abandonment. TopEdge ships Shopify-native cart recovery today. We do not claim parity on browse abandonment.',
      },
      {
        title: 'Omnichannel vs WhatsApp focus',
        body: 'Bitespeed’s unified inbox spans WhatsApp, email, Instagram/social, and voice. TopEdge is deliberately WhatsApp + Shopify-native. If support is already multi-channel, Bitespeed’s breadth is a real fit advantage; if volume is WhatsApp-first, TopEdge’s focus stays operator-simple.',
      },
      {
        title: 'Warranty hub',
        body: 'TopEdge includes a dedicated warranty claims hub. No equivalent warranty management feature was found in Bitespeed’s public materials as of September 2026.',
      },
    ],
    competitorPlans: [
      {
        name: 'WhatsApp Stack',
        price: 'from ~$250/mo',
        note: 'USD · entry tier · + Meta fees',
        highlights: ['WhatsApp marketing', 'Segmentation', 'Support inbox', 'AI chatbot is +$100/mo'],
        popular: true,
      },
      {
        name: 'Omnichannel Starter',
        price: 'from ~$350/mo',
        note: 'Adds email / SMS / push',
        highlights: ['Omnichannel marketing', 'IG automation', 'Support inbox', 'AI add-ons extra'],
      },
      {
        name: 'Omnichannel Full Stack',
        price: 'from ~$500/mo',
        note: 'Dedicated AM · higher email credits',
        highlights: [
          '~100k free emails/mo',
          'Dedicated Account Manager',
          'Instagram bots',
          'AI chatbot + marketing agent +$100/mo each',
        ],
      },
    ],
    topedgePlansNote:
      'TopEdge Launch ₹1,999 · Growth ₹3,999 · Scale ₹6,499 — flat INR, published, tied to Shopify order volume. AI included; Meta conversation fees pass through separately.',
    pricingCaveat:
      'Bitespeed plans (as of September 2026): WhatsApp Stack from ~$250/mo · Omnichannel Starter from ~$350/mo · Omnichannel Full Stack from ~$500/mo — plus ~$100/mo each for AI chatbot and AI marketing agent add-ons. USD-billed; Meta conversation fees apply on top. Shopify App Store listing may show “Free to install.” Verify current pricing on bitespeed.co — plans and structure have changed multiple times through 2025–2026.',
    faqs: [
      {
        question: 'Who should choose TopEdge over Bitespeed?',
        answer:
          'Shopify India D2C teams that want cart recovery, COD, and a shared inbox in one Meta-safe product with flat INR pricing tied to order volume — without committing to a full omnichannel marketing OS or USD plan floors.',
      },
      {
        question: 'Does Bitespeed do cart recovery and COD?',
        answer:
          'Yes. Bitespeed supports abandoned cart recovery (and browse abandonment), COD confirmation / COD-to-prepaid, broadcasts, and a support inbox. TopEdge focuses on Shopify-native cart recovery with Meta-gated journeys and order-aware Live Chat.',
      },
      {
        question: 'Is TopEdge cheaper than Bitespeed?',
        answer:
          'For many Shopify India mid-market brands, yes on platform fee alone: TopEdge publishes Launch ₹1,999, Growth ₹3,999, and Scale ₹6,499 (INR, order-based). Bitespeed’s published floors start around ~$250/mo USD for WhatsApp Stack, with AI chatbot and AI marketing agent at ~$100/mo each as add-ons (as of September 2026). Always model Meta conversation fees on both sides.',
      },
      {
        question: 'Does Bitespeed charge extra for AI features?',
        answer:
          'Yes. As of September 2026, AI chatbot and AI marketing agent capabilities are ~$100/month add-ons on top of the base WhatsApp Stack, Omnichannel Starter, or Omnichannel Full Stack plans. TopEdge includes Intelligence hub AI in the base plan.',
      },
      {
        question: 'Is Bitespeed pricing available in INR?',
        answer:
          'No published Bitespeed plan found in this research is INR-denominated — listed tiers are USD. TopEdge’s Launch, Growth, and Scale plans are priced and billed in INR.',
      },
      {
        question: 'How many Shopify merchants use Bitespeed?',
        answer:
          'As of September 2026, Bitespeed’s Shopify App Store listing (“B: WhatsApp Chat, Abandon Cart”) shows about 4.6/5 across roughly 388 reviews. Cite the live Shopify listing for the latest count.',
      },
      {
        question: 'Can TopEdge replace an omnichannel stack?',
        answer:
          'TopEdge focuses on WhatsApp + Shopify. If you need email, SMS, voice AI, and Instagram agents in one vendor today, evaluate Bitespeed’s omnichannel tiers — or pair TopEdge with your existing ESP and keep WhatsApp recovery on TopEdge.',
      },
      {
        question: 'Bitespeed alternative for Shopify India with INR pricing?',
        answer:
          'TopEdge is built as a Shopify-native, INR-priced WhatsApp growth OS for Indian D2C — cart recovery, COD workflows, Meta template gates, and order-aware inbox without a USD omnichannel floor.',
      },
    ],
    related: [
      { label: 'All comparisons', href: '/compare' },
      { label: 'Customers', href: '/customers' },
      { label: 'TopEdge pricing', href: '/pricing' },
      { label: 'vs Interakt', href: '/compare/interakt' },
      { label: 'Cart recovery', href: '/whatsapp-cart-recovery' },
    ],
  },
};

export function getCompareCompetitor(slug: string) {
  return COMPARE_COMPETITORS[slug] ?? null;
}

export function allCompareCompetitors() {
  return Object.values(COMPARE_COMPETITORS);
}
