import { Link } from 'react-router-dom';
import MarketingSEO from '../../components/MarketingSEO';
import MarketingPage from '../../components/MarketingPage';
import MarketingCtaBand from '../../components/MarketingCtaBand';
import { Section, SectionHeading } from '../../components/ui';
import JourneyHero from '../../components/journey/JourneyHero';
import { TopicBlockView, type TopicBlock } from '../../components/topic/TopicBlocks';
import FaqAccordion from '../../components/topic/FaqAccordion';
import ToolFinder from '../../components/tools/ToolFinder';
import ToolCards from '../../components/tools/ToolCards';
import { otherTools } from '../../data/freeTools';
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from '../../data/pageSeo';
import '../../styles/journey-flow.css';

const PATH = '/tools/best-whatsapp-tool-for-shopify';
const TITLE = 'Best WhatsApp Tool for Your Shopify Store? Take the 2-Minute Quiz';
const DESCRIPTION =
  'Answer six questions and get an honest shortlist of WhatsApp tools for your Shopify store in India: TopEdge, WATI, Interakt, AiSensy and Bitespeed compared.';

const FAQS = [
  {
    question: 'Is this tool finder neutral?',
    answer:
      'TopEdge built it, so read it with that in mind. To keep it fair, the scoring is written out on this page, every competitor detail is taken from that vendor’s own published pages, and the finder recommends another tool when your answers point there, for example if you are not on Shopify or sell mainly through Instagram.',
  },
  {
    question: 'Which is the best WhatsApp tool for a Shopify store in India?',
    answer:
      'It depends on your store. For a Shopify store doing up to 1,500 orders a month with a lot of Cash on Delivery, a Shopify-native tool with COD confirmation and no markup on Meta’s fees usually fits best. A store on another platform, an Instagram-led seller, or a very large brand will often be better served elsewhere. The quiz works this out from your answers.',
  },
  {
    question: 'Does Meta charge differently depending on the tool?',
    answer:
      'No. Meta charges the same India rates whichever tool sends the message: ₹0.8631 per marketing message and ₹0.1150 per utility message, before GST. What differs is whether the tool adds its own charge on top, and how much the plan itself costs.',
  },
  {
    question: 'Will I lose my WhatsApp templates if I switch tools later?',
    answer:
      'No. Approved templates belong to your WhatsApp Business Account, not to the tool that submitted them. As long as the new tool connects the same account, your templates come with you. Keep the Meta Business Account in your own name so this stays true.',
  },
  {
    question: 'Can I try TopEdge before paying?',
    answer:
      'Yes. Every plan starts with a 14-day free trial. Plans start at ₹1,999 a month after that, with Meta’s message fees billed to your own account at 0% markup.',
  },
];

const BLOCKS: TopicBlock[] = [
  {
    kind: 'steps',
    id: 'how-we-score',
    h2: 'How the finder scores',
    intro: 'The same rules apply to every tool, including ours.',
    steps: [
      {
        title: 'Your store platform comes first',
        body: 'A tool that cannot connect to your store is ruled out, whatever else it does well. TopEdge and Bitespeed only work with Shopify, so they drop out for other stores.',
      },
      {
        title: 'Each answer adds points for the tools that handle it',
        body: 'COD to prepaid, cart recovery, AI replies, plan price and Meta markup are scored from what each vendor publishes about itself.',
      },
      {
        title: 'You see the reasons and the catches',
        body: 'Every result lists why it fits and what to keep in mind, with a link to the full comparison and to the vendor’s own site.',
      },
    ],
  },
  {
    kind: 'checklist',
    id: 'what-to-check',
    h2: 'What to check before you pick any tool',
    doLabel: 'Ask every vendor',
    dontLabel: 'Watch out for',
    doItems: [
      'Does it connect to your store natively, without a developer?',
      'Does it add any charge on top of Meta’s message fees?',
      'Is COD confirmation included, and on which plan is COD to prepaid?',
      'What is included, and what is an add-on: AI, flows, extra agents?',
      'Can you try it free before paying?',
    ],
    dontItems: [
      'A low plan price with a per-message charge on top',
      'AI sold per message on top of the plan',
      'Flow or trigger caps that you hit in a festive month',
      'Templates created under the vendor’s account instead of yours',
      'Pricing that only appears after a sales call',
    ],
  },
];

export default function ToolFinderPage() {
  return (
    <>
      <MarketingSEO
        title={TITLE}
        description={DESCRIPTION}
        keywords="best WhatsApp tool for Shopify, best WhatsApp API for Shopify India, WATI vs Interakt vs AiSensy, WhatsApp marketing tool Shopify, cart recovery app Shopify India, COD confirmation app"
        path={PATH}
        noSuffix
        faqSchema={FAQS}
        jsonLd={[
          organizationJsonLd(),
          softwareApplicationJsonLd(),
          webPageJsonLd({ name: 'Find the best WhatsApp tool for your Shopify store', description: DESCRIPTION, path: PATH }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Free tools', path: '/tools' },
            { name: 'WhatsApp tool finder', path: PATH },
          ]),
        ]}
      />
      <MarketingPage>
        <JourneyHero
          eyebrow="Free tool"
          title="Help me find the best WhatsApp tool for my Shopify store"
          accent="best WhatsApp tool"
          subtitle="Answer six quick questions about your store. Get a shortlist that fits, with honest reasons, and see where each tool falls short."
          trust
        />

        <Section className="!pt-10 md:!pt-14">
          <ToolFinder />
        </Section>

        <Section wash="soft">
          <div className="mkt-jx-centered mx-auto flex max-w-3xl flex-col gap-14 md:gap-16">
            {BLOCKS.map((b) => (
              <TopicBlockView key={b.id} block={b} />
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
              { label: 'TopEdge vs WATI', href: '/compare/wati' },
              { label: 'TopEdge vs Interakt', href: '/compare/interakt' },
              { label: 'TopEdge vs AiSensy', href: '/compare/aisensy' },
              { label: 'TopEdge vs Bitespeed', href: '/compare/bitespeed' },
              { label: '4-way comparison', href: '/compare/topedge-vs-wati-vs-interakt-vs-aisensy' },
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

        <Section wash="soft">
          <SectionHeading title="More free tools" center />
          <div className="mx-auto max-w-5xl">
            <ToolCards tools={otherTools('best-whatsapp-tool-for-shopify').slice(0, 3)} columns={3} />
          </div>
        </Section>

        <MarketingCtaBand
          title="Try TopEdge free for 14 days"
          subtitle="Connect Shopify, switch on COD confirmation and cart recovery, and see it working on your own orders."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
