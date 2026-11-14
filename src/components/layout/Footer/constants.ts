/**
 * Footer data and navigation definitions
 */

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterContactItem {
  label: string;
  value?: string;
  href: string;
}

export interface FooterSocialItem {
  id: string;
  name: string;
  href: string;
}

export const FOOTER_DATA = {
  brandName: "art visual",
  brandDescription:
    "We bring ideas to life through creative storytelling and impactful video production that helps brands connect with their audience.",
  
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/work" },
    { label: "Contact Us", href: "/contact" },
  ] as FooterLinkItem[],

  servicesList: [
    { label: "Brand Video Production", href: "/services#brand-video" },
    { label: "Product Videography", href: "/services#product-videography" },
    { label: "Corporate Video Production", href: "/services#corporate-video" },
    { label: "Promotional Videos", href: "/services#promotional-videos" },
    { label: "Event Video Production", href: "/services#event-video" },
    { label: "Social Media Video Content", href: "/services#social-media" },
  ] as FooterLinkItem[],

  contactItems: [
    { label: "Email Address", value: "hello@sbsc.com", href: "mailto:hello@sbsc.com" },
    { label: "Phone Number", value: "+91 98765 43210", href: "tel:+919876543210" },
    { label: "Location", value: "Chennai, India", href: "#location" },
    { label: "WhatsApp", value: "+91 98765 43210", href: "https://wa.me/919876543210" },
  ] as FooterContactItem[],

  socialLinks: [
    {
      id: "instagram",
      name: "Instagram",
      href: "https://instagram.com",
    },
    {
      id: "facebook",
      name: "Facebook",
      href: "https://facebook.com",
    },
    {
      id: "twitter",
      name: "Twitter",
      href: "https://x.com",
    },
    {
      id: "youtube",
      name: "YouTube",
      href: "https://youtube.com",
    },
  ] as FooterSocialItem[],

  copyright: "© 2026 Company Name. All Rights Reserved.",
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
} as const;
