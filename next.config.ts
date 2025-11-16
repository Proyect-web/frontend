// /frontend/next.config.ts

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
  
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/**`,
      },
      
      
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/public/uploads/**',
      },
    ],
  },
};

export default nextConfig;