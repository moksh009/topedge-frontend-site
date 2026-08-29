import { Package, Sparkles } from 'lucide-react';
import { ShopifyMark, WhatsAppMark } from '../foundation/BrandMarks';
import { ProductThumb, SAMPLE_PRODUCT } from '../foundation/ProductThumb';
import { homeIntegrations } from '../../data/home';

export type StickyMomentId =
  | 'cart-recovery'
  | 'journey'
  | 'inbox'
  | 'ai-brain'
  | 'flow-builder'
  | 'connect';

/**
 * Sticky-only showcases: each moment has a distinct tilted composition.
 */
export default function StickyMoment({
  id,
  active,
}: {
  id: StickyMomentId;
  active: boolean;
}) {
  return (
    <div
      className={`sticky-moment sticky-moment--${id}${active ? ' is-active' : ''}`}
      aria-hidden
    >
      {id === 'cart-recovery' ? <CartMoment /> : null}
      {id === 'journey' ? <JourneyMoment /> : null}
      {id === 'inbox' ? <InboxMoment /> : null}
      {id === 'ai-brain' ? <AudienceMoment /> : null}
      {id === 'connect' ? <AlertsMoment /> : null}
    </div>
  );
}

function CartMoment() {
  return (
    <div className="sticky-moment__stage sticky-moment__stage--rose">
      <div className="sticky-moment__bg-mesh" aria-hidden />
      <div className="sticky-moment__cart">
        <div className="sticky-moment__piece sticky-moment__card sticky-moment__chip is-tilt-a">
          <ShopifyMark className="h-5 w-5" />
          <div>
            <p>Cart abandoned</p>
            <span>Shopify · just now</span>
          </div>
          <em>Armed</em>
        </div>

        <ol className="sticky-moment__piece sticky-moment__card sticky-moment__rail is-tilt-b">
          {[
            { n: '1', t: 'Utility ping', d: 'Immediate', on: false, tone: 'is-warn' },
            { n: '2', t: 'COD nudge', d: 'After 4h', on: true, tone: 'is-live' },
            { n: '3', t: 'Last chance', d: 'After 24h', on: false, tone: 'is-alert' },
          ].map((step) => (
            <li key={step.n} className={[step.on ? 'is-on' : undefined, step.tone].filter(Boolean).join(' ') || undefined}>
              <span className="sticky-moment__rail-n">{step.n}</span>
              <div>
                <strong>{step.t}</strong>
                <p>{step.d}</p>
              </div>
              {step.on ? <i>Sending</i> : null}
            </li>
          ))}
        </ol>

        <div className="sticky-moment__piece sticky-moment__card sticky-moment__phone is-tilt-c">
          <div className="sticky-moment__phone-bar">
            <WhatsAppMark className="h-4 w-4" />
            <span>Priya</span>
            <b className="is-live">
              <i />
              Live
            </b>
          </div>
          <div className="sticky-moment__bubble">
            Hi Priya, your cart is waiting. Complete checkout before items sell out.
            <div className="sticky-moment__product sticky-moment__product--cod">
              <ProductThumb className="sticky-moment__thumb" />
              <div>
                <p>{SAMPLE_PRODUCT.name}</p>
                <strong>
                  <em>{SAMPLE_PRODUCT.price}</em>
                  <span>COD</span>
                </strong>
              </div>
            </div>
          </div>
          <div className="sticky-moment__recover">
            <span>If she checks out</span>
            <strong>+₹2,840</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function JourneyMoment() {
  return (
    <div className="sticky-moment__stage sticky-moment__stage--indigo">
      <div className="sticky-moment__bg-mesh" aria-hidden />
      <div className="sticky-moment__journey">
        <div className="sticky-moment__piece sticky-moment__card sticky-moment__node sticky-moment__node--start is-tilt-a">
          <ShopifyMark className="h-5 w-5" />
          <div>
            <strong>Cart abandoned</strong>
            <p>Shopify trigger</p>
          </div>
          <em>Live</em>
        </div>

        <span className="sticky-moment__piece sticky-moment__wire" aria-hidden />

        <div className="sticky-moment__piece sticky-moment__card sticky-moment__node sticky-moment__node--wait is-tilt-b">
          <span className="sticky-moment__clock">4h</span>
          <div>
            <strong>Wait</strong>
            <p>Delay before nudge</p>
          </div>
        </div>

        <span className="sticky-moment__piece sticky-moment__wire" aria-hidden />

        <div className="sticky-moment__piece sticky-moment__card sticky-moment__branch is-tilt-a">
          <p>COD available?</p>
          <div className="sticky-moment__fork">
            <div className="is-yes">
              <span>Yes</span>
              <strong>Send WhatsApp</strong>
            </div>
            <div className="is-no">
              <span>No</span>
              <strong>Skip</strong>
            </div>
          </div>
        </div>

        <span className="sticky-moment__piece sticky-moment__wire sticky-moment__wire--yes" aria-hidden />

        <div className="sticky-moment__piece sticky-moment__card sticky-moment__node sticky-moment__node--wa is-tilt-c">
          <WhatsAppMark className="h-5 w-5" />
          <div>
            <strong>WhatsApp send</strong>
            <p>cart_reminder_v2</p>
          </div>
          <div className="sticky-moment__mini-bubble">
            Hi Priya, checkout with COD in one tap.
          </div>
        </div>
      </div>
    </div>
  );
}

function InboxMoment() {
  return (
    <div className="sticky-moment__stage sticky-moment__stage--mint">
      <div className="sticky-moment__bg-mesh" aria-hidden />
      <div className="sticky-moment__inbox">
        <aside className="sticky-moment__piece sticky-moment__card sticky-moment__contacts is-tilt-a">
          <header>
            <p>Inbox</p>
            <span>3 open</span>
          </header>
          {[
            { n: 'Priya M.', t: 'Where is my order?', a: true, unread: 2 },
            { n: 'Arjun K.', t: 'COD confirm please', a: false, unread: 0 },
            { n: 'Neha S.', t: 'Size exchange?', a: false, unread: 1 },
          ].map((c) => (
            <button key={c.n} type="button" className={c.a ? 'is-active' : undefined} tabIndex={-1}>
              <span>{c.n.charAt(0)}</span>
              <div>
                <strong>{c.n}</strong>
                <p>{c.t}</p>
              </div>
              {c.unread > 0 ? <em>{c.unread}</em> : null}
            </button>
          ))}
        </aside>

        <div className="sticky-moment__piece sticky-moment__card sticky-moment__thread is-tilt-b">
          <header>
            <span className="sticky-moment__avatar">P</span>
            <div>
              <strong>Priya M.</strong>
              <p>
                <WhatsAppMark className="h-3 w-3" />
                WhatsApp · live
              </p>
            </div>
          </header>
          <div className="sticky-moment__msgs">
            <div className="is-in">
              <p>Hi, where is my order? I paid COD yesterday.</p>
            </div>
            <div className="is-out">
              <p>Checking Shopify now. #TE-1042 is packed.</p>
            </div>
            <div className="is-in">
              <p>Great, when will it ship?</p>
            </div>
            <div className="is-typing" aria-hidden>
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="sticky-moment__composer">
            <span>Reply with tracking…</span>
            <b>Reply</b>
          </div>
        </div>

        <div className="sticky-moment__piece sticky-moment__card sticky-moment__order is-tilt-c">
          <div className="sticky-moment__order-head">
            <ShopifyMark className="h-7 w-7" />
            <div>
              <strong>Order #TE-1042</strong>
              <p>Beside the chat</p>
            </div>
          </div>
          <div className="sticky-moment__product">
            <ProductThumb className="sticky-moment__thumb" />
            <div>
              <p>{SAMPLE_PRODUCT.name}</p>
              <strong>{SAMPLE_PRODUCT.price}</strong>
            </div>
          </div>
          <ul>
            <li className="is-status">
              <span>Status</span>
              <strong>Packed</strong>
            </li>
            <li className="is-pay">
              <span>Payment</span>
              <strong>COD pending</strong>
            </li>
            <li className="is-ltv">
              <span>LTV</span>
              <strong>₹18.2k</strong>
            </li>
          </ul>
          <div className="sticky-moment__order-cta">
            <Package className="h-3.5 w-3.5" strokeWidth={2} />
            Send tracking
          </div>
        </div>
      </div>
    </div>
  );
}

function AudienceMoment() {
  return (
    <div className="sticky-moment__stage sticky-moment__stage--orchid">
      <div className="sticky-moment__bg-mesh" aria-hidden />
      <div className="sticky-moment__ai">
        {/* Card 1: The Audience Rule Engine */}
        <div className="sticky-moment__piece sticky-moment__card is-tilt-a" style={{ padding: '0.95rem' }}>
          <header style={{ paddingBottom: '0.6rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span className="sticky-moment__ai-icon" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', width: '2rem', height: '2rem', borderRadius: '10px' }}>
              <Package className="h-4 w-4" />
            </span>
            <div style={{ flex: 1 }}>
              <strong style={{ display: 'block', fontSize: '0.85rem', color: '#0c1222' }}>VIP Segment</strong>
              <p style={{ margin: 0, fontSize: '0.65rem', color: '#64748b', marginTop: '0.1rem' }}>Top 5% · LTV &gt; ₹15,000</p>
            </div>
            <em style={{ color: '#059669', background: '#ecfdf5', fontSize: '0.6rem', padding: '0.25rem 0.5rem', borderRadius: '99px', fontWeight: 600, fontStyle: 'normal' }}>ACTIVE</em>
          </header>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', padding: '0.45rem 0.65rem', background: '#f8fafc', borderRadius: '8px' }}>
              <span style={{ color: '#64748b' }}>Orders</span>
              <strong style={{ color: '#334155' }}>&gt; 5 completed</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', padding: '0.45rem 0.65rem', background: '#f8fafc', borderRadius: '8px' }}>
              <span style={{ color: '#64748b' }}>RTO Risk</span>
              <strong style={{ color: '#334155' }}>Low</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', padding: '0.45rem 0.65rem', background: '#f5f3ff', borderRadius: '8px' }}>
              <span style={{ color: '#7c3aed' }}>Action</span>
              <strong style={{ color: '#6d28d9' }}>Send early access</strong>
            </div>
          </div>
        </div>

        {/* Card 2: The Broadcast Preview */}
        <div className="sticky-moment__piece sticky-moment__card is-tilt-b" style={{ padding: '0.95rem' }}>
          <div className="sticky-moment__phone-bar" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', paddingBottom: '0.65rem', borderBottom: '1px solid #f1f5f9' }}>
            <WhatsAppMark className="h-4 w-4" />
            <strong style={{ fontSize: '0.8rem', color: '#0c1222' }}>Broadcast Ready</strong>
            <b className="is-ready" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.65rem', color: '#059669' }}>
              <i style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 2px rgba(16,185,129,0.2)' }} />
              2,450 users
            </b>
          </div>
          <div className="sticky-moment__bubble sticky-moment__bubble--orchid" style={{ marginTop: '0.85rem', padding: '0.85rem', borderRadius: '16px 16px 16px 6px' }}>
            <p style={{ margin: 0, fontSize: '0.75rem', lineHeight: 1.5 }}>Hey Priya! Our new Summer Collection drops tomorrow, but our VIPs get early access today. Use code <b>VIP20</b>. 🎉</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertsMoment() {
  return (
    <div className="sticky-moment__stage sticky-moment__stage--stack">
      <div className="sticky-moment__bg-mesh" aria-hidden />
      <div className="sticky-moment__flow" style={{ width: '100%' }}>
        <div className="sticky-moment__piece sticky-moment__card is-tilt-a" style={{ padding: '1rem', width: '100%', maxWidth: '22rem', margin: '0 auto' }}>
          <header style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.65rem' }}>
            <ShopifyMark className="h-5 w-5" />
            <div style={{ flex: 1 }}>
              <strong style={{ display: 'block', fontSize: '0.85rem', color: '#0c1222' }}>Order #1042</strong>
              <p style={{ margin: 0, fontSize: '0.65rem', color: '#64748b', marginTop: '0.1rem' }}>Arriving Today</p>
            </div>
            <em style={{ color: '#4338ca', background: '#e0e7ff', fontSize: '0.6rem', padding: '0.25rem 0.5rem', borderRadius: '99px', fontWeight: 600, fontStyle: 'normal' }}>PREPAID</em>
          </header>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginTop: '0.85rem' }}>
            {[
              { t: 'Order Confirmed', d: 'Sent on WhatsApp', status: 'Sent', color: '#10b981' },
              { t: 'Shipped (Delhivery)', d: 'Tracking link sent', status: 'Sent', color: '#10b981' },
              { t: 'Out for delivery', d: 'Today at 9:00 AM', status: 'Sending...', color: '#d97706' },
            ].map((step, i, arr) => (
              <div key={step.t} style={{ display: 'flex', gap: '0.75rem', position: 'relative', paddingBottom: i === arr.length - 1 ? '0' : '1.15rem' }}>
                {i !== arr.length - 1 && (
                  <div style={{ position: 'absolute', left: '11px', top: '22px', bottom: '0', width: '2px', background: '#f1f5f9' }} />
                )}
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: step.color === '#10b981' ? '#ecfdf5' : '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: step.color }} />
                </div>
                <div style={{ flex: 1, paddingTop: '0.15rem' }}>
                  <strong style={{ display: 'block', fontSize: '0.75rem', color: '#334155' }}>{step.t}</strong>
                  <p style={{ margin: 0, fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.15rem' }}>{step.d}</p>
                </div>
                <em style={{ fontSize: '0.6rem', fontWeight: 600, color: step.color, fontStyle: 'normal', paddingTop: '0.15rem' }}>{step.status}</em>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowBuilderMoment() {
  return (
    <div className="sticky-moment__stage sticky-moment__stage--champagne">
      <div className="sticky-moment__bg-mesh" aria-hidden />
      <div className="sticky-moment__flow">
        <div className="sticky-moment__piece sticky-moment__card sticky-moment__flow-form is-tilt-a">
          <header>
            <Sparkles className="h-4 w-4" strokeWidth={1.75} />
            <strong>AI form</strong>
          </header>
          <div className="sticky-moment__flow-fields">
            <div className="sticky-moment__flow-field">
              <span>Goal</span>
              <p>Gather feedback for recent purchases</p>
            </div>
            <div className="sticky-moment__flow-field">
              <span>Offer</span>
              <p>15% off next order if they reply</p>
            </div>
          </div>
        </div>

        <div className="sticky-moment__piece sticky-moment__card sticky-moment__flow-canvas is-tilt-b">
          <header>
            <WhatsAppMark className="h-4 w-4" />
            <strong>Feedback Flow</strong>
          </header>
          <div className="sticky-moment__flow-nodes">
            <div className="sticky-moment__flow-node">
              <span>Message</span>
              <p>How did you like it?</p>
            </div>
            <div className="sticky-moment__flow-node is-condition">
              <span>Condition</span>
              <p>Wait 24h for reply</p>
            </div>
            <div className="sticky-moment__flow-node is-success">
              <span>Message</span>
              <p>Here is your 15% code!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
function ConnectMoment() {
  const tilts = ['is-tilt-a', 'is-tilt-b', 'is-tilt-c'] as const;
  return (
    <div className="sticky-moment__stage sticky-moment__stage--stack">
      <div className="sticky-moment__bg-mesh" aria-hidden />
      <div className="sticky-moment__stack">
        {homeIntegrations.slice(0, 3).map((tool, i) => (
          <div
            key={tool.name}
            className={`sticky-moment__piece sticky-moment__card sticky-moment__stack-card ${tilts[i]}`}
          >
            <header>
              <strong>{tool.name}</strong>
              <em>{tool.action}</em>
            </header>
            <ul>
              {tool.rows.map((row) => (
                <li key={row.label}>
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
