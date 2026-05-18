import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  subtitle?: string;
  tag?: string;
  to?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  featured?: boolean;
};

/** Compact interactive card — less copy, stronger hover. */
export default function PremiumCard({
  title,
  subtitle,
  tag,
  to,
  onClick,
  children,
  className,
  featured,
}: Props) {
  const inner = (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      className={cn(
        'marketing-premium-card group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 md:p-7',
        featured && 'md:p-8',
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-400/20 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0"
        aria-hidden
      />
      {tag && (
        <span className="relative mb-3 inline-flex w-fit rounded-full border border-violet-200/80 bg-violet-50/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#7C3AED]">
          {tag}
        </span>
      )}
      <h3 className="relative text-lg font-medium tracking-tight text-[#0c1222] md:text-xl">{title}</h3>
      {subtitle && <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-500">{subtitle}</p>}
      {children}
      {to && (
        <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#7C3AED]">
          Explore
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      )}
    </motion.article>
  );

  if (to) {
    return (
      <Link to={to} className="block h-full">
        {inner}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="block h-full w-full text-left">
        {inner}
      </button>
    );
  }
  return inner;
}
