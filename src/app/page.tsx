import React from "react";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { FeaturedWorksSection } from "@/components/sections/home/FeaturedWorksSection";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { WhyChooseUsSection } from "@/components/sections/home/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { FAQSection } from "@/components/sections/home/FAQSection";
import { CTABannerSection } from "@/components/sections/home/CTABannerSection";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <HeroSection />

      {/* Services Overview */}
      <ServicesSection />

      {/* Featured Projects */}
      <FeaturedWorksSection />

      {/* About Company */}
      <AboutSection />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Call To Action Banner */}
      <CTABannerSection className={styles.ctaBanner} />
    </div>
  );
}
