import { Check } from 'lucide-react';
import MockupFrame from './shared/MockupFrame';
import DashboardMockupShell from './shared/DashboardMockupShell';

const integrations = [
  { name: 'Shopify', status: 'Connected', color: 'emerald' },
  { name: 'WhatsApp Cloud API', status: 'Connected', color: 'emerald' },
  { name: 'Instagram DMs', status: 'Soon', color: 'amber' },
  { name: 'Email (Google)', status: 'Connected', color: 'emerald' },
];

export default function IntegrationsMockup() {
  return (
    <MockupFrame float={false}>
      <DashboardMockupShell
        activeNav="settings"
        connector={false}
        header={
          <div>
            <p className="text-sm font-bold text-slate-900">Integrations</p>
            <p className="text-[10px] text-slate-500">Settings · Connect once</p>
          </div>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {integrations.map((i) => (
            <div
              key={i.name}
              className="flex items-center justify-between rounded-3xl border border-slate-200/90 bg-white/95 px-4 py-3 shadow-sm"
            >
              <p className="text-xs font-bold text-slate-900">{i.name}</p>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  i.color === 'emerald' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}
              >
                {i.color === 'emerald' && <Check className="h-3 w-3" />}
                {i.status}
              </span>
            </div>
          ))}
        </div>
      </DashboardMockupShell>
    </MockupFrame>
  );
}
