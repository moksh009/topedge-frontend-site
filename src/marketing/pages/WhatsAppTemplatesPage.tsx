import { useState } from 'react';
import { Link } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { Section, SectionHeading, PrimaryButton } from '../components/ui';
import { TopicBlockView, type TopicBlock } from '../components/topic/TopicBlocks';
import FaqAccordion from '../components/topic/FaqAccordion';
import JourneyHero from '../components/journey/JourneyHero';
import PhoneMock, { type TemplateMessage } from '../components/journey/PhoneMock';
import TrustBand from '../components/journey/TrustBand';
import HowItWorks from '../components/journey/HowItWorks';
import {
  TEMPLATE_GROUPS,
  TEMPLATE_RATE,
  FESTIVAL_VARIANTS,
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
    h2: 'Why WhatsApp needs templates',
    body: [
      'A business can only message a customer freely for **24 hours after the customer replies**. Outside that window, every message has to be a template that Meta has approved in advance.',
      'That is why templates come first. Your journeys are ready in minutes, but **each template needs Meta’s approval** before it can send, so submit the ones you need early.',
    ],
  },
  {
    kind: 'specTable',
    id: 'category-price',
    h2: 'What each template costs',
    intro:
      'Meta charges by template type, not by length. A marketing message costs about seven times a utility one.',
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
    title: 'An offer turns a utility message into marketing',
    body:
      'Add a discount or promotion to an order update and Meta charges it as marketing, ₹0.8631 instead of ₹0.1150, on every send. Keep offers in a separate message.',
    link: { label: 'See the full India rate card', href: '/pricing/meta-rates' },
  },
];

type LibraryItem = {
  id: string;
  title: string;
  purpose: string;
  category: TemplateSlot['category'];
  group: string;
  message: TemplateMessage;
};

const FESTIVE_GROUP = { id: 'festive', label: 'Festive' };

const LIBRARY: LibraryItem[] = [
  ...TEMPLATE_GROUPS.flatMap((g) =>
    g.slots.map((s) => ({
      id: s.id,
      title: s.title,
      purpose: s.purpose,
      category: s.category,
      group: g.id,
      message: s.message,
    })),
  ),
  ...FESTIVAL_VARIANTS.map((f) => ({
    id: f.id,
    title: f.title,
    purpose: f.note,
    category: f.category,
    group: FESTIVE_GROUP.id,
    message: f.message,
  })),
];

const FILTERS = [
  { id: 'all', label: 'All templates' },
  ...TEMPLATE_GROUPS.map((g) => ({ id: g.id, label: g.label })),
  FESTIVE_GROUP,
];

const GROUP_LABEL: Record<string, string> = Object.fromEntries(
  FILTERS.filter((f) => f.id !== 'all').map((f) => [f.id, f.label]),
);

function TemplateCard({ item }: { item: LibraryItem }) {
  return (
    <article className="mkt-lib-card">
      <div className="mkt-lib-card__preview">
        <PhoneMock message={item.message} compact />
      </div>
      <div className="mkt-lib-card__body">
        <div className="mkt-lib-card__tags">
          <span className="mkt-lib-card__group">{GROUP_LABEL[item.group]}</span>
          <span className={`mkt-jf__cat mkt-jf__cat--${item.category.toLowerCase()}`}>
            {item.category} · {TEMPLATE_RATE[item.category]}
          </span>
        </div>
        <h3 className="mkt-lib-card__title">{item.title}</h3>
        <p className="mkt-lib-card__purpose">{item.purpose}</p>
        <Link to="/signup" className="mkt-lib-card__cta">
          Use this template →
        </Link>
      </div>
    </article>
  );
}

function TemplateLibrary() {
  const [filter, setFilter] = useState('all');
  const items = filter === 'all' ? LIBRARY : LIBRARY.filter((i) => i.group === filter);

  return (
    <div className="mkt-lib">
      <div className="mkt-lib__filters" role="tablist" aria-label="Filter templates">
        {FILTERS.map((f) => {
          const count =
            f.id === 'all' ? LIBRARY.length : LIBRARY.filter((i) => i.group === f.id).length;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              className={`mkt-lib__filter${filter === f.id ? ' is-active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <span className="mkt-lib__count">{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mkt-lib__grid">
        {items.map((item) => (
          <li key={item.id}>
            <TemplateCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WhatsAppTemplatesPage() {
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
          subtitle="Ready-to-use WhatsApp templates for order updates, COD confirmation, cart recovery and festive sales. Pick one, get it approved by Meta, and start sending."
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

        <Section className="!pt-12 md:!pt-16" id="library">
          <TemplateLibrary />
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
          title="Start sending these templates this week"
          subtitle="Connect Shopify, submit the templates you need to Meta, and switch on the journey that sends them. Free for 14 days, no card."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
