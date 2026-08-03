import { useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { faqs } from '../../data/home';

export default function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="home-faq" aria-label="Frequently asked questions">
      <div className="home-faq__inner">
        <header className="home-faq__head">
          <p className="home-faq__eyebrow">FAQ</p>
          <h2 className="home-faq__title">Straight answers before you connect</h2>
          <p className="home-faq__sub">
            No fluff. The questions D2C founders actually ask.
          </p>
        </header>

        <div className="home-faq__panel">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-btn-${i}`;

            return (
              <div
                key={faq.question}
                className={`home-faq__item${isOpen ? ' is-open' : ''}`}
              >
                <h3 className="home-faq__q">
                  <button
                    id={buttonId}
                    type="button"
                    className="home-faq__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{faq.question}</span>
                    <span className="home-faq__icon" aria-hidden>
                      {isOpen ? (
                        <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
                      ) : (
                        <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                      )}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="home-faq__a"
                  hidden={!isOpen}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
