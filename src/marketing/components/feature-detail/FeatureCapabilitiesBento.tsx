import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section, SectionHeading } from '../ui';
import { Stagger, StaggerItem } from '../motion';
import FeatureCapabilityVisual from '../feature-visuals/FeatureCapabilityVisual';
import type { FeatureDetail } from '../../data/features';
import { cn } from '@/lib/utils';

export default function FeatureCapabilitiesBento({ detail, slug }: { detail: FeatureDetail; slug: string }) {
  return (
    <Section>
      <SectionHeading
        title="What you get"
        subtitle="Premium workspace tools — each capability with its own preview."
        center
      />
      <Stagger className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {detail.capabilities.map((cap, i) => (
          <StaggerItem key={cap.title}>
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 340, damping: 26 }}
              className={cn(
                'feature-cap-card marketing-premium-card group flex h-full flex-col overflow-hidden rounded-3xl p-0',
                i % 2 === 1 && 'md:mt-6'
              )}
            >
              <div className="border-b border-violet-100/60 bg-gradient-to-br from-violet-50/50 to-white p-4 md:p-5">
                <FeatureCapabilityVisual slug={slug} variant={i} title={cap.title} desc={cap.desc} />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6d28d9] text-white shadow-md shadow-violet-500/30">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-[#0c1222] transition-colors group-hover:text-[#7C3AED]">
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{cap.desc}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
