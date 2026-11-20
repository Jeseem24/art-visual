/**
 * FAQ section data definitions
 */

export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export interface FAQSectionData {
  badge: {
    text: string;
  };
  headline: {
    text: string;
  };
  items: FAQItemData[];
}

export const FAQ_DEFAULTS: FAQSectionData = {
  badge: {
    text: "Got Questions?",
  },
  headline: {
    text: "Frequently Asked Questions",
  },
  items: [
    {
      id: "faq-1",
      question: "What video production services does Art Visual specialize in?",
      answer:
        "We specialize in end-to-end video production, including brand films, commercial advertisements, product videos, corporate documentaries, and social media reels. Our team handles every phase from creative ideation to final mastering.",
      defaultOpen: false,
    },
    {
      id: "faq-2",
      question: "What is the typical turnaround time for a video project?",
      answer:
        "Turnaround depends on project scope. Social reels and product showcases typically deliver within 1 to 2 weeks, while full-scale brand films and commercial campaigns generally take 3 to 5 weeks from pre-production to final delivery.",
      defaultOpen: false,
    },
    {
      id: "faq-3",
      question: "Do you handle concept development, scripting, and casting?",
      answer:
        "Yes. We provide complete pre-production services including creative concept development, scriptwriting, storyboarding, location scouting, talent casting, and shoot scheduling.",
      defaultOpen: false,
    },
    {
      id: "faq-4",
      question: "What deliverables and video formats do we receive?",
      answer:
        "You receive full commercial broadcast-ready 4K master files (ProRes and MP4), plus optimized vertical (9:16) and square (1:1) cutdowns tailored for social media, YouTube, and digital ad campaigns.",
      defaultOpen: false,
    },
  ],
};
