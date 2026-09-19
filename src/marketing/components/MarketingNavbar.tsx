import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLenis } from 'lenis/react';

type NavLink = {
  label: string;
  href: string;
};

type NavColumn = {
  title: string;
  items: NavLink[];
};

/** Product IA — Journey owns cart + COD; no Shopify Sync / Segments peers */
const productColumns: NavColumn[] = [
  {
    title: 'Journey',
    items: [
      { label: 'Journey', href: '/features/journeys' },
      { label: 'Abandoned Cart', href: '/features/journeys#abandoned-cart' },
      { label: 'COD → Prepaid', href: '/features/journeys#cod-prepaid' },
    ],
  },
  {
    title: 'Engage',
    items: [
      { label: 'Flow + Shopify Tools', href: '/features/flow-builder' },
      { label: 'Opt-in Popup', href: '/features/flow-builder' },
      { label: 'Audience Campaigns', href: '/features/campaigns' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
      { label: 'Warranty', href: '/features/warranty' },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { label: 'Tracking Pixel', href: '/features/analytics' },
      { label: 'Intent detection', href: '/features/intent-detection' },
      { label: 'BYOK AI', href: '/features/byok' },
      { label: 'P&L Analytics', href: '/features/profit-loss' },
    ],
  },
];

const solutionItems: NavLink[] = [
  { label: 'Fashion & apparel', href: '/solutions/fashion' },
  { label: 'Beauty & skincare', href: '/solutions/beauty' },
  { label: 'Electronics & gadgets', href: '/solutions/electronics' },
  { label: 'COD-first brands', href: '/solutions/cod' },
];

const primaryLinks = [
  { label: 'ROI Calculator', href: '/roi' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Customers', href: '/customers' },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function MarketingNavbar() {
  const [open, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const solutionsCloseTimer = useRef<number | null>(null);
  const lockY = useRef(0);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setOpen(false);
    setProductOpen(false);
    setSolutionsOpen(false);
    setMobileProductOpen(false);
    setMobileSolutionsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const readY = () =>
      lenis?.scroll ?? window.scrollY ?? document.documentElement.scrollTop ?? 0;
    const sync = () => setScrolled(readY() > 40);
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    const unsub = lenis?.on('scroll', sync);
    return () => {
      window.removeEventListener('scroll', sync);
      unsub?.();
    };
  }, [lenis]);

  useEffect(() => {
    if (!open) {
      lenis?.start();
      setMobileProductOpen(false);
      setMobileSolutionsOpen(false);
      return;
    }

    lockY.current = window.scrollY || document.documentElement.scrollTop || 0;
    lenis?.stop();
    document.documentElement.classList.add('mkt-nav-locked');
    document.body.style.top = `-${lockY.current}px`;

    return () => {
      document.documentElement.classList.remove('mkt-nav-locked');
      document.body.style.top = '';
      window.scrollTo(0, lockY.current);
      lenis?.start();
    };
  }, [open, lenis]);

  useEffect(() => {
    if (!productOpen && !solutionsOpen && !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setProductOpen(false);
      setSolutionsOpen(false);
      setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [productOpen, solutionsOpen, open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const capsule = scrolled || !isHome || open;

  const openProduct = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (solutionsCloseTimer.current) window.clearTimeout(solutionsCloseTimer.current);
    setSolutionsOpen(false);
    setProductOpen(true);
  };

  const scheduleCloseProduct = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setProductOpen(false), 140);
  };

  const openSolutions = () => {
    if (solutionsCloseTimer.current) window.clearTimeout(solutionsCloseTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setProductOpen(false);
    setSolutionsOpen(true);
  };

  const scheduleCloseSolutions = () => {
    if (solutionsCloseTimer.current) window.clearTimeout(solutionsCloseTimer.current);
    solutionsCloseTimer.current = window.setTimeout(() => setSolutionsOpen(false), 140);
  };

  const toggleMobileProduct = () => {
    setMobileProductOpen((v) => !v);
    setMobileSolutionsOpen(false);
  };

  const toggleMobileSolutions = () => {
    setMobileSolutionsOpen((v) => !v);
    setMobileProductOpen(false);
  };

  return (
    <header className="mkt-nav pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mkt-nav__shell pointer-events-none">
        <div
          className={cn(
            'pointer-events-auto relative mx-auto w-full',
            capsule ? 'mkt-nav__capsule mkt-nav__capsule--solid' : 'mkt-nav__capsule mkt-nav__capsule--ghost',
            open && 'mkt-nav__capsule--open',
          )}
        >
          <div className="mkt-nav__bar">
            <Link to="/" className="mkt-nav__brand" onClick={() => setOpen(false)}>
              <img
                src="/logo.png"
                alt=""
                width={28}
                height={28}
                className="mkt-nav__brand-mark"
                decoding="async"
              />
              <span className="mkt-nav__brand-text">
                TopEdge <span>AI</span>
              </span>
            </Link>

            <nav className="mkt-nav__desktop" aria-label="Primary">
              <div
                className="mkt-nav__product"
                onMouseEnter={openProduct}
                onMouseLeave={scheduleCloseProduct}
                onFocus={openProduct}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setProductOpen(false);
                  }
                }}
              >
                <button
                  type="button"
                  className={cn('mkt-nav__link mkt-nav__link--btn', productOpen && 'is-active')}
                  aria-expanded={productOpen}
                  aria-haspopup="true"
                >
                  Product
                  <ChevronDown className={cn('mkt-nav__chev', productOpen && 'is-open')} aria-hidden />
                </button>

                <AnimatePresence mode="sync">
                  {productOpen ? (
                    <motion.div
                      key="product-mega"
                      className="mkt-nav__mega"
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: 4 }}
                      transition={{ duration: 0.2, ease: easeOut }}
                      onMouseEnter={openProduct}
                      onMouseLeave={scheduleCloseProduct}
                    >
                      <div className="mkt-nav__mega-card mkt-nav__mega-card--links-only">
                        <div className="mkt-nav__mega-cols">
                          {productColumns.map((col) => (
                            <div key={col.title} className="mkt-nav__mega-col">
                              <ul className="mkt-nav__mega-links">
                                {col.items.map((item) => (
                                  <li key={item.label}>
                                    <Link to={item.href} className="mkt-nav__mega-link">
                                      <span className="mkt-nav__mega-link-text">{item.label}</span>
                                      <span className="mkt-nav__mega-link-arrow" aria-hidden>
                                        →
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <div
                className="mkt-nav__solutions"
                onMouseEnter={openSolutions}
                onMouseLeave={scheduleCloseSolutions}
                onFocus={openSolutions}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setSolutionsOpen(false);
                  }
                }}
              >
                <button
                  type="button"
                  className={cn('mkt-nav__link mkt-nav__link--btn', solutionsOpen && 'is-active')}
                  aria-expanded={solutionsOpen}
                  aria-haspopup="true"
                >
                  Solutions
                  <ChevronDown className={cn('mkt-nav__chev', solutionsOpen && 'is-open')} aria-hidden />
                </button>

                <AnimatePresence mode="sync">
                  {solutionsOpen ? (
                    <motion.div
                      key="solutions-mega"
                      className="mkt-nav__mega mkt-nav__mega--solutions"
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: 4 }}
                      transition={{ duration: 0.2, ease: easeOut }}
                      onMouseEnter={openSolutions}
                      onMouseLeave={scheduleCloseSolutions}
                    >
                      <div className="mkt-nav__mega-card mkt-nav__mega-card--solutions">
                        <p className="mkt-nav__mega-col-title">Solutions</p>
                        <ul className="mkt-nav__mega-links">
                          {solutionItems.map((item) => (
                            <li key={item.href}>
                              <Link to={item.href} className="mkt-nav__mega-link">
                                <span className="mkt-nav__mega-link-text">{item.label}</span>
                                <span className="mkt-nav__mega-link-arrow" aria-hidden>
                                  →
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {primaryLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className={cn('mkt-nav__link', location.pathname === l.href && 'is-active')}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="mkt-nav__actions">
              <Link to="/login" className="mkt-nav__link">
                Log in
              </Link>
              <Link to="/signup" className="mkt-btn-primary mkt-nav__cta">
                Start free
              </Link>
            </div>

            <button
              type="button"
              className="mkt-nav__burger"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mkt-nav-mobile"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={reduceMotion ? false : { opacity: 0, rotate: -40, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, rotate: 40, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                  className="mkt-nav__burger-icon"
                >
                  {open ? <X strokeWidth={2.25} /> : <Menu strokeWidth={2.25} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                key="mobile-nav"
                id="mkt-nav-mobile"
                className="mkt-nav__mobile"
                initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: easeOut }}
              >
                <div
                  className="mkt-nav__mobile-scroll"
                  data-lenis-prevent
                  data-lenis-prevent-touch
                >
                  <div className="mkt-nav__mobile-section">
                    <button
                      type="button"
                      className={cn(
                        'mkt-nav__mobile-trigger',
                        mobileProductOpen && 'is-open',
                      )}
                      aria-expanded={mobileProductOpen}
                      onClick={toggleMobileProduct}
                    >
                      Product
                      <ChevronDown
                        className={cn('mkt-nav__chev', mobileProductOpen && 'is-open')}
                        aria-hidden
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileProductOpen ? (
                        <motion.div
                          key="mobile-product"
                          className="mkt-nav__mobile-submenu"
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: easeOut }}
                        >
                          <div className="mkt-nav__mobile-products">
                            {productColumns.flatMap((col) =>
                              col.items.map((item) => (
                                <Link
                                  key={item.label}
                                  to={item.href}
                                  className="mkt-nav__mobile-item"
                                  onClick={() => setOpen(false)}
                                >
                                  {item.label}
                                </Link>
                              )),
                            )}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>

                  <div className="mkt-nav__mobile-section">
                    <button
                      type="button"
                      className={cn(
                        'mkt-nav__mobile-trigger',
                        mobileSolutionsOpen && 'is-open',
                      )}
                      aria-expanded={mobileSolutionsOpen}
                      onClick={toggleMobileSolutions}
                    >
                      Solutions
                      <ChevronDown
                        className={cn('mkt-nav__chev', mobileSolutionsOpen && 'is-open')}
                        aria-hidden
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileSolutionsOpen ? (
                        <motion.div
                          key="mobile-solutions"
                          className="mkt-nav__mobile-submenu"
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: easeOut }}
                        >
                          <div className="mkt-nav__mobile-products">
                            {solutionItems.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                className="mkt-nav__mobile-item"
                                onClick={() => setOpen(false)}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>

                  <p className="mkt-nav__mobile-label">Explore</p>
                  <div className="mkt-nav__mobile-list">
                    {primaryLinks.map((l) => (
                      <Link
                        key={l.href}
                        to={l.href}
                        className={cn(
                          'mkt-nav__mobile-link',
                          location.pathname === l.href && 'is-active',
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mkt-nav__mobile-cta">
                  <Link to="/login" className="mkt-nav__mobile-login" onClick={() => setOpen(false)}>
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="mkt-btn-primary mkt-nav__mobile-signup"
                    onClick={() => setOpen(false)}
                  >
                    Start free
                  </Link>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
