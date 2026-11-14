/**
 * Work Portfolio Data Contracts & Content Registry
 *
 * Powers `/work` portfolio showcase with Sanity-compatible structured data.
 * Categories and initial 9-card grid align with Figma frames `199:3206`
 * ("All Projects") and `212:301` ("Brand Films").
 */

export type WorkCategory =
  | "All Projects"
  | "Brand Films"
  | "Commercial Ads"
  | "Product Videos"
  | "Corporate Films"
  | "Fashion Films";

export const WORK_CATEGORIES: readonly WorkCategory[] = [
  "All Projects",
  "Brand Films",
  "Commercial Ads",
  "Product Videos",
  "Corporate Films",
  "Fashion Films",
] as const;

export interface WorkProjectItem {
  id: string;
  projectName: string;
  category: Exclude<WorkCategory, "All Projects">;
  brandName: string;
  imageSrc: string;
  videoSrc: string;
  imageAlt: string;
}

export const WORK_PROJECTS: readonly WorkProjectItem[] = [
  {
    id: "echoes-of-craft",
    projectName: "Echoes of Craft",
    category: "Brand Films",
    brandName: "Vanguard Atelier",
    imageSrc: "/videos/services/social-video-poster.webp",
    videoSrc: "/videos/hero/brand.mp4",
    imageAlt: "Behind-the-scenes frame from Echoes of Craft brand film for Vanguard Atelier",
  },
  {
    id: "beyond-the-horizon",
    projectName: "Beyond the Horizon",
    category: "Brand Films",
    brandName: "Solstice Roasters",
    imageSrc: "/images/works/work-frame-2.png",
    videoSrc: "/videos/services/brand-video.mp4",
    imageAlt: "Cinematography still from Beyond the Horizon brand film for Solstice Roasters",
  },
  {
    id: "pulse-of-the-city",
    projectName: "Pulse of the City",
    category: "Brand Films",
    brandName: "Kinetix Mobility",
    imageSrc: "/images/works/work-frame-3.png",
    videoSrc: "/videos/about/studio-reel.mp4",
    imageAlt: "Urban production still from Pulse of the City brand film for Kinetix Mobility",
  },
  {
    id: "golden-hour-launch",
    projectName: "Golden Hour Launch",
    category: "Commercial Ads",
    brandName: "Aurelia Skincare",
    imageSrc: "/videos/services/commercial-video-poster.webp",
    videoSrc: "/videos/services/commercial-video.mp4",
    imageAlt: "Studio lighting setup for Golden Hour Launch commercial ad by Aurelia Skincare",
  },
  {
    id: "velocity-campaign",
    projectName: "Velocity Campaign",
    category: "Commercial Ads",
    brandName: "Apex Athletics",
    imageSrc: "/videos/services/promotional-video-poster.webp",
    videoSrc: "/videos/services/promotional-video.mp4",
    imageAlt: "Dynamic action frame from Velocity Campaign commercial ad for Apex Athletics",
  },
  {
    id: "lumina-series-one",
    projectName: "Lumina Series One",
    category: "Product Videos",
    brandName: "Chronos Audio",
    imageSrc: "/videos/services/product-video-poster.webp",
    videoSrc: "/videos/services/product-video.mp4",
    imageAlt: "Macro product showcase frame for Lumina Series One by Chronos Audio",
  },
  {
    id: "obsidian-edition",
    projectName: "Obsidian Edition",
    category: "Product Videos",
    brandName: "Monolith Gear",
    imageSrc: "/images/works/work-frame-2.png",
    videoSrc: "/videos/hero/product.mp4",
    imageAlt: "Detailed product film frame for Obsidian Edition by Monolith Gear",
  },
  {
    id: "building-tomorrow",
    projectName: "Building Tomorrow",
    category: "Corporate Films",
    brandName: "Helios Energy",
    imageSrc: "/videos/services/corporate-video-poster.webp",
    videoSrc: "/videos/services/corporate-video.mp4",
    imageAlt: "Executive documentary frame from Building Tomorrow corporate film for Helios Energy",
  },
  {
    id: "velvet-noir-autumn",
    projectName: "Velvet Noir Autumn",
    category: "Fashion Films",
    brandName: "Maison Verve",
    imageSrc: "/videos/services/brand-video-poster.webp",
    videoSrc: "/videos/services/social-video.mp4",
    imageAlt: "Editorial fashion film still from Velvet Noir Autumn for Maison Verve",
  },
];
