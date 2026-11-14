/**
 * Vision & Mission section data definitions
 */

export interface VisionMissionItem {
  id: string;
  title: string;
  description: string;
  variant: "solidRed" | "outlined";
}

export interface VisionMissionData {
  items: VisionMissionItem[];
}

export const VISION_MISSION_DEFAULTS: VisionMissionData = {
  items: [
    {
      id: "our-vision",
      title: "Our Vision",
      description:
        "Our team brings together talented filmmakers, cinematographers, editors, and creative minds who work together to turn every vision into a meaningful visual experience.",
      variant: "solidRed",
    },
    {
      id: "our-mission",
      title: "Our Mission",
      description:
        "To bring every client's vision to life through creative storytelling, professional production, and exceptional visual quality. We combine innovative ideas,",
      variant: "outlined",
    },
  ],
};

