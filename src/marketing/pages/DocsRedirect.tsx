import { useEffect } from 'react';
import SEO from '../../components/SEO';
import { DASH_DOCS } from '../constants';

export default function DocsRedirect() {
  useEffect(() => {
    window.location.replace(DASH_DOCS);
  }, []);

  return (
    <>
      <SEO title="Documentation | TopEdge AI" description="TopEdge AI help center and setup guides." />
      <div className="flex min-h-[50vh] flex-col items-center justify-center bg-slate-50 px-4 pt-28">
        <p className="text-slate-500">
          Opening documentation…{' '}
          <a href={DASH_DOCS} className="font-semibold text-[#7C3AED] hover:underline">
            dash.topedgeai.com/docs
          </a>
        </p>
      </div>
    </>
  );
}
