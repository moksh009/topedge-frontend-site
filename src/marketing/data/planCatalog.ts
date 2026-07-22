export type PlanLine = 'diy' | 'dfy';

export type BillingPlan = {
  id: string;
  slug: string;
  name: string;
  line: PlanLine;
  priceInr: number;
  priceLabel: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
};

export const PLAN_LINE_META: Record<PlanLine, { label: string; subtitle: string }> = {
  diy: {
    label: 'Do it yourself',
    subtitle: 'Self-serve setup ,  connect, approve templates, publish in ~15 minutes.',
  },
  dfy: {
    label: 'Done for you',
    subtitle: 'Named Growth Manager ships templates, flows, and campaigns in 7 days.',
  },
};

export const BILLING_PLANS: BillingPlan[] = [
  {
    id: 'diy_lite',
    slug: 'diy_lite',
    name: 'Lite',
    line: 'diy',
    priceInr: 799,
    priceLabel: '₹799',
    period: '/month',
    description: 'For stores testing WhatsApp as a recovery channel.',
    features: [
      'Shopify + WhatsApp connect',
      'Journey canvas (basic)',
      'Live Chat inbox',
      'Meta template library',
      '2,500 contacts',
    ],
    cta: 'Start free trial',
  },
  {
    id: 'diy_pro',
    slug: 'diy_pro',
    name: 'Pro',
    line: 'diy',
    priceInr: 1999,
    priceLabel: '₹1,999',
    period: '/month',
    description: 'Full automation stack for growing D2C brands.',
    features: [
      'Everything in Lite',
      '3-message cart recovery',
      'Flow Builder + Journeys',
      'Campaigns & sequences',
      'AI Brain (BYOK)',
      'IG Automation',
      '10,000 contacts',
    ],
    popular: true,
    cta: 'Start free trial',
  },
  {
    id: 'diy_scale',
    slug: 'diy_scale',
    name: 'Scale',
    line: 'diy',
    priceInr: 4499,
    priceLabel: '₹4,499',
    period: '/month',
    description: 'High-volume stores with advanced analytics.',
    features: [
      'Everything in Pro',
      'Advanced analytics & attribution',
      'Priority support',
      'Team roles & permissions',
      '50,000 contacts',
    ],
    cta: 'Start free trial',
  },
  {
    id: 'dfy_launch',
    slug: 'dfy_launch',
    name: 'Launch',
    line: 'dfy',
    priceInr: 12999,
    priceLabel: '₹12,999',
    period: '/month',
    description: 'White-glove setup ,  templates, flows, and first campaign live in 7 days.',
    features: [
      'Named Growth Manager',
      'Template creation & Meta submission',
      'Cart recovery + order flows',
      'First campaign shipped',
      'Weekly check-in calls',
    ],
    cta: 'Book DFY call',
  },
  {
    id: 'dfy_growth',
    slug: 'dfy_growth',
    name: 'Growth',
    line: 'dfy',
    priceInr: 24999,
    priceLabel: '₹24,999',
    period: '/month',
    description: 'Ongoing optimization ,  A/B tests, new journeys, campaign calendar.',
    features: [
      'Everything in Launch',
      'Monthly flow optimization',
      'Campaign calendar management',
      'Dedicated Slack channel',
      'Quarterly strategy review',
    ],
    cta: 'Book DFY call',
  },
  {
    id: 'dfy_enterprise',
    slug: 'dfy_enterprise',
    name: 'Enterprise',
    line: 'dfy',
    priceInr: 49999,
    priceLabel: '₹49,999',
    period: '/month',
    description: 'Multi-brand, agency, or high-GMV operations.',
    features: [
      'Everything in Growth',
      'Multi-workspace support',
      'Custom integrations',
      'SLA-backed response times',
      'Agency white-label options',
    ],
    cta: 'Talk to sales',
  },
];

export function plansForLine(line: PlanLine): BillingPlan[] {
  return BILLING_PLANS.filter((p) => p.line === line);
}

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export const META_MESSAGE_RATES = [
  { category: 'Utility', rate: '~₹0.13', note: 'Order updates, account alerts' },
  { category: 'Marketing', rate: '~₹0.88', note: 'Promotions, cart recovery' },
  { category: 'Service', rate: 'Free', note: 'User-initiated conversations (24h window)' },
];

export const TRIAL_PLAN = {
  days: 14,
  contacts: 250,
  messages: 6000,
};
