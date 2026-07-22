import { Link } from 'react-router-dom';
import MarketingSEO from '../marketing/components/MarketingSEO';
import MarketingPage from '../marketing/components/MarketingPage';
import { PageHero } from '../marketing/components/ui';

const sections = [
  {
    title: '1. Who we are',
    body: `TopEdge AI ("TopEdge", "we") provides a WhatsApp growth platform for Shopify merchants in India — including Meta WhatsApp Business API connectivity, template management, automations, Live Chat, campaigns, and analytics. We operate from Ahmedabad, Gujarat, India.`,
  },
  {
    title: '2. What data we collect',
    body: `Depending on how you use topedgeai.com and dash.topedgeai.com, we may collect: account details (name, email, phone); business information (store name, Shopify domain, industry); WhatsApp and Meta Business account identifiers; message templates, automation rules, and conversation metadata; Shopify order and customer data you connect; billing details processed by our payment provider (we do not store full card numbers); and technical data such as IP address, browser type, and usage logs.`,
  },
  {
    title: '3. Why we use your data',
    body: `We process data to: provide and improve the TopEdge service; sync Shopify and Meta WhatsApp on your behalf; display inbox, analytics, and automation tools; send service and billing communications; provide customer support; comply with legal obligations; and, with consent, send product updates.`,
  },
  {
    title: '4. Legal bases',
    body: `We rely on performance of a contract (to deliver the service), legitimate interests (security, product improvement), consent (marketing and non-essential cookies), and legal obligation where applicable.`,
  },
  {
    title: '5. Cookies & analytics',
    body: `We use essential cookies for authentication and site function. With consent, we may use analytics and advertising pixels (e.g. Meta Pixel) to understand usage and measure campaigns. You can control cookies through your browser settings.`,
  },
  {
    title: '6. Who we share data with',
    body: `We share data only with processors needed to run the service, including: Meta (WhatsApp Cloud API delivery); Shopify (store data you authorize); cloud hosting and database providers; payment processors; AI providers when you enable AI Brain features; and analytics or error-monitoring tools. All vendors are bound by data processing terms appropriate to their role.`,
  },
  {
    title: '7. Data security & retention',
    body: `We use HTTPS, access controls, and encryption in transit. Account data is retained while your subscription is active and deleted within a reasonable period after closure, subject to legal retention requirements. Conversation and automation logs are retained per your plan settings and our backup policies.`,
  },
  {
    title: '8. International transfers',
    body: `Your data may be processed in India and other countries where our subprocessors operate. Where required, we use appropriate safeguards such as standard contractual clauses.`,
  },
  {
    title: '9. Your rights',
    body: `Depending on your location, you may have rights to access, correct, delete, restrict, or port your personal data, and to object to certain processing. Contact privacy@topedgeai.com to exercise these rights.`,
  },
  {
    title: '10. Contact',
    body: `Privacy: privacy@topedgeai.com · General: hello@topedgeai.com · Address: B 203 Shyam Arcade, Near Gangotri Circle, Nikol, Ahmedabad, Gujarat, India 382350`,
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <MarketingSEO
        title="Privacy Policy | TopEdge"
        description="How TopEdge collects, uses, and protects data when you use our WhatsApp growth platform for Shopify India."
        path="/privacy-policy"
      />
      <MarketingPage>
        <PageHero
          eyebrow="Legal"
          title="Privacy Policy"
          subtitle="How we handle your data when you use TopEdge — WhatsApp growth OS for Shopify India."
        />
        <div className="marketing-container max-w-3xl pb-20 md:pb-28">
          <p className="mb-10 text-center text-sm text-slate-500">Effective date: 17 June 2026</p>
          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-lg font-medium tracking-tight text-[#0c1222]">{s.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{s.body}</p>
              </section>
            ))}
          </div>
          <p className="mt-12 border-t border-marketing-border pt-8 text-center text-sm text-slate-500">
            See also our{' '}
            <Link to="/terms" className="font-medium text-[#7C3AED] hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </MarketingPage>
    </>
  );
}
