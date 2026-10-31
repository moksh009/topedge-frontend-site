import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { shotFor, shotSrc } from '../shots';
import DocInline from './DocInline';

/**
 * A dashboard screenshot. Renders nothing when the shot id is not in
 * public/docs/img/shots.json, so a missing capture never breaks a page.
 * Click (or Enter) opens a simple full-screen view.
 */
export default function DocImage({ shot, alt, caption }: { shot: string; alt: string; caption?: string }) {
  const size = shotFor(shot);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!size) return null;
  const src = shotSrc(shot);

  return (
    <figure className="docs-figure" id={`shot-${shot}`}>
      <button
        type="button"
        className="docs-figure__zoom"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge screenshot: ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          width={size.w}
          height={size.h}
          loading="lazy"
          decoding="async"
          className="docs-figure__img"
        />
      </button>
      {caption ? (
        <figcaption className="docs-figure__caption">
          <DocInline text={caption} />
        </figcaption>
      ) : null}
      {open && typeof document !== 'undefined'
        ? createPortal(
            <div
              className="docs-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={alt}
              onClick={() => setOpen(false)}
            >
              <button
                type="button"
                className="docs-lightbox__close"
                aria-label="Close"
                onClick={() => setOpen(false)}
                autoFocus
              >
                <X size={18} aria-hidden />
              </button>
              <img src={src} alt="" aria-hidden="true" className="docs-lightbox__img" />
              {caption ? <p className="docs-lightbox__caption">{caption.replace(/\*\*|`/g, '')}</p> : null}
            </div>,
            document.body,
          )
        : null}
    </figure>
  );
}
