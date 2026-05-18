import { Check } from 'lucide-react';
import FlowBuilderShowcase from '../FlowBuilderShowcase';
import FeatureMarketingImage from '../FeatureMarketingImage';
import { PrimaryButton, Section, SectionHeading } from '../ui';
import { Reveal } from '../motion';

const flowCapabilities = [
  'Catalog & tracking',
  'Abandoned cart',
  'COD confirm',
  'Loyalty & warranty',
  'Live Chat handoff',
];

export default function HomeFlowSection() {
  return (
    <Section subtle>
      <SectionHeading
        eyebrow="Flow Builder"
        title="Describe it once. Publish a full WhatsApp automation."
        subtitle="AI Form turns plain language into live flows — cart recovery, COD confirm, order updates, and human handoff. Or draw it on a visual canvas. No code, Meta-safe templates only."
        center
      />
      <Reveal>
        <FeatureMarketingImage imageId="flow-builder" />
      </Reveal>
      <Reveal className="mx-auto mt-12 max-w-3xl">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
          Or start with AI Form
        </p>
        <div className="mt-5">
          <FlowBuilderShowcase />
        </div>
      </Reveal>
      <Reveal className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
        {flowCapabilities.map((b) => (
          <span
            key={b}
            className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-white px-3.5 py-1.5 text-[13px] text-slate-600"
          >
            <Check className="h-3 w-3 text-[#7C3AED]" strokeWidth={2.5} />
            {b}
          </span>
        ))}
      </Reveal>
      <Reveal className="mt-12 text-center">
        <PrimaryButton to="/features/flow-builder">Explore Flow Builder</PrimaryButton>
      </Reveal>
    </Section>
  );
}
