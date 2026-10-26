import { Fragment } from 'react';
import '../../styles/phone-mock.css';

/**
 * A WhatsApp template shown inside a phone.
 *
 * The bare bubble used on the journey pages is right there, beside a step in a
 * sequence. On the template library the message IS the subject, so it gets the
 * full frame: status bar, business header, chat field, the message, and the
 * composer. A merchant deciding whether a template is worth submitting wants
 * to see it the way their customer will.
 *
 * Same honesty rule as the journey previews. The structure is real, taken from
 * the slot definitions in shared/template-catalog.json: header type, button
 * labels, and which fields are filled from the order. The body is an
 * illustrative example, because each merchant writes and submits their own
 * wording to Meta from their own WhatsApp Business account.
 */

export type TemplateMessage = {
  /** Media header, where the slot defines one. */
  header?: string;
  /** Body. `{{value}}` renders as a highlighted order field. */
  body: string;
  buttons?: string[];
};

function renderBody(body: string) {
  return body.split(/(\{\{[^}]+\}\})/g).map((part, i) =>
    /^\{\{[^}]+\}\}$/.test(part) ? (
      <span key={i} className="mkt-ph__var">
        {part.replace(/[{}]/g, '')}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export default function PhoneMock({
  businessName = 'Linen & Co.',
  message,
  compact = false,
}: {
  businessName?: string;
  message: TemplateMessage;
  /** Chat header and message only, no device frame, for dense grids. */
  compact?: boolean;
}) {
  return (
    <div
      className={`mkt-ph${compact ? ' mkt-ph--compact' : ''}`}
      role="img"
      aria-label="Preview of the message as the customer receives it"
    >
      <div className="mkt-ph__frame">
        <div className="mkt-ph__screen">
          {!compact && (
            <div className="mkt-ph__status" aria-hidden>
              <span className="mkt-ph__time">9:41</span>
              <span className="mkt-ph__island" />
              <span className="mkt-ph__icons">
                <svg viewBox="0 0 24 14" width="17" height="10" aria-hidden>
                  <rect x="0" y="4" width="3" height="6" rx="1" fill="currentColor" />
                  <rect x="5" y="2.5" width="3" height="7.5" rx="1" fill="currentColor" />
                  <rect x="10" y="1" width="3" height="9" rx="1" fill="currentColor" />
                  <rect x="15" y="2" width="8" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="16.2" y="3.2" width="5" height="6.6" rx="1" fill="currentColor" />
                </svg>
              </span>
            </div>
          )}

          <div className="mkt-ph__bar">
            <span className="mkt-ph__back" aria-hidden>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </span>
            <span className="mkt-ph__avatar" aria-hidden />
            <span className="mkt-ph__who">
              <span className="mkt-ph__name">{businessName}</span>
              <span className="mkt-ph__sub">Business account</span>
            </span>
          </div>

          <div className="mkt-ph__chat">
            <div className="mkt-ph__bubble">
              {message.header && (
                <figure className="mkt-ph__media" aria-hidden>
                  <img
                    className="mkt-ph__media-art"
                    src="/marketing/journeys/product-linen-shirt.webp"
                    alt=""
                    width={320}
                    height={240}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              )}

              <p className="mkt-ph__body">{renderBody(message.body)}</p>

              <span className="mkt-ph__stamp" aria-hidden>
                9:41
                <svg className="mkt-ph__ticks" viewBox="0 0 18 12" width="14" height="10">
                  <path d="M1 6.5l3 3 3-3" fill="none" stroke="#53bdeb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6.5l3 3 7-8" fill="none" stroke="#53bdeb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>

              {message.buttons?.length ? (
                <div className="mkt-ph__buttons">
                  {message.buttons.map((b) => (
                    <span key={b} className="mkt-ph__button">
                      {b}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {!compact && (
            <div className="mkt-ph__composer" aria-hidden>
              <span className="mkt-ph__input">Message</span>
              <span className="mkt-ph__send">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M3 20.5v-6l8-2.5-8-2.5v-6l19 8.5z" />
                </svg>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
