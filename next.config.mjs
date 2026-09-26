/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Allow large media files for static export context
  experimental: {},
};

export default nextConfig;
