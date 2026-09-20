import MarketingCtaBand from '../MarketingCtaBand';

export default function HomeClose() {
  return (
    <MarketingCtaBand
      title={
        <>
          Recover more carts with{' '}
          <span className="mkt-cta__hl">
            TopEdge <span>AI</span>
          </span>{' '}
          on WhatsApp
        </>
      }
      subtitle="Connect Shopify, approve Meta templates, and publish your first recovery journey, usually the same afternoon."
      primaryLabel="Start free"
      secondaryLabel="See pricing"
      secondaryTo="/pricing"
      titleOneLine
    />
  );
}
