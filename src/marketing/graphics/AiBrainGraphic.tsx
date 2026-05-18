import { Brain, FileText, MessageSquare, Shield } from 'lucide-react';
import { FloatCard, FlowConnectors, GlassPanel, GraphicCanvas, GraphicScene, SceneNode } from './shared';

const links = [
  { from: { x: 38, y: 50 }, to: { x: 48, y: 50 }, curved: true },
  { from: { x: 52, y: 50 }, to: { x: 62, y: 50 }, curved: true },
];

export default function AiBrainGraphic() {
  return (
    <GraphicCanvas variant="night">
      <GraphicScene>
        <FlowConnectors links={links} />

        <SceneNode x={28} y={50} width="34%">
          <GlassPanel>
            <p className="text-[10px] font-bold uppercase tracking-wider text-violet-200">Knowledge</p>
            <p className="mt-1 text-sm font-bold text-white">Train on your data</p>
            <div className="mt-4 space-y-2">
              {['return-policy.pdf', 'sizing-chart.pdf', 'catalog.csv'].map((f) => (
                <div key={f} className="flex items-center justify-between rounded-lg bg-white/10 px-2.5 py-2">
                  <span className="flex items-center gap-2 text-[11px] text-white/90">
                    <FileText className="h-3.5 w-3.5" /> {f}
                  </span>
                  <span className="text-[9px] font-bold text-emerald-300">OK</span>
                </div>
              ))}
            </div>
          </GlassPanel>
        </SceneNode>

        <SceneNode x={72} y={50} width="34%">
          <FloatCard>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-[#7C3AED]" />
              <p className="text-sm font-bold text-slate-900">Reply preview</p>
            </div>
            <div className="mt-3 rounded-xl bg-[#e7f8ef] px-3 py-2.5 text-[11px] leading-relaxed text-slate-700">
              Kurta M is ₹1,299 · COD available to Ahmedabad.
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-violet-50 px-2.5 py-2">
              <Shield className="h-3.5 w-3.5 text-[#7C3AED]" />
              <p className="text-[10px] font-semibold text-[#6d28d9]">On-policy · no wrong prices</p>
            </div>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
              <MessageSquare className="h-3 w-3" /> Concierge persona
            </div>
          </FloatCard>
        </SceneNode>
      </GraphicScene>
    </GraphicCanvas>
  );
}
