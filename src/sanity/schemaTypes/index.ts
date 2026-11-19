import { type SchemaTypeDefinition } from "sanity";
import { homePage } from "./homePage";
import { aboutPage } from "./aboutPage";
import { servicesPage } from "./servicesPage";
import { workPage } from "./workPage";
import { contactPage } from "./contactPage";
import { serviceItem } from "./serviceItem";
import { featuredWork } from "./featuredWork";
import { testimonial } from "./testimonial";
import { faqItem } from "./faqItem";
import { ctaBanner } from "./ctaBanner";
import { navbarSettings } from "./navbarSettings";
import { siteSettings } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homePage,
    aboutPage,
    servicesPage,
    workPage,
    contactPage,
    serviceItem,
    featuredWork,
    testimonial,
    faqItem,
    ctaBanner,
    navbarSettings,
    siteSettings,
  ],
};
