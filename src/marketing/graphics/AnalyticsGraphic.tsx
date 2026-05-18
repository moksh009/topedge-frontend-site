import { BarChart3, TrendingUp } from 'lucide-react';
import { FloatCard, FlowConnectors, GraphicCanvas, GraphicScene, SceneNode } from './shared';

const links = [
  { from: { x: 32, y: 42 }, to: { x: 50, y: 42 } },
  { from: { x: 68, y: 42 }, to: { x: 50, y: 42 } },
  { from: { x: 50, y: 48 }, to: { x: 50, y: 58 } },
  { from: { x: 50, y: 64 }, to: { x: 50, y: 74 } },
];

export default function AnalyticsGraphic() {
  return (
    <GraphicCanvas variant="night">
      <GraphicScene>
        <FlowConnectors links={links} />

        <SceneNode x={28} y={40} width="32%">
          <FloatCard>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Revenue</p>
            <p className="mt-1 text-2xl font-black text-slate-900">+24%</p>
            <div className="mt-3 flex h-14 items-end gap-1">
              {[40, 62, 48, 78, 55, 90, 72].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-[#6d28d9] to-violet-400" style={{ height: `${h}%` }} />
              ))}
            </div>
          </FloatCard>
        </SceneNode>

        <SceneNode x={72} y={40} width="32%">
          <FloatCard>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Campaigns</p>
            <p className="mt-1 text-2xl font-black text-slate-900">71%</p>
            <p className="text-xs text-slate-500">avg. read rate</p>
          </FloatCard>
        </SceneNode>

        <SceneNode x={50} y={58} width="36%">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/40 bg-white/20">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
        </SceneNode>

        <SceneNode x={50} y={78} width="55%">
          <FloatCard>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <p className="text-sm font-bold text-slate-900">₹ attributed to WhatsApp</p>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">Cart recovery + campaigns · last 30 days</p>
          </FloatCard>
        </SceneNode>
      </GraphicScene>
    </GraphicCanvas>
  );
}
