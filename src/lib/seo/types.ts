/**
 * TypeScript definitions for Schema.org JSON-LD Structured Data
 * Standard compliance with Schema.org specifications and Google Rich Results guidelines.
 */

export interface SchemaContext {
  "@context": "https://schema.org";
}

export type WithContext<T> = SchemaContext & T;

export interface Thing {
  [key: string]: unknown;
  "@type": string | string[];
  "@id"?: string;
  name?: string;
  description?: string;
  url?: string;
  image?: string | string[] | ImageObject;
  sameAs?: string[];
  identifier?: string;
}

export interface ImageObject extends Thing {
  "@type": "ImageObject";
  url: string;
  contentUrl?: string;
  caption?: string;
  width?: string | number;
  height?: string | number;
}

export interface PostalAddress {
  [key: string]: unknown;
  "@type": "PostalAddress";
  streetAddress?: string;
  addressLocality: string;
  addressRegion: string;
  postalCode?: string;
  addressCountry: string;
}

export interface GeoCoordinates {
  [key: string]: unknown;
  "@type": "GeoCoordinates";
  latitude: number | string;
  longitude: number | string;
}

export interface ContactPoint {
  [key: string]: unknown;
  "@type": "ContactPoint";
  telephone: string;
  contactType: string;
  email?: string;
  areaServed?: string | string[];
  availableLanguage?: string | string[];
}

export interface OpeningHoursSpecification {
  [key: string]: unknown;
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
}

export interface AreaServedPlace {
  [key: string]: unknown;
  "@type": "City" | "State" | "Country" | "AdministrativeArea";
  name: string;
}

export interface OfferItem {
  [key: string]: unknown;
  "@type": "Offer";
  name?: string;
  description?: string;
  price?: string | number;
  priceCurrency?: string;
  itemOffered?: {
    "@type": "Service" | "Product";
    name: string;
    description?: string;
  };
}

export interface OfferCatalog {
  [key: string]: unknown;
  "@type": "OfferCatalog";
  name: string;
  itemListElement: OfferItem[] | ServiceSchema[];
}

export interface OrganizationSchema extends Thing {
  "@type": string | string[];
  "@id"?: string;
  name: string;
  legalName?: string;
  alternateName?: string[];
  url: string;
  logo?: ImageObject | string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: PostalAddress;
  geo?: GeoCoordinates;
  openingHoursSpecification?: OpeningHoursSpecification[];
  areaServed?: Array<AreaServedPlace | string>;
  contactPoint?: ContactPoint[];
  sameAs?: string[];
  priceRange?: string;
  currenciesAccepted?: string;
  paymentAccepted?: string;
  hasOfferCatalog?: OfferCatalog;
}

export interface SearchActionTarget {
  [key: string]: unknown;
  "@type": "EntryPoint";
  urlTemplate: string;
}

export interface SearchAction {
  [key: string]: unknown;
  "@type": "SearchAction";
  target: string | SearchActionTarget;
  "query-input": string;
}

export interface WebSiteSchema extends Thing {
  "@type": "WebSite";
  "@id"?: string;
  name: string;
  alternateName?: string | string[];
  url: string;
  publisher?: {
    "@type": string | string[];
    "@id"?: string;
    name?: string;
  };
  inLanguage?: string;
  potentialAction?: SearchAction;
}

export interface BreadcrumbListItem {
  [key: string]: unknown;
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

export interface BreadcrumbListSchema {
  [key: string]: unknown;
  "@type": "BreadcrumbList";
  "@id"?: string;
  itemListElement: BreadcrumbListItem[];
}

export interface FAQQuestion {
  [key: string]: unknown;
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

export interface FAQPageSchema {
  [key: string]: unknown;
  "@type": "FAQPage";
  "@id"?: string;
  mainEntity: FAQQuestion[];
}

export interface ServiceSchema extends Thing {
  "@type": "Service";
  "@id"?: string;
  name: string;
  serviceType?: string;
  category?: string;
  provider?: {
    "@type": string | string[];
    "@id"?: string;
    name: string;
    url?: string;
  };
  areaServed?: Array<AreaServedPlace | string>;
  hasOfferCatalog?: OfferCatalog;
  termsOfService?: string;
}

export interface VideoObjectSchema extends Thing {
  "@type": "VideoObject";
  "@id"?: string;
  name: string;
  description: string;
  thumbnailUrl: string[];
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
  inLanguage?: string;
  publisher?: {
    "@type": "Organization";
    "@id"?: string;
    name: string;
    logo?: ImageObject | string;
  };
}

export interface ItemListElement {
  [key: string]: unknown;
  "@type": "ListItem";
  position: number;
  item: Thing | ServiceSchema | VideoObjectSchema;
}

export interface ItemListSchema {
  [key: string]: unknown;
  "@type": "ItemList";
  "@id"?: string;
  name?: string;
  description?: string;
  itemListElement: ItemListElement[];
}
