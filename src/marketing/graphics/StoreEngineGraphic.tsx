import { RefreshCw, ShoppingBag } from 'lucide-react';
import ShopifyLogo from '../components/icons/ShopifyLogo';
import { FloatCard, FlowConnectors, GraphicCanvas, GraphicScene, SceneNode } from './shared';

const links = [
  { from: { x: 50, y: 28 }, to: { x: 50, y: 40 } },
  { from: { x: 50, y: 72 }, to: { x: 50, y: 84 }, curved: true },
];

export default function StoreEngineGraphic() {
  const rows = [
    { id: '#TE-1042', item: 'Cotton Kurta', amt: '₹1,299', status: 'COD' },
    { id: '#TE-1041', item: 'Linen Set', amt: '₹2,180', status: 'Paid' },
    { id: '#TE-1040', item: 'Dupatta', amt: '₹499', status: 'Shipped' },
  ];

  return (
    <GraphicCanvas>
      <GraphicScene>
        <FlowConnectors links={links} />

        <SceneNode x={50} y={22} width="50%">
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/30 bg-white/15 px-4 py-2 backdrop-blur-md">
            <ShopifyLogo size={24} />
            <RefreshCw className="h-4 w-4 animate-spin text-white/80" style={{ animationDuration: '3s' }} />
            <p className="text-[11px] font-bold text-white">Syncing orders · live</p>
          </div>
        </SceneNode>

        <SceneNode x={50} y={58} width="88%">
          <FloatCard className="!p-0 overflow-hidden">
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
              <ShoppingBag className="h-4 w-4 text-[#7C3AED]" />
              <p className="text-xs font-bold text-slate-900">Commerce Hub · Orders</p>
            </div>
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="border-b border-slate-100 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-4 py-2">Order</th>
                  <th className="px-2 py-2">Item</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-slate-50 last:border-0">
                    <td className="px-4 py-2.5 font-semibold text-[#7C3AED]">{r.id}</td>
                    <td className="px-2 py-2.5 text-slate-700">{r.item}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-slate-900">{r.amt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FloatCard>
        </SceneNode>

        <SceneNode x={50} y={88} width="40%">
          <p className="text-center text-[10px] font-semibold text-white/90">Powers flows · inbox · campaigns</p>
        </SceneNode>
      </GraphicScene>
    </GraphicCanvas>
  );
}
