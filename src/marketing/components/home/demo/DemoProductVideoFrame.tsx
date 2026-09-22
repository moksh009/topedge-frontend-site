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
  /** Optional compressed source for narrow viewports (autoplay in-view). */
  mobileSrc?: string;
  poster?: string;
  title?: string;
  glow?: DemoVideoGlow;
  /** Eager-load bytes (hero only). Features stay lazy. */
  priority?: boolean;
  className?: string;
};

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isNarrowViewport() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches;
}

function tryPlay(video: HTMLVideoElement) {
  const play = video.play();
  if (play && typeof play.catch === 'function') {
    play.catch(() => {
      /* Autoplay blocked until gesture; muted should usually succeed */
    });
  }
}

/**
 * Frameless product demo video, poster first, muted loop.
 * Mobile default: poster until tap (large mp4s).
 * Mobile + mobileSrc: load compressed file when in view (no Play button).
 * Desktop: load + play when ~in view.
 */
export default function DemoProductVideoFrame({
  src,
  mobileSrc,
  poster,
  title = 'Product demo video',
  glow = 'violet',
  priority = false,
  className,
}: DemoProductVideoFrameProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const narrow = isNarrowViewport();
  const playSrc = narrow && mobileSrc ? mobileSrc : src;
  const mobileAutoplay = Boolean(narrow && mobileSrc);

  const [activeSrc, setActiveSrc] = useState<string | undefined>(priority ? playSrc : undefined);
  const [ready, setReady] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  /** Set on Play demo click — play as soon as the element can, not only via IO. */
  const playAfterLoad = useRef(false);
  const wasVisible = useRef(false);

  useEffect(() => {
    const wrap = hostRef.current;
    if (!wrap) return;

    if (priority) {
      setActiveSrc(playSrc);
      setNeedsTap(false);
      return;
    }

    if (prefersReducedMotion()) {
      setNeedsTap(false);
      return;
    }

    // Phones without a mobile encode: poster until tap.
    if (isNarrowViewport() && !mobileSrc) {
      setNeedsTap(true);
      return;
    }

    // Desktop, or mobile with compressed mobileSrc: load when near view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActiveSrc(playSrc);
          io.disconnect();
        }
      },
      { rootMargin: '80px 0px', threshold: 0.15 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [playSrc, priority, mobileSrc]);

  useEffect(() => {
    const wrap = hostRef.current;
    const video = videoRef.current;
    if (!wrap || !video || !activeSrc) return;

    if (prefersReducedMotion()) {
      video.pause();
      return;
    }

    const playFromStart = () => {
      try {
        video.currentTime = 0;
      } catch {
        /* ignore seek errors before metadata */
      }
      tryPlay(video);
    };

    // Tap-to-play: start as soon as media is ready (gesture already happened).
    if (playAfterLoad.current) {
      const onReady = () => {
        playFromStart();
        wasVisible.current = true;
      };
      if (video.readyState >= 2) {
        onReady();
      } else {
        video.addEventListener('loadeddata', onReady, { once: true });
        video.addEventListener('canplay', onReady, { once: true });
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(
          entry?.isIntersecting && (entry.intersectionRatio ?? 0) >= 0.35,
        );

        if (visible && !wasVisible.current) {
          playFromStart();
        } else if (!visible && wasVisible.current) {
          video.pause();
        }

        wasVisible.current = visible;
      },
      { threshold: [0, 0.35, 0.55], rootMargin: '0px' },
    );

    observer.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
        return;
      }
      if (wasVisible.current && video.paused) {
        tryPlay(video);
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

  const startFromTap = () => {
    playAfterLoad.current = true;
    setNeedsTap(false);
    setActiveSrc(playSrc);
  };

  return (
    <div
      ref={hostRef}
      className={['demo-video-glow', className].filter(Boolean).join(' ')}
      data-glow={glow}
      data-mobile-autoplay={mobileAutoplay ? 'true' : undefined}
    >
      <div className={`demo-video-glow__frame${ready ? ' is-ready' : ''}`}>
        {poster ? (
          <img
            className="demo-video-glow__poster"
            src={poster}
            alt=""
            width={1280}
            height={720}
            decoding="async"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'low'}
          />
        ) : null}
        {needsTap && !activeSrc ? (
          <button
            type="button"
            className="demo-video-glow__play"
            onClick={startFromTap}
            aria-label={`Play ${title}`}
          >
            Play demo
          </button>
        ) : null}
        {activeSrc ? (
          <video
            ref={videoRef}
            className="demo-video-glow__el"
            src={activeSrc}
            poster={poster}
            muted
            loop
            playsInline
            preload="auto"
            aria-label={title}
            tabIndex={-1}
            disablePictureInPicture
            controls={false}
            onLoadedData={() => setReady(true)}
            onCanPlay={() => setReady(true)}
          />
        ) : null}
      </div>
    </div>
  );
}
