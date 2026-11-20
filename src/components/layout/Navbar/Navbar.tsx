"use client";

import React, { memo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { useQuoteModal } from "@/components/ui/QuoteModal";
import { NAV_ITEMS, NAVBAR_CONFIG } from "./constants";
import styles from "./Navbar.module.css";

/**
 * 3-line hamburger icon that rotates 90 degrees to vertical lines when open
 */
const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <span
    className={`${styles.hamburgerWrapper} ${
      isOpen ? styles.hamburgerOpen : ""
    }`}
  >
    <svg
      width="22"
      height="15"
      viewBox="0 0 22 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.hamburgerSvg}
      aria-hidden="true"
    >
      <rect width="22" height="2" rx="1" fill="currentColor" />
      <rect y="6.5" width="22" height="2" rx="1" fill="currentColor" />
      <rect y="13" width="22" height="2" rx="1" fill="currentColor" />
    </svg>
  </span>
);

/**
 * Play badge icon with rounded background
 */
const TalkButtonPlayIcon = () => (
  <svg
    width="37"
    height="33"
    viewBox="0 0 37 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.playSvg}
    aria-hidden="true"
  >
    <rect width="37" height="33" rx="7" fill="white" />
    <path d="M13 26.5V6.5L28 16.5L13 26.5Z" fill="black" fillOpacity="0.99" />
  </svg>
);

export interface NavbarProps {
  /** Optional custom navigation items */
  navItems?: readonly { label: string; href: string }[];
  /** CTA button text */
  ctaLabel?: string;
  /** Custom vector icon element */
  ctaIcon?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Dynamic brand logo URL from Sanity */
  logoUrl?: string;
  /** Dynamic brand name for alt text */
  brandName?: string;
}

/**
 * @component Navbar
 * @description Main site navigation bar with desktop layout and mobile drawer
 */
export const Navbar = memo(function Navbar({
  navItems = NAV_ITEMS,
  ctaLabel = NAVBAR_CONFIG.ctaLabel,
  ctaIcon,
  className = "",
  logoUrl,
  brandName = "Art Visual",
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openQuoteModal } = useQuoteModal();

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  const handleToggle = () => setMobileMenuOpen((prev) => !prev);
  const handleClose = () => setMobileMenuOpen(false);
  const handleOpenQuoteModal = () => {
    setMobileMenuOpen(false);
    openQuoteModal();
  };

  const iconElement = ctaIcon ?? <TalkButtonPlayIcon />;

  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.container}>
        {/* Brand Logo - Fixed 95px x 51px (54px x 29px on mobile) */}
        <div className={styles.logoArea}>
          <Logo
            src={logoUrl || undefined}
            alt={brandName}
            width={95}
            height={51}
            priority
            className={styles.mobileLogo}
          />
        </div>

        {/* Desktop Navigation Links - Gap: 47.3px, Small Caps, Opacity: 0.85 */}
        <nav className={styles.navLinks} aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Primary Conversion CTA */}
        <div className={styles.ctaWrapper}>
          <button
            type="button"
            onClick={openQuoteModal}
            className={styles.talkButton}
          >
            <span className={styles.btnText}>{ctaLabel}</span>
            <span className={styles.btnIcon}>{iconElement}</span>
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={handleToggle}
          className={styles.mobileToggle}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <HamburgerIcon isOpen={mobileMenuOpen} />
        </button>
      </div>

      {/* Mobile Drawer Menu with smooth expand/collapse transition */}
      <div
        className={`${styles.mobileDrawer} ${
          mobileMenuOpen ? styles.mobileDrawerOpen : ""
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className={styles.mobileNavList} aria-label="Mobile Navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClose}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={handleOpenQuoteModal}
          className={`${styles.talkButton} ${styles.talkButtonMobile}`}
        >
          <span className={styles.btnText}>{ctaLabel}</span>
          <span className={styles.btnIcon}>{iconElement}</span>
        </button>
      </div>
    </header>
  );
});

export default Navbar;
