import type { FilmBeat } from '../types';
import { useFilmTimeline } from '../useFilmTimeline';
import { useReducedMotion } from '../useReducedMotion';
import FilmStage from '../FilmStage';

const PRODUCT_IMG = '/marketing/products/vitamin-c-serum.jpg';

const TIMELINE: FilmBeat[] = [
  { ms: 2000, cam: 'is-cam-wide', phone: 'hidden', flags: { setup: true } },
  { ms: 1500, cam: 'is-cam-pixel', phone: 'hidden', flags: { setup: true, aim: true } },
  { ms: 1600, cam: 'is-cam-pixel', phone: 'hidden', flags: { connected: true } },
  {
    ms: 1600,
    cam: 'is-cam-pixel',
    phone: 'hidden',
    flags: { connected: true, e1: true },
  },
  {
    ms: 1600,
    cam: 'is-cam-insights',
    phone: 'hidden',
    flags: { connected: true, e1: true, e2: true, table: true },
  },
  {
    ms: 1700,
    cam: 'is-cam-insights-kpi',
    phone: 'hidden',
    flags: { connected: true, e1: true, e2: true, e3: true, table: true },
  },
  {
    ms: 2100,
    cam: 'is-cam-wide',
    phone: 'hidden',
    flags: { connected: true, e1: true, e2: true, e3: true, table: true, cta: true },
  },
];

const PRODUCTS = [
  { name: 'Vitamin C Serum', meta: '412 views · 61 ATC · 29 WA', hot: true },
  { name: 'Night Cream', meta: '188 views · 22 ATC · 9 WA', hot: false },
  { name: 'SPF 50', meta: '141 views · 18 ATC · 6 WA', hot: false },
];

export default function PixelInsightsFilm({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotion();
  const { cam, phone, flags } = useFilmTimeline({
    beats: TIMELINE,
    active,
    reducedMotion,
  });

  return (
    <FilmStage cam={cam} phone={phone} showPhone={false}>
      <div className="film-px">
        <div className="film-px__head">
          <div>
            <h3>Website pixel</h3>
            <p>Connect · stream visits · match WhatsApp numbers</p>
          </div>
          <span className={`film-px__status${flags.connected ? ' is-ok' : ''}`}>
            {flags.connected ? 'Connected' : 'Not connected'}
          </span>
        </div>

        {!flags.connected ? (
          <div className="film-px__setup">
            <strong>Connect website pixel</strong>
            <p>
              One click installs on Shopify. Track views, scroll, and carts — then message matched
              shoppers on WhatsApp.
            </p>
            <span className={`film-px__btn${flags.aim ? ' is-aim' : ''}`}>Connect website pixel</span>
          </div>
        ) : (
          <>
            <div className="film-px__success">● Pixel connected · glowskin.co live</div>
            <div className="film-px__kpis">
              <div>
                <em>Visitors</em>
                <strong>{flags.e3 ? '48' : flags.e1 ? '22' : '12'}</strong>
              </div>
              <div>
                <em>Serum views</em>
                <strong>{flags.table ? '412' : '180'}</strong>
              </div>
              <div>
                <em>WA matched</em>
                <strong>{flags.cta ? '29' : flags.e2 ? '18' : '11'}</strong>
              </div>
            </div>

            <div className="film-px__grid">
              <div className="film-px__col">
                <strong className="film-px__label">Live events</strong>
                <div className="film-px__feed">
                  <div className={`film-event${flags.e1 ? ' is-show' : ''}`}>
                    <b>Viewed product</b> · Vitamin C Serum
                  </div>
                  <div className={`film-event${flags.e2 ? ' is-show' : ''}`}>
                    <b>Scrolled 62%</b> · Priya · +91…4821
                  </div>
                  <div className={`film-event${flags.e3 ? ' is-show' : ''}`}>
                    <b>Add to cart</b> · ₹1,899
                  </div>
                </div>
              </div>
              <div className="film-px__col">
                <strong className="film-px__label">Product insights</strong>
                {(flags.table ? PRODUCTS : PRODUCTS.slice(0, 1)).map((p) => (
                  <div key={p.name} className={`film-px__row${p.hot && flags.table ? ' is-hot' : ''}`}>
                    <img src={PRODUCT_IMG} alt="" />
                    <div>
                      <strong>{p.name}</strong>
                      <span>{p.meta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {flags.cta ? (
              <div className="film-attr is-show">Create campaign → message these shoppers</div>
            ) : null}
          </>
        )}
      </div>
    </FilmStage>
  );
}
