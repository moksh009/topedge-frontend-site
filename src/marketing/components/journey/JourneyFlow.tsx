import WhatsAppPreview, { type WhatsAppPreviewData } from './WhatsAppPreview';
import '../../styles/journey-flow.css';

/**
 * The diagram for a journey example page.
 *
 * A generated illustration would have been faster and would have said nothing.
 * What a merchant wants off this page is the shape of the automation: what
 * fires it, what goes out, how long the gaps are, which Meta category each
 * send falls into (which is what sets the bill), and where the customer's
 * reply changes the path.
 *
 * Built from CSS grid with pseudo-element connectors rather than an SVG, so it
 * reflows to one column on a phone instead of scaling a fixed viewBox down to
 * unreadable. Every value is passed in from the catalogue in
 * shared/template-catalog.json; nothing here is decorative invention.
 */

export type JourneyStep = {
  title: string;
  detail: string;
  /** e.g. "within 30 min", "+24 h". Rendered as the gap before this step. */
  timing?: string;
  category: 'Utility' | 'Marketing' | 'Service';
  /** Canonical Meta template name, so a reader can match it in the dashboard. */
  templateName?: string;
  /** What the customer actually receives. Illustrative body, real structure. */
  preview?: WhatsAppPreviewData;
  /** Reply paths out of this step. */
  branches?: { label: string; outcome: string }[];
};

const CATEGORY_RATE: Record<JourneyStep['category'], string> = {
  Utility: '₹0.1150',
  Marketing: '₹0.8631',
  Service: '₹0.1150',
};

export default function JourneyFlow({
  trigger,
  triggerNote,
  steps,
}: {
  trigger: string;
  triggerNote?: string;
  steps: JourneyStep[];
}) {
  return (
    <div className="mkt-jf" role="group" aria-label="Journey flow">
      <div className="mkt-jf__trigger">
        <span className="mkt-jf__trigger-tag">Shopify event</span>
        <p className="mkt-jf__trigger-name">{trigger}</p>
        {triggerNote && <p className="mkt-jf__trigger-note">{triggerNote}</p>}
      </div>

      <ol className="mkt-jf__steps">
        {steps.map((s, i) => (
          <li key={s.title} className="mkt-jf__step">
            {s.timing && <span className="mkt-jf__gap">{s.timing}</span>}

            <div className="mkt-jf__card">
              <div className="mkt-jf__card-head">
                <span className="mkt-jf__n" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="mkt-jf__title">{s.title}</h3>
                <span
                  className={`mkt-jf__cat mkt-jf__cat--${s.category.toLowerCase()}`}
                  title={`Meta category: ${s.category}`}
                >
                  {s.category} · {CATEGORY_RATE[s.category]}
                </span>
              </div>

              <p className="mkt-jf__detail">{s.detail}</p>

              {s.templateName && <code className="mkt-jf__tpl">{s.templateName}</code>}

              {s.preview && <WhatsAppPreview data={s.preview} />}

              {s.branches?.length ? (
                <ul className="mkt-jf__branches">
                  {s.branches.map((b) => (
                    <li key={b.label}>
                      <span className="mkt-jf__branch-label">{b.label}</span>
                      <span className="mkt-jf__branch-out">{b.outcome}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <p className="mkt-jf__legend">
        Highlighted values in the previews are pulled from the Shopify order, so every
        message carries that customer&rsquo;s own name, order number and amount.
      </p>

      <p className="mkt-jf__foot">
        Rates are Meta&rsquo;s own India per-delivered-message prices, billed by Meta to your
        account. TopEdge adds no markup on them.
      </p>
    </div>
  );
}
