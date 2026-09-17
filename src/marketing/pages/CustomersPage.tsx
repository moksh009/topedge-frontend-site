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
import '../styles/customers.css';

const outcomes = [
  {
    pose: 'left' as const,
    metric: '+7pp',
    label: 'Cart recovery lift',
    detail: 'Email-only → 3-message WhatsApp sequence',
    image: '/marketing/customers/customers-outcome-cart.png',
  },
  {
    pose: 'center' as const,
    metric: '3→1',
    label: 'Support tabs',
    detail: 'Shopify + WA Web + sheets → Live Chat',
    image: '/marketing/customers/customers-outcome-inbox.png',
  },
  {
    pose: 'right' as const,
    metric: '36h',
    label: 'Template approval',
    detail: 'Clear Meta feedback → second submit live',
    image: '/marketing/customers/customers-outcome-template.png',
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
      <MarketingPage className="mkt-customers">
        <header className="mkt-customers__hero">
          <p className="mkt-customers__eyebrow">Customers</p>
          <h1 className="mkt-customers__title">
            Shopify brands growing on{' '}
            <span className="mkt-customers__title-accent">WhatsApp automation</span>
          </h1>
          <p className="mkt-customers__sub">
            Founders, marketers, and support leads across Indian ecommerce use TopEdge for cart
            recovery, COD flows, and a shared inbox with order context.
          </p>
        </header>

        <section className="mkt-customers__outcomes" aria-label="Customer outcomes">
          <div className="mkt-customers__fan" role="list">
            {outcomes.map((o) => (
              <article
                key={o.label}
                className={`mkt-customers__card is-${o.pose}`}
                role="listitem"
              >
                <div className="mkt-customers__art" aria-hidden>
                  <img
                    src={o.image}
                    alt=""
                    width={160}
                    height={160}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="mkt-customers__metric">{o.metric}</p>
                <h3 className="mkt-customers__label">{o.label}</h3>
                <p className="mkt-customers__detail">{o.detail}</p>
              </article>
            ))}
          </div>
        </section>

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
