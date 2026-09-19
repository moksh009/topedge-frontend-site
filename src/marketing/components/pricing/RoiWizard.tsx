import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ChevronDown, Link2, RotateCcw } from 'lucide-react';
import { PrimaryButton, GhostButton } from '../ui';
import {
  DEFAULT_ROI_INPUTS,
  calculateRoi,
  clamp,
  clampPct,
  formatInr,
  parseRoiFromQuery,
  serializeRoiToQuery,
  type RoiInputs,
  type RoiModules,
} from '../../data/roiCalc';

const MODULE_META: {
  id: keyof RoiModules;
  title: string;
  short: string;
}[] = [
  { id: 'cart', title: 'Cart recovery', short: 'Abandoned checkouts' },
  { id: 'cod', title: 'COD / RTO', short: 'Confirm + prepaid' },
  { id: 'campaigns', title: 'Campaigns', short: 'Net of Meta' },
  { id: 'support', title: 'Support', short: 'Flow / AI deflection' },
];

const MODULE_COLORS: Record<string, string> = {
  cart: '#7c3aed',
  cod: '#059669',
  campaigns: '#e11d48',
  support: '#0284c7',
};

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="roi-field">
      <span className="roi-field__label">{label}</span>
      {children}
      {hint ? <span className="roi-field__hint">{hint}</span> : null}
    </label>
  );
}

/** Strip leading zeros from integer/decimal draft strings ("0100" → "100"). */
function sanitizeNumericDraft(raw: string): string {
  const cleaned = raw.replace(/[^\d.]/g, '');
  if (cleaned === '' || cleaned === '.') return cleaned;
  const neg = raw.trim().startsWith('-');
  const [intPart = '', ...rest] = cleaned.split('.');
  const frac = rest.length ? rest.join('') : null;
  const strippedInt = intPart.replace(/^0+(?=\d)/, '') || (frac != null ? '0' : '0');
  const next = frac != null ? `${strippedInt}.${frac}` : strippedInt;
  return neg ? `-${next}` : next;
}

function NumInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
}: {
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState(() => String(Number.isFinite(value) ? value : 0));

  useEffect(() => {
    if (!focused) {
      setDraft(String(Number.isFinite(value) ? value : 0));
    }
  }, [value, focused]);

  const commit = (raw: string) => {
    const sanitized = sanitizeNumericDraft(raw);
    if (sanitized === '' || sanitized === '-' || sanitized === '.') {
      onChange(min);
      setDraft(String(min));
      return;
    }
    const n = Number(sanitized);
    const next = clamp(Number.isFinite(n) ? n : min, min, max);
    onChange(next);
    setDraft(String(next));
  };

  return (
    <div className="roi-num">
      {prefix ? <span className="roi-num__affix">{prefix}</span> : null}
      <input
        type="text"
        inputMode={step < 1 ? 'decimal' : 'numeric'}
        className="roi-num__input"
        value={focused ? draft : String(Number.isFinite(value) ? value : 0)}
        onFocus={() => {
          setFocused(true);
          setDraft(String(Number.isFinite(value) ? value : 0));
        }}
        onBlur={() => {
          setFocused(false);
          commit(draft);
        }}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === '' || raw === '-' || raw === '.') {
            setDraft(raw);
            return;
          }
          if (!/^[\d.]*$/.test(raw)) return;
          const sanitized = sanitizeNumericDraft(raw);
          setDraft(sanitized);
          const n = Number(sanitized);
          if (Number.isFinite(n)) onChange(clamp(n, min, max));
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            (e.target as HTMLInputElement).blur();
          }
        }}
      />
      {suffix ? <span className="roi-num__affix">{suffix}</span> : null}
    </div>
  );
}

function useAnimatedNumber(target: number, duration = 420) {
  const [display, setDisplay] = useState(() => (Number.isFinite(target) ? target : 0));
  const displayRef = useRef(display);
  const rafRef = useRef(0);

  useEffect(() => {
    displayRef.current = display;
  }, [display]);

  useEffect(() => {
    const from = displayRef.current;
    const to = Number.isFinite(target) ? target : 0;
    if (Math.abs(from - to) < 0.5) {
      setDisplay(to);
      displayRef.current = to;
      return;
    }
    const start = performance.now();
    cancelAnimationFrame(rafRef.current);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      const next = from + (to - from) * eased;
      displayRef.current = next;
      setDisplay(next);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function DonutChart({
  modules,
  total,
}: {
  modules: { id: string; label: string; amount: number }[];
  total: number;
}) {
  const size = 168;
  const cx = size / 2;
  const cy = size / 2;
  const r = 64;
  const stroke = 18;
  const safeTotal = Math.max(total, 1);

  let angle = 0;
  const arcs = modules
    .filter((m) => m.amount > 0)
    .map((m) => {
      const sweep = (m.amount / safeTotal) * 360;
      const start = angle;
      const end = angle + Math.max(sweep, 0.8);
      angle = end;
      const large = end - start > 180 ? 1 : 0;
      const p0 = polar(cx, cy, r, start);
      const p1 = polar(cx, cy, r, end);
      return {
        id: m.id,
        d: `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} 1 ${p1.x} ${p1.y}`,
        color: MODULE_COLORS[m.id] || '#94a3b8',
      };
    });

  return (
    <svg className="roi-donut" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Value mix by module">
      <circle cx={cx} cy={cy} r={r} className="roi-donut__track" fill="none" strokeWidth={stroke} />
      {arcs.length === 0 ? null : arcs.length === 1 ? (
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={arcs[0].color}
          strokeWidth={stroke}
          strokeLinecap="round"
        />
      ) : (
        arcs.map((a) => (
          <path
            key={a.id}
            d={a.d}
            fill="none"
            stroke={a.color}
            strokeWidth={stroke}
            strokeLinecap="butt"
          />
        ))
      )}
      <text className="roi-donut__center-label" x={cx} y={cy - 8} textAnchor="middle">
        Monthly
      </text>
      <text className="roi-donut__center-value" x={cx} y={cy + 14} textAnchor="middle">
        {formatInr(total)}
      </text>
    </svg>
  );
}

function AreaChart({
  series,
}: {
  series: { label: string; monthly: number; cumulative: number }[];
}) {
  const w = 360;
  const h = 148;
  const pad = { t: 14, r: 12, b: 26, l: 12 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const maxCum = Math.max(...series.map((s) => s.cumulative), 1);
  const n = Math.max(series.length - 1, 1);

  const points = series.map((s, i) => {
    const x = pad.l + (i / n) * innerW;
    const y = pad.t + innerH - (s.cumulative / maxCum) * innerH;
    return { x, y, ...s };
  });

  const cumPath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');
  const areaPath = `${cumPath} L${pad.l + innerW},${pad.t + innerH} L${pad.l},${pad.t + innerH} Z`;

  const gridYs = [0.25, 0.5, 0.75].map((f) => pad.t + innerH * (1 - f));

  return (
    <svg className="roi-area" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="12-month cumulative value">
      {gridYs.map((y) => (
        <line key={y} className="roi-area__grid" x1={pad.l} x2={pad.l + innerW} y1={y} y2={y} />
      ))}
      <path d={areaPath} className="roi-area__fill" />
      <path d={cumPath} className="roi-area__line" fill="none" />
      {points.map((p, i) => {
        if (i % 2 === 1 && i !== points.length - 1) return null;
        return (
          <g key={p.label}>
            <circle className="roi-area__dot" cx={p.x} cy={p.y} r={2.5} />
            <text className="roi-area__label" x={p.x} y={h - 6} textAnchor="middle">
              {p.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function ModuleFineTune({
  id,
  inputs,
  result,
  patchModule,
}: {
  id: keyof RoiModules;
  inputs: RoiInputs;
  result: ReturnType<typeof calculateRoi>;
  patchModule: <M extends keyof RoiModules>(id: M, patch: Partial<RoiModules[M]>) => void;
}) {
  const sendCap = inputs.modules.campaigns.audienceSize * 3;

  if (id === 'cart') {
    return (
      <div className="roi-panel__fields roi-panel__fields--compact">
        <Field
          label="WhatsApp recovery rate"
          hint={`~${Math.round(result.abandonedCarts)} abandoned carts / mo`}
        >
          <NumInput
            value={inputs.modules.cart.recoveryRate}
            onChange={(n) => patchModule('cart', { recoveryRate: clampPct(n) })}
            min={0}
            max={100}
            step={0.5}
            suffix="%"
          />
        </Field>
      </div>
    );
  }

  if (id === 'cod') {
    return (
      <div className="roi-panel__fields roi-panel__fields--compact">
        <Field label="RTO rate on COD">
          <NumInput
            value={inputs.modules.cod.rtoRate}
            onChange={(n) => patchModule('cod', { rtoRate: clampPct(n) })}
            min={0}
            max={100}
            step={1}
            suffix="%"
          />
        </Field>
        <Field label="Cost per RTO">
          <NumInput
            value={inputs.modules.cod.rtoCost}
            onChange={(n) => patchModule('cod', { rtoCost: n })}
            min={0}
            max={5000}
            step={25}
            prefix="₹"
          />
        </Field>
        <Field label="RTOs avoided with confirm">
          <NumInput
            value={inputs.modules.cod.confirmEffectiveness}
            onChange={(n) => patchModule('cod', { confirmEffectiveness: clampPct(n) })}
            min={0}
            max={100}
            step={1}
            suffix="%"
          />
        </Field>
        <Field label="COD → prepaid convert">
          <NumInput
            value={inputs.modules.cod.prepaidConvert}
            onChange={(n) => patchModule('cod', { prepaidConvert: clampPct(n) })}
            min={0}
            max={100}
            step={0.5}
            suffix="%"
          />
        </Field>
      </div>
    );
  }

  if (id === 'campaigns') {
    return (
      <div className="roi-panel__fields roi-panel__fields--compact">
        <Field label="WhatsApp audience">
          <NumInput
            value={inputs.modules.campaigns.audienceSize}
            onChange={(n) => patchModule('campaigns', { audienceSize: n })}
            min={0}
            max={500000}
            step={100}
          />
        </Field>
        <Field
          label="Marketing sends / month"
          hint={
            result.campaignSendsCapped
              ? `Capped at ${Math.round(result.campaignSendsUsed).toLocaleString('en-IN')} (audience × 3)`
              : `Cap ${Math.round(sendCap).toLocaleString('en-IN')}`
          }
        >
          <NumInput
            value={inputs.modules.campaigns.monthlySends}
            onChange={(n) => patchModule('campaigns', { monthlySends: n })}
            min={0}
            max={500000}
            step={100}
          />
        </Field>
        <Field label="Purchase rate per send">
          <NumInput
            value={inputs.modules.campaigns.purchaseRate}
            onChange={(n) => patchModule('campaigns', { purchaseRate: clampPct(n) })}
            min={0}
            max={100}
            step={0.1}
            suffix="%"
          />
        </Field>
        <Field label="Meta cost / message">
          <NumInput
            value={inputs.modules.campaigns.metaCostPerMsg}
            onChange={(n) => patchModule('campaigns', { metaCostPerMsg: n })}
            min={0}
            max={5}
            step={0.05}
            prefix="₹"
          />
        </Field>
      </div>
    );
  }

  return (
    <div className="roi-panel__fields roi-panel__fields--compact">
      <Field label="WhatsApp tickets / month">
        <NumInput
          value={inputs.modules.support.ticketsPerMonth}
          onChange={(n) => patchModule('support', { ticketsPerMonth: n })}
          min={0}
          max={20000}
          step={10}
        />
      </Field>
      <Field label="Deflection via Flow / AI">
        <NumInput
          value={inputs.modules.support.deflectionRate}
          onChange={(n) => patchModule('support', { deflectionRate: clampPct(n) })}
          min={0}
          max={100}
          step={1}
          suffix="%"
        />
      </Field>
      <Field label="Minutes per ticket">
        <NumInput
          value={inputs.modules.support.minutesPerTicket}
          onChange={(n) => patchModule('support', { minutesPerTicket: n })}
          min={0}
          max={45}
          step={1}
        />
      </Field>
      <Field label="Agent cost / hour">
        <NumInput
          value={inputs.modules.support.agentHourlyCost}
          onChange={(n) => patchModule('support', { agentHourlyCost: n })}
          min={0}
          max={2000}
          step={10}
          prefix="₹"
        />
      </Field>
    </div>
  );
}

export default function RoiWizard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const boot = useMemo(() => parseRoiFromQuery(searchParams.toString()), []);
  const [inputs, setInputs] = useState<RoiInputs>(boot?.inputs ?? DEFAULT_ROI_INPUTS);
  const [moreOpen, setMoreOpen] = useState(false);
  const [openModule, setOpenModule] = useState<keyof RoiModules | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => calculateRoi(inputs), [inputs]);
  const animTotal = useAnimatedNumber(result.totalMonthly);
  const animPayback = useAnimatedNumber(result.paybackDays ?? 0);

  useEffect(() => {
    const q = serializeRoiToQuery(inputs, 'quick');
    setSearchParams(new URLSearchParams(q), { replace: true });
  }, [inputs, setSearchParams]);

  const setBaseline = <K extends keyof RoiInputs['baseline']>(
    key: K,
    value: RoiInputs['baseline'][K],
  ) => {
    setInputs((prev) => ({
      ...prev,
      baseline: { ...prev.baseline, [key]: value },
    }));
  };

  const toggleModule = (id: keyof RoiModules) => {
    setInputs((prev) => ({
      ...prev,
      modules: {
        ...prev.modules,
        [id]: { ...prev.modules[id], enabled: !prev.modules[id].enabled },
      },
    }));
  };

  const patchModule = <M extends keyof RoiModules>(id: M, patch: Partial<RoiModules[M]>) => {
    setInputs((prev) => ({
      ...prev,
      modules: {
        ...prev.modules,
        [id]: { ...prev.modules[id], ...patch },
      },
    }));
  };

  const reset = () => {
    setInputs(DEFAULT_ROI_INPUTS);
    setOpenModule(null);
    setMoreOpen(false);
    setDetailOpen(false);
  };

  const copyShareLink = async () => {
    const url = `${window.location.origin}/roi?${serializeRoiToQuery(inputs, 'quick')}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const paybackLabel =
    result.needsVolumeTalk || result.paybackDays == null
      ? null
      : result.paybackDays <= 1
        ? 'under a day'
        : `~${Math.round(animPayback)} days`;

  const mobilePayback =
    result.needsVolumeTalk || result.paybackDays == null
      ? null
      : result.paybackDays <= 1
        ? 'Pays back <1d'
        : `Pays back in ~${Math.round(animPayback)}d`;

  return (
    <div className="roi-calc">
      <div className="roi-calc__grid">
        <div className="roi-calc__controls">
          <section className="roi-panel">
            <header className="roi-panel__head">
              <h2 className="roi-panel__title">Your store</h2>
              <p className="roi-panel__sub">Three numbers. Smart defaults for the rest.</p>
            </header>
            <div className="roi-panel__fields roi-panel__fields--hero">
              <Field label="Paid orders / month">
                <NumInput
                  value={inputs.baseline.orders}
                  onChange={(n) => setBaseline('orders', n)}
                  min={0}
                  max={20000}
                  step={10}
                />
              </Field>
              <Field label="Average order value">
                <NumInput
                  value={inputs.baseline.aov}
                  onChange={(n) => setBaseline('aov', n)}
                  min={0}
                  max={50000}
                  step={50}
                  prefix="₹"
                />
              </Field>
              <Field label="COD share of orders">
                <NumInput
                  value={inputs.baseline.codShare}
                  onChange={(n) => setBaseline('codShare', clampPct(n))}
                  min={0}
                  max={100}
                  step={1}
                  suffix="%"
                />
              </Field>
            </div>

            <button
              type="button"
              className={`roi-disclose${moreOpen ? ' is-open' : ''}`}
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((v) => !v)}
            >
              More store details
              <ChevronDown className="roi-disclose__icon" aria-hidden />
            </button>
            {moreOpen ? (
              <div className="roi-panel__fields roi-panel__fields--compact">
                <Field
                  label="Checkout abandon rate"
                  hint="Used to estimate abandoned carts from paid orders"
                >
                  <NumInput
                    value={inputs.baseline.abandonRate}
                    onChange={(n) => setBaseline('abandonRate', clamp(n, 0, 95))}
                    min={0}
                    max={95}
                    step={1}
                    suffix="%"
                  />
                </Field>
              </div>
            ) : null}
          </section>

          <section className="roi-panel">
            <header className="roi-panel__head">
              <h2 className="roi-panel__title">What to count</h2>
              <p className="roi-panel__sub">Tap to include. Expand to fine-tune.</p>
            </header>
            <div className="roi-chips" role="group" aria-label="ROI modules">
              {MODULE_META.map((mod) => {
                const enabled = inputs.modules[mod.id].enabled;
                const expanded = openModule === mod.id && enabled;
                return (
                  <div
                    key={mod.id}
                    className={`roi-chip${enabled ? ' is-on' : ''}${expanded ? ' is-open' : ''}`}
                  >
                    <div className="roi-chip__row">
                      <button
                        type="button"
                        className="roi-chip__toggle"
                        aria-pressed={enabled}
                        onClick={() => {
                          const turningOn = !enabled;
                          toggleModule(mod.id);
                          if (turningOn) setOpenModule(mod.id);
                          else if (openModule === mod.id) setOpenModule(null);
                        }}
                      >
                        <span
                          className="roi-chip__dot"
                          style={{ background: enabled ? MODULE_COLORS[mod.id] : '#cbd5e1' }}
                        />
                        <span className="roi-chip__text">
                          <span className="roi-chip__title">{mod.title}</span>
                          <span className="roi-chip__short">{mod.short}</span>
                        </span>
                      </button>
                      {enabled ? (
                        <button
                          type="button"
                          className="roi-chip__expand"
                          aria-expanded={expanded}
                          aria-label={`${expanded ? 'Hide' : 'Show'} ${mod.title} settings`}
                          onClick={() => setOpenModule(expanded ? null : mod.id)}
                        >
                          <ChevronDown className="roi-disclose__icon" aria-hidden />
                        </button>
                      ) : null}
                    </div>
                    {expanded ? (
                      <ModuleFineTune
                        id={mod.id}
                        inputs={inputs}
                        result={result}
                        patchModule={patchModule}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
            <button type="button" className="roi-reset" onClick={reset}>
              <RotateCcw className="h-3.5 w-3.5" aria-hidden />
              Reset defaults
            </button>
          </section>
        </div>

        <aside className="roi-calc__results" aria-live="polite">
          <div className="roi-results">
            {result.needsVolumeTalk ? (
              <>
                <p className="roi-results__eyebrow">High volume</p>
                <p className="roi-results__payback">Let&apos;s size this together</p>
                <p className="roi-results__total-line">
                  Modeled value <span className="roi-results__em">{formatInr(animTotal)}</span>
                  <span> / month</span>
                </p>
                <p className="roi-results__sub">
                  {Math.round(inputs.baseline.orders).toLocaleString('en-IN')} orders/mo is above
                  Scale’s self-serve cap. We’ll fit dispatch with you.
                </p>
              </>
            ) : (
              <>
                <p className="roi-results__eyebrow">
                  {result.plan ? `Pays for ${result.plan.name}` : 'Estimated value'}
                </p>
                {paybackLabel != null ? (
                  <p className="roi-results__payback">
                    in <span>{paybackLabel}</span>
                  </p>
                ) : (
                  <p className="roi-results__payback">Add store numbers to see payback</p>
                )}
                <p className="roi-results__total-line">
                  <span className="roi-results__em">{formatInr(animTotal)}</span>
                  <span> / month estimated</span>
                </p>
                {result.plan ? (
                  <p className="roi-results__sub">
                    Plan {result.plan.priceLabel} · Net after plan{' '}
                    <span className="roi-results__em">{formatInr(result.netAfterPlan)}</span>
                    {result.planMultiple >= 1
                      ? ` · ~${result.planMultiple.toFixed(0)}× coverage`
                      : null}
                  </p>
                ) : null}
              </>
            )}

            <div className="roi-viz" aria-label="Value breakdown">
              {result.modules.length === 0 ? (
                <p className="roi-stack__empty">Turn on at least one module.</p>
              ) : (
                <div className="roi-viz__mix">
                  <DonutChart modules={result.modules} total={result.totalMonthly} />
                  <ul className="roi-legend">
                    {result.modules.map((mod) => {
                      const pct =
                        result.totalMonthly > 0
                          ? Math.round((mod.amount / result.totalMonthly) * 100)
                          : 0;
                      return (
                        <li key={mod.id} className="roi-legend__row">
                          <span
                            className="roi-legend__swatch"
                            style={{ background: MODULE_COLORS[mod.id] }}
                          />
                          <div className="roi-legend__body">
                            <div className="roi-legend__meta">
                              <span className="roi-legend__label">{mod.label}</span>
                              <span className="roi-legend__amount">{formatInr(mod.amount)}</span>
                            </div>
                            <p className="roi-legend__detail">
                              {mod.detail}
                              {pct > 0 ? ` · ${pct}%` : ''}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {result.totalMonthly > 0 ? (
                <div className="roi-chart" aria-label="Twelve-month ramp">
                  <div className="roi-chart__head">
                    <h3 className="roi-chart__title">12-month ramp</h3>
                    <p className="roi-chart__note">Illustrative M1–M6 climb, then steady</p>
                  </div>
                  <AreaChart series={result.growthSeries} />
                  <p className="roi-chart__cum">
                    Year total: <span className="roi-results__em">{formatInr(result.yearEstimate)}</span>
                  </p>
                </div>
              ) : null}
            </div>

            <div className="roi-results__actions">
              {result.needsVolumeTalk ? (
                <PrimaryButton to="/contact" className="roi-results__cta">
                  Talk to us
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              ) : (
                <PrimaryButton to="/signup" className="roi-results__cta">
                  Start free{result.plan ? ` on ${result.plan.name}` : ''}
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              )}
              <GhostButton to="/pricing">Compare plans</GhostButton>
            </div>

            <button
              type="button"
              className={`roi-disclose roi-disclose--block${detailOpen ? ' is-open' : ''}`}
              aria-expanded={detailOpen}
              onClick={() => setDetailOpen((v) => !v)}
            >
              How we calculated
              <ChevronDown className="roi-disclose__icon" aria-hidden />
            </button>

            {detailOpen ? (
              <div className="roi-detail">
                <ul className="roi-detail__formulas">
                  {result.modules.map((mod) => (
                    <li key={mod.id}>
                      <span className="roi-detail__name">{mod.label}</span>
                      <span>{mod.formula}</span>
                    </li>
                  ))}
                </ul>
                <button type="button" className="roi-share" onClick={copyShareLink}>
                  <Link2 className="h-3.5 w-3.5" aria-hidden />
                  {copied ? 'Link copied' : 'Copy share link'}
                </button>
                <p className="roi-results__links">
                  <Link to="/features/journeys#abandoned-cart">Cart recovery</Link>
                  {' · '}
                  <Link to="/features/journeys">COD confirm</Link>
                  {' · '}
                  <Link to="/features/campaigns">Campaigns</Link>
                </p>
              </div>
            ) : null}

            <p className="roi-results__foot">
              Illustrative model for Shopify WhatsApp ops in India — not a guarantee. Meta rates
              vary by category and quality.
            </p>
          </div>
        </aside>
      </div>

      <div className="roi-mobile-bar">
        <div>
          <p className="roi-mobile-bar__label">{mobilePayback ?? 'Monthly value'}</p>
          <p className="roi-mobile-bar__total">{formatInr(animTotal)}</p>
        </div>
        {result.needsVolumeTalk ? (
          <Link to="/contact" className="roi-mobile-bar__cta">
            Talk to us
          </Link>
        ) : (
          <Link to="/signup" className="roi-mobile-bar__cta">
            Start free
          </Link>
        )}
      </div>
    </div>
  );
}
