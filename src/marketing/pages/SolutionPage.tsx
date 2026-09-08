import { useParams, Link } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import ProductDemoVideo from '../components/home/ProductDemoVideo';
import { PageHero, Section, MarketingCard } from '../components/ui';
import { SOLUTION_SEO } from '../data/pageSeo';
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
      />
      <MarketingPage>
        <PageHero eyebrow="Solutions" title={solution.title.replace(/ \| .*$/, '')} subtitle={solution.body} />

        <Section className="!pt-0">
          <div className="mx-auto mb-10 w-full max-w-5xl">
            <ProductDemoVideo src={videoSrc} label={`${slug} solution demo`} />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {solution.bullets.map((b) => (
              <MarketingCard key={b}>
                <p className="text-sm leading-relaxed text-slate-600">{b}</p>
              </MarketingCard>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            Looking for agencies?{' '}
            <Link to="/agency" className="font-medium text-[#7C3AED] hover:underline">
              See agency WhatsApp automation
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
