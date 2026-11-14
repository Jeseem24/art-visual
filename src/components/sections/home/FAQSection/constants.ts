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
      question: "What types of courses does Skillanic offer?",
      answer:
        "Skillanic offers 17+ IT courses in Full Stack, AI, Cloud, Data, SAP, UI/UX, Testing, and Marketing, with hands-on projects, expert guidance, and job-ready training to help you build real-world skills.",
      defaultOpen: false,
    },
    {
      id: "faq-2",
      question: "Is Skillanic's training online or offline?",
      answer:
        "Skillanic offers both online and offline training with flexible learning options. Get real-time classes, projects, and trainer support—anytime, anywhere.",
      defaultOpen: false,
    },
    {
      id: "faq-3",
      question: "Who are the trainers at Skillanic?",
      answer:
        "Skillanic trainers are industry experts with 15+ years of experience, offering hands-on learning and mentorship for real-world readiness.",
      defaultOpen: false,
    },
    {
      id: "faq-4",
      question: "What companies hire from Skillanic?",
      answer:
        "Skillanic trainers are industry experts with 15+ years of experience, offering hands-on learning and mentorship for real-world readiness.",
      defaultOpen: false,
    },
  ],
};
