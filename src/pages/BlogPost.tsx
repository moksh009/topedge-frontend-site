import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import MarketingSEO from '../marketing/components/MarketingSEO';
import MarketingPage from '../marketing/components/MarketingPage';
import { Section } from '../marketing/components/ui';
import { SITE_URL } from '../marketing/data/marketingSeo';
import { blogPosts } from '../data/blogPosts';
import { filterMarketingBlogPosts, isMarketingBlogPost } from '../marketing/data/blog';

type BlogPostType = {
  title: string;
  description: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  author?: string;
  image: string;
  content?: string;
};

const allBlogPosts = filterMarketingBlogPosts([...blogPosts] as BlogPostType[]);

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = allBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const related = allBlogPosts.filter((p) => p.slug !== post.slug && isMarketingBlogPost(p)).slice(0, 3);

  return (
    <>
      <MarketingSEO
        title={`${post.title} | TopEdge Blog`}
        description={post.description}
        keywords={post.keywords?.join(', ')}
        image={post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`}
        path={`/blog/${post.slug}`}
        type="article"
        noSuffix
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            image: post.image,
            datePublished: new Date(post.date).toISOString(),
            author: { '@type': 'Organization', name: 'TopEdge' },
            publisher: { '@type': 'Organization', name: 'TopEdge', url: SITE_URL },
            mainEntityOfPage: canonical,
          })}
        </script>
      </Helmet>

      <MarketingPage>
        <article className="border-b border-[#efeaf8] bg-white pt-[calc(var(--marketing-nav-h)+2rem)] pb-10 md:pt-[calc(var(--marketing-nav-h)+3rem)]">
          <div className="marketing-container max-w-3xl">
            <Link
              to="/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#7C3AED] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              All articles
            </Link>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#7C3AED]/80">{post.category}</p>
            <h1 className="mt-3 font-sans font-medium text-[1.875rem] leading-[1.12] tracking-[-0.022em] text-[#0f172a] md:text-[2.5rem]">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-slate-500">
              {post.date} · {post.readTime}
              {post.author ? ` · ${post.author}` : ''}
            </p>
          </div>
        </article>

        <Section className="!pt-8">
          <div className="marketing-container max-w-3xl">
            <div className="mb-10 overflow-hidden rounded-2xl border border-[#efeaf8]">
              <img src={post.image} alt="" className="w-full object-cover" loading="lazy" />
            </div>
            <div
              className="prose prose-slate max-w-none prose-headings:font-sans prose-headings:font-medium prose-headings:tracking-tight prose-a:text-[#7C3AED] prose-img:rounded-xl prose-img:border prose-img:border-[#efeaf8]"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
          </div>
        </Section>

        {related.length > 0 && (
          <Section subtle>
            <div className="marketing-container max-w-3xl">
              <h2 className="font-sans font-medium text-xl tracking-tight text-[#0f172a]">Related articles</h2>
              <ul className="mt-6 space-y-4">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      to={`/blog/${r.slug}`}
                      className="block rounded-xl border border-[#efeaf8] bg-white p-5 transition hover:border-marketing-border hover:shadow-sm"
                    >
                      <p className="font-medium text-[#0f172a] hover:text-[#7C3AED]">{r.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{r.date}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        )}
      </MarketingPage>
    </>
  );
}
