import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import CommunityLayout from '@/components/community/layout/CommunityLayout';

function MyApp({ Component, pageProps }: AppProps<{}>) {
  const router = useRouter();

  if (router.pathname.startsWith('/community')) {
    if (router.pathname === '/community/login' || router.pathname === '/community/signup') {
      return <Component {...pageProps} />;
    }
    return (
      <CommunityLayout>
        <Component {...pageProps} />
      </CommunityLayout>
    );
  }

  return <Component {...pageProps} />;
}

export default MyApp;
