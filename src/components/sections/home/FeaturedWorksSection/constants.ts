/**
 * Featured works section data definitions
 */

export interface WorkItem {
  id: string;
  title: string;
  slug: string;
  imageSrc: string;
  alt: string;
  href?: string;
  category?: string;
}

export const FEATURED_WORKS_DEFAULTS = {
  badge: {
    text: "Featured Works",
  },
  headline: {
    text: "Creativity in Every Frame",
  },
} as const;

export const FEATURED_WORKS_ITEMS: WorkItem[] = [
  {
    id: "monsoon-roast",
    title: "Monsoon Roast: Origin Film",
    slug: "monsoon-roast",
    imageSrc: "/images/works/monsoon-roast.png",
    alt: "Monsoon Roast: Origin Film",
    category: "Brand Film",
  },
  {
    id: "kaveri-looms",
    title: "Kaveri Looms: Festive Collection",
    slug: "kaveri-looms",
    imageSrc: "/images/works/kaveri-looms.png",
    alt: "Kaveri Looms: Festive Collection",
    category: "Commercial",
  },
  {
    id: "nimbus-pay",
    title: "Nimbus Pay: Product Explainer",
    slug: "nimbus-pay",
    imageSrc: "/images/works/nimbus-pay.png",
    alt: "Nimbus Pay: Product Explainer",
    category: "Product Explainer",
  },
  {
    id: "techsummit-south",
    title: "TechSummit South",
    slug: "techsummit-south",
    imageSrc: "/images/works/techsummit-south.png",
    alt: "TechSummit South",
    category: "Event Coverage",
  },
];
