import { defineField, defineType } from "sanity";

export const navbarSettings = defineType({
  name: "navbarSettings",
  title: "Navigation Header",
  type: "document",
  fieldsets: [
    { name: "menu", title: "Navigation Menu Links", options: { collapsible: true, collapsed: false } },
    { name: "actions", title: "Action Button & WhatsApp", options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({
      name: "navItems",
      title: "Navigation Menu Links",
      type: "array",
      fieldset: "menu",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Link Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Destination URL",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      initialValue: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Work", href: "/work" },
        { label: "Contact", href: "/contact" },
      ],
    }),
    defineField({
      name: "ctaLabel",
      title: "Header CTA Button Label",
      type: "string",
      description: "Text shown on the prominent top-right pill button.",
      fieldset: "actions",
      initialValue: "Let's Talk",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaHref",
      title: "Header CTA Button URL",
      type: "string",
      fieldset: "actions",
      initialValue: "/contact",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatsappDefaultMsg",
      title: "WhatsApp Pre-filled Message",
      type: "text",
      rows: 2,
      description: "Default inquiry message that pre-fills when visitors click the WhatsApp contact link.",
      fieldset: "actions",
      initialValue:
        "Hi Art Visual! I'm interested in discussing a video production project for my brand.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Navigation Header",
        subtitle: "Menu Links, CTA Button, WhatsApp Default Message",
      };
    },
  },
});
