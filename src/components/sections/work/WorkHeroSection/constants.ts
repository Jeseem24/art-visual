/**
 * Work Hero section constants and data definitions
 */

export interface WorkHeroData {
  headline: {
    line1: string;
    line2Prefix: string;
    line2Highlight: string;
  };
  subtitle: string;
}

export const WORK_HERO_DEFAULTS: WorkHeroData = {
  headline: {
    line1: "Bringing Stories to Life",
    line2Prefix: "Through",
    line2Highlight: "Our Work.",
  },
  subtitle:
    "Explore our creative portfolio of brand films, commercials, product videos, and visual stories crafted with creativity and passion.",
};
