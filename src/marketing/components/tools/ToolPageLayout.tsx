import type { ReactNode } from 'react';
import { Lock } from 'lucide-react';
import MarketingSEO from '../MarketingSEO';
import MarketingPage from '../MarketingPage';
import MarketingCtaBand from '../MarketingCtaBand';
import { Section, SectionHeading } from '../ui';
import JourneyHero from '../journey/JourneyHero';
import { TopicBlockView, type TopicBlock } from '../topic/TopicBlocks';
import FaqAccordion from '../topic/FaqAccordion';
import ToolCards from './ToolCards';
import { otherTools } from '../../data/freeTools';
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from '../../data/pageSeo';
import '../../styles/journey-flow.css';
import '../../styles/tools.css';

/** One free tool page: hero, the tool itself, the explainer, FAQ, more tools. */
export default function ToolPageLayout({
  slug,
  path,
  seoTitle,
  description,
  keywords,
  name,
  h1,
  accent,
  subtitle,
  privacy,
  blocks,
  faqs,
  cta,
  children,
}: {
  slug: string;
  path: string;
  seoTitle: string;
  description: string;
  keywords: string;
  /** Short name for the breadcrumb and structured data. */
  name: string;
  h1: string;
  accent?: string;
  subtitle: string;
  /** Shown under the tool: what happens to what the visitor types. */
  privacy: string;
  blocks: TopicBlock[];
  faqs: { question: string; answer: string }[];
  cta: { title: string; subtitle: string };
  children: ReactNode;
}) {
  return (
    <>
      <MarketingSEO
        title={seoTitle}
        description={description}
        keywords={keywords}
        path={path}
        noSuffix
        faqSchema={faqs}
        jsonLd={[
          organizationJsonLd(),
          softwareApplicationJsonLd(),
          webPageJsonLd({ name, description, path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Free tools', path: '/tools' },
            { name, path },
          ]),
        ]}
      />
      <MarketingPage>
        <JourneyHero eyebrow="Free tool" title={h1} accent={accent} subtitle={subtitle} trust />

        <Section className="!pt-10 md:!pt-14">
          <div className="mkt-tool">
            {children}
            <p className="mkt-tool__privacy">
              <Lock size={14} strokeWidth={2.2} aria-hidden />
              {privacy}
            </p>
          </div>
        </Section>

        <Section wash="soft">
          <div className="mkt-jx-centered mx-auto flex max-w-3xl flex-col gap-14 md:gap-16">
            {blocks.map((b) => (
              <TopicBlockView key={b.id} block={b} />
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeading title="Questions teams ask" center />
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={faqs} />
          </div>
        </Section>

        <Section wash="soft">
          <SectionHeading title="More free tools" center />
          <div className="mx-auto max-w-5xl">
            <ToolCards tools={otherTools(slug).slice(0, 3)} columns={3} />
          </div>
        </Section>

        <MarketingCtaBand
          title={cta.title}
          subtitle={cta.subtitle}
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
