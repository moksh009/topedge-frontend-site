import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import DemoDashboardFrame from './demo/DemoDashboardFrame';
import DemoProductVideoFrame from './demo/DemoProductVideoFrame';

type Story = {
  id: string;
  /** Dashboard iframe path — ignored when `videoSrc` is set */
  path?: string;
  /** Local MP4 in the desktop chrome instead of the live iframe */
  videoSrc?: string;
  titleLead: string;
  titleAccent: string;
  body: string;
  glow: 'violet' | 'emerald' | 'sky' | 'amber' | 'rose' | 'indigo';
};

const STORIES: Story[] = [
  {
    id: 'cart-recovery',
    videoSrc: '/abandoncart.mp4',
    titleLead: 'WhatsApp Abandoned',
    titleAccent: 'Cart Recovery',
    body: 'Recover checkouts with timed WhatsApp nudges the moment a shopper leaves items behind.',
    glow: 'emerald',
  },
  {
    id: 'journey-cod',
    videoSrc: '/cod-to-prepaid-edited.mp4',
    titleLead: 'Drag-and-Drop',
    titleAccent: 'Journey Builder',
    body: 'Build COD → prepaid recovery on a visual canvas—wait, branch, and message from one place. Convert before it ships.',
    glow: 'violet',
  },
  {
    id: 'pixel-insights',
    path: '/store-growth-hub/insights',
    titleLead: 'Connect pixel &',
    titleAccent: 'see every visit',
    body: 'One-click connect on Shopify, then watch live product views, scroll, and carts matched to WhatsApp numbers — ready to message.',
    glow: 'sky',
  },
  {
    id: 'audience-broadcast',
    path: '/marketing-hub/campaigns',
    titleLead: 'Create campaign &',
    titleAccent: 'watch sales lift',
    body: 'Pick pixel or recharge audiences, choose a template, send the broadcast, and see attributed revenue climb as people buy.',
    glow: 'amber',
  },
  {
    id: 'stock-monitor',
    path: '/store-growth-hub/stock',
    titleLead: 'Low-Stock',
    titleAccent: 'Supplier Alerts',
    body: 'When inventory nears empty, TopEdge drafts the restock message, lets you add a supplier, and sends exactly how many units you need.',
    glow: 'rose',
  },
  {
    id: 'warranty',
    path: '/warranty-hub',
    titleLead: 'Assign Product',
    titleAccent: 'Warranty',
    body: 'Attach warranty terms to products you sell—duration, coverage, and a WhatsApp claim path customers actually use.',
    glow: 'indigo',
  },
];

/**
 * Copy rises from behind the product card; the card drifts top → bottom
 * in sync so the reveal feels smooth (parallax pair).
 */
function FeatureMoment({ story }: { story: Story }) {
  const reduceMotion = useReducedMotion();
  const flat = Boolean(reduceMotion);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Start later (section already on screen) — finish when title is well framed.
    offset: ['start 0.72', 'start 0.16'],
  });

  // Text: stay tucked, then rise clear of the card.
  const copyY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.58, 0.82, 1],
    flat ? [0, 0, 0, 0, 0] : [108, 88, 36, 8, 0]
  );
  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.28, 0.48, 0.72, 1],
    flat ? [1, 1, 1, 1, 1] : [0, 0, 0.35, 0.9, 1]
  );
  const copyScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    flat ? [1, 1, 1] : [0.965, 0.985, 1]
  );
  const copyBlur = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    flat ? [0, 0, 0, 0] : [7, 4.5, 0.8, 0]
  );
  const copyFilter = useTransform(copyBlur, (b) =>
    flat ? 'none' : `blur(${b}px)`
  );

  // Frame: sit high over the title, then ease top → bottom as copy emerges.
  const frameY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.85, 1],
    flat ? [0, 0, 0, 0, 0] : [-36, -22, 2, 16, 22]
  );
  const frameScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    flat ? [1, 1, 1] : [1.028, 1.01, 1]
  );

  return (
    <article
      ref={sectionRef}
      className="home-sticky__moment"
      data-story={story.id}
      data-glow={story.glow}
    >
      <div className="home-sticky__stage">
        <motion.div
          className="home-sticky__static-copy home-sticky__copy-layer"
          style={{
            y: copyY,
            opacity: copyOpacity,
            scale: copyScale,
            filter: copyFilter,
          }}
        >
          <h2 className="home-sticky__title">
            {story.titleLead}{' '}
            <span className="home-sticky__title-accent">{story.titleAccent}</span>
          </h2>
          <p className="home-sticky__body">{story.body}</p>
        </motion.div>

        <motion.div
          className="home-sticky__static-scene home-sticky__static-scene--iframe home-sticky__moment-scene home-sticky__frame-layer"
          style={{ y: frameY, scale: frameScale }}
        >
          <div className="home-sticky__moment-glow" aria-hidden>
            <span className="home-sticky__moment-glow__core" />
            <span className="home-sticky__moment-glow__halo" />
            <span className="home-sticky__moment-glow__wash" />
          </div>
          {story.videoSrc ? (
            <DemoProductVideoFrame
              src={story.videoSrc}
              glow={story.glow}
              title={`${story.titleLead} ${story.titleAccent} preview`}
            />
          ) : (
            <DemoDashboardFrame
              path={story.path || '/'}
              title={`${story.titleLead} ${story.titleAccent} preview`}
              caption={null}
              lazy
              lockPath
            />
          )}
        </motion.div>
      </div>
    </article>
  );
}

/**
 * Product moments — scroll-linked rise from behind each UI frame (no sticky lock).
 */
export default function HomeStickyStories() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={[
        'home-sticky',
        'home-sticky--static',
        'home-sticky--moments',
        'home-sticky--moments-flow',
        reduceMotion ? 'home-sticky--moments-static' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Product moments"
    >
      <div className="home-sticky__static">
        {STORIES.map((story) => (
          <FeatureMoment key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}
