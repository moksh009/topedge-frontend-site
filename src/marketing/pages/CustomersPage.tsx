import MarketingSEO from '../components/MarketingSEO';
import {
  PAGE_SEO,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import HomeTestimonials from '../components/home/HomeTestimonials';
import { PageHero, Section, SectionHeading, MarketingCard } from '../components/ui';

const outcomes = [
  { metric: '+7pp', label: 'Cart recovery lift', detail: 'Email-only → 3-message WhatsApp sequence' },
  { metric: '3→1', label: 'Support tabs', detail: 'Shopify + WA Web + sheets → Live Chat' },
  { metric: '36h', label: 'Template approval', detail: 'Clear Meta feedback → second submit live' },
];

export default function CustomersPage() {
  return (
    <>
      <MarketingSEO
        title={PAGE_SEO.customers.title}
        description={PAGE_SEO.customers.description}
        keywords={PAGE_SEO.customers.keywords}
        path={PAGE_SEO.customers.path}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'Customer stories',
            description: PAGE_SEO.customers.description,
            path: PAGE_SEO.customers.path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Customers', path: '/customers' },
          ]),
        ]}
      />
      <MarketingPage>
        <PageHero
          eyebrow="Customers"
          title="Shopify brands growing on WhatsApp automation"
          subtitle="Founders, marketers, and support leads across Indian ecommerce use TopEdge for cart recovery, COD flows, and a shared inbox with order context."
        />
        <Section className="!pt-0">
          <SectionHeading
            title="Outcomes operators care about"
            subtitle="Illustrative results from WhatsApp ecommerce automation workflows TopEdge is designed for."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {outcomes.map((o) => (
              <MarketingCard key={o.label} className="!p-6 text-center">
                <p className="mkt-kpi text-3xl font-medium text-[#7C3AED]">{o.metric}</p>
                <p className="mt-2 font-medium text-[#0c1222]">{o.label}</p>
                <p className="mt-2 text-sm text-slate-500">{o.detail}</p>
              </MarketingCard>
            ))}
          </div>
        </Section>

        <HomeTestimonials hideHeader={false} />
        <MarketingCtaBand
          title="Run the same playbook on your store"
          subtitle="Start free — connect Shopify and WhatsApp, approve templates, publish your first journey."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
