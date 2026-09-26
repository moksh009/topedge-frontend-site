import type { ReactNode } from 'react';
import MarketingSEO from '../components/MarketingSEO';
import {
  PAGE_SEO,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import ProductDemoVideo from '../components/home/ProductDemoVideo';
import { MARKETING_FEATURES, type MarketingFeature } from '../data/features';
import { demoAssetFor } from '../data/productDemoVideos';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  GitBranch,
  IndianRupee,
  Instagram,
  Megaphone,
  MessagesSquare,
  MousePointerClick,
  RefreshCw,
  ScanSearch,
  ShieldCheck,
  Split,
  UserCheck,
  UserPlus,
  Users,
  Workflow,
} from 'lucide-react';
import '../styles/features-hub.css';

const ICON_PROPS = { size: 20, strokeWidth: 1.9, 'aria-hidden': true } as const;

const CARD_META: Record<string, { label: string; icon: ReactNode }> = {
  journeys: { label: 'Journeys', icon: <Workflow {...ICON_PROPS} /> },
  campaigns: { label: 'Campaigns', icon: <Megaphone {...ICON_PROPS} /> },
  'flow-builder': { label: 'Flow Builder', icon: <GitBranch {...ICON_PROPS} /> },
  'opt-in-tools': { label: 'Opt-in tools', icon: <UserPlus {...ICON_PROPS} /> },
  instagram: { label: 'Instagram', icon: <Instagram {...ICON_PROPS} /> },
  'live-chat': { label: 'Live Chat', icon: <MessagesSquare {...ICON_PROPS} /> },
  'chat-rules': { label: 'Chat rules', icon: <Split {...ICON_PROPS} /> },
  'ai-brain': { label: 'AI Brain', icon: <BrainCircuit {...ICON_PROPS} /> },
  'intent-detection': { label: 'Intent detection', icon: <ScanSearch {...ICON_PROPS} /> },
  warranty: { label: 'Warranty', icon: <ShieldCheck {...ICON_PROPS} /> },
  'meta-manager': { label: 'Meta Manager', icon: <BadgeCheck {...ICON_PROPS} /> },
  'audience-crm': { label: 'Audience CRM', icon: <Users {...ICON_PROPS} /> },
  analytics: { label: 'Tracking Pixel', icon: <MousePointerClick {...ICON_PROPS} /> },
  'profit-loss': { label: 'Profit and costs', icon: <IndianRupee {...ICON_PROPS} /> },
};

const GROUPS = [
  {
    id: 'sell',
    lead: 'Sell and',
    accent: 'recover',
    sub: 'Turn carts, comments, and storefront visits into WhatsApp revenue.',
    slugs: ['journeys', 'campaigns', 'flow-builder', 'opt-in-tools', 'instagram'],
  },
  {
    id: 'support',
    lead: 'Support at',
    accent: 'scale',
    sub: 'An inbox, routing, and AI that already know the order.',
    slugs: ['live-chat', 'chat-rules', 'ai-brain', 'intent-detection', 'warranty'],
  },
  {
    id: 'measure',
    lead: 'Run and',
    accent: 'measure',
    sub: 'Templates, audiences, pixel data, and true profit in one place.',
    slugs: ['meta-manager', 'audience-crm', 'analytics', 'profit-loss'],
  },
] as const;

const PRINCIPLES = [
  {
    icon: <RefreshCw {...ICON_PROPS} />,
    title: 'Shopify is source of truth',
    body: 'Connect once. Catalog, carts, and orders sync. Change products and settings in the dashboard.',
  },
  {
    icon: <BadgeCheck {...ICON_PROPS} />,
    title: 'You approve Meta templates',
    body: 'Nothing sends until templates are APPROVED. Utility and marketing rates stay transparent.',
  },
  {
    icon: <UserCheck {...ICON_PROPS} />,
    title: 'Operators stay in control',
    body: 'Live Chat takeover pauses AI. Journeys and flows are visual, no developer required.',
  },
];

function FeatureCard({ feature }: { feature: MarketingFeature }) {
  const meta = CARD_META[feature.slug];
  return (
    <Link to={`/features/${feature.slug}`} className="mkt-fx-card">
      <div className="mkt-fx-card__top">
        <span className="mkt-fx-card__icon">{meta?.icon}</span>
        <span className="mkt-fx-card__label">{meta?.label ?? feature.slug}</span>
        <ArrowUpRight className="mkt-fx-card__arrow" size={18} aria-hidden />
      </div>
      <h3>{feature.title}</h3>
      <p>{feature.body}</p>
    </Link>
  );
}

export default function FeaturesPage() {
  const seo = PAGE_SEO.features;
  const bySlug = new Map(MARKETING_FEATURES.map((f) => [f.slug, f]));
  return (
    <>
      <MarketingSEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        path={seo.path}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({ name: 'Features', description: seo.description, path: seo.path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Features', path: '/features' },
          ]),
        ]}
      />
      <MarketingPage className="mkt-fx">
        <header className="mkt-fx__hero">
          <p className="mkt-fx__eyebrow">Features</p>
          <h1 className="mkt-fx__h1">
            Every hub your operators <span className="mkt-fx__hl">actually open</span>
          </h1>
          <p className="mkt-fx__sub">
            Not a feature dump. Each capability maps to a workspace you run on dash.topedgeai.com.
            Store data syncs from Shopify; you edit it in the dashboard.
          </p>
          <div className="mkt-fx__actions">
            <Link to="/signup" className="mkt-fx__btn mkt-fx__btn--solid">
              Start free
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link to="/pricing" className="mkt-fx__btn">
              See pricing
            </Link>
          </div>
        </header>

        {GROUPS.map((g) => (
          <section
            key={g.id}
            className={`mkt-fx__section mkt-fx-group mkt-fx-group--${g.id}`}
            aria-labelledby={`mkt-fx-${g.id}`}
          >
            <div className="mkt-fx__head">
              <h2 id={`mkt-fx-${g.id}`}>
                {g.lead} <span className="mkt-fx__hl">{g.accent}</span>
              </h2>
              <p>{g.sub}</p>
            </div>
            <div className={`mkt-fx__grid mkt-fx__grid--${g.slugs.length}`}>
              {g.slugs.map((slug) => {
                const feature = bySlug.get(slug);
                return feature ? <FeatureCard key={slug} feature={feature} /> : null;
              })}
            </div>
          </section>
        ))}

        <section className="mkt-fx__section" aria-labelledby="mkt-fx-demo">
          <div className="mkt-fx__head">
            <h2 id="mkt-fx-demo">
              See TopEdge in <span className="mkt-fx__hl">motion</span>
            </h2>
            <p>
              Product demos for the hubs your team opens every day, cart recovery, journeys, inbox,
              and more.
            </p>
          </div>
          <div className="mkt-fx__demo">
            <ProductDemoVideo
              src={demoAssetFor('hero').src}
              poster={demoAssetFor('hero').poster}
              label="TopEdge product demo"
            />
          </div>
        </section>

        <section className="mkt-fx__section" aria-labelledby="mkt-fx-principles">
          <div className="mkt-fx__head">
            <h2 id="mkt-fx-principles">
              Built for how <span className="mkt-fx__hl">operators</span> work
            </h2>
          </div>
          <div className="mkt-fx__principles">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="mkt-fx-principle">
                <span className="mkt-fx-principle__icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <MarketingCtaBand
          title="See it live on your store"
          subtitle="Start free, connect Shopify and WhatsApp in about fifteen minutes."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
