import SEO from '../../components/SEO';
import { Section, PrimaryButton, SectionHeading, PageHero } from '../components/ui';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import MarketingStatsStrip from '../components/MarketingStatsStrip';
import FeatureCard from '../components/FeatureCard';
import FlowBuilderShowcase from '../components/FlowBuilderShowcase';
import { Reveal } from '../components/motion';
import { featureHubSections } from '../data/navigation';
import { getFeatureBySlug } from '../data/features';

const hubSubtitles: Record<string, string> = {
  'WhatsApp & AI': 'Inbox, AI, automations, and Meta templates — the core of your WhatsApp channel.',
  Growth: 'Broadcasts, segments, sequences, and cart recovery that drive ₹ revenue.',
  Store: 'Shopify data, orders, transactional messages, and revenue analytics in one hub.',
};

const platformStats = [
  { value: '12', label: 'product modules' },
  { value: '3', label: 'product hubs' },
  { value: '~10 min', label: 'AI Form → flow' },
  { value: '24–48h', label: 'Meta template approval' },
];

export default function FeaturesPage() {
  const flagship = getFeatureBySlug('flow-builder');

  return (
    <>
      <SEO
        title="Features | TopEdge — WhatsApp growth OS for Shopify"
        description="Live Chat, AI Brain, Flow Builder, Meta Manager, Campaigns, Audience CRM, Store Engine, and more — built for Indian D2C."
      />
      <MarketingPage>
        <PageHero
          eyebrow="Product"
          title="Every module to run WhatsApp as a revenue channel"
          subtitle="Twelve tools in three hubs — sell, support, and grow on the channel Indian buyers already use. All powered by live Shopify data."
        >
          <PrimaryButton to="/signup">Start free</PrimaryButton>
        </PageHero>

        <MarketingStatsStrip stats={platformStats} />

        {flagship && (
          <section className="marketing-container -mt-4 pb-4">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-violet-200/60 bg-gradient-to-br from-violet-50/80 via-white to-white p-8 shadow-sm md:p-12">
                <div className="mx-auto max-w-2xl text-center">
                  <span className="rounded-full border border-violet-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#7C3AED]">
                    Flagship
                  </span>
                  <h2 className="mt-4 text-3xl tracking-tight text-[#0c1222] md:text-4xl">{flagship.title}</h2>
                  <p className="mt-3 text-slate-500">{flagship.tagline}</p>
                  <div className="mt-6">
                    <PrimaryButton to="/features/flow-builder">Explore Flow Builder</PrimaryButton>
                  </div>
                </div>
                <div className="mt-10">
                  <FlowBuilderShowcase />
                </div>
              </div>
            </Reveal>
          </section>
        )}

        {featureHubSections.map((hub, hubIndex) => (
          <Section key={hub.title} subtle={hubIndex % 2 === 1}>
            <SectionHeading
              eyebrow={hub.title}
              title={hub.title}
              subtitle={hubSubtitles[hub.title]}
              center
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {hub.slugs.map((slug) => (
                <FeatureCard key={slug} slug={slug} />
              ))}
            </div>
          </Section>
        ))}

        <MarketingCtaBand
          title="See it on your store"
          subtitle="Connect Shopify and WhatsApp — publish your first flow in about fifteen minutes. Free to start."
          primaryLabel="Create free account"
          primaryTo="/signup"
          secondaryLabel="View pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
