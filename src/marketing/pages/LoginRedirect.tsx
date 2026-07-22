import { useEffect } from 'react';
import { DASH_LOGIN } from '../routes';

export default function LoginRedirect() {
  useEffect(() => {
    window.location.href = DASH_LOGIN;
  }, []);

  return null;
}
