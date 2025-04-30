import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  pageType?: 'website' | 'article' | 'product';
  articleData?: {
    publishedTime: string;
    modifiedTime: string;
    author: string;
    section: string;
  };
}

export default function SEOHead({
  title = "TopEdge AI – AI Callers & Chatbots for 24/7 Business Automation",
  description = "TopEdge AI offers AI-powered automation solutions that help businesses streamline operations and enhance customer experience.",
  keywords = "AI caller, chatbot for business, 24/7 AI assistant, voice bot, TopEdge AI, AI customer service, automation, AI solutions partner, automation solutions",
  ogImage = "https://topedgeai.com/assets/og-image.jpg",
  canonicalUrl = "https://topedgeai.com",
  pageType = "website",
  articleData
}: SEOProps) {
  return (
    <Head>
      {/* Security Headers */}
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' player.vimeo.com *.vimeocdn.com; frame-src 'self' player.vimeo.com; img-src 'self' data: *.vimeocdn.com; style-src 'self' 'unsafe-inline'; connect-src 'self' player.vimeo.com *.vimeocdn.com" />
      
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="TopEdge AI" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article Specific Meta Tags */}
      {pageType === 'article' && articleData && (
        <>
          <meta property="article:published_time" content={articleData.publishedTime} />
          <meta property="article:modified_time" content={articleData.modifiedTime} />
          <meta property="article:author" content={articleData.author} />
          <meta property="article:section" content={articleData.section} />
        </>
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@topedge_ai" />
      <meta name="twitter:creator" content="@topedge_ai" />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="TopEdge AI" />
      <meta name="theme-color" content="#6366f1" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />

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
              "https://www.youtube.com/@topedge_ai",
              "https://twitter.com/topedge_ai"
            ],
            "description": "TopEdge AI is a leading provider of AI callers, chatbots, and automation tools for businesses.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "support@topedgeai.com"
            },
            "potentialAction": [{
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://topedgeai.com/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }]
          })
        }}
      />
    </Head>
  );
} 