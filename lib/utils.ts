import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely, resolving conflicts (last one wins). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats a price in INR. Falls back to "Price on request" per edge-case rules. */
export function formatPrice(price?: string | number | null): string {
  if (price === undefined || price === null || price === "") return "Price on request";
  if (typeof price === "number") {
    return `₹${price.toLocaleString("en-IN")}`;
  }
  return price;
}

/** URL-safe slug from a label, used for category/product routes. */
export function slugify(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** wa.me deep link with a prefilled, friendly opening message. */
export function whatsappLink(
  phoneDigits: string,
  message = "Hello Sruthy Cosmetics & Boutique! 💖 I'm interested in shopping with you. Could you guide me with the available products and prices?"
): string {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
}

/** tel: link from a display phone string. */
export function telLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** Google Maps directions link. Uses the business name + Place ID (when
 *  available) as the destination so it opens the real business listing
 *  (reviews, photos, hours) instead of a bare coordinate pin. Falls back
 *  to raw lat/lng only if no name/placeId is available. */
export function directionsLink(lat: number, lng: number, placeId?: string, label?: string): string {
  const destination = label ? encodeURIComponent(label) : `${lat},${lng}`;
  const base = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  return placeId ? `${base}&destination_place_id=${placeId}` : base;
}

/** Truncates copy to a max length for card one-liners (adds ellipsis if cut). */
export function truncate(text: string, max = 100): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}