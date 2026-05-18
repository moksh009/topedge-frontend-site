import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { whyTopEdge } from '../../data/home';
import { Section, SectionHeading } from '../ui';
import { Reveal, Stagger, StaggerItem } from '../motion';

export default function HomeWhyTopEdge() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Why TopEdge"
        title="Built for Indian D2C — not a generic inbox bolt-on"
        subtitle="What changes when Shopify, Meta, and your team share one system."
        center
      />
      <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
        {whyTopEdge.map((row) => (
          <StaggerItem key={row.before}>
            <div className="group flex h-full flex-col justify-between rounded-2xl border border-violet-100/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-violet-500/10 md:p-7">
              <div>
                <p className="text-sm text-slate-400 line-through decoration-slate-300">{row.before}</p>
                <p className="mt-3 text-lg font-medium tracking-tight text-[#0c1222]">{row.after}</p>
              </div>
              <div className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-[#7C3AED] to-violet-300 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal className="mt-10 text-center">
        <Link
          to="/customers"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#7C3AED] hover:underline"
        >
          See how teams use TopEdge
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </Section>
  );
}
