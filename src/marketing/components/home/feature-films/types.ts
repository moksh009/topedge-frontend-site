export type FeatureFilmId =
  | 'cart-recovery'
  | 'journey-cod'
  | 'pixel-insights'
  | 'audience-broadcast'
  | 'stock-monitor'
  | 'warranty';

export type PhonePresence = 'hidden' | 'enter' | 'visible';

export type FilmBeat = {
  ms: number;
  cam: string;
  phone?: PhonePresence;
  /** Arbitrary flags read by film UI, e.g. published: true */
  flags?: Record<string, boolean | number | string>;
};
