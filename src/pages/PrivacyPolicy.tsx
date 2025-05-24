import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <Helmet>
        <title>Privacy Policy - TopEdge AI</title>
        <meta name="description" content="TopEdge AI's Privacy Policy outlining how we collect, use, share, and protect your information." />
      </Helmet>
      
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Privacy Policy – TopEdge AI</h1>
        <p className="text-gray-600 mb-8 text-center">Effective Date: 22/5/2025</p>
        
        <div className="prose prose-lg max-w-none">
          <p>
            At TopEdge AI, we value your privacy and are committed to protecting your personal data. 
            This Privacy Policy outlines how we collect, use, share, and protect your information when 
            you use our website, platform, and services. We adhere to the General Data Protection 
            Regulation (GDPR) and other relevant data protection laws.
          </p>
          
          <hr className="my-8" />
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Who We Are</h2>
            <p>
              TopEdge AI is a forward-thinking AI agency and SaaS platform offering AI-powered voice 
              agents and dashboards tailored for businesses in healthcare, real estate, and service industries.
            </p>
            <p className="mt-4">
              <strong>Contact Information:</strong><br />
              📧 Email: team@topedgeai.com
            </p>
          </section>
          
          <hr className="my-8" />
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. What Data We Collect</h2>
            <p>
              We collect personal data depending on how you interact with our services. This includes:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Basic identification data: Name, email address, phone number</li>
              <li>Company details: Business name, domain, and industry</li>
              <li>Login credentials: Email and encrypted password</li>
              <li>Communication data: AI-generated call transcripts, summaries, and related metadata</li>
              <li>Analytics data: IP address, browser type, device ID, pages visited</li>
              <li>Billing information: Managed by secure processors like Stripe (we do not store card details)</li>
              <li>Cookies & tracking: Session cookies, analytics, and remarketing tools</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">Special Categories of Data</h3>
            <p>
              We do not intentionally collect sensitive personal data. However, if clients upload such 
              information through call transcripts, it is processed securely and lawfully.
            </p>
          </section>
          
          <hr className="my-8" />
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Why We Collect Your Data</h2>
            <p>
              We use your data for the following purposes:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>To create and manage user accounts</li>
              <li>To provide AI calling services and display related metrics</li>
              <li>To offer customer support and technical assistance</li>
              <li>For billing and invoicing</li>
              <li>With your consent, to send marketing and product updates</li>
              <li>To analyze usage and improve features</li>
            </ul>
          </section>
          
          <hr className="my-8" />
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Legal Bases for Processing</h2>
            <p>
              Under GDPR, we rely on the following legal grounds:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Performance of a contract – to deliver our services to you</li>
              <li>Consent – for marketing and non-essential cookies</li>
              <li>Legitimate interest – to improve platform functionality and ensure security</li>
              <li>Legal obligation – to comply with applicable laws</li>
            </ul>
          </section>
          
          <hr className="my-8" />
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking</h2>
            <p>
              We use cookies to enhance your experience. Upon your first visit, a cookie banner allows you to opt-in to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Strictly necessary cookies – essential for site functionality</li>
              <li>Analytics cookies – to monitor usage patterns</li>
              <li>Marketing cookies – to provide targeted ads</li>
            </ul>
            <p className="mt-4">
              You can change your preferences at any time in your browser or cookie settings.
            </p>
          </section>
          
          <hr className="my-8" />
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Your Data Protection Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Access your data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your data ("right to be forgotten")</li>
              <li>Restrict or object to processing</li>
              <li>Request data portability</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, contact us at privacy@topedge.ai. A privacy dashboard for 
              self-service data requests is in development.
            </p>
          </section>
          
          <hr className="my-8" />
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Who We Share Data With</h2>
            <p>
              We only share your data with trusted third parties necessary for service delivery:
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">🔹 Analytics & Monitoring</h3>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Google Analytics (anonymized)</li>
              <li>Vercel, LogRocket, Sentry – for performance and error monitoring</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">🔹 AI & Backend Services</h3>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>VAPI – for generating AI calls and call data</li>
              <li>OpenAI (or similar providers) – for processing transcripts and summaries</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">🔹 Payments</h3>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Stripe – for secure billing (TopEdge does not store card information)</li>
            </ul>
            
            <p className="mt-4">
              All third-party vendors are GDPR-compliant and subject to signed Data Processing Agreements (DPAs).
            </p>
          </section>
          
          <hr className="my-8" />
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Data Security</h2>
            <p>
              We use robust technical and organizational measures to protect your data:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>HTTPS encryption</li>
              <li>JWT-based session authentication</li>
              <li>Data encryption at rest and in transit</li>
              <li>Role-based internal access controls</li>
              <li>Hosting on secure platforms (e.g., Vercel, Supabase, AWS)</li>
              <li>Regular security audits and software updates</li>
            </ul>
          </section>
          
          <hr className="my-8" />
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Data Retention</h2>
            <p>
              We retain your data only as long as necessary:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Account data: Stored for the life of the account. Deleted within 30 days upon request.</li>
              <li>Call data: Retained for 90 days by default, or longer if required by users or law.</li>
              <li>Analytics data: Anonymized and aggregated after retention period.</li>
            </ul>
          </section>
          
          <hr className="my-8" />
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. International Data Transfers</h2>
            <p>
              Your data may be transferred outside the European Economic Area (EEA), for example to the U.S., 
              for processing by services like VAPI, Stripe, or Supabase. These transfers are safeguarded through:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>Data Processing Agreements (DPAs)</li>
              <li>Vendor GDPR compliance assurance</li>
            </ul>
          </section>
          
          <hr className="my-8" />
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Policy Updates</h2>
            <p>
              We may update this Privacy Policy periodically. When we do:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Major updates will be emailed to registered users</li>
              <li>Minor updates will be announced via a changelog on this page</li>
              <li>The "Last Updated" date will reflect the latest change</li>
            </ul>
          </section>
          
          <hr className="my-8" />
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
            <p>
              For questions about this policy or to exercise your rights, please contact:
            </p>
            <p className="mt-4">
              📧 Privacy Team: team@topedge.co.in<br />
              📧 General Contact: team@topedgeai.com
            </p>
          </section>
          
          <hr className="my-8" />
          
          <p className="text-gray-600 text-center">
            Last Updated: 22/5/2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
