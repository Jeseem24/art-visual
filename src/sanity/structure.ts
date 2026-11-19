import type {
  StructureResolver,
  StructureBuilder,
  DefaultDocumentNodeResolver,
} from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { CmsDashboardView } from "./components/dashboard/CmsDashboardView";
import {
  LayoutDashboard,
  Home,
  Info,
  Layers,
  Briefcase,
  Phone,
  MessageSquare,
  HelpCircle,
  Menu,
  Megaphone,
  Settings,
} from "lucide-react";

/**
 * Singleton document types that represent unique, fixed pages or global configurations.
 * These documents should never be duplicated, deleted, or multiplied.
 */
export const SINGLETON_TYPES = new Set([
  "homePage",
  "aboutPage",
  "servicesPage",
  "workPage",
  "contactPage",
  "navbarSettings",
  "ctaBanner",
  "siteSettings",
]);

/**
 * Actions that are blocked on singleton documents.
 * Editors can edit, discard changes, and publish, but cannot delete or duplicate the page itself.
 */
export const BLOCKED_SINGLETON_ACTIONS = new Set([
  "delete",
  "duplicate",
  "unpublish",
]);

/**
 * Reusable document views:
 * Standard Form Editor for content management.
 */
export const getDocumentViews = (S: StructureBuilder) => [
  S.view.form().title("Editor"),
];

/**
 * Default document node resolver for collection items (Projects, Services, etc.)
 */
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S) => {
  return S.document().views(getDocumentViews(S));
};

/**
 * Custom Desk Structure that organizes the Sanity Studio navigation hierarchy:
 * 1. Fixed Pages (Singletons with Preview Live tabs)
 * 2. Editable Collections (Projects, Services, Testimonials, FAQs - full CRUD with drag handles)
 * 3. Global Settings (Header, Footer, CTA - Singletons with Preview Live tabs)
 */
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content Studio")
    .items([
      // --- DASHBOARD OVERVIEW ---
      S.listItem()
        .title("Dashboard Overview")
        .id("dashboardOverview")
        .icon(LayoutDashboard)
        .child(
          S.component(CmsDashboardView)
            .title("Dashboard Overview")
        ),

      S.divider(),

      // --- FIXED PAGES (Singletons) ---
      S.listItem()
        .title("Home Page")
        .id("homePageListItem")
        .schemaType("homePage")
        .icon(Home)
        .child(
          S.document()
            .title("Home Page")
            .schemaType("homePage")
            .documentId("homePage")
            .views(getDocumentViews(S))
        ),
      S.listItem()
        .title("About Page")
        .id("aboutPageListItem")
        .schemaType("aboutPage")
        .icon(Info)
        .child(
          S.document()
            .title("About Page")
            .schemaType("aboutPage")
            .documentId("aboutPage")
            .views(getDocumentViews(S))
        ),
      S.listItem()
        .title("Services Page")
        .id("servicesPageListItem")
        .schemaType("servicesPage")
        .icon(Layers)
        .child(
          S.document()
            .title("Services Page")
            .schemaType("servicesPage")
            .documentId("servicesPage")
            .views(getDocumentViews(S))
        ),
      S.listItem()
        .title("Work Page")
        .id("workPageListItem")
        .schemaType("workPage")
        .icon(Briefcase)
        .child(
          S.document()
            .title("Work Page")
            .schemaType("workPage")
            .documentId("workPage")
            .views(getDocumentViews(S))
        ),
      S.listItem()
        .title("Contact Page")
        .id("contactPageListItem")
        .schemaType("contactPage")
        .icon(Phone)
        .child(
          S.document()
            .title("Contact Page")
            .schemaType("contactPage")
            .documentId("contactPage")
            .views(getDocumentViews(S))
        ),

      S.divider(),

      // --- EDITABLE COLLECTIONS (Orderable with Drag-and-Drop Handles) ---
      orderableDocumentListDeskItem({
        type: "featuredWork",
        title: "Portfolio Projects",
        id: "orderableFeaturedWork",
        icon: Briefcase,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "serviceItem",
        title: "Services",
        id: "orderableServiceItem",
        icon: Layers,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "testimonial",
        title: "Client Testimonials",
        id: "orderableTestimonial",
        icon: MessageSquare,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "faqItem",
        title: "FAQ Items",
        id: "orderableFaqItem",
        icon: HelpCircle,
        S,
        context,
      }),

      S.divider(),

      // --- GLOBAL CONFIGURATION (Singletons) ---
      S.listItem()
        .title("Navigation Header")
        .id("navbarSettingsListItem")
        .schemaType("navbarSettings")
        .icon(Menu)
        .child(
          S.document()
            .title("Navigation Header")
            .schemaType("navbarSettings")
            .documentId("navbarSettings")
            .views(getDocumentViews(S))
        ),
      S.listItem()
        .title("CTA Banner")
        .id("ctaBannerListItem")
        .schemaType("ctaBanner")
        .icon(Megaphone)
        .child(
          S.document()
            .title("CTA Banner")
            .schemaType("ctaBanner")
            .documentId("ctaBanner")
            .views(getDocumentViews(S))
        ),
      S.listItem()
        .title("Footer & Site Settings")
        .id("siteSettingsListItem")
        .schemaType("siteSettings")
        .icon(Settings)
        .child(
          S.document()
            .title("Footer & Site Settings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .views(getDocumentViews(S))
        ),
    ]);
