import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
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

function SocialLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
      <path
        fill="#0A66C2"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"
      />
    </svg>
  );
}

function SocialInstagram() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
      <defs>
        <radialGradient id="mkt-foot-ig" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <path
        fill="url(#mkt-foot-ig)"
        d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"
      />
    </svg>
  );
}

function SocialYouTube() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
      <path
        fill="#FF0000"
        d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8z"
      />
      <path fill="#fff" d="M9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}

const socials = [
  { label: 'LinkedIn', href: COMPANY_SOCIAL.linkedin, Icon: SocialLinkedIn },
  { label: 'Instagram', href: COMPANY_SOCIAL.instagram, Icon: SocialInstagram },
  { label: 'YouTube', href: COMPANY_SOCIAL.youtube, Icon: SocialYouTube },
];

/**
 * Minimal site footer, brand + contact first, then sitemap + newsletter.
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
                  alt="TopEdge AI"
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
                  <MapPin size={14} strokeWidth={1.75} aria-hidden />
                  <span className="mkt-foot__company-text">
                    {COMPANY_ADDRESS_LINES.map((line, i) => (
                      <span key={line}>
                        {i > 0 ? <br /> : null}
                        {line}
                      </span>
                    ))}
                  </span>
                </p>
                <p className="mkt-foot__company-row">
                  <Mail size={14} strokeWidth={1.75} aria-hidden />
                  <span className="mkt-foot__company-text">
                    <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
                  </span>
                </p>
                <p className="mkt-foot__company-row">
                  <Phone size={14} strokeWidth={1.75} aria-hidden />
                  <span className="mkt-foot__company-text">
                    <a href={`tel:+${COMPANY_PHONE_E164}`}>{COMPANY_PHONE}</a>
                    <span className="mkt-foot__company-sep" aria-hidden>
                      ·
                    </span>
                    <a href={COMPANY_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </a>
                  </span>
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
                Short WhatsApp + Shopify tips, no fluff.
              </p>
              {sent ? (
                <p className="mkt-foot__news-ok" role="status">
                  Thanks, you&apos;re on the list. Meanwhile,{' '}
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
                        <Icon />
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
