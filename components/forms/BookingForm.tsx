"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/config";

const SERVICES = [
  "Customized Dress Stitching",
  "Bridal Costume Design",
  "Aari Work",
  "Stitching Materials Consultation",
];

/**
 * Appointment-request form for the Boutique Services page.
 * Distinct from ContactForm: focused purely on booking a consultation slot.
 *
 * Builds a pre-filled WhatsApp message and opens a chat with the business
 * on wa.me — the client asked for WhatsApp instead of email, and is fine
 * with the visitor tapping Send themselves once WhatsApp opens (that's a
 * WhatsApp platform limit: a free "click-to-chat" link can only pre-fill
 * text, not send silently on the visitor's behalf).
 */
export default function BookingForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const service = String(formData.get("service") ?? "").trim();
    const date = String(formData.get("date") ?? "").trim();
    const notes = String(formData.get("notes") ?? "").trim();

    const lines = [
      "New appointment request",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${service || "Not specified"}`,
      `Preferred date: ${date || "Not specified"}`,
      `Notes: ${notes || "—"}`,
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
          Your appointment request is ready in WhatsApp — just hit send there and we'll confirm
          your slot.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-rose-gold underline underline-offset-2"
        >
          Request another appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-1.5 sm:grid-cols-2 sm:gap-5">
        <div className="grid gap-1.5">
          <label htmlFor="booking-name" className="text-sm font-medium text-charcoal">
            Name
          </label>
          <input
            id="booking-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="rounded-lg border border-charcoal/15 px-4 py-3 text-sm focus:border-rose-gold"
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="booking-phone" className="text-sm font-medium text-charcoal">
            Phone number
          </label>
          <input
            id="booking-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="rounded-lg border border-charcoal/15 px-4 py-3 text-sm focus:border-rose-gold"
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="booking-service" className="text-sm font-medium text-charcoal">
          Service
        </label>
        <select
          id="booking-service"
          name="service"
          required
          className="rounded-lg border border-charcoal/15 px-4 py-3 text-sm focus:border-rose-gold"
        >
          <option value="">Select a service</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="booking-date" className="text-sm font-medium text-charcoal">
          Preferred date
        </label>
        <input
          id="booking-date"
          name="date"
          type="date"
          className="rounded-lg border border-charcoal/15 px-4 py-3 text-sm focus:border-rose-gold"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="booking-notes" className="text-sm font-medium text-charcoal">
          Tell us more about your expectations
        </label>
        <textarea
          id="booking-notes"
          name="notes"
          rows={4}
          className="rounded-lg border border-charcoal/15 px-4 py-3 text-sm focus:border-rose-gold"
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-coral px-6 py-3.5 text-sm font-semibold text-luxury-white shadow-soft-sm transition-transform hover:-translate-y-0.5 sm:w-auto"
      >
        Request via WhatsApp
      </button>
    </form>
  );
}