import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { homeFeatureBlocks } from '../../data/home';
import FeatureMarketingImage from '../FeatureMarketingImage';
import { cn } from '@/lib/utils';

export default function HomeFeatureGallery() {
  return (
    <section className="home-feature-gallery" id="features" aria-labelledby="home-features-heading">
      <div className="marketing-container home-feature-gallery-intro">
        <h2 id="home-features-heading" className="home-gallery-heading text-center">
          Everything WhatsApp needs for Shopify India
        </h2>
        <p className="home-section-lead mx-auto mt-5 max-w-2xl text-center md:text-xl">
          Twelve modules in one workspace — here are the capabilities teams use from day one.
        </p>
        <p className="mt-8 text-center">
          <Link
            to="/features"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7C3AED] transition hover:gap-2"
          >
            View all features
            <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </div>

      <div className="mt-6 md:mt-10">
        {homeFeatureBlocks.map((feature, index) => (
          <article
            key={feature.slug}
            className={cn('home-feature-block', index % 2 === 1 && 'home-feature-block--alt')}
          >
            <div className="marketing-container">
              <div className="home-feature-copy mx-auto max-w-3xl text-center">
                <p className="home-feature-eyebrow">{feature.eyebrow}</p>
                <h3 className="home-feature-title mt-4">{feature.title}</h3>
                <p className="home-feature-desc mt-5">{feature.description}</p>
                <Link
                  to={`/features/${feature.slug}`}
                  className="home-feature-link mt-8 inline-flex items-center gap-1.5"
                >
                  Explore {feature.eyebrow.replace(/\s*→.*$/, '')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="home-feature-visual mt-12 md:mt-16">
                <FeatureMarketingImage
                  imageId={feature.imageId}
                  preferGraphic
                  bare
                  className="!max-w-none"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
