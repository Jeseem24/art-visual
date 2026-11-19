"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar, type NavbarProps } from "@/components/layout/Navbar";
import { Footer, type FooterProps } from "@/components/layout/Footer";
import { OverlayScrollbar } from "@/components/ui/OverlayScrollbar";
import { QuoteModalProvider } from "@/components/ui/QuoteModal";
import { NavigationScrollReset } from "@/components/ui/NavigationScrollReset";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export interface SiteLayoutProps {
  children: React.ReactNode;
  navItems?: NavbarProps["navItems"];
  ctaLabel?: NavbarProps["ctaLabel"];
  logoUrl?: string;
  brandName?: FooterProps["brandName"];
  brandDescription?: FooterProps["brandDescription"];
  contactItems?: FooterProps["contactItems"];
  socialLinks?: FooterProps["socialLinks"];
  copyright?: FooterProps["copyright"];
  quickLinks?: FooterProps["quickLinks"];
  servicesList?: FooterProps["servicesList"];
  legalLinks?: FooterProps["legalLinks"];
  draftBanner?: React.ReactNode;
}

/**
 * SiteLayout isolates public marketing layout chrome (Navbar, Footer, Modals,
 * Scrollbars, Navigation Resets) from embedded administrative tools such as /studio.
 */
export function SiteLayout({
  children,
  navItems,
  ctaLabel,
  logoUrl,
  brandName,
  brandDescription,
  contactItems,
  socialLinks,
  copyright,
  quickLinks,
  servicesList,
  legalLinks,
  draftBanner,
}: SiteLayoutProps) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return (
      <main className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#101112]">
        {children}
      </main>
    );
  }

  return (
    <div className="min-h-full flex flex-col bg-white text-dark-primary font-sans">
      <SmoothScroll />
      <NavigationScrollReset />
      <QuoteModalProvider>
        <Navbar navItems={navItems} ctaLabel={ctaLabel} logoUrl={logoUrl} brandName={brandName} />
        <main className="flex-1">{children}</main>
        <Footer
          brandName={brandName}
          brandDescription={brandDescription}
          contactItems={contactItems}
          socialLinks={socialLinks}
          copyright={copyright}
          quickLinks={quickLinks}
          servicesList={servicesList}
          legalLinks={legalLinks}
        />
      </QuoteModalProvider>
      {draftBanner}
      <OverlayScrollbar />
    </div>
  );
}

export default SiteLayout;
