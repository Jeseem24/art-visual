import React, { memo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { ABOUT_SECTION_DEFAULTS, type AboutSectionData } from "./constants";
import styles from "./AboutSection.module.css";

export interface AboutSectionProps {
  /** Optional override for section data */
  data?: Partial<AboutSectionData>;
  /** Optional custom class name */
  className?: string;
}

/**
 * @component AboutSection
 * @description About Us section displaying studio story, video showcase, and brand marquee ribbon.
 */
export const AboutSection = memo(function AboutSection({
  data = ABOUT_SECTION_DEFAULTS,
  className = "",
}: AboutSectionProps) {
  const content = { ...ABOUT_SECTION_DEFAULTS, ...data };

  return (
    <section
      className={`${styles.section} ${className}`.trim()}
      aria-labelledby="about-headline"
    >
      {/* Top Horizontal Architectural Border */}
      <div
        className={styles.topBorderLine}
        aria-hidden="true"
      />

      <div className={styles.container}>
        {/* Vertical Architectural Divider Line */}
        <div
          className={styles.verticalDividerLine}
          aria-hidden="true"
        />

        {/* Top Row: Badge + Headline (Left) & Story Text (Right) */}
        <div className={styles.topRow}>
          {/* Left Column */}
          <div className={styles.leftCol}>
            <SectionHeader
              id="about-headline"
              align="left"
              badgeText={content.badge.text}
              title={
                content.headline.line1 && content.headline.line2
                  ? { line1: content.headline.line1, line2: content.headline.line2 }
                  : content.headline.text
              }
            />
          </div>

          {/* Right Column: Story Paragraph */}
          <div className={styles.rightCol}>
            <p className={styles.storyParagraph}>
              <span className={styles.storyHighlight}>
                {content.story.highlight}
              </span>
              <span className={styles.storyBody}>{content.story.body}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Middle Horizontal Divider & Reticle */}
      <div className={styles.middleDividerWrapper}>
        <div
          className={styles.middleBorderLine}
          aria-hidden="true"
        />
        <div className={styles.crosshairReticle} aria-hidden="true">
          <div className={styles.reticleVertical} />
          <div className={styles.reticleHorizontal} />
        </div>
      </div>

      {/* Lower Showcase: Viewfinder Video/Media Card & Slanted Ribbon Marquee */}
      <div className={styles.showcaseArea}>
        {/* Creative Production Video Card */}
        <div className={styles.photoContainer}>
          <div className={styles.photoImageWrapper}>
            {content.media.videoSrc ? (
              <LazyVideo
                src={content.media.videoSrc}
                priority={false}
                className={styles.mediaVideo}
                aria-label={content.media.alt}
              />
            ) : (
              <Image
                src={content.media.posterSrc || "/images/about/studio-inspiration.png"}
                alt={content.media.alt}
                fill
                sizes="(max-width: 768px) 100vw, 503px"
                className={styles.photoImage}
                priority={false}
              />
            )}

            {/* Camera Viewfinder Frame */}
            <div
              className={styles.viewfinderFrame}
              aria-hidden="true"
            >
              <div className={styles.viewfinderCornerTL} />
              <div className={styles.viewfinderCornerBR} />
            </div>
          </div>
        </div>

        {/* Slanted Animated Brand Marquee Ribbon */}
        <div
          className={styles.ribbonWrapper}
          aria-label="Brand Statements Marquee"
        >
          <div className={styles.ribbonTrack}>
            {/* Set 1 */}
            <div className={styles.ribbonGroup}>
              {content.ribbon.items.map((text, idx) => (
                <div key={`ribbon-1-${idx}`} className={styles.ribbonItem}>
                  <span className={styles.ribbonDot} aria-hidden="true" />
                  <span className={styles.ribbonText}>{text}</span>
                </div>
              ))}
            </div>

            {/* Set 2 (Seamless loop duplicate) */}
            <div className={styles.ribbonGroup} aria-hidden="true">
              {content.ribbon.items.map((text, idx) => (
                <div key={`ribbon-2-${idx}`} className={styles.ribbonItem}>
                  <span className={styles.ribbonDot} />
                  <span className={styles.ribbonText}>{text}</span>
                </div>
              ))}
            </div>

            {/* Set 3 (Ensure seamless continuity on ultra-wide screens) */}
            <div className={styles.ribbonGroup} aria-hidden="true">
              {content.ribbon.items.map((text, idx) => (
                <div key={`ribbon-3-${idx}`} className={styles.ribbonItem}>
                  <span className={styles.ribbonDot} />
                  <span className={styles.ribbonText}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reusable "About the Studio" CTA Button */}
        <div className={styles.ctaWrapper}>
          <Button
            href={content.cta.href}
            className={styles.aboutButton}
          >
            {content.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
});

