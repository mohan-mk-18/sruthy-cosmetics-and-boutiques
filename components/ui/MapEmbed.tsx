import { siteConfig } from "@/lib/config";
import { directionsLink } from "@/lib/utils";

/**
 * Uses the key-less `maps.google.com/maps?...&output=embed` embed pattern —
 * no Google Maps API key/billing required. If the iframe is blocked (ad
 * blockers, restrictive networks), the static fallback image + directions
 * link below it still lets people find the store.
 */
export default function MapEmbed() {
  const { latitude, longitude, placeId } = siteConfig.geo;
  const query = placeId
    ? `place_id:${placeId}`
    : encodeURIComponent(
        `${siteConfig.address.line1}, ${siteConfig.address.locality}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`
      );
  const embedSrc = `https://maps.google.com/maps?q=${query}&z=15&output=embed`;

  return (
    <div className="media-frame aspect-[16/10] rounded-card">
      <iframe
        title={`Map showing the location of ${siteConfig.name}`}
        src={embedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
      />
      {/* Static fallback shown behind the iframe; visible if the map fails to load. */}
      <div className="absolute inset-0 -z-10 grid place-items-center bg-blush/40 p-6 text-center">
        <div>
          <p className="font-display text-lg text-charcoal">{siteConfig.address.line1}</p>
          <p className="text-sm text-charcoal/70">
            {siteConfig.address.locality}, {siteConfig.address.region} {siteConfig.address.postalCode}
          </p>
          <a
            href={directionsLink(latitude, longitude, placeId, siteConfig.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-rose-gold"
          >
            {siteConfig.ctas.getDirections} →
          </a>
        </div>
      </div>
    </div>
  );
}