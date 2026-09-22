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
  /** Compressed source for narrow viewports — enables in-view autoplay on mobile. */
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
      /* muted + playsInline should usually succeed */
    });
  }
}

/**
 * Frameless product demo video, poster first, muted loop.
 * Mobile + mobileSrc / desktop: load when near view, autoplay, pause off-screen, resume on return.
 * Mobile without mobileSrc: poster until tap (legacy large files).
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
  const [playSrc, setPlaySrc] = useState(() =>
    typeof window !== 'undefined' && isNarrowViewport() && mobileSrc ? mobileSrc : src,
  );
  const [activeSrc, setActiveSrc] = useState<string | undefined>(() =>
    priority
      ? typeof window !== 'undefined' && isNarrowViewport() && mobileSrc
        ? mobileSrc
        : src
      : undefined,
  );
  const [ready, setReady] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const playAfterLoad = useRef(false);
  const wasVisible = useRef(false);
  const startedOnce = useRef(false);

  // Pick mobile vs desktop source after mount (and on resize).
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const apply = () => {
      const next = mq.matches && mobileSrc ? mobileSrc : src;
      setPlaySrc(next);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [src, mobileSrc]);

  useEffect(() => {
    const wrap = hostRef.current;
    if (!wrap) return;

    setReady(false);
    setActiveSrc(undefined);
    setNeedsTap(false);
    playAfterLoad.current = false;
    wasVisible.current = false;
    startedOnce.current = false;

    if (priority) {
      setActiveSrc(playSrc);
      return;
    }

    if (prefersReducedMotion()) {
      return;
    }

    // Legacy: large desktop file only — require tap on phones.
    if (isNarrowViewport() && !mobileSrc) {
      setNeedsTap(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActiveSrc(playSrc);
          io.disconnect();
        }
      },
      { rootMargin: '120px 0px', threshold: 0.1 },
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

    const startFresh = () => {
      try {
        video.currentTime = 0;
      } catch {
        /* ignore */
      }
      tryPlay(video);
      startedOnce.current = true;
    };

    const resumeOrStart = () => {
      if (startedOnce.current) {
        tryPlay(video);
      } else {
        startFresh();
      }
    };

    if (playAfterLoad.current) {
      const onReady = () => {
        startFresh();
        wasVisible.current = true;
      };
      if (video.readyState >= 2) onReady();
      else {
        video.addEventListener('loadeddata', onReady, { once: true });
        video.addEventListener('canplay', onReady, { once: true });
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(
          entry?.isIntersecting && (entry.intersectionRatio ?? 0) >= 0.25,
        );

        if (visible && !wasVisible.current) {
          resumeOrStart();
        } else if (!visible && wasVisible.current) {
          video.pause();
        }

        wasVisible.current = visible;
      },
      { threshold: [0, 0.25, 0.5], rootMargin: '0px' },
    );

    observer.observe(wrap);

    // If already mostly visible when src attaches, kick off without waiting for a transition.
    const rect = wrap.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const visiblePx = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
    if (visiblePx / Math.min(rect.height, vh) >= 0.25) {
      resumeOrStart();
      wasVisible.current = true;
    }

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
