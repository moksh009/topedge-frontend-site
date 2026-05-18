import { FileText, Sparkles } from 'lucide-react';
import MockupFrame from './shared/MockupFrame';
import DashboardMockupShell from './shared/DashboardMockupShell';

const tabs = ['Intent Engine', 'Knowledge Base', 'AI Persona', 'Training Inbox'];
const files = ['return-policy.pdf', 'sizing-chart.pdf', 'topedgeai.com/faq'];

export default function AiBrainMockup() {
  return (
    <MockupFrame>
      <DashboardMockupShell activeNav="intelligence" connector={false} heightClass="min-h-[420px]">
        <div className="flex gap-1 overflow-x-auto pb-3">
          {tabs.map((t, i) => (
            <span
              key={t}
              className={`whitespace-nowrap rounded-2xl px-3 py-1.5 text-[10px] font-bold ${
                i === 1 ? 'bg-[#ede9fe] text-[#7C3AED]' : 'bg-white/80 text-slate-500 ring-1 ring-slate-200/80'
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        <p className="text-sm font-bold text-slate-900">Knowledge Base</p>
        <p className="mt-0.5 text-xs text-slate-500">Train AI on your catalog, policies, and FAQs</p>
        <div className="mt-4 space-y-2">
          {files.map((f) => (
            <div
              key={f}
              className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white/95 px-3 py-2.5 shadow-sm"
            >
              <span className="flex items-center gap-2 text-xs text-slate-700">
                <FileText className="h-3.5 w-3.5 text-[#7C3AED]" />
                {f}
              </span>
              <span className="text-[10px] font-bold text-emerald-600">Indexed</span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-3xl border border-violet-200/80 bg-[#faf5ff]/90 p-4">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#7C3AED]">
            <Sparkles className="h-3.5 w-3.5" />
            Persona · Concierge
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Friendly · Hindi/English mix · Escalate refund disputes to human
          </p>
        </div>
      </DashboardMockupShell>
    </MockupFrame>
  );
}
