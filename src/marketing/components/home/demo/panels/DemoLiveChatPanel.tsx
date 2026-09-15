import { useState } from 'react';
import { Search } from 'lucide-react';
import { demoLiveChatThreads } from '../demoFixtures';

const WA_ICON = (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const PRODUCT_IMG = '/marketing/products/vitamin-c-serum.jpg';

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/** Live Chat using real dashboard livechat.css (lc-*) + WhatsApp-only mock inbox. */
export default function DemoLiveChatPanel() {
  const threads = demoLiveChatThreads.filter((t) => t.channel !== 'instagram');
  const [selectedId, setSelectedId] = useState(threads[0]?.id ?? 't1');
  const thread = threads.find((t) => t.id === selectedId) ?? threads[0];

  if (!thread) return null;

  return (
    <div className="demo-page demo-page--flush dashboard-typography">
      <div className="lc-root demo-lc-root">
        <div className="lc-panel lc-list">
          <div className="lc-list-header lc-list-header--inbox">
            <div className="lc-list-header__row demo-lc-inbox-title">
              <strong>Inbox</strong>
              <span className="demo-lc-count">{threads.length}</span>
            </div>
            <div className="demo-lc-search" aria-hidden>
              <Search size={12} strokeWidth={2} />
              <span>Search conversations</span>
            </div>
            <div className="lc-inbox-channel-bar">
              <div className="demo-lc-channels">
                <button type="button" className="is-on">
                  All
                </button>
                <button type="button">WhatsApp</button>
                <button type="button">Unread</button>
              </div>
            </div>
          </div>
          <div className="lc-scroll lc-inbox-scroll demo-lc-scroll">
            {threads.map((t) => {
              const selected = t.id === thread.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`list-row lc-row${selected ? ' lc-row--selected' : ''}`}
                  onClick={() => setSelectedId(t.id)}
                >
                  <div className="lc-row-avatar lc-row-avatar--character shrink-0">
                    <span className="demo-lc-avatar">{initials(t.name)}</span>
                    <div className="lc-row-channel lc-row-channel--wa">{WA_ICON}</div>
                  </div>
                  <div className="lc-row-body min-w-0 flex-1">
                    <div className="lc-row-top">
                      <span className="lc-lead-name lc-row-name-text truncate">{t.name}</span>
                      <span className="lc-row-time tabular-nums shrink-0">{t.time}</span>
                    </div>
                    <p className={`lc-row-snippet m-0${t.unread ? ' lc-row-snippet--unread' : ''}`}>
                      {t.preview}
                    </p>
                    <div className="lc-row-tags-row">
                      <span className="demo-lc-tag">{t.tag}</span>
                    </div>
                  </div>
                  <div className="lc-row-meta shrink-0">
                    {t.unread ? <div className="lc-row-badge">{t.unread}</div> : null}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lc-chat-stack">
          <div className="lc-panel lc-chat lc-chat-bg-whatsapp demo-lc-chat">
            <div className="lc-chat-pattern" aria-hidden />
            <div className="lc-chat-layered">
              <div className="lc-scroll lc-chat-thread demo-lc-thread">
                <div className="lc-chat-thread__pad lc-chat-thread__pad--top" aria-hidden />
                <span className="lc-date-divider">Today</span>
                {thread.messages.map((m, idx) => {
                  const outbound = m.from !== 'customer';
                  const showOrderChip = thread.id === 't2' && idx === 0 && m.from === 'bot';
                  return (
                    <div
                      key={m.id}
                      className={`lc-bubble-col ${outbound ? 'lc-bubble-col--out' : 'lc-bubble-col--in'}`}
                    >
                      <div
                        className={`lc-bubble lc-bubble--wa ${
                          outbound ? 'lc-bubble--out' : 'lc-bubble--in'
                        }`}
                      >
                        {m.from === 'bot' ? <span className="demo-lc-bot-tag">BOT</span> : null}
                        {m.from === 'agent' ? <span className="demo-lc-bot-tag">AGENT</span> : null}
                        {showOrderChip ? (
                          <div className="demo-lc-order-chip">
                            <img src={PRODUCT_IMG} alt="" />
                            <div>
                              <span>Order #4821 · COD</span>
                              <strong>Vitamin C Serum</strong>
                              <em>₹1,799</em>
                            </div>
                          </div>
                        ) : null}
                        {m.text}
                        <span className="lc-bubble-time">
                          {m.time} {outbound ? '✓✓' : ''}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div className="lc-chat-thread__pad lc-chat-thread__pad--bottom" aria-hidden />
              </div>

              <div className="lc-chat-floating-header">
                <div className="demo-lc-float-head">
                  <span className="demo-lc-avatar demo-lc-avatar--lg">{initials(thread.name)}</span>
                  <div className="min-w-0">
                    <strong className="truncate">{thread.name}</strong>
                    <p className="truncate">{thread.phone}</p>
                  </div>
                  <button type="button" className="demo-lc-takeover" disabled>
                    Take over
                  </button>
                </div>
              </div>

              <div className="lc-chat-floating-composer">
                <div className="demo-lc-composer lc-reply" aria-hidden>
                  <span>Message…</span>
                  <em>↵</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
