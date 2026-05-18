import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { valuePillars } from '../../data/home';

export default function HomeCapabilities() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="marketing-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="home-eyebrow">Capabilities</p>
          <h2 className="home-section-title mt-3">Everything WhatsApp needs — tied to Shopify</h2>
          <p className="home-section-lead">
            Templates, flows, inbox, and campaigns share one data layer. No agency spreadsheets, no generic chatbot.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {valuePillars.map((pillar) => (
            <Link key={pillar.id} to={pillar.to} className="home-cap-card group block">
              <span className="home-cap-tag">{pillar.outcome}</span>
              <h3 className="mt-4 text-xl font-medium tracking-tight text-[#0c1222]">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{pillar.desc}</p>
              <ul className="mt-5 space-y-2 border-t border-violet-100/80 pt-5">
                {pillar.features.map((f) => (
                  <li key={f} className="text-sm text-slate-600">
                    {f}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#7C3AED] opacity-0 transition-opacity group-hover:opacity-100">
                Learn more
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
