import React from "react";
import type { Metadata } from "next";
import { ContactHeroSection } from "@/components/sections/contact/ContactHeroSection";
import { ContactInquirySection } from "@/components/sections/contact/ContactInquirySection";
import { WhyChooseUsSection } from "@/components/sections/home/WhyChooseUsSection";
import { CTABannerSection } from "@/components/sections/home/CTABannerSection";
import styles from "./ContactPage.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have a creative idea or a project in mind? Let's connect and bring your vision to life through powerful visual storytelling.",
};

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      {/* Hero Header */}
      <ContactHeroSection />

      {/* Contact Details & Inquiry Form */}
      <ContactInquirySection className={styles.inquirySection} />

      {/* Why Brands Trust Our Creative Vision */}
      <WhyChooseUsSection className={styles.whyChooseUs} />

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
