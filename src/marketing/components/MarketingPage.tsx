import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function MarketingPage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('min-h-screen bg-white text-[#0c1222] antialiased', className)}>
      {children}
    </div>
  );
}
