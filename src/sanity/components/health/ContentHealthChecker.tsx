"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
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

interface HealthDocRecord {
  _id: string;
  _type: string;
  _updatedAt?: string;
  title?: string;
  name?: string;
  role?: string;
  quote?: string;
  question?: string;
  answer?: string;
  projectName?: string;
  slug?: { current?: string };
  category?: string;
  brandName?: string;
  description?: string;
  heroHeadlineLine1Text?: string;
  heroHeadlineLine1?: string;
  heroHeadlineLine2Text?: string;
  heroHeadlineLine2?: string;
  heroSubtitle?: string;
  headlineLine1?: string;
  buttonLabel?: string;
  buttonHref?: string;
  navItems?: Array<{ label?: string; href?: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  contactEmail?: string;
  contactPhone?: string;
  brandDescription?: string;
  logo?: unknown;
  favicon?: unknown;
  aboutVideoFile?: unknown;
  video?: unknown;
  orderRank?: string;
}

export function ContentHealthChecker() {
  const router = useRouter();
  const client = useClient({ apiVersion: "2026-03-01" });
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState<HealthIssue[]>([]);
  const [documentsScanned, setDocumentsScanned] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "error" | "warning">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lastScanned, setLastScanned] = useState<Date | null>(null);

  const runAudit = useCallback(() => {
    return client
      .fetch<HealthDocRecord[]>(`
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
          role,
          quote,
          question,
          answer,
          projectName,
          slug,
          category,
          brandName,
          description,
          heroHeadlineLine1Text,
          heroHeadlineLine1,
          heroHeadlineLine2Text,
          heroHeadlineLine2,
          heroSubtitle,
          headlineLine1,
          buttonLabel,
          buttonHref,
          navItems,
          ctaLabel,
          ctaHref,
          contactEmail,
          contactPhone,
          brandDescription,
          logo,
          favicon,
          aboutVideoFile,
          video,
          orderRank
        }
      `)
      .then((docs) => {
        setDocumentsScanned(docs.length);

        const foundIssues: HealthIssue[] = [];
        const slugMap = new Map<string, string[]>();

        docs.forEach((doc) => {
        const typeLabel = TYPE_NAME_MAP[doc._type] || doc._type;
        const docTitle = doc.projectName || doc.title || doc.name || doc.question || typeLabel;
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
            const isValidSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slugVal);
            if (!isValidSlug) {
              foundIssues.push({
                id: `${cleanId}-invalid-slug`,
                documentId: cleanId,
                documentType: doc._type,
                documentTitle: docTitle,
                field: "slug",
                severity: "error",
                category: "Slugs & Links",
                message: `Slug "${slugVal}" is invalid. Must consist of lowercase alphanumeric characters and single hyphens.`,
                recommendation: "Update the slug to contain only lowercase letters, numbers, and hyphens (e.g. brand-films).",
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

        if (doc._type === "homePage") {
          if (!doc.heroHeadlineLine1Text) {
            foundIssues.push({
              id: `${cleanId}-missing-heroHeadline`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "heroHeadlineLine1Text",
              severity: "error",
              category: "Required Content",
              message: "Homepage hero headline is missing.",
              recommendation: "Configure hero headline line 1 text.",
            });
          }
        }

        if (doc._type === "aboutPage") {
          if (!doc.heroHeadlineLine1) {
            foundIssues.push({
              id: `${cleanId}-missing-aboutHero`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "heroHeadlineLine1",
              severity: "error",
              category: "Required Content",
              message: "About page hero headline is missing.",
              recommendation: "Configure About page hero headline line 1.",
            });
          }
        }

        if (doc._type === "servicesPage") {
          if (!doc.heroHeadlineLine1) {
            foundIssues.push({
              id: `${cleanId}-missing-servicesHero`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "heroHeadlineLine1",
              severity: "error",
              category: "Required Content",
              message: "Services page hero headline is missing.",
              recommendation: "Configure Services page hero headline line 1.",
            });
          }
        }

        if (doc._type === "workPage") {
          if (!doc.heroHeadlineLine1) {
            foundIssues.push({
              id: `${cleanId}-missing-workHero`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "heroHeadlineLine1",
              severity: "error",
              category: "Required Content",
              message: "Work portfolio page hero headline is missing.",
              recommendation: "Configure Work page hero headline line 1.",
            });
          }
        }

        if (doc._type === "ctaBanner") {
          if (!doc.headlineLine1) {
            foundIssues.push({
              id: `${cleanId}-missing-ctaHeadline`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "headlineLine1",
              severity: "error",
              category: "Required Content",
              message: "CTA banner main headline is missing.",
              recommendation: "Provide headline line 1 for the global CTA banner.",
            });
          }
          if (!doc.buttonLabel) {
            foundIssues.push({
              id: `${cleanId}-missing-ctaButton`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "buttonLabel",
              severity: "warning",
              category: "Required Content",
              message: "CTA banner action button label is missing.",
              recommendation: "Set CTA action button label (e.g. 'Let's Talk').",
            });
          }
        }

        if (doc._type === "navbarSettings") {
          if (!doc.navItems || doc.navItems.length === 0) {
            foundIssues.push({
              id: `${cleanId}-missing-navItems`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "navItems",
              severity: "warning",
              category: "Required Content",
              message: "Navigation header has no menu links defined.",
              recommendation: "Add primary navigation links (Home, About, Services, Work, Contact).",
            });
          }
        }

        if (doc._type === "testimonial") {
          if (!doc.name) {
            foundIssues.push({
              id: `${cleanId}-missing-clientName`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "name",
              severity: "error",
              category: "Required Content",
              message: "Testimonial is missing a client name.",
              recommendation: "Enter the client or reviewer's name.",
            });
          }
          if (!doc.quote) {
            foundIssues.push({
              id: `${cleanId}-missing-quote`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "quote",
              severity: "error",
              category: "Required Content",
              message: `Testimonial quote missing for "${docTitle}".`,
              recommendation: "Provide the client's testimonial text.",
            });
          }
        }

        if (doc._type === "faqItem") {
          if (!doc.question) {
            foundIssues.push({
              id: `${cleanId}-missing-question`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "question",
              severity: "error",
              category: "Required Content",
              message: "FAQ item is missing a question.",
              recommendation: "Enter a common client inquiry question.",
            });
          }
          if (!doc.answer) {
            foundIssues.push({
              id: `${cleanId}-missing-answer`,
              documentId: cleanId,
              documentType: doc._type,
              documentTitle: docTitle,
              field: "answer",
              severity: "error",
              category: "Required Content",
              message: `FAQ answer missing for "${docTitle}".`,
              recommendation: "Provide a reassuring, direct answer for this FAQ item.",
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
        setLoading(false);
      })
      .catch((err) => {
        console.error("[ContentHealthChecker] Audit failed:", err);
        setLoading(false);
      });
  }, [client]);

  useEffect(() => {
    let isCancelled = false;
    void runAudit().then(() => {
      if (isCancelled) return;
    });
    return () => {
      isCancelled = true;
    };
  }, [runAudit]);

  const counts = useMemo(() => {
    const error = issues.filter((i) => i.severity === "error").length;
    const warning = issues.filter((i) => i.severity === "warning").length;
    const total = issues.length;
    const healthScore = total === 0 ? 100 : Math.max(0, Math.round(100 - (error * 20 + warning * 5)));
    const uniqueErrorDocIds = new Set(issues.filter((i) => i.severity === "error").map((i) => i.documentId));
    const productionReadyDocs = Math.max(0, documentsScanned - uniqueErrorDocIds.size);
    return { error, warning, total, healthScore, productionReadyDocs };
  }, [issues, documentsScanned]);

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
    const cleanId = issue.documentId.replace("drafts.", "");
    router.push(`/studio/intent/edit/id=${cleanId};type=${issue.documentType}/`);
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
              onClick={() => {
                setLoading(true);
                void runAudit();
              }}
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
                {counts.productionReadyDocs}
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
