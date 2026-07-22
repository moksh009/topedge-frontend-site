/** Official brand marks from /public/platforms (Simple Icons / Meta-green WA). */

type MarkProps = {
  className?: string;
  /** Accepted so this can drop into Lucide-shaped slots */
  strokeWidth?: number;
};

/** Official WhatsApp glyph */
export function WhatsAppMark({ className = 'h-4 w-4' }: MarkProps) {
  return (
    <img
      src="/platforms/whatsapp.svg"
      alt=""
      className={className}
      width={16}
      height={16}
      draggable={false}
      aria-hidden
    />
  );
}

/** Official Shopify bag glyph */
export function ShopifyMark({ className = 'h-4 w-4' }: MarkProps) {
  return (
    <img
      src="/platforms/shopify.svg"
      alt=""
      className={className}
      width={16}
      height={16}
      draggable={false}
      aria-hidden
    />
  );
}
