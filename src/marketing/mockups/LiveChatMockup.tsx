import { Bot, Pause, Sparkles } from 'lucide-react';
import MockupFrame from './shared/MockupFrame';
import DashboardMockupShell from './shared/DashboardMockupShell';

export default function LiveChatMockup() {
  return (
    <MockupFrame>
      <DashboardMockupShell activeNav="live-chat" connector={false} heightClass="min-h-[440px] md:min-h-[480px]">
        <div className="flex h-full min-h-[360px] gap-3">
          <div className="hidden w-[38%] shrink-0 flex-col rounded-3xl border border-slate-200/90 bg-white/95 shadow-sm md:flex">
            <p className="border-b border-slate-100 px-3 py-2 text-[10px] font-bold text-slate-500">Threads</p>
            <div className="space-y-1 p-2">
              {['Priya Sharma', 'Rahul Mehta', 'Ananya K.'].map((name, i) => (
                <div
                  key={name}
                  className={`rounded-2xl px-3 py-2 text-xs ${i === 0 ? 'bg-[#ede9fe] font-semibold text-[#7C3AED]' : 'text-slate-600'}`}
                >
                  {name}
                  {i === 0 && <span className="ml-1 rounded-full bg-[#7C3AED] px-1.5 text-[9px] text-white">2</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col rounded-3xl border border-slate-200/90 bg-white/95 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
              <div>
                <p className="text-sm font-bold text-slate-900">Priya Sharma</p>
                <p className="text-[10px] text-slate-500">+91 98•• ••• 42</p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-xl bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-800"
              >
                <Pause className="h-3 w-3" />
                Bot paused
              </button>
            </div>
            <div className="flex-1 space-y-2 overflow-hidden bg-slate-50/50 p-3">
              <div className="max-w-[90%] rounded-3xl rounded-tl-sm bg-[#e7f8ef] px-3 py-2 text-[11px] text-slate-700">
                Is the blue kurta available in M? COD to Ahmedabad?
              </div>
              <div className="ml-auto max-w-[90%] rounded-3xl rounded-tr-sm bg-white px-3 py-2 text-[11px] text-slate-700 shadow-sm ring-1 ring-slate-100">
                Yes Priya — M in stock. COD available. Shall I reserve?
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-[#faf5ff] px-2.5 py-1 text-[9px] font-bold text-[#7C3AED]">
                <Sparkles className="h-3 w-3" />
                AI suggested · High intent
              </div>
            </div>
          </div>

          <div className="hidden w-[28%] shrink-0 flex-col rounded-3xl border border-violet-200/60 bg-[#faf5ff]/80 p-3 lg:flex">
            <p className="text-[10px] font-bold uppercase text-[#7C3AED]">Order #TE-1042</p>
            <div className="mt-2 rounded-2xl bg-white p-2.5 ring-1 ring-violet-100">
              <p className="text-xs font-bold text-slate-900">Cotton Kurta Blue</p>
              <p className="text-sm font-black text-[#7C3AED]">₹1,299</p>
              <p className="mt-1 text-[10px] font-semibold text-amber-700">COD · Pending</p>
            </div>
            <div className="mt-auto flex items-center gap-1 text-[10px] text-slate-500">
              <Bot className="h-3 w-3" />
              AI + human handoff
            </div>
          </div>
        </div>
      </DashboardMockupShell>
    </MockupFrame>
  );
}
