import type { ReactNode } from 'react';
import type { PhonePresence } from './types';
import FilmPhone from './FilmPhone';

type Props = {
  cam: string;
  phone?: PhonePresence;
  phoneTitle?: string;
  phoneSubtitle?: string;
  children: ReactNode;
  phoneChildren?: ReactNode;
  showPhone?: boolean;
  desktopOverlay?: ReactNode;
  /** Fixed chrome above the camera lens (e.g. journey bar) — never pans/zooms */
  desktopChrome?: ReactNode;
};

/**
 * Centered dashboard with a black device border.
 * Phone slides in as a separate sidecar outside the frame (hero-style),
 * not docked inside the white dashboard.
 */
export default function FilmStage({
  cam,
  phone = 'hidden',
  phoneTitle = 'Glow Skin Co.',
  phoneSubtitle = 'online',
  children,
  phoneChildren,
  showPhone = true,
  desktopOverlay,
  desktopChrome,
}: Props) {
  const withPhone = showPhone && phone !== 'hidden';

  return (
    <div className={`film-stage-shell${withPhone ? ' is-with-phone' : ''}`}>
      <div className={`film-frame${withPhone ? ' is-with-phone' : ''}`}>
        <div className={`film-stage ${cam}${withPhone ? ' is-with-phone' : ''}`} aria-hidden>
          <div className="film-stage__desktop">
            <div className="film-stage__viewport">
              {desktopChrome ? <div className="film-stage__chrome">{desktopChrome}</div> : null}
              <div className={`film-stage__lens${desktopChrome ? ' has-chrome' : ''}`}>{children}</div>
              {desktopOverlay}
            </div>
          </div>
        </div>
      </div>

      {showPhone ? (
        <div className="film-stage__phone" data-phone={phone}>
          <div className="hero-duo__phone is-active">
            <FilmPhone title={phoneTitle} subtitle={phoneSubtitle}>
              {phoneChildren}
            </FilmPhone>
          </div>
        </div>
      ) : null}
    </div>
  );
}
