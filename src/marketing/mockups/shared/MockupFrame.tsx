import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMockupDisplay } from './MockupDisplayContext';

type Props = {
  children: React.ReactNode;
  className?: string;
  float?: boolean;
  glow?: boolean;
};

/** Premium marketing wrapper — optional violet glow + soft float */
export default function MockupFrame({ children, className, float: floatProp, glow: glowProp }: Props) {
  const reduce = useReducedMotion();
  const ctx = useMockupDisplay();
  const float = floatProp ?? ctx.float;
  const glow = glowProp ?? ctx.glow;

  return (
    <motion.div
      animate={reduce || !float ? undefined : { y: [0, -4, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      className={cn('relative mx-auto w-full max-w-5xl', className)}
    >
      {glow && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-violet-400/20 via-violet-300/8 to-transparent blur-2xl"
        />
      )}
      <div
        className={cn(
          'relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_32px_80px_-16px_rgba(124,58,237,0.22)]',
          !glow && 'rounded-none border-0 shadow-none'
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
