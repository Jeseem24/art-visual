import { Service, Project, WhyTrustUsItem, FaqItem, Testimonial } from "@/types";

/**
 * ==============================================================================
 * CENTRAL MOCK DATA STORE (SANITY-COMPATIBLE)
 * ==============================================================================
 * This data powers the entire website during development.
 * All fields and relations match the planned Sanity CMS schemas 1:1.
 * When Sanity is connected later, this file is replaced by GROQ query results
 * without modifying any UI components.
 * ==============================================================================
 */

export const mockServices: Service[] = [
  {
    id: "service-1",
    order: 1,
    title: "Brand Video Production",
    slug: "brand-video-production",
    shortDescription: "A film that explains who you are and why people should care.",
    fullDescription: "We craft visually stunning, narrative-driven brand films that distill your company's core purpose into an emotional, unforgettable cinematic experience. From script to color grade, every frame is engineered to resonate with your audience.",
    heroImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    cardThumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    deliverables: [
      "Master Brand Anthem Film (60–90 seconds)",
      "High-impact social cutdowns (15s, 30s) in 9:16 and 1:1",
      "Broadcast-ready 4K color grade & master audio mix",
      "Behind-the-scenes photography assets",
    ],
    workflow: [
      {
        stepNumber: "01",
        phaseName: "Discovery & Creative Concept",
        description: "We dive deep into your brand identity, target demographic, and messaging objectives to write scripts, create visual moodboards, and storyboard key scenes.",
      },
      {
        stepNumber: "02",
        phaseName: "Principal Photography",
        description: "Full-scale multi-camera shoot with dedicated directors, cinematographers, lighting specialists, and audio engineers on location or in studio.",
      },
      {
        stepNumber: "03",
        phaseName: "Post-Production & Sound Design",
        description: "Editorial assembly, bespoke color grading, sound design, licensed music scoring, and multi-format exports for broadcast and web.",
      },
    ],
    faqs: [
      {
        question: "How long does a brand film take from concept to delivery?",
        answer: "Typically 3 to 5 weeks depending on location requirements, casting, and revision turnaround times.",
      },
      {
        question: "Who owns the rights to the footage?",
        answer: "Upon full project delivery and completion, you receive 100% full commercial rights and usage for all deliverables.",
      },
    ],
  },
  {
    id: "service-2",
    order: 2,
    title: "Product Videography",
    slug: "product-videography",
    shortDescription: "Clear, well-lit films for product pages, sales decks & launches.",
    fullDescription: "Transform physical and digital products into captivating visual experiences. We combine macro cinematography, dynamic motion control, and high-end studio lighting to showcase tactile quality, engineering precision, and consumer appeal.",
    heroImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    cardThumbnail: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    deliverables: [
      "Feature showcase video for eCommerce landing pages",
      "360-degree macro details and texture zooms",
      "Packaging unboxing and lifestyle application videos",
      "Optimized WebP/MP4 silent looping web assets",
    ],
    workflow: [
      {
        stepNumber: "01",
        phaseName: "Product Staging & Lighting Setup",
        description: "Studio prep, lighting calibration, motion rig setup, and product dressing to eliminate glare and highlight fine materials.",
      },
      {
        stepNumber: "02",
        phaseName: "Precision Capture",
        description: "High frame-rate slow motion, probe lenses, and motorized slider movements to capture tactile details and real-world usage.",
      },
      {
        stepNumber: "03",
        phaseName: "Finishing & Graphics",
        description: "Clean retouching, callout motion graphics highlighting specs, and clean audio design.",
      },
    ],
  },
  {
    id: "service-3",
    order: 3,
    title: "Corporate Video Production",
    slug: "corporate-video-production",
    shortDescription: "Clear, well-lit films for leadership, recruiting & stakeholders.",
    fullDescription: "Modern corporate communication that avoids dry corporate clichés. We produce engaging executive interviews, investor reels, recruitment videos, and company culture showcases that humanize your organization.",
    heroImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    cardThumbnail: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
    deliverables: [
      "Executive & CEO thought leadership videos",
      "Company culture & recruitment films",
      "Investor pitch and quarterly report summaries",
      "Internal training & onboarding video series",
    ],
  },
  {
    id: "service-4",
    order: 4,
    title: "Promotional & Advertising Videos",
    slug: "promotional-advertising-videos",
    shortDescription: "High-conversion commercials engineered for paid campaigns and TV.",
    fullDescription: "Data-informed, creative advertising videos structured around attention hooks and clear conversion pathways. We write, direct, and produce commercials designed to stop the scroll and drive measurable action.",
    heroImage: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80",
    cardThumbnail: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80",
    deliverables: [
      "Broadcast commercial master (30s / 15s)",
      "High-performing digital ad variations with multiple hooks",
      "End-screen animated calls-to-action",
      "A/B creative testing variants",
    ],
  },
  {
    id: "service-5",
    order: 5,
    title: "Event Video Production",
    slug: "event-video-production",
    shortDescription: "Launches, conferences and brand activations covered live.",
    fullDescription: "Capture the electric energy of your conferences, product reveals, awards nights, and VIP gatherings. Our agile camera crews blend into the background to capture genuine attendee reactions, keynote highlights, and atmosphere.",
    heroImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    cardThumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    deliverables: [
      "Fast-turnaround same-day social media highlight reels",
      "Full keynote and panel multi-camera recordings",
      "Sponsor recap and post-event marketing reel",
      "Attendee soundbites and testimonial clips",
    ],
  },
  {
    id: "service-6",
    order: 6,
    title: "Social Media Video Content",
    slug: "social-media-video-content",
    shortDescription: "Short, fast video made for the feed, shot in efficient batches.",
    fullDescription: "High-volume, native vertical video designed for Instagram Reels, TikTok, and YouTube Shorts. We batch-shoot months of organic content in single production days, ensuring your channels stay consistently fresh without burning out your team.",
    heroImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    cardThumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    deliverables: [
      "12 to 24 native 9:16 vertical short-form videos per batch",
      "Hook-optimized captions, on-screen text animations & trending audio",
      "Repurposed horizontal snippets for LinkedIn & YouTube",
      "Monthly content shoot calendar & production coordination",
    ],
  },
];

export const mockProjects: Project[] = [
  {
    id: "project-1",
    title: "The Art of Creation",
    slug: "the-art-of-creation",
    clientName: "Genesis Luxury",
    category: "brand",
    categoryLabel: "Brand Film",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder video
    videoProvider: "youtube",
    aspectRatio: "16/9",
    description: "A cinematic visual study exploring artisanal craftsmanship, intentional materiality, and the patient pursuit of excellence.",
    year: 2026,
  },
  {
    id: "project-2",
    title: "Precision Motion",
    slug: "precision-motion",
    clientName: "Aether Watch Co.",
    category: "product",
    categoryLabel: "Product Videography",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoProvider: "youtube",
    aspectRatio: "16/9",
    description: "Macro cinematography highlighting the 0.02mm tolerance gear train inside a boutique Swiss automatic timepiece.",
    year: 2026,
  },
  {
    id: "project-3",
    title: "Urban Horizon",
    slug: "urban-horizon",
    clientName: "Nexus Summit",
    category: "event",
    categoryLabel: "Event Coverage",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoProvider: "youtube",
    aspectRatio: "16/9",
    description: "Three-day global tech activation in Singapore: capturing 4,000 attendees, dynamic stage lighting, and founder keynotes.",
    year: 2025,
  },
  {
    id: "project-4",
    title: "The Velocity Shift",
    slug: "the-velocity-shift",
    clientName: "Hyperion Mobility",
    category: "commercial",
    categoryLabel: "Commercial Ad",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoProvider: "youtube",
    aspectRatio: "16/9",
    description: "Broadcast commercial capturing the instantaneous torque and aerodynamic silhouette of next-generation electric hypercars.",
    year: 2026,
  },
  {
    id: "project-5",
    title: "Cultivating Culture",
    slug: "cultivating-culture",
    clientName: "Apex Global",
    category: "corporate",
    categoryLabel: "Corporate Film",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoProvider: "youtube",
    aspectRatio: "16/9",
    description: "A human-first recruiting film highlighting the engineers, designers, and thinkers behind a multinational tech hub.",
    year: 2025,
  },
  {
    id: "project-6",
    title: "Feed First Daily",
    slug: "feed-first-daily",
    clientName: "Solara Lifestyle",
    category: "social",
    categoryLabel: "Social Content",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoProvider: "youtube",
    aspectRatio: "9/16",
    description: "Batch production series generating 30 high-retention short reels that yielded 4.2M organic impressions across 60 days.",
    year: 2026,
  },
];

export const mockWhyTrustUs: WhyTrustUsItem[] = [
  {
    id: "trust-1",
    stepNumber: "01",
    title: "Creative Storytelling",
    description: "We transform unique ideas into compelling visual stories that capture attention, connect with audiences, and bring every brand's vision to life.",
  },
  {
    id: "trust-2",
    stepNumber: "02",
    title: "Quality Production",
    description: "We deliver high-quality visuals through careful planning, professional execution, and attention to every detail, ensuring a polished final result.",
  },
  {
    id: "trust-3",
    stepNumber: "03",
    title: "Brand-Focused Approach",
    description: "Every video is thoughtfully designed to capture your brand's unique identity, communicate its vision, and highlight its core competitive values.",
  },
  {
    id: "trust-4",
    stepNumber: "04",
    title: "End-to-End Creativity",
    description: "From the initial concept to final color grading, we carefully shape every detail, combining fresh ideas with disciplined production scheduling.",
  },
  {
    id: "trust-5",
    stepNumber: "05",
    title: "Audience Engagement",
    description: "We create captivating video content that grabs attention in the first three seconds, keeps audiences engaged, and builds lasting emotional resonance.",
  },
  {
    id: "trust-6",
    stepNumber: "06",
    title: "Creative Excellence",
    description: "We combine modern cinematography, visual creativity, and thoughtful execution to produce memorable films that make every brand truly stand out.",
  },
];

export const mockFaqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "What is your typical production timeline?",
    answer: "Most commercial and brand film projects take between 3 to 6 weeks from kickoff to delivery. Social media batch shoots can be turned around in as little as 10 to 14 days.",
  },
  {
    id: "faq-2",
    question: "Do you travel for shoots outside of Chennai?",
    answer: "Yes, absolutely. Our core production team is based in Chennai, but we regularly travel across India and internationally for on-location brand and event shoots.",
  },
  {
    id: "faq-3",
    question: "How do revisions work?",
    answer: "Every project includes two formal rounds of revisions built directly into the schedule. We use frame-accurate video review links so you can leave notes at exact timestamps.",
  },
  {
    id: "faq-4",
    question: "How do we get started and receive an estimate?",
    answer: "The quickest way is to click the 'Chat on WhatsApp' button on any page. Send us a one-line note about your product, your target date, and your goals. We'll reply with ideas and an estimate.",
  },
  {
    id: "faq-5",
    question: "What formats and resolutions do you deliver?",
    answer: "We shoot in 4K/6K RAW cinema formats and export master deliverables optimized for your specific channels: 16:9 for web and broadcast, 9:16 for Reels/TikTok, and 1:1 for feed placement.",
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "test-1",
    clientName: "Karthik Subramanian",
    clientCompany: "Genesis Brands",
    clientRole: "Head of Marketing",
    quote: "Working with the team was a breath of fresh air. They grasped our brand tone immediately and delivered a commercial that elevated our market positioning within 48 hours of launch.",
    rating: 5,
  },
  {
    id: "test-2",
    clientName: "Ananya Roy",
    clientCompany: "Aether Watch Co.",
    clientRole: "Product Lead",
    quote: "The macro videography on our product launch was extraordinary. They made mechanical details look like high art. Our pre-orders doubled expectations.",
    rating: 5,
  },
];

