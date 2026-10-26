import { Link } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { Section, SectionHeading, PrimaryButton } from '../components/ui';
import { TopicBlockView, type TopicBlock } from '../components/topic/TopicBlocks';
import FaqAccordion from '../components/topic/FaqAccordion';
import JourneyHero from '../components/journey/JourneyHero';
import PhoneMock from '../components/journey/PhoneMock';
import {
  TEMPLATE_GROUPS,
  TEMPLATE_RATE,
  FESTIVAL_VARIANTS,
  allSlots,
  type TemplateSlot,
} from '../data/whatsappTemplates';
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
import '../styles/journey-flow.css';

const PATH = '/whatsapp-templates';
const TITLE = 'WhatsApp Templates for Shopify India | TopEdge AI';
const DESCRIPTION =
  'The 11 WhatsApp templates TopEdge ships for Shopify India: order updates, COD confirmation, cart recovery and festive copy, with category and ₹ rate.';

const FAQS = [
  {
    question: 'What is a WhatsApp message template?',
    answer:
      'It is a message Meta has approved in advance, so a business can send it to a customer outside the 24-hour reply window. You submit it from your own WhatsApp Business account, Meta reviews it, and only then can automation send it. Until it is approved, a journey cannot use it.',
  },
  {
    question: 'Why does the template category matter so much?',
    answer:
      'Because Meta prices the category, not the message. In India a utility template costs ₹0.1150 per delivered message and a marketing one ₹0.8631, roughly seven times more. The same sentence with an offer added becomes a marketing template, so category is the single biggest lever on your WhatsApp bill.',
  },
  {
    question: 'Can I edit the wording of these templates?',
    answer:
      'Yes, and you will have to. The previews here are examples of the shape each template takes. You write your own wording, submit it to Meta from your own account, and edit it later as your store changes. What stays fixed is the trigger it fires on and the fields it can pull from the order.',
  },
  {
    question: 'How long does Meta take to approve a template?',
    answer:
      'Usually hours rather than days once your business is verified, though it varies and Meta does not publish a guarantee. Most rejections come from missing sample values or vague variables rather than the copy itself, so fill the samples in properly the first time.',
  },
  {
    question: 'Do you have Diwali and festival templates?',
    answer:
      'Festive copy is a seasonal rewrite of a template you already have, submitted as its own template. There are three worked examples on this page. A festive greeting added to an order update turns a ₹0.1150 utility message into a ₹0.8631 marketing one, which is worth knowing before you write it.',
  },
  {
    question: 'How many templates do I need to start?',
    answer:
      'Two. Cart recovery if you are mostly prepaid, COD confirmation if return-to-origin is what costs you money, plus the order updates that go with them. Submitting eleven templates in week one means eleven things in review and nothing you can attribute.',
  },
];

const BLOCKS: TopicBlock[] = [
  {
    kind: 'prose',
    id: 'what-is-a-template',
    h2: 'Why templates exist at all',
    body: [
      'WhatsApp does not let a business message whoever it likes whenever it likes. Once a customer has replied, you have a 24-hour window to talk freely. Outside that window you can only send something Meta has already looked at and approved, and that is a template.',
      'This is why a WhatsApp setup cannot be switched on the way an email tool can. The journeys are ready in minutes; the templates sit in Meta review, against your own business account, before anything can send. Planning for that queue is most of what separates a smooth go-live from a frustrating one.',
    ],
  },
  {
    kind: 'specTable',
    id: 'category-price',
    h2: 'Category decides the price, not the words',
    intro:
      'Meta prices the category. The gap between the two you will actually use is about seven times, and it is the single biggest lever on a WhatsApp bill.',
    columns: ['Category', 'What belongs in it', 'India, per delivered message'],
    rows: [
      {
        label: 'Utility',
        cells: [
          'Messages about an order that already exists: confirmed, COD confirmation, shipped, delivered, cancelled, warranty',
          '₹0.1150',
        ],
        note: 'Cost scales with orders, not audience size.',
      },
      {
        label: 'Marketing',
        cells: [
          'Anything that exists to make a sale that has not happened: cart reminders, prepaid incentives, festive offers',
          '₹0.8631',
        ],
        note: 'Cost scales with audience, so it is the one to ration.',
      },
      {
        label: 'Authentication',
        cells: ['One-time passcodes and verification only', '₹0.1150'],
        note: 'Not used by a standard Shopify store setup.',
      },
    ],
    footnote:
      'Rates are Meta’s own published India prices, billed by Meta to your WhatsApp Business account. TopEdge adds no markup on them.',
  },
  {
    kind: 'callout',
    id: 'reclassify',
    tone: 'warn',
    title: 'Adding an offer to a utility template reprices it',
    body:
      'This is the mistake that costs real money. An order confirmation is utility at ₹0.1150 because it is about an order the customer already placed. Add a discount code or a festive promotion to the same message and Meta categorises it as marketing at ₹0.8631, on every send, for as long as that template is live. Keep the offer in a second message.',
    link: { label: 'See the full India rate card', href: '/pricing/meta-rates' },
  },
];

function SlotCard({ slot }: { slot: TemplateSlot }) {
  return (
    <article className="mkt-tpl">
      <div className="mkt-tpl__phone">
        <PhoneMock message={slot.message} />
      </div>

      <div className="mkt-tpl__body">
        <div className="mkt-tpl__head">
          <h3 className="mkt-tpl__title">{slot.title}</h3>
          <span className={`mkt-jf__cat mkt-jf__cat--${slot.category.toLowerCase()}`}>
            {slot.category} · {TEMPLATE_RATE[slot.category]}
          </span>
        </div>

        <p className="mkt-tpl__purpose">{slot.purpose}</p>

        <p className="mkt-tpl__tech">
          <code>{slot.metaName}</code>
          <span aria-hidden>·</span>
          fires on <code>{slot.trigger}</code>
        </p>

        {slot.watchOut && (
          <p className="mkt-tpl__watch">
            <strong>Watch out:</strong> {slot.watchOut}
          </p>
        )}
      </div>
    </article>
  );
}

export default function WhatsAppTemplatesPage() {
  const slots = allSlots();
  const utility = slots.filter((s) => s.category === 'Utility').length;

  return (
    <>
      <MarketingSEO
        title={TITLE}
        description={DESCRIPTION}
        keywords="WhatsApp templates Shopify, WhatsApp message templates India, Meta template examples, COD confirmation template, cart recovery template, Diwali WhatsApp template"
        path={PATH}
        noSuffix
        faqSchema={FAQS}
        jsonLd={[
          organizationJsonLd(),
          softwareApplicationJsonLd(),
          webPageJsonLd({
            name: 'WhatsApp templates for Shopify',
            description: DESCRIPTION,
            path: PATH,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'WhatsApp templates', path: PATH },
          ]),
        ]}
      />
      <MarketingPage>
        <JourneyHero
          eyebrow="Template library"
          title="WhatsApp templates for Shopify stores"
          trust
          accent="WhatsApp templates"
          subtitle="The eleven templates TopEdge ships, shown as your customer receives them, with the Meta category and the ₹ rate each one carries."
          image="/marketing/journeys/hero-whatsapp-templates.webp"
          imageAlt="An isometric scene of a phone showing a chat message, with template cards and a stamp of approval around it."
          actions={
            <>
              <PrimaryButton to="/signup">Start free</PrimaryButton>
              <Link
                to="/whatsapp-journey-examples"
                className="text-sm font-medium text-[#7C3AED] hover:underline"
              >
                See the journeys that send them
              </Link>
            </>
          }
        />

        <Section className="!pt-0">
          <div className="mx-auto max-w-3xl">
            <p className="mkt-jh-lead">
              Eleven templates, not a catalogue of a hundred. These are the ones the product
              actually ships, grouped the way they run: {utility} utility templates that follow a
              Shopify order, three marketing sends that chase a cart, and two optional programs.
              Every preview shows the real structure, and the highlighted values are the fields
              filled from the order.
            </p>
          </div>
        </Section>

        <Section className="!pt-4">
          <div className="mkt-jx-centered mx-auto flex max-w-3xl flex-col gap-14 md:gap-16">
            {BLOCKS.map((b) => (
              <TopicBlockView key={b.id} block={b} />
            ))}
          </div>
        </Section>

        {TEMPLATE_GROUPS.map((group, i) => (
          <Section key={group.id} wash={i % 2 === 0 ? 'soft' : undefined} id={group.id}>
            <SectionHeading title={group.label} subtitle={group.blurb} center />
            <div className="mx-auto flex max-w-4xl flex-col gap-5">
              {group.slots.map((s) => (
                <SlotCard key={s.id} slot={s} />
              ))}
            </div>
          </Section>
        ))}

        <Section wash="soft" id="festive">
          <SectionHeading
            title="Festive copy, Diwali and after"
            subtitle="Not extra templates. Each one is a seasonal rewrite of a template above, submitted to Meta as its own, under your own account."
            center
          />
          <div className="mx-auto flex max-w-4xl flex-col gap-5">
            {FESTIVAL_VARIANTS.map((f) => (
              <article key={f.id} className="mkt-tpl">
                <div className="mkt-tpl__phone">
                  <PhoneMock message={f.message} />
                </div>
                <div className="mkt-tpl__body">
                  <div className="mkt-tpl__head">
                    <h3 className="mkt-tpl__title">{f.title}</h3>
                  </div>
                  <p className="mkt-tpl__purpose">{f.note}</p>
                  <p className="mkt-tpl__tech">
                    Seasonal rewrite of <code>{f.basedOn}</code>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeading title="Questions teams ask" center />
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={FAQS} />
          </div>

          <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {[
              { label: 'Journey examples', href: '/whatsapp-journey-examples' },
              { label: 'Meta template manager', href: '/features/meta-manager' },
              { label: 'Meta India rate card', href: '/pricing/meta-rates' },
              { label: 'Why templates get rejected', href: '/blog/whatsapp-template-rejected-meta-shopify-fix' },
              { label: 'Opt-in rules', href: '/blog/whatsapp-opt-in-shopify-india' },
              { label: 'Pricing', href: '/pricing' },
            ].map((r) => (
              <li key={r.href}>
                <Link
                  to={r.href}
                  className="inline-flex rounded-full border border-[#efeaf8] bg-white px-4 py-2 text-sm font-medium text-[#7C3AED] hover:border-[#c4b5fd]"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <MarketingCtaBand
          title="Push these to Meta from your own account"
          subtitle="Connect Shopify, submit the templates you need, and publish the journey that sends them. Free for 14 days, no card."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
