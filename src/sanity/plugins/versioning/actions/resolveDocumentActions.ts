import type { DocumentActionComponent, DocumentActionsContext } from "sanity";
import { useClient, useCurrentUser } from "sanity";
import { PreviewAction } from "./PreviewAction";
import { HistoryAction } from "./HistoryAction";
import { DiscardChangesAction } from "./DiscardChangesAction";
import { SaveVersionAction } from "./SaveVersionAction";
import { createSnapshot, extractCleanContent } from "../lib/document";
import { SINGLETON_TYPES, BLOCKED_SINGLETON_ACTIONS } from "../../../structure";

/**
 * Wraps Sanity's Publish action to:
 * 1. Automatically take a durable "publish" snapshot of the document before publishing.
 * 2. Enforce context-aware disabled states (disabled when draft === published or no draft).
 * 3. Ensure primary button styling and helpful tooltips.
 */
export function wrapPublishAction(originalPublish: DocumentActionComponent): DocumentActionComponent {
  const WrappedPublish: DocumentActionComponent = (props) => {
    const originalResult = originalPublish(props);
    const client = useClient({ apiVersion: "2024-01-01" });
    const currentUser = useCurrentUser();

    if (!originalResult) return null;

    const hasNoDraft = !props.draft;
    let isIdenticalToPublished = false;

    if (props.draft && props.published) {
      const cleanDraft = extractCleanContent(props.draft as Record<string, unknown>);
      const cleanPublished = extractCleanContent(props.published as Record<string, unknown>);
      isIdenticalToPublished = JSON.stringify(cleanDraft) === JSON.stringify(cleanPublished);
    }

    const isDisabled = Boolean(
      originalResult.disabled || hasNoDraft || isIdenticalToPublished
    );

    const disabledTitle = hasNoDraft
      ? "No draft changes to publish"
      : isIdenticalToPublished
      ? "Draft has no new changes compared to published"
      : originalResult.title;

    const originalOnHandle = originalResult.onHandle;

    return {
      ...originalResult,
      tone: "primary",
      disabled: isDisabled,
      title: isDisabled ? disabledTitle : originalResult.title,
      onHandle: async () => {
        const activeDoc = props.draft || props.published;
        if (activeDoc) {
          try {
            await createSnapshot({
              client,
              documentId: props.id,
              documentType: props.type,
              trigger: "publish",
              content: extractCleanContent(activeDoc as Record<string, unknown>),
              note: "Published website version",
              authorName: currentUser?.name || "Editor",
            });
          } catch (err) {
            console.warn("[Versioning Plugin] Auto-publish snapshot warning:", err);
          }
        }

        if (originalOnHandle) {
          originalOnHandle();
        }
      },
    };
  };

  WrappedPublish.action = "publish";
  return WrappedPublish;
}

/**
 * Art Visual Hybrid Action Toolbar Resolver:
 *
 * Hierarchy:
 * - Bottom outside primary button: [Publish (Primary)]
 * - Menu [⋮]: [Save Version, Preview, History, Schedule Publish, ...otherActions, Discard Changes (Destructive)]
 * - Top sticky toolbar in UndoRedoInput provides 1-click direct access to [Undo, Redo, Preview, History].
 *
 * Preserves singleton locking (blocks delete, duplicate, unpublish on singleton documents).
 * Enforces context-aware states (Publish disabled when no draft or unchanged; Discard Changes disabled when no draft).
 */
export function resolveVersioningActions(
  prev: DocumentActionComponent[],
  context: DocumentActionsContext
): DocumentActionComponent[] {
  // Do not attach actions to internal versionSnapshot document
  if (context.schemaType === "versionSnapshot") {
    return prev;
  }

  // Idempotency check: if toolbar actions are already assembled, return as-is
  if (prev.includes(SaveVersionAction)) {
    return prev;
  }

  const isSingleton = SINGLETON_TYPES.has(context.schemaType);

  // Filter actions based on singleton rules
  let inputActions = prev;
  if (isSingleton) {
    inputActions = prev.filter(
      (a) => !a.action || !BLOCKED_SINGLETON_ACTIONS.has(a.action)
    );
  }

  let publishAction: DocumentActionComponent | undefined;
  let scheduleAction: DocumentActionComponent | undefined;
  const otherActions: DocumentActionComponent[] = [];

  for (const action of inputActions) {
    if (action.action === "publish") {
      publishAction = wrapPublishAction(action);
    } else if (action.action === "discardChanges") {
      // Replaced by custom DiscardChangesAction below
      continue;
    } else if (action.action === "schedule") {
      scheduleAction = action;
    } else if (
      action === PreviewAction ||
      action === HistoryAction ||
      action === SaveVersionAction
    ) {
      // Avoid duplicates if re-invoked
      continue;
    } else {
      otherActions.push(action);
    }
  }

  // Fallback publish action if none existed in inputActions
  if (!publishAction) {
    const defaultPublish = prev.find((a) => a.action === "publish");
    if (defaultPublish) {
      publishAction = wrapPublishAction(defaultPublish);
    }
  }

  // Build the Hybrid Action Toolbar hierarchy:
  // Outside direct primary button: Publish
  // Menu [⋮]: Save Version, Preview, History, Schedule Publish, other CRUD actions, Discard Changes
  const result: DocumentActionComponent[] = [
    ...(publishAction ? [publishAction] : []),
    SaveVersionAction,
    PreviewAction,
    HistoryAction,
    ...(scheduleAction ? [scheduleAction] : []),
    ...otherActions,
    DiscardChangesAction,
  ];

  return result;
}

export default resolveVersioningActions;
