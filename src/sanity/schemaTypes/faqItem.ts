import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      description: "The common client question.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      description: "Direct, reassuring answer explaining our process, pricing, or turnaround time.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order Rank (Legacy)",
      type: "number",
      initialValue: 0,
      hidden: true,
    }),
    orderRankField({ type: "faqItem" }),
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
      title: "question",
      subtitle: "answer",
    },
  },
});
