import { useParams, Link } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import ProductDemoVideo from '../components/home/ProductDemoVideo';
import { PageHero, Section, SectionHeading, MarketingCard } from '../components/ui';
import {
  SOLUTION_SEO,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
import { demoVideoFor } from '../data/productDemoVideos';

const FALLBACK = {
  title: 'WhatsApp Automation for Indian Shopify D2C',
  description:
    'Ecommerce automation on WhatsApp for Shopify India — cart recovery, Live Chat, COD flows, and Meta-safe campaigns.',
  keywords: 'Shopify WhatsApp automation India, ecommerce automation D2C, cart recovery WhatsApp',
  body: 'WhatsApp growth OS for recovery, inbox, and Meta-safe campaigns on Shopify.',
  bullets: ['Shopify sync', 'Journey canvas', 'Live Chat with Customer 360'],
  scene: 'journey' as const,
};

export default function SolutionPage() {
  const { vertical: slug = 'fashion' } = useParams();
  const solution = SOLUTION_SEO[slug] ?? FALLBACK;
  const videoSrc = demoVideoFor(slug) || demoVideoFor(solution.scene);

  return (
    <>
      <MarketingSEO
        title={solution.title}
        description={solution.description}
        keywords={solution.keywords}
        path={`/solutions/${slug}`}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: solution.title.replace(/ \| .*$/, ''),
            description: solution.description,
            path: `/solutions/${slug}`,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Solutions', path: '/features' },
            { name: slug, path: `/solutions/${slug}` },
          ]),
        ]}
      />
      <MarketingPage>
        <PageHero eyebrow="Solutions" title={solution.title.replace(/ \| .*$/, '')} subtitle={solution.body} />

        <Section className="!pt-0">
          <div className="mx-auto mb-10 w-full max-w-5xl">
            <ProductDemoVideo src={videoSrc} label={`${slug} solution demo`} />
          </div>
          <SectionHeading title="What this vertical runs on WhatsApp" />
          <div className="grid gap-5 md:grid-cols-3">
            {solution.bullets.map((b) => (
              <MarketingCard key={b}>
                <h2 className="text-sm font-medium leading-relaxed text-slate-700">{b}</h2>
              </MarketingCard>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            Related:{' '}
            <Link to="/whatsapp-cart-recovery" className="font-medium text-[#7C3AED] hover:underline">
              Cart recovery
            </Link>
            {' · '}
            <Link to="/cod-confirmation-whatsapp" className="font-medium text-[#7C3AED] hover:underline">
              COD confirmation
            </Link>
            {' · '}
            <Link to="/agency" className="font-medium text-[#7C3AED] hover:underline">
              Agencies
            </Link>
          </p>
        </Section>

        <MarketingCtaBand
          title="See TopEdge on your catalog"
          subtitle="Start free — connect Shopify and WhatsApp in about fifteen minutes."
        />
      </MarketingPage>
    </>
  );
}
