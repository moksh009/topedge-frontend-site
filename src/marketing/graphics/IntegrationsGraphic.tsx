import { Check, MessageCircle } from 'lucide-react';
import { GraphicCanvas, FloatCard, GlassNode } from './shared';

export default function IntegrationsGraphic() {
  const apps = [
    { name: 'Shopify', ok: true },
    { name: 'WhatsApp', ok: true },
    { name: 'Email', ok: true },
  ];
  return (
    <GraphicCanvas>
      <div className="relative flex min-h-[260px] flex-wrap items-center justify-center gap-4">
        {apps.map((a) => (
          <FloatCard key={a.name} className="flex min-w-[120px] items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-900">{a.name}</span>
            {a.ok && <Check className="h-4 w-4 text-emerald-500" />}
          </FloatCard>
        ))}
        <GlassNode icon={MessageCircle} label="Connect once" className="w-full justify-center md:absolute md:right-10 md:top-1/2 md:-translate-y-1/2 md:w-auto" />
      </div>
    </GraphicCanvas>
  );
}
