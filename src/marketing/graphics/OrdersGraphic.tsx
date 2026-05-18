import { MessageCircle, Package } from 'lucide-react';
import { GraphicCanvas, FloatCard, GlassNode } from './shared';

export default function OrdersGraphic() {
  return (
    <GraphicCanvas>
      <div className="relative flex min-h-[280px] items-center justify-center gap-5">
        <FloatCard className="w-full max-w-xs md:-rotate-1">
          <p className="text-[10px] font-bold text-[#7C3AED]">#TE-1042</p>
          <p className="mt-1 text-sm font-bold text-slate-900">Cotton Kurta · ₹1,299</p>
          <p className="mt-1 text-[10px] font-semibold text-amber-700">COD · Pending</p>
        </FloatCard>
        <GlassNode icon={Package} label="Commerce Hub" />
        <FloatCard className="hidden max-w-[160px] md:block md:rotate-2">
          <button type="button" className="inline-flex w-full items-center justify-center gap-1 rounded-xl bg-[#7C3AED] py-2 text-[10px] font-bold text-white">
            <MessageCircle className="h-3.5 w-3.5" />
            Open WhatsApp
          </button>
        </FloatCard>
      </div>
    </GraphicCanvas>
  );
}
