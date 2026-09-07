import MarketingSEO from '../components/MarketingSEO';
import { PAGE_SEO } from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { PageHero, Section, MarketingCard } from '../components/ui';

const points = [
  {
    t: 'You own Meta approvals',
    d: 'Templates never send until Meta marks them APPROVED. TopEdge surfaces status ,  it does not bypass your review.',
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
      />
      <MarketingPage>
        <PageHero
          eyebrow="Security & trust"
          title="Operator control first ,  especially on WhatsApp"
          subtitle="WhatsApp is high-trust. TopEdge is built so merchants stay in charge of templates, sends, and store data."
        />
        <Section className="!pt-0">
          <div className="grid gap-5 md:grid-cols-2">
            {points.map((p) => (
              <MarketingCard key={p.t} className="!p-6">
                <p className="font-medium text-[#0c1222]">{p.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{p.d}</p>
              </MarketingCard>
            ))}
          </div>
        </Section>
        <MarketingCtaBand
          title="Questions about data or access?"
          subtitle="Reach the team ,  we’ll walk through how your workspace is scoped."
          primaryLabel="Contact us"
          primaryTo="/contact"
          secondaryLabel="Start free"
          secondaryTo="/signup"
        />
      </MarketingPage>
    </>
  );
}
