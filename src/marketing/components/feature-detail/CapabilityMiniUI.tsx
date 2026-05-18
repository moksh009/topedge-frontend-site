import { cn } from '@/lib/utils';
import type { FeaturePageMeta } from '../../data/featurePageMeta';

type Theme = FeaturePageMeta['visualTheme'];

export default function CapabilityMiniUI({
  theme,
  variant = 0,
  className,
}: {
  theme: Theme;
  variant?: number;
  className?: string;
}) {
  const v = variant % 3;

  return (
    <div
      className={cn(
        'feature-cap-mini relative overflow-hidden rounded-2xl border border-violet-100/80 bg-gradient-to-br from-white to-violet-50/40 p-3',
        className
      )}
      aria-hidden
    >
      {theme === 'inbox' && <InboxMini v={v} />}
      {theme === 'ai' && <AiMini v={v} />}
      {theme === 'flow' && <FlowMini v={v} />}
      {theme === 'meta' && <MetaMini v={v} />}
      {theme === 'campaign' && <CampaignMini v={v} />}
      {theme === 'crm' && <CrmMini v={v} />}
      {theme === 'store' && <StoreMini v={v} />}
      {theme === 'orders' && <OrdersMini v={v} />}
    </div>
  );
}

function InboxMini({ v }: { v: number }) {
  return (
    <div className="space-y-1.5">
      <div className="h-2 w-16 rounded-full bg-violet-200" />
      <div
        className={cn(
          'rounded-xl px-2 py-1.5 text-[9px]',
          v === 0 ? 'ml-0 max-w-[85%] bg-[#e7f8ef] text-slate-600' : 'ml-auto max-w-[80%] bg-white text-slate-600 ring-1 ring-slate-100'
        )}
      >
        {v === 0 ? 'COD to Mumbai?' : 'Order #TE-1042 · ₹1,299'}
      </div>
      {v !== 2 && (
        <div className="inline-flex rounded-full bg-[#faf5ff] px-2 py-0.5 text-[8px] font-bold text-[#7C3AED]">
          AI suggested
        </div>
      )}
    </div>
  );
}

function AiMini({ v }: { v: number }) {
  const labels = ['Intent: high', 'KB: 24 docs', 'Persona: friendly'];
  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {labels.map((l, i) => (
          <span
            key={l}
            className={cn(
              'rounded-full px-2 py-0.5 text-[8px] font-bold',
              i === v ? 'bg-[#7C3AED] text-white' : 'bg-white text-slate-500 ring-1 ring-slate-200'
            )}
          >
            {l}
          </span>
        ))}
      </div>
      <p className="text-[9px] leading-snug text-slate-500">On-policy reply · catalog synced</p>
    </div>
  );
}

function FlowMini({ v }: { v: number }) {
  const nodes = ['Trigger', 'Wait', 'Send'];
  return (
    <div className="flex items-center gap-1">
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center gap-1">
          <span
            className={cn(
              'rounded-lg px-2 py-1 text-[8px] font-bold',
              i <= v ? 'bg-[#7C3AED] text-white' : 'bg-slate-100 text-slate-400'
            )}
          >
            {n}
          </span>
          {i < nodes.length - 1 && <span className="text-[8px] text-violet-300">→</span>}
        </div>
      ))}
    </div>
  );
}

function MetaMini({ v }: { v: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[9px]">
        <span className="font-bold text-slate-700">Cart recovery</span>
        <span className={cn('rounded-full px-1.5 py-0.5 font-bold', v === 0 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700')}>
          {v === 0 ? 'Review' : 'Approved'}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-100">
        <div className="h-full w-2/3 rounded-full bg-[#7C3AED]" />
      </div>
    </div>
  );
}

function CampaignMini({ v }: { v: number }) {
  return (
    <div className="grid grid-cols-3 gap-1 text-center">
      {[
        { l: 'Sent', n: '2.8k' },
        { l: 'Read', n: v === 1 ? '78%' : '71%' },
        { l: '₹', n: '42k' },
      ].map((s) => (
        <div key={s.l} className="rounded-lg bg-white py-1 ring-1 ring-slate-100">
          <p className="text-[10px] font-black text-[#7C3AED]">{s.n}</p>
          <p className="text-[7px] text-slate-400">{s.l}</p>
        </div>
      ))}
    </div>
  );
}

function CrmMini({ v }: { v: number }) {
  const tags = ['VIP', 'Repeat', 'At-risk'];
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((t, i) => (
        <span
          key={t}
          className={cn(
            'rounded-full px-2 py-0.5 text-[8px] font-bold',
            i === v ? 'bg-violet-100 text-[#7C3AED]' : 'bg-white text-slate-500 ring-1 ring-slate-200'
          )}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function StoreMini({ v }: { v: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#95BF47]/20 text-[10px] font-black text-[#5E8E3E]">
        S
      </div>
      <div>
        <p className="text-[9px] font-bold text-slate-800">mybrand.myshopify.com</p>
        <p className="text-[8px] text-emerald-600">{v === 0 ? 'Syncing…' : 'Live · webhooks on'}</p>
      </div>
    </div>
  );
}

function OrdersMini({ v }: { v: number }) {
  const statuses = ['COD', 'Paid', 'Shipped'];
  return (
    <div className="flex items-center justify-between rounded-xl bg-white px-2 py-1.5 ring-1 ring-slate-100">
      <span className="text-[9px] font-bold text-slate-800">#TE-1042</span>
      <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[8px] font-bold text-[#7C3AED]">
        {statuses[v]}
      </span>
    </div>
  );
}
