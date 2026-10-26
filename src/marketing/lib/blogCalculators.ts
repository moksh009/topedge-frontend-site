/**
 * Un-gated calculators embedded in marketing copy.
 *
 * Why they exist: the 2026-10-21 research pass found that the pages beating us
 * on `whatsapp business api pricing india` and `how much does rto cost shopify
 * india` all answer with a worked rupee figure, not a concept. A calculator is
 * the same answer that moves with the reader's own volume, and because the
 * prerender runs the page in a real browser, the default state is served as
 * crawlable HTML with every number already computed.
 *
 * Why no email gate: the point is the citation and the answer, not a lead
 * capture that stops an answer engine reading the result.
 *
 * Shape: a post stores an inert placeholder with a static fallback inside it,
 *
 *     <div class="mkt-calc" data-calc="whatsapp-bill"> ...static table... </div>
 *
 * and this module replaces the fallback once it binds. A reader with no
 * JavaScript keeps the static table, which is why the fallback carries real
 * numbers rather than a "loading" line.
 *
 * Rates are Meta's published India card, read 2026-10-21 (src/data/sources.ts).
 * Changing one here does not change the posts' prose, so move both together.
 */

/** Meta India rate card, ex GST, per delivered message. */
export const META_INDIA = {
  marketing: 0.8631,
  utility: 0.115,
  /** Service replies past the free tier are billed at the utility rate. */
  service: 0.115,
  /** Free service messages per business phone number per month, from 1 Oct 2026. */
  freeServicePerNumber: 1000,
  gst: 0.18,
} as const;

/** Competitor rates each vendor publishes itself, read 2026-10-21. */
const VENDOR = {
  /** AiSensy, per service message after the same 1,000 free. */
  aisensyService: 0.145,
  /**
   * Dondy's published India per-message rate, $0.01888, at the INR equivalent
   * /pricing and the pricing post already print. Keep the three in step.
   */
  dondyMarketingInr: 1.381,
} as const;

/** Amazon Shipping India and ClickPost cost bands per returned COD parcel. */
const RTO = {
  directLow: 180,
  directHigh: 240,
  loadedLow: 450,
  loadedHigh: 900,
} as const;

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/**
 * Per-message rates, at four decimals. Two decimals turns Meta's ₹0.1150
 * utility rate into ₹0.12, which is the figure nobody can find on their rate
 * card and the one the prose spends a page getting right.
 */
const inrRate = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
});

const inrPaise = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const count = new Intl.NumberFormat('en-IN');

function money(value: number): string {
  return value > 0 && value < 100 ? inrPaise.format(value) : inr.format(value);
}

type Field = {
  key: string;
  label: string;
  /** Rendered under the input: what the number means, not how to type it. */
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  /** Upper end of the slider. The box still accepts up to `max`. */
  sliderMax?: number;
};

type Calculator = {
  title: string;
  /** One line above the inputs. Doubles as the answer-engine lead. */
  lead: string;
  fields: Field[];
  /** The answer the reader came for, the rows behind it, and one sentence. */
  compute: (v: Record<string, number>) => {
    headline: { label: string; value: string; sub: string };
    rows: Row[];
    verdict: string;
  };
  footnote: string;
};

type Row = {
  label: string;
  detail: string;
  value: string;
  /** Totals and the line the reader came for. */
  strong?: boolean;
};

const WHATSAPP_BILL: Calculator = {
  title: 'What your WhatsApp month costs in India',
  lead: "Put in a month's volume and see Meta's bill at 0% markup, then the same month on the two markups competitors publish.",
  fields: [
    {
      key: 'marketing',
      label: 'Marketing messages',
      hint: 'Campaigns, drops and cart recovery, a month',
      value: 10000,
      min: 0,
      max: 500000,
      sliderMax: 100000,
      step: 500,
    },
    {
      key: 'utility',
      label: 'Utility messages',
      hint: 'Order, shipping and plain COD confirmations, a month',
      value: 10000,
      min: 0,
      max: 500000,
      sliderMax: 100000,
      step: 500,
    },
    {
      key: 'service',
      label: 'Service replies',
      hint: 'Agent and bot replies inside the 24-hour window, a month',
      value: 5000,
      min: 0,
      max: 200000,
      sliderMax: 50000,
      step: 250,
    },
  ],
  compute: ({ marketing, utility, service }) => {
    const billableService = Math.max(0, service - META_INDIA.freeServicePerNumber);
    const marketingCost = marketing * META_INDIA.marketing;
    const utilityCost = utility * META_INDIA.utility;
    const serviceCost = billableService * META_INDIA.service;
    const meta = marketingCost + utilityCost + serviceCost;
    const serviceMarkup = billableService * (VENDOR.aisensyService - META_INDIA.service);
    const marketingMarkup = marketing * (VENDOR.dondyMarketingInr - META_INDIA.marketing);

    return {
      headline: {
        label: 'Meta bill for the month, at 0% markup',
        value: money(meta),
        sub: `${money(meta * (1 + META_INDIA.gst))} with 18% GST, billed by Meta to your own account`,
      },
      rows: [
        {
          label: 'Marketing templates',
          detail: `${count.format(marketing)} at ${inrRate.format(META_INDIA.marketing)}`,
          value: money(marketingCost),
        },
        {
          label: 'Utility templates',
          detail: `${count.format(utility)} at ${inrRate.format(META_INDIA.utility)}`,
          value: money(utilityCost),
        },
        {
          label: 'Service replies',
          detail: `${count.format(billableService)} billable after ${count.format(META_INDIA.freeServicePerNumber)} free, at ${inrRate.format(META_INDIA.service)}`,
          value: money(serviceCost),
        },
        {
          label: 'Meta bill at 0% markup',
          detail: 'Ex GST, billed by Meta to your own account',
          value: money(meta),
          strong: true,
        },
        {
          label: 'With 18% GST',
          detail: 'What lands on the invoice',
          value: money(meta * (1 + META_INDIA.gst)),
        },
        {
          label: 'Add a published service markup',
          detail: `AiSensy charges ${inrRate.format(VENDOR.aisensyService)} a service reply against Meta's ${inrRate.format(META_INDIA.service)}, a 26.1% markup on that line`,
          value: `+${money(serviceMarkup)}`,
        },
        {
          label: 'Add a published marketing markup',
          detail: `Dondy's India rate of $0.01888 is about ₹1.38 a message against Meta's ${inrRate.format(META_INDIA.marketing)}, about 60% above the card`,
          value: `+${money(marketingMarkup)}`,
        },
      ],
      verdict: `At this volume Meta's own bill is ${money(meta)} before GST. A platform that marks up the service line adds ${money(serviceMarkup)} a month and one that marks up the marketing line adds ${money(marketingMarkup)}, on top of whatever it charges for the software.`,
    };
  },
  footnote:
    'Meta India rates read off Meta’s WhatsApp Business Platform pricing documentation on 21 October 2026, competitor rates off each vendor’s own published pricing page on the same day. Rupee conversions of USD rates are indicative. Volume tiers are ignored here because utility tiers start at 25,000,000 messages a month. Your own rate card in Meta Business Manager is the only number that will match your invoice.',
};

const RTO_COST: Calculator = {
  title: 'What RTO costs your store a month',
  lead: 'Put in your order volume and COD mix to see the rupee loss behind your RTO rate, and what one WhatsApp confirmation pass over the same orders costs.',
  fields: [
    {
      key: 'orders',
      label: 'Orders a month',
      hint: 'Every Shopify order, prepaid and COD',
      value: 1000,
      min: 0,
      max: 100000,
      sliderMax: 20000,
      step: 50,
    },
    {
      key: 'codShare',
      label: 'COD share',
      hint: 'Indian D2C typically sits between 50% and 70%',
      value: 60,
      min: 0,
      max: 100,
      step: 1,
      suffix: '%',
    },
    {
      key: 'rtoRate',
      label: 'RTO rate on COD',
      hint: 'National RTO ran 39.2% at the Nov 2025 festive peak and 21.0% by Mar 2026 among brands verifying before dispatch',
      value: 26,
      min: 0,
      max: 100,
      sliderMax: 60,
      step: 0.5,
      suffix: '%',
    },
  ],
  compute: ({ orders, codShare, rtoRate }) => {
    const codOrders = Math.round((orders * codShare) / 100);
    const rtoParcels = Math.round((codOrders * rtoRate) / 100);
    const confirmCost = codOrders * META_INDIA.utility;
    const directLow = rtoParcels * RTO.directLow;
    const loadedHigh = rtoParcels * RTO.loadedHigh;

    return {
      headline: {
        label: 'Lost to RTO every month',
        value: `${money(directLow)} to ${money(rtoParcels * RTO.directHigh)}`,
        sub: `${count.format(rtoParcels)} parcels come back. Confirming every COD order on WhatsApp costs ${money(confirmCost)}.`,
      },
      rows: [
        {
          label: 'COD orders a month',
          detail: `${codShare}% of ${count.format(orders)} orders`,
          value: count.format(codOrders),
        },
        {
          label: 'Parcels that come back',
          detail: `${rtoRate}% of those COD orders`,
          value: count.format(rtoParcels),
        },
        {
          label: 'Direct logistics loss',
          detail: `${money(RTO.directLow)} to ${money(RTO.directHigh)} a parcel: forward freight, reverse leg, repackaging, holding`,
          value: `${money(directLow)} to ${money(rtoParcels * RTO.directHigh)}`,
          strong: true,
        },
        {
          label: 'Fully loaded loss',
          detail: `${money(RTO.loadedLow)} to ${money(RTO.loadedHigh)} a parcel once written-off acquisition spend is counted`,
          value: `${money(rtoParcels * RTO.loadedLow)} to ${money(loadedHigh)}`,
          strong: true,
        },
        {
          label: 'Confirming every COD order on WhatsApp',
          detail: `${count.format(codOrders)} utility templates at ${inrRate.format(META_INDIA.utility)}, at 0% markup`,
          value: money(confirmCost),
        },
      ],
      verdict: confirmCost
        ? `One confirmation message on every COD order costs ${money(confirmCost)} a month. The parcels that come back cost ${money(directLow)} to ${money(rtoParcels * RTO.directHigh)} in direct logistics over the same month, or ${money(rtoParcels * RTO.loadedLow)} to ${money(loadedHigh)} fully loaded, so the confirmation pass pays for itself if it prevents ${Math.max(1, Math.ceil(confirmCost / RTO.directHigh))} of them.`
        : 'Put in your order volume to see the comparison.',
    };
  },
  footnote:
    'Cost bands from Amazon Shipping India’s RTO breakdown (₹180 to ₹240 direct) and ClickPost figures compiled by First Resort (₹450 to ₹900 fully loaded), national RTO rates from Unicommerce’s India D2C Report 2026, all read 21 October 2026. Message rate from Meta’s published India card. This models your inputs against published bands, it is not a forecast: your own courier mix and pincode spread move it.',
};

const CART_RECOVERY: Calculator = {
  title: 'What WhatsApp cart recovery could win back',
  lead: 'Put in your abandoned checkouts and order value to see the revenue a recovery sequence brings back, and the most the messages can cost.',
  fields: [
    {
      key: 'carts',
      label: 'Abandoned checkouts a month',
      hint: 'Shopify admin → Orders → Abandoned checkouts',
      value: 1000,
      min: 0,
      max: 200000,
      sliderMax: 20000,
      step: 50,
    },
    {
      key: 'aov',
      label: 'Average order value (₹)',
      hint: 'From Shopify analytics',
      value: 1500,
      min: 0,
      max: 100000,
      sliderMax: 10000,
      step: 50,
    },
    {
      key: 'recovery',
      label: 'Share of carts recovered',
      hint: 'Your own estimate. Start low and check it against real orders after a month',
      value: 10,
      min: 0,
      max: 100,
      sliderMax: 40,
      step: 0.5,
      suffix: '%',
    },
    {
      key: 'reminders',
      label: 'Reminders per cart',
      hint: 'Three over 72 hours is the usual sequence',
      value: 3,
      min: 1,
      max: 3,
      step: 1,
    },
  ],
  compute: ({ carts, aov, recovery, reminders }) => {
    const recovered = Math.round((carts * recovery) / 100);
    const revenue = recovered * aov;
    const messages = carts * reminders;
    const cost = messages * META_INDIA.marketing;
    const perRupee = cost > 0 ? revenue / cost : 0;

    return {
      headline: {
        label: 'Revenue recovered every month',
        value: money(revenue),
        sub: `${count.format(recovered)} orders won back, for at most ${money(cost)} in Meta message fees`,
      },
      rows: [
        {
          label: 'Carts recovered',
          detail: `${recovery}% of ${count.format(carts)} abandoned checkouts`,
          value: count.format(recovered),
        },
        {
          label: 'Revenue recovered a month',
          detail: `${count.format(recovered)} orders at ${money(aov)}`,
          value: money(revenue),
          strong: true,
        },
        {
          label: 'Reminder messages, at most',
          detail: `${reminders} per cart. Shoppers who buy or reply stop getting them, so the real number is lower`,
          value: count.format(messages),
        },
        {
          label: 'Meta message cost, at most',
          detail: `Marketing templates at ${inrRate.format(META_INDIA.marketing)} each, at 0% markup, ex GST`,
          value: money(cost),
          strong: true,
        },
        {
          label: 'Revenue for every ₹1 spent on messages',
          detail: 'Recovered revenue divided by the maximum message cost',
          value: perRupee ? `₹${perRupee.toFixed(perRupee >= 10 ? 0 : 1)}` : '—',
        },
      ],
      verdict:
        cost && revenue
          ? `Recovering ${recovery}% of ${count.format(carts)} carts brings back about ${money(revenue)} a month, for at most ${money(cost)} in Meta message fees. The sequence pays for itself if it recovers ${Math.max(1, Math.ceil(cost / Math.max(aov, 1)))} order${Math.ceil(cost / Math.max(aov, 1)) === 1 ? '' : 's'}.`
          : 'Put in your abandoned checkouts and order value to see the comparison.',
    };
  },
  footnote:
    'Marketing rate from Meta’s published India card, ₹0.8631 per delivered message, read 21 October 2026. Cart reminders are always marketing templates. The recovery share is your own estimate: we do not know of an independent benchmark for WhatsApp recovery rates in India that we would stand behind, so measure yours against real orders. Message cost assumes every reminder goes to every cart, so your real bill will be lower.',
};

const CALCULATORS: Record<string, Calculator> = {
  'whatsapp-bill': WHATSAPP_BILL,
  'rto-cost': RTO_COST,
  'cart-recovery': CART_RECOVERY,
};

function el<K extends keyof HTMLElementTagNameMap>(
  doc: Document,
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = doc.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function render(host: HTMLElement, calc: Calculator): () => void {
  const doc = host.ownerDocument;
  const state: Record<string, number> = {};
  for (const f of calc.fields) state[f.key] = f.value;

  host.textContent = '';
  host.classList.add('is-live');

  host.append(el(doc, 'p', 'mkt-calc__title', calc.title));
  host.append(el(doc, 'p', 'mkt-calc__lead', calc.lead));

  const body = el(doc, 'div', 'mkt-calc__body');
  const form = el(doc, 'div', 'mkt-calc__fields');
  const boxes: HTMLInputElement[] = [];
  const sliders: HTMLInputElement[] = [];

  const sliderFill = (slider: HTMLInputElement) => {
    const min = Number(slider.min);
    const max = Number(slider.max);
    const pct = max > min ? ((Number(slider.value) - min) / (max - min)) * 100 : 0;
    slider.style.setProperty('--fill', `${Math.min(100, Math.max(0, pct))}%`);
  };

  for (const f of calc.fields) {
    const field = el(doc, 'div', 'mkt-calc__field');
    const id = `calc-${f.key}-${Math.random().toString(36).slice(2, 7)}`;
    const head = el(doc, 'div', 'mkt-calc__field-head');
    const label = el(doc, 'label', 'mkt-calc__label', f.label);
    label.htmlFor = id;
    head.append(label);

    const box = el(doc, 'span', 'mkt-calc__input');
    const input = doc.createElement('input');
    input.id = id;
    input.type = 'number';
    input.inputMode = 'numeric';
    input.value = String(f.value);
    input.min = String(f.min);
    input.max = String(f.max);
    input.step = String(f.step);
    input.dataset.key = f.key;
    box.append(input);
    if (f.suffix) box.append(el(doc, 'span', 'mkt-calc__suffix', f.suffix));
    head.append(box);
    field.append(head);

    const slider = doc.createElement('input');
    slider.type = 'range';
    slider.className = 'mkt-calc__slider';
    slider.min = String(f.min);
    slider.max = String(Math.max(f.sliderMax ?? f.max, f.value));
    slider.step = String(f.step);
    slider.value = String(f.value);
    slider.dataset.key = f.key;
    slider.setAttribute('aria-label', f.label);
    sliderFill(slider);
    field.append(slider);

    if (f.hint) field.append(el(doc, 'span', 'mkt-calc__hint', f.hint));
    form.append(field);
    boxes.push(input);
    sliders.push(slider);
  }
  body.append(form);

  const results = el(doc, 'div', 'mkt-calc__results');
  const headline = el(doc, 'div', 'mkt-calc__headline');
  headline.setAttribute('role', 'status');
  headline.setAttribute('aria-live', 'polite');
  const hLabel = el(doc, 'p', 'mkt-calc__headline-label');
  const hValue = el(doc, 'p', 'mkt-calc__headline-value');
  const hSub = el(doc, 'p', 'mkt-calc__headline-sub');
  headline.append(hLabel, hValue, hSub);
  results.append(headline);

  results.append(el(doc, 'p', 'mkt-calc__breakdown', 'How it adds up'));
  const out = el(doc, 'div', 'mkt-calc__out');
  results.append(out);

  const verdict = el(doc, 'p', 'mkt-calc__verdict');
  results.append(verdict);
  body.append(results);
  host.append(body);

  host.append(el(doc, 'p', 'mkt-calc__note', calc.footnote));

  const paint = () => {
    const { headline: h, rows, verdict: line } = calc.compute(state);
    hLabel.textContent = h.label;
    hValue.textContent = h.value;
    hSub.textContent = h.sub;
    out.textContent = '';
    const table = doc.createElement('table');
    const tbody = doc.createElement('tbody');
    for (const row of rows) {
      const tr = doc.createElement('tr');
      if (row.strong) tr.className = 'is-total';
      const th = doc.createElement('th');
      th.scope = 'row';
      th.append(el(doc, 'span', 'mkt-calc__rowLabel', row.label));
      th.append(el(doc, 'span', 'mkt-calc__rowDetail', row.detail));
      const td = doc.createElement('td');
      td.textContent = row.value;
      tr.append(th, td);
      tbody.append(tr);
    }
    table.append(tbody);
    out.append(table);
    verdict.textContent = line;
  };

  const onInput = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    const key = input.dataset.key;
    const field = calc.fields.find((f) => f.key === key);
    if (!field) return;
    const raw = Number(input.value);
    // An empty or half-typed box reads as 0 rather than NaN, so the table keeps
    // answering while the reader is still typing.
    const value = Number.isFinite(raw) ? Math.min(field.max, Math.max(field.min, raw)) : 0;
    state[field.key] = value;
    const box = boxes.find((b) => b.dataset.key === key);
    const slider = sliders.find((r) => r.dataset.key === key);
    if (input !== box && box) box.value = String(value);
    if (slider) {
      if (input !== slider) {
        if (value > Number(slider.max)) slider.max = String(value);
        slider.value = String(value);
      }
      sliderFill(slider);
    }
    paint();
  };

  const all = [...boxes, ...sliders];
  all.forEach((i) => i.addEventListener('input', onInput));
  paint();

  return () => all.forEach((i) => i.removeEventListener('input', onInput));
}

/**
 * Binds every `[data-calc]` placeholder inside `root`. Returns a cleanup
 * function; unknown or already-bound placeholders are left alone, so the
 * static fallback survives a typo in the post rather than disappearing.
 */
export function bindCalculators(root: HTMLElement): () => void {
  const hosts = [...root.querySelectorAll<HTMLElement>('[data-calc]')];
  const teardowns: (() => void)[] = [];

  for (const host of hosts) {
    const calc = CALCULATORS[host.dataset.calc ?? ''];
    if (!calc || host.dataset.calcBound === 'true') continue;
    host.dataset.calcBound = 'true';
    teardowns.push(render(host, calc));
  }

  return () => {
    for (const t of teardowns) t();
    for (const host of hosts) delete host.dataset.calcBound;
  };
}
