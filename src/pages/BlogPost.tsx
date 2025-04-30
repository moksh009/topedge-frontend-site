import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { blogPosts } from '../data/blogPosts';
import { blogPosts2 } from '../data/blogPosts2';
import { blogPosts3 } from '../data/blogPosts3';
import { blogPosts4 } from '../data/blogPosts4';
import { blogPosts5 } from '../data/blogPosts5';
import blogPosts7 from '../data/blogPosts7';
import { TwitterIcon, LinkedInIcon, FacebookIcon } from '../components/Icons';

// Combine all blog posts
const allBlogPosts = [...blogPosts, ...blogPosts2, ...blogPosts3, ...blogPosts4, ...blogPosts5, blogPosts7];

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = allBlogPosts.find(post => post.slug === slug);

  if (!post) {
    return (
      <>
        <SEO 
          title="Post Not Found"
          description="The blog post you're looking for could not be found."
          type="website"
        />
        <div className="min-h-screen bg-[#0A0F1E] text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Post Not Found</h1>
            <p className="text-[#94A3B8] mb-8">The blog post you're looking for doesn't exist.</p>
            <Link 
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-[#F59E0B] text-[#0F172A] font-semibold hover:bg-[#FBBF24] transition-colors"
            >
              Return to Blog
            </Link>
          </div>
        </div>
      </>
    );
  }

  const publishedDate = new Date(post.date).toISOString();

  return (
    <>
      <SEO
        title={`${post.title} | TopEdge AI Blog`}
        description={post.description}
        type="article"
        url={`https://topedge.ai/blog/${post.slug}`}
        canonical={`https://topedge.ai/blog/${post.slug}`}
        image={post.image}
        publishedTime={new Date(post.date).toISOString()}
        ogTitle={`${post.title} | TopEdge AI Blog`}
        ogDescription={post.description}
        ogImage={post.image}
        ogUrl={`https://topedge.ai/blog/${post.slug}`}
        twitterTitle={`${post.title} | TopEdge AI Blog`}
        twitterDescription={post.description}
        twitterImage={post.image}
        twitterCard="summary_large_image"
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.description,
          "image": post.image,
          "publisher": {
            "@type": "Organization",
            "name": "TopEdge AI",
            "logo": {
              "@type": "ImageObject",
              "url": "https://topedge.ai/logo.png"
            }
          },
          "datePublished": new Date(post.date).toISOString(),
          "dateModified": new Date(post.date).toISOString(),
          "mainEntityOfPage": `https://topedge.ai/blog/${post.slug}`
        }}
      />

      {/* Breadcrumb structured data for SEO */}
      <script type="application/ld+json" suppressHydrationWarning>{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://topedge.ai/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://topedge.ai/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://topedge.ai/blog/${post.slug}`
          }
        ]
      })}</script>
      {/* Organization Schema for Publisher */}
      <script type="application/ld+json" suppressHydrationWarning>{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "TopEdge AI",
        "url": "https://topedge.ai/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://topedge.ai/logo.png"
        },
        "sameAs": [
          "https://www.linkedin.com/company/topedge-ai/",
          "https://twitter.com/topedgeai"
        ]
      })}</script>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-100/20 to-white" />
          </div>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto ">
              <nav className="hidden">
                <a href="/" title="TopEdge AI Home">TopEdge AI</a>
              </nav>
              
            </div>
            {/* Back to All Blogs Button */}
            <div className="mb-2">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 group"
              >
                <svg className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Back to All Blogs
              </Link>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
                {post.title} – TopEdge AI Blog | Expert Insights on AI Voice Agents & Chatbot Solutions
              </h1>
              <div className="flex gap-6 mb-4">
                <a href="/" className="text-blue-600 underline font-semibold" title="TopEdge AI Home">TopEdge AI Home</a>
                <a href="/services" className="text-blue-600 underline font-semibold" title="TopEdge AI Services">TopEdge AI Services</a>
              </div>
              <div className="flex items-center justify-center text-gray-600 space-x-4 text-sm">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-10"
          >
            {/* Featured Image */}
            <div className="aspect-w-16 aspect-h-9 mb-10 rounded-2xl overflow-hidden border-4 border-purple-100 shadow-lg">
              <img
                src={post.image}
                alt={`Image for blog post: ${post.title}`}
                className="w-full h-64 object-cover rounded-t-2xl mb-8 shadow-lg"
                loading="lazy"
              />
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-strong:text-gray-900 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-blockquote:border-l-4 prose-blockquote:border-purple-400 prose-blockquote:bg-purple-50 prose-blockquote:text-gray-800 prose-img:rounded-xl prose-img:shadow-lg prose-img:border-2 prose-img:border-purple-100 prose-li:marker:text-purple-600 prose-table:border prose-table:border-gray-200 prose-th:bg-purple-50 prose-th:text-purple-700 prose-th:font-semibold prose-td:border-gray-100 prose-hr:border-purple-200 dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-blockquote:bg-purple-950 dark:prose-blockquote:text-gray-100 dark:prose-img:border-purple-800 dark:prose-img:shadow-xl dark:prose-th:bg-purple-900 dark:prose-th:text-purple-200 dark:prose-td:border-gray-800 font-sans" dangerouslySetInnerHTML={{ __html: post.content || '' }} />

            {/* Gradient Divider */}
            <div className="my-12 h-1 w-full bg-gradient-to-r from-purple-200 via-blue-100 to-purple-200 rounded-full opacity-70" />

            {/* Share Section */}
            <div className="pt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Share this article</h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex space-x-4">
                  <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors shadow">
                    <TwitterIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors shadow">
                    <LinkedInIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors shadow">
                    <FacebookIcon className="w-5 h-5" />
                  </button>
                </div>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 group"
                >
                  <svg className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  Back to All Blogs
                </Link>
              </div>
            </div>
            {/* Related Articles Section */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-8 text-gray-900">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allBlogPosts.filter(p => p.slug !== post.slug).slice(0, 4).map(related => (
                  <Link
                    key={related.slug}
                    to={`/blog/${related.slug}`}
                    className="block rounded-xl border border-gray-100 shadow hover:shadow-lg bg-white p-5 transition-all group"
                  >
                    <div className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">{related.title}</div>
                    <div className="text-gray-600 text-sm mb-1">{related.date} • {related.readTime}</div>
                    <div className="text-gray-500 line-clamp-2">{related.description}</div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
} 