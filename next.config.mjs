import nextPWA from 'next-pwa';
import nextI18NextConfig from './next-i18next.config.js';

const isProd = process.env.NODE_ENV === 'production';

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: !isProd,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  i18n: nextI18NextConfig.i18n,
  output: 'standalone',
};

export default withPWA(nextConfig);
