import { Fragment } from 'react';

/**
 * A WhatsApp message preview for one step of a journey.
 *
 * The step cards used to show only the canonical template name, which tells a
 * merchant nothing about what their customer actually receives. This renders
 * the shape of the message instead: whether it carries a media header, the
 * body with its variable slots marked, and the buttons underneath.
 *
 * On honesty: the template catalogue stores structure, not approved body copy,
 * because every merchant submits these to Meta from their own WhatsApp
 * Business account and edits the wording themselves. So the body here is an
 * illustrative example and is labelled as one on the card. What is NOT
 * invented is the structure: header type, button labels and variable slots all
 * come from the slot definitions in shared/template-catalog.json.
 */

export type WhatsAppPreviewData = {
  /** Media header, as the catalogue describes it, e.g. a product image. */
  header?: string;
  /** Body copy. `{{1}}` style tokens render as variable chips. */
  body: string;
  /** Button labels, in order. */
  buttons?: string[];
  /** Shown under the bubble, e.g. "Utility template". */
  note?: string;
};

/** Splits body text so {{n}} tokens can render as chips rather than braces. */
function renderBody(body: string) {
  return body.split(/(\{\{[^}]+\}\})/g).map((part, i) =>
    /^\{\{[^}]+\}\}$/.test(part) ? (
      <span key={i} className="mkt-wa__var">
        {part.replace(/[{}]/g, '')}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export default function WhatsAppPreview({ data }: { data: WhatsAppPreviewData }) {
  return (
    <figure className="mkt-wa">
      <figcaption className="mkt-wa__label">Example message</figcaption>
      <div className="mkt-wa__screen">
        <div className="mkt-wa__bubble">
          {data.header && (
            <figure className="mkt-wa__media" aria-hidden>
              <img
                className="mkt-wa__media-art"
                src="/marketing/journeys/product-linen-shirt.webp"
                alt=""
                aria-hidden
                width={320}
                height={240}
                loading="lazy"
                decoding="async"
              />
            </figure>
          )}

          <p className="mkt-wa__body">{renderBody(data.body)}</p>

          <span className="mkt-wa__time" aria-hidden>
            9:41
            <svg className="mkt-wa__ticks" viewBox="0 0 18 12" width="16" height="11">
              <path d="M1 6.5l3 3 3-3" fill="none" stroke="#53bdeb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6.5l3 3 7-8" fill="none" stroke="#53bdeb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          {data.buttons?.length ? (
            <div className="mkt-wa__buttons">
              {data.buttons.map((b) => (
                <span key={b} className="mkt-wa__button">
                  {b}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </figure>
  );
}
