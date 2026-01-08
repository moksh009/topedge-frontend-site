import React from 'react';
import { Helmet } from 'react-helmet-async';

interface CommunitySEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  author?: string;
}

const CommunitySEO: React.FC<CommunitySEOProps> = ({ 
  title, 
  description, 
  image = 'https://topedgeai.com/community-og.png', 
  url,
  type = 'website',
  publishedTime,
  author
}) => {
  // Ensure title is specific
  const fullTitle = title.includes('TopEdge AI') ? title : `${title} | TopEdge AI Community`;
  const fullUrl = url?.startsWith('http') ? url : `https://topedgeai.com${url || '/community'}`;

  // JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TopEdge AI Community",
    "url": "https://topedgeai.com/community",
    "description": "Join the TopEdge AI Community to learn, build, and scale with AI. Connect with founders, developers, and automation experts.",
    "publisher": {
      "@type": "Organization",
      "name": "TopEdge AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://topedgeai.com/logo.png"
      }
    }
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="TopEdge AI Community" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* WhatsApp / Social Previews */}
      <meta property="og:image:alt" content="TopEdge AI Community Preview" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default CommunitySEO;
