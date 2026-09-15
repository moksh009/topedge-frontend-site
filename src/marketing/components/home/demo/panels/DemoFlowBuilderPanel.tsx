import { useState } from 'react';
import { Flag, MessageSquare, Zap } from 'lucide-react';
import FilmJourneyLink from '../../feature-films/FilmJourneyLink';
import { demoFlows } from '../demoFixtures';

/** Flow list + mini node canvas using the same film-card language. */
export default function DemoFlowBuilderPanel() {
  const [selectedId, setSelectedId] = useState(demoFlows[0].id);
  const flow = demoFlows.find((f) => f.id === selectedId) ?? demoFlows[0];
  const live = flow.status === 'Published';

  return (
    <div className="demo-page demo-page--flush demo-journeys-shell">
      <div className="demo-journeys-rail">
        <div className="demo-journeys-rail__head">
          <strong>Flow Builder</strong>
          <button type="button" className="demo-btn-primary" disabled>
            New flow
          </button>
        </div>
        <div className="demo-journeys-rail__list">
          {demoFlows.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`demo-hub-card${f.id === selectedId ? ' is-active' : ''}`}
              onClick={() => setSelectedId(f.id)}
            >
              <div className="demo-hub-card__top">
                <strong>{f.name}</strong>
                <span className={`demo-pill demo-pill--${f.status === 'Published' ? 'paid' : 'cod'}`}>
                  {f.status}
                </span>
              </div>
              <div className="demo-hub-card__meta">
                <span>{f.triggers}</span>
                <span>{f.updated}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="demo-journeys-studio">
        <div className="film-journey film-journey--lens demo-journey-embed">
          <div className="film-journey__bar">
            <div className="film-journey__bar-left">
              <em>Flows /</em>
              <strong>{flow.name}</strong>
            </div>
            <div className="film-journey__bar-actions">
              <span className={`film-pill${live ? ' is-live' : ''}`}>{flow.status}</span>
            </div>
          </div>
          <div className="film-journey__body">
            <div className="film-journey__canvas">
              <div className="film-card is-entry is-on">
                <div className="film-card__head">
                  <span className="film-card__ico">
                    <Zap />
                  </span>
                  <strong>Trigger</strong>
                  <span className="film-chip">START</span>
                </div>
                <div className="film-card__body">
                  <em>When</em>
                  <p>{flow.triggers}</p>
                </div>
                <i className="film-port film-port--out" />
              </div>
              <FilmJourneyLink on flow={live} />
              <div className="film-card is-action is-on">
                <div className="film-card__head">
                  <span className="film-card__ico is-soft">
                    <MessageSquare />
                  </span>
                  <strong>Send reply</strong>
                </div>
                <div className="film-card__body">
                  <p>WhatsApp text + optional buttons</p>
                  {live ? <span className="film-live">Live path</span> : null}
                </div>
                <i className="film-port film-port--in" />
                <i className="film-port film-port--out" />
              </div>
              <FilmJourneyLink on flow={live} />
              <div className="film-card is-end is-on">
                <div className="film-card__head">
                  <span className="film-card__ico is-end">
                    <Flag />
                  </span>
                  <strong>End</strong>
                  <span className="film-chip is-end">END</span>
                </div>
                <div className="film-card__body">
                  <p>Conversation continues in Live Chat</p>
                </div>
                <i className="film-port film-port--in" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
