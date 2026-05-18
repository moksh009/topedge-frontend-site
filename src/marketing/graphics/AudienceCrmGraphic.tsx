import { Users, Heart } from 'lucide-react';
import { GraphicCanvas, FloatCard, GlassNode } from './shared';

export default function AudienceCrmGraphic() {
  return (
    <GraphicCanvas variant="dawn">
      <div className="relative flex min-h-[280px] flex-wrap items-center justify-center gap-6 md:gap-10">
        <FloatCard className="max-w-[200px] md:-rotate-2">
          <p className="text-[10px] font-bold uppercase text-[#7C3AED]">Segment</p>
          <p className="mt-2 text-sm font-bold text-slate-900">Cart abandoners</p>
          <p className="text-xs text-slate-500">412 contacts · 7d</p>
        </FloatCard>
        <GlassNode icon={Users} label="Audience hub" />
        <FloatCard className="max-w-[200px] md:rotate-1">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-500">
            <Heart className="h-3 w-3 text-rose-500" /> Loyalty
          </p>
          <p className="mt-2 text-sm font-bold text-slate-900">VIP repeat buyers</p>
          <p className="text-xs font-semibold text-emerald-600">+28% LTV</p>
        </FloatCard>
      </div>
    </GraphicCanvas>
  );
}
