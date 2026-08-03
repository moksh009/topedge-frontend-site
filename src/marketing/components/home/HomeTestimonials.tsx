import { testimonials } from '../../data/home';

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export default function HomeTestimonials({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section
      className={`home-voices${hideHeader ? ' home-voices--bare' : ''}`}
      aria-label="Customer outcomes"
    >
      <div className="home-voices__inner">
        {!hideHeader && (
          <header className="home-voices__head">
            <p className="home-voices__eyebrow">Customer outcomes</p>
            <h2 className="home-voices__title">
              Operators notice when the product respects how they work
            </h2>
            <p className="home-voices__sub">
              Outcomes from recovery, inbox, and Meta-safe messaging.
            </p>
          </header>
        )}

        <div className="home-voices__grid">
          {testimonials.map((testimonial, i) => (
            <article
              key={testimonial.name}
              className={`home-voices__card home-voices__card--${(i % 3) + 1}`}
            >
              <p className="home-voices__metric">{testimonial.metric}</p>
              <blockquote className="home-voices__quote">
                <p>“{testimonial.quote}”</p>
              </blockquote>
              <footer className="home-voices__person">
                <span className="home-voices__avatar" aria-hidden>
                  {initials(testimonial.name)}
                </span>
                <span>
                  <strong>{testimonial.name}</strong>
                  <em>
                    {testimonial.role} · {testimonial.company}
                  </em>
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
