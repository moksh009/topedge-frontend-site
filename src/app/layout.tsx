import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://topedgeai.com'),
  title: {
    template: '%s | TopEdge AI',
    default: 'TopEdge AI – Leading Intelligent Automation Solutions | 24/7 Business Efficiency'
  },
  description: 'TopEdge AI is the premier AI automation solutions provider. Our intelligent voice bots and automation tools help businesses operate 24/7, increase leads, and deliver exceptional customer experiences.',
  keywords: [
    'AI caller',
    'AI automation',
    'business efficiency',
    'voice bot',
    'TopEdge AI',
    'AI customer experience',
    'automation agency',
    'AI solutions partner',
    'virtual assistant',
    'AI sales calls',
    'automated customer support',
    'AI lead generation',
    '24/7 customer service',
    'conversational AI',
    'AI voice assistant',
    'business productivity',
    'AI solutions',
    'intelligent automation'
  ],
  authors: [{ name: 'TopEdge AI' }],
  creator: 'TopEdge AI',
  publisher: 'TopEdge AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'TopEdge AI – Leading Intelligent Automation Solutions | 24/7 Business Efficiency',
    description: 'Transform your business with TopEdge AI - the premier agency for AI callers, automation solutions, and intelligent automation tools. Boost efficiency and grow 24/7.',
    url: 'https://topedgeai.com',
    siteName: 'TopEdge AI',
    images: [
      {
        url: 'https://topedgeai.com/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TopEdge AI - Intelligent Business Automation Solutions'
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TopEdge AI – Leading Intelligent Automation Solutions',
    description: "Boost business efficiency with TopEdge AI's intelligent voice bots and automation tools",
    images: [{
      url: 'https://topedgeai.com/assets/twitter-preview.jpg',
      alt: 'TopEdge AI - Intelligent Business Automation Solutions'
    }],
    site: '@topedge_ai',
    creator: '@topedge_ai'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification'
  },
  alternates: {
    canonical: 'https://topedgeai.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
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
      </head>
      <body>{children}</body>
    </html>
  )
} 