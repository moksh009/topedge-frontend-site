import { useId } from 'react';

/**
 * Journey connector — always-visible shaft + filled arrowhead (SVG marker).
 * Idle = slate arrow; is-on = purple draw-in; is-flow = dashed purple motion.
 */
export default function FilmJourneyLink({
  on,
  flow,
}: {
  on?: boolean;
  flow?: boolean;
}) {
  const uid = useId().replace(/:/g, '');
  const idleId = `fl-idle-${uid}`;
  const liveId = `fl-live-${uid}`;

  return (
    <svg
      className={`film-link${on ? ' is-on' : ''}${flow ? ' is-flow' : ''}`}
      viewBox="0 0 72 40"
      aria-hidden
    >
      <defs>
        <marker
          id={idleId}
          markerWidth="8"
          markerHeight="8"
          refX="6.2"
          refY="4"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M0 0.8 L7 4 L0 7.2 Z" className="film-link__mark-idle" />
        </marker>
        <marker
          id={liveId}
          markerWidth="8"
          markerHeight="8"
          refX="6.2"
          refY="4"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M0 0.8 L7 4 L0 7.2 Z" className="film-link__mark-live" />
        </marker>
      </defs>

      {/* Always-visible base arrow */}
      <path
        className="film-link__shaft"
        d="M6 20 H54"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        markerEnd={`url(#${idleId})`}
      />

      {/* Accent draw / flow overlay */}
      <path
        className="film-link__path"
        d="M6 20 H54"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        markerEnd={`url(#${liveId})`}
      />

      <circle className="film-link__port" cx="6" cy="20" r="3.4" />
    </svg>
  );
}
