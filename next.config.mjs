import nextPWA from 'next-pwa';

const isProd = process.env.NODE_ENV === 'production';
const basePath = process.env.BASE_PATH || '';

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
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
};

export default withPWA(nextConfig);
