import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import DemoDashboardFrame from './demo/DemoDashboardFrame';

type Story = {
  id: string;
  path: string;
  titleLead: string;
  titleAccent: string;
  body: string;
  glow: 'violet' | 'emerald' | 'sky' | 'amber' | 'rose' | 'indigo';
};

const STORIES: Story[] = [
  {
    id: 'cart-recovery',
    path: '/store-growth-hub/abandoned-carts',
    titleLead: 'WhatsApp Abandoned',
    titleAccent: 'Cart Recovery',
    body: 'Recover checkouts with timed WhatsApp nudges the moment a shopper leaves items behind.',
    glow: 'emerald',
  },
  {
    id: 'journey-cod',
    path: '/journey-builder/demo-cod-prepaid',
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
 * Short enter-window: copy rises from behind the UI while the section
 * scrolls into place — no long sticky “stuck” runway after the reveal.
 */
function FeatureMoment({ story }: { story: Story }) {
  const reduceMotion = useReducedMotion();
  const flat = Boolean(reduceMotion);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Reveal while the section is entering the viewport — then hold.
    offset: ['start 0.95', 'start 0.42'],
  });

  const copyY = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    flat ? [0, 0, 0] : [110, 36, 0]
  );
  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    flat ? [1, 1, 1] : [0, 0.8, 1]
  );
  const frameY = useTransform(
    scrollYProgress,
    [0, 1],
    flat ? [0, 0] : [40, 0]
  );
  const frameScale = useTransform(
    scrollYProgress,
    [0, 1],
    flat ? [1, 1] : [0.965, 1]
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
          style={{ y: copyY, opacity: copyOpacity }}
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
          <DemoDashboardFrame
            path={story.path}
            title={`${story.titleLead} ${story.titleAccent} preview`}
            caption={null}
            lazy
            lockPath
          />
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
