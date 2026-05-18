import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Calculator, ChevronDown, Menu, X } from 'lucide-react';
import {
  productMegaMenu,
  resourcesMegaMenu,
  solutionsMegaMenu,
  type MegaMenuItem,
  type MegaMenuSection,
} from '../data/navigation';
import { PrimaryButton } from './ui';
import BrandLogo from './BrandLogo';
import { DASH_DOCS } from '../constants';
import { cn } from '@/lib/utils';

const DASH_LOGIN = 'https://dash.topedgeai.com';

const navLinkClass =
  'inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-violet-50/70 hover:text-[#7C3AED]';

type WidePanel = 'Product' | 'Solutions' | 'Resources';

export default function MarketingNavbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<WidePanel | null>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobile(false);
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobile]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50',
        scrolled || open || mobile
          ? 'border-b border-violet-200/60 bg-white/95 shadow-sm shadow-violet-500/5 backdrop-blur-xl'
          : 'bg-white/80 backdrop-blur-md'
      )}
      onMouseLeave={() => setOpen(null)}
    >
      <div className="marketing-container flex h-16 items-center justify-between gap-4">
        <BrandLogo className="relative z-10 shrink-0" />

        <nav className="hidden items-center justify-center gap-0.5 lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2">
          <NavTrigger
            label="Product"
            isOpen={open === 'Product'}
            active={pathname.startsWith('/features')}
            onOpen={() => setOpen('Product')}
          />
          <NavTrigger
            label="Solutions"
            isOpen={open === 'Solutions'}
            active={pathname === '/customers'}
            onOpen={() => setOpen('Solutions')}
          />
          <Link
            to="/pricing"
            className={cn(navLinkClass, pathname === '/pricing' && 'bg-violet-50 text-[#7C3AED]')}
          >
            Pricing
          </Link>
          <Link
            to="/integrations"
            className={cn(navLinkClass, pathname === '/integrations' && 'bg-violet-50 text-[#7C3AED]')}
          >
            Integrations
          </Link>
          <Link
            to="/roi"
            className={cn(
              navLinkClass,
              pathname === '/roi' && 'bg-violet-50 text-[#7C3AED]',
              'hidden xl:inline-flex'
            )}
          >
            <Calculator className="h-3.5 w-3.5" />
            ROI
          </Link>
          <NavTrigger
            label="Resources"
            isOpen={open === 'Resources'}
            active={pathname === '/blog' || pathname === '/contact'}
            onOpen={() => setOpen('Resources')}
          />
          <Link
            to="/customers"
            className={cn(navLinkClass, pathname === '/customers' && 'bg-violet-50 text-[#7C3AED]')}
          >
            Customers
          </Link>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <a
            href={DASH_LOGIN}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#7C3AED]"
          >
            Log in
          </a>
          <PrimaryButton to="/signup" className="!h-10 !px-5 !text-[13px]">
            Start free
          </PrimaryButton>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-violet-100 text-slate-700 lg:hidden"
          onClick={() => setMobile((v) => !v)}
          aria-label={mobile ? 'Close menu' : 'Open menu'}
        >
          {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key={open}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="hidden overflow-hidden border-t border-violet-100 bg-white/98 lg:block"
            onMouseEnter={() => setOpen(open)}
          >
            <div className="marketing-container pb-6 pt-5">
              {open === 'Product' && <ProductMega />}
              {open === 'Solutions' && <SolutionsMega />}
              {open === 'Resources' && <ResourcesMega />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobile && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-violet-100 bg-white lg:hidden"
          >
            <MobileNav pathname={pathname} onClose={() => setMobile(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavTrigger({
  label,
  isOpen,
  active,
  onOpen,
}: {
  label: string;
  isOpen: boolean;
  active?: boolean;
  onOpen: () => void;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen}>
      <button
        type="button"
        className={cn(navLinkClass, (isOpen || active) && 'bg-violet-50 text-[#7C3AED]')}
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')} />
      </button>
    </div>
  );
}

function MegaItemLink({ item, onClick }: { item: MegaMenuItem; onClick?: () => void }) {
  const inner = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-[#7C3AED] transition-colors group-hover:bg-[#7C3AED] group-hover:text-white">
        <item.icon className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-slate-900">{item.label}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{item.desc}</span>
      </span>
    </>
  );

  const cls = 'group flex gap-3 rounded-xl p-3 transition-colors hover:bg-violet-50/80';

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <Link to={item.to!} className={cls} onClick={onClick}>
      {inner}
    </Link>
  );
}

function MegaGrid({ sections }: { sections: MegaMenuSection[] }) {
  return (
    <div className={cn('grid gap-6', sections.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2')}>
      {sections.map((col) => (
        <div key={col.title}>
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{col.title}</p>
          <div className="space-y-0.5">
            {col.items.map((item) => (
              <MegaItemLink key={item.label} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductMega() {
  return (
    <div>
      <MegaGrid sections={productMegaMenu} />
      <div className="mt-4 border-t border-violet-100 pt-4">
        <Link
          to="/features"
          className="flex items-center justify-center gap-1 rounded-xl py-2.5 text-sm font-semibold text-[#7C3AED] transition-colors hover:bg-violet-50"
        >
          View all 12 modules
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function SolutionsMega() {
  return (
    <div>
      <MegaGrid sections={solutionsMegaMenu} />
      <div className="mt-5 grid gap-4 border-t border-violet-100 pt-5 md:grid-cols-[1fr_auto] md:items-center">
        <p className="px-2 text-sm text-slate-500">
          Indian D2C brands use TopEdge for COD, cart recovery, and Meta-approved WhatsApp — without a dev team.
        </p>
        <Link
          to="/customers"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-50 px-5 py-2.5 text-sm font-semibold text-[#7C3AED] transition-colors hover:bg-violet-100"
        >
          Customer stories
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function ResourcesMega() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div>
        <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Learn</p>
        <div className="grid gap-0.5 sm:grid-cols-2">
          {resourcesMegaMenu.map((item) => (
            <MegaItemLink key={item.label} item={item} />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 border-t border-violet-100 pt-4 px-2">
          <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-[#7C3AED]">
            About
          </Link>
          <Link to="/pricing" className="text-sm font-medium text-slate-600 hover:text-[#7C3AED]">
            Pricing
          </Link>
          <a
            href={DASH_DOCS}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-600 hover:text-[#7C3AED]"
          >
            Docs ↗
          </a>
        </div>
      </div>

      <Link
        to="/roi"
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#7C3AED] via-[#6d28d9] to-[#5b21b6] p-6 shadow-xl shadow-violet-500/30 transition-transform hover:-translate-y-0.5"
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" aria-hidden />
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
          <Calculator className="h-5 w-5" />
        </span>
        <p className="relative mt-4 text-lg font-semibold text-white">ROI Calculator</p>
        <p className="relative mt-2 text-sm leading-relaxed text-violet-100/90">
          Model cart recovery uplift in ₹ — see payback on the Growth plan in under a minute.
        </p>
        <div className="relative mt-4 flex items-center gap-4">
          <div>
            <p className="text-2xl font-black text-white">32%</p>
            <p className="text-[10px] uppercase tracking-wider text-violet-200">avg. recovery</p>
          </div>
          <div>
            <p className="text-2xl font-black text-white">~10×</p>
            <p className="text-[10px] uppercase tracking-wider text-violet-200">typical ROI</p>
          </div>
        </div>
        <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-semibold text-white">
          Run calculator
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </div>
  );
}

function MobileNav({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  return (
    <div className="space-y-1 px-4 py-4 sm:px-6">
      <Link to="/roi" className="mb-2 flex items-center gap-2 rounded-xl bg-violet-50 px-3 py-3 text-sm font-semibold text-[#7C3AED]" onClick={onClose}>
        <Calculator className="h-4 w-4" />
        ROI Calculator
      </Link>

      <p className="px-3 pt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Product</p>
      <Link to="/features" className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#7C3AED]" onClick={onClose}>
        All features
      </Link>
      {productMegaMenu.map((hub) => (
        <div key={hub.title} className="pt-2">
          <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{hub.title}</p>
          {hub.items.map((item) => (
            <Link
              key={item.label}
              to={item.to!}
              className={cn(
                'block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-violet-50',
                pathname === item.to && 'bg-violet-50 font-medium text-[#7C3AED]'
              )}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ))}

      <div className="my-3 h-px bg-violet-100" />
      <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Solutions</p>
      {solutionsMegaMenu.flatMap((s) => s.items).map((item) => (
        <Link
          key={item.label}
          to={item.to!}
          className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-violet-50"
          onClick={onClose}
        >
          {item.label}
        </Link>
      ))}

      <div className="my-3 h-px bg-violet-100" />
      {[
        { to: '/pricing', label: 'Pricing' },
        { to: '/integrations', label: 'Integrations' },
        { to: '/customers', label: 'Customers' },
        { to: '/blog', label: 'Blog' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
      ].map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={cn(
            'block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-violet-50',
            pathname === item.to && 'bg-violet-50 text-[#7C3AED]'
          )}
          onClick={onClose}
        >
          {item.label}
        </Link>
      ))}
      <a
        href={DASH_DOCS}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-violet-50"
      >
        Documentation
      </a>
      <a
        href={DASH_LOGIN}
        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-violet-50"
      >
        Log in
      </a>
      <div className="pt-4">
        <div className="pt-4" onClick={onClose} role="presentation">
          <PrimaryButton to="/signup" className="w-full justify-center">
            Start free
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
