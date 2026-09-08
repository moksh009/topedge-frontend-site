import type { ReactNode } from 'react';
import { WhatsAppMark } from '../../foundation/BrandMarks';

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function FilmPhone({ title, subtitle = 'online', children }: Props) {
  return (
    <div className="hero-duo__iphone">
      <div className="hero-duo__island" aria-hidden />
      <div className="hero-duo__wa-top">
        <span className="hero-duo__wa-back">‹</span>
        <span className="hero-duo__wa-avatar">
          <WhatsAppMark className="h-3.5 w-3.5" />
        </span>
        <div className="hero-duo__wa-meta">
          <strong>{title}</strong>
          <span>{subtitle}</span>
        </div>
      </div>
      <div className="hero-duo__wa-wall">{children}</div>
    </div>
  );
}
