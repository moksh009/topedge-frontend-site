import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon for all browsers (ICO and PNG) */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/logo.png" type="image/png" />
        {/* Canonical URL */}
        <link rel="canonical" href="https://topedgeai.com" />
        {/* Meta Description & Keywords */}
        <meta name="description" content="TopEdge - AI-driven platform delivering intelligent calling solutions and smart automation for businesses." />
        <meta name="keywords" content="AI call automation, TopEdge intelligent assistant, 24/7 AI caller, AI business productivity, chatbot, business automation, voice bot, AI agency, customer service, analytics, growth, automation" />
        {/* Open Graph Meta Tags (absolute URLs for images) */}
        <meta property="og:title" content="TopEdge - AI Automation for Calls" />
        <meta property="og:description" content="24/7 AI call assistant platform for smarter customer engagement. Boost productivity with intelligent automation." />
        <meta property="og:image" content="https://topedgeai.com/logo.png" />
        <meta property="og:url" content="https://topedgeai.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TopEdge AI" />
        {/* Twitter Card Meta Tags (absolute URLs for images) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TopEdge AI Automation" />
        <meta name="twitter:description" content="Smarter AI call handling. Improve customer service & productivity with TopEdge." />
        <meta name="twitter:image" content="https://topedgeai.com/logo.png" />
        {/* JSON-LD Organization Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "TopEdge",
          "url": "https://topedgeai.com",
          "logo": "https://topedgeai.com/logo.png",
          "sameAs": [
            "https://www.linkedin.com/company/topedgeai/posts/?feedView=all",
            "https://x.com/TopEdgeNetwork",
            "https://www.instagram.com/topedge_ai/",
            "https://www.youtube.com/@TopEdgeNetwork",
            "https://www.facebook.com/profile.php?id=61553261702229",
            "https://www.threads.net/@topedge_ai"
          ]
        }` }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
