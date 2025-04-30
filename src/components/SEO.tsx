import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  twitterHandle?: string;
  schema?: Record<string, any>;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  image = 'https://topedgeai.com/og-default.jpg',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'TopEdge AI',
  twitterHandle = '@topedgeai',
  schema,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage,
  twitterCard
}: SEOProps) {
  const siteTitle = 'TopEdge AI | Intelligent Automation for Modern Business';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  
  // Enhanced keyword list based on SEMrush research and industry targeting
  const defaultKeywords = 'AI caller, TopEdge AI, AI agency, AI chatbot, WhatsApp automation, Instagram chatbot, voice AI solutions, AI voice agents, business automation, intelligent chatbot, voice AI technology, automated calling system, AI customer service, AI sales automation, AI lead generation, conversational AI, virtual agents, AI ROI, customer service automation, AI implementation, AI voice authentication, AI security, HIPAA compliant AI, banking automation, real estate AI, education AI, healthcare AI solutions, e-commerce AI, AI cost reduction, AI efficiency, AI customer engagement, AI voice recognition, natural language processing, sentiment analysis, multi-language AI, AI appointment scheduling, AI property management, AI enrollment system, AI fraud detection, AI compliance, AI voice cloning, AI personality customization, CRM integration, AI analytics, cloud AI solutions, enterprise AI, digital transformation, AI consulting, AI strategy, AI implementation guide, AI success metrics, AI case studies, AI performance optimization';

  // Enhanced schema for better search visibility
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TopEdge AI",
    "alternateName": [
      "Top Edge AI",
      "TopEdge Artificial Intelligence",
      "TopEdge AI Agency",
      "TopEdge Voice Solutions",
      "TopEdge Chatbot Solutions",
      "TopEdge WhatsApp Automation",
      "TopEdge Instagram Automation"
    ],
    "url": "https://topedgeai.com",
    "logo": "https://topedgeai.com/logo.png",
    "description": "TopEdge AI is a trusted AI agency delivering proven ROI improvements through advanced AI callers, WhatsApp automation, and Instagram chatbots. Our solutions reduce costs while achieving high customer satisfaction.",
    "sameAs": [
      "https://twitter.com/topedgeai",
      "https://linkedin.com/company/topedgeai",
      "https://instagram.com/topedgeai",
      "https://facebook.com/topedgeai",
      "https://youtube.com/topedgeai"
    ],
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+1-800-TOPEDGE",
      "contactType": "sales",
      "availableLanguage": ["English", "Spanish", "French", "German", "Chinese", "Japanese"],
      "areaServed": ["US", "CA", "GB", "AU", "EU", "Asia", "Global"]
    }, {
      "@type": "ContactPoint",
      "telephone": "+1-888-TOPEDGE",
      "contactType": "customer service",
      "availableLanguage": ["English", "Spanish", "French", "German", "Chinese", "Japanese"],
      "areaServed": ["US", "CA", "GB", "AU", "EU", "Asia", "Global"]
    }],
    "offers": {
      "@type": "AggregateOffer",
      "description": "AI Voice Agents & Chatbot Solutions with proven ROI improvements",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "category": "Business Software > Artificial Intelligence",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI Solutions Catalog",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Voice Agents",
              "description": "Advanced AI callers with high satisfaction rate"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "WhatsApp Automation",
              "description": "Intelligent WhatsApp chatbots for business"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Instagram Automation",
              "description": "AI-powered Instagram engagement solutions"
            }
          }
        ]
      }
    },
    "award": [
      {
        "@type": "Award",
        "name": "Top AI Implementation Agency"
      },
      {
        "@type": "Award",
        "name": "Top Voice AI Solution Provider"
      }
    ],
    "potentialAction": [{
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://topedgeai.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }]
  };

  // Enhanced product schema for AI solutions
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "TopEdge AI Voice & Chatbot Solutions",
    "description": "Industry-leading AI voice agents and chatbots delivering proven ROI improvements and cost reduction",
    "brand": {
      "@type": "Brand",
      "name": "TopEdge AI",
      "slogan": "Transform Business Communication with proven ROI improvements"
    },
    "category": "Business Software > Artificial Intelligence > Voice AI",
    "keywords": defaultKeywords,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Cloud-based",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "category": "Business Software",
      "highPrice": "10000",
      "lowPrice": "1000",
      "offerCount": "5",
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "John Smith"
        },
        "reviewBody": "Achieved proven ROI improvements within 6 months of implementing TopEdge AI solutions."
      }
    ]
  };

  // Enhanced article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Organization",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "TopEdge AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://topedgeai.com/logo.png"
      }
    },
    "datePublished": publishedTime || new Date().toISOString(),
    "dateModified": modifiedTime || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": keywords || defaultKeywords
  };

  // --- SEO Best Practices ---
  // 1. Use unique title & description per page
  // 2. Set canonical URL to avoid duplicate content
  // 3. Use relevant, natural keywords
  // 4. Add FAQ/Breadcrumb schema if available (see props)
  // 5. Ensure favicon, manifest, and PWA links are present
  // 6. Add structured data for rich results
  // 7. Use alt text for all images on the page
  // 8. Test with Google Rich Results & Lighthouse
  // --------------------------

  // Optional: Sitelinks Search Box Schema
  const sitelinksSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://topedgeai.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://topedgeai.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Optional: FAQ Schema (pass as prop: schema={faqSchema})
  // Example:
  // const faqSchema = {
  //   "@context": "https://schema.org",
  //   "@type": "FAQPage",
  //   "mainEntity": [
  //     {"@type": "Question", "name": "Q1?", "acceptedAnswer": {"@type": "Answer", "text": "A1."}},
  //     ...
  //   ]
  // };

  // Optional: Breadcrumb Schema (pass as prop: schema={breadcrumbSchema})
  // Example:
  // const breadcrumbSchema = {
  //   "@context": "https://schema.org",
  //   "@type": "BreadcrumbList",
  //   "itemListElement": [
  //     {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://topedgeai.com"},
  //     ...
  //   ]
  // };

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      {/* Viewport for mobile SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Robots meta for indexing */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      {/* Favicon & Manifest */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      {/* Primary Meta Tags */}
      <meta name="description" content={description || 'TopEdge AI: proven ROI improvements with AI callers, chatbots, and automation.'} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content={author || 'TopEdge AI'} />
      <meta name="copyright" content={` TopEdge AI`} />
      <meta name="HandheldFriendly" content="True" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="geo.region" content="US" />
      <meta name="geo.position" content="37.7749;-122.4194" />
      <meta name="ICBM" content="37.7749, -122.4194" />
      <meta name="revisit-after" content="1 days" />
      <meta name="rating" content="General" />
      <meta name="industry" content="Artificial Intelligence, Business Automation" />
      <meta name="target" content="Enterprise, SMB, Startups" />
      <meta name="coverage" content="Worldwide" />
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || 'TopEdge AI: proven ROI improvements with AI callers, chatbots, and automation.'} />
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:image" content={image || 'https://topedgeai.com/og-default.jpg'} />
      <meta property="og:url" content={url || 'https://topedgeai.com'} />
      <meta property="og:site_name" content="TopEdge AI" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_GB,es_ES,fr_FR,de_DE,zh_CN,ja_JP" />
      <meta property="og:updated_time" content={new Date().toISOString()} />
      <meta property="og:email" content="contact@topedgeai.com" />
      <meta property="og:phone_number" content="+1-800-TOPEDGE" />
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard || "summary_large_image"} />
      <meta name="twitter:title" content={twitterTitle || fullTitle} />
      <meta name="twitter:description" content={twitterDescription || description} />
      <meta name="twitter:image" content={twitterImage || image} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      {/* Article-specific OG tags */}
      {type === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {type === 'article' && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === 'article' && author && <meta property="article:author" content={author} />}
      {type === 'article' && <meta property="article:publisher" content="https://topedgeai.com" />}
      {type === 'article' && <meta property="article:section" content="Artificial Intelligence" />}
      {type === 'article' && <meta property="article:tag" content="AI Technology, Voice AI, Chatbots, Business Automation" />}
      {/* Canonical & Preconnect */}
      {canonical && <link rel="canonical" href={canonical} />}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(
          schema || 
          (type === 'product' ? productSchema : 
           type === 'article' ? articleSchema : 
           defaultSchema)
        )}
      </script>
      {/* Sitelinks Search Box Schema for homepage only */}
      {url === 'https://topedgeai.com' && (
        <script type="application/ld+json">{JSON.stringify(sitelinksSchema)}</script>
      )}
    </Helmet>
  );
} 