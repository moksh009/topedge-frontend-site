import { Link } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { ComponentProps, MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { easeOut } from '../constants/motion';

export function Section({
  className,
  children,
  id,
  subtle,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
  subtle?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-20 md:py-28',
        subtle ? 'marketing-section-subtle' : 'bg-white',
        className
      )}
    >
      <div className="marketing-container relative">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#7C3AED]/80',
        className
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  center = true,
  className,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('mb-12 md:mb-16', center && 'mx-auto max-w-3xl text-center', className)}>
      {eyebrow && <Eyebrow className={center ? 'text-center' : ''}>{eyebrow}</Eyebrow>}
      <h2 className="text-[1.875rem] leading-[1.1] tracking-[-0.035em] text-[#0c1222] md:text-[2.5rem] lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-slate-500 md:mt-5 md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function MagneticWrap({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const bg = useMotionTemplate`radial-gradient(140px circle at ${x}px ${y}px, rgba(124,58,237,0.14), transparent 70%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={cn('group relative inline-flex overflow-hidden rounded-full', className)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: bg }}
      />
      {children}
    </motion.div>
  );
}

export function PrimaryButton({
  children,
  to,
  href,
  className,
}: {
  children: React.ReactNode;
  to?: string;
  href?: string;
  className?: string;
}) {
  const cls = cn(
    'group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-sm font-medium text-white',
    'marketing-btn-gradient transition-all duration-200',
    className
  );
  const inner = (
    <>
      <span className="marketing-shine pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="relative">{children}</span>
      <ArrowRight className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </>
  );

  if (href) {
    return (
      <MagneticWrap>
        <a href={href} className={cls}>
          {inner}
        </a>
      </MagneticWrap>
    );
  }
  return (
    <MagneticWrap>
      <Link to={to || '/signup'} className={cls}>
        {inner}
      </Link>
    </MagneticWrap>
  );
}

export function SecondaryButton({
  children,
  to,
  onClick,
}: {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
}) {
  const cls = cn(
    'inline-flex h-11 items-center justify-center gap-2 rounded-full px-7 text-sm font-medium text-slate-700',
    'border border-violet-200/80 bg-white',
    'transition-all duration-200 hover:border-violet-300 hover:bg-violet-50/50 hover:text-[#7C3AED]'
  );
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cls}>
        {children}
      </button>
    );
  }
  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
      <Link to={to || '/booking'} className={cls}>
        {children}
      </Link>
    </motion.div>
  );
}

export function MarketingCard({
  children,
  className,
  hover = true,
  ...props
}: ComponentProps<typeof motion.div> & { children: React.ReactNode; hover?: boolean }) {
  return (
    <motion.div
      whileHover={hover ? { y: -3 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className={cn(
        'marketing-card-interactive rounded-2xl border border-slate-200/80 bg-white p-6 md:p-7',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <motion.div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white text-[#7C3AED]">
      {children}
    </motion.div>
  );
}

export function StatusBadge({
  tone,
  children,
}: {
  tone: 'slate' | 'amber' | 'emerald' | 'rose';
  children: React.ReactNode;
}) {
  const tones = {
    slate: 'bg-slate-100 text-slate-600',
    amber: 'bg-amber-50 text-amber-800',
    emerald: 'bg-emerald-50 text-emerald-800',
    rose: 'bg-rose-50 text-rose-800',
  };
  return (
    <span className={cn('rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide', tones[tone])}>
      {children}
    </span>
  );
}

export function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      className="mx-auto max-w-3xl divide-y divide-slate-200/80 border-y border-slate-200/80"
    >
      {items.map((item) => (
        <FaqItem key={item.q} q={item.q} a={item.a} />
      ))}
    </motion.div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
      <details className="group py-5 md:py-6 open:bg-violet-50/30">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] text-[#0c1222] marker:content-none [&::-webkit-details-marker]:hidden">
          <span>{q}</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
        </summary>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">{a}</p>
      </details>
    </motion.div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="marketing-hero-bg marketing-page-hero border-b border-violet-100/80">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="marketing-container max-w-3xl text-center"
      >
        {eyebrow && <Eyebrow className="text-center">{eyebrow}</Eyebrow>}
        <h1 className="text-[2.25rem] leading-[1.08] tracking-[-0.04em] text-[#0c1222] md:text-5xl lg:text-[3.25rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">{subtitle}</p>
        )}
        {children && <div className="mt-8 flex flex-col items-center gap-4">{children}</div>}
      </motion.div>
    </header>
  );
}
