import { Link } from 'react-router-dom';
import MarketingSEO from '../marketing/components/MarketingSEO';
import {
  PAGE_SEO,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '../marketing/data/pageSeo';
import MarketingPage from '../marketing/components/MarketingPage';
import MarketingCtaBand from '../marketing/components/MarketingCtaBand';
import { blogPosts } from '../data/blogPosts';
import { filterMarketingBlogPosts } from '../marketing/data/blog';
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

export default function Blog() {
  const [featured, ...rest] = allBlogPosts;

  return (
    <>
      <MarketingSEO
        title={PAGE_SEO.blog.title}
        description={PAGE_SEO.blog.description}
        keywords={PAGE_SEO.blog.keywords}
        path={PAGE_SEO.blog.path}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'TopEdge Blog, WhatsApp & Shopify Playbooks',
            description: PAGE_SEO.blog.description,
            path: PAGE_SEO.blog.path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]),
        ]}
      />
      <MarketingPage className="mkt-blog-index">
        <header className="mkt-blog-index__hero">
          <p className="mkt-blog-index__brand">
            <img src="/brand-mark.png" alt="" width={22} height={22} decoding="async" />
            <span>
              TopEdge <span>AI</span> playbooks
            </span>
          </p>
          <h1 className="mkt-blog-index__title">
            Operator guides for <span className="mkt-blog-index__title-accent">WhatsApp growth</span>
          </h1>
          <p className="mkt-blog-index__sub">
            Deep Shopify + WhatsApp playbooks for Indian D2C: cart recovery, COD confirmation, Meta
            templates, shared inbox, and AI that stays grounded in your catalog.
          </p>
        </header>

        <div className="mkt-blog-index__grid">
          {featured ? (
            <Reveal className="mkt-blog-index__featured">
              <article className="mkt-blog-card is-featured">
                <Link to={`/blog/${featured.slug}`} className="mkt-blog-card__link">
                  <div className="mkt-blog-card__media">
                    <img
                      src={featured.image}
                      alt={featured.imageAlt || featured.title}
                      width={960}
                      height={600}
                      loading="eager"
                      decoding="async"
                    />
                    <span className="mkt-blog-card__cat">{featured.category}</span>
                  </div>
                  <div className="mkt-blog-card__body">
                    <h2 className="mkt-blog-card__title">{featured.title}</h2>
                    <p className="mkt-blog-card__excerpt">{featured.description}</p>
                    <p className="mkt-blog-card__meta">
                      <span>{formatDate(featured.date)}</span>
                      <span className="mkt-blog-card__dot" aria-hidden />
                      <span>{featured.readTime} read</span>
                    </p>
                  </div>
                </Link>
              </article>
            </Reveal>
          ) : null}

          {rest.map((post, index) => (
            <Reveal key={post.slug} delay={0.04 + index * 0.03}>
              <article className="mkt-blog-card">
                <Link to={`/blog/${post.slug}`} className="mkt-blog-card__link">
                  <div className="mkt-blog-card__media">
                    <img
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      width={640}
                      height={400}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="mkt-blog-card__cat">{post.category}</span>
                  </div>
                  <div className="mkt-blog-card__body">
                    <h2 className="mkt-blog-card__title">{post.title}</h2>
                    <p className="mkt-blog-card__excerpt">{post.description}</p>
                    <p className="mkt-blog-card__meta">
                      <span>{formatDate(post.date)}</span>
                      <span className="mkt-blog-card__dot" aria-hidden />
                      <span>{post.readTime} read</span>
                    </p>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

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
