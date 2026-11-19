import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fieldsets: [
    { name: "hero", title: "1. Hero Section", options: { collapsible: true, collapsed: false } },
    { name: "whoWeAre", title: "2. Who We Are Section", options: { collapsible: true, collapsed: false } },
    { name: "visionMission", title: "3. Vision & Mission Section", options: { collapsible: true, collapsed: false } },
    { name: "whatWeDo", title: "4. What We Do (Capabilities - 8 Cards)", options: { collapsible: true, collapsed: false } },
    { name: "creativeProcess", title: "5. Creative Process (5 Timeline Steps)", options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    // --- HERO SECTION ---
    defineField({
      name: "heroHeadlineLine1",
      title: "Hero Headline Line 1",
      type: "string",
      fieldset: "hero",
      initialValue: "We Turn Stories Into",
    }),
    defineField({
      name: "heroHeadlineLine2Prefix",
      title: "Hero Headline Line 2 Prefix",
      type: "string",
      fieldset: "hero",
      initialValue: "Visual",
    }),
    defineField({
      name: "heroHeadlineLine2Highlight",
      title: "Hero Headline Line 2 Highlight",
      type: "string",
      fieldset: "hero",
      initialValue: "Experiences.",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
      fieldset: "hero",
      initialValue:
        "We plan, shoot and finish brand films, product videos, social content and event coverage.",
    }),

    // --- WHO WE ARE SECTION ---
    defineField({
      name: "whoWeAreBadge",
      title: "Who We Are Badge",
      type: "string",
      fieldset: "whoWeAre",
      initialValue: "Who We Are",
    }),
    defineField({
      name: "whoWeAreHeadlineLine1",
      title: "Who We Are Headline Line 1",
      type: "string",
      fieldset: "whoWeAre",
      initialValue: "Where Creativity Meets",
    }),
    defineField({
      name: "whoWeAreHeadlineLine2",
      title: "Who We Are Headline Line 2",
      type: "string",
      fieldset: "whoWeAre",
      initialValue: "Storytelling.",
    }),
    defineField({
      name: "whoWeAreParagraphs",
      title: "Who We Are Narrative Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      fieldset: "whoWeAre",
      initialValue: [
        "We are a creative video production team passionate about transforming ideas into powerful visual stories. From concept development to final production, we combine creativity, technical expertise, and cinematic storytelling to create videos that connect with audiences.",
        "Our team brings together talented filmmakers, cinematographers, editors, and creative minds who work together to turn every vision into a meaningful visual experience.",
      ],
    }),
    defineField({
      name: "whoWeAreImage",
      title: "Who We Are Feature Photo",
      type: "image",
      options: { hotspot: true },
      fieldset: "whoWeAre",
    }),

    // --- VISION & MISSION SECTION ---
    defineField({
      name: "visionMissionItems",
      title: "Vision & Mission Cards",
      type: "array",
      fieldset: "visionMission",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Card Title", type: "string" }),
            defineField({ name: "description", title: "Card Description", type: "text", rows: 3 }),
            defineField({
              name: "variant",
              title: "Card Style Variant",
              type: "string",
              options: {
                list: [
                  { title: "Solid Red", value: "solidRed" },
                  { title: "Outlined", value: "outlined" },
                ],
              },
            }),
          ],
        },
      ],
    }),

    // --- WHAT WE DO SECTION ---
    defineField({
      name: "whatWeDoBadge",
      title: "What We Do Badge",
      type: "string",
      fieldset: "whatWeDo",
      initialValue: "What We Do",
    }),
    defineField({
      name: "whatWeDoHeadlineLine1",
      title: "What We Do Headline Line 1",
      type: "string",
      fieldset: "whatWeDo",
      initialValue: "Bringing Ideas to Life Through",
    }),
    defineField({
      name: "whatWeDoHeadlineLine2",
      title: "What We Do Headline Line 2",
      type: "string",
      fieldset: "whatWeDo",
      initialValue: "Creative Visual Production.",
    }),
    defineField({
      name: "whatWeDoCards",
      title: "Capability Cards (8 Cards)",
      type: "array",
      fieldset: "whatWeDo",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Capability Title", type: "string" }),
            defineField({ name: "description", title: "Capability Description", type: "text", rows: 2 }),
            defineField({
              name: "icon",
              title: "Card Icon",
              description: "Select the icon displayed on this capability card",
              type: "string",
              options: {
                list: [
                  { title: "Brand Films", value: "/images/about/icons/brand-films.svg" },
                  { title: "Cinematography", value: "/images/about/icons/cinematography.svg" },
                  { title: "Commercial Films", value: "/images/about/icons/commercial-films.svg" },
                  { title: "Documentary Films", value: "/images/about/icons/documentary-films.svg" },
                  { title: "Event Videography", value: "/images/about/icons/event-videography.svg" },
                  { title: "Motion Graphics", value: "/images/about/icons/motion-graphics.svg" },
                  { title: "Photography", value: "/images/about/icons/photography.svg" },
                  { title: "Video Production", value: "/images/about/icons/video-production.svg" },
                ],
              },
              initialValue: "/images/about/icons/brand-films.svg",
            }),
          ],
        },
      ],
    }),

    // --- CREATIVE PROCESS SECTION ---
    defineField({
      name: "processBadge",
      title: "Creative Process Badge",
      type: "string",
      fieldset: "creativeProcess",
      initialValue: "Our Creative Process",
    }),
    defineField({
      name: "processHeadlineLine1",
      title: "Process Headline Line 1",
      type: "string",
      fieldset: "creativeProcess",
      initialValue: "From the First Idea to the Final",
    }),
    defineField({
      name: "processHeadlineLine2",
      title: "Process Headline Line 2",
      type: "string",
      fieldset: "creativeProcess",
      initialValue: "Frame, We Make Every Step Count.",
    }),
    defineField({
      name: "processSteps",
      title: "Creative Process Timeline Steps (5 Steps)",
      type: "array",
      fieldset: "creativeProcess",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "number", title: "Step Number (1-5)", type: "number" }),
            defineField({ name: "label", title: "Step Label (e.g. Discover, Plan)", type: "string" }),
            defineField({ name: "title", title: "Step Title", type: "string" }),
            defineField({ name: "description", title: "Step Description", type: "text", rows: 3 }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Page",
        subtitle: "Hero, Who We Are, Vision & Mission, What We Do, Creative Process",
      };
    },
  },
});
