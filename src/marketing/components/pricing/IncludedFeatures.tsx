import { useMemo } from 'react';
import { Check } from 'lucide-react';
import PricingSectionHead from './PricingSectionHead';

const GROUPS = [
  {
    id: 'messaging',
    title: 'Messaging',
    match: [
      'live chat',
      'customer crm',
      'flow builder',
      'segments',
      'broadcast campaigns',
      'opt-in tools',
      'intent detection',
      'byok ai',
    ],
  },
  {
    id: 'commerce',
    title: 'Commerce',
    match: [
      'order management',
      'p&l analytics',
      'discount codes',
      'abandoned cart',
      'abandoned cart recovery',
      'abandoned cart (3-message)',
      'website pixel',
      'website pixel tracking',
      'stock tracking',
      'warranty assignment',
    ],
  },
  {
    id: 'meta',
    title: 'WhatsApp',
    match: [
      'meta templates',
      'whatsapp qr',
      'whatsapp qr codes',
      'all other journey action/control nodes',
      'gst invoices',
      'gst invoice billing',
    ],
  },
];

function norm(s: string) {
  return String(s || '')
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function displayLabel(raw: string) {
  const n = norm(raw);
  if (n.includes('abandoned cart')) return 'Cart recovery';
  if (n.includes('website pixel')) return 'Website pixel';
  if (n === 'whatsapp qr') return 'WhatsApp QR';
  if (n === 'gst invoices') return 'GST invoices';
  if (n === 'opt-in tools') return 'Opt-in tools';
  if (n === 'stock tracking') return 'Stock tracking';
  if (n === 'warranty assignment') return 'Warranty';
  if (n === 'meta templates') return 'Meta templates';
  if (n === 'live chat') return 'Live Chat';
  if (n === 'customer crm') return 'Audience CRM';
  if (n === 'flow builder') return 'Flow Builder';
  if (n === 'broadcast campaigns') return 'Campaigns';
  if (n === 'byok ai') return 'BYOK AI';
  if (n === 'intent detection') return 'Intent detection';
  if (n === 'order management') return 'Orders';
  if (n === 'p&l analytics') return 'P&L analytics';
  if (n === 'discount codes') return 'Discount codes';
  if (n.includes('journey')) return 'Journey nodes';
  return raw;
}

function groupItems(items: string[]) {
  const remaining = items.filter(Boolean);
  const used = new Set<string>();
  const groups = GROUPS.map((group) => {
    const list: string[] = [];
    for (const item of remaining) {
      const key = norm(item);
      if (used.has(key)) continue;
      const hit = group.match.some((m) => key === m || key.includes(m) || m.includes(key));
      if (hit) {
        used.add(key);
        list.push(displayLabel(item));
      }
    }
    return { id: group.id, title: group.title, list };
  }).filter((g) => g.list.length);

  const leftover = remaining.filter((item) => !used.has(norm(item))).map(displayLabel);
  if (leftover.length && groups.length) {
    groups[groups.length - 1].list.push(...leftover);
  } else if (leftover.length) {
    groups.push({ id: 'more', title: 'Also', list: leftover });
  }
  return groups;
}

/** Flat feature inventory, every plan. Quiet, dense, no card theater. */
export default function IncludedFeatures({ items }: { items: string[] }) {
  const groups = useMemo(() => groupItems(items || []), [items]);
  if (!groups.length) return null;

  return (
    <section className="mkt-included" aria-label="Included on every plan">
      <PricingSectionHead
        className="mkt-included__head"
        title="Included"
        highlight="on every plan"
        sub={
          <>
            Volume and a few journey powers change by tier.{' '}
            <span className="mkt-psec__keep">Everything below does not.</span>
          </>
        }
      />
      <div className="mkt-included__card">
        <div className="mkt-included__grid">
          {groups.map((group) => (
            <div key={group.id} className="mkt-included__col">
              <p className="mkt-included__col-title">{group.title}</p>
              <ul>
                {group.list.map((item) => (
                  <li key={item}>
                    <span className="mkt-included__mark" aria-hidden>
                      <Check size={11} strokeWidth={2.5} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
