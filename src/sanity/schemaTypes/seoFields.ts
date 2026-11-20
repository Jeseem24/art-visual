import { defineField } from "sanity";

export const seoFieldset = {
  name: "seo",
  title: "Search Engine Optimization (SEO & Social)",
  options: { collapsible: true, collapsed: true },
};

export function definePageSeoFields(pageName: string) {
  return [
    defineField({
      name: "seoTitle",
      title: "Page SEO Title",
      type: "string",
      description: `Custom browser tab and Google search title for ${pageName}. Leave empty to use default.`,
      fieldset: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "Page Meta Description",
      type: "text",
      rows: 3,
      description: `Custom search engine summary snippet for ${pageName}. Leave empty to use default.`,
      fieldset: "seo",
    }),
    defineField({
      name: "seoKeywords",
      title: "Page Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: `Target search keywords for ${pageName}.`,
      fieldset: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Social Share (Open Graph) Image",
      type: "image",
      description: `Custom social preview card image for ${pageName} (1200x630px recommended).`,
      fieldset: "seo",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Accessibility and SEO description for social share image.",
        }),
      ],
    }),
  ];
}
