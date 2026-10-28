/**
 * A platform logo set immediately before its own name in a heading.
 *
 * "Connect Shopify and WhatsApp" is recognised faster with the two marks in
 * front of the two words than it is read, and it is the detail that separates
 * a page about those platforms from a page that merely names them.
 *
 * A fragment, not a wrapper: these go inside an h1 beside other text, and a
 * span around the pair would break the line wrapping of the heading.
 *
 * Both marks are self-hosted under /platforms. They are deliberately not
 * hotlinked from an image-cache thumbnail or a logo-scraper CDN, neither of
 * which is a stable origin to serve a homepage from.
 */
const MARKS = {
  whatsapp: '/platforms/whatsapp-badge.svg',
  shopify: '/platforms/shopify.svg',
} as const;

export type BrandPlatform = keyof typeof MARKS;

export default function BrandWord({
  platform,
  children,
  small = false,
}: {
  platform: BrandPlatform;
  /** The brand name itself, so the mark and the word stay together. */
  children: React.ReactNode;
  /** Slightly tighter, for body-size headings rather than a hero. */
  small?: boolean;
}) {
  return (
    <>
      <img
        className={small ? 'mkt-brandmark mkt-brandmark--sm' : 'mkt-brandmark'}
        src={MARKS[platform]}
        alt=""
        width={24}
        height={24}
        decoding="async"
        aria-hidden
      />
      {children}
    </>
  );
}
