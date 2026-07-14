import { siteConfig } from "@/lib/config";
import { directionsLink, mapsPlaceLink } from "@/lib/utils";

/**
 * Uses the key-less `maps.google.com/maps?...&output=embed` embed pattern —
 * no Google Maps API key/billing required. If the iframe is blocked (ad
 * blockers, restrictive networks), the static fallback image + directions
 * link below it still lets people find the store.
 */
export default function MapEmbed() {
  const { latitude, longitude, placeId, cid } = siteConfig.geo;
  // Plain coordinates for the embedded pin — unambiguous, always centers on
  // the right spot. NOTE: do NOT use a name-based text query here. Several
  // other businesses nearby share "Sruthy" in their name, and when someone
  // taps through to open this in the native Google Maps app, a name search
  // can resolve to the wrong shop. `place_id:` text also fails the same way
  // ("No results found") since that syntax only works inside the iframe
  // itself, not as a forwarded search term.
  const embedSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&z=17&output=embed`;

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
          <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1">
            {/* CID-based link — guarantees opening this exact listing, even
                with other similarly-named businesses nearby. */}
            <a
              href={mapsPlaceLink(cid, latitude, longitude)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-semibold text-rose-gold"
            >
              View on Google Maps →
            </a>
            <a
              href={directionsLink(
                latitude,
                longitude,
                placeId,
                siteConfig.name,
                `${siteConfig.address.line1}, ${siteConfig.address.locality}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-semibold text-rose-gold"
            >
              {siteConfig.ctas.getDirections} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}