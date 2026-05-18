import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

export { GraphicScene, FlowConnectors, SceneNode, ConnectorHub } from './connectors';
export type { ConnectorLink, Point } from './connectors';

export function GraphicCanvas({
  children,
  className,
  variant = 'violet',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'violet' | 'plum' | 'dawn' | 'night' | 'aurora';
}) {
  const bg =
    variant === 'plum'
      ? 'from-[#3b0764] via-[#6d28d9] to-[#c4b5fd]'
      : variant === 'dawn'
        ? 'from-[#5b21b6] via-[#8b5cf6] to-[#fde68a]'
        : variant === 'night'
          ? 'from-[#1e1b4b] via-[#5b21b6] to-[#7c3aed]'
          : variant === 'aurora'
            ? 'from-[#312e81] via-[#7c3aed] to-[#ec4899]'
            : 'from-[#4c1d95] via-[#7c3aed] to-[#ddd6fe]';

  return (
    <div
      className={cn(
        'marketing-graphic-canvas group/graphic relative mx-auto w-full max-w-6xl overflow-hidden rounded-[1.75rem] md:rounded-[2rem]',
        'shadow-[0_48px_100px_-32px_rgba(91,33,182,0.55)]',
        className
      )}
    >
      <div aria-hidden className={cn('absolute inset-0 bg-gradient-to-br', bg)} />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.32]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.16) 1px, transparent 0)',
          backgroundSize: '26px 26px',
        }}
      />
      <div aria-hidden className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/18 blur-3xl" />
      <div aria-hidden className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-violet-950/30 blur-3xl" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent"
      />
      <div className="relative p-6 md:p-10">{children}</div>
    </div>
  );
}

export function FloatCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/70 bg-white/[0.98] p-4 shadow-[0_24px_56px_-18px_rgba(15,23,42,0.4)] backdrop-blur-xl md:p-5',
        className
      )}
    >
      {children}
    </div>
  );
}

/** Frosted panel on gradient — for hero / dashboards */
export function GlassPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/20 bg-white/10 p-4 shadow-inner shadow-white/5 backdrop-blur-xl md:p-5',
        className
      )}
    >
      {children}
    </div>
  );
}

export function GlassNode({
  icon: Icon,
  label,
  className,
}: {
  icon: LucideIcon;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center gap-2.5', className)}>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/50 bg-white/20 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.25)] backdrop-blur-md md:h-16 md:w-16">
        <Icon className="h-6 w-6 text-white md:h-7 md:w-7" strokeWidth={2} />
      </div>
      <span className="max-w-[100px] text-center text-[11px] font-semibold leading-tight tracking-tight text-white md:text-xs">
        {label}
      </span>
    </div>
  );
}

export function Pill({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold',
        active ? 'bg-white text-[#6d28d9]' : 'bg-white/20 text-white'
      )}
    >
      {children}
    </span>
  );
}
