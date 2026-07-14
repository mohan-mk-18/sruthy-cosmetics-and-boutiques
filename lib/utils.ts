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

/** Google Maps directions link. Uses coordinates as the destination and,
 * when available, the Place ID plus a precise address/query string so it
 * opens the correct place on both desktop and mobile Google Maps. */
export function directionsLink(
  lat: number,
  lng: number,
  placeId?: string,
  label?: string,
  address?: string
): string {
  const params = new URLSearchParams({
    api: "1",
    destination: `${lat},${lng}`,
  });

  if (placeId) params.set("destination_place_id", placeId);
  if (address) params.set("query", address);
  else if (label) params.set("query", label);

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/** Canonical "view this exact business on Google Maps" link, using its CID.
 *  Unlike a name search or `place_id:` embed query, a CID link always opens
 *  the correct listing even when other businesses nearby share a similar
 *  name — this is the same format Google's own "Share" links use. */
export function mapsPlaceLink(cid?: string, lat?: number, lng?: number): string {
  if (cid) return `https://www.google.com/maps?cid=${cid}`;
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

/** Truncates copy to a max length for card one-liners (adds ellipsis if cut). */
export function truncate(text: string, max = 100): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}