import { useEffect } from 'react';
import { DASH_SIGNUP } from '../routes';

export default function SignupRedirect() {
  useEffect(() => {
    window.location.href = DASH_SIGNUP;
  }, []);

  return null;
}
