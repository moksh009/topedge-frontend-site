import { Link, Navigate } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { Section, SectionHeading, PrimaryButton } from '../components/ui';
import { TopicBlockView, TopicToc } from '../components/topic/TopicBlocks';
import FaqAccordion from '../components/topic/FaqAccordion';
import JourneyFlow from '../components/journey/JourneyFlow';
import JourneyHero from '../components/journey/JourneyHero';
import JourneyCard from '../components/journey/JourneyCard';
import TrustBand from '../components/journey/TrustBand';
import { JOURNEY_EXAMPLES, journeyExampleBySlug } from '../data/journeyExamples';
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';

const INDEX_PATH = '/whatsapp-journey-examples';

/** One worked journey: the flow diagram first, then the argument around it. */
export default function JourneyExamplePage({ slug }: { slug: string }) {
  const j = journeyExampleBySlug(slug);
  if (!j) return <Navigate to={INDEX_PATH} replace />;

  const path = `${INDEX_PATH}/${j.slug}`;
  const siblings = JOURNEY_EXAMPLES.filter((x) => x.slug !== j.slug);

  return (
    <>
      <MarketingSEO
        title={j.title}
        description={j.description}
        keywords={j.keywords}
        path={path}
        noSuffix
        faqSchema={j.faqs.map((f) => ({ question: f.question, answer: f.answer }))}
        jsonLd={[
          organizationJsonLd(),
          softwareApplicationJsonLd(),
          webPageJsonLd({ name: j.h1, description: j.description, path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Journey examples', path: INDEX_PATH },
            { name: j.cardTitle, path },
          ]),
        ]}
      />
      <MarketingPage>
        <JourneyHero
          eyebrow={j.eyebrow}
          title={j.h1}
          accent={j.h1Accent}
          subtitle={j.subtitle}
          trust
          image={j.hero}
          imageAlt={j.heroAlt}
          actions={
            <>
              <PrimaryButton to="/signup">Start free</PrimaryButton>
              <Link
                to={INDEX_PATH}
                className="text-sm font-medium text-[#7C3AED] hover:underline"
              >
                All journey examples
              </Link>
            </>
          }
        />

        <Section className="!pt-0">
          <div className="mx-auto max-w-3xl">
            <p className="mkt-jh-lead">{j.answerFirst}</p>

            {/*
              The diagram sits above the prose on purpose. A merchant comparing
              platforms wants the shape of the automation before the argument
              for it, and the shape is the thing a feature list cannot show.
            */}
            <JourneyFlow trigger={j.trigger} triggerNote={j.triggerNote} steps={j.steps} />

            {j.blocks.length > 0 && (
              <div className="mt-10">
                <TopicToc blocks={j.blocks} />
              </div>
            )}
          </div>
        </Section>

        <Section className="!pt-4">
          <div className="mkt-jx-centered mx-auto flex max-w-3xl flex-col gap-14 md:gap-16">
            {j.blocks.map((b) => (
              <TopicBlockView key={b.id} block={b} />
            ))}
          </div>
        </Section>

        <Section wash="soft">
          <TrustBand />
        </Section>

        <Section>
          <SectionHeading title="Questions teams ask" accent="teams ask" />
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={j.faqs} />
          </div>
        </Section>

        <Section wash="soft">
          <SectionHeading
            title="Other journeys"
            accent="journeys"
            subtitle="More ready-made automations for your Shopify store."
          />
          <ul className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
            {siblings.map((s) => (
              <li key={s.slug}>
                <JourneyCard journey={s} href={`${INDEX_PATH}/${s.slug}`} />
              </li>
            ))}
          </ul>

          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
            {j.related.map((r) => (
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
          title="Run this journey on your store"
          subtitle="Connect Shopify, push the templates to Meta for approval, and publish. Free for 14 days, no card."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
