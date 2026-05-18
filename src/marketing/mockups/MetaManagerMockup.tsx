import { Sparkles, Check } from 'lucide-react';
import MockupFrame from './shared/MockupFrame';
import DashboardMockupShell from './shared/DashboardMockupShell';
import { StatusBadge } from '../components/ui';

const templates = [
  { name: 'Order confirmed', status: 'Approved', tone: 'emerald' as const },
  { name: 'Abandoned cart — gentle', status: 'Approved', tone: 'emerald' as const },
  { name: 'COD order confirmation', status: 'Meta reviewing', tone: 'amber' as const },
  { name: 'Review request', status: 'Draft', tone: 'slate' as const },
];

export default function MetaManagerMockup() {
  return (
    <MockupFrame>
      <DashboardMockupShell
        activeNav="meta-manager"
        connector={false}
        header={
          <>
            <div>
              <p className="text-sm font-bold text-slate-900">Meta Manager</p>
              <p className="text-[10px] text-slate-500">Library · Create & send · Approved</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6d28d9] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-500/25"
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI Studio
            </button>
          </>
        }
      >
        <div className="mb-4 grid grid-cols-3 gap-2">
          {['1. Pick', '2. Send to Meta', '3. Use in store'].map((s, i) => (
            <div
              key={s}
              className={`rounded-2xl px-2 py-2 text-center text-[10px] font-bold ${i === 0 ? 'bg-[#ede9fe] text-[#7C3AED]' : 'bg-white/80 text-slate-500 ring-1 ring-slate-200/80'}`}
            >
              {s}
            </div>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {templates.map((t) => (
            <div
              key={t.name}
              className="rounded-3xl border border-slate-200/90 bg-white/95 p-3 shadow-sm backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-bold text-slate-900">{t.name}</p>
                <StatusBadge tone={t.tone}>{t.status}</StatusBadge>
              </div>
              <button
                type="button"
                className="mt-2.5 flex w-full items-center justify-center gap-1 rounded-2xl border border-violet-200 bg-[#faf5ff] py-2 text-[10px] font-bold text-[#7C3AED]"
              >
                {t.status === 'Approved' ? (
                  <>
                    <Check className="h-3 w-3" /> Use in flows
                  </>
                ) : (
                  'Set up'
                )}
              </button>
            </div>
          ))}
        </div>
      </DashboardMockupShell>
    </MockupFrame>
  );
}
