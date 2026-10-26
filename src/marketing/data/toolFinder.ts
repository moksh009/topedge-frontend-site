import {
  AISENSY_PAIRWISE_MATRIX,
  BITESPEED_PAIRWISE_MATRIX,
  INTERAKT_PAIRWISE_MATRIX,
  WATI_PAIRWISE_MATRIX,
  type PairwiseFeatureRow,
} from './compareFeatureMatrix';
import type { SourceId } from '@/data/sources';
import { trustpilotSummary } from './socialProof';

/**
 * The "find the best WhatsApp tool for my Shopify store" quiz.
 *
 * Rules this file keeps, because the page only works if a merchant trusts it:
 *
 *   1. No competitor fact is written here. The side-by-side cells are looked
 *      up from the pairwise boards on /compare/*, which are the approved,
 *      dated copies; prices come from sources.ts. A reason string may only
 *      restate one of those.
 *   2. The scoring has to let other tools win. A store that is not on Shopify,
 *      is Instagram-led, or is past TopEdge's public plan ceiling gets pointed
 *      elsewhere, and the result says why.
 *   3. Every weight is visible in this file, so "how we score" on the page is
 *      a summary of code anyone can read, not a promise.
 */

export type VendorId = 'topedge' | 'wati' | 'interakt' | 'aisensy' | 'bitespeed';

export type Vendor = {
  id: VendorId;
  name: string;
  logo: string;
  /** Our own pairwise page, where the cells below are published in full. */
  comparePath?: string;
  website: string;
  /** Who it suits, in one line. Shown on every result card. */
  pickIf: string;
  price: string;
  /** The honest catch that applies whatever the answers. Every vendor has one. */
  caveat: string;
};

export const VENDORS: Record<VendorId, Vendor> = {
  topedge: {
    id: 'topedge',
    name: 'TopEdge AI',
    logo: '/brand-mark-56.png',
    website: 'https://topedgeai.com',
    pickIf:
      'You run a Shopify store in India and want cart recovery, COD confirmation and order updates working without a developer.',
    price: '₹1,999 to ₹6,499 a month, 14-day free trial',
    caveat: `Newer than WATI or Interakt, with fewer published reviews: ${trustpilotSummary()}.`,
  },
  wati: {
    id: 'wati',
    name: 'WATI',
    logo: '/marketing/compare/compare-logo-wati.png',
    comparePath: '/compare/wati',
    website: 'https://www.wati.io',
    pickIf:
      'You are not on Shopify, or you want a general-purpose WhatsApp platform rather than one built for ecommerce.',
    price: 'Plan tiers plus per-conversation charges',
    caveat: 'There is no single all-in India price, so model your own monthly volume before comparing.',
  },
  interakt: {
    id: 'interakt',
    name: 'Interakt',
    logo: '/marketing/compare/compare-logo-interakt.png',
    comparePath: '/compare/interakt',
    website: 'https://www.interakt.shop',
    pickIf: 'Instagram is as important to you as WhatsApp and you want both on one plan.',
    price: 'WhatsApp plans from ₹2,799 a month',
    caveat: 'The ₹999 Starter plan is Instagram only. WhatsApp starts on Growth at ₹2,799.',
  },
  aisensy: {
    id: 'aisensy',
    name: 'AiSensy',
    logo: '/marketing/compare/compare-logo-aisensy.png',
    comparePath: '/compare/aisensy',
    website: 'https://aisensy.com',
    pickIf: 'Broadcast campaigns are your main use and you are not on Shopify.',
    price: 'Plan plus Meta charges and metered AI credits',
    caveat: 'Pricing depends on credits and tiers, so confirm the current India plan on aisensy.com.',
  },
  bitespeed: {
    id: 'bitespeed',
    name: 'Bitespeed',
    logo: '/marketing/compare/compare-logo-bitespeed.png',
    comparePath: '/compare/bitespeed',
    website: 'https://www.bitespeed.co',
    pickIf: 'You are a larger Shopify brand doing ₹5,00,000+ a month and budget is not the constraint.',
    price: 'From about ₹15,000 a month',
    caveat: 'Asks for ₹5,00,000+ in monthly revenue before it onboards a store.',
  },
};

export const VENDOR_ORDER: VendorId[] = ['topedge', 'wati', 'interakt', 'aisensy', 'bitespeed'];

type Points = Partial<Record<VendorId, number>>;
type Notes = Partial<Record<VendorId, string>>;

export type Option = {
  id: string;
  label: string;
  hint?: string;
  points: Points;
  /** Why this answer counts for a vendor. Shown under "Why it fits". */
  reasons?: Notes;
  /** What to know before choosing a vendor, given this answer. */
  cautions?: Notes;
  /** Vendors that cannot serve this answer at all, whatever else scores. */
  blocks?: VendorId[];
};

export type Question = {
  id: string;
  title: string;
  help?: string;
  /** Multi-select questions cap the picks, so one answer cannot dominate. */
  max?: number;
  options: Option[];
  /** A sourced fact shown under the options, with how the tools differ. */
  fact?: { text: string; source: SourceId; compare?: string };
};

const SHOPIFY_ONLY = 'Built for Shopify only, so it will not connect to your store.';

export const QUESTIONS: Question[] = [
  {
    id: 'platform',
    title: 'Where do you sell?',
    help: 'The store platform decides which tools can read your orders at all.',
    options: [
      {
        id: 'shopify',
        label: 'Shopify store',
        points: { topedge: 3, bitespeed: 3, interakt: 2, wati: 1, aisensy: 1 },
        reasons: {
          topedge: 'Made only for Shopify: orders, carts and COD status sync after a one-click connect.',
          bitespeed: 'Made for Shopify brands.',
          interakt: 'Has a Shopify integration.',
        },
      },
      {
        id: 'website',
        label: 'WooCommerce or another website',
        points: { wati: 3, aisensy: 3, interakt: 2 },
        reasons: {
          wati: 'Not tied to one store platform.',
          aisensy: 'Not tied to one store platform.',
        },
        cautions: { topedge: SHOPIFY_ONLY, bitespeed: SHOPIFY_ONLY },
        blocks: ['topedge', 'bitespeed'],
      },
      {
        id: 'social',
        label: 'Instagram or WhatsApp only, no website',
        points: { interakt: 3, wati: 2, aisensy: 2 },
        reasons: { interakt: 'WhatsApp and Instagram on one plan.' },
        cautions: {
          topedge: 'Needs a Shopify store to connect to.',
          bitespeed: 'Needs a Shopify store to connect to.',
        },
        blocks: ['topedge', 'bitespeed'],
      },
    ],
  },
  {
    id: 'orders',
    title: 'How many orders do you get a month?',
    help: 'Pricing on most tools moves with volume, so this decides which plan you would actually pay for.',
    options: [
      {
        id: 'lt100',
        label: 'Under 100',
        points: { topedge: 2, interakt: 2, aisensy: 2, wati: 1, bitespeed: -3 },
        reasons: { topedge: 'The Launch plan covers up to 100 orders a month at ₹1,999.' },
        cautions: { bitespeed: 'Asks for ₹5,00,000+ in monthly revenue before it onboards a store.' },
      },
      {
        id: 'lt800',
        label: '100 to 800',
        points: { topedge: 3, interakt: 2, aisensy: 1, wati: 1 },
        reasons: { topedge: 'The Growth plan covers up to 800 orders a month at ₹3,999.' },
        cautions: { bitespeed: 'Asks for ₹5,00,000+ in monthly revenue before it onboards a store.' },
      },
      {
        id: 'lt1500',
        label: '800 to 1,500',
        points: { topedge: 3, bitespeed: 2, wati: 1, interakt: 1, aisensy: 1 },
        reasons: { topedge: 'The Scale plan covers up to 1,500 orders a month at ₹6,499.' },
      },
      {
        id: 'gt1500',
        label: 'More than 1,500',
        points: { bitespeed: 3, wati: 2, topedge: 1, interakt: 1, aisensy: 1 },
        reasons: { bitespeed: 'Built for larger Shopify brands.' },
        cautions: {
          topedge: 'Public plans stop at 1,500 orders a month, so you would need a custom plan.',
        },
      },
    ],
  },
  {
    id: 'cod',
    title: 'How many of your orders are Cash on Delivery?',
    help: 'COD is where most Indian stores lose money, through parcels that come back unpaid.',
    options: [
      {
        id: 'high',
        label: 'More than half',
        points: { topedge: 3, bitespeed: 2, interakt: 1 },
        reasons: {
          topedge: 'COD confirmation on every plan, and automatic COD-to-prepaid offers on Growth and Scale.',
          bitespeed: 'COD to prepaid is built in.',
          interakt: 'COD to prepaid is available on its higher Advanced plan.',
        },
        cautions: {
          wati: 'COD to prepaid needs custom developer setup.',
          aisensy: 'COD to prepaid needs API work to map payment links to templates.',
        },
      },
      {
        id: 'mid',
        label: 'Between 20% and 50%',
        points: { topedge: 2, bitespeed: 1, interakt: 1 },
        reasons: {
          topedge: 'COD confirmation on every plan, and automatic COD-to-prepaid offers on Growth and Scale.',
          bitespeed: 'COD to prepaid is built in.',
        },
        cautions: {
          wati: 'COD to prepaid needs custom developer setup.',
          aisensy: 'COD to prepaid needs API work to map payment links to templates.',
        },
      },
      { id: 'low', label: 'Less than 20%', points: {} },
      { id: 'unsure', label: 'Not sure', points: { topedge: 1 } },
    ],
    fact: {
      text: 'COD orders come back far more often: about 26% return-to-origin for COD against under 2% for prepaid.',
      source: 'firstResortReturns',
      compare: 'TopEdge and Bitespeed handle COD to prepaid out of the box. On WATI and AiSensy it needs developer work.',
    },
  },
  {
    id: 'goals',
    title: 'What should WhatsApp do for you first?',
    help: 'Starting with one or two goals is what works in practice.',
    max: 2,
    options: [
      {
        id: 'cart',
        label: 'Recover abandoned carts',
        points: { topedge: 2, bitespeed: 2, interakt: 1, wati: 1, aisensy: 1 },
        reasons: { topedge: 'A ready-made three-reminder cart recovery journey.' },
      },
      {
        id: 'rto',
        label: 'Confirm COD orders and cut RTO',
        points: { topedge: 3, bitespeed: 2, interakt: 1 },
        reasons: {
          topedge: 'A ready-made COD confirmation journey that holds the order until the customer confirms.',
        },
      },
      {
        id: 'updates',
        label: 'Order and shipping updates',
        points: { topedge: 2, interakt: 1, wati: 1, aisensy: 1, bitespeed: 1 },
        reasons: { topedge: 'Order, shipping, delivery and cancellation updates ready to switch on.' },
      },
      {
        id: 'campaigns',
        label: 'Broadcast offers and campaigns',
        points: { aisensy: 2, wati: 2, interakt: 1, topedge: 1, bitespeed: 1 },
        reasons: { topedge: 'Campaign sends included on every plan, 3,000 to 30,000 a month.' },
      },
      {
        id: 'support',
        label: 'Answer customers in one inbox',
        points: { topedge: 2, wati: 2, interakt: 2, aisensy: 1 },
        reasons: {
          topedge: 'The shared inbox shows the Shopify order beside every chat.',
          interakt: 'A Sales CRM add-on for teams, ₹2,499 a month for 5 agents.',
        },
      },
      {
        id: 'ai',
        label: 'AI replies to common questions',
        points: { topedge: 2, interakt: 1, wati: 1, aisensy: 1 },
        reasons: {
          topedge: 'AI replies run on your own AI key, so there is no per-message AI fee on top.',
        },
        cautions: {
          interakt: 'WhatsApp AI Agents are a ₹3,000 add-on, then ₹0.50 per AI message after 100.',
          wati: 'AI needs the Astra or a higher tier plan.',
          aisensy: 'AI is a per-message add-on with credit-based charges.',
        },
      },
      {
        id: 'instagram',
        label: 'Instagram DMs too',
        points: { interakt: 3, topedge: 2 },
        reasons: {
          interakt: 'WhatsApp and Instagram on one plan.',
          topedge: 'Instagram comments and story mentions land in the same inbox as WhatsApp.',
        },
      },
    ],
    fact: {
      text: 'On average, 70.22% of online shopping carts are abandoned without a purchase.',
      source: 'baymardCart',
    },
  },
  {
    id: 'setup',
    title: 'Who will set it up?',
    options: [
      {
        id: 'nodev',
        label: 'Me or my team, no developer',
        points: { topedge: 2, bitespeed: 1, interakt: 1 },
        reasons: {
          topedge: 'Ready-made journeys and templates. Shopify connects in one click, no code.',
        },
      },
      {
        id: 'dev',
        label: 'We have a developer',
        points: { topedge: 1, wati: 1, aisensy: 1, interakt: 1, bitespeed: 1 },
      },
    ],
  },
  {
    id: 'price',
    title: 'What matters most about price?',
    options: [
      {
        id: 'low',
        label: 'Lowest monthly price',
        points: { topedge: 2, interakt: 1, aisensy: 1, wati: 1, bitespeed: -2 },
        reasons: {
          topedge: 'Starts at ₹1,999 a month, with a 14-day free trial.',
          interakt: 'WhatsApp plans start at ₹2,799 a month.',
        },
        cautions: { bitespeed: 'Plans start around ₹15,000 a month.' },
      },
      {
        id: 'markup',
        label: 'No extra charge on Meta’s message fees',
        points: { topedge: 3 },
        reasons: {
          topedge: '0% markup: Meta bills message fees to your own account at its published rate.',
        },
        cautions: {
          wati: 'Adds platform charges on top of Meta’s message rates.',
          interakt: 'Adds platform charges on top of Meta’s message rates.',
          aisensy: 'Charges ₹0.145 per service message after 1,000 free, against Meta’s ₹0.1150.',
          bitespeed: 'Adds platform charges and a conversation markup on top of Meta’s rates.',
        },
      },
      {
        id: 'features',
        label: 'The right features, price comes second',
        points: { topedge: 2, bitespeed: 2, wati: 1, interakt: 1, aisensy: 1 },
      },
    ],
    fact: {
      text: 'Meta charges every platform the same in India: ₹0.8631 per marketing message and ₹0.1150 per utility message. What differs is what the platform adds on top.',
      source: 'metaPricing',
    },
  },
];

export type Answers = Record<string, string[]>;

export type VendorResult = {
  vendor: Vendor;
  score: number;
  /** 0 to 100, against the best any tool could score on these answers. */
  match: number;
  reasons: string[];
  cautions: string[];
  /** True when an answer rules this vendor out; it sorts last with match 0. */
  blocked: boolean;
};

export function scoreAnswers(answers: Answers): VendorResult[] {
  let best = 0;
  const totals = Object.fromEntries(VENDOR_ORDER.map((v) => [v, 0])) as Record<VendorId, number>;
  const reasons = Object.fromEntries(VENDOR_ORDER.map((v) => [v, [] as string[]])) as Record<
    VendorId,
    string[]
  >;
  const cautions = Object.fromEntries(VENDOR_ORDER.map((v) => [v, [] as string[]])) as Record<
    VendorId,
    string[]
  >;

  const blocked = new Set<VendorId>();
  for (const q of QUESTIONS) {
    for (const o of q.options) {
      if (answers[q.id]?.includes(o.id)) o.blocks?.forEach((v) => blocked.add(v));
    }
  }
  const open = VENDOR_ORDER.filter((v) => !blocked.has(v));

  for (const q of QUESTIONS) {
    const picked = q.options.filter((o) => answers[q.id]?.includes(o.id));
    if (!picked.length) continue;
    // The ceiling is the best one tool could have done on this question.
    best += Math.max(
      0,
      ...open.map((v) => picked.reduce((sum, o) => sum + (o.points[v] ?? 0), 0)),
    );
    for (const o of picked) {
      for (const v of VENDOR_ORDER) {
        totals[v] += o.points[v] ?? 0;
        const r = o.reasons?.[v];
        if (r && (o.points[v] ?? 0) > 0 && !reasons[v].includes(r)) reasons[v].push(r);
        const c = o.cautions?.[v];
        if (c && !cautions[v].includes(c)) cautions[v].push(c);
      }
    }
  }

  return VENDOR_ORDER.map((v) => {
    const isBlocked = blocked.has(v);
    return {
      vendor: VENDORS[v],
      score: isBlocked ? -Infinity : totals[v],
      match:
        isBlocked || best <= 0
          ? 0
          : Math.max(0, Math.min(100, Math.round((totals[v] / best) * 100))),
      reasons: isBlocked ? [] : reasons[v],
      cautions: cautions[v].includes(VENDORS[v].caveat)
        ? cautions[v]
        : [...cautions[v], VENDORS[v].caveat],
      blocked: isBlocked,
    };
  }).sort((a, b) => b.score - a.score);
}

/** The TopEdge plan that fits the answers, or null above the public plans. */
export function topedgePlan(answers: Answers) {
  const orders = answers.orders?.[0];
  const wantsPrepaid = answers.cod?.some((c) => c === 'high' || c === 'mid');
  if (orders === 'gt1500') return null;
  if (orders === 'lt1500') return { name: 'Scale', price: '₹6,499/month', orders: '1,500' };
  if (orders === 'lt800' || wantsPrepaid) {
    return { name: 'Growth', price: '₹3,999/month', orders: '800' };
  }
  return { name: 'Launch', price: '₹1,999/month', orders: '100' };
}

const MATRIX: Record<Exclude<VendorId, 'topedge'>, PairwiseFeatureRow[]> = {
  wati: WATI_PAIRWISE_MATRIX,
  interakt: INTERAKT_PAIRWISE_MATRIX,
  aisensy: AISENSY_PAIRWISE_MATRIX,
  bitespeed: BITESPEED_PAIRWISE_MATRIX,
};

export const COMPARE_ROWS: { id: string; label: string }[] = [
  { id: 'subscription', label: 'Price' },
  { id: 'template-markup', label: 'Charge on Meta’s message fees' },
  { id: 'cod-prepaid', label: 'COD to prepaid' },
  { id: 'ai-llm', label: 'AI replies' },
];

/** The published cell for one vendor and row, from the /compare boards. */
export function compareCell(vendor: VendorId, rowId: string): string {
  if (vendor === 'topedge') {
    return WATI_PAIRWISE_MATRIX.find((r) => r.id === rowId)?.topedge ?? '—';
  }
  return MATRIX[vendor].find((r) => r.id === rowId)?.competitor ?? 'Not published';
}

/** Answers round-trip through the URL, so a result can be shared or reloaded. */
export function encodeAnswers(answers: Answers): string {
  // "_" survives a URL untouched; "+" would come back as a space.
  return QUESTIONS.map((q) => (answers[q.id] ?? []).join('_')).join('.');
}

export function decodeAnswers(raw: string | null): Answers | null {
  if (!raw) return null;
  const parts = raw.split('.');
  if (parts.length !== QUESTIONS.length) return null;
  const answers: Answers = {};
  for (const [i, q] of QUESTIONS.entries()) {
    const ids = parts[i].split(/[_+ ]/).filter((id) => q.options.some((o) => o.id === id));
    if (!ids.length) return null;
    answers[q.id] = ids.slice(0, q.max ?? 1);
  }
  return answers;
}
