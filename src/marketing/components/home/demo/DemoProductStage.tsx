import DemoDashboardFrame from './DemoDashboardFrame';

/**
 * Homepage hero — real dashboard UI via demo-mode iframe.
 */
export default function DemoProductStage() {
  return (
    <DemoDashboardFrame
      path="/"
      title="TopEdge dashboard preview"
      caption="Interactive preview — sample data"
      lazy={false}
      pinScroll
    />
  );
}
