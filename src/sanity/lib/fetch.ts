import { draftMode } from "next/headers";
import { client } from "./client";
import { projectId } from "../env";

export interface SanityFetchOptions<T> {
  query: string;
  params?: Record<string, unknown>;
  revalidate?: number | false;
  tags?: string[];
  fallback: T;
}

const isDev = process.env.NODE_ENV === "development";
// In development, bypass cache (0). In production, revalidate every 10 seconds for instant live updates.
const DEFAULT_REVALIDATE: number | false = isDev ? 0 : 10;

/**
 * Resilient Sanity Fetch Helper
 *
 * Guarantees zero-downtime & live previews:
 * 1. Automatically detects Next.js Draft Mode and fetches unpublished drafts (previewDrafts).
 * 2. Fetches live production content from Sanity Content Lake with on-demand tag cache.
 * 3. If Sanity is unreachable or offline, gracefully returns the provided local fallback.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = DEFAULT_REVALIDATE,
  tags = [],
  fallback,
}: SanityFetchOptions<T>): Promise<T> {
  // If no projectId is configured, immediately return fallback
  if (!projectId) {
    return fallback;
  }

  try {
    let isDraftMode = false;
    try {
      const draft = await draftMode();
      isDraftMode = draft.isEnabled;
    } catch {
      // In contexts outside request lifecycle (e.g. build time), draftMode throws safely
      isDraftMode = false;
    }

    const token =
      process.env.SANITY_API_WRITE_TOKEN ||
      process.env.SANITY_API_READ_TOKEN ||
      process.env.SANITY_API_TOKEN ||
      "skVe075yhbcTKLz9ErQXE9O2dHm5re0bM6ogj1Nucu5FApdt6L4PI1rvjZwsE2It7G1Ipo4voWBoesBRfOy9CCxHmAiPqlIoaeGy1aS2Qtv2VT1xlvHenhlTFiTOOlc5mdzRzBv4G36m2qcsVNRKKpmtIGfvyAi41LfmLtlEXpXXUtJsMhYa";

    const activeClient = isDraftMode
      ? client.withConfig({
          token,
          perspective: "drafts",
          useCdn: false,
        })
      : client;

    const fetchOptions: Record<string, unknown> = {
      next: {
        revalidate: isDraftMode ? 0 : revalidate,
        tags,
      },
    };

    if (isDraftMode || revalidate === 0) {
      fetchOptions.cache = "no-store";
    }

    const data = await activeClient.fetch<T>(query, params, fetchOptions);

    // If query returned null or empty array, fall back to default design content
    if (!data || (Array.isArray(data) && data.length === 0)) {
      if (isDraftMode) {
        // If draft query yielded null, fall back to published Content Lake data before local constants
        try {
          const publishedData = await client.fetch<T>(query, params, { cache: "no-store" });
          if (publishedData && (!Array.isArray(publishedData) || publishedData.length > 0)) {
            return publishedData;
          }
        } catch {
          // Ignore and continue to fallback
        }
      }
      return fallback;
    }

    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Sanity CMS] Live fetch failed or dataset is empty. Falling back to local default data.",
        error
      );
    }
    return fallback;
  }
}
