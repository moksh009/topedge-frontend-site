import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { stackIntegrations } from '../../data/home';
import ShopifyLogo from '../icons/ShopifyLogo';
import WhatsAppLogo from '../icons/WhatsAppLogo';
import { Reveal } from '../motion';

const icons: Record<string, React.ReactNode> = {
  Shopify: <ShopifyLogo size={44} />,
  'Meta WhatsApp': <WhatsAppLogo size={44} />,
  'Your team': (
    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-violet-50 text-[#7C3AED]">
      <Users className="h-5 w-5" strokeWidth={2} />
    </span>
  ),
};

export default function HomeIntegrationsStrip() {
  return (
    <section className="border-y border-violet-100/80 bg-white py-14 md:py-16">
      <div className="marketing-container">
        <Reveal className="flex flex-col items-center justify-between gap-10 md:flex-row md:gap-12">
          <div className="max-w-md text-center md:text-left">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#7C3AED]/70">Your stack</p>
            <h2 className="mt-2 text-xl font-medium tracking-tight text-[#0c1222] md:text-2xl">
              Shopify + Meta WhatsApp + your team — one connected system
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Orders, carts, templates, and replies stay in sync — no copy-paste between tabs.
            </p>
            <Link
              to="/integrations"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#7C3AED] hover:underline"
            >
              All integrations →
            </Link>
          </div>
          <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-3">
            {stackIntegrations.map((item, i) => (
              <div
                key={item.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="rounded-2xl border border-violet-100/80 bg-gradient-to-b from-violet-50/40 to-white p-5 text-center shadow-sm transition-shadow hover:shadow-md hover:shadow-violet-500/8"
              >
                <div className="flex justify-center">{icons[item.name]}</div>
                <p className="mt-4 text-sm font-semibold text-[#0c1222]">{item.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
