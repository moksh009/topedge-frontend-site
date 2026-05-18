import { useEffect } from 'react';
import SEO from '../../components/SEO';

const DASH_LOGIN = 'https://dash.topedgeai.com';

export default function LoginRedirect() {
  useEffect(() => {
    window.location.href = DASH_LOGIN;
  }, []);

  return (
    <>
      <SEO title="Log in | TopEdge AI" description="Log in to your TopEdge dashboard." />
      <div className="flex min-h-[50vh] items-center justify-center pt-28">
        <p className="text-slate-500">
          Redirecting to login…{' '}
          <a href={DASH_LOGIN} className="font-semibold text-[#7C3AED]">
            Click here
          </a>{' '}
          if you are not redirected.
        </p>
      </div>
    </>
  );
}
