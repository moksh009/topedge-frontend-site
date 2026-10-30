import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import {
  COMPANY_ADDRESS_LINES,
  COMPANY_BRAND_NAME,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_PHONE_E164,
  COMPANY_SHOPIFY_APP_URL,
  COMPANY_SOCIAL,
  COMPANY_WHATSAPP_URL,
} from '../legal/companyIdentity';
import { FREE_TOOLS, TOOLS_PATH } from '../data/freeTools';
import { TrustpilotScore } from './TrustpilotProof';
import { ProductHuntBadge } from './ProductHuntProof';

/** The Meta and Shopify badges each link to the programme they name; this is
 *  the equivalent page for the third.
 *
 *  Meta retired business.whatsapp.com: that host 301s to whatsappbusiness.com,
 *  so linking it spent a redirect hop on all 68 crawlable pages (the footer is
 *  site-wide). Link the destination. */
const WHATSAPP_PLATFORM_URL = 'https://whatsappbusiness.com/products/business-platform/';

type FootLink = { label: string; href: string; badge?: string };

const columns: { title: string; links: FootLink[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      // /services was a 301 to /features until 2026-10-29, so GSC had it in
      // "Page with redirect". It is a real page now; this sitewide link is what
      // gets it crawled.
      { label: 'Services', href: '/services' },
      { label: 'Customers', href: '/customers' },
      { label: 'Compare', href: '/compare' },
      // Trailing slash required. The dashboard prerenders each doc to
      // docs/<path>/index.html, so Netlify 301s the slashless form. This link is
      // site-wide, so one missing slash spent a redirect hop on all 89 crawlable
      // pages (Ahrefs 29 Oct 2026: "Page has links to redirect" x89).
      { label: 'Docs', href: 'https://dash.topedgeai.com/docs/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Product',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Journey', href: '/features/journeys' },
      { label: 'COD confirmation', href: '/features/cod-confirmation' },
      { label: 'Opt-in tools', href: '/features/opt-in-tools' },
      { label: 'Audience Campaigns', href: '/features/campaigns' },
      { label: 'Profit & costs', href: '/features/profit-loss' },
      { label: 'AI Brain', href: '/features/ai-brain' },
      // Also "Discovered – currently not indexed" in GSC for want of a
      // sitewide link (see the Compare column note).
      { label: 'Warranty', href: '/features/warranty' },
    ],
  },
  {
    /*
     * The content surfaces built in Phases 1 and 2. The footer grid was already
     * repeat(4) with three columns filled, so this slots in without touching
     * the layout.
     */
    title: 'Resources',
    links: [
      { label: 'Journey examples', href: '/whatsapp-journey-examples' },
      { label: 'WhatsApp templates', href: '/whatsapp-templates' },
      { label: 'Shopify WhatsApp integration', href: '/shopify-whatsapp-integration' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Meta India rate card', href: '/pricing/meta-rates' },
      { label: 'All playbooks', href: '/blog' },
    ],
  },
  {
    title: 'Free tools',
    links: [
      ...FREE_TOOLS.map((t) => ({
        label: t.short,
        href: t.href,
        ...(t.feature ? { badge: 'New' } : {}),
      })),
      { label: 'All free tools', href: TOOLS_PATH },
    ],
  },
  {
    title: 'Compare',
    links: [
      { label: 'TopEdge vs WATI', href: '/compare/wati' },
      { label: 'TopEdge vs AiSensy', href: '/compare/aisensy' },
      { label: 'TopEdge vs WATI vs AiSensy', href: '/compare/topedge-vs-wati-vs-aisensy' },
      {
        label: 'WATI vs Interakt vs AiSensy',
        href: '/compare/topedge-vs-wati-vs-interakt-vs-aisensy',
      },
      { label: 'TopEdge vs Interakt', href: '/compare/interakt' },
      { label: 'TopEdge vs Bitespeed', href: '/compare/bitespeed' },
      // Zoko, Gupshup, Kanal and Getgabs were "Discovered – currently not
      // indexed" in GSC: linked only from /compare, so Googlebot queued them
      // and never spent the crawl. A sitewide footer link is the cheapest way
      // to raise their crawl priority. Keep every /compare/* slug listed here.
      { label: 'TopEdge vs Zoko', href: '/compare/zoko' },
      { label: 'TopEdge vs Gupshup', href: '/compare/gupshup' },
      { label: 'TopEdge vs Dondy', href: '/compare/dondy' },
      { label: 'TopEdge vs Kanal', href: '/compare/kanal' },
      { label: 'TopEdge vs Getgabs', href: '/compare/getgabs' },
      { label: 'TopEdge vs Updatrr', href: '/compare/updatrr' },
      { label: 'All alternatives', href: '/compare/alternatives' },
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
 * Minimal site footer: brand, contact and the social row on the left, sitemap
 * on the right. The newsletter form came out at the owner's request — it was
 * the only thing in the footer asking for something rather than giving a way
 * through, and the social links now sit under the WhatsApp line where someone
 * already looking for a way to reach us will find them.
 */
export default function MarketingFooter() {
  return (
    <footer className="mkt-foot" aria-label="Site footer">
      <div className="mkt-foot__shell">
        <div className="mkt-foot__main">
          <div className="mkt-foot__brand" aria-label="Company details">
            <Link to="/" className="mkt-foot__logo" aria-label={`${COMPANY_BRAND_NAME} home`}>
              <img
                src="/logo.png"
                alt=""
                aria-hidden
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

          <nav className="mkt-foot__sitemap" aria-label="Sitemap">
            {columns.map((col) => (
              <div key={col.title} className="mkt-foot__col">
                <p className="mkt-foot__capsule">{col.title}</p>
                <ul className="mkt-foot__list">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      {l.href.startsWith('http') ? (
                        <a
                          href={l.href}
                          className="mkt-foot__link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link to={l.href} className="mkt-foot__link">
                          {l.label}
                          {l.badge ? <span className="mkt-foot__badge">{l.badge}</span> : null}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mkt-foot__trust" aria-label="Ratings and platform partnerships">
          <p className="mkt-foot__trust-label">Trusted by merchants and platforms</p>
          <ul className="mkt-foot__trust-list">
            <li className="mkt-foot__rating">
              <TrustpilotScore compact />
            </li>
            <li className="mkt-foot__rating">
              <ProductHuntBadge compact />
            </li>
            <li>
              <a
                className="mkt-foot__partner"
                href="https://www.facebook.com/business/marketing-partners"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Meta Business Partner"
              >
                <img
                  src="/badges/meta-business-partner.webp?v=5"
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
                href={COMPANY_SHOPIFY_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Shopify Available on App Store"
              >
                <img
                  src="/badges/shopify-app-store.webp?v=5"
                  alt="Shopify Available on App Store"
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
                href={WHATSAPP_PLATFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Business Partner"
              >
                <img
                  src="/badges/whatsapp-cloud-api.webp?v=6"
                  alt="WhatsApp Business Partner"
                  width={168}
                  height={96}
                  loading="lazy"
                  decoding="async"
                />
              </a>
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
