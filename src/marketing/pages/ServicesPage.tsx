import { Link } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { Section, SectionHeading } from '../components/ui';
import JourneyHero from '../components/journey/JourneyHero';
import TrustBand from '../components/journey/TrustBand';
import { SITE_URL } from '../data/marketingSeo';
import { PAGE_SEO, breadcrumbJsonLd, organizationJsonLd, webPageJsonLd } from '../data/pageSeo';
import {
  SERVICES_PATH,
  SERVICE_FAQS,
  SERVICE_GROUPS,
  SERVICE_STEPS,
} from '../data/services';

const seo = PAGE_SEO.services;

export default function ServicesPage() {
  return (
    <>
      <MarketingSEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        path={SERVICES_PATH}
        faqSchema={SERVICE_FAQS.map((f) => ({ question: f.question, answer: f.answer }))}
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'WhatsApp automation services for Shopify stores in India',
            description: seo.description,
            path: SERVICES_PATH,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: SERVICES_PATH },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'WhatsApp automation services for Shopify stores in India',
            itemListElement: SERVICE_GROUPS.map((g, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: g.title,
              description: g.body,
              url: `${SITE_URL}${SERVICES_PATH}#${g.id}`,
            })),
          },
        ]}
      />
      <MarketingPage>
        <JourneyHero
          eyebrow="Services"
          title="WhatsApp automation services for Shopify stores in India"
          accent="WhatsApp automation services"
          subtitle="Seven things we take responsibility for, from recovering abandoned carts and COD orders to getting you through Meta template approval. Your own number, your own Meta credentials, 0% markup on Meta India rates."
          trust
        />

        <Section className="!pt-10 md:!pt-14">
          <div className="mx-auto max-w-5xl">
            <p className="text-[15px] leading-relaxed text-slate-600 md:text-base">
              TopEdge is software you run yourself, with guided onboarding — not an agency
              retainer. You connect Shopify and your own Meta WhatsApp Cloud API credentials,
              so the number, the template library and the quality rating stay in your name.
              What follows is what the platform is responsible for once that is connected, and
              the page for each capability behind it.
            </p>
          </div>
        </Section>

        <Section wash="soft">
          <SectionHeading
            eyebrow="What we do"
            title="Seven outcomes, and the product behind each one"
            accent="Seven outcomes"
            subtitle="Grouped by the result you are buying rather than by menu item."
          />
          <ul className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
            {SERVICE_GROUPS.map((g) => (
              <li
                key={g.id}
                id={g.id}
                className="scroll-mt-28 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
              >
                <h3 className="text-lg font-semibold tracking-tight text-slate-900">{g.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{g.body}</p>
                <ul className="mt-4 space-y-2">
                  {g.deliverables.map((d) => (
                    <li key={d} className="flex gap-2.5 text-[14.5px] leading-snug text-slate-700">
                      <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C3AED]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-100 pt-4">
                  {g.links.map((l) => (
                    <Link
                      key={l.href}
                      to={l.href}
                      className="text-[14px] font-medium text-[#7C3AED] hover:underline"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <SectionHeading
            eyebrow="How it starts"
            title="Four steps from signup to a journey that sends"
            accent="Four steps"
            subtitle="The only step with a variable timeline is Meta template approval."
          />
          <ol className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-4">
            {SERVICE_STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-slate-200/80 bg-white p-5">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#7C3AED]/10 text-[13px] font-semibold text-[#7C3AED]">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-8 max-w-5xl text-[14.5px] text-slate-600">
            The full field-by-field walkthrough is on{' '}
            <Link to="/integrations" className="font-medium text-[#7C3AED] hover:underline">
              integrations
            </Link>
            , and the{' '}
            <Link
              to="/shopify-whatsapp-integration"
              className="font-medium text-[#7C3AED] hover:underline"
            >
              Shopify WhatsApp integration guide
            </Link>{' '}
            covers what syncs once OAuth completes.
          </p>
        </Section>

        <Section wash="soft">
          <SectionHeading
            eyebrow="Questions"
            title="What stores ask before they start"
            accent="before they start"
          />
          <dl className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200">
            {SERVICE_FAQS.map((f) => (
              <div key={f.question} className="py-5">
                <dt className="text-[15.5px] font-semibold tracking-tight text-slate-900">
                  {f.question}
                </dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-slate-600">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section>
          <TrustBand title="Used by Shopify brands running COD at scale in India" />
        </Section>

        <MarketingCtaBand
          eyebrow="Start free"
          title="Connect Shopify and see what a month of carts is worth"
          subtitle="14 days free, flat INR plans from ₹1,999/mo + GST, and 0% markup on Meta India rates."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
