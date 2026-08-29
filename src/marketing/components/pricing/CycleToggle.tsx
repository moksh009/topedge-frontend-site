import { BillingCycle } from '../../lib/billingCatalog';

const CYCLES: { id: BillingCycle; label: string }[] = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'yearly', label: 'Yearly' },
];

export default function CycleToggle({
  value,
  onChange,
}: {
  value: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
}) {
  return (
    <div className="mkt-cycle-wrap">
      <div className="mkt-cycle" role="tablist" aria-label="Billing cycle">
        {CYCLES.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={value === c.id}
            className={`mkt-cycle__btn${value === c.id ? ' is-on' : ''}`}
            onClick={() => onChange(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <span className="mkt-cycle__save">Save vs monthly on yearly</span>
    </div>
  );
}
