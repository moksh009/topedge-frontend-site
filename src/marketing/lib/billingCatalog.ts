/**
 * Public billing catalog for the marketing site.
 * Live SSOT: GET https://api.topedgeai.com/api/billing/catalog
 * Fallback: Aug 2026 lock-in. Never include Razorpay plan ids.
 */

export type BillingCycle = 'monthly' | 'quarterly' | 'yearly';

export type PlanPricing = {
  effectiveMonthlyLabel: string;
  billedLabel: string;
  perDayLabel?: string | null;
  saveLabel?: string | null;
  showPerDay?: boolean;
};

export type CatalogPlanFeatures = {
  journeyBranch: boolean;
  journeyCodPrepaid: boolean;
  dispatchPriority: string;
  metaAdsAudiencePush: boolean;
};

export type CatalogPlan = {
  slug: string;
  displayName: string;
  emphasis?: boolean;
  ordersPerCycle: number;
  campaignEmailSendsPerCycle: number;
  monthlyPriceLabel: string;
  quarterlyPriceLabel: string;
  yearlyPriceLabel: string;
  features: CatalogPlanFeatures;
  pricing: Partial<Record<BillingCycle | 'annual', PlanPricing>>;
};

export type BillingCatalog = {
  currency: string;
  trialDays: number;
  defaultCycle: BillingCycle;
  cycles: BillingCycle[];
  universalFeatures: string[];
  plans: CatalogPlan[];
  source: 'live' | 'fallback';
};

export const DASH_ORIGIN = (
  (import.meta.env.VITE_DASH_URL as string | undefined) ||
  (import.meta.env.NEXT_PUBLIC_DASH_URL as string | undefined) ||
  'https://dash.topedgeai.com'
).replace(/\/$/, '');

export const DASH_SIGNUP = `${DASH_ORIGIN}/signup`;
export const DASH_LOGIN = `${DASH_ORIGIN}/login`;
export const DASH_BILLING = `${DASH_ORIGIN}/settings?tab=billing`;
export const DASH_BILLING_ADJUST = `${DASH_ORIGIN}/settings?tab=billing&adjust=1`;
export const SALES_MAILTO = 'mailto:team@topedgeai.com';

const PUBLIC_PLANS = new Set(['launch', 'growth', 'scale']);

/** Same-origin path. SignupRedirect forwards plan + cycle to the dashboard. */
export function marketingSignupPath(opts?: { plan?: string; cycle?: BillingCycle }) {
  const params = new URLSearchParams();
  const plan = String(opts?.plan || '').toLowerCase();
  if (PUBLIC_PLANS.has(plan)) params.set('plan', plan);
  if (opts?.cycle) params.set('cycle', cycleKey(opts.cycle));
  const q = params.toString();
  return q ? `/signup?${q}` : '/signup';
}

/** Dashboard signup URL with plan/cycle for already-authenticated merchants. */
export function dashSignupUrl(opts?: { plan?: string; cycle?: BillingCycle }) {
  const url = new URL(DASH_SIGNUP);
  const plan = String(opts?.plan || '').toLowerCase();
  if (PUBLIC_PLANS.has(plan)) url.searchParams.set('plan', plan);
  if (opts?.cycle) url.searchParams.set('cycle', cycleKey(opts.cycle));
  url.searchParams.set('from', 'www');
  return url.toString();
}

export const CATALOG_URL =
  (import.meta.env.VITE_BILLING_CATALOG_URL as string | undefined) ||
  (import.meta.env.NEXT_PUBLIC_BILLING_CATALOG_URL as string | undefined) ||
  'https://api.topedgeai.com/api/billing/catalog';

export const TRIAL = {
  days: 14,
  orders: 20,
  sends: 200,
};

export const GST_FOOTNOTE = '+18% GST. SAC 998314.';

export const META_MESSAGE_RATES = [
  { category: 'Marketing', rate: '~₹0.88 / msg', note: 'Promotions and cart recovery. Pass-through, no markup.' },
  { category: 'Utility', rate: '~₹0.125 / msg', note: 'Order updates and account alerts.' },
  { category: 'Service', rate: 'Free', note: 'User-initiated replies in the 24h window.' },
] as const;

const UNIVERSAL: string[] = [
  'Live Chat',
  'Customer CRM',
  'Flow Builder',
  'Segments',
  'Broadcast Campaigns',
  'Opt-in tools',
  'Intent Detection',
  'BYOK AI',
  'Order Management',
  'P&L Analytics',
  'Discount Codes',
  'Abandoned cart (3-message)',
  'Website pixel',
  'Stock tracking',
  'Warranty assignment',
  'Meta templates',
  'WhatsApp QR',
  'GST invoices',
];

function cyclePricing(
  effectiveMonthlyLabel: string,
  billedLabel: string,
  perDayLabel: string | null,
  saveLabel: string | null,
  showPerDay: boolean,
): PlanPricing {
  return { effectiveMonthlyLabel, billedLabel, perDayLabel, saveLabel, showPerDay };
}

/** Used when the catalog API is down. Label as “Prices as of Aug 2026”. */
export const FALLBACK_CATALOG: BillingCatalog = {
  currency: 'INR',
  trialDays: 14,
  defaultCycle: 'yearly',
  cycles: ['monthly', 'quarterly', 'yearly'],
  universalFeatures: UNIVERSAL,
  source: 'fallback',
  plans: [
    {
      slug: 'launch',
      displayName: 'Launch',
      emphasis: false,
      ordersPerCycle: 100,
      campaignEmailSendsPerCycle: 3000,
      monthlyPriceLabel: '₹1,999',
      quarterlyPriceLabel: '₹5,397',
      yearlyPriceLabel: '₹19,188',
      features: {
        journeyBranch: false,
        journeyCodPrepaid: true,
        dispatchPriority: 'standard',
        metaAdsAudiencePush: false,
      },
      pricing: {
        monthly: cyclePricing('₹1,999', '₹1,999', '₹67', null, false),
        quarterly: cyclePricing('₹1,799', '₹5,397', '₹60', '₹600', true),
        yearly: cyclePricing('₹1,599', '₹19,188', '₹53', '₹4,800', true),
      },
    },
    {
      slug: 'growth',
      displayName: 'Growth',
      emphasis: true,
      ordersPerCycle: 800,
      campaignEmailSendsPerCycle: 15000,
      monthlyPriceLabel: '₹3,999',
      quarterlyPriceLabel: '₹10,797',
      yearlyPriceLabel: '₹38,388',
      features: {
        journeyBranch: true,
        journeyCodPrepaid: true,
        dispatchPriority: 'priority',
        metaAdsAudiencePush: false,
      },
      pricing: {
        monthly: cyclePricing('₹3,999', '₹3,999', '₹133', null, false),
        quarterly: cyclePricing('₹3,599', '₹10,797', '₹120', '₹1,200', true),
        yearly: cyclePricing('₹3,199', '₹38,388', '₹105', '₹9,600', true),
      },
    },
    {
      slug: 'scale',
      displayName: 'Scale',
      emphasis: false,
      ordersPerCycle: 1500,
      campaignEmailSendsPerCycle: 30000,
      monthlyPriceLabel: '₹6,499',
      quarterlyPriceLabel: '₹17,547',
      yearlyPriceLabel: '₹62,388',
      features: {
        journeyBranch: true,
        journeyCodPrepaid: true,
        dispatchPriority: 'highest',
        metaAdsAudiencePush: true,
      },
      pricing: {
        monthly: cyclePricing('₹6,499', '₹6,499', '₹217', null, false),
        quarterly: cyclePricing('₹5,849', '₹17,547', '₹195', '₹1,950', true),
        yearly: cyclePricing('₹5,199', '₹62,388', '₹171', '₹15,600', true),
      },
    },
  ],
};

export function cycleKey(cycle: string | undefined): BillingCycle {
  const c = String(cycle || '').toLowerCase();
  if (c === 'annual' || c === 'yearly') return 'yearly';
  if (c === 'quarterly') return 'quarterly';
  return 'monthly';
}

export function cycleNoun(cycle: BillingCycle) {
  if (cycle === 'yearly') return 'year';
  if (cycle === 'quarterly') return 'quarter';
  return 'month';
}

export function planPricing(plan: CatalogPlan, cycle: BillingCycle): PlanPricing {
  const c = cycleKey(cycle);
  const pricing = plan.pricing?.[c] || plan.pricing?.yearly;
  if (pricing) return pricing;
  if (c === 'yearly') {
    return cyclePricing(plan.yearlyPriceLabel, plan.yearlyPriceLabel, null, null, false);
  }
  if (c === 'quarterly') {
    return cyclePricing(plan.quarterlyPriceLabel, plan.quarterlyPriceLabel, null, null, false);
  }
  return cyclePricing(plan.monthlyPriceLabel, plan.monthlyPriceLabel, null, null, false);
}

export function planBlurb(slug: string) {
  const s = String(slug || '').toLowerCase();
  if (s === 'growth') return 'Recovery, journeys, and campaigns for growing D2C.';
  if (s === 'scale') return 'Highest send priority plus Meta Ads audience push.';
  return 'WhatsApp order updates for brands just going live.';
}

export function dispatchLabel(priority: string) {
  if (priority === 'highest') return 'Highest send priority';
  if (priority === 'priority') return 'Priority send';
  return 'Standard send';
}

function asPricing(raw: PlanPricing | undefined | null): PlanPricing | undefined {
  if (!raw?.effectiveMonthlyLabel || !raw?.billedLabel) return undefined;
  return {
    effectiveMonthlyLabel: String(raw.effectiveMonthlyLabel),
    billedLabel: String(raw.billedLabel),
    perDayLabel: raw.perDayLabel ?? null,
    saveLabel: raw.saveLabel ?? null,
    showPerDay: !!raw.showPerDay,
  };
}

function asPlan(raw: CatalogPlan): CatalogPlan {
  const pricingRaw = raw.pricing || {};
  return {
    slug: String(raw.slug || '').toLowerCase(),
    displayName: raw.displayName || raw.slug,
    emphasis: !!raw.emphasis,
    ordersPerCycle: Number(raw.ordersPerCycle) || 0,
    campaignEmailSendsPerCycle: Number(raw.campaignEmailSendsPerCycle) || 0,
    monthlyPriceLabel: raw.monthlyPriceLabel,
    quarterlyPriceLabel: raw.quarterlyPriceLabel,
    yearlyPriceLabel: raw.yearlyPriceLabel || (raw as { annualPriceLabel?: string }).annualPriceLabel || '',
    features: {
      journeyBranch: !!raw.features?.journeyBranch,
      journeyCodPrepaid: !!raw.features?.journeyCodPrepaid,
      dispatchPriority: raw.features?.dispatchPriority || 'standard',
      metaAdsAudiencePush: !!raw.features?.metaAdsAudiencePush,
    },
    pricing: {
      monthly: asPricing(pricingRaw.monthly),
      quarterly: asPricing(pricingRaw.quarterly),
      yearly: asPricing(pricingRaw.yearly) || asPricing(pricingRaw.annual),
      annual: asPricing(pricingRaw.annual) || asPricing(pricingRaw.yearly),
    },
  };
}

export async function fetchBillingCatalog(): Promise<BillingCatalog> {
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), 6000);
  try {
    const res = await fetch(CATALOG_URL, {
      signal: ctrl.signal,
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`catalog ${res.status}`);
    const json = (await res.json()) as {
      success?: boolean;
      plans?: CatalogPlan[];
      universalFeatures?: string[];
      trialDays?: number;
      defaultCycle?: string;
      cycles?: string[];
      currency?: string;
    };
    if (!json?.plans?.length) throw new Error('empty catalog');
    const plans = json.plans.map(asPlan).filter((p) => ['launch', 'growth', 'scale'].includes(p.slug));
    if (plans.length < 3) throw new Error('incomplete catalog');
    return {
      currency: json.currency || 'INR',
      trialDays: Number(json.trialDays) || TRIAL.days,
      defaultCycle: cycleKey(json.defaultCycle || 'yearly'),
      cycles: (json.cycles?.length ? json.cycles : ['monthly', 'quarterly', 'yearly']).map(cycleKey),
      universalFeatures: json.universalFeatures?.length ? json.universalFeatures : UNIVERSAL,
      plans,
      source: 'live',
    };
  } catch {
    return FALLBACK_CATALOG;
  } finally {
    window.clearTimeout(timer);
  }
}
