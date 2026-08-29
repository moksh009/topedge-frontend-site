import { useParams } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import FeatureScene from '../components/foundation/FeatureScene';
import { PageHero, Section, MarketingCard } from '../components/ui';
import '../styles/feature-scenes.css';

const SOLUTIONS: Record<
  string,
  { title: string; body: string; bullets: string[]; scene: 'journey' | 'inbox' | 'campaigns' }
> = {
  fashion: {
    title: 'Fashion & apparel on WhatsApp',
    body: 'Size exchanges, COD confirmations, and cart recovery ,  with Shopify order context in every thread.',
    bullets: [
      'Cart recovery with size/variant aware copy',
      'Live Chat beside order # and COD status',
      'Campaigns for drop weekends ,  Meta-approved only',
    ],
    scene: 'inbox',
  },
  beauty: {
    title: 'Beauty & skincare that converts on chat',
    body: 'Catalog-grounded answers, serum cart recovery, and journeys that respect Indian COD habits.',
    bullets: [
      'AI Brain cites live SKUs and ₹ prices',
      '3-message recovery with product cards',
      'IG comment → DM for “price please?”',
    ],
    scene: 'journey',
  },
  cod: {
    title: 'COD-first brands, without the chaos',
    body: 'Confirm COD, reduce RTO risk, and keep recovery honest ,  utility templates, clear status, operator takeover.',
    bullets: [
      'COD conditions inside Journey canvas',
      'Inbox shows COD pending beside the thread',
      'Transparent Meta utility rates on pricing',
    ],
    scene: 'campaigns',
  },
};

export default function SolutionPage() {
  const { slug = 'fashion' } = useParams();
  const solution = SOLUTIONS[slug] ?? {
    title: 'Built for Indian Shopify D2C',
    body: 'WhatsApp growth OS for recovery, inbox, and Meta-safe campaigns.',
    bullets: ['Shopify sync', 'Journey canvas', 'Live Chat with Customer 360'],
    scene: 'journey' as const,
  };

  return (
    <>
      <MarketingSEO
        title={`${solution.title} | TopEdge`}
        description={solution.body}
        path={`/solutions/${slug}`}
      />
      <MarketingPage>
        <PageHero eyebrow="Solutions" title={solution.title} subtitle={solution.body} />
        <Section className="!pt-0">
          <div className="mx-auto max-w-4xl">
            <FeatureScene variant={solution.scene} />
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4">
            {solution.bullets.map((b) => (
              <MarketingCard key={b} className="!p-5">
                <p className="text-sm text-slate-600">{b}</p>
              </MarketingCard>
            ))}
          </div>
        </Section>
        <MarketingCtaBand
          title="See TopEdge on your catalog"
          subtitle="Start free ,  connect Shopify and WhatsApp in about fifteen minutes."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
