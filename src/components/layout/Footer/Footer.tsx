"use client";

import React, { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FOOTER_DATA,
  type FooterLinkItem,
  type FooterContactItem,
} from "./constants";
import { FooterSocialPills } from "./FooterSocialPills";
import styles from "./Footer.module.css";

export interface FooterProps {
  className?: string;
  brandName?: string;
  brandDescription?: string;
  quickLinks?: readonly FooterLinkItem[] | FooterLinkItem[];
  servicesList?: readonly FooterLinkItem[] | FooterLinkItem[];
  contactItems?: readonly FooterContactItem[] | FooterContactItem[];
  copyright?: string;
  legalLinks?: readonly { label: string; href: string }[] | { label: string; href: string }[];
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
}

/**
 * @component Footer
 * @description Main site footer containing brand bio, contact details, quick links,
 * services list, social channels, and legal copyright links.
 */
export const Footer = memo(function Footer({
  className = "",
  brandName = FOOTER_DATA.brandName,
  brandDescription = FOOTER_DATA.brandDescription,
  quickLinks = FOOTER_DATA.quickLinks,
  servicesList = FOOTER_DATA.servicesList,
  contactItems = FOOTER_DATA.contactItems,
  copyright = FOOTER_DATA.copyright,
  legalLinks = FOOTER_DATA.legalLinks,
  socialLinks,
}: FooterProps) {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  return (
    <footer
      className={`${styles.footer} ${className}`}
      role="contentinfo"
    >
      <div className={styles.inner}>
        {/* Brand Logo */}
        <Link
          href="/"
          className={styles.brandLogo}
          aria-label="Art Visual - Home"
        >
          {brandName}
        </Link>

        {/* 3-Column Content Grid */}
        <div className={styles.contentGrid}>
          {/* Column 1: Brand Bio & Contact Details */}
          <div className={styles.colBrandContact}>
            <p className={styles.brandBio}>
              {brandDescription}
            </p>

            <div className={styles.contactBlock}>
              <h3 className={styles.heading}>
                Contact
              </h3>

              <ul className={styles.linksList}>
                {contactItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={styles.contactItem}
                      aria-label={`${item.label}: ${item.value || ""}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Quick Links & Social Channels */}
          <div className={styles.colQuickLinks}>
            <div className={styles.quickLinksGroup}>
              <h3 className={styles.heading}>
                Quick Links
              </h3>

              <nav aria-label="Footer Quick Links">
                <ul className={styles.linksList}>
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className={styles.linkItem}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <FooterSocialPills links={socialLinks} />
          </div>

          {/* Column 3: Services List */}
          <div className={styles.colServices}>
            <h3 className={styles.heading}>
              Our Services
            </h3>

            <nav aria-label="Footer Services">
              <ul className={styles.linksList}>
                {servicesList.map((svc) => (
                  <li key={svc.label}>
                    <Link href={svc.href} className={styles.linkItem}>
                      {svc.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Full-width Divider Line */}
      <hr className={styles.divider} />

      {/* Bottom Row: Copyright & Legal */}
      <div className={styles.inner}>
        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            {copyright}
          </p>

          <div className={styles.legalLinks}>
            {legalLinks.map((legal) => (
              <Link
                key={legal.label}
                href={legal.href}
                className={styles.legalLink}
              >
                {legal.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
