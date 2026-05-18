import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import FeatureMarketingImage from './FeatureMarketingImage';
import { getImageIdForSlug } from '../data/slugToGraphic';
import { cn } from '@/lib/utils';

type Size = 'hero' | 'section' | 'card' | 'thumb';

const sizeClass: Record<Size, string> = {
  hero: 'max-w-5xl',
  section: 'max-w-2xl',
  card: 'max-w-full',
  thumb: 'max-w-full',
};

type Props = {
  slug?: string;
  imageId?: string;
  className?: string;
  size?: Size;
  variant?: number;
  label?: string;
  /** 3D mouse tilt — off for nested cards (use simple lift instead) */
  tilt?: boolean;
};

export default function InteractiveGraphicPanel({
  slug,
  imageId: imageIdProp,
  className,
  size = 'section',
  variant = 0,
  label,
  tilt = true,
}: Props) {
  const imageId = imageIdProp ?? (slug ? getImageIdForSlug(slug) : 'hero-dashboard');
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 90, damping: 32, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const rotateX = useTransform(springY, [-0.5, 0.5], [3.5, -3.5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3.5, 3.5]);

  const cropShift = variant % 3;
  const cropClass =
    cropShift === 1 ? 'feature-graphic-crop-mid' : cropShift === 2 ? 'feature-graphic-crop-low' : 'feature-graphic-crop-top';

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!tilt || reduce) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      x.set((e.clientX - r.left) / r.width - 0.5);
      y.set((e.clientY - r.top) / r.height - 0.5);
    },
    [tilt, reduce, x, y]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const useTilt = tilt && !reduce;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={useTilt ? { rotateX, rotateY, transformPerspective: 1400 } : undefined}
      whileHover={!useTilt ? { y: -3 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className={cn(
        'feature-graphic-panel group relative mx-auto w-full',
        useTilt && 'perspective-[1400px]',
        sizeClass[size],
        className
      )}
    >
      {label && (
        <span className="absolute left-4 top-4 z-20 rounded-full bg-black/40 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          {label}
        </span>
      )}
      <motion.div
        className={cn(
          'relative overflow-hidden rounded-[1.25rem]',
          'shadow-[0_20px_50px_-18px_rgba(124,58,237,0.35)]',
          'transition-shadow duration-300 group-hover:shadow-[0_28px_60px_-16px_rgba(124,58,237,0.42)]'
        )}
      >
        <div className={cn('feature-graphic-crop', cropClass)}>
          <FeatureMarketingImage imageId={imageId} interactive={false} preferGraphic />
        </div>
      </motion.div>
    </motion.div>
  );
}
