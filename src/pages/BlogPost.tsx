import { useLayoutEffect, useMemo, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import MarketingSEO, { canonicalUrlForPath } from '../marketing/components/MarketingSEO';
import MarketingPage from '../marketing/components/MarketingPage';
import { SITE_URL } from '../marketing/data/marketingSeo';
import { breadcrumbJsonLd } from '../marketing/data/pageSeo';
import { blogPosts } from '../data/blogPosts';
import { filterMarketingBlogPosts, isMarketingBlogPost } from '../marketing/data/blog';
import type { BlogPost as BlogPostModel } from '../types/blog';
import { DASH_SIGNUP } from '../marketing/routes';
import {
  articleDateModifiedIso,
  articleDatePublishedIso,
} from '../marketing/data/contentDates';
import { bindBlogTables, enhanceBlogHtml, splitNumericRanges } from '../marketing/lib/blogHtml';
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
  const contentHtml = useMemo(() => enhanceBlogHtml(post?.content || ''), [post?.content]);
  const proseRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!proseRef.current) return undefined;
    return bindBlogTables(proseRef.current);
  }, [contentHtml]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const canonical = canonicalUrlForPath(`/blog/${post.slug}`);
  const related = allBlogPosts
    .filter((p) => p.slug !== post.slug && isMarketingBlogPost(p))
    .slice(0, 3);
  const imageAbs = post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`;
  const datePublished = articleDatePublishedIso(post.date);
  const dateModified = articleDateModifiedIso({ updated: post.updated });

  return (
    <>
      <MarketingSEO
        title={`${post.title} | TopEdge`}
        description={post.description}
        keywords={post.keywords?.join(', ')}
        image={imageAbs}
        imageAlt={post.imageAlt || post.title}
        path={`/blog/${post.slug}`}
        type="article"
        noSuffix
        articlePublished={datePublished}
        articleModified={dateModified}
        faqSchema={post.faqs}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            image: imageAbs,
            datePublished,
            dateModified,
            author: { '@type': 'Organization', name: 'TopEdge AI', url: SITE_URL },
            publisher: {
              '@type': 'Organization',
              name: 'TopEdge AI',
              url: SITE_URL,
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/brand-mark.png` },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
            url: canonical,
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
            <div className="mkt-blog-cover-img">
              <img
                src={post.image}
                alt={post.imageAlt || post.title}
                width={1200}
                height={675}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </header>

        <div className="marketing-container">
          <div className="mkt-blog-body-wrap">
            <div
              ref={proseRef}
              className="mkt-blog-prose"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {post.faqs?.length && !(post.content || '').includes('mkt-blog-faq') ? (
              <section className="mkt-blog-faq-block" aria-labelledby="blog-faq-heading">
                <h2 id="blog-faq-heading" className="mkt-blog-faq-block__title">
                  Common questions
                </h2>
                <div className="mkt-blog-faq">
                  {post.faqs.map((f) => (
                    <div key={f.question} className="mkt-blog-faq__item">
                      <h3 className="mkt-blog-faq__q">{f.question}</h3>
                      <p>
                        {splitNumericRanges(f.answer).map((part, i) =>
                          part.range ? (
                            <span key={i} className="mkt-nowrap">
                              {part.text}
                            </span>
                          ) : (
                            part.text
                          ),
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <aside className="mkt-blog-cta" aria-label="Get started">
              <p className="mkt-blog-cta__title">Run this on your Shopify store</p>
              <p className="mkt-blog-cta__sub">
                Connect Shopify and WhatsApp, approve Meta templates, and publish cart recovery
                journeys, free for 14 days.
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
                    <div className="mkt-blog-related__thumb">
                      <img
                        src={r.image}
                        alt={r.imageAlt || r.title}
                        width={400}
                        height={225}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="mkt-blog-related__card-body">
                      <span className="mkt-blog-related__card-cat">{r.category}</span>
                      <span className="mkt-blog-related__card-title">{r.title}</span>
                      <span className="mkt-blog-related__card-meta">
                        {formatDate(r.date)} · {r.readTime}
                      </span>
                    </div>
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
