import DemoProductVideoFrame from './DemoProductVideoFrame';
import { demoAssetFor } from '../../../data/productDemoVideos';

/**
 * Homepage hero, cart recovery demo video (no device chrome / iframe).
 */
export default function DemoProductStage() {
  const demo = demoAssetFor('hero');

  return (
    <DemoProductVideoFrame
      src={demo.src}
      mobileSrc={demo.mobileSrc}
      poster={demo.poster}
      title="TopEdge cart recovery demo"
      glow="violet"
      priority
      className="demo-video-glow--hero"
    />
  );
}
