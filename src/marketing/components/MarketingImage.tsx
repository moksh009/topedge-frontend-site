import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  float?: boolean;
  onError?: () => void;
};

export default function MarketingImage({ src, alt, className, priority, float = true, onError }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.98]);

  return (
    <motion.div
      ref={ref}
      style={reduce || !float ? undefined : { y, scale }}
      className={cn('relative mx-auto w-full max-w-5xl', className)}
    >
      <motion.div
        animate={reduce || !float ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-violet-500/25 via-purple-400/10 to-indigo-400/15 blur-3xl"
        />
        <div className="marketing-image-frame marketing-glow relative overflow-hidden p-1.5">
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={onError}
            className="w-full rounded-[1.1rem] object-cover object-top"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
