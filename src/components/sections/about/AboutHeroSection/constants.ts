/**
 * About Hero section constants and data definitions
 */

export interface AboutHeroData {
  headline: {
    line1: string;
    line2Prefix: string;
    line2Highlight: string;
  };
  subtitle: string;
}

export const ABOUT_HERO_DEFAULTS: AboutHeroData = {
  headline: {
    line1: "We Turn Stories Into",
    line2Prefix: "Visual",
    line2Highlight: "Experiences.",
  },
  subtitle:
    "We plan, shoot and finish brand films, product videos, social content and event coverage.",
};

