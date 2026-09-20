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
import HomeTrust from '../components/home/HomeTrust';
import '../styles/customers.css';

const outcomes = [
  {
    pose: 'left' as const,
    metric: 'Live',
    label: 'With real D2C brands',
    detail: 'Choice Salon, Delitech, Apex Light, and peers run WhatsApp recovery on TopEdge',
    image: '/marketing/customers/customers-outcome-cart.png',
  },
  {
    pose: 'center' as const,
    metric: 'Trusted',
    label: 'By support + growth',
    detail: 'One shared inbox so agents and marketers stop fighting over tabs and sheets',
    image: '/marketing/customers/customers-outcome-inbox.png',
  },
  {
    pose: 'right' as const,
    metric: 'Kept',
    label: 'As the client stack',
    detail: 'Teams stay after templates clear and the first cart journey goes live',
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
          <h1 className="mkt-customers__title">
            Shopify brands recovering carts on{' '}
            <span className="mkt-customers__title-accent">WhatsApp</span>
          </h1>
          <p className="mkt-customers__sub">
            Indian D2C teams use TopEdge to recover abandoned carts, confirm COD, and answer
            buyers in one inbox, with Shopify order context.
          </p>
          <div className="mkt-customers__trust">
            <HomeTrust onStage />
          </div>
        </header>

        <section className="mkt-customers__outcomes" aria-label="Why brands trust TopEdge">
          <div className="mkt-customers__fan" role="list">
            {outcomes.map((o) => (
              <article
                key={o.label}
                className={`mkt-customers__card is-${o.pose}`}
                role="listitem"
              >
                <div className="mkt-customers__art">
                  <img
                    src={o.image}
                    alt={`${o.label}: ${o.metric}`}
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
          title="Get the same cart recovery on your store"
          subtitle="Start free, connect Shopify + WhatsApp, approve templates, publish your first journey."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
