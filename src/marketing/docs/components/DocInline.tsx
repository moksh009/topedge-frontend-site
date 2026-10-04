import { Link } from 'react-router-dom';
import { parseInline } from '../inline';

/**
 * Renders the restricted inline markup used across doc content strings.
 * Internal hrefs go through `Link` so docs → feature/blog navigation stays a
 * client transition; everything off-site gets `rel="noopener"`.
 */
export default function DocInline({ text }: { text: string }) {
  const tokens = parseInline(text);
  return (
    <>
      {tokens.map((token, i) => {
        switch (token.type) {
          case 'strong':
            return <strong key={i}>{token.value}</strong>;
          case 'code':
            return (
              <code key={i} className="docs-code">
                {token.value}
              </code>
            );
          case 'link':
            return token.external ? (
              <a
                key={i}
                href={token.href}
                className="docs-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {token.value}
              </a>
            ) : (
              <Link key={i} to={token.href} className="docs-link">
                {token.value}
              </Link>
            );
          default:
            return <span key={i}>{token.value}</span>;
        }
      })}
    </>
  );
}
