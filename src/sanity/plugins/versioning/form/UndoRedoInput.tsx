"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import type { InputProps } from "sanity";
import { useFormValue, useDocumentOperation } from "sanity";
import { usePaneRouter } from "sanity/structure";
import { Card, Flex, Button, Text } from "@sanity/ui";
import { UndoIcon } from "@sanity/icons/Undo";
import { SyncIcon } from "@sanity/icons/Sync";
import { EyeOpenIcon } from "@sanity/icons/EyeOpen";
import { ClockIcon } from "@sanity/icons/Clock";
import { sessionHistory } from "../lib/sessionHistory";
import { getPublishedId, extractCleanContent } from "../lib/document";

const TYPE_PATH_MAP: Record<string, string> = {
  homePage: "/",
  aboutPage: "/about",
  servicesPage: "/services",
  serviceItem: "/services",
  workPage: "/work",
  featuredWork: "/work",
  contactPage: "/contact",
  navbarSettings: "/",
  ctaBanner: "/",
  siteSettings: "/",
  testimonial: "/",
  faqItem: "/",
};

function RootUndoRedoToolbar(props: InputProps) {
  const currentDoc = useFormValue([]) as Record<string, unknown> | undefined;
  const rawId = useFormValue(["_id"]) as string | undefined;
  const docType = useFormValue(["_type"]) as string | undefined;

  const publishedId = rawId ? getPublishedId(rawId) : "";
  const { patch } = useDocumentOperation(publishedId, docType || "");

  const { params, setParams } = usePaneRouter();
  const isHistoryOpen = params?.inspect === "version-history";

  const [, setTick] = useState(0);
  const forceUpdate = useCallback(() => setTick((t) => t + 1), []);

  const currentDocRef = useRef(currentDoc);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    currentDocRef.current = currentDoc;
  });

  // Record document changes into session history
  useEffect(() => {
    if (!publishedId || !currentDoc) return;
    sessionHistory.recordChange(publishedId, currentDoc);
  }, [publishedId, currentDoc]);

  // Flush any pending debounced change on unmount
  useEffect(() => {
    return () => {
      if (publishedId && currentDocRef.current) {
        sessionHistory.flushPending(publishedId);
      }
    };
  }, [publishedId]);

  // Global Keyboard Shortcuts (Ctrl+Z, Ctrl+Shift+Z, Ctrl+Y, Cmd+Z, Cmd+Shift+Z)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept shortcuts when user is typing inside text fields or rich-text editors
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable ||
          Boolean(
            target.closest(
              '[data-slate-editor="true"], [data-testid="pt-editor"], [role="toolbar"], [role="combobox"]'
            )
          ));

      const isMac =
        typeof navigator !== "undefined" &&
        (/Mac|iPod|iPhone|iPad/.test(
          (navigator as any).userAgentData?.platform || navigator.platform || ""
        ));
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (!modifier) return;

      // Undo: Ctrl/Cmd + Z (without Shift)
      if (e.key.toLowerCase() === "z" && !e.shiftKey) {
        if (!isInput && sessionHistory.canUndo(publishedId)) {
          e.preventDefault();
          const prevState = sessionHistory.undo(publishedId);
          if (prevState) {
            applyStatePatch(prevState);
          }
        }
      }

      // Redo: Ctrl/Cmd + Shift + Z OR Ctrl + Y
      if (
        (e.key.toLowerCase() === "z" && e.shiftKey) ||
        (e.key.toLowerCase() === "y" && !e.shiftKey)
      ) {
        if (!isInput && sessionHistory.canRedo(publishedId)) {
          e.preventDefault();
          const nextState = sessionHistory.redo(publishedId);
          if (nextState) {
            applyStatePatch(nextState);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [publishedId, patch, forceUpdate]);

  const applyStatePatch = (state: Record<string, unknown>) => {
    const currentClean = extractCleanContent(currentDocRef.current || {});
    const targetClean = extractCleanContent(state);

    const currentKeys = Object.keys(currentClean);
    const targetKeys = new Set(Object.keys(targetClean));
    const keysToUnset = currentKeys.filter((k) => !targetKeys.has(k));

    const operations: any[] = [{ set: targetClean }];
    if (keysToUnset.length > 0) {
      operations.push({ unset: keysToUnset });
    }

    patch.execute(operations);
    forceUpdate();
  };

  const handleUndo = () => {
    const prevState = sessionHistory.undo(publishedId);
    if (prevState) {
      applyStatePatch(prevState);
    }
  };

  const handleRedo = () => {
    const nextState = sessionHistory.redo(publishedId);
    if (nextState) {
      applyStatePatch(nextState);
    }
  };

  const handlePreview = () => {
    const path = TYPE_PATH_MAP[docType || ""] || "/";
    const previewUrl = `/api/draft-mode/enable?path=${encodeURIComponent(path)}&type=${encodeURIComponent(
      docType || ""
    )}`;

    if (typeof window !== "undefined") {
      window.open(previewUrl, "_blank");
    }
  };

  const handleHistoryToggle = () => {
    setParams({
      ...params,
      inspect: isHistoryOpen ? undefined : "version-history",
    });
  };

  const canUndo = sessionHistory.canUndo(publishedId);
  const canRedo = sessionHistory.canRedo(publishedId);
  const undoCount = sessionHistory.getUndoCount(publishedId);
  const redoCount = sessionHistory.getRedoCount(publishedId);

  return (
    <div ref={containerRef}>
      <Card
        padding={2}
        radius={2}
        border
        tone="inherit"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          marginBottom: "16px",
          backdropFilter: "blur(12px)",
          backgroundColor: "var(--card-bg-color, #101112)",
          borderColor: "var(--card-border-color, #27272a)",
        }}
      >
        <Flex align="center" justify="space-between" wrap="wrap" gap={2}>
          {/* Left: Quick Undo / Redo */}
          <Flex align="center" gap={1}>
            <Button
              icon={UndoIcon}
              text="Undo"
              mode="ghost"
              fontSize={1}
              padding={2}
              disabled={!canUndo}
              onClick={handleUndo}
              title={canUndo ? `Undo last edit (${undoCount} available · Ctrl+Z)` : "Nothing to undo"}
            />
            <Button
              icon={SyncIcon}
              text="Redo"
              mode="ghost"
              fontSize={1}
              padding={2}
              disabled={!canRedo}
              onClick={handleRedo}
              title={canRedo ? `Redo edit (${redoCount} available · Ctrl+Y)` : "Nothing to redo"}
            />
          </Flex>

          {/* Right: Preview Live & History Inspector Toggle */}
          <Flex align="center" gap={1}>
            <Button
              icon={EyeOpenIcon}
              text="Preview"
              mode="ghost"
              fontSize={1}
              padding={2}
              onClick={handlePreview}
              title="Preview unsaved draft in interactive browser mode"
            />
            <Button
              icon={ClockIcon}
              text="History"
              mode={isHistoryOpen ? "default" : "ghost"}
              tone={isHistoryOpen ? "primary" : "default"}
              fontSize={1}
              padding={2}
              onClick={handleHistoryToggle}
              title="Open durable version history checkpoints"
            />
          </Flex>
        </Flex>
      </Card>

      {/* Render the default Sanity form body */}
      {props.renderDefault(props)}
    </div>
  );
}

/**
 * Custom Sanity Form Input that injects a sticky editorial toolbar at the root of every document.
 * Performance Optimization: Bypasses hook mounting on all leaf/nested fields.
 */
export function UndoRedoInput(props: InputProps) {
  // Only mount the toolbar component at the root level (path.length === 0)
  if (props.path.length > 0) {
    return props.renderDefault(props);
  }

  return <RootUndoRedoToolbar {...props} />;
}
