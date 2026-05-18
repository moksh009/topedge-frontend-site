import { useState } from 'react';
import MarketingImage from './MarketingImage';
import FeatureGraphic from '../graphics';
import { getImage } from '../data/imageManifest';
import { graphicIdForImage } from '../data/imageGraphicMap';
import { cn } from '@/lib/utils';

type Props = {
  imageId: string;
  priority?: boolean;
  float?: boolean;
  className?: string;
  preferGraphic?: boolean;
  interactive?: boolean;
  /** No outer frame/border — graphic only (homepage) */
  bare?: boolean;
};

export default function FeatureMarketingImage({
  imageId,
  priority,
  float,
  className,
  preferGraphic = true,
  interactive = false,
  bare = false,
}: Props) {
  const slot = getImage(imageId);
  const graphicId = graphicIdForImage(imageId);
  const [useGraphic, setUseGraphic] = useState(preferGraphic);

  if (!slot && !graphicId) return null;

  if (useGraphic && graphicId) {
    if (bare) {
      return (
        <div className={cn('home-graphic-bare w-full', className)}>
          <FeatureGraphic id={graphicId} />
        </div>
      );
    }

    return (
      <div
        className={cn(
          'relative mx-auto w-full max-w-5xl',
          interactive && 'marketing-visual-interactive',
          className
        )}
      >
        <div
          className={cn(
            'marketing-image-frame overflow-hidden p-4 md:p-6',
            interactive ? 'marketing-glow' : 'shadow-lg shadow-violet-500/10'
          )}
        >
          <FeatureGraphic id={graphicId} />
        </div>
      </div>
    );
  }

  if (!slot) return null;

  return (
    <MarketingImage
      src={slot.path}
      alt={slot.alt}
      priority={priority}
      float={float}
      className={cn(bare && 'rounded-[1.75rem] shadow-[0_48px_100px_-32px_rgba(91,33,182,0.4)]', className)}
      onError={() => {
        if (graphicId) setUseGraphic(true);
      }}
    />
  );
}
