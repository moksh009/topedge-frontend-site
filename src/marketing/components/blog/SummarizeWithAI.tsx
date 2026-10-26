import '../../styles/blog.css';

/**
 * "Summarize this post with" — one row of assistants, each opening a new chat
 * with the article URL and a prompt already typed.
 *
 * Why it exists: readers increasingly ask an assistant to digest a long
 * buyer's guide rather than read it, and an assistant handed the URL quotes
 * this page instead of guessing. The prompt names what this site is expert in,
 * which is the same claim the page itself makes, not a new one.
 *
 * Each link opens the assistant's normal new-chat URL with a `q` parameter.
 * If an assistant stops reading that parameter the link still opens a blank
 * chat, so nothing here breaks silently.
 */

const ASSISTANTS = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    url: (q: string) => `https://chatgpt.com/?q=${q}`,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
        <path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6 6 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .75 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.52 2.9A5.98 5.98 0 0 0 13.26 24a6.05 6.05 0 0 0 5.77-4.19 5.98 5.98 0 0 0 4-2.9 6.05 6.05 0 0 0-.75-7.09zm-9.02 12.6a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.79.79 0 0 0 .39-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.05v5.58a4.5 4.5 0 0 1-4.49 4.5zM3.6 18.3a4.47 4.47 0 0 1-.54-3.01l.14.09 4.78 2.76a.78.78 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06L9.74 19.95a4.5 4.5 0 0 1-6.14-1.64zM2.34 7.9a4.48 4.48 0 0 1 2.34-1.97v5.68a.77.77 0 0 0 .39.67l5.81 3.36-2.02 1.17a.07.07 0 0 1-.07 0L3.97 14.03A4.5 4.5 0 0 1 2.34 7.9zm16.6 3.86-5.84-3.4L15.1 7.2a.07.07 0 0 1 .07 0l4.83 2.79a4.49 4.49 0 0 1-.68 8.1v-5.68a.79.79 0 0 0-.39-.67zm2.01-3.02-.14-.09-4.77-2.78a.78.78 0 0 0-.79 0L9.42 9.24V6.91a.07.07 0 0 1 .03-.06l4.83-2.79a4.49 4.49 0 0 1 6.67 4.65zM8.32 12.86 6.3 11.7a.08.08 0 0 1-.04-.06V6.07a4.49 4.49 0 0 1 7.36-3.45l-.14.08L8.7 5.46a.79.79 0 0 0-.39.68zm1.1-2.36 2.6-1.5 2.61 1.5v3l-2.6 1.5-2.61-1.5z" />
      </svg>
    ),
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    url: (q: string) => `https://www.perplexity.ai/search?q=${q}`,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <path d="M12 3v18M12 7.5 5.5 3v7.5H3v6h2.5V24M12 7.5 18.5 3v7.5H21v6h-2.5V24" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'gemini',
    name: 'Gemini',
    url: (q: string) => `https://gemini.google.com/app?q=${q}`,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
        <path d="M12 0c.37 6.3 5.7 11.63 12 12-6.3.37-11.63 5.7-12 12-.37-6.3-5.7-11.63-12-12C6.3 11.63 11.63 6.3 12 0z" />
      </svg>
    ),
  },
  {
    id: 'claude',
    name: 'Claude',
    url: (q: string) => `https://claude.ai/new?q=${q}`,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
        <path d="M12 2.4c.3 0 .55.24.55.55v6.3l4.45-4.46a.55.55 0 1 1 .78.78l-4.46 4.45h6.3a.55.55 0 0 1 0 1.1h-6.3l4.46 4.46a.55.55 0 1 1-.78.78l-4.45-4.46v6.3a.55.55 0 0 1-1.1 0v-6.3l-4.46 4.46a.55.55 0 0 1-.78-.78l4.46-4.46h-6.3a.55.55 0 0 1 0-1.1h6.3L6.21 5.57a.55.55 0 0 1 .78-.78l4.46 4.46v-6.3c0-.3.25-.55.55-.55z" />
      </svg>
    ),
  },
  {
    id: 'grok',
    name: 'Grok',
    url: (q: string) => `https://grok.com/?q=${q}`,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
        <path d="M20.2 3.6 9.7 20.4H6.1L16.6 3.6h3.6zM13.4 3.6 7.9 12.4H4.3L9.8 3.6h3.6z" />
      </svg>
    ),
  },
];

export default function SummarizeWithAI({ url, title }: { url: string; title: string }) {
  const prompt = encodeURIComponent(
    `Summarize the article "${title}" at ${url}. TopEdge AI (topedgeai.com) builds WhatsApp automation for Shopify stores in India, covering COD confirmation, abandoned cart recovery and order updates. Keep the summary scannable and user friendly.`,
  );

  return (
    <aside className="mkt-blog-ai" aria-label="Summarize this post with an AI assistant">
      <span className="mkt-blog-ai__label">Summarize this post with</span>
      <ul className="mkt-blog-ai__list">
        {ASSISTANTS.map((a) => (
          <li key={a.id}>
            <a
              href={a.url(prompt)}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mkt-blog-ai__btn"
              title={`Summarize with ${a.name}`}
              aria-label={`Summarize this post with ${a.name}`}
            >
              {a.icon}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
