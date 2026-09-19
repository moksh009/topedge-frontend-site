import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import {
  COMPANY_ADDRESS_LINES,
  COMPANY_BRAND_NAME,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_PHONE_E164,
  COMPANY_SOCIAL,
  COMPANY_WHATSAPP_URL,
} from '../legal/companyIdentity';

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
      { label: 'Opt-in tools', href: '/features/opt-in-tools' },
      { label: 'Audience Campaigns', href: '/features/campaigns' },
      { label: 'Profit & costs', href: '/features/profit-loss' },
      { label: 'AI Brain', href: '/features/ai-brain' },
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
];

const socials = [
  { label: 'LinkedIn', href: COMPANY_SOCIAL.linkedin, Icon: Linkedin },
  { label: 'Instagram', href: COMPANY_SOCIAL.instagram, Icon: Instagram },
  { label: 'YouTube', href: COMPANY_SOCIAL.youtube, Icon: Youtube },
];

/**
 * Minimal site footer — brand + contact first, then sitemap + newsletter.
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
          <div className="mkt-foot__main">
            <div className="mkt-foot__brand" aria-label="Company details">
              <Link to="/" className="mkt-foot__logo" aria-label={`${COMPANY_BRAND_NAME} home`}>
                <img
                  src="/logo.png"
                  alt=""
                  width={28}
                  height={28}
                  className="mkt-foot__logo-mark"
                  decoding="async"
                />
                <span className="mkt-foot__logo-text">
                  TopEdge <span>AI</span>
                </span>
              </Link>
              <div className="mkt-foot__company-rows">
                <p className="mkt-foot__company-row">
                  <MapPin size={13} strokeWidth={1.75} aria-hidden />
                  <span>{COMPANY_ADDRESS_LINES.join(', ')}</span>
                </p>
                <p className="mkt-foot__company-row">
                  <Mail size={13} strokeWidth={1.75} aria-hidden />
                  <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
                </p>
                <p className="mkt-foot__company-row">
                  <Phone size={13} strokeWidth={1.75} aria-hidden />
                  <a href={`tel:+${COMPANY_PHONE_E164}`}>{COMPANY_PHONE}</a>
                  <span className="mkt-foot__company-sep" aria-hidden>
                    ·
                  </span>
                  <a href={COMPANY_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </p>
              </div>
            </div>

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
          </div>

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
