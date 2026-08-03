import { ReactNode } from 'react';
import { FileText, LucideIcon } from 'lucide-react';
import {
  COMPANY_BRAND_NAME,
  COMPANY_LEGAL_NAME,
  LEGAL_DOCS_VERSION,
} from '../../legal/companyIdentity';

export type LegalSection = {
  id: string;
  icon: LucideIcon;
  title: string;
  content: ReactNode;
};

type LegalPageShellProps = {
  documentTitle?: string;
  pageTitle: string;
  lastUpdated: string;
  intro?: ReactNode;
  introNote?: ReactNode;
  siblingHref: string;
  siblingLabel: string;
  sections: LegalSection[];
  acknowledgment?: ReactNode;
};

/**
 * Shared chrome for public Privacy / Terms pages (matches dashboard legal pages).
 */
export default function LegalPageShell({
  pageTitle,
  lastUpdated,
  intro,
  introNote,
  siblingHref,
  siblingLabel,
  sections,
  acknowledgment,
}: LegalPageShellProps) {
  return (
    <div className="legal-page">
      <header className="legal-page__bar">
        <div className="legal-page__bar-inner">
          <a href="https://topedgeai.com/" className="legal-page__brand">
            <div className="legal-page__brand-mark" aria-hidden>
              <FileText size={14} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="legal-page__brand-title">{COMPANY_BRAND_NAME}</p>
              <p className="legal-page__brand-sub">Legal</p>
            </div>
          </a>
          <nav className="legal-page__nav" aria-label="Legal navigation">
            <a href={siblingHref} className="legal-page__nav-link">
              {siblingLabel}
            </a>
            <a href="https://dash.topedgeai.com/login" className="legal-page__nav-link">
              Log in
            </a>
            <a href="https://dash.topedgeai.com/signup" className="legal-page__nav-cta">
              Get started
            </a>
          </nav>
        </div>
      </header>

      <main className="legal-page__main">
        <aside className="legal-page__toc" aria-label="Contents">
          <div className="legal-page__toc-sticky">
            <p className="legal-page__toc-label">Contents</p>
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="legal-page__toc-link">
                <section.icon size={13} strokeWidth={1.75} aria-hidden />
                <span className="truncate">{section.title}</span>
              </a>
            ))}
          </div>
        </aside>

        <article className="legal-page__article">
          <div className="legal-page__doc-badge">
            <FileText size={11} aria-hidden />
            Official document · v{LEGAL_DOCS_VERSION}
          </div>
          <h1 className="legal-page__doc-title">{pageTitle}</h1>
          <p className="legal-page__doc-meta">Last updated: {lastUpdated}</p>

          {intro ? <div className="legal-page__intro">{intro}</div> : null}
          {introNote ? <div className="legal-page__intro-note">{introNote}</div> : null}

          <div className="legal-page__sections">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="legal-page__section">
                <div className="legal-page__section-head">
                  <div className="legal-page__section-icon">
                    <section.icon size={14} strokeWidth={1.75} aria-hidden />
                  </div>
                  <h2 className="legal-page__section-title">{section.title}</h2>
                </div>
                <div className="legal-page__body">{section.content}</div>
              </section>
            ))}
          </div>

          {acknowledgment ? <div className="legal-page__ack">{acknowledgment}</div> : null}
        </article>
      </main>

      <footer className="legal-page__footer">
        <div className="legal-page__footer-inner">
          <p className="legal-page__footer-links">
            <a href="/terms">Terms of Service</a>
            <span className="legal-page__footer-sep">·</span>
            <a href="/privacy">Privacy Policy</a>
          </p>
          <p className="legal-page__footer-copy">
            © {new Date().getFullYear()} {COMPANY_LEGAL_NAME}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
