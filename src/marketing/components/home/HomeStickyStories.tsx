import { ArrowRight } from 'lucide-react';
import type { FeatureFilmId } from './feature-films/types';
import FeatureFilm from './feature-films/FeatureFilm';
import { PrimaryButton } from '../ui';

type Story = {
  filmId: FeatureFilmId;
  titleLead: string;
  titleAccent: string;
  body: string;
  cta: string;
};

const STORIES: Story[] = [
  {
    filmId: 'cart-recovery',
    titleLead: 'WhatsApp Abandoned',
    titleAccent: 'Cart Recovery',
    body: 'Recover checkouts with timed WhatsApp nudges the moment a shopper leaves items behind.',
    cta: 'Start free',
  },
  {
    filmId: 'journey-cod',
    titleLead: 'Drag-and-Drop',
    titleAccent: 'Journey Builder',
    body: 'Build COD → prepaid recovery on a visual canvas—wait, branch, and message from one place. Convert before it ships.',
    cta: 'Start free',
  },
  {
    filmId: 'pixel-insights',
    titleLead: 'Connect pixel &',
    titleAccent: 'see every visit',
    body: 'One-click connect on Shopify, then watch live product views, scroll, and carts matched to WhatsApp numbers — ready to message.',
    cta: 'Start free',
  },
  {
    filmId: 'audience-broadcast',
    titleLead: 'Create campaign &',
    titleAccent: 'watch sales lift',
    body: 'Pick pixel or recharge audiences, choose a template, send the broadcast, and see attributed revenue climb as people buy.',
    cta: 'Start free',
  },
  {
    filmId: 'stock-monitor',
    titleLead: 'Low-Stock',
    titleAccent: 'Supplier Alerts',
    body: 'When inventory nears empty, TopEdge drafts the restock message, lets you add a supplier, and sends exactly how many units you need.',
    cta: 'Start free',
  },
  {
    filmId: 'warranty',
    titleLead: 'Assign Product',
    titleAccent: 'Warranty',
    body: 'Attach warranty terms to products you sell—duration, coverage, and a WhatsApp claim path customers actually use.',
    cta: 'Start free',
  },
];

/**
 * Product moments: centered copy + UI feature films (no cards / no edge blur).
 */
export default function HomeStickyStories() {
  return (
    <section className="home-sticky home-sticky--static" aria-label="Product moments">
      <div className="home-sticky__static">
        {STORIES.map((story) => (
          <article key={story.filmId} className="home-sticky__static-block">
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
              <FeatureFilm id={story.filmId} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

