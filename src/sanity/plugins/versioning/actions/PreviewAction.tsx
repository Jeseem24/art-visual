import type { DocumentActionComponent, DocumentActionDescription } from "sanity";
import { EyeOpenIcon } from "@sanity/icons/EyeOpen";

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

export const PreviewAction: DocumentActionComponent = (props): DocumentActionDescription => {
  const { type, draft, published } = props;

  return {
    label: "Preview",
    icon: EyeOpenIcon,
    title: "Open draft live preview in new tab",
    group: ["default", "paneActions"],
    onHandle: () => {
      const slug = (draft?.slug as any)?.current || (published?.slug as any)?.current;
      let path = TYPE_PATH_MAP[type] || "/";
      if (type === "serviceItem" && slug) {
        path = `/services/${slug}`;
      } else if (type === "featuredWork" && slug) {
        path = `/work`;
      }

      const previewUrl = `/api/draft-mode/enable?path=${encodeURIComponent(path)}&type=${encodeURIComponent(type)}`;

      if (typeof window !== "undefined") {
        window.open(previewUrl, "_blank");
      }
    },
  };
};

export default PreviewAction;
