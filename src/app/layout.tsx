import type { Metadata } from "next";
import { Anton, Bebas_Neue, Outfit, Inter, Poppins, Geist } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OverlayScrollbar } from "@/components/ui/OverlayScrollbar";
import { QuoteModalProvider } from "@/components/ui/QuoteModal";
import { NavigationScrollReset } from "@/components/ui/NavigationScrollReset";
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

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${bebasNeue.variable} ${outfit.variable} ${inter.variable} ${poppins.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-dark-primary font-sans">
        <NavigationScrollReset />
        <QuoteModalProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </QuoteModalProvider>
        <OverlayScrollbar />
      </body>
    </html>
  );
}
