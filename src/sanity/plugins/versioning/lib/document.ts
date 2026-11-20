import type { SanityClient } from "sanity";
import { MAX_SNAPSHOTS_PER_DOC, SYSTEM_FIELDS } from "../constants";
import type { SnapshotTrigger, VersionSnapshotItem } from "../types";

/**
 * Strips Sanity metadata fields (_id, _rev, _createdAt, etc.)
 * returning only user-editable content fields.
 */
export function extractCleanContent(doc: Record<string, unknown>): Record<string, unknown> {
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(doc)) {
    if (!SYSTEM_FIELDS.has(key)) {
      clean[key] = value;
    }
  }
  return clean;
}

/**
 * Normalizes document IDs by stripping drafts. prefix
 */
export function getPublishedId(id: string): string {
  return id.replace(/^drafts\./, "");
}

/**
 * Creates a new version snapshot in the Sanity dataset and automatically
 * prunes old snapshots if the count exceeds MAX_SNAPSHOTS_PER_DOC.
 */
export async function createSnapshot(options: {
  client: SanityClient;
  documentId: string;
  documentType: string;
  trigger: SnapshotTrigger;
  content: Record<string, unknown>;
  note?: string;
  authorName?: string;
}): Promise<void> {
  const { client, documentId, documentType, trigger, content, note, authorName } = options;
  const publishedId = getPublishedId(documentId);
  const cleanContent = extractCleanContent(content);

  // Find current highest version number for this document
  const highestVersionQuery = `
    *[_type == "versionSnapshot" && documentId == $documentId] | order(versionNumber desc)[0].versionNumber
  `;
  const highestVersion = await client.fetch<number | null>(highestVersionQuery, {
    documentId: publishedId,
  });
  const nextVersionNumber = (highestVersion || 0) + 1;

  // Create the snapshot document
  await client.create({
    _type: "versionSnapshot",
    documentId: publishedId,
    documentType,
    versionNumber: nextVersionNumber,
    trigger,
    note: note?.trim() || undefined,
    authorName: authorName || "Editor",
    contentJson: JSON.stringify(cleanContent),
  });

  // Prune older snapshots if exceeding MAX_SNAPSHOTS_PER_DOC
  // Protects manual checkpoints; prunes oldest automated snapshots (publish/pre-restore)
  try {
    const allSnapshotDocs = await client.fetch<Array<{ _id: string; trigger?: string }>>(
      `*[_type == "versionSnapshot" && documentId == $documentId] | order(versionNumber desc) { _id, trigger }`,
      { documentId: publishedId }
    );

    // Keep manual milestones protected; prune automated snapshots beyond limit
    const automaticSnapshots = allSnapshotDocs.filter((s) => s.trigger !== "manual");
    const idsToDelete = automaticSnapshots.slice(MAX_SNAPSHOTS_PER_DOC).map((s) => s._id);

    if (idsToDelete && idsToDelete.length > 0) {
      const tx = client.transaction();
      idsToDelete.forEach((id) => tx.delete(id));
      await tx.commit();
    }
  } catch (err) {
    // Non-fatal pruning failure: log warning and continue
    console.warn("[Versioning Plugin] Snapshot pruning warning:", err);
  }
}

/**
 * Headless domain function to restore a document to a historical snapshot.
 * 1. Takes an automatic pre-restore safety snapshot of the active draft.
 * 2. Unsets keys added in subsequent drafts (preventing ghost field leakage).
 * 3. Applies the historical snapshot cleanly.
 */
export async function restoreSnapshot(options: {
  client: SanityClient;
  documentId: string;
  documentType: string;
  snapshotId: string;
  authorName?: string;
}): Promise<{ versionNumber: number }> {
  const { client, documentId, documentType, snapshotId, authorName } = options;
  const publishedId = getPublishedId(documentId);
  const draftId = `drafts.${publishedId}`;

  // 1. Fetch target snapshot
  const targetSnapshot = await client.fetch<{
    versionNumber: number;
    contentJson: string;
  }>(`*[_type == "versionSnapshot" && _id == $snapshotId][0]`, { snapshotId });

  if (!targetSnapshot || !targetSnapshot.contentJson) {
    throw new Error("Target version snapshot not found or has no content.");
  }

  const restoredContent = JSON.parse(targetSnapshot.contentJson) as Record<string, unknown>;

  // 2. Fetch current active document (prioritizing draft over published)
  const currentDoc = await client.fetch<Record<string, unknown> | null>(
    `coalesce(*[_id == $draftId][0], *[_id == $publishedId][0])`,
    { draftId, publishedId }
  );

  // 3. Take safety snapshot of current work before overwriting
  if (currentDoc) {
    await createSnapshot({
      client,
      documentId: publishedId,
      documentType,
      trigger: "pre-restore",
      content: currentDoc,
      note: `Pre-restore safety backup (before restoring v${targetSnapshot.versionNumber})`,
      authorName: authorName || "Editor",
    });
  }

  // 4. Compute keys to unset so subsequent draft fields don't linger as ghost fields
  const currentCleanKeys = currentDoc ? Object.keys(extractCleanContent(currentDoc)) : [];
  const restoredKeys = new Set(Object.keys(restoredContent));
  const keysToUnset = currentCleanKeys.filter((k) => !restoredKeys.has(k));

  // 5. Ensure draft document exists before patching
  await client.createIfNotExists({
    _id: draftId,
    _type: documentType,
    ...(currentDoc ? extractCleanContent(currentDoc) : {}),
  });

  // 6. Apply restore patch atomically to the draft
  const patch = client.patch(draftId).set(restoredContent);
  if (keysToUnset.length > 0) {
    patch.unset(keysToUnset);
  }
  await patch.commit();

  return { versionNumber: targetSnapshot.versionNumber };
}

/**
 * Fetches all version snapshots for a given document in reverse chronological order
 */
export async function fetchSnapshots(
  client: SanityClient,
  documentId: string
): Promise<VersionSnapshotItem[]> {
  const publishedId = getPublishedId(documentId);
  const query = `
    *[_type == "versionSnapshot" && documentId == $documentId] | order(versionNumber desc) {
      "id": _id,
      versionNumber,
      trigger,
      note,
      authorName,
      "createdAt": _createdAt,
      contentJson
    }
  `;
  return client.fetch<VersionSnapshotItem[]>(query, { documentId: publishedId });
}
