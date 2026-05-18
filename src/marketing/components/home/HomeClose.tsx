import { ChevronDown } from 'lucide-react';
import { faqs } from '../../data/home';
import MarketingCtaBand from '../MarketingCtaBand';

export default function HomeClose() {
  return (
    <>
      <section className="bg-white py-20 md:py-24">
        <div className="marketing-container max-w-3xl">
          <p className="home-eyebrow">FAQ</p>
          <h2 className="home-section-title mt-3">Common questions</h2>
          <p className="home-section-lead">Everything you need to know before connecting Shopify and WhatsApp.</p>
          <div className="home-faq mt-10">
            {faqs.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex items-center justify-between gap-4">
                  <span>{item.q}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <MarketingCtaBand
        title="Put WhatsApp to work on your Shopify store"
        subtitle="Connect in minutes. Approve templates. Publish your first flow — free to start."
        primaryLabel="Create free account"
        primaryTo="/signup"
        secondaryLabel="Estimate ROI"
        secondaryTo="/roi"
        tertiaryLabel="View pricing"
        tertiaryTo="/pricing"
      />
    </>
  );
}
