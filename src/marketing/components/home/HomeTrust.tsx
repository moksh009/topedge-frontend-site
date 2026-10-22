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
    name: 'ajeeb',
    src: '/trust/ajeeb-black.png',
    href: '#',
  },
  {
    name: 'Ecom',
    src: '/trust/ecom-black.png',
    href: '#',
  },
  {
    name: 'Oleez Online',
    src: '/trust/oleez-black.png',
    href: '#',
  },
];

/** Trusted-logo marquee, black marks only, no wordmark duplicates */
export default function HomeTrust({ onStage = false }: { onStage?: boolean }) {
  // Two copies are enough for seamless marquee CSS; four bloated the DOM.
  //
  // Only the first copy is described. The second exists so the CSS loop has
  // something to scroll into, and when it was described too, the crawlable text
  // of the home page read every customer name twice in a row.
  const track = [...logos, ...logos];

  return (
    <div
      className={`home-trust-logos${onStage ? ' home-trust-logos--on-stage' : ''}`}
      aria-label="Trusted by merchants"
    >
      <p className="home-trust-logos__label">Trusted by</p>
      <div className="home-trust-logos__viewport">
        <div className="home-trust-logos__track">
          {track.map((logo, i) => {
            const clone = i >= logos.length;
            return (
              <a
                key={`${logo.name}-${i}`}
                className="home-trust-logos__item"
                href={logo.href === '#' ? undefined : logo.href}
                target={logo.href === '#' ? undefined : '_blank'}
                rel={logo.href === '#' ? undefined : 'noopener noreferrer'}
                {...(clone ? { 'aria-hidden': true, tabIndex: -1 } : {})}
              >
                <img
                  src={logo.src}
                  alt={clone ? '' : logo.name}
                  aria-hidden={clone || undefined}
                  width={120}
                  height={32}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
