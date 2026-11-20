import React from "react";
import { JsonLd } from "./JsonLd";
import {
  buildServiceSchema,
  buildServicesCatalogSchema,
} from "@/lib/seo/structuredData";

export interface ServiceData {
  title: string;
  description: string;
  slug: string;
  imageSrc?: string;
  posterSrc?: string;
}

export interface ServiceJsonLdProps {
  service: ServiceData;
  siteUrl?: string;
  brandName?: string;
  id?: string;
}

export interface ServicesCatalogJsonLdProps {
  services: ServiceData[];
  siteUrl?: string;
  brandName?: string;
  id?: string;
}

/**
 * Service Structured Data Component for specific service offerings (/services/[slug]).
 */
export function ServiceJsonLd({
  service,
  siteUrl,
  brandName,
  id = "service-schema",
}: ServiceJsonLdProps) {
  const schema = buildServiceSchema(service, { siteUrl, brandName });
  return <JsonLd id={id} data={schema} />;
}

/**
 * Services Catalog Structured Data Component for directory listing (/services).
 */
export function ServicesCatalogJsonLd({
  services,
  siteUrl,
  brandName,
  id = "services-catalog-schema",
}: ServicesCatalogJsonLdProps) {
  const schema = buildServicesCatalogSchema(services, { siteUrl, brandName });
  return <JsonLd id={id} data={schema} />;
}
