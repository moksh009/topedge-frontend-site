import { Fragment } from 'react';
import { SOURCES, type SourceId } from '@/data/sources';
import '../../styles/topic-blocks.css';

/**
 * Structured blocks for commercial topic pages.
 *
 * `SeoTopic.sections` could only hold one heading and one paragraph each, so a
 * topic page could not render anything but prose. These blocks are the shapes a
 * commercial page actually needs: a spec table for comparison intent, a step
 * sequence for "how do I connect X", a cited figure for the numbers an answer
 * engine will quote, and a callout for a policy constraint that must not get
 * lost mid-paragraph.
 *
 * Every figure names a source id from src/data/sources.ts, so the publisher and
 * the date a human read the claim render beside the number. Nothing here can
 * display a figure that is not registered there.
 */

export type TopicBlock =
  | { kind: 'prose'; id: string; h2: string; body: string | string[] }
  | {
      kind: 'specTable';
      id: string;
      h2: string;
      intro?: string;
      /** First column is the row label; the rest are value columns. */
      columns: string[];
      rows: { label: string; cells: string[]; note?: string }[];
      /** Index into `columns` (1-based over value columns) to tint as ours. */
      mineColumn?: number;
      footnote?: string;
    }
  | {
      kind: 'steps';
      id: string;
      h2: string;
      intro?: string;
      steps: { title: string; body: string; meta?: string }[];
    }
  | {
      kind: 'figures';
      id: string;
      h2: string;
      intro?: string;
      figures: { value: string; label: string; source: SourceId }[];
    }
  | {
      kind: 'checklist';
      id: string;
      h2: string;
      intro?: string;
      doLabel?: string;
      dontLabel?: string;
      doItems: string[];
      dontItems: string[];
    }
  | {
      kind: 'callout';
      id: string;
      tone?: 'note' | 'warn';
      title: string;
      body: string;
      link?: { label: string; href: string };
    };

/** Blocks that carry a heading worth linking to from a table of contents. */
function tocEntries(blocks: TopicBlock[]) {
  return blocks
    .filter((b): b is Extract<TopicBlock, { h2: string }> => 'h2' in b && !!b.h2)
    .map((b) => ({ id: b.id, label: b.h2 }));
}

export function TopicToc({ blocks }: { blocks: TopicBlock[] }) {
  const entries = tocEntries(blocks);
  if (entries.length < 3) return null;
  return (
    <nav className="mkt-toc" aria-label="On this page">
      <p className="mkt-toc__label">On this page</p>
      <ul className="mkt-toc__list">
        {entries.map((e) => (
          <li key={e.id}>
            <a href={`#${e.id}`}>{e.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Cite({ source }: { source: SourceId }) {
  const s = SOURCES[source];
  return (
    <p className="mkt-figs__cite">
      {s.publisher},{' '}
      <a href={s.url} target="_blank" rel="noopener noreferrer">
        {s.label}
      </a>
      . Read {s.verified}.
    </p>
  );
}

function SpecTable({ block }: { block: Extract<TopicBlock, { kind: 'specTable' }> }) {
  const { columns, rows, mineColumn } = block;
  const template = `minmax(0, 1.1fr) repeat(${columns.length - 1}, minmax(0, 1fr))`;
  return (
    <div className="mkt-spec" role="table" aria-label={block.h2}>
      <div className="mkt-spec__row mkt-spec__row--head" role="row" style={{ gridTemplateColumns: template }}>
        {columns.map((c, i) => (
          <div
            key={c}
            role="columnheader"
            className={`mkt-spec__cell${i === 0 ? ' mkt-spec__cell--label' : ''}${
              mineColumn === i ? ' mkt-spec__cell--mine' : ''
            }`}
          >
            {c}
          </div>
        ))}
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="mkt-spec__row"
          role="row"
          style={{ gridTemplateColumns: template }}
        >
          <div role="rowheader" className="mkt-spec__cell mkt-spec__cell--label">
            {r.label}
            {r.note && <span className="mkt-spec__note">{r.note}</span>}
          </div>
          {r.cells.map((cell, i) => (
            <div
              key={`${r.label}-${i}`}
              role="cell"
              data-col={columns[i + 1]}
              className={`mkt-spec__cell${mineColumn === i + 1 ? ' mkt-spec__cell--mine' : ''}`}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function TopicBlockView({ block }: { block: TopicBlock }) {
  switch (block.kind) {
    case 'prose': {
      const paras = Array.isArray(block.body) ? block.body : [block.body];
      return (
        <section id={block.id} className="mkt-blk">
          <h2 className="mkt-blk__h2">{block.h2}</h2>
          {paras.map((p, i) => (
            <p key={i} className="mkt-blk__body">
              {p}
            </p>
          ))}
        </section>
      );
    }

    case 'specTable':
      return (
        <section id={block.id} className="mkt-blk">
          <h2 className="mkt-blk__h2">{block.h2}</h2>
          {block.intro && <p className="mkt-blk__intro">{block.intro}</p>}
          <SpecTable block={block} />
          {block.footnote && <p className="mkt-spec__footnote">{block.footnote}</p>}
        </section>
      );

    case 'steps':
      return (
        <section id={block.id} className="mkt-blk">
          <h2 className="mkt-blk__h2">{block.h2}</h2>
          {block.intro && <p className="mkt-blk__intro">{block.intro}</p>}
          <ol className="mkt-steps">
            {block.steps.map((s, i) => (
              <li key={s.title} className="mkt-steps__item">
                <span className="mkt-steps__n" aria-hidden>
                  {i + 1}
                </span>
                <div>
                  <h3 className="mkt-steps__title">{s.title}</h3>
                  <p className="mkt-steps__body">{s.body}</p>
                  {s.meta && <span className="mkt-steps__meta">{s.meta}</span>}
                </div>
              </li>
            ))}
          </ol>
        </section>
      );

    case 'figures':
      return (
        <section id={block.id} className="mkt-blk">
          <h2 className="mkt-blk__h2">{block.h2}</h2>
          {block.intro && <p className="mkt-blk__intro">{block.intro}</p>}
          <ul className="mkt-figs">
            {block.figures.map((f) => (
              <li key={f.label} className="mkt-figs__item">
                <p className="mkt-figs__value">{f.value}</p>
                <p className="mkt-figs__label">{f.label}</p>
                <Cite source={f.source} />
              </li>
            ))}
          </ul>
        </section>
      );

    case 'checklist':
      return (
        <section id={block.id} className="mkt-blk">
          <h2 className="mkt-blk__h2">{block.h2}</h2>
          {block.intro && <p className="mkt-blk__intro">{block.intro}</p>}
          <div className="mkt-check">
            <div className="mkt-check__col mkt-check__col--do">
              <p className="mkt-check__head">{block.doLabel ?? 'Do this'}</p>
              <ul className="mkt-check__list">
                {block.doItems.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="mkt-check__col mkt-check__col--dont">
              <p className="mkt-check__head">{block.dontLabel ?? 'Avoid this'}</p>
              <ul className="mkt-check__list">
                {block.dontItems.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      );

    case 'callout':
      return (
        <aside
          id={block.id}
          className={`mkt-callout${block.tone === 'warn' ? ' mkt-callout--warn' : ''}`}
        >
          <p className="mkt-callout__title">{block.title}</p>
          <p className="mkt-callout__body">
            {block.body}
            {block.link && (
              <Fragment>
                {' '}
                <a href={block.link.href}>{block.link.label}</a>
              </Fragment>
            )}
          </p>
        </aside>
      );

    default:
      return null;
  }
}
