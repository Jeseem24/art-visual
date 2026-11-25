import type { NextConfig } from "next";

const cspPublic = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.sanity.io https://*.sanity.io https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://images.unsplash.com https://cdn.sanity.io https://*.sanity.io https://*.figma.com https://*.google-analytics.com https://www.googletagmanager.com;
  media-src 'self' blob: data: https://cdn.sanity.io https://*.sanity.io;
  font-src 'self' data:;
  connect-src 'self' https://*.sanity.io https://*.sanity.api https://cdn.sanity.io https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com;
  frame-ancestors 'self';
  form-action 'self';
  base-uri 'self';
  object-src 'none';
`.replace(/\s{2,}/g, " ").trim();

const cspStudio = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.sanity.io https://*.sanity.io https://sanity-cdn.com https://*.sanity-cdn.com https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://*.sanity.io https://*.sanity-cdn.com;
  img-src 'self' blob: data: https://images.unsplash.com https://cdn.sanity.io https://*.sanity.io https://sanity-cdn.com https://*.sanity-cdn.com https://*.figma.com https://*.google-analytics.com https://www.googletagmanager.com;
  media-src 'self' blob: data: https://cdn.sanity.io https://*.sanity.io https://*.sanity-cdn.com;
  font-src 'self' data: https://*.sanity.io https://*.sanity-cdn.com;
  connect-src 'self' https://*.sanity.io wss://*.sanity.io https://*.sanity.api https://cdn.sanity.io https://sanity-cdn.com https://*.sanity-cdn.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com;
  worker-src 'self' blob:;
  frame-src 'self' https://*.sanity.io https://sanity.io https://*.sanity-cdn.com;
  frame-ancestors 'self' https://*.sanity.io https://sanity.io;
  form-action 'self';
  base-uri 'self';
  object-src 'none';
`.replace(/\s{2,}/g, " ").trim();

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
  async headers() {
    return [
      // 1. Studio routes: allow framing, CORS, and status fetch from Sanity.io cloud manage dashboard
      {
        source: "/studio/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://sanity.io",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, HEAD, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "*",
          },
          {
            key: "Content-Security-Policy",
            value: cspStudio,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
      // 2. Public marketing routes: strict clickjacking protection with SAMEORIGIN
      {
        source: "/((?!studio).*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspPublic,
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
