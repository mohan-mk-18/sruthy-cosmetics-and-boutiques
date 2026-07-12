import type { Config } from "tailwindcss";

/**
 * Sruthy Cosmetics And Boutiques — design tokens.
 * Colors, type, and spacing here are the single source of truth for the whole site.
 * See /lib/config.ts and README.md § Design Tokens for the same values in JSON form.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background/Base (60%) — Soft Pale Rose. This is the site's dominant
        // background; "luxury-white" is the secondary surface color used for
        // cards/panels that need to stand out against it.
        ivory: "#F7E8EC",
        "luxury-white": "#FFFFFF",
        // Accent/CTA (10%) — Dusty Mauve / Soft Wine. "soft-gold" is a deeper
        // wine tone from the same family, used for hover states and secondary
        // accents so everything stays inside one cohesive palette.
        "rose-gold": "#C57C8A",
        "soft-gold": "#A85D6D",
        coral: "#C57C8A", // primary CTA — same accent color, kept as its own token for clarity in components
        blush: "#F0D3DA",
        // Text/Primary (30%) — Near-Black Plum
        charcoal: "#1A0B12",
        // Utility tints
        "glass-border": "rgba(255,255,255,0.6)",
        "shadow-tint": "rgba(26,11,18,0.06)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        micro: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(26,11,18,0.2)",
        "soft-sm": "0 8px 24px -12px rgba(26,11,18,0.16)",
        glass: "inset 0 1px 0 0 rgba(255,255,255,0.5)",
      },
      spacing: {
        section: "8rem",
        "section-sm": "5rem",
      },
      transitionDuration: {
        subtle: "150ms",
        DEFAULT: "300ms",
        extended: "600ms",
        slow: "900ms",
      },
      backgroundImage: {
        "gradient-editorial":
          "linear-gradient(135deg, #F7E8EC 0%, #F0D3DA 45%, #C57C8A 100%)",
        "gradient-rose": "linear-gradient(120deg, #C57C8A 0%, #A85D6D 100%)",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.06)", opacity: "0.85" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({ strategy: "class" }),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
    // Glassmorphism + animated-gradient-border utilities used across cards, navbar, and modals.
    function ({ addUtilities }: { addUtilities: (u: Record<string, any>) => void }) {
      addUtilities({
        ".glass-panel": {
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(16px)",
          "-webkit-backdrop-filter": "blur(16px)",
          border: "1px solid rgba(255,255,255,0.6)",
        },
        ".glass-navbar": {
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(20px) saturate(160%)",
          "-webkit-backdrop-filter": "blur(20px) saturate(160%)",
        },
        ".gradient-border-rose": {
          position: "relative",
          backgroundClip: "padding-box",
        },
        ".gradient-border-rose::before": {
          content: '""',
          position: "absolute",
          inset: "0",
          padding: "1px",
          borderRadius: "inherit",
          background: "linear-gradient(120deg, #C57C8A, #A85D6D)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        },
        ".text-balance": {
          textWrap: "balance",
        },
        ".scrollbar-none": {
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
        },
        ".scrollbar-none::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
};

export default config;
