import MarketingSEO from '../components/MarketingSEO';
import { PAGE_SEO, organizationJsonLd, breadcrumbJsonLd, webPageJsonLd } from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { PageHero, Section, SectionHeading, MarketingCard } from '../components/ui';
import { Link } from 'react-router-dom';
import { COMPARE_COMPETITORS } from '../data/compareCompetitors';

const compares = [
  {
    vs: 'WhatsApp Web alone',
    body: 'No Shopify order context, no Meta template library, no recovery journeys — just chat tabs.',
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

const competitors = Object.values(COMPARE_COMPETITORS);

export default function CompareIndexPage() {
  return (
    <>
      <MarketingSEO
        title={PAGE_SEO.compare.title}
        description={PAGE_SEO.compare.description}
        keywords={PAGE_SEO.compare.keywords}
        path={PAGE_SEO.compare.path}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'Compare TopEdge',
            description: PAGE_SEO.compare.description,
            path: PAGE_SEO.compare.path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Compare', path: '/compare' },
          ]),
        ]}
      />
      <MarketingPage>
        <PageHero
          eyebrow="Compare"
          title="TopEdge vs WhatsApp Web, chatbots & popular BSPs"
          subtitle="If you already live in WhatsApp and Shopify, TopEdge closes the gap between them — with cart recovery, COD, and Meta-safe campaigns."
        />
        <Section className="!pt-0">
          <SectionHeading title="Quick contrasts" />
          <div className="grid gap-5 md:grid-cols-3">
            {compares.map((c) => (
              <MarketingCard key={c.vs} className="!p-6">
                <p className="text-sm text-slate-400">vs</p>
                <h2 className="mt-1 text-lg font-medium text-[#0c1222]">{c.vs}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{c.body}</p>
              </MarketingCard>
            ))}
          </div>
        </Section>

        <Section wash="soft">
          <SectionHeading
            title="Named comparisons"
            subtitle="Deep dives for teams evaluating WhatsApp automation tools for Shopify India."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {competitors.map((c) => (
              <Link key={c.slug} to={`/compare/${c.slug}`} className="block">
                <MarketingCard className="!p-6 h-full transition hover:border-[#c4b5fd]">
                  <h2 className="text-lg font-medium text-[#0c1222]">TopEdge vs {c.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{c.subtitle}</p>
                  <p className="mt-4 text-sm font-medium text-[#7C3AED]">Read comparison →</p>
                </MarketingCard>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            Prefer a guided walkthrough?{' '}
            <Link to="/contact" className="font-medium text-[#7C3AED]">
              Talk to us
            </Link>
            {' · '}
            <Link to="/whatsapp-cart-recovery" className="font-medium text-[#7C3AED]">
              Cart recovery
            </Link>
            {' · '}
            <Link to="/shopify-whatsapp-integration" className="font-medium text-[#7C3AED]">
              Shopify integration
            </Link>
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
