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
  glow?: DemoImageGlow;
  className?: string;
  /** Optional PNG/JPEG fallback when src is webp */
  fallback?: string;
};

/**
 * Same frameless glow chrome as demo videos, but a static product still.
 */
export default function DemoProductImageFrame({
  src,
  alt,
  glow = 'violet',
  className,
  fallback,
}: DemoProductImageFrameProps) {
  const isWebp = /\.webp(\?|$)/i.test(src);

  return (
    <div
      className={['demo-video-glow', 'demo-video-glow--still', className].filter(Boolean).join(' ')}
      data-glow={glow}
    >
      <div className="demo-video-glow__frame is-ready">
        <picture>
          {isWebp ? <source type="image/webp" srcSet={src} /> : null}
          <img
            className="demo-video-glow__el demo-video-glow__still"
            src={fallback || src}
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
