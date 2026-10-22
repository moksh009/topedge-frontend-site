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
};

type Calculator = {
  title: string;
  /** One line above the inputs. Doubles as the answer-engine lead. */
  lead: string;
  fields: Field[];
  /** Returns the rows of the result table plus the sentence under it. */
  compute: (v: Record<string, number>) => { rows: Row[]; verdict: string };
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
      step: 500,
    },
    {
      key: 'utility',
      label: 'Utility messages',
      hint: 'Order, shipping and plain COD confirmations, a month',
      value: 10000,
      min: 0,
      max: 500000,
      step: 500,
    },
    {
      key: 'service',
      label: 'Service replies',
      hint: 'Agent and bot replies inside the 24-hour window, a month',
      value: 5000,
      min: 0,
      max: 200000,
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

const CALCULATORS: Record<string, Calculator> = {
  'whatsapp-bill': WHATSAPP_BILL,
  'rto-cost': RTO_COST,
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

  const form = el(doc, 'div', 'mkt-calc__fields');
  const inputs: HTMLInputElement[] = [];

  for (const f of calc.fields) {
    const field = el(doc, 'label', 'mkt-calc__field');
    field.append(el(doc, 'span', 'mkt-calc__label', f.label));

    const box = el(doc, 'span', 'mkt-calc__input');
    const input = doc.createElement('input');
    input.type = 'number';
    input.inputMode = 'numeric';
    input.value = String(f.value);
    input.min = String(f.min);
    input.max = String(f.max);
    input.step = String(f.step);
    input.dataset.key = f.key;
    box.append(input);
    if (f.suffix) box.append(el(doc, 'span', 'mkt-calc__suffix', f.suffix));
    field.append(box);

    if (f.hint) field.append(el(doc, 'span', 'mkt-calc__hint', f.hint));
    form.append(field);
    inputs.push(input);
  }
  host.append(form);

  const out = el(doc, 'div', 'mkt-calc__out');
  host.append(out);

  const verdict = el(doc, 'p', 'mkt-calc__verdict');
  verdict.setAttribute('role', 'status');
  host.append(verdict);

  const note = el(doc, 'p', 'mkt-calc__note', calc.footnote);
  host.append(note);

  const paint = () => {
    const { rows, verdict: line } = calc.compute(state);
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
    const field = calc.fields.find((f) => f.key === input.dataset.key);
    if (!field) return;
    const raw = Number(input.value);
    // An empty or half-typed box reads as 0 rather than NaN, so the table keeps
    // answering while the reader is still typing.
    state[field.key] = Number.isFinite(raw) ? Math.min(field.max, Math.max(field.min, raw)) : 0;
    paint();
  };

  inputs.forEach((i) => i.addEventListener('input', onInput));
  paint();

  return () => inputs.forEach((i) => i.removeEventListener('input', onInput));
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
