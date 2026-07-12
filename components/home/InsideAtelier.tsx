import Image from "next/image";
import SectionCta from "@/components/ui/SectionCta";

const atelierPhotos = ["/images/gallery-1.jpg", "/images/gallery-4.jpg", "/images/gallery-6.jpg"];

/**
 * Replaces the old Gallery Preview section on Home (the standalone Gallery
 * page/section has been removed site-wide). Reuses the same "Inside the
 * Atelier" photo strip that appears on the About page.
 */
export default function InsideAtelier() {
  return (
    <section className="section-y bg-luxury-white" aria-labelledby="inside-atelier-heading">
      <div className="container">
        <div className="mb-10 text-center">
          <p className="font-micro text-xs uppercase tracking-[0.25em] text-rose-gold">
            Behind The Counter
          </p>
          <h2 id="inside-atelier-heading" className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
            Inside the Atelier
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {atelierPhotos.map((src) => (
            <div key={src} className="media-frame aspect-[4/5] rounded-card">
              <Image src={src} alt="Inside the Sruthy atelier" fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-12">
          <SectionCta />
        </div>
      </div>
    </section>
  );
}
