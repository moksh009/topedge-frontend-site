import {
  AISENSY_PAIRWISE_MATRIX,
  BITESPEED_PAIRWISE_MATRIX,
  GETGABS_PAIRWISE_MATRIX,
  GUPSHUP_PAIRWISE_MATRIX,
  INTERAKT_PAIRWISE_MATRIX,
  DONDYY_PAIRWISE_MATRIX,
  KANAL_PAIRWISE_MATRIX,
  UPDATRR_PAIRWISE_MATRIX,
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
  /** Lean pages omit these — capability matrix is the page. */
  answerFirst?: string;
  whoForTopEdge?: string;
  whoForCompetitor?: string;
  positioning?: string;
  differentiators?: { title: string; body: string }[];
  matrix: CompareRow[];
  /** Footnote under capability board (unverified / dated claims) */
  matrixNote?: string;
  /** Research freshness stamp shown in UI + copy */
  researchAsOf?: string;
  scorecard?: CompareScoreRow[];
  deepDives?: { title: string; body: string }[];
  competitorPlans?: CompetitorPlan[];
  topedgePlansNote?: string;
  pricingCaveat?: string;
  faqs?: { question: string; answer: string }[];
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
    matrix: WATI_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Capability claims reflect TopEdge product positioning vs publicly described WATI platform patterns. Confirm live plan limits and fees on wati.io before purchase.',
    researchAsOf: 'Sep 2026',
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
    matrix: AISENSY_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Capability claims reflect TopEdge product positioning vs publicly described AiSensy platform patterns. Confirm live plan limits, credits, and fees on aisensy.com before purchase.',
    researchAsOf: 'Sep 2026',
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
    matrix: INTERAKT_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Capability board uses TopEdge product positioning vs publicly described Interakt plan patterns. Confirm live App vs India website tiers, AI add-ons (₹0.50 / message after 100 free), and Meta fees on interakt.shop before purchase.',
    researchAsOf: 'Sep 2026',
    related: [
      { label: 'All comparisons', href: '/compare' },
      { label: 'vs WATI', href: '/compare/wati' },
      { label: 'vs AiSensy', href: '/compare/aisensy' },
      { label: 'vs Updatrr', href: '/compare/updatrr' },
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
    researchAsOf: 'Sep 2026',
    matrix: BITESPEED_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Bitespeed pricing and AI add-ons as of September 2026 from public listings / third-party summaries. Confirm live on bitespeed.co and the Shopify App Store before purchase.',
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
    researchAsOf: 'Sep 2026',
    matrix: ZOKO_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Zoko plans and conversation rates as of September 2026 from zoko.io/pricing and apps.shopify.com/whatsapp-button-chat (Starter $49.99 · Plus $79.99 · Elite $139.99 · Max $499.99; Shopify reviews ~445). Confirm live before purchase — figures change.',
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
    researchAsOf: 'Sep 2026',
    matrix: GETGABS_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Getgabs pricing as of September 2026: getgabs.com lists Basic $15 · Plus $21 · Pro $59 (0% Meta markup claimed). Shopify App Store (apps.shopify.com/getgabs-whatsapp-chatbot-api) shows free to install, Plus $11/mo, Pro $59/mo, ~15 reviews. Figures disagree across surfaces — confirm live before purchase.',
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
    researchAsOf: 'Sep 2026',
    matrix: KANAL_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Kanal plans as of September 2026 from getkanal.com/pricing: Pro €89 · Scale €149 · Business €350 · Agency €1,900 /mo. Shopify App Store (apps.shopify.com/kanal-marketing-ai) shows Pro/Scale in USD (~$89/$149) and ~97 reviews @ 5.0 — verify live; currency display differs by surface.',
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
    researchAsOf: 'Sep 2026',
    matrix: DONDYY_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Checked 21 Sep 2026: Shopify listing apps.shopify.com/dondy-marketing-ai shows 4.9★ / 821 reviews, Free widget, Pro $6.99, Power Automation $79.99, Elite $159.99. dondy.net/dondy-pricing also lists an Advanced $14.99 tier and the per-market rate table (India $0.01888). Surfaces disagree on agent seats (listing: 5 on Elite; site: unlimited) and on the US floor (“from $0.0158” on the listing vs North America $0.04 on the table). Verify both before purchase.',
    related: [
      { label: 'Dondy alternative (markup)', href: '/blog/dondy-alternative-shopify-india' },
      { label: 'Best WhatsApp tools India', href: '/blog/best-whatsapp-automation-tools-shopify-india' },
      { label: 'Alternatives index', href: '/compare/alternatives' },
      { label: 'vs Updatrr', href: '/compare/updatrr' },
      { label: 'API pricing India', href: '/blog/whatsapp-business-api-pricing-india' },
      { label: 'TopEdge pricing', href: '/pricing' },
    ],
  },

  updatrr: {
    slug: 'updatrr',
    name: 'Updatrr',
    shortName: 'Updatrr',
    website: 'https://updatrr.com/',
    logo: '/marketing/compare/compare-logo-updatrr.svg',
    logoAlt: 'Updatrr logo',
    accent: '#ea580c',
    brandTag: 'Shopify-only WhatsApp automation',
    title: 'TopEdge vs Updatrr (2026) | Web WhatsApp Growth OS vs Shopify App',
    description:
      'Compare TopEdge vs Updatrr: web-based vs Shopify-only, BYOK AI vs per-conversation AI, visitor identity pixel, unified identity, warranty, and unlimited flows.',
    keywords:
      'TopEdge vs Updatrr, Updatrr alternative India, Updatrr WhatsApp Shopify, Updatrr pricing, TopEdge vs Updatrr COD prepaid, Updatrr AI conversation cost',
    h1: 'TopEdge vs Updatrr',
    subtitle: 'TopEdge AI vs Updatrr for Shopify WhatsApp ecommerce.',
    matrix: UPDATRR_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Capability board uses TopEdge product positioning vs publicly described Updatrr Shopify-app patterns. Confirm live plan limits, AI fees, and Meta billing on updatrr.com and apps.shopify.com/prizma-updatrr before purchase.',
    researchAsOf: 'Sep 2026',
    related: [
      { label: 'All comparisons', href: '/compare' },
      { label: 'Alternatives index', href: '/compare/alternatives' },
      { label: 'vs Dondy', href: '/compare/dondy' },
      { label: 'vs Bitespeed', href: '/compare/bitespeed' },
      { label: 'vs Zoko', href: '/compare/zoko' },
      { label: 'TopEdge pricing', href: '/pricing' },
    ],
  },

  gupshup: {
    slug: 'gupshup',
    name: 'Gupshup',
    shortName: 'Gupshup',
    website: 'https://www.gupshup.io/',
    logo: '/marketing/compare/compare-logo-gupshup.svg',
    logoAlt: 'Gupshup logo',
    accent: '#00a651',
    brandTag: 'Enterprise WhatsApp CPaaS',
    title: 'TopEdge vs Gupshup (2026) | Flat INR vs Pay-as-you-go CPaaS',
    description:
      'Compare TopEdge vs Gupshup: flat INR, 0% Meta markup, and COD → prepaid vs pay-as-you-go CPaaS with template fees and Conversation Studio.',
    keywords:
      'TopEdge vs Gupshup, Gupshup alternative Shopify India, Gupshup WhatsApp markup, Gupshup vs TopEdge, Gupshup Conversation Studio, Gupshup COD prepaid',
    h1: 'TopEdge vs Gupshup',
    subtitle: 'TopEdge AI vs Gupshup for Shopify WhatsApp ecommerce.',
    researchAsOf: 'Sep 2026',
    matrix: GUPSHUP_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor }) => ({
      label,
      description,
      topedge,
      competitor,
    })),
    matrixNote:
      'Board compiled Sep 2026 from TopEdge product positioning vs publicly described Gupshup CPaaS / Conversation Studio / Auto Bot patterns. Gupshup enterprise quotes and fee cards move—verify messaging fees, AI packaging, and module gates on gupshup.io (and any regional sales deck) before purchase.',
    related: [
      { label: 'All comparisons', href: '/compare' },
      { label: 'Alternatives index', href: '/compare/alternatives' },
      { label: 'vs WATI', href: '/compare/wati' },
      { label: 'vs AiSensy', href: '/compare/aisensy' },
      { label: 'vs Dondy', href: '/compare/dondy' },
      { label: 'API pricing India', href: '/blog/whatsapp-business-api-pricing-india' },
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
