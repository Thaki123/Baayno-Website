import nextPWA from 'next-pwa';
import nextI18NextConfig from './next-i18next.config.mjs';

// Configure base path and asset prefix for GitHub Pages deployments
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
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  i18n: nextI18NextConfig.i18n,
  basePath: isProd ? '/Baayno-Website' : undefined,
  assetPrefix: isProd ? '/Baayno-Website/' : undefined,
};

export default withPWA(nextConfig);
