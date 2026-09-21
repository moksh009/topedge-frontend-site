import { useState, useEffect, useRef, type ComponentType } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Bot,
  ChevronDown,
  Crosshair,
  MapPin,
  Megaphone,
  Menu,
  PackageCheck,
  Radio,
  ShieldCheck,
  ShoppingBag,
  Split,
  TrendingUp,
  Undo2,
  UserCircle2,
  Wand2,
  Workflow,
  X,
  type LucideProps,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLenis } from 'lenis/react';

type NavIcon = ComponentType<LucideProps>;

type NavLink = {
  label: string;
  href: string;
  icon: NavIcon;
};

type NavColumn = {
  id: string;
  items: NavLink[];
};

/** Product IA — Journey owns cart + COD; no Shopify Sync / Segments peers */
const productColumns: NavColumn[] = [
  {
    id: 'journey',
    items: [
      { label: 'Journey', href: '/features/journeys', icon: MapPin },
      { label: 'Abandoned Cart', href: '/features/journeys#abandoned-cart', icon: ShoppingBag },
      { label: 'Conditional routes', href: '/features/journeys#conditional-routes', icon: Split },
      { label: 'Return & retarget', href: '/features/journeys#return-retarget', icon: Undo2 },
      { label: 'COD → Prepaid', href: '/features/journeys', icon: PackageCheck },
    ],
  },
  {
    id: 'engage',
    items: [
      { label: 'Flow + Shopify Tools', href: '/features/flow-builder', icon: Workflow },
      { label: 'Opt-in tools', href: '/features/opt-in-tools', icon: Wand2 },
      { label: 'Audience Campaigns', href: '/features/campaigns', icon: Megaphone },
      { label: 'Audience CRM', href: '/features/audience-crm', icon: UserCircle2 },
      { label: 'Warranty', href: '/features/warranty', icon: ShieldCheck },
    ],
  },
  {
    id: 'intelligence',
    items: [
      { label: 'Tracking Pixel', href: '/features/analytics', icon: Crosshair },
      { label: 'Intent detection', href: '/features/intent-detection', icon: Radio },
      { label: 'AI Brain', href: '/features/ai-brain', icon: Bot },
      { label: 'Profit & costs', href: '/features/profit-loss', icon: TrendingUp },
    ],
  },
];

const primaryLinks = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Customers', href: '/customers' },
] as const;

const easeSoft = [0.16, 1, 0.3, 1] as const;
const softSpring = { type: 'spring' as const, stiffness: 420, damping: 34, mass: 0.85 };

export default function MarketingNavbar() {
  const [open, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const lockY = useRef(0);
  const location = useLocation();
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setOpen(false);
    setProductOpen(false);
    setMobileProductOpen(false);
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
    if (!productOpen && !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setProductOpen(false);
      setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [productOpen, open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Transparent (ghost) until scroll, solid capsule after scroll / mobile menu open
  const capsule = scrolled || open;

  const openProduct = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setProductOpen(true);
  };

  const scheduleCloseProduct = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setProductOpen(false), 140);
  };

  const toggleMobileProduct = () => {
    setMobileProductOpen((v) => !v);
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
              <picture>
                <source type="image/webp" srcSet="/brand-mark-56.webp" />
                <img
                  src="/brand-mark-56.png"
                  alt="TopEdge AI"
                  width={40}
                  height={40}
                  className="mkt-nav__brand-mark"
                  decoding="async"
                  fetchPriority="low"
                />
              </picture>
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
                      initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
                      transition={reduceMotion ? { duration: 0.12 } : softSpring}
                      onMouseEnter={openProduct}
                      onMouseLeave={scheduleCloseProduct}
                    >
                      <div className="mkt-nav__mega-card">
                        <div className="mkt-nav__mega-cols">
                          {productColumns.map((col) => (
                            <div key={col.id} className="mkt-nav__mega-col">
                              <ul className="mkt-nav__mega-links">
                                {col.items.map((item, itemIndex) => {
                                  const Icon = item.icon;
                                  return (
                                    <li key={item.label}>
                                      <motion.div
                                        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                          delay: reduceMotion ? 0 : 0.04 + itemIndex * 0.02,
                                          duration: 0.28,
                                          ease: easeSoft,
                                        }}
                                      >
                                        <Link to={item.href} className="mkt-nav__mega-link">
                                          <span className="mkt-nav__mega-link-icon" aria-hidden>
                                            <Icon strokeWidth={1.6} absoluteStrokeWidth={false} />
                                          </span>
                                          <span className="mkt-nav__mega-link-label">{item.label}</span>
                                        </Link>
                                      </motion.div>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
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
                id="mkt-nav-mobile"
                key="mobile-panel"
                className={cn('mkt-nav__mobile', mobileProductOpen && 'is-product-open')}
                initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.34, ease: easeSoft }}
              >
                <div
                  className="mkt-nav__mobile-scroll"
                  data-lenis-prevent
                  data-lenis-prevent-touch
                >
                  <div className={cn('mkt-nav__mobile-section', mobileProductOpen && 'is-open')}>
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
                          transition={{ duration: 0.36, ease: easeSoft }}
                        >
                          <div className="mkt-nav__mobile-products">
                            {productColumns.flatMap((col) =>
                              col.items.map((item, itemIndex) => {
                                const Icon = item.icon;
                                return (
                                  <motion.div
                                    key={item.label}
                                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      delay: reduceMotion ? 0 : 0.04 + itemIndex * 0.025,
                                      duration: 0.28,
                                      ease: easeSoft,
                                    }}
                                  >
                                    <Link
                                      to={item.href}
                                      className="mkt-nav__mobile-item"
                                      onClick={() => setOpen(false)}
                                    >
                                      <span className="mkt-nav__mobile-item-icon" aria-hidden>
                                        <Icon strokeWidth={1.7} absoluteStrokeWidth={false} />
                                      </span>
                                      <span className="mkt-nav__mobile-item-label">{item.label}</span>
                                    </Link>
                                  </motion.div>
                                );
                              }),
                            )}
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
