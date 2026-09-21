import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../data/marketingSeo';

type FaqItem = { question: string; answer: string };

type MarketingSEOProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string;
  noSuffix?: boolean;
  /** Soft-404 / auth handoff pages — keep out of the index */
  noIndex?: boolean;
  faqSchema?: FaqItem[];
  /** Extra JSON-LD objects (Organization, SoftwareApplication, etc.) */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  type?: 'website' | 'article';
};

/** Absolute canonical. Homepage uses trailing slash to match sitemap.xml. */
export function canonicalUrlForPath(path: string): string {
  if (!path || path === '/') return `${SITE_URL}/`;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${clean.replace(/\/$/, '')}`;
}

export default function MarketingSEO({
  title,
  description,
  path,
  image = `${SITE_URL}/og-image.png`,
  keywords,
  noSuffix = false,
  noIndex = false,
  faqSchema,
  jsonLd,
  type = 'website',
}: MarketingSEOProps) {
  const fullTitle = noSuffix ? title : title.includes('TopEdge') ? title : `${title} | TopEdge`;
  const url = canonicalUrlForPath(path);
  const robots = noIndex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const schemas: Record<string, unknown>[] = [];

  if (faqSchema?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqSchema.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }

  if (jsonLd) {
    schemas.push(...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]));
  }

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en-IN" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={url} />
      <meta name="robots" content={robots} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="TopEdge" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
