/**
 * Multi-feature TopEdge ROI math — pure functions, no React.
 * All money figures are ₹ / month unless noted.
 */

export type RoiPlanSlug = 'launch' | 'growth' | 'scale';

export type RoiPlan = {
  slug: RoiPlanSlug;
  name: string;
  price: number;
  priceLabel: string;
  pitch: string;
  orderCap: number;
  sendCap: number;
};

export const ROI_PLANS: Record<RoiPlanSlug, RoiPlan> = {
  launch: {
    slug: 'launch',
    name: 'Launch',
    price: 1999,
    priceLabel: '₹1,999/mo',
    pitch: 'Up to 100 orders / cycle · 3k sends — prove recovery + COD confirm.',
    orderCap: 100,
    sendCap: 3000,
  },
  growth: {
    slug: 'growth',
    name: 'Growth',
    price: 3999,
    priceLabel: '₹3,999/mo',
    pitch: 'Up to 800 orders / cycle · 15k sends — journeys, campaigns, priority dispatch.',
    orderCap: 800,
    sendCap: 15000,
  },
  scale: {
    slug: 'scale',
    name: 'Scale',
    price: 6499,
    priceLabel: '₹6,499/mo',
    pitch: 'Up to 1,500 orders / cycle · 30k sends — highest dispatch + Meta push.',
    orderCap: 1500,
    sendCap: 30000,
  },
};

export type RoiBaseline = {
  orders: number;
  aov: number;
  /** % of checkouts that abandon — clamped 0–95 in math */
  abandonRate: number;
  codShare: number;
};

export type CartModuleInput = {
  enabled: boolean;
  recoveryRate: number;
  /** Organic / email / retargeting recovery without WhatsApp (advanced) */
  baselineRecoveryRate: number;
};

export type CodModuleInput = {
  enabled: boolean;
  rtoRate: number;
  rtoCost: number;
  confirmEffectiveness: number;
  prepaidConvert: number;
};

export type CampaignModuleInput = {
  enabled: boolean;
  audienceSize: number;
  monthlySends: number;
  purchaseRate: number;
  metaCostPerMsg: number;
};

export type SupportModuleInput = {
  enabled: boolean;
  ticketsPerMonth: number;
  deflectionRate: number;
  minutesPerTicket: number;
  agentHourlyCost: number;
};

export type RoiModules = {
  cart: CartModuleInput;
  cod: CodModuleInput;
  campaigns: CampaignModuleInput;
  support: SupportModuleInput;
};

export type RoiInputs = {
  baseline: RoiBaseline;
  modules: RoiModules;
  /** Use incremental cart recovery (recovery − organic baseline) */
  advancedMode: boolean;
};

export const DEFAULT_ROI_INPUTS: RoiInputs = {
  baseline: {
    orders: 400,
    aov: 2500,
    abandonRate: 70,
    codShare: 55,
  },
  modules: {
    cart: { enabled: true, recoveryRate: 10, baselineRecoveryRate: 2 },
    cod: {
      enabled: true,
      rtoRate: 25,
      rtoCost: 450,
      confirmEffectiveness: 40,
      prepaidConvert: 8,
    },
    campaigns: {
      enabled: true,
      audienceSize: 8000,
      monthlySends: 5000,
      purchaseRate: 1.2,
      metaCostPerMsg: 0.85,
    },
    support: {
      enabled: true,
      ticketsPerMonth: 600,
      deflectionRate: 35,
      minutesPerTicket: 8,
      agentHourlyCost: 180,
    },
  },
  advancedMode: false,
};

export type ModuleBreakdown = {
  id: 'cart' | 'cod' | 'campaigns' | 'support';
  label: string;
  amount: number;
  detail: string;
  formula: string;
};

export type GrowthPoint = {
  label: string;
  month: number;
  monthly: number;
  cumulative: number;
};

export type RoiResult = {
  abandonedCarts: number;
  abandonedValue: number;
  cartRecovered: number;
  cartsWon: number;
  cartIncrementalRate: number;
  rtoAvoided: number;
  rtoSavings: number;
  prepaidOrders: number;
  prepaidRevenue: number;
  campaignGross: number;
  campaignMetaCost: number;
  campaignNet: number;
  campaignSendsUsed: number;
  campaignSendsCapped: boolean;
  supportHoursSaved: number;
  supportSavings: number;
  modules: ModuleBreakdown[];
  totalMonthly: number;
  plan: RoiPlan | null;
  needsVolumeTalk: boolean;
  planMultiple: number;
  netAfterPlan: number;
  /** Calendar days for plan price to equal estimated monthly value (null if no plan / zero value) */
  paybackDays: number | null;
  growthSeries: GrowthPoint[];
  yearEstimate: number;
};

/** M1–M6 ramp, then M7–M12 hold at M6 factor (true 12-mo sum, not ×2) */
const RAMP_6 = [0.55, 0.72, 0.88, 1, 1.08, 1.15] as const;

export function safeNum(n: unknown, fallback = 0): number {
  const v = typeof n === 'number' ? n : Number(n);
  return Number.isFinite(v) ? v : fallback;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, safeNum(n, min)));
}

export function clampPct(n: number, max = 100): number {
  return clamp(n, 0, max);
}

/**
 * Paid orders → abandoned carts.
 * abandonRate hard-capped at 95% to avoid divide-by-zero at 100%.
 */
export function abandonedCartsFromOrders(orders: number, abandonRate: number): number {
  const o = Math.max(0, safeNum(orders));
  const a = clamp(abandonRate, 0, 95) / 100;
  if (a <= 0) return 0;
  if (a >= 0.95) return o * (0.95 / 0.05);
  return o * (a / (1 - a));
}

/**
 * Suggest plan by order-volume capacity (not by estimated ₹ value).
 * >1500 orders → needsVolumeTalk (no automatic Scale fit).
 */
export function suggestPlan(ordersPerMonth: number): {
  plan: RoiPlan | null;
  needsVolumeTalk: boolean;
} {
  const orders = Math.max(0, safeNum(ordersPerMonth));
  if (orders > 1500) return { plan: null, needsVolumeTalk: true };
  if (orders <= 100) return { plan: ROI_PLANS.launch, needsVolumeTalk: false };
  if (orders <= 800) return { plan: ROI_PLANS.growth, needsVolumeTalk: false };
  return { plan: ROI_PLANS.scale, needsVolumeTalk: false };
}

/** @deprecated use suggestPlan(orders) */
export function recommendPlan(totalMonthly: number): RoiPlan {
  void totalMonthly;
  return ROI_PLANS.growth;
}

export function calculateRoi(inputs: RoiInputs): RoiResult {
  const b = {
    orders: Math.max(0, safeNum(inputs.baseline.orders)),
    aov: Math.max(0, safeNum(inputs.baseline.aov)),
    abandonRate: clamp(inputs.baseline.abandonRate, 0, 95),
    codShare: clampPct(inputs.baseline.codShare),
  };
  const m = inputs.modules;
  const advanced = Boolean(inputs.advancedMode);

  const abandonedCarts = abandonedCartsFromOrders(b.orders, b.abandonRate);
  const abandonedValue = abandonedCarts * b.aov;

  let cartRecovered = 0;
  let cartsWon = 0;
  let cartIncrementalRate = 0;
  if (m.cart.enabled) {
    const recovery = clampPct(m.cart.recoveryRate);
    const baseline = advanced ? clampPct(m.cart.baselineRecoveryRate) : 0;
    cartIncrementalRate = Math.max(0, recovery - baseline);
    cartsWon = abandonedCarts * (cartIncrementalRate / 100);
    cartRecovered = cartsWon * b.aov;
  }

  const codOrders = b.orders * (b.codShare / 100);
  let rtoAvoided = 0;
  let rtoSavings = 0;
  let prepaidOrders = 0;
  let prepaidRevenue = 0;
  if (m.cod.enabled) {
    const rtoWithout = codOrders * (clampPct(m.cod.rtoRate) / 100);
    rtoAvoided = rtoWithout * (clampPct(m.cod.confirmEffectiveness) / 100);
    rtoSavings = rtoAvoided * Math.max(0, safeNum(m.cod.rtoCost));
    prepaidOrders = codOrders * (clampPct(m.cod.prepaidConvert) / 100);
    prepaidRevenue = prepaidOrders * b.aov;
  }
  const codTotal = rtoSavings + prepaidRevenue;

  let campaignGross = 0;
  let campaignMetaCost = 0;
  let campaignNet = 0;
  let campaignSendsUsed = 0;
  let campaignSendsCapped = false;
  if (m.campaigns.enabled) {
    const audience = Math.max(0, safeNum(m.campaigns.audienceSize));
    const requested = Math.max(0, safeNum(m.campaigns.monthlySends));
    const cap = audience * 3;
    campaignSendsUsed = Math.min(requested, cap);
    campaignSendsCapped = requested > cap && audience > 0;
    campaignGross = campaignSendsUsed * (clampPct(m.campaigns.purchaseRate) / 100) * b.aov;
    campaignMetaCost = campaignSendsUsed * Math.max(0, safeNum(m.campaigns.metaCostPerMsg));
    campaignNet = Math.max(0, campaignGross - campaignMetaCost);
  }

  let supportHoursSaved = 0;
  let supportSavings = 0;
  if (m.support.enabled) {
    const deflected =
      Math.max(0, safeNum(m.support.ticketsPerMonth)) *
      (clampPct(m.support.deflectionRate) / 100);
    supportHoursSaved =
      (deflected * Math.max(0, safeNum(m.support.minutesPerTicket))) / 60;
    supportSavings = supportHoursSaved * Math.max(0, safeNum(m.support.agentHourlyCost));
  }

  const modules: ModuleBreakdown[] = [];
  if (m.cart.enabled) {
    modules.push({
      id: 'cart',
      label: advanced ? 'Cart recovery (incremental)' : 'Cart recovery',
      amount: cartRecovered,
      detail:
        cartRecovered > 0
          ? `${Math.round(cartsWon)} carts × ₹${Math.round(b.aov).toLocaleString('en-IN')} AOV`
          : 'No recovered carts at current inputs',
      formula: advanced
        ? `${Math.round(abandonedCarts)} abandoned × (${m.cart.recoveryRate}% − ${m.cart.baselineRecoveryRate}% organic) × ₹${Math.round(b.aov).toLocaleString('en-IN')}`
        : `${Math.round(abandonedCarts)} abandoned × ${m.cart.recoveryRate}% recovery × ₹${Math.round(b.aov).toLocaleString('en-IN')}`,
    });
  }
  if (m.cod.enabled) {
    modules.push({
      id: 'cod',
      label: 'COD / RTO protection',
      amount: codTotal,
      detail:
        codTotal > 0
          ? `${Math.round(rtoAvoided)} RTOs avoided + ${Math.round(prepaidOrders)} prepaid converts`
          : 'No COD savings at current inputs',
      formula: `${Math.round(rtoAvoided)} RTOs × ₹${Math.round(m.cod.rtoCost).toLocaleString('en-IN')} + ${Math.round(prepaidOrders)} prepaid × ₹${Math.round(b.aov).toLocaleString('en-IN')}`,
    });
  }
  if (m.campaigns.enabled) {
    modules.push({
      id: 'campaigns',
      label: 'Campaigns (net)',
      amount: campaignNet,
      detail:
        campaignNet > 0
          ? `₹${Math.round(campaignGross).toLocaleString('en-IN')} gross − ₹${Math.round(campaignMetaCost).toLocaleString('en-IN')} Meta`
          : 'No campaign net at current inputs',
      formula: `${Math.round(campaignSendsUsed).toLocaleString('en-IN')} sends × ${m.campaigns.purchaseRate}% × ₹${Math.round(b.aov).toLocaleString('en-IN')} − Meta`,
    });
  }
  if (m.support.enabled) {
    modules.push({
      id: 'support',
      label: 'Support / Flow savings',
      amount: supportSavings,
      detail:
        supportSavings > 0
          ? `${formatHours(supportHoursSaved)} agent-hours saved`
          : 'No support savings at current inputs',
      formula: `${Math.round(m.support.ticketsPerMonth * (m.support.deflectionRate / 100))} tickets × ${m.support.minutesPerTicket} min × ₹${m.support.agentHourlyCost}/hr`,
    });
  }

  const totalMonthly = finite(
    cartRecovered + codTotal + campaignNet + supportSavings,
  );
  const { plan, needsVolumeTalk } = suggestPlan(b.orders);
  const planPrice = plan?.price ?? 0;
  const planMultiple = planPrice > 0 ? totalMonthly / planPrice : 0;
  const netAfterPlan = totalMonthly - planPrice;
  const paybackDays =
    planPrice > 0 && totalMonthly > 0
      ? Math.max(1, Math.ceil(planPrice / (totalMonthly / 30)))
      : null;

  const factors12: number[] = [...RAMP_6];
  const steady = RAMP_6[5];
  for (let i = 6; i < 12; i++) factors12.push(steady);

  const growthSeries: GrowthPoint[] = factors12.map((f, i) => {
    const monthly = totalMonthly * f;
    const cumulative = factors12
      .slice(0, i + 1)
      .reduce((sum, x) => sum + totalMonthly * x, 0);
    return {
      label: `M${i + 1}`,
      month: i + 1,
      monthly: finite(monthly),
      cumulative: finite(cumulative),
    };
  });

  const yearEstimate = finite(growthSeries.reduce((s, g) => s + g.monthly, 0));

  return {
    abandonedCarts: finite(abandonedCarts),
    abandonedValue: finite(abandonedValue),
    cartRecovered: finite(cartRecovered),
    cartsWon: finite(cartsWon),
    cartIncrementalRate: finite(cartIncrementalRate),
    rtoAvoided: finite(rtoAvoided),
    rtoSavings: finite(rtoSavings),
    prepaidOrders: finite(prepaidOrders),
    prepaidRevenue: finite(prepaidRevenue),
    campaignGross: finite(campaignGross),
    campaignMetaCost: finite(campaignMetaCost),
    campaignNet: finite(campaignNet),
    campaignSendsUsed: finite(campaignSendsUsed),
    campaignSendsCapped,
    supportHoursSaved: finite(supportHoursSaved),
    supportSavings: finite(supportSavings),
    modules,
    totalMonthly,
    plan,
    needsVolumeTalk,
    planMultiple: finite(planMultiple),
    netAfterPlan: finite(netAfterPlan),
    paybackDays,
    growthSeries,
    yearEstimate,
  };
}

function finite(n: number): number {
  return Number.isFinite(n) ? n : 0;
}

export function formatInr(n: number, digits = 0): string {
  const v = finite(safeNum(n));
  const rounded = digits === 0 ? Math.round(v) : Number(v.toFixed(digits));
  return `₹${rounded.toLocaleString('en-IN')}`;
}

/** Whole hours as "28"; fractional as "28.5" — never "28.0". */
export function formatHours(n: number): string {
  const v = finite(safeNum(n));
  if (Math.abs(v - Math.round(v)) < 0.05) return String(Math.round(v));
  return v.toFixed(1).replace(/\.0$/, '');
}

/* ——— URL serialize / hydrate ——— */

export type RoiMode = 'quick' | 'full';

export function serializeRoiToQuery(
  inputs: RoiInputs,
  mode: RoiMode,
): string {
  const p = new URLSearchParams();
  p.set('mode', mode);
  p.set('orders', String(Math.round(inputs.baseline.orders)));
  p.set('aov', String(Math.round(inputs.baseline.aov)));
  p.set('abandon', String(inputs.baseline.abandonRate));
  p.set('cod', String(inputs.baseline.codShare));
  if (inputs.advancedMode) p.set('adv', '1');
  const mods = inputs.modules;
  p.set('cart', mods.cart.enabled ? '1' : '0');
  p.set('cr', String(mods.cart.recoveryRate));
  p.set('cbr', String(mods.cart.baselineRecoveryRate));
  p.set('codm', mods.cod.enabled ? '1' : '0');
  p.set('rto', String(mods.cod.rtoRate));
  p.set('rtoc', String(mods.cod.rtoCost));
  p.set('conf', String(mods.cod.confirmEffectiveness));
  p.set('pp', String(mods.cod.prepaidConvert));
  p.set('camp', mods.campaigns.enabled ? '1' : '0');
  p.set('aud', String(mods.campaigns.audienceSize));
  p.set('sends', String(mods.campaigns.monthlySends));
  p.set('pr', String(mods.campaigns.purchaseRate));
  p.set('meta', String(mods.campaigns.metaCostPerMsg));
  p.set('sup', mods.support.enabled ? '1' : '0');
  p.set('tix', String(mods.support.ticketsPerMonth));
  p.set('def', String(mods.support.deflectionRate));
  p.set('mins', String(mods.support.minutesPerTicket));
  p.set('ahr', String(mods.support.agentHourlyCost));
  return p.toString();
}

export function parseRoiFromQuery(search: string): {
  inputs: RoiInputs;
  mode: RoiMode;
} | null {
  const p = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  if (!p.has('orders') && !p.has('mode')) return null;

  const mode: RoiMode = p.get('mode') === 'quick' ? 'quick' : 'full';
  const base: RoiInputs = JSON.parse(JSON.stringify(DEFAULT_ROI_INPUTS));

  if (p.has('orders')) base.baseline.orders = clamp(Number(p.get('orders')), 0, 50000);
  if (p.has('aov')) base.baseline.aov = clamp(Number(p.get('aov')), 0, 100000);
  if (p.has('abandon')) base.baseline.abandonRate = clamp(Number(p.get('abandon')), 0, 95);
  if (p.has('cod')) base.baseline.codShare = clampPct(Number(p.get('cod')));
  base.advancedMode = p.get('adv') === '1';

  if (p.has('cart')) base.modules.cart.enabled = p.get('cart') === '1';
  if (p.has('cr')) base.modules.cart.recoveryRate = clampPct(Number(p.get('cr')));
  if (p.has('cbr')) base.modules.cart.baselineRecoveryRate = clampPct(Number(p.get('cbr')));

  if (p.has('codm')) base.modules.cod.enabled = p.get('codm') === '1';
  if (p.has('rto')) base.modules.cod.rtoRate = clampPct(Number(p.get('rto')));
  if (p.has('rtoc')) base.modules.cod.rtoCost = clamp(Number(p.get('rtoc')), 0, 20000);
  if (p.has('conf')) base.modules.cod.confirmEffectiveness = clampPct(Number(p.get('conf')));
  if (p.has('pp')) base.modules.cod.prepaidConvert = clampPct(Number(p.get('pp')));

  if (p.has('camp')) base.modules.campaigns.enabled = p.get('camp') === '1';
  if (p.has('aud')) base.modules.campaigns.audienceSize = clamp(Number(p.get('aud')), 0, 2_000_000);
  if (p.has('sends')) base.modules.campaigns.monthlySends = clamp(Number(p.get('sends')), 0, 2_000_000);
  if (p.has('pr')) base.modules.campaigns.purchaseRate = clampPct(Number(p.get('pr')));
  if (p.has('meta')) base.modules.campaigns.metaCostPerMsg = clamp(Number(p.get('meta')), 0, 20);

  if (p.has('sup')) base.modules.support.enabled = p.get('sup') === '1';
  if (p.has('tix')) base.modules.support.ticketsPerMonth = clamp(Number(p.get('tix')), 0, 100000);
  if (p.has('def')) base.modules.support.deflectionRate = clampPct(Number(p.get('def')));
  if (p.has('mins')) base.modules.support.minutesPerTicket = clamp(Number(p.get('mins')), 0, 120);
  if (p.has('ahr')) base.modules.support.agentHourlyCost = clamp(Number(p.get('ahr')), 0, 10000);

  return { inputs: base, mode };
}
