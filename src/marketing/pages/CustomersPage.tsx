import SEO from '../../components/SEO';
import { Section, PageHero, MarketingCard, SectionHeading } from '../components/ui';
import FeatureMarketingImage from '../components/FeatureMarketingImage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import MarketingStatsStrip from '../components/MarketingStatsStrip';
import PremiumTestimonialCard from '../components/PremiumTestimonialCard';
import { Reveal } from '../components/motion';
import MarketingPage from '../components/MarketingPage';

const platformStats = [
  { value: '32%', label: 'avg. cart recovery' },
  { value: '15 min', label: 'median go-live' },
  { value: '12', label: 'product modules' },
  { value: '24/7', label: 'AI + human inbox' },
];

const useCases = [
  {
    title: 'D2C founders',
    desc: 'Recover abandoned carts and confirm COD without hiring a WhatsApp ops team.',
    metric: '32% avg. cart recovery',
  },
  {
    title: 'Growth marketers',
    desc: 'Run approved-template campaigns to segments built from Shopify behavior.',
    metric: 'Segments + broadcasts',
  },
  {
    title: 'Support leads',
    desc: 'One inbox with order context — pause AI, reply as human, assign agents.',
    metric: '22% faster resolution',
  },
];

const stories = [
  {
    key: 'Rahul K.',
    category: 'Fashion',
    metric: '22% cart recovery',
    quote: 'Cart recovery on COD orders changed our month. We stopped losing buyers who already had items in cart.',
    name: 'Rahul K.',
    role: 'Growth · D2C apparel',
  },
  {
    key: 'Meera S.',
    category: 'Beauty',
    metric: '3 days to go live',
    quote: 'Approved flows live in three days — no agency retainer. Meta templates we actually control.',
    name: 'Meera S.',
    role: 'Ops · Shopify Plus',
  },
  {
    key: 'Ananya R.',
    category: 'Electronics',
    metric: '4× faster response',
    quote: 'Support handles 4× more chats with order cards beside every thread.',
    name: 'Ananya R.',
    role: 'Founder',
  },
  {
    key: 'Vikram P.',
    category: 'Home',
    metric: '38% fewer tickets',
    quote: 'Order updates on WhatsApp cut repetitive “where is my order” tickets.',
    name: 'Vikram P.',
    role: 'Support lead',
  },
  {
    key: 'Sneha M.',
    category: 'Food',
    metric: '12% repeat lift',
    quote: 'Broadcasts to repeat buyers with approved templates — reads in hours, not days.',
    name: 'Sneha M.',
    role: 'Marketing',
  },
  {
    key: 'Arjun D.',
    category: 'Jewelry',
    metric: '5 stores · 1 hub',
    quote: 'Five Shopify stores from one dashboard — same inbox and automation rules.',
    name: 'Arjun D.',
    role: 'Agency partner',
  },
];

export default function CustomersPage() {
  const featured = stories[0];

  return (
    <>
      <SEO
        title="Customers | TopEdge — WhatsApp growth for Shopify India"
        description="D2C brands using TopEdge for cart recovery, campaigns, and support on WhatsApp."
      />
      <MarketingPage>
        <PageHero
          eyebrow="Customers"
          title="Indian D2C teams growing revenue on WhatsApp"
          subtitle="Founders, marketers, and support leads use TopEdge to automate sales, approve Meta templates, and manage one inbox."
        />

        <Reveal className="marketing-container max-w-5xl pb-2">
          <FeatureMarketingImage imageId="live-chat" interactive />
        </Reveal>

        <MarketingStatsStrip stats={platformStats} />

        <Section subtle>
          <SectionHeading
            title="Built for how you work"
            subtitle="Whether you own growth, ops, or support — TopEdge maps to your job."
            center
          />
          <div className="grid gap-6 md:grid-cols-3">
            {useCases.map((u) => (
              <MarketingCard key={u.title} className="marketing-premium-card !p-7">
                <p className="text-sm font-semibold text-[#7C3AED]">{u.metric}</p>
                <h3 className="mt-3 text-lg font-medium text-[#0c1222]">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{u.desc}</p>
              </MarketingCard>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeading
            eyebrow="Featured"
            title="How Rahul’s team recovered 22% of abandoned carts"
            subtitle="Fashion D2C on Shopify — COD-heavy, Meta templates approved in 48 hours."
            center
          />
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-violet-200/60 bg-gradient-to-br from-violet-50/80 via-white to-white p-8 md:p-12">
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <div>
                  <span className="rounded-full border border-violet-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#7C3AED]">
                    {featured.category}
                  </span>
                  <p className="mt-6 text-4xl font-semibold tracking-tight text-[#7C3AED]">{featured.metric}</p>
                  <p className="mt-6 text-xl leading-relaxed text-slate-700">&ldquo;{featured.quote}&rdquo;</p>
                  <p className="mt-6 text-sm font-medium text-[#0c1222]">{featured.name}</p>
                  <p className="text-sm text-slate-500">{featured.role}</p>
                </div>
                <FeatureMarketingImage imageId="abandoned-cart" className="!max-w-none" />
              </div>
            </div>
          </Reveal>
        </Section>

        <Section subtle>
          <SectionHeading eyebrow="Stories" title="More results from Shopify brands" center />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stories.slice(1).map((s) => (
              <PremiumTestimonialCard key={s.key} {...s} />
            ))}
          </div>
        </Section>

        <MarketingCtaBand
          title="Join brands growing on WhatsApp"
          subtitle="Connect Shopify, approve templates, publish your first flow — free to start."
          primaryLabel="Start free"
          primaryTo="/signup"
          secondaryLabel="Estimate ROI"
          secondaryTo="/roi"
        />
      </MarketingPage>
    </>
  );
}
