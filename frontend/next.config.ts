import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Run as a Node server behind nginx (was 'export' in the template — incompatible
  // with /api/og and any future SSR/ISR pages).
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  }
};

export default nextConfig;
