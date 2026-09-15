import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Youtube, Twitter } from 'lucide-react';

type FootLink = { label: string; href: string; badge?: string };

const columns: { title: string; links: FootLink[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Customers', href: '/customers' },
      { label: 'Compare', href: '/compare' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'ROI calculator', href: '/roi', badge: 'New' },
      { label: 'Cart recovery', href: '/whatsapp-cart-recovery' },
      { label: 'Live Chat', href: '/features/live-chat' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Integrations', href: '/integrations' },
      { label: 'Shopify + WhatsApp', href: '/shopify-whatsapp-integration' },
      { label: 'Security', href: '/security' },
      { label: 'Agency partners', href: '/agency' },
      { label: 'Start free', href: '/signup' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Fashion & apparel', href: '/solutions/fashion' },
      { label: 'Beauty', href: '/solutions/beauty' },
      { label: 'Food & beverage', href: '/solutions/food' },
      { label: 'COD-first brands', href: '/cod-confirmation-whatsapp' },
    ],
  },
];

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/topedgeai',
    Icon: Linkedin,
  },
  {
    label: 'X / Twitter',
    href: 'https://twitter.com/topedgeai',
    Icon: Twitter,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    Icon: Instagram,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/',
    Icon: Youtube,
  },
];

/**
 * Maximal sitemap footer (Footer-9 style) — light theme, TopEdge branding.
 * Recreated locally (React Bits Pro registry / license not configured).
 */
export default function MarketingFooter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  };

  return (
    <footer className="mkt-foot" aria-label="Site footer">
      <div className="mkt-foot__shell">
        <div className="mkt-foot__top">
          <nav className="mkt-foot__sitemap" aria-label="Sitemap">
            {columns.map((col) => (
              <div key={col.title} className="mkt-foot__col">
                <p className="mkt-foot__capsule">{col.title}</p>
                <ul className="mkt-foot__list">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link to={l.href} className="mkt-foot__link">
                        {l.label}
                        {l.badge ? <span className="mkt-foot__badge">{l.badge}</span> : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <aside className="mkt-foot__aside">
            <div className="mkt-foot__news">
              <div className="mkt-foot__news-head">
                <div className="mkt-foot__news-art" aria-hidden>
                  <img src="/brand-mark.png" alt="" width={40} height={40} decoding="async" />
                </div>
                <p className="mkt-foot__news-eyebrow">Newsletter</p>
              </div>
              <h3 className="mkt-foot__news-title">Get recovery playbooks in your inbox</h3>
              <p className="mkt-foot__news-sub">
                WhatsApp cart recovery tips, Meta template notes, and Shopify ops — short and
                useful.
              </p>
              {sent ? (
                <p className="mkt-foot__news-ok" role="status">
                  Thanks — you&apos;re on the list. Meanwhile,{' '}
                  <Link to="/blog">browse the blog</Link>.
                </p>
              ) : (
                <form className="mkt-foot__form" onSubmit={onSubscribe}>
                  <label className="sr-only" htmlFor="mkt-foot-email">
                    Email
                  </label>
                  <div className="mkt-foot__field">
                    <input
                      id="mkt-foot-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mkt-foot__input"
                    />
                    <button type="submit" className="mkt-foot__subscribe">
                      Subscribe
                    </button>
                  </div>
                </form>
              )}

              <div className="mkt-foot__social">
                <p className="mkt-foot__social-label">Follow us</p>
                <ul className="mkt-foot__social-list">
                  {socials.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="mkt-foot__social-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <div className="mkt-foot__legal">
          <p>© {new Date().getFullYear()} TopEdge AI. All rights reserved.</p>
          <div className="mkt-foot__legal-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/security">Security</Link>
          </div>
        </div>
      </div>

      <div className="mkt-foot__wordmark" aria-hidden>
        <span className="mkt-foot__wordmark-text">
          topedge <span>ai</span>
        </span>
      </div>
    </footer>
  );
}
