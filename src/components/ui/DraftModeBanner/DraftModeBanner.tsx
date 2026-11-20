import React from "react";
import { draftMode } from "next/headers";

/**
 * DraftModeBanner
 * Floating notification pill displayed when Next.js Draft Mode is active.
 * Shows editors they are previewing unpublished draft content and provides
 * a 1-click button to exit preview mode.
 */
export async function DraftModeBanner() {
  let isDraft = false;
  try {
    const draft = await draftMode();
    isDraft = draft.isEnabled;
  } catch {
    isDraft = false;
  }

  if (!isDraft) {
    return null;
  }

  return (
    <aside
      aria-label="Draft Preview Mode Active"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#101112]/95 px-4 py-2.5 text-xs font-medium text-white shadow-2xl backdrop-blur-md border border-white/20 select-none animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <span className="relative flex h-2.5 w-2.5 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="tracking-wide text-neutral-200">
        Previewing Draft Content
      </span>
      <a
        href="/api/draft-mode/disable"
        className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-white/25 active:scale-95"
      >
        Exit Preview
      </a>
    </aside>
  );
}

export default DraftModeBanner;
