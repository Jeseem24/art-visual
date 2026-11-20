import React from "react";
import { JsonLd } from "./JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/structuredData";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
  siteUrl?: string;
  id?: string;
}

/**
 * BreadcrumbList Structured Data Component.
 * Enables Google rich snippet breadcrumb navigation hierarchy.
 */
export function BreadcrumbJsonLd({ items, siteUrl, id = "breadcrumb-schema" }: BreadcrumbJsonLdProps) {
  const schema = buildBreadcrumbSchema(items, { siteUrl });
  return <JsonLd id={id} data={schema} />;
}
