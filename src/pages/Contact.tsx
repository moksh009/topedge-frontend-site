import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Clock } from 'lucide-react';
import MarketingSEO from '../marketing/components/MarketingSEO';
import {
  PAGE_SEO,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '../marketing/data/pageSeo';
import { PageHero, Section, SectionHeading, MarketingCard } from '../marketing/components/ui';
import { Reveal } from '../marketing/components/motion';
import MarketingPage from '../marketing/components/MarketingPage';
import {
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_WHATSAPP_URL,
} from '../marketing/legal/companyIdentity';

const channels = [
  {
    icon: MessageCircle,
    title: 'WhatsApp sales',
    desc: 'Fastest way to pick a plan and launch cart recovery.',
    action: `Chat ${COMPANY_PHONE}`,
    href: COMPANY_WHATSAPP_URL,
  },
  {
    icon: Mail,
    title: 'Email',
    desc: 'Implementation, partnerships, and billing.',
    action: COMPANY_EMAIL,
    href: `mailto:${COMPANY_EMAIL}`,
  },
  {
    icon: Clock,
    title: 'Response time',
    desc: 'IST business hours — usually same day.',
    action: 'Mon–Sat, 10am–7pm IST',
    href: undefined,
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') ?? '');
    const email = String(fd.get('email') ?? '');
    const store = String(fd.get('store') ?? '');
    const message = String(fd.get('message') ?? '');
    const text = encodeURIComponent(
      `Hi TopEdge — inquiry from ${name || 'Shopify merchant'}\nEmail: ${email}\nStore: ${store}\n\n${message}`,
    );
    window.open(`https://wa.me/919313045439?text=${text}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <>
      <MarketingSEO
        title={PAGE_SEO.contact.title}
        description={PAGE_SEO.contact.description}
        keywords={PAGE_SEO.contact.keywords}
        path={PAGE_SEO.contact.path}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'Contact TopEdge',
            description: PAGE_SEO.contact.description,
            path: PAGE_SEO.contact.path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />
      <MarketingPage>
        <PageHero
          eyebrow="Contact"
          title="Tell us what you want to automate first"
          subtitle="Cart recovery, COD confirm, campaigns, or full WhatsApp ops — we will map a practical rollout for your store."
        />

        <Section className="!pt-0 !pb-4">
          <div className="mx-auto max-w-3xl text-base leading-relaxed text-slate-600">
            <p>
              TopEdge helps Indian Shopify brands run{' '}
              <Link to="/features/journeys#abandoned-cart" className="font-medium text-[#7C3AED]">
                WhatsApp cart recovery
              </Link>
              ,{' '}
              <Link to="/features/journeys" className="font-medium text-[#7C3AED]">
                COD confirmation
              </Link>
              , and shared inbox support with Meta Cloud API. Prefer self-serve?{' '}
              <Link to="/signup" className="font-medium text-[#7C3AED]">
                Start free
              </Link>{' '}
              or review{' '}
              <Link to="/pricing" className="font-medium text-[#7C3AED]">
                pricing
              </Link>
              .
            </p>
          </div>
        </Section>

        <Section>
          <SectionHeading title="Send a message" subtitle="We reply during IST business hours." />
          <div className="grid gap-10 lg:grid-cols-5">
            <Reveal className="lg:col-span-3">
              <form
                className="space-y-4 rounded-2xl border border-marketing-border bg-white p-6 shadow-sm md:p-8"
                onSubmit={handleSubmit}
              >
                {sent ? (
                  <div className="rounded-xl border border-marketing-border bg-violet-50/50 p-5 text-sm text-slate-600">
                    Opening WhatsApp… If it did not open, chat us at{' '}
                    <a
                      href={COMPANY_WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#7C3AED] hover:underline"
                    >
                      {COMPANY_PHONE}
                    </a>{' '}
                    or email{' '}
                    <a href={`mailto:${COMPANY_EMAIL}`} className="font-medium text-[#7C3AED] hover:underline">
                      {COMPANY_EMAIL}
                    </a>
                    .
                  </div>
                ) : null}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-slate-600">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-xl border border-marketing-border px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-slate-600">
                      Work email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-marketing-border px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                      placeholder="you@brand.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="store" className="mb-1.5 block text-xs font-medium text-slate-600">
                    Shopify store URL
                  </label>
                  <input
                    id="store"
                    name="store"
                    className="w-full rounded-xl border border-marketing-border px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    placeholder="yourbrand.myshopify.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-slate-600">
                    What should we automate first?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full rounded-xl border border-marketing-border px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    placeholder="e.g. abandoned cart on COD, order updates, campaign to repeat buyers…"
                  />
                </div>
                <button
                  type="submit"
                  className="marketing-btn-gradient inline-flex h-11 w-full items-center justify-center rounded-full px-8 text-sm font-medium text-white sm:w-auto"
                >
                  Send on WhatsApp
                </button>
                <p className="text-xs text-slate-400">
                  By submitting, you agree we may contact you about TopEdge. No spam — India-focused team.
                </p>
              </form>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-2">
              <h2 className="mb-4 text-lg font-medium text-[#0c1222]">Other ways to reach us</h2>
              <div className="space-y-4">
                {channels.map((c) => {
                  const Icon = c.icon;
                  return (
                    <MarketingCard key={c.title} className="!p-5">
                      <div className="flex gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-marketing-border bg-violet-50/80 text-[#7C3AED]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="font-medium text-[#0c1222]">{c.title}</h3>
                          <p className="mt-1 text-sm text-slate-500">{c.desc}</p>
                          {c.href ? (
                            <a
                              href={c.href}
                              className="mt-2 inline-block text-sm font-medium text-[#7C3AED] hover:underline"
                              {...(c.href.startsWith('http')
                                ? { target: '_blank', rel: 'noopener noreferrer' }
                                : {})}
                            >
                              {c.action}
                            </a>
                          ) : (
                            <p className="mt-2 text-sm font-medium text-slate-700">{c.action}</p>
                          )}
                        </div>
                      </div>
                    </MarketingCard>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </Section>
      </MarketingPage>
    </>
  );
}
