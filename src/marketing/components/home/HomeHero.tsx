import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import {
  ArrowRight,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import { GhostButton, PrimaryButton } from '../ui';
import { ShopifyMark, WhatsAppMark } from '../foundation/BrandMarks';
import HeroRippleBackground from '../effects/HeroRippleBackground';
import HomeTrust from './HomeTrust';

type HeroActionId = 'recover' | 'reply' | 'journey' | 'support' | 'install';
type FlowPhase = 'idle' | 'menu' | 'typing' | 'sending' | 'done';

type HeroAction = {
  id: HeroActionId;
  label: string;
  hint: string;
  prompt: string;
  message: string;
};

const ACTIONS: HeroAction[] = [
  {
    id: 'recover',
    label: 'Recover abandoned cart',
    hint: '3 timed WhatsApp nudges',
    prompt: 'Recover Priya’s abandoned Vitamin C serum cart…',
    message:
      'Hi Priya, your cart is waiting. Complete checkout before items sell out.',
  },
  {
    id: 'reply',
    label: 'Reply with order context',
    hint: 'Shopify order beside chat',
    prompt: 'Reply to Priya about order #TE-1042 with tracking…',
    message: 'Checking Shopify now. #TE-1042 is packed and ships today.',
  },
  {
    id: 'journey',
    label: 'Build a COD journey',
    hint: 'Wait · branch · WhatsApp',
    prompt: 'Build a COD cart recovery journey with a 4h wait…',
    message: 'Journey published: Cart abandoned → Wait 4h → WhatsApp if COD.',
  },
  {
    id: 'support',
    label: 'Customer support reply',
    hint: 'Answer with store policy',
    prompt: 'Help Priya with a return on her last COD order…',
    message:
      'Hi Priya, returns are free within 7 days. Share a pickup slot and we’ll arrange it.',
  },
  {
    id: 'install',
    label: 'Product installation help',
    hint: 'Catalog-grounded guide',
    prompt: 'Guide Priya through installing the Vitamin C serum routine…',
    message:
      'Apply 2–3 drops after cleansing, morning and night. Pair with SPF in the daytime.',
  },
];

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Interactive hero ask: open menu → type prompt → send to WhatsApp → show result.
 */
export default function HomeHero() {
  const boardRef = useRef<HTMLDivElement>(null);
  const askRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<FlowPhase>('idle');
  const [action, setAction] = useState<HeroAction>(ACTIONS[0]);
  const [typed, setTyped] = useState('');
  const [draft, setDraft] = useState('');
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  useEffect(() => {
    if (phase !== 'menu') return;
    const onDoc = (e: Event) => {
      const target = e.target as Node | null;
      if (target && askRef.current?.contains(target)) return;
      setPhase('idle');
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPhase('idle');
    };
    document.addEventListener('pointerdown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [phase]);

  const runFlow = useCallback(
    (next: HeroAction) => {
      clearTimers();
      setAction(next);

      if (prefersReducedMotion()) {
        setTyped(next.prompt);
        setDraft(next.message);
        setPhase('sending');
        timers.current.push(
          window.setTimeout(() => {
            setPhase('done');
          }, 500),
        );
        return;
      }

      setPhase('typing');
      setTyped('');
      setDraft('');

      const full = next.prompt;
      const msg = next.message;
      let i = 0;
      let d = 0;

      const tickDraft = () => {
        d += 1;
        setDraft(msg.slice(0, d));
        if (d < msg.length) {
          timers.current.push(window.setTimeout(tickDraft, 12 + (d % 4) * 3));
        }
      };

      const tick = () => {
        i += 1;
        setTyped(full.slice(0, i));
        if (i === Math.min(8, full.length)) {
          timers.current.push(window.setTimeout(tickDraft, 40));
        }
        if (i < full.length) {
          timers.current.push(window.setTimeout(tick, 14 + (i % 5) * 2));
        } else {
          timers.current.push(
            window.setTimeout(() => {
              setDraft(msg);
              setPhase('sending');
              timers.current.push(
                window.setTimeout(() => {
                  setPhase('done');
                }, 1350),
              );
            }, 380),
          );
        }
      };
      timers.current.push(window.setTimeout(tick, 100));
    },
    [clearTimers],
  );

  const openMenu = (e: ReactMouseEvent) => {
    e.stopPropagation();
    if (phase === 'typing' || phase === 'sending') return;
    setPhase((p) => (p === 'menu' ? (typed ? 'done' : 'idle') : 'menu'));
  };

  const pick = (id: HeroActionId, e: ReactMouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = ACTIONS.find((a) => a.id === id) ?? ACTIONS[0];
    runFlow(next);
  };

  const fieldText =
    phase === 'typing' || phase === 'sending' || phase === 'done'
      ? typed || action.prompt
      : phase === 'menu'
        ? 'What should TopEdge do?'
        : 'Ask TopEdge anything for your store…';

  const statusLabel =
    phase === 'typing'
      ? 'Writing WhatsApp copy…'
      : phase === 'sending'
        ? 'Sending to WhatsApp…'
        : phase === 'done'
          ? 'Delivered on WhatsApp'
          : null;

  const boardClass =
    phase === 'menu'
      ? 'home-hero__board is-menu-open'
      : 'home-hero__board';

  return (
    <section className="home-hero">
      <div className="home-hero__inner">
        <div
          ref={boardRef}
          className={boardClass}
        >
          <HeroRippleBackground />

          <div className="home-hero__top">
            <h1 className="home-hero__title">
              Your emails get ignored.
              <br />
              Your WhatsApp gets read.
            </h1>
            <p className="home-hero__sub">
              It recovers the cart, pulls up the order the moment a shopper asks about it, and
              quietly follows up without you lifting a finger. Connect Shopify, go live in about
              fifteen minutes.
            </p>

            <div className="home-hero__actions">
              <PrimaryButton to="/signup">
                Start free
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <GhostButton to="/features" className="home-hero__ghost">
                See how it works
              </GhostButton>
            </div>

            <div
              ref={askRef}
              className={`home-hero__ask${phase === 'menu' ? ' is-open' : ''}`}
            >
              <div className="home-hero__ask-shell">
                <button
                  type="button"
                  className={`home-hero__ask-field${phase === 'typing' || phase === 'sending' ? ' is-busy' : ''}`}
                  onClick={openMenu}
                  aria-expanded={phase === 'menu'}
                  aria-haspopup="listbox"
                >
                  <span
                    className={`home-hero__ask-text${phase === 'idle' || phase === 'menu' ? ' is-placeholder' : ''}${phase === 'typing' ? ' is-typing' : ''}`}
                  >
                    {fieldText}
                    {phase === 'typing' ? <span className="home-hero__caret" aria-hidden /> : null}
                  </span>
                  <span className="home-hero__ask-send" aria-hidden>
                    {phase === 'sending' ? (
                      <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                    ) : phase === 'done' ? (
                      <WhatsAppMark className="h-4 w-4" />
                    ) : (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform${phase === 'menu' ? ' rotate-180' : ''}`}
                        strokeWidth={2}
                      />
                    )}
                  </span>
                </button>

                {phase === 'menu' ? (
                  <ul className="home-hero__menu" role="listbox">
                    {ACTIONS.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          className="home-hero__menu-item"
                          role="option"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => pick(item.id, e)}
                        >
                          <span className="home-hero__menu-label">{item.label}</span>
                          <span className="home-hero__menu-hint">{item.hint}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              {statusLabel ? (
                <p
                  className={`home-hero__status${phase === 'done' ? ' is-done' : ''}${phase === 'sending' ? ' is-send' : ''}`}
                >
                  {phase === 'done' ? <WhatsAppMark className="h-3.5 w-3.5" /> : null}
                  {phase === 'sending' ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : null}
                  {statusLabel}
                </p>
              ) : phase === 'idle' ? (
                <p className="home-hero__ask-hint">Click to choose what TopEdge should do</p>
              ) : null}
            </div>
          </div>

          <div className="home-hero__bottom">
            <div className="home-hero__stage" aria-live="polite">
              {phase === 'idle' || phase === 'menu' ? (
                <div className="home-hero__idle-card" aria-hidden={phase === 'menu'}>
                  <div className="home-hero__idle-steps" aria-hidden>
                    <span className="is-on">Draft</span>
                    <span className="home-hero__idle-sep" />
                    <span>Send</span>
                    <span className="home-hero__idle-sep" />
                    <span>Live</span>
                  </div>
                  <p className="home-hero__idle-title">Try it like a real send</p>
                  <p className="home-hero__idle-body">
                    Choose an action above. TopEdge writes the WhatsApp message, delivers it, then
                    shows the result.
                  </p>
                  <div className="home-hero__idle-channels">
                    <span>
                      <WhatsAppMark className="h-3.5 w-3.5" />
                      WhatsApp
                    </span>
                    <span>
                      <ShopifyMark className="h-3.5 w-3.5" />
                      Shopify
                    </span>
                  </div>
                </div>
              ) : null}

              {phase === 'typing' ? (
                <div className="home-hero__flow-card home-hero__flow-card--typing home-hero__result-in">
                  <FlowSteps active={1} />
                  <p className="home-hero__flow-kicker">Drafting</p>
                  <p className="home-hero__flow-title">{flowTitle(action.id)}</p>
                  <div className="home-hero__draft-bubble">
                    <p className="home-hero__flow-line home-hero__flow-line--draft">
                      {draft || <span className="home-hero__draft-wait">Composing message…</span>}
                      {draft && draft.length < action.message.length ? (
                        <span className="home-hero__caret" aria-hidden />
                      ) : null}
                    </p>
                  </div>
                  <div className="home-hero__flow-bar" aria-hidden>
                    <span style={{ width: `${Math.min(100, (draft.length / Math.max(1, action.message.length)) * 100)}%` }} />
                  </div>
                </div>
              ) : null}

              {phase === 'sending' ? (
                <div className="home-hero__flow-card home-hero__flow-card--send home-hero__result-in">
                  <FlowSteps active={2} />
                  <div className="home-hero__send-panel">
                    <span className="home-hero__send-pulse">
                      <WhatsAppMark className="h-8 w-8" />
                    </span>
                    <div className="home-hero__send-copy">
                      <p className="home-hero__flow-title">Sending to Priya</p>
                      <p className="home-hero__flow-line">WhatsApp · Meta-approved template</p>
                    </div>
                    <span className="home-hero__send-dots" aria-hidden>
                      <i />
                      <i />
                      <i />
                    </span>
                  </div>
                </div>
              ) : null}

              {phase === 'done' ? <ResultCard action={action} /> : null}
            </div>

            <div className="home-hero__trust">
              <HomeTrust onStage />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function flowTitle(id: HeroActionId) {
  switch (id) {
    case 'recover':
      return 'Cart recovery message';
    case 'reply':
      return 'Order-aware reply';
    case 'journey':
      return 'COD journey steps';
    case 'support':
      return 'Support reply';
    case 'install':
      return 'Product guide';
  }
}

function FlowSteps({ active }: { active: 1 | 2 | 3 }) {
  return (
    <div className="home-hero__flow-steps" aria-hidden>
      <span className={active > 1 ? 'is-done' : active === 1 ? 'is-on' : ''}>Draft</span>
      <span className="home-hero__idle-sep" />
      <span className={active > 2 ? 'is-done' : active === 2 ? 'is-on' : ''}>Send</span>
      <span className="home-hero__idle-sep" />
      <span className={active === 3 ? 'is-on is-done' : ''}>Live</span>
    </div>
  );
}

function ResultCard({ action }: { action: HeroAction }) {
  if (action.id === 'reply') {
    return (
      <div className="home-hero__proof home-hero__proof--reply home-hero__result-in">
        <FlowSteps active={3} />
        <div className="home-hero__proof-layout home-hero__proof-layout--split">
          <div className="home-hero__mini-card home-hero__stagger-1">
            <div className="home-hero__wa-head">
              <WhatsAppMark className="h-4 w-4" />
              <span>Priya M.</span>
              <span className="home-hero__live">
                <span className="home-hero__live-dot" />
                Sent
              </span>
            </div>
            <p className="home-hero__chat-out">{action.message}</p>
          </div>
          <div className="home-hero__mini-card home-hero__stagger-2">
            <div className="home-hero__wa-head">
              <ShopifyMark className="h-4 w-4" />
              <span>Order #TE-1042</span>
            </div>
            <div className="home-hero__stat-rows">
              <div>
                <span>Status</span>
                <strong>Packed</strong>
              </div>
              <div>
                <span>Payment</span>
                <strong>COD pending</strong>
              </div>
              <div>
                <span>Items</span>
                <strong>1 · Serum</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (action.id === 'journey') {
    return (
      <div className="home-hero__proof home-hero__result-in">
        <div className="home-hero__journey-card">
          <FlowSteps active={3} />
          <div className="home-hero__wa-head">
            <span>COD recovery journey</span>
            <span className="home-hero__live">
              <span className="home-hero__live-dot" />
              Live
            </span>
          </div>
          <ol className="home-hero__journey-rail">
            <li className="home-hero__stagger-1">
              <span className="home-hero__journey-n">1</span>
              <div>
                <strong>Cart abandoned</strong>
                <p>Shopify checkout drop-off</p>
              </div>
            </li>
            <li className="home-hero__stagger-2">
              <span className="home-hero__journey-n">2</span>
              <div>
                <strong>Wait 4 hours</strong>
                <p>Delay before first nudge</p>
              </div>
            </li>
            <li className="home-hero__stagger-3">
              <span className="home-hero__journey-n">3</span>
              <div>
                <strong>WhatsApp · COD</strong>
                <p>Send if payment is COD</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    );
  }

  if (action.id === 'support') {
    return (
      <div className="home-hero__proof home-hero__result-in">
        <div className="home-hero__wa-card">
          <FlowSteps active={3} />
          <div className="home-hero__wa-head">
            <WhatsAppMark className="h-4 w-4" />
            <span>Support · Priya</span>
            <span className="home-hero__live">
              <span className="home-hero__live-dot" />
              Delivered
            </span>
          </div>
          <div className="home-hero__wa-bubble home-hero__stagger-1">{action.message}</div>
          <div className="home-hero__policy home-hero__stagger-2">
            <span>Policy used</span>
            <strong>7-day free returns · COD</strong>
          </div>
        </div>
      </div>
    );
  }

  const isRecover = action.id === 'recover';
  const isInstall = action.id === 'install';

  return (
    <div className="home-hero__proof home-hero__result-in">
      <div className="home-hero__wa-card">
        <FlowSteps active={3} />
        <div className="home-hero__wa-head">
          <WhatsAppMark className="h-4 w-4" />
          <span>{isInstall ? 'Guide · Priya' : 'To Priya'}</span>
          <span className="home-hero__live">
            <span className="home-hero__live-dot" />
            Delivered
          </span>
        </div>
        <div className="home-hero__wa-bubble home-hero__stagger-1">
          {action.message}
          {(isRecover || isInstall) && (
            <div className="home-hero__product">
              <img
                src="/marketing/products/vitamin-c-serum.jpg"
                alt="Vitamin C serum"
                className="home-hero__product-thumb"
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="home-hero__product-name">Vitamin C serum</p>
                <p className="home-hero__product-meta">
                  {isRecover ? '₹2,840 · COD available' : 'AM + PM routine'}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="home-hero__wa-foot home-hero__stagger-2">
          <span>{isRecover ? 'If she checks out' : isInstall ? 'Catalog grounded' : 'Reply window open'}</span>
          <strong>{isRecover ? '+₹2,840' : 'Live'}</strong>
        </div>
      </div>
    </div>
  );
}

