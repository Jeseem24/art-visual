import React, { memo } from "react";
import { HeroHeader } from "@/components/ui/HeroHeader";
import { CONTACT_HERO_DEFAULTS, type ContactHeroData } from "./constants";
import styles from "./ContactHeroSection.module.css";

export interface ContactHeroSectionProps {
  data?: Partial<ContactHeroData>;
  className?: string;
}

/**
 * @component ContactHeroSection
 * @description Hero introduction section for the Contact page reusing HeroHeader.
 */
export const ContactHeroSection = memo(function ContactHeroSection({
  data,
  className = "",
}: ContactHeroSectionProps) {
  const headline = data?.headline ?? CONTACT_HERO_DEFAULTS.headline;
  const subtitle = data?.subtitle ?? CONTACT_HERO_DEFAULTS.subtitle;

  return (
    <section
      className={`${styles.hero} ${className}`.trim()}
      aria-label="Contact Hero"
    >
      <div className={styles.container}>
        <HeroHeader
          as="h1"
          headlineMaxWidth={834}
          subtitleMaxWidth={646}
          className={styles.heroHeader}
          headline={{
            line1: (
              <>
                {headline.line1Prefix}{" "}
                <span className={styles.highlight}>{headline.line1Highlight}</span>
              </>
            ),
            line2: headline.line2,
          }}
          subtitle={subtitle}
        />
      </div>
    </section>
  );
});

export default ContactHeroSection;
