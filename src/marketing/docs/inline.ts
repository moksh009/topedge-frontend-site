/**
 * Inline markup for doc content strings.
 *
 * Deliberately tiny: **bold**, `code`, [label](/path). Anything else is text.
 */

export type InlineToken =
  | { type: 'text'; value: string }
  | { type: 'strong'; value: string }
  | { type: 'code'; value: string }
  | { type: 'link'; value: string; href: string; external: boolean };

const PATTERN = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function isExternalHref(href: string): boolean {
  return /^(?:https?:)?\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
}

export function parseInline(input: string): InlineToken[] {
  const text = String(input ?? '');
  const tokens: InlineToken[] = [];
  let last = 0;
  PATTERN.lastIndex = 0;
  for (let m = PATTERN.exec(text); m; m = PATTERN.exec(text)) {
    if (m.index > last) tokens.push({ type: 'text', value: text.slice(last, m.index) });
    if (m[1] !== undefined) tokens.push({ type: 'strong', value: m[1] });
    else if (m[2] !== undefined) tokens.push({ type: 'code', value: m[2] });
    else if (m[3] !== undefined && m[4] !== undefined) {
      tokens.push({ type: 'link', value: m[3], href: m[4], external: isExternalHref(m[4]) });
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) tokens.push({ type: 'text', value: text.slice(last) });
  return tokens;
}

/** Markup stripped to plain prose, for meta tags and JSON-LD text. */
export function plainText(input: string): string {
  return parseInline(input)
    .map((t) => t.value)
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}
