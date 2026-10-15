import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

/**
 * The strip above the navbar, on every marketing page.
 *
 * Three jobs, in this order: say what changed, say what it is worth, and give
 * one place to click. The struck-through phrase is the old shape of the
 * problem and the bold one is what replaces it, which is the whole argument in
 * four words; everything after the arrow is the action.
 *
 * It is dismissible and the dismissal sticks, because a bar a reader has
 * already closed and which comes back on the next page is an advert, not an
 * announcement. The key carries the message so that changing the copy brings
 * the bar back for people who closed the old one.
 */
const MESSAGE_KEY = 'te:ann:d2c-suite-trial';

/** Published height, so page padding can clear a fixed header that grew. */
function useAnnouncementHeight(ref: React.RefObject<HTMLDivElement>, shown: boolean) {
  useEffect(() => {
    const root = document.documentElement;
    if (!shown) {
      root.classList.remove('mkt-has-ann');
      root.style.removeProperty('--mkt-ann-h');
      return;
    }
    root.classList.add('mkt-has-ann');
    const el = ref.current;
    if (!el) return;
    const publish = () => root.style.setProperty('--mkt-ann-h', `${Math.round(el.offsetHeight)}px`);
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.classList.remove('mkt-has-ann');
      root.style.removeProperty('--mkt-ann-h');
    };
  }, [ref, shown]);
}

export default function MarketingAnnouncement() {
  // Read synchronously, not in an effect. The prerendered HTML already
  // contains the strip (the prerenderer captures the hydrated DOM), so a
  // first render that said "hidden" would tear it out and the effect would
  // put it back: a flash and two layout shifts on every page load. The
  // prerender runs in a real browser with empty storage, so it bakes in the
  // strip; index.html undoes that before paint for anyone who closed it.
  const [shown, setShown] = useState(() => {
    try {
      return window.localStorage.getItem(MESSAGE_KEY) !== '1';
    } catch {
      // private mode, blocked storage: show the strip rather than lose it
      return true;
    }
  });
  const ref = useRef<HTMLDivElement>(null);

  useAnnouncementHeight(ref, shown);

  if (!shown) return null;

  return (
    <div ref={ref} className="mkt-ann" role="region" aria-label="Announcement">
      <p className="mkt-ann__text">
        <s>Multiple Apps</s> <strong>Complete D2C Suite</strong>{' '}
        <span className="mkt-ann__arrow" aria-hidden="true">&rarr;</span>{' '}
        <Link className="mkt-ann__link" to="/pricing">
          Signup 14-days trial
        </Link>{' '}
        to access everything.
      </p>
      <button
        type="button"
        className="mkt-ann__close"
        aria-label="Dismiss announcement"
        onClick={() => {
          setShown(false);
          try {
            window.localStorage.setItem(MESSAGE_KEY, '1');
          } catch {
            // nothing to do: it closes for this page view either way
          }
        }}
      >
        <X strokeWidth={2.25} aria-hidden />
      </button>
    </div>
  );
}
