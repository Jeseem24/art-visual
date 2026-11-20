import type { Metadata } from "next";
import { Anton, Bebas_Neue, Outfit, Inter, Poppins, Geist } from "next/font/google";
import { siteConfig } from "@/config/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { DraftModeBanner } from "@/components/ui/DraftModeBanner";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY, NAVBAR_QUERY } from "@/sanity/lib/queries";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

interface SanitySiteSettings {
  brandName?: string;
  tagline?: string;
  brandDescription?: string;
  faviconUrl?: string;
  logoUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  location?: string;
  whatsappNumber?: string;
  socialInstagram?: string;
  socialFacebook?: string;
  socialTwitter?: string;
  socialYoutube?: string;
  copyright?: string;
  quickLinks?: Array<{ label: string; href: string }>;
  servicesList?: Array<{ label: string; href: string }>;
  legalLinks?: Array<{ label: string; href: string }>;
}

interface SanityNavbarData {
  navItems?: Array<{ label: string; href: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  whatsappDefaultMsg?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await sanityFetch<SanitySiteSettings | null>({
    query: SITE_SETTINGS_QUERY,
    fallback: null,
    tags: ["siteSettings", "layout"],
  });

  const rawBrand = siteSettings?.brandName || siteConfig.name;
  const brandName = rawBrand.toLowerCase() === "art visual" ? "Art Visual" : rawBrand;
  const tagline = siteSettings?.tagline || siteConfig.tagline;
  const description = siteSettings?.brandDescription || siteConfig.description;
  const faviconUrl = siteSettings?.faviconUrl;

  return {
    title: {
      default: `${brandName} | ${tagline}`,
      template: `%s | ${brandName}`,
    },
    description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      siteName: brandName,
      title: `${brandName} | ${tagline}`,
      description,
      images: [
        {
          url: "/images/art-visual-logo.png",
          width: 1200,
          height: 630,
          alt: brandName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${brandName} | ${tagline}`,
      description,
      images: ["/images/art-visual-logo.png"],
    },
    icons: {
      icon: [
        ...(faviconUrl ? [{ url: faviconUrl, sizes: "any" }] : []),
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: [
        { url: faviconUrl || "/apple-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [siteSettings, navbarData] = await Promise.all([
    sanityFetch<SanitySiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      fallback: null,
      tags: ["siteSettings", "layout"],
    }),
    sanityFetch<SanityNavbarData | null>({
      query: NAVBAR_QUERY,
      fallback: null,
      tags: ["navbarSettings", "layout"],
    }),
  ]);

  const footerContactItems = siteSettings
    ? [
        {
          label: "Email Address",
          value: siteSettings.contactEmail || siteConfig.contact.email,
          href: `mailto:${siteSettings.contactEmail || siteConfig.contact.email}`,
        },
        {
          label: "Phone Number",
          value: siteSettings.contactPhone || "+91 98765 43210",
          href: `tel:${(siteSettings.contactPhone || "+919876543210").replace(/\s+/g, "")}`,
        },
        {
          label: "Location",
          value: siteSettings.location || "Chennai, India",
          href: "#location",
        },
        {
          label: "WhatsApp",
          value: siteSettings.whatsappNumber || "+91 98765 43210",
          href: `https://wa.me/${(siteSettings.whatsappNumber || "+919876543210").replace(/\D/g, "")}`,
        },
      ]
    : undefined;

  const socialLinks = siteSettings
    ? {
        instagram: siteSettings.socialInstagram,
        facebook: siteSettings.socialFacebook,
        twitter: siteSettings.socialTwitter,
        youtube: siteSettings.socialYoutube,
      }
    : undefined;

  const rawBrand = siteSettings?.brandName || siteConfig.name;
  const brandName = rawBrand.toLowerCase() === "art visual" ? "Art Visual" : rawBrand;

  return (
    <html
      lang="en"
      className={`${anton.variable} ${bebasNeue.variable} ${outfit.variable} ${inter.variable} ${poppins.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans antialiased">
        <SiteLayout
          navItems={navbarData?.navItems}
          ctaLabel={navbarData?.ctaLabel}
          logoUrl={siteSettings?.logoUrl}
          brandName={brandName}
          brandDescription={siteSettings?.brandDescription}
          contactItems={footerContactItems}
          socialLinks={socialLinks}
          copyright={siteSettings?.copyright}
          quickLinks={siteSettings?.quickLinks}
          servicesList={siteSettings?.servicesList}
          legalLinks={siteSettings?.legalLinks}
          draftBanner={<DraftModeBanner />}
        >
          {children}
        </SiteLayout>
      </body>
    </html>
  );
}
