/** Shared sample catalog asset for marketing scenes */
export const SAMPLE_PRODUCT = {
  name: 'Vitamin C serum',
  price: '₹2,840',
  image: '/marketing/products/vitamin-c-serum.jpg',
} as const;

export function ProductThumb({
  src = SAMPLE_PRODUCT.image,
  alt = SAMPLE_PRODUCT.name,
  className = 'fs-product__thumb',
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" />;
}
