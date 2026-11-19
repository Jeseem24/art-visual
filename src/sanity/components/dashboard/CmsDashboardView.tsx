"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Badge,
  Button,
  Grid,
  Spinner,
} from "@sanity/ui";
import { useClient } from "sanity";
import {
  LayoutDashboard,
  FileText,
  Layers,
  Briefcase,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  RefreshCw,
  Eye,
  Megaphone,
  Phone,
  ShieldCheck,
  Compass,
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

const TYPE_NAME_MAP: Record<string, string> = {
  homePage: "Homepage",
  aboutPage: "About Us Page",
  servicesPage: "Services Landing",
  serviceItem: "Service Detail",
  workPage: "Work Portfolio Landing",
  featuredWork: "Portfolio Project",
  contactPage: "Contact Page",
  siteSettings: "Global Site Settings",
  navbarSettings: "Navigation Settings",
  ctaBanner: "CTA Banner",
  testimonial: "Testimonial",
  faqItem: "FAQ",
};

// High-speed consolidated GROQ query: 1 single network request
const DASHBOARD_CONSOLIDATED_QUERY = `
{
  "pubProjects": count(*[_type == "featuredWork" && !(_id in path("drafts.**"))]),
  "draftProjects": count(*[_type == "featuredWork" && _id in path("drafts.**")]),
  "pubServices": count(*[_type == "serviceItem" && !(_id in path("drafts.**"))]),
  "draftServices": count(*[_type == "serviceItem" && _id in path("drafts.**")]),
  "mediaCount": count(*[_type in ["sanity.imageAsset", "sanity.fileAsset"]]),
  "snapshotCount": count(*[_type == "versionSnapshot"]),
  "recentDocs": *[_type in [
    "featuredWork", "serviceItem", "homePage", "aboutPage",
    "servicesPage", "workPage", "contactPage", "siteSettings", "ctaBanner"
  ]] | order(_updatedAt desc)[0...6] {
    _id,
    _type,
    _updatedAt,
    title,
    name,
    projectName
  },
  "brokenSlugs": count(*[_type in ["featuredWork", "serviceItem"] && (!defined(slug.current) || slug.current == "")])
}
`;

export function CmsDashboardView() {
  const client = useClient({ apiVersion: "2026-03-01" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await client.fetch<any>(DASHBOARD_CONSOLIDATED_QUERY);

      const pubProjects = data?.pubProjects || 0;
      const pubServices = data?.pubServices || 0;
      const brokenSlugs = data?.brokenSlugs || 0;

      const healthStatus: "healthy" | "warnings" | "errors" =
        brokenSlugs === 0 ? "healthy" : brokenSlugs > 3 ? "errors" : "warnings";

      setMetrics({
        publishedProjects: pubProjects,
        draftProjects: data?.draftProjects || 0,
        publishedServices: pubServices,
        draftServices: data?.draftServices || 0,
        totalMediaAssets: data?.mediaCount || 0,
        totalSnapshots: data?.snapshotCount || 0,
        recentActivity: data?.recentDocs || [],
        healthStats: {
          totalChecked: pubProjects + pubServices + 8,
          issuesFound: brokenSlugs,
          status: healthStatus,
        },
      });
    } catch (err: any) {
      console.error("[CmsDashboard] Error fetching metrics:", err);
      setError(err?.message || "Failed to load dashboard metrics.");
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Universal Sanity Studio navigation using intent resolver
  const handleOpenDocument = (docType: string, docId: string) => {
    const cleanId = docId.replace("drafts.", "");
    window.location.href = `/studio/intent/edit/id=${cleanId};type=${docType}/`;
  };

  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  const handleOpenPreview = () => {
    window.open("/api/draft-mode/enable?path=/", "_blank");
  };

  return (
    <Card height="fill" tone="inherit" padding={[3, 4, 5]} style={{ overflowY: "auto", height: "100%" }}>
      <Stack gap={5} style={{ maxWidth: 1140, margin: "0 auto", paddingBottom: 40 }}>
        {/* Header Bar */}
        <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
          <Box>
            <Flex align="center" gap={2}>
              <LayoutDashboard size={24} color="#3b82f6" />
              <Heading size={3}>Art Visual Content Studio</Heading>
            </Flex>
            <Text size={1} muted style={{ marginTop: 6, lineHeight: 1.5 }}>
              Manage website pages, portfolio reels, services, and live content health.
            </Text>
          </Box>
          <Flex align="center" gap={2}>
            <Button
              icon={() => <RefreshCw size={14} className={loading ? "animate-spin" : ""} />}
              text={loading ? "Refreshing..." : "Refresh"}
              mode="ghost"
              fontSize={1}
              padding={2}
              onClick={fetchDashboardData}
            />
          </Flex>
        </Flex>

        {/* Error State */}
        {error && (
          <Card padding={4} radius={3} tone="critical" border>
            <Flex align="center" justify="space-between" gap={3}>
              <Box>
                <Text weight="semibold" size={1}>Unable to Load Dashboard</Text>
                <Text size={1} muted style={{ marginTop: 4 }}>{error}</Text>
              </Box>
              <Button text="Retry" mode="ghost" onClick={fetchDashboardData} />
            </Flex>
          </Card>
        )}

        {/* Loading Skeleton */}
        {loading && !metrics ? (
          <Card padding={6} radius={3} border tone="inherit">
            <Flex direction="column" align="center" justify="center" gap={3}>
              <Spinner size={3} />
              <Text size={1} muted>Loading studio overview...</Text>
            </Flex>
          </Card>
        ) : metrics && (
          <>
            {/* Top Stat Cards */}
            <Grid style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }} gap={3}>
              {/* Portfolio Projects */}
              <Card
                padding={4}
                radius={3}
                border
                tone="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigate("/studio/structure/orderableFeaturedWork")}
              >
                <Stack gap={3}>
                  <Flex justify="space-between" align="center">
                    <Text size={1} weight="semibold">Portfolio Projects</Text>
                    <Briefcase size={16} color="#3b82f6" />
                  </Flex>
                  <Heading size={4}>{metrics.publishedProjects}</Heading>
                  <Flex align="center" justify="space-between">
                    <Text size={0} muted>
                      {metrics.draftProjects > 0 ? `${metrics.draftProjects} drafts in progress` : "All published live"}
                    </Text>
                    <Badge tone="default" fontSize={0}>Reels</Badge>
                  </Flex>
                </Stack>
              </Card>

              {/* Services Offered */}
              <Card
                padding={4}
                radius={3}
                border
                tone="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigate("/studio/structure/orderableServiceItem")}
              >
                <Stack gap={3}>
                  <Flex justify="space-between" align="center">
                    <Text size={1} weight="semibold">Services</Text>
                    <Layers size={16} color="#8b5cf6" />
                  </Flex>
                  <Heading size={4}>{metrics.publishedServices}</Heading>
                  <Flex align="center" justify="space-between">
                    <Text size={0} muted>
                      {metrics.draftServices > 0 ? `${metrics.draftServices} draft edits` : "All published live"}
                    </Text>
                    <Badge tone="default" fontSize={0}>Offerings</Badge>
                  </Flex>
                </Stack>
              </Card>

              {/* Media Library */}
              <Card
                padding={4}
                radius={3}
                border
                tone="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigate("/studio/media")}
              >
                <Stack gap={3}>
                  <Flex justify="space-between" align="center">
                    <Text size={1} weight="semibold">Media Assets</Text>
                    <ImageIcon size={16} color="#10b981" />
                  </Flex>
                  <Heading size={4}>{metrics.totalMediaAssets}</Heading>
                  <Flex align="center" justify="space-between">
                    <Text size={0} muted>Videos & Images</Text>
                    <Badge tone="positive" fontSize={0}>Active</Badge>
                  </Flex>
                </Stack>
              </Card>

              {/* Content Health Card */}
              <Card
                padding={4}
                radius={3}
                border
                tone="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigate("/studio/structure/contentHealthChecker")}
              >
                <Stack gap={3}>
                  <Flex justify="space-between" align="center">
                    <Text size={1} weight="semibold">Content Health</Text>
                    <ShieldCheck size={16} color="#22c55e" />
                  </Flex>
                  <Heading size={4} style={{ color: "#22c55e" }}>
                    Inspect
                  </Heading>
                  <Flex align="center" justify="space-between">
                    <Text size={0} muted>Run full quality scan</Text>
                    <ArrowRight size={14} style={{ opacity: 0.6 }} />
                  </Flex>
                </Stack>
              </Card>
            </Grid>

            {/* Quick Actions Bar */}
            <Card padding={4} radius={3} border tone="inherit">
              <Stack gap={4}>
                <Box>
                  <Heading size={2}>Quick Editorial Shortcuts</Heading>
                  <Text size={1} muted style={{ marginTop: 4, lineHeight: 1.5 }}>
                    Jump directly to edit pages, featured reels, or shared site sections.
                  </Text>
                </Box>

                <Grid style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }} gap={3}>
                  <Button
                    icon={() => <FileText size={15} />}
                    text="Edit Homepage"
                    mode="ghost"
                    fontSize={1}
                    padding={3}
                    onClick={() => handleOpenDocument("homePage", "homePage")}
                  />
                  <Button
                    icon={() => <FileText size={15} />}
                    text="Edit About Us Page"
                    mode="ghost"
                    fontSize={1}
                    padding={3}
                    onClick={() => handleOpenDocument("aboutPage", "aboutPage")}
                  />
                  <Button
                    icon={() => <Briefcase size={15} />}
                    text="Manage Portfolio Projects"
                    mode="ghost"
                    fontSize={1}
                    padding={3}
                    onClick={() => handleNavigate("/studio/structure/orderableFeaturedWork")}
                  />
                  <Button
                    icon={() => <Layers size={15} />}
                    text="Manage Services"
                    mode="ghost"
                    fontSize={1}
                    padding={3}
                    onClick={() => handleNavigate("/studio/structure/orderableServiceItem")}
                  />
                  <Button
                    icon={() => <Megaphone size={15} />}
                    text="Edit CTA Banner"
                    mode="ghost"
                    fontSize={1}
                    padding={3}
                    onClick={() => handleOpenDocument("ctaBanner", "ctaBanner")}
                  />
                  <Button
                    icon={() => <Phone size={15} />}
                    text="Update Contact Info"
                    mode="ghost"
                    fontSize={1}
                    padding={3}
                    onClick={() => handleOpenDocument("contactPage", "contactPage")}
                  />
                  <Button
                    icon={() => <ImageIcon size={15} />}
                    text="Media Library (DAM)"
                    mode="ghost"
                    fontSize={1}
                    padding={3}
                    onClick={() => handleNavigate("/studio/media")}
                  />
                  <Button
                    icon={() => <Eye size={15} />}
                    text="View Live Website ↗"
                    mode="ghost"
                    fontSize={1}
                    padding={3}
                    onClick={handleOpenPreview}
                  />
                </Grid>
              </Stack>
            </Card>

            {/* Bottom Row: Recent Activity & Sitemap Reference */}
            <Grid style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }} gap={4}>
              {/* Recently Modified Documents */}
              <Card padding={4} radius={3} border tone="inherit">
                <Stack gap={3}>
                  <Flex justify="space-between" align="center">
                    <Flex align="center" gap={2}>
                      <Clock size={16} />
                      <Text weight="semibold" size={1}>Recent Document Updates</Text>
                    </Flex>
                    <Text size={0} muted>Latest 6 items</Text>
                  </Flex>

                  {metrics.recentActivity.length === 0 ? (
                    <Card padding={3} tone="transparent">
                      <Text size={1} muted>No recent activity found.</Text>
                    </Card>
                  ) : (
                    <Stack gap={2}>
                      {metrics.recentActivity.map((doc) => {
                        const displayName =
                          doc.projectName || doc.title || doc.name || TYPE_NAME_MAP[doc._type] || doc._type;
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
                            onClick={() => handleOpenDocument(doc._type, doc._id)}
                          >
                            <Flex justify="space-between" align="center">
                              <Box>
                                <Text size={1} weight="medium">{displayName}</Text>
                                <Text size={0} muted style={{ marginTop: 2 }}>{TYPE_NAME_MAP[doc._type] || doc._type}</Text>
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

              {/* Website Content Editorial Guide */}
              <Card padding={4} radius={3} border tone="inherit">
                <Stack gap={3}>
                  <Flex align="center" gap={2}>
                    <Compass size={16} color="#3b82f6" />
                    <Text weight="semibold" size={1}>Content Location Guide</Text>
                  </Flex>

                  <Stack gap={2}>
                    <Card padding={2} radius={2} border tone="transparent">
                      <Text size={1} weight="semibold">Featured Works Carousel</Text>
                      <Text size={0} muted style={{ marginTop: 2, lineHeight: 1.4 }}>
                        Cards are managed under <strong>Portfolio Projects</strong>. Turn on "Showcase in Home Page Carousel" to display a project on the homepage.
                      </Text>
                    </Card>

                    <Card padding={2} radius={2} border tone="transparent">
                      <Text size={1} weight="semibold">Call to Action (CTA) Banner</Text>
                      <Text size={0} muted style={{ marginTop: 2, lineHeight: 1.4 }}>
                        The bottom banner ("Have a Story to Tell? Let's Create It.") is managed under <strong>CTA Banner</strong> so edits sync across all pages.
                      </Text>
                    </Card>

                    <Card padding={2} radius={2} border tone="transparent">
                      <Text size={1} weight="semibold">Why Choose Us & Creative Process</Text>
                      <Text size={0} muted style={{ marginTop: 2, lineHeight: 1.4 }}>
                        Why Choose Us is edited in <strong>Home Page</strong>. The 5-step timeline is edited in <strong>About Page &gt; Creative Process</strong>.
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

export default CmsDashboardView;
