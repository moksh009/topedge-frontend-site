import { Link, Navigate, useParams } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { PageHero, Section, SectionHeading, MarketingCard } from '../components/ui';
import { getCompareCompetitor } from '../data/compareCompetitors';
import { breadcrumbJsonLd, organizationJsonLd, webPageJsonLd } from '../data/pageSeo';

type Props = { competitor?: string };

export default function ComparePage({ competitor: competitorProp }: Props) {
  const { competitor: param } = useParams();
  const slug = competitorProp || param || '';
  const data = getCompareCompetitor(slug);

  if (!data) {
    return <Navigate to="/compare" replace />;
  }

  const path = `/compare/${data.slug}`;
  const faqSchema = data.faqs.map((f) => ({ question: f.question, answer: f.answer }));

  return (
    <>
      <MarketingSEO
        title={data.title}
        description={data.description}
        keywords={data.keywords}
        path={path}
        noSuffix
        faqSchema={faqSchema}
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({ name: data.h1, description: data.description, path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Compare', path: '/compare' },
            { name: data.name, path },
          ]),
        ]}
      />
      <MarketingPage>
        <PageHero eyebrow="Compare" title={data.h1} subtitle={data.subtitle} />

        <Section className="!pt-0">
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            {data.answerFirst}
          </p>
        </Section>

        <Section wash="soft">
          <SectionHeading
            title={`Where TopEdge differs from ${data.name}`}
            subtitle="Focus on Shopify India WhatsApp automation — recovery, COD, and inbox."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {data.differentiators.map((d) => (
              <MarketingCard key={d.title} className="!p-6">
                <h2 className="text-lg font-medium text-[#0c1222]">{d.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{d.body}</p>
              </MarketingCard>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeading title="FAQ" />
          <div className="mx-auto max-w-3xl space-y-6">
            {data.faqs.map((f) => (
              <div key={f.question}>
                <h3 className="text-lg font-medium text-[#0c1222]">{f.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-slate-500">
            Also see{' '}
            {data.related.map((r, i) => (
              <span key={r.href}>
                {i > 0 ? ' · ' : null}
                <Link to={r.href} className="font-medium text-[#7C3AED]">
                  {r.label}
                </Link>
              </span>
            ))}
          </p>
        </Section>

        <MarketingCtaBand
          title="Try TopEdge on your store"
          subtitle="14-day free trial. Connect Shopify, approve templates, publish recovery."
          primaryLabel="Start free"
          secondaryLabel="See all comparisons"
          secondaryTo="/compare"
        />
      </MarketingPage>
    </>
  );
}
