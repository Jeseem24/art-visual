import type { DocumentActionComponent, DocumentActionDescription } from "sanity";
import { ClockIcon } from "@sanity/icons/Clock";
import { usePaneRouter } from "sanity/structure";

/**
 * Direct History Action for the Art Visual Hybrid Action Toolbar.
 * Toggles the Version History inspector panel open/closed.
 */
export const HistoryAction: DocumentActionComponent = (props): DocumentActionDescription => {
  const { onComplete } = props;
  const { params, setParams } = usePaneRouter();
  const isHistoryOpen = params?.inspect === "version-history";

  return {
    label: "History",
    icon: ClockIcon,
    title: "Open Version History inspector panel",
    group: ["default", "paneActions"],
    onHandle: () => {
      setParams({
        ...params,
        inspect: isHistoryOpen ? undefined : "version-history",
      });

      if (onComplete) {
        onComplete();
      }
    },
  };
};

export default HistoryAction;
