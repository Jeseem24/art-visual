import React from "react";
import { JsonLd } from "./JsonLd";
import { buildWebSiteSchema } from "@/lib/seo/structuredData";

export interface WebSiteJsonLdProps {
  siteUrl?: string;
  brandName?: string;
}

/**
 * WebSite Structured Data Component with Sitelinks SearchBox potentialAction.
 */
export function WebSiteJsonLd(props: WebSiteJsonLdProps) {
  const schema = buildWebSiteSchema(props);
  return <JsonLd id="website-schema" data={schema} />;
}
