/**
 * Services Hero section constants and data definitions
 */

export interface ServicesHeroData {
  headline: {
    line1: string;
    line2Prefix: string;
    line2Highlight: string;
  };
  subtitle: string;
}

export const SERVICES_HERO_DEFAULTS: ServicesHeroData = {
  headline: {
    line1: "Creative Vision. Powerful",
    line2Prefix: "Visuals. Meaningful",
    line2Highlight: "Stories.",
  },
  subtitle:
    "We bring ideas to life through creative video production, cinematic storytelling, and innovative visual solutions.",
};

