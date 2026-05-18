import { AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '../ui';
import { Reveal } from '../motion';
import FeatureSolutionVisual from '../feature-visuals/solutionVisualContent';
import type { FeatureDetail } from '../../data/features';

export default function FeatureProblemSolution({ detail, slug }: { detail: FeatureDetail; slug: string }) {
  return (
    <Section subtle className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-50/50 via-transparent to-rose-50/20" aria-hidden />
      <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="space-y-5">
            <motion.article
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 360, damping: 26 }}
              className="feature-ps-card rounded-3xl border border-rose-100/80 bg-gradient-to-br from-rose-50/60 to-white p-8 shadow-sm"
            >
              <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-rose-400">
                <AlertCircle className="h-3.5 w-3.5" />
                The problem
              </p>
              <p className="mt-4 text-[17px] leading-relaxed text-slate-700">{detail.problem}</p>
            </motion.article>
            <motion.article
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 360, damping: 26 }}
              className="feature-ps-card rounded-3xl border border-violet-200/70 bg-gradient-to-br from-[#faf5ff] to-white p-8 ring-1 ring-violet-100 shadow-md shadow-violet-500/5"
            >
              <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#7C3AED]/80">
                <Sparkles className="h-3.5 w-3.5" />
                How TopEdge solves it
              </p>
              <p className="mt-4 text-[17px] leading-relaxed text-slate-700">{detail.solution}</p>
            </motion.article>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <FeatureSolutionVisual slug={slug} />
        </Reveal>
      </div>
    </Section>
  );
}
