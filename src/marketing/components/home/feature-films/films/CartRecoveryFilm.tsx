import {
  ArrowLeftRight,
  Check,
  Flag,
  MessageSquare,
  PackageCheck,
  Plus,
  ShoppingBag,
  Timer,
  Zap,
} from 'lucide-react';
import type { FilmBeat } from '../types';
import { useFilmTimeline } from '../useFilmTimeline';
import { useReducedMotion } from '../useReducedMotion';
import FilmStage from '../FilmStage';
import FilmJourneyLink from '../FilmJourneyLink';

const PRODUCT_IMG = '/marketing/products/vitamin-c-serum.jpg';

const TIMELINE: FilmBeat[] = [
  { ms: 2200, cam: 'is-cam-wide', phone: 'hidden', flags: { entryOn: true } },
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
    ms: 1700,
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
    ms: 1200,
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
    },
  },
  {
    ms: 2200,
    cam: 'is-cam-wide',
    phone: 'visible',
    flags: {
      entryOn: true,
      midPlaced: true,
      linkA: true,
      endOn: true,
      linkB: true,
      published: true,
      liveRun: true,
      sending: true,
      nudge1: true,
    },
  },
  {
    ms: 2200,
    cam: 'is-cam-wide',
    phone: 'visible',
    flags: {
      entryOn: true,
      midPlaced: true,
      linkA: true,
      endOn: true,
      linkB: true,
      published: true,
      sent: true,
      nudge1: true,
      nudge2: true,
      recovered: true,
      converted: true,
      done: true,
    },
  },
];

export default function CartRecoveryFilm({ active }: { active: boolean }) {
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
            <strong>Abandoned cart</strong>
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
        flags.recovered ? (
          <div className="film-toast" key={`rec-${beatIndex}`}>
            <span className="film-toast__ico">
              <Check className="h-3.5 w-3.5" />
            </span>
            <div>
              <strong>Cart recovered</strong>
              <em>Checkout completed · ₹1,899</em>
            </div>
          </div>
        ) : null
      }
      phoneChildren={
        <>
          <span className="hero-duo__wa-day">Today</span>
          {flags.nudge1 ? (
            <div className="hero-duo__bubble hero-duo__bubble--store hero-duo__bubble--tpl hero-duo__fade">
              <div className="hero-duo__tpl-media">
                <img src={PRODUCT_IMG} alt="" />
              </div>
              <div className="hero-duo__tpl-body">
                <strong className="hero-duo__tpl-title">Vitamin C Serum</strong>
                <span className="hero-duo__tpl-sub">Left in cart · ₹1,899</span>
                <p>
                  You left <b>Vitamin C Serum</b> in your cart. Complete checkout before it’s gone.
                </p>
                <div className="hero-duo__bubble-cta">Complete checkout →</div>
                <time>
                  9:41 <span className="hero-duo__ticks">✓✓</span>
                </time>
              </div>
            </div>
          ) : null}
          {flags.nudge2 ? (
            <div className="hero-duo__bubble hero-duo__bubble--store hero-duo__bubble--tpl hero-duo__fade">
              <div className="hero-duo__tpl-body hero-duo__tpl-body--solo">
                <strong className="hero-duo__tpl-title">Still reserved for you</strong>
                <span className="hero-duo__tpl-sub">Nudge #2 · 2h later</span>
                <p>
                  Your cart is waiting — <b>₹1,899</b>. Finish before stock runs out.
                </p>
                <div className={`hero-duo__bubble-cta${flags.recovered ? ' is-paid' : ''}`}>
                  {flags.recovered ? 'Purchased ✓' : 'Buy now →'}
                </div>
                <time>
                  11:44 <span className="hero-duo__ticks">✓✓</span>
                </time>
              </div>
            </div>
          ) : null}
          {flags.recovered ? (
            <div className="hero-duo__bubble hero-duo__bubble--system hero-duo__fade is-paid-pill">
              Recovered · order placed ₹1,899
            </div>
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
                <p>Cart abandoned · Shopify</p>
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
                      <MessageSquare />
                    </span>
                    <strong>Cart recovery</strong>
                  </div>
                  <div className="film-card__body">
                    <p>Wait 15m → nudge #1 · Wait 2h → #2</p>
                    <div className="film-tpl">
                      <img src={PRODUCT_IMG} alt="" />
                      <div>
                        <span>Template</span>
                        <strong>cart_recovery</strong>
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
                  Drop cart recovery
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
                    ? 'Checkout recovered · complete'
                    : 'Journey ends here. Enrollment completes.'}
                </p>
                {flags.done ? (
                  <span className="film-live">+₹1,899 recovered</span>
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
              <ShoppingBag />
              Cart recovery
            </div>
            <div className="film-step is-muted">
              <ArrowLeftRight />
              COD → prepaid
            </div>
            <div className="film-step is-muted">
              <PackageCheck />
              Order status
            </div>
            <div className="film-steps__sec">Control</div>
            <div className="film-step is-muted">
              <Timer />
              Wait
            </div>
          </aside>
        </div>
      </div>
    </FilmStage>
  );
}
