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
 *
 * `iconOnly` reduces each badge to its brand mark plus the bare number — no
 * star row, no "on Trustpilot"/"Product Hunt" wordmark — so the pair always
 * reads as one short line instead of two chips stacking.
 */
export default function ProofBadges({
  compact = false,
  plain = false,
  iconOnly = false,
  className,
}: {
  compact?: boolean;
  plain?: boolean;
  iconOnly?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        'mkt-proof-row',
        plain ? 'mkt-proof-row--plain' : '',
        iconOnly ? 'mkt-proof-row--icons' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <TrustpilotScore compact={compact} iconOnly={iconOnly} />
      <span className="mkt-proof-row__sep" aria-hidden />
      <ProductHuntBadge compact={compact} iconOnly={iconOnly} />
    </div>
  );
}
