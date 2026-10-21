import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import MarketingSEO from '../marketing/components/MarketingSEO';
import {
  PAGE_SEO,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '../marketing/data/pageSeo';
import MarketingPage from '../marketing/components/MarketingPage';
import { TrustpilotScore } from '../marketing/components/TrustpilotProof';
import {
  COMPANY_ADDRESS_LINES,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_SOCIAL,
  COMPANY_WHATSAPP_URL,
} from '../marketing/legal/companyIdentity';
import '../marketing/styles/contact.css';

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.26-8.24zm-2.6 4.1c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.6c.13.17 1.76 2.69 4.27 3.77.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.48-.6 1.69-1.19.2-.58.2-1.08.14-1.19-.06-.1-.23-.16-.48-.29-.25-.12-1.48-.73-1.71-.81-.23-.09-.4-.13-.56.12-.17.25-.65.81-.79.98-.15.16-.29.19-.54.06-.25-.12-1.06-.39-2.01-1.24-.74-.66-1.25-1.48-1.39-1.73-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.4-.42-.55-.43h-.48z"
      />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"
      />
    </svg>
  );
}

/**
 * The two channels we actually answer on, and nothing else above them.
 *
 * This page used to lead with a four-field form whose submit button opened
 * WhatsApp with the answers pasted into a message. So the form was never the
 * channel — it was a stile in front of the channel, and every field was a
 * chance to leave. WhatsApp is where the conversation was always going to
 * happen; Instagram is where a founder who is not ready to talk pricing looks
 * first. Both go straight out, no step in between.
 */
const CHANNELS = [
  {
    id: 'whatsapp',
    Glyph: WhatsAppGlyph,
    label: 'WhatsApp',
    lede: 'The fastest way in. Tell us the store and what you want automated first.',
    action: COMPANY_PHONE,
    href: COMPANY_WHATSAPP_URL,
    note: 'Mon to Sat, 10am to 7pm IST. Usually answered the same day.',
  },
  {
    id: 'instagram',
    Glyph: InstagramGlyph,
    label: 'Instagram',
    lede: 'Product clips, feature releases, and DMs if that is where you live.',
    action: '@topedge_ai',
    href: COMPANY_SOCIAL.instagram,
    note: 'DMs open. Same team on the other side.',
  },
] as const;

export default function Contact() {
  return (
    <>
      <MarketingSEO
        title={PAGE_SEO.contact.title}
        description={PAGE_SEO.contact.description}
        keywords={PAGE_SEO.contact.keywords}
        path={PAGE_SEO.contact.path}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'Contact TopEdge',
            description: PAGE_SEO.contact.description,
            path: PAGE_SEO.contact.path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />
      <MarketingPage className="mkt-contact">
        <header className="mkt-contact__hero">
          <p className="mkt-contact__eyebrow">Contact</p>
          <h1 className="mkt-contact__title">
            Message us where you already{' '}
            <span className="mkt-contact__title-accent">message everyone</span>
          </h1>
          <p className="mkt-contact__sub">
            No form, no callback queue. Send us the store and what you want automated first —
            WhatsApp cart recovery, COD confirmation, or the whole rollout — and you will be
            talking to the people who build it.
          </p>
          <div className="mkt-contact__score">
            <TrustpilotScore compact />
          </div>
        </header>

        <section className="mkt-contact__channels" aria-label="Ways to reach TopEdge">
          {CHANNELS.map(({ id, Glyph, label, lede, action, href, note }) => (
            <a
              key={id}
              className={`mkt-contact__channel mkt-contact__channel--${id}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="mkt-contact__channel-mark" aria-hidden>
                <Glyph />
              </span>
              <span className="mkt-contact__channel-body">
                <span className="mkt-contact__channel-head">
                  <span className="mkt-contact__channel-label">{label}</span>
                  <ArrowUpRight size={16} strokeWidth={2} aria-hidden />
                </span>
                <span className="mkt-contact__channel-lede">{lede}</span>
                <span className="mkt-contact__channel-action">{action}</span>
                <span className="mkt-contact__channel-note">{note}</span>
              </span>
            </a>
          ))}
        </section>

        <section className="mkt-contact__rest" aria-labelledby="contact-rest-head">
          <h2 className="mkt-contact__rest-head" id="contact-rest-head">
            Not a sales question?
          </h2>
          <dl className="mkt-contact__rows">
            <div className="mkt-contact__row">
              <dt>Billing, partnerships, anything on paper</dt>
              <dd>
                <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
              </dd>
            </div>
            <div className="mkt-contact__row">
              <dt>Already a customer</dt>
              <dd>
                Live Chat inside the dashboard reaches the same team with your workspace
                attached. <a href="https://dash.topedgeai.com">Open the dashboard</a>
              </dd>
            </div>
            <div className="mkt-contact__row">
              <dt>Want to look before you talk</dt>
              <dd>
                <Link to="/pricing">See pricing</Link>, read the{' '}
                <Link to="/customers">customer stories</Link>, or{' '}
                <Link to="/signup">start the 14-day free trial</Link> without a card.
              </dd>
            </div>
            <div className="mkt-contact__row">
              <dt>Registered office</dt>
              {/* The address lines already carry their own punctuation, so a
                  join on ', ' doubles the comma after "Trade Center Ahmedabad,". */}
              <dd>{COMPANY_ADDRESS_LINES.join(' ').replace(/,\s*,/g, ',')}</dd>
            </div>
          </dl>
        </section>
      </MarketingPage>
    </>
  );
}
