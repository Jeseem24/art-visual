"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Card,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Badge,
  Button,
  Spinner,
} from "@sanity/ui";
import { useClient } from "sanity";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export type HealthSeverity = "error" | "warning" | "info";

export interface HealthIssue {
  id: string;
  documentId: string;
  documentType: string;
  documentTitle: string;
  field: string;
  severity: HealthSeverity;
  category: "Required Content" | "Media & Video" | "SEO & Alt Text" | "Slugs & Links";
  message: string;
  recommendation: string;
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
  ctaBanner: "Call to Action Banner",
  testimonial: "Client Testimonial",
  faqItem: "FAQ Item",
};

export function ContentHealthChecker() {
  const client = useClient({ apiVersion: "2026-03-01" });
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState<HealthIssue[]>([]);
  const [documentsScanned, setDocumentsScanned] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "error" | "warning">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lastScanned, setLastScanned] = useState<Date | null>(null);

  const runAudit = useCallback(async () => {
    setLoading(true);
    try {
      // Query documents matching actual Sanity schema field names
      const docs = await client.fetch<any[]>(`
        *[_type in [
          "homePage", "aboutPage", "servicesPage", "serviceItem",
          "workPage", "featuredWork", "contactPage", "siteSettings",
          "navbarSettings", "ctaBanner", "testimonial", "faqItem"
        ] && !(_id in path("drafts.**"))] {
          _id,
          _type,
          _updatedAt,
          title,
          name,
          projectName,
          slug,
          category,
          brandName,
          description,
          heroHeadlineLine1Text,
          heroSubtitle,
          contactEmail,
          contactPhone,
          brandDescription,
          logo,
          favicon,
          aboutVideoFile,
          video,
          orderRank
        }
      `);

      setDocumentsScanned(docs.length);

      const foundIssues: HealthIssue[] = [];
      const slugMap = new Map<string, string[]>();

      docs.forEach((doc) => {
        const typeLabel = TYPE_NAME_MAP[doc._type] || doc._type;
        const docTitle = doc.projectName || doc.title || doc.name || typeLabel;
        const cleanId = doc._id.replace("drafts.", "");

        // 1. Slug Validation & Duplication Check
        if (["featuredWork", "serviceItem"].includes(doc._type)) {
          const slugVal = doc.slug?.current?.trim();
          if (!slugVal) {
            foundIssues.push({
              id: `${cleanId}-missing-slug`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "slug",
              severity: "error",
              category: "Slugs & Links",
              message: `Missing URL slug on ${typeLabel} "${docTitle}".`,
              recommendation: "Open document and click 'Generate' to create a clean URL slug.",
            });
          } else {
            if (/\s/.test(slugVal)) {
              foundIssues.push({
                id: `${cleanId}-slug-whitespace`,
                documentId: cleanId,
                documentType: doc._type,
                documentTitle: docTitle,
                field: "slug",
                severity: "error",
                category: "Slugs & Links",
                message: `Slug contains whitespace: "${slugVal}".`,
                recommendation: "Replace spaces with hyphens in the slug.",
              });
            }

            const existing = slugMap.get(slugVal) || [];
            existing.push(docTitle);
            slugMap.set(slugVal, existing);
          }
        }

        // 2. Required Fields Per Document Type
        if (doc._type === "featuredWork") {
          if (!doc.projectName && !doc.title) {
            foundIssues.push({
              id: `${cleanId}-missing-title`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "projectName",
              severity: "error",
              category: "Required Content",
              message: "Portfolio project is missing a project name.",
              recommendation: "Provide a project title.",
            });
          }
          if (!doc.category) {
            foundIssues.push({
              id: `${cleanId}-missing-category`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "category",
              severity: "warning",
              category: "Required Content",
              message: `No category tag set on "${docTitle}".`,
              recommendation: "Select a production category (e.g. Brand Films, Commercial Ads) for portfolio filtering.",
            });
          }
          // Video-native project check: verify video reel is attached
          if (!doc.video) {
            foundIssues.push({
              id: `${cleanId}-missing-video`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "video",
              severity: "warning",
              category: "Media & Video",
              message: `Project "${docTitle}" does not have an MP4 video reel uploaded.`,
              recommendation: "Upload an MP4 preview video reel.",
            });
          }
        }

        if (doc._type === "serviceItem") {
          if (!doc.title) {
            foundIssues.push({
              id: `${cleanId}-missing-title`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "title",
              severity: "error",
              category: "Required Content",
              message: "Service item is missing a main title.",
              recommendation: "Provide a clear service name.",
            });
          }
          // Note: In Sanity, service description is under "description"
          if (!doc.description) {
            foundIssues.push({
              id: `${cleanId}-missing-desc`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "description",
              severity: "warning",
              category: "Required Content",
              message: `Description missing on service "${docTitle}".`,
              recommendation: "Provide an overview description for this service.",
            });
          }
        }

        if (doc._type === "siteSettings") {
          if (!doc.brandName) {
            foundIssues.push({
              id: `${cleanId}-missing-brandName`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "brandName",
              severity: "error",
              category: "Required Content",
              message: "Global Brand Name is missing.",
              recommendation: "Set Brand Name to 'Art Visual'.",
            });
          }
          if (!doc.contactEmail) {
            foundIssues.push({
              id: `${cleanId}-missing-email`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "contactEmail",
              severity: "warning",
              category: "Required Content",
              message: "Primary contact email address is not configured.",
              recommendation: "Set business contact email in Global Site Settings.",
            });
          }
        }
      });

      // Check for duplicate slugs
      slugMap.forEach((titles, slug) => {
        if (titles.length > 1) {
          foundIssues.push({
            id: `duplicate-slug-${slug}`,
            documentId: slug,
            documentType: "slugCollision",
            documentTitle: `Slug collision: "${slug}"`,
            field: "slug",
            severity: "error",
            category: "Slugs & Links",
            message: `The slug "${slug}" is used by multiple items: ${titles.join(", ")}.`,
            recommendation: "Ensure each portfolio project and service has a unique URL slug.",
          });
        }
      });

      setIssues(foundIssues);
      setLastScanned(new Date());
    } catch (err) {
      console.error("[ContentHealthChecker] Audit failed:", err);
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    runAudit();
  }, [runAudit]);

  const counts = useMemo(() => {
    const error = issues.filter((i) => i.severity === "error").length;
    const warning = issues.filter((i) => i.severity === "warning").length;
    const total = issues.length;
    const healthScore = total === 0 ? 100 : Math.max(0, Math.round(100 - (error * 20 + warning * 5)));
    return { error, warning, total, healthScore };
  }, [issues]);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      if (selectedFilter !== "all" && issue.severity !== selectedFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          issue.documentTitle.toLowerCase().includes(query) ||
          issue.message.toLowerCase().includes(query) ||
          issue.field.toLowerCase().includes(query) ||
          issue.category.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [issues, selectedFilter, searchQuery]);

  // Universal Sanity Studio navigation using intent router (no blank screens)
  const handleOpenDoc = (issue: HealthIssue) => {
    if (typeof window !== "undefined") {
      const cleanId = issue.documentId.replace("drafts.", "");
      window.location.href = `/studio/intent/edit/id=${cleanId};type=${issue.documentType}/`;
    }
  };

  return (
    <Card height="fill" tone="inherit" padding={[3, 4, 5]} style={{ overflowY: "auto" }}>
      <Stack gap={5} style={{ maxWidth: 1100, margin: "0 auto", paddingBottom: 40 }}>
        {/* Top Header */}
        <Flex justify="space-between" align={["flex-start", "center"]} direction={["column", "row"]} gap={3}>
          <Box>
            <Flex align="center" gap={2}>
              <ShieldCheck size={26} color="#22c55e" />
              <Heading size={3}>Website Content Health Checker</Heading>
            </Flex>
            <Text size={1} muted style={{ marginTop: 4, lineHeight: 1.5 }}>
              Automated quality assurance scan across pages, services, portfolio projects, and media.
            </Text>
          </Box>

          <Flex align="center" gap={3}>
            {lastScanned && (
              <Text size={0} muted>
                Last checked: {lastScanned.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Text>
            )}
            <Button
              icon={RefreshCw}
              text={loading ? "Scanning..." : "Re-Scan Website"}
              tone="primary"
              disabled={loading}
              onClick={runAudit}
            />
          </Flex>
        </Flex>

        {/* Overview Metric Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <Card padding={3} radius={3} border tone="inherit">
            <Stack gap={2}>
              <Text size={0} weight="semibold" muted>Health Score</Text>
              <Heading size={3} style={{ color: counts.healthScore >= 90 ? "#22c55e" : counts.healthScore >= 70 ? "#eab308" : "#ef4444" }}>
                {counts.healthScore}%
              </Heading>
              <Text size={0} muted>{documentsScanned} documents audited</Text>
            </Stack>
          </Card>

          <Card padding={3} radius={3} border tone={counts.error > 0 ? "critical" : "inherit"}>
            <Stack gap={2}>
              <Flex align="center" justify="space-between">
                <Text size={0} weight="semibold" style={{ color: counts.error > 0 ? "#ef4444" : "inherit" }}>Critical Errors</Text>
                <AlertCircle size={16} color={counts.error > 0 ? "#ef4444" : "#999"} />
              </Flex>
              <Heading size={3} style={{ color: counts.error > 0 ? "#ef4444" : "inherit" }}>{counts.error}</Heading>
              <Text size={0} muted>{counts.error > 0 ? "Requires attention" : "Zero errors found"}</Text>
            </Stack>
          </Card>

          <Card padding={3} radius={3} border tone={counts.warning > 0 ? "caution" : "inherit"}>
            <Stack gap={2}>
              <Flex align="center" justify="space-between">
                <Text size={0} weight="semibold" style={{ color: counts.warning > 0 ? "#eab308" : "inherit" }}>Warnings</Text>
                <AlertTriangle size={16} color={counts.warning > 0 ? "#eab308" : "#999"} />
              </Flex>
              <Heading size={3} style={{ color: counts.warning > 0 ? "#eab308" : "inherit" }}>{counts.warning}</Heading>
              <Text size={0} muted>{counts.warning > 0 ? "Optional improvements" : "Zero warnings"}</Text>
            </Stack>
          </Card>

          <Card padding={3} radius={3} border tone="positive">
            <Stack gap={2}>
              <Flex align="center" justify="space-between">
                <Text size={0} weight="semibold" style={{ color: "#22c55e" }}>Production Ready</Text>
                <CheckCircle2 size={16} color="#22c55e" />
              </Flex>
              <Heading size={3} style={{ color: "#22c55e" }}>
                {Math.max(0, documentsScanned - counts.error)}
              </Heading>
              <Text size={0} muted>Verified documents</Text>
            </Stack>
          </Card>
        </div>

        {/* Filter and Search Bar */}
        <Card padding={3} radius={3} border tone="inherit">
          <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
            <Flex gap={2} wrap="wrap">
              <Button
                fontSize={1}
                padding={2}
                mode={selectedFilter === "all" ? "default" : "ghost"}
                tone="default"
                text={`All (${counts.total})`}
                onClick={() => setSelectedFilter("all")}
              />
              {counts.error > 0 && (
                <Button
                  fontSize={1}
                  padding={2}
                  mode={selectedFilter === "error" ? "default" : "ghost"}
                  tone="critical"
                  text={`Errors (${counts.error})`}
                  onClick={() => setSelectedFilter("error")}
                />
              )}
              {counts.warning > 0 && (
                <Button
                  fontSize={1}
                  padding={2}
                  mode={selectedFilter === "warning" ? "default" : "ghost"}
                  tone="caution"
                  text={`Warnings (${counts.warning})`}
                  onClick={() => setSelectedFilter("warning")}
                />
              )}
            </Flex>

            <Box style={{ minWidth: 240 }}>
              <input
                type="text"
                placeholder="Search issues or fields..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "6px 12px",
                  fontSize: 13,
                  borderRadius: 4,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(0,0,0,0.2)",
                  color: "inherit",
                }}
              />
            </Box>
          </Flex>
        </Card>

        {/* Issues List */}
        {loading ? (
          <Card padding={6} radius={3} border tone="inherit">
            <Flex direction="column" align="center" justify="center" gap={3}>
              <Spinner size={3} />
              <Text size={1} muted>Scanning Content Lake for missing fields, broken media, and SEO gaps...</Text>
            </Flex>
          </Card>
        ) : filteredIssues.length === 0 ? (
          <Card padding={6} radius={3} border tone="positive">
            <Flex direction="column" align="center" justify="center" gap={3}>
              <CheckCircle2 size={40} color="#22c55e" />
              <Heading size={2}>All Systems Operational</Heading>
              <Text size={1} muted style={{ textAlign: "center", maxWidth: 520, lineHeight: 1.5 }}>
                Every document in the Art Visual CMS meets production standards. All services, portfolio projects, and singletons have valid titles, slugs, and media files.
              </Text>
            </Flex>
          </Card>
        ) : (
          <Stack gap={3}>
            {filteredIssues.map((issue) => {
              const isError = issue.severity === "error";
              return (
                <Card
                  key={issue.id}
                  padding={3}
                  radius={3}
                  border
                  tone={isError ? "critical" : "caution"}
                >
                  <Flex justify="space-between" align={["flex-start", "center"]} direction={["column", "row"]} gap={3}>
                    <Box style={{ flex: 1 }}>
                      <Flex align="center" gap={2} style={{ marginBottom: 6 }}>
                        <Badge tone={isError ? "critical" : "caution"} fontSize={0}>
                          {isError ? "Blocking Error" : "Warning"}
                        </Badge>
                        <Badge tone="default" fontSize={0}>
                          {issue.category}
                        </Badge>
                        <Text size={0} weight="semibold">
                          {issue.documentTitle}
                        </Text>
                        <Text size={0} muted>
                          ({issue.field})
                        </Text>
                      </Flex>

                      <Text size={1} weight="medium" style={{ lineHeight: 1.4 }}>
                        {issue.message}
                      </Text>

                      <Text size={0} muted style={{ marginTop: 4, lineHeight: 1.4 }}>
                        Recommendation: {issue.recommendation}
                      </Text>
                    </Box>

                    {issue.documentType !== "slugCollision" && (
                      <Button
                        fontSize={1}
                        padding={2}
                        mode="ghost"
                        icon={ArrowRight}
                        text="Fix Field"
                        onClick={() => handleOpenDoc(issue)}
                      />
                    )}
                  </Flex>
                </Card>
              );
            })}
          </Stack>
        )}
      </Stack>
    </Card>
  );
}

export default ContentHealthChecker;
