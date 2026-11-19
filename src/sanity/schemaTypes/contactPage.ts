import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fieldsets: [
    { name: "hero", title: "Hero Section", options: { collapsible: true, collapsed: false } },
    { name: "inquiry", title: "Inquiry & Form Settings", options: { collapsible: true, collapsed: true } },
    { name: "contactInfo", title: "Direct Contact Information", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // --- HERO SECTION ---
    defineField({
      name: "heroHeadlineLine1Prefix",
      title: "Hero Headline Line 1 Prefix",
      type: "string",
      fieldset: "hero",
      initialValue: "Let's Create",
    }),
    defineField({
      name: "heroHeadlineLine1Highlight",
      title: "Hero Headline Line 1 Highlight",
      type: "string",
      fieldset: "hero",
      initialValue: "Something",
    }),
    defineField({
      name: "heroHeadlineLine2",
      title: "Hero Headline Line 2",
      type: "string",
      fieldset: "hero",
      initialValue: "Extraordinary.",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
      fieldset: "hero",
      initialValue:
        "Have a creative idea or a project in mind? We'd love to hear from you. Let's connect and bring your vision to life through powerful visual storytelling.",
    }),

    // --- INQUIRY SECTION ---
    defineField({
      name: "inquiryBadge",
      title: "Inquiry Badge Text",
      type: "string",
      fieldset: "inquiry",
      initialValue: "Get in Touch",
    }),
    defineField({
      name: "inquiryHeadline",
      title: "Inquiry Headline",
      type: "string",
      fieldset: "inquiry",
      initialValue: "we’re always excited to collaborate.",
    }),
    defineField({
      name: "formTitle",
      title: "Form Title",
      type: "string",
      fieldset: "inquiry",
      initialValue: "Send us a message",
    }),
    defineField({
      name: "submitButtonLabel",
      title: "Submit Button Label",
      type: "string",
      fieldset: "inquiry",
      initialValue: "send your inquiry",
    }),
    defineField({
      name: "studioImage",
      title: "Studio / Office Location Image",
      type: "image",
      options: { hotspot: true },
      fieldset: "inquiry",
    }),
    defineField({
      name: "serviceOptions",
      title: "Service Inquiry Dropdown Options",
      type: "array",
      fieldset: "inquiry",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Option Value (ID)", type: "string" }),
            defineField({ name: "label", title: "Display Label", type: "string" }),
          ],
        },
      ],
      initialValue: [
        { value: "commercial-ads", label: "Commercial & Brand Films" },
        { value: "corporate-video", label: "Corporate Video Production" },
        { value: "social-media-reels", label: "Social Media & Reels" },
        { value: "event-coverage", label: "Event Coverage & Aftermovies" },
        { value: "post-production", label: "Post-Production & Color Grading" },
        { value: "other", label: "Other" },
      ],
    }),

    // --- DIRECT CONTACT INFO ---
    defineField({
      name: "contactEmail",
      title: "Contact Email Address",
      type: "string",
      fieldset: "contactInfo",
      initialValue: "hello@sbsc.com",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone Number",
      type: "string",
      fieldset: "contactInfo",
      initialValue: "+91 9876543210",
    }),
    defineField({
      name: "contactLocation",
      title: "Studio Office Address / Location",
      type: "string",
      fieldset: "contactInfo",
      initialValue: "Chennai, India",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Contact Page",
        subtitle: "Hero, Inquiry Form, Service Options & Contact Info",
      };
    },
  },
});
