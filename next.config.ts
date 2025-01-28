import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'image.tmdb.org',
      },
    ],
  },
  env: {
    TMDB_BASE_URL: process.env.TMDB_BASE_URL || '',
    API_TOKEN: process.env.API_TOKEN || '',
    TMDB_IMAGE_SERVICE_URL: process.env.TMDB_IMAGE_SERVICE_URL || '',
  },
};

export default nextConfig;
