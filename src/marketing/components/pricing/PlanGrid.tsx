import { Check, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  CatalogPlan,
  SALES_MAILTO,
  BillingCycle,
  cycleNoun,
  dispatchLabel,
  marketingSignupPath,
  planBlurb,
  planPricing,
} from '../../lib/billingCatalog';
import PriceRoll from './PriceRoll';

function planLimits(plan: CatalogPlan) {
  const f = plan.features;
  return [
    {
      text: `${Number(plan.ordersPerCycle).toLocaleString('en-IN')} orders / cycle`,
      locked: false,
    },
    {
      text: `${Number(plan.campaignEmailSendsPerCycle).toLocaleString('en-IN')} campaign + email sends / cycle`,
      locked: false,
    },
    { text: 'Journey Branch', locked: !f.journeyBranch },
    { text: 'COD → prepaid', locked: !f.journeyCodPrepaid },
    { text: dispatchLabel(f.dispatchPriority), locked: false },
    { text: 'Meta Ads / Pixel audience push', locked: !f.metaAdsAudiencePush },
  ];
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
  return (
    <div className={`mkt-plans-wrap${compact ? ' mkt-plans-wrap--teaser' : ''}`}>
      <div className="mkt-plans">
        {plans.map((plan) => {
          const pricing = planPricing(plan, cycle);
          const limits = planLimits(plan);
          const emphasized = !!plan.emphasis;
          const slug = plan.slug;
          const className = `mkt-plan mkt-plan--${slug}${emphasized ? ' mkt-plan--emphasis' : ''}${
            compact ? ' mkt-plan--teaser' : ''
          }`;

          const hero = (
            <>
              {emphasized ? <span className="mkt-plan__badge">Most popular</span> : null}
              <div className="mkt-plan__hero">
                <span className="mkt-plan__grain" aria-hidden />
                <span className="mkt-plan__mesh" aria-hidden />
                <h3 className="mkt-plan__name">{plan.displayName}</h3>
                <p className="mkt-plan__starts">Starts at</p>
                <p className="mkt-plan__price">
                  <PriceRoll
                    value={pricing.effectiveMonthlyLabel}
                    suffix="/mo"
                    size="lg"
                    replayKey={`${slug}-${cycle}`}
                  />
                </p>
                <div className="mkt-plan__meta">
                  <p className="mkt-plan__billed">
                    billed{' '}
                    <PriceRoll value={pricing.billedLabel} suffix="" size="sm" replayKey={`${slug}-${cycle}`} />{' '}
                    / {cycleNoun(cycle)}
                  </p>
                  {pricing.showPerDay && pricing.perDayLabel ? (
                    <span className="mkt-plan__day">
                      <PriceRoll
                        value={pricing.perDayLabel}
                        suffix="/day"
                        size="xs"
                        replayKey={`${slug}-${cycle}`}
                      />
                    </span>
                  ) : null}
                </div>
                {pricing.saveLabel ? (
                  <p className="mkt-plan__save">
                    Save <PriceRoll value={pricing.saveLabel} suffix="" size="xs" replayKey={`${slug}-${cycle}`} />/
                    {cycle === 'yearly' ? 'year' : 'quarter'} vs monthly
                  </p>
                ) : (
                  <p className="mkt-plan__save mkt-plan__save--spacer" aria-hidden>
                    &nbsp;
                  </p>
                )}
                <p className="mkt-plan__blurb">{planBlurb(slug)}</p>
              </div>
            </>
          );

          if (compact) {
            return (
              <Link key={slug} to="/pricing" className={className}>
                {hero}
              </Link>
            );
          }

          return (
            <article key={slug} className={className}>
              {hero}
              <div className="mkt-plan__body">
                <p className="mkt-plan__kicker">Plan features</p>
                <ul className="mkt-plan__meters">
                  {limits.map((row) => (
                    <li key={row.text} className={row.locked ? 'is-locked' : undefined}>
                      {row.locked ? (
                        <Lock size={14} strokeWidth={2} aria-hidden />
                      ) : (
                        <Check size={14} strokeWidth={2} aria-hidden />
                      )}
                      <span>{row.text}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  className={`mkt-plan__cta${emphasized ? ' mkt-plan__cta--solid' : ' mkt-plan__cta--ghost'}`}
                  to={marketingSignupPath({ plan: slug, cycle })}
                >
                  Start free
                </Link>
                {slug === 'scale' ? (
                  <a className="mkt-plan__sales" href={SALES_MAILTO}>
                    Talk to sales
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
