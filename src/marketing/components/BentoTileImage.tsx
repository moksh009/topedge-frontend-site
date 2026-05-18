import { useState } from 'react';
import { imageSrc } from '../data/imageManifest';
import { graphicIdForImage } from '../data/imageGraphicMap';
import FeatureGraphic from '../graphics';
import { cn } from '@/lib/utils';

type Props = {
  imageId: string;
  title: string;
  tall?: boolean;
};

export default function BentoTileImage({ imageId, title, tall }: Props) {
  const graphicId = graphicIdForImage(imageId);
  const [failed, setFailed] = useState(false);

  const visualClass = tall ? 'marketing-bento-visual--tall' : 'marketing-bento-visual';

  if (failed && graphicId) {
    return (
      <div
        className={cn(
          'overflow-hidden rounded-xl border border-violet-100/80 bg-gradient-to-b from-violet-50/80 to-white p-2',
          visualClass
        )}
      >
        <div className="origin-top scale-[0.58] md:scale-[0.68]">
          <FeatureGraphic id={graphicId} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'mt-auto overflow-hidden rounded-xl border border-violet-100/80 bg-gradient-to-b from-violet-50/50 to-white',
        visualClass
      )}
    >
      <img
        src={imageSrc(imageId)}
        alt={title}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>
  );
}
