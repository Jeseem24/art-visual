/**
 * Navbar navigation items and configuration
 */
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
] as const;

export const NAVBAR_CONFIG = {
  ctaLabel: "Let's Talk",
  whatsappDefaultMsg: "Hi Art Visual! I'm interested in discussing a video production project for my brand.",
} as const;
