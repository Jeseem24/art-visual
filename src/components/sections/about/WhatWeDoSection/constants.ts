/**
 * What We Do section data definitions
 */

export interface WhatWeDoItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WhatWeDoData {
  badge: {
    text: string;
  };
  headline: {
    line1: string;
    line2: string;
  };
  items: WhatWeDoItem[];
}

export const WHAT_WE_DO_DEFAULTS: WhatWeDoData = {
  badge: {
    text: "What We Do",
  },
  headline: {
    line1: "Bringing Ideas to Life Through",
    line2: "Creative Visual Production.",
  },
  items: [
    {
      id: "video-production",
      title: "Video Production",
      description:
        "Complete video production solutions, from initial concepts to final delivery.",
      icon: "/images/about/icons/video-production.svg",
    },
    {
      id: "commercial-ad-films",
      title: "Commercial & Ad Films",
      description:
        "advertisements that capture attention and connect initial concepts to final delivery.",
      icon: "/images/about/icons/commercial-films.svg",
    },
    {
      id: "brand-films",
      title: "Brand Films",
      description:
        "Powerful brand stories that communicate your identity, values, and vision.",
      icon: "/images/about/icons/brand-films.svg",
    },
    {
      id: "cinematography",
      title: "Cinematography",
      description:
        "Beautifully crafted visuals with cinematic techniques and professional work.",
      icon: "/images/about/icons/cinematography.svg",
    },
    {
      id: "documentary-films",
      title: "Documentary Films",
      description:
        "Authentic storytelling that captures real people, experiences, moments.",
      icon: "/images/about/icons/documentary-films.svg",
    },
    {
      id: "event-videography",
      title: "Event Videography",
      description:
        "Capturing events and unforgettable moments professional film making.",
      icon: "/images/about/icons/event-videography.svg",
    },
    {
      id: "photography",
      title: "Photography",
      description:
        "Creative and photography that captures every detail with purpose.",
      icon: "/images/about/icons/photography.svg",
    },
    {
      id: "motion-graphics-animation",
      title: "Motion Graphics & Animation",
      description:
        "Dynamic animations and visual elements that bring ideas to life.",
      icon: "/images/about/icons/motion-graphics.svg",
    },
  ],
};

