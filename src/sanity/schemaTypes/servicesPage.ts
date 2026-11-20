import { defineField, defineType } from "sanity";
import { seoFieldset, definePageSeoFields } from "./seoFields";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fieldsets: [
    seoFieldset,
    { name: "hero", title: "Hero Section", options: { collapsible: true, collapsed: false } },
    {
      name: "catalogHeader",
      title: "Services Catalog Header",
      description: "Header copy for the services catalog grid. Individual service cards are managed under the 'Services' collection in the sidebar.",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    ...definePageSeoFields("Services Page"),

    defineField({
      name: "heroHeadlineLine1",
      title: "Hero Headline Line 1",
      type: "string",
      fieldset: "hero",
      initialValue: "Creative Vision. Powerful",
    }),
    defineField({
      name: "heroHeadlineLine2Prefix",
      title: "Hero Headline Line 2 Prefix",
      type: "string",
      fieldset: "hero",
      initialValue: "Visuals. Meaningful",
    }),
    defineField({
      name: "heroHeadlineLine2Highlight",
      title: "Hero Headline Line 2 Highlight",
      type: "string",
      fieldset: "hero",
      initialValue: "Stories.",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
      fieldset: "hero",
      initialValue:
        "We bring ideas to life through creative video production, cinematic storytelling, and innovative visual solutions.",
    }),
    defineField({
      name: "catalogBadge",
      title: "Catalog Badge Text",
      type: "string",
      fieldset: "catalogHeader",
      initialValue: "Our Creative Services",
    }),
    defineField({
      name: "catalogTitleLine1",
      title: "Catalog Title Line 1",
      type: "string",
      fieldset: "catalogHeader",
      initialValue: "Creative Solutions That",
    }),
    defineField({
      name: "catalogTitleLine2",
      title: "Catalog Title Line 2",
      type: "string",
      fieldset: "catalogHeader",
      initialValue: "Make an Impact",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Services Page",
        subtitle: "Hero Section & Catalog Header Copy",
      };
    },
  },
});
