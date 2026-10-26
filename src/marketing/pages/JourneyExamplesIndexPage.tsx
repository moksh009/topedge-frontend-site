import { Link } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { Section, SectionHeading, PrimaryButton } from '../components/ui';
import { TopicBlockView, type TopicBlock } from '../components/topic/TopicBlocks';
import FaqAccordion from '../components/topic/FaqAccordion';
import { JOURNEY_EXAMPLES } from '../data/journeyExamples';
import JourneyHero from '../components/journey/JourneyHero';
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
      'A journey is an automation bound to a Shopify event. The event fires, the journey sends one or more approved WhatsApp templates, and the customer’s reply can branch it. The difference between a journey and a chatbot is that a journey reads the order it is talking about.',
  },
  {
    question: 'Which journey should a Shopify store publish first?',
    answer:
      'Cart recovery if you are mostly prepaid, COD confirmation if return-to-origin is the problem that is costing you money. Publish one, watch it for a week, then add the second. Four journeys published on day one is four things you cannot attribute.',
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
    kind: 'prose',
    id: 'what-is-a-journey',
    h2: 'What a journey is, and what it is not',
    body: [
      'A journey is **an automation tied to something that happened in your store**. Shopify says a checkout was abandoned, an order was placed, a COD order needs confirming, a parcel shipped. The journey picks that event up and sends an approved WhatsApp template carrying the real order detail, then waits to see what the customer does.',
      'That last part is what separates it from a chatbot. A chatbot answers whatever is typed at it. A journey **starts from a fact** — it already knows the order number, the items and the amount due — and can branch on a reply because it has somewhere to send the outcome: release the order, hold it, hand the thread to a human.',
    ],
  },
  {
    kind: 'specTable',
    id: 'cost-by-category',
    h2: 'What each journey costs to run',
    intro:
      'Meta prices the category, not the message, and the gap is the single biggest lever on your WhatsApp bill. Transactional journeys are cheap to run and scale with orders. Promotional ones scale with audience and are worth rationing.',
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
    title: 'Publish one, not four',
    body:
      'Every journey here is worth running eventually. Running all of them in week one means you cannot tell which change moved your numbers, and it puts four sets of templates into Meta review at the same time. Start with the one that maps to money you are currently losing.',
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
          subtitle="The automations that ship with TopEdge, written out in full: what fires each one, what goes out, how long the gaps are, and what the sequence costs per order."
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

        <Section className="!pt-0">
          <div className="mx-auto max-w-3xl">
            <p className="mkt-jh-lead">
              Every journey below is one TopEdge ships, with the Shopify trigger and the Meta
              template names it actually uses. They are worked examples rather than a feature list,
              because the question a merchant is really asking is what this looks like running on
              their store on a Tuesday.
            </p>
          </div>
        </Section>

        {/*
          One card grid, not a thumbnail strip in the hero followed by a second,
          larger version of the same four cards. The grid doubles as navigation
          into each journey, so it carries the real trigger, the blurb and a
          picture rather than just a caption.
        */}
        <Section wash="soft">
          <ul className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {JOURNEY_EXAMPLES.map((j) => (
              <li key={j.slug}>
                <Link to={`${PATH}/${j.slug}`} className="mkt-jx-card is-lg">
                  <span className="mkt-jx-card__media">
                    <img src={j.art} alt="" aria-hidden width={640} height={400} loading="lazy" decoding="async" />
                  </span>
                  <span className="mkt-jx-card__trigger">{j.cardTrigger}</span>
                  <span className="mkt-jx-card__title">{j.cardTitle}</span>
                  <span className="mkt-jx-card__blurb">{j.cardBlurb}</span>
                  <span className="mkt-jx-card__cta">See the full journey</span>
                </Link>
              </li>
            ))}
          </ul>

          {/*
            Warranty is a real shipped automation and a genuine differentiator,
            but nobody searches for it. It gets a feature card pointing at
            /features/warranty rather than a page that could not rank.
          */}
          <div className="mx-auto mt-6 max-w-5xl">
            <Link to="/features/warranty" className="mkt-jx-note">
              <span className="mkt-jx-note__icon" aria-hidden>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7 3.2v5.1c0 4.6-3 8.1-7 9.4-4-1.3-7-4.8-7-9.4V6.2L12 3z" />
                  <path d="M9 12.2l2 2 4-4.2" />
                </svg>
              </span>
              <span className="mkt-jx-note__body">
                <span className="mkt-jx-note__tag">Also shipping</span>
                <span className="mkt-jx-note__title">Warranty registration journey</span>
                <span className="mkt-jx-note__desc">
                  Fires on <code>order_placed</code>, for brands that register warranty at purchase.
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

        <Section>
          <div className="mkt-jx-centered mx-auto flex max-w-3xl flex-col gap-14 md:gap-16">
            {BLOCKS.map((b) => (
              <TopicBlockView key={b.id} block={b} />
            ))}
          </div>
        </Section>

        <Section wash="soft">
          <SectionHeading title="Questions teams ask" center />
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
