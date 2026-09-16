import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function MarketingPage({
  children,
  className,
  fillHeight = true,
}: {
  children: ReactNode;
  className?: string;
  fillHeight?: boolean;
}) {
  return (
    <div
      className={cn(
        fillHeight && 'min-h-screen',
        'bg-white text-[#0c1222] antialiased',
        className,
      )}
    >
      {children}
    </div>
  );
}
