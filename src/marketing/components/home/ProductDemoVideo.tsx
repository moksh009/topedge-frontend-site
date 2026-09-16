import { useEffect, useRef, useState } from 'react';
import '../../styles/demo-video.css';

type ProductDemoVideoProps = {
  src: string;
  poster?: string;
  label: string;
  className?: string;
};

/**
 * Rounded product demo video — poster first, loads when near viewport.
 * Restarts from 0 every time it enters view.
 */
export default function ProductDemoVideo({
  src,
  poster,
  label,
  className = '',
}: ProductDemoVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | undefined>();
  const wasVisible = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActiveSrc(src);
          io.disconnect();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [src]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video || !activeSrc) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      video.pause();
      return;
    }

    const playFromStart = () => {
      try {
        video.currentTime = 0;
      } catch {
        /* ignore */
      }
      const play = video.play();
      if (play && typeof play.catch === 'function') {
        play.catch(() => {
          /* Autoplay can be blocked until user gesture — mute is already set */
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.4);
        if (visible && !wasVisible.current) playFromStart();
        else if (!visible && wasVisible.current) video.pause();
        wasVisible.current = visible;
      },
      { threshold: [0, 0.4, 0.7], rootMargin: '0px 0px -6% 0px' }
    );

    observer.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
        wasVisible.current = false;
      } else if (wasVisible.current) {
        playFromStart();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      video.pause();
      wasVisible.current = false;
    };
  }, [activeSrc]);

  return (
    <div ref={wrapRef} className={`mkt-demo-video ${className}`.trim()}>
      <div className="mkt-demo-video__frame">
        <video
          ref={videoRef}
          className="mkt-demo-video__el"
          src={activeSrc}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={label}
        />
      </div>
    </div>
  );
}
