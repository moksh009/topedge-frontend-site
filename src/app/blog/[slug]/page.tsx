import { Metadata } from 'next';
import { blogPosts } from '../../../data/blogPosts';
import { blogPosts2 } from '../../../data/blogPosts2';
import { blogPosts3 } from '../../../data/blogPosts3';
import { blogPosts4 } from '../../../data/blogPosts4';
import SEO from '../../../components/SEO';
import Link from 'next/link';

// Combine all blog posts
const allBlogPosts = [...blogPosts, ...blogPosts2, ...blogPosts3, ...blogPosts4];

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = allBlogPosts.find(post => post.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | TopEdge AI',
      description: 'The requested blog post could not be found.'
    };
  }

  return {
    title: `${post.title} | TopEdge AI`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: [post.image]
    }
  };
}

export default function BlogPost({ params }: Props) {
  const post = allBlogPosts.find(post => post.slug === params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Post Not Found</h1>
          <p className="text-[#94A3B8] mb-8">The blog post you're looking for doesn't exist.</p>
          <Link 
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-[#F59E0B] text-[#0F172A] rounded-lg font-semibold hover:bg-[#FBBF24] transition-colors"
          >
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        image={post.image}
        type="article"
        publishedTime={post.date}
        author="TopEdge AI"
      />
      
      <article className="min-h-screen bg-[#0A0F1E] text-white">
        {/* Navigation */}
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <Link 
            href="/blog"
            className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[400px] mt-8">
          <div className="absolute inset-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/60 via-[#0A0F1E]/80 to-[#0A0F1E]" />
          </div>
          <div className="relative h-full flex items-center">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <span className="inline-block bg-[#F59E0B] text-[#0F172A] px-4 py-2 rounded-lg text-sm font-medium mb-6">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {post.title}
              </h1>
              <div className="flex items-center justify-center space-x-4 text-[#94A3B8]">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="prose prose-lg prose-invert mx-auto">
            <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
          </div>
          
          {/* Share Section */}
          <div className="mt-16 pt-8 border-t border-[#1E293B]">
            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">Share this article</span>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => {
                    window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`,
                      '_blank'
                    )
                  }}
                  className="p-2 rounded-full hover:bg-[#1E293B] transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg 
                    className="w-5 h-5 text-[#94A3B8]" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
} 