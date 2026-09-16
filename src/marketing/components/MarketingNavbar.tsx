import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLenis } from 'lenis/react';
import { ShopifyMark, WhatsAppMark } from './foundation/BrandMarks';

type ProductItem = {
  label: string;
  desc: string;
  href: string;
  tone: 'wa' | 'violet' | 'amber' | 'sky';
  mark?: 'wa';
  icon: 'cart' | 'journey' | 'chat' | 'flow' | 'brain' | 'campaign';
};

const productItems: ProductItem[] = [
  {
    label: 'Cart recovery',
    desc: 'Timed WhatsApp nudges when shoppers leave',
    href: '/whatsapp-cart-recovery',
    tone: 'wa',
    mark: 'wa',
    icon: 'cart',
  },
  {
    label: 'Journey',
    desc: 'Visual canvas · wait, branch, send',
    href: '/features/journeys',
    tone: 'violet',
    icon: 'journey',
  },
  {
    label: 'Live Chat',
    desc: 'WA + IG inbox with order context',
    href: '/features/live-chat',
    tone: 'wa',
    mark: 'wa',
    icon: 'chat',
  },
  {
    label: 'Flow Builder',
    desc: 'AI form → editable WhatsApp flows',
    href: '/features/flow-builder',
    tone: 'sky',
    icon: 'flow',
  },
  {
    label: 'AI Brain',
    desc: 'Catalog-grounded replies',
    href: '/features/ai-brain',
    tone: 'amber',
    icon: 'brain',
  },
  {
    label: 'Campaigns',
    desc: 'Meta-safe broadcasts & drips',
    href: '/features/campaigns',
    tone: 'violet',
    icon: 'campaign',
  },
];

const primaryLinks = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'ROI', href: '/roi' },
  { label: 'Customers', href: '/customers' },
  { label: 'Blog', href: '/blog' },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

function FeatureIcon({ name }: { name: ProductItem['icon'] }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    fill: 'none',
    'aria-hidden': true as const,
  };
  switch (name) {
    case 'cart':
      return (
        <svg {...common}>
          <path d="M2.5 3.5h1.2l.4 1.5m0 0L5.2 11h6.1l1.4-6H4.1Zm2.4 8.2a.7.7 0 1 0 0-1.4.7.7 0 0 0 0 1.4Zm5 0a.7.7 0 1 0 0-1.4.7.7 0 0 0 0 1.4Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'journey':
      return (
        <svg {...common}>
          <path d="M3 12.5V8.2a2 2 0 0 1 2-2h2.2a2 2 0 0 0 2-2V3.5M8.5 12.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="3" cy="13" r="1.15" fill="currentColor" />
          <circle cx="13" cy="13" r="1.15" fill="currentColor" />
          <circle cx="8.5" cy="3.5" r="1.15" fill="currentColor" />
        </svg>
      );
    case 'chat':
      return (
        <svg {...common}>
          <path d="M3.5 11.8V4.8A1.3 1.3 0 0 1 4.8 3.5h6.4A1.3 1.3 0 0 1 12.5 4.8v4.2A1.3 1.3 0 0 1 11.2 10.3H6.2L3.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'flow':
      return (
        <svg {...common}>
          <rect x="2.4" y="2.4" width="4.2" height="4.2" rx="1.1" stroke="currentColor" strokeWidth="1.35" />
          <rect x="9.4" y="9.4" width="4.2" height="4.2" rx="1.1" stroke="currentColor" strokeWidth="1.35" />
          <path d="M6.6 4.5h2.1A2.4 2.4 0 0 1 11.1 6.9V9.4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
        </svg>
      );
    case 'brain':
      return (
        <svg {...common}>
          <path d="M8 13.2V8.6M8 8.6c-1.6-.1-2.9-1.4-2.9-3A2.7 2.7 0 0 1 8 2.9a2.7 2.7 0 0 1 2.9 2.7c0 1.6-1.3 2.9-2.9 3Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.1 9.4c-.7.4-1.2 1.2-1.2 2.1 0 1.3 1 2.2 2.2 2.2h3.8c1.2 0 2.2-.9 2.2-2.2 0-.9-.5-1.7-1.2-2.1" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
        </svg>
      );
    case 'campaign':
      return (
        <svg {...common}>
          <path d="M3.2 6.2v3.6c0 .5.4.9.9.9h1.4L9.2 13V3L5.5 5.3H4.1c-.5 0-.9.4-.9.9Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
          <path d="M11.2 6.2a2.6 2.6 0 0 1 0 3.6M12.8 4.8a4.4 4.4 0 0 1 0 6.4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function ProductMark({ item }: { item: ProductItem }) {
  if (item.mark === 'wa') return <WhatsAppMark className="h-3.5 w-3.5" />;
  return <FeatureIcon name={item.icon} />;
}

export default function MarketingNavbar() {
  const [open, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setOpen(false);
    setProductOpen(false);
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
      return;
    }
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
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

  const capsule = scrolled || !isHome || open;

  const openProduct = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setProductOpen(true);
  };

  const scheduleCloseProduct = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setProductOpen(false), 140);
  };

  return (
    <header className="mkt-nav pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <div
        className={cn(
          'pointer-events-auto relative mx-auto w-full max-w-[min(1120px,calc(100%-0.5rem))]',
          capsule ? 'mkt-nav__capsule mkt-nav__capsule--solid' : 'mkt-nav__capsule mkt-nav__capsule--ghost',
          open && 'mkt-nav__capsule--open',
        )}
      >
        <div className="mkt-nav__bar">
          <Link to="/" className="mkt-nav__brand">
            <img
              src="/logo.png"
              alt=""
              width={26}
              height={26}
              className="mkt-nav__brand-mark"
              decoding="async"
            />
            <span className="mkt-nav__brand-text">TopEdge AI</span>
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
                      <div className="mkt-nav__mega-layout">
                        <Link to="/features/shopify" className="mkt-nav__shopify">
                          <div className="mkt-nav__shopify-top">
                            <span className="mkt-nav__shopify-icon" aria-hidden>
                              <ShopifyMark className="h-4 w-4" />
                            </span>
                            <div>
                              <p className="mkt-nav__shopify-title">Shopify</p>
                              <p className="mkt-nav__shopify-kicker">Store sync</p>
                            </div>
                          </div>
                          <ul className="mkt-nav__shopify-rows">
                            <li>
                              <span>OAuth</span>
                              <strong>Products · carts · orders</strong>
                            </li>
                            <li>
                              <span>Dashboard</span>
                              <strong>Edit live catalog</strong>
                            </li>
                            <li>
                              <span>COD</span>
                              <strong>Feeds journeys & inbox</strong>
                            </li>
                          </ul>
                        </Link>

                        <div className="mkt-nav__mega-list">
                          {productItems.map((item, i) => (
                            <motion.div
                              key={item.href}
                              initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.24,
                                delay: reduceMotion ? 0 : 0.03 + i * 0.018,
                                ease: easeOut,
                              }}
                            >
                              <Link
                                to={item.href}
                                className={cn('mkt-nav__mega-item', `is-${item.tone}`)}
                              >
                                <span className="mkt-nav__mega-icon" aria-hidden>
                                  <ProductMark item={item} />
                                </span>
                                <span className="mkt-nav__mega-copy">
                                  <span className="mkt-nav__mega-label">{item.label}</span>
                                  <span className="mkt-nav__mega-desc">{item.desc}</span>
                                </span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
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
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={reduceMotion ? false : { opacity: 0, rotate: -40, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, rotate: 40, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                className="grid place-items-center"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              key="mobile-nav"
              className="mkt-nav__mobile"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: easeOut }}
            >
              <div className="mkt-nav__mobile-inner">
                <p className="mkt-nav__mobile-label">Product</p>
                <Link to="/features/shopify" className="mkt-nav__mobile-shopify">
                  <span className="mkt-nav__shopify-icon" aria-hidden>
                    <ShopifyMark className="h-4 w-4" />
                  </span>
                  <span>
                    <strong>Shopify</strong>
                    <span>OAuth · carts · orders · COD</span>
                  </span>
                </Link>
                <div className="mkt-nav__mobile-products">
                  {productItems.map((item) => (
                    <Link key={item.href} to={item.href} className="mkt-nav__mobile-item">
                      <span className={cn('mkt-nav__mega-icon', `is-${item.tone}`)} aria-hidden>
                        <ProductMark item={item} />
                      </span>
                      <span>
                        <span className="mkt-nav__mega-label">{item.label}</span>
                        <span className="mkt-nav__mega-desc">{item.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>

                <p className="mkt-nav__mobile-label">Explore</p>
                <div className="mkt-nav__mobile-list">
                  {primaryLinks.map((l) => (
                    <Link key={l.href} to={l.href} className="mkt-nav__mobile-link">
                      {l.label}
                    </Link>
                  ))}
                </div>

                <div className="mkt-nav__mobile-cta">
                  <Link to="/login" className="mkt-nav__mobile-login">
                    Log in
                  </Link>
                  <Link to="/signup" className="mkt-btn-primary justify-center">
                    Start free
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
