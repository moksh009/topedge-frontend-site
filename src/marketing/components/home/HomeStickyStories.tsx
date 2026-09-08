import { ArrowRight } from 'lucide-react';
import type { StickyMomentId } from '../../data/productDemoVideos';
import { PRODUCT_DEMO_VIDEOS } from '../../data/productDemoVideos';
import ProductDemoVideo from './ProductDemoVideo';
import { PrimaryButton } from '../ui';
import { homeStories } from '../../data/home';

/**
 * Product moments: centered copy + full-width demo video below.
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

const stickyStories = STICKY_SEQUENCE.map((item) => {
  const fromData = homeStories.find((s) => s.id === item.id);
  return fromData
    ? { id: item.id, title: fromData.title, body: fromData.body, cta: fromData.cta }
    : item;
});

export default function HomeStickyStories() {
  return (
    <section className="home-sticky home-sticky--static" aria-label="Product moments">
      <div className="home-sticky__static">
        {stickyStories.map((story) => (
          <article key={story.id} className="home-sticky__static-card">
            <div className="home-sticky__static-copy">
              <h2 className="home-sticky__title">{story.title}</h2>
              <p className="home-sticky__body">{story.body}</p>
              <PrimaryButton to="/signup" className="home-sticky__cta">
                {story.cta}
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </div>
            <div className="home-sticky__static-scene">
              <ProductDemoVideo
                src={PRODUCT_DEMO_VIDEOS[story.id]}
                label={`${story.title} product demo`}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export const stickyStoryIds = STICKY_SEQUENCE.map((s) => s.id);
