import '../../styles/journey-flow.css';

const STEPS = [
  {
    title: 'Connect Shopify and WhatsApp',
    body: 'One-click Shopify login and your Meta WhatsApp Business account. No code, no Zapier.',
  },
  {
    title: 'Get the templates approved',
    body: 'Pick the ready-made templates you need and submit them to Meta from the dashboard.',
  },
  {
    title: 'Switch the journey on',
    body: 'Publish it. Every new order or cart now gets the right message at the right time.',
  },
];

export default function HowItWorks({ title = 'Live in three steps' }: { title?: string }) {
  return (
    <section className="mkt-how" aria-labelledby="mkt-how-title">
      <h2 className="mkt-how__title" id="mkt-how-title">
        {title}
      </h2>
      <ol className="mkt-how__steps">
        {STEPS.map((s, i) => (
          <li key={s.title} className="mkt-how__step">
            <span className="mkt-how__n" aria-hidden>
              {i + 1}
            </span>
            <h3 className="mkt-how__step-title">{s.title}</h3>
            <p className="mkt-how__step-body">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
