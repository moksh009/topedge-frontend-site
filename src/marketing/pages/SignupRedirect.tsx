import { useEffect } from 'react';
import SEO from '../../components/SEO';

const DASH_SIGNUP = 'https://dash.topedgeai.com/signup';

export default function SignupRedirect() {
  useEffect(() => {
    window.location.href = DASH_SIGNUP;
  }, []);

  return (
    <>
      <SEO title="Sign up | TopEdge AI" description="Create your free TopEdge account." />
      <div className="flex min-h-[50vh] items-center justify-center pt-28">
        <p className="text-slate-500">
          Redirecting to signup…{' '}
          <a href={DASH_SIGNUP} className="font-semibold text-[#7C3AED]">
            Click here
          </a>{' '}
          if you are not redirected.
        </p>
      </div>
    </>
  );
}
