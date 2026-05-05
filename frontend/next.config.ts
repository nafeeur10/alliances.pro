import type { NextConfig } from "next";

const IMMUTABLE_CACHE = "public, max-age=31536000, immutable";

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
  },
  async headers() {
    return [
      {
        source: "/icons/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE_CACHE }]
      },
      {
        source: "/blog/:path*.svg",
        headers: [{ key: "Cache-Control", value: IMMUTABLE_CACHE }]
      },
      {
        source: "/avatars/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE_CACHE }]
      },
      {
        source: "/features/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE_CACHE }]
      },
      {
        source: "/(logo.png|icon.png|apple-icon.png)",
        headers: [{ key: "Cache-Control", value: IMMUTABLE_CACHE }]
      }
    ];
  }
};

export default nextConfig;
