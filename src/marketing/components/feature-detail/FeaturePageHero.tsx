import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '../ui';
import { GradientMesh, Reveal, Stagger, StaggerItem, TextGradient } from '../motion';
import { getFeaturePageMeta } from '../../data/featurePageMeta';
import FeatureMockupBySlug, { hasFeatureMockup } from '../FeatureMockupBySlug';
import InteractiveGraphicPanel from '../InteractiveGraphicPanel';
import HoverStatChip from './HoverStatChip';
import { easeOut } from '../../constants/motion';

const DEFAULT_TRUST = ['Meta-safe templates', 'Shopify sync', 'Built for India'];

const TRUST_BY_SLUG: Record<string, string[]> = {
  'live-chat': ['WhatsApp Business API', 'Order in thread', '24/7 AI + human'],
  'ai-brain': ['0 price hallucinations', 'PDF + catalog', 'Agent training inbox'],
  'flow-builder': ['~10 min to publish', 'COD flows built-in', 'Meta-safe sends'],
  'meta-manager': ['You approve all copy', '1-tap to Meta', 'Reuse in flows'],
  campaigns: ['Approved templates only', 'Shopify segments', '71% avg. read rate'],
  'audience-crm': ['12k+ profiles', 'VIP auto-tags', 'Loyalty on WhatsApp'],
  sequences: ['Stop on purchase', 'Reply branches', '+18% vs single blast'],
  'abandoned-cart': ['32% recovery rate', '15m → 2h → 24h', 'Product + ₹ cards'],
  shopify: ['2 min OAuth', 'Live webhooks', 'Commerce Hub'],
  orders: ['Real-time sync', 'COD + prepaid', '1-click → chat'],
  'order-automations': ['Paid · shipped · delivered', 'COD-aware copy', '−38% WISMO'],
  analytics: ['₹ revenue KPIs', 'Cart recovery ₹', 'Export PDF'],
};

type Props = {
  slug: string;
  hub?: string;
  title: string;
  headline: string;
  description: string;
};

export default function FeaturePageHero({ slug, hub, title, headline, description }: Props) {
  const meta = getFeaturePageMeta(slug);
  const trust = TRUST_BY_SLUG[slug] ?? DEFAULT_TRUST;

  return (
    <section className="marketing-hero-bg marketing-page-hero relative overflow-hidden border-b border-violet-100/80 pb-14 md:pb-20">
      <GradientMesh />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="marketing-container relative max-w-6xl"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/80 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#7C3AED]/90 backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" />
              {hub ? `${hub} · ${title}` : title}
            </motion.div>
            <h1 className="mt-6 text-[2rem] leading-[1.08] tracking-[-0.04em] text-[#0c1222] md:text-[2.75rem] lg:text-[3rem]">
              <TextGradient>{headline}</TextGradient>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-500 md:text-lg lg:mx-0">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <PrimaryButton to="/signup">Start free</PrimaryButton>
              <SecondaryButton to="/features">All modules</SecondaryButton>
            </div>
            <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-slate-500 lg:justify-start">
              {trust.map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#7C3AED]" strokeWidth={2.5} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Reveal delay={0.05}>
            <div className="feature-hero-mockup relative">
              {hasFeatureMockup(slug) ? (
                <div className="overflow-hidden rounded-[1.5rem] shadow-[0_32px_80px_-24px_rgba(124,58,237,0.45)] ring-1 ring-violet-200/50">
                  <FeatureMockupBySlug slug={slug} compact />
                </div>
              ) : (
                <InteractiveGraphicPanel slug={slug} size="hero" tilt label="Product preview" />
              )}
            </div>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-3 sm:grid-cols-3">
          {meta.highlights.map((h) => (
            <StaggerItem key={h.label}>
              <HoverStatChip value={h.value} label={h.label} />
            </StaggerItem>
          ))}
        </Stagger>
      </motion.div>
    </section>
  );
}
