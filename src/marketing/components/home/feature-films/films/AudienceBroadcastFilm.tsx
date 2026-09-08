import type { FilmBeat } from '../types';
import { useFilmTimeline } from '../useFilmTimeline';
import { useReducedMotion } from '../useReducedMotion';
import FilmStage from '../FilmStage';

const PRODUCT_IMG = '/marketing/products/vitamin-c-serum.jpg';

const TIMELINE: FilmBeat[] = [
  { ms: 2000, cam: 'is-cam-wide', phone: 'hidden', flags: { list: true } },
  {
    ms: 1800,
    cam: 'is-cam-aud',
    phone: 'hidden',
    flags: { aud: true, seg: true },
  },
  {
    ms: 1700,
    cam: 'is-cam-aud',
    phone: 'hidden',
    flags: { aud: true, seg: true, select: true },
  },
  {
    ms: 1700,
    cam: 'is-cam-camp',
    phone: 'enter',
    flags: { msg: true, select: true },
  },
  {
    ms: 1900,
    cam: 'is-cam-camp',
    phone: 'visible',
    flags: { msg: true, select: true, sent: true },
  },
  {
    ms: 2100,
    cam: 'is-cam-wide',
    phone: 'visible',
    flags: { sent: true, lift: true },
  },
  {
    ms: 2000,
    cam: 'is-cam-wide',
    phone: 'visible',
    flags: { sent: true, lift: true, buy: true },
  },
];

export default function AudienceBroadcastFilm({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotion();
  const { cam, phone, flags } = useFilmTimeline({
    beats: TIMELINE,
    active,
    reducedMotion,
  });

  const revenue = flags.buy ? '₹68,200' : flags.lift ? '₹24,400' : '₹0';
  const orders = flags.buy ? '38' : flags.lift ? '12' : '0';

  return (
    <FilmStage
      cam={cam}
      phone={phone}
      phoneChildren={
        <>
          <span className="hero-duo__wa-day">Today</span>
          {flags.sent ? (
            <>
              <div className="hero-duo__bubble hero-duo__bubble--system hero-duo__fade">
                Broadcast · Serum restock · delivered
              </div>
              <div className="hero-duo__bubble hero-duo__bubble--store hero-duo__bubble--tpl hero-duo__fade">
                <div className="hero-duo__tpl-media">
                  <img src={PRODUCT_IMG} alt="" />
                </div>
                <div className="hero-duo__tpl-body">
                  <strong className="hero-duo__tpl-title">Back in stock</strong>
                  <span className="hero-duo__tpl-sub">Glow Skin Co · campaign</span>
                  <p>
                    Vitamin C Serum is restocked. Early access for members — <b>shop now</b>.
                  </p>
                  <div className="hero-duo__bubble-cta">Shop restock →</div>
                  <time>
                    10:12 <span className="hero-duo__ticks">✓✓</span>
                  </time>
                </div>
              </div>
            </>
          ) : (
            <div className="hero-duo__bubble hero-duo__bubble--system hero-duo__fade">
              Waiting for campaign…
            </div>
          )}
        </>
      }
    >
      <div className="film-campui">
        {flags.list && !flags.aud && !flags.msg && !flags.sent ? (
          <>
            <div className="film-campui__top">
              <h3>Campaigns & journeys</h3>
              <span className="film-px__btn is-aim">Create campaign</span>
            </div>
            <div className="film-campui__kpis">
              <div>
                <em>Messages sent</em>
                <strong>2</strong>
              </div>
              <div>
                <em>Read rate</em>
                <strong>100%</strong>
              </div>
              <div>
                <em>Reply rate</em>
                <strong>100%</strong>
              </div>
              <div>
                <em>Attributed revenue</em>
                <strong>₹0</strong>
              </div>
            </div>
          </>
        ) : null}

        {flags.aud ? (
          <>
            <div className="film-wiz">
              <span className="is-on">1 Audience</span>
              <span>2 Message</span>
              <span>3 Review</span>
            </div>
            <div className="film-campui__aud">
              <aside>
                <strong>Who receives it</strong>
                <div className={`film-seg${flags.seg ? ' is-on' : ''}`}>
                  <i /> Pixel · Serum viewers <em>29</em>
                </div>
                <div className={`film-seg${flags.select ? ' is-on' : ''}`}>
                  <i /> Recharge audience <em>2,113</em>
                </div>
              </aside>
              <div>
                <div className="film-aud-list-head">
                  <strong>
                    Contacts <b>{flags.select ? '2,142' : '29'}</b>
                  </strong>
                  <em className={flags.select ? 'is-on' : ''}>Select all</em>
                </div>
                {['Priya M.', 'Arjun K.', 'Neha S.'].map((n) => (
                  <div key={n} className={`film-aud-row${flags.select ? ' is-on' : ''}`}>
                    <i />
                    <strong>{n}</strong>
                    <em>WA Opt-in</em>
                  </div>
                ))}
                <span className="film-px__btn is-aim" style={{ marginTop: 8 }}>
                  Choose template →
                </span>
              </div>
            </div>
          </>
        ) : null}

        {flags.msg && !flags.sent ? (
          <>
            <div className="film-wiz">
              <span className="is-done">1 Audience</span>
              <span className="is-on">2 Message</span>
              <span>3 Review</span>
            </div>
            <div className="film-camp-compose is-on">
              <img src={PRODUCT_IMG} alt="" />
              <div>
                <strong>Serum restock</strong>
                <p>Approved template · en · WhatsApp</p>
              </div>
            </div>
            <span className="film-px__btn is-aim">Continue to review →</span>
          </>
        ) : null}

        {flags.sent ? (
          <>
            <div className="film-campui__top">
              <div>
                <h3>Serum restock</h3>
                <p>Completed · just now</p>
              </div>
              <span className="film-badge is-ok">COMPLETED</span>
            </div>
            <div className="film-campui__kpis">
              <div>
                <em>Sent</em>
                <strong>2,142</strong>
              </div>
              <div>
                <em>Delivered</em>
                <strong>1,986</strong>
              </div>
              <div>
                <em>Read</em>
                <strong>78%</strong>
              </div>
              <div className={flags.lift ? 'is-hot' : ''}>
                <em>Attributed revenue</em>
                <strong>{revenue}</strong>
              </div>
            </div>
            <div className="film-camp-bar">
              <i style={{ width: flags.buy ? '82%' : flags.lift ? '55%' : '30%' }} />
            </div>
            <div className="film-camp-meta">
              <span>
                Orders <b className={flags.lift ? 'is-hot' : ''}>+{orders}</b>
              </span>
              <span>People buying now</span>
            </div>
            {flags.buy ? <div className="film-attr is-show">Broadcast lift · {revenue}</div> : null}
          </>
        ) : null}
      </div>
    </FilmStage>
  );
}
