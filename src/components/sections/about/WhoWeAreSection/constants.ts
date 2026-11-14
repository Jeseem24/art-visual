/**
 * Who We Are section data definitions
 */

export interface WhoWeAreData {
  badge: {
    text: string;
  };
  headline: {
    line1: string;
    line2: string;
  };
  paragraphs: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export const WHO_WE_ARE_DEFAULTS: WhoWeAreData = {
  badge: {
    text: "Who We Are",
  },
  headline: {
    line1: "Where Creativity Meets",
    line2: "Storytelling.",
  },
  paragraphs: [
    "We are a creative video production team passionate about transforming ideas into powerful visual stories. From concept development to final production, we combine creativity, technical expertise, and cinematic storytelling to create videos that connect with audiences.",
    "Our team brings together talented filmmakers, cinematographers, editors, and creative minds who work together to turn every vision into a meaningful visual experience.",
        "Our team brings together talented filmmakers, cinematographers, editors, and creative minds who work together to turn every vision into a meaningful visual experience.",

  ],
  image: {
    src: "/images/about/who-we-are.png",
    alt: "Art Visual Creative Studio Team and Production Gear",
    width: 735,
    height: 783,
  },
};

