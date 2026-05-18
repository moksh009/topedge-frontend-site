import { TrendingUp, IndianRupee, Package } from 'lucide-react';
import MockupFrame from './shared/MockupFrame';
import DashboardMockupShell from './shared/DashboardMockupShell';

const stats = [
  { label: 'Revenue (7d)', value: '₹8.4L', icon: IndianRupee },
  { label: 'Orders', value: '1,284', icon: Package },
  { label: 'Cart recovery', value: '32%', icon: TrendingUp },
];

export default function StoreEngineMockup() {
  return (
    <MockupFrame>
      <DashboardMockupShell
        activeNav="commerce"
        connector={false}
        header={
          <div>
            <p className="text-sm font-bold text-slate-900">Store Engine</p>
            <p className="text-[10px] text-slate-500">Commerce Hub · Shopify sync live</p>
          </div>
        }
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-3xl border border-slate-200/90 bg-white/95 p-4 shadow-sm backdrop-blur-sm"
            >
              <s.icon className="h-4 w-4 text-[#7C3AED]" />
              <p className="mt-2 text-[10px] font-semibold text-slate-500">{s.label}</p>
              <p className="text-xl font-black text-slate-900">{s.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-3xl border border-slate-200/90 bg-white/95 p-4">
          <p className="text-[10px] font-bold uppercase text-slate-500">Top SKU · RTO risk</p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800">Cotton Kurta Blue</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              Low RTO
            </span>
          </div>
        </div>
      </DashboardMockupShell>
    </MockupFrame>
  );
}
