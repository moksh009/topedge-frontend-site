import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, CheckCircle2, Info, Lightbulb, Wrench } from 'lucide-react';
import type { DocBlock, DocCalloutTone } from '../types';
import { FALLBACK_CATALOG, TRIAL } from '../../lib/billingCatalog';
import { isExternalHref } from '../inline';
import DocInline from './DocInline';
import DocDiagram from './DocDiagram';
import DocImage from './DocImage';

const CALLOUT_ICON: Record<DocCalloutTone, typeof Info> = {
  info: Info,
  tip: Lightbulb,
  warning: AlertTriangle,
  success: CheckCircle2,
};

const CALLOUT_LABEL: Record<DocCalloutTone, string> = {
  info: 'Note',
  tip: 'Tip',
  warning: 'Important',
  success: 'Done',
};

function AnchoredHeading({ level, id, text }: { level: 2 | 3; id: string; text: string }) {
  const Tag = level === 2 ? 'h2' : 'h3';
  return (
    <Tag id={id} className={level === 2 ? 'docs-h2' : 'docs-h3'}>
      <DocInline text={text} />
      {/* Stable anchors: answer engines and support replies cite these deep links. */}
      <a href={`#${id}`} className="docs-anchor" aria-label="Link to this section">
        #
      </a>
    </Tag>
  );
}

const fmt = (n: number) => Number(n).toLocaleString('en-IN');
const priorityLabel = (p: string) => (p ? p.charAt(0).toUpperCase() + p.slice(1) : 'Standard');

/**
 * Plan caps from the billing catalog, which check:pricing pins to the live API.
 * Prices stay on /pricing so no figure here sits outside that guard.
 */
function PlanLimitsTable() {
  const plans = FALLBACK_CATALOG.plans.filter((p) => ['launch', 'growth', 'scale'].includes(p.slug));
  return (
    <div className="docs-table-block">
      <div className="docs-table-wrap" tabIndex={0} role="region" aria-label="Plan limits">
        <table className="docs-table">
          <thead>
            <tr>
              <th scope="col">Plan</th>
              <th scope="col">Orders / cycle</th>
              <th scope="col">Campaign + email sends / cycle</th>
              <th scope="col">Journey Branch</th>
              <th scope="col">COD to prepaid</th>
              <th scope="col">Send priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Trial ({TRIAL.days} days)</th>
              <td>{fmt(TRIAL.orders)}</td>
              <td>{fmt(TRIAL.sends)}</td>
              <td>No</td>
              <td>No</td>
              <td>Standard</td>
            </tr>
            {plans.map((plan) => (
              <tr key={plan.slug}>
                <th scope="row">{plan.displayName}</th>
                <td>{fmt(plan.ordersPerCycle)}</td>
                <td>{fmt(plan.campaignEmailSendsPerCycle)}</td>
                <td>{plan.features.journeyBranch ? 'Yes' : 'No'}</td>
                <td>{plan.features.journeyCodPrepaid ? 'Yes' : 'No'}</td>
                <td>{priorityLabel(plan.features.dispatchPriority)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="docs-table-note">
        Caps reset each billing cycle. Current prices are on the{' '}
        <Link to="/pricing" className="docs-link">
          pricing page
        </Link>
        .
      </p>
    </div>
  );
}

export function DocBlockView({ block, stepIds = false }: { block: DocBlock; stepIds?: boolean }) {
  switch (block.kind) {
    case 'answer':
      return (
        <div className="docs-answer">
          <p className="docs-answer__label">Short answer</p>
          <p className="docs-answer__body">
            <DocInline text={block.text} />
          </p>
        </div>
      );

    case 'h2':
      return <AnchoredHeading level={2} id={block.id} text={block.text} />;

    case 'h3':
      return <AnchoredHeading level={3} id={block.id} text={block.text} />;

    case 'p':
      return (
        <p className="docs-p">
          <DocInline text={block.text} />
        </p>
      );

    case 'list': {
      const items = block.items.map((item, i) => (
        <li key={i}>
          <DocInline text={item} />
        </li>
      ));
      return block.ordered ? <ol className="docs-ol">{items}</ol> : <ul className="docs-ul">{items}</ul>;
    }

    case 'prereqs':
      return (
        <section className="docs-panel docs-panel--prereqs" aria-label="Before you start">
          <p className="docs-panel__title">Before you start</p>
          <ul className="docs-checks">
            {block.items.map((item, i) => (
              <li key={i}>
                <span className="docs-checks__dot" aria-hidden />
                <span>
                  <DocInline text={item} />
                </span>
              </li>
            ))}
          </ul>
        </section>
      );

    case 'steps':
      return (
        <div className="docs-steps-block">
          {block.totalTimeMinutes ? (
            <p className="docs-steps-block__time">About {block.totalTimeMinutes} minutes</p>
          ) : null}
          <ol className="docs-steps">
            {block.steps.map((step, i) => (
              <li key={i} className="docs-steps__item" id={stepIds ? `step-${i + 1}` : undefined}>
                <span className="docs-steps__num" aria-hidden>
                  {i + 1}
                </span>
                <div className="docs-steps__body">
                  <p className="docs-steps__title">
                    <DocInline text={step.title} />
                  </p>
                  <p className="docs-steps__desc">
                    <DocInline text={step.body} />
                  </p>
                  {step.note ? (
                    <p className="docs-steps__note">
                      <DocInline text={step.note} />
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      );

    case 'table':
      return (
        <div className="docs-table-block">
          <div
            className="docs-table-wrap"
            tabIndex={0}
            role="region"
            aria-label={block.caption ? block.caption.replace(/\*\*|`/g, '') : 'Table'}
          >
            <table className="docs-table">
              {block.caption ? (
                <caption className="docs-table-caption">
                  <DocInline text={block.caption} />
                </caption>
              ) : null}
              <thead>
                <tr>
                  {block.columns.map((col, i) => (
                    <th key={i} scope="col">
                      <DocInline text={col} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) =>
                      ci === 0 ? (
                        <th key={ci} scope="row">
                          <DocInline text={cell} />
                        </th>
                      ) : (
                        <td key={ci}>
                          <DocInline text={cell} />
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'definitions':
      return (
        <dl className="docs-dl">
          {block.items.map((item, i) => (
            <div key={i} className="docs-dl__row">
              <dt>
                <DocInline text={item.term} />
              </dt>
              <dd>
                <DocInline text={item.definition} />
              </dd>
            </div>
          ))}
        </dl>
      );

    case 'callout': {
      const tone = CALLOUT_ICON[block.tone] ? block.tone : 'info';
      const Icon = CALLOUT_ICON[tone];
      return (
        <aside className={`docs-callout docs-callout--${tone}`}>
          <Icon size={18} className="docs-callout__icon" aria-hidden />
          <div className="docs-callout__content">
            <p className="docs-callout__title">{block.title || CALLOUT_LABEL[tone]}</p>
            <p className="docs-callout__body">
              <DocInline text={block.body} />
            </p>
          </div>
        </aside>
      );
    }

    case 'verify':
      return (
        <section className="docs-panel docs-panel--verify" aria-label="Check it worked">
          <p className="docs-panel__title">
            <CheckCircle2 size={16} aria-hidden />
            Check it worked
          </p>
          <ul className="docs-checks">
            {block.items.map((item, i) => (
              <li key={i}>
                <CheckCircle2 size={16} className="docs-checks__tick" aria-hidden />
                <span>
                  <DocInline text={item} />
                </span>
              </li>
            ))}
          </ul>
        </section>
      );

    case 'troubleshoot':
      return (
        <div className="docs-fixes">
          {block.cases.map((c, i) => (
            <section key={i} className="docs-fix">
              <p className="docs-fix__symptom">
                <Wrench size={15} className="docs-fix__icon" aria-hidden />
                <span>
                  <DocInline text={c.symptom} />
                </span>
              </p>
              <ol className="docs-fix__list">
                {c.fixes.map((fix, fi) => (
                  <li key={fi}>
                    <DocInline text={fix} />
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      );

    case 'code':
      return (
        <figure className="docs-codeblock">
          {block.language ? <span className="docs-codeblock__lang">{block.language}</span> : null}
          <pre>
            <code className={`language-${block.language}`}>{block.code}</code>
          </pre>
          {block.caption ? (
            <figcaption className="docs-codeblock__caption">
              <DocInline text={block.caption} />
            </figcaption>
          ) : null}
        </figure>
      );

    case 'diagram':
      return <DocDiagram name={block.name} title={block.title} caption={block.caption} />;

    case 'image':
      return <DocImage shot={block.shot} alt={block.alt} caption={block.caption} />;

    case 'related':
      return (
        <nav className="docs-related" aria-label="Related pages">
          <p className="docs-related__title">Related</p>
          <div className="docs-related__grid">
            {block.links.map((link, i) => {
              const body = (
                <>
                  <span className="docs-related__label">
                    {link.label}
                    <ArrowRight size={14} aria-hidden />
                  </span>
                  {link.note ? <span className="docs-related__note">{link.note}</span> : null}
                </>
              );
              return isExternalHref(link.href) ? (
                <a key={i} className="docs-related__card" href={link.href} target="_blank" rel="noopener noreferrer">
                  {body}
                </a>
              ) : (
                <Link key={i} className="docs-related__card" to={link.href}>
                  {body}
                </Link>
              );
            })}
          </div>
        </nav>
      );

    case 'planLimits':
      return <PlanLimitsTable />;

    default:
      return null;
  }
}

export default function DocBlocks({ blocks, howToIndex = -1 }: { blocks: DocBlock[]; howToIndex?: number }) {
  return (
    <>
      {blocks.map((block, i) => (
        <DocBlockView key={i} block={block} stepIds={i === howToIndex} />
      ))}
    </>
  );
}
