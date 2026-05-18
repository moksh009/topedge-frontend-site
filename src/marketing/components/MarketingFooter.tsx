import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { PrimaryButton } from './ui';
import { DASH_DOCS } from '../constants';

const DASH_LOGIN = 'https://dash.topedgeai.com';

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/features' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Integrations', to: '/integrations' },
      { label: 'Meta Manager', to: '/features/meta-manager' },
      { label: 'Flow Builder', to: '/features/flow-builder' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'D2C brands', to: '/customers' },
      { label: 'Agencies', to: '/customers' },
      { label: 'Support teams', to: '/customers' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: DASH_DOCS },
      { label: 'Blog', to: '/blog' },
      { label: 'ROI calculator', to: '/roi' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Privacy', to: '/privacy-policy' },
    ],
  },
];

const trustBadges = ['Shopify Partner', 'Meta Business API', 'WhatsApp Cloud API', 'Built for India · ₹'];

export default function MarketingFooter() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <footer className="border-t border-violet-100 bg-white">
      {!isHome && (
      <div className="border-b border-violet-100 bg-gradient-to-br from-violet-50 via-white to-violet-50/80">
        <div className="marketing-container flex flex-col items-center justify-between gap-6 py-12 text-center md:flex-row md:text-left">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#7C3AED]/80">Get started</p>
            <h3 className="mt-2 text-xl tracking-tight text-[#0c1222] md:text-2xl">
              Your WhatsApp channel, live in about 15 minutes
            </h3>
            <p className="mt-2 max-w-md text-sm text-slate-500">
              Connect Shopify, approve templates, publish your first flow — no credit card.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
            <PrimaryButton to="/signup">Start free</PrimaryButton>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-violet-200 bg-white px-6 text-sm text-slate-700 transition-colors hover:border-violet-300 hover:text-[#7C3AED]"
            >
              Talk to sales
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      )}

      <div className="marketing-container py-14">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <BrandLogo size="sm" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              WhatsApp growth OS for Indian ecommerce — Shopify sync, Meta templates, AI flows, and human handoff in one
              workspace.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-5 py-2.5 text-sm font-medium text-[#7C3AED] transition hover:border-violet-300 hover:shadow-sm"
            >
              <Mail className="h-4 w-4" />
              Talk to our team
            </Link>
            <div className="mt-6 flex flex-wrap gap-2">
              {trustBadges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-violet-100 bg-violet-50/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-500"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-900">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {'href' in link && link.href ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-500 transition-colors hover:text-[#7C3AED]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to!} className="text-sm text-slate-500 transition-colors hover:text-[#7C3AED]">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-violet-100 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} TopEdge AI. Made for Indian ecommerce.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={DASH_LOGIN} className="font-medium text-[#7C3AED] hover:underline">
              Log in to dashboard →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
