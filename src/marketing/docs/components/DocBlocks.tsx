import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Info,
  Lightbulb,
  Wrench,
} from 'lucide-react';
import type { DocBlock, DocCalloutTone } from '../types';
import { FALLBACK_CATALOG } from '../../lib/billingCatalog';
import DocInline from './DocInline';
import DocDiagram from './DocDiagram';

const CALLOUT_ICON: Record<DocCalloutTone, typeof Info> = {
  info: Info,
  tip: Lightbulb,
  warning: AlertTriangle,
  success: CheckCircle2,
};

function AnchoredHeading({
  level,
  id,
  text,
}: {
  level: 2 | 3;
  id: string;
  text: string;
}) {
  const Tag = level === 2 ? 'h2' : 'h3';
  return (
    <Tag id={id} className={level === 2 ? 'docs-h2' : 'docs-h3'}>
      <DocInline text={text} />
      {/* Stable anchor targets: answer engines cite these deep links directly. */}
      <a href={`#${id}`} className="docs-anchor" aria-label={`Link to this section`}>
        #
      </a>
    </Tag>
  );
}

/**
 * Plan caps straight from the billing catalog — `check:pricing` pins that file to
 * the live API, so these numbers cannot drift. Prices deliberately stay on
 * `/pricing`: a figure duplicated here would sit outside that guard.
 */
function PlanLimitsTable() {
  const plans = FALLBACK_CATALOG.plans.filter((p) =>
    ['launch', 'growth', 'scale'].includes(p.slug),
  );
  const fmt = (n: number) => Number(n).toLocaleString('en-IN');
  return (
    <div className="docs-table-wrap">
      <table className="docs-table">
        <thead>
          <tr>
            <th scope="col">Plan</th>
            <th scope="col">Orders / cycle</th>
            <th scope="col">Campaign + email sends / cycle</th>
            <th scope="col">Journey Branch</th>
            <th scope="col">COD → prepaid</th>
            <th scope="col">Send priority</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Trial ({FALLBACK_CATALOG.trialDays} days)</th>
            <td>20</td>
            <td>200</td>
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
              <td>{plan.features.dispatchPriority}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="docs-table-note">
        Caps reset each billing cycle. Current prices live on{' '}
        <Link to="/pricing" className="docs-link">
          the pricing page
        </Link>
        .
      </p>
    </div>
  );
}

export function DocBlockView({ block }: { block: DocBlock }) {
  switch (block.kind) {
    case 'answer':
      return (
        <div className="docs-answer">
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
      return block.ordered ? (
        <ol className="docs-ol">{items}</ol>
      ) : (
        <ul className="docs-ul">{items}</ul>
      );
    }

    case 'prereqs':
      return (
        <section className="docs-prereqs" aria-label="Before you start">
          <p className="docs-prereqs__title">Before you start</p>
          <ul>
            {block.items.map((item, i) => (
              <li key={i}>
                <Circle size={6} className="docs-prereqs__dot" aria-hidden />
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
        <ol className="docs-steps">
          {block.steps.map((step, i) => (
            <li key={i} className="docs-steps__item">
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
      );

    case 'table':
      return (
        <div className="docs-table-wrap">
          <table className="docs-table">
            {block.caption ? <caption className="docs-table-caption">{block.caption}</caption> : null}
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
      const Icon = CALLOUT_ICON[block.tone] || Info;
      return (
        <aside className={`docs-callout docs-callout--${block.tone}`}>
          <Icon size={16} className="docs-callout__icon" aria-hidden />
          <div>
            {block.title ? <p className="docs-callout__title">{block.title}</p> : null}
            <p className="docs-callout__body">
              <DocInline text={block.body} />
            </p>
          </div>
        </aside>
      );
    }

    case 'verify':
      return (
        <section className="docs-verify" aria-label="Check it worked">
          <p className="docs-verify__title">Check it worked</p>
          <ul>
            {block.items.map((item, i) => (
              <li key={i}>
                <CheckCircle2 size={14} className="docs-verify__tick" aria-hidden />
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
                <Wrench size={13} className="docs-fix__icon" aria-hidden />
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

    case 'related':
      return (
        <nav className="docs-related" aria-label="Related pages">
          {block.links.map((link, i) => {
            const body = (
              <>
                <span className="docs-related__label">
                  {link.label}
                  <ArrowUpRight size={13} aria-hidden />
                </span>
                {link.note ? <span className="docs-related__note">{link.note}</span> : null}
              </>
            );
            return /^https?:/i.test(link.href) ? (
              <a
                key={i}
                className="docs-related__card"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {body}
              </a>
            ) : (
              <Link key={i} className="docs-related__card" to={link.href}>
                {body}
              </Link>
            );
          })}
        </nav>
      );

    case 'planLimits':
      return <PlanLimitsTable />;

    default:
      return null;
  }
}

export default function DocBlocks({ blocks }: { blocks: DocBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <DocBlockView key={i} block={block} />
      ))}
    </>
  );
}
