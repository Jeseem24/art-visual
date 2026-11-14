"use client";

import React, { memo } from "react";
import type { FAQItemData } from "../constants";
import styles from "./FAQItem.module.css";

export interface FAQItemProps extends FAQItemData {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

/**
 * Plus icon component that rotates to a 45-degree cross when expanded.
 */
const PlusIcon = ({ isOpen }: { isOpen: boolean }) => (
  <span className={`${styles.iconWrapper} ${isOpen ? styles.iconOpen : ""}`}>
    <svg
      className={styles.icon}
      width="27"
      height="27"
      viewBox="0 0 26.9266 26.9266"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M26.9266 15.3866H15.3866V26.9266H11.54V15.3866H0V11.54H11.54V0H15.3866V11.54H26.9266V15.3866Z"
        fill="currentColor"
      />
    </svg>
  </span>
);

/**
 * Single FAQ accordion item with expand/collapse panel.
 */
export const FAQItem = memo(function FAQItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
  className = "",
}: FAQItemProps) {
  const contentId = `faq-answer-${id}`;
  const buttonId = `faq-trigger-${id}`;

  return (
    <div className={`${styles.item} ${className}`.trim()}>
      <button
        type="button"
        id={buttonId}
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`.trim()}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className={styles.questionText}>{question}</span>
        <span>
          <PlusIcon isOpen={isOpen} />
        </span>
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={`${styles.answerCollapse} ${
          isOpen ? styles.answerExpanded : ""
        }`}
      >
        <div className={styles.answerInner}>
          <p className={styles.answerText}>{answer}</p>
        </div>
      </div>
    </div>
  );
});
