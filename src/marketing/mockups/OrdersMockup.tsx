import { MessageCircle, Package, Search } from 'lucide-react';
import MockupFrame from './shared/MockupFrame';
import DashboardMockupShell from './shared/DashboardMockupShell';

const rows = [
  { id: '#TE-1042', name: 'Priya S.', total: '₹1,299', status: 'COD', mood: 'amber' as const },
  { id: '#TE-1041', name: 'Rahul M.', total: '₹2,450', status: 'Paid', mood: 'emerald' as const },
  { id: '#TE-1040', name: 'Ananya K.', total: '₹899', status: 'Shipped', mood: 'violet' as const },
];

const moodClass: Record<string, string> = {
  amber: 'bg-amber-50 text-amber-800',
  emerald: 'bg-emerald-50 text-emerald-800',
  violet: 'bg-violet-50 text-[#7C3AED]',
};

export default function OrdersMockup() {
  return (
    <MockupFrame>
      <DashboardMockupShell activeNav="commerce" connector={false}>
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-bold text-slate-900">Orders</p>
            <p className="text-[10px] text-slate-500">Synced from Shopify · live</p>
          </div>
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-[10px] text-slate-500">
            <Search className="h-3 w-3" />
            Search
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {rows.map((row, i) => (
            <div
              key={row.id}
              className={`flex items-center gap-3 rounded-2xl border bg-white p-3 ${
                i === 0 ? 'border-violet-300 ring-2 ring-violet-100 shadow-md' : 'border-slate-200/90'
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50">
                <Package className="h-4 w-4 text-[#7C3AED]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900">{row.id}</p>
                <p className="text-[10px] text-slate-500">{row.name}</p>
              </div>
              <p className="text-sm font-black text-slate-900">{row.total}</p>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${moodClass[row.mood]}`}>
                {row.status}
              </span>
              {i === 0 && (
                <button
                  type="button"
                  className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-[#7C3AED] px-2 py-1 text-[9px] font-bold text-white"
                >
                  <MessageCircle className="h-3 w-3" />
                  Chat
                </button>
              )}
            </div>
          ))}
        </div>
      </DashboardMockupShell>
    </MockupFrame>
  );
}
