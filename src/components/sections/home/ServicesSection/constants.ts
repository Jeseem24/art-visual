/**
 * Services section data definitions
 */

export const SERVICES_HEADER_DEFAULTS = {
  badge: {
    text: "Our Creative Services",
  },
  title: {
    line1: "Creative Solutions That",
    line2: "Make an Impact",
    fullText: "Creative Solutions That Make an Impact",
  },
} as const;

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
  href: string;
  ctaLabel?: string;
}

export const SERVICES_ITEMS: ServiceItem[] = [
  {
    id: "brand-video-production",
    title: "Brand Video Production",
    description: "A film that explains who you are and why people should care.",
    videoSrc: "/videos/services/brand-video.mp4",
    posterSrc: "/videos/services/brand-video-poster.webp",
    href: "/services/brand-video-production",
    ctaLabel: "View service",
  },
  {
    id: "corporate-video-production",
    title: "Corporate Video Production",
    description: "Clear, well-lit films for product pages, sales decks",
    videoSrc: "/videos/services/corporate-video.mp4",
    posterSrc: "/videos/services/corporate-video-poster.webp",
    href: "/services/corporate-video-production",
    ctaLabel: "View service",
  },
  {
    id: "product-videography",
    title: "Product Videography",
    description: "Clear, well-lit films for product pages",
    videoSrc: "/videos/services/product-video.mp4",
    posterSrc: "/videos/services/product-video-poster.webp",
    href: "/services/product-videography",
    ctaLabel: "View service",
  },
  {
    id: "social-media-video-content",
    title: "Social Media Video Content",
    description: "Short, fast video made for the feed, shot in batches.",
    videoSrc: "/videos/services/social-video.mp4",
    posterSrc: "/videos/services/social-video-poster.webp",
    href: "/services/social-media-video-content",
    ctaLabel: "View service",
  },
  {
    id: "promotional-advertising-videos",
    title: "Promotional & Advertising Videos",
    description: "Launches, conferences and activations covered live.",
    videoSrc: "/videos/services/promotional-video.mp4",
    posterSrc: "/videos/services/promotional-video-poster.webp",
    href: "/services/promotional-advertising-videos",
    ctaLabel: "View service",
  },
  {
    id: "commercial-video-production",
    title: "Commercial Video Production",
    description: "Short, fast video made for the feed, shot in batches.",
    videoSrc: "/videos/services/commercial-video.mp4",
    posterSrc: "/videos/services/commercial-video-poster.webp",
    href: "/services/commercial-video-production",
    ctaLabel: "View service",
  },
];
