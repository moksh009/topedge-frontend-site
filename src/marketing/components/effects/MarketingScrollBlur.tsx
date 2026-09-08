import GradualBlur from './GradualBlur';

/**
 * Progressive viewport-edge blur (React Bits GradualBlur).
 * Soft layered fade — not a solid frosted band.
 * Tuned to: https://reactbits.dev/animations/gradual-blur?strength=1&divCount=4
 */
export default function MarketingScrollBlur() {
  return (
    <>
      {/* Soft fade under the floating nav */}
      <GradualBlur
        target="page"
        position="top"
        height="4.5rem"
        strength={1}
        divCount={4}
        curve="bezier"
        exponential={false}
        opacity={0.85}
        style={{ zIndex: 40 }}
        className="mkt-scroll-blur mkt-scroll-blur--top"
      />
      {/* Progressive bottom fade — matches React Bits demo feel */}
      <GradualBlur
        target="page"
        position="bottom"
        height="6rem"
        strength={1}
        divCount={4}
        curve="bezier"
        exponential={false}
        opacity={1}
        style={{ zIndex: 40 }}
        className="mkt-scroll-blur mkt-scroll-blur--bottom"
      />
    </>
  );
}
