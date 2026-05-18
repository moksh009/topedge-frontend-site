import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  size?: number;
};

/** Official WhatsApp mark — green bubble + white phone */
export default function WhatsAppLogo({ className, size = 40 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={cn('shrink-0', className)}
      aria-hidden
    >
      <circle cx="24" cy="24" r="24" fill="#25D366" />
      <path
        fill="#fff"
        d="M24 10c-7.18 0-13 5.82-13 13 0 2.29.6 4.52 1.74 6.5L10 38l8.74-2.29A12.94 12.94 0 0 0 24 36c7.18 0 13-5.82 13-13S31.18 10 24 10zm0 23.5c-2.01 0-3.98-.54-5.7-1.56l-.41-.24-4.35 1.14 1.16-4.24-.27-.43A10.45 10.45 0 0 1 13.5 23c0-5.79 4.71-10.5 10.5-10.5S34.5 17.21 34.5 23 29.79 33.5 24 33.5zm5.9-7.8c-.32-.16-1.88-.93-2.17-1.04-.29-.1-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.6-.95-.84-1.59-1.88-1.78-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.55-.08-.16-.71-1.71-.97-2.34-.25-.6-.51-.52-.71-.53h-.61c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.75.75.32 1.34.51 1.8.65.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.15-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37z"
      />
    </svg>
  );
}

export function WhatsAppBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-3 py-2 shadow-lg shadow-emerald-500/30',
        className
      )}
    >
      <WhatsAppLogo size={28} />
      <div className="text-left">
        <p className="text-[10px] font-bold uppercase tracking-wide text-white/90">WhatsApp</p>
        <p className="text-xs font-semibold text-white">Business API</p>
      </div>
    </div>
  );
}
