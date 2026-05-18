export type PlanFeature = string;

export type DiyPlan = {
  id: string;
  name: string;
  priceMonthly: number;
  priceWas?: number;
  contacts: string;
  popular?: boolean;
  cta: string;
  features: PlanFeature[];
  tagline: string;
};

export type DfyPlan = {
  id: string;
  name: string;
  priceMonthly: number;
  popular?: boolean;
  cta: string;
  features: PlanFeature[];
  tagline: string;
};

export const diyPlans: DiyPlan[] = [
  {
    id: 'freemium',
    name: 'Freemium',
    priceMonthly: 0,
    contacts: '100',
    cta: 'Start for free',
    tagline: 'Prove WhatsApp works before you scale spend.',
    features: [
      '1 Shopify store',
      'Live Chat inbox',
      'Basic AI replies',
      'Manual outreach',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    priceMonthly: 799,
    priceWas: 999,
    contacts: '1,000',
    popular: true,
    cta: 'Get Early Bird access',
    tagline: 'Cart recovery and campaigns — where most D2C brands land.',
    features: [
      'AI Form → Flow Builder',
      'Abandoned cart automations',
      'WhatsApp campaigns',
      'Order notifications',
      'Audience segments',
      'Priority support',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    priceMonthly: 1999,
    priceWas: 2499,
    contacts: '5,000',
    cta: 'Talk to sales',
    tagline: 'Multi-store, API access, and dedicated success.',
    features: [
      'Unlimited stores',
      'API & webhooks',
      'Advanced analytics',
      'BYOK: Gemini or OpenAI',
      'Dedicated success manager',
      'Priority Meta support',
    ],
  },
];

export const dfyPlans: DfyPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    priceMonthly: 2399,
    cta: 'Book onboarding call',
    tagline: 'We set up WABA, templates, and your first recovery flow.',
    features: [
      'Meta WABA setup',
      '3 approved templates',
      'Cart recovery flow live',
      'Basic bot configuration',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 6399,
    popular: true,
    cta: 'Book onboarding call',
    tagline: 'Flows, campaigns, and weekly strategy — fully managed.',
    features: [
      '10 Meta templates',
      'Advanced flow library',
      'Campaign management',
      'Weekly strategy calls',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    priceMonthly: 11999,
    cta: 'Talk to expert',
    tagline: 'Bespoke automations and private AI training for high volume.',
    features: [
      'Custom automation flows',
      'Meta ads coordination',
      'Private AI training',
      'White-glove onboarding',
    ],
  },
];

export const diyComparisonRows: { feature: string; freemium: string; growth: string; scale: string }[] = [
  { feature: 'Contacts', freemium: '100', growth: '1,000', scale: '5,000' },
  { feature: 'Flow Builder', freemium: '—', growth: '✓', scale: '✓' },
  { feature: 'Cart recovery', freemium: '—', growth: '✓', scale: '✓' },
  { feature: 'Campaigns', freemium: '—', growth: '✓', scale: '✓' },
  { feature: 'API & webhooks', freemium: '—', growth: '—', scale: '✓' },
  { feature: 'Dedicated manager', freemium: '—', growth: '—', scale: '✓' },
];

export const pricingFaqs = [
  {
    q: 'What is included in the free plan?',
    a: '100 contacts, one store, live chat, and basic AI. Automations and cart recovery unlock on Growth.',
  },
  {
    q: 'Can I switch between DIY and DFY?',
    a: 'Yes. Many brands start DIY and move to DFY when they want us to own Meta setup and template ops.',
  },
  {
    q: 'Is yearly billing available?',
    a: 'Yes — save 20% on annual billing for all DIY plans.',
  },
  {
    q: 'Do all plans include Meta API access?',
    a: 'Yes. Every plan includes native WhatsApp Business API access through TopEdge.',
  },
  {
    q: 'How does Early Bird pricing work?',
    a: 'Growth and Scale show strikethrough list price. Early Bird locks in the lower monthly rate while you are on those plans.',
  },
];

export const formatInr = (n: number) =>
  n === 0 ? '₹0' : `₹${n.toLocaleString('en-IN')}`;
