import { ArrowRight, Clock, GitBranch, MessageCircle } from 'lucide-react';
import MockupFrame from './shared/MockupFrame';
import DashboardMockupShell from './shared/DashboardMockupShell';

const steps = [
  { label: 'Broadcast sent', time: 'Day 0', status: 'done' as const },
  { label: 'Wait 48h · no reply', time: 'Day 2', status: 'active' as const },
  { label: 'Follow-up template', time: 'Day 2', status: 'next' as const },
  { label: 'Stop on purchase', time: 'Exit', status: 'next' as const },
];

export default function SequencesMockup() {
  return (
    <MockupFrame>
      <DashboardMockupShell activeNav="campaigns" connector={false}>
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-bold text-slate-900">Post-broadcast sequence</p>
            <p className="text-[10px] text-slate-500">Marketing Hub · Sequences</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-[9px] font-bold text-[#7C3AED]">
            <GitBranch className="h-3 w-3" />
            4 steps
          </span>
        </div>
        <div className="mt-4 space-y-2">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-stretch gap-2">
              <div className="flex w-8 shrink-0 flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${
                    step.status === 'done'
                      ? 'bg-emerald-500 text-white'
                      : step.status === 'active'
                        ? 'bg-[#7C3AED] text-white ring-4 ring-violet-100'
                        : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {step.status === 'done' ? '✓' : i + 1}
                </div>
                {i < steps.length - 1 && <div className="mt-1 w-0.5 flex-1 bg-violet-200" />}
              </div>
              <div
                className={`mb-1 flex-1 rounded-2xl border p-3 ${
                  step.status === 'active'
                    ? 'border-violet-300 bg-[#faf5ff] shadow-md ring-2 ring-violet-100'
                    : 'border-slate-200/90 bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-slate-900">{step.label}</p>
                  <span className="text-[9px] font-medium text-slate-400">{step.time}</span>
                </div>
                {step.status === 'active' && (
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500">
                    <Clock className="h-3 w-3 text-[#7C3AED]" />
                    Meta template · approved
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-2xl border border-emerald-200/80 bg-emerald-50/80 px-3 py-2">
          <p className="text-[10px] font-semibold text-emerald-800">Branch: replied yes → assign agent</p>
          <ArrowRight className="h-3.5 w-3.5 text-emerald-600" />
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-[10px] text-slate-500">
          <MessageCircle className="h-3 w-3 text-[#7C3AED]" />
          Pauses when Shopify order #TE-1042 is paid
        </div>
      </DashboardMockupShell>
    </MockupFrame>
  );
}
