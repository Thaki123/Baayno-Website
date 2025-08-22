import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from '@/components/SplashScreen';
import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('splashSeen')) {
      setShowSplash(false);
    }
  }, []);

  const handleFinish = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('splashSeen', 'true');
    }
    setShowSplash(false);
  };

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" onFinish={handleFinish} />
      ) : (
        <Component key="page" {...pageProps} />
      )}
    </AnimatePresence>
  );
}

export default appWithTranslation(App);

