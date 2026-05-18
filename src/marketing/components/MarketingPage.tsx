import { cn } from '@/lib/utils';

/** Consistent page shell for all marketing routes */
export default function MarketingPage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('marketing-site min-h-screen bg-white text-[#0c1222]', className)}>{children}</div>;
}
