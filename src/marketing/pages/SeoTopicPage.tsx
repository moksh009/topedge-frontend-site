import { Link, Navigate } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { PageHero, Section, SectionHeading, MarketingCard, PrimaryButton } from '../components/ui';
import { TopicBlockView, TopicToc } from '../components/topic/TopicBlocks';
import FaqAccordion from '../components/topic/FaqAccordion';
import { getSeoTopic } from '../data/seoTopics';
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';

type Props = { slug: string };

/** Commercial SEO/GEO lander bound to a fixed slug (not a :param catch-all). */
export default function SeoTopicPage({ slug }: Props) {
  const topic = getSeoTopic(slug);

  if (!topic) {
    return <Navigate to="/features" replace />;
  }

  const path = `/${topic.slug}`;
  const faqSchema = topic.faqs.map((f) => ({ question: f.question, answer: f.answer }));
  const blocks = topic.blocks ?? [];

  return (
    <>
      <MarketingSEO
        title={topic.title}
        description={topic.description}
        keywords={topic.keywords}
        path={path}
        noSuffix
        faqSchema={faqSchema}
        jsonLd={[
          organizationJsonLd(),
          softwareApplicationJsonLd(),
          webPageJsonLd({
            name: topic.h1,
            description: topic.description,
            path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: topic.h1, path },
          ]),
        ]}
      />
      <MarketingPage>
        <PageHero eyebrow={topic.eyebrow} title={topic.h1} subtitle={topic.subtitle}>
          <PrimaryButton to="/signup">Start free</PrimaryButton>
          <Link to="/pricing" className="text-sm font-medium text-[#7C3AED] hover:underline">
            See pricing →
          </Link>
        </PageHero>

        <Section className="!pt-0">
          <div className="mx-auto max-w-3xl">
            <p className="text-base leading-relaxed text-slate-600 md:text-lg">{topic.answerFirst}</p>
            {blocks.length > 0 && (
              <div className="mt-8">
                <TopicToc blocks={blocks} />
              </div>
            )}
          </div>
        </Section>

        <Section wash="soft">
          <SectionHeading
            title="What you can run"
            subtitle="Practical WhatsApp ecommerce automation on Shopify."
          />
          <ul className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            {topic.bullets.map((b) => (
              <li key={b}>
                <MarketingCard className="!p-5 h-full">
                  <p className="text-sm leading-relaxed text-slate-600">{b}</p>
                </MarketingCard>
              </li>
            ))}
          </ul>
        </Section>

        {blocks.length > 0 ? (
          /*
           * One Section wrapping all blocks, not one Section per block. A
           * Section carries 7rem of vertical padding, which is a page break
           * between unrelated things; inside a single argument it reads as
           * drift. Blocks space themselves.
           */
          <Section className="!pt-4">
            <div className="mx-auto flex max-w-3xl flex-col gap-14 md:gap-16">
              {blocks.map((b) => (
                <TopicBlockView key={b.id} block={b} />
              ))}
            </div>
          </Section>
        ) : (
          topic.sections.map((s) => (
            <Section key={s.h2}>
              <div className="mx-auto max-w-3xl">
                <h2 className="mkt-display text-3xl font-medium tracking-tight text-[#0c1222]">{s.h2}</h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">{s.body}</p>
              </div>
            </Section>
          ))
        )}

        <Section wash="soft">
          <SectionHeading title="Questions teams ask" />
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={topic.faqs} />
          </div>
        </Section>

        <Section>
          <SectionHeading title="Related pages" subtitle="Keep exploring WhatsApp automation for Shopify." />
          <ul className="mx-auto flex max-w-3xl flex-wrap gap-3">
            {topic.related.map((r) => (
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
          title="Run this on your Shopify store"
          subtitle="Start free, connect Shopify and WhatsApp, approve templates, publish your first journey."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
