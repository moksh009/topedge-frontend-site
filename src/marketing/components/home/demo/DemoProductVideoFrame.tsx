import { useEffect, useRef } from 'react';
import '../../../styles/demo-product-stage.css';

export type DemoVideoGlow =
  | 'violet'
  | 'emerald'
  | 'sky'
  | 'amber'
  | 'rose'
  | 'indigo';

type DemoProductVideoFrameProps = {
  src: string;
  title?: string;
  /** Matches feature highlight / accent color */
  glow?: DemoVideoGlow;
  className?: string;
};

/**
 * Frameless product demo video — highlight-colored border + soft glow.
 */
export default function DemoProductVideoFrame({
  src,
  title = 'Product demo video',
  glow = 'violet',
  className,
}: DemoProductVideoFrameProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wrap = hostRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      video.pause();
      return;
    }

    let visible = false;

    const tryPlay = () => {
      if (!visible || !video) return;
      const play = video.play();
      if (play && typeof play.catch === 'function') {
        play.catch(() => {
          /* Autoplay blocked until gesture — already muted */
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting && (entry.intersectionRatio ?? 0) >= 0.35);
        if (visible) tryPlay();
        else video.pause();
      },
      { threshold: [0, 0.35, 0.6], rootMargin: '120px 0px' }
    );

    observer.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (visible) tryPlay();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      video.pause();
    };
  }, [src]);

  return (
    <div
      ref={hostRef}
      className={['demo-video-glow', className].filter(Boolean).join(' ')}
      data-glow={glow}
      data-lenis-prevent
    >
      <div className="demo-video-glow__frame">
        <video
          ref={videoRef}
          className="demo-video-glow__el"
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={title}
        />
      </div>
    </div>
  );
}
