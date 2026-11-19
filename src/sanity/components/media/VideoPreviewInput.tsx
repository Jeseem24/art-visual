"use client";

import React, { useEffect, useState } from "react";
import { type FileInputProps, useClient } from "sanity";
import { Card, Flex, Box, Text, Badge, Stack, Spinner } from "@sanity/ui";
import { Film, AlertTriangle, CheckCircle2, HardDrive } from "lucide-react";

const CLIENT_CONFIG = { apiVersion: "2024-01-01" };
const MAX_VIDEO_BYTES = 20 * 1024 * 1024; // 20MB

interface VideoAssetData {
  url?: string;
  size?: number;
  mimeType?: string;
  originalFilename?: string;
}

export function VideoPreviewInput(props: FileInputProps) {
  const client = useClient(CLIENT_CONFIG);
  const assetRef = props.value?.asset?._ref;
  const [videoData, setVideoData] = useState<VideoAssetData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!assetRef) {
      setVideoData(null);
      return;
    }

    setLoading(true);
    client
      .fetch<VideoAssetData>(
        `*[_id == $id][0] {
          url,
          size,
          mimeType,
          originalFilename
        }`,
        { id: assetRef }
      )
      .then((res) => {
        if (isMounted) {
          setVideoData(res || null);
        }
      })
      .catch((err) => {
        console.warn("[VideoPreviewInput] Error resolving video asset details:", err);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [client, assetRef]);

  const formatSize = (bytes?: number) => {
    if (!bytes) return "Unknown";
    const mb = bytes / (1024 * 1024);
    if (mb >= 1) return `${mb.toFixed(2)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  const isOverSize = (videoData?.size || 0) > MAX_VIDEO_BYTES;

  return (
    <Stack gap={3}>
      {/* Inline Video Player Preview when asset is attached */}
      {assetRef && (
        <Card padding={3} radius={2} border tone="inherit">
          <Stack gap={2}>
            <Flex justify="space-between" align="center">
              <Flex align="center" gap={2}>
                <Film size={15} />
                <Text size={1} weight="semibold">Video Reel Playback Preview</Text>
              </Flex>
              {loading ? (
                <Spinner size={1} />
              ) : isOverSize ? (
                <Badge tone="critical" fontSize={0}>Exceeds 20MB Guardrail</Badge>
              ) : (
                <Badge tone="positive" fontSize={0}>20MB Guardrail Verified</Badge>
              )}
            </Flex>

            {videoData?.url ? (
              <Box style={{ position: "relative", overflow: "hidden", borderRadius: 4, background: "#080808" }}>
                <video
                  src={videoData.url}
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    width: "100%",
                    maxHeight: 260,
                    display: "block",
                    backgroundColor: "#000",
                    borderRadius: 4,
                  }}
                />
              </Box>
            ) : loading ? (
              <Card padding={4} tone="transparent" style={{ textAlign: "center" }}>
                <Spinner size={2} />
              </Card>
            ) : null}

            {/* Video File Metadata */}
            {videoData && (
              <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
                <Flex align="center" gap={2}>
                  <HardDrive size={13} style={{ opacity: 0.6 }} />
                  <Text size={0} muted>{videoData.originalFilename || "video.mp4"}</Text>
                  <Text size={0} muted>·</Text>
                  <Text size={0} muted>{formatSize(videoData.size)}</Text>
                </Flex>
                <Badge tone="default" fontSize={0}>{videoData.mimeType || "video/mp4"}</Badge>
              </Flex>
            )}

            {isOverSize && (
              <Card padding={2} radius={2} tone="critical">
                <Flex align="center" gap={2}>
                  <AlertTriangle size={14} />
                  <Text size={0}>
                    This video is larger than the 20MB free-tier recommended limit. Please compress it before publishing.
                  </Text>
                </Flex>
              </Card>
            )}
          </Stack>
        </Card>
      )}

      {/* Standard Sanity File Input (upload/replace/browse buttons) */}
      {props.renderDefault(props)}
    </Stack>
  );
}
