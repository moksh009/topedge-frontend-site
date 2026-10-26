import { testimonials } from './home';
import { TRUSTPILOT_QUOTES } from './socialProof';

/**
 * The cards the home testimonial stack rotates through: the quotes given to
 * us directly, then the ones published on Trustpilot.
 *
 * The published reviews are mapped straight off socialProof.json rather than
 * retyped here, so there is exactly one copy of each and it stays verbatim.
 * They carry no company logo — Trustpilot publishes a name, not an employer —
 * so the card shows the platform mark where a brand mark would otherwise go.
 */
export type HomeTestimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  brand: string;
  brandLogo?: string;
  brandLogoAlt?: string;
  metric: string;
  tone: 'violet' | 'amber' | 'slate';
  source: 'direct' | 'trustpilot';
};

const published: HomeTestimonial[] = TRUSTPILOT_QUOTES.map((q) => ({
  quote: q.text,
  name: q.author,
  role: 'Verified Trustpilot review',
  company: 'Trustpilot',
  brand: 'Trustpilot',
  metric: 'Published review',
  tone: 'slate',
  source: 'trustpilot',
}));

export const homeTestimonials: HomeTestimonial[] = [
  ...(testimonials as unknown as HomeTestimonial[]),
  ...published,
];
