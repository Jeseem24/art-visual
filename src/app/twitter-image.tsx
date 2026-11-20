import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

export const alt = "Art Visual - Commercial Video Production & Brand Films";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#080808",
          color: "#ffffff",
          padding: "50px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid border overlay */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "16px",
          }}
        />

        {/* Category Pill / Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 20px",
            borderRadius: "9999px",
            border: "1px solid rgba(223, 0, 0, 0.4)",
            backgroundColor: "rgba(223, 0, 0, 0.12)",
            color: "#ff4d4d",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          Commercial Video Production Studio
        </div>

        {/* Brand Name */}
        <div
          style={{
            fontSize: "76px",
            fontWeight: 900,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#ffffff",
            marginBottom: "12px",
            lineHeight: 1.1,
          }}
        >
          {siteConfig.name}
        </div>

        {/* Tagline / Value Proposition */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 500,
            color: "#d4d4d8",
            textAlign: "center",
            maxWidth: "880px",
            lineHeight: 1.4,
            marginBottom: "28px",
          }}
        >
          {siteConfig.tagline}
        </div>

        {/* Clear Call to Action (CTA Button) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#DF0000",
            color: "#ffffff",
            padding: "16px 36px",
            borderRadius: "100px",
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            boxShadow: "0 10px 30px rgba(223, 0, 0, 0.45)",
          }}
        >
          <span>Watch Showreel &amp; Explore Work &rarr;</span>
        </div>

        {/* Capabilities Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#71717a",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
          }}
        >
          <span>Brand Films</span>
          <span>&bull;</span>
          <span>Commercial Ads</span>
          <span>&bull;</span>
          <span>Product Videos</span>
          <span>&bull;</span>
          <span>Chennai &amp; Worldwide</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
