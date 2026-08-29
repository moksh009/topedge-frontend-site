import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import HomeTestimonials from '../components/home/HomeTestimonials';
import { PageHero, Section, MarketingCard } from '../components/ui';

const outcomes = [
  { metric: '+7pp', label: 'Cart recovery lift', detail: 'Email-only → 3-message WhatsApp sequence' },
  { metric: '3→1', label: 'Support tabs', detail: 'Shopify + WA Web + sheets → Live Chat' },
  { metric: '36h', label: 'Template approval', detail: 'Clear Meta feedback → second submit live' },
];

export default function CustomersPage() {
  return (
    <>
      <MarketingSEO
        title="Customers | TopEdge"
        description="How Indian Shopify brands use TopEdge for WhatsApp cart recovery, inbox, and Meta-safe campaigns."
        path="/customers"
      />
      <MarketingPage>
        <PageHero
          eyebrow="Customers"
          title="Built for operators who live in WhatsApp and Shopify"
          subtitle="Outcomes below reflect the workflows TopEdge is designed for ,  recovery, inbox, and honest Meta messaging for Indian D2C."
        />
        <Section className="!pt-0">
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
          subtitle="Start free ,  connect Shopify and WhatsApp, approve templates, publish your first journey."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
