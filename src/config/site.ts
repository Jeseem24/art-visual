/**
 * Global site configuration
 * Central source of truth for business contact details, routing, and brand metadata.
 */

export const siteConfig = {
  // Brand identity
  name: "Art Visual",
  tagline: "Films that make brands worth watching",
  description: "A creative video production company crafting high-impact brand films, product videos, social content, and commercial productions.",
  url: "https://artvisual.agency",

  // Business contact details
  contact: {
    email: "hello@sbsc.com",
    phone: "+91 98765 43210",
    phoneRaw: "+919876543210",
    location: "Chennai, India",
    locationDetail: "Chennai & on location worldwide",
    copyrightYear: 2026,
    copyrightText: "© 2026 Art Visual. All Rights Reserved.",
  },

  // WhatsApp configuration
  whatsapp: {
    phoneNumber: "919876543210", 

    templates: {
      default: "Hi Art Visual team! I visited your website and would like to discuss a video production project.",
      serviceEnquiry: (serviceName: string) => 
        `Hi Art Visual! I'm interested in your ${serviceName} services. Can we discuss scope, timelines, and pricing?`,
      projectEnquiry: (projectTitle: string) => 
        `Hi Art Visual! I just watched "${projectTitle}" on your website and would like to explore something similar for my brand.`,
      quickQuestion: "Hi! I have a quick question about video production for our brand.",
    },
  },

  // Primary navigation links
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/work" },
    { label: "Contact Us", href: "/contact" },
  ],

  // Social media links
  socials: [
    { name: "Instagram", url: "https://instagram.com", handle: "@artvisual" },
    { name: "LinkedIn", url: "https://linkedin.com", handle: "artvisual" },
    { name: "YouTube", url: "https://youtube.com", handle: "@artvisualfilms" },
    { name: "Vimeo", url: "https://vimeo.com", handle: "artvisual" },
  ],

  // Core service disciplines
  servicesList: [
    { title: "Brand Video Production", slug: "brand-video-production" },
    { title: "Product Videography", slug: "product-videography" },
    { title: "Corporate Video Production", slug: "corporate-video-production" },
    { title: "Promotional & Advertising Videos", slug: "promotional-advertising-videos" },
    { title: "Event Video Production", slug: "event-video-production" },
    { title: "Social Media Video Content", slug: "social-media-video-content" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

