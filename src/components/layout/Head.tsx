import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export default function SEOHead({
  title = "TopEdge AI – AI Callers & Chatbots for 24/7 Business Automation",
  description = "TopEdge AI offers smart AI callers, chatbots, and voice assistants that help businesses operate efficiently 24/7. Increase leads and automate support with ease.",
  keywords = "AI caller, chatbot for business, 24/7 AI assistant, voice bot, TopEdge AI, AI customer service, automation, AI agency, chatbot agency, AI caller agency",
  ogImage = "https://topedgeai.com/assets/og-image.jpg",
  canonicalUrl = "https://topedgeai.com"
}: SEOProps) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content="Boost business efficiency with TopEdge AI's intelligent voice bots and automation tools." />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="TopEdge AI" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "TopEdge AI",
            "url": "https://topedgeai.com",
            "logo": "https://topedgeai.com/assets/logo.png",
            "sameAs": [
              "https://www.linkedin.com/company/topedgeai",
              "https://www.instagram.com/topedge_ai",
              "https://www.youtube.com/@topedge_ai"
            ],
            "description": "TopEdge AI is a leading provider of AI callers, chatbots, and automation tools for businesses.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://topedgeai.com/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </Head>
  );
} 