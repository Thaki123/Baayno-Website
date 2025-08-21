import nextPWA from 'next-pwa';
import nextTranslate from 'next-translate-plugin';

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
  basePath: isProd ? '/Baayno-Website' : undefined,
  assetPrefix: isProd ? '/Baayno-Website/' : undefined,
  i18n: {
    locales: ['en', 'ar', 'fr'],
    defaultLocale: 'en',
  },
};

export default nextTranslate(withPWA(nextConfig));
