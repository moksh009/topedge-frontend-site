const NUMERIC_RANGE = /[₹$]?\d[\d,.]*%?\s?–\s?[₹$]?\d[\d,.]*(?:%|\+|[kKxX](?![a-zA-Z]))?/g;

/** Splits plain text into segments, flagging numeric ranges that must not wrap. */
export function splitNumericRanges(text: string): { text: string; range: boolean }[] {
  const parts: { text: string; range: boolean }[] = [];
  let last = 0;
  NUMERIC_RANGE.lastIndex = 0;
  for (let m = NUMERIC_RANGE.exec(text); m; m = NUMERIC_RANGE.exec(text)) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index), range: false });
    parts.push({ text: m[0], range: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), range: false });
  return parts;
}

function wrapNumericRanges(root: HTMLElement) {
  const doc = root.ownerDocument;
  const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const targets: Text[] = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node as Text;
    if (!text.data.includes('–')) continue;
    if (text.parentElement?.closest('.mkt-nowrap, script, style, code, pre')) continue;
    NUMERIC_RANGE.lastIndex = 0;
    if (NUMERIC_RANGE.test(text.data)) targets.push(text);
  }

  for (const text of targets) {
    const frag = doc.createDocumentFragment();
    let last = 0;
    NUMERIC_RANGE.lastIndex = 0;
    for (let m = NUMERIC_RANGE.exec(text.data); m; m = NUMERIC_RANGE.exec(text.data)) {
      if (m.index > last) frag.append(text.data.slice(last, m.index));
      const span = doc.createElement('span');
      span.className = 'mkt-nowrap';
      span.textContent = m[0];
      frag.append(span);
      last = m.index + m[0].length;
    }
    if (last < text.data.length) frag.append(text.data.slice(last));
    text.replaceWith(frag);
  }
}

function staticVerdicts(root: HTMLElement) {
  const doc = root.ownerDocument;
  root.querySelectorAll('details.mkt-blog-verdict').forEach((details) => {
    const box = doc.createElement('div');
    box.className = details.className;
    box.setAttribute('role', 'note');
    for (const child of [...details.childNodes]) {
      if (child.nodeName === 'SUMMARY') {
        const label = doc.createElement('p');
        label.className = 'mkt-blog-verdict__label';
        label.append(...child.childNodes);
        box.append(label);
      } else {
        box.append(child);
      }
    }
    details.replaceWith(box);
  });
}

/** FAQ answers stay visible in the served HTML (answer engines don't expand accordions). */
function staticFaqs(root: HTMLElement) {
  const doc = root.ownerDocument;
  root.querySelectorAll('.mkt-blog-faq details').forEach((details) => {
    const item = doc.createElement('div');
    item.className = 'mkt-blog-faq__item';
    for (const child of [...details.childNodes]) {
      if (child.nodeName === 'SUMMARY') {
        const q = doc.createElement('h3');
        q.className = 'mkt-blog-faq__q';
        q.append(...child.childNodes);
        item.append(q);
      } else {
        item.append(child);
      }
    }
    details.replaceWith(item);
  });
}

const DENSE_TABLE_MIN_COLS = 4;

function prepareTables(root: HTMLElement) {
  const doc = root.ownerDocument;
  root.querySelectorAll<HTMLElement>('.mkt-blog-table-wrap').forEach((wrap) => {
    const table = wrap.querySelector('table');
    if (!table) return;

    const labels = [...table.querySelectorAll('thead th')].map((th) => th.textContent?.trim() ?? '');
    table.querySelectorAll('tbody tr').forEach((tr) => {
      [...tr.children].forEach((cell, i) => {
        if (labels[i]) cell.setAttribute('data-label', labels[i]);
      });
    });
    if (labels.length >= DENSE_TABLE_MIN_COLS) wrap.classList.add('is-dense');

    if (table.parentElement === wrap) {
      const scroller = doc.createElement('div');
      scroller.className = 'mkt-blog-table-scroll';
      table.replaceWith(scroller);
      scroller.append(table);
    }
  });
}

/** Presentation-only rewrites of stored post HTML; falls back to the raw string without a DOM. */
export function enhanceBlogHtml(html: string): string {
  if (!html || typeof DOMParser === 'undefined') return html;
  const doc = new DOMParser().parseFromString(`<div id="root">${html}</div>`, 'text/html');
  const root = doc.getElementById('root');
  if (!root) return html;

  staticVerdicts(root);
  staticFaqs(root);
  wrapNumericRanges(root);
  prepareTables(root);

  return root.innerHTML;
}

const STACK_QUERY = '(max-width: 639px)';

/**
 * Live layout pass for tables: stacks non-dense tables that overflow on small screens and
 * marks which edges of a scrollable table have hidden content. Returns a cleanup function.
 */
export function bindBlogTables(prose: HTMLElement): () => void {
  const wraps = [...prose.querySelectorAll<HTMLElement>('.mkt-blog-table-wrap')];
  if (!wraps.length) return () => {};
  const mq = window.matchMedia(STACK_QUERY);

  const updateFade = (scroller: HTMLElement) => {
    const max = scroller.scrollWidth - scroller.clientWidth;
    const edges = [];
    if (max > 1 && scroller.scrollLeft > 1) edges.push('left');
    if (max > 1 && scroller.scrollLeft < max - 1) edges.push('right');
    scroller.dataset.fade = edges.join(' ');
  };

  const update = () => {
    for (const wrap of wraps) {
      const scroller = wrap.querySelector<HTMLElement>('.mkt-blog-table-scroll');
      const table = wrap.querySelector('table');
      if (!scroller || !table) continue;
      if (!wrap.classList.contains('is-dense')) {
        wrap.classList.remove('is-stacked');
        if (mq.matches && table.scrollWidth > scroller.clientWidth + 1) wrap.classList.add('is-stacked');
      }
      updateFade(scroller);
    }
  };

  const onScroll = (e: Event) => updateFade(e.currentTarget as HTMLElement);
  const scrollers = wraps
    .map((w) => w.querySelector<HTMLElement>('.mkt-blog-table-scroll'))
    .filter((s): s is HTMLElement => Boolean(s));
  scrollers.forEach((s) => s.addEventListener('scroll', onScroll, { passive: true }));

  let lastWidth = -1;
  const ro = new ResizeObserver((entries) => {
    const width = Math.round(entries[0].contentRect.width);
    if (width === lastWidth) return;
    lastWidth = width;
    update();
  });
  ro.observe(prose);
  update();
  document.fonts?.ready.then(update);

  return () => {
    ro.disconnect();
    scrollers.forEach((s) => s.removeEventListener('scroll', onScroll));
  };
}
