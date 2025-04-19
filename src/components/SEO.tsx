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
  schema
}: SEOProps) {
  const siteTitle = 'TopEdge AI - #1 AI Voice & Chatbot Agency | 300% ROI Guaranteed';
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
    "description": "TopEdge AI is the leading AI agency delivering 300% ROI through advanced AI callers, WhatsApp automation, and Instagram chatbots. Our solutions reduce costs by 85% while achieving 95% customer satisfaction.",
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
      "description": "AI Voice Agents & Chatbot Solutions with 300% ROI Guarantee",
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
              "description": "Advanced AI callers with 95% satisfaction rate"
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
        "name": "Best AI Implementation Agency 2024"
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
    "description": "Industry-leading AI voice agents and chatbots delivering 300% ROI and 85% cost reduction",
    "brand": {
      "@type": "Brand",
      "name": "TopEdge AI",
      "slogan": "Transform Business Communication with 300% ROI"
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
        "reviewBody": "Achieved 300% ROI within 6 months of implementing TopEdge AI solutions."
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

  const metaTags = [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=5.0" },
    { name: "description", content: description },
    { name: "keywords", content: keywords || defaultKeywords },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:site_name", content: siteTitle },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: twitterHandle },
    { name: "twitter:creator", content: twitterHandle },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    { name: "googlebot", content: "index, follow, max-image-preview:large" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    { name: "apple-mobile-web-app-title", content: siteTitle },
    { name: "application-name", content: siteTitle },
    { name: "theme-color", content: "#000000" },
    { name: "msapplication-TileColor", content: "#000000" },
    // Enhanced SEO meta tags
    { name: "author", content: "TopEdge AI" },
    { name: "geo.region", content: "US" },
    { name: "geo.position", content: "37.7749;-122.4194" },
    { name: "ICBM", content: "37.7749, -122.4194" },
    { property: "og:locale", content: "en_US" },
    { property: "og:locale:alternate", content: "en_GB,es_ES,fr_FR,de_DE,zh_CN,ja_JP" },
    { property: "og:updated_time", content: new Date().toISOString() },
    // Additional SEO tags
    { name: "format-detection", content: "telephone=no" },
    { name: "HandheldFriendly", content: "True" },
    { property: "og:email", content: "contact@topedgeai.com" },
    { property: "og:phone_number", content: "+1-800-TOPEDGE" },
    { name: "revisit-after", content: "1 days" },
    { name: "rating", content: "General" },
    { name: "copyright", content: `© ${new Date().getFullYear()} TopEdge AI` },
    // Industry-specific tags
    { name: "industry", content: "Artificial Intelligence, Business Automation" },
    { name: "target", content: "Enterprise, SMB, Startups" },
    { name: "coverage", content: "Worldwide" }
  ].filter(tag => Object.values(tag).every(value => value !== undefined));

  if (type === 'article') {
    if (publishedTime) metaTags.push({ property: "article:published_time", content: publishedTime });
    if (modifiedTime) metaTags.push({ property: "article:modified_time", content: modifiedTime });
    if (author) metaTags.push({ property: "article:author", content: author });
    metaTags.push({ property: "article:publisher", content: "https://topedgeai.com" });
    metaTags.push({ property: "article:section", content: "Artificial Intelligence" });
    metaTags.push({ property: "article:tag", content: "AI Technology, Voice AI, Chatbots, Business Automation" });
  }

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      {metaTags.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}
      <link rel="canonical" href={url} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <script type="application/ld+json">
        {JSON.stringify(
          schema || 
          (type === 'product' ? productSchema : 
           type === 'article' ? articleSchema : 
           defaultSchema)
        )}
      </script>
    </Helmet>
  );
} 