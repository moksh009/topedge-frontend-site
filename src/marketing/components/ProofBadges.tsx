import { TrustpilotScore } from './TrustpilotProof';
import { ProductHuntBadge } from './ProductHuntProof';
import './../styles/proof.css';

/**
 * Trustpilot and Product Hunt in one strip.
 *
 * Two separate pills drifted apart wherever the container was wide, and read
 * as two unrelated widgets; one pill with a hairline between them reads as
 * "here is where people have reviewed us". On a narrow screen it stacks
 * rather than wrapping into four ragged rows.
 *
 * `plain` drops the pill chrome for places that already have a surface of
 * their own, such as the footer column and the convert prompt.
 */
export default function ProofBadges({
  compact = false,
  plain = false,
  className,
}: {
  compact?: boolean;
  plain?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        'mkt-proof-row',
        plain ? 'mkt-proof-row--plain' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <TrustpilotScore compact={compact} />
      <span className="mkt-proof-row__sep" aria-hidden />
      <ProductHuntBadge compact={compact} />
    </div>
  );
}
