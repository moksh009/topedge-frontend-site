import { useEffect, useState } from 'react';
import type { FilmBeat, PhonePresence } from './types';

type Options = {
  beats: FilmBeat[];
  active: boolean;
  reducedMotion: boolean;
};

export type FilmTimelineState = {
  beatIndex: number;
  beat: FilmBeat;
  cam: string;
  phone: PhonePresence;
  flags: Record<string, boolean | number | string>;
};

/**
 * Beat runner for sticky feature films.
 * When inactive or reduced-motion: hold last beat (no looping timeouts).
 * When active: advance with setTimeout, loop to 0 after last.
 */
export function useFilmTimeline({
  beats,
  active,
  reducedMotion,
}: Options): FilmTimelineState {
  const last = Math.max(0, beats.length - 1);
  const [beatIndex, setBeatIndex] = useState(0);

  useEffect(() => {
    if (!beats.length) return;

    if (reducedMotion) {
      setBeatIndex(last);
      return;
    }

    if (!active) {
      setBeatIndex(0);
      return;
    }

    setBeatIndex(0);
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let index = 0;

    const schedule = () => {
      const beat = beats[index];
      if (!beat) return;
      timer = setTimeout(() => {
        if (cancelled) return;
        index = index + 1 >= beats.length ? 0 : index + 1;
        setBeatIndex(index);
        schedule();
      }, beat.ms);
    };

    schedule();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [active, reducedMotion, beats, last]);

  const safeIndex = beats.length ? Math.min(beatIndex, last) : 0;
  const beat = beats[safeIndex] ?? { ms: 0, cam: 'is-cam-wide' };

  return {
    beatIndex: safeIndex,
    beat,
    cam: beat.cam,
    phone: beat.phone ?? 'hidden',
    flags: beat.flags ?? {},
  };
}
