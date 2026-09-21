import {
  AISENSY_PAIRWISE_MATRIX,
  BITESPEED_PAIRWISE_MATRIX,
  GETGABS_PAIRWISE_MATRIX,
  INTERAKT_PAIRWISE_MATRIX,
  DONDYY_PAIRWISE_MATRIX,
  KANAL_PAIRWISE_MATRIX,
  WATI_PAIRWISE_MATRIX,
  ZOKO_PAIRWISE_MATRIX,
} from './compareFeatureMatrix';
import { FALLBACK_CATALOG } from '../lib/billingCatalog';

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
  /** GEO / AI-answer block, concise verdict */
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

/** TopEdge public plans — labels derived from billingCatalog FALLBACK (same SSOT as /pricing). */
const PLAN_HIGHLIGHTS: Record<string, { highlights: string[]; popular?: boolean }> = {
  launch: {
    highlights: ['Abandoned cart recovery', 'COD tools', 'Live Chat + CRM', 'Meta templates'],
  },
  growth: {
    highlights: ['Journey branching', 'COD → prepaid', 'Priority send', 'Most popular'],
    popular: true,
  },
  scale: {
    highlights: ['Highest send priority', 'Larger volume', 'Same core stack', 'Team-ready'],
  },
};

export const TOPEDGE_PLANS_SUMMARY = FALLBACK_CATALOG.plans
  .filter((p) => ['launch', 'growth', 'scale'].includes(p.slug))
  .map((p) => {
    const extra = PLAN_HIGHLIGHTS[p.slug] || { highlights: [] as string[] };
    const sends =
      p.campaignEmailSendsPerCycle >= 1000
        ? `${Math.round(p.campaignEmailSendsPerCycle / 1000)}k`
        : String(p.campaignEmailSendsPerCycle);
    return {
      name: p.displayName,
      price: `${p.monthlyPriceLabel}/mo`,
      note: `${p.ordersPerCycle.toLocaleString('en-IN')} orders · ${sends} campaign sends`,
      highlights: extra.highlights,
      ...(extra.popular ? { popular: true as const } : {}),
    };
  });


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
      'Compare TopEdge vs WATI: 0% Meta markup, BYOK AI, unified identity, COD to prepaid, and unlimited chatflows for Shopify India.',
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
        title: 'Pay Meta, not a markup tax',
        body: 'Template traffic stays at Meta rates. No platform usage layer eating margin as you scale sends.',
      },
      {
        title: 'AI without an Astra gate',
        body: 'BYOK + RAG on core plans (~₹0.2-₹0.3 / message). No jump to a higher tier just to turn AI on.',
      },
      {
        title: 'One shopper, one profile',
        body: 'Orders, phones, and emails merge automatically, COD, warranty, and journeys share the same identity.',
      },
      {
        title: 'Flows that do not meter out',
        body: 'Advanced builder with unlimited execution on every plan, not monthly trigger caps.',
      },
    ],
    matrix: WATI_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Capability claims reflect TopEdge product positioning vs publicly described WATI platform patterns. Confirm live plan limits and fees on wati.io before purchase.',
    researchAsOf: 'Sep 2026',
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
        price: '~₹5,999-₹16,999/mo',
        note: 'Higher automation & AI (Astra) tiers',
        highlights: ['Advanced automation', 'AI on higher tiers', 'More integrations', 'Priority support'],
      },
    ],
    topedgePlansNote:
      'TopEdge Launch / Growth / Scale include AI tooling, unlimited flow execution, and 0% template markup, Meta fees pass through separately.',
    pricingCaveat:
      'Competitor plan prices change often and may differ by region, billing cycle, and add-ons. Verify on wati.io. Meta WhatsApp fees apply on both platforms; WATI may add platform usage charges above Meta base rates.',
    faqs: [
      {
        question: 'Will my WhatsApp bill be lower on TopEdge?',
        answer:
          'Often at volume, TopEdge keeps 0% template markup. WATI adds platform usage above Meta. Run your monthly send volume through both before switching.',
      },
      {
        question: 'Do I need Astra for AI on WATI?',
        answer:
          'WATI AI typically needs Astra or a higher tier. TopEdge AI is BYOK + RAG on core plans (~₹0.2-₹0.3 / message).',
      },
      {
        question: 'Can I run COD → prepaid without developers?',
        answer:
          'On TopEdge yes, Shopify-native checkout (e.g. GoKwik). On WATI that funnel usually needs custom API / webhook work.',
      },
    ],
    related: [
      { label: 'All comparisons', href: '/compare' },
      { label: 'vs AiSensy', href: '/compare/aisensy' },
      { label: 'vs Bitespeed', href: '/compare/bitespeed' },
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
    title: 'TopEdge vs AiSensy (2026) | WhatsApp Ecommerce Shopify',
    description:
      'Compare TopEdge vs AiSensy on Meta markup, AI fees, intent routing, unified identity, COD → prepaid, and chatflow limits.',
    keywords:
      'TopEdge vs AiSensy, AiSensy alternative India, AiSensy vs TopEdge, WhatsApp template markup, COD prepaid WhatsApp, unified customer profile WhatsApp, AiSensy pricing India',
    h1: 'TopEdge vs AiSensy',
    subtitle: 'TopEdge AI vs AiSensy for Shopify WhatsApp ecommerce.',
    answerFirst:
      'Pick TopEdge AI for native Shopify ops, 0% Meta markup, BYOK AI, unified identity, COD → prepaid, and unlimited flows. Pick AiSensy if you want WhatsApp marketing with credits and are fine gating flows / AI behind tiers.',
    whoForTopEdge:
      'You want one Shopify-native stack: identity, COD → prepaid, analytics, warranty, and unlimited chatflows, without template markups.',
    whoForCompetitor:
      'You mainly need WhatsApp campaigns and keyword automations, and can pay AI / flow unlocks as credits or higher tiers.',
    positioning:
      'AiSensy competes as a WhatsApp marketing / automation platform. TopEdge competes as a Shopify-native WhatsApp growth OS. Overlap exists on templates and flows; the gap is Meta billing, ecommerce identity, and how much custom API / CRM work advanced features need.',
    differentiators: [
      {
        title: 'Templates without a usage layer',
        body: 'Meta billed direct, no platform markup stacking on every marketing conversation.',
      },
      {
        title: 'Predictable AI cost',
        body: 'BYOK + RAG (~₹0.2-₹0.3 / message) instead of a per-message AI add-on meter.',
      },
      {
        title: 'Ecommerce ops built in',
        body: 'Unified identity, store pixel, warranty, and COD → prepaid ship native, not webhook projects.',
      },
      {
        title: 'Builder unlocked on day one',
        body: 'Advanced flows with unlimited runs on every plan, not credit gates or higher-tier unlocks.',
      },
    ],
    matrix: AISENSY_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Capability claims reflect TopEdge product positioning vs publicly described AiSensy platform patterns. Confirm live plan limits, credits, and fees on aisensy.com before purchase.',
    researchAsOf: 'Sep 2026',
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
      'TopEdge Launch / Growth / Scale include the advanced flow builder, unlimited executions, and 0% template markup, Meta fees pass through separately.',
    pricingCaveat:
      'AiSensy pricing, credits, and add-ons change often. Verify on aisensy.com. Meta WhatsApp fees apply on both platforms; AiSensy may add platform usage charges and AI add-on fees above Meta base rates.',
    faqs: [
      {
        question: 'Is my template bill lower on TopEdge?',
        answer:
          'Often yes at volume, 0% markup vs AiSensy’s platform usage above Meta. Compare with your monthly send mix.',
      },
      {
        question: 'How is AI priced differently?',
        answer:
          'TopEdge is BYOK + RAG (~₹0.2-₹0.3 / message). AiSensy commonly meters AI as a per-message add-on.',
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
      { label: 'vs Bitespeed', href: '/compare/bitespeed' },
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
      'Compare TopEdge vs Interakt: Meta billing, BYOK AI, COD to prepaid, unified identity, and unlimited flows vs Shopify App rate limits.',
    keywords:
      'TopEdge vs Interakt, Interakt alternative Shopify, Interakt vs TopEdge, WhatsApp marketing Shopify India, abandoned cart WhatsApp Interakt, COD confirmation WhatsApp, Interakt pricing',
    h1: 'TopEdge vs Interakt',
    subtitle: 'TopEdge AI vs Interakt for Shopify WhatsApp ecommerce.',
    answerFirst:
      'Pick TopEdge AI for INR order-based plans, 0% Meta markup, BYOK AI, unified identity, and unlimited flows. Pick Interakt if you want a Shopify App Store WhatsApp suite (catalog sync, cart reminders, COD → prepaid via WhatsApp Pay) with USD app billing.',
    whoForTopEdge:
      'You want flat INR pricing, Meta at cost, one unified customer profile, warranty, and unlimited flow runs, without stacking App + conversation fees.',
    whoForCompetitor:
      'You want a Shopify-listed WhatsApp app for catalog sync, cart reminders, COD → prepaid on WhatsApp Pay, and chatbot tiers from the App Store.',
    positioning:
      'Both serve Shopify + WhatsApp in India. Interakt is strong as an App Store sales/notifications suite with documented COD → prepaid via WhatsApp Pay. TopEdge emphasizes Meta transparency, unified identity, warranty, and unlimited chatflow execution on INR plans.',
    differentiators: [
      {
        title: 'INR plans, Meta at cost',
        body: 'Published Launch / Growth / Scale in INR, no Shopify App subscription stacked on conversation fees.',
      },
      {
        title: 'AI on core plans',
        body: 'BYOK + RAG without waiting for the ~$99 Enterprise App tier or a ~$74.99 AI add-on.',
      },
      {
        title: 'Identity that survives every order',
        body: 'One merged profile with warranty batches, not standard Shopify / WhatsApp contacts alone.',
      },
      {
        title: 'Unlimited flows, every plan',
        body: 'Advanced builder unlocked day one, not basic linear on Growth and branching only on Advanced+.',
      },
    ],
    matrix: INTERAKT_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
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
        body: 'Shopify App Store lists Growth ~$41/mo, Advanced ~$51/mo, Enterprise ~$99/mo (plus Meta charges). Interakt’s India website also shows INR CRM-style plans (e.g. ~₹2,499/mo Starter) with separate AI-agent packaging. Always match the surface you will buy, App vs web, before comparing to TopEdge’s published INR catalog.',
      },
      {
        title: 'COD → prepaid is real on Interakt',
        body: 'Interakt documents COD → prepaid on WhatsApp Pay with Razorpay or PayU, expiry windows, and discount incentives. TopEdge is competitive here via Shopify-native checkout partners and identity-linked journeys, the gap is less “can they?” and more stack depth around identity, warranty, and Meta gates.',
      },
      {
        title: 'AI agents vs BYOK',
        body: 'Interakt markets Sales, FAQ, and Lead Qualification WhatsApp AI Agents, typically Enterprise App (~$99) or a paid add-on on Growth/Advanced. TopEdge keeps AI on BYOK + RAG without locking it to the top App tier.',
      },
      {
        title: 'Where Interakt still fits',
        body: 'If your priority is a Shopify App Store install for catalog sync, cart reminders, and WhatsApp Pay COD conversion, and deep native identity / warranty are secondary, Interakt’s App path can be enough.',
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
      'TopEdge Launch / Growth / Scale include AI tooling, unlimited flow execution, and 0% template markup, Meta fees pass through separately.',
    pricingCaveat:
      'Interakt Shopify App prices (Sep 2026): Growth ~$41 · Advanced ~$51 · Enterprise ~$99 /mo plus Meta conversation fees. India website INR tiers and AI add-ons differ, verify on apps.shopify.com/interakt-sales and interakt.shop/pricing.',
    faqs: [
      {
        question: 'Is Interakt cheaper once Meta fees are in?',
        answer:
          'Maybe at low volume, but Interakt stacks an App subscription (from ~$41) on Meta charges. TopEdge keeps 0% markup with flat INR plans. Model both at your send rate.',
      },
      {
        question: 'Where do Interakt AI agents unlock?',
        answer:
          'Usually the Enterprise App (~$99) or a ~$74.99 add-on on Growth/Advanced. TopEdge AI is BYOK + RAG on core plans.',
      },
      {
        question: 'Can Interakt convert COD to prepaid?',
        answer:
          'Yes, WhatsApp Pay with Razorpay or PayU is documented. TopEdge does the same job with Shopify checkout partners plus unified identity.',
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
      { label: 'vs AiSensy', href: '/compare/aisensy' },
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
    title: 'TopEdge vs Bitespeed (2026) | Shopify WhatsApp INR Plans',
    description:
      'Compare TopEdge vs Bitespeed: Meta economics, AI included vs ~$100 add-ons, cart recovery, COD, and INR plans vs USD floors.',
    keywords:
      'TopEdge vs Bitespeed, Bitespeed alternative Shopify, Bitespeed pricing India, Shopify WhatsApp app INR pricing, Bitespeed vs TopEdge, Bitespeed AI add-on',
    h1: 'TopEdge vs Bitespeed',
    subtitle: 'TopEdge AI vs Bitespeed for Shopify WhatsApp ecommerce.',
    answerFirst:
      'Pick TopEdge AI for Shopify India recovery, COD, and inbox on flat INR pricing with AI included. Pick Bitespeed when you want WhatsApp plus email, SMS, Instagram, and voice AI agents, and can budget a ~$250+/mo USD base plus AI add-ons.',
    whoForTopEdge:
      'You want Shopify India cart recovery, COD, and inbox, flat INR pricing, AI included, no USD platform floor.',
    whoForCompetitor:
      'You want an omnichannel growth OS: WhatsApp plus email, SMS, Instagram, and voice AI agents under one vendor.',
    positioning:
      'Both recover carts and confirm COD on WhatsApp. Bitespeed is an omnichannel AI marketing / support OS with a USD floor. TopEdge is a Shopify-native WhatsApp growth OS with published INR plans and AI included.',
    researchAsOf: 'Sep 2026',
    differentiators: [
      {
        title: 'AI in the base plan',
        body: 'Intelligence hub / BYOK included, not ~$100/mo AI Chatbot and Marketing add-ons on a USD floor.',
      },
      {
        title: 'INR pricing you can publish',
        body: 'Launch ₹1,999 · Growth ₹3,999 · Scale ₹6,499 by Shopify order volume, no ~$250+ USD starting tier.',
      },
      {
        title: 'WhatsApp depth over channel sprawl',
        body: 'Shopify-native recovery, COD, Meta gates, and warranty, built for India D2C, not an omnichannel suite.',
      },
      {
        title: 'Honest on browse recovery',
        body: 'Bitespeed covers cart + browse. TopEdge ships cart recovery today, we do not claim browse parity.',
      },
    ],
    matrix: BITESPEED_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
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
        topedge: 'Soon, not live',
        competitor: 'Live (bots + comment automation)',
        edge: 'Competitor',
      },
      {
        area: 'Website pixel tracking',
        topedge: 'Yes, Shopify-native',
        competitor: 'Popups / widgets, full pixel not verified',
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
        body: 'Public Bitespeed tiers start ~$250-$500/mo plus Meta fees, then ~$100 each for AI Chatbot and AI Marketing (1k AI chats, then ~$0.05). TopEdge’s published INR catalog is easier to forecast for mid-market D2C.',
      },
      {
        title: 'Omnichannel vs WhatsApp focus',
        body: 'Bitespeed wins if you need email, SMS, Instagram, and voice in one inbox. TopEdge is deliberately WhatsApp + Shopify, pair an ESP if you already have one.',
      },
      {
        title: 'When Bitespeed still fits',
        body: 'Global or multi-channel brands that want AI agents across WhatsApp and social, and can absorb a USD platform floor, should evaluate Bitespeed seriously.',
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
      'TopEdge Launch ₹1,999 · Growth ₹3,999 · Scale ₹6,499, flat INR, published, tied to Shopify order volume. AI included; Meta conversation fees pass through separately.',
    pricingCaveat:
      'Bitespeed plans (Sep 2026, public listings): WhatsApp Stack ~$250 · Omnichannel Starter ~$350 · Full Stack ~$500 /mo, plus ~$100/mo each for AI Chatbot and AI Marketing (1k AI chats then ~$0.05). Verify on bitespeed.co.',
    faqs: [
      {
        question: 'Who should pick TopEdge over Bitespeed?',
        answer:
          'Shopify India teams that want cart, COD, and inbox on flat INR with AI included, without a full omnichannel USD stack.',
      },
      {
        question: 'Does Bitespeed do cart and COD?',
        answer:
          'Yes, cart and browse recovery, COD confirm / COD → prepaid, broadcasts, and support. TopEdge matches cart + COD; we do not claim browse parity.',
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
      { label: 'Alternatives index', href: '/compare/alternatives' },
      { label: 'vs WATI', href: '/compare/wati' },
      { label: 'vs AiSensy', href: '/compare/aisensy' },
      { label: 'vs Interakt', href: '/compare/interakt' },
      { label: 'vs Dondy', href: '/compare/dondy' },
      { label: 'TopEdge pricing', href: '/pricing' },
    ],
  },

  zoko: {
    slug: 'zoko',
    name: 'Zoko',
    shortName: 'Zoko',
    website: 'https://www.zoko.io',
    logo: '/marketing/compare/compare-logo-zoko.svg',
    logoAlt: 'Zoko logo',
    accent: '#2563eb',
    brandTag: 'India WhatsApp commerce',
    title: 'TopEdge vs Zoko (2026) | Flat INR vs Conversation Meters',
    description:
      'Compare TopEdge vs Zoko: flat INR order plans vs Zoko’s base fee plus per-conversation metering, COD flows, and India commerce hooks.',
    keywords:
      'TopEdge vs Zoko, Zoko alternative Shopify, Zoko pricing conversations, Shopify WhatsApp India Zoko, Zoko vs TopEdge',
    h1: 'TopEdge vs Zoko',
    subtitle: 'TopEdge AI vs Zoko for Shopify WhatsApp ecommerce.',
    answerFirst:
      'Pick TopEdge AI when you want Shopify India recovery, COD → prepaid, warranty, and unified identity on flat INR order-volume plans. Pick Zoko when you want India-native WhatsApp commerce (catalog, COD confirm flows, CTWA) and are comfortable with a USD base plus conversation metering that can rise in festival traffic.',
    whoForTopEdge:
      'You want predictable INR cost by Shopify orders, COD → prepaid as a first-class journey, warranty, and AI included without a per-conversation platform fee.',
    whoForCompetitor:
      'You want a mature India WhatsApp commerce stack (catalog shopping, free essential ecommerce flows, COD verification) and accept conversation buckets or Starter markup.',
    positioning:
      'Both serve Indian Shopify D2C on WhatsApp. Zoko is strong on India commerce flows and meters conversations on top of a USD plan. TopEdge prices the platform on order volume in INR and keeps Meta fees separate.',
    researchAsOf: 'Sep 2026',
    differentiators: [
      {
        title: 'Predictable platform fee vs conversation spikes',
        body: 'TopEdge Launch / Growth / Scale are flat INR by Shopify orders. Zoko Starter adds $0.015 per conversation; Plus/Elite/Max include conversation buckets then overage — festival traffic can move the bill.',
      },
      {
        title: 'COD → prepaid and warranty in the core stack',
        body: 'TopEdge ships COD → prepaid with checkout partners and a warranty hub. Zoko lists COD verification / convert COD→prepaid in essential flows — strong, but warranty is not a first-class public product.',
      },
      {
        title: 'AI economics',
        body: 'TopEdge includes Intelligence / BYOK on core plans. Zoko AI bots are paid add-ons (Shopify listing: from ~$24.99/mo/bot) — verify live.',
      },
      {
        title: 'Honest on India commerce',
        body: 'Zoko earns the India-native commerce claim (catalog-in-chat, essential COD flows). We do not pretend TopEdge invented that category — we compete on metering model, warranty, and unified identity.',
      },
    ],
    matrix: ZOKO_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Zoko plans and conversation rates as of September 2026 from zoko.io/pricing and apps.shopify.com/whatsapp-button-chat (Starter $49.99 · Plus $79.99 · Elite $139.99 · Max $499.99; Shopify reviews ~445). Confirm live before purchase — figures change.',
    scorecard: [
      {
        area: 'Pricing model',
        topedge: 'Flat INR by Shopify orders',
        competitor: 'USD base + conversation markup / buckets',
        edge: 'TopEdge',
      },
      {
        area: 'India commerce / COD',
        topedge: 'COD journeys + COD → prepaid',
        competitor: 'Essential free flows include COD confirm / convert COD→prepaid',
        edge: 'Even',
      },
      {
        area: 'Catalog / in-chat commerce',
        topedge: 'Shopify + WhatsApp journeys',
        competitor: 'Catalog shopping inside WhatsApp (strong public claim)',
        edge: 'Competitor',
      },
      {
        area: 'AI agents',
        topedge: 'Included (Intelligence / BYOK)',
        competitor: 'Paid AI bots / resolution-priced agents — verify live',
        edge: 'TopEdge',
      },
      {
        area: 'Warranty management',
        topedge: 'Native hub',
        competitor: 'Not found as first-class product',
        edge: 'TopEdge',
      },
      {
        area: 'Unified customer identity',
        topedge: 'Native multi-number / email merge',
        competitor: 'Shopify sync + inbox; merge depth verify live',
        edge: 'TopEdge',
      },
      {
        area: 'Flow economics',
        topedge: 'Unlimited journey runs on plans',
        competitor: '11 essential flows free; custom flows ~$5.99/mo each',
        edge: 'Trade-off',
      },
      {
        area: 'Shopify App Store traction',
        topedge: 'Newer listing / growing',
        competitor: '~445 reviews @ 4.9★ (Sep 2026) — verify live',
        edge: 'Competitor',
      },
    ],
    deepDives: [
      {
        title: 'Why conversation metering matters in India',
        body: 'Festival and sale weeks spike WhatsApp volume. A Starter-style $0.015/conversation fee (plus Meta) scales with chatter, not just orders. TopEdge’s published INR catalog is easier to forecast when CX volume and order volume diverge.',
      },
      {
        title: 'Where Zoko still wins',
        body: 'If you want catalog shopping inside WhatsApp, a long Shopify review history, and free essential ecommerce playbooks (including COD confirm), Zoko is a serious India-native option — evaluate their estimator with your peak conversation count.',
      },
      {
        title: 'AI is not free on either side of Meta',
        body: 'Meta fees always apply. On Zoko, AI bots are listed as paid add-ons; on TopEdge, Intelligence / BYOK sits in the base plan with your own LLM keys.',
      },
    ],
    competitorPlans: [
      {
        name: 'Starter',
        price: 'from $49.99/mo',
        note: 'USD · $0.015/conversation markup · Meta separate',
        highlights: [
          'Unlimited agents',
          'Pre-built Shopify flows free',
          'Catalog sync',
          'AI bots add-on',
        ],
        popular: true,
      },
      {
        name: 'Plus',
        price: 'from $79.99/mo',
        note: '5K conv included · then $0.00199/conv',
        highlights: ['5 agents included', 'Shared inbox', 'Broadcast segments', 'AI bots add-on'],
      },
      {
        name: 'Elite',
        price: 'from $139.99/mo',
        note: '100K conv included · then $0.00099/conv',
        highlights: ['10 agents included', 'Higher conversation bucket', 'Same commerce stack'],
      },
    ],
    topedgePlansNote:
      'TopEdge Launch ₹1,999 · Growth ₹3,999 · Scale ₹6,499, flat INR by Shopify order volume. AI included; Meta conversation fees pass through separately — no Zoko-style per-conversation platform markup on Starter.',
    pricingCaveat:
      'Zoko (Sep 2026): Starter $49.99 + $0.015/conversation · Plus $79.99 (5K conv) · Elite $139.99 (100K) · Max $499.99 (5M) on zoko.io/pricing and the Shopify App Store listing. Custom flows ~$5.99/mo; AI bots from ~$24.99/mo/bot on the listing. Verify on zoko.io and apps.shopify.com/whatsapp-button-chat before purchase.',
    faqs: [
      {
        question: 'Who should pick TopEdge over Zoko?',
        answer:
          'Shopify India teams that want flat INR order-volume pricing, COD → prepaid and warranty in the core stack, and do not want platform cost to track conversation spikes during sales.',
      },
      {
        question: 'Does Zoko support COD?',
        answer:
          'Yes. Zoko’s public pricing lists essential ecommerce flows including double-confirm COD and convert COD → prepaid. TopEdge also ships COD journeys; we compete more on metering model and warranty than on “who can text COD.”',
      },
      {
        question: 'Is Zoko cheaper than TopEdge?',
        answer:
          'It depends on conversation volume. Starter looks mid-range in USD but adds $0.015 per conversation. Model your festival peak on zoko.io’s estimator, then compare to TopEdge’s published INR plans plus Meta pass-through.',
      },
      {
        question: 'Does TopEdge claim to be more “India-native” than Zoko?',
        answer:
          'No. Zoko markets India commerce hard and has the review history to match. TopEdge’s edge here is predictable INR platform pricing, warranty, and unified identity — not a claim that Zoko is foreign.',
      },
    ],
    related: [
      { label: 'Alternatives index', href: '/compare/alternatives' },
      { label: 'vs Bitespeed', href: '/compare/bitespeed' },
      { label: 'vs Getgabs', href: '/compare/getgabs' },
      { label: 'vs Kanal', href: '/compare/kanal' },
      { label: 'vs Dondy', href: '/compare/dondy' },
      { label: 'TopEdge pricing', href: '/pricing' },
    ],
  },

  getgabs: {
    slug: 'getgabs',
    name: 'Getgabs',
    shortName: 'Getgabs',
    website: 'https://getgabs.com',
    logo: '/marketing/compare/compare-logo-getgabs.svg',
    logoAlt: 'Getgabs logo',
    accent: '#16a34a',
    brandTag: 'Low-cost WhatsApp entry',
    title: 'TopEdge vs Getgabs (2026) | Cheap Entry vs Native Depth',
    description:
      'Compare TopEdge vs Getgabs: free-to-install / low USD entry vs TopEdge’s COD → prepaid, warranty, unified identity, and visual journeys included on INR plans.',
    keywords:
      'TopEdge vs Getgabs, Getgabs alternative Shopify, Getgabs pricing, cheap WhatsApp Shopify app, Getgabs vs TopEdge',
    h1: 'TopEdge vs Getgabs',
    subtitle: 'TopEdge AI vs Getgabs for Shopify WhatsApp ecommerce.',
    answerFirst:
      'Pick Getgabs if you want the cheapest possible entry (free to install; paid from about $11–$15/mo depending on listing) and will add depth later. Pick TopEdge AI if you want COD → prepaid, warranty, unified customer identity, and a full visual journey stack built in from day one on published INR plans.',
    whoForTopEdge:
      'You need COD risk conversion, warranty, unified identity, and Meta-gated journeys without piecing depth together from add-ons later.',
    whoForCompetitor:
      'You are cost-sensitive at install time and mainly need cart reminders, order updates, COD confirmations, and a shared inbox to start.',
    positioning:
      'Getgabs wins on sticker price. TopEdge wins on what ships natively for Indian D2C ops — do not use this page to claim TopEdge is cheaper.',
    researchAsOf: 'Sep 2026',
    differentiators: [
      {
        title: 'Depth at day one',
        body: 'COD → prepaid as a distinct builder, warranty hub, and unified identity ship on TopEdge. Getgabs lists COD verification and cart recovery — check which ecommerce automations unlock only on higher tiers.',
      },
      {
        title: 'Journey builder vs flow limits',
        body: 'TopEdge visual journeys run unlimited on plans. Getgabs chatbot flows are unlimited on site plans, but auto-trigger and crawl meters still apply — verify live.',
      },
      {
        title: 'Honest on price',
        body: 'Getgabs is dramatically cheaper to start. If budget is the only criterion, they win. This comparison is about what you still need to buy or build after install.',
      },
      {
        title: 'INR forecasting',
        body: 'TopEdge publishes Launch ₹1,999 · Growth ₹3,999 · Scale ₹6,499. Getgabs bills USD subscriptions plus Meta — fine for many stores, harder for India finance teams modeling ₹.',
      },
    ],
    matrix: GETGABS_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Getgabs pricing as of September 2026: getgabs.com lists Basic $15 · Plus $21 · Pro $59 (0% Meta markup claimed). Shopify App Store (apps.shopify.com/getgabs-whatsapp-chatbot-api) shows free to install, Plus $11/mo, Pro $59/mo, ~15 reviews. Figures disagree across surfaces — confirm live before purchase.',
    scorecard: [
      {
        area: 'Entry price',
        topedge: 'Launch ₹1,999/mo',
        competitor: 'Free install; paid ~$11–$15/mo entry',
        edge: 'Competitor',
      },
      {
        area: 'COD → prepaid depth',
        topedge: 'Native conversion journeys',
        competitor: 'COD verification listed; conversion builder depth verify live',
        edge: 'TopEdge',
      },
      {
        area: 'Warranty',
        topedge: 'Native hub',
        competitor: 'Not found as first-class product',
        edge: 'TopEdge',
      },
      {
        area: 'Unified identity',
        topedge: 'Native',
        competitor: 'Lead CRM / contacts',
        edge: 'TopEdge',
      },
      {
        area: 'Cart recovery',
        topedge: 'Native journeys',
        competitor: 'Abandoned cart on Shopify app + site ecommerce tiers',
        edge: 'Even',
      },
      {
        area: 'Shared inbox',
        topedge: 'WhatsApp inbox with order context',
        competitor: 'Team inbox (agent seats by plan)',
        edge: 'Even',
      },
      {
        area: 'Meta markup',
        topedge: '0% platform markup',
        competitor: 'Claims 0% markup on getgabs.com',
        edge: 'Even',
      },
      {
        area: 'Shopify review history',
        topedge: 'Newer / growing',
        competitor: '~15 reviews (Sep 2026) — verify live',
        edge: 'Trade-off',
      },
    ],
    deepDives: [
      {
        title: 'Cheap to start, check what is still gated',
        body: 'On getgabs.com, abandoned checkout reminders and several ecommerce automations sit on Plus+. On Shopify, Plus starts at $11/mo. Map the exact feature you need (COD conversion, warranty, identity) to the tier — do not assume the free install unlocks the full stack.',
      },
      {
        title: 'When Getgabs is the right call',
        body: 'Early stores that only need cart nudges, order updates, and a light inbox should try Getgabs first. Switching later is normal; this page is not arguing you must buy TopEdge on day one.',
      },
      {
        title: 'When TopEdge pays for itself',
        body: 'If COD RTO, warranty claims, or multi-number shoppers already cost you ops hours, the higher INR plan often replaces several add-ons and spreadsheets — still not a “cheaper” claim.',
      },
    ],
    competitorPlans: [
      {
        name: 'Free install',
        price: 'Free to install',
        note: 'Shopify listing · paid subscription unlocks features',
        highlights: ['Install from App Store', 'Paid plan required for full stack', 'Meta fees separate'],
      },
      {
        name: 'Plus (Shopify listing)',
        price: 'from $11/mo',
        note: 'App Store · site Basic/Plus differ ($15/$21) — verify',
        highlights: ['Higher broadcast limits', 'Team inbox seats', 'Ecommerce automations'],
        popular: true,
      },
      {
        name: 'Pro',
        price: 'from $59/mo',
        note: 'Unlimited broadcast on listing · Meta separate',
        highlights: ['Higher agent seats', 'Dedicated support', 'Advanced automation'],
      },
    ],
    topedgePlansNote:
      'TopEdge Launch ₹1,999 · Growth ₹3,999 · Scale ₹6,499. Not the cheapest entry — priced for COD, warranty, identity, and journeys included.',
    pricingCaveat:
      'Getgabs (Sep 2026): Shopify App Store free to install, Plus $11/mo, Pro $59/mo (~15 reviews). getgabs.com shows Basic $15 · Plus $21 · Pro $59 with 0% markup claim. Verify on getgabs.com/pricing and apps.shopify.com/getgabs-whatsapp-chatbot-api — do not mix the two tables without checking.',
    faqs: [
      {
        question: 'Is Getgabs cheaper than TopEdge?',
        answer:
          'Yes on entry price. Free to install and paid tiers around $11–$15/mo beat TopEdge Launch on sticker cost. This page does not claim TopEdge wins on price.',
      },
      {
        question: 'What does TopEdge include that Getgabs may not at entry?',
        answer:
          'COD → prepaid as a distinct journey, warranty management, unified customer identity across numbers/emails, and a full visual journey stack on published INR plans. Confirm Getgabs tier gates on their live pricing matrix.',
      },
      {
        question: 'Does Getgabs do abandoned cart and COD?',
        answer:
          'Yes — abandoned cart recovery, order notifications, and COD confirmations are core marketing claims. Depth of COD → prepaid conversion vs confirm-only is what you should verify in a demo.',
      },
      {
        question: 'Which listing should I trust for price?',
        answer:
          'Check both getgabs.com/pricing and the Shopify App Store listing the same day you buy. As of Sep 2026 they disagree on entry tier dollars.',
      },
    ],
    related: [
      { label: 'Alternatives index', href: '/compare/alternatives' },
      { label: 'vs Zoko', href: '/compare/zoko' },
      { label: 'vs Bitespeed', href: '/compare/bitespeed' },
      { label: 'vs Kanal', href: '/compare/kanal' },
      { label: 'vs Dondy', href: '/compare/dondy' },
      { label: 'TopEdge pricing', href: '/pricing' },
    ],
  },

  kanal: {
    slug: 'kanal',
    name: 'Kanal',
    shortName: 'Kanal',
    website: 'https://getkanal.com',
    logo: '/marketing/compare/compare-logo-kanal.svg',
    logoAlt: 'Kanal logo',
    accent: '#7c3aed',
    brandTag: 'Global WhatsApp + Klaviyo',
    title: 'TopEdge vs Kanal (2026) | INR India vs EUR Global WA',
    description:
      'Compare TopEdge vs Kanal: flat INR India COD workflows vs Kanal Pro from €89/mo, Klaviyo, and global WhatsApp for Shopify.',
    keywords:
      'TopEdge vs Kanal, Kanal alternative Shopify, Kanal pricing, Kanal WhatsApp Klaviyo, Shopify WhatsApp India vs Kanal',
    h1: 'TopEdge vs Kanal',
    subtitle: 'TopEdge AI vs Kanal for Shopify WhatsApp ecommerce.',
    answerFirst:
      'Pick TopEdge AI for Shopify India recovery, COD, and inbox on flat INR pricing with no EUR/USD platform floor. Pick Kanal when you want global WhatsApp marketing beside Klaviyo (and Recharge / Gorgias) and can budget Pro from €89/mo on getkanal.com.',
    whoForTopEdge:
      'India D2C operators who need COD workflows, INR forecasting, and WhatsApp + Shopify without an ESP-first global stack.',
    whoForCompetitor:
      'Multi-market Shopify brands that already run Klaviyo and want WhatsApp as a complementary channel with EU-priced plans.',
    positioning:
      'Kanal is a strong global WhatsApp marketing app with ESP integrations. TopEdge is India-first: INR plans, COD, Meta gating — the same angle that fits vs Bitespeed applies cleanly here.',
    researchAsOf: 'Sep 2026',
    differentiators: [
      {
        title: 'INR vs EUR floor',
        body: 'TopEdge Launch starts at ₹1,999/mo. Kanal Pro starts at €89/mo on getkanal.com (Shopify listing often shows $89) — a real currency and floor difference for Indian finance teams.',
      },
      {
        title: 'India COD workflows',
        body: 'TopEdge ships COD confirm and COD → prepaid for Indian checkout patterns. Kanal’s public marketing is global cart recovery and campaigns — no India-specific COD positioning found.',
      },
      {
        title: 'Klaviyo complement',
        body: 'Kanal integrates natively with Klaviyo. TopEdge is WhatsApp + Shopify focused — keep your ESP if you have one; we do not claim to replace Klaviyo.',
      },
      {
        title: 'AI unlock',
        body: 'TopEdge includes Intelligence / BYOK on core plans. Kanal’s AI Agent is listed on Scale+ (€149+) on getkanal.com — verify live.',
      },
    ],
    matrix: KANAL_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Kanal plans as of September 2026 from getkanal.com/pricing: Pro €89 · Scale €149 · Business €350 · Agency €1,900 /mo. Shopify App Store (apps.shopify.com/kanal-marketing-ai) shows Pro/Scale in USD (~$89/$149) and ~97 reviews @ 5.0 — verify live; currency display differs by surface.',
    scorecard: [
      {
        area: 'Pricing currency / floor',
        topedge: 'Flat INR from ₹1,999',
        competitor: 'From €89/mo Pro (getkanal.com)',
        edge: 'TopEdge',
      },
      {
        area: 'India COD',
        topedge: 'Native COD + COD → prepaid',
        competitor: 'No India-specific COD positioning found',
        edge: 'TopEdge',
      },
      {
        area: 'Klaviyo / ESP complement',
        topedge: 'Pair your own ESP',
        competitor: 'Native Klaviyo (+ Recharge, Gorgias, Crisp)',
        edge: 'Competitor',
      },
      {
        area: 'Abandoned cart',
        topedge: 'Native journeys',
        competitor: 'On Pro+',
        edge: 'Even',
      },
      {
        area: 'AI agent',
        topedge: 'Included on core plans',
        competitor: 'Scale+ (€149+) — verify live',
        edge: 'TopEdge',
      },
      {
        area: 'Warranty',
        topedge: 'Native hub',
        competitor: 'Not found as first-class product',
        edge: 'TopEdge',
      },
      {
        area: 'Multi-market',
        topedge: 'India-first',
        competitor: 'Multi-market add-ons on Scale+',
        edge: 'Competitor',
      },
      {
        area: 'Shopify reviews',
        topedge: 'Newer / growing',
        competitor: '~97 reviews @ 5.0 (Sep 2026) — verify live',
        edge: 'Competitor',
      },
    ],
    deepDives: [
      {
        title: 'Same India angle as vs Bitespeed',
        body: 'Kanal is EUR/global-first. Flat INR, COD-native journeys, and no Western currency floor are honest differentiators here — unlike vs Zoko, where India-native positioning already belongs to the competitor.',
      },
      {
        title: 'When Kanal fits better',
        body: 'If Klaviyo is the center of your lifecycle stack and WhatsApp is a complementary channel across markets, Kanal’s integrations and Pro footprint are built for that job.',
      },
      {
        title: 'AI and advanced automations',
        body: 'On getkanal.com, AI Agent and advanced automations unlock on Scale (€149+). Model that against TopEdge Growth/Scale where Intelligence is already in the base catalog.',
      },
    ],
    competitorPlans: [
      {
        name: 'Pro',
        price: 'from €89/mo',
        note: 'getkanal.com · 1 user · cart recovery',
        highlights: ['Abandoned cart recovery', 'Klaviyo / Recharge / Crisp / Gorgias', 'Campaigns'],
        popular: true,
      },
      {
        name: 'Scale',
        price: 'from €149/mo',
        note: '5 users · AI Agent · advanced automations',
        highlights: ['AI Agent', 'Unlimited automations', 'Klaviyo', 'Segments'],
      },
      {
        name: 'Business',
        price: 'from €350/mo',
        note: 'Done-for-you · unlimited users',
        highlights: ['Flow setup by experts', 'Campaigns on demand', 'Dedicated AM'],
      },
    ],
    topedgePlansNote:
      'TopEdge Launch ₹1,999 · Growth ₹3,999 · Scale ₹6,499, flat INR by Shopify orders for India D2C — no €89 Pro floor.',
    pricingCaveat:
      'Kanal (Sep 2026): Pro €89 · Scale €149 · Business €350 · Agency €1,900 /mo on getkanal.com/pricing. Shopify listing shows ~$89/$149 USD and ~97 reviews @ 5.0. Meta fees separate. Verify on getkanal.com and apps.shopify.com/kanal-marketing-ai before purchase.',
    faqs: [
      {
        question: 'Who should pick TopEdge over Kanal?',
        answer:
          'Shopify India teams that need COD workflows and INR pricing without a €89+ global WhatsApp floor, and that do not need native Klaviyo as the buying criterion.',
      },
      {
        question: 'Does Kanal integrate with Klaviyo?',
        answer:
          'Yes — Klaviyo is a listed integration on Pro/Scale marketing. TopEdge does not try to replace your ESP; pair whatever email stack you already run.',
      },
      {
        question: 'Is Kanal priced in INR?',
        answer:
          'Public getkanal.com pricing is in EUR. Shopify may display USD. TopEdge publishes and bills flat INR Launch / Growth / Scale.',
      },
      {
        question: 'Does Kanal do India COD → prepaid?',
        answer:
          'No India-specific COD positioning showed up on public marketing at research time. TopEdge treats COD confirm and COD → prepaid as core India journeys — verify any Kanal COD claims live if they appear later.',
      },
    ],
    related: [
      { label: 'Alternatives index', href: '/compare/alternatives' },
      { label: 'vs Bitespeed', href: '/compare/bitespeed' },
      { label: 'vs Zoko', href: '/compare/zoko' },
      { label: 'vs Getgabs', href: '/compare/getgabs' },
      { label: 'vs Dondy', href: '/compare/dondy' },
      { label: 'TopEdge pricing', href: '/pricing' },
    ],
  },

  dondy: {
    slug: 'dondy',
    name: 'Dondy',
    shortName: 'Dondy',
    website: 'https://www.dondy.net/dondy-pricing',
    logo: '/marketing/compare/compare-logo-dondy.svg',
    logoAlt: 'Dondy logo',
    accent: '#0f766e',
    brandTag: 'WhatsApp widget + USD automation',
    title: 'TopEdge vs Dondy (2026) | 0% Meta Markup vs ~60% Rate Card',
    description:
      'Compare TopEdge vs Dondy: Dondy’s India rate is $0.01888/message (~60% above Meta). TopEdge is 0% markup, flat INR, and native COD to prepaid.',
    keywords:
      'TopEdge vs Dondy, Dondy alternative Shopify, Dondy WhatsApp markup, Dondy pricing India, Dondy vs TopEdge',
    h1: 'TopEdge vs Dondy',
    subtitle: 'TopEdge AI vs Dondy for Shopify WhatsApp ecommerce.',
    answerFirst:
      'Dondy’s own rate table charges about 60% above Meta’s marketing rate — India is listed at $0.01888 per message versus roughly $0.0118 at Meta. Pick TopEdge for 0% markup, flat INR plans, and native COD → prepaid. Pick Dondy for a broad widget, inbox, and Elite-tier AI on USD plans.',
    whoForTopEdge:
      'You want India COD → prepaid, warranty, and a platform fee that does not mark up Meta’s rate card.',
    whoForCompetitor:
      'You want a floating WhatsApp widget, campaigns, a multi-agent inbox, and an AI agent on the Elite tier, and you can budget USD plus their published per-message rates.',
    positioning:
      'Dondy is a broad Shopify WhatsApp app (widget through Elite AI) priced in USD. Its public rate table sits about 60% above Meta marketing rates. TopEdge passes Meta through at 0% and prices the platform in INR.',
    researchAsOf: 'Sep 2026',
    differentiators: [
      {
        title: 'About 60% above Meta’s marketing rate',
        body: 'On dondy.net/dondy-pricing (21 Sep 2026), India is $0.01888 per message and Central & Eastern Europe is $0.1376. Those are exactly 1.6× commonly published Meta marketing rates ($0.0118 and $0.086). Re-check Meta’s live card — it changes. The table does not split marketing vs utility.',
      },
      {
        title: '1,000 India messages, in dollars',
        body: '1,000 × $0.01888 ≈ $18.88 on Dondy’s India rate, versus about $11.80 if Meta bills $0.0118 — roughly $7.08 extra on the message line, before the $79.99 Power Automation subscription. Power and Elite also include 1,000 one-click messages / 30 days; confirm whether that bucket is exempt from the rate card.',
      },
      {
        title: 'India COD, not just a feature tag',
        body: 'The Shopify listing tags COD verification. TopEdge ships COD → prepaid as a native journey for Indian checkout. Dondy’s public languages are English, Spanish, Italian, Portuguese (Brazil), and French — not an India-first product.',
      },
      {
        title: 'Honest on breadth',
        body: 'Free floating widget, Klaviyo in Works with, campaigns from $79.99, and an AI sales/support agent only on Elite ($159.99) are real. We do not pretend Dondy is a thin chat button.',
      },
    ],
    matrix: DONDYY_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Checked 21 Sep 2026: Shopify listing apps.shopify.com/dondy-marketing-ai shows 4.9★ / 821 reviews, Free widget, Pro $6.99, Power Automation $79.99, Elite $159.99. dondy.net/dondy-pricing also lists an Advanced $14.99 tier and the per-market rate table (India $0.01888). Surfaces disagree on agent seats (listing: 5 on Elite; site: unlimited) and on the US floor (“from $0.0158” on the listing vs North America $0.04 on the table). Verify both before purchase.',
    scorecard: [
      {
        area: 'Meta markup',
        topedge: '0% — Meta pass-through',
        competitor: '~60% above Meta marketing rates on the published table',
        edge: 'TopEdge',
      },
      {
        area: '1,000 India messages',
        topedge: 'Meta’s own rate only',
        competitor: '≈ $18.88 at $0.01888 vs ≈ $11.80 at Meta $0.0118',
        edge: 'TopEdge',
      },
      {
        area: 'Platform currency',
        topedge: 'Flat INR from ₹1,999',
        competitor: 'USD tiers from free widget to $159.99 Elite',
        edge: 'TopEdge',
      },
      {
        area: 'COD → prepaid',
        topedge: 'Native India journeys',
        competitor: 'COD verification listed; conversion builder depth verify live',
        edge: 'TopEdge',
      },
      {
        area: 'Feature breadth',
        topedge: 'WhatsApp + Shopify journeys',
        competitor: 'Widget, campaigns, inbox, Klaviyo, review apps',
        edge: 'Competitor',
      },
      {
        area: 'AI agent',
        topedge: 'Included on core plans',
        competitor: 'Elite only ($159.99) — Shopify listing',
        edge: 'Trade-off',
      },
      {
        area: 'Multi-agent inbox',
        topedge: 'WhatsApp inbox with order context',
        competitor: 'Elite inbox (5 agents on listing; unlimited on site)',
        edge: 'Competitor',
      },
      {
        area: 'Shopify reviews',
        topedge: 'Newer / growing',
        competitor: '4.9★ / 821 reviews (21 Sep 2026) — verify live',
        edge: 'Competitor',
      },
      {
        area: 'Warranty',
        topedge: 'Native hub',
        competitor: 'Not found as first-class product',
        edge: 'TopEdge',
      },
    ],
    deepDives: [
      {
        title: 'Does Dondy charge more than Meta’s own rate?',
        body: 'Yes, on the rate table Dondy publishes. India $0.01888 and CEE $0.1376 are 60% above $0.0118 and $0.086. That is the message line only. You still add Power Automation ($79.99) or Elite ($159.99) for automations, and Meta’s category (marketing vs utility) may not match a single rate — the table does not split categories. The Shopify listing’s “from $0.0158 (US)” does not match North America $0.04 on the same company’s pricing page. Use the table for country math and re-check both URLs.',
      },
      {
        title: 'Where Dondy still fits',
        body: 'If you want a free chat widget today, Klaviyo in the same app, review-app hooks, and you are fine paying USD plus a marked-up rate card, Dondy is a serious global option with a large Shopify review count. The AI agent is an Elite decision, not a Pro decision.',
      },
      {
        title: 'India angle, same as vs Kanal',
        body: 'Nothing on the public listing is India-first: USD billing, no Hindi in the language list, COD appears as a generic verification feature. Flat INR and COD → prepaid are honest differentiators here.',
      },
    ],
    competitorPlans: [
      {
        name: 'Pro',
        price: 'from $6.99/mo',
        note: 'Widget upgrades · manual cart/order messages',
        highlights: ['Premium button designs', 'Manual abandoned cart', 'Not full API automation'],
      },
      {
        name: 'Power Automation',
        price: 'from $79.99/mo',
        note: 'USD · rate table on top · 1,000 one-click msgs / 30 days',
        highlights: ['Abandoned cart automation', 'Campaigns & inbox', 'Official WhatsApp API'],
        popular: true,
      },
      {
        name: 'Elite',
        price: 'from $159.99/mo',
        note: 'AI agent unlocks here · listing rates from $0.0126 (US)',
        highlights: ['AI chatbot sales & support', 'Multi-agent inbox', 'Green tick assistance'],
      },
    ],
    topedgePlansNote:
      'TopEdge Launch ₹1,999 · Growth ₹3,999 · Scale ₹6,499. Meta conversation fees pass through at 0% markup — no Dondy-style country rate card on top.',
    pricingCaveat:
      'Dondy (21 Sep 2026): Shopify App Store Free / Pro $6.99 / Power Automation $79.99 / Elite $159.99, 4.9★ from 821 reviews. Rate table on dondy.net/dondy-pricing lists India at $0.01888 per message (~60% above a $0.0118 Meta marketing rate). Site also shows Advanced $14.99, which the App Store listing does not. Verify apps.shopify.com/dondy-marketing-ai and dondy.net/dondy-pricing before purchase.',
    faqs: [
      {
        question: 'Does Dondy charge more than Meta’s own rate?',
        answer:
          'On the rate table at dondy.net/dondy-pricing, yes. India is listed at $0.01888 per message, which is 60% above $0.0118 (a commonly published Meta India marketing rate). Central & Eastern Europe is $0.1376 versus $0.086 — the same 60%. Confirm Meta’s current card, because Meta updates rates, and Dondy’s table does not split marketing vs utility. The Shopify listing also says rates “start from $0.0158 (US)” on Power Automation, which does not match North America $0.04 on the website table.',
      },
      {
        question: 'What do 1,000 WhatsApp messages to India cost on Dondy’s card?',
        answer:
          '1,000 × $0.01888 is about $18.88. At Meta’s $0.0118 marketing rate that volume is about $11.80 — roughly $7.08 more on the message line, before the $79.99 Power Automation or $159.99 Elite subscription. Both of those plans include 1,000 one-click messages every 30 days; confirm live whether that allowance replaces the rate-card charge.',
      },
      {
        question: 'Who should pick TopEdge over Dondy?',
        answer:
          'Shopify India teams that want 0% Meta markup, flat INR plans, and COD → prepaid as a native journey. Pick Dondy if widget breadth, Klaviyo, and an Elite AI agent matter more than the rate-card markup.',
      },
      {
        question: 'Does Dondy include an AI agent on every plan?',
        answer:
          'No. The Shopify listing puts “AI Chatbot for Sales & Support” on Elite at $159.99/mo. Pro ($6.99) is widget and manual messages. Power Automation ($79.99) is where automated cart recovery and campaigns start.',
      },
    ],
    related: [
      { label: 'Alternatives index', href: '/compare/alternatives' },
      { label: 'vs Kanal', href: '/compare/kanal' },
      { label: 'vs Bitespeed', href: '/compare/bitespeed' },
      { label: 'vs Zoko', href: '/compare/zoko' },
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
