"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useClient } from "sanity";
import { Card, Flex, Box, Text, Badge, Stack, Spinner } from "@sanity/ui";
import { Layers, CheckCircle2, AlertTriangle, ExternalLink, HardDrive } from "lucide-react";

const CLIENT_CONFIG = { apiVersion: "2024-01-01" };

const TYPE_NAME_MAP: Record<string, string> = {
  homePage: "Home Page",
  aboutPage: "About Page",
  servicesPage: "Services Page",
  workPage: "Work Page",
  contactPage: "Contact Page",
  siteSettings: "Site Settings & Footer",
  navbarSettings: "Navigation Header",
  ctaBanner: "CTA Banner",
  featuredWork: "Portfolio Project",
  serviceItem: "Service Item",
  testimonial: "Testimonial",
  faqItem: "FAQ Item",
};

interface ReferencingDoc {
  _id: string;
  _type: string;
  title?: string;
  name?: string;
  projectName?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AssetUsageDetails(props: any) {
  const { currentAsset, renderDefaultDetails } = props;
  const router = useRouter();
  const client = useClient(CLIENT_CONFIG);
  const [references, setReferences] = useState<ReferencingDoc[]>([]);
  const [loading, setLoading] = useState(Boolean(currentAsset?._id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!currentAsset?._id) {
      return;
    }

    // Query for any document that references this asset id
    const assetId = currentAsset._id;
    client
      .fetch<ReferencingDoc[]>(
        `*[references($assetId)] {
          _id,
          _type,
          title,
          name,
          projectName
        }`,
        { assetId }
      )
      .then((docs) => {
        if (isMounted) {
          setReferences(docs || []);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("[AssetUsageDetails] Error checking asset references:", err);
          setError("Could not load asset usage tracking.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [client, currentAsset?._id]);

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown";
    const mb = bytes / (1024 * 1024);
    if (mb >= 1) return `${mb.toFixed(2)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  const isOverSizeGuardrail = (currentAsset?.size || 0) > 20 * 1024 * 1024;

  return (
    <Stack gap={4}>
      {/* Sanity Media Default Details Form (Tags, Alt, Title) */}
      {typeof renderDefaultDetails === "function" ? renderDefaultDetails(props) : null}

      {/* Asset Usage & Safety Tracking Inspector */}
      <Card padding={3} radius={2} border tone="inherit">
        <Stack gap={3}>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={2}>
              <Layers size={15} />
              <Text size={1} weight="semibold">Asset Usage & Safety Tracking</Text>
            </Flex>
            {loading ? (
              <Spinner size={1} />
            ) : references.length > 0 ? (
              <Badge tone="caution" fontSize={0}>In Active Use ({references.length})</Badge>
            ) : (
              <Badge tone="positive" fontSize={0}>Unreferenced</Badge>
            )}
          </Flex>

          {/* Size & Spec Badge */}
          <Flex align="center" justify="space-between" wrap="wrap" gap={2}>
            <Flex align="center" gap={1}>
              <HardDrive size={13} style={{ opacity: 0.6 }} />
              <Text size={1} muted>File Size: {formatFileSize(currentAsset?.size)}</Text>
            </Flex>
            {isOverSizeGuardrail ? (
              <Badge tone="critical" fontSize={0}>Exceeds 20MB Guardrail</Badge>
            ) : (
              <Badge tone="positive" fontSize={0}>Within 20MB Guardrail</Badge>
            )}
          </Flex>

          {/* References List */}
          {loading ? (
            <Text size={0} muted>Scanning document references in Content Lake...</Text>
          ) : error ? (
            <Card padding={2} radius={2} tone="critical">
              <Text size={0}>{error}</Text>
            </Card>
          ) : references.length > 0 ? (
            <Stack gap={2}>
              <Card padding={2} radius={2} tone="caution">
                <Flex align="flex-start" gap={2}>
                  <AlertTriangle size={14} style={{ marginTop: 2, flexShrink: 0 }} />
                  <Text size={0}>
                    <strong>Deletion Protected:</strong> This asset is currently embedded in {references.length}{" "}
                    document{references.length > 1 ? "s" : ""}. To prevent broken media on the live website, unlink it
                    from the document{references.length > 1 ? "s" : ""} below before deleting.
                  </Text>
                </Flex>
              </Card>

              <Stack gap={1}>
                {references.map((doc) => {
                  const title = doc.title || doc.projectName || doc.name || TYPE_NAME_MAP[doc._type] || doc._type;
                  const cleanId = doc._id.replace("drafts.", "");
                  const isDraft = doc._id.startsWith("drafts.");

                  return (
                    <Card
                      key={doc._id}
                      padding={2}
                      radius={1}
                      border
                      tone="transparent"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        router.push(`/studio/intent/edit/id=${cleanId};type=${doc._type}/`);
                      }}
                    >
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Text size={1} weight="medium">{title}</Text>
                          <Text size={0} muted>{TYPE_NAME_MAP[doc._type] || doc._type} {isDraft ? "· (Draft)" : ""}</Text>
                        </Box>
                        <ExternalLink size={12} style={{ opacity: 0.7 }} />
                      </Flex>
                    </Card>
                  );
                })}
              </Stack>
            </Stack>
          ) : (
            <Card padding={2} radius={2} tone="positive">
              <Flex align="center" gap={2}>
                <CheckCircle2 size={14} />
                <Text size={0}>
                  No active documents currently reference this asset. Safe to update or remove if not needed.
                </Text>
              </Flex>
            </Card>
          )}
        </Stack>
      </Card>
    </Stack>
  );
}
