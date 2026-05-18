import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

export type Point = { x: number; y: number };

export type ConnectorLink = {
  from: Point;
  to: Point;
  curved?: boolean;
};

function pathD(from: Point, to: Point, curved?: boolean) {
  if (curved) {
    const mx = (from.x + to.x) / 2;
    return `M ${from.x} ${from.y} C ${mx} ${from.y}, ${mx} ${to.y}, ${to.x} ${to.y}`;
  }
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
}

/** Scene wrapper — hover animates dashed flow lines */
export function GraphicScene({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('graphic-scene relative min-h-[340px] w-full md:min-h-[420px]', className)}>
      {children}
    </div>
  );
}

export function FlowConnectors({ links }: { links: ConnectorLink[] }) {
  return (
    <svg
      className="graphic-connectors pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {links.map((link, i) => {
        const d = pathD(link.from, link.to, link.curved);
        return (
          <g key={i}>
            <path d={d} className="graphic-connector-base" />
            <path d={d} className="graphic-connector-anim" />
            <circle cx={link.from.x} cy={link.from.y} r="0.85" className="graphic-connector-dot" />
            <circle cx={link.to.x} cy={link.to.y} r="0.85" className="graphic-connector-dot" />
          </g>
        );
      })}
    </svg>
  );
}

/** Position nodes on the 0–100 scene grid */
export function SceneNode({
  x,
  y,
  children,
  className,
  width = 'auto',
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  className?: string;
  width?: string;
}) {
  return (
    <div
      className={cn('graphic-scene-node absolute z-10', className)}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        width: width === 'auto' ? undefined : width,
      }}
    >
      {children}
    </div>
  );
}

export function ConnectorHub({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/55 bg-white/25 shadow-lg shadow-black/10 backdrop-blur-md md:h-14 md:w-14">
        <Icon className="h-5 w-5 text-white md:h-6 md:w-6" strokeWidth={2.2} />
      </div>
      <span className="max-w-[88px] text-center text-[10px] font-semibold leading-tight text-white md:text-[11px]">
        {label}
      </span>
    </div>
  );
}
