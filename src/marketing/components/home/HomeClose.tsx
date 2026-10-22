import MarketingCtaBand from '../MarketingCtaBand';

export default function HomeClose() {
  return (
    <MarketingCtaBand
      title={
        <>
          Recover more carts with{' '}
          <span className="mkt-cta__hl">
            TopEdge <span>AI</span>
          </span>
          <br className="mkt-cta__br" />
          {' '}
          on WhatsApp
        </>
      }
      subtitle="Connect Shopify, approve your templates, publish the first journey. Most stores do all three the same afternoon."
      primaryLabel="Start free"
      secondaryLabel="See pricing"
      secondaryTo="/pricing"
      titleOneLine
    />
  );
}
