import { Navigate } from 'react-router-dom';
import { DASH_SIGNUP } from '../routes';

export default function BookingRedirect() {
  window.location.href = DASH_SIGNUP;
  return <Navigate to="/" replace />;
}
