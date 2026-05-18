import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { IndianRupee, Sparkles, TrendingUp } from 'lucide-react';
import { formatInr } from '../data/pricing';
import { PrimaryButton } from './ui';
import { Reveal } from './motion';
import { cn } from '@/lib/utils';

const GROWTH_PLAN = 799;
const TOPEDGE_RECOVERY_RATE = 0.32;

type Inputs = {
  monthlyOrders: number;
  aov: number;
  abandonRate: number;
  currentRecoveryRate: number;
};

function compute({ monthlyOrders, aov, abandonRate, currentRecoveryRate }: Inputs) {
  const abandon = abandonRate / 100;
  const checkoutStarts = monthlyOrders / Math.max(1 - abandon, 0.01);
  const abandonedCarts = Math.max(0, Math.round(checkoutStarts - monthlyOrders));
  const abandonedValue = abandonedCarts * aov;

  const currentRecovery = abandonedValue * (currentRecoveryRate / 100);
  const withTopEdge = abandonedValue * TOPEDGE_RECOVERY_RATE;
  const incremental = Math.max(0, withTopEdge - currentRecovery);
  const annual = incremental * 12;
  const roiMultiple = GROWTH_PLAN > 0 ? incremental / GROWTH_PLAN : 0;
  const paybackDays = incremental > 0 ? Math.ceil((GROWTH_PLAN / incremental) * 30) : 0;

  return {
    abandonedCarts,
    abandonedValue,
    currentRecovery,
    withTopEdge,
    incremental,
    annual,
    roiMultiple,
    paybackDays,
  };
}

function SliderField({
  label,
  hint,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#0c1222]">{label}</p>
          <p className="mt-0.5 text-xs text-slate-400">{hint}</p>
        </div>
        <p className="rounded-lg bg-violet-50 px-2.5 py-1 text-base font-semibold tabular-nums tracking-tight text-[#7C3AED]">
          {display}
        </p>
      </div>
      <div className="relative">
        <div
          className="pointer-events-none absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#7C3AED] to-violet-300"
          style={{ width: `${pct}%` }}
          aria-hidden
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="marketing-range roi-range relative z-[1] w-full"
          aria-label={label}
        />
      </div>
    </div>
  );
}

function ResultStat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-xl px-4 py-3',
        highlight ? 'bg-white/20 ring-1 ring-white/25' : 'bg-white/10 ring-1 ring-white/10'
      )}
    >
      <p className="text-[10px] font-medium uppercase tracking-wider text-violet-200">{label}</p>
      <p className="mt-1 text-lg font-semibold tabular-nums text-white">{value}</p>
    </div>
  );
}

export default function RoiCalculator({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  const [inputs, setInputs] = useState<Inputs>({
    monthlyOrders: 450,
    aov: 1850,
    abandonRate: 72,
    currentRecoveryRate: 4,
  });

  const result = useMemo(() => compute(inputs), [inputs]);
  const set = <K extends keyof Inputs>(key: K, value: Inputs[K]) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  return (
    <div className={compact ? '' : 'mx-auto max-w-6xl px-4 lg:px-6'}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <Reveal>
          <div className="rounded-3xl border border-violet-100/80 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(124,58,237,0.2)] md:p-8">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-[#7C3AED]">
                <IndianRupee className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Your store</p>
                <h3 className="text-xl font-medium tracking-tight text-[#0c1222]">Match your Shopify numbers</h3>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              <SliderField
                label="Completed orders per month"
                hint="Paid orders on Shopify"
                value={inputs.monthlyOrders}
                min={50}
                max={5000}
                step={50}
                display={inputs.monthlyOrders.toLocaleString('en-IN')}
                onChange={(v) => set('monthlyOrders', v)}
              />
              <SliderField
                label="Average order value"
                hint="Typical cart size in ₹"
                value={inputs.aov}
                min={500}
                max={15000}
                step={100}
                display={formatInr(inputs.aov)}
                onChange={(v) => set('aov', v)}
              />
              <SliderField
                label="Checkout abandonment"
                hint="% who start checkout but do not pay"
                value={inputs.abandonRate}
                min={55}
                max={85}
                step={1}
                display={`${inputs.abandonRate}%`}
                onChange={(v) => set('abandonRate', v)}
              />
              <SliderField
                label="Current cart recovery"
                hint="% of abandoned GMV you recover today"
                value={inputs.currentRecoveryRate}
                min={0}
                max={20}
                step={1}
                display={`${inputs.currentRecoveryRate}%`}
                onChange={(v) => set('currentRecoveryRate', v)}
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-[#7C3AED] via-[#6d28d9] to-[#5b21b6] p-6 text-white shadow-[0_32px_80px_-20px_rgba(124,58,237,0.55)] md:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-violet-900/30 blur-3xl" aria-hidden />

            <div className="relative flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet-200" />
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200">
                Estimated uplift with TopEdge
              </p>
            </div>

            <motion.p
              key={result.incremental}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-4 text-4xl font-semibold tracking-tight md:text-5xl lg:text-[3.25rem]"
            >
              {formatInr(Math.round(result.incremental))}
              <span className="ml-1 text-xl font-medium text-violet-200 md:text-2xl">/mo</span>
            </motion.p>

            <p className="relative mt-3 max-w-md text-sm leading-relaxed text-violet-100/90">
              Additional recovered revenue vs. what you capture now — modeled at ~32% WhatsApp cart recovery on
              abandoned checkouts.
            </p>

            {result.roiMultiple >= 1 && (
              <div className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium text-white">
                <TrendingUp className="h-4 w-4" />
                {result.roiMultiple.toFixed(1)}× ROI on Growth ({formatInr(GROWTH_PLAN)}/mo)
              </div>
            )}

            <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
              <ResultStat label="Abandoned carts / mo" value={result.abandonedCarts.toLocaleString('en-IN')} />
              <ResultStat label="Abandoned GMV" value={formatInr(Math.round(result.abandonedValue))} />
              <ResultStat label="Annual uplift" value={formatInr(Math.round(result.annual))} highlight />
              <ResultStat
                label="vs Growth plan"
                value={result.roiMultiple > 0 ? `${result.roiMultiple.toFixed(1)}×` : '—'}
                highlight
              />
            </div>

            {result.paybackDays > 0 && result.paybackDays <= 31 && (
              <p className="relative mt-5 rounded-xl bg-emerald-500/20 px-4 py-2.5 text-sm text-emerald-100">
                Growth plan pays back in about <strong className="font-semibold text-white">{result.paybackDays} days</strong>{' '}
                at this recovery rate.
              </p>
            )}

            <div className="relative mt-auto flex flex-wrap gap-3 pt-8">
              <PrimaryButton to="/signup" className="!bg-white !text-[#5b21b6] hover:!bg-violet-50">
                Start free
              </PrimaryButton>
              {!compact && (
                <Link
                  to="/pricing"
                  className="inline-flex h-11 items-center rounded-full border border-white/25 px-7 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  See pricing
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      {!compact && (
        <p className="mt-8 text-center text-xs leading-relaxed text-slate-400">
          Model uses industry benchmarks for WhatsApp cart recovery. Actual results depend on catalog, COD mix, and
          template quality.{' '}
          <Link to="/contact" className="font-medium text-[#7C3AED] hover:underline">
            Get a custom forecast
          </Link>
          .
        </p>
      )}
    </div>
  );
}
