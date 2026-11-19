import { definePlugin } from "sanity";
import { ClockIcon } from "@sanity/icons/Clock";
import { versionSnapshot } from "./schemas/versionSnapshot";
import { resolveVersioningActions } from "./actions/resolveDocumentActions";
import { VersionHistoryInspector } from "./inspectors/VersionHistoryInspector";
import { UndoRedoInput } from "./form/UndoRedoInput";

export const versioningPlugin = definePlugin({
  name: "art-visual-versioning",
  schema: {
    types: [versionSnapshot],
  },
  document: {
    actions: resolveVersioningActions,
    inspectors: (prev) => [
      ...prev,
      {
        name: "version-history",
        title: "Version History",
        icon: ClockIcon,
        component: VersionHistoryInspector,
      },
    ],
  },
  form: {
    components: {
      input: UndoRedoInput,
    },
  },
});
