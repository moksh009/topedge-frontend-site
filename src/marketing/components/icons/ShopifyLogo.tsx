import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  size?: number;
};

/** Shopify bag mark — simplified brand silhouette */
export default function ShopifyLogo({ className, size = 44 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={cn('shrink-0', className)}
      aria-hidden
    >
      <rect width="48" height="48" rx="12" fill="#95BF47" />
      <path
        fill="#fff"
        d="M24.2 11c-.2 0-.4.1-.5.3l-.9 2.8s-1.1-.3-1.8-.2c-2.6.3-3.5 2.4-3.8 4.5-.3 1.8-.7 4.3-1.2 6.8 1.2.7 2.4 1.4 3.6 2.1.4-.9.8-1.7 1.2-2.3.5-.7 1.1-1 1.8-.9.6.1 1 .6 1.1 1.2.1.8-.2 1.8-.8 2.9 1.5.8 3 1.6 4.4 2.3.5-1.2.9-2.3 1.1-3.2.4-1.8.1-3.2-.9-4.1-1-.9-2.5-1.2-4.2-.8-.3-1.2-.8-2.2-1.5-2.9C26.8 11.8 25.6 11 24.2 11zm-2.1 4.1c.5-.1 1 .1 1.3.5.2.3.3.7.3 1.2h-2.4c.1-.9.4-1.5.8-1.7z"
      />
      <path
        fill="#5E8E3E"
        d="M14 20.5c2.8 1.6 5.6 3.2 8.4 4.8l-1.2 7.2c-.1.5.3 1 .8 1h2.1c.5 0 .9-.4 1-.9l.8-4.8 6.2 3.6-.9 5.4c-.1.5.3 1 .8 1h2.1c.5 0 .9-.4 1-.9l2.4-14.2c-3.5-2-7-4.1-10.5-6.2L14 20.5z"
        opacity="0.9"
      />
    </svg>
  );
}
