"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/config";

const SERVICE_LABELS: Record<string, string> = {
  jewellery: "Jewellery",
  "beauty-products": "Beauty Products",
  "bridal-boutique": "Bridal Boutique",
  "dress-stitching": "Dress Stitching",
  "aari-work": "Aari Work",
  general: "General Enquiry",
};

/**
 * Builds a pre-filled WhatsApp message and opens a chat with the business
 * on wa.me — the client asked for WhatsApp instead of email, and is fine
 * with the visitor tapping Send themselves once WhatsApp opens (that's a
 * WhatsApp platform limit: a free "click-to-chat" link can only pre-fill
 * text, not send silently on the visitor's behalf).
 */
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const serviceValue = String(formData.get("service") ?? "");
    const message = String(formData.get("message") ?? "").trim();

    const lines = [
      "New enquiry from the website",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${SERVICE_LABELS[serviceValue] ?? "Not specified"}`,
      `Message: ${message || "—"}`,
    ];

    const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-card bg-blush/40 p-6 text-charcoal">
        <p className="font-display text-lg">Opening WhatsApp…</p>
        <p className="mt-1 text-sm text-charcoal/70">
          Your message is ready in WhatsApp — just hit send there to reach us.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-rose-gold underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium text-charcoal">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="rounded-lg border border-charcoal/15 px-4 py-3 text-sm focus:border-rose-gold"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="contact-phone" className="text-sm font-medium text-charcoal">
          Phone number
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className="rounded-lg border border-charcoal/15 px-4 py-3 text-sm focus:border-rose-gold"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="contact-service" className="text-sm font-medium text-charcoal">
          Service of interest
        </label>
        <select
          id="contact-service"
          name="service"
          className="rounded-lg border border-charcoal/15 px-4 py-3 text-sm focus:border-rose-gold"
        >
          <option value="">Select an option</option>
          <option value="jewellery">Jewellery</option>
          <option value="beauty-products">Beauty Products</option>
          <option value="bridal-boutique">Bridal Boutique</option>
          <option value="dress-stitching">Dress Stitching</option>
          <option value="aari-work">Aari Work</option>
          <option value="general">General Enquiry</option>
        </select>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium text-charcoal">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          className="rounded-lg border border-charcoal/15 px-4 py-3 text-sm focus:border-rose-gold"
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-coral px-6 py-3.5 text-sm font-semibold text-luxury-white shadow-soft-sm transition-transform hover:-translate-y-0.5 sm:w-auto"
      >
        Send via WhatsApp
      </button>
    </form>
  );
}