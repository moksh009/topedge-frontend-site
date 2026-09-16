import { useEffect, useRef, useState } from 'react';
import '../../../styles/demo-video.css';

export type DemoVideoGlow =
  | 'violet'
  | 'emerald'
  | 'sky'
  | 'amber'
  | 'rose'
  | 'indigo';

type DemoProductVideoFrameProps = {
  src: string;
  poster?: string;
  title?: string;
  glow?: DemoVideoGlow;
  /** Eager-load bytes (hero only). Features stay lazy. */
  priority?: boolean;
  className?: string;
};

/**
 * Frameless product demo video — poster first, muted loop.
 * Always restarts from 0 when it enters the viewport so users never land mid-clip.
 */
export default function DemoProductVideoFrame({
  src,
  poster,
  title = 'Product demo video',
  glow = 'violet',
  priority = false,
  className,
}: DemoProductVideoFrameProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | undefined>(priority ? src : undefined);
  const [ready, setReady] = useState(false);
  const wasVisible = useRef(false);

  useEffect(() => {
    const wrap = hostRef.current;
    if (!wrap) return;

    if (priority) {
      setActiveSrc(src);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActiveSrc(src);
          io.disconnect();
        }
      },
      { rootMargin: '240px 0px', threshold: 0.01 }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [src, priority]);

  useEffect(() => {
    const wrap = hostRef.current;
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
        /* ignore seek errors before metadata */
      }
      const play = video.play();
      if (play && typeof play.catch === 'function') {
        play.catch(() => {
          /* Autoplay blocked until gesture — already muted */
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(
          entry?.isIntersecting && (entry.intersectionRatio ?? 0) >= 0.35
        );

        if (visible && !wasVisible.current) {
          // Just entered view → always start from the beginning
          playFromStart();
        } else if (!visible && wasVisible.current) {
          video.pause();
        }

        wasVisible.current = visible;
      },
      { threshold: [0, 0.35, 0.55], rootMargin: '40px 0px' }
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
    <div
      ref={hostRef}
      className={['demo-video-glow', className].filter(Boolean).join(' ')}
      data-glow={glow}
    >
      <div className={`demo-video-glow__frame${ready ? ' is-ready' : ''}`}>
        {poster ? (
          <img
            className="demo-video-glow__poster"
            src={poster}
            alt=""
            width={1920}
            height={1080}
            decoding="async"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
          />
        ) : null}
        <video
          ref={videoRef}
          className="demo-video-glow__el"
          src={activeSrc}
          poster={poster}
          muted
          loop
          playsInline
          preload={priority ? 'metadata' : 'none'}
          aria-label={title}
          tabIndex={-1}
          disablePictureInPicture
          controls={false}
          onLoadedData={() => setReady(true)}
          onCanPlay={() => setReady(true)}
        />
      </div>
    </div>
  );
}
