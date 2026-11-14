/**
 * Contact Inquiry section data definitions and defaults
 */

export interface ContactInfoItem {
  id: string;
  label: string;
  value: string;
  href?: string;
  iconSrc: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
}

export interface ServiceOption {
  value: string;
  label: string;
}

export interface ContactInquiryData {
  badgeText: string;
  headline: string;
  contactItems: ContactInfoItem[];
  studioImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  formTitle: string;
  serviceOptions: ServiceOption[];
  submitLabel: string;
}

export const CONTACT_INQUIRY_DEFAULTS: ContactInquiryData = {
  badgeText: "Get in Touch",
  headline: "we’re always excited to collaborate.",
  contactItems: [
    {
      id: "email",
      label: "email Us",
      value: "hello@sbsc.com",
      href: "mailto:hello@sbsc.com",
      iconSrc: "/icons/contact/email.svg",
      iconAlt: "Email icon",
      iconWidth: 46,
      iconHeight: 33,
    },
    {
      id: "phone",
      label: "call us",
      value: "+91 9876543210",
      href: "tel:+919876543210",
      iconSrc: "/icons/contact/phone.svg",
      iconAlt: "Phone icon",
      iconWidth: 40,
      iconHeight: 40,
    },
    {
      id: "location",
      label: "our location",
      value: "Chennai, India",
      iconSrc: "/icons/contact/location.svg",
      iconAlt: "Location pin icon",
      iconWidth: 29,
      iconHeight: 44,
    },
  ],
  studioImage: {
    src: "/images/contact/studio-location.png",
    alt: "SBSC Video Production Studio in Chennai, India",
    width: 692,
    height: 340,
  },
  formTitle: "Send us a message",
  serviceOptions: [
    { value: "commercial-ads", label: "Commercial & Brand Films" },
    { value: "corporate-video", label: "Corporate Video Production" },
    { value: "social-media-reels", label: "Social Media & Reels" },
    { value: "event-coverage", label: "Event Coverage & Aftermovies" },
    { value: "post-production", label: "Post-Production & Color Grading" },
    { value: "other", label: "Other" },
  ],
  submitLabel: "send your inquiry",
};
