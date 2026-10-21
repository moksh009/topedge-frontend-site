type BrandMarkProps = {
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
};

const STATIC_WEBP = '/brand-mark-56.webp';
const STATIC_PNG = '/brand-mark-56.png';

/**
 * The static mark, and only the static mark (~3.6KB, LCP-safe).
 *
 * This used to swap itself for an animated WebP once the page was idle. The
 * owner asked for that off the navbar: a logo that starts moving a beat after
 * the page settles pulls the eye back to the corner every time someone lands,
 * and the band is meant to sit still. The animated files are still in /public
 * for the loader screens, which is where motion belongs.
 */
export default function BrandMark({
  className,
  width = 40,
  height = 40,
  alt = 'TopEdge AI',
}: BrandMarkProps) {
  return (
    <picture>
      <source type="image/webp" srcSet={STATIC_WEBP} />
      <img
        src={STATIC_PNG}
        alt={alt}
        width={width}
        height={height}
        className={className}
        decoding="async"
        fetchPriority="low"
      />
    </picture>
  );
}
