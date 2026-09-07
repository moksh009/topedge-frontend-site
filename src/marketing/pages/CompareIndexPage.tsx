import MarketingSEO from '../components/MarketingSEO';
import { PAGE_SEO } from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { PageHero, Section, MarketingCard } from '../components/ui';
import { Link } from 'react-router-dom';

const compares = [
  {
    vs: 'WhatsApp Web alone',
    body: 'No Shopify order context, no Meta template library, no recovery journeys ,  just chat tabs.',
  },
  {
    vs: 'Generic chatbot builders',
    body: 'TopEdge is India Shopify + Meta first: COD, ₹, utility rates, and template gates built in.',
  },
  {
    vs: 'Email-only recovery',
    body: 'Three WhatsApp nudges with approved templates beat another abandoned-cart email.',
  },
];

export default function CompareIndexPage() {
  return (
    <>
      <MarketingSEO
        title={PAGE_SEO.compare.title}
        description={PAGE_SEO.compare.description}
        keywords={PAGE_SEO.compare.keywords}
        path={PAGE_SEO.compare.path}
        noSuffix
      />
      <MarketingPage>
        <PageHero
          eyebrow="Compare"
          title="Built for Shopify India WhatsApp ,  not another generic inbox"
          subtitle="If you already live in WhatsApp and Shopify, TopEdge closes the gap between them."
        />
        <Section className="!pt-0">
          <div className="grid gap-5 md:grid-cols-3">
            {compares.map((c) => (
              <MarketingCard key={c.vs} className="!p-6">
                <p className="text-sm text-slate-400">vs</p>
                <p className="mt-1 font-medium text-[#0c1222]">{c.vs}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{c.body}</p>
              </MarketingCard>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            Prefer a guided walkthrough?{' '}
            <Link to="/contact" className="font-medium text-[#7C3AED]">
              Talk to us
            </Link>
            .
          </p>
        </Section>
        <MarketingCtaBand
          title="See the full product"
          subtitle="Features, pricing, and a free trial that includes real message volume."
          primaryLabel="Explore features"
          primaryTo="/features"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
