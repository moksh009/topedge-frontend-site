import { Link, Navigate } from 'react-router-dom';
import MarketingSEO from '../marketing/components/MarketingSEO';
import {
  PAGE_SEO,
  ORG_REF,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '../marketing/data/pageSeo';
import { SITE_URL } from '../marketing/data/marketingSeo';
import { articleDatePublishedIso } from '../marketing/data/contentDates';
import MarketingPage from '../marketing/components/MarketingPage';
import MarketingCtaBand from '../marketing/components/MarketingCtaBand';
import { blogPosts } from '../data/blogPosts';
import { filterMarketingBlogPosts } from '../marketing/data/blog';
import {
  BLOG_CATEGORIES,
  BLOG_PAGE_SIZE,
  categoryBySlug,
  groupForCategory,
} from '../marketing/data/blogCategories';
import type { BlogPost as BlogPostModel } from '../types/blog';
import { Reveal } from '../marketing/components/motion';
import '../marketing/styles/blog.css';

const allBlogPosts = filterMarketingBlogPosts(
  [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
);

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function PostCard({ post, featured }: { post: BlogPostModel; featured?: boolean }) {
  return (
    <article className={featured ? 'mkt-blog-card is-featured' : 'mkt-blog-card'}>
      <Link to={`/blog/${post.slug}`} className="mkt-blog-card__link">
        <div className="mkt-blog-card__media">
          <picture>
            {post.imageWebp ? <source type="image/webp" srcSet={post.imageWebp} /> : null}
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              width={featured ? 960 : 640}
              height={featured ? 600 : 400}
              loading={featured ? 'eager' : 'lazy'}
              decoding="async"
            />
          </picture>
          <span className="mkt-blog-card__cat">{post.category}</span>
        </div>
        <div className="mkt-blog-card__body">
          <h2 className="mkt-blog-card__title">{post.title}</h2>
          <p className="mkt-blog-card__excerpt">{post.description}</p>
          <div className="mkt-blog-card__foot">
            <p className="mkt-blog-card__meta">
              <span>{formatDate(post.date)}</span>
              <span className="mkt-blog-card__dot" aria-hidden />
              <span>{post.readTime} read</span>
            </p>
            <span className="mkt-blog-card__more">
              Read more
              <span className="mkt-blog-card__more-arrow" aria-hidden>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h12M12 6l6 6-6 6" />
                </svg>
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/**
 * Horizontal category nav. Present on the index, every paginated page and
 * every archive, so a reader who lands deep in the blog can still move
 * sideways rather than only back to page one.
 */
function CategoryBar({ activeSlug }: { activeSlug?: string }) {
  return (
    <nav className="mkt-blog-cats" aria-label="Blog categories">
      <p className="mkt-blog-cats__label">Categories</p>
      <ul className="mkt-blog-cats__list">
        <li>
          <Link
            to="/blog"
            className={`mkt-blog-cats__item${!activeSlug ? ' is-active' : ''}`}
            aria-current={!activeSlug ? 'page' : undefined}
          >
            All
          </Link>
        </li>
        {BLOG_CATEGORIES.map((c) => (
          <li key={c.slug}>
            <Link
              to={`/blog/category/${c.slug}`}
              className={`mkt-blog-cats__item${activeSlug === c.slug ? ' is-active' : ''}`}
              aria-current={activeSlug === c.slug ? 'page' : undefined}
            >
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const href = (n: number) => (n === 1 ? '/blog' : `/blog/page/${n}`);
  return (
    <nav className="mkt-blog-pager" aria-label="Blog pagination">
      {page > 1 ? (
        <Link to={href(page - 1)} className="mkt-blog-pager__btn" rel="prev">
          <span className="mkt-blog-pager__arrow" aria-hidden>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </span>
          Prev
        </Link>
      ) : (
        <span className="mkt-blog-pager__btn is-disabled" aria-disabled="true">
          <span className="mkt-blog-pager__arrow" aria-hidden>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </span>
          Prev
        </span>
      )}

      <p className="mkt-blog-pager__count">
        Page {page} of {totalPages}
      </p>

      {/*
        Numbered links, added 2026-10-29. Prev/Next alone meant each page linked
        only to its neighbours, so /blog/page/3 had exactly one dofollow inbound
        link in the Ahrefs crawl — reachable only from page 2's Next. Listing
        every page gives the deeper pages an inbound link from all the others.
        Cheap here because the archive is 3 pages; revisit the shape if
        BLOG_PAGE_SIZE ever makes that list long.
      */}
      <ol className="mkt-blog-pager__pages">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            {n === page ? (
              <span className="mkt-blog-pager__page is-current" aria-current="page">
                {n}
              </span>
            ) : (
              <Link to={href(n)} className="mkt-blog-pager__page">
                {n}
              </Link>
            )}
          </li>
        ))}
      </ol>

      {page < totalPages ? (
        <Link to={href(page + 1)} className="mkt-blog-pager__btn" rel="next">
          Next
          <span className="mkt-blog-pager__arrow" aria-hidden>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      ) : (
        <span className="mkt-blog-pager__btn is-disabled" aria-disabled="true">
          Next
          <span className="mkt-blog-pager__arrow" aria-hidden>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
        </span>
      )}
    </nav>
  );
}

type Props = {
  /** 1-based page of the main archive. Ignored when `categorySlug` is set. */
  page?: number;
  /** Renders the archive for one category group instead of the full list. */
  categorySlug?: string;
};

export default function Blog({ page = 1, categorySlug }: Props) {
  const category = categorySlug ? categoryBySlug(categorySlug) : undefined;
  if (categorySlug && !category) return <Navigate to="/blog" replace />;

  const posts = category
    ? allBlogPosts.filter((p) => groupForCategory(p.category)?.slug === category.slug)
    : allBlogPosts;

  const totalPages = category ? 1 : Math.max(1, Math.ceil(posts.length / BLOG_PAGE_SIZE));
  if (!category && page > totalPages) return <Navigate to="/blog" replace />;

  const slice = category
    ? posts
    : posts.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE);

  // Only the first page of the full archive leads with a featured card; a
  // category archive and page 2 onward are plain grids, because promoting one
  // post inside a filtered list implies an editorial ranking that is not there.
  const useFeatured = !category && page === 1;
  const [featured, ...rest] = slice;
  const grid = useFeatured ? rest : slice;

  const path = category
    ? `/blog/category/${category.slug}`
    : page === 1
      ? '/blog'
      : `/blog/page/${page}`;

  const heading = category ? category.label : 'Shopify India operator guides for';
  const title = category
    ? `${category.label}: Shopify WhatsApp Guides India | TopEdge AI`
    : page > 1
      ? `TopEdge AI Blog, Page ${page}: Shopify WhatsApp Playbooks`
      : PAGE_SEO.blog.title;
  const description = category
    ? category.blurb.slice(0, 157)
    : page > 1
      ? `Page ${page} of the TopEdge AI playbooks: Shopify WhatsApp cart recovery, COD confirmation, Meta template and pricing guides for Indian D2C brands.`
      : PAGE_SEO.blog.description;

  return (
    <>
      <MarketingSEO
        title={title}
        description={description}
        keywords={PAGE_SEO.blog.keywords}
        path={path}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: category ? `${category.label} playbooks` : 'TopEdge Blog, WhatsApp & Shopify Playbooks',
            description,
            path,
          }),
          breadcrumbJsonLd(
            category
              ? [
                  { name: 'Home', path: '/' },
                  { name: 'Blog', path: '/blog' },
                  { name: category.label, path },
                ]
              : [
                  { name: 'Home', path: '/' },
                  { name: 'Blog', path: '/blog' },
                ],
          ),
          // The archive is a collection, not an article: Blog + the post list
          // so an answer engine can enumerate the corpus from one URL instead
          // of discovering it a link at a time.
          {
            '@context': 'https://schema.org',
            '@type': ['Blog', 'CollectionPage'],
            '@id': `${SITE_URL}${path}#blog`,
            name: category ? `${category.label}, TopEdge AI playbooks` : 'TopEdge AI Playbooks',
            description,
            url: `${SITE_URL}${path}`,
            inLanguage: 'en-IN',
            publisher: ORG_REF,
            blogPost: (category ? posts : allBlogPosts).map((post) => ({
              '@type': 'BlogPosting',
              '@id': `${SITE_URL}/blog/${post.slug}#article`,
              headline: post.title,
              url: `${SITE_URL}/blog/${post.slug}`,
              datePublished: articleDatePublishedIso(post.date),
            })),
          },
        ]}
      />
      <MarketingPage className="mkt-blog-index">
        <header className="mkt-blog-index__hero">
          <p className="mkt-blog-index__brand">
            <img src="/brand-mark.png" alt="" aria-hidden width={22} height={22} decoding="async" />
            <span>
              TopEdge <span>AI</span> playbooks
            </span>
          </p>
          {category ? (
            <>
              <h1 className="mkt-blog-index__title">{heading}</h1>
              <p className="mkt-blog-index__sub">{category.blurb}</p>
            </>
          ) : (
            <>
              <h1 className="mkt-blog-index__title">
                {heading}{' '}
                <span className="mkt-blog-index__title-accent">WhatsApp growth</span>
              </h1>
              <p className="mkt-blog-index__sub">
                Deep Shopify + WhatsApp playbooks for Indian D2C: cart recovery, COD confirmation,
                Meta templates, shared inbox, and AI that stays grounded in your catalog.
              </p>
            </>
          )}
        </header>

        <CategoryBar activeSlug={category?.slug} />

        <div className="mkt-blog-index__grid">
          {useFeatured && featured ? (
            <Reveal className="mkt-blog-index__featured">
              <PostCard post={featured} featured />
            </Reveal>
          ) : null}

          {grid.map((post, index) => (
            <Reveal key={post.slug} delay={0.04 + index * 0.03}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>

        {category ? (
          <nav className="mkt-blog-pager" aria-label="Back to all playbooks">
            <Link to="/blog" className="mkt-blog-pager__btn">
              <span className="mkt-blog-pager__arrow" aria-hidden>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </span>
              All playbooks
            </Link>
            <p className="mkt-blog-pager__count">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} in {category.label}
            </p>
          </nav>
        ) : (
          <Pagination page={page} totalPages={totalPages} />
        )}

        <MarketingCtaBand
          title="Put these playbooks live on your store"
          subtitle="Connect Shopify, approve Meta templates, and publish cart recovery, usually in about fifteen minutes plus Meta review."
          primaryLabel="Start free"
          secondaryLabel="See features"
          secondaryTo="/features"
        />
      </MarketingPage>
    </>
  );
}
