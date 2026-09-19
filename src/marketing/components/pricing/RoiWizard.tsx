import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Info, Link2, RotateCcw } from 'lucide-react';
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
  type RoiMode,
  type RoiModules,
} from '../../data/roiCalc';

const MODULE_META: { id: keyof RoiModules; title: string; blurb: string }[] = [
  { id: 'cart', title: 'Cart recovery', blurb: 'WhatsApp nudges on abandoned checkouts' },
  { id: 'cod', title: 'COD → Prepaid / RTO', blurb: 'Confirm before ship + prepaid convert' },
  { id: 'campaigns', title: 'Audience campaigns', blurb: 'Meta-safe broadcasts, net of template cost' },
  { id: 'support', title: 'Support / Flow', blurb: 'Tickets deflected by automation' },
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
  return (
    <div className="roi-num">
      {prefix ? <span className="roi-num__affix">{prefix}</span> : null}
      <input
        type="number"
        className="roi-num__input"
        value={Number.isFinite(value) ? value : 0}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === '' || raw === '-') {
            onChange(min);
            return;
          }
          onChange(clamp(Number(raw), min, max));
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

function AreaChart({
  series,
}: {
  series: { label: string; monthly: number; cumulative: number }[];
}) {
  const w = 320;
  const h = 120;
  const pad = { t: 8, r: 8, b: 22, l: 8 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const maxCum = Math.max(...series.map((s) => s.cumulative), 1);
  const maxMo = Math.max(...series.map((s) => s.monthly), 1);
  const n = Math.max(series.length - 1, 1);

  const cumPath = series
    .map((s, i) => {
      const x = pad.l + (i / n) * innerW;
      const y = pad.t + innerH - (s.cumulative / maxCum) * innerH;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const areaPath = `${cumPath} L${pad.l + innerW},${pad.t + innerH} L${pad.l},${pad.t + innerH} Z`;

  return (
    <svg className="roi-area" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="12-month cumulative value">
      <path d={areaPath} className="roi-area__fill" />
      <path d={cumPath} className="roi-area__line" fill="none" />
      {series.map((s, i) => {
        if (i % 2 === 1 && i !== series.length - 1) return null;
        const x = pad.l + (i / n) * innerW;
        const barH = (s.monthly / maxMo) * (innerH * 0.35);
        return (
          <g key={s.label}>
            <rect
              className="roi-area__bar"
              x={x - 4}
              y={pad.t + innerH - barH}
              width={8}
              height={Math.max(2, barH)}
              rx={2}
            />
            <text className="roi-area__label" x={x} y={h - 4} textAnchor="middle">
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function RoiWizard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const boot = useMemo(() => parseRoiFromQuery(searchParams.toString()), []);
  const [mode, setMode] = useState<RoiMode>(boot?.mode ?? 'full');
  const [inputs, setInputs] = useState<RoiInputs>(boot?.inputs ?? DEFAULT_ROI_INPUTS);
  const [copied, setCopied] = useState(false);
  const [formulaOpen, setFormulaOpen] = useState<string | null>(null);

  const result = useMemo(() => calculateRoi(inputs), [inputs]);
  const animTotal = useAnimatedNumber(result.totalMonthly);
  const maxStack = Math.max(result.totalMonthly, 1);

  // Sync URL (shareable scenario)
  useEffect(() => {
    const q = serializeRoiToQuery(inputs, mode);
    const next = new URLSearchParams(q);
    setSearchParams(next, { replace: true });
  }, [inputs, mode, setSearchParams]);

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
    setMode('full');
  };

  const goCustomize = () => setMode('full');

  const copyShareLink = async () => {
    const url = `${window.location.origin}/roi?${serializeRoiToQuery(inputs, mode)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const sendCap = inputs.modules.campaigns.audienceSize * 3;

  return (
    <div className="roi-calc">
      <div className="roi-mode" role="tablist" aria-label="Calculator mode">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'quick'}
          className={`roi-mode__btn${mode === 'quick' ? ' is-active' : ''}`}
          onClick={() => setMode('quick')}
        >
          Quick Estimate
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'full'}
          className={`roi-mode__btn${mode === 'full' ? ' is-active' : ''}`}
          onClick={() => setMode('full')}
        >
          Full calculator
        </button>
      </div>

      <div className="roi-calc__grid">
        <div className="roi-calc__controls">
          {mode === 'quick' ? (
            <section className="roi-panel">
              <header className="roi-panel__head">
                <h2 className="roi-panel__title">Three numbers. One estimate.</h2>
                <p className="roi-panel__sub">
                  Everything else uses smart defaults — then customize when you want rigor.
                </p>
              </header>
              <div className="roi-panel__fields">
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
              <button type="button" className="roi-handoff" onClick={goCustomize}>
                Customize every assumption →
              </button>
            </section>
          ) : (
            <>
              <section className="roi-panel">
                <header className="roi-panel__head roi-panel__head--row">
                  <div>
                    <h2 className="roi-panel__title">Store baseline</h2>
                    <p className="roi-panel__sub">Shared across every module</p>
                  </div>
                  <label className="roi-adv">
                    <input
                      type="checkbox"
                      checked={inputs.advancedMode}
                      onChange={(e) =>
                        setInputs((prev) => ({ ...prev, advancedMode: e.target.checked }))
                      }
                    />
                    <span>
                      Advanced
                      <em> more conservative cart math</em>
                    </span>
                  </label>
                </header>
                <div className="roi-panel__fields">
                  <Field label="Paid orders / month" hint="Typical month, not festival peak">
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
                  <Field
                    label="Checkout abandon rate"
                    hint="Capped at 95% — used to derive abandoned carts from paid orders"
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
              </section>

              {MODULE_META.map((mod) => {
                const enabled = inputs.modules[mod.id].enabled;
                return (
                  <section
                    key={mod.id}
                    className={`roi-panel roi-panel--module${enabled ? ' is-on' : ''}`}
                    data-module={mod.id}
                  >
                    <header className="roi-panel__head roi-panel__head--row">
                      <div>
                        <h2 className="roi-panel__title">{mod.title}</h2>
                        <p className="roi-panel__sub">{mod.blurb}</p>
                      </div>
                      <button
                        type="button"
                        className={`roi-toggle${enabled ? ' is-on' : ''}`}
                        aria-pressed={enabled}
                        onClick={() => toggleModule(mod.id)}
                      >
                        <span className="roi-toggle__knob" />
                        <span className="roi-toggle__text">{enabled ? 'On' : 'Off'}</span>
                      </button>
                    </header>

                    {enabled && mod.id === 'cart' ? (
                      <div className="roi-panel__fields">
                        <Field
                          label="WhatsApp recovery rate"
                          hint={`~${Math.round(result.abandonedCarts)} abandoned carts / mo in play`}
                        >
                          <NumInput
                            value={inputs.modules.cart.recoveryRate}
                            onChange={(n) =>
                              patchModule('cart', { recoveryRate: clampPct(n) })
                            }
                            min={0}
                            max={100}
                            step={0.5}
                            suffix="%"
                          />
                        </Field>
                        {inputs.advancedMode ? (
                          <Field
                            label="Organic / baseline recovery"
                            hint="Email, retargeting, return visits without WhatsApp — only the gap counts"
                          >
                            <NumInput
                              value={inputs.modules.cart.baselineRecoveryRate}
                              onChange={(n) =>
                                patchModule('cart', {
                                  baselineRecoveryRate: clampPct(n),
                                })
                              }
                              min={0}
                              max={100}
                              step={0.5}
                              suffix="%"
                            />
                          </Field>
                        ) : null}
                      </div>
                    ) : null}

                    {enabled && mod.id === 'cod' ? (
                      <div className="roi-panel__fields">
                        <Field label="RTO rate on COD (without confirm)">
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
                        <Field label="RTOs avoided with WA confirm">
                          <NumInput
                            value={inputs.modules.cod.confirmEffectiveness}
                            onChange={(n) =>
                              patchModule('cod', { confirmEffectiveness: clampPct(n) })
                            }
                            min={0}
                            max={100}
                            step={1}
                            suffix="%"
                          />
                        </Field>
                        <Field label="COD → prepaid convert rate">
                          <NumInput
                            value={inputs.modules.cod.prepaidConvert}
                            onChange={(n) =>
                              patchModule('cod', { prepaidConvert: clampPct(n) })
                            }
                            min={0}
                            max={100}
                            step={0.5}
                            suffix="%"
                          />
                        </Field>
                      </div>
                    ) : null}

                    {enabled && mod.id === 'campaigns' ? (
                      <div className="roi-panel__fields">
                        <Field label="Reachable WhatsApp audience">
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
                          hint={`Capped at audience × 3 (≤ ${Math.round(sendCap).toLocaleString('en-IN')}). ${
                            result.campaignSendsCapped
                              ? `Using ${Math.round(result.campaignSendsUsed).toLocaleString('en-IN')} sends.`
                              : 'Raise audience to unlock more sends.'
                          }`}
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
                            onChange={(n) =>
                              patchModule('campaigns', { purchaseRate: clampPct(n) })
                            }
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
                    ) : null}

                    {enabled && mod.id === 'support' ? (
                      <div className="roi-panel__fields">
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
                            onChange={(n) =>
                              patchModule('support', { deflectionRate: clampPct(n) })
                            }
                            min={0}
                            max={100}
                            step={1}
                            suffix="%"
                          />
                        </Field>
                        <Field label="Minutes per ticket today">
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
                    ) : null}
                  </section>
                );
              })}

              <button type="button" className="roi-reset" onClick={reset}>
                <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                Reset to defaults
              </button>
            </>
          )}

          <div className="roi-controls-cta">
            <p className="roi-controls-cta__title">
              Estimate looks right? Put it live on WhatsApp.
            </p>
            <p className="roi-controls-cta__sub">
              {result.needsVolumeTalk ? (
                <>
                  Volume is above Scale’s 1,500-order cap — talk to us for a fit.
                </>
              ) : (
                <>
                  Suggested plan: <strong>{result.plan?.name ?? '—'}</strong> ·{' '}
                  {formatInr(result.totalMonthly)}/mo modeled value
                </>
              )}
            </p>
            <div className="roi-controls-cta__actions">
              {result.needsVolumeTalk ? (
                <PrimaryButton to="/contact">
                  Let&apos;s talk volume
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              ) : (
                <PrimaryButton to="/signup">
                  Start free on {result.plan?.name}
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              )}
              <GhostButton to="/pricing">Compare plans</GhostButton>
            </div>
          </div>
        </div>

        <aside className="roi-calc__results" aria-live="polite">
          <div className="roi-results">
            <p className="roi-results__eyebrow">Estimated monthly value</p>
            <p className="roi-results__total">{formatInr(animTotal)}</p>
            <p className="roi-results__sub">
              {formatInr(result.totalMonthly / 4)} / week · {formatInr(result.yearEstimate)} / year
              (12-mo ramp sum)
            </p>

            <div className="roi-stack" aria-label="Value by module">
              {result.modules.length === 0 ? (
                <p className="roi-stack__empty">Turn on at least one module to see value.</p>
              ) : (
                result.modules.map((mod) => (
                  <div key={mod.id} className="roi-stack__row">
                    <div className="roi-stack__meta">
                      <span className="roi-stack__label">
                        {mod.label}
                        <button
                          type="button"
                          className="roi-tip__btn"
                          aria-label={`How ${mod.label} is calculated`}
                          onClick={() =>
                            setFormulaOpen((cur) => (cur === mod.id ? null : mod.id))
                          }
                        >
                          <Info className="h-3.5 w-3.5" aria-hidden />
                        </button>
                      </span>
                      <span className="roi-stack__amount">{formatInr(mod.amount)}</span>
                    </div>
                    {formulaOpen === mod.id ? (
                      <p className="roi-stack__formula">{mod.formula}</p>
                    ) : null}
                    <div className="roi-stack__track">
                      <span
                        className="roi-stack__fill"
                        style={{
                          width: `${Math.max(4, (mod.amount / maxStack) * 100)}%`,
                          background: MODULE_COLORS[mod.id],
                        }}
                      />
                    </div>
                    <p className="roi-stack__detail">{mod.detail}</p>
                  </div>
                ))
              )}
            </div>

            <div className="roi-chart" aria-label="Twelve-month ramp">
              <div className="roi-chart__head">
                <h3 className="roi-chart__title">12-month ramp</h3>
                <p className="roi-chart__note">
                  M1–M6 climb, then steady-state through M12 · illustrative
                </p>
              </div>
              <AreaChart series={result.growthSeries} />
              <p className="roi-chart__cum">
                Year total (sum of 12 months):{' '}
                <strong>{formatInr(result.yearEstimate)}</strong>
              </p>
            </div>

            {result.needsVolumeTalk ? (
              <div className="roi-plan roi-plan--talk">
                <p className="roi-plan__eyebrow">Above published caps</p>
                <p className="roi-plan__name">Let&apos;s talk volume</p>
                <p className="roi-plan__pitch">
                  {Math.round(inputs.baseline.orders).toLocaleString('en-IN')} orders/mo exceeds
                  Scale’s 1,500-order cycle cap. We’ll size dispatch and Meta volume with you —
                  not force-fit a self-serve tier.
                </p>
                <div className="roi-results__actions">
                  <PrimaryButton to="/contact">
                    Talk to us
                    <ArrowRight className="h-4 w-4" />
                  </PrimaryButton>
                </div>
              </div>
            ) : result.plan ? (
              <div className="roi-plan">
                <div className="roi-plan__top">
                  <div>
                    <p className="roi-plan__eyebrow">Suggested plan (by order volume)</p>
                    <p className="roi-plan__name">{result.plan.name}</p>
                  </div>
                  <p className="roi-plan__price">{result.plan.priceLabel}</p>
                </div>
                <p className="roi-plan__pitch">{result.plan.pitch}</p>
                <div className="roi-plan__meter" aria-hidden>
                  <span
                    className="roi-plan__meter-fill"
                    style={{
                      width: `${Math.min(100, Math.max(8, (result.planMultiple / 40) * 100))}%`,
                    }}
                  />
                </div>
                <p className="roi-plan__cov">
                  Covers ~<strong>{result.planMultiple.toFixed(1)}×</strong> plan cost · Net after
                  plan <strong>{formatInr(result.netAfterPlan)}</strong>
                </p>
              </div>
            ) : null}

            <div className="roi-results__actions">
              {result.needsVolumeTalk ? null : (
                <PrimaryButton to="/signup" className="roi-results__cta">
                  Start free on {result.plan?.name}
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              )}
              <GhostButton to="/pricing">Compare plans</GhostButton>
              <button type="button" className="roi-share" onClick={copyShareLink}>
                <Link2 className="h-3.5 w-3.5" aria-hidden />
                {copied ? 'Link copied' : 'Copy share link'}
              </button>
            </div>

            <p className="roi-results__foot">
              Illustrative model for Shopify WhatsApp ops in India — not a guarantee.
              {inputs.advancedMode
                ? ' Advanced mode credits only incremental cart recovery above organic baseline.'
                : null}{' '}
              Meta rates vary by category and quality.
            </p>
            <p className="roi-results__links">
              <Link to="/features/journeys#abandoned-cart">Cart recovery</Link>
              {' · '}
              <Link to="/features/journeys#cod-prepaid">COD confirm</Link>
              {' · '}
              <Link to="/features/campaigns">Campaigns</Link>
            </p>
          </div>
        </aside>
      </div>

      {/* Mobile sticky total */}
      <div className="roi-mobile-bar" aria-hidden={false}>
        <div>
          <p className="roi-mobile-bar__label">Monthly value</p>
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
