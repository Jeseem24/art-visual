import React, { memo } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTABannerButton } from "./CTABannerButton";
import {
  CTA_BANNER_DEFAULTS,
  type CTABannerData,
} from "./constants";
import styles from "./CTABannerSection.module.css";

export interface CTABannerSectionProps {
  /** Optional custom data overrides */
  data?: Partial<CTABannerData>;
  /** Optional mobile-specific data overrides (< 768px) */
  mobileData?: Partial<CTABannerData>;
  /** Optional custom class name */
  className?: string;
}

/**
 * Call-to-action banner section with editorial copy and dual film strip showcase.
 */
export const CTABannerSection = memo(function CTABannerSection({
  data = CTA_BANNER_DEFAULTS,
  mobileData,
  className = "",
}: CTABannerSectionProps) {
  const content = { ...CTA_BANNER_DEFAULTS, ...data };
  const mobileContent = mobileData ? { ...CTA_BANNER_DEFAULTS, ...mobileData } : null;

  return (
    <section
      className={`${styles.section} ${className}`.trim()}
      aria-labelledby="cta-banner-heading"
    >
      <div className={styles.container}>
        <div className={styles.bannerCard}>
          {/* Left Editorial & Action Content */}
          <div className={styles.contentWrapper}>
            <div className={mobileContent ? styles.desktopOnlyContent : ""}>
              <SectionHeader
                id="cta-banner-heading"
                align="left"
                badgeText={content.badge.text}
                className={styles.header}
                headlineClassName={styles.headline}
                title={
                  content.headline.line1 && content.headline.line2
                    ? { line1: content.headline.line1, line2: content.headline.line2 }
                    : content.headline.text
                }
              />

              <p className={styles.description}>
                <span className={styles.highlight}>
                  {content.description.highlight}
                </span>
                <span>{content.description.body}</span>
              </p>

              <div className={styles.buttonWrapper}>
                <CTABannerButton label={content.ctaButton.label} />
              </div>
            </div>

            {mobileContent && (
              <div className={styles.mobileOnlyContent}>
                <SectionHeader
                  id="cta-banner-heading-mobile"
                  align="left"
                  badgeText={mobileContent.badge.text}
                  className={styles.header}
                  headlineClassName={styles.headline}
                  title={
                    mobileContent.headline.line1 && mobileContent.headline.line2
                      ? { line1: mobileContent.headline.line1, line2: mobileContent.headline.line2 }
                      : mobileContent.headline.text
                  }
                />

                <p className={styles.description}>
                  <span className={styles.highlight}>
                    {mobileContent.description.highlight}
                  </span>
                  <span>{mobileContent.description.body}</span>
                </p>

                <div className={styles.buttonWrapper}>
                  <CTABannerButton label={mobileContent.ctaButton.label} />
                </div>
              </div>
            )}
          </div>

          {/* Right Visual Angled Reel Strips */}
          <div className={styles.reelsArea} aria-hidden="true">
            <div className={styles.reelsTransform}>
              {/* Strip 1 - Infinite Vertical Scroll Up */}
              <div className={styles.strip1}>
                <div className={styles.stripTrackUp}>
                  {/* Group 1 */}
                  <div className={styles.reelGroup}>
                    {content.reelStrip1.items.map((item) => (
                      <div
                        key={`strip1-g1-${item.id}`}
                        className={styles.reelCard}
                      >
                        <Image
                          src={item.image}
                          alt={item.alt}
                          width={274}
                          height={376}
                          className={styles.reelImage}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Group 2 (Duplicate for seamless infinite loop) */}
                  <div className={styles.reelGroup} aria-hidden="true">
                    {content.reelStrip1.items.map((item) => (
                      <div
                        key={`strip1-g2-${item.id}`}
                        className={styles.reelCard}
                      >
                        <Image
                          src={item.image}
                          alt={item.alt}
                          width={274}
                          height={376}
                          className={styles.reelImage}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strip 2 - Infinite Vertical Scroll Down */}
              <div className={styles.strip2}>
                <div className={styles.stripTrackDown}>
                  {/* Group 1 */}
                  <div className={styles.reelGroup}>
                    {content.reelStrip2.items.map((item) => (
                      <div
                        key={`strip2-g1-${item.id}`}
                        className={styles.reelCard}
                      >
                        <Image
                          src={item.image}
                          alt={item.alt}
                          width={278}
                          height={381}
                          className={styles.reelImage}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Group 2 (Duplicate for seamless infinite loop) */}
                  <div className={styles.reelGroup} aria-hidden="true">
                    {content.reelStrip2.items.map((item) => (
                      <div
                        key={`strip2-g2-${item.id}`}
                        className={styles.reelCard}
                      >
                        <Image
                          src={item.image}
                          alt={item.alt}
                          width={278}
                          height={381}
                          className={styles.reelImage}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
