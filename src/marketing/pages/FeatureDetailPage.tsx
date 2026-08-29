import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import FeatureScene from '../components/foundation/FeatureScene';
import { PageHero, Section, MarketingCard, PrimaryButton, GhostButton } from '../components/ui';
import { getFeatureBySlug, MARKETING_FEATURES, resolveFeatureSlug } from '../data/features';
import '../styles/feature-scenes.css';

export default function FeatureDetailPage() {
  const { slug = '' } = useParams();
  const canonical = resolveFeatureSlug(slug);
  const feature = getFeatureBySlug(slug);

  if (!feature || !canonical) {
    return <Navigate to="/features" replace />;
  }

  if (slug !== canonical) {
    return <Navigate to={`/features/${canonical}`} replace />;
  }

  const others = MARKETING_FEATURES.filter((f) => f.slug !== feature.slug).slice(0, 3);

  return (
    <>
      <MarketingSEO
        title={`${feature.label} | TopEdge`}
        description={feature.body}
        path={`/features/${feature.slug}`}
      />
      <MarketingPage>
        <PageHero eyebrow={feature.label} title={feature.title} subtitle={feature.body} />

        <Section className="!pt-0 !pb-8">
          <div className="mx-auto max-w-4xl">
            <FeatureScene variant={feature.scene} />
          </div>
        </Section>

        <Section className="!py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mkt-eyebrow">What you get</p>
              <ul className="mt-6 space-y-4">
                {feature.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[0.95rem] text-slate-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C3AED]" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryButton to="/signup">
                  Start free
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
                <GhostButton to="/pricing">See pricing</GhostButton>
              </div>
            </div>
            <div className="space-y-4">
              <p className="mkt-eyebrow">Outcomes</p>
              {feature.outcomes.map((o) => (
                <MarketingCard key={o} className="!p-5">
                  <p className="text-sm leading-relaxed text-slate-600">{o}</p>
                </MarketingCard>
              ))}
              <p className="pt-2 text-xs text-slate-400">
                Live data and settings are managed in your dashboard after you connect Shopify &
                WhatsApp.
              </p>
            </div>
          </div>
        </Section>

        <Section wash="soft" className="!py-16">
          <p className="mkt-eyebrow mb-6">More of the workspace</p>
          <div className="grid gap-4 md:grid-cols-3">
            {others.map((f) => (
              <Link
                key={f.slug}
                to={`/features/${f.slug}`}
                className="rounded-[20px] border border-[#efeaf8] bg-white/90 p-5 transition hover:border-[#c4b5fd]"
              >
                <p className="text-sm font-medium text-[#0c1222]">{f.label}</p>
                <p className="mt-2 line-clamp-2 text-sm text-slate-500">{f.title}</p>
              </Link>
            ))}
          </div>
          <Link to="/features" className="mt-8 inline-flex text-sm font-medium text-[#7C3AED]">
            All features →
          </Link>
        </Section>

        <MarketingCtaBand
          title={`Put ${feature.label} to work on your store`}
          subtitle="Connect Shopify, approve templates, and go live ,  usually in about fifteen minutes plus Meta review."
          primaryLabel="Start free"
          secondaryLabel="Talk to us"
          secondaryTo="/contact"
        />
      </MarketingPage>
    </>
  );
}
