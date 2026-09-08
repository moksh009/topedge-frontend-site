import { Link } from 'react-router-dom';

const footerLinks = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Cart recovery', href: '/whatsapp-cart-recovery' },
    { label: 'Shopify integration', href: '/shopify-whatsapp-integration' },
    { label: 'Integrations', href: '/integrations' },
    { label: 'Security', href: '/security' },
  ],
  Solutions: [
    { label: 'Fashion & apparel', href: '/solutions/fashion' },
    { label: 'Beauty', href: '/solutions/beauty' },
    { label: 'Food & beverage', href: '/solutions/food' },
    { label: 'COD-first brands', href: '/cod-confirmation-whatsapp' },
    { label: 'Agencies', href: '/agency' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Customers', href: '/customers' },
    { label: 'Compare', href: '/compare' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Security', href: '/security' },
  ],
};

export default function MarketingFooter() {
  return (
    <footer className="border-t border-[#efeaf8] bg-white">
      <div className="mx-auto max-w-[var(--mkt-max-wide)] px-5 py-16 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link to="/" className="mkt-display text-lg font-medium text-[#0c1222]">
              TopEdge <span className="text-[#7C3AED]">AI</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              WhatsApp for Shopify India. Cart recovery, Live Chat, and journeys.
            </p>
          </div>
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{heading}</p>
              <ul className="mt-4 space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="text-sm text-slate-600 hover:text-[#7C3AED]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#efeaf8] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} TopEdge Ai. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <Link to="/terms" className="hover:text-[#7C3AED]">
              Terms of Service
            </Link>
            <span aria-hidden>·</span>
            <Link to="/privacy" className="hover:text-[#7C3AED]">
              Privacy Policy
            </Link>
            <Link to="/signup" className="font-medium text-[#7C3AED] hover:text-[#6d28d9]">
              Start free →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
