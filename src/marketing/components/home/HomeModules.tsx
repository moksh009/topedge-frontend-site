import { Link } from 'react-router-dom';
import { productMegaMenu } from '../../data/navigation';
import { SecondaryButton } from '../ui';

export default function HomeModules() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="marketing-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="home-eyebrow">Product</p>
            <h2 className="home-section-title mt-3">Twelve modules. One workspace.</h2>
            <p className="home-section-lead">
              Inbox, AI, flows, Meta templates, campaigns, CRM, cart recovery, Shopify sync, orders, and analytics — all
              under one roof.
            </p>
          </div>
          <SecondaryButton to="/features" className="shrink-0">
            View all features
          </SecondaryButton>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {productMegaMenu.map((hub) => (
            <div key={hub.title} className="home-hub-block">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#7C3AED]">{hub.title}</h3>
              <nav className="mt-4" aria-label={hub.title}>
                {hub.items.map((item) => (
                  <Link key={item.label} to={item.to ?? '/features'} className="home-hub-link">
                    <span className="font-medium">{item.label}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">{item.desc}</span>
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
