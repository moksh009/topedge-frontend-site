import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function AnimationFrame({
  children,
  className,
  label = 'Live preview',
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        'feature-animation-frame relative overflow-hidden rounded-[1.75rem] border border-violet-200/70 bg-gradient-to-br from-[#5b21b6] via-[#7C3AED] to-[#a78bfa] p-1 shadow-[0_32px_80px_-20px_rgba(124,58,237,0.45)]',
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/20 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
        </span>
        <span className="mx-auto text-[10px] font-medium tracking-wide text-white/70">app.topedge.ai</span>
        <span className="feature-live-badge inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
          <span className="feature-live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {label}
        </span>
      </div>
      <div className="relative bg-slate-50/95">{children}</div>
    </div>
  );
}

export function AnimMessage({
  children,
  side,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  side: 'in' | 'out';
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const base = cn(
    'max-w-[88%] rounded-2xl px-3 py-2 text-[11px] leading-snug',
    side === 'in'
      ? 'rounded-tl-sm bg-[#e7f8ef] text-slate-700'
      : 'ml-auto rounded-tr-sm bg-white text-slate-700 shadow-sm ring-1 ring-slate-100',
    className
  );

  if (reduce) return <div className={base}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={base}
    >
      {children}
    </motion.div>
  );
}

export function TypingDots() {
  return (
    <div className="inline-flex gap-1 rounded-2xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-slate-100">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-slate-400"
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export function PulseRing({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.span
      className={cn('absolute inset-0 rounded-full border-2 border-[#7C3AED]/40', className)}
      animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}
