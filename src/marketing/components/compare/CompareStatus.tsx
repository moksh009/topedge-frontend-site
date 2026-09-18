import { Check, Minus, X } from 'lucide-react';
import type { CompareCell } from '../../data/compareCompetitors';

export type CellTone = 'yes' | 'no' | 'partial' | 'text';

export function parseCompareCell(value: CompareCell): { tone: CellTone; text: string | null } {
  if (value === 'yes') return { tone: 'yes', text: null };
  if (value === 'no') return { tone: 'no', text: null };
  if (value === 'partial') return { tone: 'partial', text: 'Partial' };

  const v = String(value);
  const lower = v.toLowerCase();

  if (
    /not found|requires (manual|external|api|astra)|manual (contact|developer)|external crm|trigger-capped/i.test(
      v,
    )
  ) {
    return { tone: 'no', text: v };
  }

  if (
    /^0%|native|built-in|unlimited|1-click|byok|shopify-native|yes —|unlocked on all|automated warranty|billing direct/i.test(
      lower,
    ) ||
    lower.includes('native algorithmic') ||
    (/\b(supported|included|marketed|documented)\b/i.test(v) && !/add-on|requires|higher/i.test(v))
  ) {
    return { tone: 'yes', text: v };
  }

  if (
    /capped|platform usage|rule \/ keyword|standard |add-on|higher tier|verify live|conversation meters|credit \/|single-number|keyword/i.test(
      lower,
    )
  ) {
    return { tone: 'partial', text: v };
  }

  return { tone: 'text', text: v };
}

/** Cashify-style cell: green check / red x / dash + optional light text. */
export default function CompareStatus({ value }: { value: CompareCell }) {
  const { tone, text } = parseCompareCell(value);
  const rich = Boolean(text);

  if (!rich) {
    if (tone === 'yes') {
      return (
        <span className="mkt-cmp__status is-yes" title="Yes">
          <Check strokeWidth={2.5} aria-hidden />
          <span className="sr-only">Yes</span>
        </span>
      );
    }
    if (tone === 'no') {
      return (
        <span className="mkt-cmp__status is-no" title="No">
          <X strokeWidth={2.5} aria-hidden />
          <span className="sr-only">No</span>
        </span>
      );
    }
    return <span className="mkt-cmp__status is-partial">Partial</span>;
  }

  return (
    <span className={`mkt-cmp__status is-rich is-${tone}`}>
      {tone === 'yes' ? (
        <Check
          className="mkt-cmp__status-mark"
          strokeWidth={2.5}
          aria-hidden
          color="#059669"
        />
      ) : null}
      {tone === 'no' ? (
        <X className="mkt-cmp__status-mark" strokeWidth={2.5} aria-hidden color="#e11d48" />
      ) : null}
      {tone === 'partial' ? (
        <Minus className="mkt-cmp__status-mark" strokeWidth={2.5} aria-hidden color="#94a3b8" />
      ) : null}
      <span className="mkt-cmp__status-label">{text}</span>
    </span>
  );
}
