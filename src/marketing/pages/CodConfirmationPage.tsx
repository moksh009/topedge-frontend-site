import { Link } from 'react-router-dom';
import { ArrowRight, Check, Minus } from 'lucide-react';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import FeatureMeshStage from '../components/effects/FeatureMeshStage';
import { PrimaryButton, GhostButton } from '../components/ui';
import { organizationJsonLd, breadcrumbJsonLd, webPageJsonLd } from '../data/pageSeo';
import { featurePagesModifiedIso } from '../data/contentDates';
import { FALLBACK_CATALOG, GST_FOOTNOTE, TRIAL } from '../lib/billingCatalog';
import '../styles/product-feature.css';
import '../styles/cod-confirmation.css';

const PATH = '/features/cod-confirmation';

const SEO_TITLE = 'WhatsApp COD Confirmation for Shopify India | TopEdge AI';
const SEO_DESCRIPTION =
  'Confirm every COD order on WhatsApp before dispatch. Cut fake orders and RTO. Growth plan adds COD-to-prepaid links. 14-day free trial, no card.';

const STEPS = [
  {
    title: 'A COD order is placed on your store',
    body: 'Shopify tells TopEdge as soon as a Cash on Delivery order is created.',
  },
  {
    title: 'TopEdge asks the buyer to confirm',
    body: 'A WhatsApp message goes out with Confirm and Cancel buttons, using a Meta-approved template.',
  },
  {
    title: 'You act on the reply',
    body: 'Confirmed orders move on to dispatch. No-reply orders can be followed up or held, according to your flow.',
  },
] as const;

const FAQS = [
  {
    question: 'How do I confirm COD orders on WhatsApp in Shopify?',
    answer:
      'Connect Shopify and WhatsApp, then publish a journey that triggers on new COD orders and sends an approved template with Confirm and Cancel buttons. The step-by-step setup is in the COD confirmation guide in our docs.',
  },
  {
    question: 'Does COD confirmation reduce RTO?',
    answer:
      'It helps you ship fewer orders that were never going to be accepted, such as impulse, duplicate or mistaken orders. It cannot fix RTO caused by failed deliveries or wrong addresses, so measure your own before-and-after rather than trusting a headline number.',
  },
  {
    question: 'What happens if the customer does not reply?',
    answer:
      'You decide. Send one follow-up, then hold the order, call the buyer or dispatch anyway, according to the rule you set in your journey.',
  },
  {
    question: 'Can I convert COD orders to prepaid on WhatsApp?',
    answer:
      'Yes, on the Growth and Scale plans. TopEdge can send a WhatsApp payment link, created from a Shopify draft invoice, so the buyer can pay instead of waiting for cash on delivery. Launch includes basic COD confirmation only.',
  },
  {
    question: 'Do I need WhatsApp Business API approval?',
    answer:
      'You connect your own WhatsApp Business account through Meta, and every message template must be approved by Meta before it can send. TopEdge blocks journeys from sending templates that are not yet approved.',
  },
  {
    question: 'How much does COD confirmation cost?',
    answer:
      `Basic COD confirmation is included on every plan, from ${FALLBACK_CATALOG.plans[0].monthlyPriceLabel} a month plus GST on monthly billing. Meta charges its own per-message WhatsApp fees directly on your Meta account, and TopEdge adds 0% markup to them.`,
  },
] as const;

const LIMITS = [
  'It confirms intent. It does not predict which buyers are risky.',
  'Buyers who never reply need your follow-up rule. Decide it before you switch the journey on.',
  'WhatsApp templates must be approved by Meta before they send.',
  "Meta's per-message fees are separate from your TopEdge plan.",
];

const READING = [
  { label: 'COD confirmation setup guide', href: '/docs/guides/cod-confirmation' },
  { label: 'Journeys: the visual builder behind it', href: '/features/journeys' },
  { label: 'Profit & costs: measure your own RTO', href: '/features/profit-loss' },
  {
    label: 'COD confirmation on WhatsApp for Shopify',
    href: '/blog/cod-confirmation-whatsapp-reduce-rto-shopify',
  },
  {
    label: 'How to reduce RTO on Shopify COD orders',
    href: '/blog/how-to-reduce-rto-with-whatsapp-cod-confirmation',
  },
  { label: 'COD and RTO benchmarks for India', href: '/blog/cod-rto-benchmark-india-2026' },
];

function yearlyMonthly(plan: (typeof FALLBACK_CATALOG.plans)[number]) {
  return plan.pricing.yearly?.effectiveMonthlyLabel ?? plan.monthlyPriceLabel;
}

function Mark({ on }: { on: boolean }) {
  return on ? (
    <span className="mkt-cod__mark is-on">
      <Check className="h-4 w-4" aria-hidden />
      <span className="mkt-cod__sr">Included</span>
    </span>
  ) : (
    <span className="mkt-cod__mark is-off">
      <Minus className="h-4 w-4" aria-hidden />
      <span className="mkt-cod__sr">Not included</span>
    </span>
  );
}

export default function CodConfirmationPage() {
  const plans = FALLBACK_CATALOG.plans;
  const modifiedIso = featurePagesModifiedIso();

  return (
    <>
      <MarketingSEO
        title={SEO_TITLE}
        description={SEO_DESCRIPTION}
        keywords="WhatsApp COD confirmation Shopify, COD confirmation WhatsApp India, reduce RTO Shopify, COD to prepaid WhatsApp, cash on delivery confirmation automation"
        path={PATH}
        noSuffix
        faqSchema={FAQS.map((f) => ({ question: f.question, answer: f.answer }))}
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'WhatsApp COD confirmation for Shopify',
            description: SEO_DESCRIPTION,
            path: PATH,
            dateModified: modifiedIso,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Features', path: '/features' },
            { name: 'COD confirmation', path: PATH },
          ]),
        ]}
      />
      <MarketingPage className="mkt-pf mkt-cod">
        <FeatureMeshStage mesh="journeys">
          <header className="mkt-pf__hero">
            <h1 className="mkt-pf__title">
              Confirm every COD order on WhatsApp{' '}
              <span className="mkt-pf__title-accent">before it ships</span>
            </h1>
            <p className="mkt-pf__sub">
              A returned COD parcel costs you shipping both ways and a lost sale. TopEdge messages
              the buyer on WhatsApp as soon as a COD order lands, asks them to confirm, and lets
              you ship only what they confirm.
            </p>
            <div className="mkt-cod__actions">
              <PrimaryButton to="/signup">
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <GhostButton to="/pricing">See pricing</GhostButton>
            </div>
            <p className="mkt-cod__micro">
              {TRIAL.days} days, {TRIAL.orders} orders, no card.
            </p>
          </header>

          <section className="mkt-cod__stage" aria-label="Example COD confirmation message">
            <figure className="mkt-cod__phone">
              <div className="mkt-cod__phone-bar">
                <span className="mkt-cod__phone-dot" aria-hidden />
                Your store
              </div>
              <div className="mkt-cod__chat">
                <div className="mkt-cod__bubble">
                  <p>
                    Hi Priya, we received your order <strong>#1042</strong> (Cash on Delivery, ₹1,499).
                  </p>
                  <p>Please confirm it so we can ship it today.</p>
                  <span className="mkt-cod__time">10:42</span>
                </div>
                <div className="mkt-cod__replies" aria-hidden>
                  <span className="mkt-cod__reply">Confirm order</span>
                  <span className="mkt-cod__reply">Cancel order</span>
                </div>
              </div>
              <figcaption className="mkt-cod__caption">
                Example message. Your approved Meta template may differ.
              </figcaption>
            </figure>
          </section>
        </FeatureMeshStage>

        <section className="mkt-pf__section mkt-pf__section--steps" aria-labelledby="mkt-cod-how">
          <div className="mkt-pf__head">
            <h2 id="mkt-cod-how" className="mkt-pf__head-title">
              How COD confirmation <span>works</span>
            </h2>
          </div>
          <ol className="mkt-pf__steps">
            {STEPS.map((step, i) => (
              <li key={step.title} className="mkt-pf__step">
                <div className="mkt-pf__step-index" aria-hidden>
                  <span className="mkt-pf__step-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="mkt-pf__step-body">
                  <h3 className="mkt-pf__step-title">{step.title}</h3>
                  <p className="mkt-pf__step-copy">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mkt-pf__section" aria-labelledby="mkt-cod-cost">
          <div className="mkt-pf__head">
            <h2 id="mkt-cod-cost" className="mkt-pf__head-title">
              What RTO <span>costs you</span>
            </h2>
            <p className="mkt-pf__head-sub">
              Every returned COD parcel pays for the trip out, the trip back and the handling in
              between, and you earn nothing.
            </p>
          </div>
          <div className="mkt-cod__card mkt-cod__maths">
            <p className="mkt-cod__maths-line">
              <span>₹80 out</span> + <span>₹80 back</span> + <span>₹20 handling</span> ={' '}
              <strong>₹180 per returned parcel</strong>
            </p>
            <p className="mkt-cod__maths-line">
              50 returns in a month = <strong>₹9,000 gone</strong>
            </p>
            <p className="mkt-cod__note">
              Illustrative numbers, not customer results. Use your own courier rates and RTO count;{' '}
              <Link to="/features/profit-loss">Profit &amp; costs</Link> shows your real RTO loss.
            </p>
          </div>
        </section>

        <section className="mkt-pf__section" aria-labelledby="mkt-cod-plans">
          <div className="mkt-pf__head">
            <h2 id="mkt-cod-plans" className="mkt-pf__head-title">
              Plans and what&rsquo;s <span>included</span>
            </h2>
          </div>
          <div className="mkt-cod__card mkt-cod__table-wrap">
            <table className="mkt-cod__table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="mkt-cod__sr">Feature</span>
                  </th>
                  {plans.map((p) => (
                    <th key={p.slug} scope="col">
                      {p.displayName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Basic COD confirmation</th>
                  {plans.map((p) => (
                    <td key={p.slug}>
                      <Mark on />
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">
                    COD to prepaid
                    <span className="mkt-cod__row-note">
                      WhatsApp payment link via a Shopify draft invoice
                    </span>
                  </th>
                  {plans.map((p) => (
                    <td key={p.slug}>
                      <Mark on={p.features.journeyCodPrepaid} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">
                    Journey Branch
                    <span className="mkt-cod__row-note">Route each buyer by their reply</span>
                  </th>
                  {plans.map((p) => (
                    <td key={p.slug}>
                      <Mark on={p.features.journeyBranch} />
                    </td>
                  ))}
                </tr>
                <tr className="mkt-cod__price-row">
                  <th scope="row">Monthly billing</th>
                  {plans.map((p) => (
                    <td key={p.slug}>{p.monthlyPriceLabel}</td>
                  ))}
                </tr>
                <tr className="mkt-cod__price-row">
                  <th scope="row">Yearly billing, per month</th>
                  {plans.map((p) => (
                    <td key={p.slug}>{yearlyMonthly(p)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mkt-cod__foot">
            {GST_FOOTNOTE} GST invoices issued. Meta&rsquo;s per-message WhatsApp fees are not
            included in the plan price. Meta bills them directly on your own Meta account, and
            TopEdge adds 0% markup.
          </p>
        </section>

        <section className="mkt-pf__section" aria-labelledby="mkt-cod-limits">
          <div className="mkt-pf__head">
            <h2 id="mkt-cod-limits" className="mkt-pf__head-title">
              Honest <span>limits</span>
            </h2>
          </div>
          <ul className="mkt-cod__card mkt-cod__limits">
            {LIMITS.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="mkt-pf__section mkt-pf__section--faq" aria-labelledby="mkt-cod-faq">
          <div className="mkt-pf__head">
            <h2 id="mkt-cod-faq" className="mkt-pf__head-title">
              Common <span>questions</span>
            </h2>
          </div>
          <div className="mkt-pf__faq">
            {FAQS.map((f) => (
              <div key={f.question} className="mkt-pf__faq-item">
                <h3>{f.question}</h3>
                <p>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="mkt-pf__section mkt-pf__section--related mkt-pf__section--last"
          aria-labelledby="mkt-cod-reading"
        >
          <div className="mkt-pf__head">
            <h2 id="mkt-cod-reading" className="mkt-pf__head-title">
              Keep <span>reading</span>
            </h2>
          </div>
          <div className="mkt-pf__related">
            {READING.map((r) => (
              <Link key={r.href} to={r.href} className="mkt-pf__related-link">
                {r.label}
              </Link>
            ))}
          </div>
        </section>

        <MarketingCtaBand
          title="Ship only the COD orders buyers confirm"
          subtitle={`${TRIAL.days} days, ${TRIAL.orders} orders, no card. Connect Shopify and WhatsApp, approve one template, go live.`}
          primaryLabel="Start free trial"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
