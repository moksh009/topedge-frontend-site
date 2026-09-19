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
      { label: 'Pricing', href: '/pricing' },
      { label: 'ROI calculator', href: '/roi', badge: 'New' },
      { label: 'Journey', href: '/features/journeys' },
      { label: 'Audience Campaigns', href: '/features/campaigns' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
    ],
  },
  {
    title: 'Compare',
    links: [
      { label: 'TopEdge vs WATI', href: '/compare/wati' },
      { label: 'TopEdge vs AiSensy', href: '/compare/aisensy' },
      { label: 'TopEdge vs WATI vs AiSensy', href: '/compare/topedge-vs-wati-vs-aisensy' },
      { label: 'TopEdge vs Interakt', href: '/compare/interakt' },
      { label: 'TopEdge vs Bitespeed', href: '/compare/bitespeed' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Fashion & apparel', href: '/solutions/fashion' },
      { label: 'Beauty & skincare', href: '/solutions/beauty' },
      { label: 'Electronics & gadgets', href: '/solutions/electronics' },
      { label: 'COD-first brands', href: '/solutions/cod' },
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
 * Minimal site footer — quiet sitemap + light newsletter, matches marketing UI.
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
              <p className="mkt-foot__news-eyebrow">Newsletter</p>
              <h3 className="mkt-foot__news-title">Recovery playbooks in your inbox</h3>
              <p className="mkt-foot__news-sub">
                Short WhatsApp + Shopify tips — no fluff.
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
                <p className="mkt-foot__social-label">Follow</p>
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
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <div className="mkt-foot__trust" aria-label="Platform partnerships">
          <p className="mkt-foot__trust-label">Trusted by platforms</p>
          <ul className="mkt-foot__trust-list">
            <li>
              <a
                className="mkt-foot__partner"
                href="https://www.facebook.com/business/marketing-partners"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Meta Business Partner"
              >
                <img
                  src="/badges/meta-business-partner.png?v=4"
                  alt="Meta Business Partner"
                  width={168}
                  height={96}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </li>
            <li>
              <a
                className="mkt-foot__partner"
                href="https://apps.shopify.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Shopify Available on App Store"
              >
                <img
                  src="/badges/shopify-app-store.png?v=4"
                  alt="Shopify Available on App Store"
                  width={168}
                  height={96}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </li>
            <li>
              <span className="mkt-foot__partner" aria-label="WhatsApp Business Partner">
                <img
                  src="/badges/whatsapp-cloud-api.png?v=5"
                  alt="WhatsApp Business Partner"
                  width={168}
                  height={96}
                  loading="lazy"
                  decoding="async"
                />
              </span>
            </li>
          </ul>
        </div>

        <div className="mkt-foot__legal">
          <p>© {new Date().getFullYear()} TopEdge AI. All rights reserved.</p>
          <div className="mkt-foot__legal-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
