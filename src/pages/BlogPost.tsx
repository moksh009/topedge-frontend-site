import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import MarketingSEO from '../marketing/components/MarketingSEO';
import MarketingPage from '../marketing/components/MarketingPage';
import { SITE_URL } from '../marketing/data/marketingSeo';
import { blogPosts } from '../data/blogPosts';
import { filterMarketingBlogPosts, isMarketingBlogPost } from '../marketing/data/blog';
import type { BlogPost as BlogPostModel } from '../types/blog';
import { DASH_SIGNUP } from '../marketing/routes';
import '../marketing/styles/blog.css';

const allBlogPosts = filterMarketingBlogPosts([...blogPosts] as BlogPostModel[]);

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = allBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const related = allBlogPosts
    .filter((p) => p.slug !== post.slug && isMarketingBlogPost(p))
    .slice(0, 3);
  const imageAbs = post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`;

  return (
    <>
      <MarketingSEO
        title={`${post.title} | TopEdge Blog`}
        description={post.description}
        keywords={post.keywords?.join(', ')}
        image={imageAbs}
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
            image: imageAbs,
            datePublished: new Date(post.date).toISOString(),
            author: { '@type': 'Organization', name: 'TopEdge' },
            publisher: {
              '@type': 'Organization',
              name: 'TopEdge',
              url: SITE_URL,
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.png` },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
            keywords: post.keywords?.join(', '),
          })}
        </script>
      </Helmet>

      <MarketingPage className="mkt-blog-article !bg-transparent">
        <header className="mkt-blog-hero">
          <div className="marketing-container">
            <div className="mkt-blog-hero__inner">
              <Link to="/blog" className="mkt-blog-back">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                All playbooks
              </Link>
              <span className="mkt-blog-pill">{post.category}</span>
              <h1 className="mkt-blog-title">{post.title}</h1>
              <p className="mkt-blog-lede">{post.description}</p>
              <div className="mkt-blog-meta">
                <span>{post.author || 'TopEdge'}</span>
                <span className="mkt-blog-meta__dot" aria-hidden />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="mkt-blog-meta__dot" aria-hidden />
                <span>{post.readTime} read</span>
              </div>
            </div>
          </div>
        </header>

        <div className="marketing-container">
          <div className="mkt-blog-body-wrap">
            <div
              className="mkt-blog-prose"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />

            <aside className="mkt-blog-cta" aria-label="Get started">
              <p className="mkt-blog-cta__title">Run this on your Shopify store</p>
              <p className="mkt-blog-cta__sub">
                Connect Shopify and WhatsApp, approve Meta templates, and publish cart recovery
                journeys — free for 14 days.
              </p>
              <div className="mkt-blog-cta__actions">
                <a href={DASH_SIGNUP} className="mkt-btn-primary">
                  Start free
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <Link to="/features/journeys" className="mkt-btn-ghost">
                  See cart recovery
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mkt-blog-related" aria-labelledby="related-heading">
            <div className="marketing-container" style={{ maxWidth: '68rem' }}>
              <h2 id="related-heading" className="mkt-blog-related__title">
                Related playbooks
              </h2>
              <div className="mkt-blog-related__grid">
                {related.map((r) => (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className="mkt-blog-related__card">
                    <span className="mkt-blog-related__card-cat">{r.category}</span>
                    <span className="mkt-blog-related__card-title">{r.title}</span>
                    <span className="mkt-blog-related__card-meta">
                      {formatDate(r.date)} · {r.readTime}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </MarketingPage>
    </>
  );
}
