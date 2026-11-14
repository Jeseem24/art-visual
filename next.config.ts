import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: [
    "192.168.1.10",
    "192.168.1.10:3000",
    "localhost",
    "localhost:3000",
    "*.trycloudflare.com",
    "ciao-second-feet-delayed.trycloudflare.com",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "**.figma.com",
      },
    ],
  },
};

export default nextConfig;
