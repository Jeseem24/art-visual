/**
 * Service Detail Page Data Contracts & Content Registry
 *
 * Powers `/services/[slug]` pages with Sanity-compatible structured data.
 * Slugs, titles, videoSrc, and posterSrc align 1:1 with
 * `src/components/sections/home/ServicesSection/constants.ts`.
 */

export interface ServiceHighlightCard {
  id: string;
  title: string;
  description: string;
}

export interface ServiceDetailHeadline {
  line1: string;
  line2: string;
  text?: string;
}

export interface ServiceDetailData {
  slug: string;
  titlePrefix: string;
  titleHighlight: string;
  fullTitle: string;
  videoSrc: string;
  posterSrc: string;
  aboutSection: {
    badgeText: string;
    headline: {
      line1?: string;
      line2?: string;
      text: string;
    };
    paragraphs: string[];
  };
  offerSection: {
    badgeText: string;
    headline: ServiceDetailHeadline;
    imageSrc: string;
    imageAlt: string;
    cards: ServiceHighlightCard[];
  };
  receiveSection: {
    badgeText: string;
    headline: ServiceDetailHeadline;
    imageSrc: string;
    imageAlt: string;
    cards: ServiceHighlightCard[];
  };
  ctaSection: {
    headline: {
      text: string;
      line1: string;
      line2: string;
    };
    buttonLabel: string;
    description?: {
      highlight: string;
      body: string;
    };
  };
}

const OFFER_SHOOT_IMAGE = "/images/services/offer-shoot.png";
const RECEIVE_SHOOT_IMAGE = "/images/services/receive-shoot.png";

const DEFAULT_CTA_DESCRIPTION = {
  highlight: "Send a line about your product,",
  body: " your audience and your date. We reply with ideas and a rough quote.",
};

export const SERVICE_DETAILS_BY_SLUG: Record<string, ServiceDetailData> = {
  "brand-video-production": {
    slug: "brand-video-production",
    titlePrefix: "Brand",
    titleHighlight: "Video Production",
    fullTitle: "Brand Video Production",
    videoSrc: "/videos/services/brand-video.mp4",
    posterSrc: "/videos/services/brand-video-poster.webp",
    aboutSection: {
      badgeText: "About Brand Video Production",
      headline: {
        line1: "Every Brand Has a Story.",
        line2: "Let's Bring Yours to Life.",
        text: "Every Brand Has a Story. Let's Bring Yours to Life.",
      },
      paragraphs: [
        "We create compelling brand videos that capture your identity, communicate your values, and connect with your audience. Through creative storytelling and professional video production, we transform your brand vision into powerful visual experiences.",
        "We work closely with brands to understand their identity and transform their ideas into engaging visual stories. From creative concepts to professional filming and final editing, we focus on producing videos that communicate your brand message and leave a lasting impression.",
      ],
    },
    offerSection: {
      badgeText: "What We Offer",
      headline: {
        text: "Creative Solutions for Your Brand",
        line1: "Creative Solutions for",
        line2: "Your Brand",
      },
      imageSrc: OFFER_SHOOT_IMAGE,
      imageAlt: "Crew filming a brand video production on set with cinema lighting",
      cards: [
        {
          id: "brand-storytelling",
          title: "Brand Storytelling",
          description:
            "Present your brand's journey, purpose, and identity through meaningful visual storytelling.",
        },
        {
          id: "brand-identity-videos",
          title: "Brand Identity Videos",
          description:
            "Communicate your brand personality, values, and vision through creative video content.",
        },
        {
          id: "brand-promotional-videos",
          title: "Brand Promotional Videos",
          description:
            "Showcase your brand, services, and offerings through engaging promotional visuals.",
        },
        {
          id: "brand-introduction-videos",
          title: "Brand Introduction Videos",
          description:
            "Introduce your business to audiences with professional and visually engaging content.",
        },
      ],
    },
    receiveSection: {
      badgeText: "What You'll Receive",
      headline: {
        line1: "Everything Your Brand",
        line2: "Needs to Make an Impact.",
      },
      imageSrc: RECEIVE_SHOOT_IMAGE,
      imageAlt: "Studio production team reviewing camera framing during a brand shoot",
      cards: [
        {
          id: "creative-concept",
          title: "Creative Concept",
          description:
            "Developing unique, engaging, and brand-focused visual concepts that reflect your brand identity.",
        },
        {
          id: "story-development",
          title: "Story Development",
          description: "A structured approach to communicating your brand story.",
        },
        {
          id: "professional-production",
          title: "Professional Production",
          description:
            "Capturing high-quality visuals with professional filming techniques, creative direction, and lighting.",
        },
        {
          id: "final-video-delivery",
          title: "Final Video Delivery",
          description:
            "Transforming raw footage into a polished brand video with professional editing, sound design, and color grading.",
        },
      ],
    },
    ctaSection: {
      headline: {
        text: "Your Brand Has a Story. Let's Make It Unforgettable.",
        line1: "Your Brand Has a Story.",
        line2: "Let's Make It Unforgettable.",
      },
      buttonLabel: "Start Your Brand Project",
      description: DEFAULT_CTA_DESCRIPTION,
    },
  },

  "corporate-video-production": {
    slug: "corporate-video-production",
    titlePrefix: "Corporate",
    titleHighlight: "Video Production",
    fullTitle: "Corporate Video Production",
    videoSrc: "/videos/services/corporate-video.mp4",
    posterSrc: "/videos/services/corporate-video-poster.webp",
    aboutSection: {
      badgeText: "About Corporate Video Production",
      headline: {
        line1: "Clear Communication Built",
        line2: "for Modern Organizations.",
        text: "Clear Communication Built for Modern Organizations.",
      },
      paragraphs: [
        "We produce crisp, authentic corporate films that help leadership teams, HR departments, and sales organizations communicate with confidence. Every frame is lit, framed, and paced to earn trust across investor decks, company websites, and internal channels.",
        "From executive interviews and recruitment showcases to annual recaps and training modules, our crew manages scripting, on-site filming, and post-production with minimal disruption to your workday.",
      ],
    },
    offerSection: {
      badgeText: "What We Offer",
      headline: {
        line1: "Focused Video Solutions",
        line2: "for Your Organization",
      },
      imageSrc: OFFER_SHOOT_IMAGE,
      imageAlt: "Production crew capturing an executive corporate interview on location",
      cards: [
        {
          id: "company-overview-films",
          title: "Company Overview Films",
          description:
            "Introduce your mission, capabilities, and team to clients, partners, and prospective hires.",
        },
        {
          id: "leadership-interviews",
          title: "Leadership Interviews",
          description:
            "Present executives and subject-matter experts with natural framing, clean audio, and thoughtful pacing.",
        },
        {
          id: "culture-recruitment-videos",
          title: "Culture & Recruitment",
          description:
            "Highlight your workplace environment and people to attract talent aligned with your values.",
        },
        {
          id: "training-internal-comms",
          title: "Internal Communications",
          description:
            "Deliver clear onboarding, process walkthroughs, and company-wide updates across distributed teams.",
        },
      ],
    },
    receiveSection: {
      badgeText: "What You'll Receive",
      headline: {
        line1: "Everything Your Team",
        line2: "Needs to Build Trust.",
      },
      imageSrc: RECEIVE_SHOOT_IMAGE,
      imageAlt: "Cinematographer and director preparing lighting for corporate filming",
      cards: [
        {
          id: "pre-production-briefing",
          title: "Pre-Production Briefing",
          description:
            "Structured interview outlines, shot lists, and location planning tailored to your schedule.",
        },
        {
          id: "multi-camera-capture",
          title: "Multi-Camera Capture",
          description:
            "Broadcast-grade cameras, controlled lighting, and dual-system audio for crisp executive delivery.",
        },
        {
          id: "branded-motion-graphics",
          title: "Branded Motion Graphics",
          description:
            "Clean lower thirds, title cards, and data callouts styled to match your brand guidelines.",
        },
        {
          id: "multi-format-exports",
          title: "Multi-Format Exports",
          description:
            "Master 4K files alongside web, LinkedIn, and presentation-ready cuts with captions included.",
        },
      ],
    },
    ctaSection: {
      headline: {
        text: "Your Company Has a Vision. Let's Put It on Screen.",
        line1: "Your Company Has a Vision.",
        line2: "Let's Put It on Screen.",
      },
      buttonLabel: "Start Corporate Project",
      description: DEFAULT_CTA_DESCRIPTION,
    },
  },

  "product-videography": {
    slug: "product-videography",
    titlePrefix: "Product",
    titleHighlight: "Videography",
    fullTitle: "Product Videography",
    videoSrc: "/videos/services/product-video.mp4",
    posterSrc: "/videos/services/product-video-poster.webp",
    aboutSection: {
      badgeText: "About Product Videography",
      headline: {
        line1: "Precision Visuals That",
        line2: "Turn Browsers Into Buyers.",
        text: "Precision Visuals That Turn Browsers Into Buyers.",
      },
      paragraphs: [
        "Great product films reveal craftsmanship, texture, and function in seconds. We combine studio lighting, controlled camera movement, and macro optics to make every material, silhouette, and feature unmistakable.",
        "Whether you are launching a flagship release, upgrading e-commerce product pages, or equipping retail and sales decks, we craft clean, high-converting visuals engineered for modern digital storefronts.",
      ],
    },
    offerSection: {
      badgeText: "What We Offer",
      headline: {
        line1: "Tactile Visuals",
        line2: "for Your Products",
      },
      imageSrc: OFFER_SHOOT_IMAGE,
      imageAlt: "Studio tabletop lighting setup for commercial product videography",
      cards: [
        {
          id: "product-launch-films",
          title: "Product Launch Films",
          description:
            "Build anticipation around new releases with dramatic reveals, lighting transitions, and crisp pacing.",
        },
        {
          id: "macro-detail-reels",
          title: "Macro & Detail Reels",
          description:
            "Highlight finishes, engineering tolerances, and materials with close-up precision cinematography.",
        },
        {
          id: "lifestyle-in-use-videos",
          title: "Lifestyle In-Use Videos",
          description:
            "Demonstrate how your product fits naturally into real customer routines and environments.",
        },
        {
          id: "ecommerce-feature-loops",
          title: "E-Commerce Feature Loops",
          description:
            "Produce concise, silent-friendly product clips optimized for PDPs, landing pages, and marketplaces.",
        },
      ],
    },
    receiveSection: {
      badgeText: "What You'll Receive",
      headline: {
        line1: "Everything Your Launch",
        line2: "Needs to Stand Out.",
      },
      imageSrc: RECEIVE_SHOOT_IMAGE,
      imageAlt: "Camera operator adjusting focus during a studio product shoot",
      cards: [
        {
          id: "studio-lighting-design",
          title: "Studio Lighting Design",
          description:
            "Custom light shaping and surface prep to eliminate unwanted glare and elevate product form.",
        },
        {
          id: "motion-control-shots",
          title: "Motion Control Shots",
          description:
            "Smooth slider, turntable, and high-frame-rate capture for dynamic hero product moments.",
        },
        {
          id: "feature-callout-edits",
          title: "Feature Callout Edits",
          description:
            "Clean editorial cuts paired with minimal motion graphics that explain key specifications clearly.",
        },
        {
          id: "storefront-ready-deliverables",
          title: "Storefront Deliverables",
          description:
            "Aspect ratios tailored for web banners, product pages, paid ads, and social shopping feeds.",
        },
      ],
    },
    ctaSection: {
      headline: {
        text: "Your Product Deserves Spotlight. Let's Film It Right.",
        line1: "Your Product Deserves Spotlight.",
        line2: "Let's Film It Right.",
      },
      buttonLabel: "Start Your Product Shoot",
      description: DEFAULT_CTA_DESCRIPTION,
    },
  },

  "social-media-video-content": {
    slug: "social-media-video-content",
    titlePrefix: "Social Media",
    titleHighlight: "Video Content",
    fullTitle: "Social Media Video Content",
    videoSrc: "/videos/services/social-video.mp4",
    posterSrc: "/videos/services/social-video-poster.webp",
    aboutSection: {
      badgeText: "About Social Media Video Content",
      headline: {
        line1: "Thumb-Stopping Stories",
        line2: "Built for the Feed.",
        text: "Thumb-Stopping Stories Built for the Feed.",
      },
      paragraphs: [
        "Social feeds reward speed, clarity, and visual personality in the very first second. We plan and shoot batch-produced short-form video libraries designed specifically for Instagram Reels, YouTube Shorts, and LinkedIn.",
        "Instead of scrambling for one-off clips, you get a cohesive monthly bank of vertical and square edits—complete with hooks, kinetic captions, and sound design built to keep viewers watching.",
      ],
    },
    offerSection: {
      badgeText: "What We Offer",
      headline: {
        line1: "Scroll-Stopping Formats",
        line2: "for Every Channel",
      },
      imageSrc: OFFER_SHOOT_IMAGE,
      imageAlt: "Crew filming dynamic vertical social media video content",
      cards: [
        {
          id: "reels-shorts-production",
          title: "Reels & Shorts Series",
          description:
            "Fast-paced vertical storytelling structured around strong visual hooks and high retention.",
        },
        {
          id: "batch-content-days",
          title: "Batch Content Shoots",
          description:
            "Capture weeks of consistent brand, founder, and product clips in a single focused shoot day.",
        },
        {
          id: "founder-creator-led",
          title: "Founder-Led Clips",
          description:
            "Turn insights, behind-the-scenes moments, and Q&As into approachable, authentic short videos.",
        },
        {
          id: "campaign-cutdowns",
          title: "Campaign Cutdowns",
          description:
            "Adapt hero films into punchy 9:16, 4:5, and 1:1 social edits tailored to each platform.",
        },
      ],
    },
    receiveSection: {
      badgeText: "What You'll Receive",
      headline: {
        line1: "Everything Your Feed",
        line2: "Needs to Stay Active.",
      },
      imageSrc: RECEIVE_SHOOT_IMAGE,
      imageAlt: "Production team reviewing vertical framing for social video campaign",
      cards: [
        {
          id: "content-calendar-scripting",
          title: "Hook & Angle Planning",
          description:
            "Platform-specific opening hooks, shot lists, and talking points mapped before cameras roll.",
        },
        {
          id: "multi-aspect-framing",
          title: "Native Vertical Framing",
          description:
            "Composed cleanly for 9:16 and 4:5 viewports with safe zones respected for UI overlays.",
        },
        {
          id: "captions-sound-pacing",
          title: "Captions & Sound Pacing",
          description:
            "Crisp rhythmic cuts, burned-in or SRT captions, and SFX layered for sound-on and muted feeds.",
        },
        {
          id: "ready-to-post-library",
          title: "Ready-to-Post Library",
          description:
            "Organized batch folders with cover thumbnails and multiple hook variations ready for scheduling.",
        },
      ],
    },
    ctaSection: {
      headline: {
        text: "Ready to Own the Feed? Let's Shoot Your Next Batch.",
        line1: "Ready to Own the Feed?",
        line2: "Let's Shoot Your Next Batch.",
      },
      buttonLabel: "Start Your Social Shoot",
      description: DEFAULT_CTA_DESCRIPTION,
    },
  },

  "promotional-advertising-videos": {
    slug: "promotional-advertising-videos",
    titlePrefix: "Promotional &",
    titleHighlight: "Advertising Videos",
    fullTitle: "Promotional & Advertising Videos",
    videoSrc: "/videos/services/promotional-video.mp4",
    posterSrc: "/videos/services/promotional-video-poster.webp",
    aboutSection: {
      badgeText: "About Promotional & Advertising Videos",
      headline: {
        line1: "Campaign Films Designed",
        line2: "to Capture Attention.",
        text: "Campaign Films Designed to Capture Attention.",
      },
      paragraphs: [
        "When you are launching a campaign, hosting a flagship event, or pushing a seasonal offer, every frame needs to earn attention and drive action. We produce energetic promotional films and live activation coverage with cinema polish.",
        "From initial campaign concepting and storyboard timing to rapid post-production delivery, we build cohesive ad suites that perform across paid social, YouTube pre-roll, and landing pages.",
      ],
    },
    offerSection: {
      badgeText: "What We Offer",
      headline: {
        line1: "Campaign Assets Built",
        line2: "for High Impact",
      },
      imageSrc: OFFER_SHOOT_IMAGE,
      imageAlt: "Film crew capturing a live promotional campaign and activation",
      cards: [
        {
          id: "launch-promo-films",
          title: "Launch Promo Films",
          description:
            "Energize product drops, seasonal campaigns, and brand announcements with bold visual momentum.",
        },
        {
          id: "paid-ad-creatives",
          title: "Paid Ad Creatives",
          description:
            "Conversion-focused ad spots built with clear value propositions, pacing, and direct calls to action.",
        },
        {
          id: "event-activation-recaps",
          title: "Event & Launch Coverage",
          description:
            "Capture conferences, pop-ups, and live experiences in high-energy recap films with quick turnarounds.",
        },
        {
          id: "ab-hook-variants",
          title: "A/B Hook Variants",
          description:
            "Multiple opening sequences and CTA end-cards so performance marketers can test and scale winners.",
        },
      ],
    },
    receiveSection: {
      badgeText: "What You'll Receive",
      headline: {
        line1: "Everything Your Campaign",
        line2: "Needs to Convert.",
      },
      imageSrc: RECEIVE_SHOOT_IMAGE,
      imageAlt: "Director and camera team framing a promotional commercial scene",
      cards: [
        {
          id: "campaign-storyboarding",
          title: "Campaign Storyboarding",
          description:
            "Tight beat-by-beat visual planning aligned with your campaign message, offer, and media placements.",
        },
        {
          id: "cinematic-ad-production",
          title: "Cinematic Ad Production",
          description:
            "Controlled lighting, dynamic camera movement, and crisp talent direction on studio or location.",
        },
        {
          id: "graphics-cta-endcards",
          title: "CTA Motion Graphics",
          description:
            "High-contrast typography, offer badges, and branded end-screens engineered for click-through.",
        },
        {
          id: "channel-spec-masters",
          title: "Channel-Spec Masters",
          description:
            "Delivered in 15s, 30s, and 60s durations across landscape, square, and vertical ad formats.",
        },
      ],
    },
    ctaSection: {
      headline: {
        text: "Launching Something Big? Let's Make It Seen.",
        line1: "Launching Something Big?",
        line2: "Let's Make It Seen.",
      },
      buttonLabel: "Start Your Promo Project",
      description: DEFAULT_CTA_DESCRIPTION,
    },
  },

  "commercial-video-production": {
    slug: "commercial-video-production",
    titlePrefix: "Commercial",
    titleHighlight: "Video Production",
    fullTitle: "Commercial Video Production",
    videoSrc: "/videos/services/commercial-video.mp4",
    posterSrc: "/videos/services/commercial-video-poster.webp",
    aboutSection: {
      badgeText: "About Commercial Video Production",
      headline: {
        line1: "Broadcast-Grade Craft",
        line2: "for Ambitious Campaigns.",
        text: "Broadcast-Grade Craft for Ambitious Campaigns.",
      },
      paragraphs: [
        "Commercials demand memorable ideas executed at the highest technical standard. We handle full-scale commercial production—from creative treatment, casting, and location scouting to cinema camera packages and seasoned department heads.",
        "Whether your spot airs on television, OTT streaming, cinema pre-roll, or flagship digital placements, our team delivers cohesive storytelling, rich color grading, and broadcast-compliant audio finishing.",
      ],
    },
    offerSection: {
      badgeText: "What We Offer",
      headline: {
        line1: "Full-Scale Production",
        line2: "for Screen & Broadcast",
      },
      imageSrc: OFFER_SHOOT_IMAGE,
      imageAlt: "Full commercial film crew operating cinema camera and lighting rig",
      cards: [
        {
          id: "tv-ott-commercials",
          title: "TV & OTT Commercials",
          description:
            "Scripted 15, 30, and 60-second spots crafted for television, streaming platforms, and digital video.",
        },
        {
          id: "creative-direction-casting",
          title: "Direction & Casting",
          description:
            "End-to-end treatment development, talent casting, wardrobe styling, and art direction.",
        },
        {
          id: "cinema-unit-production",
          title: "Cinema Unit Production",
          description:
            "Dedicated director, DP, gaffer, and production crew operating cinema-grade optics and grip.",
        },
        {
          id: "full-finishing-suite",
          title: "Color & Sound Finishing",
          description:
            "Theatrical color grading, custom sound design, voiceover recording, and broadcast loudness mixing.",
        },
      ],
    },
    receiveSection: {
      badgeText: "What You'll Receive",
      headline: {
        line1: "Everything Your Spot",
        line2: "Needs to Air Anywhere.",
      },
      imageSrc: RECEIVE_SHOOT_IMAGE,
      imageAlt: "Cinematographer and crew reviewing commercial monitor feed on set",
      cards: [
        {
          id: "director-treatment",
          title: "Director's Treatment",
          description:
            "Visual lookbook, casting boards, location options, and shot-by-shot commercial script.",
        },
        {
          id: "full-crew-shoot",
          title: "Full-Crew Production",
          description:
            "Seamless on-set execution with permits, call sheets, art department, and client video village.",
        },
        {
          id: "broadcast-color-mix",
          title: "Broadcast Color & Mix",
          description:
            "DaVinci Resolve grading and loudness-normalized stereo mixes ready for air and streaming.",
        },
        {
          id: "master-deliverable-package",
          title: "Master Delivery Package",
          description:
            "Clean textless masters, localized cutdowns, social adaptations, and broadcast spec files.",
        },
      ],
    },
    ctaSection: {
      headline: {
        text: "Ready for Your Flagship Spot? Let's Roll Camera.",
        line1: "Ready for Your Flagship Spot?",
        line2: "Let's Roll Camera.",
      },
      buttonLabel: "Start Commercial Project",
      description: DEFAULT_CTA_DESCRIPTION,
    },
  },
};

export const SERVICE_DETAIL_SLUGS = Object.keys(
  SERVICE_DETAILS_BY_SLUG,
) as Array<keyof typeof SERVICE_DETAILS_BY_SLUG>;

/**
 * Look up structured detail content for a given service slug.
 */
export function getServiceDetailBySlug(
  slug: string,
): ServiceDetailData | undefined {
  return Object.prototype.hasOwnProperty.call(SERVICE_DETAILS_BY_SLUG, slug)
    ? SERVICE_DETAILS_BY_SLUG[slug]
    : undefined;
}
