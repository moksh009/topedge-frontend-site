import { Check, Shield } from 'lucide-react';
import type { FilmBeat } from '../types';
import { useFilmTimeline } from '../useFilmTimeline';
import { useReducedMotion } from '../useReducedMotion';
import FilmStage from '../FilmStage';

const PRODUCT_IMG = '/marketing/products/vitamin-c-serum.jpg';

const TIMELINE: FilmBeat[] = [
  { ms: 2000, cam: 'is-cam-wide', phone: 'hidden', flags: {} },
  { ms: 1400, cam: 'is-cam-warranty', phone: 'hidden', flags: { on: true } },
  {
    ms: 1500,
    cam: 'is-cam-warranty',
    phone: 'hidden',
    flags: { on: true, fields: true },
  },
  {
    ms: 1300,
    cam: 'is-cam-save',
    phone: 'hidden',
    flags: { on: true, fields: true, savePulse: true, saved: true },
  },
  {
    ms: 900,
    cam: 'is-cam-wide',
    phone: 'enter',
    flags: { on: true, fields: true, saved: true },
  },
  {
    ms: 1500,
    cam: 'is-cam-wide',
    phone: 'visible',
    flags: { on: true, fields: true, saved: true, userAsk: true },
  },
  {
    ms: 1300,
    cam: 'is-cam-wide',
    phone: 'visible',
    flags: { on: true, fields: true, saved: true, userAsk: true, fetching: true },
  },
  {
    ms: 1400,
    cam: 'is-cam-wide',
    phone: 'visible',
    flags: {
      on: true,
      fields: true,
      saved: true,
      userAsk: true,
      fetching: true,
      fetched: true,
      toast: true,
    },
  },
  {
    ms: 2000,
    cam: 'is-cam-wide',
    phone: 'visible',
    flags: {
      on: true,
      fields: true,
      saved: true,
      userAsk: true,
      fetched: true,
      toast: true,
      reply: true,
    },
  },
  {
    ms: 1600,
    cam: 'is-cam-wide',
    phone: 'visible',
    flags: {
      on: true,
      fields: true,
      saved: true,
      userAsk: true,
      fetched: true,
      toast: true,
      reply: true,
      thanks: true,
      done: true,
    },
  },
];

export default function WarrantyFilm({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotion();
  const { cam, phone, flags, beatIndex } = useFilmTimeline({
    beats: TIMELINE,
    active,
    reducedMotion,
  });

  return (
    <FilmStage
      cam={cam}
      phone={phone}
      desktopOverlay={
        flags.toast ? (
          <div className="film-toast" key={`w-${beatIndex}`}>
            <span className="film-toast__ico is-vio">
              <Shield className="h-3.5 w-3.5" />
            </span>
            <div>
              <strong>{flags.reply ? 'Warranty details sent' : 'Fetching warranty…'}</strong>
              <em>#TE-1042 · Vitamin C Serum · 12 months</em>
            </div>
          </div>
        ) : null
      }
      phoneChildren={
        <>
          <span className="hero-duo__wa-day">Today</span>
          {flags.userAsk ? (
            <div className="hero-duo__bubble hero-duo__bubble--user hero-duo__fade">
              <p>What’s the warranty on my Vitamin C Serum? Order #TE-1042</p>
              <time>4:02</time>
            </div>
          ) : null}
          {flags.fetching && !flags.reply ? (
            <div className="hero-duo__bubble hero-duo__bubble--system hero-duo__fade">
              {flags.fetched ? 'Warranty found · drafting reply…' : 'Looking up order warranty…'}
            </div>
          ) : null}
          {flags.fetching && !flags.reply && !flags.fetched ? (
            <div className="hero-duo__typing hero-duo__typing--store hero-duo__fade" aria-hidden>
              <i />
              <i />
              <i />
            </div>
          ) : null}
          {flags.reply ? (
            <div className="hero-duo__bubble hero-duo__bubble--store hero-duo__bubble--tpl hero-duo__fade">
              <div className="hero-duo__tpl-media">
                <img src={PRODUCT_IMG} alt="" />
              </div>
              <div className="hero-duo__tpl-body">
                <strong className="hero-duo__tpl-title">Warranty · Vitamin C Serum</strong>
                <span className="hero-duo__tpl-sub">Order #TE-1042 · Valid 12 months</span>
                <p>
                  Your product includes <b>12-month warranty</b> for manufacturing defects, starting
                  on delivery. Coverage ends <b>12 Sep 2027</b>.
                </p>
                <div className="hero-duo__bubble-cta">Reply CLAIM to start</div>
                <time>
                  4:03 <span className="hero-duo__ticks">✓✓</span>
                </time>
              </div>
            </div>
          ) : null}
          {flags.thanks ? (
            <div className="hero-duo__bubble hero-duo__bubble--user hero-duo__fade">
              <p>Perfect, thanks!</p>
              <time>4:04</time>
            </div>
          ) : null}
          {flags.done ? (
            <div className="hero-duo__bubble hero-duo__bubble--system hero-duo__fade is-paid-pill">
              Warranty confirmed · customer notified
            </div>
          ) : null}
        </>
      }
    >
      <div className="film-warr">
        <div className="film-warr__product">
          <img src={PRODUCT_IMG} alt="" />
          <strong>Vitamin C Serum</strong>
          <span>₹1,899 · SKU-VC-30 · In catalog</span>
          <div className={`film-warr__badge${flags.saved ? ' is-on' : ''}`}>
            <Shield className="h-3 w-3" />
            Warranty · 12 mo
          </div>
        </div>
        <div className="film-warr__form">
          <h4>Assign warranty</h4>
          <div className={`film-toggle${flags.on ? ' is-on' : ''}`}>
            <span>Enable for this product</span>
            <i />
          </div>
          <div className={`film-field${flags.fields ? ' is-on' : ''}`}>
            <label>Duration</label>
            <div>12 months</div>
          </div>
          <div className={`film-field${flags.fields ? ' is-on' : ''}`}>
            <label>Coverage</label>
            <div>Manufacturing defects</div>
          </div>
          <div className={`film-field${flags.fields ? ' is-on' : ''}`}>
            <label>Starts</label>
            <div>On delivery</div>
          </div>
          <div className={`film-field${flags.fields ? ' is-on' : ''}`}>
            <label>WhatsApp claim</label>
            <div>Customer replies CLAIM in chat</div>
          </div>
          <button
            type="button"
            className={`film-btn is-primary${flags.savePulse ? ' is-pulse' : ''}`}
            style={{ width: '100%', marginTop: 8 }}
          >
            {flags.saved ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, justifyContent: 'center', width: '100%' }}>
                <Check className="h-3.5 w-3.5" /> Saved
              </span>
            ) : (
              'Save warranty'
            )}
          </button>
        </div>
      </div>
    </FilmStage>
  );
}
