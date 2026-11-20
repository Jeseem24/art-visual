import { type CustomValidator, type FieldDefinition, defineField } from "sanity";
import { VideoPreviewInput } from "../components/media/VideoPreviewInput";

export const MAX_VIDEO_SIZE_MB = 20;
export const ALLOWED_VIDEO_MIME_TYPES = ["video/mp4", "video/webm"];
export const ALLOWED_VIDEO_ACCEPT = "video/mp4,video/webm";

export interface VideoValidationOptions {
  /** Maximum allowed file size in Megabytes (default: 20MB) */
  maxSizeMB?: number;
  /** Allowed MIME types (default: video/mp4, video/webm) */
  allowedMimeTypes?: string[];
}

/**
 * Reusable Sanity custom validator for video file uploads.
 * Queries Sanity's Content Lake for the uploaded asset metadata and verifies:
 * 1. File size does not exceed the maximum allowed MB limit (default 20MB).
 * 2. MIME type is strictly an allowed web-optimized format (MP4 / WebM).
 */
export function validateVideoFile(options?: VideoValidationOptions): CustomValidator {
  const maxSizeMB = options?.maxSizeMB ?? MAX_VIDEO_SIZE_MB;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const allowedMimeTypes = options?.allowedMimeTypes ?? ALLOWED_VIDEO_MIME_TYPES;

  return async (value: unknown, context) => {
    const fileValue = value as { asset?: { _ref?: string } } | undefined;
    // If no file reference is selected, pass validation (unless .required() is also chained)
    if (!fileValue?.asset?._ref) {
      return true;
    }

    try {
      const client = context.getClient({ apiVersion: "2024-01-01" });
      const asset = await client.fetch<{
        size?: number;
        mimeType?: string;
        originalFilename?: string;
      }>(
        `*[_id == $id][0]{ size, mimeType, originalFilename }`,
        { id: fileValue.asset._ref }
      );

      if (!asset) {
        return true;
      }

      // 1. Enforce strict file size limit
      if (asset.size && asset.size > maxSizeBytes) {
        const sizeMB = (asset.size / (1024 * 1024)).toFixed(1);
        return `Video file is too large (${sizeMB}MB). Maximum allowed size is ${maxSizeMB}MB. Please compress using H.264 MP4 (web-optimized) before uploading.`;
      }

      // 2. Enforce strict web video MIME type
      if (asset.mimeType && !allowedMimeTypes.includes(asset.mimeType)) {
        return `Invalid video format (${asset.mimeType}). Only MP4 (H.264) and WebM formats are supported for web playback. ProRes and MOV files are not playable across all mobile devices.`;
      }
    } catch (err) {
      // Graceful fallback if network is unreachable during draft authoring
      console.warn("Unable to verify video asset metadata:", err);
      return true;
    }

    return true;
  };
}

export interface DefineVideoUploadFieldOptions {
  name: string;
  title: string;
  description?: string;
  maxSizeMB?: number;
  required?: boolean;
  fieldset?: string;
  group?: string;
}

/**
 * Standardized schema factory for video upload fields across all current and future schemas.
 * Automatically enforces:
 * - File picker restricted to MP4 and WebM
 * - Hard file size validation (default 20MB)
 * - Clear, user-friendly helper instructions with recommended specs
 */
export function defineVideoUploadField({
  name,
  title,
  description,
  maxSizeMB = MAX_VIDEO_SIZE_MB,
  required = false,
  fieldset,
  group,
}: DefineVideoUploadFieldOptions): FieldDefinition<"file"> {
  const specsHint = `(Max ${maxSizeMB}MB · 1080p H.264 MP4 or WebM · 5–15s loop recommended)`;
  const fullDescription = description ? `${description} ${specsHint}` : specsHint;

  return defineField({
    name,
    title,
    type: "file",
    description: fullDescription,
    fieldset,
    group,
    options: {
      accept: ALLOWED_VIDEO_ACCEPT,
    },
    components: {
      input: VideoPreviewInput,
    },
    validation: (Rule) => {
      let rule = Rule.custom(validateVideoFile({ maxSizeMB }));
      if (required) {
        rule = rule.required();
      }
      return rule;
    },
  });
}
