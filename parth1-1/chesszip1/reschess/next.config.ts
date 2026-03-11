import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname),
  eslint: {
    // ESLint flat config (eslint.config.mjs) has compatibility issues with
    // Next.js 15's built-in ESLint integration on Vercel. We validate ESLint
    // locally via `npm run lint` — skip during Vercel builds to avoid false failures.
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
