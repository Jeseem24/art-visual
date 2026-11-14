import React from "react";
import type { Metadata } from "next";
import { ServicesHeroSection } from "@/components/sections/services/ServicesHeroSection";
import { ServicesCatalogSection } from "@/components/sections/services/ServicesCatalogSection";
import { ServicesProcessSection } from "@/components/sections/services/ServicesProcessSection";
import { WhyChooseUsSection } from "@/components/sections/home/WhyChooseUsSection";
import { CTABannerSection } from "@/components/sections/home/CTABannerSection";
import styles from "./ServicesPage.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "We bring ideas to life through creative video production, cinematic storytelling, and innovative visual solutions.",
};

export default function ServicesPage() {
  return (
    <div className={styles.servicesPage}>
      {/* Hero Introduction */}
      <ServicesHeroSection />

      {/* 3x3 Creative Services Grid */}
      <ServicesCatalogSection />

      {/* Our Creative Process 3-Column Grid */}
      <ServicesProcessSection />

      {/* Why Brands Trust Our Creative Vision */}
      <WhyChooseUsSection />

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
