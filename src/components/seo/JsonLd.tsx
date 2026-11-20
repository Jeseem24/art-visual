import React from "react";

export interface JsonLdProps {
  /**
   * Structured data object, array of objects, or pre-formatted JSON-LD graph.
   */
  data: unknown;
  /**
   * Optional unique script element identifier.
   */
  id?: string;
}

/**
 * Standard Schema.org JSON-LD Script Component.
 * Escapes unsafe HTML characters to prevent XSS vulnerability attacks in JSON-LD output.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  if (!data) return null;
  const jsonString = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
