import { Link } from 'react-router-dom';
import { Check, Minus } from 'lucide-react';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import FeatureMeshStage from '../components/effects/FeatureMeshStage';
import { PrimaryButton, GhostButton } from '../components/ui';
import {
  breadcrumbJsonLd,
  featureSoftwareJsonLd,
  organizationJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
import { featurePagesModifiedIso } from '../data/contentDates';
import { FALLBACK_CATALOG, GST_FOOTNOTE, TRIAL } from '../lib/billingCatalog';
import '../styles/product-feature.css';
import '../styles/cod-confirmation.css';

const PATH = '/features/cod-confirmation';

const SEO_TITLE = 'Shopify WhatsApp COD Confirmation to Cut RTO | TopEdge';
const SEO_DESCRIPTION =
  'Confirm every Shopify COD order on WhatsApp before dispatch at ₹0.115 a message, against ₹180-₹240 lost per RTO parcel. COD-to-prepaid on Growth. 14-day trial.';

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
      `Basic COD confirmation is included on every plan, from ${FALLBACK_CATALOG.plans[0].monthlyPriceLabel} a month plus GST on monthly billing. Meta charges its own per-message WhatsApp fees directly on your Meta account, and TopEdge adds 0% markup to them. On Meta's India rate card a COD confirmation is a utility template at ₹0.1150 per delivered message before GST, so confirming 500 COD orders costs ₹57.50 against ₹180 to ₹240 of direct logistics loss on each returned parcel.`,
  },
  {
    question: 'Why does adding a prepaid discount make the message cost 7.5x more?',
    answer:
      'Because it changes the Meta template category. A plain confirm-or-cancel message is a utility template at ₹0.1150. Add a prepaid discount or an offer to the same message and Meta reclassifies it as marketing at ₹0.8631, which is 7.5 times the cost on every COD order you ship. Send the utility confirmation to everyone, then make the prepaid offer as a separate marketing send only to the segment whose margin supports it.',
  },
  {
    question: 'How long do I have once a delivery fails?',
    answer:
      'About 36 hours. Amazon Shipping India states that nearly every failed delivery not resolved within 36 hours of the NDR being raised ends in cancellation and RTO, and that Indian couriers typically allow 24 to 48 hours between attempts across two or three attempts in total. Its guidance is to reach the buyer within 2 to 4 hours of the NDR, which is a WhatsApp-shaped window rather than a call-centre one.',
  },
] as const;

const LIMITS = [
  'It confirms intent. It does not predict which buyers are risky.',
  'Buyers who never reply need your follow-up rule. Decide it before you switch the journey on.',
  'WhatsApp templates must be approved by Meta before they send.',
  "Meta's per-message fees are separate from your TopEdge plan.",
];

const READING = [
  { label: 'COD confirmation setup guide', href: 'https://dash.topedgeai.com/docs' },
  { label: 'Journeys: the visual builder behind it', href: '/features/journeys' },
  { label: 'Profit & costs: measure your own RTO', href: '/features/profit-loss' },
  {
    label: 'COD confirmation on WhatsApp for Shopify',
    href: '/blog/how-to-reduce-rto-with-whatsapp-cod-confirmation',
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
          featureSoftwareJsonLd({
            name: 'COD confirmation and COD to prepaid',
            description: SEO_DESCRIPTION,
            path: PATH,
          }),
        ]}
      />
      <MarketingPage className="mkt-pf mkt-cod">
        <FeatureMeshStage mesh="journeys">
          <header className="mkt-pf__hero">
            <h1 className="mkt-pf__title">
              Confirm COD orders on WhatsApp to cut RTO{' '}
              <span className="mkt-pf__title-accent">and convert COD to prepaid</span>
            </h1>
            <p className="mkt-pf__sub">
              A returned COD parcel costs you shipping both ways and a lost sale. TopEdge messages
              the buyer on WhatsApp as soon as a COD order lands, asks them to confirm, and lets
              you ship only what they confirm.
            </p>
            <div className="mkt-cod__actions">
              <PrimaryButton to="/signup">
                Start free trial
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
              between, and you earn nothing. Amazon Shipping India itemises it.
            </p>
          </div>
          <div className="mkt-cod__card mkt-cod__maths">
            <p className="mkt-cod__maths-line">
              <span>₹60 to ₹100 forward</span> + <span>₹50 to ₹80 reverse</span> +{' '}
              <span>₹20 to ₹40 repackaging</span> + <span>₹10 to ₹20 holding</span> ={' '}
              <strong>₹180 to ₹240 per returned parcel</strong>
            </p>
            <p className="mkt-cod__maths-line">
              Add the acquisition spend behind that order, at ₹450 to ₹680 per customer, and
              ClickPost puts the fully loaded loss at <strong>₹450 to ₹900</strong>
            </p>
            <p className="mkt-cod__maths-line">
              One WhatsApp utility confirmation costs <strong>₹0.1150</strong> on Meta&rsquo;s India
              rate card, so confirming 500 COD orders costs <strong>₹57.50</strong>
            </p>
            <p className="mkt-cod__maths-line">
              500 COD orders at 25% RTO = 125 returns = <strong>₹25,000 gone</strong> at ₹200 a
              parcel, before any ad spend is written off
            </p>
            <p className="mkt-cod__note">
              Cost lines from{' '}
              <a
                href="https://shipping.amazon.in/blog/what-is-rto-how-to-reduce-return-to-origin"
                target="_blank"
                rel="noopener noreferrer"
              >
                Amazon Shipping India
              </a>{' '}
              and ClickPost via First Resort, read 21 October 2026, with Meta&rsquo;s India utility
              rate from its{' '}
              <a
                href="https://developers.facebook.com/docs/whatsapp/pricing/"
                target="_blank"
                rel="noopener noreferrer"
              >
                pricing documentation
              </a>
              . These are national indicative ranges, not customer results and not your rate card.
              One warning: bundling a prepaid discount into the confirmation reclassifies it from
              utility to marketing, at ₹0.8631, which is 7.5x. Use your own courier rates and RTO
              count; <Link to="/features/profit-loss">Profit &amp; costs</Link> shows your real RTO
              loss, and the{' '}
              <Link to="/blog/cod-rto-benchmark-india-2026">2026 India RTO benchmark</Link> has the
              category bands.
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
            {READING.map((r) =>
              r.href.startsWith('http') ? (
                <a
                  key={r.href}
                  href={r.href}
                  className="mkt-pf__related-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {r.label}
                </a>
              ) : (
                <Link key={r.href} to={r.href} className="mkt-pf__related-link">
                  {r.label}
                </Link>
              ),
            )}
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
