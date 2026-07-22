import { Package, Send, Zap } from 'lucide-react';
import {
  ShopifyScene,
  FlowBuilderScene,
  AiBrainScene,
  CampaignsScene,
  InstagramScene,
  DashboardScene,
  AnalyticsScene,
  MetaManagerScene,
  AudienceScene,
} from './ExtraFeatureScenes';
import { FsSRow, FsStepper } from './ScenePrimitives';
import { WhatsAppMark, ShopifyMark } from './BrandMarks';
import { ProductThumb, SAMPLE_PRODUCT } from './ProductThumb';
import type { FeatureStoryId } from '../../data/home';

export type SceneVariant = 'hero' | FeatureStoryId | 'order-messages';
export { FsSRow, FsCFlow, FsStepper } from './ScenePrimitives';

/**
 * Instantly-style feature compositions ,  distilled floating UI cards on a
 * soft gradient stage. Not full dashboard screenshots / browser chrome.
 */
export default function FeatureScene({
  variant = 'cart-recovery',
  className = '',
}: {
  variant?: SceneVariant;
  className?: string;
}) {
  if (variant === 'hero') return <HeroScene className={className} />;
  if (variant === 'inbox') return <InboxScene className={className} />;
  if (variant === 'journey' || variant === 'order-messages') {
    return <JourneyScene className={className} />;
  }
  if (variant === 'shopify') return <ShopifyScene className={className} />;
  if (variant === 'flow-builder') return <FlowBuilderScene className={className} />;
  if (variant === 'ai-brain') return <AiBrainScene className={className} />;
  if (variant === 'campaigns') return <CampaignsScene className={className} />;
  if (variant === 'instagram') return <InstagramScene className={className} />;
  if (variant === 'dashboard') return <DashboardScene className={className} />;
  if (variant === 'analytics') return <AnalyticsScene className={className} />;
  if (variant === 'meta-manager') return <MetaManagerScene className={className} />;
  if (variant === 'audience') return <AudienceScene className={className} />;
  return <CartScene className={className} />;
}

/** Features index demo: chat + preview only (no icon-node rails) */
function HeroScene({ className }: { className?: string }) {
  return (
    <div className={`fs-stage fs-stage--hero ${className}`} aria-hidden>
      <div className="fs-canvas fs-canvas--hero">
        <div className="fs-hero__layout fs-hero__layout--two">
          <div className="fs-card fs-card--raised fs-hero__chat">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-[#7C3AED] text-white shadow-lg shadow-violet-500/35">
                <Zap className="h-4 w-4" strokeWidth={1.75} fill="currentColor" />
              </span>
              <div>
                <p className="fs-card__title">TopEdge</p>
                <p className="fs-card__meta">Cart recovery</p>
              </div>
            </div>
            <div className="fs-bubble fs-bubble--user mt-4">Help finish my cart recovery.</div>
            <div className="fs-bubble mt-2.5">
              <p className="fs-bubble__lead">Warm the sequence</p>
              <div className="fs-bubble__rows">
                <FsSRow label="Message 1" value="Utility · immediate" trail="Now" />
                <FsSRow label="Message 2" value="4h delay · A/B" trail="Next" />
                <FsSRow label="Meta gate" value="Wait for approval" trail="Hold" trailTone="muted" />
              </div>
            </div>
            <div className="fs-action-row mt-3">
              <div className="fs-input">
                <span className="truncate">Ask TopEdge…</span>
              </div>
              <button type="button" className="fs-btn fs-btn--icon" tabIndex={-1} aria-hidden>
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="fs-card fs-card--raised fs-hero__preview">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="fs-card__title">Cart reminder</p>
                <div className="mt-1.5">
                  <FsStepper total={3} current={2} label="Follow-up 2 of 3" />
                </div>
              </div>
              <span className="fs-chip fs-chip--ok">
                <span className="fs-dot" />
                Live
              </span>
            </div>
            <div className="fs-bubble mt-4">
              Hi Priya, your cart is waiting. Complete checkout before items sell out.
              <div className="fs-product">
                <ProductThumb />
                <div>
                  <p className="text-[12px] font-medium text-[#0c1222]">{SAMPLE_PRODUCT.name}</p>
                  <p className="mkt-kpi text-[13px] text-[#7C3AED]">
                    {SAMPLE_PRODUCT.price} · COD available
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <FsSRow label="Recovered today" trail="₹18,420" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartScene({ className }: { className?: string }) {
  const steps = [
    { t: 'Message 1', d: 'Utility · immediate', trail: 'Sent', tone: 'ok' as const },
    { t: 'Message 2', d: '4h delay · A/B', trail: 'Sending' },
    { t: 'Message 3', d: 'After 24h', trail: 'Queued', tone: 'muted' as const },
  ];

  return (
    <div className={`fs-stage fs-stage--rose ${className}`} aria-hidden>
      <div className="fs-canvas fs-canvas--cart">
        <div className="fs-cart__story">
          <div className="fs-card fs-card--raised fs-cart__trigger">
            <div className="flex items-center gap-2.5">
              <ShopifyMark className="h-9 w-9" />
              <div>
                <p className="fs-card__title">Cart abandoned</p>
                <p className="fs-card__meta">Shopify · just now</p>
              </div>
            </div>
            <div className="fs-product mt-3.5">
              <ProductThumb />
              <div>
                <p className="text-[12px] font-medium text-[#0c1222]">{SAMPLE_PRODUCT.name}</p>
                <p className="mkt-kpi text-[13px] text-[#7C3AED]">{SAMPLE_PRODUCT.price} · COD</p>
              </div>
            </div>
            <div className="mt-3">
              <FsSRow label="Customer" value="Priya left checkout" trail="Start" />
              <FsSRow label="Sequence" value="3 timed WhatsApp nudges" trail="Armed" />
            </div>
          </div>

          <div className="fs-cart__arrow" aria-hidden>
            <span />
          </div>

          <div className="fs-card fs-card--raised fs-cart__seq">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="fs-card__title">Recovery sequence</p>
                <div className="mt-1.5">
                  <FsStepper total={3} current={2} label="Step 2 of 3" />
                </div>
              </div>
              <span className="fs-chip fs-chip--ok">
                <span className="fs-dot" />
                Active
              </span>
            </div>
            <div className="mt-3">
              {steps.map((s) => (
                <FsSRow
                  key={s.t}
                  label={s.t}
                  value={s.d}
                  trail={s.trail}
                  trailTone={s.tone}
                />
              ))}
            </div>
          </div>

          <div className="fs-cart__arrow fs-cart__arrow--live" aria-hidden>
            <span />
          </div>

          <div className="fs-card fs-card--raised fs-cart__wa">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <WhatsAppMark className="h-8 w-8" />
                <div>
                  <p className="fs-card__title">To Priya</p>
                  <p className="fs-card__meta">Message 2 · utility</p>
                </div>
              </div>
              <span className="fs-chip fs-chip--ok">
                <span className="fs-dot" />
                Live
              </span>
            </div>
            <div className="fs-bubble mt-3.5">
              Hi Priya, your cart is waiting. Complete checkout before items sell out.
              <div className="fs-product">
                <ProductThumb />
                <div>
                  <p className="text-[12px] font-medium text-[#0c1222]">{SAMPLE_PRODUCT.name}</p>
                  <p className="mkt-kpi text-[13px] text-[#7C3AED]">
                    {SAMPLE_PRODUCT.price} · COD available
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <FsSRow label="If she checks out" trail="+₹2,840" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InboxScene({ className }: { className?: string }) {
  return (
    <div className={`fs-stage fs-stage--mint ${className}`} aria-hidden>
      <div className="fs-canvas fs-canvas--inbox">
        <div className="fs-inbox__story">
          {/* 1. Unified inbox */}
          <div className="fs-card fs-card--raised fs-inbox__list">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="fs-card__title">Inbox</p>
                <p className="fs-card__meta">WA + Instagram</p>
              </div>
              <span className="fs-chip">3 open</span>
            </div>
            <div className="mt-3 space-y-1">
              {[
                { n: 'Priya M.', t: 'Where is my order?', ch: 'WA', a: true, unread: 2 },
                { n: 'Arjun K.', t: 'COD confirm please', ch: 'WA', a: false, unread: 0 },
                { n: 'Neha S.', t: 'Size exchange?', ch: 'IG', a: false, unread: 1 },
              ].map((c) => (
                <div key={c.n} className={`fs-inbox__contact ${c.a ? 'is-active' : ''}`}>
                  <span className={`fs-inbox__avatar ${c.ch === 'IG' ? 'is-ig' : 'is-wa'}`}>
                    {c.n.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="truncate text-[13px] font-medium text-[#0c1222]">{c.n}</p>
                      {c.a && <span className="fs-inbox__now">Open</span>}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <p className="truncate text-[11px] text-slate-400">{c.t}</p>
                      {c.unread > 0 && <span className="fs-inbox__badge">{c.unread}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Live thread */}
          <div className="fs-card fs-card--raised fs-inbox__thread">
            <div className="fs-inbox__thread-head">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="fs-inbox__avatar is-wa is-lg">P</span>
                <div className="min-w-0">
                  <p className="fs-card__title truncate">Priya M.</p>
                  <p className="fs-card__meta flex items-center gap-1.5">
                    <span className="fs-dot fs-dot--ok" />
                    <WhatsAppMark className="h-3 w-3" />
                    WhatsApp · live
                  </p>
                </div>
              </div>
            </div>

            <div className="fs-inbox__messages">
              <div className="fs-msg fs-msg--in">
                <p>Hi, where is my order? I paid COD yesterday.</p>
                <span className="fs-msg__time">10:42</span>
              </div>
              <div className="fs-msg fs-msg--out">
                <p>Checking Shopify now. #TE-1042 is packed.</p>
                <span className="fs-msg__time">10:43 · Agent</span>
              </div>
              <div className="fs-msg fs-msg--in">
                <p>Great, when will it ship?</p>
                <span className="fs-msg__time">10:44</span>
              </div>
              <div className="fs-msg fs-msg--out fs-msg--typing">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="fs-action-row mt-3">
              <div className="fs-input">
                <span className="truncate">Reply with tracking…</span>
              </div>
              <button type="button" className="fs-btn" tabIndex={-1}>
                Reply
              </button>
            </div>
          </div>

          {/* 3. Order context beside chat (the product point) */}
          <div className="fs-card fs-card--raised fs-inbox__order">
            <div className="flex items-center gap-2.5">
              <ShopifyMark className="h-9 w-9" />
              <div>
                <p className="fs-card__title">Order #TE-1042</p>
                <p className="fs-card__meta">Shopify · beside chat</p>
              </div>
            </div>

            <div className="fs-product mt-3.5">
              <ProductThumb />
              <div>
                <p className="text-[12px] font-medium text-[#0c1222]">{SAMPLE_PRODUCT.name}</p>
                <p className="mkt-kpi text-[13px] text-[#7C3AED]">{SAMPLE_PRODUCT.price}</p>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {[
                { l: 'Status', v: 'Packed' },
                { l: 'Payment', v: 'COD pending' },
                { l: 'LTV', v: '₹18.2k' },
              ].map((row) => (
                <FsSRow key={row.l} label={row.l} trail={row.v} />
              ))}
            </div>

            <button type="button" className="fs-btn mt-3.5 w-full" tabIndex={-1}>
              <Package className="h-3.5 w-3.5" strokeWidth={2} />
              Send tracking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function JourneyScene({ className }: { className?: string }) {
  return (
    <div className={`fs-stage fs-stage--indigo ${className}`} aria-hidden>
      <div className="fs-canvas fs-canvas--journey-v3">
        <div className="fs-journey__story">
          <div className="fs-card fs-card--raised fs-journey__trigger">
            <div className="flex items-center gap-2.5">
              <ShopifyMark className="h-9 w-9" />
              <div>
                <p className="fs-card__title">Trigger</p>
                <p className="fs-card__meta">Starts the journey</p>
              </div>
            </div>
            <div className="mt-3.5">
              <FsSRow label="Event" value="Shopify · Cart abandoned" trail="Live" trailTone="ok" />
            </div>
            <div className="fs-product mt-3">
              <ProductThumb />
              <div>
                <p className="text-[12px] font-medium text-[#0c1222]">{SAMPLE_PRODUCT.name}</p>
                <p className="mkt-kpi text-[13px] text-[#7C3AED]">{SAMPLE_PRODUCT.price} · COD</p>
              </div>
            </div>
          </div>

          <div className="fs-card fs-card--raised fs-journey__canvas">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="fs-card__title">COD recovery journey</p>
                <p className="fs-card__meta">Wait · branch · WhatsApp</p>
              </div>
              <span className="fs-chip fs-chip--ok">
                <span className="fs-dot" />
                Live
              </span>
            </div>

            <div className="mt-3">
              <FsSRow label="1. Cart abandoned" value="Shopify trigger" />
              <FsSRow label="2. Wait 4 hours" value="Delay before nudge" trail="Now" />
              <FsSRow label="3. COD available?" value="Yes → WhatsApp · No → skip" trail="Branch" />
            </div>
          </div>

          <div className="fs-card fs-card--raised fs-journey__out">
            <div className="flex items-center gap-2.5">
              <WhatsAppMark className="h-9 w-9" />
              <div>
                <p className="fs-card__title">WhatsApp send</p>
                <p className="fs-card__meta">cart_reminder_v2</p>
              </div>
            </div>
            <div className="fs-bubble mt-3.5">
              Hi Priya, your cart is still here. Checkout with COD in one tap.
              <div className="fs-product">
                <ProductThumb />
                <div>
                  <p className="text-[12px] font-medium text-[#0c1222]">{SAMPLE_PRODUCT.name}</p>
                  <p className="mkt-kpi text-[13px] text-[#7C3AED]">{SAMPLE_PRODUCT.price} · COD</p>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <FsSRow label="Branch taken" trail="Yes · COD" />
              <FsSRow label="If recovered" trail="+₹2,840" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
