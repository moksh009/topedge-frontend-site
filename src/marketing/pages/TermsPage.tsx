import { Helmet } from 'react-helmet-async';
import {
  AlertTriangle,
  Ban,
  CreditCard,
  FileText,
  Mail,
  Scale,
  Server,
  Shield,
  ShoppingBag,
} from 'lucide-react';
import LegalEntityContactCard from '../components/legal/LegalEntityContactCard';
import LegalPageShell from '../components/legal/LegalPageShell';
import {
  ACCOUNT_DELETE_URL,
  COMPANY_BRAND_NAME,
  COMPANY_EMAIL,
  COMPANY_GOVERNING_LAW,
  COMPANY_LEGAL_NAME,
  COMPANY_SITE_TERMS_URL,
  COMPANY_VENUE,
  LEGAL_DOCS_VERSION,
  LEGAL_LAST_UPDATED_LABEL,
  META_DATA_DELETION_URL,
  META_DELETION_STATUS_URL,
} from '../legal/companyIdentity';
import '../styles/legal-page.css';

/**
 * Public Terms of Service — mirrors dash.topedgeai.com/terms (v2026-08-02).
 * Also served as static public/terms.html for crawlers.
 */
export default function TermsPage() {
  const sections = [
    {
      id: 'acceptance',
      icon: Scale,
      title: '1. Agreement & eligibility',
      content: (
        <>
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of{' '}
            {COMPANY_BRAND_NAME} operated by <strong>{COMPANY_LEGAL_NAME}</strong> (&quot;TopEdge,&quot;
            &quot;we,&quot; &quot;us&quot;) including the dashboard at{' '}
            <strong>https://dash.topedgeai.com</strong>, our APIs, integrations, and related
            services (the &quot;Service&quot;).
          </p>
          <p>
            By creating an account, accepting at sign-up, signing in, connecting integrations, or
            using the Service, you agree to these Terms and our{' '}
            <a href="/privacy">Privacy Policy</a>. If you act for a company, you represent you have
            authority to bind that entity.
          </p>
        </>
      ),
    },
    {
      id: 'service-description',
      icon: Server,
      title: '2. The Service',
      content: (
        <>
          <p>
            TopEdge AI provides conversational commerce and marketing tools (AI flows, inbox,
            campaigns, analytics, ecommerce integrations). Features may change; we may add, modify,
            or discontinue functionality with reasonable notice where practicable.
          </p>
          <p>
            You are responsible for accurate configuration (flows, templates, API keys, Shopify,
            WhatsApp/Meta compliance) and all activity under your account.
          </p>
        </>
      ),
    },
    {
      id: 'billing-shopify',
      icon: CreditCard,
      title: '3. Trials, fees & Shopify App Store',
      content: (
        <>
          <p>
            We may offer trial or promotional access. The Shopify App Store connector is{' '}
            <strong>free to install</strong> with <strong>no Shopify billing</strong> and no paywall
            on connected-store features during review.
          </p>
          <p>
            Optional TopEdge platform fees on <strong>dash.topedgeai.com</strong> are separate from
            Shopify and not required for the Shopify integration.
          </p>
          <p>
            Taxes and payment disputes are handled under the relevant payment provider&apos;s rules
            and our billing support.
          </p>
        </>
      ),
    },
    {
      id: 'shopify-data',
      icon: ShoppingBag,
      title: '4. Shopify & store data',
      content: (
        <>
          <p>
            Connecting Shopify authorizes us to access and process store data needed for features
            you enable (orders, products, checkouts, customers as permitted by scopes). You must
            have the right to share that data and comply with Shopify&apos;s terms and applicable
            law.
          </p>
          <p>
            For personal data about <strong>your customers</strong> that we process only to provide
            the Service, you are generally the controller and we act as a processor — see the Privacy
            Policy.
          </p>
        </>
      ),
    },
    {
      id: 'messaging-compliance',
      icon: Shield,
      title: '5. WhatsApp, messaging & consent',
      content: (
        <>
          <p>
            You must obtain and document consent before marketing messages, and comply with Meta
            WhatsApp Business Policy, TRAI/India rules where applicable, and opt-outs.
          </p>
          <ul>
            <li>
              Customers may opt out with <strong>STOP</strong> (or configured keywords) —
              campaigns and cart recovery stop for that contact.
            </li>
            <li>Utility messages (e.g. order updates) may still send where policy and law allow.</li>
            <li>Do not use the Service for unlawful spam or messages without a lawful basis.</li>
          </ul>
          <p>
            See our <a href="/privacy">Privacy Policy</a> for data handling, Shopify GDPR webhooks,
            and deletion.
          </p>
        </>
      ),
    },
    {
      id: 'acceptable-use',
      icon: Ban,
      title: '6. Acceptable use',
      content: (
        <>
          <p>You agree not to:</p>
          <ul>
            <li>
              Use the Service unlawfully, to spam, or to violate Meta/WhatsApp/Shopify or consent
              rules.
            </li>
            <li>Probe, disrupt, or bypass security or rate limits.</li>
            <li>Reverse engineer or resell the Service except as expressly permitted.</li>
            <li>Upload unlawful content or content that infringes others&apos; rights.</li>
          </ul>
          <p>
            We may suspend or terminate access for violations or risk to the platform or other
            users.
          </p>
        </>
      ),
    },
    {
      id: 'disclaimers',
      icon: AlertTriangle,
      title: '7. Disclaimers',
      content: (
        <>
          <div className="legal-page__notice legal-page__notice--warn">
            <strong>Read carefully.</strong> THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
            AVAILABLE.&quot; TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES,
            EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT.
          </div>
          <p>
            The Service depends on hosting, networks, APIs, webhooks, Meta, Shopify, email, and AI
            providers — which can experience downtime, delays, errors, or policy changes outside our
            control.
          </p>
          <p>
            <strong>Automations are not guaranteed.</strong> We do not warrant that messages will be
            delivered at a specific time, or at all.
          </p>
          <p>
            <strong>No responsibility for business outcomes.</strong> We are not liable for lost
            sales, revenue, profits, or missed conversions from delayed or undelivered messages or
            Service unavailability, except where such exclusion is prohibited by law.
          </p>
        </>
      ),
    },
    {
      id: 'liability-cap',
      icon: Shield,
      title: '8. Limitation of liability',
      content: (
        <>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL,
            SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR LOSS OF DATA, GOODWILL, OR
            BUSINESS OPPORTUNITY, ARISING FROM THE SERVICE OR THESE TERMS.
          </p>
          <p>
            OUR AGGREGATE LIABILITY SHALL NOT EXCEED THE GREATER OF (A) AMOUNTS YOU PAID US FOR THE
            SERVICE IN THE SIX (6) MONTHS BEFORE THE CLAIM, OR (B) USD $100 if you had no such
            payments.
          </p>
          <p>
            Some jurisdictions disallow certain limits; liability is limited to the fullest extent
            permitted.
          </p>
        </>
      ),
    },
    {
      id: 'indemnity',
      icon: Scale,
      title: '9. Indemnity',
      content: (
        <p>
          You will defend and indemnify TopEdge AI and affiliates from third-party claims arising
          from your use of the Service, your content, your breach of these Terms, or your violation
          of law or third-party rights (including privacy and marketing rules).
        </p>
      ),
    },
    {
      id: 'termination',
      icon: Ban,
      title: '10. Termination & deletion',
      content: (
        <>
          <p>
            Delete your workspace anytime via <strong>Settings → Workspace → Delete workspace</strong>{' '}
            (<a href={ACCOUNT_DELETE_URL}>open</a>) or email{' '}
            <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>.
          </p>
          <p>
            Uninstalling Shopify triggers <strong>shop/redact</strong> after Shopify&apos;s period.
            Meta deletion: <strong>{META_DATA_DELETION_URL}</strong> · status at{' '}
            <a href={META_DELETION_STATUS_URL}>deletion-status</a>.
          </p>
          <p>
            We may suspend or terminate for breach, risk, non-payment where applicable, or legal
            requirement. Disclaimers, limits, and indemnity survive.
          </p>
        </>
      ),
    },
    {
      id: 'general',
      icon: FileText,
      title: '11. General',
      content: (
        <>
          <p>
            <strong>Changes.</strong> We may update these Terms and post a revised &quot;Last
            updated&quot; date. Material changes may be emailed or shown in-product. Continued use
            means acceptance.
          </p>
          <p>
            <strong>Law.</strong> Governed by {COMPANY_GOVERNING_LAW}. Exclusive venue:{' '}
            {COMPANY_VENUE}, subject to mandatory consumer protections.
          </p>
          <p>
            <strong>Privacy.</strong> Our <a href="/privacy">Privacy Policy</a> describes personal
            data handling.
          </p>
        </>
      ),
    },
    {
      id: 'contact',
      icon: Mail,
      title: '12. Contact',
      content: (
        <>
          <p>
            Questions about these Terms for <strong>{COMPANY_BRAND_NAME}</strong> (
            {COMPANY_LEGAL_NAME}):
          </p>
          <LegalEntityContactCard />
          <p style={{ marginTop: '0.65rem', fontSize: '0.75rem', color: '#94a3b8' }}>
            Prefer email: <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>. Document version:{' '}
            {LEGAL_DOCS_VERSION}.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service | TopEdge AI</title>
        <meta
          name="description"
          content="TopEdge AI Terms of Service — agreement for using the TopEdge Ai dashboard, Shopify, and Meta / WhatsApp integrations."
        />
        <link rel="canonical" href={COMPANY_SITE_TERMS_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={COMPANY_SITE_TERMS_URL} />
        <meta property="og:title" content="Terms of Service | TopEdge AI" />
        <meta
          property="og:description"
          content="Terms of Service for TopEdge AI (TopEdge Ai). Governing law India · Ahmedabad venue."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <LegalPageShell
        documentTitle="Terms of Service | TopEdge AI"
        pageTitle="Terms of Service"
        lastUpdated={LEGAL_LAST_UPDATED_LABEL}
        siblingHref="/privacy"
        siblingLabel="Privacy"
        intro={(
          <>
            These Terms form a binding agreement between you and{' '}
            <strong>{COMPANY_LEGAL_NAME}</strong> (brand {COMPANY_BRAND_NAME}), a partnership with
            principal place of business in Ahmedabad, Gujarat, India. If you do not agree, do not use
            the Service. Nothing here is legal advice.
          </>
        )}
        sections={sections}
        acknowledgment={(
          <>
            See also our <a href="/privacy">Privacy Policy</a>.
          </>
        )}
      />
    </>
  );
}
