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
};

/**
 * Same frameless glow chrome as demo videos, but a static product still.
 */
export default function DemoProductImageFrame({
  src,
  alt,
  glow = 'violet',
  className,
}: DemoProductImageFrameProps) {
  return (
    <div
      className={['demo-video-glow', 'demo-video-glow--still', className].filter(Boolean).join(' ')}
      data-glow={glow}
    >
      <div className="demo-video-glow__frame is-ready">
        <img
          className="demo-video-glow__el demo-video-glow__still"
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
