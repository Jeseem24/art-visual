import { useState } from "react";
import type { DocumentActionComponent, DocumentActionDescription } from "sanity";
import { useDocumentOperation, useClient, useCurrentUser } from "sanity";
import { ResetIcon } from "@sanity/icons/Reset";
import { createSnapshot, extractCleanContent } from "../lib/document";

const CLIENT_CONFIG = { apiVersion: "2024-01-01" };

/**
 * Custom Discard Changes Action for the Art Visual Hybrid Action Toolbar.
 * Displays critical tone, confirmation dialog before executing, and
 * creates a pre-discard safety snapshot before removing the draft.
 */
export const DiscardChangesAction: DocumentActionComponent = (props): DocumentActionDescription => {
  const { id, type, draft, published } = props;
  const client = useClient(CLIENT_CONFIG);
  const currentUser = useCurrentUser();
  const { discardChanges } = useDocumentOperation(id, type);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const hasNoDraft = !draft;
  const isDisabled = hasNoDraft || Boolean(discardChanges.disabled);

  return {
    label: "Discard changes",
    icon: ResetIcon,
    tone: "critical",
    disabled: isDisabled,
    title: hasNoDraft
      ? "No draft changes to discard"
      : "Discard all unpublished draft edits",
    onHandle: () => {
      setIsConfirmOpen(true);
    },
    dialog: isConfirmOpen && {
      type: "confirm",
      tone: "critical",
      message: published
        ? "Are you sure you want to discard all unpublished draft edits and revert to the published version? A safety checkpoint of your draft will be created automatically."
        : "Are you sure you want to discard all unpublished draft edits? A safety checkpoint of your draft will be created automatically.",
      onConfirm: async () => {
        if (draft) {
          try {
            await createSnapshot({
              client,
              documentId: id,
              documentType: type,
              trigger: "pre-restore",
              content: extractCleanContent(draft as Record<string, unknown>),
              note: "Pre-discard safety backup",
              authorName: currentUser?.name || "Editor",
            });
          } catch (e) {
            console.warn("[DiscardChangesAction] Safety snapshot warning:", e);
          }
        }
        discardChanges.execute();
        setIsConfirmOpen(false);
      },
      onCancel: () => {
        setIsConfirmOpen(false);
      },
      confirmButtonText: "Discard changes",
      cancelButtonText: "Cancel",
    },
  };
};

DiscardChangesAction.action = "discardChanges";
export default DiscardChangesAction;
