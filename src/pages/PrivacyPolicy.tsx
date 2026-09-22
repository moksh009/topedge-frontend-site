import { Helmet } from 'react-helmet-async';
import {
  Shield,
  Eye,
  Database,
  Share2,
  Lock,
  UserCheck,
  Globe,
  Mail,
  Cookie,
  Trash2,
  Server,
  ShoppingBag,
  Scale,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import LegalEntityContactCard from '../marketing/components/legal/LegalEntityContactCard';
import LegalPageShell from '../marketing/components/legal/LegalPageShell';
import {
  COMPANY_BRAND_NAME,
  COMPANY_LEGAL_NAME,
  COMPANY_EMAIL,
  LEGAL_LAST_UPDATED_LABEL,
  COMPANY_ADDRESS_ONE_LINE,
  COMPANY_GSTIN,
  COMPANY_SITE_PRIVACY_URL,
  LEGAL_DOCS_VERSION,
} from '../marketing/legal/companyIdentity';
import '../marketing/styles/legal-page.css';

/**
 * Merchant Privacy Policy — DPDP-aware; Shopify + Meta Platform Data accurate.
 * Material changes bump LEGAL_DOCS_VERSION (FE + BE must match).
 */
export default function PrivacyPolicy() {
  const sections = [
    {
      id: 'introduction',
      icon: Shield,
      title: '1. Who we are & scope',
      content: (
        <>
          <p>
            This Privacy Policy explains how <strong>{COMPANY_LEGAL_NAME}</strong> (&quot;TopEdge,&quot; &quot;we,&quot; &quot;us&quot;),
            operating the brand <strong>{COMPANY_BRAND_NAME}</strong>, collects, uses, shares, and protects personal data
            when you use our dashboard (<strong>https://dash.topedgeai.com</strong>), APIs (<strong>https://api.topedgeai.com</strong>),
            Shopify app, webhooks, storefront scripts, and related services (the &quot;Service&quot;).
          </p>
          <p>
            It covers: (a) account and billing data of merchants and their staff; (b) End-Customer Personal Data processed
            when you connect Shopify, WhatsApp, opt-in tools, or pixels; and (c) visitors to our marketing site where applicable.
          </p>
          <p>
            By using the Service you acknowledge this Policy and our <a href="/terms">Terms of Service</a>.
            Document version: <strong>{LEGAL_DOCS_VERSION}</strong>.
          </p>
        </>
      ),
    },
    {
      id: 'roles',
      icon: Scale,
      title: '2. Roles under Indian data protection law',
      content: (
        <>
          <p>
            Under the Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;) and rules as notified:
          </p>
          <ul>
            <li>
              <strong>Your account / staff data:</strong> we are generally a Data Fiduciary for how we collect and use
              registration, login, billing, and support data about you and your team.
            </li>
            <li>
              <strong>Your customers&apos; data (End-Customer Personal Data):</strong> you are generally the Data Fiduciary /
              controller. We process that data as a Data Processor / service provider on your documented instructions
              (configuration in the dashboard, APIs, webhooks) to provide the Service.
            </li>
          </ul>
          <p>
            You must provide required notices to your customers, obtain valid consent for marketing WhatsApp/SMS/email,
            and honour rights requests directed at you as Fiduciary. We will reasonably assist where the request is made
            through the Service or to {COMPANY_EMAIL}.
          </p>
          <p>
            Terms such as &quot;personal data,&quot; &quot;processing,&quot; and &quot;consent&quot; have the meanings under the DPDP Act
            and, where relevant, other applicable privacy laws for your customers outside India.
          </p>
        </>
      ),
    },
    {
      id: 'information-collected',
      icon: Database,
      title: '3. Information we collect',
      content: (
        <>
          <h3>A. Merchant account &amp; workspace</h3>
          <ul>
            <li>Name, email, phone, company/brand name, password hashes or OAuth identifiers (Google/Shopify login).</li>
            <li>Billing identity: plan, GSTIN, billing state/address, invoices, Razorpay payment references (we do not store full card PANs).</li>
            <li>Team members, roles, and activity logs needed for security and support.</li>
            <li>Support tickets, emails, and call notes you share with us.</li>
          </ul>
          <h3>B. Connected platforms</h3>
          <ul>
            <li>
              <strong>Shopify:</strong> store domain, tokens, orders, products, checkouts, customers, fulfilments, and
              theme/embed status as needed for features you enable and scopes you grant.
            </li>
            <li>
              <strong>Meta / WhatsApp Cloud API:</strong> Phone Number ID, WABA ID, encrypted access tokens, template metadata,
              webhook payloads (messages, statuses, errors), quality signals where available.
            </li>
            <li>
              <strong>Meta Platform Data (Login / Graph where used):</strong> identifiers and fields you authorise during Meta Login
              or Business integrations — see Section 10.
            </li>
          </ul>
          <h3>C. End-Customer Personal Data (on your behalf)</h3>
          <ul>
            <li>Phone numbers (E.164), names, emails, order/cart identifiers, shipping addresses when provided by Shopify or forms.</li>
            <li>WhatsApp message content and delivery/read/click signals where Meta or our redirect wrappers supply them.</li>
            <li>Opt-in tool submissions (popup, spin wheel, mystery, WA widget), consent timestamps, and visitor IDs.</li>
            <li>Pixel / website events (page_view, product_view, add_to_cart, etc.) and identity stitching where configured.</li>
          </ul>
          <h3>D. Technical &amp; usage data</h3>
          <ul>
            <li>IP address, browser/device type, approximate location from IP, cookies/local storage, session identifiers.</li>
            <li>API request logs, error traces, feature usage, and performance metrics (may be aggregated or pseudonymised).</li>
          </ul>
          <p>
            We do not intentionally collect special-category sensitive data beyond what you or platforms send
            (e.g. address fields in orders). Do not use the Service to process children&apos;s data unlawfully.
          </p>
        </>
      ),
    },
    {
      id: 'how-we-use',
      icon: Eye,
      title: '4. How we use information',
      content: (
        <>
          <ul>
            <li>Provide, operate, secure, and improve the Service (messaging, journeys, inbox, analytics, billing).</li>
            <li>Authenticate users, enforce tenant isolation, detect fraud/abuse, and debug incidents.</li>
            <li>Process Subscription Fees, GST invoices, trials, locks, and payment status.</li>
            <li>Send service notices (security, billing, material Terms/Privacy changes) and optional product updates you opt into.</li>
            <li>Comply with law, Meta/Shopify platform requirements, and valid legal process.</li>
            <li>Create aggregated / de-identified statistics that do not identify you or End Customers.</li>
          </ul>
          <p>
            We do <strong>not</strong> sell End-Customer Personal Data. We do not use Merchant End-Customer content to train
            public foundation models for unrelated third parties. Limited use of AI vendors to power product features you enable
            is described in Section 6.
          </p>
        </>
      ),
    },
    {
      id: 'legal-bases',
      icon: FileText,
      title: '5. Purposes &amp; lawful bases (DPDP / contract)',
      content: (
        <>
          <p>Depending on context, we process personal data for:</p>
          <ul>
            <li><strong>Contract:</strong> perform the Terms of Service and provide the features you request.</li>
            <li><strong>Consent:</strong> where you or End Customers consent (e.g. marketing WhatsApp, optional cookies).</li>
            <li><strong>Legitimate uses / employment &amp; security:</strong> as permitted under the DPDP Act for security, fraud prevention, and employment of our staff.</li>
            <li><strong>Legal obligation:</strong> tax, accounting, law-enforcement requests, platform compliance.</li>
          </ul>
          <p>
            You remain responsible for lawful bases for End-Customer Personal Data you instruct us to process
            (consent for promotional messages, notices, purpose limitation).
          </p>
        </>
      ),
    },
    {
      id: 'sharing',
      icon: Share2,
      title: '6. Sharing &amp; subprocessors',
      content: (
        <>
          <p>We share personal data only as needed:</p>
          <ul>
            <li>
              <strong>Infrastructure:</strong> cloud hosting, MongoDB, Redis, CDN, email delivery, error monitoring (e.g. Sentry)
              under contracts requiring confidentiality and security.
            </li>
            <li>
              <strong>Payments:</strong> Razorpay (and Shopify Billing where used) process payments; they receive billing identifiers
              necessary to charge and reconcile.
            </li>
            <li>
              <strong>Meta / WhatsApp / Shopify:</strong> message and store data flows to those platforms as required for the features you use.
              Their privacy policies apply to processing they perform as independent controllers or platforms.
            </li>
            <li>
              <strong>AI providers:</strong> if you use AI features, prompts/snippets necessary for the feature may be sent to providers
              (e.g. OpenAI / Google) under our agreements; do not paste secrets into prompts.
            </li>
            <li>
              <strong>Professional advisors &amp; authorities:</strong> lawyers, auditors, or government where legally required.
            </li>
            <li>
              <strong>Corporate transactions:</strong> merger, acquisition, or asset sale — subject to confidentiality and notice where required.
            </li>
          </ul>
          <p>
            Team members you invite and SUPER_ADMIN support sessions you authorise can access workspace data under our access controls.
          </p>
        </>
      ),
    },
    {
      id: 'international',
      icon: Globe,
      title: '7. Cross-border transfers',
      content: (
        <>
          <p>
            Servers and subprocessors may process data in India and other countries. Where we transfer personal data outside India,
            we take steps consistent with the DPDP Act and applicable rules (including any government-restricted territories).
          </p>
          <p>
            Meta, Shopify, and AI vendors may process data in their regions under their terms. By using those integrations
            you instruct us to enable such transfers as needed for the Service.
          </p>
        </>
      ),
    },
    {
      id: 'security-retention',
      icon: Lock,
      title: '8. Security &amp; retention',
      content: (
        <>
          <p>
            We use industry-standard measures: TLS in transit, encryption of certain secrets at rest (e.g. WhatsApp tokens),
            access controls, tenant-scoped queries, logging, and operational hardening. No method is 100% secure;
            you must also protect credentials and staff access.
          </p>
          <p>
            <strong>Retention (indicative):</strong>
          </p>
          <ul>
            <li>Account / billing records: for the subscription life plus periods required for tax and dispute resolution (often 7+ years for invoices).</li>
            <li>WhatsApp / conversation / journey operational data: retained while the workspace is active and for a reasonable period after for debugging and compliance, then deleted or anonymised.</li>
            <li>Logs: shorter rolling windows unless needed for security investigations.</li>
            <li>After workspace deletion or Shopify/Meta deletion callbacks: see Sections 11–12.</li>
          </ul>
          <p>
            Backups may persist for a limited period after deletion until overwritten. Residual copies in backups are not
            restored to production except for disaster recovery.
          </p>
        </>
      ),
    },
    {
      id: 'rights',
      icon: UserCheck,
      title: '9. Your rights',
      content: (
        <>
          <p>
            Subject to the DPDP Act and other applicable law, Data Principals may have rights to access, correction,
            erasure, data portability (where applicable), withdrawal of consent, and grievance redressal.
          </p>
          <ul>
            <li>
              <strong>Merchants / staff:</strong> update profile and billing in Settings; request access/erasure via{' '}
              <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a> or workspace deletion.
            </li>
            <li>
              <strong>End Customers:</strong> should contact the merchant (you) first. We will assist merchants with
              verifiable requests affecting data we process for them.
            </li>
          </ul>
          <p>
            We may refuse or limit requests that are unlawful, unreasonably repetitive, jeopardise others&apos; privacy/security,
            or conflict with legal retention duties. We may need to verify identity before acting.
          </p>
        </>
      ),
    },
    {
      id: 'meta-platform',
      icon: Server,
      title: '10. Meta Platform Data',
      content: (
        <>
          <p>
            If you connect Meta Login or Meta Business products, we may receive Platform Data (e.g. user id, name, email,
            pages/WABA assets you select) under Meta&apos;s Platform Terms and Developer Policies.
          </p>
          <ul>
            <li>We use Platform Data only to provide and improve WhatsApp/Meta-connected features you request.</li>
            <li>We do not sell Platform Data or use it for unrelated advertising networks.</li>
            <li>
              Meta Data Deletion Callback: <strong>https://api.topedgeai.com/api/meta/data-deletion</strong> —
              when Meta notifies us of a user deletion request, we delete or anonymise associated Meta-linked personal data
              we hold, subject to legal retention exceptions, and return a confirmation code per Meta&apos;s requirements.
            </li>
          </ul>
          <p>
            WhatsApp message content and statuses arrive via Meta webhooks you configure; Meta&apos;s policies govern
            messaging content on their network.
          </p>
        </>
      ),
    },
    {
      id: 'shopify-compliance',
      icon: ShoppingBag,
      title: '11. Shopify App Store compliance',
      content: (
        <>
          <p>
            For the Shopify app, we implement Shopify mandatory compliance webhooks, including:
          </p>
          <ul>
            <li><strong>customers/data_request</strong> — export customer data we hold for that shop when Shopify requests it.</li>
            <li><strong>customers/redact</strong> — delete or anonymise specified customer personal data for that shop.</li>
            <li><strong>shop/redact</strong> — after uninstall grace periods, delete or anonymise shop and associated personal data as required.</li>
          </ul>
          <p>
            Uninstalling the app stops new sync; residual processing follows Shopify timelines and our deletion jobs.
            Platform Subscription Fees on dash.topedgeai.com are separate from Shopify App Store install and are governed by the Terms.
          </p>
        </>
      ),
    },
    {
      id: 'cookies',
      icon: Cookie,
      title: '12. Cookies &amp; similar technologies',
      content: (
        <>
          <p>
            We use essential cookies/local storage for authentication, security, and preferences.
            Analytics or marketing cookies (if enabled on our sites) will be disclosed and, where required, consented.
          </p>
          <p>
            Storefront opt-in widgets and the TopEdge pixel set first-party identifiers (e.g. visitor id) on your domain
            as configured by you. You must disclose those technologies in your store privacy notice.
          </p>
        </>
      ),
    },
    {
      id: 'children',
      icon: AlertTriangle,
      title: '13. Children',
      content: (
        <p>
          The Service is not directed to children under 18. We do not knowingly collect personal data from children.
          If you believe a child provided data, contact {COMPANY_EMAIL} and we will take appropriate steps to delete it
          where required by law.
        </p>
      ),
    },
    {
      id: 'deletion',
      icon: Trash2,
      title: '14. Account &amp; workspace deletion',
      content: (
        <>
          <p>
            Merchants may delete a workspace via <strong>Settings → Workspace → Delete workspace</strong> or by emailing{' '}
            <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>. Deletion removes or anonymises Merchant Data and
            End-Customer Personal Data we hold for that workspace, subject to:
          </p>
          <ul>
            <li>Legal / tax retention of invoices and payment records.</li>
            <li>Security logs retained for a limited period.</li>
            <li>Backup lag until rotation.</li>
            <li>Data held by Meta, Shopify, Razorpay, or other platforms under their policies — you may need to request deletion there separately.</li>
          </ul>
          <p>
            Deletion does not entitle you to a refund of Subscription Fees (see Terms). After deletion, messaging and
            automations stop for that workspace.
          </p>
        </>
      ),
    },
    {
      id: 'changes',
      icon: FileText,
      title: '15. Changes to this Policy',
      content: (
        <p>
          We may update this Policy. The &quot;Last updated&quot; date and version ({LEGAL_DOCS_VERSION}) will change.
          Material changes may be notified by email or in-product. Continued use after the effective date constitutes
          acknowledgment. Re-acceptance of the document version may be required at login/signup when we bump the version.
        </p>
      ),
    },
    {
      id: 'grievance',
      icon: Mail,
      title: '16. Contact &amp; grievance',
      content: (
        <>
          <p>
            For privacy requests, grievances, or DPDP-related queries regarding <strong>{COMPANY_BRAND_NAME}</strong>:
          </p>
          <LegalEntityContactCard />
          <p style={{ marginTop: '0.65rem' }}>
            Email: <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a><br />
            Address: {COMPANY_ADDRESS_ONE_LINE}<br />
            GSTIN: {COMPANY_GSTIN}
          </p>
          <p style={{ marginTop: '0.65rem', fontSize: '0.75rem', color: '#94a3b8' }}>
            We aim to acknowledge grievances within a reasonable period and resolve them as required by applicable law.
            Document version: {LEGAL_DOCS_VERSION}.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy | TopEdge AI</title>
        <meta
          name="description"
          content="TopEdge AI Privacy Policy — how TopEdge Ai collects, uses, and protects merchant and End-Customer data under DPDP, Shopify, and Meta."
        />
        <link rel="canonical" href={COMPANY_SITE_PRIVACY_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={COMPANY_SITE_PRIVACY_URL} />
        <meta property="og:title" content="Privacy Policy | TopEdge AI" />
        <meta
          property="og:description"
          content="Privacy Policy for TopEdge AI (TopEdge Ai). DPDP roles, Meta Platform Data, Shopify redact webhooks, and contact details."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <LegalPageShell
        documentTitle="Privacy Policy | TopEdge AI"
        pageTitle="Privacy Policy"
        lastUpdated={LEGAL_LAST_UPDATED_LABEL}
        siblingHref="/terms"
        siblingLabel="Terms"
        intro={(
          <>
            How <strong>{COMPANY_LEGAL_NAME}</strong> ({COMPANY_BRAND_NAME}) handles personal data for merchants,
            staff, and End Customers processed through the Service. Read together with our{' '}
            <a href="/terms">Terms of Service</a>.
          </>
        )}
        introNote={(
          <>
            You (merchant) are generally the Data Fiduciary for your customers&apos; data; we process it to run the Platform.
            Meta deletion callback and Shopify redact webhooks are documented below. We do not sell End-Customer Personal Data.
          </>
        )}
        sections={sections}
        acknowledgment={(
          <>
            Questions? <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>. Also see{' '}
            <a href="/terms">Terms of Service</a>.
          </>
        )}
      />
    </>
  );
}
