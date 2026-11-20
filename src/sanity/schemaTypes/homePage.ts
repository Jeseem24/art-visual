import { defineField, defineType } from "sanity";
import { defineVideoUploadField } from "../lib/validators";
import { seoFieldset, definePageSeoFields } from "./seoFields";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fieldsets: [
    seoFieldset,
    { name: "hero", title: "Hero Section", options: { collapsible: true, collapsed: false } },
    { name: "heroShowcase", title: "Hero Showcase Cards", options: { collapsible: true, collapsed: true } },
    {
      name: "servicesHeader",
      title: "Services Section Header",
      description: "Header copy for the services showcase. The service cards themselves are managed under 'Services' in the left sidebar menu.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "worksHeader",
      title: "Featured Works Header & Carousel",
      description: "Header copy for the homepage Featured Works carousel. The project cards ('Beyond the Horizon', 'Echoes of Craft', etc.) are managed under 'Portfolio Projects' in the left sidebar (enable 'Showcase in Home Page Carousel').",
      options: { collapsible: true, collapsed: false },
    },
    { name: "about", title: "About Section (Studio Story)", options: { collapsible: true, collapsed: false } },
    {
      name: "whyChooseUs",
      title: "Why Choose Us Section (Shared on Home, Services & Contact)",
      description: "Manage the 4 capability value propositions. Displayed on Home, Services, and Contact pages.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "testimonialsHeader",
      title: "Testimonials Section Header",
      description: "Header copy for client reviews. Individual reviews are managed under the 'Client Testimonials' collection in the sidebar.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "faqHeader",
      title: "FAQ Section Header",
      description: "Header copy for frequently asked questions. Individual Q&A items are managed under the 'FAQ Items' collection in the sidebar.",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    ...definePageSeoFields("Home Page"),

    // --- 1. HERO SECTION ---
    defineField({
      name: "heroLocationPill",
      title: "Hero Location Pill",
      type: "string",
      description: "Small capsule badge above the main headline.",
      fieldset: "hero",
      initialValue: "Video production for brands · Chennai & on location",
    }),
    defineField({
      name: "heroHeadlineLine1Text",
      title: "Hero Headline Line 1 Text",
      type: "string",
      description: "First line prefix before the highlighted word.",
      fieldset: "hero",
      initialValue: "FILMS THAT MAKE",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroHeadlineLine1Highlight",
      title: "Hero Headline Line 1 Highlight Word",
      type: "string",
      description: "Highlighted accent word with red underline accent.",
      fieldset: "hero",
      initialValue: "BRANDS",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroHeadlineLine2Text",
      title: "Hero Headline Line 2 Text",
      type: "string",
      description: "Second line of the giant display typography.",
      fieldset: "hero",
      initialValue: "WORTH WATCHING",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
      description: "Hero subheadline supporting the main headline.",
      fieldset: "hero",
      initialValue:
        "We plan, shoot and finish brand films, product videos, social content and event coverage.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Hero CTA Button Label",
      type: "string",
      description: "Label for the primary call-to-action button.",
      fieldset: "hero",
      initialValue: "Explore Our Work",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroCtaHref",
      title: "Hero CTA Link URL",
      type: "string",
      fieldset: "hero",
      initialValue: "/work",
      validation: (Rule) => Rule.required(),
    }),

    // --- 2. HERO SHOWCASE CARDS ---
    defineField({
      name: "heroShowcaseCards",
      title: "Hero Showcase Fan-Out Cards (5 Cards)",
      type: "array",
      fieldset: "heroShowcase",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Card Title", type: "string" }),
            defineField({ name: "description", title: "Card Description", type: "text", rows: 2 }),
            defineVideoUploadField({
              name: "videoFile",
              title: "Video File Upload",
              description: "Direct upload of short background loop.",
              maxSizeMB: 20,
            }),
            defineField({
              name: "videoSrc",
              title: "External Video URL / Fallback Path",
              type: "string",
              description: "Optional fallback path or external URL if not uploading directly.",
            }),
            defineField({ name: "rotationDeg", title: "Fan-Out Angle (Degrees)", type: "number" }),
          ],
        },
      ],
    }),

    // --- 3. SERVICES SECTION HEADER ---
    defineField({
      name: "servicesBadge",
      title: "Services Section Badge",
      type: "string",
      fieldset: "servicesHeader",
      initialValue: "Our Creative Services",
    }),
    defineField({
      name: "servicesTitleLine1",
      title: "Services Section Title Line 1",
      type: "string",
      fieldset: "servicesHeader",
      initialValue: "Creative Solutions That",
    }),
    defineField({
      name: "servicesTitleLine2",
      title: "Services Section Title Line 2",
      type: "string",
      fieldset: "servicesHeader",
      initialValue: "Make an Impact",
    }),

    // --- 4. FEATURED WORKS HEADER ---
    defineField({
      name: "worksBadge",
      title: "Featured Works Section Badge",
      type: "string",
      fieldset: "worksHeader",
      initialValue: "Featured Works",
    }),
    defineField({
      name: "worksHeadline",
      title: "Featured Works Headline",
      type: "string",
      fieldset: "worksHeader",
      initialValue: "Creativity in Every Frame",
    }),

    // --- 5. ABOUT SECTION ---
    defineField({
      name: "aboutBadge",
      title: "About Badge Text",
      type: "string",
      fieldset: "about",
      initialValue: "About Us",
    }),
    defineField({
      name: "aboutTitleLine1",
      title: "About Title Line 1",
      type: "string",
      fieldset: "about",
      initialValue: "The Story Behind",
    }),
    defineField({
      name: "aboutTitleLine2",
      title: "About Title Line 2",
      type: "string",
      fieldset: "about",
      initialValue: "Our Creativity",
    }),
    defineField({
      name: "aboutStoryHighlight",
      title: "Story Highlight Text (Lead Sentence)",
      type: "text",
      rows: 2,
      fieldset: "about",
      initialValue: "You talk to the same few people throughout.",
    }),
    defineField({
      name: "aboutStoryBody",
      title: "Story Body Text (Supporting Copy)",
      type: "text",
      rows: 3,
      fieldset: "about",
      initialValue:
        "We fix the scope, agree the revision rounds up front and give you a delivery date we can meet.",
    }),
    defineField({
      name: "aboutRibbonItems",
      title: "Marquee Ribbon Items",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "about",
      initialValue: [
        "We turn ideas into visual stories",
        "We create with purpose",
        "We bring brands to life",
      ],
    }),
    defineField({
      name: "aboutCtaLabel",
      title: "About CTA Button Label",
      type: "string",
      fieldset: "about",
      initialValue: "About the Studio",
    }),
    defineField({
      name: "aboutCtaHref",
      title: "About CTA Button Link",
      type: "string",
      fieldset: "about",
      initialValue: "/about",
    }),
    defineVideoUploadField({
      name: "aboutVideoFile",
      title: "About Studio Video Reel Upload",
      description: "Direct upload of the background video reel displayed in the About section.",
      fieldset: "about",
      maxSizeMB: 20,
    }),
    defineField({
      name: "aboutVideoAlt",
      title: "About Video Alt Text (Accessibility)",
      type: "string",
      description: "Accessible description of the studio reel.",
      fieldset: "about",
      initialValue: "Studio Creative Production Video Reel",
    }),

    // --- 6. WHY CHOOSE US SECTION ---
    defineField({
      name: "whyChooseUsBadge",
      title: "Why Choose Us Badge",
      type: "string",
      fieldset: "whyChooseUs",
      initialValue: "Why Choose Us",
    }),
    defineField({
      name: "whyChooseUsHeadlineLine1",
      title: "Why Choose Us Headline Line 1",
      type: "string",
      fieldset: "whyChooseUs",
      initialValue: "Why Brands Trust Our",
    }),
    defineField({
      name: "whyChooseUsHeadlineLine2",
      title: "Why Choose Us Headline Line 2",
      type: "string",
      fieldset: "whyChooseUs",
      initialValue: "Creative Vision",
    }),
    defineField({
      name: "whyChooseUsCards",
      title: "Value Cards (01 to 06)",
      type: "array",
      fieldset: "whyChooseUs",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "number", title: "Card Number (e.g. 01)", type: "string" }),
            defineField({ name: "title", title: "Card Title", type: "string" }),
            defineField({ name: "description", title: "Card Description", type: "text", rows: 3 }),
          ],
        },
      ],
    }),

    // --- 7. TESTIMONIALS SECTION HEADER ---
    defineField({
      name: "testimonialsBadge",
      title: "Testimonials Badge",
      type: "string",
      fieldset: "testimonialsHeader",
      initialValue: "What Our Clients Say",
    }),
    defineField({
      name: "testimonialsHeadlineLine1",
      title: "Testimonials Headline Line 1",
      type: "string",
      fieldset: "testimonialsHeader",
      initialValue: "Beyond Projects,",
    }),
    defineField({
      name: "testimonialsHeadlineLine2",
      title: "Testimonials Headline Line 2",
      type: "string",
      fieldset: "testimonialsHeader",
      initialValue: "Building Relationships",
    }),

    // --- 8. FAQ SECTION HEADER ---
    defineField({
      name: "faqBadge",
      title: "FAQ Section Badge",
      type: "string",
      fieldset: "faqHeader",
      initialValue: "Got Questions?",
    }),
    defineField({
      name: "faqHeadline",
      title: "FAQ Section Headline",
      type: "string",
      fieldset: "faqHeader",
      initialValue: "Frequently Asked Questions",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page",
        subtitle: "Hero, Showcase, Services, Works, About, Why Choose Us, Testimonials, FAQ",
      };
    },
  },
});
