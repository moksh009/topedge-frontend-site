import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { bindCalculators } from '../lib/blogCalculators';
import '../styles/calculator.css';

/**
 * Mounts one of the shared rupee calculators on a React page.
 *
 * The same widget is embedded in blog HTML through a `data-calc` placeholder,
 * so the arithmetic lives in one module rather than once per surface. Children
 * are the no-JavaScript fallback: they stay on screen until the widget binds,
 * which is why they should carry real figures and not a spinner.
 */
export default function CostCalculator({
  calc,
  children,
}: {
  calc: 'whatsapp-bill' | 'rto-cost' | 'cart-recovery';
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return undefined;
    return bindCalculators(ref.current);
  }, [calc]);

  return (
    <div ref={ref}>
      <div className="mkt-calc" data-calc={calc}>
        {children}
      </div>
    </div>
  );
}
