import { siteConfig } from "@/config/site";
import type {
  WithContext,
  OrganizationSchema,
  WebSiteSchema,
  BreadcrumbListSchema,
  FAQPageSchema,
  ServiceSchema,
  ItemListSchema,
  VideoObjectSchema,
} from "./types";

/**
 * Normalizes absolute URL given a relative or absolute path.
 */
export function getAbsoluteUrl(path: string = "", baseUrl?: string): string {
  const root = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
  const cleanRoot = root.replace(/\/+$/, "");

  if (!path) return cleanRoot;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanRoot}${cleanPath}`;
}

/**
 * Builds Schema.org Organization & LocalBusiness/ProfessionalService structured data.
 * Complies with Google Business, Rich Results, and local search standards.
 */
export function buildOrganizationSchema(options?: {
  siteUrl?: string;
  brandName?: string;
  logoUrl?: string;
  email?: string;
  phone?: string;
  location?: string;
}): WithContext<OrganizationSchema> {
  const siteUrl = getAbsoluteUrl("", options?.siteUrl);
  const brandName = options?.brandName || siteConfig.name;
  const logo = getAbsoluteUrl(
    options?.logoUrl || "/images/art-visual-logo.png",
    siteUrl
  );
  const email = options?.email || siteConfig.contact.email;
  const phone = options?.phone || siteConfig.contact.phoneRaw;

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": `${siteUrl}/#organization`,
    name: brandName,
    legalName: "Art Visual Production Private Limited",
    alternateName: [
      "Art Visual",
      "Art Visual Films",
      "Art Visual Studio",
      "Art Visual Chennai",
      "Art Visual Video Production",
    ],
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#logo`,
      url: logo,
      contentUrl: logo,
      caption: `${brandName} Logo`,
      width: 1200,
      height: 630,
    },
    image: [
      logo,
      getAbsoluteUrl("/images/works/monsoon-roast.png", siteUrl),
      getAbsoluteUrl("/images/about/studio-inspiration.png", siteUrl),
    ],
    description:
      "Art Visual is a commercial video production company based in Chennai, India and operating worldwide, crafting brand films, commercial ads, product videos, corporate documentaries, and social video campaigns.",
    priceRange: "$$ - $$$",
    currenciesAccepted: "INR, USD, EUR, GBP, AED",
    paymentAccepted: "Cash, Credit Card, Bank Transfer, Wire Transfer",
    telephone: phone,
    email: email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 45, Anna Salai, Guindy",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600032",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.0067,
      longitude: 80.203,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Chennai",
      },
      {
        "@type": "State",
        name: "Tamil Nadu",
      },
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "AdministrativeArea",
        name: "Worldwide",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: phone,
        contactType: "customer service",
        email: email,
        areaServed: ["IN", "Worldwide"],
        availableLanguage: ["English", "Tamil", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: phone,
        contactType: "sales",
        email: email,
        areaServed: ["IN", "Worldwide"],
        availableLanguage: ["English", "Tamil", "Hindi"],
      },
    ],
    sameAs: siteConfig.socials.map((s) => s.url),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Video Production Services",
      itemListElement: siteConfig.servicesList.map((srv) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: srv.title,
          description: `Professional ${srv.title.toLowerCase()} services by Art Visual.`,
        },
      })),
    },
  };
}

/**
 * Builds Schema.org WebSite structured data with SearchAction.
 * Enables Google Sitelinks Search Box eligibility.
 */
export function buildWebSiteSchema(options?: {
  siteUrl?: string;
  brandName?: string;
}): WithContext<WebSiteSchema> {
  const siteUrl = getAbsoluteUrl("", options?.siteUrl);
  const brandName = options?.brandName || siteConfig.name;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: brandName,
    alternateName: [
      `${brandName} Films`,
      `${brandName} Video Production`,
      "Art Visual Commercial Production",
    ],
    url: siteUrl,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: brandName,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/work?query={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Builds Schema.org BreadcrumbList structured data for any page path.
 */
export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
  options?: { siteUrl?: string }
): WithContext<BreadcrumbListSchema> {
  const siteUrl = getAbsoluteUrl("", options?.siteUrl);

  const fullItems = [
    { name: "Home", path: "/" },
    ...items.filter((item) => item.path !== "/"),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path, siteUrl),
    })),
  };
}

/**
 * Builds Schema.org FAQPage structured data from question/answer items.
 */
export function buildFAQSchema(
  items: Array<{ question: string; answer: string }>,
  options?: { id?: string }
): WithContext<FAQPageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(options?.id ? { "@id": options.id } : {}),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Builds Schema.org Service structured data for individual service offerings.
 */
export function buildServiceSchema(
  service: {
    title: string;
    description: string;
    slug: string;
    imageSrc?: string;
    posterSrc?: string;
  },
  options?: { siteUrl?: string; brandName?: string }
): WithContext<ServiceSchema> {
  const siteUrl = getAbsoluteUrl("", options?.siteUrl);
  const brandName = options?.brandName || siteConfig.name;
  const serviceUrl = `${siteUrl}/services/${service.slug}`;
  const image = service.imageSrc || service.posterSrc || "/opengraph-image";

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    name: service.title,
    description: service.description,
    serviceType: "Video Production",
    category: "Commercial Film & Video Production",
    url: serviceUrl,
    image: getAbsoluteUrl(image, siteUrl),
    provider: {
      "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: brandName,
      url: siteUrl,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Chennai",
      },
      {
        "@type": "State",
        name: "Tamil Nadu",
      },
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "AdministrativeArea",
        name: "Worldwide",
      },
    ],
    termsOfService: `${siteUrl}/contact`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Deliverables`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Master 4K Video Files",
            description:
              "ProRes and high-bitrate MP4 masters ready for broadcast, theatre, and web.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Social Media Cutdowns",
            description:
              "High-retention 15s and 30s vertical (9:16) reels formatted for Instagram, TikTok, and YouTube Shorts.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "High-Resolution Frame Grabs",
            description:
              "Key promotional stills exported for web, press, and print marketing.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Commercial Usage Rights",
            description:
              "Unrestricted perpetuity licensing for all brand channels and advertising.",
          },
        },
      ],
    },
  };
}

/**
 * Builds Schema.org ItemList / Service Catalog for the main /services page.
 */
export function buildServicesCatalogSchema(
  services: Array<{
    title: string;
    description: string;
    slug: string;
    imageSrc?: string;
    posterSrc?: string;
  }>,
  options?: { siteUrl?: string; brandName?: string }
): WithContext<ItemListSchema> {
  const siteUrl = getAbsoluteUrl("", options?.siteUrl);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/services#catalog`,
    name: "Art Visual Video Production Services",
    description:
      "Comprehensive commercial video production services from creative concept to final mastering.",
    itemListElement: services.map((srv, index) => {
      const serviceSchema = buildServiceSchema(srv, options);
      const itemWithoutContext = { ...serviceSchema };
      delete (itemWithoutContext as { "@context"?: string })["@context"];
      return {
        "@type": "ListItem",
        position: index + 1,
        item: itemWithoutContext,
      };
    }),
  };
}

/**
 * Builds Schema.org VideoObject structured data for featured video showreels.
 * Fully compatible with Google Video Search, rich snippets, and Video carousels.
 */
export function buildVideoObjectSchema(
  video: {
    name: string;
    description: string;
    thumbnailUrl: string;
    contentUrl: string;
    embedUrl?: string;
    uploadDate?: string;
    duration?: string;
  },
  options?: { siteUrl?: string; brandName?: string }
): WithContext<VideoObjectSchema> {
  const siteUrl = getAbsoluteUrl("", options?.siteUrl);
  const brandName = options?.brandName || siteConfig.name;
  const contentUrl = getAbsoluteUrl(video.contentUrl, siteUrl);
  const thumbnailUrl = getAbsoluteUrl(video.thumbnailUrl, siteUrl);

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${contentUrl}#video`,
    name: video.name,
    description: video.description,
    thumbnailUrl: [thumbnailUrl],
    uploadDate: video.uploadDate || "2026-01-01T00:00:00Z",
    contentUrl: contentUrl,
    embedUrl: video.embedUrl ? getAbsoluteUrl(video.embedUrl, siteUrl) : contentUrl,
    duration: video.duration || "PT1M30S",
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: brandName,
      logo: {
        "@type": "ImageObject",
        url: getAbsoluteUrl("/images/art-visual-logo.png", siteUrl),
      },
    },
  };
}

/**
 * Featured video showreels definition for Art Visual production showcase.
 */
export const FEATURED_SHOWREEL_VIDEOS = [
  {
    name: "Art Visual Brand Video Showreel",
    description:
      "Cinematic brand video production showreel showcasing narrative commercials and high-impact visual storytelling by Art Visual.",
    thumbnailUrl: "/videos/hero/brand-poster.webp",
    contentUrl: "/videos/hero/brand.mp4",
    duration: "PT1M15S",
    uploadDate: "2026-01-10T08:00:00Z",
  },
  {
    name: "Art Visual Commercial & Promotional Reel",
    description:
      "High-energy promotional and commercial advertising video reel featuring brand launch films.",
    thumbnailUrl: "/videos/hero/promotional-poster.webp",
    contentUrl: "/videos/hero/promotional.mp4",
    duration: "PT0M45S",
    uploadDate: "2026-01-12T08:00:00Z",
  },
  {
    name: "Art Visual Product Videography Reel",
    description:
      "Precision product cinematography reel showcasing macro details, lighting design, and studio production.",
    thumbnailUrl: "/videos/hero/product-poster.webp",
    contentUrl: "/videos/hero/product.mp4",
    duration: "PT0M50S",
    uploadDate: "2026-01-15T08:00:00Z",
  },
  {
    name: "Art Visual Studio Creative Reel",
    description:
      "Behind-the-scenes and studio creative film documenting our camera crews, directing talent, and post-production suites.",
    thumbnailUrl: "/images/about/studio-inspiration.png",
    contentUrl: "/videos/about/studio-reel.mp4",
    duration: "PT1M30S",
    uploadDate: "2026-01-20T08:00:00Z",
  },
] as const;
