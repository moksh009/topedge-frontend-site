import { Link } from 'react-router-dom';
import { parseInline } from '../inline';

/**
 * Renders the restricted inline markup used in doc content strings. Root-relative
 * hrefs are same-site (docs, pricing, features) and go through Link; anything
 * absolute (the dashboard, Meta, Shopify) opens in a new tab.
 */
export default function DocInline({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((token, i) => {
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
            if (token.external) {
              return (
                <a key={i} href={token.href} className="docs-link" target="_blank" rel="noopener noreferrer">
                  {token.value}
                </a>
              );
            }
            if (token.href.startsWith('#')) {
              return (
                <a key={i} href={token.href} className="docs-link">
                  {token.value}
                </a>
              );
            }
            return (
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
