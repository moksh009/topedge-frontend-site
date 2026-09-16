import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import DemoProductVideoFrame from './demo/DemoProductVideoFrame';
import { demoAssetFor } from '../../data/productDemoVideos';

type Story = {
  id: string;
  demoId: string;
  titleLead: string;
  titleAccent: string;
  body: string;
  glow: 'violet' | 'emerald' | 'sky' | 'amber' | 'rose' | 'indigo';
};

const STORIES: Story[] = [
  {
    id: 'cart-recovery',
    demoId: 'cart-recovery',
    titleLead: 'WhatsApp Abandoned',
    titleAccent: 'Cart Recovery',
    body: 'Recover checkouts with timed WhatsApp nudges the moment a shopper leaves items behind.',
    glow: 'emerald',
  },
  {
    id: 'journey-cod',
    demoId: 'journey',
    titleLead: 'Drag-and-Drop',
    titleAccent: 'Journey Builder',
    body: 'Build COD → prepaid recovery on a visual canvas—wait, branch, and message from one place. Convert before it ships.',
    glow: 'violet',
  },
  {
    id: 'pixel-insights',
    demoId: 'cart-recovery',
    titleLead: 'Connect pixel &',
    titleAccent: 'see every visit',
    body: 'One-click connect on Shopify, then watch live product views, scroll, and carts matched to WhatsApp numbers — ready to message.',
    glow: 'sky',
  },
  {
    id: 'audience-broadcast',
    demoId: 'cart-recovery',
    titleLead: 'Create campaign &',
    titleAccent: 'watch sales lift',
    body: 'Pick pixel or recharge audiences, choose a template, send the broadcast, and see attributed revenue climb as people buy.',
    glow: 'amber',
  },
  {
    id: 'stock-monitor',
    demoId: 'cart-recovery',
    titleLead: 'Low-Stock',
    titleAccent: 'Supplier Alerts',
    body: 'When inventory nears empty, TopEdge drafts the restock message, lets you add a supplier, and sends exactly how many units you need.',
    glow: 'rose',
  },
  {
    id: 'warranty',
    demoId: 'cart-recovery',
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
  const demo = demoAssetFor(story.demoId);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.72', 'start 0.16'],
  });

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

  /* Keep the video visually stable — old -36px lift fought Lenis and felt like a jump */
  const frameY = useTransform(scrollYProgress, [0, 1], flat ? [0, 0] : [0, 10]);

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
          style={{ y: frameY }}
        >
          <div className="home-sticky__moment-glow" aria-hidden>
            <span className="home-sticky__moment-glow__core" />
            <span className="home-sticky__moment-glow__halo" />
            <span className="home-sticky__moment-glow__wash" />
          </div>
          <DemoProductVideoFrame
            src={demo.src}
            poster={demo.poster}
            glow={story.glow}
            title={`${story.titleLead} ${story.titleAccent} preview`}
          />
        </motion.div>
      </div>
    </article>
  );
}

/**
 * Product moments — scroll-linked rise from behind each UI frame (no sticky lock).
 * Video demos only — no live dashboard iframe.
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
