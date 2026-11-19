"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  WORK_CATEGORIES,
  WORK_PROJECTS,
  type WorkCategory,
  type WorkProjectItem,
} from "@/data/worksData";
import { WorkProjectCard } from "./WorkProjectCard";
import styles from "./WorkShowcaseSection.module.css";

export interface WorkShowcaseSectionProps {
  /** Filter categories displayed in the tab bar */
  categories?: readonly WorkCategory[];
  /** Portfolio projects rendered in the grid */
  projects?: readonly WorkProjectItem[];
  /** Initial active category */
  initialCategory?: WorkCategory;
  /** Optional custom class name */
  className?: string;
}

/**
 * @component WorkShowcaseSection
 * @description Interactive category filter bar and responsive 3-column portfolio grid
 * for the Work page.
 */
export function WorkShowcaseSection({
  categories = WORK_CATEGORIES,
  projects = WORK_PROJECTS,
  initialCategory = "All Projects",
  className = "",
}: WorkShowcaseSectionProps) {
  const [activeCategory, setActiveCategory] =
    useState<WorkCategory>(initialCategory);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const bar = filterBarRef.current;
    if (!bar) return;

    const handleWheel = (event: WheelEvent) => {
      if (bar.scrollWidth <= bar.clientWidth) return;
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        bar.scrollLeft += event.deltaY;
      }
    };

    bar.addEventListener("wheel", handleWheel, { passive: false });
    return () => bar.removeEventListener("wheel", handleWheel);
  }, []);

  const handleSelectCategory = useCallback(
    (category: WorkCategory, index: number) => {
      setActiveCategory(category);

      const bar = filterBarRef.current;
      const button = buttonRefs.current[index];
      if (!bar || !button) return;

      if (index === 0) {
        bar.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      const paddingLeft = parseFloat(getComputedStyle(bar).paddingLeft) || 0;
      const targetLeft = Math.max(0, button.offsetLeft - paddingLeft);
      bar.scrollTo({ left: targetLeft, behavior: "smooth" });
    },
    []
  );

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All Projects") {
      return projects;
    }
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <section
      className={`${styles.section} ${className}`.trim()}
      aria-label="Portfolio showcase"
    >
      <div className={styles.container}>
        {/* Category Filter Bar (Desktop & Mobile ) */}
        <div
          ref={filterBarRef}
          className={styles.filterBar}
          role="tablist"
          aria-label="Project categories"
        >
          {categories.map((category, index) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelectCategory(category, index)}
                className={`${styles.filterButton} ${
                  isActive ? styles.filterButtonActive : ""
                }`.trim()}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          aria-label={`${activeCategory} projects`}
        >
          {filteredProjects.length > 0 ? (
            <div className={styles.grid}>
              {filteredProjects.map((project) => (
                <WorkProjectCard
                  key={project.id}
                  projectName={project.projectName}
                  category={project.category}
                  brandName={project.brandName}
                  imageSrc={project.imageSrc}
                  videoSrc={project.videoSrc}
                  imageAlt={project.imageAlt}
                />
              ))}
            </div>
          ) : (
            <p className={styles.emptyState}>
              No projects found in this category yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default WorkShowcaseSection;
