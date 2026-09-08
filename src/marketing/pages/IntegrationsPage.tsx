import { Link } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import {
  PAGE_SEO,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { PageHero, Section, SectionHeading, MarketingCard } from '../components/ui';

const integrations = [
  {
    name: 'Shopify',
    body: 'OAuth connect, orders, carts, catalog, and COD fields sync into TopEdge. Edit store data in Shopify / the dashboard — not on this marketing site.',
    href: '/features/shopify',
  },
  {
    name: 'Meta WhatsApp',
    body: 'Business API templates, utility and marketing categories, status sync in Meta Manager. You approve every template before anything sends.',
    href: '/features/meta-manager',
  },
  {
    name: 'Instagram',
    body: 'Comment and story automations hand off into the same Live Chat inbox as WhatsApp.',
    href: '/features/instagram',
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <MarketingSEO
        title={PAGE_SEO.integrations.title}
        description={PAGE_SEO.integrations.description}
        keywords={PAGE_SEO.integrations.keywords}
        path={PAGE_SEO.integrations.path}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'Integrations',
            description: PAGE_SEO.integrations.description,
            path: PAGE_SEO.integrations.path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Integrations', path: '/integrations' },
          ]),
        ]}
      />
      <MarketingPage>
        <PageHero
          eyebrow="Integrations"
          title="Shopify + Meta — the stack Indian D2C already runs"
          subtitle="TopEdge sits on the tools you already trust. Connect once, sync continuously, operate from one workspace."
        />
        <Section className="!pt-0">
          <SectionHeading
            title="Core connections"
            subtitle="Native Shopify WhatsApp integration without Zapier for standard ecommerce flows."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {integrations.map((i) => (
              <MarketingCard key={i.name} className="!p-6">
                <h2 className="text-lg font-medium text-[#0c1222]">{i.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{i.body}</p>
                <Link to={i.href} className="mt-4 inline-block text-sm font-medium text-[#7C3AED]">
                  Learn more →
                </Link>
              </MarketingCard>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
            Deep dive:{' '}
            <Link to="/shopify-whatsapp-integration" className="font-medium text-[#7C3AED]">
              Shopify WhatsApp integration guide
            </Link>
            {' · '}
            <Link to="/whatsapp-cart-recovery" className="font-medium text-[#7C3AED]">
              Cart recovery
            </Link>
            {' · '}
            <Link to="/blog/meta-whatsapp-cloud-api-shopify-templates" className="font-medium text-[#7C3AED]">
              Meta templates playbook
            </Link>
          </p>
        </Section>
        <MarketingCtaBand
          title="Connect your store in about fifteen minutes"
          subtitle="Start free — Shopify OAuth and WhatsApp credentials are guided in onboarding."
          primaryLabel="Start free"
          secondaryLabel="See features"
          secondaryTo="/features"
        />
      </MarketingPage>
    </>
  );
}
