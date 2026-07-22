import { useState } from 'react';
import { faqs } from '../../data/home';
import { SectionHeading } from '../ui';
import { cn } from '@/lib/utils';

export default function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="home-story">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Straight answers before you connect"
          subtitle="No fluff ,  the questions D2C founders actually ask."
          center
          className="mb-12"
        />
        <div className="divide-y divide-[#efeaf8] rounded-2xl border border-[#efeaf8] bg-white overflow-hidden">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-[0.95rem] font-medium text-[#0c1222]">{faq.question}</span>
                  <span
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5f3ff] text-[#7C3AED] transition-transform',
                      isOpen && 'rotate-45'
                    )}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-slate-500 md:px-6">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
