import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DASH_SIGNUP, DASH_LOGIN } from '../routes';

const productLinks = [
  { label: 'Shopify / Store', desc: 'OAuth sync · edit in dashboard', href: '/features/shopify' },
  { label: 'Journey', desc: 'Visual canvas automations', href: '/features/journeys' },
  { label: 'Live Chat', desc: 'Inbox with Shopify order context', href: '/features/live-chat' },
  { label: 'Flow Builder', desc: 'AI form → WhatsApp flows', href: '/features/flow-builder' },
  { label: 'AI Brain', desc: 'Catalog-grounded replies', href: '/features/ai-brain' },
  { label: 'Campaigns', desc: 'Meta-safe broadcasts & drips', href: '/features/campaigns' },
  { label: 'IG Automation', desc: 'Comment & story to DM', href: '/features/instagram' },
  { label: 'Meta Manager', desc: 'Templates, catalog, QR', href: '/features/meta-manager' },
  { label: 'Audience', desc: 'Segments, scores, cart leads', href: '/features/audience-crm' },
  { label: 'Analytics', desc: 'Recovery ₹, not vanity charts', href: '/features/analytics' },
];

const resourceLinks = [
  { label: 'Blog', desc: 'D2C playbooks', href: '/blog' },
  { label: 'Customers', desc: 'Merchant outcomes', href: '/customers' },
  { label: 'Integrations', desc: 'Shopify · Meta · more', href: '/integrations' },
  { label: 'About', desc: 'Why we built TopEdge', href: '/about' },
  { label: 'Contact', desc: 'Talk to the team', href: '/contact' },
];

export default function MarketingNavbar() {
  const [open, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setProductOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-[#efeaf8] bg-white/80 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[var(--mkt-max-wide)] items-center justify-between px-5 md:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-normal tracking-tight text-[#0c1222]"
        >
          <img
            src="/brand-mark.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover"
            decoding="async"
          />
          <span>
            TopEdge <span className="text-[#7C3AED]">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setProductOpen(true)}
            onMouseLeave={() => setProductOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#0c1222]"
            >
              Product
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {productOpen && (
              <div className="absolute left-0 top-full w-[420px] rounded-2xl border border-[#efeaf8] bg-white p-3 shadow-xl shadow-violet-500/10">
                <div className="grid grid-cols-2 gap-1">
                  {productLinks.map((l) => (
                    <Link
                      key={l.href}
                      to={l.href}
                      className="rounded-xl px-3 py-2.5 hover:bg-[#faf9ff]"
                    >
                      <p className="text-sm font-medium text-[#0c1222]">{l.label}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{l.desc}</p>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/features"
                  className="mt-2 flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-[#7C3AED] hover:bg-[#f5f3ff]"
                >
                  All features
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>
          <Link to="/pricing" className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#0c1222]">
            Pricing
          </Link>
          <Link to="/customers" className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#0c1222]">
            Customers
          </Link>
          <Link to="/blog" className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#0c1222]">
            Blog
          </Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={DASH_LOGIN} className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#0c1222]">
            Log in
          </a>
          <Link to="/signup" className="mkt-btn-primary !h-10 !px-4 !text-sm">
            Start free
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden rounded-xl p-2 text-[#0c1222]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#efeaf8] bg-white px-5 py-4 lg:hidden">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Product</p>
          <div className="mt-2 space-y-1">
            {productLinks.map((l) => (
              <Link key={l.href} to={l.href} className="block rounded-xl px-2 py-2.5 text-sm font-medium text-[#0c1222]">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-400">More</p>
          <div className="mt-2 space-y-1">
            {[...resourceLinks, { label: 'Pricing', desc: '', href: '/pricing' }, { label: 'Features', desc: '', href: '/features' }].map(
              (l) => (
                <Link key={l.href} to={l.href} className="block rounded-xl px-2 py-2.5 text-sm font-medium text-[#0c1222]">
                  {l.label}
                </Link>
              ),
            )}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <a href={DASH_LOGIN} className="rounded-full border border-[#efeaf8] px-4 py-2.5 text-center text-sm font-medium text-slate-700">
              Log in
            </a>
            <a href={DASH_SIGNUP} className="mkt-btn-primary justify-center">
              Start free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
