import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings & Footer",
  type: "document",
  fieldsets: [
    { name: "branding", title: "Branding & Bio", options: { collapsible: true, collapsed: false } },
    { name: "seo", title: "Search Engine Optimization (SEO)", options: { collapsible: true, collapsed: false } },
    { name: "contact", title: "Contact Information", options: { collapsible: true, collapsed: true } },
    { name: "navigation", title: "Footer Navigation Lists", options: { collapsible: true, collapsed: true } },
    { name: "social", title: "Social Media Links", options: { collapsible: true, collapsed: true } },
    { name: "legal", title: "Legal & Copyright", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // --- BRANDING ---
    defineField({
      name: "brandName",
      title: "Brand Name (Site Title)",
      type: "string",
      description: "Company display name shown in navigation, footer, and browser title bar.",
      fieldset: "branding",
      initialValue: "Art Visual",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Brand tagline appended to browser tab title (e.g. 'Films that make brands worth watching').",
      fieldset: "branding",
      initialValue: "Films that make brands worth watching",
    }),
    defineField({
      name: "logo",
      title: "Primary Website Logo",
      type: "image",
      description: "Upload custom logo image (PNG/SVG with transparent background).",
      fieldset: "branding",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "favicon",
      title: "Website Favicon",
      type: "image",
      description: "Square favicon icon displayed in browser tabs (PNG or ICO, recommended 64x64px or 512x512px).",
      fieldset: "branding",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "brandDescription",
      title: "Brand Short Description / Bio",
      type: "text",
      rows: 3,
      description: "Short company bio shown in the footer bio column and search engine meta description.",
      fieldset: "branding",
      initialValue:
        "We bring ideas to life through creative storytelling and impactful video production that helps brands connect with their audience.",
      validation: (Rule) => Rule.required(),
    }),

    // --- SEARCH ENGINE OPTIMIZATION (SEO) ---
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Default search engine and browser tab title (fallback for pages without custom title).",
      fieldset: "seo",
      initialValue: "Art Visual | Films that make brands worth watching",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Default search engine description summary shown in search results.",
      fieldset: "seo",
      initialValue:
        "We bring ideas to life through creative storytelling and impactful video production that helps brands connect with their audience.",
    }),
    defineField({
      name: "metaKeywords",
      title: "Meta Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Target search keywords and indexing tags for SEO.",
      fieldset: "seo",
      initialValue: [
        "video production",
        "brand films",
        "commercial video",
        "creative agency",
        "corporate video",
        "product videography",
      ],
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph (Social Share) Image",
      type: "image",
      description: "Default social preview image displayed when sharing links on social platforms (1200x630px recommended).",
      fieldset: "seo",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Accessibility and SEO description for social share image.",
          initialValue: "Art Visual - Films that make brands worth watching",
        }),
      ],
    }),
    defineField({
      name: "googleSiteVerification",
      title: "Google Search Console Verification Token",
      type: "string",
      description: "Google Search Console verification code (content attribute of google-site-verification meta tag).",
      fieldset: "seo",
    }),

    // --- CONTACT ---
    defineField({
      name: "contactEmail",
      title: "Contact Email Address",
      type: "string",
      description: "Primary client inquiry email displayed across footer and contact points.",
      fieldset: "contact",
      initialValue: "hello@artvisual.com",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone Number",
      type: "string",
      description: "Office or studio call line (e.g. +91 98765 43210).",
      fieldset: "contact",
      initialValue: "+91 98765 43210",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number (International format)",
      type: "string",
      description: "Direct WhatsApp contact number (with country code, e.g. +91 98765 43210).",
      fieldset: "contact",
      initialValue: "+91 98765 43210",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Studio Location",
      type: "string",
      description: "Headquarters or base city shown in footer and contact sections.",
      fieldset: "contact",
      initialValue: "Chennai, India",
      validation: (Rule) => Rule.required(),
    }),

    // --- NAVIGATION LISTS ---
    defineField({
      name: "quickLinks",
      title: "Footer Quick Links",
      type: "array",
      fieldset: "navigation",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Link Label", type: "string" }),
            defineField({ name: "href", title: "Link URL", type: "string" }),
          ],
        },
      ],
      initialValue: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Projects", href: "/work" },
        { label: "Contact Us", href: "/contact" },
      ],
    }),
    defineField({
      name: "servicesList",
      title: "Footer Services Links",
      type: "array",
      fieldset: "navigation",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Service Title", type: "string" }),
            defineField({ name: "href", title: "Service URL", type: "string" }),
          ],
        },
      ],
      initialValue: [
        { label: "Brand Video Production", href: "/services/brand-video-production" },
        { label: "Corporate Video Production", href: "/services/corporate-video-production" },
        { label: "Product Videography", href: "/services/product-videography" },
        { label: "Social Media Video Content", href: "/services/social-media-video-content" },
        { label: "Promotional & Advertising Videos", href: "/services/promotional-advertising-videos" },
        { label: "Commercial Video Production", href: "/services/commercial-video-production" },
      ],
    }),

    // --- SOCIAL LINKS ---
    defineField({
      name: "socialInstagram",
      title: "Instagram URL",
      type: "url",
      fieldset: "social",
      initialValue: "https://instagram.com",
    }),
    defineField({
      name: "socialFacebook",
      title: "Facebook URL",
      type: "url",
      fieldset: "social",
      initialValue: "https://facebook.com",
    }),
    defineField({
      name: "socialTwitter",
      title: "X (Twitter) URL",
      type: "url",
      fieldset: "social",
      initialValue: "https://x.com",
    }),
    defineField({
      name: "socialYoutube",
      title: "YouTube URL",
      type: "url",
      fieldset: "social",
      initialValue: "https://youtube.com",
    }),

    // --- LEGAL & COPYRIGHT ---
    defineField({
      name: "copyright",
      title: "Copyright Notice Text",
      type: "string",
      fieldset: "legal",
      initialValue: "© 2026 Art Visual. All Rights Reserved.",
    }),
    defineField({
      name: "legalLinks",
      title: "Legal Links",
      type: "array",
      fieldset: "legal",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Link Label", type: "string" }),
            defineField({ name: "href", title: "Link URL", type: "string" }),
          ],
        },
      ],
      initialValue: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings & Footer",
        subtitle: "Global Branding, SEO, Contacts, Navigation & Social Links",
      };
    },
  },
});
