import { Check, Minus } from 'lucide-react';
import { CatalogPlan, dispatchLabel } from '../../lib/billingCatalog';

function yesNo(on: boolean) {
  return on ? (
    <span className="mkt-matrix__yes">
      <Check size={14} strokeWidth={2.4} aria-hidden />
      Yes
    </span>
  ) : (
    <span className="mkt-matrix__no">
      <Minus size={14} strokeWidth={2.4} aria-hidden />
      No
    </span>
  );
}

export default function FeatureMatrix({ plans }: { plans: CatalogPlan[] }) {
  const rows = [
    {
      label: 'Orders / cycle',
      values: plans.map((p) => Number(p.ordersPerCycle).toLocaleString('en-IN')),
    },
    {
      label: 'Campaign + email sends / cycle',
      values: plans.map((p) => Number(p.campaignEmailSendsPerCycle).toLocaleString('en-IN')),
    },
    {
      label: 'Journey Branch',
      values: plans.map((p) => p.features.journeyBranch),
      kind: 'bool' as const,
    },
    {
      label: 'COD → prepaid',
      values: plans.map((p) => p.features.journeyCodPrepaid),
      kind: 'bool' as const,
    },
    {
      label: 'Send priority',
      values: plans.map((p) => dispatchLabel(p.features.dispatchPriority)),
    },
    {
      label: 'Meta Ads audience',
      values: plans.map((p) => p.features.metaAdsAudiencePush),
      kind: 'bool' as const,
    },
  ];

  const differ = rows.filter((row) => {
    const serialized = row.values.map((v) => String(v));
    return new Set(serialized).size > 1;
  });

  return (
    <div className="mkt-matrix-wrap">
      <p className="mkt-matrix__note">Everything else is on every plan.</p>
      <div className="mkt-matrix-scroll">
        <table className="mkt-matrix">
          <thead>
            <tr>
              <th>What changes</th>
              {plans.map((p) => (
                <th key={p.slug}>{p.displayName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {differ.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.values.map((v, i) => (
                  <td key={`${row.label}-${plans[i]?.slug}`}>
                    {row.kind === 'bool' ? yesNo(Boolean(v)) : v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
