import MarketingImage from './MarketingImage';
import { getImage, imageSrc } from '../data/imageManifest';

type Props = {
  imageId: string;
  fallbackSrc?: string;
  alt?: string;
  children?: React.ReactNode;
  priority?: boolean;
  float?: boolean;
};

/** Renders AI marketing PNG when status is ready; optional React fallback via children */
export default function MarketingVisual({ imageId, fallbackSrc, alt, children, priority, float }: Props) {
  const slot = getImage(imageId);
  if (!slot) return children ? <>{children}</> : null;

  if (slot.status === 'ready') {
    return (
      <MarketingImage
        src={slot.path}
        alt={alt ?? slot.alt}
        priority={priority}
        float={float}
      />
    );
  }

  if (children) return <>{children}</>;

  return (
    <MarketingImage
      src={imageSrc(imageId, fallbackSrc)}
      alt={alt ?? slot.alt}
      priority={priority}
      float={float}
    />
  );
}
