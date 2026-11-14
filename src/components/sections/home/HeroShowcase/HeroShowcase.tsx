import React, { memo } from "react";
import { ShowcaseCard } from "./ShowcaseCard";
import { HERO_SHOWCASE_CARDS } from "./constants";
import styles from "./HeroShowcase.module.css";

export interface HeroShowcaseProps {
  className?: string;
}

const slotClassNames = [
  styles.cardSlot1,
  styles.cardSlot2,
  styles.cardSlot3,
  styles.cardSlot4,
  styles.cardSlot5,
];

/**
 * @component HeroShowcase
 * @description Hero Showcase section with hanging thread line and
 * showcase cards positioned along the curved wire arc.
 */
export const HeroShowcase = memo(function HeroShowcase({
  className = "",
}: HeroShowcaseProps) {
  return (
    <div className={`${styles.showcaseWrapper} ${className}`}>
      {/* Hanging Wire Thread */}
      <div className={styles.threadWrapper} aria-hidden="true">
        <svg
          width="1920"
          height="202"
          viewBox="0 0 1920 202"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.threadSvg}
        >
          <path
            id="Line 1"
            opacity="0.32"
            d="M-53 0.394531C-53 0.394531 207.894 201.395 961 201.395C1714.11 201.395 1975 0.394531 1975 0.394531"
            stroke="black"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* 5 Hanging Showcase Cards */}
      <div className={styles.cardsArea}>
        {HERO_SHOWCASE_CARDS.map((card, index) => {
          const slotClass = slotClassNames[index] ?? styles.cardSlot3;
          return (
            <div
              key={card.id}
              className={`${styles.cardSlot} ${slotClass}`}
            >
              <ShowcaseCard
                id={card.id}
                title={card.title}
                description={card.description}
                image={card.image}
                videoSrc={card.videoSrc}
                priority={index === 2}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default HeroShowcase;
