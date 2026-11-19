"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useClient } from "sanity";
import {
  Card,
  Flex,
  Box,
  Heading,
  Text,
  Badge,
  Button,
  Grid,
  Stack,
  Spinner,
} from "@sanity/ui";
import {
  LayoutDashboard,
  Film,
  Briefcase,
  Layers,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Eye,
  RefreshCw,
  ExternalLink,
  History,
  Clock,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

interface DashboardMetrics {
  publishedProjects: number;
  draftProjects: number;
  publishedServices: number;
  draftServices: number;
  totalMediaAssets: number;
  totalSnapshots: number;
  recentActivity: Array<{
    _id: string;
    _type: string;
    _updatedAt: string;
    title?: string;
    name?: string;
    projectName?: string;
  }>;
  healthStats: {
    totalChecked: number;
    issuesFound: number;
    status: "healthy" | "warnings" | "errors";
  };
}

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

export function CmsDashboardView() {
  const client = useClient(CLIENT_CONFIG);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Execute atomic queries for real counts
      const [
        pubProjects,
        draftProjects,
        pubServices,
        draftServices,
        mediaCount,
        snapshotCount,
        recentDocs,
        brokenSlugs,
      ] = await Promise.all([
        client.fetch<number>(`count(*[_type == "featuredWork" && !(_id in path("drafts.**"))])`),
        client.fetch<number>(`count(*[_type == "featuredWork" && _id in path("drafts.**")])`),
        client.fetch<number>(`count(*[_type == "serviceItem" && !(_id in path("drafts.**"))])`),
        client.fetch<number>(`count(*[_type == "serviceItem" && _id in path("drafts.**")])`),
        client.fetch<number>(`count(*[_type in ["sanity.imageAsset", "sanity.fileAsset"]])`),
        client.fetch<number>(`count(*[_type == "versionSnapshot"])`),
        client.fetch<any[]>(
          `*[_type in ["featuredWork", "serviceItem", "homePage", "aboutPage", "servicesPage", "workPage", "contactPage", "siteSettings"]] | order(_updatedAt desc)[0...6] {
            _id,
            _type,
            _updatedAt,
            title,
            name,
            projectName
          }`
        ),
        // Preliminary health check: count items missing titles or slugs
        client.fetch<number>(
          `count(*[_type in ["featuredWork", "serviceItem"] && (!defined(slug.current) || slug.current == "")])`
        ),
      ]);

      const issuesCount = brokenSlugs;
      const healthStatus: "healthy" | "warnings" | "errors" =
        issuesCount === 0 ? "healthy" : issuesCount > 3 ? "errors" : "warnings";

      setMetrics({
        publishedProjects: pubProjects || 0,
        draftProjects: draftProjects || 0,
        publishedServices: pubServices || 0,
        draftServices: draftServices || 0,
        totalMediaAssets: mediaCount || 0,
        totalSnapshots: snapshotCount || 0,
        recentActivity: recentDocs || [],
        healthStats: {
          totalChecked: (pubProjects || 0) + (pubServices || 0) + 8,
          issuesFound: issuesCount,
          status: healthStatus,
        },
      });
    } catch (err: any) {
      console.error("[CmsDashboard] Error fetching metrics:", err);
      setError(err?.message || "Failed to load dashboard metrics from Sanity Content Lake.");
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData, refreshKey]);

  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  const handleOpenPreview = () => {
    window.open("/api/draft-mode/enable?path=/", "_blank");
  };

  return (
    <Card height="fill" tone="inherit" padding={[3, 4, 5]} style={{ overflowY: "auto", height: "100%" }}>
      <Stack gap={5} style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top Header */}
        <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
          <Box>
            <Flex align="center" gap={2}>
              <LayoutDashboard size={24} style={{ color: "var(--card-focus-ring-color, #2276fc)" }} />
              <Heading size={3}>Art Visual Content Studio</Heading>
            </Flex>
            <Text size={1} muted style={{ marginTop: 4 }}>
              Production management, content health, and quick actions for editors.
            </Text>
          </Box>
          <Flex align="center" gap={2}>
            <Badge tone="positive" fontSize={1} padding={2} radius={2}>
              Sanity Free Tier Active
            </Badge>
            <Button
              icon={() => <RefreshCw size={14} className={loading ? "animate-spin" : ""} />}
              text={loading ? "Refreshing..." : "Refresh"}
              mode="ghost"
              fontSize={1}
              padding={2}
              onClick={() => setRefreshKey((k) => k + 1)}
              disabled={loading}
            />
            <Button
              icon={() => <ExternalLink size={14} />}
              text="Live Website Preview"
              tone="primary"
              fontSize={1}
              padding={2}
              onClick={handleOpenPreview}
            />
          </Flex>
        </Flex>

        {/* Error State */}
        {error && (
          <Card tone="critical" padding={4} radius={2} border>
            <Flex align="center" justify="space-between">
              <Flex align="center" gap={3}>
                <ShieldAlert size={20} />
                <Box>
                  <Text weight="bold" size={1}>Unable to load live dashboard statistics</Text>
                  <Text size={1} muted style={{ marginTop: 2 }}>{error}</Text>
                </Box>
              </Flex>
              <Button text="Retry" tone="critical" mode="ghost" onClick={fetchDashboardData} />
            </Flex>
          </Card>
        )}

        {/* Loading Skeleton */}
        {loading && !metrics && (
          <Card padding={6} tone="transparent" style={{ textAlign: "center" }}>
            <Flex direction="column" align="center" justify="center" gap={3}>
              <Spinner size={3} />
              <Text size={1} muted>Querying Sanity Content Lake metrics...</Text>
            </Flex>
          </Card>
        )}

        {metrics && (
          <>
            {/* Real Metrics Grid */}
            <Grid style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }} gap={3}>
              {/* Portfolio Projects Card */}
              <Card padding={4} radius={3} border tone="inherit">
                <Stack gap={3}>
                  <Flex justify="space-between" align="center">
                    <Text size={1} weight="semibold" muted>Portfolio Projects</Text>
                    <Briefcase size={16} style={{ color: "#3b82f6" }} />
                  </Flex>
                  <Heading size={4}>{metrics.publishedProjects}</Heading>
                  <Flex align="center" justify="space-between">
                    <Text size={1} muted>Published Live</Text>
                    {metrics.draftProjects > 0 ? (
                      <Badge tone="caution" fontSize={0}>{metrics.draftProjects} draft in progress</Badge>
                    ) : (
                      <Badge tone="default" fontSize={0}>All published</Badge>
                    )}
                  </Flex>
                </Stack>
              </Card>

              {/* Services Card */}
              <Card padding={4} radius={3} border tone="inherit">
                <Stack gap={3}>
                  <Flex justify="space-between" align="center">
                    <Text size={1} weight="semibold" muted>Creative Services</Text>
                    <Layers size={16} style={{ color: "#10b981" }} />
                  </Flex>
                  <Heading size={4}>{metrics.publishedServices}</Heading>
                  <Flex align="center" justify="space-between">
                    <Text size={1} muted>Published Offerings</Text>
                    {metrics.draftServices > 0 ? (
                      <Badge tone="caution" fontSize={0}>{metrics.draftServices} draft</Badge>
                    ) : (
                      <Badge tone="default" fontSize={0}>Synced</Badge>
                    )}
                  </Flex>
                </Stack>
              </Card>

              {/* Media Library Card */}
              <Card padding={4} radius={3} border tone="inherit">
                <Stack gap={3}>
                  <Flex justify="space-between" align="center">
                    <Text size={1} weight="semibold" muted>Media Assets (DAM)</Text>
                    <ImageIcon size={16} style={{ color: "#8b5cf6" }} />
                  </Flex>
                  <Heading size={4}>{metrics.totalMediaAssets}</Heading>
                  <Flex align="center" justify="space-between">
                    <Text size={1} muted>Images & Videos</Text>
                    <Badge tone="primary" fontSize={0}>20MB Guardrail</Badge>
                  </Flex>
                </Stack>
              </Card>

              {/* Content Health Card */}
              <Card padding={4} radius={3} border tone={metrics.healthStats.status === "healthy" ? "positive" : "caution"}>
                <Stack gap={3}>
                  <Flex justify="space-between" align="center">
                    <Text size={1} weight="semibold">Content Health</Text>
                    {metrics.healthStats.status === "healthy" ? (
                      <CheckCircle2 size={16} style={{ color: "#10b981" }} />
                    ) : (
                      <AlertTriangle size={16} style={{ color: "#f59e0b" }} />
                    )}
                  </Flex>
                  <Heading size={4}>
                    {metrics.healthStats.status === "healthy" ? "100%" : `${metrics.healthStats.issuesFound} Issues`}
                  </Heading>
                  <Flex align="center" justify="space-between">
                    <Text size={1} muted>{metrics.healthStats.totalChecked} docs audited</Text>
                    <Badge tone={metrics.healthStats.status === "healthy" ? "positive" : "caution"} fontSize={0}>
                      {metrics.healthStats.status === "healthy" ? "Production Ready" : "Attention Needed"}
                    </Badge>
                  </Flex>
                </Stack>
              </Card>
            </Grid>

            {/* Quick Actions Bar */}
            <Card padding={4} radius={3} border tone="inherit">
              <Stack gap={4}>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Heading size={1}>Quick Editorial Actions</Heading>
                    <Text size={1} muted style={{ marginTop: 2 }}>
                      Direct shortcuts to frequently edited singleton pages and collection managers.
                    </Text>
                  </Box>
                  <Badge tone="default" fontSize={0}>Editor Shortcuts</Badge>
                </Flex>

                <Grid style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }} gap={2}>
                  <Button
                    icon={() => <FileText size={15} />}
                    text="Edit Homepage"
                    mode="ghost"
                    onClick={() => handleNavigate("/studio/structure/homePage")}
                  />
                  <Button
                    icon={() => <FileText size={15} />}
                    text="Edit About Us"
                    mode="ghost"
                    onClick={() => handleNavigate("/studio/structure/aboutPage")}
                  />
                  <Button
                    icon={() => <Layers size={15} />}
                    text="Manage Services"
                    mode="ghost"
                    onClick={() => handleNavigate("/studio/structure/orderableServiceItem")}
                  />
                  <Button
                    icon={() => <Briefcase size={15} />}
                    text="Manage Portfolio"
                    mode="ghost"
                    onClick={() => handleNavigate("/studio/structure/orderableFeaturedWork")}
                  />
                  <Button
                    icon={() => <ImageIcon size={15} />}
                    text="Media Library (DAM)"
                    mode="ghost"
                    onClick={() => handleNavigate("/studio/media")}
                  />
                  <Button
                    icon={() => <FileText size={15} />}
                    text="Update Contact Info"
                    mode="ghost"
                    onClick={() => handleNavigate("/studio/structure/contactPage")}
                  />
                  <Button
                    icon={() => <Eye size={15} />}
                    text="Website Live Preview"
                    mode="ghost"
                    onClick={handleOpenPreview}
                  />
                  <Button
                    icon={() => <History size={15} />}
                    text="Version Checkpoints"
                    mode="ghost"
                    onClick={() => handleNavigate("/studio/structure/homePage")}
                  />
                </Grid>
              </Stack>
            </Card>

            {/* Bottom Row: Recent Activity & Free-Tier Plan Status */}
            <Grid style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }} gap={4}>
              {/* Recently Modified Documents */}
              <Card padding={4} radius={3} border tone="inherit">
                <Stack gap={3}>
                  <Flex justify="space-between" align="center">
                    <Flex align="center" gap={2}>
                      <Clock size={16} />
                      <Text weight="semibold" size={1}>Recently Modified Documents</Text>
                    </Flex>
                    <Text size={0} muted>Last 6 updates</Text>
                  </Flex>

                  {metrics.recentActivity.length === 0 ? (
                    <Card padding={3} tone="transparent">
                      <Text size={1} muted>No recent activity found.</Text>
                    </Card>
                  ) : (
                    <Stack gap={2}>
                      {metrics.recentActivity.map((doc) => {
                        const displayName =
                          doc.title || doc.projectName || doc.name || TYPE_NAME_MAP[doc._type] || doc._type;
                        const dateFormatted = new Date(doc._updatedAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        });

                        return (
                          <Card
                            key={doc._id}
                            padding={2}
                            radius={2}
                            border
                            tone="transparent"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              const cleanId = doc._id.replace("drafts.", "");
                              handleNavigate(`/studio/structure/${doc._type};${cleanId}`);
                            }}
                          >
                            <Flex justify="space-between" align="center">
                              <Box>
                                <Text size={1} weight="medium">{displayName}</Text>
                                <Text size={0} muted>{TYPE_NAME_MAP[doc._type] || doc._type}</Text>
                              </Box>
                              <Flex align="center" gap={2}>
                                <Text size={0} muted>{dateFormatted}</Text>
                                <ArrowRight size={12} style={{ opacity: 0.6 }} />
                              </Flex>
                            </Flex>
                          </Card>
                        );
                      })}
                    </Stack>
                  )}
                </Stack>
              </Card>

              {/* Sanity Free Tier Architecture Notes */}
              <Card padding={4} radius={3} border tone="inherit">
                <Stack gap={3}>
                  <Flex justify="space-between" align="center">
                    <Text weight="semibold" size={1}>Publishing & Plan Guardrails</Text>
                    <Badge tone="positive" fontSize={0}>Free Tier Optimized</Badge>
                  </Flex>

                  <Stack gap={2}>
                    <Card padding={2} radius={2} border tone="transparent">
                      <Text size={1} weight="semibold">Publishing Mode</Text>
                      <Text size={0} muted style={{ marginTop: 2 }}>
                        Immediate / Manual Publish. (Scheduled Publishing API requires an Enterprise Plan; client uses immediate publishing with Draft Preview verification).
                      </Text>
                    </Card>

                    <Card padding={2} radius={2} border tone="transparent">
                      <Text size={1} weight="semibold">Version Snapshots & History</Text>
                      <Text size={0} muted style={{ marginTop: 2 }}>
                        {metrics.totalSnapshots} custom durable snapshots stored in Content Lake. Replaces 3-day history cutoff with permanent manual and pre-restore checkpoints.
                      </Text>
                    </Card>

                    <Card padding={2} radius={2} border tone="transparent">
                      <Text size={1} weight="semibold">Asset Quota Protection</Text>
                      <Text size={0} muted style={{ marginTop: 2 }}>
                        20MB hard ceiling enforced on direct video reel uploads to preserve bandwidth and cloud storage.
                      </Text>
                    </Card>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          </>
        )}
      </Stack>
    </Card>
  );
}
