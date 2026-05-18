import { motion, useTransform, type MotionValue } from 'framer-motion';
import { heroStats, platformPills } from '../../data/home';
import { Zap, MessageCircle, ShoppingBag, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const pillIcons = [Zap, MessageCircle, ShoppingBag, Shield];

type Props = {
  progress: MotionValue<number>;
};

/** Stats + pills choreographed on scroll — float up from product, dock at bottom */
export function HomeHeroScrollStats({ progress }: Props) {
  const containerOpacity = useTransform(progress, [0.55, 0.72, 0.95], [0, 1, 1]);
  const containerY = useTransform(progress, [0.55, 0.85], [48, 0]);

  return (
    <div
      style={{ opacity: containerOpacity, y: containerY }}
      className="marketing-container relative z-20 mt-8 max-w-5xl"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {heroStats.map((s, i) => (
          <ScrollStatCard key={s.label} stat={s} index={i} progress={progress} />
        ))}
      </div>
    </div>
  );
}

function ScrollStatCard({
  stat,
  index,
  progress,
}: {
  stat: { value: string; label: string };
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.12 + index * 0.06;
  const opacity = useTransform(progress, [start, start + 0.2], [0, 1]);
  const y = useTransform(progress, [start, start + 0.25], [80 - index * 12, 0]);
  const scale = useTransform(progress, [start, start + 0.2], [0.88, 1]);

  return (
    <div
      style={{ opacity, y, scale }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      className="marketing-premium-card rounded-2xl p-5 text-center"
    >
      <p className="bg-gradient-to-r from-[#7C3AED] to-[#6d28d9] bg-clip-text text-2xl font-black tracking-tight text-transparent md:text-3xl">
        {stat.value}
      </p>
      <p className="mt-1.5 text-[13px] text-slate-500">{stat.label}</p>
    </div>
  );
}

export function HomeHeroScrollPills({ progress }: Props) {
  const opacity = useTransform(progress, [0.68, 0.82], [0, 1]);
  const y = useTransform(progress, [0.68, 0.85], [24, 0]);

  return (
    <div
      style={{ opacity, y }}
      className="marketing-container mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-2"
    >
      {platformPills.map((pill, i) => {
        const Icon = pillIcons[i] ?? Zap;
        return (
          <motion.span
            key={pill.label}
            whileHover={{ y: -3, scale: 1.04 }}
            className={cn(
              'inline-flex cursor-default items-center gap-2 rounded-full px-3.5 py-2 text-[13px] transition-shadow duration-300',
              pill.highlight
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#6d28d9] text-white shadow-md shadow-violet-500/25'
                : 'border border-violet-200/60 bg-white/90 text-slate-600 hover:border-violet-300 hover:shadow-md hover:shadow-violet-500/10'
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {pill.label}
          </motion.span>
        );
      })}
    </div>
  );
}
