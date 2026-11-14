/**
 * Why Choose Us section data definitions
 */

export interface ValueCardItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface WhyChooseUsData {
  badge: {
    text: string;
  };
  headline: {
    text: string;
    line1?: string;
    line2?: string;
  };
  items: ValueCardItem[];
}

export const WHY_CHOOSE_US_DEFAULTS: WhyChooseUsData = {
  badge: {
    text: "Why Choose Us",
  },
  headline: {
    text: "Why Brands Trust Our Creative Vision",
    line1: "Why Brands Trust Our",
    line2: "Creative Vision",
  },
  items: [
    {
      id: "creative-storytelling",
      number: "01",
      title: "Creative Storytelling",
      description:
        "We transform unique ideas into compelling visual stories that capture attention, connect with audiences, and bring every brand's vision to life.",
    },
    {
      id: "quality-production",
      number: "02",
      title: "Quality Production",
      description:
        "We deliver high-quality visuals through careful planning, professional execution, and attention to every detail, ensuring a polished final result.",
    },
    {
      id: "brand-focused-approach",
      number: "03",
      title: "Brand-Focused Approach",
      description:
        "Every video is thoughtfully designed to capture your brand's unique identity, communicate its vision, highlight its values.",
    },
    {
      id: "end-to-end-creativity",
      number: "04",
      title: "End-to-End Creativity",
      description:
        "From the initial concept to the final production, we carefully shape every detail, combining creative ideas, thoughtful planning.",
    },
    {
      id: "audience-engagement",
      number: "05",
      title: "Audience Engagement",
      description:
        "We create captivating video content that grabs attention, keeps audiences engaged, and helps brands build stronger connections with their viewers.",
    },
    {
      id: "creative-excellence",
      number: "06",
      title: "Creative Excellence",
      description:
        "We combine fresh ideas, visual creativity, and thoughtful execution to produce memorable videos that make every brand stand out.",
    },
  ],
};
