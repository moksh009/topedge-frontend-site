import { Building2, Globe, Mail, MapPin, Phone } from 'lucide-react';
import {
  COMPANY_ADDRESS_LINES,
  COMPANY_BRAND_NAME,
  COMPANY_CONSTITUTION,
  COMPANY_DASHBOARD_URL,
  COMPANY_EMAIL,
  COMPANY_GSTIN,
  COMPANY_LEGAL_NAME,
  COMPANY_PHONE,
} from '../../legal/companyIdentity';

/** Compact contact card for Privacy / Terms pages. */
export default function LegalEntityContactCard({ className = '' }: { className?: string }) {
  return (
    <div className={`legal-contact-card ${className}`.trim()}>
      <p className="legal-contact-card__brand">{COMPANY_BRAND_NAME}</p>
      <p className="legal-contact-card__legal">
        Legal name: {COMPANY_LEGAL_NAME} · {COMPANY_CONSTITUTION}
      </p>

      <div className="legal-contact-card__rows">
        <div className="legal-contact-card__row">
          <MapPin size={13} strokeWidth={1.75} aria-hidden />
          <div>
            {COMPANY_ADDRESS_LINES.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <div className="legal-contact-card__row">
          <Building2 size={13} strokeWidth={1.75} aria-hidden />
          <p>
            GSTIN: <span className="legal-contact-card__gst">{COMPANY_GSTIN}</span>
          </p>
        </div>
        <div className="legal-contact-card__row">
          <Mail size={13} strokeWidth={1.75} aria-hidden />
          <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
        </div>
        <div className="legal-contact-card__row">
          <Phone size={13} strokeWidth={1.75} aria-hidden />
          <a href={`tel:${COMPANY_PHONE.replace(/\s/g, '')}`}>{COMPANY_PHONE}</a>
        </div>
        <div className="legal-contact-card__row">
          <Globe size={13} strokeWidth={1.75} aria-hidden />
          <a href={COMPANY_DASHBOARD_URL}>{COMPANY_DASHBOARD_URL.replace(/^https:\/\//, '')}</a>
        </div>
      </div>
    </div>
  );
}
