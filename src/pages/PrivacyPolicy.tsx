import { Helmet } from 'react-helmet-async';
import {
  AlertTriangle,
  Database,
  Eye,
  Globe,
  Lock,
  Mail,
  Share2,
  Shield,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import LegalEntityContactCard from '../marketing/components/legal/LegalEntityContactCard';
import LegalPageShell from '../marketing/components/legal/LegalPageShell';
import {
  ACCOUNT_DELETE_URL,
  COMPANY_BRAND_NAME,
  COMPANY_DASHBOARD_URL,
  COMPANY_EMAIL,
  COMPANY_GOVERNING_LAW,
  COMPANY_LEGAL_NAME,
  COMPANY_SITE_PRIVACY_URL,
  COMPANY_VENUE,
  LEGAL_DOCS_VERSION,
  LEGAL_LAST_UPDATED_LABEL,
  META_DATA_DELETION_URL,
  META_DELETION_STATUS_URL,
  SHOPIFY_COMPLIANCE_URL,
} from '../marketing/legal/companyIdentity';
import '../marketing/styles/legal-page.css';

/**
 * Public Privacy Policy — mirrors dash.topedgeai.com/privacy (v2026-08-02).
 * Also served as static public/privacy.html for Meta crawlers.
 */
export default function PrivacyPolicy() {
  const sections = [
    {
      id: 'information-collection',
      icon: Database,
      title: '1. Information we collect',
      content: (
        <>
          <p>
            We collect information that identifies, relates to, describes, or could reasonably be
            linked with a particular consumer or device (&quot;Personal Information&quot;),
            including:
          </p>
          <ul>
            <li>
              <strong>Account data:</strong> Name, email, phone, business name, and password when
              you register.
            </li>
            <li>
              <strong>Integration data:</strong> When you connect Shopify, Meta (WhatsApp / Ads), or
              related services — access tokens, store config, orders, catalogs, checkout events,
              messaging history, and (when you connect Meta Ads) hashed Custom Audience uploads
              needed for automations you enable. Instagram messaging may appear in product UI but is
              not active in the current public release unless enabled for your workspace.
            </li>
            <li>
              <strong>Storefront &amp; pixel data:</strong> Page views, product views, cart and
              checkout events from our web pixel, theme script, and checkout extensions for cart
              recovery and insights.
            </li>
            <li>
              <strong>End-customer data:</strong> Shopper names, phones, emails, orders, and message
              content — solely to run automations you configure.
            </li>
            <li>
              <strong>Usage data:</strong> IP, browser, OS, and pages visited on our platform.
            </li>
            <li>
              <strong>Communication data:</strong> Support requests and chat logs you send to us or
              generate through AI chatbots.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'how-we-use',
      icon: Eye,
      title: '2. How we use your information',
      content: (
        <>
          <p>We use collected information to:</p>
          <ul>
            <li>
              <strong>Deliver the Service:</strong> Operate messaging, automations, and dashboard
              features.
            </li>
            <li>
              <strong>Sync integrations:</strong> Connect commerce data (e.g. Shopify orders) with
              WhatsApp for cart recovery and order updates.
            </li>
            <li>
              <strong>Improve the product:</strong> Analyze usage trends to improve features.
            </li>
            <li>
              <strong>Secure the platform:</strong> Detect fraud, abuse, and technical issues.
            </li>
            <li>
              <strong>Communicate:</strong> Send technical notices, security alerts, and admin
              messages.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'information-sharing',
      icon: Globe,
      title: '3. Sharing and disclosure',
      content: (
        <>
          <p>We do not sell your Personal Information. We may share information when:</p>
          <ul>
            <li>
              <strong>Service providers:</strong> Hosting, databases, email, and AI API vendors who
              process data on our behalf.
            </li>
            <li>
              <strong>Platform integrations:</strong> Meta / Shopify — only as required by actions
              you configure.
            </li>
            <li>
              <strong>Legal requirements:</strong> When required by law or to respond to lawful
              requests from authorities.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'data-security',
      icon: Lock,
      title: '4. Security & retention',
      content: (
        <>
          <p>
            We use commercially reasonable physical, managerial, and technical safeguards. Sensitive
            credentials (OAuth tokens, API keys) are encrypted at rest (AES-256-CBC).
          </p>
          <p>
            No system is 100% secure. We retain Personal Information while your account is active or
            as needed to provide services, meet legal obligations, resolve disputes, and enforce
            agreements.
          </p>
          <p>
            After account deletion, we erase Personal Information tied to your account within 30
            days, except where law requires longer retention.
          </p>
        </>
      ),
    },
    {
      id: 'user-rights',
      icon: Shield,
      title: '5. Your data rights',
      content: (
        <>
          <p>Depending on your location, you may have rights to:</p>
          <ul>
            <li>
              <strong>Access</strong> a copy of personal data we hold about you.
            </li>
            <li>
              <strong>Erasure</strong> — request deletion, subject to legal exceptions (Shopify
              compliance webhooks are honored — see Section 7).
            </li>
            <li>
              <strong>Rectification</strong> of inaccurate or incomplete data.
            </li>
            <li>
              <strong>Restrict processing</strong> in certain cases.
            </li>
          </ul>
          <p>Contact us using Section 9 to exercise these rights.</p>
        </>
      ),
    },
    {
      id: 'meta-platform-data',
      icon: Share2,
      title: '6. Meta platform data',
      content: (
        <>
          <p>
            {COMPANY_BRAND_NAME} integrates with Meta (Facebook, Instagram, WhatsApp) for messaging
            automation. This section covers data received from Meta (&quot;Platform Data&quot;).
          </p>
          <h4>What we access</h4>
          <ul>
            <li>
              <strong>Public profile:</strong> Name, picture, user ID — authentication and
              personalization.
            </li>
            <li>
              <strong>Email:</strong> From Facebook Login for account and communication.
            </li>
            <li>
              <strong>Pages &amp; Instagram Business:</strong> For messaging features when
              connected.
            </li>
            <li>
              <strong>Ads data:</strong> If you connect an Ad Account — performance metrics for
              analytics (we do not manage ads without your action).
            </li>
            <li>
              <strong>Messaging:</strong> WhatsApp (and Instagram DMs when enabled) to power bots
              and agent handoff.
            </li>
          </ul>
          <h4>How we use it</h4>
          <ul>
            <li>Authenticate users and personalize the dashboard.</li>
            <li>Send and receive messages on your behalf.</li>
            <li>Show performance and attribution analytics.</li>
            <li>Improve the product via aggregated, de-identified analytics.</li>
          </ul>
          <h4>What we do not do</h4>
          <ul>
            <li>
              We do <strong>not sell</strong> Meta Platform Data.
            </li>
            <li>
              We do <strong>not</strong> use it to discriminate or for surveillance.
            </li>
            <li>
              We do <strong>not</strong> share it except as in Section 3 and Meta&apos;s Platform
              Terms.
            </li>
            <li>
              We do <strong>not</strong> use it for unrelated purposes.
            </li>
          </ul>
          <h4>WhatsApp consent &amp; opt-out</h4>
          <p>
            Merchants must obtain consent before marketing WhatsApp messages. We support checkout
            consent, opt-in tools, and enrollment flows you configure.
          </p>
          <ul>
            <li>
              Customers opt out by replying <strong>STOP</strong> (or equivalent keywords).
            </li>
            <li>Opt-out stops campaigns and cart-recovery for that contact.</li>
            <li>Agents can mark opted-out from Live Chat.</li>
            <li>
              Utility messages (e.g. order updates) may still send where WhatsApp policy and law
              allow.
            </li>
          </ul>
          <p>
            Instagram messaging may appear in roadmap UI but is{' '}
            <strong>not active in the current public release</strong> unless explicitly enabled.
            Meta Ads connect and Custom Audience push are available when you opt in under Settings.
          </p>
          <h4>Deletion</h4>
          <ul>
            <li>
              <strong>Settings → Workspace → Delete workspace</strong> at{' '}
              <a href={ACCOUNT_DELETE_URL}>{COMPANY_DASHBOARD_URL.replace(/^https:\/\//, '')}/settings</a>.
            </li>
            <li>
              Remove the app in Facebook Apps and Websites — callback{' '}
              <strong>{META_DATA_DELETION_URL}</strong> returns a confirmation URL.
            </li>
            <li>
              Email <strong>{COMPANY_EMAIL}</strong> from your registered address.
            </li>
          </ul>
          <p>
            Valid deletion requests are processed within 30 days unless law requires longer
            retention.
          </p>
        </>
      ),
    },
    {
      id: 'shopify-service-availability',
      icon: ShoppingBag,
      title: '7. Shopify & service availability',
      content: (
        <>
          <p>
            If you connect Shopify, we process order, product, checkout, and customer data as
            described here to run automations. You remain responsible for your Shopify relationship
            and your end customers.
          </p>
          <h4>Shopify App Store</h4>
          <p>
            Our app is <strong>free to install</strong> on the Shopify App Store — no Shopify app
            billing and no paywall on the connector. Optional TopEdge platform plans on{' '}
            <strong>dash.topedgeai.com</strong> are separate and not required for the Shopify
            integration.
          </p>
          <h4>Processors &amp; merchant obligations</h4>
          <p>
            For customer data we process on your behalf, you are typically the{' '}
            <strong>controller</strong> and we act as a <strong>processor</strong>. You must comply
            with privacy law, notices, consents, and data-subject requests.
          </p>
          <p>
            We honor Shopify compliance webhooks at <strong>{SHOPIFY_COMPLIANCE_URL}</strong>:
          </p>
          <ul>
            <li>
              <strong>customers/data_request</strong> — log and provide available data on verified
              request.
            </li>
            <li>
              <strong>customers/redact</strong> — erase personal data for that customer in your
              workspace.
            </li>
            <li>
              <strong>shop/redact</strong> — after uninstall, disconnect credentials and purge
              store-linked data.
            </li>
          </ul>
          <p>
            Reference:{' '}
            <a
              href="https://shopify.dev/docs/apps/build/compliance/privacy-law-compliance"
              rel="noopener noreferrer"
              target="_blank"
            >
              Shopify privacy law compliance
            </a>
            .
          </p>
          <div className="legal-page__notice legal-page__notice--warn">
            <p style={{ margin: 0, display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <AlertTriangle size={14} className="shrink-0 mt-0.5" aria-hidden />
              <span>
                <strong>No guarantee of continuous delivery.</strong> Hosting, APIs,
                Meta/Shopify/WhatsApp, webhooks, and networks can delay or prevent message delivery.
                We do not warrant timed sends or any revenue outcome. See our{' '}
                <a href="/terms">Terms of Service</a>.
              </span>
            </p>
          </div>
        </>
      ),
    },
    {
      id: 'data-deletion',
      icon: Trash2,
      title: '8. Account deletion',
      content: (
        <>
          <p>You may delete your account at any time. We permanently erase:</p>
          <ul>
            <li>User account and credentials</li>
            <li>Business configuration and integration tokens</li>
            <li>Conversations and message history</li>
            <li>Leads, customers, orders, campaigns, segments, analytics</li>
          </ul>
          <h4>How to delete</h4>
          <ul>
            <li>
              <strong>Dashboard:</strong> Settings → Workspace → Delete workspace (
              <a href={ACCOUNT_DELETE_URL}>open</a>).
            </li>
            <li>
              <strong>Email:</strong> Write to <strong>{COMPANY_EMAIL}</strong> from your registered
              address (within 7 business days).
            </li>
            <li>
              <strong>Meta:</strong> Remove the app in Facebook settings; status at{' '}
              <a href={META_DELETION_STATUS_URL}>deletion-status</a>.
            </li>
            <li>
              <strong>Shopify:</strong> Uninstall triggers <strong>shop/redact</strong> after
              Shopify&apos;s retention period.
            </li>
          </ul>
          <div className="legal-page__notice legal-page__notice--warn">
            <strong>Important:</strong> Deletion is irreversible. Export anything you need first.
            Cancel paid subscriptions before deleting to avoid charges.
          </div>
        </>
      ),
    },
    {
      id: 'contact',
      icon: Mail,
      title: '9. Contact us',
      content: (
        <>
          <p>
            Questions or data-subject requests for <strong>{COMPANY_BRAND_NAME}</strong> (
            {COMPANY_LEGAL_NAME}):
          </p>
          <LegalEntityContactCard />
          <p style={{ marginTop: '0.65rem', fontSize: '0.75rem', color: '#94a3b8' }}>
            Email from your registered address when requesting access, correction, or deletion.
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
          content="TopEdge AI Privacy Policy — how TopEdge Ai collects, uses, and protects data for Shopify and Meta / WhatsApp integrations."
        />
        <link rel="canonical" href={COMPANY_SITE_PRIVACY_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={COMPANY_SITE_PRIVACY_URL} />
        <meta property="og:title" content="Privacy Policy | TopEdge AI" />
        <meta
          property="og:description"
          content="Privacy Policy for TopEdge AI (TopEdge Ai). Meta Platform Data, account deletion, and contact details."
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
            {COMPANY_BRAND_NAME} (legal name <strong>{COMPANY_LEGAL_NAME}</strong>, a partnership
            registered in India) explains how we collect, use, disclose, and protect information.
            This applies to our dashboard (
            <a href={COMPANY_DASHBOARD_URL}>https://dash.topedgeai.com</a>
            ), APIs, and integrations (Shopify, Meta / WhatsApp). Use of the Service is also governed
            by our <a href="/terms">Terms of Service</a>.
          </>
        )}
        introNote={(
          <>
            Governed by {COMPANY_GOVERNING_LAW}. Privacy requests:{' '}
            <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>. Exclusive jurisdiction:{' '}
            {COMPANY_VENUE}, subject to mandatory consumer protections where applicable.
          </>
        )}
        sections={sections}
        acknowledgment={(
          <>
            By creating an account or using {COMPANY_BRAND_NAME}, you acknowledge this Privacy Policy
            and our <a href="/terms">Terms of Service</a>.
          </>
        )}
      />
    </>
  );
}
