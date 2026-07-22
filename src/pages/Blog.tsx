import { Link } from 'react-router-dom';
import MarketingSEO from '../marketing/components/MarketingSEO';
import MarketingPage from '../marketing/components/MarketingPage';
import { PageHero, Section } from '../marketing/components/ui';
import { blogPosts } from '../data/blogPosts';
import { blogPosts2 } from '../data/blogPosts2';
import { blogPosts3 } from '../data/blogPosts3';
import { blogPosts4 } from '../data/blogPosts4';
import { blogPosts5 } from '../data/blogPosts5';
import { blogPosts6 } from '../data/blogPosts6';
import { filterMarketingBlogPosts } from '../marketing/data/blog';
import { Reveal } from '../marketing/components/motion';

const allBlogPosts = filterMarketingBlogPosts(
  [...blogPosts, ...blogPosts2, ...blogPosts3, ...blogPosts4, ...blogPosts5, ...blogPosts6].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
);

export default function Blog() {
  return (
    <>
      <MarketingSEO
        title="Blog | TopEdge — WhatsApp & Shopify playbooks"
        description="Playbooks for Indian D2C: cart recovery, Meta templates, COD flows, and WhatsApp campaigns on Shopify."
        path="/blog"
      />
      <MarketingPage>
        <PageHero
          eyebrow="Resources"
          title="Playbooks for Indian D2C on WhatsApp"
          subtitle="Practical guides on cart recovery, Meta template approval, COD flows, and Shopify automations — operator tone, no fluff."
        />

        <Section className="!pt-0">
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
        </Section>
      </MarketingPage>
    </>
  );
}
