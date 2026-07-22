import { Fragment, type ComponentType } from 'react';

type IconComp = ComponentType<{ className?: string; strokeWidth?: number }>;

/** Structured row: icon + bold label + value + optional trail chip */
export function FsSRow({
  icon: Icon,
  label,
  value,
  trail,
  trailTone,
}: {
  icon?: IconComp;
  label: string;
  value?: string;
  trail?: string;
  trailTone?: 'ok' | 'muted';
}) {
  return (
    <div className="fs-srow">
      {Icon ? (
        <span className="fs-srow__icon">
          <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
        </span>
      ) : null}
      <div className="fs-srow__body">
        <span className="fs-srow__label">{label}</span>
        {value ? <span className="fs-srow__value">{value}</span> : null}
      </div>
      {trail ? (
        <span className={`fs-srow__trail${trailTone ? ` is-${trailTone}` : ''}`}>{trail}</span>
      ) : null}
    </div>
  );
}

/** Connected node flow: icon tiles + thin line + junction dots */
export function FsCFlow({
  nodes,
  activeIndex,
  row = false,
}: {
  nodes: { icon: IconComp; label: string }[];
  activeIndex?: number;
  row?: boolean;
}) {
  return (
    <div className={`fs-cflow${row ? ' fs-cflow--row' : ''}`}>
      {nodes.map((n, i) => {
        const Icon = n.icon;
        return (
          <Fragment key={n.label}>
            {i > 0 ? <div className="fs-cflow__link" aria-hidden /> : null}
            <div className={`fs-cnode${i === activeIndex ? ' is-active' : ''}`}>
              <span className="fs-cnode__tile">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="fs-cnode__label">{n.label}</span>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

export function FsStepper({
  total,
  current,
  label,
}: {
  total: number;
  current: number;
  label?: string;
}) {
  return (
    <div className="fs-stepper">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const state = step < current ? 'is-done' : step === current ? 'is-active' : '';
        return <span key={step} className={`fs-stepper__seg ${state}`} />;
      })}
      {label ? <span className="fs-stepper__meta">{label}</span> : null}
    </div>
  );
}
