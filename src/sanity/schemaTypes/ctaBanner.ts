import { defineField, defineType } from "sanity";

export const ctaBanner = defineType({
  name: "ctaBanner",
  title: "CTA Banner",
  type: "document",
  fieldsets: [
    { name: "content", title: "Banner Copy & Action Button", options: { collapsible: true, collapsed: false } },
    { name: "media", title: "Dual Marquee Filmstrip Reels", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: "badgeText",
      title: "Badge Text",
      type: "string",
      fieldset: "content",
      initialValue: "Start a project",
    }),
    defineField({
      name: "headlineLine1",
      title: "Headline Line 1",
      type: "string",
      fieldset: "content",
      initialValue: "Got a shoot in mind?",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headlineLine2",
      title: "Headline Line 2",
      type: "string",
      fieldset: "content",
      initialValue: "Message us.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descriptionHighlight",
      title: "Description Highlight (Bold Sentence)",
      type: "string",
      fieldset: "content",
      initialValue: "Send a line about your product",
    }),
    defineField({
      name: "descriptionBody",
      title: "Description Body Text",
      type: "text",
      rows: 2,
      fieldset: "content",
      initialValue:
        ", your audience and your date. We reply with ideas and a rough quote.",
    }),
    defineField({
      name: "buttonLabel",
      title: "Action Button Label",
      type: "string",
      fieldset: "content",
      initialValue: "Let's Talk",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "buttonHref",
      title: "Action Button Link",
      type: "string",
      fieldset: "content",
      initialValue: "/contact",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "reelStrip1",
      title: "Reel Carousel Strip 1 Images (4 Images)",
      description: "Recommended: 16:9 ratio (1280x720px), under 1.5MB each. Fast horizontal marquee strip.",
      type: "array",
      fieldset: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "reelStrip2",
      title: "Reel Carousel Strip 2 Images (4 Images)",
      description: "Recommended: 16:9 ratio (1280x720px), under 1.5MB each. Counter-moving horizontal marquee strip.",
      type: "array",
      fieldset: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "CTA Banner",
        subtitle: "Global Bottom Call To Action Banner & Reel Strips",
      };
    },
  },
});
