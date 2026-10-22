import '../../../styles/demo-video.css';

export type DemoImageGlow =
  | 'violet'
  | 'emerald'
  | 'sky'
  | 'amber'
  | 'rose'
  | 'indigo';

type DemoProductImageFrameProps = {
  src: string;
  alt: string;
  /**
   * 4:3 crop served below 768px. Cut from the still's real UI panel by
   * scripts/make-mobile-crops.mjs, because a 1400px dashboard scaled into a
   * 350px frame is a picture of a product too small to read the product in.
   */
  mobileSrc?: string;
  glow?: DemoImageGlow;
  className?: string;
};

/**
 * Same frameless glow chrome as demo videos, but a static product still.
 * WebP-only (all evergreen browsers): avoids dual PNG+WebP downloads that
 * PSI flags under "Improve image delivery".
 */
export default function DemoProductImageFrame({
  src,
  alt,
  mobileSrc,
  glow = 'violet',
  className,
}: DemoProductImageFrameProps) {
  return (
    <div
      className={['demo-video-glow', 'demo-video-glow--still', className].filter(Boolean).join(' ')}
      data-glow={glow}
    >
      <div className="demo-video-glow__frame is-ready">
        <picture>
          {mobileSrc ? <source media="(max-width: 767px)" srcSet={mobileSrc} /> : null}
          <img
            className="demo-video-glow__el demo-video-glow__still"
            src={src}
            alt={alt}
            width={1400}
            height={780}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        </picture>
      </div>
    </div>
  );
}
