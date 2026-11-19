import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export const testimonial = defineType({
  name: "testimonial",
  title: "Client Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      description: "Full name of the client or reviewer.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Client Role / Title",
      type: "string",
      placeholder: "e.g. CMO, FinEdge",
      description: "Job title and brand affiliation (e.g. 'Head of Marketing, Lumina').",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Client Photo / Avatar",
      type: "image",
      description: "Recommended: 1:1 square headshot (e.g. 400x400px), under 1MB. Use hotspot to target face.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "rating",
      title: "Star Rating (1-5)",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "quote",
      title: "Testimonial Quote",
      type: "text",
      rows: 3,
      description: "The client's feedback or review of Art Visual's production work.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order Rank (Legacy)",
      type: "number",
      initialValue: 0,
      hidden: true,
    }),
    orderRankField({ type: "testimonial" }),
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
      title: "name",
      subtitle: "role",
      media: "avatar",
    },
  },
});
