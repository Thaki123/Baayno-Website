import nextPWA from 'next-pwa';

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
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  basePath: isProd ? '/Baayno-Website' : undefined,
  assetPrefix: isProd ? '/Baayno-Website/' : undefined,
};

export default withPWA(nextConfig);
