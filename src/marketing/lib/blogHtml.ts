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

/**
 * Slug for a heading, used for both the `id` written onto the heading and the
 * `href` in the table of contents. One function so the two can never drift.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[₹$%]/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/**
 * Give every H2 and H3 in a post an id so the table of contents can link to it.
 *
 * 164 of the 181 H2s across the posts had no id, so there was nothing to link
 * to and no table of contents was possible. Hand-written ids are kept as they
 * are, because existing posts already link to some of them internally.
 */
function addHeadingIds(root: HTMLElement) {
  const used = new Set<string>();
  root.querySelectorAll('[id]').forEach((el) => used.add(el.id));
  root.querySelectorAll<HTMLElement>('h2, h3').forEach((h) => {
    if (h.id) return;
    const base = slugifyHeading(h.textContent ?? '');
    if (!base) return;
    let id = base;
    for (let i = 2; used.has(id); i += 1) id = `${base}-${i}`;
    used.add(id);
    h.id = id;
  });
}

export type TocItem = { id: string; label: string; level: 2 | 3 };

/**
 * Reads the contents list off already-enhanced HTML, so the ids are the ones
 * actually on the page. H3s are carried for nesting but the rendered list only
 * shows H2s unless a post is unusually shallow.
 */
export function extractToc(enhancedHtml: string): TocItem[] {
  if (!enhancedHtml) return [];
  const out: TocItem[] = [];
  const re = /<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi;
  for (let m = re.exec(enhancedHtml); m; m = re.exec(enhancedHtml)) {
    const idMatch = /id="([^"]+)"/i.exec(m[2]);
    if (!idMatch) continue;
    const label = m[3]
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&rsquo;/g, '’')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!label) continue;
    // The template's own FAQ heading is added outside the prose.
    if (idMatch[1] === 'blog-faq-heading') continue;
    out.push({ id: idMatch[1], label, level: Number(m[1]) === 3 ? 3 : 2 });
  }
  return out;
}

export type InlineImage = {
  afterHeading: string;
  src: string;
  webp?: string;
  alt: string;
  caption?: string;
};

/**
 * Drops each configured image in after the section heading it belongs to.
 *
 * Done here rather than injected after mount so the figure is in the
 * prerendered HTML: a crawler sees it, the alt text counts, and the reserved
 * width and height mean it cannot shift the paragraph under it while loading.
 *
 * The image goes after the heading's first following paragraph where there is
 * one, not immediately under the heading, so a section still opens with a
 * sentence rather than a picture.
 */
function insertInlineImages(root: HTMLElement, images: InlineImage[]) {
  const doc = root.ownerDocument;
  const headings = [...root.querySelectorAll<HTMLElement>('h2, h3')];

  for (const img of images) {
    const want = slugifyHeading(img.afterHeading);
    const target = headings.find(
      (h) => h.id === img.afterHeading || h.id === want || slugifyHeading(h.textContent ?? '') === want,
    );
    if (!target) continue;

    const figure = doc.createElement('figure');
    figure.className = 'mkt-blog-figure';

    const picture = doc.createElement('picture');
    if (img.webp) {
      const source = doc.createElement('source');
      source.setAttribute('type', 'image/webp');
      source.setAttribute('srcset', img.webp);
      picture.append(source);
    }
    const el = doc.createElement('img');
    el.setAttribute('src', img.src);
    el.setAttribute('alt', img.alt);
    el.setAttribute('width', '1200');
    el.setAttribute('height', '675');
    el.setAttribute('loading', 'lazy');
    el.setAttribute('decoding', 'async');
    picture.append(el);
    figure.append(picture);

    if (img.caption) {
      const cap = doc.createElement('figcaption');
      cap.textContent = img.caption;
      figure.append(cap);
    }

    let anchor: Element = target;
    const next = target.nextElementSibling;
    if (next && next.tagName === 'P') anchor = next;
    anchor.after(figure);
  }
}

/*
 * Long paragraphs are broken into short ones at sentence boundaries.
 *
 * Getgabs and Wati keep running text to one or two sentences a paragraph
 * (a median of about 160 characters), so a reader can scan the first words of
 * each block and decide whether to read it. Ours were written as essays, with
 * 300-500 character paragraphs. Doing this at render time rather than editing
 * every post means every post, including ones not yet written, gets the same
 * rhythm without the writer having to remember it.
 *
 * Only plain body paragraphs (direct children of the prose, no class) are
 * touched: callouts, verdicts, FAQ answers, footnotes and list items keep
 * their own shape. Splits happen only in text that sits directly in the
 * paragraph, never inside a link or bold run, so no inline element is cut.
 */
const PARA_SPLIT_MIN = 150;
const PARA_TARGET_MAX = 190;
const PARA_MAX_SENTENCES = 2;
const PARA_FRAGMENT_MAX = 15;
const ABBREVIATION = /(?:\b(?:e\.g|i\.e|vs|etc|approx|Rs|No|Mr|Ms|Dr|St|Inc|Ltd|Co|Pvt|U\.S|a\.m|p\.m)|\b[A-Z])\.$/;

function endsSentence(before: string): boolean {
  return /[.!?]["”’)]*$/.test(before) && !ABBREVIATION.test(before);
}

function startsSentence(after: string): boolean {
  return /^["“‘(]?[A-Z0-9₹]/.test(after);
}

function splitLongParagraphs(root: HTMLElement) {
  const doc = root.ownerDocument;
  for (const p of [...root.children]) {
    if (p.tagName !== 'P' || p.className) continue;
    const full = p.textContent ?? '';
    if (full.trim().length < PARA_SPLIT_MIN) continue;

    // One node list per sentence.
    const sentences: Node[][] = [[]];
    let offset = 0;
    for (const node of [...p.childNodes]) {
      if (node.nodeType !== 3) {
        sentences[sentences.length - 1].push(node);
        offset += node.textContent?.length ?? 0;
        continue;
      }
      const data = (node as Text).data;
      let start = 0;
      for (const m of data.matchAll(/\s+/g)) {
        const at = offset + (m.index ?? 0);
        const after = full.slice(at + m[0].length);
        if (!after || !endsSentence(full.slice(0, at)) || !startsSentence(after)) continue;
        const piece = data.slice(start, m.index);
        if (piece) sentences[sentences.length - 1].push(doc.createTextNode(piece));
        sentences.push([]);
        start = (m.index ?? 0) + m[0].length;
      }
      const rest = data.slice(start);
      if (rest) sentences[sentences.length - 1].push(doc.createTextNode(rest));
      offset += data.length;
    }
    if (sentences.length < 2) continue;

    // Greedy grouping: up to two sentences, closing early once a block runs long.
    // A fragment like "Contact." always stays with the sentence it answers.
    const lengthOf = (nodes: Node[]) => nodes.reduce((n, el) => n + (el.textContent?.length ?? 0), 0);
    const groups: Node[][] = [];
    let current: Node[] = [];
    let count = 0;
    for (const sentence of sentences) {
      const len = lengthOf(sentence);
      const fragment = len < PARA_FRAGMENT_MAX;
      if (count && !fragment && (count >= PARA_MAX_SENTENCES || lengthOf(current) + len > PARA_TARGET_MAX)) {
        groups.push(current);
        current = [];
        count = 0;
      }
      if (current.length) current.push(doc.createTextNode(' '));
      current.push(...sentence);
      count += 1;
    }
    if (current.length) groups.push(current);
    if (groups.length < 2) continue;

    const blocks = groups.map((nodes, i) => {
      const el = doc.createElement('p');
      if (i === 0) for (const attr of [...p.attributes]) el.setAttribute(attr.name, attr.value);
      el.append(...nodes);
      return el;
    });
    p.replaceWith(...blocks);
  }
}

/** Presentation-only rewrites of stored post HTML; falls back to the raw string without a DOM. */
export function enhanceBlogHtml(html: string, inlineImages: InlineImage[] = []): string {
  if (!html || typeof DOMParser === 'undefined') return html;
  const doc = new DOMParser().parseFromString(`<div id="root">${html}</div>`, 'text/html');
  const root = doc.getElementById('root');
  if (!root) return html;

  // The page renders its own contents rail from the headings, so a
  // hand-written contents list inside a post would only duplicate it.
  root.querySelectorAll('.mkt-blog-toc').forEach((el) => el.remove());
  splitLongParagraphs(root);
  staticVerdicts(root);
  staticFaqs(root);
  wrapNumericRanges(root);
  prepareTables(root);
  addHeadingIds(root);
  if (inlineImages.length) insertInlineImages(root, inlineImages);

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
