import { Clock, GitBranch, Send } from 'lucide-react';
import { GraphicCanvas, FloatCard, GlassNode } from './shared';

export default function SequencesGraphic() {
  return (
    <GraphicCanvas variant="plum">
      <div className="relative flex min-h-[280px] flex-col items-center justify-center gap-3 px-4">
        {[
          { label: 'Broadcast sent', done: true },
          { label: 'Wait 48h', active: true },
          { label: 'Follow-up template', done: false },
        ].map((step, i) => (
          <FloatCard
            key={step.label}
            className={`flex w-full max-w-sm items-center gap-3 py-3 ${i === 1 ? 'ring-2 ring-violet-300' : ''}`}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                step.done ? 'bg-emerald-500 text-white' : step.active ? 'bg-[#7C3AED] text-white' : 'bg-slate-100 text-slate-400'
              }`}
            >
              {step.done ? '✓' : i + 1}
            </span>
            <span className="text-sm font-semibold text-slate-800">{step.label}</span>
            {step.active && <Clock className="ml-auto h-4 w-4 text-[#7C3AED]" />}
          </FloatCard>
        ))}
        <GlassNode icon={GitBranch} label="Reply branch" />
      </div>
    </GraphicCanvas>
  );
}
