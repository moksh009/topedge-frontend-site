import { ArrowRight } from 'lucide-react';
import type { StickyMomentId } from '../../data/productDemoVideos';
import { PRODUCT_DEMO_VIDEOS } from '../../data/productDemoVideos';
import ProductDemoVideo from './ProductDemoVideo';
import { PrimaryButton } from '../ui';

type Story = {
  id: StickyMomentId;
  /** First part of the title (neutral) */
  titleLead: string;
  /** Last phrase — rendered in brand purple */
  titleAccent: string;
  body: string;
  cta: string;
};

/**
 * Product moments: centered copy + rounded demo video (no cards / no edge blur).
 */
const STORIES: Story[] = [
  {
    id: 'cart-recovery',
    titleLead: 'WhatsApp Abandoned',
    titleAccent: 'Cart Recovery',
    body: 'Recover checkouts with timed WhatsApp nudges the moment a shopper leaves items behind.',
    cta: 'Start free',
  },
  {
    id: 'journey',
    titleLead: 'Drag-and-Drop',
    titleAccent: 'Journey Builder',
    body: 'Map post-purchase flows on a visual canvas—wait, branch, and message from one place.',
    cta: 'Start free',
  },
  {
    id: 'inbox',
    titleLead: 'Shared Team Inbox for',
    titleAccent: 'WhatsApp & IG',
    body: 'One inbox for WhatsApp and Instagram. Assign chats, reply with order context, stay aligned.',
    cta: 'Start free',
  },
  {
    id: 'ai-brain',
    titleLead: 'Audience Segmentation &',
    titleAccent: 'Lead Scoring',
    body: 'Score and segment shoppers by engagement so every broadcast reaches the right people.',
    cta: 'Start free',
  },
  {
    id: 'connect',
    titleLead: 'Automated Order &',
    titleAccent: 'Shipping Alerts',
    body: 'Send confirmations, tracking, and shipping updates on WhatsApp—cut WISMO tickets.',
    cta: 'Start free',
  },
];

export default function HomeStickyStories() {
  return (
    <section className="home-sticky home-sticky--static" aria-label="Product moments">
      <div className="home-sticky__static">
        {STORIES.map((story) => (
          <article key={story.id} className="home-sticky__static-block">
            <div className="home-sticky__static-copy">
              <h2 className="home-sticky__title">
                {story.titleLead}{' '}
                <span className="home-sticky__title-accent">{story.titleAccent}</span>
              </h2>
              <p className="home-sticky__body">{story.body}</p>
              <PrimaryButton to="/signup" className="home-sticky__cta">
                {story.cta}
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </div>
            <div className="home-sticky__static-scene">
              <ProductDemoVideo
                src={PRODUCT_DEMO_VIDEOS[story.id]}
                label={`${story.titleLead} ${story.titleAccent} product demo`}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export const stickyStoryIds = STORIES.map((s) => s.id);
