import { Link } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import FeatureScene from '../components/foundation/FeatureScene';
import { PageHero, Section, SectionHeading, MarketingCard } from '../components/ui';
import { MARKETING_FEATURES } from '../data/features';
import '../styles/feature-scenes.css';

export default function FeaturesPage() {
  return (
    <>
      <MarketingSEO
        title="Features | TopEdge WhatsApp growth OS"
        description="Shopify connection, Journey canvas, Live Chat, Flow Builder, AI Brain, Campaigns, IG Automation, Analytics, Meta Manager, and Audience ,  every hub shown with real product UI."
        path="/features"
      />
      <MarketingPage>
        <PageHero
          eyebrow="Product"
          title="Every hub your operators actually open"
          subtitle="Not a feature dump ,  each capability maps to a workspace you run on dash.topedgeai.com. Store data syncs from Shopify; you edit it in the dashboard."
        />

        <Section className="!pt-0">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {MARKETING_FEATURES.map((feature) => (
              <Link
                key={feature.slug}
                to={`/features/${feature.slug}`}
                className="group rounded-[24px] border border-[#efeaf8] bg-white p-6 transition hover:border-[#c4b5fd] hover:shadow-[0_20px_40px_-24px_rgba(124,58,237,0.35)]"
              >
                <p className="mkt-eyebrow">{feature.label}</p>
                <h2 className="mt-3 text-lg font-medium tracking-tight text-[#0c1222] group-hover:text-[#7C3AED]">
                  {feature.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-500">
                  {feature.body}
                </p>
                <p className="mt-5 text-sm font-medium text-[#7C3AED]">Explore →</p>
              </Link>
            ))}
          </div>
        </Section>

        <Section wash="soft" className="!py-20">
          <SectionHeading
            eyebrow="How it feels"
            title="Premium product scenes ,  not screenshots"
            subtitle="Each feature page opens with an Instantly-style composition: floating UI that teaches the job in one glance."
            className="mb-10"
          />
          <div className="mx-auto max-w-3xl">
            <FeatureScene variant="hero" />
          </div>
        </Section>

        <Section className="!py-16">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                t: 'Shopify is source of truth',
                d: 'Connect once. Catalog, carts, and orders sync. Change products and settings in the dashboard.',
              },
              {
                t: 'You approve Meta templates',
                d: 'Nothing sends until templates are APPROVED. Utility and marketing rates stay transparent.',
              },
              {
                t: 'Operators stay in control',
                d: 'Live Chat takeover pauses AI. Journeys and flows are visual ,  no developer required.',
              },
            ].map((c) => (
              <MarketingCard key={c.t} className="!p-6">
                <p className="font-medium text-[#0c1222]">{c.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{c.d}</p>
              </MarketingCard>
            ))}
          </div>
        </Section>

        <MarketingCtaBand
          title="See it live on your store"
          subtitle="Start free ,  connect Shopify and WhatsApp in about fifteen minutes."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
