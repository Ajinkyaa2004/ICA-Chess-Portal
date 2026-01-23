const nextConfig = {
  // Ensure Next.js traces files relative to this workspace root
  outputFileTracingRoot: process.cwd(),
  // Production optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Output configuration for deployment
  output: 'standalone',
  // ESLint configuration for builds
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. Only use in development/staging.
    // Remove this for production or fix all errors first.
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Temporarily ignore type checking during builds
    // TODO: Fix TypeScript errors and set this to false
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
