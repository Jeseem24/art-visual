/**
 * Creative Process section data definitions
 */

export interface ProcessStepItem {
  id: string;
  number: number;
  label: string;
  labelAlign?: "center" | "left" | "right";
  title: string;
  description: string;
  /** Desktop percentage layout coordinates inside 1920x1850 timeline canvas */
  desktopPosition: {
    badgeLeft: string;
    badgeTop: string;
    cardLeft: string;
    cardTop: string;
  };
}

export interface CreativeProcessData {
  badge: {
    text: string;
  };
  headline: {
    line1: string;
    line2: string;
  };
  steps: ProcessStepItem[];
}

export const CREATIVE_PROCESS_DEFAULTS: CreativeProcessData = {
  badge: {
    text: "Our Creative Process",
  },
  headline: {
    line1: "From the First Idea to the Final",
    line2: "Frame, We Make Every Step Count.",
  },
  steps: [
    {
      id: "step-discover",
      number: 1,
      label: "Discover",
      title: "Understanding Your Vision",
      description:
        "We start by understanding your goals, ideas, audience, and expectations to build a clear creative direction for your project.",
      desktopPosition: {
        badgeLeft: "16.25%",
        badgeTop: "0.65%",
        cardLeft: "6.88%",
        cardTop: "10.54%",
      },
    },
    {
      id: "step-plan",
      number: 2,
      label: "Plan",
      title: "Turning Ideas Into Concepts",
      description:
        "Our team develops creative concepts, scripts, storyboards, and production plans to ensure everything is ready before filming begins.",
      desktopPosition: {
        badgeLeft: "42.81%",
        badgeTop: "15.84%",
        cardLeft: "49.48%",
        cardTop: "10.54%",
      },
    },
    {
      id: "step-produce",
      number: 3,
      label: "Produce",
      title: "Bringing Stories to Life",
      description:
        "With the right equipment, creative direction, and professional expertise, we capture every scene with precision and cinematic quality.",
      desktopPosition: {
        badgeLeft: "30.94%",
        badgeTop: "40.81%",
        cardLeft: "19.32%",
        cardTop: "49.08%",
      },
    },
    {
      id: "step-edit",
      number: 4,
      label: "Edit",
      labelAlign: "right",
      title: "Crafting the Final Experience",
      description:
        "We transform raw footage into engaging visual stories through professional editing, colour grading, sound design, and visual effects.",
      desktopPosition: {
        badgeLeft: "64.06%",
        badgeTop: "48.43%",
        cardLeft: "70.94%",
        cardTop: "47.24%",
      },
    },
    {
      id: "step-deliver",
      number: 5,
      label: "Deliver",
      title: "Ready to Make an Impact",
      description:
        "We carefully review and deliver the final production in the required formats, ensuring every detail meets our quality standards and your expectations.",
      desktopPosition: {
        badgeLeft: "78.18%",
        badgeTop: "79.14%",
        cardLeft: "68.75%",
        cardTop: "88.00%",
      },
    },
  ],
};

