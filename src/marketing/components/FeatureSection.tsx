import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Eyebrow } from './ui';
import MarketingImage from './MarketingImage';
import { Reveal } from './motion';
import { easeOut } from '../constants/motion';

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  cta?: { label: string; to: string };
  image: { src: string; alt: string };
  reverse?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export default function FeatureSection({
  eyebrow,
  title,
  description,
  bullets,
  cta,
  image,
  reverse,
  children,
  className,
}: Props) {
  return (
    <section className={cn('relative overflow-hidden py-20 md:py-28', className)}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-50/30 via-transparent to-transparent opacity-60" />
      <div className="marketing-container relative">
        <div
          className={cn(
            'grid items-center gap-12 lg:grid-cols-2 lg:gap-16',
            reverse && 'lg:[direction:rtl]'
          )}
        >
          <Reveal className={cn('text-center lg:text-left', reverse && 'lg:[direction:ltr]')}>
            <Eyebrow className={cn('lg:text-left')}>{eyebrow}</Eyebrow>
            <h2 className="text-[1.75rem] leading-[1.12] tracking-[-0.035em] text-slate-900 md:text-[2.25rem]">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-500 md:text-[17px] lg:mx-0">
              {description}
            </p>
            <ul className="mx-auto mt-8 max-w-md space-y-0 lg:mx-0">
              {bullets.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.45, ease: easeOut }}
                  className="flex items-start gap-4 border-t border-violet-100/80 py-4 text-left text-[15px] text-slate-600 first:border-t-0 first:pt-0"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6d28d9] text-[10px] font-medium text-white">
                    {i + 1}
                  </span>
                  {b}
                </motion.li>
              ))}
            </ul>
            {cta && (
              <motion.div
                className="mt-8 flex justify-center lg:justify-start"
                whileHover={{ x: 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                <Link
                  to={cta.to}
                  className="group inline-flex items-center gap-2 text-[15px] font-medium text-[#7C3AED] underline-offset-4 hover:text-[#6d28d9] hover:underline"
                >
                  {cta.label}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </motion.div>
            )}
          </Reveal>
          <Reveal delay={0.08} className={reverse ? 'lg:[direction:ltr]' : ''}>
            {children ?? <MarketingImage src={image.src} alt={image.alt} />}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
