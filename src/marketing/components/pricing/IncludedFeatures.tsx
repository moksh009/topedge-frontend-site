import { Check } from 'lucide-react';

export default function IncludedFeatures({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="mkt-included">
      <p className="mkt-included__title">On every plan</p>
      <p className="mkt-included__sub">Customer profiles are unlimited.</p>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Check size={14} strokeWidth={2.2} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
