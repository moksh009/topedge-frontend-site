import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowLeftRight,
  Check,
  Eye,
  HelpCircle,
  Flag,
  GripVertical,
  IndianRupee,
  MapPin,
  Menu,
  MessageCircle,
  MousePointerClick,
  PackageCheck,
  Plus,
  Search,
  Send,
  ShoppingBag,
  Zap,
} from 'lucide-react';
import { WhatsAppMark } from '../foundation/BrandMarks';

const PRODUCT_IMG = '/marketing/products/vitamin-c-serum.jpg';

/**
 * Continuous film (option A):
 * Live Chat → COD→prepaid → Capture→retarget→broadcast → Address change →
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
  // —— Live Chat —— chapter wide → soft chat focus
  { ms: 2600, scene: 'chat', cam: 'is-cam-wide' },
  { ms: 950, scene: 'chat', cam: 'is-cam-wide' },
  { ms: 1050, scene: 'chat', cam: 'is-cam-wide' },
  { ms: 1050, scene: 'chat', cam: 'is-cam-wide' },
  { ms: 1500, scene: 'chat', cam: 'is-cam-chat' },
  // —— COD → prepaid —— chapter wide → story 1.16 pan chain → publish pan → phone wide → paid
  { ms: 2700, scene: 'journey', cam: 'is-cam-wide' },
  { ms: 2000, scene: 'journey', cam: 'is-cam-node-entry' },
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
  // —— Pixel → data → broadcast (product-UI faithful) ——
  { ms: 4000, scene: 'analytics', cam: 'is-cam-wide' },
  { ms: 3600, scene: 'analytics', cam: 'is-cam-an-mid' },
  { ms: 4200, scene: 'analytics', cam: 'is-cam-an-bot' },
  // —— Address —— chapter wide → soft continuous thread focus → settle
  { ms: 2600, scene: 'address', cam: 'is-cam-wide' },
  { ms: 1200, scene: 'address', cam: 'is-cam-support' },
  { ms: 1400, scene: 'address', cam: 'is-cam-support' },
  { ms: 1350, scene: 'address', cam: 'is-cam-support' },
  { ms: 1550, scene: 'address', cam: 'is-cam-wide' },
  { ms: 1700, scene: 'address', cam: 'is-cam-wide' },
  // —— Delivered —— chapter WIDE → drag (from entry side) → mid → end → publish → send → success
  { ms: 2800, scene: 'delivered', cam: 'is-cam-wide' },
  // Peek phone tilt ~1.6s, then drag (~2s)
  { ms: 3600, scene: 'delivered', cam: 'is-cam-drag' },
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
  analytics: 'Act 3 · Pixel → Broadcast',
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
    title: 'Pixel → Broadcast',
    sub: 'Connect · see visits · send campaign · watch sales',
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
  if (beat >= 7 && beat <= 16) return 'film (drag→end→pub→pay)';
  if (beat >= 28 && beat <= 35) return 'film (drag→end→pub→review)';
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

function useArmAfter(active: boolean, delayMs: number, token: number) {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!active) {
      setArmed(false);
      return;
    }
    if (delayMs <= 0) {
      setArmed(true);
      return;
    }
    setArmed(false);
    const t = window.setTimeout(() => setArmed(true), delayMs);
    return () => window.clearTimeout(t);
  }, [active, delayMs, token]);
  return armed;
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

  // Delivered drag beat: tilt phone first (~1.6s), then start drag
  const DELIVERED_PEEK_MS = 1600;
  const dragBeatActive = beat === 7 || beat === 28;
  const dragArmed = useArmAfter(dragBeatActive, beat === 28 ? DELIVERED_PEEK_MS : 0, loop);
  const dragLive = beat === 7 || (beat === 28 && dragArmed);
  // COD: tilt on entry (beat 6) before drag; stay tilted through drag. Delivered: tilt whole beat 28.
  const phoneTilt = beat === 6 || beat === 7 || beat === 28;

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
        className={`hero-duo__stage ${cam} is-scene-${scene}${chapter ? ' is-chapter' : ''}${phoneTilt ? ' is-phone-tilt' : ''}${dragLive ? ' is-drag-live' : ''}${debug ? ' is-debug-cam' : ''}`}
      >
        <div className="hero-duo__pair">
        <div className="hero-duo__desktop">
          <div className="hero-duo__viewport">
            <div className="hero-duo__lens">
              <SceneView show={scene === 'chat'}>
                <ChatDesktop beat={beat} loop={loop} mode="cod" />
              </SceneView>
              <SceneView show={scene === 'journey'}>
                <JourneyDesktop beat={beat} loop={loop} mode="cod" dragLive={dragLive} />
              </SceneView>
              <SceneView show={scene === 'analytics'}>
                <AnalyticsDesktop beat={beat} loop={loop} />
              </SceneView>
              <SceneView show={scene === 'address'}>
                <ChatDesktop beat={beat} loop={loop} mode="address" />
              </SceneView>
              <SceneView show={scene === 'delivered'}>
                <JourneyDesktop beat={beat} loop={loop} mode="delivered" dragLive={dragLive} />
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
          </div>
        </div>

        <PhonePanel beat={beat} loop={loop} scene={scene} />

        {/* Drag ghost only after peek — phone tilts first so the move is readable */}
        {scene === 'journey' && dragLive && beat === 7 ? (
          <PhysicalDragFlight
            key={`drag-cod-${loop}`}
            sourceKey="cod-prepaid"
            dropKey="cod-prepaid"
            label="COD → prepaid"
            icon={<ArrowLeftRight className="h-3 w-3" />}
          />
        ) : null}
        {scene === 'delivered' && dragLive && beat === 28 ? (
          <PhysicalDragFlight
            key={`drag-del-${loop}`}
            sourceKey="order-delivered"
            dropKey="order-delivered"
            label="Delivered note"
            icon={<PackageCheck className="h-3 w-3" />}
          />
        ) : null}

        <HeroFilmCursor
          key={
            beat >= 6 && beat <= 16
              ? `film-cod-${loop}`
              : beat >= 18 && beat <= 20
                ? `film-an-${loop}`
                : beat >= 28 && beat <= 35
                  ? `film-del-${loop}`
                  : `film-${loop}`
          }
          beat={beat}
          loop={loop}
          dragLive={dragLive}
        />

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

function CursorArrowSvg() {
  /* Larger macOS-style pointer — tip at top-left */
  return (
    <svg width="30" height="34" viewBox="0 0 26 30" fill="none" aria-hidden>
      <path
        d="M3.2 2.4v22.2l5.6-4.85 4.35 9.75 3.55-1.55-4.3-9.65H22.2L3.2 2.4Z"
        fill="#0a0a0a"
        stroke="#fff"
        strokeWidth="2.15"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

type FilmCursorMode =
  | 'hidden'
  | 'peek-steps'
  | 'drag'
  | 'hold-mid'
  | 'hold-end'
  | 'publish'
  | 'publish-click'
  | 'phone-approach'
  | 'phone-cta'
  | 'phone-click'
  | 'fade'
  | 'an-connect'
  | 'an-connect-click'
  | 'an-create'
  | 'an-create-click'
  | 'an-send'
  | 'an-send-click';

function filmCursorMode(beat: number, dragLive: boolean): FilmCursorMode {
  // COD: phone tilts + cursor rests on Steps (beat 6), then drag
  if (beat === 6) return 'peek-steps';
  if (beat === 7) return dragLive ? 'drag' : 'peek-steps';
  if (beat === 8) return 'hold-mid';
  if (beat === 9) return 'hold-end';
  if (beat === 10) return 'publish';
  if (beat === 11) return 'publish-click';
  if (beat === 12) return 'phone-approach';
  if (beat === 13 || beat === 14) return 'phone-cta';
  if (beat === 15) return 'phone-click';
  if (beat === 16) return 'fade';
  // Act 3: connect pixel → create campaign → send
  if (beat === 18) return 'an-connect';
  if (beat === 19) return 'an-create';
  if (beat === 20) return 'an-send';
  // Delivered: peek Steps while phone tilts, then drag
  if (beat === 28) return dragLive ? 'drag' : 'peek-steps';
  if (beat === 29) return 'hold-mid';
  if (beat === 30) return 'hold-end';
  if (beat === 31) return 'publish';
  if (beat === 32) return 'publish-click';
  if (beat === 33) return 'phone-approach';
  if (beat === 34) return 'phone-cta';
  if (beat === 35) return 'phone-click';
  return 'hidden';
}

function filmCursorDuration(mode: FilmCursorMode): number {
  if (mode === 'peek-steps') return 700;
  if (mode === 'drag') return 1750;
  if (mode === 'hold-mid') return 650;
  if (mode === 'hold-end') return 900;
  if (mode === 'publish') return 1200;
  if (mode === 'publish-click') return 480;
  if (mode === 'phone-approach') return 1400;
  if (mode === 'phone-cta') return 1100;
  if (mode === 'phone-click') return 520;
  if (mode === 'fade') return 480;
  if (mode === 'an-connect' || mode === 'an-create' || mode === 'an-send') return 1100;
  if (mode === 'an-connect-click' || mode === 'an-create-click' || mode === 'an-send-click') return 420;
  return 800;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

/**
 * Persistent macOS film cursor with deliberate waypoints.
 * Never aims at random chat bubbles — only Steps/nodes/Publish/phone CTA.
 */
function HeroFilmCursor({
  beat,
  loop,
  dragLive,
}: {
  beat: number;
  loop: number;
  dragLive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0, ready: false });
  const animRef = useRef<{
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    start: number;
    dur: number;
  } | null>(null);

  const modeRaw = filmCursorMode(beat, dragLive);
  const anDelay = beat === 18 ? 2600 : beat === 19 || beat === 20 ? 350 : 0;
  const anReady = useArmAfter(beat >= 18 && beat <= 20, anDelay, loop);
  const mode =
    beat >= 18 && beat <= 20 && !anReady
      ? 'hidden'
      : modeRaw;
  const active = mode !== 'hidden';
  const [clickPulse, setClickPulse] = useState(false);
  const clicking =
    mode === 'publish-click' ||
    mode === 'phone-click' ||
    mode === 'an-connect-click' ||
    mode === 'an-create-click' ||
    mode === 'an-send-click' ||
    clickPulse;
  const fading = mode === 'fade';
  const dropKey = beat >= 28 ? 'order-delivered' : 'cod-prepaid';
  const delivered = beat >= 28;

  useEffect(() => {
    if (mode !== 'an-connect' && mode !== 'an-create' && mode !== 'an-send') {
      setClickPulse(false);
      return;
    }
    setClickPulse(false);
    const t = window.setTimeout(() => {
      setClickPulse(true);
      window.setTimeout(() => setClickPulse(false), 380);
    }, filmCursorDuration(mode) + 80);
    return () => window.clearTimeout(t);
  }, [mode, beat, loop]);

  const resolveTarget = useRef(() => ({ x: 0, y: 0 }));
  resolveTarget.current = () => {
    const pair = document.querySelector('.hero-duo__pair') as HTMLElement | null;
    if (!pair) return { x: posRef.current.x, y: posRef.current.y };
    const pr = pair.getBoundingClientRect();
    const root = document.querySelector('.hero-duo__view.is-show');

    const at = (el: Element | null, ox: number, oy: number) => {
      if (!el) return null;
      const r = (el as HTMLElement).getBoundingClientRect();
      return {
        x: r.left - pr.left + r.width * ox,
        y: r.top - pr.top + r.height * oy,
      };
    };

    if (mode === 'peek-steps') {
      const source = root?.querySelector(`[data-drag-source="${dropKey}"]`);
      return at(source ?? null, 0.35, 0.45) ?? { x: posRef.current.x, y: posRef.current.y };
    }
    if (mode === 'drag') {
      const drop = root?.querySelector(`[data-drag-drop="${dropKey}"]`);
      return at(drop ?? null, 0.48, 0.42) ?? { x: posRef.current.x, y: posRef.current.y };
    }
    if (mode === 'hold-mid') {
      const mid =
        root?.querySelector('.hero-duo__card--action.is-on') ||
        root?.querySelector(`[data-drag-drop="${dropKey}"]`);
      return at(mid ?? null, 0.58, 0.48) ?? { x: posRef.current.x, y: posRef.current.y };
    }
    if (mode === 'hold-end') {
      const end =
        root?.querySelector('.hero-duo__card--end.is-on') ||
        root?.querySelector('.hero-duo__card--end');
      return at(end ?? null, 0.45, 0.42) ?? { x: posRef.current.x, y: posRef.current.y };
    }
    if (mode === 'publish' || mode === 'publish-click') {
      const btn = root?.querySelector('.hero-duo__publish');
      return at(btn ?? null, 0.55, 0.68) ?? { x: posRef.current.x, y: posRef.current.y };
    }
    if (mode === 'phone-approach') {
      // Lower phone screen — where Pay/Review CTA will land (not mid-chat bubbles)
      const phone = document.querySelector('.hero-duo__iphone');
      return at(phone, 0.52, 0.62) ?? { x: posRef.current.x, y: posRef.current.y };
    }
    if (mode === 'phone-cta' || mode === 'phone-click' || mode === 'fade') {
      const sel = delivered
        ? '.hero-duo__phone [data-review-target="1"]'
        : '.hero-duo__phone [data-pay-target="1"]';
      const btn = document.querySelector(sel);
      const p = at(btn, 0.55, 0.52);
      if (p) return p;
      // Soft fallback: lower phone screen (where CTA mounts), never random bubbles
      const phone = document.querySelector('.hero-duo__iphone');
      return at(phone, 0.52, 0.62) ?? { x: posRef.current.x, y: posRef.current.y };
    }
    if (
      mode === 'an-connect' ||
      mode === 'an-connect-click' ||
      mode === 'an-create' ||
      mode === 'an-create-click' ||
      mode === 'an-send' ||
      mode === 'an-send-click'
    ) {
      const key =
        mode.startsWith('an-connect')
          ? 'pixel-connect'
          : mode.startsWith('an-create')
            ? 'create-campaign'
            : 'send-campaign';
      const btn = root?.querySelector(`[data-an-target="${key}"]`);
      return at(btn ?? null, 0.55, 0.55) ?? { x: posRef.current.x, y: posRef.current.y };
    }
    return { x: posRef.current.x, y: posRef.current.y };
  };

  const paint = (x: number, y: number, scale = 1) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  };

  useLayoutEffect(() => {
    if (!active) {
      posRef.current.ready = false;
      animRef.current = null;
      return;
    }

    const pair = document.querySelector('.hero-duo__pair') as HTMLElement | null;
    const root = document.querySelector('.hero-duo__view.is-show');
    if (!pair) return;

    const pr = pair.getBoundingClientRect();
    let fromX = posRef.current.x;
    let fromY = posRef.current.y;
    let to = resolveTarget.current();

    if (mode === 'drag') {
      const source = root?.querySelector(`[data-drag-source="${dropKey}"]`) as HTMLElement | null;
      if (source) {
        const sr = source.getBoundingClientRect();
        fromX = sr.left - pr.left + sr.width * 0.18 + 26;
        fromY = sr.top - pr.top + sr.height * 0.22 + 4;
      }
      const drop = root?.querySelector(`[data-drag-drop="${dropKey}"]`) as HTMLElement | null;
      if (drop) {
        const dr = drop.getBoundingClientRect();
        to = {
          x: dr.left - pr.left + dr.width * 0.48,
          y: dr.top - pr.top + dr.height * 0.42,
        };
      }
      posRef.current = { x: fromX, y: fromY, ready: true };
      paint(fromX, fromY, 1);
    } else if (!posRef.current.ready) {
      posRef.current = { x: to.x, y: to.y, ready: true };
      paint(to.x, to.y, 1);
      return;
    } else {
      fromX = posRef.current.x;
      fromY = posRef.current.y;
      // Re-measure CTA after a beat so late-mounted Pay button is hit
      to = resolveTarget.current();
    }

    const dist = Math.hypot(to.x - fromX, to.y - fromY);
    let dur = filmCursorDuration(mode);
    if (dist < 14) dur = Math.min(dur, 260);
    else if (mode === 'publish-click' || mode === 'phone-click') dur = Math.min(dur, 480);

    animRef.current = {
      fromX,
      fromY,
      toX: to.x,
      toY: to.y,
      start: performance.now(),
      dur,
    };
  }, [beat, loop, mode, active, dropKey]);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let alive = true;

    const tick = (now: number) => {
      if (!alive) return;
      const anim = animRef.current;
      if (anim) {
        const t = Math.min(1, (now - anim.start) / anim.dur);
        const e = easeInOutCubic(t);
        const x = anim.fromX + (anim.toX - anim.fromX) * e;
        const y = anim.fromY + (anim.toY - anim.fromY) * e;
        posRef.current = { x, y, ready: true };
        const scale = clicking && t > 0.6 ? 0.84 : 1;
        paint(x, y, scale);
        if (t >= 1) {
          animRef.current = null;
          // Soft re-aim for live targets (Publish under zoom / Pay after template mounts)
          if (
            mode === 'publish' ||
            mode === 'publish-click' ||
            mode === 'phone-cta' ||
            mode === 'phone-click' ||
            mode === 'hold-mid' ||
            mode === 'hold-end'
          ) {
            const live = resolveTarget.current();
            const dx = live.x - posRef.current.x;
            const dy = live.y - posRef.current.y;
            if (Math.hypot(dx, dy) > 8) {
              animRef.current = {
                fromX: posRef.current.x,
                fromY: posRef.current.y,
                toX: live.x,
                toY: live.y,
                start: now,
                dur: 380,
              };
            }
          }
        }
      } else if (clicking) {
        paint(posRef.current.x, posRef.current.y, 0.86);
      } else if (fading) {
        paint(posRef.current.x, posRef.current.y, 1);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [active, clicking, fading, mode, beat, loop]);

  // When Pay/Review CTA mounts mid-beat, retarget once
  useEffect(() => {
    if (mode !== 'phone-cta' && mode !== 'phone-click') return;
    const id = window.setTimeout(() => {
      const live = resolveTarget.current();
      const dx = live.x - posRef.current.x;
      const dy = live.y - posRef.current.y;
      if (Math.hypot(dx, dy) < 10) return;
      animRef.current = {
        fromX: posRef.current.x,
        fromY: posRef.current.y,
        toX: live.x,
        toY: live.y,
        start: performance.now(),
        dur: 700,
      };
    }, 180);
    return () => window.clearTimeout(id);
  }, [mode, beat, loop]);

  if (!active) return null;

  return (
    <div
      ref={ref}
      className={`hero-duo__cursor hero-duo__cursor--film${clicking ? ' is-click' : ''}${fading ? ' is-fade' : ''}`}
      aria-hidden
    >
      <CursorArrowSvg />
      {clicking ? <span className="hero-duo__click-ring" key={`ring-${beat}-${loop}`} /> : null}
    </div>
  );
}

/** Measure Steps-row → drop-zone and fly the ghost along that vector (cursor is HeroFilmCursor). */
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

  useLayoutEffect(() => {
    const pair = document.querySelector('.hero-duo__pair') as HTMLElement | null;
    const root = document.querySelector('.hero-duo__view.is-show');
    const source = root?.querySelector(`[data-drag-source="${sourceKey}"]`) as HTMLElement | null;
    const drop = root?.querySelector(`[data-drag-drop="${dropKey}"]`) as HTMLElement | null;
    const ghost = ghostRef.current;
    if (!pair || !source || !drop || !ghost) return;

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
    <div ref={ghostRef} className="hero-duo__drag-ghost is-flight" aria-hidden>
      {icon}
      {label}
    </div>
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
  dragLive,
}: {
  beat: number;
  loop: number;
  mode: 'cod' | 'delivered';
  dragLive: boolean;
}) {
  const delivered = mode === 'delivered';

  const entryOn = delivered ? beat >= 27 : beat >= 6;
  const dragging = dragLive && (delivered ? beat === 28 : beat === 7);
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

  const title = delivered ? 'Order delivered' : 'COD → prepaid';
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
  // 18: connect pixel → success → live visits
  // 19: product visit data → Create campaign
  // 20: audience/message → send → sales lift
  const connected = useArmAfter(beat === 18, 2900, loop) || beat > 18;
  const liveOn = connected && beat === 18;
  const liveT = useTickProgress(liveOn, 2200);
  const visits = liveOn ? Math.round(lerp(12, 48, liveT)) : beat >= 19 ? 48 : 12;
  const views = liveOn ? Math.round(lerp(80, 412, liveT)) : beat >= 19 ? 412 : 80;

  const createAim = beat === 19;
  const campSent = useArmAfter(beat === 20, 1500, loop);
  const campLift = useArmAfter(beat === 20, 2600, loop);
  const liftT = useTickProgress(campLift, 1700);
  const revenue = campLift ? Math.round(lerp(0, 68200, liftT)) : 0;
  const orders = campLift ? Math.round(lerp(0, 38, liftT)) : 0;
  const delivered = campSent ? 1986 : 0;
  const sentN = campSent ? 2142 : 0;

  const EVENTS = [
    { t: 0.15, title: 'Viewed product', detail: 'Vitamin C Serum · Priya' },
    { t: 0.4, title: 'Scrolled 62%', detail: 'PDP depth · +91…4821' },
    { t: 0.65, title: 'Add to cart', detail: '₹1,899 · cart open' },
    { t: 0.85, title: 'Known visitor', detail: 'Matched WhatsApp opt-in' },
  ];

  if (beat === 18) {
    return (
      <div className="hero-duo__an hero-duo__an--px is-live" key={`px-${loop}`}>
        <div className="hero-duo__px-head">
          <div>
            <strong>Website pixel</strong>
            <em>Track storefront visits · match WhatsApp numbers</em>
          </div>
          <span className={`hero-duo__px-status${connected ? ' is-ok' : ''}`}>
            {connected ? 'Connected' : 'Not connected'}
          </span>
        </div>

        {!connected ? (
          <div className="hero-duo__px-setup hero-duo__an-card is-show" style={{ ['--an-d' as string]: '80ms' }}>
            <div className="hero-duo__px-setup-ico">
              <MousePointerClick className="h-5 w-5" />
            </div>
            <strong>Connect website pixel</strong>
            <p>One click installs TopEdge pixel on Shopify. See who views products, scrolls, and adds to cart — then message them on WhatsApp.</p>
            <button type="button" className="hero-duo__px-connect is-aim" data-an-target="pixel-connect">
              Connect website pixel
            </button>
            <span className="hero-duo__px-hint">Works with glowskin.co · Shopify</span>
          </div>
        ) : (
          <div className="hero-duo__px-live">
            <div className="hero-duo__px-success hero-duo__an-card is-show" style={{ ['--an-d' as string]: '0ms' }}>
              <Check className="h-3.5 w-3.5" />
              <div>
                <strong>Pixel connected</strong>
                <em>glowskin.co · live events streaming</em>
              </div>
            </div>
            <div className="hero-duo__px-kpis">
              <div className="hero-duo__px-kpi">
                <em>Live visitors</em>
                <strong>{visits}</strong>
              </div>
              <div className="hero-duo__px-kpi">
                <em>Product views</em>
                <strong>{views}</strong>
              </div>
              <div className="hero-duo__px-kpi">
                <em>Known numbers</em>
                <strong>2,142</strong>
              </div>
            </div>
            <div className="hero-duo__px-feed">
              <strong>Live activity</strong>
              {EVENTS.map((e) => (
                <div key={e.title} className={`hero-duo__px-event${liveT >= e.t ? ' is-show' : ''}`}>
                  <i />
                  <div>
                    <b>{e.title}</b>
                    <em>{e.detail}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (beat === 19) {
    return (
      <div className="hero-duo__an hero-duo__an--px is-live" key={`ins-${loop}`}>
        <div className="hero-duo__px-head">
          <div>
            <strong>Product insights</strong>
            <em>Who visited · what they viewed · ready to message</em>
          </div>
          <button type="button" className={`hero-duo__px-create${createAim ? ' is-aim' : ''}`} data-an-target="create-campaign">
            <Plus className="h-3 w-3" />
            Create campaign
          </button>
        </div>

        <div className="hero-duo__px-kpis hero-duo__px-kpis--row">
          {[
            { label: 'Sessions', value: '48', sub: 'Last 24h' },
            { label: 'Serum views', value: '412', sub: 'Vitamin C' },
            { label: 'ATC', value: '61', sub: '₹1,899 cart' },
            { label: 'WA matched', value: '29', sub: 'Opt-in numbers' },
          ].map((k, i) => (
            <div key={k.label} className="hero-duo__px-kpi hero-duo__an-card is-show" style={{ ['--an-d' as string]: `${60 + i * 70}ms` }}>
              <em>{k.label}</em>
              <strong>{k.value}</strong>
              <b>{k.sub}</b>
            </div>
          ))}
        </div>

        <div className="hero-duo__px-table hero-duo__an-card is-show" style={{ ['--an-d' as string]: '280ms' }}>
          <div className="hero-duo__px-table-head">
            <span>Product</span>
            <span>Views</span>
            <span>ATC</span>
            <span>WA</span>
          </div>
          <div className="hero-duo__px-table-row is-hot">
            <span>
              <img src={PRODUCT_IMG} alt="" />
              Vitamin C Serum
            </span>
            <span>412</span>
            <span>61</span>
            <span className="is-wa">29</span>
          </div>
          <div className="hero-duo__px-table-row">
            <span>Night Cream</span>
            <span>210</span>
            <span>18</span>
            <span>8</span>
          </div>
          <div className="hero-duo__px-table-row">
            <span>SPF 50</span>
            <span>156</span>
            <span>11</span>
            <span>5</span>
          </div>
        </div>

        <div className="hero-duo__px-banner hero-duo__an-card is-show" style={{ ['--an-d' as string]: '400ms' }}>
          <Zap className="h-3.5 w-3.5" />
          <div>
            <strong>29 shoppers viewed Serum with WhatsApp opt-in</strong>
            <em>Select them in Audience and send a restock / offer broadcast</em>
          </div>
          <span className="hero-duo__px-banner-cta" data-an-target="create-campaign">
            Create campaign →
          </span>
        </div>
      </div>
    );
  }

  // Beat 20 — Campaigns list → send → lift (matches product UI)
  return (
    <div className={`hero-duo__an hero-duo__an--camp is-live${campSent ? ' is-sent' : ''}${campLift ? ' is-lift' : ''}`} key={`camp-${loop}`}>
      {!campSent ? (
        <>
          <div className="hero-duo__camp-top">
            <div>
              <strong>Campaigns & journeys</strong>
            </div>
            <button type="button" className="hero-duo__camp-create is-aim" data-an-target="send-campaign">
              Create campaign
            </button>
          </div>

          <div className="hero-duo__camp-kpis">
            <div>
              <em>
                <Send className="h-3 w-3" /> Messages sent
              </em>
              <strong>2</strong>
            </div>
            <div>
              <em>
                <Eye className="h-3 w-3" /> Read rate
              </em>
              <strong>100%</strong>
            </div>
            <div>
              <em>
                <MessageCircle className="h-3 w-3" /> Reply rate
              </em>
              <strong>100%</strong>
            </div>
            <div>
              <em>
                <IndianRupee className="h-3 w-3" /> Attributed revenue
              </em>
              <strong>₹0</strong>
            </div>
          </div>

          <div className="hero-duo__camp-wiz">
            <div className="hero-duo__wiz">
              <span className="is-on">1 Audience</span>
              <span>2 Message</span>
              <span>3 Review</span>
            </div>
            <div className="hero-duo__camp-wiz-body">
              <aside>
                <strong>Who receives it</strong>
                <div className={`hero-duo__seg is-on`}>
                  <i />
                  <div>
                    <b>Pixel · Serum viewers</b>
                    <span>Opt-in matched · 29</span>
                  </div>
                  <em>29</em>
                </div>
                <div className="hero-duo__seg is-on">
                  <i />
                  <div>
                    <b>Recharge audience</b>
                    <span>Past buyers · restock</span>
                  </div>
                  <em>2,113</em>
                </div>
                <div className="hero-duo__seg">
                  <i />
                  <div>
                    <b>All customers</b>
                    <span>WhatsApp + Shopify</span>
                  </div>
                  <em>2,142</em>
                </div>
              </aside>
              <div className="hero-duo__camp-contacts">
                <div className="hero-duo__aud-list-head">
                  <strong>
                    Contacts <b>2,142</b>
                  </strong>
                  <span>Select all</span>
                </div>
                {[
                  ['Priya M.', '+91…4821', 'WA Opt-in'],
                  ['Arjun K.', '+91…2104', 'Pixel'],
                  ['Neha S.', '+91…8831', 'Import'],
                  ['Dev R.', '+91…4412', 'Recharge'],
                ].map(([n, p, t]) => (
                  <div key={n} className="hero-duo__aud-row is-on">
                    <i />
                    <span>
                      <strong>{n}</strong>
                      <em>{p}</em>
                    </span>
                    <span className="is-ok">{t}</span>
                  </div>
                ))}
                <button type="button" className="hero-duo__camp-next is-aim" data-an-target="send-campaign">
                  Choose template →
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="hero-duo__camp-top">
            <div>
              <strong>Serum restock</strong>
              <em className="hero-duo__camp-done">Completed · just now</em>
            </div>
            <span className="hero-duo__camp-badge">COMPLETED</span>
          </div>

          <div className="hero-duo__camp-kpis hero-duo__camp-kpis--live">
            <div>
              <em>Sent</em>
              <strong>{sentN.toLocaleString('en-IN')}</strong>
            </div>
            <div>
              <em>Delivered</em>
              <strong>{delivered.toLocaleString('en-IN')}</strong>
            </div>
            <div>
              <em>Read</em>
              <strong>78%</strong>
            </div>
            <div className={campLift ? 'is-hot' : ''}>
              <em>Attributed revenue</em>
              <strong>₹{revenue.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          <div className="hero-duo__camp-detail">
            <div className="hero-duo__camp-progress">
              <i style={{ width: campLift ? '82%' : '55%' }} />
              <span>
                {delivered.toLocaleString('en-IN')} of {sentN.toLocaleString('en-IN')} delivered · {orders} orders
              </span>
            </div>
            <div className="hero-duo__camp-buyers">
              <strong>People buying now</strong>
              {[
                { name: 'Priya M.', amt: '₹1,899', on: liftT > 0.2 },
                { name: 'Arjun K.', amt: '₹1,899', on: liftT > 0.45 },
                { name: 'Neha S.', amt: '₹2,198', on: liftT > 0.7 },
              ].map((b) => (
                <div key={b.name} className={`hero-duo__camp-buy${b.on ? ' is-show' : ''}`}>
                  <ShoppingBag className="h-3 w-3" />
                  <b>{b.name}</b>
                  <em>ordered</em>
                  <span>{b.amt}</span>
                </div>
              ))}
            </div>
            {campLift ? (
              <span className="hero-duo__paid-badge">
                <IndianRupee className="h-3 w-3" />
                Broadcast lift · ₹{revenue.toLocaleString('en-IN')} · +{orders} orders
              </span>
            ) : null}
          </div>
        </>
      )}
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
  // Cumulative thread: prior bubbles stick; journey build shows progression.
  const showHi = beat >= 1;
  const showStoreHi = beat >= 2;
  const showWhere = beat >= 3;
  const showPacked = beat >= 4;

  const inJourneyBuild = beat >= 5 && beat < 12;
  const journeyBuildLabel =
    beat <= 6
      ? 'Building journey · COD → prepaid'
      : beat === 7
        ? 'Adding Wait for payment…'
        : beat === 8
          ? 'Connecting Mid → End…'
          : 'Publishing journey…';

  const showEnrolled = beat >= 12;
  const showPrepaid = beat >= 13;
  const tappingPay = beat === 15;
  const phonePaid = beat >= 16;
  const showPayOverlay = beat >= 16 && beat <= 17;
  const showPayInThread = beat >= 18;
  const showRetargetTpl = false;
  const showBroadcastTpl = beat === 20;

  const addrLocal = beat - 21;
  const showAddrAsk = beat >= 22;
  const showAddrReply = beat >= 23;
  const showAddrNew = beat >= 24;
  const showAddrConfirm = beat >= 25;

  const inDeliveredBuild = beat >= 27 && beat < 34;
  const deliveredBuildLabel =
    beat <= 28
      ? 'Building journey · Order delivered'
      : beat === 29
        ? 'Adding review request…'
        : 'Publishing journey…';
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
  }, [beat, scene, loop, showAddrConfirm, showDelivered, showPrepaid, phonePaid, showRetargetTpl, showBroadcastTpl]);

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

          {beat === 0 ? <TypingDots side="user" /> : null}
          {showHi ? (
            <div className="hero-duo__bubble hero-duo__bubble--user hero-duo__fade">
              <p>hi</p>
              <time>9:41</time>
            </div>
          ) : null}
          {beat === 1 ? <TypingDots side="store" /> : null}
          {showStoreHi ? (
            <div className="hero-duo__bubble hero-duo__bubble--store hero-duo__fade">
              <p>Hi Moksh! How can we help with your order today?</p>
              <time>
                9:41 <span className="hero-duo__ticks">✓✓</span>
              </time>
            </div>
          ) : null}
          {beat === 2 ? <TypingDots side="user" /> : null}
          {showWhere ? (
            <div className="hero-duo__bubble hero-duo__bubble--user hero-duo__fade">
              <p>Where is my COD order?</p>
              <time>9:41</time>
            </div>
          ) : null}
          {beat === 3 ? <TypingDots side="store" /> : null}
          {showPacked ? (
            <div className="hero-duo__bubble hero-duo__bubble--store hero-duo__fade">
              <p>#TE-1042 is packed. Want same-day if you pay online?</p>
              <time>
                9:42 <span className="hero-duo__ticks">✓✓</span>
              </time>
            </div>
          ) : null}

          {inJourneyBuild ? (
            <div className="hero-duo__bubble hero-duo__bubble--system hero-duo__fade" key={`jb-${beat}`}>
              {journeyBuildLabel}
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

          {showRetargetTpl ? (
            <div className="hero-duo__bubble hero-duo__bubble--store hero-duo__bubble--tpl hero-duo__fade">
              <div className="hero-duo__tpl-media">
                <img src={PRODUCT_IMG} alt="" />
              </div>
              <div className="hero-duo__tpl-body">
                <strong className="hero-duo__tpl-title">Still thinking it over?</strong>
                <span className="hero-duo__tpl-sub">Cart open · Vitamin C Serum</span>
                <p>
                  Priya, your serum is waiting — finish checkout with <b>₹100 off</b>.
                </p>
                <div className="hero-duo__bubble-cta">Complete order →</div>
                <time>
                  9:58 <span className="hero-duo__ticks">✓✓</span>
                </time>
              </div>
            </div>
          ) : null}

          {showBroadcastTpl ? (
            <>
              <div className="hero-duo__bubble hero-duo__bubble--system hero-duo__fade">
                Broadcast · Serum restock · delivered
              </div>
              <div className="hero-duo__bubble hero-duo__bubble--store hero-duo__bubble--tpl hero-duo__fade">
                <div className="hero-duo__tpl-body hero-duo__tpl-body--solo">
                  <strong className="hero-duo__tpl-title">Back in stock</strong>
                  <span className="hero-duo__tpl-sub">Glow Skin Co · campaign</span>
                  <p>
                    Vitamin C Serum is restocked. Early access for opt-in members — <b>shop now</b>.
                  </p>
                  <div className="hero-duo__bubble-cta">Shop restock →</div>
                  <time>
                    10:12 <span className="hero-duo__ticks">✓✓</span>
                  </time>
                </div>
              </div>
            </>
          ) : null}

          {scene === 'address' && addrLocal === 0 ? <TypingDots side="user" /> : null}
          {showAddrAsk ? (
            <div className="hero-duo__bubble hero-duo__bubble--user hero-duo__fade">
              <p>Can I change the delivery address for #TE-1042?</p>
              <time>10:02</time>
            </div>
          ) : null}
          {scene === 'address' && addrLocal === 1 ? <TypingDots side="store" /> : null}
          {showAddrReply ? (
            <div className="hero-duo__bubble hero-duo__bubble--store hero-duo__fade">
              <p>Sure — send the new address and we’ll update Shopify before dispatch.</p>
              <time>
                10:02 <span className="hero-duo__ticks">✓✓</span>
              </time>
            </div>
          ) : null}
          {scene === 'address' && addrLocal === 2 ? <TypingDots side="user" /> : null}
          {showAddrNew ? (
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
            <div className="hero-duo__bubble hero-duo__bubble--system hero-duo__fade" key={`db-${beat}`}>
              {deliveredBuildLabel}
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
                <div
                  className={`hero-duo__bubble-cta${deliveredOpen ? ' is-paid' : ''}`}
                  data-review-target="1"
                >
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

        <div className="hero-duo__wa-input" aria-hidden>
          <span>+</span>
          <div>Message</div>
        </div>
        <div className="hero-duo__home-bar" aria-hidden />
      </div>
    </div>
  );
}
