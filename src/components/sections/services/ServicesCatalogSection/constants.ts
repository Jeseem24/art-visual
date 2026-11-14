import {
  SERVICES_HEADER_DEFAULTS,
  SERVICES_ITEMS,
  type ServiceItem,
} from "@/components/sections/home/ServicesSection/constants";

export const SERVICES_CATALOG_HEADER = SERVICES_HEADER_DEFAULTS;

export const SERVICES_CATALOG_ITEMS: ServiceItem[] = [
  ...SERVICES_ITEMS,
  ...SERVICES_ITEMS.slice(3, 6).map((item) => ({
    ...item,
    id: `${item.id}-featured`,
  })),
];

