import { Link } from 'react-router-dom';
import MarketingPage from '../components/MarketingPage';

export default function NotFoundPage() {
  return (
    <MarketingPage className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="text-center">
        <p className="mkt-eyebrow">404</p>
        <h1 className="mkt-display mt-4 text-4xl font-medium text-[#0c1222]">Page not found</h1>
        <p className="mt-4 text-slate-500">Let’s get you back to the main TopEdge story.</p>
        <Link to="/" className="mkt-btn-primary mt-8">
          Go home
        </Link>
      </div>
    </MarketingPage>
  );
}
