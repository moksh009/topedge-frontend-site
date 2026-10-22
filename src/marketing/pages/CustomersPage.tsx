import { ArrowUpRight } from 'lucide-react';
import MarketingSEO from '../components/MarketingSEO';
import {
  PAGE_SEO,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import HomeTrust from '../components/home/HomeTrust';
import TrustpilotProof, { TrustpilotScore } from '../components/TrustpilotProof';
import { CUSTOMER_STORIES } from '../data/socialProof';
import '../styles/customers.css';

/**
 * What every customer gets, stated as the work rather than as a result.
 *
 * The three claims that used to sit here — "Live", "Trusted", "Kept" — were
 * adjectives with nothing behind them, fanned out as three overlapping cards
 * that cropped their own text. These are the things the product actually does
 * on day one, and each one links to the page that documents it.
 */
const ROLLOUT = [
  {
    step: 'Connect',
    title: 'Shopify and WhatsApp Cloud API, in one session',
    detail:
      'OAuth into Shopify, add your Meta WhatsApp credentials, and carts, orders and COD status start syncing. No developer, no middleware.',
    to: '/integrations',
    linkLabel: 'How the integration works',
  },
  {
    step: 'Approve',
    title: 'Meta templates, cleared before anything sends',
    detail:
      'Templates go to Meta for review and nothing reaches a buyer until they come back APPROVED. Most brands clear review in 24 to 48 hours.',
    to: '/features/journeys',
    linkLabel: 'See the journey builder',
  },
  {
    step: 'Recover',
    title: 'Carts, COD confirms and replies in one inbox',
    detail:
      'Abandoned cart journeys run on their own, COD orders get confirmed before dispatch, and every reply lands in a shared inbox with the order beside it.',
    to: '/features/cod-confirmation',
    linkLabel: 'See COD confirmation',
  },
] as const;

function CaseStudy({ story, index }: { story: (typeof CUSTOMER_STORIES)[number]; index: number }) {
  return (
    <article
      className={`mkt-case${index % 2 ? ' mkt-case--flip' : ''}`}
      aria-labelledby={`case-${story.slug}`}
    >
      <div className="mkt-case__body">
        <div className="mkt-case__brand">
          <img
            className="mkt-case__logo"
            src={story.logo}
            alt={story.name}
            height={26}
            loading="lazy"
            decoding="async"
          />
          <span className="mkt-case__category">{story.category}</span>
        </div>

        <h3 className="mkt-case__headline" id={`case-${story.slug}`}>
          {story.headline}
        </h3>

        <blockquote className="mkt-case__quote">
          <p>{story.quote}</p>
          <footer className="mkt-case__attrib">
            <span className="mkt-case__person">{story.person}</span>
            <span className="mkt-case__role">{story.role}</span>
          </footer>
        </blockquote>

        <ul className="mkt-case__facts">
          {story.facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        {story.href ? (
          <a
            className="mkt-case__site"
            href={story.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit {story.name}
            <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
          </a>
        ) : null}
      </div>

      {/* The mark has to sit on the <img> itself, not only on this wrapper:
          scripts/seo-head-audit.mjs reads the tag, and an alt="" with nothing
          on it is indistinguishable from a missing one. */}
      <div className="mkt-case__art" aria-hidden>
        <img
          src={story.art}
          alt=""
          aria-hidden
          width={320}
          height={320}
          loading="lazy"
          decoding="async"
        />
      </div>
    </article>
  );
}

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
            How Indian Shopify brands recover carts and cut COD RTO on{' '}
            <span className="mkt-customers__title-accent">WhatsApp</span>
          </h1>
          <p className="mkt-customers__sub">
            Indian D2C teams use TopEdge for WhatsApp abandoned cart recovery, COD confirmation
            before dispatch, and one shared inbox that carries Shopify order context.
          </p>
          <div className="mkt-customers__score">
            <TrustpilotScore compact />
          </div>
          <div className="mkt-customers__trust">
            <HomeTrust onStage />
          </div>
        </header>

        <section className="mkt-customers__cases" aria-labelledby="customers-cases-head">
          <h2 className="sr-only" id="customers-cases-head">
            Customer stories
          </h2>
          {CUSTOMER_STORIES.map((story, i) => (
            <CaseStudy key={story.slug} story={story} index={i} />
          ))}
        </section>

        <section className="mkt-customers__rollout" aria-labelledby="customers-rollout-head">
          <header className="mkt-customers__sec-head">
            <h2 className="mkt-customers__sec-title" id="customers-rollout-head">
              What a rollout actually looks like
            </h2>
            <p className="mkt-customers__sec-sub">
              The same three steps for every brand on this page, whether the catalog is lighting
              or smart home hardware.
            </p>
          </header>
          <ol className="mkt-customers__steps">
            {ROLLOUT.map((r, i) => (
              <li className="mkt-customers__step" key={r.step}>
                <p className="mkt-customers__step-n">
                  <span aria-hidden>{String(i + 1).padStart(2, '0')}</span> {r.step}
                </p>
                <h3 className="mkt-customers__step-title">{r.title}</h3>
                <p className="mkt-customers__step-detail">{r.detail}</p>
                <a className="mkt-customers__step-link" href={r.to}>
                  {r.linkLabel}
                  <ArrowUpRight size={13} strokeWidth={2} aria-hidden />
                </a>
              </li>
            ))}
          </ol>
        </section>

        <div className="mkt-customers__reviews">
          <TrustpilotProof
            heading="In their own words"
            intro="Published under their own names on Trustpilot, quoted as written."
          />
        </div>

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
