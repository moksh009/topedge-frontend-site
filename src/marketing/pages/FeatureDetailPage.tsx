import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import ProductDemoVideo from '../components/home/ProductDemoVideo';
import { PageHero, Section, MarketingCard, PrimaryButton, GhostButton } from '../components/ui';
import { getFeatureBySlug, MARKETING_FEATURES, resolveFeatureSlug } from '../data/features';
import {
  FEATURE_SEO,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
import { demoVideoFor } from '../data/productDemoVideos';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
  const featureSeo = FEATURE_SEO[feature.slug];
  const videoSrc = demoVideoFor(feature.slug) || demoVideoFor(feature.scene);

  return (
    <>
      <MarketingSEO
        title={featureSeo?.title ?? `${feature.label} | TopEdge`}
        description={featureSeo?.description ?? feature.body}
        keywords={featureSeo?.keywords}
        path={`/features/${feature.slug}`}
        noSuffix={Boolean(featureSeo)}
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: feature.title,
            description: featureSeo?.description ?? feature.body,
            path: `/features/${feature.slug}`,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Features', path: '/features' },
            { name: feature.label, path: `/features/${feature.slug}` },
          ]),
        ]}
      />
      <MarketingPage>
        <PageHero eyebrow={feature.label} title={feature.title} subtitle={feature.body} />

        <Section className="!pt-0 !pb-8">
          <div className="mx-auto w-full max-w-5xl px-1">
            <ProductDemoVideo src={videoSrc} label={`${feature.label} product demo`} />
          </div>
        </Section>

        <Section className="!py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mkt-eyebrow !normal-case !tracking-normal text-xl font-medium text-[#0c1222]">
                What you get
              </h2>
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
              <p className="mt-6 text-sm text-slate-500">
                Also see{' '}
                <Link to="/shopify-whatsapp-integration" className="font-medium text-[#7C3AED]">
                  Shopify WhatsApp integration
                </Link>{' '}
                and{' '}
                <Link to="/whatsapp-cart-recovery" className="font-medium text-[#7C3AED]">
                  cart recovery
                </Link>
                .
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="mkt-eyebrow !normal-case !tracking-normal text-xl font-medium text-[#0c1222]">
                Outcomes
              </h2>
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
          <h2 className="mkt-eyebrow mb-6 !normal-case !tracking-normal text-xl font-medium text-[#0c1222]">
            More of the workspace
          </h2>
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
