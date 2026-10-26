import { Link, Navigate } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { Section, SectionHeading, PrimaryButton } from '../components/ui';
import { TopicBlockView, TopicToc } from '../components/topic/TopicBlocks';
import FaqAccordion from '../components/topic/FaqAccordion';
import JourneyFlow from '../components/journey/JourneyFlow';
import JourneyHero from '../components/journey/JourneyHero';
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

            {/*
              j.image is a real product composition, not generated art, kept
              for exactly this: showing what the journey looks like running
              rather than only describing it.
            */}
            <figure className="mkt-jx-band">
              <img
                src={j.image}
                alt={j.imageAlt}
                width={1200}
                height={750}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="mkt-jx-band__caption">{j.imageAlt}</figcaption>
            </figure>

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
          <SectionHeading title="Questions teams ask" center />
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={j.faqs} />
          </div>
        </Section>

        <Section>
          <SectionHeading
            title="Other journeys"
            subtitle="The rest of what runs on a Shopify store from day one."
            center
          />
          <ul className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
            {siblings.map((s) => (
              <li key={s.slug}>
                <Link to={`${INDEX_PATH}/${s.slug}`} className="mkt-jx-card">
                  <span className="mkt-jx-card__media">
                    <img src={s.art} alt="" aria-hidden width={640} height={400} loading="lazy" decoding="async" />
                  </span>
                  <span className="mkt-jx-card__trigger">{s.cardTrigger}</span>
                  <span className="mkt-jx-card__title">{s.cardTitle}</span>
                  <span className="mkt-jx-card__blurb">{s.cardBlurb}</span>
                </Link>
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
