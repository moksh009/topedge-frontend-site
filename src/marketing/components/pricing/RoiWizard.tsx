import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ChevronDown, RotateCcw } from 'lucide-react';
import { PrimaryButton } from '../ui';
import FoldText from '../effects/FoldText';
import '../../styles/roi.css';

type Answers = {
  orders: number;
  aov: number;
  abandon: number;
  lift: number;
};

const DEFAULTS: Answers = {
  orders: 400,
  aov: 2500,
  abandon: 70,
  lift: 10,
};

type StepId = 'orders' | 'aov' | 'abandon' | 'lift';
type Tone = 'violet' | 'amber' | 'rose' | 'emerald';

type PlanRec = {
  slug: 'launch' | 'growth' | 'scale';
  name: string;
  price: number;
  priceLabel: string;
  pitch: string;
};

const PLANS = {
  launch: {
    slug: 'launch' as const,
    name: 'Launch',
    price: 1999,
    priceLabel: '₹1,999/mo',
    pitch: 'Enough to run recovery journeys and prove the math on a smaller catalog.',
  },
  growth: {
    slug: 'growth' as const,
    name: 'Growth',
    price: 3999,
    priceLabel: '₹3,999/mo',
    pitch: 'Branching journeys and priority dispatch so more abandoned carts convert.',
  },
  scale: {
    slug: 'scale' as const,
    name: 'Scale',
    price: 6499,
    priceLabel: '₹6,499/mo',
    pitch: 'Highest dispatch priority plus Meta ads audience push when recovery is still thin.',
  },
};

function recommendPlan(recovered: number): PlanRec {
  if (recovered < 18000) return PLANS.scale;
  if (recovered < 55000) return PLANS.growth;
  return PLANS.launch;
}

const MONTHS = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'];

const STEPS: {
  id: StepId;
  tone: Tone;
  before: string;
  highlight: string;
  after: string;
  help: string;
  options: { label: string; value: number; hint?: string }[];
  min: number;
  max: number;
  step: number;
  suffix?: string;
  prefix?: string;
}[] = [
  {
    id: 'orders',
    tone: 'violet',
    before: 'How many ',
    highlight: 'orders',
    after: ' do you get each month?',
    help: 'Pick a typical month — not your biggest sale week.',
    options: [
      { label: '150 / mo', value: 150, hint: 'Early' },
      { label: '400 / mo', value: 400, hint: 'Growing' },
      { label: '900 / mo', value: 900, hint: 'Busy' },
      { label: '1,500 / mo', value: 1500, hint: 'Scale' },
    ],
    min: 50,
    max: 5000,
    step: 10,
  },
  {
    id: 'aov',
    tone: 'amber',
    before: 'What is your ',
    highlight: 'average order value',
    after: '?',
    help: 'Average rupees per paid order.',
    options: [
      { label: '₹1,200', value: 1200, hint: 'Value' },
      { label: '₹2,500', value: 2500, hint: 'Typical' },
      { label: '₹4,000', value: 4000, hint: 'Premium' },
      { label: '₹6,500', value: 6500, hint: 'High AOV' },
    ],
    min: 300,
    max: 20000,
    step: 100,
    prefix: '₹',
  },
  {
    id: 'abandon',
    tone: 'rose',
    before: 'What share of checkouts get ',
    highlight: 'abandoned',
    after: '?',
    help: 'Most Indian D2C stores sit between 60–80%.',
    options: [
      { label: '55%', value: 55, hint: 'Low' },
      { label: '70%', value: 70, hint: 'Typical' },
      { label: '80%', value: 80, hint: 'High' },
      { label: '88%', value: 88, hint: 'Very high' },
    ],
    min: 30,
    max: 95,
    step: 1,
    suffix: '%',
  },
  {
    id: 'lift',
    tone: 'emerald',
    before: 'What ',
    highlight: 'recovery rate',
    after: ' feels realistic with WhatsApp?',
    help: 'Start at 10%. Many stores land between 8–15%.',
    options: [
      { label: '8%', value: 8, hint: 'Cautious' },
      { label: '10%', value: 10, hint: 'Default' },
      { label: '12%', value: 12, hint: 'Strong' },
      { label: '15%', value: 15, hint: 'Optimistic' },
    ],
    min: 4,
    max: 25,
    step: 1,
    suffix: '%',
  },
];

function formatInr(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

function clamp(n: number, min: number, max: number) {
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

const STEP_EASE = [0.22, 1, 0.36, 1] as const;

function CustomSelect({
  options,
  value,
  onChange,
  tone,
  label,
}: {
  options: { label: string; value: number; hint?: string }[];
  value: number;
  onChange: (v: number) => void;
  tone: Tone;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={`roi-dd roi-dd--${tone}`} ref={rootRef}>
      <span className="roi-dd__label">Choose an option</span>
      <button
        type="button"
        className={`roi-dd__trigger${open ? ' is-open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="roi-dd__value">
          <strong>{selected.label}</strong>
          {selected.hint ? <em>{selected.hint}</em> : null}
        </span>
        <ChevronDown className="roi-dd__chevron" aria-hidden />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            className="roi-dd__menu"
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: STEP_EASE }}
          >
            {options.map((opt) => {
              const active = opt.value === value;
              return (
                <li key={opt.value} role="option" aria-selected={active}>
                  <button
                    type="button"
                    className={`roi-dd__option${active ? ' is-active' : ''}`}
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                  >
                    <span>
                      <strong>{opt.label}</strong>
                      {opt.hint ? <em>{opt.hint}</em> : null}
                    </span>
                    {active ? <Check className="h-4 w-4" strokeWidth={2.25} /> : null}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const HL_COLOR: Record<Tone, string> = {
  violet: '#5b21b6',
  amber: '#b45309',
  rose: '#be185d',
  emerald: '#047857',
};

export default function RoiWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(DEFAULTS);
  const [done, setDone] = useState(false);

  const step = STEPS[stepIndex];

  const recovered = useMemo(
    () => answers.orders * (answers.abandon / 100) * (answers.lift / 100) * answers.aov,
    [answers],
  );
  const abandonedValue = useMemo(
    () => answers.orders * (answers.abandon / 100) * answers.aov,
    [answers],
  );
  const cartsWon = Math.round(answers.orders * (answers.abandon / 100) * (answers.lift / 100));
  const perWeek = recovered / 4;
  const plan = useMemo(() => recommendPlan(recovered), [recovered]);
  const multiple = recovered / plan.price;
  const recoverPct = abandonedValue > 0 ? Math.round((recovered / abandonedValue) * 100) : 0;

  const growthSeries = useMemo(() => {
    const factors = [0.55, 0.72, 0.88, 1, 1.08, 1.15];
    return factors.map((f, i) => ({
      label: MONTHS[i],
      monthly: recovered * f,
      cumulative: factors.slice(0, i + 1).reduce((sum, x) => sum + recovered * x, 0),
    }));
  }, [recovered]);

  const maxMonthly = Math.max(...growthSeries.map((g) => g.monthly), 1);
  const yearTotal = growthSeries.reduce((s, g) => s + g.monthly, 0) * 2;

  const setField = (id: StepId, value: number) => {
    const meta = STEPS.find((s) => s.id === id)!;
    setAnswers((prev) => ({
      ...prev,
      [id]: clamp(value, meta.min, meta.max),
    }));
  };

  const currentValue = answers[step.id];

  const goNext = () => {
    if (stepIndex >= STEPS.length - 1) {
      setDone(true);
      return;
    }
    setStepIndex((i) => i + 1);
  };

  const goBack = () => {
    if (done) {
      setDone(false);
      setStepIndex(STEPS.length - 1);
      return;
    }
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const restart = () => {
    setAnswers(DEFAULTS);
    setStepIndex(0);
    setDone(false);
  };

  return (
    <div className="roi-wiz">
      <div className="roi-wiz__ambient" aria-hidden />

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step.id}
            className={`roi-wiz__card roi-wiz__card--ask roi-wiz__card--${step.tone}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.36, ease: STEP_EASE }}
          >
            <div className="roi-wiz__ask">
              <p className="roi-wiz__meta">
                Question {stepIndex + 1} of {STEPS.length}
              </p>

              <h2 className="roi-wiz__question">
                <span className="roi-wiz__q-line">
                  <FoldText
                    key={`${step.id}-b`}
                    text={step.before}
                    splitBy="word"
                    hinge="top"
                    trigger="mount"
                    duration={0.45}
                    stagger={0.028}
                    ease="power3.out"
                    perspective={680}
                    creaseShading={0.35}
                    fontSize="clamp(1.7rem, 2.8vw, 2.45rem)"
                    fontWeight={450}
                    color="#0c1222"
                    className="roi-wiz__fold"
                  />
                  <span className={`roi-wiz__hl roi-wiz__hl--${step.tone}`}>
                    <FoldText
                      key={`${step.id}-h`}
                      text={step.highlight}
                      splitBy="word"
                      hinge="top"
                      trigger="mount"
                      duration={0.45}
                      stagger={0.028}
                      ease="power3.out"
                      perspective={680}
                      creaseShading={0.3}
                      fontSize="clamp(1.7rem, 2.8vw, 2.45rem)"
                      fontWeight={500}
                      color={HL_COLOR[step.tone]}
                      className="roi-wiz__fold"
                    />
                  </span>
                  <FoldText
                    key={`${step.id}-a`}
                    text={step.after}
                    splitBy="word"
                    hinge="top"
                    trigger="mount"
                    duration={0.45}
                    stagger={0.028}
                    ease="power3.out"
                    perspective={680}
                    creaseShading={0.35}
                    fontSize="clamp(1.7rem, 2.8vw, 2.45rem)"
                    fontWeight={450}
                    color="#0c1222"
                    className="roi-wiz__fold"
                  />
                </span>
              </h2>

              <p className="roi-wiz__help">{step.help}</p>

              <CustomSelect
                options={step.options}
                value={currentValue}
                onChange={(v) => setField(step.id, v)}
                tone={step.tone}
                label={`${step.before}${step.highlight}${step.after}`}
              />

              <label className="roi-wiz__fine">
                <span>Or type exact</span>
                <span className="roi-wiz__input-wrap">
                  {step.prefix ? <i>{step.prefix}</i> : null}
                  <input
                    type="number"
                    min={step.min}
                    max={step.max}
                    step={step.step}
                    value={currentValue}
                    onChange={(e) => setField(step.id, Number(e.target.value))}
                    aria-label={`Exact ${step.id}`}
                  />
                  {step.suffix ? <i>{step.suffix}</i> : null}
                </span>
              </label>

              <div className="roi-wiz__nav">
                <button
                  type="button"
                  className="roi-wiz__ghost"
                  onClick={goBack}
                  disabled={stepIndex === 0}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button type="button" className="roi-wiz__primary" onClick={goNext}>
                  {stepIndex >= STEPS.length - 1 ? 'Show estimate' : 'Continue'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            className="roi-wiz__result-shell"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: STEP_EASE }}
          >
            <div className="roi-wiz__result-main">
              <p className="roi-wiz__meta">Your estimate</p>
              <p className="roi-wiz__result-kicker">
                Monthly recovery with{' '}
                <span className="roi-brand">
                  TopEdge <span>AI</span>
                </span>
              </p>
              <p className="roi-wiz__value">{formatInr(recovered)}</p>
              <p className="roi-wiz__value-sub">
                ~{formatInr(perWeek)} / week · {cartsWon.toLocaleString('en-IN')} carts · ~
                {formatInr(yearTotal)} / year
              </p>

              <div className="roi-wiz__compare" aria-label="Before and after">
                <div className="roi-wiz__compare-col">
                  <span>Left on table</span>
                  <strong>{formatInr(abandonedValue)}</strong>
                  <em>Abandoned / mo</em>
                </div>
                <div className="roi-wiz__compare-divider" aria-hidden />
                <div className="roi-wiz__compare-col is-won">
                  <span>Recovered</span>
                  <strong>{formatInr(recovered)}</strong>
                  <em>{recoverPct}% of abandon value</em>
                </div>
              </div>

              <dl className="roi-wiz__inputs">
                <div>
                  <dt>Orders</dt>
                  <dd>{answers.orders.toLocaleString('en-IN')}/mo</dd>
                </div>
                <div>
                  <dt>AOV</dt>
                  <dd>{formatInr(answers.aov)}</dd>
                </div>
                <div>
                  <dt>Abandon</dt>
                  <dd>{answers.abandon}%</dd>
                </div>
                <div>
                  <dt>Lift</dt>
                  <dd>{answers.lift}%</dd>
                </div>
              </dl>

              <div className={`roi-wiz__plan-card roi-wiz__plan-card--${plan.slug}`}>
                <div className="roi-wiz__plan-card-top">
                  <span className="roi-wiz__plan-badge">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                    Suggested for you
                  </span>
                  <div className="roi-wiz__plan-price-chip">
                    <strong>{plan.priceLabel}</strong>
                    <span>excl. GST</span>
                  </div>
                </div>

                <div className="roi-wiz__plan-card-main">
                  <p className="roi-wiz__plan-name">{plan.name}</p>
                  <p className="roi-wiz__plan-pitch">{plan.pitch}</p>
                </div>

                <div className="roi-wiz__plan-metric">
                  <div className="roi-wiz__plan-metric-copy">
                    <span>Recovery covers plan cost</span>
                    <em>
                      ~{multiple >= 10 ? Math.round(multiple) : multiple.toFixed(1)}× monthly
                    </em>
                  </div>
                  <div
                    className="roi-wiz__plan-meter"
                    role="img"
                    aria-label={`About ${multiple >= 10 ? Math.round(multiple) : multiple.toFixed(1)} times plan cost`}
                  >
                    <span
                      style={{
                        width: `${Math.min(100, Math.max(12, (multiple / 40) * 100))}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <p className="roi-wiz__footnote">
                Based on orders × abandon × recovery × AOV. Growth curve is illustrative.
              </p>

              <div className="roi-wiz__result-actions">
                <PrimaryButton to="/signup" className="roi-wiz__cta">
                  Start free on {plan.name}
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
                <Link to="/pricing" className="roi-wiz__text-link">
                  Compare plans
                </Link>
              </div>

              <div className="roi-wiz__result-foot">
                <button type="button" className="roi-wiz__ghost" onClick={goBack}>
                  <ArrowLeft className="h-4 w-4" />
                  Edit answers
                </button>
                <button type="button" className="roi-wiz__ghost" onClick={restart}>
                  <RotateCcw className="h-3.5 w-3.5" />
                  Start over
                </button>
              </div>
            </div>

            <aside className="roi-wiz__result-side" aria-label="Projected recovery over six months">
              <div className="roi-wiz__chart-panel">
                <div className="roi-wiz__chart-head">
                  <h3>Projected recovery over time</h3>
                  <p>Ramps as journeys mature — illustrative 6-month curve</p>
                </div>
                <div className="roi-wiz__chart-bars">
                  {growthSeries.map((g) => (
                    <div key={g.label} className="roi-wiz__chart-col">
                      <span className="roi-wiz__chart-amt">{formatInr(g.monthly)}</span>
                      <span
                        className="roi-wiz__chart-bar"
                        style={{ height: `${Math.max(8, (g.monthly / maxMonthly) * 100)}%` }}
                      />
                      <span className="roi-wiz__chart-label">{g.label}</span>
                    </div>
                  ))}
                </div>
                <div className="roi-wiz__chart-foot">
                  <span>Cumulative by M6</span>
                  <strong>{formatInr(growthSeries[5]?.cumulative ?? 0)}</strong>
                </div>
              </div>
            </aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
