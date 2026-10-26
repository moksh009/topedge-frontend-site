import { Link } from 'react-router-dom';
import type { JourneyExample } from '../../data/journeyExamples';
import { TEMPLATE_RATE } from '../../data/whatsappTemplates';
import '../../styles/journey-flow.css';

export default function JourneyCard({
  journey: j,
  href,
  large = false,
}: {
  journey: JourneyExample;
  href: string;
  large?: boolean;
}) {
  return (
    <Link to={href} className={`mkt-jx-card${large ? ' is-lg' : ''}`}>
      <span className="mkt-jx-card__media">
        <img src={j.art} alt="" aria-hidden width={640} height={400} loading="lazy" decoding="async" />
      </span>
      <span className={`mkt-jf__cat mkt-jf__cat--${j.cardCategory.toLowerCase()} mkt-jx-card__badge`}>
        {j.cardCategory} · {TEMPLATE_RATE[j.cardCategory]} per message
      </span>
      <span className="mkt-jx-card__title">{j.cardTitle}</span>
      <span className="mkt-jx-card__blurb">{j.cardBlurb}</span>
      <span className="mkt-jx-card__meta">
        <span>
          <em>Goal</em>
          {j.cardGoal}
        </span>
        <span>
          <em>Measured by</em>
          {j.cardMetric}
        </span>
      </span>
      <span className="mkt-jx-card__cta">See the full journey →</span>
    </Link>
  );
}
