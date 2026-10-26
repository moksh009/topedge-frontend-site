import { Link } from 'react-router-dom';
import MarketingSEO from '../../components/MarketingSEO';
import MarketingPage from '../../components/MarketingPage';
import MarketingCtaBand from '../../components/MarketingCtaBand';
import { Section } from '../../components/ui';
import JourneyHero from '../../components/journey/JourneyHero';
import TrustBand from '../../components/journey/TrustBand';
import { ToolCard } from '../../components/tools/ToolCards';
import { FREE_TOOLS, TOOLS_PATH } from '../../data/freeTools';
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  webPageJsonLd,
} from '../../data/pageSeo';
import '../../styles/tools.css';

const DESCRIPTION =
  'Free tools for Shopify stores in India: find the best WhatsApp tool for your store, calculate RTO and cart recovery, and create WhatsApp links and QR codes.';

export default function ToolsIndexPage() {
  const [feature, ...rest] = FREE_TOOLS;
  return (
    <>
      <MarketingSEO
        title="Free Tools for Shopify Stores in India | TopEdge AI"
        description={DESCRIPTION}
        keywords="free Shopify tools, RTO calculator, cart recovery calculator, WhatsApp link generator, best WhatsApp tool for Shopify, ecommerce tools India"
        path={TOOLS_PATH}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({ name: 'Free tools for Shopify stores', description: DESCRIPTION, path: TOOLS_PATH }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Free tools', path: TOOLS_PATH },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Free tools for Shopify stores',
            itemListElement: FREE_TOOLS.map((t, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: t.title,
              url: `https://topedgeai.com${t.href}`,
            })),
          },
        ]}
      />
      <MarketingPage>
        <JourneyHero
          eyebrow="Free tools"
          title="Free tools for Shopify stores"
          accent="Free tools"
          subtitle="Calculators and generators for what Indian Shopify stores ask about most: RTO, abandoned carts and WhatsApp costs. No sign-up, nothing to install."
          trust
        />

        <Section className="!pt-10 md:!pt-14">
          <div className="mx-auto flex max-w-5xl flex-col gap-4">
            <ToolCard tool={feature} />
            <ul className="mkt-tools-grid">
              {rest.map((t) => (
                <li key={t.slug}>
                  <ToolCard tool={t} />
                </li>
              ))}
            </ul>
            <p className="mkt-tool__privacy">
              No sign-up, no email, nothing to install.{' '}
              <Link to="/contact" className="font-medium text-[#7C3AED] hover:underline">
                Suggest a tool
              </Link>
            </p>
          </div>
        </Section>

        <Section wash="soft">
          <TrustBand title="Made by the team behind TopEdge, used by Shopify brands" />
        </Section>

        <MarketingCtaBand
          title="When you are ready to automate it"
          subtitle="COD confirmation, cart recovery and order updates on WhatsApp for your Shopify store. Free for 14 days."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
