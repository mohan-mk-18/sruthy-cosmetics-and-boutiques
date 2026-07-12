import { siteConfig } from "@/lib/config";

/**
 * Used as app/loading.tsx (and per-route loading.tsx files) so navigations
 * show a brief, on-brand loading state instead of a blank screen.
 */
export default function LoadingScreen() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="grid min-h-[60vh] place-items-center bg-luxury-white"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-blush border-t-rose-gold" />
        <p className="font-micro text-xs uppercase tracking-[0.25em] text-charcoal/50">
          {siteConfig.shortName}
        </p>
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}
