/**
 * About section data definitions
 */

export interface AboutSectionData {
  badge: {
    text: string;
  };
  headline: {
    text: string;
    line1?: string;
    line2?: string;
  };
  story: {
    highlight: string;
    body: string;
  };
  media: {
    videoSrc: string;
    posterSrc: string;
    alt: string;
  };
  photo?: {
    src: string;
    alt: string;
  };
  ribbon: {
    items: string[];
  };
  cta: {
    label: string;
    href: string;
  };
}

export const ABOUT_SECTION_DEFAULTS: AboutSectionData = {
  badge: {
    text: "About Us",
  },
  headline: {
    line1: "The Story Behind",
    line2: "Our Creativity",
    text: "The Story Behind\nOur Creativity",
  },
  story: {
    highlight: "You talk to the same few people throughout.",
    body: " We fix the scope, agree the revision rounds up front and give you a delivery date we can meet.",
  },
  media: {
    videoSrc: "/videos/about/studio-reel.mp4",
    posterSrc: "/images/about/studio-inspiration.png",
    alt: "Studio Creative Production Video Reel",
  },
  photo: {
    src: "/images/about/studio-inspiration.png",
    alt: "Studio Creative Production Inspiration",
  },
  ribbon: {
    items: [
      "We turn ideas into visual stories",
      "We create with purpose",
      "We bring brands to life",
    ],
  },
  cta: {
    label: "About the Studio",
    href: "/about",
  },
};
