import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.mjs';
import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App, nextI18NextConfig);
