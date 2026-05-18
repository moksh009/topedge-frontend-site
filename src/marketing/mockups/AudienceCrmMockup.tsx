import MockupFrame from './shared/MockupFrame';
import DashboardMockupShell from './shared/DashboardMockupShell';

const cards = [
  { label: 'Abandoned carts', value: '142', hint: 'Recovery ready' },
  { label: 'Loyalty members', value: '3.2k', hint: 'Points active' },
  { label: 'Segments', value: '18', hint: 'For campaigns' },
  { label: 'Reviews pending', value: '56', hint: 'Post-delivery' },
];

export default function AudienceCrmMockup() {
  return (
    <MockupFrame>
      <DashboardMockupShell
        activeNav="audience"
        connector={false}
        header={
          <div>
            <p className="text-sm font-bold text-slate-900">Audience Hub</p>
            <p className="text-[10px] text-slate-500">CRM · Loyalty · Carts · Reviews</p>
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-3">
          {cards.map((c) => (
            <div
              key={c.label}
              className="rounded-3xl border border-slate-200/90 bg-white/95 p-4 shadow-sm backdrop-blur-sm"
            >
              <p className="text-[10px] font-semibold text-slate-500">{c.label}</p>
              <p className="mt-1 text-2xl font-black text-[#7C3AED]">{c.value}</p>
              <p className="mt-0.5 text-[10px] font-medium text-slate-600">{c.hint}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-3xl border border-violet-200/80 bg-[#faf5ff]/90 px-4 py-3">
          <p className="text-xs font-bold text-slate-800">VIP repeat buyers · 847 contacts</p>
          <p className="text-[10px] text-slate-500">Ready for next broadcast</p>
        </div>
      </DashboardMockupShell>
    </MockupFrame>
  );
}
