import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
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
import CustomerReviewWall from '../components/CustomerReviewWall';
import ProofBadges from '../components/ProofBadges';
import { PrimaryButton, GhostButton } from '../components/ui';
import { CUSTOMER_STORIES, TRUSTPILOT, PRODUCT_HUNT } from '../data/socialProof';
import '../styles/customers.css';

/**
 * The credentials strip under the hero.
 *
 * Every item is something a reader can go and verify in one click, which is
 * the only kind of trust mark worth printing. No "10,000+ businesses", no
 * invented uptime figure: two review platforms with their own scores, and the
 * three programmes whose badges we are actually entitled to show.
 */
const CREDENTIALS = [
  {
    img: '/badges/meta-business-partner.png',
    alt: 'Meta Business Partner',
    label: 'Meta Business Partner',
    detail: 'WhatsApp Cloud API, direct from Meta',
  },
  {
    img: '/badges/shopify-app-store.png',
    alt: 'Available on the Shopify App Store',
    label: 'On the Shopify App Store',
    detail: 'One-click OAuth, reviewed by Shopify',
  },
  {
    img: '/badges/whatsapp-cloud-api.png',
    alt: 'WhatsApp Business Platform',
    label: 'WhatsApp Business Platform',
    detail: 'Official templates, no unofficial bridges',
  },
] as const;

/**
 * What every rollout is, stated as the work rather than as a result.
 *
 * Each step links to the page that documents it, so the section doubles as
 * internal linking into the feature hub instead of being a decorative
 * three-up that goes nowhere.
 */
const ROLLOUT = [
  {
    step: 'Connect',
    title: 'Shopify and WhatsApp Cloud API, in one session',
    detail:
      'OAuth into Shopify, add your Meta WhatsApp credentials, and carts, orders and COD status start syncing. No developer, no middleware.',
    to: '/shopify-whatsapp-integration',
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

function CaseStudy({ story }: { story: (typeof CUSTOMER_STORIES)[number] }) {
  return (
    <article className="mkt-story" aria-labelledby={`case-${story.slug}`}>
      <header className="mkt-story__cover" style={{ '--tint': story.tint } as CSSProperties}>
        <span className="mkt-story__tile">
          <img
            src={story.logoColor ?? story.logo}
            alt={story.name}
            width={56}
            height={56}
            loading="lazy"
            decoding="async"
          />
        </span>
        <span className="mkt-story__ident">
          <b>{story.name}</b>
          <span>{story.category}</span>
        </span>
      </header>

      <div className="mkt-story__body">
        <h3 className="mkt-story__headline" id={`case-${story.slug}`}>
          {story.headline}
        </h3>

        <blockquote className="mkt-story__quote">
          <p>{story.quote}</p>
        </blockquote>

        <footer className="mkt-story__attrib">
          <span className="mkt-story__avatar" aria-hidden>
            {story.person.trim().charAt(0)}
          </span>
          <span className="mkt-story__who">
            <b>{story.person}</b>
            <span>{story.role}</span>
          </span>
        </footer>

        <ul className="mkt-story__facts">
          {story.facts.map((f) => (
            <li key={f}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        {story.href ? (
          <a
            className="mkt-story__site"
            href={story.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit {story.name}
            <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
          </a>
        ) : null}
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
            How Indian Shopify brands recover carts and confirm COD on{' '}
            <span className="mkt-hl">WhatsApp</span>
          </h1>

          <div className="mkt-customers__actions">
            <PrimaryButton to="/signup">Start free</PrimaryButton>
            <GhostButton to="/pricing">See pricing</GhostButton>
          </div>

          <div className="mkt-customers__score">
            <ProofBadges compact />
          </div>

          <p className="mkt-customers__rating">
            Rated {TRUSTPILOT.score} out of 5 from {TRUSTPILOT.reviews} Trustpilot reviews, and{' '}
            {PRODUCT_HUNT.rating} out of 5 from {PRODUCT_HUNT.reviews} on Product Hunt.
          </p>

          <div className="mkt-customers__trust">
            <HomeTrust onStage />
          </div>
        </header>

        <section className="mkt-customers__creds" aria-label="Platform credentials">
          <ul className="mkt-creds">
            {CREDENTIALS.map((c) => (
              <li className="mkt-creds__item" key={c.label}>
                <img
                  className="mkt-creds__badge"
                  src={c.img}
                  alt={c.alt}
                  height={34}
                  loading="lazy"
                  decoding="async"
                />
                <span className="mkt-creds__text">
                  <b>{c.label}</b>
                  <span>{c.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mkt-customers__cases" aria-labelledby="customers-cases-head">
          <header className="mkt-sec-head">
            <h2 className="mkt-sec-head__title" id="customers-cases-head">
              Shopify stores already <span className="mkt-hl">running this</span>
            </h2>
            <p className="mkt-sec-head__sub">
              Two D2C catalogs, the same stack: abandoned cart recovery, COD confirmation before
              dispatch, and one shared inbox carrying Shopify order context.
            </p>
          </header>

          <div className="mkt-customers__case-grid">
            {CUSTOMER_STORIES.map((story) => (
              <CaseStudy key={story.slug} story={story} />
            ))}
          </div>
        </section>

        <section className="mkt-customers__rollout" aria-labelledby="customers-rollout-head">
          <header className="mkt-sec-head">
            <h2 className="mkt-sec-head__title" id="customers-rollout-head">
              What a rollout <span className="mkt-hl">actually looks like</span>
            </h2>
            <p className="mkt-sec-head__sub">
              The same three steps for every brand on this page, whether the catalog is lighting or
              smart home hardware.
            </p>
          </header>

          <ol className="mkt-steps-row">
            {ROLLOUT.map((r, i) => (
              <li className="mkt-steps-row__item" key={r.step}>
                <p className="mkt-steps-row__n">
                  <span aria-hidden>{String(i + 1).padStart(2, '0')}</span> {r.step}
                </p>
                <h3 className="mkt-steps-row__title">{r.title}</h3>
                <p className="mkt-steps-row__detail">{r.detail}</p>
                <Link className="mkt-steps-row__link" to={r.to}>
                  {r.linkLabel}
                  <ArrowUpRight size={13} strokeWidth={2} aria-hidden />
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <div className="mkt-customers__reviews">
          <CustomerReviewWall />
        </div>

        <MarketingCtaBand
          title="Run the same cart recovery on your store"
          subtitle="Connect Shopify and WhatsApp, approve your templates, publish the first journey. Start free."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
