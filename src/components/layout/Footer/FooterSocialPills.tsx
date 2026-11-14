import React, { memo } from "react";
import styles from "./Footer.module.css";

interface SocialItemConfig {
  id: string;
  name: string;
  href: string;
  viewBox: string;
  icon: React.ReactNode;
}

const SOCIAL_ITEMS: SocialItemConfig[] = [
  {
    id: "instagram",
    name: "Instagram",
    href: "https://instagram.com",
    viewBox: "0 0 35.3853 35.3853",
    icon: (
      <path
        d="M10.2617 0H25.1236C30.7852 0 35.3853 4.60009 35.3853 10.2617V25.1236C35.3853 27.8452 34.3042 30.4553 32.3797 32.3797C30.4553 34.3042 27.8452 35.3853 25.1236 35.3853H10.2617C4.60009 35.3853 0 30.7852 0 25.1236V10.2617C0 7.54016 1.08115 4.93005 3.0056 3.0056C4.93005 1.08115 7.54016 0 10.2617 0ZM9.90789 3.53853C8.21863 3.53853 6.59856 4.20959 5.40407 5.40407C4.20959 6.59856 3.53853 8.21863 3.53853 9.90789V25.4774C3.53853 28.9983 6.38705 31.8468 9.90789 31.8468H25.4774C27.1667 31.8468 28.7868 31.1757 29.9813 29.9813C31.1757 28.7868 31.8468 27.1667 31.8468 25.4774V9.90789C31.8468 6.38705 28.9983 3.53853 25.4774 3.53853H9.90789ZM26.9813 6.19243C27.5679 6.19243 28.1304 6.42544 28.5451 6.84019C28.9599 7.25494 29.1929 7.81747 29.1929 8.40401C29.1929 8.99056 28.9599 9.55309 28.5451 9.96784C28.1304 10.3826 27.5679 10.6156 26.9813 10.6156C26.3948 10.6156 25.8322 10.3826 25.4175 9.96784C25.0027 9.55309 24.7697 8.99056 24.7697 8.40401C24.7697 7.81747 25.0027 7.25494 25.4175 6.84019C25.8322 6.42544 26.3948 6.19243 26.9813 6.19243ZM17.6927 8.84633C20.0389 8.84633 22.289 9.77835 23.948 11.4374C25.607 13.0964 26.539 15.3465 26.539 17.6927C26.539 20.0389 25.607 22.289 23.948 23.948C22.289 25.607 20.0389 26.539 17.6927 26.539C15.3465 26.539 13.0964 25.607 11.4374 23.948C9.77835 22.289 8.84633 20.0389 8.84633 17.6927C8.84633 15.3465 9.77835 13.0964 11.4374 11.4374C13.0964 9.77835 15.3465 8.84633 17.6927 8.84633ZM17.6927 12.3849C16.2849 12.3849 14.9349 12.9441 13.9395 13.9395C12.9441 14.9349 12.3849 16.2849 12.3849 17.6927C12.3849 19.1004 12.9441 20.4504 13.9395 21.4458C14.9349 22.4412 16.2849 23.0005 17.6927 23.0005C19.1004 23.0005 20.4504 22.4412 21.4458 21.4458C22.4412 20.4504 23.0005 19.1004 23.0005 17.6927C23.0005 16.2849 22.4412 14.9349 21.4458 13.9395C20.4504 12.9441 19.1004 12.3849 17.6927 12.3849Z"
        fill="currentColor"
      />
    ),
  },
  {
    id: "facebook",
    name: "Facebook",
    href: "https://facebook.com",
    viewBox: "0 0 24.5732 38.3341",
    icon: (
      <path
        d="M1.47439 15.2353V23.0988H7.37194V36.8597H15.2353V23.0988H21.1329L23.0988 15.2353H15.2353V11.3036C15.2353 10.2323 16.1298 9.33779 17.2012 9.33779H23.0988V1.47439H17.2012C11.8482 1.47439 7.37194 5.95063 7.37194 11.3036V15.2353H1.47439Z"
        strokeWidth="2.94878"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
    ),
  },
  {
    id: "twitter",
    name: "Twitter / X",
    href: "https://x.com",
    viewBox: "0 0 36.1222 32.1165",
    icon: (
      <path
        d="M33.8848 6.79344C33.7046 7.45424 32.9036 9.11624 31.542 10.6981C30.6409 28.0791 13.7806 33.7259 2.22663 27.8989C0.644722 25.7963 7.93351 26.6574 10.5967 22.6325C0.524578 17.4863 1.32554 3.72975 3.34798 4.29042C8.0937 10.6781 15.7429 11.2588 16.9844 10.6781C16.9844 9.21636 16.3637 6.03252 19.8078 3.36931C21.7902 1.9476 25.9352 0.686076 29.6797 4.75098C30.3205 5.17148 31.2416 5.3517 32.6233 5.05134C33.4443 4.63083 34.5256 4.91117 33.9649 6.37293L33.8848 6.79344Z"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
    ),
  },
  {
    id: "youtube",
    name: "YouTube",
    href: "https://youtube.com",
    viewBox: "0 0 33.1193 26.4954",
    icon: (
      <>
        <path
          d="M16.5596 1.65596C31.4633 1.65596 31.4633 1.65596 31.4633 13.2477C31.4633 24.8394 31.4633 24.8394 16.5596 24.8394C1.65597 24.8394 1.65597 24.8394 1.65597 13.2477C1.65597 1.65596 1.65597 1.65596 16.5596 1.65596Z"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="currentColor"
        />
        <path d="M13.2477 8.5L21.5 13.2477L13.2477 18V8.5Z" fill="currentColor" />
      </>
    ),
  },
];

export interface FooterSocialPillsProps {
  links?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
}

/**
 * @component FooterSocialPills
 * @description Social icon links (Instagram, Facebook, Twitter, YouTube)
 */
export const FooterSocialPills = memo(function FooterSocialPills({
  links,
}: FooterSocialPillsProps = {}) {
  return (
    <div className={styles.socialRow} aria-label="Social media links">
      {SOCIAL_ITEMS.map((item) => {
        const targetHref =
          links?.[item.id as keyof typeof links] || item.href;
        return (
          <a
            key={item.id}
            href={targetHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialPill}
            aria-label={item.name}
          >
            <svg
              className={styles.socialIconSvg}
              viewBox={item.viewBox}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {item.icon}
            </svg>
          </a>
        );
      })}
    </div>
  );
});

export default FooterSocialPills;

