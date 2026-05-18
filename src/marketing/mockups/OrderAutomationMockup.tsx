import { Package } from 'lucide-react';
import MockupFrame from './shared/MockupFrame';
import DashboardMockupShell from './shared/DashboardMockupShell';

const rules = [
  { event: 'Order paid', template: 'Order confirmed', delay: 'Instant' },
  { event: 'Order shipped', template: 'Shipped update + tracking', delay: '+0 min' },
  { event: 'Delivered', template: 'Review request', delay: '+2 days' },
];

export default function OrderAutomationMockup() {
  return (
    <MockupFrame>
      <DashboardMockupShell
        activeNav="orders"
        connector={false}
        header={
          <div>
            <p className="text-sm font-bold text-slate-900">Order messages & rules</p>
            <p className="text-[10px] text-slate-500">Shopify automation center</p>
          </div>
        }
      >
        <div className="space-y-2.5">
          {rules.map((r) => (
            <div
              key={r.event}
              className="flex flex-wrap items-center gap-2 rounded-3xl border border-slate-200/90 bg-white/95 p-3 shadow-sm backdrop-blur-sm sm:flex-nowrap"
            >
              <span className="inline-flex items-center gap-1 rounded-xl bg-[#ede9fe] px-2.5 py-1 text-[10px] font-bold text-[#7C3AED]">
                <Package className="h-3 w-3" />
                {r.event}
              </span>
              <span className="hidden text-slate-300 sm:inline">→</span>
              <span className="flex-1 text-xs font-semibold text-slate-800">{r.template}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                {r.delay}
              </span>
            </div>
          ))}
        </div>
      </DashboardMockupShell>
    </MockupFrame>
  );
}
