import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  BillingCycle,
  CatalogPlan,
  dispatchLabel,
  marketingSignupPath,
} from '../../lib/billingCatalog';
import PricingSectionHead from './PricingSectionHead';

type CellValue = { kind: 'text'; text: string } | { kind: 'bool'; on: boolean };

type CompareRow = {
  label: string;
  cells: CellValue[];
};

const ease = [0.22, 1, 0.36, 1] as const;

function Cell({ value }: { value: CellValue }) {
  if (value.kind === 'text') {
    return <span className="mkt-compare__text">{value.text}</span>;
  }
  return value.on ? (
    <span className="mkt-compare__icon mkt-compare__icon--yes" aria-label="Included">
      <Check size={16} strokeWidth={2.25} aria-hidden />
    </span>
  ) : (
    <span className="mkt-compare__icon mkt-compare__icon--no" aria-label="Not included">
      <X size={16} strokeWidth={2.25} aria-hidden />
    </span>
  );
}

function buildRows(plans: CatalogPlan[]): CompareRow[] {
  return [
    {
      label: 'Orders / month',
      cells: plans.map((p) => ({
        kind: 'text' as const,
        text: Number(p.ordersPerCycle).toLocaleString('en-IN'),
      })),
    },
    {
      label: 'Campaign + email sends / month',
      cells: plans.map((p) => ({
        kind: 'text' as const,
        text: Number(p.campaignEmailSendsPerCycle).toLocaleString('en-IN'),
      })),
    },
    {
      label: 'Journey Branch',
      cells: plans.map((p) => ({ kind: 'bool' as const, on: !!p.features.journeyBranch })),
    },
    {
      label: 'COD → prepaid',
      cells: plans.map((p) => ({ kind: 'bool' as const, on: !!p.features.journeyCodPrepaid })),
    },
    {
      label: 'Send priority',
      cells: plans.map((p) => ({
        kind: 'text' as const,
        text: dispatchLabel(p.features.dispatchPriority),
      })),
    },
  ];
}

export default function FeatureMatrix({
  plans,
  cycle = 'yearly',
}: {
  plans: CatalogPlan[];
  cycle?: BillingCycle;
}) {
  const reduceMotion = useReducedMotion();
  const rows = buildRows(plans);

  const rise = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.12 },
          transition: { duration: 0.5, delay, ease },
        };

  const rowMotion = (index: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.08 },
          transition: { duration: 0.42, delay: 0.06 + index * 0.045, ease },
        };

  return (
    <section className="mkt-compare" aria-labelledby="mkt-compare-title">
      <motion.div {...rise(0)}>
        <PricingSectionHead
          id="mkt-compare-title"
          eyebrow="Comparison"
          title="Compare"
          highlight="all plans"
          sub="Volume and journey powers change by tier, everything else stays on every plan."
        />
      </motion.div>

      <motion.div className="mkt-compare__card" {...rise(0.08)}>
        <div className="mkt-compare__scroll">
          <div className="mkt-compare__table" role="table" aria-label="Plan comparison">
            <div className="mkt-compare__row mkt-compare__row--head" role="row">
              <div className="mkt-compare__label" role="columnheader" aria-hidden />
              {plans.map((plan) => (
                <div
                  key={plan.slug}
                  className={`mkt-compare__col-head${plan.emphasis ? ' is-emphasis' : ''}`}
                  role="columnheader"
                >
                  {plan.displayName}
                </div>
              ))}
            </div>

            {rows.map((row, index) => (
              <motion.div
                key={row.label}
                className="mkt-compare__row"
                role="row"
                {...rowMotion(index)}
              >
                <div className="mkt-compare__label" role="rowheader">
                  {row.label}
                </div>
                {row.cells.map((cell, i) => (
                  <div
                    key={`${row.label}-${plans[i]?.slug}`}
                    className={`mkt-compare__cell${plans[i]?.emphasis ? ' is-emphasis' : ''}`}
                    role="cell"
                  >
                    <Cell value={cell} />
                  </div>
                ))}
              </motion.div>
            ))}

            <motion.div
              className="mkt-compare__row mkt-compare__row--foot"
              role="row"
              {...rowMotion(rows.length)}
            >
              <div className="mkt-compare__label" aria-hidden />
              {plans.map((plan) => {
                const signupTo = marketingSignupPath({ plan: plan.slug, cycle });
                return (
                  <div
                    key={`foot-${plan.slug}`}
                    className={`mkt-compare__foot-col${plan.emphasis ? ' is-emphasis' : ''}`}
                    role="cell"
                  >
                    {plan.emphasis ? (
                      <span className="mkt-compare__popular">Most popular</span>
                    ) : null}
                    <p className="mkt-compare__plan-name">{plan.displayName} Plan</p>
                    <Link
                      className={`mkt-compare__cta${plan.emphasis ? ' mkt-compare__cta--solid' : ''}`}
                      to={signupTo}
                    >
                      {`Choose ${plan.displayName}`}
                    </Link>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
