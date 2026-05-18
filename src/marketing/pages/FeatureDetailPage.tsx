import { useParams, Navigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { featureDetails, getFeatureBySlug } from '../data/features';
import { productMegaMenu } from '../data/navigation';
import FeatureDetailView from '../components/feature-detail/FeatureDetailView';
import FeaturePageHero from '../components/feature-detail/FeaturePageHero';

export default function FeatureDetailPage() {
  const { slug = '' } = useParams();
  const detail = featureDetails[slug];
  const meta = getFeatureBySlug(slug);

  if (!detail && !meta) return <Navigate to="/features" replace />;

  const title = detail?.title ?? meta?.title ?? 'Feature';
  const headline = detail?.headline ?? meta?.tagline ?? '';
  const description = detail?.description ?? meta?.tagline ?? '';
  const hub =
    meta?.hub ??
    productMegaMenu.find((section) => section.items.some((item) => item.to === `/features/${slug}`))?.title;

  return (
    <>
      <SEO title={`${title} | TopEdge`} description={description} />
      <MarketingPage>
        <FeaturePageHero
          slug={slug}
          hub={hub}
          title={title}
          headline={headline}
          description={description}
        />

        {detail ? <FeatureDetailView detail={detail} slug={slug} /> : null}

        <MarketingCtaBand
          title={slug === 'flow-builder' ? 'Your first flow in about 10 minutes' : `Ready to use ${title}?`}
          subtitle="Start free — upgrade when WhatsApp drives revenue."
          primaryLabel="Create free account"
          primaryTo="/signup"
          secondaryLabel="View pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
