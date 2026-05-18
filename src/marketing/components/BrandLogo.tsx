import { Link } from 'react-router-dom';
import { BRAND_LOGO } from '../assets';
import { cn } from '@/lib/utils';

export default function BrandLogo({
  className,
  showText = true,
  size = 'md',
}: {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = { sm: 'h-8 w-8', md: 'h-9 w-9', lg: 'h-11 w-11' };
  const textSizes = { sm: 'text-base', md: 'text-lg', lg: 'text-xl' };

  return (
    <Link to="/" className={cn('flex items-center gap-2.5', className)}>
      <img src={BRAND_LOGO} alt="TopEdge AI" className={cn('rounded-full object-cover', sizes[size])} />
      {showText && (
        <span className={cn('font-semibold tracking-tight text-[#0c1222]', textSizes[size])}>TopEdge</span>
      )}
    </Link>
  );
}
