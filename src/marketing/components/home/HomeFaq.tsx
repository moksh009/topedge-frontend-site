import { faqs } from '../../data/home';

/** Always-open Q&A: must match the homepage FAQPage schema word for word. */
export default function HomeFaq() {
  return (
    <section className="home-qa" aria-labelledby="home-qa-title">
      <div className="home-qa__inner">
        <header className="home-qa__header">
          <h2 id="home-qa-title" className="home-qa__title">
            Common <span className="home-qa__title-accent">questions</span>
          </h2>
          <p className="home-qa__sub">
            Setup, billing, and what TopEdge automates on WhatsApp for Shopify stores.
          </p>
        </header>

        <div className="home-qa__list">
          {faqs.map((f) => (
            <div key={f.question} className="home-qa__item">
              <h3 className="home-qa__q">{f.question}</h3>
              <p className="home-qa__a">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
