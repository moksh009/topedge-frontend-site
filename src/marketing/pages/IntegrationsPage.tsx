import SEO from '../../components/SEO';
import { DASH_DOCS } from '../constants';
import { Section, PrimaryButton, MarketingCard, StatusBadge, PageHero } from '../components/ui';
import FeatureMarketingImage from '../components/FeatureMarketingImage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import ShopifyLogo from '../components/icons/ShopifyLogo';
import WhatsAppLogo from '../components/icons/WhatsAppLogo';
import { Reveal } from '../components/motion';
import MarketingPage from '../components/MarketingPage';

const integrations = [
  {
    name: 'Shopify',
    status: 'Live' as const,
    tone: 'emerald' as const,
    icon: 'shopify' as const,
    desc: 'Orders, products, webhooks, cart events, and customer sync — the backbone of your WhatsApp automations.',
    syncs: ['Orders', 'Products', 'Abandoned carts', 'Customers', 'Discounts'],
  },
  {
    name: 'Meta WhatsApp',
    status: 'Live' as const,
    tone: 'emerald' as const,
    icon: 'whatsapp' as const,
    desc: 'Official WhatsApp Business API. Templates, WABA, catalog, and Flows — you approve every send.',
    syncs: ['Templates', 'WABA', 'Catalog', 'Flows'],
  },
  {
    name: 'Instagram DMs',
    status: 'Soon' as const,
    tone: 'amber' as const,
    icon: null,
    desc: 'Unified inbox for Instagram alongside WhatsApp — same team, same AI.',
    syncs: ['DM threads', 'Agent assignment'],
  },
  {
    name: 'AI providers (BYOK)',
    status: 'Live' as const,
    tone: 'emerald' as const,
    icon: null,
    desc: 'Bring your own Gemini or OpenAI keys on Scale — or use managed AI on Growth.',
    syncs: ['Gemini', 'OpenAI'],
  },
];

function IntegrationIcon({ type }: { type: 'shopify' | 'whatsapp' | null }) {
  if (type === 'shopify') return <ShopifyLogo size={48} />;
  if (type === 'whatsapp') return <WhatsAppLogo size={48} />;
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-lg font-bold text-[#7C3AED]">
      AI
    </span>
  );
}

export default function IntegrationsPage() {
  return (
    <>
      <SEO title="Integrations | TopEdge AI" description="Shopify, Meta WhatsApp, and AI — connected in one hub." />
      <MarketingPage>
        <PageHero
          eyebrow="Integrations"
          title="Shopify + Meta WhatsApp, connected in one hub"
          subtitle="Store events trigger automations. Meta Cloud API delivers messages. Your team replies in Live Chat — no duct tape between tools."
        />
        <Reveal className="marketing-container -mt-6 max-w-5xl pb-8">
          <FeatureMarketingImage imageId="integrations-settings" interactive />
        </Reveal>
        <Section subtle>
          <div className="grid gap-6 md:grid-cols-2">
            {integrations.map((int) => (
              <MarketingCard key={int.name} className="marketing-premium-card !p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <IntegrationIcon type={int.icon} />
                    <h3 className="text-xl font-medium text-[#0c1222]">{int.name}</h3>
                  </div>
                  <StatusBadge tone={int.tone}>{int.status}</StatusBadge>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-500">{int.desc}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {int.syncs.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-violet-100 bg-violet-50/80 px-3 py-1 text-xs font-medium text-[#7C3AED]"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </MarketingCard>
            ))}
          </div>
          <div className="mt-12 text-center">
            <PrimaryButton to="/signup">Connect your store</PrimaryButton>
            <p className="mt-4">
              <a
                href={DASH_DOCS}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#7C3AED] hover:underline"
              >
                Setup documentation →
              </a>
            </p>
          </div>
        </Section>

        <MarketingCtaBand
          title="Your stack, connected in one workspace"
          subtitle="Shopify events, Meta templates, and your team — no copy-paste between tabs."
          primaryLabel="Start free"
          primaryTo="/signup"
          secondaryLabel="See all features"
          secondaryTo="/features"
        />
      </MarketingPage>
    </>
  );
}
