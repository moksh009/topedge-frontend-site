import { useEffect, useState } from 'react';
import type { TocEntry } from '../toc';

export default function DocsToc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>(entries[0]?.id || '');

  useEffect(() => {
    if (!entries.length) return;
    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!headings.length) return;

    // Top-anchored band: the heading nearest the top of the viewport wins, which
    // tracks reading position better than "whichever section is most visible".
    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: [0, 1] },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 2) return null;

  return (
    <nav className="docs-toc" aria-label="On this page">
      <p className="docs-toc__title">On this page</p>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id} className={entry.level === 3 ? 'is-sub' : undefined}>
            <a
              href={`#${entry.id}`}
              className={entry.id === activeId ? 'is-active' : undefined}
            >
              {entry.text.replace(/\*\*/g, '')}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
