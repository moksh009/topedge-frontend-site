import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import MarketingSEO from '../marketing/components/MarketingSEO';
import {
  PAGE_SEO,
  organizationJsonLd,
  breadcrumbJsonLd,
} from '../marketing/data/pageSeo';
import { SITE_URL } from '../marketing/data/marketingSeo';
import MarketingPage from '../marketing/components/MarketingPage';
import MarketingCtaBand from '../marketing/components/MarketingCtaBand';
import { PrimaryButton, GhostButton } from '../marketing/components/ui';
import { Reveal, Stagger, StaggerItem } from '../marketing/components/motion';
import { COMPANY_ADDRESS_LINES, COMPANY_EMAIL } from '../marketing/legal/companyIdentity';
import '../marketing/styles/about.css';

const beliefs = [
  {
    title: 'Built for Indian D2C',
    desc: 'COD, ₹ pricing, RTO, and Meta template rules, designed for how Indian stores actually sell.',
  },
  {
    title: 'Revenue over vanity metrics',
    desc: 'We track recovered carts, reply rates, and campaign ROI, not empty send volume.',
  },
  {
    title: 'You stay in control',
    desc: 'Approve every template before Meta. Pause AI the moment a human takes the thread.',
  },
];

const founders = [
  {
    name: 'Moksh Patel',
    role: 'Co-founder · Product',
    image: '/marketing/team/moksh-patel.jpg',
    imageAlt: 'Moksh Patel, Co-founder of TopEdge AI',
    bio: 'Builds the Shopify ↔ Meta ↔ WhatsApp product: journeys, Live Chat, template hygiene, and recovery math operators can trust.',
  },
  {
    name: 'Smit Tilva',
    role: 'Co-founder · Growth',
    image: '/marketing/team/smit-tilva.png',
    imageAlt: 'Smit Tilva, Co-founder of TopEdge AI',
    bio: 'Runs go-to-market with merchants: onboarding, DFY setup, and getting cart recovery and COD flows live without the fluff.',
  },
];

const brands = [
  {
    name: 'Delitech Smart Home',
    href: 'https://delitechsmarthome.in/',
    logo: '/trust/delitech-white.png',
    tag: 'Smart security · India',
    copy: 'Video doorbells and home security for Indian families, with Amazon Choice traction and WhatsApp as a primary support channel. TopEdge keeps cart recovery, order updates, and help on the same thread.',
    stats: ['2K+ customers', 'Amazon Choice', '24×7 support'],
  },
  {
    name: 'Apex Light',
    href: 'https://apexlight.in/',
    logo: '/trust/apex-white.png',
    tag: 'Smart lighting · India',
    copy: 'Shopify-native smart lighting, RGBIC, floor lamps, TV sync, for buyers across India. TopEdge runs WhatsApp carts, prepaid nudges, and post-purchase support without rebuilding flows every drop.',
    stats: ['50K+ customers', 'RGBIC category', 'Ahmedabad D2C'],
  },
];

function aboutPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About TopEdge AI',
    description: PAGE_SEO.about.description,
    url: `${SITE_URL}/about`,
    isPartOf: { '@type': 'WebSite', name: 'TopEdge AI', url: SITE_URL },
    mainEntity: {
      '@type': 'Organization',
      name: 'TopEdge AI',
      url: SITE_URL,
      email: COMPANY_EMAIL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY_ADDRESS_LINES.slice(0, 2).join(' '),
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        postalCode: '380051',
        addressCountry: 'IN',
      },
      founder: founders.map((f) => ({
        '@type': 'Person',
        name: f.name,
        jobTitle: f.role,
        image: `${SITE_URL}${f.image}`,
      })),
      knowsAbout: [
        'WhatsApp automation for Shopify',
        'Abandoned cart recovery',
        'COD confirmation WhatsApp',
        'Meta WhatsApp Cloud API',
      ],
    },
  };
}

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
          aboutPageJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />
      <MarketingPage className="mkt-about">
        <header className="mkt-about__hero">
          <p className="mkt-about__brand">
            <img src="/brand-mark.png" alt="" width={26} height={26} decoding="async" />
            <span>
              TopEdge <span>AI</span>
            </span>
          </p>
          <h1 className="mkt-about__h1">
            WhatsApp growth OS for <span className="mkt-about__h1-accent">Shopify India</span>
          </h1>
          <p className="mkt-about__lede">
            Shopify data, Meta-approved templates, and AI in one workspace, so D2C teams sell and
            support on WhatsApp.
          </p>
          <div className="mkt-about__actions">
            <PrimaryButton to="/signup">
              Start free
              <ArrowRight className="h-4 w-4" aria-hidden />
            </PrimaryButton>
            <GhostButton to="/contact">Contact</GhostButton>
          </div>
        </header>

        <section className="mkt-about__section" aria-labelledby="about-why">
          <Reveal>
            <p className="mkt-about__eyebrow">Why TopEdge</p>
            <h2 id="about-why" className="mkt-about__heading">
              Conversations that close revenue
            </h2>
            <p className="mkt-about__intro">
              TopEdge sits between your store, Meta, and WhatsApp, not another chatbot. Carts, COD
              status, and order context stay live, so journeys and Live Chat match your Shopify
              admin.
            </p>
          </Reveal>
          <Stagger className="mkt-about__beliefs">
            {beliefs.map((b) => (
              <StaggerItem key={b.title}>
                <article className="mkt-about__belief">
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <section className="mkt-about__section mkt-about__section--wash" aria-labelledby="about-founders">
          <div className="mkt-about__section-inner">
            <Reveal>
              <p className="mkt-about__eyebrow">Founders</p>
              <h2 id="about-founders" className="mkt-about__heading">
                Founded in Ahmedabad for Shopify India
              </h2>
              <p className="mkt-about__intro">
                Moksh Patel and Smit Tilva run product and growth for brands that want WhatsApp
                automation without Meta markup games or vanity send counts.
              </p>
            </Reveal>
            <Stagger className="mkt-about__founders">
              {founders.map((f) => (
                <StaggerItem key={f.name}>
                  <article className="mkt-about__founder">
                    <div className="mkt-about__founder-media">
                      <img
                        src={f.image}
                        alt={f.imageAlt}
                        width={560}
                        height={560}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="mkt-about__founder-body">
                      <p className="mkt-about__founder-role">{f.role}</p>
                      <h3 className="mkt-about__founder-name">{f.name}</h3>
                      <p className="mkt-about__founder-bio">{f.bio}</p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="mkt-about__section" aria-labelledby="about-brands">
          <Reveal>
            <p className="mkt-about__eyebrow">Brands we serve</p>
            <h2 id="about-brands" className="mkt-about__heading">
              Brands recovering on WhatsApp
            </h2>
            <p className="mkt-about__intro">
              From smart home to lighting, they need cart recovery, COD clarity, and support that
              already knows the order.
            </p>
          </Reveal>
          <Stagger className="mkt-about__brands">
            {brands.map((b) => (
              <StaggerItem key={b.name}>
                <article className="mkt-about__brand-card">
                  <div className="mkt-about__brand-top">
                    <div className="mkt-about__brand-logo">
                      <img src={b.logo} alt={`${b.name} logo`} width={140} height={36} loading="lazy" />
                    </div>
                    <span className="mkt-about__brand-site">
                      {b.href.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </span>
                  </div>
                  <div className="mkt-about__brand-body">
                    <h3 className="mkt-about__brand-name">{b.name}</h3>
                    <p className="mkt-about__brand-tag">{b.tag}</p>
                    <p className="mkt-about__brand-copy">{b.copy}</p>
                    <div className="mkt-about__brand-stats">
                      {b.stats.map((s) => (
                        <span key={s} className="mkt-about__brand-stat">
                          {s}
                        </span>
                      ))}
                    </div>
                    <a
                      className="mkt-about__brand-link"
                      href={b.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit site
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal>
            <p className="mkt-about__intro" style={{ marginTop: '1.75rem' }}>
              More outcomes on{' '}
              <Link to="/customers" className="font-medium text-[#7C3AED] underline underline-offset-2">
                Customers
              </Link>
              . Stack comparisons in{' '}
              <Link to="/compare" className="font-medium text-[#7C3AED] underline underline-offset-2">
                Compare
              </Link>
              .
            </p>
          </Reveal>
        </section>

        <MarketingCtaBand
          title="Ready to run it on your store?"
          subtitle="Connect Shopify, approve templates, publish your first flow, or talk to us about managed setup."
          primaryLabel="Create free account"
          secondaryLabel="Contact sales"
          secondaryTo="/contact"
        />
      </MarketingPage>
    </>
  );
}
