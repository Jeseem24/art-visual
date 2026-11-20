import type { Metadata, Viewport } from "next";
import { Anton, Bebas_Neue, Outfit, Inter, Poppins, Geist } from "next/font/google";
import { siteConfig } from "@/config/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { DraftModeBanner } from "@/components/ui/DraftModeBanner";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY, NAVBAR_QUERY } from "@/sanity/lib/queries";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo";
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
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  ogImageUrl?: string;
  ogImageAlt?: string;
  googleSiteVerification?: string;
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await sanityFetch<SanitySiteSettings | null>({
    query: SITE_SETTINGS_QUERY,
    fallback: null,
    tags: ["siteSettings", "layout"],
  });

  const rawBrand = siteSettings?.brandName || siteConfig.name;
  const brandName = rawBrand.toLowerCase() === "art visual" ? "Art Visual" : rawBrand;
  const tagline = siteSettings?.tagline || siteConfig.tagline;
  const description =
    siteSettings?.metaDescription ||
    siteSettings?.brandDescription ||
    siteConfig.description;
  const titleDefault = siteSettings?.metaTitle || `${brandName} | ${tagline}`;
  const faviconUrl = siteSettings?.faviconUrl;
  const ogImageUrl = siteSettings?.ogImageUrl || "/images/art-visual-logo.png";
  const ogImageAlt = siteSettings?.ogImageAlt || brandName;

  const defaultKeywords = [
    "commercial video production",
    "video production company",
    "brand films",
    "product videography",
    "corporate video production",
    "promotional videos",
    "event videography",
    "social media video content",
    "cinematography",
    "video agency Chennai",
    "commercial film production India",
    "creative agency",
    "video storytelling",
    "high impact video",
  ];
  const keywords =
    siteSettings?.metaKeywords && siteSettings.metaKeywords.length > 0
      ? siteSettings.metaKeywords
      : defaultKeywords;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: titleDefault,
      template: `%s | ${brandName}`,
    },
    description,
    keywords,
    authors: [{ name: brandName, url: siteUrl }],
    creator: brandName,
    publisher: brandName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: brandName,
      title: titleDefault,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleDefault,
      description,
      creator: "@artvisual",
      images: [ogImageUrl],
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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: siteSettings?.googleSiteVerification
      ? {
          google: siteSettings.googleSiteVerification,
        }
      : undefined,
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
        <OrganizationJsonLd
          brandName={brandName}
          logoUrl={siteSettings?.logoUrl}
          email={siteSettings?.contactEmail}
          phone={siteSettings?.contactPhone}
          location={siteSettings?.location}
        />
        <WebSiteJsonLd brandName={brandName} />
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
