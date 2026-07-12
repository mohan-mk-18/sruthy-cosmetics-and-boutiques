"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { lightboxVariants } from "@/lib/animations";

interface ImageLightboxProps {
  images: { src: string; alt: string; caption?: string }[];
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

/**
 * Modal image viewer used by the Gallery and Product Detail pages.
 * Implements: focus trap, Escape to close, return focus to the trigger
 * element, and arrow-key navigation between images.
 */
export default function ImageLightbox({ images, index, onClose, onNavigate }: ImageLightboxProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerElRef = useRef<Element | null>(null);

  useEffect(() => {
    if (index !== null) {
      triggerElRef.current = document.activeElement;
      closeBtnRef.current?.focus();
    } else if (triggerElRef.current instanceof HTMLElement) {
      triggerElRef.current.focus();
    }
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && index < images.length - 1) onNavigate(index + 1);
      if (e.key === "ArrowLeft" && index > 0) onNavigate(index - 1);
      if (e.key === "Tab") {
        // simple focus trap: keep focus on the close button (single focusable control)
        e.preventDefault();
        closeBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length, onClose, onNavigate]);

  const active = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {active && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption ?? active.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-4"
          variants={lightboxVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="media-frame aspect-[4/5] sm:aspect-[16/10]">
              <Image src={active.src} alt={active.alt} fill className="object-contain" sizes="90vw" />
            </div>
            {active.caption && (
              <p className="mt-3 text-center text-sm text-luxury-white/80">{active.caption}</p>
            )}

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-charcoal sm:top-0 sm:-right-14"
            >
              <X size={18} />
            </button>

            {index > 0 && (
              <button
                type="button"
                onClick={() => onNavigate(index - 1)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-charcoal"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            {index < images.length - 1 && (
              <button
                type="button"
                onClick={() => onNavigate(index + 1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-charcoal"
              >
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
