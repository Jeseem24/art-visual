"use client";

import React, { useEffect, useState, useRef } from "react";
import { type FileInputProps, useClient } from "sanity";
import { Card, Flex, Box, Text, Badge, Stack, Spinner, Button } from "@sanity/ui";
import { Film, AlertTriangle, HardDrive, Play, Pause } from "lucide-react";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!assetRef) {
      return;
    }

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
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn("[VideoPreviewInput] Error resolving video asset details:", err);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [client, assetRef]);

  const activeVideoData = assetRef ? videoData : null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return "Unknown";
    const mb = bytes / (1024 * 1024);
    if (mb >= 1) return `${mb.toFixed(2)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  const isOverSize = (activeVideoData?.size || 0) > MAX_VIDEO_BYTES;

  return (
    <Stack gap={3}>
      {/* Inline Video Player Preview when asset is attached */}
      {assetRef && (
        <Card padding={3} radius={2} border tone="inherit">
          <Stack gap={2}>
            <Flex justify="space-between" align="center">
              <Flex align="center" gap={2}>
                <Film size={15} />
                <Text size={1} weight="semibold">Video Preview</Text>
              </Flex>
              {loading && <Spinner size={1} />}
              {isOverSize && (
                <Badge tone="critical" fontSize={0}>Exceeds 20MB limit</Badge>
              )}
            </Flex>

            {activeVideoData?.url ? (
              <Box style={{ position: "relative", overflow: "hidden", borderRadius: 4, background: "#080808" }}>
                <video
                  ref={videoRef}
                  src={activeVideoData.url}
                  muted
                  loop
                  playsInline
                  preload="none"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  style={{
                    width: "100%",
                    maxHeight: 240,
                    display: "block",
                    backgroundColor: "#000",
                    borderRadius: 4,
                  }}
                />
                <Box
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    zIndex: 2,
                  }}
                >
                  <Button
                    icon={isPlaying ? Pause : Play}
                    text={isPlaying ? "Pause" : "Play Preview"}
                    fontSize={1}
                    padding={2}
                    tone="primary"
                    onClick={togglePlay}
                  />
                </Box>
              </Box>
            ) : loading ? (
              <Card padding={4} tone="transparent" style={{ textAlign: "center" }}>
                <Spinner size={2} />
              </Card>
            ) : null}

            {/* Video File Metadata */}
            {activeVideoData && (
              <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
                <Flex align="center" gap={2}>
                  <HardDrive size={13} style={{ opacity: 0.6 }} />
                  <Text size={0} muted>{activeVideoData.originalFilename || "video.mp4"}</Text>
                  <Text size={0} muted>·</Text>
                  <Text size={0} muted>{formatSize(activeVideoData.size)}</Text>
                </Flex>
                <Badge tone="default" fontSize={0}>{activeVideoData.mimeType || "video/mp4"}</Badge>
              </Flex>
            )}

            {isOverSize && (
              <Card padding={2} radius={2} tone="critical">
                <Flex align="center" gap={2}>
                  <AlertTriangle size={14} />
                  <Text size={0}>
                    This video is larger than the 20MB recommended limit.
                  </Text>
                </Flex>
              </Card>
            )}
          </Stack>
        </Card>
      )}

      {/* Render native default file upload input */}
      {props.renderDefault(props)}
    </Stack>
  );
}

export default VideoPreviewInput;
