import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";
import { AssetUsageDetails } from "./src/sanity/components/media/AssetUsageDetails";
import { versioningPlugin } from "./src/sanity/plugins/versioning";
import { resolveVersioningActions } from "./src/sanity/plugins/versioning/actions/resolveDocumentActions";
import { schema } from "./src/sanity/schemaTypes";
import { projectId, dataset } from "./src/sanity/env";
import {
  structure,
  defaultDocumentNode,
  SINGLETON_TYPES,
} from "./src/sanity/structure";

export default defineConfig({
  basePath: "/studio",
  name: "art-visual-studio",
  title: "Art Visual Studio",
  projectId,
  dataset,
  schema: {
    ...schema,
    // Filter out singleton types from the global "Create new document" menu (+)
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    // Art Visual Hybrid Action Toolbar:
    // Outside direct: [Preview, History, Publish (Primary)]
    // Menu [⋮]: [Save Version, Schedule Publish, Discard Changes (Destructive)]
    // Enforces singleton blocking (delete, duplicate, unpublish) and context-aware states
    actions: resolveVersioningActions,
    // Filter out singletons from new document creation options
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (template) => !SINGLETON_TYPES.has(template.templateId)
        );
      }
      return prev;
    },
  },
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    media({
      maximumUploadSize: 20 * 1024 * 1024,
      components: {
        details: AssetUsageDetails,
      },
    }),
    versioningPlugin(),
  ],
});
