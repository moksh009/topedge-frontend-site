import { Link } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { Section, SectionHeading, PrimaryButton } from '../components/ui';
import { TopicBlockView, type TopicBlock } from '../components/topic/TopicBlocks';
import FaqAccordion from '../components/topic/FaqAccordion';
import { JOURNEY_EXAMPLES } from '../data/journeyExamples';
import JourneyHero from '../components/journey/JourneyHero';
import JourneyCard from '../components/journey/JourneyCard';
import TrustBand from '../components/journey/TrustBand';
import HowItWorks from '../components/journey/HowItWorks';
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
/*
 * The card styles live beside the flow diagram, and this page renders cards
 * without rendering a diagram, so the stylesheet has to be imported here too.
 * Without it the cards arrive as unstyled inline spans with every line of copy
 * run together.
 */
import '../styles/journey-flow.css';

const PATH = '/whatsapp-journey-examples';
const TITLE = 'WhatsApp Journey Examples for Shopify India | TopEdge AI';
const DESCRIPTION =
  'Worked WhatsApp journey examples for Shopify India: cart recovery, COD confirmation, COD to prepaid and order status, with triggers, timing and ₹ cost.';

const FAQS = [
  {
    question: 'What is a WhatsApp journey?',
    answer:
      'A journey is an automation triggered by something in your Shopify store, like an abandoned cart or a new COD order. It sends approved WhatsApp messages with the real order details, and changes course based on how the customer replies.',
  },
  {
    question: 'Which journey should a Shopify store publish first?',
    answer:
      'Start with COD confirmation if returned COD parcels are costing you money, or cart recovery if most of your orders are prepaid. Run one for a week, then add the next.',
  },
  {
    question: 'Do these journeys cost extra?',
    answer:
      'The journeys are part of the platform. What costs money is the messages, which Meta bills to your own WhatsApp Business account at ₹0.1150 for a utility template and ₹0.8631 for a marketing one in India. TopEdge adds no markup on those fees.',
  },
  {
    question: 'Can I edit the steps, or are these fixed?',
    answer:
      'They are starting points. Each one ships as pre-built templates you push to Meta for approval, and the timing, copy and branches are yours to change in the journey builder once they are approved.',
  },
];

const BLOCKS: TopicBlock[] = [
  {
    kind: 'specTable',
    id: 'cost-by-category',
    h2: 'What each journey costs to run',
    intro:
      'Meta charges per delivered message, and the price depends on the message type. Order updates are cheap. Sales messages cost about seven times more.',
    columns: ['Journey', 'Meta category', 'Per delivered message, India'],
    rows: [
      {
        label: 'Order status updates',
        cells: ['Utility', '₹0.1150'],
        note: 'Four sends across an order is roughly ₹0.46.',
      },
      {
        label: 'COD confirmation',
        cells: ['Utility', '₹0.1150'],
        note: 'Against an RTO parcel costing ₹180 to ₹240 in direct logistics.',
      },
      {
        label: 'Abandoned cart recovery',
        cells: ['Marketing', '₹0.8631'],
        note: 'Three sends is roughly ₹2.59 per abandoned cart.',
      },
      {
        label: 'COD to prepaid nudge',
        cells: ['Marketing', '₹0.8631'],
        note: 'Carries an incentive, so it cannot be a utility template.',
      },
    ],
    footnote:
      'Rates are Meta’s own published India prices, billed by Meta to your WhatsApp Business account. TopEdge adds no markup on them.',
  },
  {
    kind: 'callout',
    id: 'order',
    tone: 'note',
    title: 'Start with one journey',
    body:
      'Launch one journey, measure it for a week, then add the next. Turning on all four at once makes it impossible to tell which one moved your numbers.',
    link: { label: 'See the journey builder', href: '/features/journeys' },
  },
];

export default function JourneyExamplesIndexPage() {
  return (
    <>
      <MarketingSEO
        title={TITLE}
        description={DESCRIPTION}
        keywords="WhatsApp journey examples, Shopify WhatsApp flow examples, WhatsApp automation examples India, cart recovery journey, COD confirmation journey, order status automation"
        path={PATH}
        noSuffix
        faqSchema={FAQS}
        jsonLd={[
          organizationJsonLd(),
          softwareApplicationJsonLd(),
          webPageJsonLd({
            name: 'WhatsApp journey examples for Shopify',
            description: DESCRIPTION,
            path: PATH,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Journey examples', path: PATH },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'WhatsApp journey examples',
            itemListElement: JOURNEY_EXAMPLES.map((j, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: j.cardTitle,
              url: `https://topedgeai.com${PATH}/${j.slug}`,
            })),
          },
        ]}
      />
      <MarketingPage>
        <JourneyHero
          eyebrow="Journey examples"
          title="WhatsApp journey examples for Shopify stores"
          trust
          accent="journey examples"
          subtitle="Ready-made WhatsApp automations for Shopify. See exactly what each one sends, when it sends it, and what it costs."
          actions={
            <>
              <PrimaryButton to="/signup">Start free</PrimaryButton>
              <Link
                to="/features/journeys"
                className="text-sm font-medium text-[#7C3AED] hover:underline"
              >
                See the journey builder
              </Link>
            </>
          }
        />

        <Section className="!pt-12 md:!pt-16">
          <ul className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            {JOURNEY_EXAMPLES.map((j) => (
              <li key={j.slug}>
                <JourneyCard journey={j} href={`${PATH}/${j.slug}`} large />
              </li>
            ))}
          </ul>

          {/*
            Warranty is a real shipped automation and a genuine differentiator,
            but nobody searches for it. It gets a feature card pointing at
            /features/warranty rather than a page that could not rank.
          */}
          <div className="mx-auto mt-5 max-w-5xl">
            <Link to="/features/warranty" className="mkt-jx-note">
              <span className="mkt-jx-note__icon" aria-hidden>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7 3.2v5.1c0 4.6-3 8.1-7 9.4-4-1.3-7-4.8-7-9.4V6.2L12 3z" />
                  <path d="M9 12.2l2 2 4-4.2" />
                </svg>
              </span>
              <span className="mkt-jx-note__body">
                <span className="mkt-jx-note__tag">Also included</span>
                <span className="mkt-jx-note__title">Warranty registration journey</span>
                <span className="mkt-jx-note__desc">
                  Sends the customer a warranty confirmation the moment they order.
                </span>
              </span>
              <span className="mkt-jx-note__cta">
                See the warranty feature
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </Section>

        <Section wash="soft">
          <TrustBand />
        </Section>

        <Section>
          <HowItWorks />
        </Section>

        <Section wash="soft">
          <div className="mkt-jx-centered mx-auto flex max-w-3xl flex-col gap-14 md:gap-16">
            {BLOCKS.map((b) => (
              <TopicBlockView key={b.id} block={b} />
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeading title="Questions teams ask" accent="teams ask" />
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={FAQS} />
          </div>
        </Section>

        <MarketingCtaBand
          title="Publish your first journey this week"
          subtitle="Connect Shopify, push templates to Meta for approval, publish one journey. Free for 14 days, no card."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
