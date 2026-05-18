import { motion } from 'framer-motion';
import { Reveal, Stagger, StaggerItem } from '../motion';
import FeatureMockupBySlug from '../FeatureMockupBySlug';
import FeatureGifPlayer from '../feature-animations/FeatureGifPlayer';
import { getFeaturePageMeta } from '../../data/featurePageMeta';

const SHOWCASE_SUBTITLE: Record<string, string> = {
  'live-chat': 'Unified WhatsApp inbox with Shopify order cards',
  'ai-brain': 'Train on catalog, PDFs, and brand persona',
  'flow-builder': 'AI Form → live canvas → publish in minutes',
  'meta-manager': 'Template library → your approval → Meta',
  campaigns: 'Segments, schedules, and approved broadcasts',
  'audience-crm': 'Profiles, loyalty, and one-click segments',
  sequences: 'Multi-step follow-ups after every send',
  'abandoned-cart': '15m · 2h · 24h recovery on WhatsApp',
  shopify: 'Commerce Hub — orders, carts, and catalog',
  orders: 'Every order synced with one-click to chat',
  'order-automations': 'Proactive paid → shipped → delivered',
  analytics: 'Revenue KPIs, not just message counts',
};

export default function FeatureShowcaseBand({ slug }: { slug: string }) {
  const meta = getFeaturePageMeta(slug);
  const subtitle = SHOWCASE_SUBTITLE[slug] ?? 'See it in your TopEdge workspace';

  return (
    <section className="feature-showcase-band relative overflow-hidden border-y border-violet-100/80 bg-gradient-to-b from-white via-violet-50/40 to-white py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 marketing-grain opacity-25" aria-hidden />
      <div className="marketing-container relative max-w-6xl">
        <Reveal>
          <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-[#7C3AED]/70">
            See it in action
          </p>
          <p className="mb-8 text-center text-lg font-medium tracking-tight text-[#0c1222] md:text-xl">{subtitle}</p>
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Live loop</p>
            <FeatureGifPlayer slug={slug} />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Your workspace</p>
            <FeatureMockupBySlug slug={slug} />
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-3">
          {meta.outcomes.map((o) => (
            <StaggerItem key={o.label}>
              <motion.div
                whileHover={{ y: -3 }}
                className="feature-outcome-card rounded-3xl border border-violet-100/80 bg-white/90 p-6 text-center shadow-sm backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-violet-500/10"
              >
                <p className="text-lg font-black text-[#0c1222] md:text-xl">{o.value}</p>
                <p className="mt-1 text-sm text-slate-500">{o.label}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
