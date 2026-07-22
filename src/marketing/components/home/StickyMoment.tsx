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
      {id === 'ai-brain' ? <AiBrainMoment /> : null}
      {id === 'flow-builder' ? <FlowBuilderMoment /> : null}
      {id === 'connect' ? <ConnectMoment /> : null}
    </div>
  );
}

function CartMoment() {
  return (
    <div className="sticky-moment__stage sticky-moment__stage--rose">
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

function AiBrainMoment() {
  return (
    <div className="sticky-moment__stage sticky-moment__stage--orchid">
      <div className="sticky-moment__ai">
        <div className="sticky-moment__piece sticky-moment__card sticky-moment__ai-ask is-tilt-a">
          <span className="sticky-moment__ai-badge">Customer</span>
          <p>Do you have Vitamin C serum in 30ml? COD to Pune?</p>
        </div>

        <div className="sticky-moment__piece sticky-moment__card sticky-moment__ai-brain is-tilt-b">
          <header>
            <span className="sticky-moment__ai-icon">
              <Sparkles className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div>
              <strong>AI Brain</strong>
              <p>Catalog + policy grounded</p>
            </div>
            <em>Routing</em>
          </header>
          <ul>
            <li className="is-intent">
              <span>Intent</span>
              <strong>Product + COD</strong>
            </li>
            <li className="is-match">
              <span>Match</span>
              <strong>{SAMPLE_PRODUCT.name}</strong>
            </li>
            <li className="is-policy">
              <span>Policy</span>
              <strong>COD · Pune ok</strong>
            </li>
          </ul>
        </div>

        <div className="sticky-moment__piece sticky-moment__card sticky-moment__ai-reply is-tilt-c">
          <div className="sticky-moment__phone-bar">
            <WhatsAppMark className="h-4 w-4" />
            <span>Reply draft</span>
            <b className="is-ready">
              <i />
              Ready
            </b>
          </div>
          <div className="sticky-moment__bubble sticky-moment__bubble--orchid">
            Yes, 30ml is in stock. COD to Pune is available. Want me to hold one?
            <div className="sticky-moment__product sticky-moment__product--stock">
              <ProductThumb className="sticky-moment__thumb" />
              <div>
                <p>{SAMPLE_PRODUCT.name}</p>
                <strong>
                  <em>{SAMPLE_PRODUCT.price}</em>
                  <span>In stock</span>
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowBuilderMoment() {
  return (
    <div className="sticky-moment__stage sticky-moment__stage--champagne">
      <div className="sticky-moment__flow">
        <div className="sticky-moment__piece sticky-moment__card sticky-moment__flow-form is-tilt-a">
          <header>
            <span className="sticky-moment__ai-icon sticky-moment__ai-icon--violet">
              <Sparkles className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div>
              <strong>AI form</strong>
              <p>Describe your store</p>
            </div>
          </header>
          <div className="sticky-moment__flow-fields">
            <div className="is-niche">
              <span>Niche</span>
              <strong>Skincare D2C</strong>
            </div>
            <div className="is-goal">
              <span>Goal</span>
              <strong>Recover COD carts</strong>
            </div>
            <div className="is-tone">
              <span>Tone</span>
              <strong>Warm · Hindi-English</strong>
            </div>
          </div>
        </div>

        <span className="sticky-moment__piece sticky-moment__flow-arrow is-tilt-b" aria-hidden>
          →
        </span>

        <div className="sticky-moment__piece sticky-moment__card sticky-moment__flow-canvas is-tilt-c">
          <header>
            <strong>Flow Builder</strong>
            <em>Editable</em>
          </header>
          <ol>
            <li className="is-on is-trigger">
              <span>1</span>
              <div>
                <strong>Trigger</strong>
                <p>Cart abandoned</p>
              </div>
            </li>
            <li className="is-branch">
              <span>2</span>
              <div>
                <strong>Ask COD</strong>
                <p>Yes / No branch</p>
              </div>
            </li>
            <li className="is-send">
              <span>3</span>
              <div>
                <strong>Send WhatsApp</strong>
                <p>Template ready</p>
              </div>
            </li>
          </ol>
          <div className="sticky-moment__flow-pub">Publish flow</div>
        </div>
      </div>
    </div>
  );
}

function ConnectMoment() {
  const tilts = ['is-tilt-a', 'is-tilt-b', 'is-tilt-c'] as const;
  return (
    <div className="sticky-moment__stage sticky-moment__stage--stack">
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
