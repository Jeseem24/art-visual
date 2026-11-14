import React from "react";
import type { Metadata } from "next";
import { AboutHeroSection } from "@/components/sections/about/AboutHeroSection";
import { WhoWeAreSection } from "@/components/sections/about/WhoWeAreSection";
import { VisionMissionSection } from "@/components/sections/about/VisionMissionSection";
import { WhatWeDoSection } from "@/components/sections/about/WhatWeDoSection";
import { CreativeProcessSection } from "@/components/sections/about/CreativeProcessSection";
import { FeaturedWorksSection } from "@/components/sections/home/FeaturedWorksSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { CTABannerSection } from "@/components/sections/home/CTABannerSection";
import styles from "./AboutPage.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "We plan, shoot and finish brand films, product videos, social content and event coverage. We turn stories into visual experiences.",
};

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Header */}
      <AboutHeroSection />

      {/* Who We Are Story Section */}
      <WhoWeAreSection />

      {/* Vision & Mission Statements */}
      <VisionMissionSection />

      {/* What We Do Capabilities Grid */}
      <WhatWeDoSection />

      {/* Our Creative Process Timeline */}
      <CreativeProcessSection className={styles.creativeProcess} />

      {/* Featured Projects */}
      <FeaturedWorksSection className={styles.featuredWorks} />

      {/* Client Testimonials */}
      <TestimonialsSection className={styles.testimonials} />

      {/* Call To Action Banner */}
      <CTABannerSection
        className={styles.ctaBanner}
        data={{
          headline: {
            text: "Have a Story to Tell? Let's Create It.",
            line1: "Have a Story to Tell?",
            line2: "Let's Create It.",
          },
        }}
      />
    </div>
  );
}

