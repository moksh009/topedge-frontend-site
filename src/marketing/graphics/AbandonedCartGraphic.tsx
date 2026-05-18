import { IndianRupee, ShoppingCart } from 'lucide-react';
import { FloatCard, FlowConnectors, GraphicCanvas, GraphicScene, SceneNode } from './shared';

const links = [
  { from: { x: 50, y: 32 }, to: { x: 50, y: 42 } },
  { from: { x: 50, y: 48 }, to: { x: 50, y: 58 } },
  { from: { x: 50, y: 64 }, to: { x: 50, y: 74 } },
];

export default function AbandonedCartGraphic() {
  return (
    <GraphicCanvas variant="dawn">
      <GraphicScene className="min-h-[400px] md:min-h-[460px]">
        <FlowConnectors links={links} />

        <SceneNode x={50} y={22} width="42%">
          <FloatCard>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <ShoppingCart className="h-4 w-4 text-[#7C3AED]" /> Shopify · abandoned
            </div>
            <div className="mt-3 flex gap-3">
              <div className="h-14 w-12 shrink-0 rounded-xl bg-gradient-to-br from-violet-200 to-violet-100" />
              <div>
                <p className="text-sm font-bold text-slate-900">Kurta · Blue · M</p>
                <p className="mt-1 flex items-center text-xl font-black text-[#7C3AED]">
                  <IndianRupee className="h-4 w-4" />1,299
                </p>
                <span className="mt-1 inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-800">COD</span>
              </div>
            </div>
          </FloatCard>
        </SceneNode>

        <SceneNode x={50} y={68} width="48%">
          <FloatCard>
            <p className="text-center text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              WhatsApp recovery rhythm
            </p>
            <div className="mt-3 space-y-2">
              {[
                { t: '15 min', m: 'Hi Priya — your cart is waiting.' },
                { t: '2 hours', m: 'COMEBACK10 — 10% off today' },
                { t: '24 hours', m: 'Last chance · checkout link' },
              ].map((n) => (
                <div key={n.t} className="rounded-2xl rounded-tl-md bg-[#e7f8ef] px-3 py-2">
                  <p className="text-[9px] font-bold uppercase text-emerald-700">{n.t}</p>
                  <p className="text-[11px] text-slate-700">{n.m}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-xs font-bold text-[#7C3AED]">32% avg. recovery</p>
          </FloatCard>
        </SceneNode>
      </GraphicScene>
    </GraphicCanvas>
  );
}
