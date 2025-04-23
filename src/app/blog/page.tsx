import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts2 } from '../../data/blogPosts2';
import { blogPosts3 } from '../../data/blogPosts3';
import { blogPosts4 } from '../../data/blogPosts4';

export const metadata: Metadata = {
  title: 'AI Voice Technology Blog | TopEdge AI',
  description: 'Explore the latest insights on AI voice technology, chatbots, and automation. Learn how AI is transforming business communication and customer service.',
  keywords: 'AI voice technology, chatbots, business automation, customer service AI, AI caller solutions',
};

interface BlogPost {
  id: number;
  title: string;
  description: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

// Combine all blog posts and sort by date (most recent first)
const allBlogPosts = [...blogPosts2, ...blogPosts3, ...blogPosts4].sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header Section */}
      <header className="py-20 px-4 text-center bg-gradient-to-r from-blue-600 to-purple-600">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          AI Voice Technology Insights
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
          Explore the latest trends, insights, and innovations in AI voice technology and business automation
        </p>
      </header>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id}>
              <article className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 h-full flex flex-col">
                <div className="relative h-48 md:h-64">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h2 className="text-xl font-bold mb-3 text-white hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-300 mb-4 flex-grow">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 