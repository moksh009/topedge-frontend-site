import { Check, FileText, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StatusRow({ label, status = 'ok' }: { label: string; status?: 'ok' | 'pending' }) {
  return (
    <div className="flex items-center justify-between gap-2 text-[11px]">
      <span className="text-slate-700">{label}</span>
      <span
        className={cn(
          'rounded-full px-2 py-0.5 text-[9px] font-bold',
          status === 'ok' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
        )}
      >
        {status === 'ok' ? '✓' : '…'}
      </span>
    </div>
  );
}

export function FileRow({ name, indexed }: { name: string; indexed?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-2.5 py-2">
      <span className="flex items-center gap-2 text-[11px] text-slate-700">
        <FileText className="h-3.5 w-3.5 text-violet-400" />
        {name}
      </span>
      {indexed && (
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">Indexed</span>
      )}
    </div>
  );
}

export function ChatBubble({
  side,
  text,
  badge,
}: {
  side: 'customer' | 'ai';
  text: string;
  badge?: string;
}) {
  const isCustomer = side === 'customer';
  return (
    <div className={cn('max-w-[92%]', isCustomer ? '' : 'ml-auto')}>
      <div
        className={cn(
          'rounded-2xl px-3 py-2 text-[11px] leading-snug',
          isCustomer ? 'bg-slate-100 text-slate-700' : 'bg-[#e7f8ef] text-slate-700'
        )}
      >
        {text}
      </div>
      {badge && (
        <span className="mt-1 inline-flex rounded-full bg-[#faf5ff] px-2 py-0.5 text-[8px] font-bold text-[#7C3AED]">
          {badge}
        </span>
      )}
    </div>
  );
}

export function PillButton({ label, primary }: { label: string; primary?: boolean }) {
  return (
    <span
      className={cn(
        'rounded-full px-3 py-1 text-[10px] font-bold',
        primary ? 'bg-[#7C3AED] text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'
      )}
    >
      {label}
    </span>
  );
}

export function FormField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 rounded-lg bg-violet-50/80 px-2.5 py-1.5 text-[11px] font-medium text-slate-800">{value}</p>
    </div>
  );
}

export function FlowNodes({ nodes, active = 0 }: { nodes: string[]; active?: number }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center gap-1.5">
          <span
            className={cn(
              'rounded-lg px-2.5 py-1.5 text-[10px] font-bold',
              i <= active ? 'bg-[#7C3AED] text-white shadow-md shadow-violet-500/30' : 'bg-slate-100 text-slate-400'
            )}
          >
            {n}
          </span>
          {i < nodes.length - 1 && <span className="text-violet-300">→</span>}
        </div>
      ))}
    </div>
  );
}

export function LiveBadge() {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      <span className="text-sm font-bold text-emerald-700">Flow live on WhatsApp</span>
    </div>
  );
}

export function MetricCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-violet-50/80 py-2 ring-1 ring-violet-100/80">
      <p className="text-sm font-black text-[#7C3AED]">{value}</p>
      <p className="text-[9px] text-slate-500">{label}</p>
    </div>
  );
}

export function TemplateRow({ name, approved }: { name: string; approved?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-2 text-[11px]">
      <span className="font-medium text-slate-700">{name}</span>
      <span
        className={cn(
          'rounded-full px-2 py-0.5 text-[9px] font-bold',
          approved ? 'bg-emerald-50 text-emerald-700' : 'bg-white text-slate-500 ring-1 ring-slate-200'
        )}
      >
        {approved ? 'Approved' : 'Library'}
      </span>
    </div>
  );
}

export function ModuleChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[10px] font-bold text-[#7C3AED]">
      {label}
    </span>
  );
}

export function TagChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className={cn(
        'rounded-full px-3 py-1 text-[10px] font-bold',
        active ? 'bg-[#7C3AED] text-white' : 'bg-white text-slate-500 ring-1 ring-slate-200'
      )}
    >
      {label}
    </span>
  );
}

export function ShopifyMark() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#95BF47]/25 text-xs font-black text-[#5E8E3E]">
      S
    </span>
  );
}

export function OrderMini({ id, amount, status }: { id: string; amount: string; status: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-violet-100 bg-violet-50/50 px-3 py-2">
      <PackageIcon />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold text-slate-800">#{id}</p>
        <p className="text-[10px] text-slate-500">
          {amount} · {status}
        </p>
      </div>
    </div>
  );
}

function PackageIcon() {
  return (
    <svg className="h-8 w-8 shrink-0 text-violet-400" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="6" y="10" width="20" height="14" rx="3" fill="currentColor" opacity="0.2" />
      <path d="M6 14l10 6 10-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function SequenceSteps({ steps }: { steps: string[] }) {
  return (
    <div className="space-y-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-start gap-2">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-[9px] font-bold text-white">
            {i + 1}
          </span>
          <p className="text-[11px] text-slate-600">{s}</p>
        </div>
      ))}
    </div>
  );
}

export function WebhookRow({ topic }: { topic: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-2 text-[11px]">
      <code className="text-violet-700">{topic}</code>
      <Zap className="h-3.5 w-3.5 text-emerald-500" />
    </div>
  );
}

export function OrderRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-2 text-[11px]">
      <span className="font-medium text-slate-700">{label}</span>
      <Check className="h-3.5 w-3.5 text-emerald-500" />
    </div>
  );
}

export function ActionRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-violet-50 px-2.5 py-2 text-[11px] font-semibold text-[#7C3AED]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
      {label}
    </div>
  );
}

export function MapRow({ label }: { label: string }) {
  const parts = label.split(' → ');
  return (
    <div className="flex items-center justify-between gap-2 text-[11px]">
      <span className="text-slate-600">{parts[0]}</span>
      <span className="text-violet-300">→</span>
      <span className="font-bold text-[#7C3AED]">{parts[1] ?? ''}</span>
    </div>
  );
}


export function RuleRow({ label, on }: { label: string; on?: boolean }) {
  return (
    <div className="flex items-center justify-between text-[11px]">
      <span className="text-slate-700">{label}</span>
      <span
        className={cn(
          'rounded-full px-2 py-0.5 text-[9px] font-bold',
          on ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'
        )}
      >
        {on ? 'ON' : 'OFF'}
      </span>
    </div>
  );
}

export function TimelineRhythm({ items }: { items: string[] }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={item} className="flex items-center gap-2">
          <span className="w-12 shrink-0 text-[10px] font-bold text-[#7C3AED]">
            {['15m', '2h', '24h'][i] ?? `${i + 1}`}
          </span>
          <span className="flex-1 rounded-lg bg-slate-50 px-2 py-1.5 text-[11px] text-slate-700">{item}</span>
        </div>
      ))}
    </div>
  );
}

export function EventChip({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold text-slate-600 ring-1 ring-slate-200">
      {label}
    </span>
  );
}

export function ProductCard({
  name,
  price,
  cod,
}: {
  name: string;
  price: string;
  cod?: boolean;
}) {
  return (
    <div className="flex gap-3 rounded-xl bg-slate-50 p-2.5 ring-1 ring-slate-100">
      <div className="h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br from-violet-200 to-violet-100" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-bold text-slate-800">{name}</p>
        <p className="text-sm font-black text-[#7C3AED]">{price}</p>
        {cod && (
          <span className="mt-0.5 inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-[8px] font-bold text-amber-800">
            COD checkout
          </span>
        )}
      </div>
    </div>
  );
}
