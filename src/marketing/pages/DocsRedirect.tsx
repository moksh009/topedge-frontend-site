import { useEffect } from 'react';
import { DASH_DOCS } from '../routes';

export default function DocsRedirect() {
  useEffect(() => {
    window.location.href = DASH_DOCS;
  }, []);

  return null;
}
