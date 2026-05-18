import { ArrowRight, Sparkles } from 'lucide-react';
import ShopifyLogo from '../components/icons/ShopifyLogo';
import WhatsAppLogo from '../components/icons/WhatsAppLogo';
import { FloatCard, FlowConnectors, GlassPanel, GraphicCanvas, GraphicScene, SceneNode } from './shared';

const links = [
  { from: { x: 22, y: 28 }, to: { x: 42, y: 28 }, curved: true },
  { from: { x: 58, y: 28 }, to: { x: 78, y: 28 }, curved: true },
  { from: { x: 50, y: 36 }, to: { x: 50, y: 48 } },
];

export default function HeroGraphic() {
  return (
    <GraphicCanvas variant="night">
      <GraphicScene className="min-h-[380px] md:min-h-[440px]">
        <FlowConnectors links={links} />

        <SceneNode x={18} y={26} width="26%">
          <FloatCard className="!p-3">
            <div className="flex items-center gap-2">
              <ShopifyLogo size={20} />
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Shopify</p>
            </div>
            <p className="mt-2 text-xl font-black text-slate-900 md:text-2xl">₹8.4L</p>
            <p className="text-[10px] font-semibold text-emerald-600">+18% · 7 days</p>
          </FloatCard>
        </SceneNode>

        <SceneNode x={50} y={24} width="22%">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] shadow-[0_16px_40px_-8px_rgba(37,211,102,0.6)] md:h-16 md:w-16">
              <WhatsAppLogo size={36} />
            </div>
            <p className="text-center text-[10px] font-bold text-white">WhatsApp API</p>
          </div>
        </SceneNode>

        <SceneNode x={82} y={26} width="26%">
          <GlassPanel className="!bg-white/95 !p-3 text-right">
            <p className="text-[9px] font-bold uppercase tracking-wider text-violet-200">TopEdge</p>
            <p className="mt-1 text-sm font-bold text-white">12 modules live</p>
            <p className="text-[10px] text-violet-200">Flows · Inbox · Campaigns</p>
          </GlassPanel>
        </SceneNode>

        <SceneNode x={50} y={58} width="88%">
          <FloatCard className="!p-0 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
              <p className="text-xs font-bold text-slate-800">Unified workspace</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-[9px] font-bold text-[#7C3AED]">
                <Sparkles className="h-3 w-3" /> AI + team
              </span>
            </div>
            <div className="grid md:grid-cols-[1fr_1.1fr_0.9fr]">
              <div className="border-b border-slate-100 p-3 md:border-b-0 md:border-r">
                <p className="text-[10px] font-bold text-slate-400">INBOX</p>
                <p className="mt-2 text-sm font-bold text-slate-900">Priya · COD question</p>
                <p className="mt-1 line-clamp-2 text-[11px] text-slate-500">Size M for Ahmedabad?</p>
              </div>
              <div className="border-b border-slate-100 p-3 md:border-b-0 md:border-r">
                <p className="text-[10px] font-bold text-slate-400">FLOW</p>
                <p className="mt-2 text-sm font-bold text-slate-900">Cart recovery</p>
                <p className="mt-1 text-[11px] text-emerald-600">Live · 32% recovery</p>
              </div>
              <div className="p-3">
                <p className="text-[10px] font-bold text-slate-400">ORDER</p>
                <p className="mt-2 text-sm font-bold text-slate-900">#TE-1042</p>
                <p className="mt-1 text-lg font-black text-[#7C3AED]">₹1,299</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 border-t border-slate-100 py-2 text-[10px] font-semibold text-[#7C3AED]">
              Open workspace <ArrowRight className="h-3 w-3" />
            </div>
          </FloatCard>
        </SceneNode>
      </GraphicScene>
    </GraphicCanvas>
  );
}
