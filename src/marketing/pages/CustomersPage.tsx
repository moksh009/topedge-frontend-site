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
import HomeTestimonials from '../components/home/HomeTestimonials';
import { PageHero, Section, SectionHeading, MarketingCard } from '../components/ui';

const outcomes = [
  { metric: '+7pp', label: 'Cart recovery lift', detail: 'Email-only → 3-message WhatsApp sequence' },
  { metric: '3→1', label: 'Support tabs', detail: 'Shopify + WA Web + sheets → Live Chat' },
  { metric: '36h', label: 'Template approval', detail: 'Clear Meta feedback → second submit live' },
];

const stories = [
  {
    industry: 'Fashion',
    quote: 'Cart recovery on COD orders changed our month.',
    metric: '22% cart recovery',
    name: 'Rahul K.',
    role: 'Growth, D2C apparel',
  },
  {
    industry: 'Beauty',
    quote: 'Approved flows live in three days with full control.',
    metric: '3 days to go live',
    name: 'Meera S.',
    role: 'Ops, Shopify Plus',
  },
  {
    industry: 'Electronics',
    quote: 'Support handles 4× more chats without new hires.',
    metric: '4× faster response',
    name: 'Ananya R.',
    role: 'Founder',
  },
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

        <Section wash="soft">
          <SectionHeading title="What teams say" />
          <div className="grid gap-6 md:grid-cols-3">
            {stories.map((s) => (
              <MarketingCard key={s.name} className="flex h-full flex-col !p-6">
                <span className="text-[10px] font-medium uppercase tracking-wide text-[#7C3AED]">
                  {s.industry}
                </span>
                <p className="mt-3 text-sm font-medium text-[#7C3AED]">{s.metric}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  &ldquo;{s.quote}&rdquo;
                </p>
                <div className="mt-4 border-t border-violet-100 pt-4">
                  <p className="text-sm font-medium text-slate-900">{s.name}</p>
                  <p className="text-xs text-slate-500">{s.role}</p>
                </div>
              </MarketingCard>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
            Explore how{' '}
            <Link to="/whatsapp-cart-recovery" className="font-medium text-[#7C3AED]">
              WhatsApp cart recovery
            </Link>
            ,{' '}
            <Link to="/cod-confirmation-whatsapp" className="font-medium text-[#7C3AED]">
              COD confirmation
            </Link>
            , and{' '}
            <Link to="/features/live-chat" className="font-medium text-[#7C3AED]">
              Live Chat
            </Link>{' '}
            fit together — or{' '}
            <Link to="/roi" className="font-medium text-[#7C3AED]">
              estimate ROI
            </Link>
            .
          </p>
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
