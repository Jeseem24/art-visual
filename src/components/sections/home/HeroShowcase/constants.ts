/**
 * Hero showcase cards configuration
 */
export interface ShowcaseCardItem {
  id: string;
  title: string;
  description: string;
  image: string;
  videoSrc: string;
  rotationDeg: number;
}

export const HERO_SHOWCASE_CARDS: readonly ShowcaseCardItem[] = [
  {
    id: "card-corporate",
    title: "Corporate Video Production",
    description: "Showcasing your business with\nimpactful visuals.",
    image: "/videos/hero/corporate-poster.webp",
    videoSrc: "/videos/hero/corporate.mp4",
    rotationDeg: -17,
  },
  {
    id: "card-promotional",
    title: "Promotional Videos",
    description: "Creating engaging videos that make\nyour brand stand out.",
    image: "/videos/hero/promotional-poster.webp",
    videoSrc: "/videos/hero/promotional.mp4",
    rotationDeg: -7,
  },
  {
    id: "card-product",
    title: "Product Videography",
    description: "Bringing products to life through\nstunning visuals.",
    image: "/videos/hero/product-poster.webp",
    videoSrc: "/videos/hero/product.mp4",
    rotationDeg: 0,
  },
  {
    id: "card-event",
    title: "Event Video Production",
    description: "Capturing every special moment and turning it into a timeless visual story.",
    image: "/videos/hero/event-poster.webp",
    videoSrc: "/videos/hero/event.mp4",
    rotationDeg: 8,
  },
  {
    id: "card-brand",
    title: "Brand Video Production",
    description: "Crafting powerful stories that\ndefine your brand.",
    image: "/videos/hero/brand-poster.webp",
    videoSrc: "/videos/hero/brand.mp4",
    rotationDeg: 16,
  },
] as const;
