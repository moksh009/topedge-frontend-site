import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import StickyMoment, { type StickyMomentId } from './StickyMoment';
import { PrimaryButton } from '../ui';
import { homeStories } from '../../data/home';

/**
 * Best-first sticky sequence:
 * 1–2 revenue automation, 3–4 support + AI, 5 build flows, 6 connect stack.
 */
const STICKY_SEQUENCE: {
  id: StickyMomentId;
  title: string;
  body: string;
  cta: string;
}[] = [
  {
    id: 'cart-recovery',
    title: 'WhatsApp Abandoned Cart Recovery',
    body: 'Stop losing sales at the finish line. Automatically trigger perfectly timed WhatsApp nudges when a shopper leaves items in their cart.',
    cta: 'Start free',
  },
  {
    id: 'journey',
    title: 'Drag-and-Drop Journey Builder',
    body: 'Map out the perfect post-purchase experience on a visual canvas. Build custom automation flows based on customer behavior or purchase history.',
    cta: 'Start free',
  },
  {
    id: 'inbox',
    title: 'Shared Team Inbox for WhatsApp & IG',
    body: 'Stop juggling phones. Consolidate support into one dashboard. Your team can manage, assign, and reply to messages from a single shared inbox.',
    cta: 'Start free',
  },
  {
    id: 'ai-brain',
    title: 'Audience Segmentation & Lead Scoring',
    body: 'Not all customers are equal. Automatically score leads and segment your audience based on engagement for highly personalized broadcasts.',
    cta: 'Start free',
  },
  {
    id: 'connect',
    title: 'Automated Order & Shipping Alerts',
    body: 'Eliminate WISMO support tickets. Proactively send automated order confirmations, shipping updates, and tracking links directly to WhatsApp.',
    cta: 'Start free',
  },
];

/** Keep homeStories copy in sync when ids overlap */
const stickyStories = STICKY_SEQUENCE.map((item) => {
  const fromData = homeStories.find((s) => s.id === item.id);
  return fromData
    ? { id: item.id, title: fromData.title, body: fromData.body, cta: fromData.cta }
    : item;
});

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Yoda/Prismic-style sticky scroll: tall track, sticky viewport, panels swap on progress.
 */
export default function HomeStickyStories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reduced) return;

    const update = () => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const trackH = el.offsetHeight;
      const viewH = window.innerHeight;
      const scrollable = Math.max(1, trackH - viewH);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const next = Math.min(
        stickyStories.length - 1,
        Math.floor(progress * stickyStories.length),
      );
      setActive((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section className="home-sticky home-sticky--static" aria-label="Product moments">
        <div className="home-sticky__static">
          {stickyStories.map((story) => (
            <article key={story.id} className="home-sticky__static-card">
              <div className="home-sticky__static-copy">
                <h2 className="home-sticky__title">{story.title}</h2>
                <div className="home-sticky__line" aria-hidden />
                <p className="home-sticky__body">{story.body}</p>
                <PrimaryButton to="/signup" className="home-sticky__cta">
                  {story.cta}
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </div>
              <div className="home-sticky__static-scene">
                <StickyMoment id={story.id} active />
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={trackRef}
      className="home-sticky"
      aria-label="Product moments"
    >
      <div className="home-sticky__pin">
        <div className="home-sticky__frame">
          <div className="home-sticky__left">
            <div className="home-sticky__copy-stack">
              {stickyStories.map((story, i) => (
                <div
                  key={story.id}
                  className={`home-sticky__panel${i === active ? ' is-active' : ''}`}
                >
                  <h2 className="home-sticky__title">{story.title}</h2>
                  <div className="home-sticky__line" aria-hidden />
                  <p className="home-sticky__body">{story.body}</p>
                  <div className="home-sticky__actions">
                    <PrimaryButton to="/signup" className="home-sticky__cta">
                      {story.cta}
                      <ArrowRight className="h-4 w-4" />
                    </PrimaryButton>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="home-sticky__right">
            {stickyStories.map((story, i) => (
              <div
                key={story.id}
                className={`home-sticky__scene${i === active ? ' is-active' : ''}`}
              >
                <StickyMoment id={story.id} active={i === active} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const stickyStoryIds = STICKY_SEQUENCE.map((s) => s.id);
