import { Bot, Package, User } from 'lucide-react';
import { FloatCard, FlowConnectors, GraphicCanvas, GraphicScene, SceneNode } from './shared';

const links = [
  { from: { x: 42, y: 52 }, to: { x: 58, y: 52 } },
  { from: { x: 72, y: 52 }, to: { x: 84, y: 52 } },
];

export default function LiveChatGraphic() {
  return (
    <GraphicCanvas variant="aurora">
      <GraphicScene>
        <FlowConnectors links={links} />

        <SceneNode x={50} y={52} width="92%">
          <FloatCard className="!p-0 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-violet-50 to-white px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7C3AED] text-white">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Priya Sharma</p>
                  <p className="text-[10px] text-slate-500">WhatsApp · assigned to you</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[9px] font-bold text-emerald-800">Live</span>
            </div>

            <div className="grid md:grid-cols-[1.2fr_auto_0.75fr]">
              <div className="space-y-2.5 p-4">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#e7f8ef] px-3.5 py-2.5 text-[12px] leading-relaxed text-slate-700">
                  Size M available? COD to Ahmedabad?
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-white px-3.5 py-2.5 text-[12px] text-slate-700 ring-1 ring-slate-200">
                  Yes — M in stock. Shall I reserve for you?
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-dashed border-violet-200 bg-violet-50/90 px-3 py-2">
                  <Bot className="h-4 w-4 text-[#7C3AED]" />
                  <p className="text-[11px] font-semibold text-[#6d28d9]">AI draft ready · tap to send</p>
                </div>
              </div>

              <div className="hidden items-center justify-center px-2 md:flex">
                <Package className="h-5 w-5 text-violet-300" />
              </div>

              <div className="border-t border-slate-100 bg-slate-50/50 p-4 md:border-l md:border-t-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED]">Shopify order</p>
                <p className="mt-2 text-sm font-bold text-slate-900">#TE-1042 · Cotton Kurta</p>
                <p className="mt-1 text-2xl font-black text-slate-900">₹1,299</p>
                <div className="mt-3 flex gap-1.5">
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-900">COD</span>
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[9px] font-bold text-slate-700">Pending</span>
                </div>
                <p className="mt-3 text-[10px] text-slate-500">LTV ₹12,400 · 6 orders</p>
              </div>
            </div>
          </FloatCard>
        </SceneNode>
      </GraphicScene>
    </GraphicCanvas>
  );
}
