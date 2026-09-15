import { useState } from 'react';
import {
  Boxes,
  IndianRupee,
  MessageCircle,
  Package,
  Receipt,
  RefreshCcw,
  Store,
} from 'lucide-react';
import { demoDashboard } from '../demoFixtures';

/** Dashboard home — real eco-dashboard / metric-strip / stat-card class names + mock data. */
export default function DemoHomePanel() {
  const [tab, setTab] = useState<'store' | 'support'>('store');
  const max = Math.max(...demoDashboard.chart);

  return (
    <div className="eco-dashboard page-container demo-eco relative z-10 flex min-h-full min-w-0 w-full max-w-none flex-col gap-2 bg-white pb-3 font-sans text-slate-900 dashboard-typography">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 w-full mb-1">
        <div className="min-w-0">
          <h1 className="text-[22px] font-semibold tracking-tight text-slate-500">
            Welcome back, <span className="text-violet-700">Moksh</span>
          </h1>
        </div>
        <div className="eco-dashboard-header-actions flex items-center gap-2">
          <button type="button" className="dashboard-icon-btn" aria-label="Refresh" disabled>
            <RefreshCcw size={16} />
          </button>
          <button type="button" className="app-btn-pill-primary hidden sm:inline-flex" disabled>
            {tab === 'store' ? (
              <>
                <Store size={16} strokeWidth={1.75} /> Store engine
              </>
            ) : (
              <>
                <MessageCircle size={16} strokeWidth={1.75} /> Inbox
              </>
            )}
          </button>
        </div>
      </div>

      <div className="eco-dashboard-tab-bar flex w-full shrink-0 justify-start">
        <div className="demo-capsule-tabs w-fit max-w-full flex-wrap">
          <button type="button" className={tab === 'store' ? 'is-on' : undefined} onClick={() => setTab('store')}>
            Store
          </button>
          <button
            type="button"
            className={tab === 'support' ? 'is-on' : undefined}
            onClick={() => setTab('support')}
          >
            Support
          </button>
        </div>
      </div>

      {tab === 'store' ? (
        <div className="min-w-0 space-y-3">
          <div
            className="metric-strip dashboard-kpi-strip dashboard-kpi-strip--store grid w-full min-w-0 gap-0 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] divide-x divide-slate-100 grid-cols-2 lg:grid-cols-4"
            role="group"
          >
            {[
              { label: 'Gross sales', value: '₹4.2L', icon: IndianRupee, desc: 'Total revenue in range', trend: '+18%' },
              { label: 'Orders', value: '1,284', icon: Package, desc: 'Completed orders', trend: '+9%' },
              { label: 'Units sold', value: '3,912', icon: Boxes, desc: 'Total units sold in range', trend: '+11%' },
              { label: 'AOV', value: '₹3,271', icon: Receipt, desc: 'Revenue per order in range', trend: '+3%' },
            ].map((k) => {
              const Icon = k.icon;
              return (
                <div key={k.label} className="stat-card stat-card--compact stat-card--embedded p-3 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="stat-card__label truncate">{k.label}</p>
                      <p className="stat-card__value tabular-nums">{k.value}</p>
                      <p className="stat-card__desc truncate">{k.desc}</p>
                    </div>
                    <span className="hub-icon-badge hub-icon-badge--violet shrink-0">
                      <Icon size={14} strokeWidth={1.75} />
                    </span>
                  </div>
                  <p className="stat-card__trend text-emerald-600 mt-1">{k.trend}</p>
                </div>
              );
            })}
          </div>

          <div className="dashboard-store-panels-grid">
            <div className="dashboard-store-panels-grid__cell">
              <div className="premium-chart-shell eco-dashboard-chart eco-dashboard-chart--store eco-dashboard-chart--polished relative flex h-full min-h-0 flex-col overflow-hidden p-3.5">
                <div className="dash-chart-toolbar dash-chart-toolbar--compact shrink-0">
                  <div className="dash-chart-toolbar__title dash-chart-toolbar__title--plain">
                    <h3 className="whitespace-nowrap text-[13px] font-semibold tracking-tight text-slate-900">
                      Total sales
                    </h3>
                  </div>
                  <div className="dash-chart-toolbar__end">
                    <div className="eco-chart-legend-row shrink-0">
                      <span className="eco-chart-legend-item">
                        <span className="eco-chart-legend-item__dot eco-chart-legend-item__dot--violet" />
                        Revenue
                      </span>
                      <span className="eco-chart-legend-item">
                        <span className="eco-chart-legend-item__dot eco-chart-legend-item__dot--emerald" />
                        Orders
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-2 shrink-0 text-[1.25rem] font-semibold tabular-nums tracking-tight text-slate-900 leading-none">
                  ₹4.2L
                </p>
                <div className="demo-chart-bars mt-3" aria-hidden>
                  {demoDashboard.chart.map((v, i) => (
                    <div key={i} className="demo-chart-bars__col">
                      <div style={{ height: `${(v / max) * 100}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dashboard-store-panels-grid__cell">
              <div className="premium-chart-shell relative flex h-full min-h-0 flex-col overflow-hidden p-3.5">
                <h3 className="text-[13px] font-semibold tracking-tight text-slate-900 mb-2">Top products</h3>
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="text-slate-400">
                      <th className="pb-2 font-medium">Product</th>
                      <th className="pb-2 font-medium">Sold</th>
                      <th className="pb-2 font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoDashboard.products.map((p) => (
                      <tr key={p.name} className="border-t border-slate-50">
                        <td className="py-2 font-medium text-slate-800">{p.name}</td>
                        <td className="py-2 tabular-nums">{p.sold}</td>
                        <td className="py-2 tabular-nums">{p.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="premium-chart-shell p-3.5">
            <h3 className="text-[13px] font-semibold tracking-tight text-slate-900 mb-2">Recent orders</h3>
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="text-slate-400">
                  <th className="pb-2 font-medium">Order</th>
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Total</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {demoDashboard.recentOrders.map((o) => (
                  <tr key={o.id} className="border-t border-slate-50">
                    <td className="py-2 font-medium">{o.id}</td>
                    <td className="py-2">{o.customer}</td>
                    <td className="py-2 tabular-nums">{o.total}</td>
                    <td className="py-2">
                      <span className={`demo-pill demo-pill--${o.status.toLowerCase()}`}>{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div
          className="metric-strip grid w-full grid-cols-2 lg:grid-cols-4 gap-0 overflow-hidden rounded-xl border border-slate-200/80 bg-white divide-x divide-slate-100"
          role="group"
        >
          {[
            { label: 'Open chats', value: '24', trend: '+6 today' },
            { label: 'Avg first reply', value: '48s', trend: '−12s' },
            { label: 'Bot resolved', value: '68%', trend: '+4%' },
            { label: 'CSAT', value: '4.8', trend: '+0.1' },
          ].map((k) => (
            <div key={k.label} className="stat-card stat-card--compact p-3">
              <p className="stat-card__label">{k.label}</p>
              <p className="stat-card__value">{k.value}</p>
              <p className="stat-card__trend text-emerald-600">{k.trend}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
