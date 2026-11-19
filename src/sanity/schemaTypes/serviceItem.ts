import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineVideoUploadField } from "../lib/validators";

export const serviceItem = defineType({
  name: "serviceItem",
  title: "Service Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      description: "Name of the service (e.g. 'Brand Video Production', 'Commercial Production').",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL identifier)",
      type: "slug",
      description: "Click 'Generate' to create a clean URL slug from the title.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Overview of what this service delivers and why brands choose it.",
      validation: (Rule) => Rule.required(),
    }),
    defineVideoUploadField({
      name: "video",
      title: "Preview Video File",
      description: "Short video loop illustrating this service in action.",
      maxSizeMB: 20,
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      description: "Button text displayed on the service card.",
      initialValue: "View service",
    }),
    defineField({
      name: "order",
      title: "Display Order Rank (Legacy)",
      type: "number",
      initialValue: 0,
      hidden: true,
    }),
    orderRankField({ type: "serviceItem" }),
  ],
  orderings: [
    orderRankOrdering,
    {
      title: "Display Order (Ascending)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});
