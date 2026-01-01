import { useEffect } from 'react';
import { useRouter } from 'next/router';

const CommunityIndex = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/community/home');
  }, [router]);

  return null;
};

export default CommunityIndex;
