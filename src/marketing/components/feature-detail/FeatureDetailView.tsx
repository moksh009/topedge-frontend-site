import type { FeatureDetail } from '../../data/features';
import FeatureShowcaseBand from './FeatureShowcaseBand';
import FeatureProblemSolution from './FeatureProblemSolution';
import FeatureCapabilitiesBento from './FeatureCapabilitiesBento';
import FeatureStepsTimeline from './FeatureStepsTimeline';
import FeatureRelatedModules from './FeatureRelatedModules';

export default function FeatureDetailView({ detail, slug }: { detail: FeatureDetail; slug: string }) {
  return (
    <>
      <FeatureShowcaseBand slug={slug} />
      <FeatureProblemSolution detail={detail} slug={slug} />
      <FeatureCapabilitiesBento detail={detail} slug={slug} />
      <FeatureStepsTimeline detail={detail} slug={slug} />
      <FeatureRelatedModules detail={detail} />
    </>
  );
}
