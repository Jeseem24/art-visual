import React from "react";
import { JsonLd } from "./JsonLd";
import { buildFAQSchema } from "@/lib/seo/structuredData";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQJsonLdProps {
  items: FAQItem[];
  id?: string;
}

/**
 * FAQPage Structured Data Component.
 * Enables Google rich results for Frequently Asked Questions.
 */
export function FAQJsonLd({ items, id = "faq-schema" }: FAQJsonLdProps) {
  if (!items || items.length === 0) return null;
  const schema = buildFAQSchema(items, { id });
  return <JsonLd id={id} data={schema} />;
}
