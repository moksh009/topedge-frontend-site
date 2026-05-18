import MarketingCtaBand from '../MarketingCtaBand';

export default function HomeFinalCta() {
  return (
    <MarketingCtaBand
      title="Ready to make WhatsApp your best channel?"
      subtitle="Connect Shopify, approve your templates, publish your first flow — free to start."
      primaryLabel="Create free account"
      primaryTo="/signup"
      secondaryLabel="Estimate ROI"
      secondaryTo="/roi"
      tertiaryLabel="Talk to sales"
      tertiaryTo="/contact"
    />
  );
}
