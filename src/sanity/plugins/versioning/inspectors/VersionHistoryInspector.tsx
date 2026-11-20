import React, { useEffect, useState, useCallback } from "react";
import type { DocumentInspectorProps } from "sanity";
import { useClient, useCurrentUser } from "sanity";
import { Card, Flex, Stack, Text, Badge, Button, Spinner, Box } from "@sanity/ui";
import { RestoreIcon } from "@sanity/icons/Restore";
import { fetchSnapshots, restoreSnapshot, getPublishedId } from "../lib/document";
import type { VersionSnapshotItem } from "../types";

const CLIENT_CONFIG = { apiVersion: "2024-01-01" };

export function VersionHistoryInspector(props: DocumentInspectorProps) {
  const { documentId, documentType } = props;
  const client = useClient(CLIENT_CONFIG);
  const currentUser = useCurrentUser();
  const cleanId = getPublishedId(documentId);

  const [snapshots, setSnapshots] = useState<VersionSnapshotItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [confirmSnapshot, setConfirmSnapshot] = useState<VersionSnapshotItem | null>(null);
  const [inspectedSnapshot, setInspectedSnapshot] = useState<VersionSnapshotItem | null>(null);

  const loadData = useCallback(() => {
    return fetchSnapshots(client, cleanId)
      .then((data) => {
        setSnapshots(data);
        setError(null);
        setLoading(false);
      })
      .catch((err: unknown) => {
        console.error("[VersionHistoryInspector] Fetch error:", err);
        const message = err instanceof Error ? err.message : "Failed to load version snapshots.";
        setError(message);
        setLoading(false);
      });
  }, [client, cleanId]);

  useEffect(() => {
    let isCancelled = false;
    void loadData().then(() => {
      if (isCancelled) return;
    });

    // Listen to real-time additions of versionSnapshot documents for this document
    const subscription = client
      .listen(
        `*[_type == "versionSnapshot" && documentId == $docId]`,
        { docId: cleanId },
        { visibility: "query" }
      )
      .subscribe(() => {
        if (!isCancelled) {
          void loadData();
        }
      });

    return () => {
      isCancelled = true;
      subscription.unsubscribe();
    };
  }, [cleanId, client, loadData]);

  const handleExecuteRestore = async (snap: VersionSnapshotItem) => {
    setRestoringId(snap.id);
    try {
      await restoreSnapshot({
        client,
        documentId: cleanId,
        documentType,
        snapshotId: snap.id,
        authorName: currentUser?.name || "Editor",
      });

      setConfirmSnapshot(null);
      await loadData();
    } catch (err: unknown) {
      console.error("[VersionHistoryInspector] Restore error:", err);
      const message = err instanceof Error ? err.message : "Failed to restore version snapshot.";
      setError(message);
    } finally {
      setRestoringId(null);
    }
  };

  const getTriggerBadge = (trigger: string) => {
    switch (trigger) {
      case "publish":
        return <Badge tone="positive">Published</Badge>;
      case "manual":
        return <Badge tone="primary">Saved</Badge>;
      case "pre-restore":
        return <Badge tone="caution">Safety</Badge>;
      default:
        return <Badge tone="default">{trigger}</Badge>;
    }
  };

  if (loading) {
    return (
      <Flex align="center" justify="center" height="fill" padding={5}>
        <Spinner muted />
      </Flex>
    );
  }

  return (
    <Box padding={3} style={{ height: "100%", overflowY: "auto" }}>
      <Stack gap={4}>
        <Box paddingBottom={2} style={{ borderBottom: "1px solid var(--card-border-color, #27272a)" }}>
          <Text size={1} weight="semibold">
            Version History
          </Text>
        </Box>

        {/* Confirmation Modal */}
        {confirmSnapshot && (
          <Card padding={3} radius={2} tone="caution" border>
            <Stack gap={3}>
              <Text size={1} weight="semibold">
                Restore Version v{confirmSnapshot.versionNumber}?
              </Text>
              <Text size={1} muted>
                This will apply v{confirmSnapshot.versionNumber} ({new Date(confirmSnapshot.createdAt).toLocaleString()}) to your current draft. A safety backup of your current content will be taken automatically.
              </Text>
              <Flex gap={2} justify="flex-end">
                <Button
                  mode="ghost"
                  text="Cancel"
                  onClick={() => setConfirmSnapshot(null)}
                />
                <Button
                  tone="caution"
                  text={restoringId ? "Restoring..." : "Confirm Restore"}
                  disabled={Boolean(restoringId)}
                  onClick={() => handleExecuteRestore(confirmSnapshot)}
                />
              </Flex>
            </Stack>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card padding={3} radius={2} tone="critical" border>
            <Flex align="center" justify="space-between">
              <Text size={1}>{error}</Text>
              <Button fontSize={1} padding={2} mode="ghost" text="Retry" onClick={loadData} />
            </Flex>
          </Card>
        )}

        {/* Inspected Snapshot Drawer */}
        {inspectedSnapshot && (
          <Card padding={3} radius={2} tone="default" border>
            <Stack gap={3}>
              <Flex align="center" justify="space-between">
                <Text size={1} weight="semibold">
                  Inspecting v{inspectedSnapshot.versionNumber} Content
                </Text>
                <Button
                  mode="bleed"
                  text="Close"
                  onClick={() => setInspectedSnapshot(null)}
                />
              </Flex>
              <pre
                tabIndex={0}
                aria-label={`Snapshot v${inspectedSnapshot.versionNumber} JSON content`}
                style={{
                  fontSize: "11px",
                  maxHeight: "220px",
                  overflowY: "auto",
                  padding: "8px",
                  background: "rgba(0,0,0,0.2)",
                  borderRadius: "4px",
                }}
              >
                {JSON.stringify(JSON.parse(inspectedSnapshot.contentJson), null, 2)}
              </pre>
            </Stack>
          </Card>
        )}

        {/* Snapshot Timeline List */}
        {snapshots.length === 0 ? (
          <Card padding={4} radius={2} tone="transparent" style={{ textAlign: "center" }}>
            <Text size={1} muted>
              No version snapshots recorded yet. Publish this document or click &quot;Save Version&quot; in the document menu to create one.
            </Text>
          </Card>
        ) : (
          snapshots.map((snap, index) => (
            <Card
              key={snap.id}
              padding={3}
              radius={2}
              border
              tone={index === 0 ? "default" : "transparent"}
            >
              <Stack gap={3}>
                <Flex align="center" justify="space-between">
                  <Flex align="center" gap={2}>
                    <Text size={1} weight="bold">
                      v{snap.versionNumber}
                    </Text>
                    {getTriggerBadge(snap.trigger)}
                  </Flex>
                  <Text size={0} muted>
                    {snap.authorName || "Editor"}
                  </Text>
                </Flex>

                <Text size={1} muted>
                  {new Date(snap.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Text>

                {snap.note && (
                  <Text size={1} weight="medium" style={{ color: "#60a5fa" }}>
                    &ldquo;{snap.note}&rdquo;
                  </Text>
                )}

                <Flex align="center" gap={2} justify="flex-end" marginTop={1}>
                  <Button
                    mode="ghost"
                    text="Inspect"
                    onClick={() => setInspectedSnapshot(snap)}
                  />
                  <Button
                    icon={RestoreIcon}
                    tone="primary"
                    mode="ghost"
                    text="Restore"
                    disabled={Boolean(restoringId)}
                    onClick={() => setConfirmSnapshot(snap)}
                  />
                </Flex>
              </Stack>
            </Card>
          ))
        )}
      </Stack>
    </Box>
  );
}
