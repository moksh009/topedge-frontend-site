import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

const formFields = [
  { q: 'What should trigger this flow?', a: 'When a customer abandons cart on Shopify' },
  { q: 'What message should they get?', a: 'Friendly cart reminder with product name & COD option' },
  { q: 'When should we follow up?', a: 'After 2 hours if no reply, send discount code' },
];

const flowNodes = [
  { label: 'Cart abandoned', type: 'trigger' as const },
  { label: 'Send WhatsApp template', type: 'action' as const },
  { label: 'Wait 2 hours', type: 'wait' as const },
  { label: 'COD confirmation', type: 'action' as const },
  { label: 'Tag HOT lead', type: 'action' as const },
];

function nodeClass(type: 'trigger' | 'action' | 'wait') {
  if (type === 'trigger') return 'border-violet-200 bg-[#faf5ff]';
  if (type === 'wait') return 'border-amber-200 bg-amber-50/50';
  return 'border-slate-200 bg-white';
}

export default function FlowBuilderShowcase({ animate = true }: { animate?: boolean }) {
  const reduce = useReducedMotion();
  const shouldFloat = animate && !reduce;

  return (
    <motion.div
      animate={shouldFloat ? { y: [0, -6, 0] } : undefined}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="relative mx-auto w-full max-w-4xl"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-violet-500/15 to-transparent blur-2xl"
      />
      <div className="relative grid overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_32px_64px_-16px_rgba(124,58,237,0.2)] md:grid-cols-2">
        <div className="border-b border-slate-100 bg-gradient-to-br from-[#faf5ff] to-white p-6 md:border-b-0 md:border-r">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-[#7C3AED] text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">AI Form</p>
              <p className="text-sm font-semibold text-slate-900">Describe your automation</p>
            </div>
          </div>
          <div className="space-y-3">
            {formFields.map((field, i) => (
              <div key={field.q} className="rounded-2xl border border-violet-100 bg-white p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Question {i + 1}</p>
                <p className="mt-1 text-xs font-medium text-slate-700">{field.q}</p>
                <p className="mt-2 rounded-xl bg-slate-50 px-2.5 py-2 text-xs text-slate-600">{field.a}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6d28d9] py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-500/25"
          >
            Generate flow <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="bg-slate-50/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Ready in ~10 min</p>
              <p className="text-sm font-semibold text-slate-900">Your flow — live preview</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">Published</span>
          </div>
          <div className="space-y-2">
            {flowNodes.map((node, i) => (
              <div key={node.label} className={`flex items-center gap-2 rounded-2xl border px-3 py-2.5 ${nodeClass(node.type)}`}>
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                    node.type === 'trigger' ? 'bg-[#7C3AED] text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-xs font-semibold text-slate-800">{node.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['No code', 'Meta-safe templates', 'Shopify triggers'].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-200/80"
              >
                <Check className="h-3 w-3 text-emerald-500" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
