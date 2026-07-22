import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../data/marketingSeo';

type FaqItem = { question: string; answer: string };

type MarketingSEOProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noSuffix?: boolean;
  faqSchema?: FaqItem[];
};

export default function MarketingSEO({
  title,
  description,
  path,
  image = `${SITE_URL}/og/og-default.svg`,
  noSuffix = false,
  faqSchema,
}: MarketingSEOProps) {
  const fullTitle = noSuffix ? title : title.includes('TopEdge') ? title : `${title} | TopEdge`;
  const url = `${SITE_URL}${path === '/' ? '' : path}`;

  const faqJsonLd = faqSchema?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqSchema.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {faqJsonLd && (
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      )}
    </Helmet>
  );
}
