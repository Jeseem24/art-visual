/**
 * CTA Banner Section Constants & Data Contracts
 */

export interface ReelCardItem {
  id: string;
  image: string;
  alt: string;
}

export interface CTABannerData {
  badge: {
    text: string;
  };
  headline: {
    text: string;
    line1?: string;
    line2?: string;
  };
  description: {
    highlight: string;
    body: string;
  };
  ctaButton: {
    label: string;
    href: string;
  };
  reelStrip1: {
    items: ReelCardItem[];
  };
  reelStrip2: {
    items: ReelCardItem[];
  };
}

export const CTA_BANNER_DEFAULTS: CTABannerData = {
  badge: {
    text: "Start a project",
  },
  headline: {
    text: "Got a shoot in mind? Message us.",
    line1: "Got a shoot in mind?",
    line2: "Message us.",
  },
  description: {
    highlight: "Send a line about your product",
    body: ", your audience and your date. We reply with ideas and a rough quote.",
  },
  ctaButton: {
    label: "Let's Talk",
    href: "/contact",
  },
  reelStrip1: {
    items: [
      {
        id: "strip1-img1",
        image: "/images/cta/reel-1.png",
        alt: "Creative video production shoot",
      },
      {
        id: "strip1-img2",
        image: "/images/cta/reel-2.png",
        alt: "Studio commercial production",
      },
      {
        id: "strip1-img3",
        image: "/images/cta/reel-3.png",
        alt: "Cinematic filming on location",
      },
      {
        id: "strip1-img4",
        image: "/images/cta/reel-4.png",
        alt: "Dynamic advertising video",
      },
    ],
  },
  reelStrip2: {
    items: [
      {
        id: "strip2-img1",
        image: "/images/cta/reel-3.png",
        alt: "Behind the scenes filming",
      },
      {
        id: "strip2-img2",
        image: "/images/cta/reel-4.png",
        alt: "Product advertisement shoot",
      },
      {
        id: "strip2-img3",
        image: "/images/cta/reel-1.png",
        alt: "Video production reel showcase",
      },
      {
        id: "strip2-img4",
        image: "/images/cta/reel-2.png",
        alt: "Creative motion shoot",
      },
    ],
  },
};
