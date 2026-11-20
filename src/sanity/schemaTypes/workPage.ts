import { defineField, defineType } from "sanity";
import { seoFieldset, definePageSeoFields } from "./seoFields";

export const workPage = defineType({
  name: "workPage",
  title: "Work Page",
  type: "document",
  fieldsets: [
    seoFieldset,
    { name: "hero", title: "Hero Section", options: { collapsible: true, collapsed: false } },
    {
      name: "filterBar",
      title: "Category Filter Bar",
      description: "Category buttons displayed above the portfolio grid. Individual projects are managed under the 'Portfolio Projects' collection in the sidebar.",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    ...definePageSeoFields("Work Page"),

    defineField({
      name: "heroHeadlineLine1",
      title: "Hero Headline Line 1",
      type: "string",
      fieldset: "hero",
      initialValue: "Bringing Stories to Life",
    }),
    defineField({
      name: "heroHeadlineLine2Prefix",
      title: "Hero Headline Line 2 Prefix",
      type: "string",
      fieldset: "hero",
      initialValue: "Through",
    }),
    defineField({
      name: "heroHeadlineLine2Highlight",
      title: "Hero Headline Line 2 Highlight",
      type: "string",
      fieldset: "hero",
      initialValue: "Our Work.",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
      fieldset: "hero",
      initialValue:
        "Explore our creative portfolio of brand films, commercials, product videos, and visual stories crafted with creativity and passion.",
    }),
    defineField({
      name: "categories",
      title: "Portfolio Filter Categories",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "filterBar",
      initialValue: [
        "All Projects",
        "Brand Films",
        "Commercial Ads",
        "Product Videos",
        "Corporate Films",
        "Fashion Films",
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Work Page",
        subtitle: "Hero Section & Filter Categories",
      };
    },
  },
});
