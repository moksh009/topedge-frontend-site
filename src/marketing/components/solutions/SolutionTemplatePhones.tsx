import type { SolutionWaTemplate } from '../../data/solutions';
import '../../styles/solution-phones.css';

const AVATAR_BG: Record<SolutionWaTemplate['avatarTone'], string> = {
  violet: '#7c3aed',
  rose: '#e11d48',
  sky: '#0284c7',
  amber: '#d97706',
  emerald: '#059669',
};

function WhatsAppPhone({ template, priority }: { template: SolutionWaTemplate; priority?: boolean }) {
  return (
    <article className="sol-phones__device" aria-label={`${template.broadcastTitle} WhatsApp template`}>
      <div className="sol-phones__bezel">
        <div className="sol-phones__notch" aria-hidden />
        <div className="sol-phones__screen">
          <header className="sol-phones__wa-bar">
            <span className="sol-phones__wa-back" aria-hidden>
              ‹
            </span>
            <span
              className="sol-phones__wa-avatar"
              style={{ background: AVATAR_BG[template.avatarTone] }}
              aria-hidden
            >
              {template.avatarLetter}
            </span>
            <div className="sol-phones__wa-meta">
              <p className="sol-phones__wa-title">{template.broadcastTitle}</p>
              <p className="sol-phones__wa-sub">{template.recipients}</p>
            </div>
            <span className="sol-phones__wa-menu" aria-hidden>
              ⋮
            </span>
          </header>

          <div
            className="sol-phones__wa-chat"
            style={{ backgroundImage: 'url(/marketing/lc-whatsapp-doodle-wallpaper.jpg)' }}
          >
            <div className="sol-phones__bubble">
              <div className="sol-phones__media">
                <img
                  src={template.image}
                  alt={template.imageAlt}
                  width={640}
                  height={800}
                  loading={priority ? 'eager' : 'lazy'}
                  decoding="async"
                  {...(priority ? { fetchPriority: 'high' as const } : {})}
                />
              </div>
              <div className="sol-phones__copy">
                <p className="sol-phones__headline">{template.headline}</p>
                <p className="sol-phones__subhead">{template.subhead}</p>
                <p className="sol-phones__body">{template.body}</p>
                <p className="sol-phones__link">{template.linkLabel}</p>
              </div>
              <button type="button" className="sol-phones__cta" tabIndex={-1}>
                {template.ctaLabel}
              </button>
              <p className="sol-phones__time">{template.time}</p>
            </div>
            <p className="sol-phones__encrypt">
              <span aria-hidden>🔒</span> End-to-end encrypted
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

type Props = {
  templates: SolutionWaTemplate[];
  label: string;
};

export default function SolutionTemplatePhones({ templates, label }: Props) {
  const phones = templates.slice(0, 3);

  return (
    <div className="sol-phones" role="img" aria-label={label}>
      <div className="sol-phones__brand">
        <img src="/logo.png" alt="" width={28} height={28} className="sol-phones__logo" />
        <span className="sol-phones__brand-name">TopEdge AI</span>
      </div>
      <div className="sol-phones__row">
        {phones.map((t, i) => (
          <WhatsAppPhone key={`${t.broadcastTitle}-${t.ctaLabel}`} template={t} priority={i === 0} />
        ))}
      </div>
    </div>
  );
}
