import {
  Bot,
  CheckCircle2,
  Instagram,
  Link2,
  MessageCircle,
  Send,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  QrCode,
} from 'lucide-react';
import { FsSRow } from './ScenePrimitives';
import { WhatsAppMark, ShopifyMark } from './BrandMarks';
import { ProductThumb, SAMPLE_PRODUCT } from './ProductThumb';

/** Additional Instantly-style scenes for homepage feature stories */
export function ShopifyScene({ className = '' }: { className?: string }) {
  return (
    <div className={`fs-stage fs-stage--shopify ${className}`} aria-hidden>
      <div className="fs-canvas fs-canvas--shopify">
        <div className="fs-card fs-card--float fs-shopify__connect">
          <div className="flex items-center gap-2.5">
            <ShopifyMark className="h-10 w-10" />
            <div>
              <p className="fs-card__title">Connect Shopify</p>
              <p className="fs-card__meta">OAuth · ~2 minutes</p>
            </div>
          </div>
          <div className="mt-4">
            <FsSRow label="Store" value="kaya-roots.myshopify.com" />
            <FsSRow label="Status" value="OAuth sync live" trail="Connected" trailTone="ok" />
          </div>
          <button type="button" className="fs-btn mt-4 w-full" tabIndex={-1}>
            <Link2 className="h-3.5 w-3.5" />
            Manage in dashboard
          </button>
        </div>

        <div className="fs-card fs-card--float fs-shopify__data">
          <div className="flex items-center justify-between">
            <p className="fs-card__title">Live store sync</p>
            <span className="fs-chip fs-chip--ok">
              <span className="fs-dot" />
              Live
            </span>
          </div>
          <p className="fs-card__meta">Edit catalog in dashboard only</p>
          <div className="mt-3">
            <FsSRow label="Orders · 7d" trail="184" />
            <FsSRow label="Open carts" trail="42" />
            <FsSRow label="Catalog SKUs" trail="312" />
            <FsSRow label="Revenue" trail="₹4.2L" />
          </div>
        </div>

        <div className="fs-float-chip fs-shopify__chip">
          <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
          Source of truth: Shopify
        </div>
      </div>
    </div>
  );
}

export function FlowBuilderScene({ className = '' }: { className?: string }) {
  return (
    <div className={`fs-stage fs-stage--champagne ${className}`} aria-hidden>
      <div className="fs-canvas fs-canvas--flowb-v3">
        <div className="fs-flowb__story">
          <div className="fs-card fs-card--raised fs-flowb__form">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-[#7C3AED] text-white shadow-lg shadow-violet-500/30">
                <Sparkles className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div>
                <p className="fs-card__title">AI form</p>
                <p className="fs-card__meta">Describe your store</p>
              </div>
            </div>
            <div className="mt-3.5">
              <FsSRow label="Niche" value="D2C skincare · India" />
              <FsSRow label="Goals" value="FAQ · catalog · handoff" />
            </div>
            <button type="button" className="fs-btn mt-3.5 w-full" tabIndex={-1}>
              Generate flow
            </button>
          </div>

          <div className="fs-card fs-card--raised fs-flowb__canvas">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="fs-card__title">Flow Builder</p>
                <p className="fs-card__meta">Generated · editable</p>
              </div>
              <span className="fs-chip fs-chip--ok">
                <span className="fs-dot" />
                Draft
              </span>
            </div>

            <div className="mt-3">
              <FsSRow label="Screen 1" value="Welcome" />
              <FsSRow label="Screen 2" value="Catalog browse" />
              <FsSRow label="Screen 3" value="FAQ · COD · shipping" />
              <FsSRow label="Handoff" value="Live Chat agent" trail="Open" />
            </div>
          </div>

          <div className="fs-card fs-card--raised fs-flowb__publish">
            <div className="flex items-center gap-2.5">
              <div>
                <p className="fs-card__title">Publish</p>
                <p className="fs-card__meta">Choose a trigger</p>
              </div>
            </div>

            <div className="mt-3.5 grid grid-cols-2 gap-2">
              {[
                { t: 'Shopify', on: false },
                { t: 'WhatsApp', on: true },
                { t: 'Keyword', on: false },
                { t: 'Manual', on: false },
              ].map((x) => (
                <span key={x.t} className={`fs-flowb__trig ${x.on ? 'is-on' : ''}`}>
                  {x.t}
                </span>
              ))}
            </div>

            <div className="mt-3">
              <FsSRow label="Starts when" value="Customer opens WhatsApp" trail="On" />
            </div>

            <button type="button" className="fs-btn mt-3.5 w-full" tabIndex={-1}>
              Publish flow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AiBrainScene({ className = '' }: { className?: string }) {
  return (
    <div className={`fs-stage fs-stage--orchid ${className}`} aria-hidden>
      <div className="fs-canvas fs-canvas--brain">
        <div className="fs-card fs-card--float fs-brain__chat">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[14px] bg-[#7C3AED] text-white">
              <Bot className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div>
              <p className="fs-card__title">AI Brain</p>
              <p className="fs-card__meta">Catalog-grounded</p>
            </div>
          </div>
          <div className="fs-bubble fs-bubble--user mt-4">
            Do you have {SAMPLE_PRODUCT.name} under ₹3,000?
          </div>
          <div className="fs-bubble mt-2.5">
            <p className="fs-bubble__lead">Yes · from your catalog</p>
            <div className="fs-bubble__rows">
              <FsSRow label={SAMPLE_PRODUCT.name} value="In stock · COD" trail={SAMPLE_PRODUCT.price} />
              <FsSRow label="Policy" value="Returns · 7 days" trail="Ok" trailTone="ok" />
            </div>
            <div className="fs-product">
              <ProductThumb />
              <div>
                <p className="text-[12px] font-medium text-[#0c1222]">{SAMPLE_PRODUCT.name}</p>
                <p className="mkt-kpi text-[13px] text-[#7C3AED]">{SAMPLE_PRODUCT.price} · In stock</p>
              </div>
            </div>
          </div>
        </div>

        <div className="fs-card fs-card--float fs-brain__knowledge">
          <p className="fs-card__title">Knowledge</p>
          <p className="fs-card__meta">Synced sources</p>
          <div className="mt-3">
            <FsSRow label="Shopify catalog" value="312 SKUs" trail="Synced" trailTone="ok" />
            <FsSRow label="Store policies" value="Returns · shipping" />
            <FsSRow label="Intent routing" value="14 active" trail="Live" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CampaignsScene({ className = '' }: { className?: string }) {
  return (
    <div className={`fs-stage fs-stage--coral ${className}`} aria-hidden>
      <div className="fs-canvas fs-canvas--camp">
        <div className="fs-card fs-card--float fs-camp__composer">
          <div className="flex items-center justify-between">
            <p className="fs-card__title">Campaign</p>
            <span className="fs-chip">Marketing</span>
          </div>
          <div className="mt-3 space-y-2.5">
            <div className="rounded-[16px] border border-[#efeaf8] px-3 py-2.5">
              <p className="text-[10px] text-slate-400">Audience</p>
              <p className="text-[13px] font-medium text-[#0c1222]">Abandoned · 7d · 1,240</p>
            </div>
            <div className="rounded-[16px] border border-[#efeaf8] px-3 py-2.5">
              <p className="text-[10px] text-slate-400">Template</p>
              <p className="text-[13px] font-medium text-[#0c1222]">weekend_sale_v1 · Approved</p>
            </div>
            <div className="flex items-center justify-between rounded-[16px] bg-[#f5f3ff] px-3 py-2.5">
              <span className="text-[12px] text-slate-500">Est. Meta cost</span>
              <span className="mkt-kpi text-[13px] font-medium text-[#7C3AED]">~₹0.88 / msg</span>
            </div>
          </div>
          <button type="button" className="fs-btn mt-3.5 w-full" tabIndex={-1}>
            <Send className="h-3.5 w-3.5" />
            Review & send
          </button>
        </div>

        <div className="fs-card fs-card--float fs-camp__preview">
          <p className="fs-card__meta mb-2">Preview</p>
          <div className="fs-bubble">
            Priya, your weekend picks are back in stock ,  complete checkout before midnight.
            <div className="fs-product">
              <ProductThumb />
              <div>
                <p className="text-[12px] font-medium text-[#0c1222]">Serum duo pack</p>
                <p className="mkt-kpi text-[13px] text-[#7C3AED]">₹3,990 · COD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InstagramScene({ className = '' }: { className?: string }) {
  return (
    <div className={`fs-stage fs-stage--magenta ${className}`} aria-hidden>
      <div className="fs-canvas fs-canvas--ig">
        <div className="fs-card fs-card--float fs-ig__post">
          <div className="flex items-center gap-2.5">
            <span className="fs-inbox__avatar is-ig is-lg">K</span>
            <div>
              <p className="fs-card__title">kaya.roots</p>
              <p className="fs-card__meta">New post · skincare</p>
            </div>
          </div>
          <div className="fs-ig__media mt-3" />
          <div className="mt-3">
            <FsSRow label="@priya" value="Price please?" trail="Comment" />
          </div>
        </div>

        <div className="fs-card fs-card--float fs-ig__dm">
          <div className="flex items-center gap-2">
            <Instagram className="h-4 w-4 text-[#7C3AED]" strokeWidth={1.75} />
            <p className="fs-card__title">Auto DM</p>
            <span className="fs-chip fs-chip--ok ml-auto">
              <span className="fs-dot" />
              Rule on
            </span>
          </div>
          <div className="fs-msg fs-msg--out mt-4 !max-w-full">
            <p>
              Hey! {SAMPLE_PRODUCT.name} is {SAMPLE_PRODUCT.price} · COD available. Chat on
              WhatsApp?
            </p>
            <span className="fs-msg__time">Auto · 2s</span>
          </div>
          <div className="mt-3">
            <FsSRow label="When they reply" value="Continues in Live Chat" trail="Handoff" />
          </div>
        </div>

        <div className="fs-float-chip fs-ig__chip">
          <WhatsAppMark className="h-3.5 w-3.5" />
          Comment → DM
        </div>
      </div>
    </div>
  );
}

export function DashboardScene({ className = '' }: { className?: string }) {
  return (
    <div className={`fs-stage fs-stage--sky ${className}`} aria-hidden>
      <div className="fs-canvas fs-canvas--dash">
        <div className="fs-card fs-card--float fs-dash__hero">
          <p className="text-[11px] uppercase tracking-wide text-slate-400">Recovered · 7 days</p>
          <p className="mkt-kpi mt-1 text-[2rem] font-medium tracking-tight text-[#0c1222]">
            ₹1.28L
          </p>
          <p className="mt-1 text-[12px] text-emerald-600">↑ 18% vs last week</p>
          <div className="fs-dash__bars mt-5">
            {[40, 65, 48, 80, 55, 90, 72].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="fs-dash__side">
          {[
            { l: 'Open chats', v: '23', icon: MessageCircle },
            { l: 'Abandoned', v: '42', icon: ShoppingBag },
            { l: 'Campaigns', v: '2 live', icon: TrendingUp },
          ].map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.l} className="fs-card fs-card--float fs-dash__mini">
                <span className="fs-icon">
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[10px] text-slate-400">{m.l}</p>
                  <p className="text-[14px] font-medium text-[#0c1222]">{m.v}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function AnalyticsScene({ className = '' }: { className?: string }) {
  return (
    <div className={`fs-stage fs-stage--cyan ${className}`} aria-hidden>
      <div className="fs-canvas fs-canvas--analytics">
        <div className="fs-card fs-card--float fs-analytics__main">
          <div className="flex items-center justify-between">
            <p className="fs-card__title">Recovery funnel</p>
            <span className="fs-chip">7 days</span>
          </div>
          <div className="mt-3">
            <FsSRow label="Sent" trail="4,820" />
            <FsSRow label="Read" trail="3,610" />
            <FsSRow label="Clicked" trail="1,240" />
            <FsSRow label="Paid" trail="386" trailTone="ok" />
          </div>
        </div>

        <div className="fs-float-chip fs-analytics__chip">
          Honest Meta costs · no vanity metrics
        </div>
      </div>
    </div>
  );
}

export function MetaManagerScene({ className = '' }: { className?: string }) {
  return (
    <div className={`fs-stage fs-stage--azure ${className}`} aria-hidden>
      <div className="fs-canvas fs-canvas--meta">
        <div className="fs-card fs-card--float fs-meta__lib">
          <div className="flex items-center justify-between">
            <p className="fs-card__title">Templates</p>
            <span className="fs-chip">Library</span>
          </div>
          <div className="mt-3">
            <FsSRow label="cart_reminder_v2" value="Utility" trail="Approved" trailTone="ok" />
            <FsSRow label="order_shipped_v1" value="Utility" trail="Approved" trailTone="ok" />
            <FsSRow label="weekend_sale_v1" value="Marketing" trail="Pending" trailTone="muted" />
          </div>
        </div>

        <div className="fs-card fs-card--float fs-meta__qr">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[20px] bg-[#f5f3ff]">
            <QrCode className="h-12 w-12 text-[#7C3AED]" strokeWidth={1.25} />
          </div>
          <p className="mt-3 text-center text-[13px] font-medium text-[#0c1222]">WhatsApp QR</p>
          <p className="mt-1 text-center text-[11px] text-slate-400">Deep link · catalog ready</p>
        </div>

        <div className="fs-float-chip fs-meta__chip">You approve every template</div>
      </div>
    </div>
  );
}

export function AudienceScene({ className = '' }: { className?: string }) {
  return (
    <div className={`fs-stage fs-stage--slate ${className}`} aria-hidden>
      <div className="fs-canvas fs-canvas--aud">
        <div className="fs-card fs-card--float fs-aud__filters">
          <p className="fs-card__title">Segments</p>
          <p className="fs-card__meta">Audience filters</p>
          <div className="mt-3">
            {[
              { n: 'Abandoned · 7d', c: '1,240' },
              { n: 'VIP / High LTV', c: '186' },
              { n: 'COD risk', c: '94' },
            ].map((f, i) => (
              <FsSRow
                key={f.n}
                label={f.n}
                trail={f.c}
                trailTone={i === 0 ? undefined : 'muted'}
              />
            ))}
          </div>
        </div>

        <div className="fs-card fs-card--float fs-aud__profile">
          <div className="flex items-center gap-2.5">
            <span className="fs-inbox__avatar is-wa is-lg">P</span>
            <div>
              <p className="fs-card__title">Priya M.</p>
              <p className="fs-card__meta">Score 86 · Warm lead</p>
            </div>
            <span className="fs-chip ml-auto">VIP path</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { l: 'LTV', v: '₹18.2k' },
              { l: 'Carts', v: '3' },
              { l: 'COD', v: 'Yes' },
            ].map((s) => (
              <div key={s.l} className="rounded-[14px] bg-[#faf9ff] px-2 py-2.5 text-center">
                <p className="text-[10px] text-slate-400">{s.l}</p>
                <p className="mkt-kpi mt-0.5 text-[13px] font-medium text-[#0c1222]">{s.v}</p>
              </div>
            ))}
          </div>
          <div className="fs-product mt-3">
            <ProductThumb />
            <div>
              <p className="text-[12px] font-medium text-[#0c1222]">Last cart</p>
              <p className="mkt-kpi text-[13px] text-[#7C3AED]">
                {SAMPLE_PRODUCT.name} · {SAMPLE_PRODUCT.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
