import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section, SectionHeading } from '../ui';
import { Stagger, StaggerItem } from '../motion';
import { getFeatureBySlug } from '../../data/features';
import FeatureRelatedModuleThumb from '../feature-visuals/FeatureRelatedModuleThumb';
import type { FeatureDetail } from '../../data/features';

export default function FeatureRelatedModules({ detail }: { detail: FeatureDetail }) {
  return (
    <Section>
      <SectionHeading title="Works well with" subtitle="Connected modules — same data, same templates." center />
      <Stagger className="grid gap-6 md:grid-cols-3">
        {detail.related.map((rel) => {
          const f = getFeatureBySlug(rel);
          if (!f) return null;
          const Icon = f.icon;
          return (
            <StaggerItem key={rel}>
              <Link to={`/features/${rel}`} className="block h-full">
                <motion.article
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                  className="feature-related-card marketing-premium-card flex h-full flex-col overflow-hidden rounded-3xl p-0"
                >
                  <div className="border-b border-violet-100/60 p-3">
                    <FeatureRelatedModuleThumb slug={rel} />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-[#7C3AED]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-medium text-[#0c1222]">{f.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-slate-500">{f.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#7C3AED]">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </motion.article>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
