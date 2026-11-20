import { groq } from "next-sanity";

/**
 * Fetch Home Page copy and structured sections
 */
export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage"][0] {
    heroLocationPill,
    heroHeadlineLine1Text,
    heroHeadlineLine1Highlight,
    heroHeadlineLine2Text,
    heroSubtitle,
    heroCtaLabel,
    heroCtaHref,
    heroShowcaseCards[] {
      _key,
      title,
      description,
      "videoSrc": coalesce(videoFile.asset->url, videoSrc),
      rotationDeg
    },
    aboutBadge,
    aboutTitleLine1,
    aboutTitleLine2,
    aboutStoryHighlight,
    aboutStoryBody,
    aboutRibbonItems,
    aboutCtaLabel,
    aboutCtaHref,
    "aboutVideoSrc": coalesce(aboutVideoFile.asset->url, "/videos/about/studio-reel.mp4"),
    aboutVideoAlt,
    servicesBadge,
    servicesTitleLine1,
    servicesTitleLine2,
    worksBadge,
    worksHeadline,
    whyChooseUsBadge,
    whyChooseUsHeadlineLine1,
    whyChooseUsHeadlineLine2,
    whyChooseUsCards[] {
      number,
      title,
      description
    },
    testimonialsBadge,
    testimonialsHeadlineLine1,
    testimonialsHeadlineLine2,
    faqBadge,
    faqHeadline
  }
`;

/**
 * Fetch About Page content and structured sections
 */
export const ABOUT_PAGE_QUERY = groq`
  *[_type == "aboutPage"][0] {
    heroHeadlineLine1,
    heroHeadlineLine2Prefix,
    heroHeadlineLine2Highlight,
    heroSubtitle,
    whoWeAreBadge,
    whoWeAreHeadlineLine1,
    whoWeAreHeadlineLine2,
    whoWeAreParagraphs,
    "whoWeAreImageSrc": whoWeAreImage.asset->url,
    visionMissionItems[] {
      title,
      description,
      variant
    },
    whatWeDoBadge,
    whatWeDoHeadlineLine1,
    whatWeDoHeadlineLine2,
    whatWeDoCards[] {
      title,
      description,
      icon
    },
    processBadge,
    processHeadlineLine1,
    processHeadlineLine2,
    processSteps[] {
      number,
      label,
      title,
      description
    }
  }
`;

/**
 * Fetch Services Page content
 */
export const SERVICES_PAGE_QUERY = groq`
  *[_type == "servicesPage"][0] {
    heroHeadlineLine1,
    heroHeadlineLine2Prefix,
    heroHeadlineLine2Highlight,
    heroSubtitle,
    catalogBadge,
    catalogTitleLine1,
    catalogTitleLine2
  }
`;

/**
 * Fetch Work / Portfolio Page content
 */
export const WORK_PAGE_QUERY = groq`
  *[_type == "workPage"][0] {
    heroHeadlineLine1,
    heroHeadlineLine2Prefix,
    heroHeadlineLine2Highlight,
    heroSubtitle,
    categories
  }
`;

/**
 * Fetch Contact Page content
 */
export const CONTACT_PAGE_QUERY = groq`
  *[_type == "contactPage"][0] {
    heroHeadlineLine1Prefix,
    heroHeadlineLine1Highlight,
    heroHeadlineLine2,
    heroSubtitle,
    inquiryBadge,
    inquiryHeadline,
    formTitle,
    submitButtonLabel,
    "studioImageSrc": studioImage.asset->url,
    serviceOptions[] {
      value,
      label
    },
    contactEmail,
    contactPhone,
    contactLocation
  }
`;

/**
 * Fetch all services for the homepage grid & services catalog
 */
export const SERVICES_QUERY = groq`
  *[_type == "serviceItem"] | order(orderRank asc, order asc) {
    "id": _id,
    title,
    description,
    "slug": slug.current,
    "videoSrc": video.asset->url,
    ctaLabel,
    order
  }
`;

/**
 * Fetch featured works for homepage showcase carousel
 */
export const FEATURED_WORKS_QUERY = groq`
  *[_type == "featuredWork" && featuredInHome == true] | order(orderRank asc, order asc) {
    "id": _id,
    "title": coalesce(projectName, title),
    "slug": slug.current,
    category,
    brandName,
    "imageSrc": image.asset->url,
    "videoSrc": video.asset->url,
    order
  }
`;

/**
 * Fetch all portfolio projects for /work page
 */
export const PORTFOLIO_WORKS_QUERY = groq`
  *[_type == "featuredWork"] | order(orderRank asc, order asc) {
    "id": _id,
    "projectName": coalesce(projectName, title),
    category,
    brandName,
    "imageSrc": image.asset->url,
    "videoSrc": video.asset->url,
    "imageAlt": coalesce(imageAlt, projectName, title),
    order
  }
`;

/**
 * Fetch client testimonials
 */
export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(orderRank asc, order asc) {
    "id": _id,
    name,
    role,
    "avatar": avatar.asset->url,
    rating,
    quote,
    order
  }
`;

/**
 * Fetch FAQ items
 */
export const FAQS_QUERY = groq`
  *[_type == "faqItem"] | order(orderRank asc, order asc) {
    "id": _id,
    question,
    answer,
    order
  }
`;

/**
 * Fetch CTA banner settings
 */
export const CTA_BANNER_QUERY = groq`
  *[_type == "ctaBanner"][0] {
    badgeText,
    headlineLine1,
    headlineLine2,
    descriptionHighlight,
    descriptionBody,
    buttonLabel,
    buttonHref,
    "reelStrip1Urls": reelStrip1[].asset->url,
    "reelStrip2Urls": reelStrip2[].asset->url
  }
`;

/**
 * Fetch Navigation Header configuration
 */
export const NAVBAR_QUERY = groq`
  *[_type == "navbarSettings"][0] {
    navItems[] {
      label,
      href
    },
    ctaLabel,
    ctaHref,
    whatsappDefaultMsg
  }
`;

/**
 * Fetch Site Settings & Footer
 */
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    brandName,
    tagline,
    "logoUrl": logo.asset->url,
    "faviconUrl": favicon.asset->url,
    brandDescription,
    metaTitle,
    metaDescription,
    metaKeywords,
    "ogImageUrl": ogImage.asset->url,
    "ogImageAlt": ogImage.alt,
    googleSiteVerification,
    whatsappNumber,
    contactEmail,
    contactPhone,
    location,
    quickLinks[] {
      label,
      href
    },
    servicesList[] {
      label,
      href
    },
    socialInstagram,
    socialYoutube,
    socialFacebook,
    socialTwitter,
    copyright,
    legalLinks[] {
      label,
      href
    }
  }
`;
