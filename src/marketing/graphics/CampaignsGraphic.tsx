import { BarChart2, Calendar, Send, Users } from 'lucide-react';
import { FloatCard, FlowConnectors, GraphicCanvas, GraphicScene, SceneNode } from './shared';

const links = [
  { from: { x: 28, y: 38 }, to: { x: 50, y: 48 } },
  { from: { x: 50, y: 62 }, to: { x: 72, y: 72 }, curved: true },
];

export default function CampaignsGraphic() {
  return (
    <GraphicCanvas variant="plum">
      <GraphicScene>
        <FlowConnectors links={links} />

        <SceneNode x={50} y={52} width="88%">
          <FloatCard className="!p-0 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 bg-violet-50/80 px-4 py-2.5">
              <p className="text-xs font-bold text-slate-900">New broadcast</p>
              <span className="rounded-full bg-[#7C3AED] px-2 py-0.5 text-[9px] font-bold text-white">Meta-safe</span>
            </div>

            <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
              <div className="border-b border-slate-100 p-4 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#7C3AED]">
                  <Users className="h-3.5 w-3.5" /> Segment
                </div>
                <p className="mt-2 text-sm font-bold text-slate-900">Last 30-day buyers</p>
                <p className="text-xs text-slate-500">2,847 contacts · VIP + COD</p>
              </div>

              <div className="p-4">
                <p className="text-[10px] font-bold uppercase text-slate-400">Message preview</p>
                <div className="mt-2 rounded-xl bg-[#e7f8ef] px-3 py-2.5 text-[11px] text-slate-700">
                  Festive sale — 15% off ends tonight. Shop now →
                </div>
                <div className="mt-3 flex gap-2">
                  <button type="button" className="flex flex-1 items-center justify-center gap-1 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6d28d9] py-2 text-[10px] font-bold text-white">
                    <Send className="h-3 w-3" /> Schedule
                  </button>
                  <span className="flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-2 text-[10px] font-semibold text-slate-600">
                    <Calendar className="h-3 w-3" /> Fri 7pm
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2">
              <p className="flex items-center gap-1 text-[10px] font-bold text-slate-600">
                <BarChart2 className="h-3.5 w-3.5 text-[#7C3AED]" /> 71% read rate projected
              </p>
            </div>
          </FloatCard>
        </SceneNode>
      </GraphicScene>
    </GraphicCanvas>
  );
}
