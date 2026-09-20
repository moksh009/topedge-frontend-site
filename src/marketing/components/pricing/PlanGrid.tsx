import { Check, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CatalogPlan,
  BillingCycle,
  TRIAL,
  dispatchLabel,
  marketingSignupPath,
  planBlurb,
  planFeatureKicker,
  planPricing,
} from '../../lib/billingCatalog';
import PriceRoll from './PriceRoll';

function planLimits(plan: CatalogPlan) {
  const f = plan.features;
  return [
    {
      text: `${Number(plan.ordersPerCycle).toLocaleString('en-IN')} orders / month`,
      locked: false,
    },
    {
      text: `${Number(plan.campaignEmailSendsPerCycle).toLocaleString('en-IN')} campaign + email sends / month`,
      locked: false,
    },
    { text: 'Journey Branch', locked: !f.journeyBranch },
    { text: 'COD → prepaid', locked: !f.journeyCodPrepaid },
    { text: dispatchLabel(f.dispatchPriority), locked: false },
  ];
}

function PerDayBadge({ label, replayKey }: { label?: string | null; replayKey: string }) {
  if (!label) return null;
  const amount = String(label)
    .replace(/^\s*~/, '')
    .replace(/\s*\/\s*day\s*$/i, '')
    .trim();
  if (!amount) return null;
  return (
    <span className="mkt-plan__day">
      <PriceRoll value={`~${amount}`} size="xs" replayKey={replayKey} />
      <span className="mkt-plan__day-suffix">/day</span>
    </span>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

function PlanFeatures({
  kicker,
  items,
}: {
  kicker: string;
  items: { text: string; locked: boolean }[];
}) {
  return (
    <div className="mkt-plan__features">
      <p className="mkt-plan__kicker">{kicker}</p>
      <ul className="mkt-plan__meters">
        {items.map((row) => (
          <li key={row.text} className={row.locked ? 'is-locked' : undefined}>
            <span className="mkt-plan__mark" aria-hidden>
              {row.locked ? (
                <Lock size={11} strokeWidth={2.25} />
              ) : (
                <Check size={11} strokeWidth={2.5} />
              )}
            </span>
            <span>{row.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TrialCard({ delay = 0, compact = false }: { delay?: number; compact?: boolean }) {
  const reduceMotion = useReducedMotion();
  const signupTo = marketingSignupPath();
  const trialLimits = [
    { text: `${TRIAL.days} days free`, locked: false },
    { text: `${TRIAL.orders} orders`, locked: false },
    { text: `${TRIAL.sends} campaign + email sends`, locked: false },
    { text: 'No card on this site', locked: false },
    { text: 'Pay later in dashboard', locked: false },
  ];

  const panel = (
    <div className="mkt-plan__panel">
      <div className="mkt-plan__title-row">
        <h3 className="mkt-plan__name">Free trial</h3>
        <span className="mkt-plan__badge mkt-plan__badge--trial">No card here</span>
      </div>
      <div className="mkt-plan__price-row">
        <p className="mkt-plan__price">
          <PriceRoll value="₹0" suffix="" size="lg" replayKey="trial" />
        </p>
        <span className="mkt-plan__period">{TRIAL.days} days</span>
      </div>
      <p className="mkt-plan__blurb">{planBlurb('trial')}</p>
      {!compact ? (
        <Link className="mkt-plan__cta mkt-plan__cta--ghost" to={signupTo}>
          Start free trial
        </Link>
      ) : null}
    </div>
  );

  if (compact) {
    return (
      <Link to="/pricing" className="mkt-plan mkt-plan--trial mkt-plan--teaser">
        <div className="mkt-plan__shell">{panel}</div>
      </Link>
    );
  }

  return (
    <motion.article
      className="mkt-plan mkt-plan--trial"
      aria-label="Free trial"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, delay: reduceMotion ? 0 : delay, ease }}
    >
      <div className="mkt-plan__shell">
        {panel}
        <PlanFeatures kicker={planFeatureKicker('trial')} items={trialLimits} />
      </div>
    </motion.article>
  );
}

function PlanCard({
  plan,
  cycle,
  delay,
  compact,
}: {
  plan: CatalogPlan;
  cycle: BillingCycle;
  delay: number;
  compact: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const pricing = planPricing(plan, cycle);
  const limits = planLimits(plan);
  const emphasized = !!plan.emphasis;
  const slug = plan.slug;
  const signupTo = marketingSignupPath({ plan: slug, cycle });
  const className = `mkt-plan mkt-plan--${slug}${emphasized ? ' mkt-plan--emphasis' : ''}${
    compact ? ' mkt-plan--teaser' : ''
  }`;

  const panel = (
    <div className="mkt-plan__panel">
      <div className="mkt-plan__title-row">
        <h3 className="mkt-plan__name">{plan.displayName} Plan</h3>
        {emphasized ? <span className="mkt-plan__badge">Most popular</span> : null}
      </div>
      <div className="mkt-plan__price-row">
        <p className="mkt-plan__price">
          <PriceRoll
            value={pricing.effectiveMonthlyLabel}
            suffix=""
            size="lg"
            replayKey={`${slug}-${cycle}`}
          />
        </p>
        <span className="mkt-plan__period">per month</span>
      </div>
      {pricing.showPerDay || cycle === 'monthly' ? (
        <PerDayBadge label={pricing.perDayLabel} replayKey={`${slug}-${cycle}-day`} />
      ) : null}
      <p className="mkt-plan__blurb">{planBlurb(slug)}</p>
      {!compact ? (
        <Link
          className={`mkt-plan__cta${emphasized ? ' mkt-plan__cta--solid' : ' mkt-plan__cta--ghost'}`}
          to={signupTo}
        >
          {`Choose ${plan.displayName}`}
        </Link>
      ) : null}
    </div>
  );

  if (compact) {
    return (
      <Link to="/pricing" className={className}>
        <div className="mkt-plan__shell">{panel}</div>
      </Link>
    );
  }

  return (
    <motion.article
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, delay, ease }}
    >
      <div className="mkt-plan__shell">
        {panel}
        <PlanFeatures kicker={planFeatureKicker(slug)} items={limits} />
      </div>
    </motion.article>
  );
}

export default function PlanGrid({
  plans,
  cycle,
  compact = false,
}: {
  plans: CatalogPlan[];
  cycle: BillingCycle;
  compact?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`mkt-plans-wrap${compact ? ' mkt-plans-wrap--teaser' : ''}`}>
      <div className={`mkt-plans${compact ? '' : ' mkt-plans--with-trial'}`}>
        {!compact ? <TrialCard delay={0} /> : null}

        {plans.map((plan, index) => (
          <PlanCard
            key={plan.slug}
            plan={plan}
            cycle={cycle}
            compact={compact}
            delay={reduceMotion ? 0 : (compact ? index : index + 1) * 0.06}
          />
        ))}
      </div>
    </div>
  );
}
