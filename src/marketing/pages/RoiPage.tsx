import MarketingSEO from '../components/MarketingSEO';
import {
  PAGE_SEO,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
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
            name: 'ROI calculator',
            description: seo.description,
            path: seo.path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'ROI calculator', path: '/roi' },
          ]),
        ]}
      />
      <MarketingPage className="roi-page" fillHeight={false}>
        <header className="roi-page__hero">
          <p className="roi-page__eyebrow">Recovery math</p>
          <h1 className="roi-page__title">
            See how much{' '}
            <span className="roi-brand">
              TopEdge <span>AI</span>
            </span>{' '}
            recovers for you
          </h1>
        </header>
        <div className="roi-page__body">
          <RoiWizard />
        </div>
      </MarketingPage>
    </>
  );
}
