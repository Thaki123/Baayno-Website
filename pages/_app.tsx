import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SplashScreen from '@/components/SplashScreen';
import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const handleStart = () => setShowSplash(true);
    router.events.on('routeChangeStart', handleStart);
    return () => {
      router.events.off('routeChangeStart', handleStart);
    };
  }, [router.events]);

  const handleFinish = () => {
    setShowSplash(false);
  };

  return (
    <>
      <Component key={router.asPath} {...pageProps} />
      {showSplash && <SplashScreen onFinish={handleFinish} />}
    </>
  );
}

export default appWithTranslation(App);

