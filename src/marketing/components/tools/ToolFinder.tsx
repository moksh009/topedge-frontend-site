import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ExternalLink, Link2, RotateCcw } from 'lucide-react';
import { SOURCES } from '@/data/sources';
import {
  COMPARE_ROWS,
  QUESTIONS,
  VENDORS,
  compareCell,
  decodeAnswers,
  encodeAnswers,
  scoreAnswers,
  topedgePlan,
  type Answers,
  type VendorResult,
} from '../../data/toolFinder';
import '../../styles/tools.css';

const ease = [0.22, 1, 0.36, 1] as const;

function optionLabel(qId: string, oId: string) {
  return QUESTIONS.find((q) => q.id === qId)?.options.find((o) => o.id === oId)?.label ?? oId;
}

function MatchBar({ value, blocked }: { value: number; blocked?: boolean }) {
  return (
    <div className="mkt-finder__match">
      <span className="mkt-finder__match-track" aria-hidden>
        <span className="mkt-finder__match-fill" style={{ width: `${value}%` }} />
      </span>
      <span className="mkt-finder__match-num">{blocked ? 'Not a fit' : `${value}% match`}</span>
    </div>
  );
}

function VendorLogo({ id, size = 40 }: { id: keyof typeof VENDORS; size?: number }) {
  const v = VENDORS[id];
  return (
    <span className="mkt-finder__logo" style={{ width: size, height: size }}>
      <img src={v.logo} alt="" aria-hidden width={size} height={size} loading="lazy" />
    </span>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="mkt-finder__intro">
      <p className="mkt-finder__intro-kicker">6 questions · about 2 minutes · no email needed</p>
      <ul className="mkt-finder__intro-logos" aria-label="Platforms compared">
        {(['topedge', 'wati', 'interakt', 'aisensy', 'bitespeed'] as const).map((id) => (
          <li key={id}>
            <VendorLogo id={id} size={36} />
            <span>{VENDORS[id].name}</span>
          </li>
        ))}
      </ul>
      <button type="button" className="mkt-btn-primary mkt-finder__start" onClick={onStart}>
        Find my best match
        <ArrowRight size={17} strokeWidth={2.2} aria-hidden />
      </button>
      <p className="mkt-finder__intro-note">
        Built by TopEdge, scored in the open. If another tool suits your store better, the result
        says so.
      </p>
    </div>
  );
}

function QuestionStep({
  index,
  answers,
  onPick,
  onBack,
  onNext,
}: {
  index: number;
  answers: Answers;
  onPick: (qId: string, oId: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const q = QUESTIONS[index];
  const picked = answers[q.id] ?? [];
  const multi = (q.max ?? 1) > 1;
  const source = q.fact ? SOURCES[q.fact.source] : null;

  return (
    <div className="mkt-finder__step">
      <div className="mkt-finder__progress">
        <button
          type="button"
          className="mkt-finder__back"
          onClick={onBack}
          aria-label="Previous question"
        >
          <ArrowLeft size={16} strokeWidth={2.2} aria-hidden />
          Back
        </button>
        <span className="mkt-finder__count">
          Question {index + 1} of {QUESTIONS.length}
        </span>
      </div>
      <div className="mkt-finder__bar" aria-hidden>
        <span style={{ width: `${((index + 1) / QUESTIONS.length) * 100}%` }} />
      </div>

      <h2 className="mkt-finder__q">{q.title}</h2>
      {q.help && <p className="mkt-finder__help">{q.help}</p>}
      {multi && <p className="mkt-finder__multi">Pick up to {q.max}</p>}

      <div className="mkt-finder__options" role="group" aria-label={q.title}>
        {q.options.map((o) => {
          const on = picked.includes(o.id);
          const full = multi && !on && picked.length >= (q.max ?? 1);
          return (
            <button
              key={o.id}
              type="button"
              className={`mkt-finder__opt${on ? ' is-on' : ''}`}
              aria-pressed={on}
              disabled={full}
              onClick={() => onPick(q.id, o.id)}
            >
              <span className={`mkt-finder__tick${multi ? ' is-square' : ''}`} aria-hidden>
                {on && <Check size={13} strokeWidth={3} />}
              </span>
              <span>{o.label}</span>
            </button>
          );
        })}
      </div>

      {multi && (
        <button
          type="button"
          className="mkt-btn-primary mkt-finder__next"
          disabled={!picked.length}
          onClick={onNext}
        >
          Continue
          <ArrowRight size={16} strokeWidth={2.2} aria-hidden />
        </button>
      )}

      {q.fact && source && (
        <aside className="mkt-finder__fact">
          <p className="mkt-finder__fact-label">Good to know</p>
          <p className="mkt-finder__fact-text">{q.fact.text}</p>
          {q.fact.compare && <p className="mkt-finder__fact-compare">{q.fact.compare}</p>}
          <p className="mkt-finder__fact-src">
            Source:{' '}
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.publisher}
            </a>
          </p>
        </aside>
      )}
    </div>
  );
}

function ResultCard({ r, top, answers }: { r: VendorResult; top?: boolean; answers: Answers }) {
  const v = r.vendor;
  const isTopEdge = v.id === 'topedge';
  const plan = isTopEdge ? topedgePlan(answers) : null;

  return (
    <article className={`mkt-finder__card${top ? ' is-top' : ''}${r.blocked ? ' is-blocked' : ''}`}>
      {top && <span className="mkt-finder__ribbon">Best fit for your store</span>}
      <header className="mkt-finder__card-head">
        <VendorLogo id={v.id} size={top ? 48 : 40} />
        <div className="mkt-finder__card-title">
          <h3>{v.name}</h3>
          <p>{v.price}</p>
        </div>
      </header>
      <MatchBar value={r.match} blocked={r.blocked} />

      <p className="mkt-finder__pick">
        <b>Best if:</b> {v.pickIf}
      </p>

      {r.reasons.length > 0 && (
        <ul className="mkt-finder__list is-good">
          {r.reasons.slice(0, top ? 5 : 2).map((t) => (
            <li key={t}>
              <Check size={15} strokeWidth={2.6} aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      )}

      {r.cautions.length > 0 && (
        <div className="mkt-finder__keep">
          <p>Keep in mind</p>
          <ul className="mkt-finder__list is-warn">
            {r.cautions.slice(0, top ? 3 : 2).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      )}

      {isTopEdge && !r.blocked && (
        <p className="mkt-finder__plan">
          {plan ? (
            <>
              Plan for your answers: <b>{plan.name}</b>, {plan.price}, up to {plan.orders} orders a
              month. 14 days free first.
            </>
          ) : (
            <>Above 1,500 orders a month you would be on a custom plan. Ask us for one.</>
          )}
        </p>
      )}

      <div className="mkt-finder__actions">
        {isTopEdge ? (
          r.blocked ? (
            <Link to="/integrations" className="mkt-finder__link">
              See what TopEdge connects to
            </Link>
          ) : (
            <>
              <Link to="/signup" className="mkt-btn-primary">
                Start free trial
              </Link>
              <Link to="/pricing" className="mkt-finder__link">
                See pricing
              </Link>
            </>
          )
        ) : (
          <>
            <a
              href={v.website}
              target="_blank"
              rel="noopener noreferrer"
              className={top ? 'mkt-btn-primary' : 'mkt-finder__link'}
            >
              Visit {v.name}
              <ExternalLink size={14} strokeWidth={2.2} aria-hidden />
            </a>
            {v.comparePath && (
              <Link to={v.comparePath} className="mkt-finder__link">
                {v.name} vs TopEdge, in detail
              </Link>
            )}
          </>
        )}
      </div>
    </article>
  );
}

function CompareTable({ results }: { results: VendorResult[] }) {
  const open = results.filter((r) => !r.blocked);
  const cols = open.slice(0, 3);
  if (!cols.some((r) => r.vendor.id === 'topedge')) {
    const te = results.find((r) => r.vendor.id === 'topedge');
    if (te && !te.blocked) cols.push(te);
  }
  const template = `minmax(0, 0.8fr) repeat(${cols.length}, minmax(0, 1fr))`;

  return (
    <div className="mkt-finder__table" role="table" aria-label="Your shortlist side by side">
      <div className="mkt-finder__tr is-head" role="row" style={{ gridTemplateColumns: template }}>
        <span role="columnheader" />
        {cols.map((r) => (
          <span key={r.vendor.id} role="columnheader" className="mkt-finder__th">
            <VendorLogo id={r.vendor.id} size={26} />
            {r.vendor.name}
          </span>
        ))}
      </div>
      {COMPARE_ROWS.map((row) => (
        <div key={row.id} className="mkt-finder__tr" role="row" style={{ gridTemplateColumns: template }}>
          <span role="rowheader" className="mkt-finder__rh">
            {row.label}
          </span>
          {cols.map((r) => (
            <span
              key={r.vendor.id}
              role="cell"
              data-vendor={r.vendor.name}
              className={`mkt-finder__td${r.vendor.id === 'topedge' ? ' is-us' : ''}`}
            >
              {compareCell(r.vendor.id, row.id)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function Results({
  answers,
  onEdit,
  onRestart,
}: {
  answers: Answers;
  onEdit: () => void;
  onRestart: () => void;
}) {
  const results = useMemo(() => scoreAnswers(answers), [answers]);
  const [copied, setCopied] = useState(false);
  const [top, ...rest] = results;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mkt-finder__results">
      <div className="mkt-finder__summary">
        <p className="mkt-finder__eyebrow">Your shortlist</p>
        <h2 className="mkt-finder__result-title">
          Best fit for your store: <span>{top.vendor.name}</span>
        </h2>
        <ul className="mkt-finder__chips" aria-label="Your answers">
          {QUESTIONS.flatMap((q) =>
            (answers[q.id] ?? []).map((id) => <li key={`${q.id}-${id}`}>{optionLabel(q.id, id)}</li>),
          )}
        </ul>
        <div className="mkt-finder__tools">
          <button type="button" onClick={onEdit}>
            <ArrowLeft size={15} strokeWidth={2.2} aria-hidden />
            Change answers
          </button>
          <button type="button" onClick={onRestart}>
            <RotateCcw size={15} strokeWidth={2.2} aria-hidden />
            Start over
          </button>
          <button type="button" onClick={copy}>
            <Link2 size={15} strokeWidth={2.2} aria-hidden />
            {copied ? 'Link copied' : 'Copy link to results'}
          </button>
        </div>
      </div>

      <ResultCard r={top} top answers={answers} />

      <h3 className="mkt-finder__sub">Other options, and when they fit better</h3>
      <ul className="mkt-finder__grid">
        {rest.map((r) => (
          <li key={r.vendor.id}>
            <ResultCard r={r} answers={answers} />
          </li>
        ))}
      </ul>

      <h3 className="mkt-finder__sub">Side by side</h3>
      <CompareTable results={results} />
      <p className="mkt-finder__fine">
        Every cell is the one published on our{' '}
        <Link to="/compare/topedge-vs-wati-vs-interakt-vs-aisensy">comparison boards</Link>, from
        each vendor’s own pages, last checked October 2026. Prices change, so confirm on the vendor’s
        site before you buy, including ours.
      </p>
    </div>
  );
}

export default function ToolFinder() {
  const [params, setParams] = useSearchParams();
  const fromUrl = useMemo(() => decodeAnswers(params.get('a')), [params]);
  const [answers, setAnswers] = useState<Answers>(fromUrl ?? {});
  const [step, setStep] = useState<number>(fromUrl ? QUESTIONS.length : -1);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (step === QUESTIONS.length) {
      setParams({ a: encodeAnswers(answers) }, { replace: true });
    }
  }, [step, answers, setParams]);

  const scrollToTop = () => {
    document.getElementById('finder')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  const go = (next: number) => {
    setStep(next);
    scrollToTop();
  };

  const pick = (qId: string, oId: string) => {
    const q = QUESTIONS.find((x) => x.id === qId);
    if (!q) return;
    const max = q.max ?? 1;
    if (max === 1) {
      setAnswers((a) => ({ ...a, [qId]: [oId] }));
      window.setTimeout(() => go(step + 1), reduce ? 0 : 220);
      return;
    }
    setAnswers((a) => {
      const cur = a[qId] ?? [];
      const next = cur.includes(oId) ? cur.filter((x) => x !== oId) : [...cur, oId].slice(0, max);
      return { ...a, [qId]: next };
    });
  };

  const restart = () => {
    setAnswers({});
    setParams({}, { replace: true });
    go(0);
  };

  const done = step === QUESTIONS.length && QUESTIONS.every((q) => answers[q.id]?.length);

  return (
    <div className={`mkt-finder${done ? ' is-done' : ''}`} id="finder">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={done ? 'results' : step}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease }}
        >
          {step < 0 ? (
            <Intro onStart={() => go(0)} />
          ) : done ? (
            <Results answers={answers} onEdit={() => go(0)} onRestart={restart} />
          ) : (
            <QuestionStep
              index={Math.min(step, QUESTIONS.length - 1)}
              answers={answers}
              onPick={pick}
              onBack={() => go(step - 1)}
              onNext={() => go(step + 1)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
