import { Link } from 'react-router-dom';
import MarketingSEO from '../marketing/components/MarketingSEO';
import {
  PAGE_SEO,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '../marketing/data/pageSeo';
import { PageHero, Section, SectionHeading, MarketingCard, PrimaryButton, Eyebrow } from '../marketing/components/ui';
import { Stagger, StaggerItem } from '../marketing/components/motion';
import MarketingPage from '../marketing/components/MarketingPage';

const values = [
  {
    title: 'Built for Indian D2C',
    desc: 'COD, ₹ pricing, RTO economics, and Meta template rules — not a US-first playbook pasted onto WhatsApp.',
  },
  {
    title: 'Revenue over vanity metrics',
    desc: 'We measure recovered carts, reply rates, and campaign ROI — not message volume for its own sake.',
  },
  {
    title: 'You stay in control',
    desc: 'Every template goes through your review before Meta. Humans can pause AI any time in Live Chat.',
  },
];

const stats = [
  { value: '15 min', label: 'Typical time to first live flow' },
  { value: '3×', label: 'Common cart recovery uplift vs email-only' },
  { value: '24–48h', label: 'Meta template approval window' },
  { value: '₹', label: 'Transparent pricing for India' },
];

export default function About() {
  return (
    <>
      <MarketingSEO
        title={PAGE_SEO.about.title}
        description={PAGE_SEO.about.description}
        keywords={PAGE_SEO.about.keywords}
        path={PAGE_SEO.about.path}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'About TopEdge',
            description: PAGE_SEO.about.description,
            path: PAGE_SEO.about.path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />
      <MarketingPage>
        <PageHero
          eyebrow="About TopEdge"
          title="WhatsApp growth OS for Shopify India"
          subtitle="We connect Shopify data, Meta-approved templates, visual automations, and AI — so D2C teams sell and support on the channel customers already use."
        >
              <PrimaryButton to="/signup">Start free</PrimaryButton>
        </PageHero>

        <Section>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <MarketingCard className="text-center !p-6">
                  <p className="text-2xl tracking-tight text-[#7C3AED]">{s.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{s.label}</p>
                </MarketingCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <Section subtle>
          <SectionHeading
            eyebrow="What we believe"
            title="Commerce conversations should drive revenue"
            subtitle="TopEdge is the operating layer between your store, Meta, and WhatsApp — not another generic chatbot."
            center
          />
          <Stagger className="grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <MarketingCard className="h-full !p-7">
                  <h3 className="text-lg text-[#0c1222]">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{v.desc}</p>
                </MarketingCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <Section>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="text-center">Join us</Eyebrow>
            <h2 className="text-2xl tracking-tight md:text-3xl">Ready to see it on your store?</h2>
            <p className="mt-4 text-slate-500">
              Connect Shopify, approve templates, and publish your first flow — or talk to us about fully managed setup.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PrimaryButton to="/signup">Create free account</PrimaryButton>
              <Link
                to="/contact"
                className="inline-flex h-11 items-center rounded-full border border-marketing-border px-6 text-sm text-slate-700 hover:border-violet-300 hover:text-[#7C3AED]"
              >
                Contact sales
              </Link>
            </div>
          </div>
        </Section>
      </MarketingPage>
    </>
  );
}
