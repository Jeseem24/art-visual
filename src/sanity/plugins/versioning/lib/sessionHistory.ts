import { MAX_UNDO_STEPS, UNDO_DEBOUNCE_MS } from "../constants";
import { extractCleanContent } from "./document";

interface DocumentHistoryStack {
  past: Record<string, unknown>[];
  future: Record<string, unknown>[];
  lastRecordedJson: string;
  debounceTimer: ReturnType<typeof setTimeout> | null;
  pendingDraft: Record<string, unknown> | null;
}

/**
 * Module-level memory store keyed by document ID.
 * Lives outside React's render cycle so switching between [ Editor ]
 * and [ Preview Live ] does NOT wipe or reset the undo/redo history.
 */
const sessionStacks = new Map<string, DocumentHistoryStack>();

function getOrCreateStack(docId: string): DocumentHistoryStack {
  let stack = sessionStacks.get(docId);
  if (!stack) {
    stack = {
      past: [],
      future: [],
      lastRecordedJson: "",
      debounceTimer: null,
      pendingDraft: null,
    };
    sessionStacks.set(docId, stack);
  }
  return stack;
}

export const sessionHistory = {
  /**
   * Initializes or pushes a new state into the document's undo stack.
   * Debounces fast keystrokes (600ms) to prevent recording individual characters.
   */
  recordChange(docId: string, currentDraft: Record<string, unknown>): void {
    if (!docId || !currentDraft) return;
    const stack = getOrCreateStack(docId);
    const cleanCurrent = extractCleanContent(currentDraft);
    const currentJson = JSON.stringify(cleanCurrent);

    // If identical to last recorded state, ignore
    if (currentJson === stack.lastRecordedJson) return;

    stack.pendingDraft = cleanCurrent;

    // Clear existing debounce timer
    if (stack.debounceTimer) {
      clearTimeout(stack.debounceTimer);
    }

    // Set debounce window
    stack.debounceTimer = setTimeout(() => {
      this.flushPending(docId);
    }, UNDO_DEBOUNCE_MS);
  },

  /**
   * Flushes any pending debounced change into the past stack immediately.
   * Called on unmount so switching to [ Preview Live ] preserves the exact edit.
   */
  flushPending(docId: string): void {
    const stack = sessionStacks.get(docId);
    if (!stack || !stack.pendingDraft) return;

    const currentJson = JSON.stringify(stack.pendingDraft);
    if (currentJson !== stack.lastRecordedJson) {
      stack.past.push(stack.pendingDraft);
      if (stack.past.length > MAX_UNDO_STEPS) {
        stack.past.shift();
      }
      stack.future = []; // Clear redo branch on new edit
      stack.lastRecordedJson = currentJson;
    }

    stack.pendingDraft = null;
    if (stack.debounceTimer) {
      clearTimeout(stack.debounceTimer);
      stack.debounceTimer = null;
    }
  },

  canUndo(docId: string): boolean {
    const stack = sessionStacks.get(docId);
    return Boolean(stack && stack.past.length > 1);
  },

  canRedo(docId: string): boolean {
    const stack = sessionStacks.get(docId);
    return Boolean(stack && stack.future.length > 0);
  },

  getUndoCount(docId: string): number {
    const stack = sessionStacks.get(docId);
    return stack ? Math.max(0, stack.past.length - 1) : 0;
  },

  getRedoCount(docId: string): number {
    const stack = sessionStacks.get(docId);
    return stack ? stack.future.length : 0;
  },

  /**
   * Undoes the last change and returns the previous document state to set
   */
  undo(docId: string): Record<string, unknown> | null {
    this.flushPending(docId);
    const stack = sessionStacks.get(docId);
    if (!stack || stack.past.length <= 1) return null;

    const currentState = stack.past.pop()!;
    stack.future.unshift(currentState);

    const previousState = stack.past[stack.past.length - 1];
    stack.lastRecordedJson = JSON.stringify(previousState);
    return previousState;
  },

  /**
   * Redoes the previously undone change and returns the restored state to set
   */
  redo(docId: string): Record<string, unknown> | null {
    this.flushPending(docId);
    const stack = sessionStacks.get(docId);
    if (!stack || stack.future.length === 0) return null;

    const nextState = stack.future.shift()!;
    stack.past.push(nextState);

    stack.lastRecordedJson = JSON.stringify(nextState);
    return nextState;
  },
};
