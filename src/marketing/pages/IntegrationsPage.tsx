import MarketingSEO from '../components/MarketingSEO';
import { PAGE_SEO } from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { PageHero, Section, MarketingCard } from '../components/ui';

const integrations = [
  {
    name: 'Shopify',
    body: 'OAuth connect, orders, carts, catalog, and COD fields sync into TopEdge. Edit store data in Shopify / the dashboard ,  not on this marketing site.',
  },
  {
    name: 'Meta WhatsApp',
    body: 'Business API templates, utility and marketing categories, status sync in Meta Manager. You approve every template before anything sends.',
  },
  {
    name: 'Instagram',
    body: 'Comment and story automations hand off into the same Live Chat inbox as WhatsApp.',
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
      />
      <MarketingPage>
        <PageHero
          eyebrow="Integrations"
          title="Shopify + Meta ,  the stack Indian D2C already runs"
          subtitle="TopEdge sits on the tools you already trust. Connect once, sync continuously, operate from one workspace."
        />
        <Section className="!pt-0">
          <div className="grid gap-5 md:grid-cols-3">
            {integrations.map((i) => (
              <MarketingCard key={i.name} className="!p-6">
                <p className="text-lg font-medium text-[#0c1222]">{i.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{i.body}</p>
              </MarketingCard>
            ))}
          </div>
        </Section>
        <MarketingCtaBand
          title="Connect your store in about fifteen minutes"
          subtitle="Start free ,  Shopify OAuth and WhatsApp credentials are guided in onboarding."
          primaryLabel="Start free"
          secondaryLabel="See features"
          secondaryTo="/features"
        />
      </MarketingPage>
    </>
  );
}
