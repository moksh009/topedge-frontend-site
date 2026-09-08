import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowLeftRight,
  Check,
  HelpCircle,
  Flag,
  GripVertical,
  LayoutGrid,
  MapPin,
  Menu,
  PackageCheck,
  Plus,
  Search,
  ShoppingBag,
  Truck,
  Zap,
} from 'lucide-react';
import { InstagramMark, WhatsAppMark } from '../foundation/BrandMarks';

const PRODUCT_IMG = '/marketing/products/vitamin-c-serum.jpg';

/**
 * Continuous film (option A):
 * Live Chat → COD→prepaid → Analytics tick-up → Address change →
 * Order delivered WhatsApp template → loop.
 */
type Scene = 'chat' | 'journey' | 'analytics' | 'address' | 'delivered';

type Beat = {
  ms: number;
  scene: Scene;
  cam: string;
  hold?: boolean;
};

const TIMELINE: Beat[] = [
  // —— Live Chat support ——
  // First beat of each act is long enough for the chapter card to finish
  { ms: 2600, scene: 'chat', cam: 'is-cam-wide' },
  { ms: 950, scene: 'chat', cam: 'is-cam-wide' },
  { ms: 1050, scene: 'chat', cam: 'is-cam-wide' },
  { ms: 1050, scene: 'chat', cam: 'is-cam-wide' },
  { ms: 1500, scene: 'chat', cam: 'is-cam-chat' },
  // —— COD → prepaid journey ——
  // zoom once → pan Entry → drag → mid → End (same zoom level) → publish → pull wide
  { ms: 2700, scene: 'journey', cam: 'is-cam-wide' },
  { ms: 1550, scene: 'journey', cam: 'is-cam-node-entry' },
  { ms: 1900, scene: 'journey', cam: 'is-cam-drag' },
  { ms: 1500, scene: 'journey', cam: 'is-cam-node-mid' },
  { ms: 1450, scene: 'journey', cam: 'is-cam-node-end' },
  { ms: 1400, scene: 'journey', cam: 'is-cam-publish', hold: true },
  { ms: 1200, scene: 'journey', cam: 'is-cam-publish' },
  { ms: 1350, scene: 'journey', cam: 'is-cam-order' },
  { ms: 1200, scene: 'journey', cam: 'is-cam-wide' },
  { ms: 1400, scene: 'journey', cam: 'is-cam-wide' },
  { ms: 1250, scene: 'journey', cam: 'is-cam-wide' },
  { ms: 1200, scene: 'journey', cam: 'is-cam-wide' },
  { ms: 1550, scene: 'journey', cam: 'is-cam-paid' },
  // —— Analytics — zoom once, pan KPI → charts → funnel (no zoom-out) ——
  { ms: 2800, scene: 'analytics', cam: 'is-cam-an-kpi' },
  { ms: 2300, scene: 'analytics', cam: 'is-cam-an-mid' },
  { ms: 2100, scene: 'analytics', cam: 'is-cam-an-bot' },
  // —— Address change support ——
  { ms: 2600, scene: 'address', cam: 'is-cam-wide' },
  { ms: 1200, scene: 'address', cam: 'is-cam-wide' },
  { ms: 1400, scene: 'address', cam: 'is-cam-support' },
  { ms: 1350, scene: 'address', cam: 'is-cam-wide' },
  { ms: 1550, scene: 'address', cam: 'is-cam-wide' },
  { ms: 1700, scene: 'address', cam: 'is-cam-wide' },
  // —— Order delivered journey ——
  // Entry → drag → mid → End → publish → send WA → success (mirrors COD grammar)
  { ms: 3800, scene: 'delivered', cam: 'is-cam-node-entry' },
  { ms: 2200, scene: 'delivered', cam: 'is-cam-drag' },
  { ms: 1700, scene: 'delivered', cam: 'is-cam-node-mid' },
  { ms: 1500, scene: 'delivered', cam: 'is-cam-node-end' },
  { ms: 1400, scene: 'delivered', cam: 'is-cam-publish', hold: true },
  { ms: 1200, scene: 'delivered', cam: 'is-cam-publish' },
  { ms: 1500, scene: 'delivered', cam: 'is-cam-order' },
  { ms: 1600, scene: 'delivered', cam: 'is-cam-wide' },
  { ms: 1800, scene: 'delivered', cam: 'is-cam-paid' },
  { ms: 1500, scene: 'delivered', cam: 'is-cam-wide' },
];

const LAST = TIMELINE.length - 1;

const ACT_FOR_SCENE: Record<Scene, string> = {
  chat: 'Act 1 · Live Chat',
  journey: 'Act 2 · COD→prepaid',
  analytics: 'Act 3 · Analytics',
  address: 'Act 4 · Address',
  delivered: 'Act 5 · Delivered',
};

const SCENE_CARD: Record<Scene, { eyebrow: string; title: string; sub: string }> = {
  chat: {
    eyebrow: 'Act 1',
    title: 'Live Chat',
    sub: 'Support with Shopify order context',
  },
  journey: {
    eyebrow: 'Act 2 · Journey',
    title: 'COD → prepaid',
    sub: 'Recover the order before it ships',
  },
  analytics: {
    eyebrow: 'Act 3',
    title: 'Platform Analytics',
    sub: 'Revenue attributed to WhatsApp',
  },
  address: {
    eyebrow: 'Act 4 · Live Chat',
    title: 'Address change',
    sub: 'Agent updates shipping in thread',
  },
  delivered: {
    eyebrow: 'Act 5 · Journey',
    title: 'Order delivered',
    sub: 'Ask for review · reorder CTA',
  },
};

function isSceneStart(beat: number): boolean {
  if (beat <= 0) return true;
  return TIMELINE[beat]?.scene !== TIMELINE[beat - 1]?.scene;
}

function cursorScheduled(beat: number): string {
  if (beat === 7) return 'drag (Steps→canvas)';
  if (beat === 10) return 'publish aim';
  if (beat === 11) return 'publish click';
  if (beat === 15) return 'pay tap (phone)';
  if (beat === 28) return 'drag delivered note';
  if (beat === 31) return 'publish aim (delivered)';
  if (beat === 32) return 'publish click (delivered)';
  return 'none';
}

function useHeroDebugFlag() {
  const [debug, setDebug] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('heroDebug') === '1') setDebug(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'D' && e.shiftKey && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setDebug((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return debug;
}

function useSmoothCam(beat: number, _freeze = false) {
  // Hold each timeline cam for the full beat — no mid-beat zoom-out.
  // Zoom-out only when the next beat is explicitly `is-cam-wide`.
  return TIMELINE[beat]?.cam ?? 'is-cam-wide';
}

export default function HeroJourneyStage() {
  const debug = useHeroDebugFlag();
  const [beat, setBeat] = useState(0);
  const [loop, setLoop] = useState(0);
  const cam = useSmoothCam(beat, debug);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (debug) return; // paused — manual step only
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBeat(LAST);
      return;
    }

    let b = 0;
    let timer = 0;
    const run = () => {
      timer = window.setTimeout(() => {
        if (b >= LAST) {
          b = 0;
          setLoop((n) => n + 1);
        } else {
          b += 1;
        }
        setBeat(b);
        run();
      }, TIMELINE[b]?.ms ?? 1200);
    };
    run();
    return () => window.clearTimeout(timer);
  }, [debug]);

  useEffect(() => {
    if (!debug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'l') {
        e.preventDefault();
        setBeat((b) => (b >= LAST ? 0 : b + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'h') {
        e.preventDefault();
        setBeat((b) => (b <= 0 ? LAST : b - 1));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setBeat(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setBeat(LAST);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [debug]);

  const scene = TIMELINE[beat]?.scene ?? 'chat';
  const spec = TIMELINE[beat];
  const chapter = isSceneStart(beat);

  return (
    <div className={`hero-duo${debug ? ' is-debug' : ''}`} aria-label="TopEdge product demo">
      {debug ? (
        <div className="hero-duo__debug" role="status">
          <div className="hero-duo__debug-row">
            <strong>
              Beat {beat}/{LAST}
            </strong>
            <span>{ACT_FOR_SCENE[scene]}</span>
          </div>
          <div className="hero-duo__debug-row">
            <span>scene: {scene}</span>
            <span>cam: {cam}</span>
          </div>
          <div className="hero-duo__debug-row">
            <span>duration: {spec?.ms ?? 0}ms</span>
            <span>hold: {spec?.hold ? 'true' : 'false'}</span>
          </div>
          <div className="hero-duo__debug-row">
            <span>cursor: {cursorScheduled(beat)}</span>
            <span>loop#: {loop}</span>
          </div>
          <div className="hero-duo__debug-actions">
            <button type="button" onClick={() => setBeat((b) => (b <= 0 ? LAST : b - 1))}>
              ← Prev
            </button>
            <button type="button" onClick={() => setBeat((b) => (b >= LAST ? 0 : b + 1))}>
              Next →
            </button>
          </div>
          <em>← → step · Shift+⌘/Ctrl+D toggle · ?heroDebug=1</em>
        </div>
      ) : null}

      <div
        className={`hero-duo__stage ${cam} is-scene-${scene}${chapter ? ' is-chapter' : ''}${debug ? ' is-debug-cam' : ''}`}
      >
        <div className="hero-duo__pair">
        <div className="hero-duo__desktop">
          <div className="hero-duo__viewport">
            <div className="hero-duo__lens">
              <SceneView show={scene === 'chat'}>
                <ChatDesktop beat={beat} loop={loop} mode="cod" />
              </SceneView>
              <SceneView show={scene === 'journey'}>
                <JourneyDesktop beat={beat} loop={loop} mode="cod" />
              </SceneView>
              <SceneView show={scene === 'analytics'}>
                <AnalyticsDesktop beat={beat} loop={loop} />
              </SceneView>
              <SceneView show={scene === 'address'}>
                <ChatDesktop beat={beat} loop={loop} mode="address" />
              </SceneView>
              <SceneView show={scene === 'delivered'}>
                <JourneyDesktop beat={beat} loop={loop} mode="delivered" />
              </SceneView>
            </div>

            {/* Success overlays sit outside the lens so cam pan/zoom doesn't shove them off-center */}
            {beat >= 12 && beat <= 13 ? <OrderToast key={`order-${loop}`} /> : null}
            {beat === 17 ? (
              <>
                <div className="hero-duo__veil" aria-hidden />
                <PaymentModal key={`dt-${loop}`} surface="desktop" kind="pay" />
              </>
            ) : null}
            {beat === 26 ? (
              <StatusToast
                key={`addr-${loop}`}
                title="Address updated"
                sub="#TE-1042 · Bandra West, Mumbai"
                tone="ok"
              />
            ) : null}
            {beat === 33 ? (
              <StatusToast
                key={`del-send-${loop}`}
                title="Sending to WhatsApp…"
                sub="Delivered note · Order #TE-1042"
                tone="violet"
              />
            ) : null}
            {beat === 35 ? (
              <>
                <div className="hero-duo__veil" aria-hidden />
                <PaymentModal key={`del-ok-${loop}`} surface="desktop" kind="delivered" />
              </>
            ) : null}

            {(scene === 'journey' && beat >= 10 && beat <= 11) ||
            (scene === 'delivered' && beat >= 31 && beat <= 32) ? (
              <PublishCursor key={`cur-pub-${loop}`} beat={beat} loop={loop} />
            ) : null}
          </div>
        </div>

        <PhonePanel beat={beat} loop={loop} scene={scene} />

        {/* Drag flight above phone so the node path stays visible */}
        {scene === 'journey' && beat === 7 ? (
          <PhysicalDragFlight
            key={`drag-cod-${loop}`}
            sourceKey="cod-prepaid"
            dropKey="cod-prepaid"
            label="COD → prepaid"
            icon={<ArrowLeftRight className="h-3 w-3" />}
          />
        ) : null}
        {scene === 'delivered' && beat === 28 ? (
          <PhysicalDragFlight
            key={`drag-del-${loop}`}
            sourceKey="order-delivered"
            dropKey="order-delivered"
            label="Delivered note"
            icon={<PackageCheck className="h-3 w-3" />}
          />
        ) : null}

        {/* Chapter card overlays both devices (desktop + phone) */}
        {chapter ? <SceneIntertitle key={`it-${scene}-${loop}`} scene={scene} /> : null}
      </div>
    </div>
  </div>
  );
}

function SceneView({ show, children }: { show: boolean; children: ReactNode }) {
  return <div className={`hero-duo__view${show ? ' is-show' : ' is-hide'}`}>{children}</div>;
}

function SceneIntertitle({ scene }: { scene: Scene }) {
  const card = SCENE_CARD[scene];
  return (
    <div className="hero-duo__intertitle" aria-hidden>
      <div className="hero-duo__intertitle-card">
        <em>{card.eyebrow}</em>
        <strong>{card.title}</strong>
        <span>{card.sub}</span>
      </div>
    </div>
  );
}

function CursorArrow({ className, clicking }: { className: string; clicking?: boolean }) {
  return (
    <div className={`${className}${clicking ? ' is-click' : ''}`} aria-hidden>
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
        <path
          d="M1.2 1.1v16.4l4.2-3.6 3.2 7.2 2.7-1.2-3.2-7.1h5.5L1.2 1.1Z"
          fill="#111"
          stroke="#fff"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
      </svg>
      {clicking ? <span className="hero-duo__click-ring" /> : null}
    </div>
  );
}

/** Pin cursor tip to Publish and aim the lens origin at the button. */
function PublishCursor({ beat, loop }: { beat: number; loop: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const aiming = beat === 10 || beat === 31;
  const clicking = beat === 11 || beat === 32;

  // Lock zoom origin onto Publish once per beat (untransformed measure)
  useLayoutEffect(() => {
    const viewport = document.querySelector('.hero-duo__viewport') as HTMLElement | null;
    const stage = document.querySelector('.hero-duo__stage') as HTMLElement | null;
    const lens = document.querySelector('.hero-duo__lens') as HTMLElement | null;
    const btn = document.querySelector(
      '.hero-duo__view.is-show .hero-duo__publish',
    ) as HTMLElement | null;
    if (!viewport || !stage || !lens || !btn) return;

    const prevTransform = lens.style.transform;
    const prevTransition = lens.style.transition;
    lens.style.transition = 'none';
    lens.style.transform = 'none';
    const vr = viewport.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    lens.style.transform = prevTransform;
    void lens.offsetWidth;
    lens.style.transition = prevTransition;

    const ox = ((br.left + br.width * 0.55 - vr.left) / Math.max(1, vr.width)) * 100;
    const oy = ((br.top + br.height * 0.45 - vr.top) / Math.max(1, vr.height)) * 100;
    stage.style.setProperty('--cam-ox', `${Math.max(70, Math.min(94, ox)).toFixed(1)}%`);
    stage.style.setProperty('--cam-oy', `${Math.max(4, Math.min(22, oy)).toFixed(1)}%`);

    return () => {
      stage.style.removeProperty('--cam-ox');
      stage.style.removeProperty('--cam-oy');
    };
  }, [beat, loop]);

  // Cursor follows the live (zoomed) Publish button
  useLayoutEffect(() => {
    const cursor = ref.current;
    const viewport = document.querySelector('.hero-duo__viewport') as HTMLElement | null;
    if (!cursor || !viewport) return;

    let raf = 0;
    let alive = true;
    const place = () => {
      if (!alive) return;
      const btn = document.querySelector(
        '.hero-duo__view.is-show .hero-duo__publish',
      ) as HTMLElement | null;
      if (btn) {
        const vr = viewport.getBoundingClientRect();
        const br = btn.getBoundingClientRect();
        cursor.style.left = `${br.left - vr.left + br.width * 0.55 - 2}px`;
        cursor.style.top = `${br.top - vr.top + br.height * 0.75 - 2}px`;
      }
      raf = requestAnimationFrame(place);
    };
    place();
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [beat, loop]);

  return (
    <div
      ref={ref}
      className={`hero-duo__cursor hero-duo__cursor--publish${aiming ? ' is-aim' : ' is-done'}${clicking ? ' is-click' : ''}`}
      aria-hidden
    >
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
        <path
          d="M1.2 1.1v16.4l4.2-3.6 3.2 7.2 2.7-1.2-3.2-7.1h5.5L1.2 1.1Z"
          fill="#111"
          stroke="#fff"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
      </svg>
      {clicking ? <span className="hero-duo__click-ring" /> : null}
    </div>
  );
}

/** Measure Steps-row → drop-zone and fly ghost+cursor along that vector. */
function PhysicalDragFlight({
  sourceKey,
  dropKey,
  label,
  icon,
}: {
  sourceKey: string;
  dropKey: string;
  label: string;
  icon: ReactNode;
}) {
  const ghostRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const pair = document.querySelector('.hero-duo__pair') as HTMLElement | null;
    const root = document.querySelector('.hero-duo__view.is-show');
    const source = root?.querySelector(`[data-drag-source="${sourceKey}"]`) as HTMLElement | null;
    const drop = root?.querySelector(`[data-drag-drop="${dropKey}"]`) as HTMLElement | null;
    const ghost = ghostRef.current;
    const cursor = cursorRef.current;
    if (!pair || !source || !drop || !ghost || !cursor) return;

    const place = () => {
      const pr = pair.getBoundingClientRect();
      const sr = source.getBoundingClientRect();
      const dr = drop.getBoundingClientRect();

      const fromX = sr.left - pr.left + sr.width * 0.12;
      const fromY = sr.top - pr.top + sr.height * 0.2;
      const toX = dr.left - pr.left + dr.width * 0.28;
      const toY = dr.top - pr.top + dr.height * 0.35;
      const dx = toX - fromX;
      const dy = toY - fromY;

      ghost.style.left = `${fromX}px`;
      ghost.style.top = `${fromY}px`;
      ghost.style.setProperty('--drag-dx', `${dx}px`);
      ghost.style.setProperty('--drag-dy', `${dy}px`);

      cursor.style.left = `${fromX + 36}px`;
      cursor.style.top = `${fromY + 10}px`;
      cursor.style.setProperty('--drag-dx', `${dx}px`);
      cursor.style.setProperty('--drag-dy', `${dy}px`);
    };

    place();
    const t1 = window.setTimeout(place, 80);
    const t2 = window.setTimeout(place, 220);
    const t3 = window.setTimeout(place, 480);

    drop.classList.add('is-await');
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      drop.classList.remove('is-await');
    };
  }, [sourceKey, dropKey]);

  return (
    <>
      <div ref={ghostRef} className="hero-duo__drag-ghost is-flight" aria-hidden>
        {icon}
        {label}
      </div>
      <div ref={cursorRef} className="hero-duo__cursor hero-duo__cursor--drag is-flight" aria-hidden>
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
          <path
            d="M1.2 1.1v16.4l4.2-3.6 3.2 7.2 2.7-1.2-3.2-7.1h5.5L1.2 1.1Z"
            fill="#111"
            stroke="#fff"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
}

function OrderToast() {
  return (
    <div className="hero-duo__toast hero-duo__toast--order" role="status">
      <div className="hero-duo__toast-icon hero-duo__toast-icon--order">
        <Zap className="h-3.5 w-3.5" strokeWidth={2.5} />
      </div>
      <div>
        <strong>New COD order enrolled</strong>
        <em>#TE-1042 · Journey live</em>
      </div>
    </div>
  );
}

function StatusToast({
  title,
  sub,
  tone,
}: {
  title: string;
  sub: string;
  tone: 'ok' | 'violet';
}) {
  return (
    <div className={`hero-duo__toast hero-duo__toast--${tone}`} role="status">
      <div className={`hero-duo__toast-icon hero-duo__toast-icon--${tone}`}>
        {tone === 'ok' ? (
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
        ) : (
          <PackageCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
        )}
      </div>
      <div>
        <strong>{title}</strong>
        <em>{sub}</em>
      </div>
    </div>
  );
}

function PaymentModal({
  surface,
  kind,
}: {
  surface: 'desktop' | 'phone';
  kind: 'pay' | 'delivered';
}) {
  const phone = surface === 'phone';
  const delivered = kind === 'delivered';
  return (
    <div className={`hero-duo__paymodal hero-duo__paymodal--${surface}`} role="status">
      <div className="hero-duo__paymodal-seal" aria-hidden>
        <Check className={phone ? 'h-4 w-4' : 'h-5 w-5'} strokeWidth={2.75} />
      </div>
      <strong>
        {delivered ? (phone ? 'Delivered!' : 'Review asked') : phone ? 'Payment Success!' : 'Payment Received!'}
      </strong>
      {!delivered ? <b className="hero-duo__paymodal-amt">₹1,799</b> : null}
      <em>
        {delivered
          ? 'Order #TE-1042 · WhatsApp opened'
          : phone
            ? 'Paid · order confirmed'
            : 'Successful from Moksh · COD → prepaid'}
      </em>
    </div>
  );
}

/** Beat 15: pin cursor tip to the live Pay CTA on the phone. */
function PayCursor({ loop }: { loop: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const cursor = ref.current;
    const phone = document.querySelector('.hero-duo__iphone') as HTMLElement | null;
    if (!cursor || !phone) return;

    let raf = 0;
    let alive = true;
    const place = () => {
      if (!alive) return;
      const btn = phone.querySelector('[data-pay-target="1"], .hero-duo__bubble-cta.is-tap') as HTMLElement | null;
      if (btn) {
        const pr = phone.getBoundingClientRect();
        const br = btn.getBoundingClientRect();
        cursor.style.left = `${br.left - pr.left + br.width * 0.55}px`;
        cursor.style.top = `${br.top - pr.top + br.height * 0.55}px`;
        cursor.style.right = 'auto';
        cursor.style.bottom = 'auto';
      }
      raf = requestAnimationFrame(place);
    };
    place();
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [loop]);

  return (
    <div ref={ref} className="hero-duo__cursor hero-duo__cursor--pay is-aim is-click" aria-hidden>
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
        <path
          d="M1.2 1.1v16.4l4.2-3.6 3.2 7.2 2.7-1.2-3.2-7.1h5.5L1.2 1.1Z"
          fill="#111"
          stroke="#fff"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
      </svg>
      <span className="hero-duo__click-ring" />
    </div>
  );
}

function TypingDots({ side }: { side: 'in' | 'bot' | 'user' | 'store' }) {
  return (
    <div className={`hero-duo__typing hero-duo__typing--${side}`} aria-hidden>
      <i />
      <i />
      <i />
    </div>
  );
}

function ChatDesktop({
  beat,
  loop,
  mode,
}: {
  beat: number;
  loop: number;
  mode: 'cod' | 'address';
}) {
  const isAddr = mode === 'address';
  const local = isAddr ? beat - 21 : beat;

  const preview = isAddr
    ? local >= 4
      ? 'Address updated ✓'
      : local >= 1
        ? 'Can I change delivery address?'
        : 'Online'
    : local >= 4
      ? 'Order #TE-1042 is packed…'
      : local >= 3
        ? 'Where is my COD order?'
        : local >= 1
          ? 'hi'
          : 'Online';

  return (
    <div className="hero-duo__chat" key={`${mode}-${loop}`}>
      <aside className="hero-duo__inbox">
        <div className="hero-duo__inbox-head">
          <strong>Inbox</strong>
          <div className="hero-duo__inbox-tools">
            <HelpCircle className="h-3 w-3" strokeWidth={2} />
            <Menu className="h-3 w-3" strokeWidth={2} />
            <Search className="h-3 w-3" strokeWidth={2} />
          </div>
        </div>

        <div className="hero-duo__inbox-channels" aria-hidden>
          <span className="is-on">
            <LayoutGrid className="h-3 w-3" strokeWidth={2.25} />
          </span>
          <span>
            <WhatsAppMark className="h-3 w-3" />
          </span>
          <span>
            <InstagramMark className="h-3 w-3" />
          </span>
        </div>

        <div className="hero-duo__inbox-list">
          <div className="hero-duo__inbox-row is-active">
            <span className="hero-duo__ava">
              M
              <i className="hero-duo__ava-badge">
                <WhatsAppMark className="h-2 w-2" />
              </i>
            </span>
            <div className="hero-duo__inbox-meta">
              <div className="hero-duo__inbox-top">
                <strong>Moksh Patel</strong>
                <time>now</time>
              </div>
              <em>{preview}</em>
            </div>
          </div>
          <div className="hero-duo__inbox-row">
            <span className="hero-duo__ava is-muted">
              A
              <i className="hero-duo__ava-badge">
                <WhatsAppMark className="h-2 w-2" />
              </i>
            </span>
            <div className="hero-duo__inbox-meta">
              <div className="hero-duo__inbox-top">
                <strong>Arjun K.</strong>
                <time>2h</time>
              </div>
              <em>Thanks!</em>
            </div>
          </div>
          <div className="hero-duo__inbox-row">
            <span className="hero-duo__ava is-muted">
              S
              <i className="hero-duo__ava-badge">
                <WhatsAppMark className="h-2 w-2" />
              </i>
            </span>
            <div className="hero-duo__inbox-meta">
              <div className="hero-duo__inbox-top">
                <strong>Smit Tilva</strong>
                <time>1d</time>
              </div>
              <em>Delivered ✓</em>
            </div>
          </div>
        </div>
      </aside>

      <div className="hero-duo__chatpane">
        <div className="hero-duo__chatpane-head">
          <div className="hero-duo__chatpane-who">
            <span className="hero-duo__ava hero-duo__ava--head">
              M
              <i className="hero-duo__ava-badge">
                <WhatsAppMark className="h-2 w-2" />
              </i>
            </span>
            <div>
              <strong>Moksh Patel</strong>
              <p>
                <WhatsAppMark className="h-3 w-3" />
                +91 98XXX XX210
              </p>
            </div>
          </div>
          <button type="button" className="hero-duo__take">
            {isAddr ? 'Agent · Live' : 'Take control'}
          </button>
        </div>

        <div className="hero-duo__chatpane-wall">
          <span className="hero-duo__day">Today</span>

          {!isAddr ? (
            <>
              {local === 0 ? <TypingDots side="in" /> : null}
              {local >= 1 ? (
                <div key={`d-hi-${loop}`} className="hero-duo__dbub hero-duo__dbub--in hero-duo__fade">
                  hi
                </div>
              ) : null}
              {local === 1 ? <TypingDots side="bot" /> : null}
              {local >= 2 ? (
                <div key={`d-hello-${loop}`} className="hero-duo__dbub hero-duo__dbub--bot hero-duo__fade">
                  <span className="hero-duo__bot-tag">(BOT)</span>
                  Hi Moksh! How can we help with your order today?
                </div>
              ) : null}
              {local === 2 ? <TypingDots side="in" /> : null}
              {local >= 3 ? (
                <div key={`d-cod-${loop}`} className="hero-duo__dbub hero-duo__dbub--in hero-duo__fade">
                  Where is my COD order?
                </div>
              ) : null}
              {local === 3 ? <TypingDots side="bot" /> : null}
              {local >= 4 ? (
                <div key={`d-order-${loop}`} className="hero-duo__dbub hero-duo__dbub--bot hero-duo__fade">
                  <span className="hero-duo__bot-tag">(BOT)</span>
                  #TE-1042 is packed. Convert COD → prepaid for same-day dispatch?
                  <div className="hero-duo__order-chip">
                    <img src={PRODUCT_IMG} alt="" />
                    <div>
                      <span>Order #TE-1042 · Shopify</span>
                      <strong>Vitamin C Serum × 1</strong>
                      <em>COD · ₹1,899</em>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <>
              {local === 0 ? <TypingDots side="in" /> : null}
              {local >= 1 ? (
                <div key={`a-ask-${loop}`} className="hero-duo__dbub hero-duo__dbub--in hero-duo__fade">
                  Can I change the delivery address for #TE-1042?
                </div>
              ) : null}
              {local === 1 ? <TypingDots side="bot" /> : null}
              {local >= 2 ? (
                <div key={`a-bot-${loop}`} className="hero-duo__dbub hero-duo__dbub--bot hero-duo__fade">
                  <span className="hero-duo__bot-tag">(BOT)</span>
                  Sure — send the new address and we’ll update Shopify before dispatch.
                </div>
              ) : null}
              {local === 2 ? <TypingDots side="in" /> : null}
              {local >= 3 ? (
                <div key={`a-addr-${loop}`} className="hero-duo__dbub hero-duo__dbub--in hero-duo__fade">
                  14th Floor, Bandra West, Mumbai 400050
                </div>
              ) : null}
              {local === 3 ? <TypingDots side="bot" /> : null}
              {local >= 4 ? (
                <div key={`a-done-${loop}`} className="hero-duo__dbub hero-duo__dbub--bot hero-duo__fade">
                  <span className="hero-duo__bot-tag">(AGENT)</span>
                  Address updated on Shopify. Confirmation coming on WhatsApp.
                  <div className="hero-duo__addr-chip">
                    <MapPin className="h-3 w-3" />
                    <div>
                      <span>Shipping updated</span>
                      <strong>Bandra West, Mumbai 400050</strong>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>

        <div className="hero-duo__composer" aria-hidden>
          <span>{isAddr ? 'Agent has control…' : 'Pause the bot or take control to reply…'}</span>
          <i />
        </div>
      </div>
    </div>
  );
}

function JourneyLink({
  id,
  on,
  flow,
}: {
  id: string;
  on?: boolean;
  flow?: boolean;
}) {
  return (
    <svg
      className={`hero-duo__link${on ? ' is-on' : ''}${flow ? ' is-flow' : ''}`}
      viewBox="0 0 56 36"
      aria-hidden
    >
      <defs>
        <marker
          id={id}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0 0.6 L6.2 3.5 L0 6.4 Z" fill="currentColor" />
        </marker>
      </defs>
      <path
        className="hero-duo__link-path"
        d="M4 18 C18 18, 34 18, 48 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        markerEnd={`url(#${id})`}
      />
      <circle className="hero-duo__link-dot" cx="4" cy="18" r="2.2" fill="currentColor" />
    </svg>
  );
}

function JourneyDesktop({
  beat,
  loop,
  mode,
}: {
  beat: number;
  loop: number;
  mode: 'cod' | 'delivered';
}) {
  const delivered = mode === 'delivered';

  const entryOn = delivered ? beat >= 27 : beat >= 6;
  const dragging = delivered ? beat === 28 : beat === 7;
  const dropped = delivered ? beat >= 29 : beat >= 8;
  const endsOn = delivered ? beat >= 30 : beat >= 9;
  const aimingPublish = delivered ? beat === 31 : beat === 10;
  const published = delivered ? beat >= 32 : beat >= 11;
  const orderLive = delivered ? beat >= 33 : beat >= 12;
  const sending = delivered ? beat >= 33 : beat >= 13;
  const sent = delivered ? beat >= 34 : beat >= 14;
  const outcomeHot = delivered ? beat >= 35 : beat >= 17;
  const done = delivered ? beat >= 36 : beat >= 17;
  const liveRun = delivered ? beat >= 33 && beat < 35 : orderLive && !outcomeHot;

  const title = delivered ? 'Order delivered' : 'COD → prepaid conversion';
  const dropKey = delivered ? 'order-delivered' : 'cod-prepaid';
  const sourceKey = dropKey;
  const linkA = `jl-a-${mode}-${loop}`;
  const linkB = `jl-b-${mode}-${loop}`;

  return (
    <div className="hero-duo__journey" key={`${mode}-${loop}`}>
      <div className="hero-duo__journey-bar">
        <div>
          <em>Journeys /</em>
          <strong>{title}</strong>
        </div>
        <div className="hero-duo__journey-actions">
          <span
            className={`hero-duo__status-pill${published ? ' is-live' : ''}${liveRun ? ' is-run' : ''}`}
          >
            {!published
              ? 'Draft'
              : liveRun
                ? 'Live · running'
                : outcomeHot
                  ? 'Live'
                  : 'Live'}
          </span>
          <span
            className={`hero-duo__publish${published ? ' is-done' : ''}${aimingPublish ? ' is-aim' : ''}${(!delivered && beat === 11) || (delivered && beat === 32) ? ' is-pulse' : ''}`}
            data-publish-target="1"
          >
            {published ? 'Published' : 'Publish'}
          </span>
        </div>
      </div>

      <div className="hero-duo__journey-rail" aria-hidden>
        <span className={!delivered ? 'is-on' : undefined}>
          <Zap className="h-2.5 w-2.5" /> Order placed
        </span>
        <span>
          <Truck className="h-2.5 w-2.5" /> Address change
        </span>
        <span className={delivered ? 'is-on' : undefined}>
          <PackageCheck className="h-2.5 w-2.5" /> Delivered
        </span>
      </div>

      <div className="hero-duo__journey-body">
        <div className="hero-duo__flow">
          <div
            className={`hero-duo__card hero-duo__card--entry${entryOn ? ' is-on' : ''}${sending ? ' is-fire' : ''}`}
          >
            <div className="hero-duo__card-head">
              <span className="hero-duo__card-ico" aria-hidden>
                {delivered ? <PackageCheck /> : <Zap />}
              </span>
              <strong>Entry</strong>
              <span className="hero-duo__chip hero-duo__chip--trigger">TRIGGER</span>
            </div>
            <div className="hero-duo__card-body">
              <em>ENTER WHEN</em>
              <p>{delivered ? 'Fulfillment · Delivered' : 'Order placed · COD only'}</p>
              {sending ? <span className="hero-duo__live-dot">Live path</span> : null}
            </div>
            <i className="hero-duo__port hero-duo__port--out" aria-hidden />
          </div>

          <JourneyLink id={linkA} on={dropped} flow={sending} />

          <div
            className={`hero-duo__card hero-duo__card--action${dropped ? ' is-on' : ' is-drop'}${sending ? ' is-fire' : ''}${dragging ? ' is-await-drop' : ''}`}
            data-drag-drop={dropKey}
          >
            {dropped ? (
              <>
                <div className="hero-duo__card-head is-plain">
                  <span className="hero-duo__card-ico is-soft" aria-hidden>
                    {delivered ? <WhatsAppMark /> : <ArrowLeftRight />}
                  </span>
                  <strong>{delivered ? 'Delivered note' : 'COD → prepaid'}</strong>
                </div>
                <p className="hero-duo__card-sum">
                  {delivered
                    ? 'Ask for review · reorder CTA'
                    : '₹100 prepaid discount · Expires after 2 hours'}
                </p>
                <span className={delivered ? 'hero-duo__checkout is-vio' : 'hero-duo__checkout'}>
                  {delivered ? 'REVIEW CTA' : 'CHECKOUT LINK'}
                </span>
                <div className="hero-duo__tpl-card">
                  <img src={PRODUCT_IMG} alt="" />
                  <div>
                    <span>TEMPLATE</span>
                    <strong>{delivered ? 'order_delivered' : 'order_final'}</strong>
                  </div>
                </div>
                <div className="hero-duo__ports">
                  <i className={sent ? 'is-sent' : ''}>
                    Message Sent
                    <b aria-hidden />
                  </i>
                  <i className="is-failed">
                    Failed
                    <b aria-hidden />
                  </i>
                  <i className={outcomeHot ? 'is-converted' : ''}>
                    {delivered ? 'Opened' : 'Converted'}
                    <b aria-hidden />
                  </i>
                </div>
                <span className="hero-duo__live-dot">Live path</span>
                <i className="hero-duo__port hero-duo__port--in" aria-hidden />
              </>
            ) : (
              <div className={`hero-duo__dropzone${dragging ? ' is-await' : ''}`}>
                <Plus className="h-3.5 w-3.5" />
                {delivered ? 'Drop delivered note' : 'Drop COD → prepaid'}
              </div>
            )}
          </div>

          <JourneyLink id={linkB} on={endsOn} flow={outcomeHot} />

          <div
            className={`hero-duo__card hero-duo__card--end${endsOn ? ' is-on' : ''}${done || outcomeHot ? ' is-fire' : ''}`}
          >
            <div className="hero-duo__card-head is-end">
              <span className="hero-duo__card-ico is-end" aria-hidden>
                <Flag />
              </span>
              <strong>End Journey</strong>
              <span className="hero-duo__chip hero-duo__chip--end">END</span>
            </div>
            <div className="hero-duo__card-body">
              <p>
                {done || outcomeHot
                  ? delivered
                    ? 'Customer notified · complete'
                    : 'Payment received · complete'
                  : 'No further messages. Journey ends here.'}
              </p>
              {done || outcomeHot ? (
                <span className="hero-duo__paid-badge">
                  <Check className="h-3 w-3" />
                  {delivered ? 'Review asked' : '+₹1,799'}
                </span>
              ) : endsOn ? (
                <span className="hero-duo__live-dot is-muted">Live path</span>
              ) : null}
            </div>
            <i className="hero-duo__port hero-duo__port--in" aria-hidden />
          </div>
        </div>

        <aside className="hero-duo__steps" aria-hidden>
          <strong>Steps</strong>
          <em>Drag or tap + to add</em>
          <div
            className={`hero-duo__step-item${dragging ? ' is-dragging' : ''}${dropped ? ' is-used' : ''}`}
            data-drag-source={sourceKey}
          >
            <GripVertical className="h-3 w-3" />
            {delivered ? <PackageCheck className="h-3 w-3" /> : <ArrowLeftRight className="h-3 w-3" />}
            <span>{delivered ? 'Delivered note' : 'COD → prepaid'}</span>
            <Plus className="h-3 w-3 hero-duo__step-plus" />
          </div>
          <div className="hero-duo__step-item is-muted">
            <GripVertical className="h-3 w-3" />
            {delivered ? null : <MapPin className="h-3 w-3" />}
            <span>{delivered ? 'Wait 2 days' : 'Update address'}</span>
            <Plus className="h-3 w-3 hero-duo__step-plus" />
          </div>
          <div className="hero-duo__step-item is-muted">
            <GripVertical className="h-3 w-3" />
            {delivered ? null : <PackageCheck className="h-3 w-3" />}
            <span>{delivered ? 'Reorder offer' : 'Order delivered'}</span>
            <Plus className="h-3 w-3 hero-duo__step-plus" />
          </div>
        </aside>
      </div>
    </div>
  );
}

function useTickProgress(active: boolean, durationMs: number) {
  const [t, setT] = useState(active ? 0 : 1);

  useEffect(() => {
    if (!active) {
      setT(1);
      return;
    }
    setT(0);
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs);
      // ease-out cubic
      const eased = 1 - (1 - p) ** 3;
      setT(eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, durationMs]);

  return t;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function AnalyticsDesktop({ beat, loop }: { beat: number; loop: number }) {
  // Beat 18: KPI band · 19: mid charts + tick-up · 20: funnel/WA — camera pans, same zoom
  const showKpis = beat >= 18;
  const showMid = beat >= 19;
  const showBot = beat >= 20;
  const counting = beat === 19;
  const settled = beat >= 20;
  const t = useTickProgress(counting, 1500);

  const salesK = counting ? lerp(30.5, 32.3, t) : settled || beat > 19 ? 32.3 : 30.5;
  const orders = counting ? Math.round(lerp(41, 42, t)) : settled || beat > 19 ? 42 : 41;
  const prepaid = counting ? Math.round(lerp(18, 56, t)) : settled || beat > 19 ? 56 : 18;
  const cod = 100 - prepaid;
  const units = counting ? Math.round(lerp(43, 44, t)) : settled || beat > 19 ? 44 : 43;
  const waAttr = settled ? 1799 : 0;
  const popped = settled;

  return (
    <div className={`hero-duo__an hero-duo__an--dash${showKpis ? ' is-live' : ''}`} key={`an-${loop}`}>
      <div className="hero-duo__an-head hero-duo__an-card" style={{ ['--an-d' as string]: '0ms' }}>
        <div>
          <strong>Platform Analytics</strong>
        </div>
        <div className="hero-duo__an-tools">
          <em>Updated just now</em>
          <span>Last 30 Days</span>
        </div>
      </div>
      <div className="hero-duo__an-tabs hero-duo__an-card" style={{ ['--an-d' as string]: '70ms' }}>
        <span className="is-on">Store & Revenue</span>
        <span>Messaging & Engagement</span>
      </div>

      <div className={`hero-duo__an-kpis${showKpis ? ' is-show' : ''}`}>
        {[
          { label: 'Gross sales', value: `₹${salesK.toFixed(1)}k`, trend: '+812% · 30d', up: true, pop: popped },
          { label: 'Orders', value: String(orders), trend: '+1267% · 30d', up: true, pop: popped },
          { label: 'Avg order value', value: '₹743', trend: '−33% · 30d', up: false, pop: false },
          { label: 'Units sold', value: String(units), trend: '+760% · 30d', up: true, pop: popped },
          { label: 'Sessions', value: '26', trend: '6 visitors', up: true, pop: false },
          { label: 'Visit → order', value: '69.23%', trend: '7.7% bounce', up: true, pop: false },
        ].map((k, i) => (
          <div
            key={k.label}
            className={`hero-duo__an-card hero-duo__an-kpi${k.pop ? ' is-pop' : ''}`}
            style={{ ['--an-d' as string]: `${140 + i * 70}ms` }}
          >
            <em>{k.label}</em>
            <strong>{k.value}</strong>
            <b className={k.up ? 'is-up' : 'is-down'}>{k.trend}</b>
          </div>
        ))}
      </div>

      <div className={`hero-duo__an-mid${showMid ? ' is-show' : ''}`}>
        <div className="hero-duo__an-card hero-duo__an-chart" style={{ ['--an-d' as string]: '80ms' }}>
          <div className="hero-duo__an-chart-head">
            <strong>Revenue and orders</strong>
            <div className="hero-duo__an-legend">
              <span>
                <i className="is-rev" /> Revenue
              </span>
              <span>
                <i className="is-ord" /> Orders
              </span>
            </div>
          </div>
          <svg viewBox="0 0 240 78" className="hero-duo__an-svg" aria-hidden>
            <defs>
              <linearGradient id={`heroAnFill-${loop}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              className="hero-duo__an-fill"
              d="M0 58 C28 55, 48 50, 68 42 S108 28, 128 30 S168 16, 190 20 L240 10 L240 78 L0 78 Z"
              fill={`url(#heroAnFill-${loop})`}
            />
            <path
              className="hero-duo__an-line is-rev"
              d="M0 58 C28 55, 48 50, 68 42 S108 28, 128 30 S168 16, 190 20 L240 10"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              className="hero-duo__an-line is-ord"
              d="M0 64 C36 62, 76 54, 116 48 S176 40, 240 34"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            {popped ? <circle cx="228" cy="12" r="4" fill="#7c3aed" className="hero-duo__an-dot" /> : null}
          </svg>
          <div className="hero-duo__an-xaxis" aria-hidden>
            <span>Aug 11</span>
            <span>Aug 25</span>
            <span>Sep 08</span>
          </div>
        </div>

        <div
          className="hero-duo__an-card hero-duo__an-donut"
          style={{ ['--an-d' as string]: '220ms', ['--mix-pre' as string]: prepaid }}
        >
          <strong>Payment mix</strong>
          <em>COD vs prepaid</em>
          <div className="hero-duo__an-ring-wrap">
            <div className="hero-duo__an-ring" aria-hidden />
            <span>
              {orders}
              <i>ORDERS</i>
            </span>
          </div>
          <p>
            <i className="is-cod" /> COD {cod}% · <i className="is-pre" /> Prepaid {prepaid}%
          </p>
        </div>

        <div className="hero-duo__an-card hero-duo__an-donut hero-duo__an-donut--buyers" style={{ ['--an-d' as string]: '340ms' }}>
          <strong>New vs returning</strong>
          <em>Buyers</em>
          <div className="hero-duo__an-ring-wrap">
            <div className="hero-duo__an-ring hero-duo__an-ring--buyers" aria-hidden />
            <span>
              5<i>BUYERS</i>
            </span>
          </div>
          <p>
            <i className="is-new" /> New 80% · <i className="is-ret" /> Returning 20%
          </p>
        </div>
      </div>

      <div className={`hero-duo__an-bot${showBot ? ' is-show' : ''}`}>
        <div className="hero-duo__an-card hero-duo__an-funnel" style={{ ['--an-d' as string]: '90ms' }}>
          <strong>Conversion rate breakdown</strong>
          <div className="hero-duo__an-funnel-row">
            {[
              { label: 'Sessions', pct: '100%' },
              { label: 'Added to cart', pct: '61.54%' },
              { label: 'Reached checkout', pct: '53.85%' },
              { label: 'Completed checkout', pct: '69.23%' },
            ].map((s) => (
              <div key={s.label}>
                <em>{s.label}</em>
                <b>{s.pct}</b>
                <i style={{ width: s.pct === '100%' ? '100%' : s.pct }} />
              </div>
            ))}
          </div>
          <div className="hero-duo__an-funnel-meta">
            <span>
              Visitors<em>6</em>
            </span>
            <span>
              Avg session<em>1m 12s</em>
            </span>
            <span>
              Pages / session<em>3.4</em>
            </span>
          </div>
          <div className="hero-duo__an-devices">
            <span className="hero-duo__an-dev">
              Desktop <b>88%</b>
              <i style={{ width: '88%' }} />
            </span>
            <span className="hero-duo__an-dev">
              Mobile <b>12%</b>
              <i style={{ width: '12%' }} />
            </span>
          </div>
        </div>

        <div className={`hero-duo__an-card hero-duo__an-wa${popped ? ' is-won' : ''}`} style={{ ['--an-d' as string]: '240ms' }}>
          <div className="hero-duo__an-wa-head">
            <strong>Store × WhatsApp</strong>
            <em>WhatsApp share {popped ? '6%' : '0%'}</em>
          </div>
          <div className="hero-duo__an-wa-barlab">
            <span>
              Returning <b>₹2,760</b>
            </span>
            <span>
              New <b>₹{(27701 + waAttr).toLocaleString('en-IN')}</b>
            </span>
          </div>
          <div className="hero-duo__an-wa-bar" aria-hidden>
            <i className="is-ret" style={{ width: '9%' }} />
            <i className="is-new" style={{ width: '91%' }} />
          </div>
          <div className="hero-duo__an-wa-slots">
            <span>
              Campaigns<em>₹0</em>
            </span>
            <span className={popped ? 'is-hot' : ''}>
              Journeys<em>₹{waAttr.toLocaleString('en-IN')}</em>
            </span>
            <span>
              Cart recovery<em>₹0</em>
            </span>
          </div>
          {popped ? (
            <span className="hero-duo__paid-badge">
              <ShoppingBag className="h-3 w-3" />
              COD → prepaid win · ₹{waAttr.toLocaleString('en-IN')}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PhonePanel({
  beat,
  loop,
  scene,
}: {
  beat: number;
  loop: number;
  scene: Scene;
}) {
  // Cumulative thread through Address: prepaid/paid history scrolls up as
  // address messages append (same continuous chat feel as Act 1).
  const inCodChat = beat <= 4;
  const inJourneyBuild = beat >= 5 && beat < 12;
  const showEnrolled = beat >= 12 && beat < 27;
  const showPrepaid = beat >= 14 && beat < 27;
  const tappingPay = beat === 15;
  const phonePaid = beat >= 16 && beat < 27;
  const showPayOverlay = beat >= 16 && beat <= 17;
  const showPayInThread = beat >= 18 && beat < 27;

  const inAddr = scene === 'address';
  const addrLocal = beat - 21;
  const showAddrConfirm = beat >= 25 && beat <= 26;

  const inDeliveredBuild = beat >= 27 && beat < 34;
  const showDeliveredPill = beat >= 34;
  const showDelivered = beat >= 34;
  const deliveredOpen = beat >= 35;
  const sendingDelivered = beat === 33;

  const wallRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;
    const id = window.requestAnimationFrame(() => {
      wall.scrollTo({
        top: wall.scrollHeight,
        behavior: beat === 0 || scene === 'delivered' ? 'auto' : 'smooth',
      });
    });
    return () => window.cancelAnimationFrame(id);
  }, [beat, scene, loop, showAddrConfirm, showDelivered, showPrepaid, phonePaid]);

  return (
    <div className="hero-duo__phone is-active">
      <div className="hero-duo__iphone">
        <div className="hero-duo__island" aria-hidden />
        <div className="hero-duo__wa-top">
          <span className="hero-duo__wa-back">‹</span>
          <span className="hero-duo__wa-avatar">
            <WhatsAppMark className="h-3.5 w-3.5" />
          </span>
          <div className="hero-duo__wa-meta">
            <strong>Glow Skin Co.</strong>
            <span>online</span>
          </div>
        </div>

        <div className="hero-duo__wa-wall" key={`phone-${loop}`} ref={wallRef}>
          <span className="hero-duo__wa-day">Today</span>

          {inCodChat && beat === 0 ? <TypingDots side="user" /> : null}
          {inCodChat && beat >= 1 ? (
            <div className="hero-duo__bubble hero-duo__bubble--user hero-duo__fade">
              <p>hi</p>
              <time>9:41</time>
            </div>
          ) : null}
          {inCodChat && beat === 1 ? <TypingDots side="store" /> : null}
          {inCodChat && beat >= 2 ? (
            <div className="hero-duo__bubble hero-duo__bubble--store hero-duo__fade">
              <p>Hi Moksh! How can we help with your order today?</p>
              <time>
                9:41 <span className="hero-duo__ticks">✓✓</span>
              </time>
            </div>
          ) : null}
          {inCodChat && beat === 2 ? <TypingDots side="user" /> : null}
          {inCodChat && beat >= 3 ? (
            <div className="hero-duo__bubble hero-duo__bubble--user hero-duo__fade">
              <p>Where is my COD order?</p>
              <time>9:41</time>
            </div>
          ) : null}
          {inCodChat && beat === 3 ? <TypingDots side="store" /> : null}
          {inCodChat && beat >= 4 ? (
            <div className="hero-duo__bubble hero-duo__bubble--store hero-duo__fade">
              <p>#TE-1042 is packed. Want same-day if you pay online?</p>
              <time>
                9:42 <span className="hero-duo__ticks">✓✓</span>
              </time>
            </div>
          ) : null}

          {inJourneyBuild ? (
            <div className="hero-duo__bubble hero-duo__bubble--system hero-duo__fade">
              Building journey · COD → prepaid
            </div>
          ) : null}
          {showEnrolled ? (
            <div className="hero-duo__bubble hero-duo__bubble--system hero-duo__fade">
              New order · enrolled
            </div>
          ) : null}

          {showPrepaid ? (
            <div
              className={`hero-duo__bubble hero-duo__bubble--store hero-duo__bubble--tpl hero-duo__fade${tappingPay ? ' is-target' : ''}${phonePaid ? ' is-paid' : ''}`}
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
                  className={`hero-duo__bubble-cta${phonePaid ? ' is-paid' : ''}${tappingPay ? ' is-tap' : ''}`}
                  data-pay-target="1"
                >
                  {phonePaid ? 'Paid ₹1,799 ✓' : 'Pay ₹1,799 →'}
                </div>
                <time>
                  9:44 <span className="hero-duo__ticks">✓✓</span>
                </time>
              </div>
            </div>
          ) : null}

          {showPayInThread ? (
            <div className="hero-duo__bubble hero-duo__bubble--system hero-duo__fade is-paid-pill">
              Paid ₹1,799 · order confirmed
            </div>
          ) : null}

          {inAddr && addrLocal === 0 ? <TypingDots side="user" /> : null}
          {inAddr && addrLocal >= 1 ? (
            <div className="hero-duo__bubble hero-duo__bubble--user hero-duo__fade">
              <p>Can I change the delivery address for #TE-1042?</p>
              <time>10:02</time>
            </div>
          ) : null}
          {inAddr && addrLocal === 1 ? <TypingDots side="store" /> : null}
          {inAddr && addrLocal >= 2 ? (
            <div className="hero-duo__bubble hero-duo__bubble--store hero-duo__fade">
              <p>Sure — send the new address and we’ll update Shopify before dispatch.</p>
              <time>
                10:02 <span className="hero-duo__ticks">✓✓</span>
              </time>
            </div>
          ) : null}
          {inAddr && addrLocal === 2 ? <TypingDots side="user" /> : null}
          {inAddr && addrLocal >= 3 ? (
            <div className="hero-duo__bubble hero-duo__bubble--user hero-duo__fade">
              <p>14th Floor, Bandra West, Mumbai 400050</p>
              <time>10:03</time>
            </div>
          ) : null}

          {showAddrConfirm ? (
            <div className="hero-duo__bubble hero-duo__bubble--store hero-duo__bubble--tpl hero-duo__fade">
              <div className="hero-duo__tpl-body hero-duo__tpl-body--solo">
                <strong className="hero-duo__tpl-title">Address updated</strong>
                <span className="hero-duo__tpl-sub">Order #TE-1042</span>
                <p>
                  Shipping now goes to <b>Bandra West, Mumbai 400050</b>. Track anytime in chat.
                </p>
                <div className="hero-duo__bubble-cta">Track order →</div>
                <time>
                  10:04 <span className="hero-duo__ticks">✓✓</span>
                </time>
              </div>
            </div>
          ) : null}

          {inDeliveredBuild ? (
            <div className="hero-duo__bubble hero-duo__bubble--system hero-duo__fade">
              Building journey · Order delivered
            </div>
          ) : null}

          {sendingDelivered ? <TypingDots side="store" /> : null}

          {showDeliveredPill ? (
            <div className="hero-duo__bubble hero-duo__bubble--system hero-duo__fade">
              Order delivered · journey running
            </div>
          ) : null}

          {showDelivered ? (
            <div
              className={`hero-duo__bubble hero-duo__bubble--store hero-duo__bubble--tpl hero-duo__fade${deliveredOpen ? ' is-paid' : ''}`}
            >
              <div className="hero-duo__tpl-media">
                <img src={PRODUCT_IMG} alt="" />
              </div>
              <div className="hero-duo__tpl-body">
                <strong className="hero-duo__tpl-title">Delivered ✨</strong>
                <span className="hero-duo__tpl-sub">Order #TE-1042 · Vitamin C Serum</span>
                <p>
                  Your order arrived. Love it? Leave a quick review — or reorder in one tap.
                </p>
                <div className={`hero-duo__bubble-cta${deliveredOpen ? ' is-paid' : ''}`}>
                  {deliveredOpen ? 'Opened ✓' : 'Leave a review →'}
                </div>
                <time>
                  6:12 <span className="hero-duo__ticks">✓✓</span>
                </time>
              </div>
            </div>
          ) : null}

          <div ref={endRef} className="hero-duo__wa-end" aria-hidden />
        </div>

        {showPayOverlay ? (
          <>
            <div className="hero-duo__phone-veil" aria-hidden />
            <PaymentModal key={`pt-${loop}`} surface="phone" kind="pay" />
          </>
        ) : null}

        {tappingPay ? <PayCursor key={`cur-pay-${loop}`} loop={loop} /> : null}

        <div className="hero-duo__wa-input" aria-hidden>
          <span>+</span>
          <div>Message</div>
        </div>
        <div className="hero-duo__home-bar" aria-hidden />
      </div>
    </div>
  );
}
