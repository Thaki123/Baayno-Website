// Configure base path and asset prefix for GitHub Pages deployments
const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isProd ? '/Baayno-Website' : undefined,
  assetPrefix: isProd ? '/Baayno-Website/' : undefined,
};

export default nextConfig;
