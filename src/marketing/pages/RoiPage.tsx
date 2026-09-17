import MarketingSEO from '../components/MarketingSEO';
import {
  PAGE_SEO,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import RoiWizard from '../components/pricing/RoiWizard';
import '../styles/roi.css';

export default function RoiPage() {
  const seo = PAGE_SEO.roi;

  return (
    <>
      <MarketingSEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        path={seo.path}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'ROI Calculator',
            description: seo.description,
            path: seo.path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'ROI Calculator', path: '/roi' },
          ]),
        ]}
      />
      <MarketingPage className="roi-page" fillHeight={false}>
        <header className="roi-page__hero">
          <p className="roi-page__eyebrow">Operator ROI</p>
          <h1 className="roi-page__title">
            WhatsApp ROI for{' '}
            <span className="roi-brand">
              TopEdge <span>AI</span>
            </span>
          </h1>
          <p className="roi-page__sub">
            Cart recovery, COD / RTO, campaigns, and support — Quick Estimate or full control.
          </p>
        </header>
        <div className="roi-page__body">
          <RoiWizard />
        </div>
        <MarketingCtaBand
          title="Ready to turn this estimate into live recovery?"
          subtitle="Connect Shopify, approve Meta templates, and go live — usually the same afternoon."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
