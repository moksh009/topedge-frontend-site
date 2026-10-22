import { Link } from 'react-router-dom';
import DemoProductVideoFrame from './demo/DemoProductVideoFrame';
import DemoProductImageFrame from './demo/DemoProductImageFrame';
import DemoPixelTrackingUi from './demo/DemoPixelTrackingUi';
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
  /** One line. If it needs a colon and a list, it is two features. */
  body: string;
  href: string;
  cta: string;
  glow: Glow;
} & (
  | { kind: 'video'; video: DemoVideo }
  | { kind: 'image'; image: { src: string } }
  | { kind: 'pixel' }
);

const STORIES: Story[] = [
  {
    id: 'cod-prepaid',
    titleLead: 'COD to Prepaid',
    titleAccent: 'Conversion',
    body: 'Offer UPI before the parcel leaves the warehouse, so fewer COD orders come back.',
    href: '/features/journeys',
    cta: 'See journeys',
    glow: 'violet',
    kind: 'video',
    video: FEATURE_VIDEOS.cod,
  },
  {
    id: 'shopify-tools',
    titleLead: 'Flow Builder +',
    titleAccent: 'Shopify Tools',
    body: 'Fetch an order, fix an address, cancel a shipment. Without leaving the chat.',
    href: '/features/flow-builder',
    cta: 'See Flow Builder',
    glow: 'sky',
    kind: 'video',
    video: FEATURE_VIDEOS.shopifyTools,
  },
  {
    id: 'optin-popup',
    titleLead: 'Website',
    titleAccent: 'Opt-in Tools',
    body: 'Popup, spin wheel and chat widget. Turn browsers into a consented WhatsApp list.',
    href: '/features/opt-in-tools',
    cta: 'See opt-in tools',
    glow: 'indigo',
    kind: 'video',
    video: FEATURE_VIDEOS.optin,
  },
  {
    id: 'intent-detection',
    titleLead: 'Real-time',
    titleAccent: 'Intent Detection',
    body: 'Read buying, sizing and COD signals in the chat, then route the journey that fits.',
    href: '/features/intent-detection',
    cta: 'See intent routing',
    glow: 'indigo',
    kind: 'video',
    video: FEATURE_VIDEOS.intent,
  },
  {
    id: 'segmentation',
    titleLead: 'Smart Audience',
    titleAccent: 'Segmentation',
    body: 'Cohorts from carts, COD risk and order history. Enroll them, then see what came back.',
    href: '/features/audience-crm',
    cta: 'See audiences',
    glow: 'rose',
    kind: 'video',
    video: FEATURE_VIDEOS.segmentation,
  },
  {
    id: 'abandoned-cart',
    titleLead: 'Abandoned Cart',
    titleAccent: 'Recovery',
    body: 'One nudge the moment a checkout is left behind. Two more only if it is still open.',
    href: '/features/journeys',
    cta: 'See cart recovery',
    glow: 'emerald',
    kind: 'video',
    video: FEATURE_VIDEOS.cart,
  },
  {
    id: 'website-pixel',
    titleLead: 'Website',
    titleAccent: 'Tracking Pixel',
    body: 'See who is browsing right now, matched to a WhatsApp number you can message.',
    href: '/features/analytics',
    cta: 'See the pixel',
    glow: 'violet',
    kind: 'pixel',
  },
  {
    id: 'audience-campaigns',
    titleLead: 'Custom Audience',
    titleAccent: 'Campaigns',
    body: 'Pick the audience, lock a Meta-approved template, track the revenue it earns.',
    href: '/features/campaigns',
    cta: 'See campaigns',
    glow: 'rose',
    kind: 'image',
    image: FEATURE_IMAGES.campaigns,
  },
  {
    id: 'unified-identity',
    titleLead: 'Unified Customer',
    titleAccent: 'Identity',
    body: 'Two numbers, three emails, one shopper. Every chat carries the whole order history.',
    href: '/features/audience-crm',
    cta: 'See profiles',
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
          <Link className="mkt-btn-primary home-sticky__cta-btn" to={story.href}>
            {story.cta}
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
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
              mobileSrc={story.video.mobileSrc}
              poster={story.video.poster}
              glow={story.glow}
              title={`${title} preview`}
            />
          ) : story.kind === 'pixel' ? (
            <DemoPixelTrackingUi />
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

/** Product feature moments, video or still, restart from start when in view. */
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
