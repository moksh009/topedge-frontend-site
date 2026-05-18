import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import FlowBuilderShowcase from '../FlowBuilderShowcase';
import { PrimaryButton, SecondaryButton } from '../ui';

const steps = [
  {
    n: '01',
    title: 'Describe in AI Form',
    desc: 'Plain English: “When cart is abandoned, send WhatsApp with product & COD option.”',
  },
  {
    n: '02',
    title: 'Review on canvas',
    desc: 'Edit triggers, waits, templates, and handoff — visual flow, no code.',
  },
  {
    n: '03',
    title: 'Approve templates',
    desc: 'You edit copy once. Meta approves. Reuse in flows & campaigns.',
  },
  {
    n: '04',
    title: 'Publish from Shopify',
    desc: 'Live in ~10 minutes. Cart recovery, COD confirm, order updates.',
  },
];

const tags = ['No code', 'Meta-safe templates', 'Shopify triggers', 'COD-aware copy'];

export default function HomeAiFlow() {
  return (
    <section className="home-ai-flow relative overflow-hidden py-20 md:py-28" id="ai-flow">
      <div className="home-ai-flow-glow" aria-hidden />
      <div className="marketing-container relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <div>
            <span className="home-ai-flow-badge">
              <Sparkles className="h-3.5 w-3.5" />
              Flagship · AI Form → Flow Builder
            </span>
            <h2 className="home-section-title mt-5">
              Describe it once.{' '}
              <span className="home-gradient-text">Publish a full WhatsApp automation.</span>
            </h2>
            <p className="home-section-lead max-w-xl">
              TopEdge turns your answers into live flows — abandoned cart, COD confirm, order updates, and human
              handoff. No Zapier. No agency. Meta-approved templates only.
            </p>

            <ol className="mt-8 space-y-4">
              {steps.map((s) => (
                <li key={s.n} className="home-ai-step flex gap-4">
                  <span className="home-step-num shrink-0">{s.n}</span>
                  <div>
                    <p className="font-medium text-[#0c1222]">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="home-ai-tag">
                  <Check className="h-3 w-3 text-[#7C3AED]" strokeWidth={2.5} />
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <PrimaryButton to="/features/flow-builder">Try AI Form → Flow</PrimaryButton>
              <SecondaryButton to="/signup">Start free</SecondaryButton>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              <Link to="/features/meta-manager" className="font-medium text-[#7C3AED] hover:underline">
                How Meta templates work →
              </Link>
            </p>
          </div>

          <div className="home-ai-flow-stage">
            <FlowBuilderShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
