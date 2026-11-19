"use client";

import React, { memo, useState, useMemo, useRef, useEffect } from "react";
import { ServiceCard } from "@/components/sections/home/ServicesSection/ServiceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ServiceItem } from "@/components/sections/home/ServicesSection/constants";
import {
  SERVICES_CATALOG_HEADER,
  SERVICES_CATALOG_ITEMS,
} from "./constants";
import styles from "./ServicesCatalogSection.module.css";

const CATEGORIES = [
  "ALL",
  "Brand Video Production",
  "Corporate Video Production",
  "Product Videography",
  "Social Media Video Content",
  "Promotional & Advertising Videos",
  "Commercial Video Production",
];

export interface ServicesCatalogSectionProps {
  /** Subtitle text */
  badgeText?: string;
  /** Primary headline line 1 */
  titleLine1?: string;
  /** Primary headline line 2 */
  titleLine2?: string;
  /** Complete catalog services list */
  services?: ServiceItem[];
  /** Optional custom class name */
  className?: string;
}

/**
 * @component ServicesCatalogSection
 * @description Full services grid for the Services page with interactive Search Bar and Category Dropdown .
 */
export const ServicesCatalogSection = memo(function ServicesCatalogSection({
  badgeText = SERVICES_CATALOG_HEADER.badge.text,
  titleLine1 = SERVICES_CATALOG_HEADER.title.line1,
  titleLine2 = SERVICES_CATALOG_HEADER.title.line2,
  services = SERVICES_CATALOG_ITEMS,
  className = "",
}: ServicesCatalogSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "ALL" ||
        service.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory.toLowerCase().includes(service.title.toLowerCase());

      // Search query filter
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        service.title.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  return (
    <section
      className={`${styles.section} ${className}`.trim()}
      aria-labelledby="services-catalog-heading"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <SectionHeader
          id="services-catalog-heading"
          badgeText={badgeText}
          title={{ line1: titleLine1, line2: titleLine2 }}
        />

        {/* Search & Category Filter Controls  */}
        <div className={styles.controlsRow}>
          {/* Search Bar */}
          <div className={styles.searchBar}>
            <svg
              className={styles.searchIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Service Name"
              className={styles.searchInput}
              aria-label="Search by service name"
            />
          </div>

          {/* Category Dropdown */}
          <div className={styles.filterDropdownWrapper} ref={dropdownRef}>
            <button
              type="button"
              className={styles.filterButton}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              <span>{selectedCategory}</span>
              <svg
                className={`${styles.chevronIcon} ${isDropdownOpen ? styles.chevronOpen : ""}`.trim()}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className={styles.filterMenu} role="listbox">
                {CATEGORIES.map((category) => (
                  <li key={category} role="option" aria-selected={selectedCategory === category}>
                    <button
                      type="button"
                      className={`${styles.filterOption} ${
                        selectedCategory === category ? styles.activeOption : ""
                      }`.trim()}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className={styles.cardsGrid}>
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                videoSrc={service.videoSrc}
                posterSrc={service.posterSrc}
                href={service.href}
                ctaLabel={service.ctaLabel}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No services found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
});

export default ServicesCatalogSection;
