/**
 * Contact Hero section constants and data definitions
 */

export interface ContactHeroData {
  headline: {
    line1Prefix: string;
    line1Highlight: string;
    line2: string;
  };
  subtitle: string;
}

export const CONTACT_HERO_DEFAULTS: ContactHeroData = {
  headline: {
    line1Prefix: "Let's Create",
    line1Highlight: "Something",
    line2: "Extraordinary.",
  },
  subtitle:
    "Have a creative idea or a project in mind? We'd love to hear from you. Let's connect and bring your vision to life through powerful visual storytelling.",
};
