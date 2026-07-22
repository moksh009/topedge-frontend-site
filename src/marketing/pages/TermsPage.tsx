import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import { PageHero, Section, MarketingCard } from '../components/ui';

const items = [
  'TopEdge provides software for Shopify and WhatsApp operations. Merchant usage must comply with Meta and Shopify platform policies.',
  'Billing, message charges, and any managed-service commitments are governed by the plan or proposal accepted at the time of purchase.',
  'Merchants remain responsible for the content they send, the templates they submit, and consent or opt-in requirements under applicable law.',
];

export default function TermsPage() {
  return (
    <>
      <MarketingSEO
        title="Terms of Service | TopEdge"
        description="Core service terms for TopEdge marketing site and merchant platform access."
        path="/terms"
      />
      <MarketingPage>
        <PageHero eyebrow="Legal" title="Terms of Service" subtitle="Plain-language summary while the full legal page is being refined." />
        <Section className="!pt-0">
          <MarketingCard className="mx-auto max-w-3xl !p-8">
            <ul className="space-y-4 text-sm leading-relaxed text-slate-600">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </MarketingCard>
        </Section>
      </MarketingPage>
    </>
  );
}
