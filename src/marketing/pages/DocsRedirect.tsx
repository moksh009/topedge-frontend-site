import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { DASH_DOCS } from '../routes';

export default function DocsRedirect() {
  useEffect(() => {
    window.location.href = DASH_DOCS;
  }, []);

  return (
    <>
      <Helmet>
        <title>Docs | TopEdge</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <p className="sr-only">Redirecting to documentation…</p>
    </>
  );
}
