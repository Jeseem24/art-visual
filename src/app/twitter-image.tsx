import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

export const alt = "Art Visual - Films that make brands worth watching";
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
          padding: "60px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        />

        <div
          style={{
            fontSize: "72px",
            fontWeight: 900,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#ffffff",
            marginBottom: "16px",
          }}
        >
          {siteConfig.name}
        </div>

        <div
          style={{
            fontSize: "28px",
            fontWeight: 500,
            color: "#a1a1aa",
            textAlign: "center",
            maxWidth: "850px",
            lineHeight: 1.4,
            marginBottom: "32px",
          }}
        >
          {siteConfig.tagline}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#71717a",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          <span>Commercials</span>
          <span>/</span>
          <span>Brand Films</span>
          <span>/</span>
          <span>Product Videos</span>
          <span>/</span>
          <span>Corporate</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
