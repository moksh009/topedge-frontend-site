import MarketingSEO from '../components/MarketingSEO';
import { PAGE_SEO } from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { PageHero, Section, MarketingCard } from '../components/ui';

export default function AgencyPage() {
  return (
    <>
      <MarketingSEO
        title={PAGE_SEO.agency.title}
        description={PAGE_SEO.agency.description}
        keywords={PAGE_SEO.agency.keywords}
        path={PAGE_SEO.agency.path}
        noSuffix
      />
      <MarketingPage>
        <PageHero
          eyebrow="Agencies"
          title="Operate WhatsApp for the brands you manage"
          subtitle="Standardize cart recovery, template hygiene, and inbox ops across clients ,  without rebuilding from scratch each time."
        />
        <Section className="!pt-0">
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
                d: 'Recovery ₹ and Meta costs clients can understand ,  not vanity dashboards.',
              },
            ].map((c) => (
              <MarketingCard key={c.t} className="!p-6">
                <p className="font-medium text-[#0c1222]">{c.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{c.d}</p>
              </MarketingCard>
            ))}
          </div>
        </Section>
        <MarketingCtaBand
          title="Talk agency / DFY"
          subtitle="Tell us how many brands you run ,  we’ll map DIY vs DFY."
          primaryLabel="Contact sales"
          primaryTo="/contact"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
