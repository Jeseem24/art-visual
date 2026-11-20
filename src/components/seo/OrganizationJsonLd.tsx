import React from "react";
import { JsonLd } from "./JsonLd";
import { buildOrganizationSchema } from "@/lib/seo/structuredData";

export interface OrganizationJsonLdProps {
  siteUrl?: string;
  brandName?: string;
  logoUrl?: string;
  email?: string;
  phone?: string;
  location?: string;
}

/**
 * Organization & LocalBusiness/ProfessionalService Structured Data Component.
 * Establishes brand entity identity, contact point, geo-location, price range, and social links.
 */
export function OrganizationJsonLd(props: OrganizationJsonLdProps) {
  const schema = buildOrganizationSchema(props);
  return <JsonLd id="organization-schema" data={schema} />;
}
