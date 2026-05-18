import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { AnimationFrame, AnimMessage, TypingDots, PulseRing } from './AnimationFrame';
import { Sparkles, Check, Send, Package, GitBranch, IndianRupee } from 'lucide-react';
import { cn } from '@/lib/utils';

function useLoop(length: number, ms = 4200) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % length), ms);
    return () => clearInterval(t);
  }, [length, ms]);
  return i;
}

export function LiveChatDemo() {
  const step = useLoop(4, 3800);
  return (
    <AnimationFrame label="Inbox">
      <div className="p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900">Priya Sharma</p>
            <p className="text-[10px] text-slate-500">+91 WhatsApp</p>
          </div>
          <span className="rounded-full bg-amber-50 px-2 py-1 text-[9px] font-bold text-amber-800">Bot paused</span>
        </div>
        <div className="min-h-[140px] space-y-2 rounded-2xl bg-white p-3 ring-1 ring-slate-100">
          <AnimMessage side="in" delay={0}>COD to Ahmedabad? Size M?</AnimMessage>
          {step >= 1 && <AnimMessage side="out" delay={0}>Yes — M in stock. Reserve?</AnimMessage>}
          {step >= 2 && (
            <div className="inline-flex items-center gap-1 rounded-full bg-[#faf5ff] px-2 py-1 text-[9px] font-bold text-[#7C3AED]">
              <Sparkles className="h-3 w-3" /> AI suggested
            </div>
          )}
          {step === 0 && <TypingDots />}
        </div>
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 rounded-2xl border border-violet-200 bg-[#faf5ff] p-3"
            >
              <p className="text-[10px] font-bold text-[#7C3AED]">Order #TE-1042</p>
              <p className="text-sm font-black">₹1,299 · COD</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimationFrame>
  );
}

export function AiBrainDemo() {
  const step = useLoop(3, 4000);
  const labels = ['Scanning catalog…', 'Training intents…', 'Persona ready'];
  return (
    <AnimationFrame label="AI Brain">
      <div className="p-5">
        <div className="relative flex h-28 items-center justify-center">
          <PulseRing />
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7C3AED] text-white shadow-lg">
            <Sparkles className="h-7 w-7" />
          </div>
        </div>
        <p className="text-center text-sm font-bold text-slate-900">{labels[step]}</p>
        <div className="mt-4 space-y-2">
          {['PDF policies', 'Shopify SKUs', 'Brand tone'].map((l, i) => (
            <div key={l} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-slate-100">
              <div className={cn('h-2 w-2 rounded-full', i <= step ? 'bg-emerald-500' : 'bg-slate-200')} />
              <span className="text-xs text-slate-600">{l}</span>
              {i <= step && <Check className="ml-auto h-3.5 w-3.5 text-emerald-600" />}
            </div>
          ))}
        </div>
      </div>
    </AnimationFrame>
  );
}

export function FlowBuilderDemo() {
  const step = useLoop(4, 3500);
  const nodes = ['Trigger: cart abandoned', 'Wait 15 min', 'Send template', 'Branch: COD'];
  return (
    <AnimationFrame label="Flow Builder">
      <div className="p-5">
        <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-wider text-[#7C3AED]">AI Form → canvas</p>
        <div className="flex flex-col gap-2">
          {nodes.map((n, i) => (
            <div
              key={n}
              className={cn(
                'rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all duration-500',
                i <= step ? 'border-[#7C3AED] bg-[#faf5ff] text-[#7C3AED] shadow-md' : 'border-slate-200 bg-white text-slate-400'
              )}
            >
              {i <= step && <Check className="mr-1.5 inline h-3.5 w-3.5" />}
              {n}
            </div>
          ))}
        </div>
        {step >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-xs font-bold text-emerald-600"
          >
            Published · Meta-safe
          </motion.p>
        )}
      </div>
    </AnimationFrame>
  );
}

export function MetaManagerDemo() {
  const step = useLoop(3, 4000);
  const status = ['Drafting copy…', 'Sent to Meta', 'Approved ✓'];
  return (
    <AnimationFrame label="Meta Manager">
      <div className="p-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold">Abandoned cart — urgency</p>
          <p className="mt-1 text-[10px] text-slate-500">3 variables · Hindi + English</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              className="h-full bg-[#7C3AED]"
              animate={{ width: step === 0 ? '40%' : step === 1 ? '75%' : '100%' }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <p className={cn('mt-2 text-xs font-bold', step === 2 ? 'text-emerald-600' : 'text-[#7C3AED]')}>{status[step]}</p>
        </div>
      </div>
    </AnimationFrame>
  );
}

export function CampaignDemo() {
  const step = useLoop(3, 3800);
  const stats = [
    { l: 'Delivered', v: '98%' },
    { l: 'Read', v: '71%' },
    { l: 'Replies', v: '12%' },
  ];
  return (
    <AnimationFrame label="Campaign">
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between rounded-2xl bg-[#faf5ff] p-3">
          <div>
            <p className="text-xs font-bold">Segment: last 30 days</p>
            <p className="text-[10px] text-slate-500">2,847 contacts</p>
          </div>
          <motion.button
            animate={step >= 2 ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: step >= 2 ? Infinity : 0, duration: 1.2 }}
            className="inline-flex items-center gap-1 rounded-full bg-[#7C3AED] px-3 py-1.5 text-[10px] font-bold text-white"
          >
            <Send className="h-3 w-3" />
            {step >= 2 ? 'Sent' : 'Send'}
          </motion.button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {stats.map((s, i) => (
            <div key={s.l} className={cn('rounded-xl py-2 text-center ring-1', i <= step ? 'bg-white ring-violet-200' : 'bg-slate-50 ring-slate-100 opacity-50')}>
              <p className="text-sm font-black text-[#7C3AED]">{i <= step ? s.v : '—'}</p>
              <p className="text-[8px] text-slate-500">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimationFrame>
  );
}

export function AudienceCrmDemo() {
  const step = useLoop(3, 4000);
  const tags = ['VIP', 'Repeat buyer', 'Cart abandon'];
  return (
    <AnimationFrame label="CRM">
      <div className="p-5 space-y-3">
        {['Priya S.', 'Rahul M.', 'Ananya K.'].map((name, i) => (
          <div key={name} className={cn('flex items-center justify-between rounded-2xl border bg-white px-3 py-2.5', i === step ? 'border-violet-300 ring-2 ring-violet-100' : 'border-slate-200')}>
            <span className="text-xs font-bold">{name}</span>
            {i === step && <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[9px] font-bold text-[#7C3AED]">{tags[step]}</span>}
          </div>
        ))}
      </div>
    </AnimationFrame>
  );
}

export function SequencesDemo() {
  const step = useLoop(4, 3500);
  return (
    <AnimationFrame label="Sequence">
      <div className="p-5 space-y-2">
        {['Broadcast', 'Wait 48h', 'Follow-up', 'Stop on order'].map((l, i) => (
          <div key={l} className="flex items-center gap-2">
            <div className={cn('flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold', i <= step ? 'bg-[#7C3AED] text-white' : 'bg-slate-100 text-slate-400')}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={cn('text-xs font-semibold', i === step ? 'text-[#7C3AED]' : 'text-slate-500')}>{l}</span>
            {i === 1 && step >= 1 && <GitBranch className="ml-auto h-3.5 w-3.5 text-violet-400" />}
          </div>
        ))}
      </div>
    </AnimationFrame>
  );
}

export function AbandonedCartDemo() {
  const step = useLoop(3, 4000);
  const times = ['15 min', '2 hours', '24 hours'];
  return (
    <AnimationFrame label="Cart recovery">
      <div className="p-5">
        <div className="mb-3 flex gap-3 rounded-2xl bg-white p-3 ring-1 ring-slate-100">
          <div className="h-14 w-14 rounded-xl bg-violet-100" />
          <div>
            <p className="text-xs font-bold">Cotton Kurta Blue</p>
            <p className="text-lg font-black text-[#7C3AED]">₹1,299</p>
            <p className="text-[10px] text-amber-700">COD checkout</p>
          </div>
        </div>
        {times.map((t, i) => (
          <div key={t} className={cn('mb-2 flex items-center gap-2 rounded-xl px-3 py-2 text-xs', i <= step ? 'bg-[#faf5ff] font-bold text-[#7C3AED]' : 'text-slate-400')}>
            <Send className="h-3.5 w-3.5" />
            Nudge {i + 1} · {t}
            {i <= step && <Check className="ml-auto h-3.5 w-3.5" />}
          </div>
        ))}
      </div>
    </AnimationFrame>
  );
}

export function ShopifyDemo() {
  const step = useLoop(3, 4000);
  return (
    <AnimationFrame label="Shopify sync">
      <div className="p-5">
        <div className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#95BF47]/25 text-lg font-black text-[#5E8E3E]">S</div>
          <div>
            <p className="text-xs font-bold">mybrand.myshopify.com</p>
            <p className={cn('text-[10px] font-semibold', step >= 2 ? 'text-emerald-600' : 'text-slate-500')}>
              {step === 0 ? 'Connecting…' : step === 1 ? 'Syncing webhooks…' : 'Live · orders + carts'}
            </p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {['Products', 'Orders', 'Customers'].map((l, i) => (
            <div key={l} className={cn('rounded-xl py-2 text-center text-[10px] font-bold', i <= step ? 'bg-violet-50 text-[#7C3AED]' : 'bg-slate-50 text-slate-400')}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </AnimationFrame>
  );
}

export function OrdersDemo() {
  const step = useLoop(3, 3800);
  const rows = [
    { id: '#TE-1042', s: 'COD' },
    { id: '#TE-1041', s: 'Paid' },
    { id: '#TE-1040', s: 'Shipped' },
  ];
  return (
    <AnimationFrame label="Orders">
      <div className="p-4 space-y-2">
        {rows.map((r, i) => (
          <div key={r.id} className={cn('flex items-center gap-3 rounded-2xl border bg-white p-3', i === step ? 'border-violet-300 ring-2 ring-violet-100' : 'border-slate-200')}>
            <Package className="h-4 w-4 text-[#7C3AED]" />
            <span className="text-xs font-bold">{r.id}</span>
            <span className="ml-auto rounded-full bg-violet-50 px-2 py-0.5 text-[9px] font-bold text-[#7C3AED]">{r.s}</span>
            {i === step && <span className="text-[9px] font-bold text-[#7C3AED]">→ Chat</span>}
          </div>
        ))}
      </div>
    </AnimationFrame>
  );
}

export function OrderAutomationsDemo() {
  const step = useLoop(3, 4000);
  const events = ['Order paid', 'Shipped', 'Delivered'];
  return (
    <AnimationFrame label="Order auto">
      <div className="p-5 space-y-2">
        {events.map((e, i) => (
          <div key={e} className={cn('flex items-center justify-between rounded-2xl border px-3 py-3', i <= step ? 'border-emerald-200 bg-emerald-50/80' : 'border-slate-200 bg-white opacity-60')}>
            <span className="text-xs font-bold text-slate-800">{e}</span>
            {i <= step && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                <Send className="h-3 w-3" /> WhatsApp sent
              </span>
            )}
          </div>
        ))}
      </div>
    </AnimationFrame>
  );
}

export function AnalyticsDemo() {
  const step = useLoop(7, 500);
  const bars = [42, 68, 55, 82, 74, 91, 88];
  return (
    <AnimationFrame label="Insights">
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2 rounded-2xl bg-white p-3 ring-1 ring-slate-100">
          <IndianRupee className="h-5 w-5 text-[#7C3AED]" />
          <div>
            <p className="text-[10px] text-slate-500">Recovered this week</p>
            <p className="text-xl font-black">₹2.1L</p>
          </div>
        </div>
        <div className="flex h-24 items-end gap-1">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-md bg-gradient-to-t from-[#7C3AED] to-violet-300"
              animate={{ height: i <= step ? `${h}%` : '8%' }}
              transition={{ duration: 0.35 }}
            />
          ))}
        </div>
      </div>
    </AnimationFrame>
  );
}

export const FEATURE_ANIMATED_DEMOS: Record<string, () => JSX.Element> = {
  'live-chat': LiveChatDemo,
  'ai-brain': AiBrainDemo,
  'flow-builder': FlowBuilderDemo,
  'meta-manager': MetaManagerDemo,
  campaigns: CampaignDemo,
  'audience-crm': AudienceCrmDemo,
  sequences: SequencesDemo,
  'abandoned-cart': AbandonedCartDemo,
  shopify: ShopifyDemo,
  orders: OrdersDemo,
  'order-automations': OrderAutomationsDemo,
  analytics: AnalyticsDemo,
};
