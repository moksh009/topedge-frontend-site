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

export default function AgencyPage() {
  return (
    <>
      <MarketingSEO
        title={PAGE_SEO.agency.title}
        description={PAGE_SEO.agency.description}
        keywords={PAGE_SEO.agency.keywords}
        path={PAGE_SEO.agency.path}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'Agencies',
            description: PAGE_SEO.agency.description,
            path: PAGE_SEO.agency.path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Agencies', path: '/agency' },
          ]),
        ]}
      />
      <MarketingPage>
        <PageHero
          eyebrow="Agencies"
          title="Operate WhatsApp for the brands you manage"
          subtitle="Standardize cart recovery, template hygiene, and inbox ops across clients — without rebuilding from scratch each time."
        />
        <Section className="!pt-0">
          <SectionHeading
            title="Agency WhatsApp automation on Shopify"
            subtitle="Productize DFY recovery and Meta-safe campaigns for every client store."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                t: 'Repeatable journeys',
                d: 'COD recovery and order updates as canvas templates you adapt per client.',
              },
              {
                t: 'DFY partnership',
                d: 'Need us to ship flows and campaigns? DFY plans put TopEdge operators on your calendar.',
              },
              {
                t: 'Honest reporting',
                d: 'Recovery ₹ and Meta costs clients can understand — not vanity dashboards.',
              },
            ].map((c) => (
              <MarketingCard key={c.t} className="!p-6">
                <h2 className="font-medium text-[#0c1222]">{c.t}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{c.d}</p>
              </MarketingCard>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
            Read the{' '}
            <Link to="/blog/agencies-whatsapp-automation-multi-brand-shopify" className="font-medium text-[#7C3AED]">
              multi-brand agency playbook
            </Link>{' '}
            or start from{' '}
            <Link to="/whatsapp-cart-recovery" className="font-medium text-[#7C3AED]">
              cart recovery
            </Link>
            .
          </p>
        </Section>
        <MarketingCtaBand
          title="Pitch TopEdge on your next retainer"
          subtitle="Start free on a client store — or talk DFY setup with our team."
          primaryLabel="Start free"
          secondaryLabel="Contact DFY"
          secondaryTo="/contact"
        />
      </MarketingPage>
    </>
  );
}
