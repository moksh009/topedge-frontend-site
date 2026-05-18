import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import FeatureMarketingImage from './FeatureMarketingImage';
import { cn } from '@/lib/utils';

type Props = {
  imageId: string;
  className?: string;
  priority?: boolean;
  /** Hero: subtle idle float + scroll parallax */
  hero?: boolean;
};

/** Apple-style scroll-linked product visual with optional mouse tilt. */
export default function ScrollProductVisual({ imageId, className, priority, hero }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: hero ? ['start start', 'end start'] : ['start end', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });

  const y = useTransform(smooth, [0, 1], hero ? [0, 72] : [48, -48]);
  const scale = useTransform(smooth, [0, 0.45, 1], hero ? [1, 1.02, 0.96] : [0.92, 1, 0.94]);
  const rotateX = useTransform(smooth, [0, 1], hero ? [8, -4] : [6, -6]);
  const opacity = useTransform(smooth, [0, 0.15, 0.85, 1], [0.7, 1, 1, 0.85]);

  if (reduce) {
    return (
      <div ref={ref} className={cn('relative', className)}>
        <FeatureMarketingImage imageId={imageId} priority={priority} interactive />
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={cn('relative perspective-[1200px]', className)} style={{ opacity: hero ? 1 : opacity }}>
      <motion.div
        style={{ y, scale, rotateX }}
        className={cn('origin-center will-change-transform', hero && 'marketing-hero-float')}
      >
        <div className="marketing-visual-ring relative">
          <div className="marketing-visual-shine pointer-events-none absolute inset-0 z-10 rounded-[1.25rem]" aria-hidden />
          <FeatureMarketingImage imageId={imageId} priority={priority} interactive />
        </div>
      </motion.div>
      {hero && (
        <>
          <motion.span
            className="marketing-ai-orb absolute -left-4 top-[18%] z-20 hidden h-3 w-3 rounded-full bg-violet-400 md:block"
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="marketing-ai-orb absolute -right-2 bottom-[22%] z-20 hidden h-2.5 w-2.5 rounded-full bg-purple-300 md:block"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          />
        </>
      )}
    </motion.div>
  );
}
