import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { blogPosts } from '../data/blogPosts';
import { blogPosts2 } from '../data/blogPosts2';
import { blogPosts3 } from '../data/blogPosts3';
import { blogPosts4 } from '../data/blogPosts4';

// Combine all blog posts and sort by date
const allBlogPosts = [...blogPosts, ...blogPosts2, ...blogPosts3, ...blogPosts4]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function Blog() {
  return (
    <>
      <SEO 
        title="Blog | TopEdge AI"
        description="Explore the latest insights on AI voice agents, chatbots, and customer service automation from TopEdge AI."
        keywords="AI voice agents, chatbots, customer service automation, TopEdge AI blog"
        type="website"
      />

      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Latest Insights from TopEdge AI
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Explore our latest articles on AI voice agents, chatbots, and the future of customer service automation.
              </p>
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
                className="group relative bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  {/* Image */}
                  <div className="aspect-w-16 aspect-h-9">
                    <div className="relative h-full">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="inline-block bg-purple-600 text-white px-3 py-1 rounded text-sm font-medium mb-4">
                      {post.category}
                    </span>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 mb-4 line-clamp-2">
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
    </>
  );
} 