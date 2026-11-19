import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineVideoUploadField } from "../lib/validators";

export const featuredWork = defineType({
  name: "featuredWork",
  title: "Portfolio Project",
  type: "document",
  fields: [
    defineField({
      name: "projectName",
      title: "Project Name / Title",
      type: "string",
      description: "Descriptive title of the film or commercial project.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL identifier)",
      type: "slug",
      description: "Click 'Generate' to create a clean URL slug from the project name.",
      options: {
        source: "projectName",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Select the primary production category for portfolio filtering.",
      options: {
        list: [
          { title: "Brand Films", value: "Brand Films" },
          { title: "Commercial Ads", value: "Commercial Ads" },
          { title: "Product Videos", value: "Product Videos" },
          { title: "Corporate Films", value: "Corporate Films" },
          { title: "Fashion Films", value: "Fashion Films" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brandName",
      title: "Client / Brand Name",
      type: "string",
      description: "Name of the brand or client (e.g. Nike, Spotify, Sony).",
      validation: (Rule) => Rule.required(),
    }),
    defineVideoUploadField({
      name: "video",
      title: "Preview Video File",
      description: "Direct MP4 upload of background video reel shown on project card hover and showcase details.",
      maxSizeMB: 20,
    }),
    defineField({
      name: "featuredInHome",
      title: "Showcase in Home Page Carousel",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order Rank (Legacy)",
      type: "number",
      initialValue: 0,
      hidden: true,
    }),
    orderRankField({ type: "featuredWork" }),
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
      title: "projectName",
      subtitle: "brandName",
    },
  },
});
