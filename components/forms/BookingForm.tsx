"use client";

import { useState, type FormEvent } from "react";

const SERVICES = [
  "Customized Dress Stitching",
  "Bridal Costume Design",
  "Aari Work",
  "Stitching Materials Consultation",
];

/**
 * Appointment-request form for the Boutique Services page.
 * Distinct from ContactForm: focused purely on booking a consultation slot.
 */
export default function BookingForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((res) => setTimeout(res, 700)); // TODO: wire to a real endpoint
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-card bg-blush/40 p-6 text-charcoal">
        <p className="font-display text-lg">Appointment requested.</p>
        <p className="mt-1 text-sm text-charcoal/70">
          We'll call to confirm your consultation slot shortly.
        </p>
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
          Notes (fabric, occasion, reference images)
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
        disabled={status === "submitting"}
        className="mt-2 w-full rounded-full bg-coral px-6 py-3.5 text-sm font-semibold text-luxury-white shadow-soft-sm transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : "Request Appointment"}
      </button>
    </form>
  );
}
