import { Check } from 'lucide-react';
import type { FilmBeat } from '../types';
import { useFilmTimeline } from '../useFilmTimeline';
import { useReducedMotion } from '../useReducedMotion';
import FilmStage from '../FilmStage';

const PRODUCT_IMG = '/marketing/products/vitamin-c-serum.jpg';

const MSG = `Hi Raj,

Restock order from *Glow Skin Co.* — 1 item, *50* units.

1. Vitamin C Serum | SKU-VC-30 | qty *50* | stock 8

Please confirm stock, price, and ETA. Thanks!`;

const TIMELINE: FilmBeat[] = [
  { ms: 2000, cam: 'is-cam-wide', phone: 'hidden', flags: {} },
  { ms: 1500, cam: 'is-cam-stock-row', phone: 'hidden', flags: { low: true } },
  {
    ms: 1500,
    cam: 'is-cam-draft',
    phone: 'hidden',
    flags: { low: true, modal: true },
  },
  {
    ms: 1600,
    cam: 'is-cam-supplier',
    phone: 'hidden',
    flags: { low: true, modal: true, supplier: true, qty: true },
  },
  {
    ms: 1400,
    cam: 'is-cam-send',
    phone: 'hidden',
    flags: { low: true, modal: true, supplier: true, qty: true, preview: true, confirmPulse: true },
  },
  {
    ms: 1000,
    cam: 'is-cam-wide',
    phone: 'enter',
    flags: { low: true },
  },
  {
    ms: 1400,
    cam: 'is-cam-wide',
    phone: 'visible',
    flags: { low: true, typingOut: true },
  },
  {
    ms: 2000,
    cam: 'is-cam-wide',
    phone: 'visible',
    flags: {
      low: true,
      msgSent: true,
      ticks: 1,
    },
  },
  {
    ms: 1700,
    cam: 'is-cam-wide',
    phone: 'visible',
    flags: {
      low: true,
      msgSent: true,
      ticks: 2,
      toast: true,
      replyTyping: true,
    },
  },
  {
    ms: 2000,
    cam: 'is-cam-wide',
    phone: 'visible',
    flags: {
      low: true,
      msgSent: true,
      ticks: 2,
      toast: true,
      reply: true,
      done: true,
    },
  },
];

export default function StockMonitorFilm({ active }: { active: boolean }) {
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
      phoneTitle="Raj Traders"
      phoneSubtitle="supplier · online"
      desktopOverlay={
        <>
          <div className={`film-modal-veil${flags.modal ? ' is-on' : ''}`} />
          <div className={`film-modal${flags.modal ? ' is-on' : ''}`}>
            <h4>Restock message</h4>
            <em>Edit qty & message — Confirm opens WhatsApp. Nothing sends until you tap Send there.</em>
            <label>Supplier</label>
            <div className="film-modal__field">
              {flags.supplier ? 'Raj Traders · +91 98765 43210' : 'Select supplier…'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ margin: 0 }}>Products (1)</label>
              <label style={{ margin: 0 }}>Order qty</label>
            </div>
            <div className="film-modal__prod">
              <img src={PRODUCT_IMG} alt="" />
              <div>
                <strong>Vitamin C Serum</strong>
                <span>Stock 8 · SKU-VC-30</span>
              </div>
              <div className="film-modal__qty">{flags.qty ? '50' : '—'}</div>
            </div>
            {flags.preview ? (
              <div className="film-wa-preview">
                <div className="film-wa-preview__top">
                  <span className="film-wa-preview__ava">R</span>
                  <div>
                    <strong>Raj Traders</strong>
                    <span>online</span>
                  </div>
                </div>
                <div className="film-wa-preview__body">
                  <div className="film-wa-preview__bubble" style={{ whiteSpace: 'pre-wrap' }}>
                    {MSG}
                  </div>
                </div>
              </div>
            ) : null}
            <div className="film-modal__actions">
              <span className="film-btn">Cancel</span>
              <span className={`film-btn is-primary${flags.confirmPulse ? ' is-pulse' : ''}`}>
                {flags.msgSent ? 'Opened WhatsApp ✓' : 'Confirm & open WhatsApp'}
              </span>
            </div>
          </div>
          {flags.toast ? (
            <div className="film-toast" key={`st-${beatIndex}`}>
              <span className="film-toast__ico">
                <Check className="h-3.5 w-3.5" />
              </span>
              <div>
                <strong>Sent to Raj Traders</strong>
                <em>50 units · WhatsApp delivered</em>
              </div>
            </div>
          ) : null}
        </>
      }
      phoneChildren={
        <>
          <span className="hero-duo__wa-day">Today</span>
          {flags.typingOut && !flags.msgSent ? (
            <div className="hero-duo__typing hero-duo__typing--user hero-duo__fade" aria-hidden>
              <i />
              <i />
              <i />
            </div>
          ) : null}
          {flags.msgSent ? (
            <div className="hero-duo__bubble hero-duo__bubble--user hero-duo__fade">
              <p style={{ whiteSpace: 'pre-wrap' }}>{MSG}</p>
              <time>
                2:14{' '}
                <span className="hero-duo__ticks">{flags.ticks === 2 ? '✓✓' : '✓'}</span>
              </time>
            </div>
          ) : null}
          {flags.replyTyping && !flags.reply ? (
            <div className="hero-duo__typing hero-duo__typing--store hero-duo__fade" aria-hidden>
              <i />
              <i />
              <i />
            </div>
          ) : null}
          {flags.reply ? (
            <div className="hero-duo__bubble hero-duo__bubble--store hero-duo__fade">
              <p>
                Got it — locking <b>50 units</b> of Vitamin C Serum. Dispatching tomorrow morning.
              </p>
              <time>
                2:15 <span className="hero-duo__ticks">✓✓</span>
              </time>
            </div>
          ) : null}
          {flags.done ? (
            <div className="hero-duo__bubble hero-duo__bubble--system hero-duo__fade is-paid-pill">
              Restock confirmed · +50 units
            </div>
          ) : null}
        </>
      }
    >
      <div className="film-sg">
        <div className="film-sg__head">
          <h3>Store growth</h3>
          <div className="film-sg__head-actions">
            <span className="film-btn">Sync catalog</span>
            <span className="film-btn is-primary">+ Add supplier</span>
          </div>
        </div>
        <div className="film-sg__kpis">
          <div className={`film-sg__kpi${flags.low ? ' is-hot' : ''}`}>
            <em>Need attention</em>
            <strong>1</strong>
            <b>Review soon</b>
          </div>
          <div className="film-sg__kpi">
            <em>Out of stock</em>
            <strong>0</strong>
          </div>
          <div className="film-sg__kpi">
            <em>Ready to WhatsApp</em>
            <strong>{flags.modal ? '1' : '0'}</strong>
          </div>
          <div className="film-sg__kpi">
            <em>Avg days left</em>
            <strong>4d</strong>
          </div>
        </div>
        <div className="film-sg__banner">
          <div>
            <span className="film-sg__banner-tag">Priority restock</span>
            <strong style={{ display: 'block', marginTop: 4 }}>Vitamin C Serum</strong>
            <span>3 sold · 8 left · near threshold</span>
          </div>
          <span className="film-btn is-primary">+ Add supplier</span>
        </div>
        <div className="film-sg__table">
          <div className="film-sg__tabs">
            <span className="is-on">Needs attention (1)</span>
            <span>Selling & low</span>
            <span>All SKUs</span>
          </div>
          <div className="film-sg__row is-head">
            <span>Product</span>
            <span>Stock</span>
            <span>Sold</span>
            <span>Days left</span>
            <span>Status</span>
          </div>
          <div className={`film-sg__row${flags.low ? ' is-low' : ''}`}>
            <div className="film-sg__prod">
              <img src={PRODUCT_IMG} alt="" />
              <span>Vitamin C Serum</span>
            </div>
            <span className="film-danger">8</span>
            <span>3</span>
            <span className="film-danger">4d</span>
            <span className="film-danger">Low stock</span>
          </div>
        </div>
      </div>
    </FilmStage>
  );
}
