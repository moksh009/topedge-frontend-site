import { Link } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import {
  PAGE_SEO,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { PageHero, Section, SectionHeading, MarketingCard } from '../components/ui';

const points = [
  {
    t: 'You own Meta approvals',
    d: 'Templates never send until Meta marks them APPROVED. TopEdge surfaces status — it does not bypass your review.',
  },
  {
    t: 'Shopify is source of truth',
    d: 'Catalog, carts, and orders sync from your store. Change products and policies in Shopify / the dashboard.',
  },
  {
    t: 'Tenant isolation',
    d: 'Workspace data is scoped to your account. Operators authenticate through the TopEdge dashboard.',
  },
  {
    t: 'Transparent Meta costs',
    d: 'Utility and marketing rates are shown plainly. We pass through Meta fees without markup.',
  },
];

export default function SecurityPage() {
  return (
    <>
      <MarketingSEO
        title={PAGE_SEO.security.title}
        description={PAGE_SEO.security.description}
        keywords={PAGE_SEO.security.keywords}
        path={PAGE_SEO.security.path}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'Security',
            description: PAGE_SEO.security.description,
            path: PAGE_SEO.security.path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Security', path: '/security' },
          ]),
        ]}
      />
      <MarketingPage>
        <PageHero
          eyebrow="Security & trust"
          title="Operator control first — especially on WhatsApp"
          subtitle="WhatsApp is high-trust. TopEdge is built so merchants stay in charge of templates, sends, and store data."
        />
        <Section className="!pt-0">
          <SectionHeading
            title="How we protect Shopify WhatsApp automation"
            subtitle="Practical controls for Indian ecommerce teams running Meta Cloud API messaging."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {points.map((p) => (
              <MarketingCard key={p.t} className="!p-6">
                <h2 className="font-medium text-[#0c1222]">{p.t}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{p.d}</p>
              </MarketingCard>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
            Questions about data handling?{' '}
            <Link to="/contact" className="font-medium text-[#7C3AED]">
              Contact us
            </Link>{' '}
            or review{' '}
            <Link to="/privacy" className="font-medium text-[#7C3AED]">
              privacy
            </Link>
            .
          </p>
        </Section>
        <MarketingCtaBand
          title="Run WhatsApp with clear controls"
          subtitle="Start free — approve every template before anything sends."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
