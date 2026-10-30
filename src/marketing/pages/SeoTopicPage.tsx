import { Link, Navigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import ProofBadges from '../components/ProofBadges';
import { PrimaryButton, GhostButton } from '../components/ui';
import { TopicBlockView } from '../components/topic/TopicBlocks';
import FaqAccordion from '../components/topic/FaqAccordion';
import TrustBand from '../components/journey/TrustBand';
import { getSeoTopic } from '../data/seoTopics';
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
import '../styles/topic-page.css';

type Props = { slug: string };

/**
 * Commercial SEO/GEO lander bound to a fixed slug (not a :param catch-all).
 *
 * The page used to open on a hero, then a lead paragraph, then a two-column
 * table of contents, before the reader reached a single piece of substance.
 * That is three things to read before the page starts, and the TOC in
 * particular was doing a job the page is too short to need: it listed eight
 * headings to a reader who had not yet been given a reason to want any of
 * them. The lead stayed, because an answer-first paragraph is the one block
 * an answer engine quotes, but it is now a panel that reads as the answer
 * rather than as the first paragraph of the article.
 *
 * Measure is the other change. Everything ran at max-w-3xl, so a comparison
 * table with four columns was squeezed into 48rem on a 1440px screen with
 * empty gutters either side. Prose stays at a readable measure and the blocks
 * that are actually wide (tables, figure rows, the do/avoid pair) break out
 * of it. See topic-page.css.
 */
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
      <MarketingPage className="mkt-topic">
        <header className="mkt-topic__hero">
          <div className="mkt-topic__hero-inner">
            <Link className="mkt-topic__kicker" to="/integrations">
              Integrations
              <ArrowUpRight size={12} strokeWidth={2.2} aria-hidden />
            </Link>

            <h1 className="mkt-topic__title">
              Shopify <span className="mkt-hl">WhatsApp integration</span> for Indian D2C stores
            </h1>

            <p className="mkt-topic__sub">{topic.subtitle}</p>

            <div className="mkt-topic__actions">
              <PrimaryButton to="/signup">Start free</PrimaryButton>
              <GhostButton to="/pricing">See pricing</GhostButton>
            </div>

            <div className="mkt-topic__proof">
              <ProofBadges compact />
            </div>
          </div>

          <figure className="mkt-topic__stage">
            <img
              src="/marketing/features/shopify-whatsapp-inbox.webp"
              alt="A shared inbox showing a WhatsApp thread beside the Shopify order it belongs to: order number, Cash on Delivery status, and the product that was bought."
              width={1200}
              height={900}
              loading="eager"
              decoding="async"
            />
          </figure>
        </header>

        {/* The answer-first block, as the answer rather than as prose. Answer
            engines quote this paragraph; a reader who only wants the
            definition should be able to take it and leave. */}
        <section className="mkt-topic__answer" aria-labelledby="topic-answer-head">
          <div className="mkt-answer">
            <p className="mkt-answer__label" id="topic-answer-head">
              The short answer
            </p>
            <p className="mkt-answer__body">{topic.answerFirst}</p>
            <ul className="mkt-answer__chips">
              {topic.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mkt-topic__trust">
          <TrustBand title="Shopify brands connected to WhatsApp with TopEdge" />
        </section>

        {blocks.length > 0 ? (
          <div className="mkt-topic__article">
            {blocks.map((b) => (
              <TopicBlockView key={b.id} block={b} />
            ))}
          </div>
        ) : (
          <div className="mkt-topic__article">
            {topic.sections.map((s) => (
              <section className="mkt-blk" key={s.h2}>
                <h2 className="mkt-blk__h2">{s.h2}</h2>
                <p className="mkt-blk__body mkt-blk__body--lede">{s.body}</p>
              </section>
            ))}
          </div>
        )}

        <section className="mkt-topic__faq" aria-labelledby="topic-faq-head">
          <header className="mkt-topic__sec-head">
            <h2 className="mkt-topic__sec-title" id="topic-faq-head">
              Questions <span className="mkt-hl">teams ask</span>
            </h2>
            <p className="mkt-topic__sec-sub">
              Connection steps, Meta pricing in India, COD, and how this compares with Shopify
              abandoned cart email.
            </p>
          </header>
          <div className="mkt-topic__faq-body">
            <FaqAccordion items={topic.faqs} />
          </div>
        </section>

        <section className="mkt-topic__related" aria-labelledby="topic-related-head">
          <header className="mkt-topic__sec-head">
            <h2 className="mkt-topic__sec-title" id="topic-related-head">
              Keep <span className="mkt-hl">reading</span>
            </h2>
          </header>
          <ul className="mkt-topic__related-list">
            {topic.related.map((r) => (
              <li key={r.href}>
                <Link to={r.href}>
                  {r.label}
                  <ArrowUpRight size={13} strokeWidth={2} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <MarketingCtaBand
          title="Connect WhatsApp to your Shopify store"
          subtitle="Start free, authorise Shopify, add your Meta credentials, approve templates, publish the first journey."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
