import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/config/site";

/**
 * Standard utility to merge Tailwind classes cleanly without conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Builds a universal WhatsApp click-to-chat URL with a pre-filled, URL-encoded message.
 * Compatible with desktop (WhatsApp Web / App) and mobile (Native WhatsApp app).
 */
export function getWhatsAppUrl(customMessage?: string, phoneNumber = siteConfig.whatsapp.phoneNumber): string {
  const message = customMessage || siteConfig.whatsapp.templates.default;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

