import MarketingSEO from '../marketing/components/MarketingSEO';
import { PAGE_SEO } from '../marketing/data/pageSeo';
import MarketingPage from '../marketing/components/MarketingPage';
import { PageHero, Section } from '../marketing/components/ui';
import { blogPosts } from '../data/blogPosts';
import { filterMarketingBlogPosts } from '../marketing/data/blog';
import { Reveal } from '../marketing/components/motion';
import { Link } from 'react-router-dom';

const allBlogPosts = filterMarketingBlogPosts(
  [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
);

export default function Blog() {
  return (
    <>
      <MarketingSEO
        title={PAGE_SEO.blog.title}
        description={PAGE_SEO.blog.description}
        keywords={PAGE_SEO.blog.keywords}
        path={PAGE_SEO.blog.path}
        noSuffix
      />
      <MarketingPage>
        <PageHero
          eyebrow="Resources"
          title="WhatsApp & Shopify automation playbooks"
          subtitle="Cart recovery, COD confirmations, Meta templates, and ecommerce messaging for Indian D2C — written for operators, not fluff."
        />

        <Section className="!pt-0">
          {allBlogPosts.length === 0 ? (
            <Reveal>
              <div className="mx-auto max-w-xl rounded-2xl border border-[#efeaf8] bg-white px-8 py-14 text-center shadow-sm">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#7C3AED]/80">
                  Coming soon
                </p>
                <h2 className="mt-3 font-sans text-xl font-medium tracking-tight text-[#0f172a]">
                  New Shopify & WhatsApp playbooks are on the way
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  We&apos;re rewriting our guides for Indian D2C operators. Check back soon, or explore
                  features and pricing in the meantime.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/features"
                    className="inline-flex rounded-full bg-[#0f172a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    View features
                  </Link>
                  <Link
                    to="/pricing"
                    className="inline-flex rounded-full border border-[#efeaf8] bg-white px-5 py-2.5 text-sm font-semibold text-[#0f172a] transition hover:border-marketing-border"
                  >
                    See pricing
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allBlogPosts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 0.03}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#efeaf8] bg-white shadow-sm transition hover:border-marketing-border hover:shadow-md">
                    <Link to={`/blog/${post.slug}`} className="flex h-full flex-col">
                      <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={post.image}
                          alt=""
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#7C3AED]/80">
                          {post.category}
                        </span>
                        <h2 className="mt-2 font-sans font-medium text-lg leading-snug tracking-tight text-[#0f172a] group-hover:text-[#7C3AED]">
                          {post.title}
                        </h2>
                        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
                          {post.description}
                        </p>
                        <p className="mt-4 text-xs text-slate-400">
                          {post.date} · {post.readTime}
                        </p>
                      </div>
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </Section>
      </MarketingPage>
    </>
  );
}
