import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLenis } from 'lenis/react';

type ProductItem = {
  label: string;
  desc: string;
  href: string;
  tone: 'wa' | 'violet' | 'amber' | 'sky';
  image: string;
};

const productItems: ProductItem[] = [
  {
    label: 'Shopify Store Sync',
    desc: 'OAuth products, carts, orders & catalog',
    href: '/features/shopify',
    tone: 'wa',
    image: '/marketing/nav/nav-clay-shopify.png',
  },
  {
    label: 'Abandoned Cart',
    desc: 'WhatsApp recovery when shoppers leave',
    href: '/whatsapp-cart-recovery',
    tone: 'wa',
    image: '/marketing/nav/nav-clay-cart.png',
  },
  {
    label: 'Journey',
    desc: 'Canvas journeys from triggers to WhatsApp',
    href: '/features/journeys',
    tone: 'violet',
    image: '/marketing/nav/nav-clay-journey.png',
  },
  {
    label: 'COD → Prepaid',
    desc: 'Convert COD checkouts before ship',
    href: '/cod-confirmation-whatsapp',
    tone: 'violet',
    image: '/marketing/nav/nav-clay-cod.png',
  },
  {
    label: 'Flow + Shopify Tools',
    desc: 'Orders, address, cancel, support flows',
    href: '/features/flow-builder',
    tone: 'sky',
    image: '/marketing/nav/nav-clay-flow.png',
  },
  {
    label: 'Audience Campaigns',
    desc: 'Segments → Meta-safe broadcasts',
    href: '/features/campaigns',
    tone: 'violet',
    image: '/marketing/nav/nav-clay-campaigns.png',
  },
  {
    label: 'Tracking Pixel',
    desc: 'Live visits matched to WhatsApp',
    href: '/features/analytics',
    tone: 'amber',
    image: '/marketing/nav/nav-clay-pixel.png',
  },
  {
    label: 'Opt-in Popup',
    desc: 'Capture numbers without theme hacks',
    href: '/features/flow-builder',
    tone: 'sky',
    image: '/marketing/nav/nav-clay-optin.png',
  },
  {
    label: 'Audience CRM',
    desc: 'Identity, profiles, warranty & care',
    href: '/features/audience-crm',
    tone: 'violet',
    image: '/marketing/nav/nav-clay-crm.png',
  },
  {
    label: 'Warranty',
    desc: 'Batches, portal OTP & claims',
    href: '/features/warranty',
    tone: 'wa',
    image: '/marketing/nav/nav-clay-crm.png',
  },
  {
    label: 'Intent detection',
    desc: 'Route chats by what they mean',
    href: '/features/intent-detection',
    tone: 'sky',
    image: '/marketing/nav/nav-clay-pixel.png',
  },
  {
    label: 'Segments',
    desc: 'Cart, COD & pixel cohorts',
    href: '/features/segments',
    tone: 'violet',
    image: '/marketing/nav/nav-clay-campaigns.png',
  },
  {
    label: 'BYOK AI',
    desc: 'Your Gemini or OpenAI keys',
    href: '/features/byok',
    tone: 'amber',
    image: '/marketing/nav/nav-clay-flow.png',
  },
  {
    label: 'P&L Analytics',
    desc: 'Recovery ₹ vs Meta costs',
    href: '/features/profit-loss',
    tone: 'amber',
    image: '/marketing/nav/nav-clay-pixel.png',
  },
];

const solutionItems = [
  {
    label: 'Fashion & apparel',
    desc: 'Size-aware recovery, COD & drops',
    href: '/solutions/fashion',
    tone: 'violet' as const,
    image: '/marketing/nav/nav-clay-fashion.png?v=2',
  },
  {
    label: 'Beauty & skincare',
    desc: 'Serum carts, catalog answers, opt-in',
    href: '/solutions/beauty',
    tone: 'violet' as const,
    image: '/marketing/nav/nav-clay-beauty.png?v=2',
  },
  {
    label: 'Electronics & gadgets',
    desc: 'Warranty, DOA support, high-AOV carts',
    href: '/solutions/electronics',
    tone: 'sky' as const,
    image: '/marketing/nav/nav-clay-electronics.png?v=2',
  },
  {
    label: 'COD-first brands',
    desc: 'Confirm before ship, cut RTO',
    href: '/solutions/cod',
    tone: 'amber' as const,
    image: '/marketing/nav/nav-clay-cod-brands.png?v=2',
  },
];

const primaryLinks = [
  { label: 'ROI Calculator', href: '/roi' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Customers', href: '/customers' },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

function ClayThumb({ src, alt = '' }: { src: string; alt?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={56}
      height={56}
      className="mkt-nav__clay-img"
      decoding="async"
      loading="lazy"
    />
  );
}

export default function MarketingNavbar() {
  const [open, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
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

  /* Lock page scroll when mobile menu is open — keep the panel itself scrollable */
  useEffect(() => {
    if (!open) {
      lenis?.start();
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
                      initial={reduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduceMotion ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.2, ease: easeOut }}
                      onMouseEnter={openProduct}
                      onMouseLeave={scheduleCloseProduct}
                    >
                      <motion.div
                        className="mkt-nav__mega-card"
                        initial={reduceMotion ? false : { y: 8, scale: 0.985 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={reduceMotion ? undefined : { y: 6, scale: 0.99 }}
                        transition={{ duration: 0.28, ease: easeOut }}
                      >
                        <div className="mkt-nav__mega-list">
                          {productItems.map((item, i) => (
                            <motion.div
                              key={item.href + item.label}
                              initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.24,
                                delay: reduceMotion ? 0 : 0.03 + i * 0.015,
                                ease: easeOut,
                              }}
                            >
                              <Link
                                to={item.href}
                                className={cn('mkt-nav__mega-item', `is-${item.tone}`)}
                              >
                                <span className="mkt-nav__mega-thumb" aria-hidden>
                                  <ClayThumb src={item.image} />
                                </span>
                                <span className="mkt-nav__mega-copy">
                                  <span className="mkt-nav__mega-label">{item.label}</span>
                                  <span className="mkt-nav__mega-desc">{item.desc}</span>
                                </span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
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
                      initial={reduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduceMotion ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.2, ease: easeOut }}
                      onMouseEnter={openSolutions}
                      onMouseLeave={scheduleCloseSolutions}
                    >
                      <motion.div
                        className="mkt-nav__mega-card"
                        initial={reduceMotion ? false : { y: 8, scale: 0.985 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={reduceMotion ? undefined : { y: 6, scale: 0.99 }}
                        transition={{ duration: 0.28, ease: easeOut }}
                      >
                        <div className="mkt-nav__mega-list mkt-nav__mega-list--solutions">
                          {solutionItems.map((item, i) => (
                            <motion.div
                              key={item.href}
                              initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.24,
                                delay: reduceMotion ? 0 : 0.03 + i * 0.02,
                                ease: easeOut,
                              }}
                            >
                              <Link
                                to={item.href}
                                className={cn('mkt-nav__mega-item', `is-${item.tone}`)}
                              >
                                <span className="mkt-nav__mega-thumb" aria-hidden>
                                  <ClayThumb src={item.image} />
                                </span>
                                <span className="mkt-nav__mega-copy">
                                  <span className="mkt-nav__mega-label">{item.label}</span>
                                  <span className="mkt-nav__mega-desc">{item.desc}</span>
                                </span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
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

          <AnimatePresence>
            {open ? (
              <motion.div
                key="mobile-nav"
                id="mkt-nav-mobile"
                className="mkt-nav__mobile"
                initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: easeOut }}
              >
                <div
                  className="mkt-nav__mobile-scroll"
                  data-lenis-prevent
                  data-lenis-prevent-touch
                >
                  <p className="mkt-nav__mobile-label">Product</p>
                  <div className="mkt-nav__mobile-products">
                    {productItems.map((item) => (
                      <Link key={item.href + item.label} to={item.href} className="mkt-nav__mobile-item">
                        <span className={cn('mkt-nav__mega-thumb', `is-${item.tone}`)} aria-hidden>
                          <ClayThumb src={item.image} />
                        </span>
                        <span className="mkt-nav__mega-copy">
                          <span className="mkt-nav__mega-label">{item.label}</span>
                          <span className="mkt-nav__mega-desc">{item.desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>

                  <p className="mkt-nav__mobile-label">Solutions</p>
                  <div className="mkt-nav__mobile-products">
                    {solutionItems.map((item) => (
                      <Link key={item.href} to={item.href} className="mkt-nav__mobile-item">
                        <span className={cn('mkt-nav__mega-thumb', `is-${item.tone}`)} aria-hidden>
                          <ClayThumb src={item.image} />
                        </span>
                        <span className="mkt-nav__mega-copy">
                          <span className="mkt-nav__mega-label">{item.label}</span>
                          <span className="mkt-nav__mega-desc">{item.desc}</span>
                        </span>
                      </Link>
                    ))}
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
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mkt-nav__mobile-cta">
                  <Link to="/login" className="mkt-nav__mobile-login">
                    Log in
                  </Link>
                  <Link to="/signup" className="mkt-btn-primary mkt-nav__mobile-signup">
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
