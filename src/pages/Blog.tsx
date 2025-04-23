import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { blogPosts } from '../data/blogPosts';
import { blogPosts2 } from '../data/blogPosts2';
import { blogPosts3 } from '../data/blogPosts3';
import { blogPosts4 } from '../data/blogPosts4';
import { blogPosts5 } from '../data/blogPosts5';
import { blogPosts6 } from '../data/blogPosts6';


// Combine all blog posts and sort by date
const allBlogPosts = [...blogPosts, ...blogPosts2, ...blogPosts3, ...blogPosts4, ...blogPosts5, ...blogPosts6]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function Blog() {
  return (
    <>
      <SEO 
        title="TopEdge AI Blog | Insights & Updates"
        description="Explore the latest insights, news, and strategies on AI voice agents, chatbots, and business automation from TopEdge AI. Stay ahead with TopEdge AI."
        keywords="TopEdge, TopEdge AI, AI voice agents, AI chatbots, business automation, AI agency, TopEdge AI blog, customer satisfaction"
        type="website"
        url="https://topedge.ai/blog"
        canonical="https://topedge.ai/blog"
        ogTitle="TopEdge AI Blog | Insights & Updates"
        ogDescription="Discover the latest from TopEdge AI: voice agents, chatbots, automation, and more. Industry-leading insights and news."
        ogImage="/logo.png"
        ogUrl="https://topedge.ai/blog"
        twitterTitle="TopEdge AI Blog | Insights & Updates"
        twitterDescription="TopEdge AI shares the latest in AI voice agents, chatbots, and automation. Read our blog for industry tips and news."
        twitterImage="/logo.png"
        twitterCard="summary_large_image"
      />
      {/* BreadcrumbList Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://topedge.ai/'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Blog',
                'item': 'https://topedge.ai/blog'
              }
            ]
          })
        }}
      />
      {/* Blog Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            'name': 'TopEdge AI Blog',
            'description': 'Explore the latest insights on AI voice agents, chatbots, and customer service automation from TopEdge AI.',
            'url': 'https://topedge.ai/blog',
            'blogPost': allBlogPosts.slice(0, 10).map(post => ({
              '@type': 'BlogPosting',
              'headline': post.title,
              'description': post.description,
              'image': post.image,
              'url': `https://topedge.ai/blog/${post.slug}`,
              'datePublished': new Date(post.date).toISOString(),
              'author': {
                '@type': 'Person',
                'name': (typeof post === 'object' && 'author' in post && post.author) ? post.author : 'TopEdge AI Team'
              }
            }))
          })
        }}
      />

      <div className="min-h-screen bg-white text-gray-800">
        <nav className="hidden">
          <a href="/" title="TopEdge AI Home">TopEdge AI</a>
        </nav>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center sr-only">
  TopEdge AI Blog – #1 AI Voice Agents, Chatbots & Automation Insights
</h1>
        {/* Header */}
        <div className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-100/20 to-white" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Latest Insights from TopEdge AI
                </span>
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-4">
                Welcome to the TopEdge AI Blog – your #1 resource for AI voice agents, chatbots, business automation, and digital transformation. Discover how TopEdge AI delivers 300% ROI, 85% cost reduction, and industry-leading AI solutions for every sector. Stay ahead with expert insights, case studies, and strategies to automate your business and boost customer satisfaction.
              </p>
              <div className="flex justify-center gap-6 mb-8">
                <a href="/" className="text-blue-600 underline font-semibold" title="TopEdge AI Home">TopEdge AI Home</a>
                <a href="/services" className="text-blue-600 underline font-semibold" title="TopEdge AI Services">TopEdge AI Services</a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBlogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  {/* Image */}
                  <div className="aspect-w-16 aspect-h-9">
                    <div className="relative h-full">
                      <img
                        src={post.image}
                        alt={`Cover image for blog post: ${post.title}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-40" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="inline-block bg-purple-600 text-white px-3 py-1 rounded text-sm font-medium mb-4">
                      {post.category}
                    </span>
                    <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    {/* --- Advanced Schema Markup: FAQ & Review --- */}
    <script type="application/ld+json" suppressHydrationWarning>{JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is TopEdge AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "TopEdge AI provides advanced AI voice agents and chatbots for business automation, delivering 300% ROI and 85% cost reduction."
          }
        },
        {
          "@type": "Question",
          "name": "How can AI callers help my business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI callers automate outbound and inbound calls, improving efficiency, reducing costs, and increasing customer satisfaction."
          }
        },
        {
          "@type": "Question",
          "name": "Is TopEdge AI compliant with industry regulations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, TopEdge AI solutions are HIPAA and GDPR compliant, ensuring data security and privacy."
          }
        }
      ]
    })}</script>
    <script type="application/ld+json" suppressHydrationWarning>{JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "Organization",
        "name": "TopEdge AI"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Verified Client"
      },
      "reviewBody": "TopEdge AI transformed our business with their AI voice agents – we saw a 300% ROI in just 3 months!"
    })}</script>
    {/* --- FAQ Section --- */}
    <section className="max-w-4xl mx-auto my-16">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions about TopEdge AI</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">What is TopEdge AI?</h3>
          <p>TopEdge AI provides advanced AI voice agents and chatbots for business automation, delivering 300% ROI and 85% cost reduction.</p>
        </div>
        <div>
          <h3 className="font-semibold">How can AI callers help my business?</h3>
          <p>AI callers automate outbound and inbound calls, improving efficiency, reducing costs, and increasing customer satisfaction.</p>
        </div>
        <div>
          <h3 className="font-semibold">Is TopEdge AI compliant with industry regulations?</h3>
          <p>Yes, TopEdge AI solutions are HIPAA and GDPR compliant, ensuring data security and privacy.</p>
        </div>
      </div>
    </section>
    {/* --- Review/Testimonial Section --- */}
    <section className="max-w-4xl mx-auto my-16">
      <h2 className="text-2xl font-bold mb-6 text-center">What Our Clients Say</h2>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow text-center">
        <p className="text-lg italic mb-2">“TopEdge AI transformed our business with their AI voice agents – we saw a 300% ROI in just 3 months!”</p>
        <span className="block font-semibold text-blue-700">— Verified Client</span>
      </div>
    </section>

    </>
  );
} 