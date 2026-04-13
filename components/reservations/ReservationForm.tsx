"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, AlertCircle, Loader2, MessageCircle } from "lucide-react";
import { buildReservationWhatsAppUrl } from "@/lib/whatsapp";
import restaurant from "@/config/restaurant.config";

const schema = z.object({
  name:     z.string().min(2, "Name is required"),
  phone:    z.string().min(7, "Phone is required"),
  email:    z.string().email("Valid email is required"),
  date:     z.string().min(1, "Date is required"),
  time:     z.string().min(1, "Time is required"),
  guests:   z.string().min(1, "Party size is required"),
  requests: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface ReservationFormProps {
  locale: string;
  labels: {
    name: string; namePlaceholder: string;
    phone: string; phonePlaceholder: string;
    email: string; emailPlaceholder: string;
    date: string; time: string;
    guests: string; guestsPlaceholder: string;
    requests: string; requestsPlaceholder: string;
    submit: string; submitting: string;
    successTitle: string; successMessage: string;
    whatsappConfirm: string; errorMessage: string;
    guestOptions: { value: string; label: string }[];
  };
}

// Generate time slots from restaurant hours
function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 11; h <= 23; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
}

export default function ReservationForm({ locale, labels }: ReservationFormProps) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const timeSlots = generateTimeSlots();
  const isRtl = locale === "ar";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setState("loading");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error("Failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    const waUrl = buildReservationWhatsAppUrl(restaurant.name, locale);
    return (
      <div className="text-center py-16 px-6 max-w-md mx-auto">
        <CheckCircle size={52} className="mx-auto mb-5 text-green-500" />
        <h2 className="font-display text-3xl mb-3">{labels.successTitle}</h2>
        <p className="text-[var(--color-muted)] text-sm mb-8">{labels.successMessage}</p>
        <a href={waUrl} target="_blank" rel="noopener noreferrer"
           className="btn-primary w-full justify-center gap-2">
          <MessageCircle size={16} />
          {labels.whatsappConfirm}
        </a>
      </div>
    );
  }

  const fieldClass = `w-full px-4 py-3 bg-white border border-[var(--color-border)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors ${isRtl ? "text-right" : ""}`;
  const labelClass = "block text-xs font-semibold tracking-wide uppercase text-[var(--color-muted)] mb-1.5";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Row 1: Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{labels.name}</label>
          <input {...register("name")} placeholder={labels.namePlaceholder} className={fieldClass} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>{labels.phone}</label>
          <input {...register("phone")} type="tel" placeholder={labels.phonePlaceholder} className={fieldClass} />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>{labels.email}</label>
        <input {...register("email")} type="email" placeholder={labels.emailPlaceholder} className={fieldClass} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      {/* Row 2: Date + Time + Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label className={labelClass}>{labels.date}</label>
          <input
            {...register("date")}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className={fieldClass}
          />
          {errors.date && <p className={errorClass}>{errors.date.message}</p>}
        </div>
        <div>
          <label className={labelClass}>{labels.time}</label>
          <select {...register("time")} className={fieldClass}>
            <option value="">—</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          {errors.time && <p className={errorClass}>{errors.time.message}</p>}
        </div>
        <div>
          <label className={labelClass}>{labels.guests}</label>
          <select {...register("guests")} className={fieldClass}>
            <option value="">{labels.guestsPlaceholder}</option>
            {labels.guestOptions.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {errors.guests && <p className={errorClass}>{errors.guests.message}</p>}
        </div>
      </div>

      {/* Special requests */}
      <div>
        <label className={labelClass}>{labels.requests}</label>
        <textarea
          {...register("requests")}
          rows={3}
          placeholder={labels.requestsPlaceholder}
          className={`${fieldClass} resize-none`}
        />
      </div>

      {state === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3">
          <AlertCircle size={16} />
          {labels.errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="btn-primary w-full justify-center"
      >
        {state === "loading" ? (
          <><Loader2 size={16} className="animate-spin" />{labels.submitting}</>
        ) : labels.submit}
      </button>
    </form>
  );
}
