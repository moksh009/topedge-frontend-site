import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  step: number;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

/** Gradient step card — no inner glow, subtle lift on hover only */
export default function StepVisualFrame({ step, title, subtitle, children, className }: Props) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      className={cn(
        'feature-step-visual overflow-hidden rounded-3xl',
        'shadow-[0_28px_70px_-24px_rgba(124,58,237,0.4)]',
        'ring-1 ring-violet-400/20',
        className
      )}
    >
      <div className="relative min-h-[220px] bg-gradient-to-br from-[#4c1d95] via-[#7C3AED] to-[#a78bfa] p-5 md:min-h-[240px] md:p-6">
        <div className="pointer-events-none absolute -left-10 top-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-8 bottom-4 h-28 w-28 rounded-full bg-violet-900/20 blur-2xl" aria-hidden />
        <span className="relative inline-flex rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/90">
          Step {step}
        </span>
        {title && <p className="relative mt-2 text-base font-bold text-white md:text-lg">{title}</p>}
        {subtitle && <p className="relative mt-1 text-[11px] text-white/75">{subtitle}</p>}
        <div className="relative mt-4">{children}</div>
      </div>
    </motion.div>
  );
}

export function StepInnerCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-white/20 bg-white/95 p-3.5 shadow-lg backdrop-blur-sm', className)}>
      {children}
    </div>
  );
}
