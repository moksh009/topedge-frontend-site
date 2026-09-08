import {
  ArrowLeftRight,
  Check,
  Flag,
  MapPin,
  PackageCheck,
  Plus,
  Zap,
} from 'lucide-react';
import type { FilmBeat } from '../types';
import { useFilmTimeline } from '../useFilmTimeline';
import { useReducedMotion } from '../useReducedMotion';
import FilmStage from '../FilmStage';
import FilmJourneyLink from '../FilmJourneyLink';

const PRODUCT_IMG = '/marketing/products/vitamin-c-serum.jpg';

const TIMELINE: FilmBeat[] = [
  { ms: 2100, cam: 'is-cam-wide', phone: 'hidden', flags: { entryOn: true } },
  { ms: 1700, cam: 'is-cam-node-entry', phone: 'hidden', flags: { entryOn: true } },
  {
    ms: 1800,
    cam: 'is-cam-drag',
    phone: 'hidden',
    flags: { entryOn: true, dragging: true },
  },
  {
    ms: 1800,
    cam: 'is-cam-node-mid',
    phone: 'hidden',
    flags: { entryOn: true, midPlaced: true, linkA: true },
  },
  {
    ms: 1600,
    cam: 'is-cam-node-end',
    phone: 'hidden',
    flags: { entryOn: true, midPlaced: true, linkA: true, endOn: true, linkB: true },
  },
  {
    ms: 1700,
    cam: 'is-cam-publish',
    phone: 'hidden',
    flags: {
      entryOn: true,
      midPlaced: true,
      linkA: true,
      endOn: true,
      linkB: true,
      publishPulse: true,
      published: true,
    },
  },
  {
    ms: 1100,
    cam: 'is-cam-wide',
    phone: 'enter',
    flags: {
      entryOn: true,
      midPlaced: true,
      linkA: true,
      endOn: true,
      linkB: true,
      published: true,
      liveRun: true,
      building: true,
    },
  },
  {
    ms: 1600,
    cam: 'is-cam-order',
    phone: 'visible',
    flags: {
      entryOn: true,
      midPlaced: true,
      linkA: true,
      endOn: true,
      linkB: true,
      published: true,
      liveRun: true,
      enrolled: true,
      sending: true,
    },
  },
  {
    ms: 1800,
    cam: 'is-cam-wide',
    phone: 'visible',
    flags: {
      entryOn: true,
      midPlaced: true,
      linkA: true,
      endOn: true,
      linkB: true,
      published: true,
      enrolled: true,
      payShown: true,
      tapping: true,
      sent: true,
    },
  },
  {
    ms: 2000,
    cam: 'is-cam-paid',
    phone: 'visible',
    flags: {
      entryOn: true,
      midPlaced: true,
      linkA: true,
      endOn: true,
      linkB: true,
      published: true,
      enrolled: true,
      payShown: true,
      paid: true,
      converted: true,
      done: true,
      sent: true,
    },
  },
];

export default function JourneyCodFilm({ active }: { active: boolean }) {
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
      desktopChrome={
        <div className="film-journey__bar">
          <div className="film-journey__bar-left">
            <em>Journeys /</em>
            <strong>COD → prepaid</strong>
          </div>
          <div className="film-journey__bar-actions">
            <span
              className={`film-pill${flags.published ? ' is-live' : ''}${flags.liveRun ? ' is-run' : ''}`}
            >
              {!flags.published ? 'Draft' : flags.liveRun ? 'Live · running' : 'Live'}
            </span>
            <span
              className={`film-btn is-primary${flags.publishPulse ? ' is-pulse' : ''}${flags.published ? ' is-done' : ''}`}
            >
              {flags.published ? 'Published' : 'Publish'}
            </span>
          </div>
        </div>
      }
      desktopOverlay={
        flags.enrolled && !flags.paid ? (
          <div className="film-toast" key={`en-${beatIndex}`}>
            <span className="film-toast__ico">
              <PackageCheck className="h-3.5 w-3.5" />
            </span>
            <div>
              <strong>New COD order enrolled</strong>
              <em>#TE-1042 · Vitamin C Serum · ₹1,899</em>
            </div>
          </div>
        ) : flags.paid ? (
          <div className="film-toast" key={`pd-${beatIndex}`}>
            <span className="film-toast__ico">
              <Check className="h-3.5 w-3.5" />
            </span>
            <div>
              <strong>Payment received</strong>
              <em>#TE-1042 · prepaid ₹1,799</em>
            </div>
          </div>
        ) : null
      }
      phoneChildren={
        <>
          <span className="hero-duo__wa-day">Today</span>
          {flags.building ? (
            <div className="hero-duo__bubble hero-duo__bubble--system hero-duo__fade">
              Building journey · COD → prepaid
            </div>
          ) : null}
          {flags.enrolled ? (
            <div className="hero-duo__bubble hero-duo__bubble--system hero-duo__fade">
              New order · enrolled
            </div>
          ) : null}
          {flags.payShown ? (
            <div
              className={`hero-duo__bubble hero-duo__bubble--store hero-duo__bubble--tpl hero-duo__fade${flags.tapping ? ' is-target' : ''}${flags.paid ? ' is-paid' : ''}`}
            >
              <div className="hero-duo__tpl-media">
                <img src={PRODUCT_IMG} alt="" />
              </div>
              <div className="hero-duo__tpl-body">
                <strong className="hero-duo__tpl-title">Vitamin C Serum</strong>
                <span className="hero-duo__tpl-sub">Order #TE-1042 · COD</span>
                <p>
                  Hi Moksh, your COD order is confirmed. Pay online now — <b>₹100 off</b>.
                </p>
                <div
                  className={`hero-duo__bubble-cta${flags.paid ? ' is-paid' : ''}${flags.tapping ? ' is-tap' : ''}`}
                >
                  {flags.paid ? 'Paid ₹1,799 ✓' : 'Pay ₹1,799 →'}
                </div>
                <time>
                  9:44 <span className="hero-duo__ticks">✓✓</span>
                </time>
              </div>
            </div>
          ) : null}
          {flags.paid ? (
            <div className="hero-duo__bubble hero-duo__bubble--system hero-duo__fade is-paid-pill">
              Paid ₹1,799 · order confirmed
            </div>
          ) : null}
          {flags.paid ? (
            <>
              <div className="hero-duo__phone-veil" aria-hidden />
              <div className="hero-duo__paymodal hero-duo__paymodal--phone">
                <span className="hero-duo__paymodal-seal">
                  <Check className="h-4 w-4" />
                </span>
                <strong>Payment received</strong>
                <span className="hero-duo__paymodal-amt">₹1,799</span>
                <em>COD converted · same-day dispatch</em>
              </div>
            </>
          ) : null}
        </>
      }
    >
      <div className="film-journey film-journey--lens">
        <div className="film-journey__body">
          <div className="film-journey__canvas">
            <div
              className={`film-card is-entry${flags.entryOn ? ' is-on' : ''}${flags.sending ? ' is-fire' : ''}`}
            >
              <div className="film-card__head">
                <span className="film-card__ico">
                  <Zap />
                </span>
                <strong>Entry</strong>
                <span className="film-chip">TRIGGER</span>
              </div>
              <div className="film-card__body">
                <em>Enter when</em>
                <p>Order placed · COD only</p>
                {flags.sending ? <span className="film-live">Live path</span> : null}
              </div>
              <i className="film-port film-port--out" />
            </div>

            <FilmJourneyLink
              on={Boolean(flags.linkA || flags.dragging || flags.midPlaced)}
              flow={Boolean(flags.sending)}
            />

            <div
              className={`film-card is-action${flags.midPlaced ? ' is-on' : ' is-drop'}${flags.dragging && !flags.midPlaced ? ' is-await' : ''}${flags.sending ? ' is-fire' : ''}`}
            >
              {flags.midPlaced ? (
                <>
                  <div className="film-card__head">
                    <span className="film-card__ico is-soft">
                      <ArrowLeftRight />
                    </span>
                    <strong>COD → prepaid</strong>
                  </div>
                  <div className="film-card__body">
                    <p>₹100 prepaid discount · Expires after 2 hours</p>
                    <div className="film-tpl">
                      <img src={PRODUCT_IMG} alt="" />
                      <div>
                        <span>Template</span>
                        <strong>order_final</strong>
                      </div>
                    </div>
                    {flags.sending || flags.sent ? <span className="film-live">Live path</span> : null}
                  </div>
                  <i className="film-port film-port--in" />
                  <i className="film-port film-port--out" />
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" />
                  Drop COD → prepaid
                </>
              )}
            </div>

            <FilmJourneyLink
              on={Boolean(flags.linkB)}
              flow={Boolean(flags.converted || flags.sending)}
            />

            <div
              className={`film-card is-end${flags.endOn ? ' is-on' : ''}${flags.done ? ' is-fire' : ''}`}
            >
              <div className="film-card__head">
                <span className="film-card__ico is-end">
                  <Flag />
                </span>
                <strong>End Journey</strong>
                <span className="film-chip is-end">END</span>
              </div>
              <div className="film-card__body">
                <p>
                  {flags.done
                    ? 'Payment received · complete'
                    : 'Journey ends here. Enrollment completes.'}
                </p>
                {flags.done ? (
                  <span className="film-live">+₹1,799 prepaid</span>
                ) : flags.endOn ? (
                  <span className="film-live">Live path</span>
                ) : null}
              </div>
              <i className="film-port film-port--in" />
            </div>
          </div>

          <aside className="film-steps">
            <strong>Steps</strong>
            <em>Drag or tap + to add</em>
            <div className="film-steps__sec">Actions</div>
            <div
              className={`film-step${flags.dragging ? ' is-dragging' : ''}${flags.midPlaced ? ' is-used' : ''}`}
            >
              <ArrowLeftRight />
              COD → prepaid
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
    </FilmStage>
  );
}
