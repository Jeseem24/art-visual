import React, { useState } from "react";
import type { DocumentActionComponent } from "sanity";
import { useClient, useCurrentUser } from "sanity";
import { ClockIcon } from "@sanity/icons/Clock";
import { createSnapshot, extractCleanContent } from "../lib/document";

export const SaveVersionAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published } = props;
  const client = useClient({ apiVersion: "2024-01-01" });
  const currentUser = useCurrentUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Target the latest active draft or published content
  const activeDoc = draft || published;

  if (!activeDoc) {
    return null;
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await createSnapshot({
        client,
        documentId: id,
        documentType: type,
        trigger: "manual",
        content: extractCleanContent(activeDoc as Record<string, unknown>),
        note: note.trim() || undefined,
        authorName: currentUser?.name || "Editor",
      });
      setIsDialogOpen(false);
      setNote("");
      props.onComplete();
    } catch (err) {
      console.error("[SaveVersionAction] Failed to save snapshot:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    label: "Save Version",
    icon: ClockIcon,
    title: "Save a manual named checkpoint of this document state",
    onHandle: () => {
      setIsDialogOpen(true);
    },
    dialog: isDialogOpen && {
      type: "dialog",
      header: "Save Version Checkpoint",
      onClose: () => setIsDialogOpen(false),
      content: (
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
            Create a named historical version of this document. You can inspect or restore it anytime from the Version History panel.
          </p>
          <div>
            <label
              htmlFor="version-note-input"
              style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}
            >
              Version Note (Optional)
            </label>
            <input
              id="version-note-input"
              type="text"
              placeholder="e.g. Updated hero video & changed button text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
                fontSize: "13px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "8px" }}>
            <button
              type="button"
              onClick={() => setIsDialogOpen(false)}
              disabled={isSaving}
              style={{
                padding: "8px 14px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
                background: "transparent",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              style={{
                padding: "8px 16px",
                borderRadius: "4px",
                border: "none",
                background: "#2563eb",
                color: "#ffffff",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              {isSaving ? "Saving..." : "Create Checkpoint"}
            </button>
          </div>
        </div>
      ),
    },
  };
};

export default SaveVersionAction;

