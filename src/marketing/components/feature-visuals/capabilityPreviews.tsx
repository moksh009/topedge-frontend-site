import { Check, GitBranch, IndianRupee, Package, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import WhatsAppLogo from '../icons/WhatsAppLogo';

type CapProps = { variant: number; title: string; desc?: string };

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-xl bg-white p-3 ring-1 ring-violet-100/80', className)}>{children}</div>
  );
}

export function InboxCapPreview({ variant, title }: CapProps) {
  const msgs = [
    { who: 'Priya', in: 'COD to Pune?', out: 'Yes — 3–5 days delivery' },
    { who: 'Rahul', in: 'Track #TE-1042', out: 'Shipped · tracking sent' },
    { who: 'Ananya', in: 'Exchange size L?', out: 'Initiated · label shared' },
  ];
  const m = msgs[variant % 3];
  return (
    <Card>
      <div className="mb-2 flex items-center gap-2 border-b border-slate-100 pb-2">
        <WhatsAppLogo size={20} />
        <span className="text-[10px] font-bold text-slate-700">{title}</span>
      </div>
      <p className="text-[9px] font-bold text-slate-500">{m.who}</p>
      <p className="mt-1 rounded-lg bg-[#e7f8ef] px-2 py-1 text-[10px] text-slate-600">{m.in}</p>
      <p className="mt-1 ml-4 rounded-lg bg-white px-2 py-1 text-[10px] text-slate-600 ring-1 ring-slate-100">{m.out}</p>
      {variant % 2 === 0 && (
        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#faf5ff] px-2 py-0.5 text-[8px] font-bold text-[#7C3AED]">
          <Sparkles className="h-2.5 w-2.5" /> AI suggested
        </span>
      )}
    </Card>
  );
}

export function AiCapPreview({ variant, title }: CapProps) {
  const lines = [
    'Intent: purchase · confidence 94%',
    'KB match: return-policy.pdf',
    'Persona: friendly · Hinglish OK',
    'Training: 12 agent corrections',
    'Quality: 89% on-policy',
    'Report: PDF ready to export',
  ];
  return (
    <Card>
      <p className="text-[10px] font-bold text-[#7C3AED]">{title}</p>
      <p className="mt-2 text-[11px] text-slate-600">{lines[variant % lines.length]}</p>
      <div className="mt-2 flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              'h-1.5 flex-1 rounded-full',
              i <= variant % 3 ? 'bg-[#7C3AED]' : 'bg-slate-100'
            )}
          />
        ))}
      </div>
    </Card>
  );
}

export function FlowCapPreview({ variant, title }: CapProps) {
  const nodes = ['Trigger', 'Wait', 'Template', 'Branch'];
  return (
    <Card>
      <p className="text-[10px] font-bold text-slate-800">{title}</p>
      <div className="mt-2 flex flex-wrap items-center gap-1">
        {nodes.map((n, i) => (
          <span key={n} className="flex items-center gap-1">
            <span
              className={cn(
                'rounded px-1.5 py-0.5 text-[8px] font-bold',
                i <= (variant % 3) + 1 ? 'bg-[#7C3AED] text-white' : 'bg-slate-100 text-slate-400'
              )}
            >
              {n}
            </span>
            {i < nodes.length - 1 && <span className="text-violet-300">→</span>}
          </span>
        ))}
      </div>
      {variant >= 4 && <p className="mt-2 text-[9px] font-bold text-emerald-600">32% cart recovery · Meta-safe</p>}
    </Card>
  );
}

export function MetaCapPreview({ variant, title }: CapProps) {
  const status = ['Draft', 'In review', 'Approved', 'Approved', 'Live', 'Synced'][variant % 6];
  return (
    <Card>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold text-slate-800">{title}</span>
        <span
          className={cn(
            'rounded-full px-2 py-0.5 text-[8px] font-bold',
            status === 'Approved' || status === 'Live' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
          )}
        >
          {status}
        </span>
      </div>
      <div className="mt-2 rounded-lg bg-[#e7f8ef] p-2 text-[10px] text-slate-600">
        Hi {'{{name}}'}, complete your order on WhatsApp →
      </div>
    </Card>
  );
}

export function CampaignCapPreview({ variant, title }: CapProps) {
  const stats = [
    { a: '2.8k', b: '71%', c: '₹42k' },
    { a: '1.4k', b: '68%', c: '₹19k' },
    { a: '890', b: '74%', c: '₹9k' },
  ][variant % 3];
  return (
    <Card>
      <p className="mb-2 text-[10px] font-bold text-slate-800">{title}</p>
      <div className="grid grid-cols-3 gap-1.5 text-center">
        {[
          { l: 'Sent', v: stats.a },
          { l: 'Read', v: stats.b },
          { l: '₹', v: stats.c },
        ].map((s) => (
          <div key={s.l} className="rounded-lg bg-violet-50 py-1.5">
            <p className="text-xs font-black text-[#7C3AED]">{s.v}</p>
            <p className="text-[7px] text-slate-400">{s.l}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function CrmCapPreview({ variant, title }: CapProps) {
  const tags = ['VIP', 'Repeat 3×', 'At-risk', 'Cart open', 'Loyalty 420', 'Review 5★'];
  return (
    <Card>
      <p className="text-[10px] font-bold text-slate-800">{title}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {tags.slice(variant, variant + 3).map((t) => (
          <span key={t} className="rounded-full bg-violet-100 px-2 py-0.5 text-[8px] font-bold text-[#7C3AED]">
            {t}
          </span>
        ))}
      </div>
      <p className="mt-2 text-[9px] text-slate-500">12,400 Shopify profiles synced</p>
    </Card>
  );
}

export function OrdersCapPreview({ variant, title }: CapProps) {
  const rows = ['#TE-1042 · Shipped', '#TE-1041 · COD', '#TE-1039 · Delivered'];
  return (
    <Card>
      <p className="text-[10px] font-bold text-slate-800">{title}</p>
      <div className="mt-2 space-y-1">
        {rows.slice(0, (variant % 3) + 1).map((r) => (
          <div key={r} className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1 text-[10px]">
            <span className="font-semibold text-slate-700">{r}</span>
            <WhatsAppLogo size={14} />
          </div>
        ))}
      </div>
    </Card>
  );
}

export function AnalyticsCapPreview({ variant, title }: CapProps) {
  const metrics = ['₹2.1L recovered', '71% read rate', '4.2m avg reply', 'Bot 62% resolved', 'Campaign ROI', 'PDF exported'];
  return (
    <Card>
      <div className="flex items-center gap-2">
        <IndianRupee className="h-4 w-4 text-[#7C3AED]" />
        <p className="text-[10px] font-bold text-slate-800">{title}</p>
      </div>
      <p className="mt-2 text-lg font-black text-[#7C3AED]">{metrics[variant % metrics.length]}</p>
      <div className="mt-2 flex h-8 items-end gap-0.5">
        {[40, 65, 55, 80, 72, 90].map((h, i) => (
          <div
            key={i}
            className={cn('flex-1 rounded-t bg-gradient-to-t from-[#7C3AED] to-violet-300', i <= variant ? 'opacity-100' : 'opacity-25')}
            style={{ height: `${h * 0.28}px` }}
          />
        ))}
      </div>
    </Card>
  );
}

export function StoreCapPreview({ variant, title }: CapProps) {
  return (
    <Card>
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#95BF47]/25 text-xs font-black text-[#5E8E3E]">
          S
        </span>
        <div>
          <p className="text-[10px] font-bold text-slate-800">{title}</p>
          <p className="text-[9px] text-emerald-600">{variant % 2 === 0 ? 'Webhooks live' : 'Catalog + orders synced'}</p>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1 text-[9px] text-slate-500">
        <Zap className="h-3 w-3 text-emerald-500" />
        Real-time · Commerce Hub
      </div>
    </Card>
  );
}

export function RoutingCapPreview({ variant, title }: CapProps) {
  return (
    <Card>
      <p className="text-[10px] font-bold text-slate-800">{title}</p>
      <div className="mt-2 space-y-1">
        {['IF tag VIP', 'IF keyword refund', 'ELSE round-robin'].map((r, i) => (
          <div
            key={r}
            className={cn(
              'flex items-center gap-2 rounded-lg px-2 py-1 text-[10px]',
              i === variant % 3 ? 'bg-[#7C3AED] text-white' : 'bg-slate-50 text-slate-600'
            )}
          >
            <GitBranch className="h-3 w-3" />
            {r}
          </div>
        ))}
      </div>
    </Card>
  );
}

export function GenericCapPreview({ variant, title, desc }: CapProps) {
  return (
    <Card>
      <p className="text-[10px] font-bold text-[#7C3AED]">{title}</p>
      {desc && <p className="mt-1 text-[10px] leading-snug text-slate-500">{desc}</p>}
      <div className="mt-2 flex items-center gap-1">
        <Check className="h-3.5 w-3.5 text-emerald-500" />
        <span className="text-[9px] font-bold text-emerald-700">Active in workspace</span>
      </div>
    </Card>
  );
}
