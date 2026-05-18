import { Package } from 'lucide-react';
import { GraphicCanvas, FloatCard, GlassNode } from './shared';

export default function OrderAutomationGraphic() {
  const steps = ['Order paid', 'Shipped', 'Delivered'];
  return (
    <GraphicCanvas variant="dawn">
      <div className="relative flex min-h-[280px] flex-col items-center justify-center gap-3">
        {steps.map((step, i) => (
          <div key={step} className="flex flex-col items-center">
            <FloatCard className="flex min-w-[200px] items-center gap-3 py-3">
              <Package className="h-4 w-4 text-[#7C3AED]" />
              <span className="text-xs font-bold text-slate-800">{step}</span>
              <span className="ml-auto text-[10px] text-slate-400">WhatsApp →</span>
            </FloatCard>
            {i < steps.length - 1 && <div className="h-6 w-px bg-white/40" />}
          </div>
        ))}
        <GlassNode icon={Package} label="Auto notify" className="absolute right-6 top-1/2 hidden -translate-y-1/2 md:flex" />
      </div>
    </GraphicCanvas>
  );
}
