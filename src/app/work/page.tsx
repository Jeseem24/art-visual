import React from "react";
import type { Metadata } from "next";
import { WorkHeroSection } from "@/components/sections/work/WorkHeroSection";
import { WorkShowcaseSection } from "@/components/sections/work/WorkShowcaseSection";
import { CTABannerSection } from "@/components/sections/home/CTABannerSection";
import styles from "./WorkPage.module.css";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore our creative portfolio of brand films, commercials, product videos, and visual stories crafted with creativity and passion.",
};

export default function WorkPage() {
  return (
    <div className={styles.workPage}>
      {/* Hero Header */}
      <WorkHeroSection />

      {/* Category Filter Bar & Portfolio Grid */}
      <WorkShowcaseSection />

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
