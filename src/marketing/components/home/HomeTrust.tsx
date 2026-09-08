const logos = [
  {
    name: 'Delitech Smart Home',
    src: '/trust/delitech-white.png',
    href: 'https://delitechsmarthome.in/',
  },
  {
    name: 'Apex Light',
    src: '/trust/apex-white.png',
    href: 'https://apexlight.in/',
  },
  {
    name: 'code CLINIC',
    src: '/trust/codeclinic-white.png',
    href: '#',
  },
  {
    name: 'Choice Salon',
    src: '/trust/choicesalon-white.png',
    href: '#',
  },
];

/** Trusted-logo marquee — white marks only, no wordmark duplicates */
export default function HomeTrust({ onStage = false }: { onStage?: boolean }) {
  const track = [...logos, ...logos, ...logos, ...logos];

  return (
    <div
      className={`home-trust-logos${onStage ? ' home-trust-logos--on-stage' : ''}`}
      aria-label="Trusted by merchants"
    >
      <p className="home-trust-logos__label">Trusted by</p>
      <div className="home-trust-logos__viewport">
        <div className="home-trust-logos__track">
          {track.map((logo, i) => (
            <a
              key={`${logo.name}-${i}`}
              className="home-trust-logos__item"
              href={logo.href === '#' ? undefined : logo.href}
              target={logo.href === '#' ? undefined : '_blank'}
              rel={logo.href === '#' ? undefined : 'noopener noreferrer'}
              aria-label={logo.name}
            >
              <img src={logo.src} alt="" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
