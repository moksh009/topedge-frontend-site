import { Navigate } from 'react-router-dom';

/** Legacy /roi → pricing ROI section */
export default function RoiPage() {
  return <Navigate to="/pricing#roi-calculator" replace />;
}
