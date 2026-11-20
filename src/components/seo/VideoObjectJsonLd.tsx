import React from "react";
import { JsonLd } from "./JsonLd";
import {
  buildVideoObjectSchema,
  FEATURED_SHOWREEL_VIDEOS,
} from "@/lib/seo/structuredData";

export interface VideoData {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  embedUrl?: string;
  uploadDate?: string;
  duration?: string;
}

export interface VideoObjectJsonLdProps {
  video: VideoData;
  siteUrl?: string;
  brandName?: string;
  id?: string;
}

export interface FeaturedVideosJsonLdProps {
  videos?: readonly VideoData[] | VideoData[];
  siteUrl?: string;
  brandName?: string;
  id?: string;
}

/**
 * VideoObject Structured Data Component for individual videos.
 */
export function VideoObjectJsonLd({
  video,
  siteUrl,
  brandName,
  id = "video-object-schema",
}: VideoObjectJsonLdProps) {
  const schema = buildVideoObjectSchema(video, { siteUrl, brandName });
  return <JsonLd id={id} data={schema} />;
}

/**
 * VideoObject Structured Data Component for featured showreels collection.
 */
export function FeaturedVideosJsonLd({
  videos = FEATURED_SHOWREEL_VIDEOS,
  siteUrl,
  brandName,
  id = "featured-videos-schema",
}: FeaturedVideosJsonLdProps) {
  const schemas = videos.map((video) =>
    buildVideoObjectSchema(video, { siteUrl, brandName })
  );
  return <JsonLd id={id} data={schemas} />;
}
