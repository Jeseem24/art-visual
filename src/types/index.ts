/**
 * ==============================================================================
 * SANITY-COMPATIBLE DATA TYPES (TypeScript)
 * ==============================================================================
 * These types match the exact shape of our planned Sanity CMS schemas.
 * Using these throughout the frontend ensures that connecting live CMS data later
 * will not require modifying our UI components.
 * ==============================================================================
 */

export interface Service {
  id: string;
  order: number;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription?: string;
  heroImage: string;
  cardThumbnail: string;
  deliverables?: string[];
  workflow?: {
    stepNumber: string;
    phaseName: string;
    description: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export type ProjectCategory = 
  | "all" 
  | "brand" 
  | "commercial" 
  | "product" 
  | "corporate" 
  | "event" 
  | "social";

export interface Project {
  id: string;
  title: string;
  slug: string;
  clientName?: string;
  category: ProjectCategory;
  categoryLabel: string;
  featured?: boolean;
  thumbnail: string;
  videoUrl?: string; // YouTube/Vimeo embed or Direct MP4/HLS
  videoProvider?: "youtube" | "vimeo" | "direct" | "mux";
  aspectRatio?: "16/9" | "9/16" | "4/5";
  description?: string;
  relatedServiceSlug?: string;
  year?: number;
}

export interface WhyTrustUsItem {
  id: string;
  stepNumber: string; // "01", "02", etc.
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientCompany: string;
  clientRole?: string;
  quote: string;
  rating?: number;
}

