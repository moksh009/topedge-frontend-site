import { useEffect, useState } from 'react';
import '../../../styles/demo-pixel.css';

type EventRow = {
  id: string;
  action: string;
  phone: string;
  place: string;
  tone: 'view' | 'cart' | 'scroll';
  avatar: string;
  leadId: string;
};

/** Shared lead pool — left feed + map stay in sync */
const LEADS = [
  {
    id: 'delhi',
    city: 'Delhi',
    state: 'Delhi NCR',
    action: 'Product viewed',
    phone: '+91 ···· 4402',
    place: 'Delhi, India',
    tone: 'view' as const,
    avatar: '/marketing/features/pixel-avatar-ln.png',
    x: 42,
    y: 24,
  },
  {
    id: 'mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    action: 'Added to cart',
    phone: '+91 ···· 8821',
    place: 'Mumbai, India',
    tone: 'cart' as const,
    avatar: '/marketing/features/pixel-avatar-vc.png',
    x: 28,
    y: 50,
  },
  {
    id: 'hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    action: 'Checkout started',
    phone: '+91 ···· 7611',
    place: 'Hyderabad, India',
    tone: 'cart' as const,
    avatar: '/marketing/features/pixel-avatar-aw.png',
    x: 48,
    y: 56,
  },
  {
    id: 'bengaluru',
    city: 'Bengaluru',
    state: 'Karnataka',
    action: 'Scroll depth 80%',
    phone: '+91 ···· 3190',
    place: 'Bengaluru, India',
    tone: 'scroll' as const,
    avatar: '/marketing/features/pixel-avatar-vc.png',
    x: 42,
    y: 72,
  },
  {
    id: 'kolkata',
    city: 'Kolkata',
    state: 'West Bengal',
    action: 'Product viewed',
    phone: '+91 ···· 2044',
    place: 'Kolkata, India',
    tone: 'view' as const,
    avatar: '/marketing/features/pixel-avatar-ln.png',
    x: 66,
    y: 40,
  },
] as const;

const CYCLE_MS = 3400;
const FEED_MAX = 5;
const MAP_SCALE = 1.38;

/**
 * Live pixel feed — smooth pan/zoom camera + inward lead cards.
 */
export default function DemoPixelTrackingUi({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);
  const [feedCount, setFeedCount] = useState(1);
  const lead = LEADS[active];

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % LEADS.length);
      setTick((t) => t + 1);
      setFeedCount((n) => Math.min(FEED_MAX, n + 1));
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  const feed: EventRow[] = Array.from({ length: feedCount }, (_, i) => {
    const idx = (active - i + LEADS.length) % LEADS.length;
    const item = LEADS[idx];
    return {
      id: `${item.id}-${tick - i}`,
      action: item.action,
      phone: item.phone,
      place: item.place,
      tone: item.tone,
      avatar: item.avatar,
      leadId: item.id,
    };
  });

  /*
   * Fixed transform-origin (center) so CSS can interpolate smoothly.
   * Pan so the active pin drifts toward the frame center, then scale.
   */
  const mapStyle = {
    transform: `translate(${50 - lead.x}%, ${52 - lead.y}%) scale(${MAP_SCALE})`,
    transformOrigin: '50% 50%',
  };

  return (
    <div
      className={['demo-pixel', 'demo-video-glow', className].filter(Boolean).join(' ')}
      data-glow="violet"
      aria-hidden
    >
      <div className="demo-pixel__panel demo-video-glow__frame is-ready">
        <div className="demo-pixel__bg" aria-hidden>
          <span className="demo-pixel__bg-orb demo-pixel__bg-orb--a" />
          <span className="demo-pixel__bg-orb demo-pixel__bg-orb--b" />
          <span className="demo-pixel__bg-orb demo-pixel__bg-orb--c" />
        </div>

        <div className="demo-pixel__body">
          <section className="demo-pixel__card demo-pixel__card--events">
            <div className="demo-pixel__card-head">
              <h3 className="demo-pixel__card-title">Live visitor events</h3>
              <span className="demo-pixel__card-meta">
                <span className="demo-pixel__live-dot" />
                Matched to WhatsApp
              </span>
            </div>
            <ul className="demo-pixel__list">
              {feed.map((row, i) => (
                <li
                  key={row.id}
                  className={`demo-pixel__row${i === 0 ? ' is-fresh' : ''}`}
                  data-tone={row.tone}
                >
                  <img
                    className="demo-pixel__avatar"
                    src={row.avatar}
                    alt=""
                    width={48}
                    height={48}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="demo-pixel__row-main">
                    <p className="demo-pixel__row-action">{row.action}</p>
                    <p className="demo-pixel__row-phone">{row.phone}</p>
                    <p className="demo-pixel__row-place">{row.place}</p>
                  </div>
                  <span className="demo-pixel__row-time">
                    {i === 0 ? 'Just now' : `${i * 2} min ago`}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="demo-pixel__card demo-pixel__card--stream">
            <div className="demo-pixel__card-head">
              <h3 className="demo-pixel__card-title">India activity</h3>
              <span className="demo-pixel__card-meta">
                <span className="demo-pixel__live-dot" />
                {lead.state}
              </span>
            </div>

            <div className="demo-pixel__india">
              <div className="demo-pixel__india-stage" style={mapStyle}>
                <img
                  className="demo-pixel__india-img"
                  src="/marketing/features/india-outline.png?v=4"
                  alt=""
                  width={420}
                  height={560}
                  loading="lazy"
                  decoding="async"
                />

                {LEADS.map((item) => {
                  const isActive = item.id === lead.id;
                  const side = item.x >= 55 ? 'left' : 'right';
                  const vertical = item.y <= 28 ? 'below' : 'above';
                  return (
                    <div
                      key={item.id}
                      className={`demo-pixel__pin${isActive ? ' is-active' : ''}`}
                      style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    >
                      <span className="demo-pixel__pin-pulse" />
                      <span className="demo-pixel__pin-marker" aria-hidden>
                        <svg viewBox="0 0 24 32" width="18" height="24">
                          <path
                            d="M12 0C5.9 0 1 4.9 1 11c0 7.4 9.2 18.6 10.3 19.9a0.9 0.9 0 0 0 1.4 0C13.8 29.6 23 18.4 23 11 23 4.9 18.1 0 12 0z"
                            fill="#7c3aed"
                          />
                          <circle cx="12" cy="11" r="4.2" fill="#fff" />
                        </svg>
                      </span>
                      {isActive ? (
                        <div
                          className={`demo-pixel__popup demo-pixel__popup--${side} demo-pixel__popup--${vertical}`}
                          key={`${item.id}-${tick}`}
                        >
                          <p className="demo-pixel__popup-city">{item.city}</p>
                          <p className="demo-pixel__popup-state">{item.state}</p>
                          <p className="demo-pixel__popup-action">{item.action}</p>
                          <p className="demo-pixel__popup-phone">{item.phone}</p>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
