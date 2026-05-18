import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { easeOut, fadeUp, stagger } from '../constants/motion';

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: easeOut } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-48px' }}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<'div'> & { children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className={className} {...props}>
      {children}
    </motion.div>
  );
}

export function GradientMesh({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <motion.div
        className="marketing-orb absolute -left-[20%] top-[-30%] h-[65%] w-[55%] rounded-full bg-violet-400/25 blur-[100px]"
        animate={{ opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="marketing-orb absolute -right-[15%] top-[5%] h-[50%] w-[45%] rounded-full bg-purple-300/20 blur-[90px]"
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="marketing-orb absolute bottom-[-20%] left-[30%] h-[40%] w-[40%] rounded-full bg-indigo-300/15 blur-[80px]"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <div className="absolute inset-0 marketing-grain opacity-50" />
    </div>
  );
}

export function TextGradient({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'bg-gradient-to-r from-[#7C3AED] via-[#9333ea] to-[#6d28d9] bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </span>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-violet-100/80 bg-gradient-to-b from-violet-50/60 to-white py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent md:w-28" />
      <div className="marketing-marquee flex w-max items-center gap-4">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="marketing-logo-pill whitespace-nowrap">
            <span className="marketing-logo-pill-dot" aria-hidden />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
