import { useCallback, useEffect, useRef, useState } from 'react';

const DESKTOP_SRC = '/marketing/demos/topedge-launch.mp4';
const MOBILE_SRC = '/marketing/demos/topedge-launch-mobile.mp4';
const POSTER = '/marketing/demos/topedge-launch-poster.webp';

/** Small-screen cut is 1280x720 and ~9 MB against ~22 MB for the desktop file. */
const MOBILE_QUERY = '(max-width: 960px)';

/** Loud enough to hear, quiet enough not to make someone lunge for the tab. */
const DEFAULT_VOLUME = 0.25;

const LABEL =
  'TopEdge AI launch film: turning Shopify visitors into WhatsApp contacts and confirming COD orders before dispatch.';

function SoundOnIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H3v6h3l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5" />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H3v6h3l5 4V5z" />
      <path d="m17 9 4 6M21 9l-4 6" />
    </svg>
  );
}

/**
 * Homepage hero film.
 *
 * Autoplay policy, which shapes everything below: Chrome, Safari and Firefox all
 * refuse to start a video that has sound unless the visitor has already
 * interacted with the page (or has a high Media Engagement Index for the site).
 * Asking for `autoplay` and audio together does not get you a loud video — it
 * gets you a video that never starts at all.
 *
 * So the video starts muted, which is always allowed, and we try to turn the
 * sound on straight afterwards. Browsers that permit it (a returning visitor
 * who has played media here before) get audio at 25% immediately. Everyone else
 * gets sound on their first click, tap or keypress anywhere on the page, which
 * is the earliest moment the browser will allow it. The toggle is always
 * visible so the state is never a mystery and is always one click away.
 */
export default function HomeHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  /** True only while the component itself wants the film stopped (tab hidden,
   *  scrolled away, unmounting). Any other pause came from the browser. */
  const intentionalPause = useRef(false);
  const [src, setSrc] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const [reduced, setReduced] = useState(false);

  // Pick the file by viewport. A `media` attribute on <source> is ignored inside
  // <video>, and two <video> elements would download both files, so the choice
  // is made here, once, before anything is fetched.
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setReduced(motion.matches);
      setSrc(mq.matches ? MOBILE_SRC : DESKTOP_SRC);
    };
    apply();
    // Only react to the motion preference. Re-pointing `src` on every resize
    // would restart playback mid-watch when a phone rotates.
    motion.addEventListener('change', apply);
    return () => motion.removeEventListener('change', apply);
  }, []);

  /**
   * React does not serialise `muted` to HTML — it only ever sets the DOM
   * property. In prerendered markup that leaves `autoplay` on an unmuted
   * video, which every browser refuses to start, so the hero would sit on its
   * poster until hydration. Setting the attribute by hand fixes both the saved
   * HTML and the pre-hydration moment.
   */
  const setMutedAttr = useCallback((video: HTMLVideoElement, next: boolean) => {
    video.muted = next;
    if (next) video.setAttribute('muted', '');
    else video.removeAttribute('muted');
  }, []);

  const unmute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return false;
    video.volume = DEFAULT_VOLUME;
    setMutedAttr(video, false);
    // Safari can reject the play() that follows an unmute even when the element
    // is already playing; staying muted is better than stopping the video.
    const played = video.play();
    if (played && typeof played.catch === 'function') {
      played.catch(() => {
        setMutedAttr(video, true);
        setMuted(true);
      });
    }
    setMuted(false);
    return true;
  }, [setMutedAttr]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src || reduced) return;

    setMutedAttr(video, true);
    video.volume = DEFAULT_VOLUME;

    const started = video.play();
    if (started && typeof started.catch === 'function') started.catch(() => {});

    // Try sound immediately; most first-time visitors will be refused here.
    let armed = true;
    const tryNow = window.setTimeout(() => {
      if (!armed) return;
      setMutedAttr(video, false);
      video.volume = DEFAULT_VOLUME;
      const p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {
          setMutedAttr(video, true);
          setMuted(true);
        });
      }
      // The browser silently re-mutes when it refuses, so read it back rather
      // than trusting the assignment.
      window.setTimeout(() => setMuted(video.muted), 0);
    }, 0);

    // Earliest moment the browser will allow sound for everyone else.
    const onGesture = () => {
      if (!armed) return;
      armed = false;
      unmute();
      detach();
    };
    const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'touchstart'];
    const detach = () => {
      events.forEach((e) => window.removeEventListener(e, onGesture));
    };
    events.forEach((e) => window.addEventListener(e, onGesture, { once: false, passive: true }));

    // Mobile browsers do not reject the unmute — they accept it and then stop
    // playback, because audio without a user gesture is not allowed there.
    // Playing silently beats not playing at all, so take the sound back and
    // carry on; the gesture listener above turns it on at the first tap.
    const onPause = () => {
      if (intentionalPause.current || document.hidden) return;
      if (video.ended) return;
      if (!video.muted) {
        setMutedAttr(video, true);
        setMuted(true);
      }
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };
    video.addEventListener('pause', onPause);

    const onVisibility = () => {
      if (document.hidden) {
        intentionalPause.current = true;
        video.pause();
      } else if (video.paused) {
        intentionalPause.current = false;
        const p = video.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      armed = false;
      window.clearTimeout(tryNow);
      detach();
      video.removeEventListener('pause', onPause);
      document.removeEventListener('visibilitychange', onVisibility);
      intentionalPause.current = true;
      video.pause();
    };
  }, [src, reduced, unmute, setMutedAttr]);

  // Stop the audio once the hero is scrolled past — a film talking from
  // off-screen is the thing people actually hate about autoplaying video.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          intentionalPause.current = false;
          if (video.paused && !document.hidden) {
            const p = video.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          }
        } else {
          intentionalPause.current = true;
          video.pause();
        }
      },
      // threshold 0, not a fraction: at any non-zero threshold the hero sits
      // right on the boundary on a phone, and sub-pixel scrolling (Lenis runs
      // smooth scroll here) toggles isIntersecting continuously — which showed
      // up as the film pausing and resuming several times a second while fully
      // on screen. Pause only when it has genuinely left the viewport.
      { threshold: 0 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src, reduced]);

  /**
   * Phone-sized screens get the film full-screen on tap.
   *
   * Inline, a 16:9 film inside a 375px column is about 190px tall — too small
   * to read the product UI the film is demonstrating. iOS Safari does not
   * implement requestFullscreen on elements and exposes webkitEnterFullscreen
   * on the video instead, so both are tried.
   *
   * A tap is a user gesture, which is the one moment sound is guaranteed to be
   * allowed, so take it.
   */
  const openFullscreen = useCallback(() => {
    const video = videoRef.current as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
      | null;
    if (!video) return;
    if (!window.matchMedia(MOBILE_QUERY).matches) return;
    unmute();
    if (typeof video.requestFullscreen === 'function') {
      video.requestFullscreen().catch(() => {
        video.webkitEnterFullscreen?.();
      });
    } else {
      video.webkitEnterFullscreen?.();
    }
  }, [unmute]);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) unmute();
    else {
      setMutedAttr(video, true);
      setMuted(true);
    }
  }, [unmute, setMutedAttr]);

  return (
    <div className="home-hero__film">
      <video
        ref={videoRef}
        className="home-hero__film-el"
        poster={POSTER}
        src={src ?? undefined}
        width={1280}
        height={720}
        loop
        autoPlay
        playsInline
        preload="auto"
        aria-label={LABEL}
        onClick={openFullscreen}
      />
      {/* The tap target above is the convenience; this button is the
          accessible route — reachable by keyboard and announced by screen
          readers, which a click handler on a <video> is not. */}
      <button
        type="button"
        className="home-hero__film-expand"
        onClick={openFullscreen}
        aria-label="Play full screen"
        title="Play full screen"
      >
        <ExpandIcon />
      </button>
      {!reduced ? (
        <button
          type="button"
          className="home-hero__film-sound"
          onClick={toggle}
          aria-pressed={!muted}
          aria-label={muted ? 'Turn on sound' : 'Turn off sound'}
          title={muted ? 'Turn on sound' : 'Turn off sound'}
        >
          {muted ? <SoundOffIcon /> : <SoundOnIcon />}
          <span className="home-hero__film-sound-text">{muted ? 'Sound on' : 'Sound off'}</span>
        </button>
      ) : null}
    </div>
  );
}
