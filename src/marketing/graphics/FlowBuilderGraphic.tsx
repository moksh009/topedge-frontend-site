import { Check, Clock, MessageCircle, Sparkles, Workflow, Zap } from 'lucide-react';
import {
  ConnectorHub,
  FloatCard,
  FlowConnectors,
  GraphicCanvas,
  GraphicScene,
  SceneNode,
} from './shared';

const links = [
  { from: { x: 36, y: 50 }, to: { x: 44, y: 50 } },
  { from: { x: 56, y: 50 }, to: { x: 64, y: 50 } },
];

export default function FlowBuilderGraphic() {
  return (
    <GraphicCanvas variant="plum">
      <GraphicScene>
        <FlowConnectors links={links} />

        <SceneNode x={22} y={50} width="30%">
          <FloatCard>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#7C3AED]" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED]">AI Form</p>
            </div>
            <p className="mt-2 text-base font-bold text-slate-900">Describe your automation</p>
            <div className="mt-3 space-y-2">
              {[
                'Trigger: cart abandoned on Shopify',
                'Message: product + ₹ + COD',
                'Follow-up: 2hr · 24hr',
              ].map((line) => (
                <p key={line} className="rounded-xl bg-slate-50 px-3 py-2 text-[11px] text-slate-600">
                  {line}
                </p>
              ))}
            </div>
          </FloatCard>
        </SceneNode>

        <SceneNode x={50} y={50}>
          <ConnectorHub icon={Zap} label="Generate flow" />
        </SceneNode>

        <SceneNode x={78} y={50} width="30%">
          <FloatCard>
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Published · ~10 min</p>
            <p className="mt-2 text-base font-bold text-slate-900">Cart recovery flow</p>
            <div className="mt-3 space-y-2">
              {[
                { icon: MessageCircle, t: 'Cart abandoned', c: 'Trigger' },
                { icon: Clock, t: 'Wait 2 hours', c: 'Delay' },
                { icon: Workflow, t: 'COD confirm', c: 'Action' },
              ].map((row) => (
                <div key={row.t} className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-3 py-2">
                  <row.icon className="h-3.5 w-3.5 text-[#7C3AED]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-800">{row.t}</p>
                    <p className="text-[9px] uppercase text-slate-400">{row.c}</p>
                  </div>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                </div>
              ))}
            </div>
          </FloatCard>
        </SceneNode>
      </GraphicScene>
    </GraphicCanvas>
  );
}
