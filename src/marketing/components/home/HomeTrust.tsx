import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { stackIntegrations, logoBrands } from '../../data/home';
import ShopifyLogo from '../icons/ShopifyLogo';
import WhatsAppLogo from '../icons/WhatsAppLogo';

const icons: Record<string, React.ReactNode> = {
  Shopify: <ShopifyLogo size={40} />,
  'Meta WhatsApp': <WhatsAppLogo size={40} />,
  'Your team': (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-[#7C3AED]">
      <Users className="h-5 w-5" strokeWidth={2} />
    </span>
  ),
};

export default function HomeTrust() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="marketing-container">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="home-eyebrow">Your stack</p>
            <h2 className="home-section-title mt-3">Shopify + Meta WhatsApp + your team</h2>
            <p className="home-section-lead max-w-lg">
              Orders, abandoned carts, templates, and replies stay in sync — no copy-paste between Shopify admin,
              Meta Business Manager, and spreadsheets.
            </p>
            <Link to="/integrations" className="mt-5 inline-flex text-sm font-semibold text-[#7C3AED] hover:underline">
              See all integrations →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {stackIntegrations.map((item) => (
              <div key={item.name} className="home-trust-card text-center">
                <div className="flex justify-center">{icons[item.name]}</div>
                <p className="mt-3 text-sm font-semibold text-[#0c1222]">{item.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 border-t border-violet-100/80 pt-8">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Built for</span>
          {logoBrands.map((b) => (
            <span
              key={b}
              className="rounded-full border border-violet-100 bg-violet-50/60 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
