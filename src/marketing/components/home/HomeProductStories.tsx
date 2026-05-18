import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { productStories } from '../../data/home';
import FeatureMockupBySlug from '../FeatureMockupBySlug';
import { SectionHeading, PrimaryButton } from '../ui';
import { cn } from '@/lib/utils';

export default function HomeProductStories() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });

  useMotionValueEvent(progress, 'change', (v) => {
    if (reduce) return;
    const idx = Math.min(productStories.length - 1, Math.max(0, Math.floor(v * productStories.length)));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const story = productStories[active];

  return (
    <section
      ref={ref}
      className="home-product-stories relative border-y border-violet-100/80 bg-gradient-to-b from-white via-violet-50/30 to-white"
      style={{ height: reduce ? 'auto' : `${productStories.length * 100}vh` }}
    >
      <div
        className={cn(
          'marketing-container',
          reduce ? 'py-20 md:py-28' : 'sticky top-0 flex min-h-[100svh] flex-col justify-center py-24 md:py-28'
        )}
      >
        <SectionHeading
          eyebrow="Product depth"
          title="See what changes when WhatsApp runs on Shopify data"
          subtitle="Four outcomes Indian D2C teams care about — each module has a full feature page."
          center
          className="mb-12 md:mb-16"
        />

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-2">
            {productStories.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  'w-full rounded-2xl border px-5 py-4 text-left transition-all duration-300',
                  active === i
                    ? 'border-violet-200 bg-white shadow-lg shadow-violet-500/10'
                    : 'border-transparent bg-transparent hover:bg-white/60'
                )}
              >
                <p
                  className={cn(
                    'text-[10px] font-bold uppercase tracking-wider',
                    active === i ? 'text-[#7C3AED]' : 'text-slate-400'
                  )}
                >
                  {s.eyebrow}
                </p>
                <p
                  className={cn(
                    'mt-1 text-lg font-medium tracking-tight',
                    active === i ? 'text-[#0c1222]' : 'text-slate-500'
                  )}
                >
                  {s.title}
                </p>
                {active === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2 text-sm leading-relaxed text-slate-500"
                  >
                    {s.description}
                  </motion.p>
                )}
              </button>
            ))}

            <AnimatePresence mode="wait">
              <motion.ul
                key={story.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 space-y-2 px-1"
              >
                {story.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#7C3AED]" strokeWidth={2.5} />
                    {b}
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>

            <div className="mt-6 flex flex-wrap gap-3 px-1">
              <PrimaryButton to={`/features/${story.slug}`}>{story.cta}</PrimaryButton>
              <Link
                to="/features"
                className="inline-flex h-11 items-center gap-1 text-sm font-medium text-[#7C3AED] hover:underline"
              >
                All modules
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <div
              key={story.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <FeatureMockupBySlug slug={story.slug} compact stage />
            </div>
          </AnimatePresence>
        </div>

        {reduce && (
          <div className="mt-10 space-y-16">
            {productStories.slice(1).map((s) => (
              <div key={s.id} className="overflow-hidden rounded-2xl ring-1 ring-violet-100">
                <FeatureMockupBySlug slug={s.slug} compact />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
