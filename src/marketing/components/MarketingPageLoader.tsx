/**
 * Route/Suspense fallback — full-viewport brand loader only (no footer).
 */
export default function MarketingPageLoader() {
  return (
    <div
      className="mkt-page-loader flex w-full items-center justify-center bg-white"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <img
        src="/topedge-loader.gif"
        alt=""
        width={88}
        height={88}
        className="h-[5.5rem] w-[5.5rem] object-contain"
        decoding="async"
      />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
