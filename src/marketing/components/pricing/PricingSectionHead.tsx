import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function PricingSectionHead({
  eyebrow,
  title,
  highlight,
  sub,
  align = 'center',
  as: Tag = 'h2',
  id,
  className,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  sub?: ReactNode;
  align?: 'center' | 'left';
  as?: 'h1' | 'h2';
  id?: string;
  className?: string;
}) {
  return (
    <header
      className={cn(
        'mkt-psec__head',
        align === 'left' && 'mkt-psec__head--left',
        className,
      )}
    >
      {eyebrow ? <p className="mkt-psec__eyebrow">{eyebrow}</p> : null}
      <Tag
        id={id}
        className={cn('mkt-psec__title', Tag === 'h1' && 'mkt-psec__title--hero')}
      >
        {title}
        {highlight ? (
          <>
            {' '}
            <span className="mkt-psec__hl">{highlight}</span>
          </>
        ) : null}
      </Tag>
      {sub ? <p className="mkt-psec__sub">{sub}</p> : null}
    </header>
  );
}
