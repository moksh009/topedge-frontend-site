import { Check, Megaphone, Sparkles } from 'lucide-react';
import { ConnectorHub, FloatCard, FlowConnectors, GraphicCanvas, GraphicScene, SceneNode } from './shared';

const links = [
  { from: { x: 30, y: 54 }, to: { x: 44, y: 54 } },
  { from: { x: 56, y: 54 }, to: { x: 70, y: 54 } },
];

export default function MetaManagerGraphic() {
  return (
    <GraphicCanvas variant="violet">
      <GraphicScene>
        <FlowConnectors links={links} />

        <SceneNode x={50} y={16} width="72%">
          <div className="flex flex-wrap justify-center gap-2">
            {['1 · Pick template', '2 · AI draft', '3 · You approve'].map((s) => (
              <span key={s} className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[9px] font-bold text-white">
                {s}
              </span>
            ))}
          </div>
        </SceneNode>

        <SceneNode x={22} y={56} width="28%">
          <FloatCard>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Library</p>
            <p className="mt-2 text-sm font-bold text-slate-900">Order confirmed</p>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              <Check className="h-3 w-3" /> Approved by Meta
            </span>
          </FloatCard>
        </SceneNode>

        <SceneNode x={50} y={56}>
          <ConnectorHub icon={Sparkles} label="AI drafts copy" />
        </SceneNode>

        <SceneNode x={78} y={56} width="28%">
          <FloatCard>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Your review</p>
            <p className="mt-2 text-sm font-bold text-slate-900">Abandoned cart · urgency</p>
            <button
              type="button"
              className="mt-3 w-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6d28d9] py-2.5 text-[10px] font-bold text-white shadow-lg shadow-violet-500/20"
            >
              Send to Meta
            </button>
            <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-slate-500">
              <Megaphone className="h-3 w-3" /> Nothing sends without you
            </p>
          </FloatCard>
        </SceneNode>
      </GraphicScene>
    </GraphicCanvas>
  );
}
