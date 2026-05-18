import { BarChart3, Bot, IndianRupee, TrendingUp } from 'lucide-react';
import MockupFrame from './shared/MockupFrame';
import DashboardMockupShell from './shared/DashboardMockupShell';

const bars = [42, 68, 55, 82, 74, 91, 88];

export default function AnalyticsMockup() {
  return (
    <MockupFrame>
      <DashboardMockupShell
        activeNav="dashboard"
        connector={false}
        header={
          <div>
            <p className="text-sm font-bold text-slate-900">Insights Hub</p>
            <p className="text-[10px] text-slate-500">Revenue · campaigns · agents</p>
          </div>
        }
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: 'Recovered ₹', value: '₹2.1L', icon: IndianRupee },
            { label: 'Cart recovery', value: '32%', icon: TrendingUp },
            { label: 'Bot resolved', value: '64%', icon: Bot },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-3xl border border-slate-200/90 bg-white/95 p-3 shadow-sm"
            >
              <s.icon className="h-4 w-4 text-[#7C3AED]" />
              <p className="mt-1 text-[9px] font-semibold text-slate-500">{s.label}</p>
              <p className="text-lg font-black text-slate-900">{s.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-3xl border border-violet-200/60 bg-[#faf5ff]/80 p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase text-[#7C3AED]">WhatsApp revenue (7d)</p>
            <BarChart3 className="h-4 w-4 text-[#7C3AED]" />
          </div>
          <div className="mt-4 flex h-24 items-end justify-between gap-1.5">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-lg bg-gradient-to-t from-[#7C3AED] to-violet-300"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <p className="mt-2 text-center text-[10px] text-slate-500">Campaign + cart recovery attributed</p>
        </div>
      </DashboardMockupShell>
    </MockupFrame>
  );
}
