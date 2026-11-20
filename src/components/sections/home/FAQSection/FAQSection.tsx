"use client";

import React, { memo, useState, useCallback } from "react";
import { FAQItem } from "./FAQItem";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQ_DEFAULTS, type FAQSectionData } from "./constants";
import styles from "./FAQSection.module.css";

export interface FAQSectionProps {
  /** Optional custom data overrides */
  data?: Partial<FAQSectionData>;
  /** Optional custom class name */
  className?: string;
  /** Allow multiple accordions open simultaneously (default: false) */
  allowMultiple?: boolean;
}

/**
 * FAQSection component with single-item accordion behavior.
 */
export const FAQSection = memo(function FAQSection({
  data = FAQ_DEFAULTS,
  className = "",
}: FAQSectionProps) {
  const content = { ...FAQ_DEFAULTS, ...data };
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      className={`${styles.section} ${className}`.trim()}
      aria-labelledby="faq-heading"
    >
      <div className={styles.container}>
        <SectionHeader
          id="faq-heading"
          badgeText={content.badge.text}
          title={content.headline.text}
          className={styles.header}
          headlineClassName={styles.headline}
        />

        <div
          className={styles.faqListWrapper}
          role="region"
          aria-label="Frequently Asked Questions list"
        >
          {content.items.map((item) => (
            <FAQItem
              key={item.id}
              id={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
