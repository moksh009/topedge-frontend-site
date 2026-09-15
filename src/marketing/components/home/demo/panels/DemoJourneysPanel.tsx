import { useMemo, useState } from 'react';
import {
  ArrowLeftRight,
  Flag,
  MapPin,
  PackageCheck,
  Zap,
} from 'lucide-react';
import FilmJourneyLink from '../../feature-films/FilmJourneyLink';
import { demoJourneys } from '../demoFixtures';

const PRODUCT_IMG = '/marketing/products/vitamin-c-serum.jpg';

type JourneySpec = {
  midTitle: string;
  midBody: string;
  entryWhen: string;
  endBody: string;
  stepLabel: string;
  StepIcon: typeof ArrowLeftRight;
};

const SPECS: Record<string, JourneySpec> = {
  j1: {
    midTitle: 'COD → prepaid',
    midBody: '₹100 prepaid discount · Expires after 2 hours',
    entryWhen: 'Order placed · COD only',
    endBody: 'Payment received · enrollment completes',
    stepLabel: 'COD → prepaid',
    StepIcon: ArrowLeftRight,
  },
  j2: {
    midTitle: 'Cart recovery',
    midBody: 'Msg 1 → wait 2h → Msg 2 with SAVE10',
    entryWhen: 'Cart abandoned · 15+ mins',
    endBody: 'Checkout completed · recovered',
    stepLabel: 'Send recovery',
    StepIcon: PackageCheck,
  },
  j3: {
    midTitle: 'Ask for review',
    midBody: 'Wait 24h after delivery · review template',
    entryWhen: 'Order delivered',
    endBody: 'Review asked · journey ends',
    stepLabel: 'Order delivered',
    StepIcon: MapPin,
  },
};

/** Journeys hub + prebuilt node canvas (reuses film-journey / film-card CSS). */
export default function DemoJourneysPanel() {
  const [filter, setFilter] = useState<'all' | 'live' | 'draft'>('all');
  const [selectedId, setSelectedId] = useState(demoJourneys[0].id);

  const rows = demoJourneys.filter((j) => {
    if (filter === 'live') return j.status === 'Live';
    if (filter === 'draft') return j.status === 'Draft';
    return true;
  });
  const journey = demoJourneys.find((j) => j.id === selectedId) ?? demoJourneys[0];
  const spec = useMemo(() => SPECS[journey.id] ?? SPECS.j1, [journey.id]);
  const StepIcon = spec.StepIcon;
  const live = journey.status === 'Live';

  return (
    <div className="demo-page demo-page--flush demo-journeys-shell">
      <div className="demo-journeys-rail">
        <div className="demo-journeys-rail__head">
          <strong>Journeys</strong>
          <div className="demo-page__tabs">
            {(
              [
                ['all', 'All'],
                ['live', 'Live'],
                ['draft', 'Drafts'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={filter === id ? 'is-on' : undefined}
                onClick={() => setFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="demo-journeys-rail__list">
          {rows.map((j) => (
            <button
              key={j.id}
              type="button"
              className={`demo-hub-card${j.id === selectedId ? ' is-active' : ''}`}
              onClick={() => setSelectedId(j.id)}
            >
              <div className="demo-hub-card__top">
                <strong>{j.name}</strong>
                <span className={`demo-pill demo-pill--${j.status === 'Live' ? 'paid' : 'cod'}`}>
                  {j.status}
                </span>
              </div>
              <div className="demo-hub-card__meta">
                <span>{j.enrolled.toLocaleString('en-IN')} enrolled</span>
                <span>{j.recoveredLabel}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="demo-journeys-studio">
        <div className="film-journey film-journey--lens demo-journey-embed">
          <div className="film-journey__bar">
            <div className="film-journey__bar-left">
              <em>Journeys /</em>
              <strong>{journey.name}</strong>
            </div>
            <div className="film-journey__bar-actions">
              <span className={`film-pill${live ? ' is-live is-run' : ''}`}>
                {live ? 'Live · running' : 'Draft'}
              </span>
              <span className={`film-btn is-primary${live ? ' is-done' : ''}`}>
                {live ? 'Published' : 'Publish'}
              </span>
            </div>
          </div>
          <div className="film-journey__body">
            <div className="film-journey__canvas">
              <div className={`film-card is-entry is-on${live ? ' is-fire' : ''}`}>
                <div className="film-card__head">
                  <span className="film-card__ico">
                    <Zap />
                  </span>
                  <strong>Entry</strong>
                  <span className="film-chip">TRIGGER</span>
                </div>
                <div className="film-card__body">
                  <em>Enter when</em>
                  <p>{spec.entryWhen}</p>
                  {live ? <span className="film-live">Live path</span> : null}
                </div>
                <i className="film-port film-port--out" />
              </div>

              <FilmJourneyLink on flow={live} />

              <div className={`film-card is-action is-on${live ? ' is-fire' : ''}`}>
                <div className="film-card__head">
                  <span className="film-card__ico is-soft">
                    <StepIcon />
                  </span>
                  <strong>{spec.midTitle}</strong>
                </div>
                <div className="film-card__body">
                  <p>{spec.midBody}</p>
                  <div className="film-tpl">
                    <img src={PRODUCT_IMG} alt="" />
                    <div>
                      <span>Template</span>
                      <strong>order_final</strong>
                    </div>
                  </div>
                  {live ? <span className="film-live">Live path</span> : null}
                </div>
                <i className="film-port film-port--in" />
                <i className="film-port film-port--out" />
              </div>

              <FilmJourneyLink on flow={live} />

              <div className={`film-card is-end is-on${live ? ' is-fire' : ''}`}>
                <div className="film-card__head">
                  <span className="film-card__ico is-end">
                    <Flag />
                  </span>
                  <strong>End Journey</strong>
                  <span className="film-chip is-end">END</span>
                </div>
                <div className="film-card__body">
                  <p>{spec.endBody}</p>
                  {live ? <span className="film-live">Live path</span> : null}
                </div>
                <i className="film-port film-port--in" />
              </div>
            </div>

            <aside className="film-steps">
              <strong>Steps</strong>
              <em>Prebuilt path</em>
              <div className="film-steps__sec">Actions</div>
              <div className="film-step is-used">
                <StepIcon />
                {spec.stepLabel}
              </div>
              <div className="film-step is-muted">
                <MapPin />
                Update address
              </div>
              <div className="film-step is-muted">
                <PackageCheck />
                Order delivered
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
