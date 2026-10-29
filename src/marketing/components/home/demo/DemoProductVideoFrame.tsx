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
 * Mobile + mobileSrc / desktop: autoplay in view, pause off-screen, resume on return.
 * Mobile without mobileSrc: poster until tap (legacy large files).
 *
 * Sources are declared as <source media> children with preload="none", NOT as a
 * JS-attached `src`. That combination is what lets this be both fast and
 * indexable, and it replaced two mechanisms that each broke one of those:
 *
 *   - It used to attach `src` from an IntersectionObserver. The prerendered HTML
 *     therefore had a player with no source at all, so Google read the
 *     VideoObject, fetched the file, found nothing embedding it and reported
 *     "Video isn't on a watch page" for all five demos (validation failed
 *     2026-10-08).
 *   - prerender-marketing.mjs then stripped `src` out of the snapshot on purpose,
 *     because the snapshot is taken at a desktop viewport and a baked-in
 *     `preload="auto"` desktop src made phones fetch the 10 MB desktop encode
 *     from the markup and the 1.8 MB mobile cut again after hydration.
 *
 * <source media> fixes the performance problem at the source: the browser itself
 * picks the mobile encode on a phone, so there is no desktop fetch to undo and
 * no swap to wait for. preload="none" means no bytes move until play() is
 * called, so naming both files costs nothing. The observer below still owns
 * playback, which is what actually makes this lazy.
 *
 * Trade-off accepted: a viewport that crosses 900px mid-session keeps the encode
 * it already chose, because the browser re-evaluates <source media> only on
 * load. Rotating a phone is rare and the consequence is a non-optimal file, not
 * a broken one — cheaper than driving video.load() by hand.
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
  /**
   * Whether playback may start. This is the lazy gate now; it no longer decides
   * whether the player has a source, because the sources are always rendered.
   */
  const [canPlay, setCanPlay] = useState(priority);
  const [ready, setReady] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const playAfterLoad = useRef(false);
  const wasVisible = useRef(false);
  const startedOnce = useRef(false);

  useEffect(() => {
    const wrap = hostRef.current;
    if (!wrap) return;

    setReady(false);
    setNeedsTap(false);
    playAfterLoad.current = false;
    wasVisible.current = false;
    startedOnce.current = false;

    if (priority) {
      setCanPlay(true);
      return;
    }

    if (prefersReducedMotion()) {
      setCanPlay(false);
      return;
    }

    // Legacy: large desktop file only — require tap on phones. The sources are
    // in the DOM either way; preload="none" means the tap is what spends bytes.
    if (isNarrowViewport() && !mobileSrc) {
      setCanPlay(false);
      setNeedsTap(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setCanPlay(true);
          io.disconnect();
        }
      },
      { rootMargin: '120px 0px', threshold: 0.1 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [src, mobileSrc, priority]);

  useEffect(() => {
    const wrap = hostRef.current;
    const video = videoRef.current;
    if (!wrap || !video || !canPlay) return;

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
  }, [canPlay]);

  const startFromTap = () => {
    playAfterLoad.current = true;
    setNeedsTap(false);
    setCanPlay(true);
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
            aria-hidden
          />
        ) : null}
        {needsTap ? (
          <button
            type="button"
            className="demo-video-glow__play"
            onClick={startFromTap}
            aria-label={`Play ${title}`}
          >
            Play demo
          </button>
        ) : null}
        <video
          ref={videoRef}
          className="demo-video-glow__el"
          poster={poster}
          muted
          loop
          playsInline
          /* preload="none": no bytes until play(). The observer is the lazy gate. */
          preload="none"
          aria-label={title}
          tabIndex={-1}
          disablePictureInPicture
          controls={false}
          onLoadedData={() => setReady(true)}
          onCanPlay={() => setReady(true)}
        >
          {/* Narrow first: the browser takes the first matching source, so the
              mobile encode must precede the desktop fallback. */}
          {mobileSrc ? (
            <source src={mobileSrc} media="(max-width: 900px)" type="video/mp4" />
          ) : null}
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
