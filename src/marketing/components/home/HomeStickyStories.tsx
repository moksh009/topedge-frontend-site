import DemoProductVideoFrame from './demo/DemoProductVideoFrame';
import DemoProductImageFrame from './demo/DemoProductImageFrame';
import {
  FEATURE_VIDEOS,
  FEATURE_IMAGES,
  type DemoVideo,
} from '../../data/homeFeatureMedia';

type Glow = 'violet' | 'emerald' | 'sky' | 'amber' | 'rose' | 'indigo';

type Story = {
  id: string;
  titleLead: string;
  titleAccent: string;
  body: string;
  glow: Glow;
} & (
  | { kind: 'video'; video: DemoVideo }
  | { kind: 'image'; image: { src: string } }
);

const STORIES: Story[] = [
  // Videos first
  {
    id: 'abandoned-cart',
    titleLead: 'Abandoned Cart',
    titleAccent: 'Workflow',
    body: 'Recover checkouts with timed WhatsApp nudges the moment a shopper leaves items behind.',
    glow: 'emerald',
    kind: 'video',
    video: FEATURE_VIDEOS.cart,
  },
  {
    id: 'cod-prepaid',
    titleLead: 'COD → Prepaid',
    titleAccent: 'Conversion',
    body: 'Convert cash-on-delivery checkouts to prepaid on a visual canvas—wait, branch, and message before it ships.',
    glow: 'violet',
    kind: 'video',
    video: FEATURE_VIDEOS.cod,
  },
  {
    id: 'shopify-tools',
    titleLead: 'Flow Builder +',
    titleAccent: 'Shopify Tools',
    body: 'Build WhatsApp flows that fetch orders, update addresses, cancel shipments, and hand off to support—automation that already knows the cart and the SKU.',
    glow: 'sky',
    kind: 'video',
    video: FEATURE_VIDEOS.shopifyTools,
  },
  {
    id: 'optin-popup',
    titleLead: 'Website Opt-in',
    titleAccent: 'Popup Builder',
    body: 'Design exit-intent and discount popups that capture WhatsApp numbers without breaking your theme.',
    glow: 'indigo',
    kind: 'video',
    video: FEATURE_VIDEOS.optin,
  },
  {
    id: 'segmentation',
    titleLead: 'Smart Audience',
    titleAccent: 'Segmentation',
    body: 'Build cohorts from carts, COD risk, and purchase history — then enroll journeys and measure attributed revenue in one list.',
    glow: 'rose',
    kind: 'video',
    video: FEATURE_VIDEOS.segmentation,
  },
  {
    id: 'intent-detection',
    titleLead: 'Real-time',
    titleAccent: 'Intent Detection',
    body: 'Read purchase, size, and COD signals in WhatsApp — then route the right journey before the shopper goes cold.',
    glow: 'indigo',
    kind: 'video',
    video: FEATURE_VIDEOS.intent,
  },
  {
    id: 'website-pixel',
    titleLead: 'Website Detailed',
    titleAccent: 'Tracking Pixel',
    body: 'Watch live product views, scroll, and carts matched to WhatsApp numbers — ready to message.',
    glow: 'amber',
    kind: 'video',
    video: FEATURE_VIDEOS.pixel,
  },
  // Image features below
  {
    id: 'audience-campaigns',
    titleLead: 'Custom Audience',
    titleAccent: 'Campaigns',
    body: 'Pick pixel or recharge audiences, lock a Meta-safe template, and watch attributed revenue climb.',
    glow: 'rose',
    kind: 'image',
    image: FEATURE_IMAGES.campaigns,
  },
  {
    id: 'unified-identity',
    titleLead: 'Unified Customer',
    titleAccent: 'Identity',
    body: 'Primary + secondary numbers and multiple emails collapse into one lead — so every chat and order stays on the same shopper.',
    glow: 'violet',
    kind: 'image',
    image: FEATURE_IMAGES.unifiedIdentity,
  },
];

function FeatureMoment({ story }: { story: Story }) {
  const title = `${story.titleLead} ${story.titleAccent}`;

  return (
    <article
      className="home-sticky__moment"
      data-story={story.id}
      data-glow={story.glow}
    >
      <div className="home-sticky__stage">
        <div className="home-sticky__static-copy home-sticky__copy-layer">
          <h2 className="home-sticky__title">
            {story.titleLead}{' '}
            <span className="home-sticky__title-accent">{story.titleAccent}</span>
          </h2>
          <p className="home-sticky__body">{story.body}</p>
        </div>

        <div className="home-sticky__static-scene home-sticky__static-scene--iframe home-sticky__moment-scene home-sticky__frame-layer">
          <div className="home-sticky__moment-glow" aria-hidden>
            <span className="home-sticky__moment-glow__core" />
            <span className="home-sticky__moment-glow__halo" />
            <span className="home-sticky__moment-glow__wash" />
          </div>
          {story.kind === 'video' ? (
            <DemoProductVideoFrame
              src={story.video.src}
              poster={story.video.poster}
              glow={story.glow}
              title={`${title} preview`}
            />
          ) : (
            <DemoProductImageFrame
              src={story.image.src}
              alt={title}
              glow={story.glow}
            />
          )}
        </div>
      </div>
    </article>
  );
}

/** Product feature moments — video or still, restart from start when in view. */
export default function HomeStickyStories() {
  return (
    <section
      className="home-sticky home-sticky--static home-sticky--moments home-sticky--moments-flow home-sticky--moments-static"
      aria-label="Product features"
    >
      <div className="home-sticky__static">
        {STORIES.map((story) => (
          <FeatureMoment key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}
