import { Mail, MessageCircle, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import { PageHero, Section, MarketingCard, PrimaryButton } from '../marketing/components/ui';
import { Reveal } from '../marketing/components/motion';
import MarketingPage from '../marketing/components/MarketingPage';

const channels = [
  {
    icon: Mail,
    title: 'Email',
    desc: 'Implementation, partnerships, and billing.',
    action: 'hello@topedgeai.com',
    href: 'mailto:hello@topedgeai.com',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    desc: 'Fastest for existing customers on Growth or Scale.',
    action: 'Chat with us',
    href: '/signup',
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
  return (
    <>
      <SEO
        title="Contact | TopEdge — WhatsApp automation for Shopify"
        description="Talk to TopEdge about WhatsApp automations, Meta templates, or fully managed setup for your Shopify store."
        type="website"
      />
      <MarketingPage>
        <PageHero
          eyebrow="Contact"
          title="Tell us what you want to automate first"
          subtitle="Cart recovery, COD confirm, campaigns, or full WhatsApp ops — we will map a practical rollout for your store."
        />

        <Section>
          <div className="grid gap-10 lg:grid-cols-5">
            <Reveal className="lg:col-span-3">
              <form
                className="space-y-4 rounded-2xl border border-violet-200/60 bg-white p-6 shadow-sm md:p-8"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-slate-600">
                      Name
                    </label>
                    <input
                      id="name"
                      className="w-full rounded-xl border border-violet-200/80 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-slate-600">
                      Work email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-xl border border-violet-200/80 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
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
                    className="w-full rounded-xl border border-violet-200/80 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    placeholder="yourbrand.myshopify.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-slate-600">
                    What should we automate first?
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-xl border border-violet-200/80 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    placeholder="e.g. abandoned cart on COD, order updates, campaign to repeat buyers…"
                  />
                </div>
                <button
                  type="submit"
                  className="marketing-btn-gradient inline-flex h-11 w-full items-center justify-center rounded-full px-8 text-sm font-medium text-white sm:w-auto"
                >
                  Send request
                </button>
                <p className="text-xs text-slate-400">
                  By submitting, you agree we may contact you about TopEdge. No spam — India-focused team.
                </p>
              </form>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-2">
              <div className="space-y-4">
                {channels.map((c) => {
                  const Icon = c.icon;
                  return (
                    <MarketingCard key={c.title} className="!p-5">
                      <div className="flex gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-[#7C3AED]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="font-medium text-[#0c1222]">{c.title}</h3>
                          <p className="mt-1 text-sm text-slate-500">{c.desc}</p>
                          {c.href ? (
                            <a href={c.href} className="mt-2 inline-block text-sm font-medium text-[#7C3AED] hover:underline">
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
