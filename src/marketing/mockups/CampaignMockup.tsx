import { Send, Users } from 'lucide-react';
import MockupFrame from './shared/MockupFrame';
import DashboardMockupShell from './shared/DashboardMockupShell';
import { StatusBadge } from '../components/ui';

export default function CampaignMockup() {
  return (
    <MockupFrame>
      <DashboardMockupShell
        activeNav="campaigns"
        connector={false}
        header={
          <>
            <div>
              <p className="text-sm font-bold text-slate-900">New broadcast</p>
              <p className="text-[10px] text-slate-500">Marketing Hub · Campaigns</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6d28d9] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-500/25"
            >
              <Send className="h-3.5 w-3.5" />
              Send broadcast
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div className="rounded-3xl border border-violet-200/80 bg-[#faf5ff]/90 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#7C3AED]">
              <Users className="h-3.5 w-3.5" />
              Audience segment
            </div>
            <p className="mt-2 text-sm font-bold text-slate-900">Bought in last 30 days</p>
            <p className="text-xs text-slate-500">2,847 contacts · Opt-in verified</p>
          </div>
          <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-slate-900">Abandoned cart — urgency</p>
              <StatusBadge tone="emerald">Approved</StatusBadge>
            </div>
            <p className="mt-1 text-xs text-slate-500">Meta template · 3 variables filled</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: 'Delivered', v: '98%' },
              { l: 'Read', v: '71%' },
              { l: 'Replies', v: '12%' },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white/90 py-2.5 text-center ring-1 ring-slate-200/80">
                <p className="text-base font-black text-[#7C3AED]">{s.v}</p>
                <p className="text-[9px] font-medium text-slate-500">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </DashboardMockupShell>
    </MockupFrame>
  );
}
