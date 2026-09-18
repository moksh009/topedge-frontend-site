import { pairwiseMatrix } from './compareFeatureMatrix';

export type CompareCell = 'yes' | 'no' | 'partial' | string;

export type CompareRow = {
  label: string;
  description?: string;
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


export const COMPARE_COMPETITORS: Record<string, CompareCompetitor> = {
  wati: {
    slug: 'wati',
    name: 'WATI',
    shortName: 'WATI',
    website: 'https://www.wati.io',
    logo: '/marketing/compare/compare-logo-wati.png',
    logoAlt: 'WATI logo',
    accent: '#0d9488',
    brandTag: 'WhatsApp BSP',
    title: 'TopEdge vs WATI (2026) | WhatsApp Ecommerce Growth OS',
    description:
      'Compare TopEdge vs WATI: 0% Meta template markup, BYOK AI, intent routing, unified customer identity, COD → prepaid, warranty, and unlimited chatflows for Shopify India brands.',
    keywords:
      'TopEdge vs WATI, WATI alternative India, WhatsApp template markup, COD to prepaid WhatsApp, unified customer identity WhatsApp, intent routing chatbot, WATI vs TopEdge Shopify',
    h1: 'TopEdge vs WATI',
    subtitle: 'TopEdge AI vs WATI for Shopify WhatsApp ecommerce.',
    answerFirst:
      'Pick TopEdge AI for Shopify-native recovery with 0% Meta markup, BYOK AI, unified identity, and unlimited flows. Pick WATI if you need a broad WhatsApp BSP and are fine with usage charges plus trigger caps.',
    whoForTopEdge:
      'You run Shopify India D2C and want Meta billed at cost, one customer profile, COD → prepaid, and unlimited flows on every plan.',
    whoForCompetitor:
      'You need a general WhatsApp BSP with keyword automations and can live with platform usage fees and monthly trigger limits.',
    positioning:
      'WATI is a WhatsApp Business Solution Provider. TopEdge is a Shopify-first WhatsApp growth OS. The gap shows up in Meta billing transparency, native ecommerce identity, and how much setup COD / warranty / pixel work needs.',
    differentiators: [
      {
        title: 'Pay Meta — not a markup tax',
        body: 'Template traffic stays at Meta rates. No platform usage layer eating margin as you scale sends.',
      },
      {
        title: 'AI without an Astra gate',
        body: 'BYOK + RAG on core plans (~₹0.2–₹0.3 / message). No jump to a higher tier just to turn AI on.',
      },
      {
        title: 'One shopper, one profile',
        body: 'Orders, phones, and emails merge automatically — COD, warranty, and journeys share the same identity.',
      },
      {
        title: 'Flows that do not meter out',
        body: 'Advanced builder with unlimited execution on every plan — not monthly trigger caps.',
      },
    ],
    matrix: pairwiseMatrix('wati'),
    matrixNote:
      'Capability claims reflect TopEdge product positioning vs publicly described WATI platform patterns. Confirm live plan limits and fees on wati.io before purchase.',
    researchAsOf: 'Sep 2026',
    deepDives: [
      {
        title: 'Cost at volume',
        body: 'At high template volume, WATI’s usage charges stack on Meta. TopEdge keeps markup at 0% — the gap shows up on the monthly bill, not the feature list.',
      },
      {
        title: 'Shopify ops vs BSP toolkit',
        body: 'TopEdge ships COD → prepaid, store pixel, warranty, and order locks native. On WATI those jobs usually mean APIs, webhooks, or another CRM.',
      },
      {
        title: 'When WATI wins',
        body: 'Need a broad BSP for CTWA acquisition or non-Shopify channels? WATI’s wider toolkit can fit better than a Shopify-first growth OS.',
      },
    ],
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
        note: 'Plus Meta + platform usage charges',
        highlights: ['Multi-user inbox', 'Campaigns', 'Shopify commerce add-on', 'Trigger-capped automation'],
        popular: true,
      },
      {
        name: 'Pro / Business',
        price: '~₹5,999–₹16,999/mo',
        note: 'Higher automation & AI (Astra) tiers',
        highlights: ['Advanced automation', 'AI on higher tiers', 'More integrations', 'Priority support'],
      },
    ],
    topedgePlansNote:
      'TopEdge Launch / Growth / Scale include AI tooling, unlimited flow execution, and 0% template markup — Meta fees pass through separately.',
    pricingCaveat:
      'Competitor plan prices change often and may differ by region, billing cycle, and add-ons. Verify on wati.io. Meta WhatsApp fees apply on both platforms; WATI may add platform usage charges above Meta base rates.',
    faqs: [
      {
        question: 'Will my WhatsApp bill be lower on TopEdge?',
        answer:
          'Often at volume — TopEdge keeps 0% template markup. WATI adds platform usage above Meta. Run your monthly send volume through both before switching.',
      },
      {
        question: 'Do I need Astra for AI on WATI?',
        answer:
          'WATI AI typically needs Astra or a higher tier. TopEdge AI is BYOK + RAG on core plans (~₹0.2–₹0.3 / message).',
      },
      {
        question: 'Can I run COD → prepaid without developers?',
        answer:
          'On TopEdge yes — Shopify-native checkout (e.g. GoKwik). On WATI that funnel usually needs custom API / webhook work.',
      },
    ],
    related: [
      { label: 'All comparisons', href: '/compare' },
      { label: 'vs AiSensy', href: '/compare/aisensy' },
      { label: '3-way board', href: '/compare/topedge-vs-wati-vs-aisensy' },
      { label: 'TopEdge pricing', href: '/pricing' },
    ],
  },

  aisensy: {
    slug: 'aisensy',
    name: 'AiSensy',
    shortName: 'AiSensy',
    website: 'https://aisensy.com',
    logo: '/marketing/compare/compare-logo-aisensy.png',
    logoAlt: 'AiSensy logo',
    accent: '#0f766e',
    brandTag: 'WhatsApp marketing platform',
    title: 'TopEdge vs AiSensy (2026) | WhatsApp Ecommerce for Shopify India',
    description:
      'Compare TopEdge vs AiSensy on Meta template markup, AI add-on fees, intent routing, unified identity, COD → prepaid, warranty, journey builder, and chatflow plan limits.',
    keywords:
      'TopEdge vs AiSensy, AiSensy alternative India, AiSensy vs TopEdge, WhatsApp template markup, COD prepaid WhatsApp, unified customer profile WhatsApp, AiSensy pricing India',
    h1: 'TopEdge vs AiSensy',
    subtitle: 'TopEdge AI vs AiSensy for Shopify WhatsApp ecommerce.',
    answerFirst:
      'Pick TopEdge AI for native Shopify ops — 0% Meta markup, BYOK AI, unified identity, COD → prepaid, and unlimited flows. Pick AiSensy if you want WhatsApp marketing with credits and are fine gating flows / AI behind tiers.',
    whoForTopEdge:
      'You want one Shopify-native stack: identity, COD → prepaid, analytics, warranty, and unlimited chatflows — without template markups.',
    whoForCompetitor:
      'You mainly need WhatsApp campaigns and keyword automations, and can pay AI / flow unlocks as credits or higher tiers.',
    positioning:
      'AiSensy competes as a WhatsApp marketing / automation platform. TopEdge competes as a Shopify-native WhatsApp growth OS. Overlap exists on templates and flows; the gap is Meta billing, ecommerce identity, and how much custom API / CRM work advanced features need.',
    differentiators: [
      {
        title: 'Templates without a usage layer',
        body: 'Meta billed direct — no platform markup stacking on every marketing conversation.',
      },
      {
        title: 'Predictable AI cost',
        body: 'BYOK + RAG (~₹0.2–₹0.3 / message) instead of a per-message AI add-on meter.',
      },
      {
        title: 'Ecommerce ops built in',
        body: 'Unified identity, store pixel, warranty, and COD → prepaid ship native — not webhook projects.',
      },
      {
        title: 'Builder unlocked on day one',
        body: 'Advanced flows with unlimited runs on every plan — not credit gates or higher-tier unlocks.',
      },
    ],
    matrix: pairwiseMatrix('aisensy'),
    matrixNote:
      'Capability claims reflect TopEdge product positioning vs publicly described AiSensy platform patterns. Confirm live plan limits, credits, and fees on aisensy.com before purchase.',
    researchAsOf: 'Sep 2026',
    deepDives: [
      {
        title: 'Two meters that add up',
        body: 'AiSensy often stacks platform usage on templates plus a per-message AI add-on. TopEdge keeps markup at 0% and AI on BYOK — the difference compounds with send volume.',
      },
      {
        title: 'Glue work vs native stack',
        body: 'Payment-link mapping, pixel identity, and warranty usually mean APIs or another CRM on AiSensy. TopEdge ships those jobs in-product.',
      },
      {
        title: 'When AiSensy is enough',
        body: 'If broadcasts and keyword automations are the whole job — and deep Shopify ops are secondary — AiSensy’s marketing-platform model can still fit.',
      },
    ],
    competitorPlans: [
      {
        name: 'Starter / Basic',
        price: 'Credit-based',
        note: 'Verify live on aisensy.com',
        highlights: ['WhatsApp templates', 'Basic automations', 'Keyword triggers', 'Credit / tier caps'],
      },
      {
        name: 'Growth',
        price: 'Subscription + credits',
        note: 'Plus Meta + platform usage',
        highlights: ['Campaigns', 'Team inbox', 'Standard analytics', 'AI often add-on'],
        popular: true,
      },
      {
        name: 'Advanced',
        price: 'Higher tier / add-ons',
        note: 'Flow builder & AI may unlock here',
        highlights: ['Advanced automations', 'Flow builder add-on / higher tier', 'API integrations', 'Priority support'],
      },
    ],
    topedgePlansNote:
      'TopEdge Launch / Growth / Scale include the advanced flow builder, unlimited executions, and 0% template markup — Meta fees pass through separately.',
    pricingCaveat:
      'AiSensy pricing, credits, and add-ons change often. Verify on aisensy.com. Meta WhatsApp fees apply on both platforms; AiSensy may add platform usage charges and AI add-on fees above Meta base rates.',
    faqs: [
      {
        question: 'Is my template bill lower on TopEdge?',
        answer:
          'Often yes at volume — 0% markup vs AiSensy’s platform usage above Meta. Compare with your monthly send mix.',
      },
      {
        question: 'How is AI priced differently?',
        answer:
          'TopEdge is BYOK + RAG (~₹0.2–₹0.3 / message). AiSensy commonly meters AI as a per-message add-on.',
      },
      {
        question: 'Is the flow builder gated?',
        answer:
          'On TopEdge the advanced builder and unlimited runs ship on every plan. AiSensy often unlocks deeper builders on higher tiers or credits.',
      },
    ],
    related: [
      { label: 'All comparisons', href: '/compare' },
      { label: 'vs WATI', href: '/compare/wati' },
      { label: '3-way board', href: '/compare/topedge-vs-wati-vs-aisensy' },
      { label: 'TopEdge pricing', href: '/pricing' },
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
    brandTag: 'Shopify WhatsApp app',
    title: 'TopEdge vs Interakt (2026) | Shopify WhatsApp Growth OS',
    description:
      'Compare TopEdge vs Interakt: Meta billing, BYOK AI vs App-tier AI agents, COD → prepaid on WhatsApp Pay, unified identity, warranty, and unlimited flows vs Shopify App rate limits.',
    keywords:
      'TopEdge vs Interakt, Interakt alternative Shopify, Interakt vs TopEdge, WhatsApp marketing Shopify India, abandoned cart WhatsApp Interakt, COD confirmation WhatsApp, Interakt pricing',
    h1: 'TopEdge vs Interakt',
    subtitle: 'TopEdge AI vs Interakt for Shopify WhatsApp ecommerce.',
    answerFirst:
      'Pick TopEdge AI for INR order-based plans, 0% Meta markup, BYOK AI, unified identity, and unlimited flows. Pick Interakt if you want a Shopify App Store WhatsApp suite (catalog sync, cart reminders, COD → prepaid via WhatsApp Pay) with USD app billing.',
    whoForTopEdge:
      'You want flat INR pricing, Meta at cost, one unified customer profile, warranty, and unlimited flow runs — without stacking App + conversation fees.',
    whoForCompetitor:
      'You want a Shopify-listed WhatsApp app for catalog sync, cart reminders, COD → prepaid on WhatsApp Pay, and chatbot tiers from the App Store.',
    positioning:
      'Both serve Shopify + WhatsApp in India. Interakt is strong as an App Store sales/notifications suite with documented COD → prepaid via WhatsApp Pay. TopEdge emphasizes Meta transparency, unified identity, warranty, and unlimited chatflow execution on INR plans.',
    differentiators: [
      {
        title: 'INR plans, Meta at cost',
        body: 'Published Launch / Growth / Scale in INR — no Shopify App subscription stacked on conversation fees.',
      },
      {
        title: 'AI on core plans',
        body: 'BYOK + RAG without waiting for the ~$99 Enterprise App tier or a ~$74.99 AI add-on.',
      },
      {
        title: 'Identity that survives every order',
        body: 'One merged profile with warranty batches — not standard Shopify / WhatsApp contacts alone.',
      },
      {
        title: 'Unlimited flows, every plan',
        body: 'Advanced builder unlocked day one — not basic linear on Growth and branching only on Advanced+.',
      },
    ],
    matrix: pairwiseMatrix('interakt'),
    matrixNote:
      'Interakt claims drawn from Shopify App Store listings and interakt.shop docs (Sep 2026). Confirm live App vs India website tiers, AI add-ons, and Meta fees before purchase.',
    researchAsOf: 'Sep 2026',
    scorecard: [
      {
        area: 'Catalog & cart on WhatsApp',
        topedge: 'Shopify-native recovery journeys',
        competitor: 'Catalog sync + WA cart → Shopify cart',
        edge: 'Competitor',
      },
      {
        area: 'COD → prepaid',
        topedge: 'Native + checkout partners (e.g. GoKwik)',
        competitor: 'WhatsApp Pay COD → prepaid (documented)',
        edge: 'Even',
      },
      {
        area: 'Meta template economics',
        topedge: '0% markup · Meta direct',
        competitor: 'App sub + Meta conversation charges',
        edge: 'TopEdge',
      },
      {
        area: 'AI agents',
        topedge: 'BYOK + RAG on core plans',
        competitor: 'Enterprise App / ~$74.99 add-on',
        edge: 'TopEdge',
      },
      {
        area: 'Flow builder',
        topedge: 'Advanced builder · unlimited runs',
        competitor: 'Basic → Advanced by App tier',
        edge: 'TopEdge',
      },
      {
        area: 'Unified identity',
        topedge: 'Native merge + lead dedupe',
        competitor: 'Standard Shopify / WA contacts',
        edge: 'TopEdge',
      },
      {
        area: 'Warranty hub',
        topedge: 'Built-in batches on profile',
        competitor: 'Not found publicly',
        edge: 'TopEdge',
      },
      {
        area: 'Pricing model',
        topedge: 'Flat INR · order volume',
        competitor: 'USD Shopify App (+ India web tiers)',
        edge: 'TopEdge',
      },
    ],
    deepDives: [
      {
        title: 'Two Interakt price surfaces',
        body: 'Shopify App Store lists Growth ~$41/mo, Advanced ~$51/mo, Enterprise ~$99/mo (plus Meta charges). Interakt’s India website also shows INR CRM-style plans (e.g. ~₹2,499/mo Starter) with separate AI-agent packaging. Always match the surface you will buy — App vs web — before comparing to TopEdge’s published INR catalog.',
      },
      {
        title: 'COD → prepaid is real on Interakt',
        body: 'Interakt documents COD → prepaid on WhatsApp Pay with Razorpay or PayU, expiry windows, and discount incentives. TopEdge is competitive here via Shopify-native checkout partners and identity-linked journeys — the gap is less “can they?” and more stack depth around identity, warranty, and Meta gates.',
      },
      {
        title: 'AI agents vs BYOK',
        body: 'Interakt markets Sales, FAQ, and Lead Qualification WhatsApp AI Agents — typically Enterprise App (~$99) or a paid add-on on Growth/Advanced. TopEdge keeps AI on BYOK + RAG without locking it to the top App tier.',
      },
      {
        title: 'Where Interakt still fits',
        body: 'If your priority is a Shopify App Store install for catalog sync, cart reminders, and WhatsApp Pay COD conversion — and deep native identity / warranty are secondary — Interakt’s App path can be enough.',
      },
    ],
    competitorPlans: [
      {
        name: 'Growth',
        price: 'from ~$41/mo',
        note: 'Shopify App · + Meta conversation charges',
        highlights: [
          'Catalog sync to WhatsApp',
          'Basic chatbot',
          'Bulk campaigns & notifications',
          'Cart reminders / WA commerce',
        ],
        popular: true,
      },
      {
        name: 'Advanced',
        price: 'from ~$51/mo',
        note: 'Branching chatbot · higher API rate',
        highlights: [
          'Advanced chatbot flows',
          'Up to ~600 msg/min API',
          'Agent performance stats',
          'COD → prepaid typically here+',
        ],
      },
      {
        name: 'Enterprise',
        price: 'from ~$99/mo',
        note: 'AI agents unlock on this App tier',
        highlights: [
          'WhatsApp AI Sales / FAQ / Lead agents',
          'Number capture popup',
          'Cart reminders to popup numbers',
          'Shopify actions in workflows',
        ],
      },
    ],
    topedgePlansNote:
      'TopEdge Launch / Growth / Scale include AI tooling, unlimited flow execution, and 0% template markup — Meta fees pass through separately.',
    pricingCaveat:
      'Interakt Shopify App prices (Sep 2026): Growth ~$41 · Advanced ~$51 · Enterprise ~$99 /mo plus Meta conversation fees. India website INR tiers and AI add-ons differ — verify on apps.shopify.com/interakt-sales and interakt.shop/pricing.',
    faqs: [
      {
        question: 'Is Interakt cheaper once Meta fees are in?',
        answer:
          'Maybe at low volume — but Interakt stacks an App subscription (from ~$41) on Meta charges. TopEdge keeps 0% markup with flat INR plans. Model both at your send rate.',
      },
      {
        question: 'Where do Interakt AI agents unlock?',
        answer:
          'Usually the Enterprise App (~$99) or a ~$74.99 add-on on Growth/Advanced. TopEdge AI is BYOK + RAG on core plans.',
      },
      {
        question: 'Can Interakt convert COD to prepaid?',
        answer:
          'Yes — WhatsApp Pay with Razorpay or PayU is documented. TopEdge does the same job with Shopify checkout partners plus unified identity.',
      },
      {
        question: 'USD App or INR website?',
        answer:
          'Both exist. Shopify App listings are USD; interakt.shop also shows INR tiers. TopEdge only publishes flat INR Launch / Growth / Scale.',
      },
    ],
    related: [
      { label: 'All comparisons', href: '/compare' },
      { label: 'vs WATI', href: '/compare/wati' },
      { label: 'vs Bitespeed', href: '/compare/bitespeed' },
      { label: 'TopEdge pricing', href: '/pricing' },
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
    title: 'TopEdge vs Bitespeed (2026) | Shopify WhatsApp with INR Pricing',
    description:
      'Compare TopEdge vs Bitespeed: Meta economics, AI included vs ~$100 add-ons, cart + browse recovery, COD, warranty, and INR order-based plans vs USD omnichannel floors.',
    keywords:
      'TopEdge vs Bitespeed, Bitespeed alternative Shopify, Bitespeed pricing India, Shopify WhatsApp app INR pricing, Bitespeed vs TopEdge, Bitespeed AI add-on',
    h1: 'TopEdge vs Bitespeed',
    subtitle: 'TopEdge AI vs Bitespeed for Shopify WhatsApp ecommerce.',
    answerFirst:
      'Pick TopEdge AI for Shopify India recovery, COD, and inbox on flat INR pricing with AI included. Pick Bitespeed when you want WhatsApp plus email, SMS, Instagram, and voice AI agents — and can budget a ~$250+/mo USD base plus AI add-ons.',
    whoForTopEdge:
      'You want Shopify India cart recovery, COD, and inbox — flat INR pricing, AI included, no USD platform floor.',
    whoForCompetitor:
      'You want an omnichannel growth OS: WhatsApp plus email, SMS, Instagram, and voice AI agents under one vendor.',
    positioning:
      'Both recover carts and confirm COD on WhatsApp. Bitespeed is an omnichannel AI marketing / support OS with a USD floor. TopEdge is a Shopify-native WhatsApp growth OS with published INR plans and AI included.',
    researchAsOf: 'Sep 2026',
    differentiators: [
      {
        title: 'AI in the base plan',
        body: 'Intelligence hub / BYOK included — not ~$100/mo AI Chatbot and Marketing add-ons on a USD floor.',
      },
      {
        title: 'INR pricing you can publish',
        body: 'Launch ₹1,999 · Growth ₹3,999 · Scale ₹6,499 by Shopify order volume — no ~$250+ USD starting tier.',
      },
      {
        title: 'WhatsApp depth over channel sprawl',
        body: 'Shopify-native recovery, COD, Meta gates, and warranty — built for India D2C, not an omnichannel suite.',
      },
      {
        title: 'Honest on browse recovery',
        body: 'Bitespeed covers cart + browse. TopEdge ships cart recovery today — we do not claim browse parity.',
      },
    ],
    matrix: pairwiseMatrix('bitespeed'),
    matrixNote:
      'Bitespeed pricing and AI add-ons as of September 2026 from public listings / third-party summaries. Confirm live on bitespeed.co and the Shopify App Store before purchase.',
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
        topedge: 'Visual builder, unlimited runs',
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
        topedge: 'Included (Intelligence hub / BYOK)',
        competitor: '+$100/mo add-on · 1k AI chats then ~$0.05',
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
        competitor: 'Popups / widgets — full pixel not verified',
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
        competitor: 'USD, ~$250+ floor + AI add-ons',
        edge: 'TopEdge',
      },
    ],
    deepDives: [
      {
        title: 'What the USD floor really costs',
        body: 'Public Bitespeed tiers start ~$250–$500/mo plus Meta fees, then ~$100 each for AI Chatbot and AI Marketing (1k AI chats, then ~$0.05). TopEdge’s published INR catalog is easier to forecast for mid-market D2C.',
      },
      {
        title: 'Omnichannel vs WhatsApp focus',
        body: 'Bitespeed wins if you need email, SMS, Instagram, and voice in one inbox. TopEdge is deliberately WhatsApp + Shopify — pair an ESP if you already have one.',
      },
      {
        title: 'When Bitespeed still fits',
        body: 'Global or multi-channel brands that want AI agents across WhatsApp and social — and can absorb a USD platform floor — should evaluate Bitespeed seriously.',
      },
    ],
    competitorPlans: [
      {
        name: 'WhatsApp Stack',
        price: 'from ~$250/mo',
        note: 'USD · + Meta fees · 1k free conversations',
        highlights: [
          'WhatsApp marketing & broadcasts',
          'Cart recovery & COD tools',
          'Support inbox',
          'AI chatbot is +~$100/mo',
        ],
        popular: true,
      },
      {
        name: 'Omnichannel Starter',
        price: 'from ~$350/mo',
        note: 'Adds email / SMS / push · ~25k emails',
        highlights: [
          'Omnichannel marketing',
          'Instagram bots / comments',
          'Support dashboard',
          'AI add-ons extra',
        ],
      },
      {
        name: 'Omnichannel Full Stack',
        price: 'from ~$500/mo',
        note: 'Dedicated AM · ~100k emails/mo',
        highlights: [
          '~100k free emails/mo',
          'Dedicated Account Manager',
          'Full omnichannel suite',
          'AI chatbot + marketing +~$100/mo each',
        ],
      },
    ],
    topedgePlansNote:
      'TopEdge Launch ₹1,999 · Growth ₹3,999 · Scale ₹6,499 — flat INR, published, tied to Shopify order volume. AI included; Meta conversation fees pass through separately.',
    pricingCaveat:
      'Bitespeed plans (Sep 2026, public listings): WhatsApp Stack ~$250 · Omnichannel Starter ~$350 · Full Stack ~$500 /mo — plus ~$100/mo each for AI Chatbot and AI Marketing (1k AI chats then ~$0.05). Verify on bitespeed.co.',
    faqs: [
      {
        question: 'Who should pick TopEdge over Bitespeed?',
        answer:
          'Shopify India teams that want cart, COD, and inbox on flat INR with AI included — without a full omnichannel USD stack.',
      },
      {
        question: 'Does Bitespeed do cart and COD?',
        answer:
          'Yes — cart and browse recovery, COD confirm / COD → prepaid, broadcasts, and support. TopEdge matches cart + COD; we do not claim browse parity.',
      },
      {
        question: 'Why does AI cost more on Bitespeed?',
        answer:
          'AI Chatbot and AI Marketing are ~$100/mo add-ons each (1k AI chats then ~$0.05). TopEdge includes Intelligence / BYOK in the base plan.',
      },
      {
        question: 'Is Bitespeed priced in INR?',
        answer:
          'Public tiers are USD. TopEdge publishes and bills flat INR Launch / Growth / Scale.',
      },
    ],
    related: [
      { label: 'All comparisons', href: '/compare' },
      { label: 'vs Interakt', href: '/compare/interakt' },
      { label: 'vs WATI', href: '/compare/wati' },
      { label: 'TopEdge pricing', href: '/pricing' },
    ],
  },
};

export function getCompareCompetitor(slug: string) {
  return COMPARE_COMPETITORS[slug] ?? null;
}

export function allCompareCompetitors() {
  return Object.values(COMPARE_COMPETITORS);
}
