import { useEffect, useRef } from 'react';
import '../../styles/demo-video.css';

type ProductDemoVideoProps = {
  src: string;
  label: string;
  className?: string;
};

/**
 * Rounded product demo video — plays when in view, pauses when out.
 * Muted + playsInline so autoplay works in modern browsers.
 */
export default function ProductDemoVideo({ src, label, className = '' }: ProductDemoVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
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
          /* Autoplay can be blocked until user gesture — mute is already set */
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.45);
        if (visible) {
          tryPlay();
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.45, 0.7], rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else if (visible) {
        tryPlay();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      video.pause();
    };
  }, [src]);

  return (
    <div ref={wrapRef} className={`mkt-demo-video ${className}`.trim()}>
      <div className="mkt-demo-video__frame">
        <video
          ref={videoRef}
          className="mkt-demo-video__el"
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
        />
      </div>
    </div>
  );
}
